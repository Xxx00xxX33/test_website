import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="py-24 lg:py-32 bg-white text-center">
      <div className="max-w-2xl mx-auto px-4">
        <h1 className="text-6xl font-bold text-primary-300 mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-8">
          页面未找到 / Page Not Found
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-primary-500 text-white rounded-xl font-medium hover:bg-primary-600 transition-colors"
        >
          返回首页 / Go Home
        </Link>
      </div>
    </section>
  );
}
