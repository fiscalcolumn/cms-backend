/**
 * Subscription routes
 * POST /subscriptions              → create (public)
 * POST /subscriptions/unsubscribe  → unsubscribe one email (public)
 *
 * List and update stay off the public API. Unsubscribe never returns a record.
 */

export default {
  routes: [
    {
      method: 'POST',
      path: '/subscriptions/unsubscribe',
      handler: 'subscription.unsubscribe',
      config: {
        auth: false,
        policies: [],
        middlewares: [
          {
            name: 'global::write-rate-limit',
            config: { name: 'subscriptions', max: 5, intervalMs: 15 * 60 * 1000 },
          },
        ],
      },
    },
    {
      method: 'POST',
      path: '/subscriptions',
      handler: 'subscription.create',
      config: {
        auth: false,
        policies: [],
        middlewares: [
          {
            name: 'global::write-rate-limit',
            config: { name: 'subscriptions', max: 5, intervalMs: 15 * 60 * 1000 },
          },
        ],
      },
    },
  ],
};
