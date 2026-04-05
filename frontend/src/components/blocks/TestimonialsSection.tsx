import type { StrapiBlock } from '@/lib/strapi';
import { getStrapiMediaUrl } from '@/lib/strapi';

interface Testimonial {
  name: string;
  text: string;
  rating?: number;
  tripDestination?: string;
  avatar?: { url: string; alternativeText?: string };
}

export default function TestimonialsSection({ data }: { data: StrapiBlock }) {
  const heading = data.heading as string;
  const subtitle = data.subtitle as string;
  const testimonials = (data.testimonials as Testimonial[]) || [];

  return (
    <section className="py-16 lg:py-24 bg-primary-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 lg:mb-16">
          {heading && (
            <h2 className="text-3xl lg:text-4xl font-bold text-primary-900 mb-4">{heading}</h2>
          )}
          {subtitle && (
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">{subtitle}</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <div key={i} className="bg-white rounded-2xl p-8 shadow-sm">
              {/* Stars */}
              {t.rating && (
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <svg key={j} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              )}

              <p className="text-gray-700 leading-relaxed mb-6 italic">
                &ldquo;{t.text}&rdquo;
              </p>

              <div className="flex items-center gap-3">
                {t.avatar?.url ? (
                  <img src={getStrapiMediaUrl(t.avatar.url)} alt={t.name} className="w-12 h-12 rounded-full object-cover" />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center">
                    <span className="text-primary-600 font-semibold text-lg">{t.name.charAt(0)}</span>
                  </div>
                )}
                <div>
                  <p className="font-semibold text-primary-900">{t.name}</p>
                  {t.tripDestination && (
                    <p className="text-sm text-gray-500">{t.tripDestination}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
