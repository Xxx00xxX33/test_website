export const locales = ['zh-hans', 'zh-hant', 'en'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'zh-hans';

/** Map frontend locale slugs to Strapi locale codes */
export const strapiLocaleMap: Record<Locale, string> = {
  'zh-hans': 'zh-Hans',
  'zh-hant': 'zh-Hant',
  en: 'en',
};

/** Display names for the language switcher */
export const localeNames: Record<Locale, string> = {
  'zh-hans': '简体中文',
  'zh-hant': '繁體中文',
  en: 'English',
};

/** Determine locale from Accept-Language header */
export function detectLocaleFromHeader(acceptLanguage: string | null): Locale {
  if (!acceptLanguage) return 'en';

  const languages = acceptLanguage
    .split(',')
    .map((lang) => {
      const [code, q] = lang.trim().split(';q=');
      return { code: code.trim().toLowerCase(), quality: q ? parseFloat(q) : 1 };
    })
    .sort((a, b) => b.quality - a.quality);

  for (const { code } of languages) {
    // Simplified Chinese variants
    if (
      code === 'zh-cn' ||
      code === 'zh-sg' ||
      code === 'zh-hans' ||
      code.startsWith('zh-hans')
    ) {
      return 'zh-hans';
    }
    // Traditional Chinese variants
    if (
      code === 'zh-tw' ||
      code === 'zh-hk' ||
      code === 'zh-mo' ||
      code === 'zh-hant' ||
      code.startsWith('zh-hant')
    ) {
      return 'zh-hant';
    }
    // Generic Chinese -> default to simplified
    if (code === 'zh') {
      return 'zh-hans';
    }
    // English
    if (code.startsWith('en')) {
      return 'en';
    }
  }

  return 'en';
}

export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}
