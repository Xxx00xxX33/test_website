/**
 * Seed script for populating Strapi with demo content.
 * Run with: npx ts-node --project tsconfig.json seed/seed-data.ts
 * Or integrate into bootstrap function.
 * 
 * This file documents the expected seed data structure.
 * Actual seeding is done via the bootstrap function in src/index.ts
 */

export const siteSettingsData = {
  'zh-Hans': {
    siteName: '星途旅行',
    siteTagline: '专属定制，用心服务每一程',
    address: '新加坡乌节路 #08-01 旅游中心大厦',
    footerText: '星途旅行 — 新加坡本地华人信赖的定制游专家。我们专注为中老年旅客提供安心、舒适、贴心的旅行体验。',
    copyrightText: '© 2024 星途旅行. 保留所有权利.',
  },
  'zh-Hant': {
    siteName: '星途旅行',
    siteTagline: '專屬定制，用心服務每一程',
    address: '新加坡烏節路 #08-01 旅遊中心大廈',
    footerText: '星途旅行 — 新加坡本地華人信賴的定制遊專家。我們專注為中老年旅客提供安心、舒適、貼心的旅行體驗。',
    copyrightText: '© 2024 星途旅行. 保留所有權利.',
  },
  en: {
    siteName: 'StarVoyage Travel',
    siteTagline: 'Tailored Journeys, Heartfelt Service',
    address: '#08-01 Tourism Centre, Orchard Road, Singapore',
    footerText: 'StarVoyage Travel — Trusted custom travel experts for Singaporean Chinese. We specialize in comfortable and caring travel experiences for senior travelers.',
    copyrightText: '© 2024 StarVoyage Travel. All rights reserved.',
  },
  shared: {
    phone: '+65 8888 8888',
    whatsapp: '+65 8888 8888',
    email: 'hello@starvoyage.sg',
  },
};

export const navigationData = {
  'zh-Hans': {
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
      { label: '免责声明', url: '/legal/disclaimer', order: 3, isExternal: false },
    ],
  },
  'zh-Hant': {
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
      { label: '免責聲明', url: '/legal/disclaimer', order: 3, isExternal: false },
    ],
  },
  en: {
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
      { label: 'Disclaimer', url: '/legal/disclaimer', order: 3, isExternal: false },
    ],
  },
};

