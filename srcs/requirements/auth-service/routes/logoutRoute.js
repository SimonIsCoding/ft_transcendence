import { deleteSession } from './sessionUtils.js';

export async function logoutRoute(app) {
  app.post('/logout', async (request, reply) => {
    try {
      // 1. Verify JWT and extract session info
      const token = request.cookies.auth_token;
      if (token) {
        const decoded = await request.jwtVerify(token);
        if (decoded.userId && decoded.sessionToken) {
          // 2. Delete this session from DB
          deleteSession(decoded.userId, decoded.sessionToken);
        }
      }

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
