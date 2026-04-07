import type { Metadata } from 'next';
import { isValidLocale, type Locale } from '@/lib/i18n';
import { getHomePage, type StrapiPageWithBlocks } from '@/lib/strapi';
import { getFallbackHomePage } from '@/lib/fallback-data';
import BlockRenderer from '@/components/blocks/BlockRenderer';

interface PageProps {
  params: Promise<{ locale: string }>;
}

function hasRenderableBlocks(page: StrapiPageWithBlocks | null | undefined): page is StrapiPageWithBlocks {
  return Array.isArray(page?.blocks) && page.blocks.length > 0;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const typedLocale = locale as Locale;

  const res = await getHomePage(typedLocale);
  const page = res?.data || getFallbackHomePage(typedLocale);
  const seo = page.seo;

  const titles: Record<string, string> = {
    'zh-hans': '星途旅行 - 新加坡华人定制游专家',
    'zh-hant': '星途旅行 - 新加坡華人定制遊專家',
    en: 'StarVoyage Travel - Custom Tours for Singaporean Chinese',
  };

  const descriptions: Record<string, string> = {
    'zh-hans': '星途旅行是新加坡本地华人信赖的定制游旅行社，专为中老年旅客提供安心、舒适的旅行体验。',
    'zh-hant': '星途旅行是新加坡本地華人信賴的定制遊旅行社，專為中老年旅客提供安心、舒適的旅行體驗。',
    en: 'StarVoyage Travel is a trusted family-run travel agency in Singapore, specializing in custom tours for Chinese senior travelers.',
  };

  return {
    title: seo?.metaTitle || titles[locale] || titles['zh-hans'],
    description: seo?.metaDescription || descriptions[locale] || descriptions['zh-hans'],
    alternates: {
      canonical: `/${locale}`,
      languages: {
        'zh-Hans': '/zh-hans',
        'zh-Hant': '/zh-hant',
        en: '/en',
        'x-default': '/zh-hans',
      },
    },
  };
}

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params;

  if (!isValidLocale(locale)) return null;

  const typedLocale = locale as Locale;
  const fallbackPage = getFallbackHomePage(typedLocale);
  const res = await getHomePage(typedLocale);
  const page = res?.data;
  const blocks = hasRenderableBlocks(page) ? page.blocks : fallbackPage.blocks;

  return <BlockRenderer blocks={blocks} locale={typedLocale} />;
}
