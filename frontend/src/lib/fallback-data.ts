import type { Locale } from './i18n';
import type {
  StrapiSiteSettings,
  StrapiNavigation,
  StrapiPageWithBlocks,
  StrapiDestination,
  StrapiFaq,
  StrapiTestimonial,
  StrapiContactPage,
  StrapiLegalPage,
} from './strapi';

const siteSettings: Record<Locale, StrapiSiteSettings> = {
  'zh-hans': {
    id: 1,
    siteName: '星途旅行',
    siteTagline: '专属定制，用心服务每一程',
    phone: '+65 8888 8888',
    whatsapp: '+65 8888 8888',
    email: 'hello@starvoyage.sg',
    address: '新加坡乌节路 #08-01 旅游中心大厦',
    footerText: '星途旅行 — 新加坡本地华人信赖的定制游专家。',
    copyrightText: '© 2024 星途旅行. 保留所有权利.',
    socialLinks: [],
  },
  'zh-hant': {
    id: 1,
    siteName: '星途旅行',
    siteTagline: '專屬定制，用心服務每一程',
    phone: '+65 8888 8888',
    whatsapp: '+65 8888 8888',
    email: 'hello@starvoyage.sg',
    address: '新加坡烏節路 #08-01 旅遊中心大廈',
    footerText: '星途旅行 — 新加坡本地華人信賴的定制遊專家。',
    copyrightText: '© 2024 星途旅行. 保留所有權利.',
    socialLinks: [],
  },
  en: {
    id: 1,
    siteName: 'StarVoyage Travel',
    siteTagline: 'Tailored Journeys, Heartfelt Service',
    phone: '+65 8888 8888',
    whatsapp: '+65 8888 8888',
    email: 'hello@starvoyage.sg',
    address: '#08-01 Tourism Centre, Orchard Road, Singapore',
    footerText: 'StarVoyage Travel — Trusted custom travel experts for Singaporean Chinese.',
    copyrightText: '© 2024 StarVoyage Travel. All rights reserved.',
    socialLinks: [],
  },
};

const navigation: Record<Locale, StrapiNavigation> = {
  'zh-hans': {
    id: 1,
    mainNav: [
      { label: '首页', url: '/', order: 1, isExternal: false },
      { label: '关于我们', url: '/about', order: 2, isExternal: false },
      { label: '服务介绍', url: '/services', order: 3, isExternal: false },
      { label: '目的地', url: '/destinations', order: 4, isExternal: false },
      { label: '常见问题', url: '/faq', order: 5, isExternal: false },
      { label: '联系我们', url: '/contact', order: 6, isExternal: false },
    ],
    footerNav: [
      { label: '隐私政策', url: '/legal/privacy-policy', order: 1, isExternal: false },
      { label: '服务条款', url: '/legal/terms', order: 2, isExternal: false },
    ],
  },
  'zh-hant': {
    id: 1,
    mainNav: [
      { label: '首頁', url: '/', order: 1, isExternal: false },
      { label: '關於我們', url: '/about', order: 2, isExternal: false },
      { label: '服務介紹', url: '/services', order: 3, isExternal: false },
      { label: '目的地', url: '/destinations', order: 4, isExternal: false },
      { label: '常見問題', url: '/faq', order: 5, isExternal: false },
      { label: '聯繫我們', url: '/contact', order: 6, isExternal: false },
    ],
    footerNav: [
      { label: '隱私政策', url: '/legal/privacy-policy', order: 1, isExternal: false },
      { label: '服務條款', url: '/legal/terms', order: 2, isExternal: false },
    ],
  },
  en: {
    id: 1,
    mainNav: [
      { label: 'Home', url: '/', order: 1, isExternal: false },
      { label: 'About Us', url: '/about', order: 2, isExternal: false },
      { label: 'Services', url: '/services', order: 3, isExternal: false },
      { label: 'Destinations', url: '/destinations', order: 4, isExternal: false },
      { label: 'FAQ', url: '/faq', order: 5, isExternal: false },
      { label: 'Contact', url: '/contact', order: 6, isExternal: false },
    ],
    footerNav: [
      { label: 'Privacy Policy', url: '/legal/privacy-policy', order: 1, isExternal: false },
      { label: 'Terms of Service', url: '/legal/terms', order: 2, isExternal: false },
    ],
  },
};

