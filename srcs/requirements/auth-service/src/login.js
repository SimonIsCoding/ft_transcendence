import db from './database.js';
import bcrypt from 'bcrypt';

async function hashPassword(password)
{
  const saltRounds = 10;
  const hash = await bcrypt.hash(password, saltRounds);
  return hash;
}

async function loginRoute(fastify)
{
	// to log in
	fastify.post('/login', async (request, reply) => {
    const { login, password } = request.body;
	
	if (!login || !password)
	  return reply.status(400).send({ error: "Missing login or password" });
	
	const stmt = db.prepare("SELECT * FROM users WHERE login = ?");
	const user = stmt.get(login);
	const match = user ? await bcrypt.compare(password, user.password) : false;
	if(user && match)
		return reply.send({ success: true, message: 'Login succeed', login: user.login });
	return reply.status(401).send({ error: 'incorrect Id', success: false});
	});
}

async function registerRoute(fastify)
{
  //to create an account
  fastify.post('/register', async (request, reply) => {
	const { login, password, alias } = request.body;
  
	if (!login || !password || !alias)
	  return reply.status(400).send({ success: false, error: "All fields required" });
	const encryptedPassword = await hashPassword(password);
	try
	{
		const stmt = db.prepare("INSERT INTO users (login, password, alias) VALUES (?, ?, ?)");
		stmt.run(login, encryptedPassword, alias);
		return reply.send({ success: true, message: "User registered" });
	}
	catch (err)
	{
		if (err && typeof err === 'object' && 'code' in err && err.code === 'SQLITE_CONSTRAINT_UNIQUE')
			return reply.status(409).send({ success: false, error: "User already exists" });
		return reply.status(500).send({ success: false, error: "Database error" });
	}
	});
}

export { loginRoute, registerRoute };