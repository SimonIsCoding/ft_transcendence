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

export async function randomOtherUser(fastify)
{
	fastify.get('/randomOtherUser', async (request, reply) =>
	{
		const stmt = db.prepare("SELECT * FROM users ORDER BY RANDOM() LIMIT 1");
		const user = stmt.get();
		return user;
	});
}