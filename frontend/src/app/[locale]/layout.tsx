import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { isValidLocale, locales, strapiLocaleMap, type Locale } from '@/lib/i18n';
import { getSiteSettings, getNavigation } from '@/lib/strapi';
import { getFallbackSiteSettings, getFallbackNavigation } from '@/lib/fallback-data';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function LocaleLayout({ children, params }: LayoutProps) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const typedLocale = locale as Locale;

  // Fetch site settings and navigation
  const [settingsRes, navRes] = await Promise.all([
    getSiteSettings(typedLocale),
    getNavigation(typedLocale),
  ]);

  const settings = settingsRes?.data || getFallbackSiteSettings(typedLocale);
  const navigation = navRes?.data || getFallbackNavigation(typedLocale);

  const langMap: Record<string, string> = {
    'zh-hans': 'zh-Hans',
    'zh-hant': 'zh-Hant',
    en: 'en',
  };

  return (
    <html lang={langMap[locale] || 'en'} suppressHydrationWarning>
      <body className="min-h-screen flex flex-col bg-warm-50 text-gray-800 antialiased">
        <Header locale={typedLocale} settings={settings} navigation={navigation} />
        <main className="flex-1">{children}</main>
        <Footer locale={typedLocale} settings={settings} navigation={navigation} />
      </body>
    </html>
  );
}