const homeBlocks: Record<Locale, StrapiPageWithBlocks> = {
  'zh-hans': {
    id: 1,
    blocks: [
      { id: 1, __component: 'blocks.hero-banner', title: '探索世界，从心出发', subtitle: '新加坡本地华人信赖的定制游专家，为您和家人量身打造舒适安心的旅行体验', buttons: [{ text: '开始定制旅程', url: '/contact', style: 'primary', isExternal: false }, { text: 'WhatsApp 咨询', url: 'https://wa.me/6588888888', style: 'whatsapp', isExternal: true }], overlayOpacity: 40 },
      { id: 2, __component: 'blocks.brand-intro', heading: '为什么选择星途旅行？', content: '我们是一家扎根新加坡的家庭经营旅行社，深耕华人定制游市场多年。我们理解中老年旅客的需求——安全、舒适、不赶行程、有人贴心照顾。每一次旅行，我们都用心规划，让您和家人安心出行，尽情享受旅途的美好。', imagePosition: 'right' },
      { id: 3, __component: 'blocks.service-highlights', heading: '我们的服务特色', subtitle: '专为新加坡华人家庭打造的定制旅行服务', features: [{ icon: 'heart', title: '贴心定制', description: '根据您的需求和喜好，量身定制专属行程' }, { icon: 'shield', title: '安全保障', description: '全程安全保障，让中老年旅客安心出行' }, { icon: 'users', title: '华语服务', description: '全程华语沟通，无语言障碍' }, { icon: 'clock', title: '灵活节奏', description: '不赶行程，充分休息，享受每一站' }] },
      { id: 4, __component: 'blocks.process-steps', heading: '定制游流程', subtitle: '简单四步，开启您的专属旅程', steps: [{ stepNumber: 1, title: '沟通需求', description: '通过WhatsApp或电话告诉我们您的旅行想法', icon: 'message' }, { stepNumber: 2, title: '方案设计', description: '我们为您量身设计行程方案', icon: 'map' }, { stepNumber: 3, title: '确认出行', description: '确认行程细节，安心准备出发', icon: 'check' }, { stepNumber: 4, title: '快乐旅行', description: '享受精心安排的旅行体验', icon: 'plane' }] },
      { id: 5, __component: 'blocks.featured-destinations', heading: '热门目的地', subtitle: '精选适合华人旅客的优质目的地', maxItems: 6, showMoreButton: true, buttonText: '查看全部目的地' },
      { id: 6, __component: 'blocks.testimonials-section', heading: '客户好评', subtitle: '听听旅客们怎么说', testimonials: [{ name: '陈阿姨', text: '第一次带爸妈出国，星途旅行安排得非常周到，行程不赶，爸妈玩得很开心！', rating: 5, tripDestination: '日本东京' }, { name: '林先生', text: '服务非常贴心，全程华语沟通，签证、机票都帮忙搞定，省心省力。', rating: 5, tripDestination: '韩国首尔' }, { name: '王太太', text: '和老伴一起参加了欧洲定制游，节奏舒适，导游细心，非常满意！', rating: 5, tripDestination: '欧洲多国' }] },
      { id: 7, __component: 'blocks.faq-section', heading: '常见问题', subtitle: '快速了解我们的服务', items: [{ question: '定制游和跟团游有什么区别？', answer: '定制游完全根据您的需求和喜好设计行程，时间灵活，不拼团，专属服务。' }, { question: '适合中老年人出行吗？', answer: '非常适合！我们专门为中老年旅客设计舒适的行程节奏，确保充分休息和安全保障。' }, { question: '如何开始定制旅行？', answer: '您可以通过WhatsApp、电话或网站联系表单联系我们。' }], showMoreLink: true },
      { id: 8, __component: 'blocks.contact-cta', heading: '准备好开始您的旅程了吗？', description: '联系我们，让星途旅行为您和家人打造一段难忘的旅行体验', buttons: [{ text: '立即咨询', url: '/contact', style: 'primary', isExternal: false }, { text: 'WhatsApp 联系', url: 'https://wa.me/6588888888', style: 'whatsapp', isExternal: true }], showWhatsApp: true, showPhone: true },
    ],
  },
  'zh-hant': {
    id: 1,
    blocks: [
      { id: 1, __component: 'blocks.hero-banner', title: '探索世界，從心出發', subtitle: '新加坡本地華人信賴的定制遊專家，為您和家人量身打造舒適安心的旅行體驗', buttons: [{ text: '開始定制旅程', url: '/contact', style: 'primary', isExternal: false }, { text: 'WhatsApp 諮詢', url: 'https://wa.me/6588888888', style: 'whatsapp', isExternal: true }], overlayOpacity: 40 },
      { id: 2, __component: 'blocks.brand-intro', heading: '為什麼選擇星途旅行？', content: '我們是一家紮根新加坡的家庭經營旅行社，深耕華人定制遊市場多年。我們理解中老年旅客的需求——安全、舒適、不趕行程、有人貼心照顧。', imagePosition: 'right' },
      { id: 3, __component: 'blocks.service-highlights', heading: '我們的服務特色', subtitle: '專為新加坡華人家庭打造的定制旅行服務', features: [{ icon: 'heart', title: '貼心定制', description: '根據您的需求和喜好，量身定制專屬行程' }, { icon: 'shield', title: '安全保障', description: '全程安全保障，讓中老年旅客安心出行' }, { icon: 'users', title: '華語服務', description: '全程華語溝通，無語言障礙' }, { icon: 'clock', title: '靈活節奏', description: '不趕行程，充分休息，享受每一站' }] },
      { id: 4, __component: 'blocks.process-steps', heading: '定制遊流程', subtitle: '簡單四步，開啟您的專屬旅程', steps: [{ stepNumber: 1, title: '溝通需求', description: '通過WhatsApp或電話告訴我們您的旅行想法', icon: 'message' }, { stepNumber: 2, title: '方案設計', description: '我們為您量身設計行程方案', icon: 'map' }, { stepNumber: 3, title: '確認出行', description: '確認行程細節，安心準備出發', icon: 'check' }, { stepNumber: 4, title: '快樂旅行', description: '享受精心安排的旅行體驗', icon: 'plane' }] },
      { id: 5, __component: 'blocks.featured-destinations', heading: '熱門目的地', subtitle: '精選適合華人旅客的優質目的地', maxItems: 6, showMoreButton: true, buttonText: '查看全部目的地' },
      { id: 6, __component: 'blocks.testimonials-section', heading: '客戶好評', subtitle: '聽聽旅客們怎麼說', testimonials: [{ name: '陳阿姨', text: '第一次帶爸媽出國，星途旅行安排得非常周到，行程不趕，爸媽玩得很開心！', rating: 5, tripDestination: '日本東京' }, { name: '林先生', text: '服務非常貼心，全程華語溝通，簽證、機票都幫忙搞定，省心省力。', rating: 5, tripDestination: '韓國首爾' }] },
      { id: 7, __component: 'blocks.faq-section', heading: '常見問題', subtitle: '快速了解我們的服務', items: [{ question: '定制遊和跟團遊有什麼區別？', answer: '定制遊完全根據您的需求和喜好設計行程，時間靈活，不拼團，專屬服務。' }, { question: '適合中老年人出行嗎？', answer: '非常適合！我們專門為中老年旅客設計舒適的行程節奏。' }], showMoreLink: true },
      { id: 8, __component: 'blocks.contact-cta', heading: '準備好開始您的旅程了嗎？', description: '聯繫我們，讓星途旅行為您和家人打造一段難忘的旅行體驗', buttons: [{ text: '立即諮詢', url: '/contact', style: 'primary', isExternal: false }], showWhatsApp: true, showPhone: true },
    ],
  },
  en: {
    id: 1,
    blocks: [
      { id: 1, __component: 'blocks.hero-banner', title: 'Explore the World, Journey from the Heart', subtitle: 'Trusted custom travel experts for Singaporean Chinese families. We craft comfortable and worry-free travel experiences for you and your loved ones.', buttons: [{ text: 'Start Planning', url: '/contact', style: 'primary', isExternal: false }, { text: 'WhatsApp Us', url: 'https://wa.me/6588888888', style: 'whatsapp', isExternal: true }], overlayOpacity: 40 },
      { id: 2, __component: 'blocks.brand-intro', heading: 'Why Choose StarVoyage Travel?', content: 'We are a family-run travel agency rooted in Singapore, specializing in custom tours for Chinese travelers. We understand the needs of senior travelers — safety, comfort, unhurried itineraries, and caring service.', imagePosition: 'right' },
      { id: 3, __component: 'blocks.service-highlights', heading: 'Our Service Features', subtitle: 'Custom travel services designed for Singaporean Chinese families', features: [{ icon: 'heart', title: 'Personalized', description: 'Tailor-made itineraries based on your preferences' }, { icon: 'shield', title: 'Safe & Secure', description: 'Comprehensive safety measures for senior travelers' }, { icon: 'users', title: 'Chinese Service', description: 'Full Chinese-speaking service throughout' }, { icon: 'clock', title: 'Flexible Pace', description: 'Unhurried schedules with plenty of rest' }] },
      { id: 4, __component: 'blocks.process-steps', heading: 'How It Works', subtitle: 'Four simple steps to your dream journey', steps: [{ stepNumber: 1, title: 'Share Your Ideas', description: 'Tell us your travel wishes via WhatsApp or phone', icon: 'message' }, { stepNumber: 2, title: 'Custom Planning', description: 'We design a personalized itinerary for you', icon: 'map' }, { stepNumber: 3, title: 'Confirm & Prepare', description: 'Review details and get ready for your trip', icon: 'check' }, { stepNumber: 4, title: 'Enjoy Your Trip', description: 'Experience a carefully curated journey', icon: 'plane' }] },
      { id: 5, __component: 'blocks.featured-destinations', heading: 'Popular Destinations', subtitle: 'Handpicked destinations perfect for Chinese travelers', maxItems: 6, showMoreButton: true, buttonText: 'View All Destinations' },
      { id: 6, __component: 'blocks.testimonials-section', heading: 'What Our Clients Say', subtitle: 'Hear from our happy travelers', testimonials: [{ name: 'Mrs. Chen', text: 'First time taking my parents abroad. StarVoyage arranged everything perfectly — unhurried pace, and my parents had a wonderful time!', rating: 5, tripDestination: 'Tokyo, Japan' }, { name: 'Mr. Lin', text: 'Very attentive service, Chinese-speaking throughout. They helped with visas and flights — so convenient!', rating: 5, tripDestination: 'Seoul, Korea' }] },
      { id: 7, __component: 'blocks.faq-section', heading: 'FAQ', subtitle: 'Quick answers about our services', items: [{ question: 'What is the difference between custom and group tours?', answer: 'Custom tours are designed entirely around your preferences with flexible timing and private service.' }, { question: 'Are your tours suitable for seniors?', answer: 'Absolutely! We specialize in comfortable itineraries designed for senior travelers.' }], showMoreLink: true },
      { id: 8, __component: 'blocks.contact-cta', heading: 'Ready to Start Your Journey?', description: 'Contact us and let StarVoyage Travel create an unforgettable experience for you and your family', buttons: [{ text: 'Contact Us', url: '/contact', style: 'primary', isExternal: false }], showWhatsApp: true, showPhone: true },
    ],
  },
};

