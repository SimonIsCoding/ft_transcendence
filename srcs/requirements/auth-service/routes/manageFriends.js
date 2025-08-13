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

export async function updateFriendshipStatusRoute(fastify)
{
	fastify.post('/updateFriendshipStatus', async (request, reply) => {
		const { currentUser, otherUser, status } = request.body;
		if (status == false)
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
	console.log("in db for /requestFriendExists");
	fastify.get('/requestFriendExists', async (request, reply) => {
		// console.log("do we reached this line 1?");
		const userFullInfo = request.user;
		// console.log("do we reached this line 2?");
		// console.log("userFullInfo = ", userFullInfo);
		// const stmt = db.prepare('SELECT fr.*, u.* FROM friend_requests fr JOIN users u ON fr.to_user_id = u.id');//WHERE status = pending
		// const stmt = db.prepare('SELECT fr.*, u.* FROM friend_requests fr JOIN users u ON fr.to_user_id = u.id');
		const stmt = db.prepare("SELECT from_user_id, to_user_id FROM friend_requests WHERE status = 'pending'");
    	const users = stmt.all();
		// const user = stmt.run(userFullInfo);
		// console	.log("stmt = " , stmt);
		console.log("in db for /requestFriendExists, user =", users);
		return reply.status(200).send(users);
	});
}