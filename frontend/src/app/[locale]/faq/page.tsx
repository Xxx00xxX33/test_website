'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import type { Locale } from '@/lib/i18n';

interface FaqItem {
  id: number;
  question: string;
  answer: string;
  category: string;
}

const pageMeta: Record<string, { heading: string; subtitle: string }> = {
  'zh-hans': { heading: '常见问题', subtitle: '关于我们服务的常见问题解答，如有其他疑问请随时联系我们' },
  'zh-hant': { heading: '常見問題', subtitle: '關於我們服務的常見問題解答' },
  en: { heading: 'Frequently Asked Questions', subtitle: 'Common questions about our services. Feel free to contact us for more.' },
};

const fallbackFaqs: Record<string, FaqItem[]> = {
  'zh-hans': [
    { id: 1, question: '定制游和跟团游有什么区别？', answer: '定制游完全根据您的需求和喜好设计行程，时间灵活，不拼团，专属导游和车辆服务。', category: 'booking' },
    { id: 2, question: '如何联系你们开始定制旅行？', answer: '您可以通过WhatsApp (+65 8888 8888)、电话、邮箱或网站联系表单联系我们。', category: 'communication' },
    { id: 3, question: '你们的行程适合中老年人吗？', answer: '非常适合！我们专门为中老年旅客设计行程，合理的节奏、舒适的住宿、便捷的交通。', category: 'senior' },
    { id: 4, question: '出行前需要准备什么？', answer: '我们会提供详细的准备清单，包括护照签证、旅行保险、衣物和药品建议等。', category: 'preparation' },
    { id: 5, question: '可以改期或取消吗？', answer: '出发前30天以上可免费改期一次，具体政策以合同为准。', category: 'cancellation' },
  ],
  'zh-hant': [
    { id: 1, question: '定制遊和跟團遊有什麼區別？', answer: '定制遊完全根據您的需求和喜好設計行程，時間靈活，不拼團。', category: 'booking' },
    { id: 2, question: '如何聯繫你們？', answer: '您可以通過WhatsApp、電話、郵箱或網站聯繫表單聯繫我們。', category: 'communication' },
    { id: 3, question: '適合中老年人嗎？', answer: '非常適合！我們專門為中老年旅客設計行程。', category: 'senior' },
    { id: 4, question: '出行前需要準備什麼？', answer: '我們會提供詳細的準備清單。', category: 'preparation' },
    { id: 5, question: '可以改期或取消嗎？', answer: '出發前30天以上可免費改期一次。', category: 'cancellation' },
  ],
  en: [
    { id: 1, question: 'What is the difference between custom and group tours?', answer: 'Custom tours are designed entirely based on your needs with flexible timing and private service.', category: 'booking' },
    { id: 2, question: 'How can I contact you?', answer: 'You can reach us via WhatsApp, phone, email, or our website contact form.', category: 'communication' },
    { id: 3, question: 'Are your tours suitable for seniors?', answer: 'Absolutely! We specialize in comfortable itineraries for senior travelers.', category: 'senior' },
    { id: 4, question: 'What should I prepare?', answer: 'We provide a detailed preparation checklist before your trip.', category: 'preparation' },
    { id: 5, question: 'Can I reschedule or cancel?', answer: 'One free reschedule is available more than 30 days before departure.', category: 'cancellation' },
  ],
};

export default function FaqPage() {
  const params = useParams();
  const locale = (params.locale as Locale) || 'zh-hans';
  const meta = pageMeta[locale] || pageMeta['zh-hans'];
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [faqs, setFaqs] = useState<FaqItem[]>(fallbackFaqs[locale] || fallbackFaqs['zh-hans']);

  useEffect(() => {
    const strapiLocaleMap: Record<string, string> = { 'zh-hans': 'zh-Hans', 'zh-hant': 'zh-Hant', en: 'en' };
    const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
    fetch(`${strapiUrl}/api/faqs?locale=${strapiLocaleMap[locale]}&sort=sortOrder:asc&pagination[pageSize]=100`)
      .then((r) => r.ok ? r.json() : null)
      .then((data) => {
        if (data?.data?.length > 0) setFaqs(data.data);
      })
      .catch(() => {});
  }, [locale]);

  return (
    <>
      <section className="relative py-20 lg:py-28 bg-gradient-to-br from-primary-800 to-primary-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">{meta.heading}</h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">{meta.subtitle}</p>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={faq.id} className="border border-gray-200 rounded-xl overflow-hidden">
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-gray-50 transition-colors"
                >
                  <span className="font-medium text-primary-900 pr-4">{faq.question}</span>
                  <svg
                    className={`w-5 h-5 text-gray-400 shrink-0 transition-transform ${openIndex === i ? 'rotate-180' : ''}`}
                    fill="none" stroke="currentColor" viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {openIndex === i && (
                  <div className="px-6 pb-5 text-gray-600 leading-relaxed whitespace-pre-line">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
