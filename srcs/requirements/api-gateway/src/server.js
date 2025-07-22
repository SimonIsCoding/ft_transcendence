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
  return { message: "API Gateway" };
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

//check if this is useful
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
