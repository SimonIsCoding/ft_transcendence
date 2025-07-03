import { FastifyInstance } from 'fastify';

async function loginRoute(fastify: FastifyInstance) {
	fastify.post('/login', async (request, reply) => {
    const { login, password } = request.body as { login: string; password: string };

    const users = [
      { login: 'simon', password: '1234' },
      { login: 'alice', password: 'abcd' }
    ];

    const user = users.find(u => u.login === login && u.password === password);

    if (user) {
      return reply.send({ message: 'Login réussi', login: user.login });
    }
    return reply.status(401).send({ error: 'Identifiants incorrects' });
  });
}

export default loginRoute;