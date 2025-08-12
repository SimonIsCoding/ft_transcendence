export async function infoUserRoute(fastify) {
  fastify.get('/info', { 
    preHandler: [fastify.auth] 
  }, async (request, reply) => {
    // 1. Get user ID from JWT (the only guaranteed field)
    const userId = request.user?.id;
    if (!userId) {
      return reply.status(401).send({ error: 'Not authenticated' });
    }

    // 2. Fetch complete user data from database
    const stmt = fastify.db.prepare(`
      SELECT id, login, email, profile_picture 
      FROM users 
      WHERE id = ?
    `);
    const user = stmt.get(userId);

    if (!user) {
      return reply.status(404).send({ error: 'User not found' });
    }

    // 3. Debug logging
    console.log('Fetched user:', {
      id: user.id,
      login: user.login,
      email: user.email,
      profile_picture: user.profile_picture,
      auth_phase: request.cookies.auth_phase // Check auth phase status
    });

    // 4. Return complete user data
    return reply.send({ user });
  });
}