import { FastifyInstance } from 'fastify';
import db from './database';

async function loginRoute(fastify: FastifyInstance) {
	fastify.post('/login', async (request, reply) => {
    const { login, password } = request.body as { login: string; password: string };

    const users = [
      { login: 'simon', password: '1234' },
      { login: 'alice', password: 'abcd' }
    ];

    const user = users.find(u => u.login === login && u.password === password);

    if (user) {
		reply.send({success: true});
      return reply.send({ message: 'Login succeed', login: user.login});
    }
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
