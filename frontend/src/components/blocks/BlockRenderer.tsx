import type { StrapiBlock } from '@/lib/strapi';
import type { Locale } from '@/lib/i18n';
import HeroBanner from './HeroBanner';
import BrandIntro from './BrandIntro';
import ServiceHighlights from './ServiceHighlights';
import ProcessSteps from './ProcessSteps';
import FeaturedDestinations from './FeaturedDestinations';
import ImageText from './ImageText';
import TestimonialsSection from './TestimonialsSection';
import FaqSection from './FaqSection';
import ContactCta from './ContactCta';
import GalleryVideo from './GalleryVideo';
import MultiColumn from './MultiColumn';
import RichTextBlock from './RichTextBlock';

interface BlockRendererProps {
  blocks: StrapiBlock[];
  locale: Locale;
}

export default function BlockRenderer({ blocks, locale }: BlockRendererProps) {
  if (!blocks || blocks.length === 0) return null;

  return (
    <>
      {blocks.map((block, index) => {
        const key = `${block.__component}-${block.id || index}`;

        switch (block.__component) {
          case 'blocks.hero-banner':
            return <HeroBanner key={key} data={block} locale={locale} />;
          case 'blocks.brand-intro':
            return <BrandIntro key={key} data={block} />;
          case 'blocks.service-highlights':
            return <ServiceHighlights key={key} data={block} />;
          case 'blocks.process-steps':
            return <ProcessSteps key={key} data={block} />;
          case 'blocks.featured-destinations':
            return <FeaturedDestinations key={key} data={block} locale={locale} />;
          case 'blocks.image-text':
            return <ImageText key={key} data={block} locale={locale} />;
          case 'blocks.testimonials-section':
            return <TestimonialsSection key={key} data={block} />;
          case 'blocks.faq-section':
            return <FaqSection key={key} data={block} locale={locale} />;
          case 'blocks.contact-cta':
            return <ContactCta key={key} data={block} locale={locale} />;
          case 'blocks.gallery-video':
            return <GalleryVideo key={key} data={block} />;
          case 'blocks.multi-column':
            return <MultiColumn key={key} data={block} />;
          case 'blocks.rich-text':
            return <RichTextBlock key={key} data={block} />;
          default:
            console.warn(`Unknown block type: ${block.__component}`);
            return null;
        }
      })}
    </>
  );
}
