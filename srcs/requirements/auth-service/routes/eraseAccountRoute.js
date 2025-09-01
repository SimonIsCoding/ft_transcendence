import db from '../src/database.js';
// import { deleteAllSessions } from '../utils/sessionTokens.js';

export async function eraseAccountRoute(fastify)
{
	fastify.post('/eraseAccount', async (request, reply) => {
		const { login } = request.body;
		try
		{
			const stmt = db.prepare("DELETE FROM users WHERE login = ?");
			stmt.run(login);
			return reply.status(200).send({ success: true, message: "Account erased" });
		}
		catch
		{
			return reply.status(409).send({ success: false, error: "login not recognised" });
		}
	})
}

// parece que eso no borra la cuenta
// export async function eraseAccountRoute(fastify) {
//   fastify.post('/eraseAccount', async (request, reply) => {
//     try {
//       // 1. Verify JWT
//       const token = request.cookies.auth_token;
//       if (!token) throw new Error('Missing auth token');
//       const decoded = await request.jwtVerify(token);

//       if (!decoded.userId) throw new Error('Invalid JWT payload');

//       // 2. Delete all sessions for this user
//       deleteAllSessions(decoded.userId);

//       // 3. Delete user from DB
//       const stmt = db.prepare('DELETE FROM users WHERE id = ?');
//       const result = stmt.run(decoded.userId);

//       if (result.changes === 0) {
//         return reply.status(404).send({ success: false, error: 'User not found' });
//       }

//       // 4. Clear auth cookies
//       ['auth_token', 'auth_phase'].forEach(cookieName => {
//         reply.clearCookie(cookieName, {
//           httpOnly: true,
//           secure: true,
//           sameSite: 'None',
//           path: '/'
//         });
//       });

//       return reply.status(200).send({ success: true, message: 'Account erased' });

//     } catch (err) {
//       // Always clear cookies on error
//       ['auth_token', 'auth_phase'].forEach(cookieName => {
//         reply.clearCookie(cookieName, {
//           httpOnly: true,
//           secure: true,
//           sameSite: 'None',
//           path: '/'
//         });
//       });

//       return reply.status(401).send({ success: false, error: err.message });
//     }
//   });
// }
