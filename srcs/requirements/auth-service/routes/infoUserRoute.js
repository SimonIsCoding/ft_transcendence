import db from '../src/database.js';

export async function infoUserRoute(fastify) {
  // 🔒 Protected route: use preHandler fastify.auth
  fastify.get('/info', { preHandler: fastify.auth }, async (request, reply) => {
    try {
      // request.user is already set by authGuard
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
}
