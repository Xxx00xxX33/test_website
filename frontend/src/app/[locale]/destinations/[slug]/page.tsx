import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { isValidLocale, type Locale } from '@/lib/i18n';
import { getDestinationBySlug, getStrapiMediaUrl } from '@/lib/strapi';
import { getFallbackDestinationBySlug } from '@/lib/fallback-data';

interface PageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const typedLocale = locale as Locale;
  const res = await getDestinationBySlug(typedLocale, slug);
  const dest = res?.data?.[0] || getFallbackDestinationBySlug(typedLocale, slug);

  if (!dest) return { title: 'Not Found' };

  return {
    title: `${dest.title} - ${locale === 'en' ? 'StarVoyage Travel' : '星途旅行'}`,
    description: dest.summary || dest.content?.slice(0, 160),
    alternates: {
      canonical: `/${locale}/destinations/${slug}`,
      languages: {
        'zh-Hans': `/zh-hans/destinations/${slug}`,
        'zh-Hant': `/zh-hant/destinations/${slug}`,
        en: `/en/destinations/${slug}`,
      },
    },
  };
}

const labels: Record<string, Record<string, string>> = {
  'zh-hans': { back: '返回目的地列表', highlights: '行程亮点', suitableFor: '适合人群', duration: '建议天数', contact: '咨询此行程', whatsapp: 'WhatsApp 咨询' },
  'zh-hant': { back: '返回目的地列表', highlights: '行程亮點', suitableFor: '適合人群', duration: '建議天數', contact: '諮詢此行程', whatsapp: 'WhatsApp 諮詢' },
  en: { back: 'Back to Destinations', highlights: 'Highlights', suitableFor: 'Suitable For', duration: 'Suggested Duration', contact: 'Inquire About This Trip', whatsapp: 'WhatsApp Us' },
};

export default async function DestinationDetailPage({ params }: PageProps) {
  const { locale, slug } = await params;
  if (!isValidLocale(locale)) return null;
  const typedLocale = locale as Locale;

  const res = await getDestinationBySlug(typedLocale, slug);
  const dest = res?.data?.[0] || getFallbackDestinationBySlug(typedLocale, slug);

  if (!dest) notFound();

  const l = labels[locale] || labels['zh-hans'];

  return (
    <>
      {/* Hero */}
      <section className="relative py-20 lg:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-800 to-primary-900">
          {dest.coverImage?.url && (
            <img src={getStrapiMediaUrl(dest.coverImage.url)} alt={dest.title} className="absolute inset-0 w-full h-full object-cover opacity-30" />
          )}
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href={`/${locale}/destinations`} className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-6 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            {l.back}
          </Link>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">{dest.title}</h1>
          {dest.region && (
            <span className="inline-block bg-white/20 text-white text-sm px-4 py-1 rounded-full">{dest.region}</span>
          )}
        </div>
      </section>

      {/* Content */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {dest.summary && (
                <p className="text-xl text-gray-700 mb-8 leading-relaxed">{dest.summary}</p>
              )}
              {dest.content && (
                <div className="text-gray-600 text-lg leading-relaxed whitespace-pre-line mb-10">
                  {dest.content}
                </div>
              )}
              {dest.highlights && (
                <div className="mb-10">
                  <h2 className="text-2xl font-bold text-primary-900 mb-4">{l.highlights}</h2>
                  <div className="bg-warm-50 rounded-xl p-6">
                    <div className="whitespace-pre-line text-gray-700 leading-relaxed">
                      {dest.highlights}
                    </div>
                  </div>
                </div>
              )}

              {/* Gallery */}
              {dest.gallery && dest.gallery.length > 0 && (
                <div className="grid grid-cols-2 gap-4 mb-10">
                  {dest.gallery.map((img, i) => (
                    <div key={i} className="rounded-xl overflow-hidden">
                      <img src={getStrapiMediaUrl(img.url)} alt={img.alternativeText || `${dest.title} ${i + 1}`} className="w-full h-auto object-cover" />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 bg-warm-50 rounded-2xl p-8 space-y-6">
                {dest.durationSuggestion && (
                  <div>
                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1">{l.duration}</h3>
                    <p className="text-lg font-medium text-primary-900">{dest.durationSuggestion}</p>
                  </div>
                )}
                {dest.suitableFor && (
                  <div>
                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1">{l.suitableFor}</h3>
                    <p className="text-gray-700">{dest.suitableFor}</p>
                  </div>
                )}

                <hr className="border-gray-200" />

                <Link
                  href={`/${locale}/contact`}
                  className="block w-full text-center px-6 py-3 bg-primary-500 text-white rounded-xl font-medium hover:bg-primary-600 transition-colors"
                >
                  {l.contact}
                </Link>
                <a
                  href="https://wa.me/6588888888"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center px-6 py-3 bg-green-500 text-white rounded-xl font-medium hover:bg-green-600 transition-colors"
                >
                  {l.whatsapp}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
