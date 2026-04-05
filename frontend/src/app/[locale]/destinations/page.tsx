import type { Metadata } from 'next';
import Link from 'next/link';
import { isValidLocale, type Locale } from '@/lib/i18n';
import { getDestinations, getStrapiMediaUrl } from '@/lib/strapi';
import { getFallbackDestinations } from '@/lib/fallback-data';

const pageMeta: Record<string, { title: string; desc: string; heading: string; subtitle: string }> = {
  'zh-hans': { title: '目的地 - 星途旅行', desc: '探索我们精选的旅行目的地', heading: '旅行目的地', subtitle: '精选适合华人旅客的优质目的地，每一个都经过我们的精心考察' },
  'zh-hant': { title: '目的地 - 星途旅行', desc: '探索我們精選的旅行目的地', heading: '旅行目的地', subtitle: '精選適合華人旅客的優質目的地' },
  en: { title: 'Destinations - StarVoyage Travel', desc: 'Explore our handpicked travel destinations', heading: 'Travel Destinations', subtitle: 'Handpicked destinations perfect for Chinese travelers, each carefully vetted by our team' },
};

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const meta = pageMeta[locale] || pageMeta['zh-hans'];
  return {
    title: meta.title,
    description: meta.desc,
    alternates: {
      canonical: `/${locale}/destinations`,
      languages: { 'zh-Hans': '/zh-hans/destinations', 'zh-Hant': '/zh-hant/destinations', en: '/en/destinations' },
    },
  };
}

export default async function DestinationsPage({ params }: PageProps) {
  const { locale } = await params;
  if (!isValidLocale(locale)) return null;
  const typedLocale = locale as Locale;
  const meta = pageMeta[locale] || pageMeta['zh-hans'];

  const res = await getDestinations(typedLocale);
  const destinations = res?.data || getFallbackDestinations(typedLocale);

  return (
    <>
      {/* Hero */}
      <section className="relative py-20 lg:py-28 bg-gradient-to-br from-primary-800 to-primary-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">{meta.heading}</h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">{meta.subtitle}</p>
        </div>
      </section>

      {/* Destinations Grid */}
      <section className="py-16 lg:py-24 bg-warm-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {destinations.map((dest) => (
              <Link
                key={dest.slug}
                href={`/${locale}/destinations/${dest.slug}`}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  {dest.coverImage?.url ? (
                    <img
                      src={getStrapiMediaUrl(dest.coverImage.url)}
                      alt={dest.coverImage.alternativeText || dest.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-primary-200 to-warm-200 flex items-center justify-center">
                      <svg className="w-16 h-16 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                  )}
                  {dest.featured && (
                    <span className="absolute top-4 right-4 bg-primary-500 text-white text-xs font-medium px-3 py-1 rounded-full">
                      {locale === 'en' ? 'Featured' : '推荐'}
                    </span>
                  )}
                  {dest.region && (
                    <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-primary-700 text-xs font-medium px-3 py-1 rounded-full">
                      {dest.region}
                    </span>
                  )}
                </div>
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-primary-900 mb-2 group-hover:text-primary-600 transition-colors">
                    {dest.title}
                  </h2>
                  {dest.summary && (
                    <p className="text-gray-600 text-sm line-clamp-3 mb-3">{dest.summary}</p>
                  )}
                  <div className="flex items-center justify-between">
                    {dest.durationSuggestion && (
                      <span className="text-xs text-primary-500 font-medium">{dest.durationSuggestion}</span>
                    )}
                    <span className="text-primary-600 text-sm font-medium group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                      {locale === 'en' ? 'Learn more' : '了解详情'}
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
