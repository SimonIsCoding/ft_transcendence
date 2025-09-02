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

	fastify.delete('/me', { preHandler: fastify.auth }, async (req, reply) => {
	  const userId = req.user.id;
	  reply.clearCookie('auth_token');
	  try
	  {		
		db.prepare("DELETE FROM friendships WHERE user_a_id = ? OR user_b_id = ?").run(userId, userId);
		db.prepare("DELETE FROM friend_requests WHERE from_user_id = ? OR to_user_id = ?").run(userId, userId);
		db.prepare("DELETE FROM sessions WHERE user_id = ?").run(userId);
	  	db.prepare("DELETE FROM users WHERE id = ?").run(userId);

	 	 // Clear cookie/session if you use them

	  	return reply.status(200).send({ success: true, message: "Account erased" });
	  }
	  catch
	  {
	  	return reply.status(409).send({ success: false, error: "login not recognised" });
	  }

	});

}
