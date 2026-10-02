/**
 * users-permissions throws ForbiddenError from a second copy of @strapi/utils.
 * The core error middleware checks instanceof against a different copy, so a
 * denied request becomes HTTP 500. Map those auth errors back to 401 and 403.
 */
export default () => {
  return async (ctx, next) => {
    try {
      await next();
    } catch (error) {
      const err = error as { status?: number; statusCode?: number; name?: string };
      const status = err?.status ?? err?.statusCode;
      const name = err?.name;

      if (name === 'ForbiddenError' || status === 403) {
        ctx.status = 403;
        ctx.body = {
          data: null,
          error: {
            status: 403,
            name: 'ForbiddenError',
            message: 'Forbidden',
          },
        };
        return;
      }

      if (name === 'UnauthorizedError' || status === 401) {
        ctx.status = 401;
        ctx.body = {
          data: null,
          error: {
            status: 401,
            name: 'UnauthorizedError',
            message: 'Unauthorized',
          },
        };
        return;
      }

      throw error;
    }
  };
};
