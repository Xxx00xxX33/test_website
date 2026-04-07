import type { StrapiApp } from '@strapi/strapi/admin';
import zhHansTranslations from './extensions/translations/zh-Hans.json';

const customTranslations = {
  'content-manager.form.Input.label.siteName': '网站名称',
  'content-manager.form.Input.label.siteTagline': '网站标语',
  'content-manager.form.Input.label.logo': '网站 Logo',
  'content-manager.form.Input.label.favicon': '网站图标',
  'content-manager.form.Input.label.phone': '联系电话',
  'content-manager.form.Input.label.whatsapp': 'WhatsApp',
  'content-manager.form.Input.label.address': '联系地址',
  'content-manager.form.Input.label.socialLinks': '社交链接',
  'content-manager.form.Input.label.defaultSeo': '默认 SEO',
  'content-manager.form.Input.label.themePalette': '主题配色',
  'content-manager.form.Input.label.primaryColor': '主品牌色',
  'content-manager.form.Input.label.warmColor': '暖色背景',
  'content-manager.form.Input.label.accentColor': '强调色',
  'content-manager.form.Input.label.footerText': '页脚文案',
  'content-manager.form.Input.label.copyrightText': '版权文案',
  'content-manager.form.Input.label.contactPage': '联系页面',
};

export default {
  config: {
    locales: ['zh-Hans'],
    translations: {
      'zh-Hans': {
        ...zhHansTranslations,
        ...customTranslations,
      },
    },
  },
  register(app: StrapiApp) {
    app.customFields.register({
      name: 'color',
      type: 'string',
      intlLabel: {
        id: 'global.customFields.color.label',
        defaultMessage: '颜色',
      },
      intlDescription: {
        id: 'global.customFields.color.description',
        defaultMessage: '通过取色器或 HEX 值设置颜色。',
      },
      components: {
        Input: async () =>
          import('./components/ColorFieldInput').then((module) => ({
            default: module.default,
          })),
      },
    });
  },
  bootstrap(app: StrapiApp) {
    void app;
  },
};
