import type { StrapiBlock } from '@/lib/strapi';
import { getStrapiMediaUrl } from '@/lib/strapi';

export default function GalleryVideo({ data }: { data: StrapiBlock }) {
  const heading = data.heading as string;
  const subtitle = data.subtitle as string;
  const layout = (data.layout as string) || 'grid';
  const images = (data.images as Array<{ url: string; alternativeText?: string }>) || [];
  const video = data.video as { url: string } | undefined;
  const videoUrl = data.videoUrl as string | undefined;

  return (
    <section className="py-16 lg:py-24 bg-warm-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {(heading || subtitle) && (
          <div className="text-center mb-12">
            {heading && <h2 className="text-3xl lg:text-4xl font-bold text-primary-900 mb-4">{heading}</h2>}
            {subtitle && <p className="text-lg text-gray-600 max-w-2xl mx-auto">{subtitle}</p>}
          </div>
        )}

        {/* Video */}
        {(video?.url || videoUrl) && (
          <div className="mb-10 rounded-2xl overflow-hidden shadow-lg max-w-4xl mx-auto">
            {videoUrl ? (
              <div className="aspect-video">
                <iframe src={videoUrl} className="w-full h-full" allowFullScreen title={heading || 'Video'} />
              </div>
            ) : video?.url ? (
              <video controls className="w-full" poster="">
                <source src={getStrapiMediaUrl(video.url)} />
              </video>
            ) : null}
          </div>
        )}

        {/* Image Gallery */}
        {images.length > 0 && (
          <div className={`grid gap-4 ${
            layout === 'masonry' ? 'columns-2 lg:columns-3' :
            images.length <= 2 ? 'grid-cols-1 sm:grid-cols-2' :
            'grid-cols-2 lg:grid-cols-3'
          }`}>
            {images.map((img, i) => (
              <div key={i} className={`${layout === 'masonry' ? 'break-inside-avoid mb-4' : ''} rounded-xl overflow-hidden shadow-sm`}>
                <img
                  src={getStrapiMediaUrl(img.url)}
                  alt={img.alternativeText || `Gallery image ${i + 1}`}
                  className="w-full h-auto object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        )}

        {/* Placeholder when no media */}
        {images.length === 0 && !video?.url && !videoUrl && (
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="rounded-xl bg-gradient-to-br from-primary-100 to-warm-100 aspect-[4/3] flex items-center justify-center">
                <svg className="w-16 h-16 text-primary-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
