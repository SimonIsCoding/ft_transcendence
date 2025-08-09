import db from '../src/database.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { loadSecretKey } from '../utils/loadSecretKey.js';

const cookieSecretKey = loadSecretKey('SECRET_KEY_FILE');

export async function loginRoute(fastify)
{
	// to log in
	fastify.post('/login', async (request, reply) => {
		const { login, password } = request.body;
		
	if (!login || !password)
		return reply.status(400).send({ error: "Missing login or password" });
	
	const stmt = db.prepare("SELECT * FROM users WHERE login = ?");
	const user = stmt.get(login);
	const match = user ? await bcrypt.compare(password, user.password) : false;
	
	const SECRET = cookieSecretKey;
	if(user && match)
	{
		const token = jwt.sign({ id: user.id, login: user.login, mail: user.mail, profile_picture: user.profile_picture }, SECRET, { expiresIn: '24h' });// try to comment profile picture to know if we can receive it only thanks to app.get('/api/auth/info'
		return reply.setCookie('token', token, {
			httpOnly: true, //ALWAYS PUT TRUE FOR PROD
			secure: true,
			sameSite: 'strict',
			maxAge: 24 * 60 * 60 * 1000,
			path: '/', // important !
		})
		.send({ success: true, message: 'Login succeed', id: user.id, login: user.login, mail: user.mail, token: token });
	}
	return reply.status(401).send({ error: 'incorrect Id', success: false});
	});
}
