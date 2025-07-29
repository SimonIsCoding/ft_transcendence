import db from './database.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

async function hashPassword(password)
{
  const saltRounds = 10;
  const hash = await bcrypt.hash(password, saltRounds);
  return hash;
}

export function getRandomAvatar()
{
	const avatarId = Math.floor(Math.random() * 5) + 1;
	return `/profile_pictures/avatar_${avatarId}.png`;
}

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
	
	const SECRET = 'super-secret-key';
	if(user && match)
	{
		const token = jwt.sign({ id: user.id, login: user.login, mail: user.mail, profile_picture: user.profile_picture }, SECRET, { expiresIn: '1h' });// try to comment profile picture to know if we can receive it only thanks to app.get('/api/private/info'
		reply.setCookie('token', token, {
			httpOnly: true, //ALWAYS PUT TRUE FOR PROD
			secure: true,
			sameSite: 'strict',
			maxAge: 7 * 24 * 60 * 60 * 1000,
			path: '/', // important !
		})
		.send({ success: true, message: 'Login succeed', id: user.id, login: user.login, mail: user.mail, token: token });	
	}
	return reply.status(401).send({ error: 'incorrect Id', success: false});
	});
}

export async function registerRoute(fastify)
{
	//to create an account
	fastify.post('/register', async (request, reply) => {
		const { login, password, mail } = request.body;
		const avatarPath = getRandomAvatar();

		if (!login || !password || !mail)
			return reply.status(400).send({ success: false, error: "All fields required" });
		const encryptedPassword = await hashPassword(password);
		try
		{
			const stmt = db.prepare("INSERT INTO users (login, password, mail, profile_picture) VALUES (?, ?, ?, ?)");
			stmt.run(login, encryptedPassword, mail, avatarPath);
			return reply.status(200).send({ success: true, message: "User registered" });
		}
		catch (err)
		{
			if (err && typeof err === 'object' && 'code' in err && err.code === 'SQLITE_CONSTRAINT_UNIQUE')
			{
				if (err.message.includes('login'))
					return reply.status(409).send({ success: false, error: "Login already exists" });
				if (err.message.includes('mail'))
					return reply.status(409).send({ success: false, error: "Email already used" });
			}
			console.log("body received:", request.body);
			console.error("SQL Error:", err);
			return reply.status(500).send({ success: false, error: "Database error" });
		}
	});
}

// check if this code is useful
export async function infoUserRoute(fastify)
{
	fastify.get('/api/auth/info', { preHandler: [fastify.auth] }, async (request, reply) => {
		const user = request.user;
		return { message: `Welcome ${user.login}`, userId: user.userId, login: user.login, mail: user.mail };
	});
}