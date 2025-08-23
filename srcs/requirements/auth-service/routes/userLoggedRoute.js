import {verifyAndUpdateSession} from '../utils/sessionTokens.js';

export async function statusRoute(fastify)
{
  fastify.get('/status', async (request, reply) => {
    try {
      // 1. Verify JWT exists and is valid
      const token = request.cookies.auth_token;
      if (!token) throw new Error('Missing token');
      
	  console.log(`token = ${token}`);
      const decoded = await request.jwtVerify(token);
	  console.log(`decoded = ${decoded}`);
	  console.log(`decoded.userId = ${decoded.userId}`);
	  console.log(`decoded.sessionToken = ${decoded.sessionToken}`);
      if (!decoded.userId || !decoded.sessionToken)
		throw new Error('Invalid payload');

	  // 3. Verify and if exists update session. if not throw error
      verifyAndUpdateSession(decoded.userId, decoded.sessionToken);

      // 4. Calculate auth states
      const needs2FA = process.env.ENABLE_2FA === 'true' && !decoded.is2FAVerified;
      const fullyAuthed = !needs2FA;

      // 5. Return status (NEVER clear cookie during 2FA flow)
      return reply.send({
        authenticated: fullyAuthed,
        requires2FA: needs2FA,
        user: {
          id: decoded.userId,
          is2FAVerified: decoded.is2FAVerified || false
        }
      });

    } catch (error) {
      // 6. Only clear cookie for INVALID tokens (not 2FA cases)
      if (request.cookies.auth_token) {
        reply.clearCookie('auth_token');
      }
      
      return reply.code(401).send({
        authenticated: false,
        requires2FA: process.env.ENABLE_2FA === 'true',
		message: error.message
      });
    }
  });
}