import db from '../src/database.js';

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