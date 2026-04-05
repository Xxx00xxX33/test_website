import { strapiLocaleMap, type Locale } from './i18n';

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN || '';

interface StrapiRequestOptions {
  locale?: Locale;
  populate?: string | Record<string, unknown>;
  filters?: Record<string, unknown>;
  sort?: string | string[];
  pagination?: { page?: number; pageSize?: number };
  fields?: string[];
}

async function fetchStrapi<T>(
  path: string,
  options: StrapiRequestOptions = {},
): Promise<T | null> {
  const { locale, populate, filters, sort, pagination, fields } = options;

  const params = new URLSearchParams();

  if (locale) {
    params.set('locale', strapiLocaleMap[locale]);
  }

  if (populate) {
    if (typeof populate === 'string') {
      params.set('populate', populate);
    } else {
      flattenParams(params, 'populate', populate);
    }
  }

  if (filters) {
    flattenParams(params, 'filters', filters);
  }

  if (sort) {
    if (Array.isArray(sort)) {
      sort.forEach((s, i) => params.set(`sort[${i}]`, s));
    } else {
      params.set('sort', sort);
    }
  }

  if (pagination) {
    if (pagination.page) params.set('pagination[page]', String(pagination.page));
    if (pagination.pageSize) params.set('pagination[pageSize]', String(pagination.pageSize));
  }

  if (fields) {
    fields.forEach((f, i) => params.set(`fields[${i}]`, f));
  }

  const url = `${STRAPI_URL}/api${path}?${params.toString()}`;

  try {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (STRAPI_API_TOKEN) {
      headers.Authorization = `Bearer ${STRAPI_API_TOKEN}`;
    }

    const res = await fetch(url, {
      headers,
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      console.error(`Strapi API error: ${res.status} ${res.statusText} for ${url}`);
      return null;
    }

    const json = await res.json();
    return json as T;
  } catch (error) {
    console.error(`Failed to fetch from Strapi: ${url}`, error);
    return null;
  }
}

function flattenParams(
  params: URLSearchParams,
  prefix: string,
  obj: unknown,
): void {
  if (obj === null || obj === undefined) return;

  if (typeof obj === 'object' && !Array.isArray(obj)) {
    for (const [key, value] of Object.entries(obj as Record<string, unknown>)) {
      flattenParams(params, `${prefix}[${key}]`, value);
    }
  } else if (Array.isArray(obj)) {
    obj.forEach((item, index) => {
      flattenParams(params, `${prefix}[${index}]`, item);
    });
  } else {
    params.set(prefix, String(obj));
  }
}

/** Helper to get full media URL */
export function getStrapiMediaUrl(url: string | null | undefined): string {
  if (!url) return '/placeholder.jpg';
  if (url.startsWith('http')) return url;
  return `${STRAPI_URL}${url}`;
}

// ============ API Functions ============

export async function getSiteSettings(locale: Locale) {
  return fetchStrapi<StrapiResponse<StrapiSiteSettings>>('/site-setting', {
    locale,
    populate: {
      logo: { fields: ['url', 'alternativeText', 'width', 'height'] },
      favicon: { fields: ['url'] },
      socialLinks: { populate: '*' },
      defaultSeo: { populate: { metaImage: { fields: ['url', 'width', 'height'] } } },
    },
  });
}

export async function getNavigation(locale: Locale) {
  return fetchStrapi<StrapiResponse<StrapiNavigation>>('/navigation', {
    locale,
    populate: {
      mainNav: { populate: '*' },
      footerNav: { populate: '*' },
    },
  });
}

export async function getHomePage(locale: Locale) {
  return fetchStrapi<StrapiResponse<StrapiPageWithBlocks>>('/home-page', {
    locale,
    populate: {
      seo: { populate: { metaImage: { fields: ['url', 'width', 'height'] } } },
      blocks: {
        on: {
          'blocks.hero-banner': {
            populate: {
              backgroundImage: { fields: ['url', 'alternativeText', 'width', 'height'] },
              backgroundVideo: { fields: ['url'] },
              buttons: { populate: '*' },
            },
          },
          'blocks.brand-intro': {
            populate: {
              image: { fields: ['url', 'alternativeText', 'width', 'height'] },
            },
          },
          'blocks.service-highlights': {
            populate: {
              features: {
                populate: {
                  image: { fields: ['url', 'alternativeText', 'width', 'height'] },
                },
              },
            },
          },
          'blocks.process-steps': {
            populate: { steps: { populate: '*' } },
          },
          'blocks.featured-destinations': { populate: '*' },
          'blocks.image-text': {
            populate: {
              image: { fields: ['url', 'alternativeText', 'width', 'height'] },
              buttons: { populate: '*' },
            },
          },
          'blocks.testimonials-section': {
            populate: {
              testimonials: {
                populate: {
                  avatar: { fields: ['url', 'alternativeText'] },
                },
              },
            },
          },
          'blocks.faq-section': {
            populate: { items: { populate: '*' } },
          },
          'blocks.contact-cta': {
            populate: {
              backgroundImage: { fields: ['url', 'alternativeText', 'width', 'height'] },
              buttons: { populate: '*' },
            },
          },
          'blocks.gallery-video': {
            populate: {
              images: { fields: ['url', 'alternativeText', 'width', 'height'] },
              video: { fields: ['url'] },
            },
          },
          'blocks.multi-column': {
            populate: {
              columns: {
                populate: {
                  image: { fields: ['url', 'alternativeText', 'width', 'height'] },
                },
              },
            },
          },
          'blocks.rich-text': { populate: '*' },
        },
      },
    },
  });
}

export async function getAboutPage(locale: Locale) {
  return fetchStrapi<StrapiResponse<StrapiPageWithBlocks>>('/about-page', {
    locale,
    populate: {
      seo: { populate: { metaImage: { fields: ['url', 'width', 'height'] } } },
      blocks: {
        on: {
          'blocks.hero-banner': {
            populate: {
              backgroundImage: { fields: ['url', 'alternativeText', 'width', 'height'] },
              buttons: { populate: '*' },
            },
          },
          'blocks.brand-intro': {
            populate: { image: { fields: ['url', 'alternativeText', 'width', 'height'] } },
          },
          'blocks.service-highlights': {
            populate: { features: { populate: { image: { fields: ['url', 'alternativeText'] } } } },
          },
          'blocks.image-text': {
            populate: {
              image: { fields: ['url', 'alternativeText', 'width', 'height'] },
              buttons: { populate: '*' },
            },
          },
          'blocks.testimonials-section': {
            populate: { testimonials: { populate: { avatar: { fields: ['url'] } } } },
          },
          'blocks.gallery-video': {
            populate: {
              images: { fields: ['url', 'alternativeText', 'width', 'height'] },
              video: { fields: ['url'] },
            },
          },
          'blocks.multi-column': {
            populate: { columns: { populate: { image: { fields: ['url', 'alternativeText'] } } } },
          },
          'blocks.rich-text': { populate: '*' },
          'blocks.contact-cta': {
            populate: { backgroundImage: { fields: ['url'] }, buttons: { populate: '*' } },
          },
        },
      },
    },
  });
}

export async function getServicesPage(locale: Locale) {
  return getAboutPage(locale); // Same populate structure
}

export async function getServicesPageData(locale: Locale) {
  return fetchStrapi<StrapiResponse<StrapiPageWithBlocks>>('/services-page', {
    locale,
    populate: {
      seo: { populate: { metaImage: { fields: ['url', 'width', 'height'] } } },
      blocks: {
        on: {
          'blocks.hero-banner': {
            populate: {
              backgroundImage: { fields: ['url', 'alternativeText', 'width', 'height'] },
              buttons: { populate: '*' },
            },
          },
          'blocks.brand-intro': {
            populate: { image: { fields: ['url', 'alternativeText', 'width', 'height'] } },
          },
          'blocks.service-highlights': {
            populate: { features: { populate: { image: { fields: ['url', 'alternativeText'] } } } },
          },
          'blocks.process-steps': { populate: { steps: { populate: '*' } } },
          'blocks.image-text': {
            populate: {
              image: { fields: ['url', 'alternativeText', 'width', 'height'] },
              buttons: { populate: '*' },
            },
          },
          'blocks.multi-column': {
            populate: { columns: { populate: { image: { fields: ['url', 'alternativeText'] } } } },
          },
          'blocks.rich-text': { populate: '*' },
          'blocks.contact-cta': {
            populate: { backgroundImage: { fields: ['url'] }, buttons: { populate: '*' } },
          },
          'blocks.gallery-video': {
            populate: {
              images: { fields: ['url', 'alternativeText', 'width', 'height'] },
              video: { fields: ['url'] },
            },
          },
        },
      },
    },
  });
}

export async function getDestinations(locale: Locale) {
  return fetchStrapi<StrapiListResponse<StrapiDestination>>('/destinations', {
    locale,
    populate: {
      coverImage: { fields: ['url', 'alternativeText', 'width', 'height'] },
      seo: { populate: '*' },
    },
    sort: ['sortOrder:asc', 'createdAt:desc'],
    pagination: { pageSize: 100 },
  });
}

export async function getFeaturedDestinations(locale: Locale) {
  return fetchStrapi<StrapiListResponse<StrapiDestination>>('/destinations', {
    locale,
    populate: {
      coverImage: { fields: ['url', 'alternativeText', 'width', 'height'] },
    },
    filters: { featured: { $eq: true } },
    sort: ['sortOrder:asc'],
    pagination: { pageSize: 6 },
  });
}

export async function getDestinationBySlug(locale: Locale, slug: string) {
  return fetchStrapi<StrapiListResponse<StrapiDestination>>('/destinations', {
    locale,
    populate: {
      coverImage: { fields: ['url', 'alternativeText', 'width', 'height'] },
      gallery: { fields: ['url', 'alternativeText', 'width', 'height'] },
      video: { fields: ['url'] },
      seo: { populate: { metaImage: { fields: ['url', 'width', 'height'] } } },
    },
    filters: { slug: { $eq: slug } },
  });
}

export async function getFaqs(locale: Locale) {
  return fetchStrapi<StrapiListResponse<StrapiFaq>>('/faqs', {
    locale,
    sort: ['sortOrder:asc'],
    pagination: { pageSize: 100 },
  });
}

export async function getTestimonials(locale: Locale) {
  return fetchStrapi<StrapiListResponse<StrapiTestimonial>>('/testimonials', {
    locale,
    populate: {
      avatar: { fields: ['url', 'alternativeText'] },
    },
    sort: ['sortOrder:asc'],
    pagination: { pageSize: 100 },
  });
}

export async function getContactPage(locale: Locale) {
  return fetchStrapi<StrapiResponse<StrapiContactPage>>('/contact-page', {
    locale,
    populate: {
      seo: { populate: { metaImage: { fields: ['url', 'width', 'height'] } } },
      blocks: {
        on: {
          'blocks.hero-banner': {
            populate: {
              backgroundImage: { fields: ['url', 'alternativeText', 'width', 'height'] },
              buttons: { populate: '*' },
            },
          },
          'blocks.rich-text': { populate: '*' },
          'blocks.image-text': {
            populate: {
              image: { fields: ['url', 'alternativeText', 'width', 'height'] },
              buttons: { populate: '*' },
            },
          },
          'blocks.contact-cta': {
            populate: { backgroundImage: { fields: ['url'] }, buttons: { populate: '*' } },
          },
        },
      },
    },
  });
}

export async function getLegalPages(locale: Locale) {
  return fetchStrapi<StrapiListResponse<StrapiLegalPage>>('/legal-pages', {
    locale,
    fields: ['title', 'slug', 'pageType'],
  });
}

export async function getLegalPageBySlug(locale: Locale, slug: string) {
  return fetchStrapi<StrapiListResponse<StrapiLegalPage>>('/legal-pages', {
    locale,
    populate: {
      seo: { populate: { metaImage: { fields: ['url', 'width', 'height'] } } },
    },
    filters: { slug: { $eq: slug } },
  });
}

// ============ Types ============

export interface StrapiResponse<T> {
  data: T;
  meta: Record<string, unknown>;
}

export interface StrapiListResponse<T> {
  data: T[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface StrapiMedia {
  url: string;
  alternativeText?: string;
  width?: number;
  height?: number;
}

export interface StrapiSeo {
  metaTitle?: string;
  metaDescription?: string;
  metaImage?: StrapiMedia;
  canonicalURL?: string;
}

export interface StrapiSiteSettings {
  id: number;
  siteName: string;
  siteTagline?: string;
  logo?: StrapiMedia;
  favicon?: StrapiMedia;
  phone?: string;
  whatsapp?: string;
  email?: string;
  address?: string;
  socialLinks?: Array<{
    platform: string;
    url: string;
    label?: string;
  }>;
  defaultSeo?: StrapiSeo;
  footerText?: string;
  copyrightText?: string;
}

export interface StrapiNavItem {
  label: string;
  url: string;
  order: number;
  isExternal: boolean;
}

export interface StrapiNavigation {
  id: number;
  mainNav: StrapiNavItem[];
  footerNav: StrapiNavItem[];
}

export interface StrapiBlock {
  id: number;
  __component: string;
  [key: string]: unknown;
}

export interface StrapiPageWithBlocks {
  id: number;
  seo?: StrapiSeo;
  blocks: StrapiBlock[];
}

export interface StrapiDestination {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  summary?: string;
  content?: string;
  highlights?: string;
  suitableFor?: string;
  durationSuggestion?: string;
  coverImage?: StrapiMedia;
  gallery?: StrapiMedia[];
  video?: StrapiMedia;
  featured: boolean;
  sortOrder: number;
  region?: string;
  seo?: StrapiSeo;
}

export interface StrapiFaq {
  id: number;
  documentId: string;
  question: string;
  answer: string;
  category: string;
  sortOrder: number;
}

export interface StrapiTestimonial {
  id: number;
  documentId: string;
  name: string;
  text: string;
  avatar?: StrapiMedia;
  rating: number;
  tripDestination?: string;
  sortOrder: number;
}

export interface StrapiContactPage {
  id: number;
  seo?: StrapiSeo;
  title?: string;
  description?: string;
  formTitle?: string;
  formDescription?: string;
  formSuccessMessage?: string;
  mapEmbedUrl?: string;
  blocks?: StrapiBlock[];
}

export interface StrapiLegalPage {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  content: string;
  pageType: string;
  seo?: StrapiSeo;
}
