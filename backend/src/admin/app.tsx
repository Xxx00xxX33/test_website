import type { StrapiApp } from '@strapi/strapi/admin';
import enTranslations from './extensions/translations/en.json';
import zhHansTranslations from './extensions/translations/zh-Hans.json';
import zhTranslations from './extensions/translations/zh.json';

const CONTENT_MANAGER_HOOKS = {
  MUTATE_COLLECTION_TYPES_LINKS: 'Admin/CM/pages/App/mutate-collection-types-links',
  MUTATE_SINGLE_TYPES_LINKS: 'Admin/CM/pages/App/mutate-single-types-links',
} as const;

const CONTENT_TYPE_LABEL_IDS = {
  'api::about-page.about-page': 'content-type.api::about-page.about-page',
  'api::contact-page.contact-page': 'content-type.api::contact-page.contact-page',
  'api::destination.destination': 'content-type.api::destination.destination',
  'api::faq.faq': 'content-type.api::faq.faq',
  'api::home-page.home-page': 'content-type.api::home-page.home-page',
  'api::legal-page.legal-page': 'content-type.api::legal-page.legal-page',
  'api::navigation.navigation': 'content-type.api::navigation.navigation',
  'api::services-page.services-page': 'content-type.api::services-page.services-page',
  'api::site-setting.site-setting': 'content-type.api::site-setting.site-setting',
  'plugin::users-permissions.role': 'content-type.plugin::users-permissions.role',
  'plugin::users-permissions.user': 'content-type.plugin::users-permissions.user',
  'api::testimonial.testimonial': 'content-type.api::testimonial.testimonial',
} as const;

type SupportedAdminLocale = 'en' | 'zh-Hans' | 'zh';
type AdminTranslations = Record<string, string>;
type ContentTypeLabelId = (typeof CONTENT_TYPE_LABEL_IDS)[keyof typeof CONTENT_TYPE_LABEL_IDS];
type ContentTypeUid = keyof typeof CONTENT_TYPE_LABEL_IDS;

type ContentTypeLink = {
  uid: string;
  title: string;
};

type CollectionTypesHookPayload = {
  ctLinks: ContentTypeLink[];
  models: unknown[];
};

type SingleTypesHookPayload = {
  stLinks: ContentTypeLink[];
  models: unknown[];
};

type ProjectAdminApp = StrapiApp & {
  configurations: {
    translations: Record<string, AdminTranslations>;
  };
  registerHook: (
    name: string,
    fn: (
      payload: CollectionTypesHookPayload | SingleTypesHookPayload
    ) => CollectionTypesHookPayload | SingleTypesHookPayload
  ) => void;
};

const getCurrentAdminLocale = (): SupportedAdminLocale => {
  const locale = window.localStorage.getItem('strapi-admin-language');

  if (locale === 'zh-Hans' || locale === 'zh') {
    return locale;
  }

  return 'en';
};

const getContentTypeLabelId = (uid: string): ContentTypeLabelId | undefined => {
  return CONTENT_TYPE_LABEL_IDS[uid as ContentTypeUid];
};

const getLocalizedContentTypeLabel = (
  app: ProjectAdminApp,
  locale: SupportedAdminLocale,
  uid: string,
  fallback: string
): string => {
  const labelId = getContentTypeLabelId(uid);

  if (!labelId) {
    return fallback;
  }

  return app.configurations.translations[locale]?.[labelId] ?? fallback;
};

const localizeContentTypeLinks = <T extends ContentTypeLink>(app: ProjectAdminApp, links: T[]): T[] => {
  const locale = getCurrentAdminLocale();

  return links.map((link) => ({
    ...link,
    title: getLocalizedContentTypeLabel(app, locale, link.uid, link.title),
  }));
};

const registerContentTypeLocalizationHooks = (app: ProjectAdminApp): void => {
  app.registerHook(CONTENT_MANAGER_HOOKS.MUTATE_COLLECTION_TYPES_LINKS, (payload) => {
    if (!('ctLinks' in payload)) {
      return payload;
    }

    return {
      ...payload,
      ctLinks: localizeContentTypeLinks(app, payload.ctLinks),
    };
  });

  app.registerHook(CONTENT_MANAGER_HOOKS.MUTATE_SINGLE_TYPES_LINKS, (payload) => {
    if (!('stLinks' in payload)) {
      return payload;
    }

    return {
      ...payload,
      stLinks: localizeContentTypeLinks(app, payload.stLinks),
    };
  });
};

export default {
  config: {
    locales: ['en', 'zh-Hans', 'zh'],
    translations: {
      en: {
        ...enTranslations,
      },
      'zh-Hans': {
        ...zhHansTranslations,
      },
      zh: {
        ...zhTranslations,
      },
    },
  },
  register(app: ProjectAdminApp) {
    app.customFields.register({
      name: 'color',
      type: 'string',
      intlLabel: {
        id: 'global.customFields.color.label',
        defaultMessage: 'Color',
      },
      intlDescription: {
        id: 'global.customFields.color.description',
        defaultMessage: 'Set a color with the color picker or a HEX value.',
      },
      components: {
        Input: async () =>
          import('./components/ColorFieldInput').then((module) => ({
            default: module.default,
          })),
      },
    });

    registerContentTypeLocalizationHooks(app);
  },
  bootstrap(app: StrapiApp) {
    void app;
  },
};
