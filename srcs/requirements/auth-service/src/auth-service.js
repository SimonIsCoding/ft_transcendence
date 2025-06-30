import Fastify from 'fastify';
import fastifyCors from '@fastify/cors';

const fastify = Fastify({ logger: true });

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

// Initialize mock database
const mockUsers = {}; // <-- This was missing in your original code

// Register endpoint
fastify.post('/register', async (request, reply) => {
   const { email, password } = request.body;
  
  // Basic validation
  if (!email || !password) {
    return reply.code(400).send({ error: 'Email and password required' });
  }

  // Check if user exists
  if (mockUsers[email]) {
    return reply.code(409).send({ error: 'Email already registered' });
  }

  // Store user (no validation)
  mockUsers[email] = password;
  
  return {
    status: 'success',
    data: {
      user: { email },
      token: `mock-token-${Math.random().toString(36).slice(2)}`
    }
  };
});

// Login endpoint
fastify.post('/login', async (request, reply) => {
  const { email } = request.body;
  
  return {
    status: 'success',
    data: {
      user: { email },
      token: `mock-token-${Math.random().toString(36).slice(2)}`
    }
  };
});

// Health check
fastify.get('/', async (request, reply) => {
  return { service: "auth-service", status: "running" };
});

fastify.listen({ port: 3001, host: '0.0.0.0' });
