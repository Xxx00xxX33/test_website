import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { isValidLocale, type Locale } from '@/lib/i18n';
import { getLegalPageBySlug } from '@/lib/strapi';

interface PageProps {
  params: Promise<{ locale: string; slug: string }>;
}

const fallbackLegal: Record<string, Record<string, { title: string; content: string }>> = {
  'zh-hans': {
    'privacy-policy': {
      title: '隐私政策',
      content: `<h2>隐私政策</h2>
<p>最后更新日期：2024年1月1日</p>
<h3>1. 信息收集</h3>
<p>我们在您使用我们的服务时可能收集以下信息：</p>
<ul>
<li>个人识别信息（姓名、电子邮件地址、电话号码）</li>
<li>旅行偏好和需求信息</li>
<li>通过网站表单提交的咨询内容</li>
</ul>
<h3>2. 信息使用</h3>
<p>我们收集的信息仅用于：</p>
<ul>
<li>回复您的旅行咨询</li>
<li>为您设计定制旅行方案</li>
<li>改善我们的服务质量</li>
</ul>
<h3>3. 信息保护</h3>
<p>我们采取合理的安全措施保护您的个人信息，不会将您的信息出售给第三方。</p>
<h3>4. 联系我们</h3>
<p>如有任何隐私相关问题，请联系：hello@starvoyage.sg</p>`,
    },
    terms: {
      title: '服务条款',
      content: `<h2>服务条款</h2>
<p>最后更新日期：2024年1月1日</p>
<h3>1. 服务说明</h3>
<p>星途旅行提供定制旅行规划和咨询服务。我们的服务包括但不限于行程设计、住宿预订、交通安排等。</p>
<h3>2. 预订与付款</h3>
<p>具体的预订条款和付款方式将在确认行程时另行约定。</p>
<h3>3. 变更与取消</h3>
<p>出发前30天以上可免费改期一次。具体的变更和取消政策以签订的合同为准。</p>
<h3>4. 责任限制</h3>
<p>我们将尽最大努力确保旅行安全和顺利，但对于不可抗力因素造成的影响不承担责任。</p>`,
    },
    disclaimer: {
      title: '免责声明',
      content: `<h2>免责声明</h2>
<p>本网站上的信息仅供参考。虽然我们努力确保信息的准确性，但不对信息的完整性或准确性做出保证。</p>
<p>旅行目的地的信息可能随时变化，请以实际情况为准。</p>`,
    },
  },
  'zh-hant': {
    'privacy-policy': { title: '隱私政策', content: '<h2>隱私政策</h2><p>我們重視您的隱私。詳細政策請聯繫我們了解。</p>' },
    terms: { title: '服務條款', content: '<h2>服務條款</h2><p>使用我們的服務即表示您同意以下條款。詳細條款請聯繫我們了解。</p>' },
    disclaimer: { title: '免責聲明', content: '<h2>免責聲明</h2><p>本網站信息僅供參考。</p>' },
  },
  en: {
    'privacy-policy': { title: 'Privacy Policy', content: '<h2>Privacy Policy</h2><p>We value your privacy. Please contact us for detailed policy information.</p>' },
    terms: { title: 'Terms of Service', content: '<h2>Terms of Service</h2><p>By using our services, you agree to these terms. Contact us for details.</p>' },
    disclaimer: { title: 'Disclaimer', content: '<h2>Disclaimer</h2><p>Information on this website is for reference only.</p>' },
  },
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const fb = fallbackLegal[locale]?.[slug];
  return {
    title: fb ? `${fb.title} - ${locale === 'en' ? 'StarVoyage Travel' : '星途旅行'}` : 'Legal',
    alternates: {
      canonical: `/${locale}/legal/${slug}`,
      languages: {
        'zh-Hans': `/zh-hans/legal/${slug}`,
        'zh-Hant': `/zh-hant/legal/${slug}`,
        en: `/en/legal/${slug}`,
      },
    },
  };
}

export default async function LegalPage({ params }: PageProps) {
  const { locale, slug } = await params;
  if (!isValidLocale(locale)) return null;
  const typedLocale = locale as Locale;

  const res = await getLegalPageBySlug(typedLocale, slug);
  const page = res?.data?.[0];

  const title = page?.title || fallbackLegal[locale]?.[slug]?.title || slug;
  const content = page?.content || fallbackLegal[locale]?.[slug]?.content || '';
  const backLabel = locale === 'en' ? 'Back to Home' : locale === 'zh-hant' ? '返回首頁' : '返回首页';

  if (!content && !page) notFound();

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link href={`/${locale}`} className="text-primary-600 hover:text-primary-700 text-sm inline-flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            {backLabel}
          </Link>
        </div>
        <div
          className="prose prose-lg max-w-none prose-headings:text-primary-900 prose-a:text-primary-600"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    </section>
  );
}
