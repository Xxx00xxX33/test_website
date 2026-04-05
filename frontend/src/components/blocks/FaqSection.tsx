'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { StrapiBlock } from '@/lib/strapi';
import type { Locale } from '@/lib/i18n';

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqSectionProps {
  data: StrapiBlock;
  locale: Locale;
}

const moreLabels: Record<Locale, string> = {
  'zh-hans': '查看更多常见问题',
  'zh-hant': '查看更多常見問題',
  en: 'View All FAQs',
};

export default function FaqSection({ data, locale }: FaqSectionProps) {
  const heading = data.heading as string;
  const subtitle = data.subtitle as string;
  const items = (data.items as FaqItem[]) || [];
  const showMoreLink = data.showMoreLink as boolean;

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 lg:mb-16">
          {heading && (
            <h2 className="text-3xl lg:text-4xl font-bold text-primary-900 mb-4">{heading}</h2>
          )}
          {subtitle && (
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">{subtitle}</p>
          )}
        </div>

        <div className="space-y-4">
          {items.map((item, i) => (
            <div key={i} className="border border-gray-200 rounded-xl overflow-hidden">
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-gray-50 transition-colors"
              >
                <span className="font-medium text-primary-900 pr-4">{item.question}</span>
                <svg
                  className={`w-5 h-5 text-gray-400 shrink-0 transition-transform ${openIndex === i ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openIndex === i && (
                <div className="px-6 pb-5 text-gray-600 leading-relaxed whitespace-pre-line">
                  {item.answer}
                </div>
              )}
            </div>
          ))}
        </div>

        {showMoreLink && (
          <div className="text-center mt-10">
            <Link
              href={`/${locale}/faq`}
              className="inline-flex items-center gap-2 text-primary-600 font-medium hover:text-primary-700 transition-colors"
            >
              {moreLabels[locale]}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
