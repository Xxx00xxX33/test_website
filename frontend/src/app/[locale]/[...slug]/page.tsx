import { notFound } from 'next/navigation';

interface PageProps {
  params: Promise<{ locale: string; slug: string[] }>;
}

export default async function LocaleCatchAllPage({ params }: PageProps) {
  await params;
  notFound();
}