export const homePageBlocks = {
  'zh-Hans': [
    {
      __component: 'blocks.hero-banner',
      title: '探索世界，从心出发',
      subtitle: '新加坡本地华人信赖的定制游专家，为您和家人量身打造舒适安心的旅行体验',
      buttons: [
        { text: '开始定制旅程', url: '/contact', style: 'primary', isExternal: false },
        { text: 'WhatsApp 咨询', url: 'https://wa.me/6588888888', style: 'whatsapp', isExternal: true },
      ],
      overlayOpacity: 40,
    },
    {
      __component: 'blocks.brand-intro',
      heading: '为什么选择星途旅行？',
      content: '我们是一家扎根新加坡的家庭经营旅行社，深耕华人定制游市场多年。我们理解中老年旅客的需求——安全、舒适、不赶行程、有人贴心照顾。每一次旅行，我们都用心规划，让您和家人安心出行，尽情享受旅途的美好。',
      imagePosition: 'right',
    },
    {
      __component: 'blocks.service-highlights',
      heading: '我们的服务特色',
      subtitle: '专为新加坡华人家庭打造的定制旅行服务',
      features: [
        { icon: 'heart', title: '贴心定制', description: '根据您的需求和喜好，量身定制专属行程' },
        { icon: 'shield', title: '安全保障', description: '全程安全保障，让中老年旅客安心出行' },
        { icon: 'users', title: '华语服务', description: '全程华语沟通，无语言障碍' },
        { icon: 'clock', title: '灵活节奏', description: '不赶行程，充分休息，享受每一站' },
      ],
    },
    {
      __component: 'blocks.process-steps',
      heading: '定制游流程',
      subtitle: '简单四步，开启您的专属旅程',
      steps: [
        { stepNumber: 1, title: '沟通需求', description: '通过WhatsApp或电话告诉我们您的旅行想法', icon: 'message' },
        { stepNumber: 2, title: '方案设计', description: '我们为您量身设计行程方案', icon: 'map' },
        { stepNumber: 3, title: '确认出行', description: '确认行程细节，安心准备出发', icon: 'check' },
        { stepNumber: 4, title: '快乐旅行', description: '享受精心安排的旅行体验', icon: 'plane' },
      ],
    },
    {
      __component: 'blocks.featured-destinations',
      heading: '热门目的地',
      subtitle: '精选适合华人旅客的优质目的地',
      maxItems: 6,
      showMoreButton: true,
      buttonText: '查看全部目的地',
    },
    {
      __component: 'blocks.testimonials-section',
      heading: '客户好评',
      subtitle: '听听旅客们怎么说',
      testimonials: [
        { name: '陈阿姨', text: '第一次带爸妈出国，星途旅行安排得非常周到，行程不赶，爸妈玩得很开心！', rating: 5, tripDestination: '日本东京' },
        { name: '林先生', text: '服务非常贴心，全程华语沟通，签证、机票都帮忙搞定，省心省力。', rating: 5, tripDestination: '韩国首尔' },
        { name: '王太太', text: '和老伴一起参加了欧洲定制游，节奏舒适，导游细心，非常满意！', rating: 5, tripDestination: '欧洲多国' },
      ],
    },
    {
      __component: 'blocks.faq-section',
      heading: '常见问题',
      subtitle: '快速了解我们的服务',
      items: [
        { question: '定制游和跟团游有什么区别？', answer: '定制游完全根据您的需求和喜好设计行程，时间灵活，不拼团，专属服务。' },
        { question: '适合中老年人出行吗？', answer: '非常适合！我们专门为中老年旅客设计舒适的行程节奏，确保充分休息和安全保障。' },
        { question: '如何开始定制旅行？', answer: '您可以通过WhatsApp、电话或网站联系表单联系我们，告诉我们您的旅行想法即可。' },
      ],
      showMoreLink: true,
    },
    {
      __component: 'blocks.contact-cta',
      heading: '准备好开始您的旅程了吗？',
      description: '联系我们，让星途旅行为您和家人打造一段难忘的旅行体验',
      buttons: [
        { text: '立即咨询', url: '/contact', style: 'primary', isExternal: false },
        { text: 'WhatsApp 联系', url: 'https://wa.me/6588888888', style: 'whatsapp', isExternal: true },
      ],
      showWhatsApp: true,
      showPhone: true,
    },
  ],
};

