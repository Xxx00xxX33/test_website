import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'StarVoyage Travel | 星途旅行',
  description: 'Custom travel experiences for Singaporean Chinese families',
  alternates: {
    languages: {
      'zh-Hans': '/zh-hans',
      'zh-Hant': '/zh-hant',
      en: '/en',
      'x-default': '/zh-hans',
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
