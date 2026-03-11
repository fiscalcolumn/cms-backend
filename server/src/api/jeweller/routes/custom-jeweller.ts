export default {
  routes: [
    {
      method: 'GET',
      path: '/jewellers/for-rate-page',
      handler: 'jeweller.forRatePage',
      config: {
        auth: false,
        description: 'Returns jewellers relevant to a rate page, filtered by metal and optionally by city/state',
      },
    },
  ],
};
