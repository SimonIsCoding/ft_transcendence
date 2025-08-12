export async function statusRoute(fastify) {
  fastify.get('/status', { 
    preHandler: [fastify.auth], 
    // Override the default 401 behavior
    errorHandler: (error, request, reply) => {
      reply.send({ 
        authenticated: false,
        requires2FA: process.env.ENABLE_2FA === 'true' 
      });
    }
  }, async (request, reply) => {
    // Only executed if auth succeeds
    reply.send({
      authenticated: true,
      requires2FA: process.env.ENABLE_2FA === 'true' && 
                 !request.user.is2FAVerified,
      user: request.user
    });
  });
}

// Updated userLoggedRoutes
export async function userLoggedRoutes(app) {
  app.get('/me', { preHandler: [app.auth] }, async (request, reply) => {
    try {
      const user = await app.db.get(
        'SELECT id, login, mail as email, profile_picture FROM users WHERE id = ?',
        [request.user.id]
      );
      
      return {
        success: true,
        user: {
          ...user,
          is_2fa_verified: request.user.is_2fa_verified || false
        }
      };
    } catch (err) {
      app.log.error(err);
      return reply.code(500).send({ success: false });
    }
  });
}