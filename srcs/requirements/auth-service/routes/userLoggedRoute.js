export async function statusRoute(fastify) {
  fastify.get('/status', { preHandler: fastify.auth }, async (request, reply) => {
    try {
      // request.user is set by auth
      const { id: userId, is2FAVerified } = request.user;

      const needs2FA = process.env.ENABLE_2FA === 'true' && !is2FAVerified;
      const fullyAuthed = !needs2FA;

      return reply.send({
        authenticated: fullyAuthed,
        requires2FA: needs2FA,
        user: {
          id: userId,
          is2FAVerified: is2FAVerified || false
        }
      });

    } catch (error) {
      console.error('Unexpected error in /status:', error);
      return reply.code(500).send({ error: 'Internal server error' });
    }
  });
}
