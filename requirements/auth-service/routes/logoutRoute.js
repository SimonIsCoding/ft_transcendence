import { deleteSession } from '../utils/sessionTokens.js';

export async function logoutRoute(app) {
  app.delete('/me/sessions', { preHandler: app.auth }, async (request, reply) => {
    try {
	  const userId = request.user.id;
	  const sessionToken = request.user.sessionToken;
          // 2. Delete this session from DB
      deleteSession(userId, sessionToken);


      // 3. Clear cookies (auth + 2FA)
      ['auth_token', 'auth_phase'].forEach(cookieName => {
        reply.clearCookie(cookieName, {
          httpOnly: true,
          secure: true,
          sameSite: 'None',
          path: '/'
        });
      });

      return reply.send({
        success: true,
        message: 'Logged out successfully'
      });

    } catch (err) {
      // Fallback: still clear cookies even if token invalid
      ['auth_token', 'auth_phase'].forEach(cookieName => {
        reply.clearCookie(cookieName, {
          httpOnly: true,
          secure: true,
          sameSite: 'None',
          path: '/'
        });
      });

      return reply.send({
        success: true,
        message: 'Logged out (token was invalid or expired)'
      });
    }
  });
}
