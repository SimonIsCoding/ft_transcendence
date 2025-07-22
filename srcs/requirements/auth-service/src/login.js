import db from './database.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

async function hashPassword(password)
{
  const saltRounds = 10;
  const hash = await bcrypt.hash(password, saltRounds);
  return hash;
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
			const token = jwt.sign({ userId: user.id }, SECRET, { expiresIn: '1h' });
			reply
			.setCookie('token', token, {
				httpOnly: true, //ALWAYS PUT TRUE FOR PROD
				secure: true,
				sameSite: 'strict',
				path: '/', // important !
			})
			.send({ success: true, message: 'Login succeed', login: user.login });
		}
		return reply.status(401).send({ error: 'incorrect Id', success: false});
	});
	
}

export async function registerRoute(fastify)
{
	//to create an account
	fastify.post('/register', async (request, reply) => {
		const { login, password, mail } = request.body;
  
		if (!login || !password || !mail)
			return reply.status(400).send({ success: false, error: "All fields required" });
		const encryptedPassword = await hashPassword(password);
		try
		{
			const stmt = db.prepare("INSERT INTO users (login, password, mail) VALUES (?, ?, ?)");
			stmt.run(login, encryptedPassword, mail);
			return reply.status(200).send({ success: true, message: "User registered" });
		}
		catch (err)
		{
			//essaie aussi d'imposer le failt que tous les caractere d'un mail doivent etre ecrits en minuscules
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

export async function infoUserRoute(fastify)
{
	fastify.get('/api/auth/info', { preHandler: [fastify.auth] }, async (request, reply) => {
		const user = request.user;
		return { message: `Welcome ${user.login}`, userId: user.userId, login: user.login, mail: user.mail };
	});
}