export const destinationsData = [
  {
    shared: { featured: true, sortOrder: 1 },
    'zh-Hans': {
      title: '日本东京',
      slug: 'japan-tokyo',
      summary: '体验传统与现代交融的魅力都市，品尝地道美食，感受日本文化的独特魅力。',
      content: '东京是一座充满活力的城市，这里有古老的寺庙和现代的摩天大楼，有米其林美食和街头小吃。我们为您精心设计的东京定制游，将带您深入体验这座城市的方方面面。',
      highlights: '- 浅草寺与东京塔经典景点\n- 筑地/丰洲市场美食体验\n- 和服体验与茶道文化\n- 温泉旅馆住宿体验\n- 适合中老年的舒适行程安排',
      suitableFor: '家庭出游、中老年旅客、文化爱好者',
      durationSuggestion: '5-7天',
      region: '亚洲',
    },
    'zh-Hant': {
      title: '日本東京',
      slug: 'japan-tokyo',
      summary: '體驗傳統與現代交融的魅力都市，品嚐地道美食，感受日本文化的獨特魅力。',
      content: '東京是一座充滿活力的城市，這裡有古老的寺廟和現代的摩天大樓，有米其林美食和街頭小吃。我們為您精心設計的東京定制遊，將帶您深入體驗這座城市的方方面面。',
      highlights: '- 淺草寺與東京塔經典景點\n- 築地/豐洲市場美食體驗\n- 和服體驗與茶道文化\n- 溫泉旅館住宿體驗\n- 適合中老年的舒適行程安排',
      suitableFor: '家庭出遊、中老年旅客、文化愛好者',
      durationSuggestion: '5-7天',
      region: '亞洲',
    },
    en: {
      title: 'Tokyo, Japan',
      slug: 'japan-tokyo',
      summary: 'Experience the charm of a city where tradition meets modernity, savor authentic cuisine, and immerse yourself in Japanese culture.',
      content: 'Tokyo is a vibrant city with ancient temples and modern skyscrapers, Michelin-starred restaurants and street food stalls. Our custom Tokyo tour will take you deep into every aspect of this fascinating city.',
      highlights: '- Senso-ji Temple and Tokyo Tower\n- Tsukiji/Toyosu Market food experience\n- Kimono and tea ceremony\n- Hot spring ryokan stay\n- Senior-friendly comfortable itinerary',
      suitableFor: 'Family trips, Senior travelers, Culture enthusiasts',
      durationSuggestion: '5-7 days',
      region: 'Asia',
    },
  },
  {
    shared: { featured: true, sortOrder: 2 },
    'zh-Hans': {
      title: '韩国首尔',
      slug: 'south-korea-seoul',
      summary: '韩流文化与传统韵味并存，美食购物两不误的活力之都。',
      content: '首尔融合了古代宫殿与现代都市的魅力，是体验韩国文化的最佳目的地。从景福宫到明洞，从韩式烤肉到传统韩服体验，每一刻都精彩纷呈。',
      highlights: '- 景福宫与北村韩屋村\n- 明洞购物与美食街\n- 韩服体验拍照\n- 汗蒸幕养生体验\n- 地道韩式美食之旅',
      suitableFor: '家庭出游、购物爱好者、美食爱好者',
      durationSuggestion: '4-6天',
      region: '亚洲',
    },
    'zh-Hant': {
      title: '韓國首爾',
      slug: 'south-korea-seoul',
      summary: '韓流文化與傳統韻味並存，美食購物兩不誤的活力之都。',
      content: '首爾融合了古代宮殿與現代都市的魅力，是體驗韓國文化的最佳目的地。從景福宮到明洞，從韓式烤肉到傳統韓服體驗，每一刻都精彩紛呈。',
      highlights: '- 景福宮與北村韓屋村\n- 明洞購物與美食街\n- 韓服體驗拍照\n- 汗蒸幕養生體驗\n- 地道韓式美食之旅',
      suitableFor: '家庭出遊、購物愛好者、美食愛好者',
      durationSuggestion: '4-6天',
      region: '亞洲',
    },
    en: {
      title: 'Seoul, South Korea',
      slug: 'south-korea-seoul',
      summary: 'A vibrant city where K-culture meets tradition, with amazing food and shopping.',
      content: 'Seoul blends ancient palaces with modern urban charm, making it the perfect destination to experience Korean culture. From Gyeongbokgung to Myeongdong, from Korean BBQ to traditional Hanbok experience.',
      highlights: '- Gyeongbokgung Palace & Bukchon Hanok Village\n- Myeongdong shopping & food street\n- Hanbok experience & photo\n- Jjimjilbang spa experience\n- Authentic Korean cuisine tour',
      suitableFor: 'Family trips, Shopping lovers, Foodies',
      durationSuggestion: '4-6 days',
      region: 'Asia',
    },
  },
  {
    shared: { featured: true, sortOrder: 3 },
    'zh-Hans': {
      title: '泰国曼谷+清迈',
      slug: 'thailand-bangkok-chiangmai',
      summary: '感受泰国的热情与宁静，从繁华都市到古城小镇的完美旅程。',
      content: '泰国是东南亚最受欢迎的旅游目的地之一。曼谷的大皇宫、水上市场，清迈的古城寺庙、夜市美食，让您体验泰国的多元魅力。',
      highlights: '- 曼谷大皇宫与玉佛寺\n- 水上市场体验\n- 清迈古城漫步\n- 泰式按摩与SPA\n- 地道泰国美食',
      suitableFor: '家庭出游、休闲度假、文化体验',
      durationSuggestion: '6-8天',
      region: '东南亚',
    },
    'zh-Hant': {
      title: '泰國曼谷+清邁',
      slug: 'thailand-bangkok-chiangmai',
      summary: '感受泰國的熱情與寧靜，從繁華都市到古城小鎮的完美旅程。',
      content: '泰國是東南亞最受歡迎的旅遊目的地之一。曼谷的大皇宮、水上市場，清邁的古城寺廟、夜市美食，讓您體驗泰國的多元魅力。',
      highlights: '- 曼谷大皇宮與玉佛寺\n- 水上市場體驗\n- 清邁古城漫步\n- 泰式按摩與SPA\n- 地道泰國美食',
      suitableFor: '家庭出遊、休閒度假、文化體驗',
      durationSuggestion: '6-8天',
      region: '東南亞',
    },
    en: {
      title: 'Bangkok + Chiang Mai, Thailand',
      slug: 'thailand-bangkok-chiangmai',
      summary: 'Experience the warmth and tranquility of Thailand, from bustling city to ancient town.',
      content: 'Thailand is one of Southeast Asia\'s most popular destinations. Bangkok\'s Grand Palace and floating markets, Chiang Mai\'s ancient temples and night markets offer a diverse Thai experience.',
      highlights: '- Grand Palace & Wat Phra Kaew\n- Floating market experience\n- Chiang Mai old city walk\n- Thai massage & SPA\n- Authentic Thai cuisine',
      suitableFor: 'Family trips, Leisure vacation, Cultural experience',
      durationSuggestion: '6-8 days',
      region: 'Southeast Asia',
    },
  },
];

