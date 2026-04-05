import Link from 'next/link';
import type { StrapiBlock } from '@/lib/strapi';
import { getFeaturedDestinations, getStrapiMediaUrl } from '@/lib/strapi';
import { getFallbackDestinations } from '@/lib/fallback-data';
import type { Locale } from '@/lib/i18n';

interface FeaturedDestinationsProps {
  data: StrapiBlock;
  locale: Locale;
}

export default async function FeaturedDestinations({ data, locale }: FeaturedDestinationsProps) {
  const heading = data.heading as string;
  const subtitle = data.subtitle as string;
  const buttonText = (data.buttonText as string) || '';
  const showMoreButton = data.showMoreButton as boolean;
  const maxItems = (data.maxItems as number) || 6;

  // Fetch featured destinations
  const res = await getFeaturedDestinations(locale);
  const destinations = res?.data || getFallbackDestinations(locale).filter((d) => d.featured);
  const displayDestinations = destinations.slice(0, maxItems);

  return (
    <section className="py-16 lg:py-24 bg-warm-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 lg:mb-16">
          {heading && (
            <h2 className="text-3xl lg:text-4xl font-bold text-primary-900 mb-4">
              {heading}
            </h2>
          )}
          {subtitle && (
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayDestinations.map((dest) => (
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
                {dest.region && (
                  <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-primary-700 text-xs font-medium px-3 py-1 rounded-full">
                    {dest.region}
                  </span>
                )}
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-primary-900 mb-2 group-hover:text-primary-600 transition-colors">
                  {dest.title}
                </h3>
                {dest.summary && (
                  <p className="text-gray-600 text-sm line-clamp-2 mb-3">
                    {dest.summary}
                  </p>
                )}
                {dest.durationSuggestion && (
                  <span className="text-xs text-primary-500 font-medium">
                    {dest.durationSuggestion}
                  </span>
                )}
              </div>
            </Link>
          ))}
        </div>

        {showMoreButton && buttonText && (
          <div className="text-center mt-12">
            <Link
              href={`/${locale}/destinations`}
              className="inline-flex items-center gap-2 px-8 py-3 bg-primary-500 text-white rounded-xl font-medium hover:bg-primary-600 transition-colors"
            >
              {buttonText}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
