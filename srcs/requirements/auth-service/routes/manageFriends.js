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
		const stmt = db.prepare("SELECT id, login, mail, profile_picture FROM users ORDER BY RANDOM() LIMIT 1");
		const user = stmt.get();
		return user;
	});
}

export async function sendFriendRequestRoute(fastify)
{
	fastify.post('/sendFriendRequest', async (request, reply) => {
		const { currentUser, otherUser } = request.body;
		console.log("in backend for sendFriendRequest, currentUser = ", currentUser);
		console.log("in backend for sendFriendRequest, otherUser = ", otherUser);
		//currentUser send a friend request to otherUser
		db.prepare(`INSERT INTO friend_requests (from_user_id, to_user_id, status, updated_at)
		VALUES (?, ?, 'pending', datetime('now'))`).run(currentUser.id, otherUser.id);

		return reply.status(200).send({success: true});
	})
}