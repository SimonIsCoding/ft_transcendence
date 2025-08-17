import fp from 'fastify-plugin';
import { initiate2FA, verify2FA } from '../services/twofaService.js';

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
    // 1. Check if auth_phase cookie exists and is correct
    const authPhase = request.cookies?.auth_phase;
	const pendingCookie = request.cookies?.pending_registration;

    if (authPhase !== 'password_verified' && !pendingCookie) {
      return reply.code(401).send({
        success: false,
        error: 'Not authorized for 2FA request'
      });
    }

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
      
      // 1. Verify 2FA code
      const verification = await verify2FA(email, token);
      if (!verification.success) {
        return reply.code(401).send(verification);
      }

      // 2. Upgrade auth phase (instead of issuing token)
      reply
        .setCookie('auth_phase', '2fa_verified', {
          httpOnly: true,
          secure: true,
          sameSite: 'strict',
          path: '/',
          maxAge: 300_000 // 5 minutes
        })
        .send({ 
          success: true,
          // userId: verification.user.id // Frontend needs this for /generate-token
        });

    } catch (error) {
      fastify.log.error(error);
      reply.code(500).send({ error: '2FA verification failed' });
    }
  });

  // Resend 2FA Token
  fastify.post('/resend', {
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
      const result = await resend2FA(request.body.email);
      reply.send(result);
    } catch (error) {
      fastify.log.error(error);
      reply.code(500).send({ error: 'Failed to resend code' });
    }
  });
});
