import db from '../src/database.js';

export async function infoUserRoute(app) {
  // 🔒 Protected route: use preHandler fastify.auth
  app.get('/me', { preHandler: app.auth }, async (request, reply) => {
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

  app.get('/me/status', { preHandler: app.auth }, async (request, reply) => {
    try {
      // if arrived here app.auth has validated token
      const userId = request.user.id;

      return reply.send({
        authenticated: true,
        user: {
          id: userId,
        }
      });

    } catch (error) {
      console.error('Unexpected error in /status:', error);
      return reply.code(500).send({ error: 'Internal server error' });
    }
  });
}
