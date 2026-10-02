/**
 * Custom article routes
 */

export default {
  routes: [
    {
      method: 'POST',
      path: '/articles/:id/view',
      handler: 'article.incrementView',
      config: {
        auth: false,
        policies: [],
        middlewares: [
          {
            name: 'global::write-rate-limit',
            config: { name: 'content-views', max: 60, intervalMs: 60 * 1000 },
          },
        ],
      },
    },
  ],
};

