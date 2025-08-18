import db from '../src/database.js';
import bcrypt from 'bcrypt';
// import jwt from 'jsonwebtoken';
import { randomUUID } from 'crypto';
// import { loadSecretKey } from '../utils/loadSecretKey.js';

// const cookieSecretKey = loadSecretKey('SECRET_KEY_FILE');

export async function loginRoute(fastify)
{
	fastify.post('/login', async (request, reply) => {
		const { login, password } = request.body;
		
	if (!login || !password)
		return reply.status(400).send({ error: "Missing login or password" });
	
	const stmt = db.prepare("SELECT * FROM users WHERE login = ?");//id, login, mail, profile_picture
	const user = stmt.get(login);
	const match = user ? await bcrypt.compare(password, user.password) : false;
	if (!user)
		return reply.status(401).send({ error: 'Login not found' });
	if (!match)
		return reply.status(402).send({ error: 'Wrong credentials' });

	const oldSession = db.prepare('SELECT * FROM sessions WHERE user_id = ? AND connected = 1').get(user.id);
	if (oldSession)
		db.prepare('UPDATE sessions SET connected = 0 WHERE user_id = ?').run(user.id);

	const sessionId = randomUUID();
	db.prepare(`INSERT INTO sessions(user_id, user_login, session_id, created_at, connected) VALUES (?, ?, ?, datetime('now'), 1)`).run(user.id, user.login, sessionId);

	// const SECRET = cookieSecretKey;
	const token = await reply.jwtSign({
		id: user.id,
		login: user.login,
		mail: user.mail,
		profile_picture: user.profile_picture,
		session_id: sessionId
	}, { expiresIn: '24h' })
	console.log(`in /login token = ${token}`);

	return reply.setCookie('token', token, {
		httpOnly: true,
		secure: true, // si tu es en dev sans HTTPS
		sameSite: 'lax', // strict bloque parfois les requêtes fetch depuis le front
		path: '/',
		maxAge: 24 * 60 * 60, // secondes
	}).send({ success: true, message: 'Login succeed', id: user.id, login: user.login, mail: user.mail, token: token });
	});
}
