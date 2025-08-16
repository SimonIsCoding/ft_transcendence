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
		// const decoded = fastify.jwt.verify(token);
		// const userId = decoded.id;
		
		// const session = fastify.onlineUsers.get(userId);
		// console.log(`session = ${session}`);
		// console.log(`session.token = ${session.token}`);
		// console.log(`token = ${token}`);
		// if (session && session.token === token)
		// 		return reply.send({ authenticated: true, user: decoded });

		// return reply.send({ authenticated: false });
    }
	catch (err)
	{
      return reply.send({ authenticated: false });
    }
  });
}


function isDuplicateSession(fastify, userId)
{
	console.log("entered in isDuplicateSession");
	const session = fastify.onlineUsers.get(userId);
	console.log(`fastify = ${fastify}`);
	console.log(`userId = ${userId}`);
	console.log(`session = ${session}`);
	if (!session) return false; // pas de session active

	// Ici, si la session existait et qu'on veut la remplacer
	session.socket.close();      // déconnecte la session précédente
	fastify.onlineUsers.delete(userId); // supprime de la map
	return true; // indique qu'une session a été supprimée
}

export async function forceLogoutRoute(fastify)
{
	fastify.post('/forceLogout', async (request, reply) => {
		console.log("entered in forceLogout");
		const { userId2 } = request.body;
		// // const token = request.cookies.token;
		// // token = currentUser.token;
		// console.log(`User.id = ${userId}`);
		// console.log(`fastify = ${fastify}`);
		// // console.log(`in forceLogout currentUser.token = ${currentUser.token}`);
		// // if (!token) return reply.send({ success: false });

		// // const decoded = fastify.jwt.verify(token);
		// // const userId = decoded.id;

		// const wasLoggedOut = isDuplicateSession(fastify, userId);
		// console.log(`wasLoggedOut = ${wasLoggedOut}`);
		// return reply.send({ success: wasLoggedOut });
		console.log(`userId2 = ${userId2}`);
		
		const token = request.cookies.token;
		console.log(` in forcelogout token = ${token}`);
		
		if (!token)
			return reply.send({ success: false });

		const decoded = fastify.jwt.verify(token);
		const userId = decoded.id;

		console.log(`userId = ${userId}`);
		const wasLoggedOut = isDuplicateSession(userId);
		console.log(`wasLoggedOut = ${wasLoggedOut}`);
		return reply.send({ success: wasLoggedOut });
	});
}

import cookie from 'cookie';

export async function statusWSRoute(fastify)
{
	console.log("🟢 StatusWSRoute loaded");

	const onlineUsers = fastify.onlineUsers;
	let userId;
	let login;

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
			userId = decoded.id;
			login = decoded.login;
			console.log(`✅ JWT verified for userId=${userId} login=${login}`);

			// Remove old socket if exists
			if (onlineUsers.has(userId))
			{
				console.log(`🟡 User ${login} already connected, closing old socket`);
				reply.clearCookie('token', {
					path: '/',
					secure: true,
					httpOnly: true,
					sameSite: 'none' //'strict'
				});
				console.log(`after erasing cookie, token = ${decoded.token}`);
				//here you have to reset data.authenticated
				const oldSocket = onlineUsers.get(userId).socket;
				console.log(`oldSocket = ${oldSocket}`);
				oldSocket.close();
			}

			// onlineUsers.set(userId, { login, socket: connection });
			onlineUsers.set(userId, { login, socket: connection, token });
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
			console.log("📝 Before deleting online users:", Array.from(onlineUsers.entries()));
			onlineUsers.delete(userId);
			console.log("📝 After deleting online users:", Array.from(onlineUsers.entries()));
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
