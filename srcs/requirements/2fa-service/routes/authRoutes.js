import fp from 'fastify-plugin';
import { initiate2FA, verify2FA } from '../services/authService.js';

export default fp(async (fastify) => {
  // Request 2FA Token
  fastify.post('/request', {
    schema: {
      body: {
        type: 'object',
        required: ['email'],
        properties: {
          email: { type: 'string', format: 'email' }
        }
      }
    }
  }, async (request, reply) => {
    try {
      const result = await initiate2FA(request.body.email);
      return result;
    } catch (error) {
      fastify.log.error(error);
      reply.code(500).send({ error: 'Failed to initiate 2FA' });
    }
  });

  // Verify 2FA Token
  fastify.post('/verify', {
    schema: {
      body: {
        type: 'object',
        required: ['email', 'token'],
        properties: {
          email: { type: 'string', format: 'email' },
          token: { type: 'string', pattern: '^\\d{6}$' }
        }
      }
    }
  }, async (request, reply) => {
    const { email, token } = request.body;
    const result = await verify2FA(email, token);
    
    if (!result.success) {
      reply.code(401).send(result);
      return;
    }
    
    reply.send(result);
  });
});
