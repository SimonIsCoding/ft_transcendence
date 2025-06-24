import Fastify from 'fastify';

const fastify = Fastify({ logger: true });

// Register endpoint
fastify.post('/register', async (request, reply) => {
   const { email, password } = request.body;
  
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
