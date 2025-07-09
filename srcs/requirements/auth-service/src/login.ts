import { FastifyInstance } from 'fastify';
import db from './database';
import bcrypt from 'bcrypt';

async function hashPassword(password: string)
{
  const saltRounds = 10;
  const hash = await bcrypt.hash(password, saltRounds);
  return hash;
}

// async function checkCredentials(username, password)
// {
//     //... fetch user from a db etc.

//     const match = await bcrypt.compare(password, user.encrypted_passwd);

//     if(match)
// 		return reply.send({ success: true, message: 'Login succeed', login: user.login });
// 	return reply.status(401).send({ error: 'incorrect Id', success: false});
// }

async function loginRoute(fastify: FastifyInstance)
{
	// to log in
	// fastify.post('/login', async (request, reply) => {
    // const { login, password } = request.body as { login: string; password: string };

	// const stmt = db.prepare("SELECT * FROM users WHERE login = ? AND password = ?");
	// const user = stmt.get(login, password) as { login: string; password: string; alias: string } | undefined;
    // if (user)
	// 	return reply.send({ success: true, message: 'Login succeed', login: user.login });
    // return reply.status(401).send({ error: 'incorrect Id', success: false});
	// });
	//FONCTIONNE⬆️ & MARCHE PAS⬇️
	fastify.post('/login', async (request, reply) => {
	const { login, login_password } = request.body as { login: string; login_password: string };
	const stmt = db.prepare("SELECT * FROM users WHERE login = ?");
	const user = stmt.get(login) as { login: string; password: string; } | undefined;
	console.log("user.password from DB =", user?.password);
	const match = user ? await bcrypt.compare(login_password, user.password) : false;
	console.log("match = ", match);
	if(user && match)
		return reply.send({ success: true, message: 'Login succeed', login: user.login });
	return reply.status(401).send({ error: 'incorrect Id', success: false});
	});

	//to create an account
	// fastify.post('/register', async (request, reply) => {
	// const { login, password, alias } = request.body as { login: string; password: string; alias: string };
  
	// if (!login || !password || !alias)
	//   return reply.status(400).send({ success: false, error: "All fields required" });
	
	// // console.log("before encryption We are in srcs/requirements/auth-service/src/login.ts and PASSWORD=", password);
	// // console.log("after encryption We are in srcs/requirements/auth-service/src/login.ts and PASSWORD=", password);

	// try
	// {
	// 	const stmt = db.prepare("INSERT INTO users (login, password, alias) VALUES (?, ?, ?)");
	// 	stmt.run(login, password, alias);
	// 	return reply.send({ success: true, message: "User registered" });
	// }
	// catch (err)
	// {
	// 	// if (err && typeof err === 'object' && 'code' in err)
	// 	//   console.error('Database error code:', (err as { code: string }).code);
	// 	// else
	// 	//   console.error('Unknown error:', err);
	// 	if (err && typeof err === 'object' && 'code' in err)
	// 	{
	// 		const code = (err as any).code;
	// 		if (code === 'SQLITE_CONSTRAINT_UNIQUE')
	// 			return reply.status(409).send({ success: false, error: "User already exists" });
	// 	}
	// 	return reply.status(500).send({ success: false, error: "Database error" });
	// }
	// });


  fastify.post('/register', async (request, reply) => {
	const { new_username, new_password, new_alias } = request.body as { new_username: string; new_password: string; new_alias: string };
	
	console.log("in register, new_username =", new_username);
	console.log("in register, new_password =", new_password);
	console.log("in register, new_alias =",new_alias);
	// const encrypted_passwd = await hashPassword(password);

	if (!new_username || !new_password || !new_alias)
		return reply.status(400).send({ success: false, error: "All fields required" });
	
	console.log("before encryption We are in srcs/requirements/auth-service/src/login.ts and PASSWORD=", new_password);
	// console.log("after encryption We are in srcs/requirements/auth-service/src/login.ts and PASSWORD=", encrypted_passwd);

	try
	{
		const stmt = db.prepare("INSERT INTO users (login, password, alias) VALUES (?, ?, ?)");
		stmt.run(new_username, new_password, new_alias);
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


	// const { login, registered_password, alias } = request.body as { login: string; password: string; alias: string };
	// const encrypted_registered_passwd = await hashPassword(registered_password);

	// if (!login || !encrypted_registered_passwd || !alias)
	//   return reply.status(400).send({ success: false, error: "All fields required" });
	
	// console.log("before encryption We are in srcs/requirements/auth-service/src/login.ts and PASSWORD=", registered_password);
	// console.log("after encryption We are in srcs/requirements/auth-service/src/login.ts and PASSWORD=", encrypted_registered_passwd);

	// try
	// {
	// 	const stmt = db.prepare("INSERT INTO users (login, password, alias) VALUES (?, ?, ?)");
	// 	stmt.run(login, encrypted_registered_passwd, alias);
	// 	return reply.send({ success: true, message: "User registered" });
	// }