
import Fastify from 'fastify';
import fetch from 'node-fetch';  // Explicit import
import fastifyHttpProxy from '@fastify/http-proxy';
import fs from 'fs';
import fastifyCors from '@fastify/cors';

// Leer puertos de servicios desde variables de entorno o usar valores por defecto
const AUTH_SERVICE_PORT = process.env.AUTH_SERVICE_PORT || 3001;
const TWOFA_SERVICE_PORT = process.env.TWOFA_SERVICE_PORT || 3003;

const AUTH_SERVICE_URL = `http://auth-service:${AUTH_SERVICE_PORT}`;
const TWOFA_SERVICE_URL = `http://2fa-service:${TWOFA_SERVICE_PORT}`;

const fastify = Fastify({
//   logger: true,
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
  methods: ['GET', 'POST', 'DELETE'],
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
  upstream: AUTH_SERVICE_URL,
  prefix: '/api/auth',
  rewritePrefix: '/',
    http2: false,
  replyOptions: {
    rewriteRequestHeaders: (originalReq, headers) => {
      return {
        ...headers,
        host: 'auth-service',
		'x-real-ip': originalReq.headers['x-real-ip'] || originalReq.ip,
        'x-forwarded-for': originalReq.headers['x-forwarded-for'] 
        	? `${originalReq.headers['x-forwarded-for']}, ${originalReq.ip}`
        	: originalReq.ip,
      // Forward other security headers
        'x-forwarded-proto': originalReq.headers['x-forwarded-proto'] || 'http',
      };
    },
  },
});

fastify.register(fastifyHttpProxy, {
  upstream: TWOFA_SERVICE_URL,
  prefix: '/api/2fa',
  rewritePrefix: '/',
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

fastify.register(fastifyHttpProxy, {
  upstream: AUTH_SERVICE_URL,
  prefix: '/api/game',
  rewritePrefix: '/game',
    http2: false,
  replyOptions: {
    rewriteRequestHeaders: (originalReq, headers) => {
      return {
        ...headers,
        host: 'auth-service',
		'x-real-ip': originalReq.headers['x-real-ip'] || originalReq.ip,
        'x-forwarded-for': originalReq.headers['x-forwarded-for'] 
        	? `${originalReq.headers['x-forwarded-for']}, ${originalReq.ip}`
        	: originalReq.ip,
      // Forward other security headers
        'x-forwarded-proto': originalReq.headers['x-forwarded-proto'] || 'http',
      };
    },
  },
});

// Start server
fastify.listen({ port: 3000, host: '0.0.0.0' }, (err) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
});
