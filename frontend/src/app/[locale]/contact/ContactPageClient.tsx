'use client';

import { useState } from 'react';
import type { Locale } from '@/lib/i18n';

interface ContactPageClientProps {
  locale: Locale;
  title: string;
  description: string;
  formTitle: string;
  formDescription?: string;
  formSuccessMessage: string;
  phone?: string;
  whatsapp?: string;
  email?: string;
  address?: string;
  mapEmbedUrl?: string;
}

interface ContactLabels {
  name: string;
  email: string;
  phone: string;
  destination: string;
  travelers: string;
  message: string;
  submit: string;
  contactInfo: string;
  phoneShort: string;
  emailShort: string;
  whatsappShort: string;
  orContact: string;
  address: string;
  hours: string;
  hoursValue: string;
}

const contactLabels: Record<Locale, ContactLabels> = {
  'zh-hans': {
    name: '您的姓名',
    email: '电子邮箱',
    phone: '联系电话',
    destination: '感兴趣的目的地',
    travelers: '出行人数',
    message: '您的旅行想法或需求',
    submit: '提交咨询',
    contactInfo: '联系方式',
    phoneShort: '电话',
    emailShort: '邮箱',
    whatsappShort: 'WhatsApp',
    orContact: '或直接联系我们',
    address: '地址',
    hours: '服务时间',
    hoursValue: '周一至周六 9:00 - 18:00',
  },
  'zh-hant': {
    name: '您的姓名',
    email: '電子郵箱',
    phone: '聯繫電話',
    destination: '感興趣的目的地',
    travelers: '出行人數',
    message: '您的旅行想法或需求',
    submit: '提交諮詢',
    contactInfo: '聯繫方式',
    phoneShort: '電話',
    emailShort: '電郵',
    whatsappShort: 'WhatsApp',
    orContact: '或直接聯繫我們',
    address: '地址',
    hours: '服務時間',
    hoursValue: '週一至週六 9:00 - 18:00',
  },
  en: {
    name: 'Your Name',
    email: 'Email Address',
    phone: 'Phone Number',
    destination: 'Interested Destination',
    travelers: 'Number of Travelers',
    message: 'Your travel ideas or requirements',
    submit: 'Submit Inquiry',
    contactInfo: 'Contact Information',
    phoneShort: 'Phone',
    emailShort: 'Email',
    whatsappShort: 'WhatsApp',
    orContact: 'Or contact us directly',
    address: 'Address',
    hours: 'Business Hours',
    hoursValue: 'Mon - Sat 9:00 AM - 6:00 PM',
  },
};

function getWhatsappHref(whatsapp?: string): string | null {
  if (!whatsapp) {
    return null;
  }

  const normalized = whatsapp.replace(/\D/g, '');
  return normalized ? `https://wa.me/${normalized}` : null;
}

export default function ContactPageClient({
  locale,
  title,
  description,
  formTitle,
  formDescription,
  formSuccessMessage,
  phone,
  whatsapp,
  email,
  address,
  mapEmbedUrl,
}: ContactPageClientProps) {
  const labels = contactLabels[locale];
  const [submitted, setSubmitted] = useState(false);
  const whatsappHref = getWhatsappHref(whatsapp);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <section className="relative py-20 lg:py-28 bg-gradient-to-br from-primary-800 to-primary-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">{title}</h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">{description}</p>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
            <div className="lg:col-span-3">
              <h2 className="text-2xl font-bold text-primary-900 mb-3">{formTitle}</h2>
              {formDescription ? (
                <p className="text-gray-600 leading-relaxed mb-6">{formDescription}</p>
              ) : null}

              {submitted ? (
                <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
                  <svg className="w-16 h-16 text-green-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-lg text-green-800 font-medium">{formSuccessMessage}</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">{labels.name} *</label>
                      <input type="text" required className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-colors" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">{labels.email} *</label>
                      <input type="email" required className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-colors" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">{labels.phone}</label>
                      <input type="tel" className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-colors" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">{labels.travelers}</label>
                      <input type="number" min="1" className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-colors" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">{labels.destination}</label>
                    <input type="text" className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-colors" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">{labels.message} *</label>
                    <textarea required rows={5} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-colors resize-none" />
                  </div>
                  <button type="submit" className="w-full sm:w-auto px-8 py-3 bg-primary-500 text-white rounded-xl font-medium hover:bg-primary-600 transition-colors">
                    {labels.submit}
                  </button>
                </form>
              )}
            </div>

            <div className="lg:col-span-2">
              <div className="bg-warm-50 rounded-2xl p-8 space-y-8">
                <div>
                  <h3 className="text-xl font-bold text-primary-900 mb-2">{labels.orContact}</h3>
                  <p className="text-sm text-gray-500">{labels.contactInfo}</p>
                </div>

                <div className="space-y-6">
                  {whatsapp && whatsappHref ? (
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center shrink-0">
                        <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.99c-.003 5.45-4.437 9.884-9.885 9.884" />
                        </svg>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-500">{labels.whatsappShort}</div>
                        <a href={whatsappHref} target="_blank" rel="noreferrer" className="text-primary-900 font-medium hover:text-primary-700 transition-colors">
                          {whatsapp}
                        </a>
                      </div>
                    </div>
                  ) : null}

                  {phone ? (
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center shrink-0">
                        <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498A1 1 0 0121 15.72V19a2 2 0 01-2 2h-1C9.163 21 3 14.837 3 7V5z" />
                        </svg>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-500">{labels.phoneShort}</div>
                        <a href={`tel:${phone}`} className="text-primary-900 font-medium hover:text-primary-700 transition-colors">
                          {phone}
                        </a>
                      </div>
                    </div>
                  ) : null}

                  {email ? (
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center shrink-0">
                        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12H8m8 0l-2.5 2.5M16 12l-2.5-2.5M4 6h16v12H4z" />
                        </svg>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-500">{labels.emailShort}</div>
                        <a href={`mailto:${email}`} className="text-primary-900 font-medium hover:text-primary-700 transition-colors break-all">
                          {email}
                        </a>
                      </div>
                    </div>
                  ) : null}

                  {address ? (
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center shrink-0">
                        <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0L6.343 16.657A8 8 0 1117.657 16.657z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-500">{labels.address}</div>
                        <div className="text-primary-900 font-medium leading-relaxed">{address}</div>
                      </div>
                    </div>
                  ) : null}

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center shrink-0">
                      <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-500">{labels.hours}</div>
                      <div className="text-primary-900 font-medium">{labels.hoursValue}</div>
                    </div>
                  </div>
                </div>

                {mapEmbedUrl ? (
                  <div className="overflow-hidden rounded-xl border border-warm-200 bg-white">
                    <iframe
                      title={`${title} map`}
                      src={mapEmbedUrl}
                      className="w-full h-64 border-0"
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
