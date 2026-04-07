import type { Metadata } from 'next';
import { isValidLocale, type Locale } from '@/lib/i18n';
import { getContactPage, getSiteSettings } from '@/lib/strapi';
import { getFallbackContactPage, getFallbackSiteSettings } from '@/lib/fallback-data';
import BlockRenderer from '@/components/blocks/BlockRenderer';
import ContactPageClient from './ContactPageClient';

const fallbackMetadata: Record<Locale, { title: string; description: string }> = {
  'zh-hans': {
    title: '联系我们 - 星途旅行',
    description: '无论您有任何旅行想法或疑问，都欢迎联系我们。我们会在24小时内回复您。',
  },
  'zh-hant': {
    title: '聯繫我們 - 星途旅行',
    description: '無論您有任何旅行想法或疑問，都歡迎聯繫我們。',
  },
  en: {
    title: 'Contact Us - StarVoyage Travel',
    description: 'Whether you have travel ideas or questions, feel free to reach out. We will respond within 24 hours.',
  },
};

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const typedLocale = isValidLocale(locale) ? locale : 'zh-hans';
  const fallback = fallbackMetadata[typedLocale];
  const res = await getContactPage(typedLocale);
  const page = res?.data;

  return {
    title: page?.seo?.metaTitle || fallback.title,
    description: page?.seo?.metaDescription || page?.description || fallback.description,
    alternates: {
      canonical: `/${typedLocale}/contact`,
      languages: {
        'zh-Hans': '/zh-hans/contact',
        'zh-Hant': '/zh-hant/contact',
        en: '/en/contact',
      },
    },
  };
}

export default async function ContactPage({ params }: PageProps) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    return null;
  }

  const typedLocale = locale as Locale;
  const [contactRes, settingsRes] = await Promise.all([
    getContactPage(typedLocale),
    getSiteSettings(typedLocale),
  ]);

  const fallbackPage = getFallbackContactPage(typedLocale);
  const page = contactRes?.data || fallbackPage;
  const settings = settingsRes?.data || getFallbackSiteSettings(typedLocale);
  const blocks = page.blocks || fallbackPage.blocks || [];

  return (
    <>
      <ContactPageClient
        locale={typedLocale}
        title={page.title || fallbackPage.title || ''}
        description={page.description || fallbackPage.description || ''}
        formTitle={page.formTitle || fallbackPage.formTitle || ''}
        formDescription={page.formDescription || fallbackPage.formDescription}
        formSuccessMessage={page.formSuccessMessage || fallbackPage.formSuccessMessage || ''}
        phone={settings.phone}
        whatsapp={settings.whatsapp}
        email={settings.email}
        address={settings.address}
        mapEmbedUrl={page.mapEmbedUrl || fallbackPage.mapEmbedUrl}
      />
      <BlockRenderer blocks={blocks} locale={typedLocale} />
    </>
  );
}
