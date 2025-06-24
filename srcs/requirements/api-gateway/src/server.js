import Fastify from 'fastify';
import fetch from 'node-fetch';  // Explicit import

const fastify = Fastify({ logger: true });

// Route to demonstrate gateway routing
fastify.get('/api', async (request, reply) => {
  return { message: "API Gateway → Try /api/a or /api/b" };
});

// Proxy to Auth Service
fastify.register(fastifyHttpProxy, {
  upstream: 'http://auth-service:3001',
  prefix: '/auth',
  rewritePrefix: '/'
});

// Proxy to Service B
fastify.get('/api/b', async (request, reply) => {
  const response = await fetch('http://service-b:3002/');
  return response.json();
});

// Start server
fastify.listen({ port: 3000, host: '0.0.0.0' }, (err) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
});
