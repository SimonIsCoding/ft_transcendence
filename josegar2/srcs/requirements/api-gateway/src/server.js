import Fastify from 'fastify';
import fetch from 'node-fetch';  // Explicit import

const fastify = Fastify({ logger: true });

// Route to demonstrate gateway routing
fastify.get('/', async (request, reply) => {
  return { message: "API Gateway → Try /a or /b" };
});

// Proxy to Service A
fastify.get('/a', async (request, reply) => {
  const response = await fetch('http://service-a:3001/');
  return response.json();
});

// Proxy to Service B
fastify.get('/b', async (request, reply) => {
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
