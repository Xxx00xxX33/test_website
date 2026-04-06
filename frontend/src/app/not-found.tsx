'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const labels: Record<string, { message: string; goHome: string }> = {
  'zh-hans': {
    message: '页面未找到',
    goHome: '返回首页',
  },
  'zh-hant': {
    message: '頁面未找到',
    goHome: '返回首頁',
  },
  en: {
    message: 'Page Not Found',
    goHome: 'Go Home',
  },
};

function getLocaleFromPathname(pathname: string): string {
  const segment = pathname.split('/').filter(Boolean)[0];
  return segment && labels[segment] ? segment : 'zh-hans';
}

export default function NotFound() {
  const pathname = usePathname();
  const locale = getLocaleFromPathname(pathname || '/');
  const l = labels[locale];

  return (
    <section className="py-24 lg:py-32 bg-white text-center">
      <div className="max-w-2xl mx-auto px-4">
        <h1 className="text-6xl font-bold text-primary-300 mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-8">{l.message}</p>
        <Link
          href={`/${locale}`}
          className="inline-flex items-center gap-2 px-6 py-3 bg-primary-500 text-white rounded-xl font-medium hover:bg-primary-600 transition-colors"
        >
          {l.goHome}
        </Link>
      </div>
    </section>
  );
}
