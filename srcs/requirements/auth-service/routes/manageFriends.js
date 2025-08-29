import db from '../src/database.js';


export async function FriendsRoute(fastify)
{
	fastify.get('/friends', { preHandler: fastify.auth }, async (req, reply) => {
	  const userId = req.user.id;

	  const stmt = db.prepare(`
	    SELECT u.id, u.login, u.mail, u.profile_picture
	    FROM users u
	    JOIN friendships f
	      ON (u.id = f.user_a_id OR u.id = f.user_b_id)
	    WHERE ? IN (f.user_a_id, f.user_b_id)
	      AND u.id != ?
	  `);

	  const friends = stmt.all(userId, userId);
	  return friends;
	});

	fastify.post('/friends', { preHandler: fastify.auth }, async (req, reply) => {
	  const fromUserId = req.user.id; // comes from JWT/session
	  const { toUserId } = req.body;

	  if (!toUserId) {
	    return reply.status(400).send({ error: "Missing target user id" });
	  }

	  try {
	    db.prepare(`
	      INSERT INTO friend_requests (from_user_id, to_user_id, status, updated_at)
	      VALUES (?, ?, 'pending', datetime('now'))
	    `).run(fromUserId, toUserId);

	    return reply.status(201).send({ success: true });
	  } catch (err) {
	    if (err.code === "SQLITE_CONSTRAINT_UNIQUE") {
	      return reply.status(409).send({ error: "Request already exists" });
	    }
	    console.error("DB error:", err);
	    return reply.status(500).send({ error: "Internal server error" });
	  }
	});

	fastify.get('/users/count', async (req, reply) => {
	  const stmt = db.prepare("SELECT COUNT(*) AS total FROM users");
	  const result = stmt.get();
	  return { total: result.total };
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


	fastify.get('/friends/:id', { preHandler: fastify.auth }, async (req, reply) => {
	  const currentUserId = req.user.id;
	  const targetId = req.params.id;

  	  // Check friendship OR pending request
  	  const check = db.prepare(`
  	    SELECT 1
  	    FROM friendships f
  	    WHERE (f.user_a_id = ? AND f.user_b_id = ?)
  	       OR (f.user_a_id = ? AND f.user_b_id = ?)
  	    UNION
  	    SELECT 1
  	    FROM friend_requests r
  	    WHERE ((r.from_user_id = ? AND r.to_user_id = ?)
  	        OR  (r.from_user_id = ? AND r.to_user_id = ?))
  	      AND r.status = 'pending'
  	  `).get(
  	    currentUserId, targetId, targetId, currentUserId,
  	    currentUserId, targetId, targetId, currentUserId
  	  );

	  if (!check) {
	    return reply.status(403).send({ error: "Not your friend" });
	  }

	  const user = db.prepare(`
	    SELECT id, login, mail, profile_picture
	    FROM users
	    WHERE id = ?
	  `).get(targetId);

	  if (!user) {
	    return reply.status(404).send({ error: "User not found" });
	  }

	  return user;
	});

	fastify.get('/friends/:id/online', { preHandler: fastify.auth }, async (req, reply) => {
	  const userId = req.user.id;
	  const friendId = parseInt(req.params.id, 10);
	  if (isNaN(friendId)) return reply.status(400).send({ error: "Invalid friend ID" });
	  const now = new Date().toISOString();

	  // Friendship check
	  const check = db.prepare(`
	    SELECT 1
	    FROM friendships
	    WHERE (user_a_id = ? AND user_b_id = ?)
	       OR (user_a_id = ? AND user_b_id = ?)
	  `).get(userId, friendId, friendId, userId);

	  if (!check) return reply.status(403).send({ error: "Not a friend" });

	  const sessions = db.prepare(`
	      SELECT id, created_at, valid_until 
	      FROM sessions 
	      WHERE user_id = ?
	  `).all(friendId);  
	  if (!sessions || sessions.length === 0) {
	      return reply.status(200).send({ success: false });
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
	      return reply.status(200).send({ success: false });
	  }
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
		const user = stmt.get(currentUser, currentUser, currentUser, currentUser, currentUser, currentUser, currentUser);
		if (!user)
			return reply.status(204).send();
		return reply.send(user);
	});

	// this could be a get
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