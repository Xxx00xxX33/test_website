import type { StrapiBlock } from '@/lib/strapi';
import { getStrapiMediaUrl } from '@/lib/strapi';

interface BrandIntroProps {
  data: StrapiBlock;
}

export default function BrandIntro({ data }: BrandIntroProps) {
  const heading = data.heading as string;
  const content = data.content as string;
  const image = data.image as { url: string; alternativeText?: string } | undefined;
  const imagePosition = (data.imagePosition as string) || 'right';

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex flex-col ${imagePosition === 'left' ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-12 lg:gap-16`}>
          {/* Text */}
          <div className="flex-1">
            {heading && (
              <h2 className="text-3xl lg:text-4xl font-bold text-primary-900 mb-6">
                {heading}
              </h2>
            )}
            {content && (
              <div className="text-gray-600 text-lg leading-relaxed whitespace-pre-line">
                {content}
              </div>
            )}
          </div>

          {/* Image */}
          {image?.url && (
            <div className="flex-1 w-full">
              <div className="relative rounded-2xl overflow-hidden shadow-xl">
                <img
                  src={getStrapiMediaUrl(image.url)}
                  alt={image.alternativeText || heading || ''}
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          )}

          {/* Placeholder when no image */}
          {!image?.url && (
            <div className="flex-1 w-full">
              <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-primary-100 to-warm-100 aspect-[4/3] flex items-center justify-center">
                <svg className="w-24 h-24 text-primary-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
