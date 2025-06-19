import Fastify from 'fastify';

const fastify = Fastify({ logger: true });

fastify.get('/', async (request, reply) => {
  return { service: "B", message: "Hello from Service B!" };
});

fastify.listen({ port: 3002, host: '0.0.0.0' });
