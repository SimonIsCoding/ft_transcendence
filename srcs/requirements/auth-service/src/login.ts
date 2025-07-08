import { FastifyInstance } from 'fastify';
import db from './database';

async function loginRoute(fastify: FastifyInstance) {
	// to log in
	fastify.post('/login', async (request, reply) => {
    const { login, password } = request.body as { login: string; password: string };

	const stmt = db.prepare("SELECT * FROM users WHERE login = ? AND password = ?");
	const user = stmt.get(login, password) as { login: string; password: string; alias: string } | undefined;
    if (user)
		return reply.send({ success: true, message: 'Login succeed', login: user.login });
    return reply.status(401).send({ error: 'incorrect Id', success: false});
  });

  //to create an account
  fastify.post('/register', async (request, reply) => {
	const { login, password, alias } = request.body as { login: string; password: string; alias: string };
  
	if (!login || !password || !alias) {
	  return reply.status(400).send({ success: false, error: "All fields required" });
	}
	
  try {
	const stmt = db.prepare("INSERT INTO users (login, password, alias) VALUES (?, ?, ?)");
	stmt.run(login, password, alias);
	return reply.send({ success: true, message: "User registered" });
  } catch (err) {
	console.error("Database error:", err);
	return reply.status(500).send({ success: false, error: "Database error" });
  }
  });
}

export default loginRoute;
