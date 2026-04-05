import type { StrapiBlock } from '@/lib/strapi';
import { getStrapiMediaUrl } from '@/lib/strapi';

interface Column {
  title?: string;
  content?: string;
  image?: { url: string; alternativeText?: string };
}

export default function MultiColumn({ data }: { data: StrapiBlock }) {
  const heading = data.heading as string;
  const subtitle = data.subtitle as string;
  const columns = (data.columns as Column[]) || [];
  const columnCount = (data.columnCount as number) || columns.length || 3;

  const gridCols = columnCount <= 2 ? 'lg:grid-cols-2' : columnCount === 3 ? 'lg:grid-cols-3' : 'lg:grid-cols-4';

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {(heading || subtitle) && (
          <div className="text-center mb-12">
            {heading && <h2 className="text-3xl lg:text-4xl font-bold text-primary-900 mb-4">{heading}</h2>}
            {subtitle && <p className="text-lg text-gray-600 max-w-2xl mx-auto">{subtitle}</p>}
          </div>
        )}

        <div className={`grid grid-cols-1 sm:grid-cols-2 ${gridCols} gap-8`}>
          {columns.map((col, i) => (
            <div key={i} className="text-center">
              {col.image?.url && (
                <div className="rounded-xl overflow-hidden mb-4 shadow-sm">
                  <img src={getStrapiMediaUrl(col.image.url)} alt={col.image.alternativeText || col.title || ''} className="w-full h-auto object-cover" />
                </div>
              )}
              {col.title && <h3 className="text-xl font-semibold text-primary-900 mb-3">{col.title}</h3>}
              {col.content && <p className="text-gray-600 leading-relaxed">{col.content}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