const destinations: Record<Locale, StrapiDestination[]> = {
  'zh-hans': [
    { id: 1, documentId: '1', title: '日本东京', slug: 'japan-tokyo', summary: '体验传统与现代交融的魅力都市，品尝地道美食，感受日本文化的独特魅力。', content: '东京是一座充满活力的城市...', highlights: '- 浅草寺与东京塔\n- 筑地市场美食\n- 和服体验\n- 温泉旅馆', suitableFor: '家庭出游、中老年旅客', durationSuggestion: '5-7天', featured: true, sortOrder: 1, region: '亚洲' },
    { id: 2, documentId: '2', title: '韩国首尔', slug: 'south-korea-seoul', summary: '韩流文化与传统韵味并存，美食购物两不误的活力之都。', content: '首尔融合了古代宫殿与现代都市的魅力...', highlights: '- 景福宫\n- 明洞购物\n- 韩服体验\n- 韩式美食', suitableFor: '家庭出游、购物爱好者', durationSuggestion: '4-6天', featured: true, sortOrder: 2, region: '亚洲' },
    { id: 3, documentId: '3', title: '泰国曼谷+清迈', slug: 'thailand-bangkok-chiangmai', summary: '感受泰国的热情与宁静，从繁华都市到古城小镇。', content: '泰国是东南亚最受欢迎的旅游目的地之一...', highlights: '- 大皇宫\n- 水上市场\n- 清迈古城\n- 泰式按摩', suitableFor: '家庭出游、休闲度假', durationSuggestion: '6-8天', featured: true, sortOrder: 3, region: '东南亚' },
  ],
  'zh-hant': [
    { id: 1, documentId: '1', title: '日本東京', slug: 'japan-tokyo', summary: '體驗傳統與現代交融的魅力都市，品嚐地道美食。', content: '東京是一座充滿活力的城市...', highlights: '- 淺草寺與東京塔\n- 築地市場美食\n- 和服體驗\n- 溫泉旅館', suitableFor: '家庭出遊、中老年旅客', durationSuggestion: '5-7天', featured: true, sortOrder: 1, region: '亞洲' },
    { id: 2, documentId: '2', title: '韓國首爾', slug: 'south-korea-seoul', summary: '韓流文化與傳統韻味並存，美食購物兩不誤。', content: '首爾融合了古代宮殿與現代都市的魅力...', highlights: '- 景福宮\n- 明洞購物\n- 韓服體驗\n- 韓式美食', suitableFor: '家庭出遊、購物愛好者', durationSuggestion: '4-6天', featured: true, sortOrder: 2, region: '亞洲' },
    { id: 3, documentId: '3', title: '泰國曼谷+清邁', slug: 'thailand-bangkok-chiangmai', summary: '感受泰國的熱情與寧靜，從繁華都市到古城小鎮。', content: '泰國是東南亞最受歡迎的旅遊目的地之一...', highlights: '- 大皇宮\n- 水上市場\n- 清邁古城\n- 泰式按摩', suitableFor: '家庭出遊、休閒度假', durationSuggestion: '6-8天', featured: true, sortOrder: 3, region: '東南亞' },
  ],
  en: [
    { id: 1, documentId: '1', title: 'Tokyo, Japan', slug: 'japan-tokyo', summary: 'Experience the charm of a city where tradition meets modernity.', content: 'Tokyo is a vibrant city...', highlights: '- Senso-ji Temple & Tokyo Tower\n- Tsukiji Market\n- Kimono experience\n- Hot spring ryokan', suitableFor: 'Family trips, Senior travelers', durationSuggestion: '5-7 days', featured: true, sortOrder: 1, region: 'Asia' },
    { id: 2, documentId: '2', title: 'Seoul, South Korea', slug: 'south-korea-seoul', summary: 'A vibrant city where K-culture meets tradition.', content: 'Seoul blends ancient palaces with modern charm...', highlights: '- Gyeongbokgung Palace\n- Myeongdong shopping\n- Hanbok experience\n- Korean cuisine', suitableFor: 'Family trips, Shopping lovers', durationSuggestion: '4-6 days', featured: true, sortOrder: 2, region: 'Asia' },
    { id: 3, documentId: '3', title: 'Bangkok + Chiang Mai, Thailand', slug: 'thailand-bangkok-chiangmai', summary: 'Experience the warmth and tranquility of Thailand.', content: 'Thailand is one of Southeast Asia\'s most popular destinations...', highlights: '- Grand Palace\n- Floating market\n- Chiang Mai old city\n- Thai massage', suitableFor: 'Family trips, Leisure vacation', durationSuggestion: '6-8 days', featured: true, sortOrder: 3, region: 'Southeast Asia' },
  ],
};

