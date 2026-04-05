import type { Metadata } from 'next';
import { isValidLocale, type Locale } from '@/lib/i18n';
import { getAboutPage } from '@/lib/strapi';
import { getFallbackHomePage } from '@/lib/fallback-data';
import BlockRenderer from '@/components/blocks/BlockRenderer';

const fallbackAbout: Record<string, { title: string; desc: string; blocks: any[] }> = {
  'zh-hans': {
    title: '关于我们 - 星途旅行',
    desc: '了解星途旅行——一家扎根新加坡的家庭经营旅行社。',
    blocks: [
      { id: 1, __component: 'blocks.hero-banner', title: '关于星途旅行', subtitle: '一家扎根新加坡的家庭经营旅行社，用心服务每一位旅客', overlayOpacity: 50 },
      { id: 2, __component: 'blocks.brand-intro', heading: '我们的故事', content: '星途旅行创立于新加坡，是一家由家人共同经营的旅行社。我们深知旅行不仅仅是到达目的地，更是一段珍贵的家庭时光。\n\n多年来，我们专注服务新加坡本地华人社群，尤其是中老年旅客群体。我们理解他们对旅行的期待：安全、舒适、不赶行程、有人贴心照顾。\n\n每一次旅行，我们都以家人的标准来规划，确保每位旅客都能安心出行，尽情享受旅途的美好。', imagePosition: 'right' },
      { id: 3, __component: 'blocks.multi-column', heading: '我们的价值观', columns: [{ title: '用心服务', content: '把每位旅客当作家人，用心规划每一个细节。' }, { title: '安全第一', content: '旅客的安全是我们的首要考量，全程保障无忧。' }, { title: '品质保证', content: '精选合作伙伴，确保住宿、交通、餐饮的品质。' }] },
      { id: 4, __component: 'blocks.contact-cta', heading: '想了解更多？', description: '欢迎联系我们，让我们为您规划一段难忘的旅程', buttons: [{ text: '联系我们', url: '/contact', style: 'primary', isExternal: false }], showWhatsApp: true, showPhone: true },
    ],
  },
  'zh-hant': {
    title: '關於我們 - 星途旅行',
    desc: '了解星途旅行——一家紮根新加坡的家庭經營旅行社。',
    blocks: [
      { id: 1, __component: 'blocks.hero-banner', title: '關於星途旅行', subtitle: '一家紮根新加坡的家庭經營旅行社，用心服務每一位旅客', overlayOpacity: 50 },
      { id: 2, __component: 'blocks.brand-intro', heading: '我們的故事', content: '星途旅行創立於新加坡，是一家由家人共同經營的旅行社。我們深知旅行不僅僅是到達目的地，更是一段珍貴的家庭時光。', imagePosition: 'right' },
      { id: 3, __component: 'blocks.multi-column', heading: '我們的價值觀', columns: [{ title: '用心服務', content: '把每位旅客當作家人，用心規劃每一個細節。' }, { title: '安全第一', content: '旅客的安全是我們的首要考量。' }, { title: '品質保證', content: '精選合作夥伴，確保品質。' }] },
      { id: 4, __component: 'blocks.contact-cta', heading: '想了解更多？', description: '歡迎聯繫我們', buttons: [{ text: '聯繫我們', url: '/contact', style: 'primary', isExternal: false }], showWhatsApp: true, showPhone: true },
    ],
  },
  en: {
    title: 'About Us - StarVoyage Travel',
    desc: 'Learn about StarVoyage Travel — a family-run travel agency in Singapore.',
    blocks: [
      { id: 1, __component: 'blocks.hero-banner', title: 'About StarVoyage Travel', subtitle: 'A family-run travel agency rooted in Singapore, serving every traveler with heart', overlayOpacity: 50 },
      { id: 2, __component: 'blocks.brand-intro', heading: 'Our Story', content: 'StarVoyage Travel was founded in Singapore as a family-run travel agency. We believe travel is not just about reaching a destination — it\'s about creating precious family moments.\n\nFor years, we have focused on serving the local Singaporean Chinese community, especially senior travelers. We understand their travel expectations: safety, comfort, unhurried itineraries, and caring service.', imagePosition: 'right' },
      { id: 3, __component: 'blocks.multi-column', heading: 'Our Values', columns: [{ title: 'Heartfelt Service', content: 'We treat every traveler like family.' }, { title: 'Safety First', content: 'Traveler safety is our top priority.' }, { title: 'Quality Assured', content: 'We partner with the best for accommodation, transport, and dining.' }] },
      { id: 4, __component: 'blocks.contact-cta', heading: 'Want to Learn More?', description: 'Contact us and let us plan an unforgettable journey for you', buttons: [{ text: 'Contact Us', url: '/contact', style: 'primary', isExternal: false }], showWhatsApp: true, showPhone: true },
    ],
  },
};

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const fb = fallbackAbout[locale] || fallbackAbout['zh-hans'];
  return {
    title: fb.title,
    description: fb.desc,
    alternates: {
      canonical: `/${locale}/about`,
      languages: { 'zh-Hans': '/zh-hans/about', 'zh-Hant': '/zh-hant/about', en: '/en/about' },
    },
  };
}

export default async function AboutPage({ params }: PageProps) {
  const { locale } = await params;
  if (!isValidLocale(locale)) return null;
  const typedLocale = locale as Locale;

  const res = await getAboutPage(typedLocale);
  const page = res?.data;
  const blocks = page?.blocks || fallbackAbout[locale]?.blocks || [];

  return <BlockRenderer blocks={blocks} locale={typedLocale} />;
}
