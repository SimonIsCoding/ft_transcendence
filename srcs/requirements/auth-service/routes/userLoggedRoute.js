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
      return reply.send({ authenticated: true, user: decoded });
    }
	catch (err)
	{
      return reply.send({ authenticated: false });
    }
  });
}

// export async function statusWSRoute(fastify)
// {
// 	console.log("StatusWSRoute loaded");
// 	const onlineUsers = fastify.onlineUsers;
// 	fastify.get('/statusWS', { websocket: true }, (connection, req) =>
// 	{
// 		console.log("entered in statusWSRoute");
// 		const token = req.cookies?.token;
// 		if (!token)
// 		{
// 			connection.socket.close();
// 			return;
// 		}

// 		try
// 		{
// 			const decoded = fastify.jwt.verify(token);
// 			const userId = decoded.id;
// 			const login = decoded.login;

// 			onlineUsers.set(userId, { login, socket: connection.socket });
// 			console.log(`✅ ${login} is online`);

// 			// Notifier les autres utilisateurs
// 			broadcastStatus(userId, true);

// 			connection.socket.on('close', () =>
// 			{
// 				onlineUsers.delete(userId);
// 				console.log(`❌ ${login} is offline`);
// 				broadcastStatus(userId, false);
// 			});
// 		}
// 		catch
// 		{
// 			connection.socket.close();
// 		}
// 	});

// 	function broadcastStatus(userId, isOnline)
// 	{
// 		for (const [id, { socket }] of onlineUsers)
// 		{
// 			if (id !== userId)
// 				socket.send(JSON.stringify({ type: 'status', userId, isOnline }));
// 		}
// 	}
// }
