import type { Core } from '@strapi/strapi';

const PUBLIC_ACTIONS = [
  'api::header.header.find',
  'api::header.header.findOne',
  'api::footer.footer.find',
  'api::footer.footer.findOne',
  'api::homepage-section.homepage-section.find',
  'api::homepage-section.homepage-section.findOne',
  'api::article.article.find',
  'api::article.article.findOne',
  'api::category.category.find',
  'api::category.category.findOne',
  'api::tag.tag.find',
  'api::tag.tag.findOne',
  'api::tag-group.tag-group.find',
  'api::tag-group.tag-group.findOne',
  'api::popular-tag.popular-tag.find',
  'api::author.author.find',
  'api::author.author.findOne',
  'api::stock.stock.find',
  'api::stock.stock.findOne',
  'api::glossary.glossary.find',
  'api::glossary.glossary.findOne',
  'api::calculator.calculator.find',
  'api::calculator.calculator.findOne',
  'api::daily-rate.daily-rate.find',
  'api::daily-rate.daily-rate.findOne',
  'api::jeweller.jeweller.find',
  'api::jeweller.jeweller.findOne',
  'api::static-page.static-page.find',
  'api::static-page.static-page.findOne',
  'api::advertisement.advertisement.find',
  'api::metal.metal.find',
  'api::metal.metal.findOne',
  'api::metal-purity.metal-purity.find',
  'api::metal-purity.metal-purity.findOne',
  'api::unit-measure.unit-measure.find',
  'api::unit-measure.unit-measure.findOne',
  'api::state.state.find',
  'api::state.state.findOne',
  'api::city.city.find',
  'api::city.city.findOne',
  'api::subscription.subscription.create',
  'api::metal-tax.metal-tax.find',
  'api::metal-tax.metal-tax.findOne',
];

export default {
  register(/* { strapi }: { strapi: Core.Strapi } */) {},

  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    try {
      const publicRole = await strapi
        .query('plugin::users-permissions.role')
        .findOne({ where: { type: 'public' } });

      if (!publicRole) return;

      const existing = await strapi
        .query('plugin::users-permissions.permission')
        .findMany({ where: { role: publicRole.id } });

      const existingActions = new Set(existing.map((p: any) => p.action));

      for (const action of PUBLIC_ACTIONS) {
        const match = existing.find((p: any) => p.action === action);

        if (match && !match.enabled) {
          await strapi
            .query('plugin::users-permissions.permission')
            .update({ where: { id: match.id }, data: { enabled: true } });
        }

        if (!existingActions.has(action)) {
          await strapi
            .query('plugin::users-permissions.permission')
            .create({ data: { action, role: publicRole.id, enabled: true } });
        }
      }
    } catch (error) {
      console.error('Error setting up public permissions:', error);
    }
  },
};
