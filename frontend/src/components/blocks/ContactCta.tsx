import Link from 'next/link';
import type { StrapiBlock } from '@/lib/strapi';
import { getStrapiMediaUrl } from '@/lib/strapi';
import type { Locale } from '@/lib/i18n';

interface ContactCtaProps {
  data: StrapiBlock;
  locale: Locale;
}

export default function ContactCta({ data, locale }: ContactCtaProps) {
  const heading = data.heading as string;
  const description = data.description as string;
  const buttons = (data.buttons as Array<{ text: string; url: string; style: string; isExternal: boolean }>) || [];
  const bgImage = data.backgroundImage as { url: string } | undefined;

  return (
    <section className="relative py-20 lg:py-28">
      <div className="absolute inset-0 bg-gradient-to-r from-primary-700 to-primary-900">
        {bgImage?.url && (
          <img src={getStrapiMediaUrl(bgImage.url)} alt="" className="absolute inset-0 w-full h-full object-cover opacity-20" />
        )}
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {heading && (
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">{heading}</h2>
        )}
        {description && (
          <p className="text-lg text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed">{description}</p>
        )}
        {buttons.length > 0 && (
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {buttons.map((btn, i) => {
              const href = btn.isExternal ? btn.url : `/${locale}${btn.url}`;
              const isWhatsApp = btn.style === 'whatsapp';
              const className = isWhatsApp
                ? 'inline-flex items-center gap-2 px-8 py-4 bg-green-500 text-white rounded-xl text-lg font-semibold hover:bg-green-600 transition-all shadow-lg'
                : 'inline-flex items-center gap-2 px-8 py-4 bg-white text-primary-700 rounded-xl text-lg font-semibold hover:bg-primary-50 transition-all shadow-lg';

              if (btn.isExternal) {
                return <a key={i} href={href} target="_blank" rel="noopener noreferrer" className={className}>{btn.text}</a>;
              }
              return <Link key={i} href={href} className={className}>{btn.text}</Link>;
            })}
          </div>
        )}
      </div>
    </section>
  );
}
