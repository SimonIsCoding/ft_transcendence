import db from '../src/database.js';


export async function FriendsRoute(fastify)
{
	fastify.get('/friends', { preHandler: fastify.auth }, async (request, body) => {
		const { currentUser, otherUser } = request.body;
		const [a,b] = currentUser.id < otherUser.id ? [currentUser.id, otherUser.id] : [otherUser.id, currentUser.id];
		const stmt = db.prepare(`SELECT * FROM friendships WHERE user_a_id = ? AND user_b_id = ?`);
		const friendship = stmt.get(a, b);
		return friendship;
	});
	
	fastify.get('/countTotalUsers', async (request, reply) =>
		{
			const stmt = db.prepare("SELECT COUNT(*) AS totalUsers FROM users");
			const result = stmt.get();
			return result.totalUsers;
	});
		
	fastify.post('/sendFriendRequest', async (request, reply) => {
		const { currentUser, otherUser } = request.body;
		db.prepare(`INSERT INTO friend_requests (from_user_id, to_user_id, status, updated_at)
			VALUES (?, ?, 'pending', datetime('now'))`).run(currentUser.id, otherUser.id);
			return reply.status(200).send({success: true});
	});
	
	fastify.post('/invitationReceived', async (request, body) => {
		const { currentUser, otherUser } = request.body;
		const stmt = db.prepare(`SELECT * FROM friend_requests WHERE from_user_id = ? AND to_user_id = ?`);
		const invitationReceived = stmt.get(otherUser.id, currentUser.id);
		return invitationReceived;
	});
	
	fastify.post('/updateFriendshipStatus', async (request, reply) => {
		const { currentUser, otherUser, status } = request.body;
		const [a, b] = currentUser.id < otherUser.id ? [currentUser.id, otherUser.id] : [otherUser.id, currentUser.id];
		if (status === true)
		{
			try
			{
				db.prepare(`INSERT INTO friendships (user_a_id, user_b_id) VALUES (?, ?)`).run(a, b);
			}
			catch (err)
			{
				if (!err.message.includes("UNIQUE constraint failed"))
					throw err;
			}
		}
	
		db.prepare(`DELETE FROM friend_requests WHERE to_user_id = ? AND from_user_id = ?`).run(currentUser.id, otherUser.id);
		
		//we want to erase double interverted friend_requests if there is
		const friendships = db.prepare(`SELECT user_a_id, user_b_id FROM friendships WHERE user_a_id = ? OR user_b_id = ?`).all(currentUser.id, currentUser.id);
		const friendIds = friendships.map(f =>
			f.user_a_id === currentUser.id ? f.user_b_id : f.user_a_id
		);
	
		if (friendIds.length > 0)
		{
			db.prepare(`DELETE FROM friend_requests WHERE (from_user_id = ? AND to_user_id IN (${friendIds.map(() => '?').join(',')})) OR (to_user_id = ? AND from_user_id IN (${friendIds.map(() => '?').join(',')}))`).run(currentUser.id, ...friendIds, currentUser.id, ...friendIds);
		}
	
		return reply.status(200).send({ success: true });
	});


	fastify.post('/getUserById', async (request, reply) => {
		const { userId } = request.body;
		const stmt = db.prepare("SELECT id, login, mail, profile_picture FROM users WHERE id = ?");
		const user = stmt.get(userId);
		return user;
	});

	fastify.get('/requestFriendExists', { preHandler: fastify.auth }, async (request, reply) => {
		const userId = request.user.id;
		const stmt = db.prepare("SELECT from_user_id, to_user_id FROM friend_requests WHERE to_user_id = ?");
		const users = stmt.all(userId);
		return reply.status(200).send(users);
	});

	fastify.get('/getFriends', { preHandler: fastify.auth }, async (request, reply) => {
    	const userId = request.user.id;
		const stmt = db.prepare("SELECT user_a_id, user_b_id FROM friendships WHERE user_a_id = ? OR user_b_id = ?");
		const friends = stmt.all(userId, userId);
		return reply.status(200).send(friends);
	});

	fastify.get('/randomEligibleOtherUser', { preHandler: fastify.auth }, async (request, reply) => {
		const currentUser = request.user.id;
		const stmt = db.prepare(`SELECT id, login, mail, profile_picture
			FROM users u
			WHERE u.id != ?
				AND u.id NOT IN (
					SELECT CASE
						WHEN user_a_id = ? THEN user_b_id
						ELSE user_a_id
					END
					FROM friendships
					WHERE user_a_id = ? OR user_b_id = ?
				)
				AND u.id NOT IN (
					SELECT CASE
						WHEN from_user_id = ? THEN to_user_id
						ELSE from_user_id
					END
					FROM friend_requests
					WHERE (from_user_id = ? OR to_user_id = ?)
						AND status = 'pending'
				)
			ORDER BY RANDOM()
			LIMIT 1
		`);
		const user = stmt.get(currentUser.id, currentUser.id, currentUser.id, currentUser.id, currentUser.id, currentUser.id, currentUser.id);
		if (!user)
			return reply.status(204).send();
		return reply.send(user);
	});

	fastify.post('/isFriendConnected', async (request, reply) => {
		const { userId } = request.body;
		const now = new Date().toISOString();
	  // Get all sessions for this user
	    const sessions = db.prepare(`
	        SELECT id, created_at, valid_until 
	        FROM sessions 
	        WHERE user_id = ?
	    `).all(userId);

	    if (!sessions || sessions.length === 0) {
	        return reply.status(400).send({ success: false });
	    }

	    let isOnline = false;

	    for (const session of sessions) {
	        if (now >= session.created_at && now <= session.valid_until) {
	            // At least one valid session
	            isOnline = true;
	        } else {
	            // Remove expired sessions
	            db.prepare(`DELETE FROM sessions WHERE id = ?`).run(session.id);
	        }
	    }

	    if (isOnline) {
	        return reply.status(200).send({ success: true });
	    } else {
	        return reply.status(401).send({ success: false });
	    }
	});

}

// export async function reloadFriendshipsRoute(fastify)
// {
	// fastify.post('/reloadFriendships', async (request, body) => {
		// const { currentUser, otherUser } = request.body;
		// 
	// })
// }