const faqs: Record<Locale, StrapiFaq[]> = {
  'zh-hans': [
    { id: 1, documentId: '1', question: '定制游和跟团游有什么区别？', answer: '定制游完全根据您的需求和喜好设计行程，时间灵活，不拼团，专属导游和车辆服务。', category: 'booking-process', sortOrder: 1 },
    { id: 2, documentId: '2', question: '如何联系你们开始定制旅行？', answer: '您可以通过WhatsApp (+65 8888 8888)、电话、邮箱或网站联系表单联系我们。', category: 'communication', sortOrder: 2 },
    { id: 3, documentId: '3', question: '你们的行程适合中老年人吗？', answer: '非常适合！我们专门为中老年旅客设计行程，合理的节奏、舒适的住宿、便捷的交通。', category: 'senior-friendly', sortOrder: 3 },
    { id: 4, documentId: '4', question: '出行前需要准备什么？', answer: '我们会提供详细的准备清单，包括护照签证、旅行保险、衣物和药品建议等。', category: 'preparation', sortOrder: 4 },
    { id: 5, documentId: '5', question: '可以改期或取消吗？', answer: '出发前30天以上可免费改期一次，具体政策以合同为准。', category: 'cancellation', sortOrder: 5 },
  ],
  'zh-hant': [
    { id: 1, documentId: '1', question: '定制遊和跟團遊有什麼區別？', answer: '定制遊完全根據您的需求和喜好設計行程，時間靈活，不拼團，專屬導遊和車輛服務。', category: 'booking-process', sortOrder: 1 },
    { id: 2, documentId: '2', question: '如何聯繫你們開始定制旅行？', answer: '您可以通過WhatsApp (+65 8888 8888)、電話、郵箱或網站聯繫表單聯繫我們。', category: 'communication', sortOrder: 2 },
    { id: 3, documentId: '3', question: '你們的行程適合中老年人嗎？', answer: '非常適合！我們專門為中老年旅客設計行程，合理的節奏、舒適的住宿、便捷的交通。', category: 'senior-friendly', sortOrder: 3 },
    { id: 4, documentId: '4', question: '出行前需要準備什麼？', answer: '我們會提供詳細的準備清單，包括護照簽證、旅行保險、衣物和藥品建議等。', category: 'preparation', sortOrder: 4 },
    { id: 5, documentId: '5', question: '可以改期或取消嗎？', answer: '出發前30天以上可免費改期一次，具體政策以合同為準。', category: 'cancellation', sortOrder: 5 },
  ],
  en: [
    { id: 1, documentId: '1', question: 'What is the difference between custom and group tours?', answer: 'Custom tours are designed entirely based on your needs with flexible timing, private guides and vehicles.', category: 'booking-process', sortOrder: 1 },
    { id: 2, documentId: '2', question: 'How can I contact you to start planning?', answer: 'You can reach us via WhatsApp (+65 8888 8888), phone, email, or our website contact form.', category: 'communication', sortOrder: 2 },
    { id: 3, documentId: '3', question: 'Are your tours suitable for seniors?', answer: 'Absolutely! We specialize in comfortable itineraries designed for senior travelers.', category: 'senior-friendly', sortOrder: 3 },
    { id: 4, documentId: '4', question: 'What should I prepare before the trip?', answer: 'We provide a detailed preparation checklist including passport, visa, travel insurance, and packing suggestions.', category: 'preparation', sortOrder: 4 },
    { id: 5, documentId: '5', question: 'Can I reschedule or cancel?', answer: 'One free reschedule is available more than 30 days before departure. Specific terms as per contract.', category: 'cancellation', sortOrder: 5 },
  ],
};

