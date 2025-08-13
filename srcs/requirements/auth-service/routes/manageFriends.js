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
		db.prepare(`INSERT INTO friend_requests (from_user_id, to_user_id, status, updated_at)
		VALUES (?, ?, 'pending', datetime('now'))`).run(currentUser.id, otherUser.id);
		return reply.status(200).send({success: true});
	})
}

export async function FriendsRoute(fastify)
{
	fastify.post('/friends', async (request, body) => {
		const { currentUser, otherUser } = request.body;
		const [a,b] = currentUser.id < otherUser.id ? [currentUser.id, otherUser.id] : [otherUser.id, currentUser.id];
		const stmt = db.prepare(`SELECT * FROM friendships WHERE user_a_id = ? AND user_b_id = ?`);
		const friendship = stmt.get(a, b);
		console.log("friendship = ", friendship);
		return friendship;
	})
}

export async function invitationSentRoute(fastify)
{
	fastify.post('/invitationSent', async (request, body) => {
		const { currentUser, otherUser } = request.body;
		const stmt = db.prepare(`SELECT * FROM friend_requests WHERE from_user_id = ? AND to_user_id = ?`);
		const invitationSent = stmt.get(currentUser.id, otherUser.id);
		console.log("invitationSent = ", invitationSent);
		return invitationSent;
	})
}

export async function updateFriendshipStatusRoute(fastify)
{
	fastify.post('/updateFriendshipStatus', async (request, reply) => {
		const { currentUser, otherUser, status } = request.body;
		if (status == true)
			db.prepare(`INSERT INTO friendships (user_a_id, user_b_id) VALUES (?, ?)`).run(a, b);
		db.prepare(`DELETE FROM friend_requests WHERE to_user_id = ? AND from_user_id = ?`).run(currentUser.id, otherUser.id);
		return reply.status(200).send({success: true});
	})
}

export async function getUserByIdRoute(fastify)
{
	fastify.post('/getUserById', async (request, reply) => {
		const { userId } = request.body;
		const stmt = db.prepare("SELECT id, login, mail, profile_picture FROM users WHERE id = ?");
		const user = stmt.get(userId);
		return user;
	})
}

export async function requestFriendExistsRoute(fastify)
{
	fastify.get('/requestFriendExists', async (request, reply) => {
		const stmt = db.prepare("SELECT from_user_id, to_user_id FROM friend_requests WHERE status = 'pending'");//you can remove  WHERE status = 'pending'
    	const users = stmt.all();
		return reply.status(200).send(users);
	});
}

export async function getFriendsListRoute(fastify)
{
	fastify.post('/getFriends', async (request, reply) => {
		const { userId } = request.body;
		const stmt = db.prepare("SELECT user_a_id, user_b_id FROM friendships WHERE user_a_id = ? OR user_b_id = ?");
    	const friends = stmt.all(userId, userId);
		return reply.status(200).send(friends);
	});
}