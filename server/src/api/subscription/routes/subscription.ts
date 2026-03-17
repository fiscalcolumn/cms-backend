/**
 * Subscription routes
 * POST   /subscriptions         → create (public, no auth)
 * GET    /subscriptions         → find (for unsubscribe lookup by email)
 * PUT    /subscriptions/:id     → update (for unsubscribe)
 */

export default {
  routes: [
    {
      method: 'POST',
      path: '/subscriptions',
      handler: 'subscription.create',
      config: { auth: false, policies: [], middlewares: [] },
    },
    {
      method: 'GET',
      path: '/subscriptions',
      handler: 'subscription.find',
      config: { auth: false, policies: [], middlewares: [] },
    },
    {
      method: 'PUT',
      path: '/subscriptions/:id',
      handler: 'subscription.update',
      config: { auth: false, policies: [], middlewares: [] },
    },
  ],
};
