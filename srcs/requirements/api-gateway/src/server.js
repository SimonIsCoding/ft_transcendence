import Fastify from 'fastify';
import fetch from 'node-fetch';  // Explicit import
import fastifyHttpProxy from '@fastify/http-proxy';
import fs from 'fs';
import fastifyCors from '@fastify/cors';
import fastifyStatic from '@fastify/static';
import path from 'path';

const fastify = Fastify({
  logger: true,
  https: {
    key: fs.readFileSync('/run/secrets/api_key'),
    cert: fs.readFileSync('/run/secrets/api_cert')
  }
});

// Register CORS plugin
fastify.register(fastifyCors, {
  origin: [
    'https://localhost:4443',       // campus computer
    'https://localhost'       // virtual server
  ],
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
  credentials: true,
  // Optional: Cache preflight for 24h
  maxAge: 86400
});

// Route to demonstrate gateway routing
fastify.get('/api', async (request, reply) => {
  return { message: "API Gateway → Try /api/a or /api/b" };
});

// Proxy to Auth Service
fastify.register(fastifyHttpProxy, {
  upstream: 'http://auth-service:3001',
  prefix: '/api/auth',
  rewritePrefix: '/',
    http2: false,
  replyOptions: {
    rewriteRequestHeaders: (originalReq, headers) => {
      return {
        ...headers,
        host: 'auth-service',
      };
    },
  },
});

// Proxy to Service B
fastify.get('/api/b', async (request, reply) => {
  const response = await fetch('http://service-b:3002/');
  return response.json();
});

fastify.get('/info', async (request, reply) => {
  return reply.type('text/html').send('<html><body><h1>You are in Info Page</h1></body></html>')
});

//https://localhost:4443/login
fastify.register(fastifyStatic, {
  root: path.join(process.cwd(), 'app/webdev/pong'), // absolute path for frontend folder
  prefix: '/', // root files
});

// Start server
fastify.listen({ port: 3000, host: '0.0.0.0' }, (err) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
});
