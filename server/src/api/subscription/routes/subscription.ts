/**
 * Subscription routes
 */

export default {
  routes: [
    {
      method: 'POST',
      path: '/subscriptions',
      handler: 'subscription.create',
      config: {
        auth: false,
        policies: [],
        middlewares: [],
      },
    },
  ],
};
