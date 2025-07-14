import Fastify from 'fastify';

const fastify = Fastify({ logger: true });

const jwt = require('jsonwebtoken');

fastify.get('/private/data', async (req, reply) => {
  const token = req.cookies?.token;
  if (!token) return reply.status(401).send({ error: 'No token' });

  try {
    const user = jwt.verify(token, 'super-secret-key'); // process.env.JWT_SECRET
    return { userId: user.userId, message: 'Données privées' };
  } catch {
    return reply.status(403).send({ error: 'Token invalide' });
  }
});


fastify.get('/', async (request, reply) => {
  return { service: "A", message: "Hello from Service A!" };
});

fastify.listen({ port: 3001, host: '0.0.0.0' });
