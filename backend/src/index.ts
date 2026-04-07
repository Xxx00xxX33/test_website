import type { Core } from '@strapi/strapi';

export default {
  register({ strapi }: { strapi: Core.Strapi }) {
    strapi.customFields.register({
      name: 'color',
      type: 'string',
      inputSize: {
        default: 6,
        isResizable: true,
      },
    });
  },

  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    // Set up public permissions for content API
    const publicRole = await strapi
      .query('plugin::users-permissions.role')
      .findOne({ where: { type: 'public' } });

    if (publicRole) {
      const permissions = await strapi
        .query('plugin::users-permissions.permission')
        .findMany({ where: { role: publicRole.id } });

      const existingActions = permissions.map((p: any) => p.action);

      const publicActions = [
        'api::site-setting.site-setting.find',
        'api::navigation.navigation.find',
        'api::home-page.home-page.find',
        'api::about-page.about-page.find',
        'api::services-page.services-page.find',
        'api::destination.destination.find',
        'api::destination.destination.findOne',
        'api::faq.faq.find',
        'api::faq.faq.findOne',
        'api::testimonial.testimonial.find',
        'api::testimonial.testimonial.findOne',
        'api::contact-page.contact-page.find',
        'api::legal-page.legal-page.find',
        'api::legal-page.legal-page.findOne',
      ];

      for (const action of publicActions) {
        if (!existingActions.includes(action)) {
          await strapi.query('plugin::users-permissions.permission').create({
            data: {
              action,
              role: publicRole.id,
            },
          });
        }
      }

      console.log('Public API permissions configured');
    }
  },
};
