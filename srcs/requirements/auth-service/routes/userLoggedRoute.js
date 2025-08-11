export async function statusRoute(fastify) {
  fastify.get('/status', async (request, reply) => {
    // 1. Check for auth token cookie
    const token = request.cookies.auth_token;
    
    if (!token) {
      return reply.send({ 
        authenticated: false,
        requires2FA: process.env.ENABLE_2FA === 'true'
      });
    }

    try {
      // 2. Verify token
      const decoded = await request.jwtVerify(token);
      
      // 3. Return standardized response
      return reply.send({
        authenticated: true,
        requires2FA: process.env.ENABLE_2FA === 'true' && !decoded.is2FAVerified,
        user: {
          id: decoded.userId,  // Matches your JWT claims
          is2FAVerified: decoded.is2FAVerified || false
          // No sensitive data in the token
        }
      });
      
    } catch (err) {
      fastify.log.error('JWT verification failed:', err);
      // 4. Clear invalid token
      reply.clearCookie('auth_token');
      return reply.send({ 
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