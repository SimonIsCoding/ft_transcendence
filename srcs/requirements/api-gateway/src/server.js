import Fastify from 'fastify';
import fetch from 'node-fetch';  // Explicit import
import fastifyHttpProxy from '@fastify/http-proxy';
import fs from 'fs';
import fastifyCors from '@fastify/cors';

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

fastify.register(fastifyHttpProxy, {
  upstream: 'http://2fa-service:3003',
  prefix: '/api/2fa',
  rewritePrefix: '/api/2fa',
    http2: false,
  replyOptions: {
    rewriteRequestHeaders: (originalReq, headers) => {
      return {
        ...headers,
        host: '2fa-service',
		'x-real-ip': originalReq.headers['x-real-ip'] || originalReq.ip,
        'x-forwarded-for': originalReq.headers['x-forwarded-for'] 
        	? `${originalReq.headers['x-forwarded-for']}, ${originalReq.ip}`
        	: originalReq.ip,
      // Forward other security headers
        'x-forwarded-proto': originalReq.headers['x-forwarded-proto'] || 'http',
      };
    },
  },
  proxyPayload: true,
});


// Start server
fastify.listen({ port: 3000, host: '0.0.0.0' }, (err) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
});
