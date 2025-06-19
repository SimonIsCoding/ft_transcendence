import Fastify from 'fastify';

const fastify = Fastify({ logger: true });

fastify.get('/', async (request, reply) => {
  return { service: "A", message: "Hello from Service A!" };
});

fastify.listen({ port: 3001, host: '0.0.0.0' });
