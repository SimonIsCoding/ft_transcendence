import db from '../src/database.js';

export async function currentUserInfoRoute(fastify)
{
	fastify.get('/info', { preHandler: [fastify.auth] }, async (request, reply) => {
		const userId = request.user?.id;

		if (!userId)
		return reply.status(401).send({ error: 'Not authenticated' });

		const stmt = db.prepare('SELECT id, login, mail, profile_picture FROM users WHERE id = ?');
		const user = stmt.get(userId);

		if (!user)
		return reply.status(404).send({ error: 'User not found' });

		return reply.send(user);
	});
}

export async function statusRoute(fastify)
{
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

// // useless for the moment - but useful when I will add a profile page
// export async function userLoggedRoutes(app)
// {
// 	app.get('/me', { preHandler: [app.auth] }, async (request, reply) => {
// 		return {
// 			success: true,
// 			user: {
// 				id: request.user.id,
// 				login: request.user.login,
// 				email: request.user.mail,
// 				profile_picture: request.user.profile_picture,
// 				token: request.user.token,
// 			}
// 		};
// 	});
// }
