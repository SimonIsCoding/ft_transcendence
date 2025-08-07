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
	try {
      const { email, token } = request.body;
      const result = await verify2FA(email, token);
    
      if (!result.success) {
        reply.code(401).send(result);
        return;
      }
    
      reply.send(result);
	} catch (error) {
      fastify.log.error(error);
      reply.code(500).send({ error: 'Failed to verify 2FA code' });
    }
  });

  // Resend 2FA Token
  fastify.post('/resend', {
    schema: {
      headers: {
        type: 'object',
        required: ['authorization'],
        properties: {
          authorization: { type: 'string' }
        }
      },
      body: {
        type: 'object',
        required: ['email'],
        properties: {
          email: { type: 'string', format: 'email' }
        }
      }
    },
    preHandler: fastify.auth([fastify.verifyJWT])
  }, async (request, reply) => {
    const { email } = request.body;
    
    try {
      // Verify the email matches the JWT subject
      if (email !== request.user.email) {
        return reply.code(403).send({ error: 'Unauthorized' });
      }

      const result = await resend2FA(email);
      reply.send(result);
    } catch (error) {
      fastify.log.error(error);
      reply.code(500).send({ error: 'Failed to resend 2FA code' });
    }
  });
});
