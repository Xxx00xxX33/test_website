import type { StrapiBlock } from '@/lib/strapi';

export default function RichTextBlock({ data }: { data: StrapiBlock }) {
  const content = data.content as string;

  if (!content) return null;

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className="prose prose-lg max-w-none prose-headings:text-primary-900 prose-a:text-primary-600 prose-a:no-underline hover:prose-a:underline"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    </section>
  );
}
