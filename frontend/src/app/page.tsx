import { redirect } from 'next/navigation';

export default function RootPage() {
  // This page should not be reached due to middleware redirect
  // But as a fallback, redirect to default locale
  redirect('/zh-hans');
}
