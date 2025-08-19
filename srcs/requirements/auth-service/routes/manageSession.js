import db from '../src/database.js';
import { randomUUID } from 'crypto';

export function sendSessionIdRoute(fastify)
{
	fastify.post('/sendSessionId', async (request, reply) => {
		const sessionId = randomUUID();
		const { currentUser } = request.body;
		db.prepare(`INSERT INTO sessions(user_id, user_login, session_id, created_at, connected) VALUES (?, ?, ?, datetime('now'), 1)`).run(currentUser.id, currentUser.login, sessionId);
	});
}

export function activeSessionRoute(fastify)
{
	fastify.post('/checkSession', async (request, reply) => {
		const { currentUser } = request.body;
		const stmt = db.prepare(`SELECT * FROM sessions WHERE user_id = ?`);
		const result = stmt.get(currentUser.id);
		if (!result)
			return reply.send({success: false});
		return reply.send({success: true, message: 'user is already connected'});
	});
}

export function deleteSessionRoute(fastify)
{
	fastify.post('/deleteSession', async (request, reply) => {
		const { currentUser } = request.body;
		db.prepare(`DELETE FROM sessions WHERE user_id = ?`).run(currentUser.id);
		reply
		.setCookie('token', '', {
			path: '/',
			httpOnly: true,
			expires: new Date(0)
		});

	return { success: true };
	});
}