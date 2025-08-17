export async function statusRoute(fastify) {
  fastify.get('/status', async (request, reply) => {
    try {
      // 1. Verify JWT exists and is valid
      const token = request.cookies.auth_token;
      if (!token) throw new Error('Missing token');
      
      const decoded = await request.jwtVerify(token);
      if (!decoded.userId) throw new Error('Invalid payload');

      // 2. Calculate auth states
      const needs2FA = process.env.ENABLE_2FA === 'true' && !decoded.is2FAVerified;
      const fullyAuthed = !needs2FA;

      // 3. Return status (NEVER clear cookie during 2FA flow)
      return reply.send({
        authenticated: fullyAuthed,
        requires2FA: needs2FA,
        user: {
          id: decoded.userId,
          is2FAVerified: decoded.is2FAVerified || false
        }
      });

    } catch (error) {
      // 4. Only clear cookie for INVALID tokens (not 2FA cases)
      if (error.message.includes('Invalid') && request.cookies.auth_token) {
        reply.clearCookie('auth_token');
      }
      
      return reply.code(401).send({
        authenticated: false,
        requires2FA: process.env.ENABLE_2FA === 'true'
      });
    }
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
