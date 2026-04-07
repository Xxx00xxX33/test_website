import type { StrapiApp } from '@strapi/strapi/admin';
import zhHansTranslations from './extensions/translations/zh-Hans.json';

export default {
  config: {
    locales: ['zh-Hans'],
    translations: {
      'zh-Hans': {
        ...zhHansTranslations,
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
