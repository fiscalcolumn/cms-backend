/**
 * Subscription controller
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::subscription.subscription', ({ strapi }) => ({
  async create(ctx) {
    const { email, source } = ctx.request.body?.data || {};

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return ctx.badRequest('A valid email address is required.');
    }

    // Check for existing subscription
    const existing = await strapi.db.query('api::subscription.subscription').findOne({
      where: { email: email.toLowerCase().trim() },
    });

    if (existing) {
      if (existing.subscribed) {
        return ctx.send({ message: 'already_subscribed' });
      }
      // Re-subscribe
      await strapi.db.query('api::subscription.subscription').update({
        where: { id: existing.id },
        data: { subscribed: true, subscribedAt: new Date(), unsubscribedAt: null },
      });
      return ctx.send({ message: 'resubscribed' });
    }

    await strapi.db.query('api::subscription.subscription').create({
      data: {
        email: email.toLowerCase().trim(),
        subscribed: true,
        subscribedAt: new Date(),
        source: source || 'footer',
      },
    });

    return ctx.send({ message: 'subscribed' });
  },

  /**
   * POST /api/subscriptions/unsubscribe
   * Body: { data: { email } }
   * Looks up one address and flips it off. The response is a status message only.
   */
  async unsubscribe(ctx) {
    const { email } = ctx.request.body?.data || {};

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return ctx.badRequest('A valid email address is required.');
    }

    const existing = await strapi.db.query('api::subscription.subscription').findOne({
      where: { email: email.toLowerCase().trim() },
    });

    if (!existing) {
      return ctx.send({ message: 'not_found' });
    }

    if (!existing.subscribed) {
      return ctx.send({ message: 'already_unsubscribed' });
    }

    await strapi.db.query('api::subscription.subscription').update({
      where: { id: existing.id },
      data: { subscribed: false, unsubscribedAt: new Date() },
    });

    return ctx.send({ message: 'unsubscribed' });
  },
}));
