import db from '../src/database.js';

export async function currentUserInfoRoute(fastify)
{
	fastify.get('/info', { preHandler: [fastify.auth] }, async (request, reply) => {
		const userId = request.user?.id;

		if (!userId)
		return reply.status(401).send({ error: 'Not authenticated' });

		const stmt = db.prepare('SELECT id, login, mail, profile_picture FROM users WHERE id = ?');
		const user = stmt.get(userId);

		if (!user)
		return reply.status(404).send({ error: 'User not found' });

		return reply.send(user);
	});
}
export async function statusRoute(fastify)
{
  fastify.get('/status', async (request, reply) => {
    const token = request.cookies.token;

    if (!token)
      return reply.send({ authenticated: false });

    try
	{
      const decoded = fastify.jwt.verify(token);
	  console.log("token status = ", token);
      return reply.send({ authenticated: true, user: decoded });
    }
	catch (err)
	{
      return reply.send({ authenticated: false });
    }
  });
}
import cookie from 'cookie';

export async function statusWSRoute(fastify)
{
	console.log("🟢 StatusWSRoute loaded");

	const onlineUsers = fastify.onlineUsers;

	fastify.get('/ws', { websocket: true }, (connection, req) =>
	{
		console.log("➡️ Entered WebSocket route");

		const rawCookies = req.headers.cookie || '';
		console.log("📝 Headers.cookie =", rawCookies);

		const cookies = cookie.parse(rawCookies);
		const token = cookies.token;
		console.log("📝 Token WS =", token);

		if (!token)
		{
			console.warn("❌ No token received, closing socket");
			connection.close();
			return;
		}

		try
		{
			const decoded = fastify.jwt.verify(token);
			const userId = decoded.id;
			const login = decoded.login;
			console.log(`✅ JWT verified for userId=${userId} login=${login}`);

			// Remove old socket if exists
			if (onlineUsers.has(userId))
			{
				console.log(`🟡 User ${login} already connected, closing old socket`);
				const oldSocket = onlineUsers.get(userId).socket;
				oldSocket.close();
			}

			onlineUsers.set(userId, { login, socket: connection });
			console.log("📝 Current online users:", Array.from(onlineUsers.entries()));
			console.log(`✅ ${login} is online`);

		}
		catch (err)
		{
			console.error("❌ JWT verify failed:", err);
			connection.close();
			return;
		}

		broadcastStatus(userId, true);

		connection.on('close', () =>
		{
			onlineUsers.delete(userId);
			console.log(`❌ ${login} is offline`);
			broadcastStatus(userId, false);
		});

		connection.on('error', (err) =>
		{
			console.error(`❌ Socket error for user ${login}:`, err);
		});
	});

	function broadcastStatus(userId, isOnline)
	{
		console.log(`📢 Broadcasting status for user ${userId} => ${isOnline ? 'online' : 'offline'}`);

		for (const [id, client] of onlineUsers)
		{
			if (id === userId)
				continue;

			if (!client.socket || client.socket.readyState !== 1)
			{
				console.warn(`🟡 Removing offline socket for user ${id}`);
				onlineUsers.delete(id);
				continue;
			}

			try
			{
				client.socket.send(JSON.stringify({ type: 'status', userId, isOnline }));
				console.log(`✉️ Sent status to user ${id}`);
			}
			catch (err)
			{
				console.error(`❌ Failed to send status to user ${id}`, err);
				onlineUsers.delete(id);
			}
		}
	}
}
