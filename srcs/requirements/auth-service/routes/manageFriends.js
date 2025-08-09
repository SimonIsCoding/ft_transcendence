import db from '../src/database.js';

export async function countTotalUsers(fastify)
{
	fastify.get('/countTotalUsers', async (request, reply) =>
	{
		const stmt = db.prepare("SELECT COUNT(*) AS totalUsers FROM users");
		const result = stmt.get();
		return result.totalUsers;
	});
}