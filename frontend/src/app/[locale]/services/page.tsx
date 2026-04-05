import type { Metadata } from 'next';
import { isValidLocale, type Locale } from '@/lib/i18n';
import { getServicesPageData } from '@/lib/strapi';
import BlockRenderer from '@/components/blocks/BlockRenderer';

const fallbackServices: Record<string, { title: string; desc: string; blocks: any[] }> = {
  'zh-hans': {
    title: '服务介绍 - 星途旅行',
    desc: '了解星途旅行的定制游服务，专为新加坡华人家庭打造。',
    blocks: [
      { id: 1, __component: 'blocks.hero-banner', title: '我们的服务', subtitle: '专为新加坡华人家庭打造的定制旅行服务', overlayOpacity: 50 },
      { id: 2, __component: 'blocks.service-highlights', heading: '服务特色', subtitle: '每一项服务都以您的需求为中心', features: [{ icon: 'heart', title: '私人定制行程', description: '根据您的兴趣、体力和预算，量身打造专属行程方案。' }, { icon: 'shield', title: '全程安全保障', description: '精选安全可靠的合作伙伴，全程提供紧急联系支持。' }, { icon: 'users', title: '华语专属服务', description: '全程华语沟通，配备华语导游，无语言障碍。' }, { icon: 'clock', title: '舒适行程节奏', description: '不赶行程，充分休息时间，适合中老年旅客。' }] },
      { id: 3, __component: 'blocks.process-steps', heading: '服务流程', subtitle: '简单四步，开启专属旅程', steps: [{ stepNumber: 1, title: '初步沟通', description: '通过WhatsApp或电话了解您的旅行需求和偏好' }, { stepNumber: 2, title: '方案设计', description: '我们的旅行顾问为您量身设计行程方案' }, { stepNumber: 3, title: '确认细节', description: '与您确认行程、住宿、交通等所有细节' }, { stepNumber: 4, title: '安心出行', description: '出发前提供完整指南，旅途中全程支持' }] },
      { id: 4, __component: 'blocks.multi-column', heading: '我们的服务范围', columns: [{ title: '签证协助', content: '协助办理目的地签证，省心省力。' }, { title: '机票预订', content: '根据您的需求预订合适的航班。' }, { title: '酒店安排', content: '精选舒适、便利的住宿。' }, { title: '当地体验', content: '安排地道的文化体验和美食之旅。' }] },
      { id: 5, __component: 'blocks.contact-cta', heading: '准备好开始了吗？', description: '联系我们，让旅行顾问为您规划完美旅程', buttons: [{ text: '立即咨询', url: '/contact', style: 'primary', isExternal: false }, { text: 'WhatsApp 联系', url: 'https://wa.me/6588888888', style: 'whatsapp', isExternal: true }], showWhatsApp: true, showPhone: true },
    ],
  },
  'zh-hant': {
    title: '服務介紹 - 星途旅行',
    desc: '了解星途旅行的定制遊服務。',
    blocks: [
      { id: 1, __component: 'blocks.hero-banner', title: '我們的服務', subtitle: '專為新加坡華人家庭打造的定制旅行服務', overlayOpacity: 50 },
      { id: 2, __component: 'blocks.service-highlights', heading: '服務特色', subtitle: '每一項服務都以您的需求為中心', features: [{ icon: 'heart', title: '私人定制行程', description: '根據您的興趣、體力和預算，量身打造專屬行程方案。' }, { icon: 'shield', title: '全程安全保障', description: '精選安全可靠的合作夥伴。' }, { icon: 'users', title: '華語專屬服務', description: '全程華語溝通，無語言障礙。' }, { icon: 'clock', title: '舒適行程節奏', description: '不趕行程，充分休息。' }] },
      { id: 3, __component: 'blocks.process-steps', heading: '服務流程', subtitle: '簡單四步，開啟專屬旅程', steps: [{ stepNumber: 1, title: '初步溝通', description: '了解您的旅行需求' }, { stepNumber: 2, title: '方案設計', description: '量身設計行程方案' }, { stepNumber: 3, title: '確認細節', description: '確認所有細節' }, { stepNumber: 4, title: '安心出行', description: '全程支持' }] },
      { id: 4, __component: 'blocks.contact-cta', heading: '準備好開始了嗎？', description: '聯繫我們', buttons: [{ text: '立即諮詢', url: '/contact', style: 'primary', isExternal: false }], showWhatsApp: true, showPhone: true },
    ],
  },
  en: {
    title: 'Our Services - StarVoyage Travel',
    desc: 'Discover our custom travel services designed for Singaporean Chinese families.',
    blocks: [
      { id: 1, __component: 'blocks.hero-banner', title: 'Our Services', subtitle: 'Custom travel services designed for Singaporean Chinese families', overlayOpacity: 50 },
      { id: 2, __component: 'blocks.service-highlights', heading: 'Service Features', subtitle: 'Every service is centered around your needs', features: [{ icon: 'heart', title: 'Custom Itineraries', description: 'Tailored to your interests, fitness level, and budget.' }, { icon: 'shield', title: 'Safety Assured', description: 'Carefully selected partners with 24/7 emergency support.' }, { icon: 'users', title: 'Chinese Service', description: 'Full Chinese-speaking service throughout your journey.' }, { icon: 'clock', title: 'Comfortable Pace', description: 'Unhurried schedules perfect for senior travelers.' }] },
      { id: 3, __component: 'blocks.process-steps', heading: 'How It Works', subtitle: 'Four simple steps to your dream journey', steps: [{ stepNumber: 1, title: 'Initial Chat', description: 'Share your travel wishes with us' }, { stepNumber: 2, title: 'Custom Design', description: 'Our consultants create your perfect itinerary' }, { stepNumber: 3, title: 'Confirm Details', description: 'Review and confirm all arrangements' }, { stepNumber: 4, title: 'Travel with Peace', description: 'Full support before and during your trip' }] },
      { id: 4, __component: 'blocks.contact-cta', heading: 'Ready to Get Started?', description: 'Contact us and let our travel consultants plan your perfect journey', buttons: [{ text: 'Contact Us', url: '/contact', style: 'primary', isExternal: false }], showWhatsApp: true, showPhone: true },
    ],
  },
};

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const fb = fallbackServices[locale] || fallbackServices['zh-hans'];
  return {
    title: fb.title,
    description: fb.desc,
    alternates: {
      canonical: `/${locale}/services`,
      languages: { 'zh-Hans': '/zh-hans/services', 'zh-Hant': '/zh-hant/services', en: '/en/services' },
    },
  };
}

export default async function ServicesPage({ params }: PageProps) {
  const { locale } = await params;
  if (!isValidLocale(locale)) return null;
  const typedLocale = locale as Locale;

  const res = await getServicesPageData(typedLocale);
  const page = res?.data;
  const blocks = page?.blocks || fallbackServices[locale]?.blocks || [];

  return <BlockRenderer blocks={blocks} locale={typedLocale} />;
}