export function getFallbackSiteSettings(locale: Locale): StrapiSiteSettings {
  return siteSettings[locale];
}

export function getFallbackNavigation(locale: Locale): StrapiNavigation {
  return navigation[locale];
}

export function getFallbackHomePage(locale: Locale): StrapiPageWithBlocks {
  return homeBlocks[locale];
}

export function getFallbackDestinations(locale: Locale): StrapiDestination[] {
  return destinations[locale];
}

export function getFallbackFaqs(locale: Locale): StrapiFaq[] {
  return faqs[locale];
}

export function getFallbackDestinationBySlug(locale: Locale, slug: string): StrapiDestination | null {
  return destinations[locale].find((d) => d.slug === slug) || null;
}


const contactPages: Record<Locale, StrapiContactPage> = {
  'zh-hans': {
    id: 1,
    title: '联系我们',
    description: '无论您有任何旅行想法或疑问，都欢迎联系我们。我们会在24小时内回复您。',
    formTitle: '发送咨询',
    formDescription: '请填写下面的表单，我们会尽快与您联系。',
    formSuccessMessage: '感谢您的咨询！我们会尽快与您联系。',
    mapEmbedUrl: '',
    blocks: [],
  },
  'zh-hant': {
    id: 1,
    title: '聯繫我們',
    description: '無論您有任何旅行想法或疑問，都歡迎聯繫我們。',
    formTitle: '發送諮詢',
    formDescription: '請填寫下面的表單，我們會盡快與您聯繫。',
    formSuccessMessage: '感謝您的諮詢！我們會盡快與您聯繫。',
    mapEmbedUrl: '',
    blocks: [],
  },
  en: {
    id: 1,
    title: 'Contact Us',
    description: 'Whether you have travel ideas or questions, feel free to reach out. We will respond within 24 hours.',
    formTitle: 'Send an Inquiry',
    formDescription: 'Fill in the form below and our team will get back to you soon.',
    formSuccessMessage: 'Thank you for your inquiry! We will get back to you soon.',
    mapEmbedUrl: '',
    blocks: [],
  },
};

export function getFallbackContactPage(locale: Locale): StrapiContactPage {
  return contactPages[locale] || contactPages['zh-hans'];
}
