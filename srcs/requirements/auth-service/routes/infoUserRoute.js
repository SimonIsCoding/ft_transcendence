import db from '../src/database.js';

export async function infoUserRoute(fastify) {
  // 🔒 Protected route: use preHandler fastify.auth
  fastify.get('/me', { preHandler: fastify.auth }, async (request, reply) => {
    try {
      // request.user is already set by authCheck
      const userId = request.user.id;

      // Fetch complete user data
      const stmt = db.prepare(`
        SELECT id, login, mail, profile_picture, provider
        FROM users
        WHERE id = ?
      `);
      const user = stmt.get(userId);

      if (!user) {
        return reply.status(404).send({ error: 'User not found' });
      }

      return reply.send({ user });
    } catch (error) {
      console.error('Unexpected error in /info:', error);
      return reply.code(500).send({ error: 'Internal server error' });
    }
  });

  fastify.get('/me/status', { preHandler: fastify.auth }, async (request, reply) => {
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
