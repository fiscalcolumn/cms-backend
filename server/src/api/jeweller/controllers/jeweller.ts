import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::jeweller.jeweller', ({ strapi }) => ({

  /**
   * GET /jewellers/for-rate-page?metal=gold&state=uttar-pradesh&city=gorakhpur
   *
   * Returns national jewellers + state-scoped jewellers for the given state
   * + city-scoped jewellers for the given city, all filtered to only those
   * that have a URL for the requested metal.
   */
  async forRatePage(ctx) {
    const { metal, city, state } = ctx.query as Record<string, string>;

    if (!metal) {
      return ctx.badRequest('Query parameter "metal" is required (e.g. ?metal=gold)');
    }

    const orConditions: object[] = [{ scope: 'national' }];

    if (state) {
      orConditions.push({ scope: 'state', states: { slug: state } });
    }

    if (city) {
      orConditions.push({ scope: 'city', cities: { slug: city } });
    }

    const jewellers = await strapi.documents('api::jeweller.jeweller').findMany({
      filters: {
        $and: [
          { isActive: { $eq: true } },
          { $or: orConditions },
          { metalUrls: { metal: { slug: { $eq: metal } } } },
          { publishedAt: { $notNull: true } },
        ],
      } as any,
      populate: {
        logo: true,
        metalUrls: {
          populate: { metal: true },
        },
        states: { fields: ['name', 'slug'] },
        cities: { fields: ['name', 'slug'] },
      },
    });

    // Return only the metalUrl entry matching the requested metal
    const sanitized = jewellers.map((j) => ({
      ...j,
      metalUrls: (j.metalUrls as any[]).filter(
        (mu) => mu.metal?.slug === metal
      ),
    }));

    return { data: sanitized };
  },

}));