export const faqData = [
  {
    shared: { category: 'booking-process', sortOrder: 1 },
    'zh-Hans': { question: '定制游和跟团游有什么区别？', answer: '定制游完全根据您的需求和喜好设计行程，时间灵活，不拼团，专属导游和车辆服务。跟团游则是固定行程、固定时间、与其他旅客同行。我们的定制游让您享受更私密、更自由的旅行体验。' },
    'zh-Hant': { question: '定制遊和跟團遊有什麼區別？', answer: '定制遊完全根據您的需求和喜好設計行程，時間靈活，不拼團，專屬導遊和車輛服務。跟團遊則是固定行程、固定時間、與其他旅客同行。我們的定制遊讓您享受更私密、更自由的旅行體驗。' },
    en: { question: 'What is the difference between custom tours and group tours?', answer: 'Custom tours are designed entirely based on your needs and preferences, with flexible timing, private guides and vehicles. Group tours have fixed itineraries and schedules shared with other travelers. Our custom tours offer a more private and flexible travel experience.' },
  },
  {
    shared: { category: 'communication', sortOrder: 2 },
    'zh-Hans': { question: '如何联系你们开始定制旅行？', answer: '您可以通过以下方式联系我们：\n1. WhatsApp: +65 8888 8888\n2. 电话: +65 8888 8888\n3. 邮箱: hello@starvoyage.sg\n4. 网站联系表单\n\n我们会在24小时内回复您的咨询。' },
    'zh-Hant': { question: '如何聯繫你們開始定制旅行？', answer: '您可以通過以下方式聯繫我們：\n1. WhatsApp: +65 8888 8888\n2. 電話: +65 8888 8888\n3. 郵箱: hello@starvoyage.sg\n4. 網站聯繫表單\n\n我們會在24小時內回覆您的諮詢。' },
    en: { question: 'How can I contact you to start planning a custom trip?', answer: 'You can reach us through:\n1. WhatsApp: +65 8888 8888\n2. Phone: +65 8888 8888\n3. Email: hello@starvoyage.sg\n4. Website contact form\n\nWe will respond to your inquiry within 24 hours.' },
  },
  {
    shared: { category: 'senior-friendly', sortOrder: 3 },
    'zh-Hans': { question: '你们的行程适合中老年人吗？', answer: '非常适合！我们专门为中老年旅客设计行程，特点包括：\n- 合理的行程节奏，不赶时间\n- 舒适的住宿安排\n- 便捷的交通接送\n- 考虑饮食习惯和健康需求\n- 全程华语服务\n- 紧急联系保障' },
    'zh-Hant': { question: '你們的行程適合中老年人嗎？', answer: '非常適合！我們專門為中老年旅客設計行程，特點包括：\n- 合理的行程節奏，不趕時間\n- 舒適的住宿安排\n- 便捷的交通接送\n- 考慮飲食習慣和健康需求\n- 全程華語服務\n- 緊急聯繫保障' },
    en: { question: 'Are your tours suitable for senior travelers?', answer: 'Absolutely! We specialize in designing itineraries for senior travelers, featuring:\n- Comfortable pace without rushing\n- Quality accommodation\n- Convenient transportation\n- Dietary and health considerations\n- Chinese-speaking service throughout\n- Emergency contact support' },
  },
  {
    shared: { category: 'preparation', sortOrder: 4 },
    'zh-Hans': { question: '出行前需要准备什么？', answer: '我们会在出行前提供详细的准备清单，通常包括：\n- 护照和签证（我们可协助办理）\n- 旅行保险（强烈建议购买）\n- 适合目的地气候的衣物\n- 常用药品\n- 我们会提供目的地实用信息指南' },
    'zh-Hant': { question: '出行前需要準備什麼？', answer: '我們會在出行前提供詳細的準備清單，通常包括：\n- 護照和簽證（我們可協助辦理）\n- 旅行保險（強烈建議購買）\n- 適合目的地氣候的衣物\n- 常用藥品\n- 我們會提供目的地實用信息指南' },
    en: { question: 'What should I prepare before the trip?', answer: 'We will provide a detailed preparation checklist before your trip, typically including:\n- Passport and visa (we can assist with applications)\n- Travel insurance (strongly recommended)\n- Weather-appropriate clothing\n- Regular medications\n- We provide a destination practical guide' },
  },
  {
    shared: { category: 'cancellation', sortOrder: 5 },
    'zh-Hans': { question: '可以改期或取消吗？', answer: '我们理解计划可能会变化。关于改期和取消政策：\n- 出发前30天以上：可免费改期一次\n- 出发前15-30天：收取少量手续费\n- 出发前15天内：根据实际产生的费用协商\n- 具体政策以合同为准\n\n我们会尽力为您灵活处理。' },
    'zh-Hant': { question: '可以改期或取消嗎？', answer: '我們理解計劃可能會變化。關於改期和取消政策：\n- 出發前30天以上：可免費改期一次\n- 出發前15-30天：收取少量手續費\n- 出發前15天內：根據實際產生的費用協商\n- 具體政策以合同為準\n\n我們會盡力為您靈活處理。' },
    en: { question: 'Can I reschedule or cancel?', answer: 'We understand plans may change. Our rescheduling and cancellation policy:\n- More than 30 days before departure: One free reschedule\n- 15-30 days before departure: Small handling fee\n- Within 15 days: Based on actual costs incurred\n- Specific terms as per contract\n\nWe will try our best to accommodate your needs.' },
  },
];

console.log('Seed data structure defined successfully');
