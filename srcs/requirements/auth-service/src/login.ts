import { FastifyInstance } from 'fastify';
import db from './database';
import bcrypt from 'bcrypt';

async function hashPassword(password: string)
{
  const saltRounds = 10;
  const hash = await bcrypt.hash(password, saltRounds);
  return hash;
}

async function loginRoute(fastify: FastifyInstance)
{
	// to log in
	fastify.post('/login', async (request, reply) => {
    const { login, password } = request.body as { login: string; password: string };
	
	if (!login || !password)
	  return reply.status(400).send({ error: "Missing login or password" });
	
	const stmt = db.prepare("SELECT * FROM users WHERE login = ?");
	const user = stmt.get(login) as { login: string; password: string } | undefined;
	const match = user ? await bcrypt.compare(password, user.password) : false;
	console.log("match = ", match);
	if(user && match)
		return reply.send({ success: true, message: 'Login succeed', login: user.login });
	return reply.status(401).send({ error: 'incorrect Id', success: false});
	});
}

async function registerRoute(fastify: FastifyInstance)
{
  //to create an account
  fastify.post('/register', async (request, reply) => {
	const { login, password, alias } = request.body as { login: string; password: string; alias: string };
  
	if (!login || !password || !alias) {
	  return reply.status(400).send({ success: false, error: "All fields required" });
	}

	console.log("before encryption We are in srcs/requirements/auth-service/src/login.ts and PASSWORD=", password);
	const encryptedPassword = await hashPassword(password);
	console.log("after encryption We are in srcs/requirements/auth-service/src/login.ts and PASSWORD=", encryptedPassword);

	try
	{
		const stmt = db.prepare("INSERT INTO users (login, password, alias) VALUES (?, ?, ?)");
		stmt.run(login, encryptedPassword, alias);
		return reply.send({ success: true, message: "User registered" });
	}
	catch (err)
	{
		// if (err && typeof err === 'object' && 'code' in err)
		//   console.error('Database error code:', (err as { code: string }).code);
		// else
		//   console.error('Unknown error:', err);
		if (err && typeof err === 'object' && 'code' in err)
		{
			const code = (err as any).code;
			if (code === 'SQLITE_CONSTRAINT_UNIQUE')
				return reply.status(409).send({ success: false, error: "User already exists" });
		}
		return reply.status(500).send({ success: false, error: "Database error" });
	}
	});
}

export { loginRoute, registerRoute };