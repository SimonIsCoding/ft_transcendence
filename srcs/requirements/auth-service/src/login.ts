import { FastifyInstance } from 'fastify';
import db from './database';

async function loginRoute(fastify: FastifyInstance)
{
	// to log in
	fastify.post('/login', async (request, reply) => {
    const { login, password } = request.body as { login: string; password: string };

	const stmt = db.prepare("SELECT * FROM users WHERE login = @login AND password = @password");
	const user = stmt.get(login, password) as { login: string; password: string; alias: string } | undefined;
    if (user)
		return reply.send({ success: true, message: 'Login succeed', login: user.login });
    return reply.status(401).send({ error: 'incorrect Id', success: false});
  });

  //to create an account
  fastify.post('/register', async (request, reply) => {
	const { login, password, alias } = request.body as { login: string; password: string; alias: string };
  
	if (!login || !password || !alias)
	  return reply.status(400).send({ success: false, error: "All fields required" });
	
	console.log("before encryption We are in srcs/requirements/auth-service/src/login.ts and PASSWORD=", password);
	const bcrypt = require('bcrypt');
	const saltRounds = 10;

	bcrypt.hashSync(password, saltRounds, function(err: Error | null, salt: Error | null) 
	{
		if (err) {
			console.error(err);
			return;
		}
		// console.log(hash);
	});
	console.log("after encryption We are in srcs/requirements/auth-service/src/login.ts and PASSWORD=", password);

	try
	{
		const stmt = db.prepare("INSERT INTO users (login, password, alias) VALUES (?, ?, ?)");
		stmt.run(login, password, alias);
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

export default loginRoute;
