import Link from 'next/link';
import type { StrapiBlock } from '@/lib/strapi';
import { getStrapiMediaUrl } from '@/lib/strapi';
import type { Locale } from '@/lib/i18n';

interface HeroBannerProps {
  data: StrapiBlock;
  locale: Locale;
}

export default function HeroBanner({ data, locale }: HeroBannerProps) {
  const title = data.title as string;
  const subtitle = data.subtitle as string;
  const buttons = (data.buttons as Array<{ text: string; url: string; style: string; isExternal: boolean }>) || [];
  const bgImage = data.backgroundImage as { url: string } | undefined;
  const overlayOpacity = (data.overlayOpacity as number) || 40;

  return (
    <section className="relative min-h-[500px] lg:min-h-[600px] flex items-center">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-800 via-primary-700 to-primary-900">
        {bgImage?.url && (
          <img
            src={getStrapiMediaUrl(bgImage.url)}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}
        <div
          className="absolute inset-0 bg-black"
          style={{ opacity: overlayOpacity / 100 }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 text-center">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-6 leading-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="text-lg sm:text-xl lg:text-2xl text-white/90 max-w-3xl mx-auto mb-10 leading-relaxed">
            {subtitle}
          </p>
        )}
        {buttons.length > 0 && (
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {buttons.map((btn, i) => {
              const href = btn.isExternal ? btn.url : `/${locale}${btn.url}`;
              const isWhatsApp = btn.style === 'whatsapp';
              const isPrimary = btn.style === 'primary';

              const className = isWhatsApp
                ? 'inline-flex items-center gap-2 px-8 py-4 bg-green-500 text-white rounded-xl text-lg font-semibold hover:bg-green-600 transition-all shadow-lg hover:shadow-xl'
                : isPrimary
                ? 'inline-flex items-center gap-2 px-8 py-4 bg-white text-primary-700 rounded-xl text-lg font-semibold hover:bg-primary-50 transition-all shadow-lg hover:shadow-xl'
                : 'inline-flex items-center gap-2 px-8 py-4 border-2 border-white text-white rounded-xl text-lg font-semibold hover:bg-white/10 transition-all';

              if (btn.isExternal) {
                return (
                  <a key={i} href={href} target="_blank" rel="noopener noreferrer" className={className}>
                    {isWhatsApp && (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                      </svg>
                    )}
                    {btn.text}
                  </a>
                );
              }

              return (
                <Link key={i} href={href} className={className}>
                  {btn.text}
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
