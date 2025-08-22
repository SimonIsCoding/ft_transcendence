import db from '../src/database.js';

export async function infoUserRoute(fastify) {
 fastify.get('/info', async (request, reply) => {
  try {
    console.log('Incoming cookies:', request.cookies); // Debug cookie reception
    const token = request.cookies.auth_token;
    if (!token) {
      console.log('No token found');
      throw new Error('Missing token');
    }

    // console.log('Verifying token:', token); // Debug raw token
    const decoded = await request.jwtVerify(token);
    // console.error('Decoded token:', decoded); // Debug decoded content

      if (!decoded.userId || !decoded.sessionToken)
		throw new Error('Invalid payload');

	// 2. Verify session
    verifyAndTouchSession(decoded.userId, decoded.sessionToken);

	// 3. Fetch complete user data from database
    const stmt = db.prepare(`
      SELECT id, login, mail, profile_picture 
      FROM users 
      WHERE id = ?
    `);
    const user = stmt.get(decoded.userId);

    if (!user) {
      return reply.status(404).send({ error: 'User not found' });
    }

    // 4. Return complete user data
    return reply.send({ user });
  } catch (error) {
    console.error('Auth failed:', error.message); // Debug why verification failed
    reply.code(401).send({ error: 'Not authenticated' });
  }
 });
}
