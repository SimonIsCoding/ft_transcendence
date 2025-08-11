import db from '../src/database.js';
import bcrypt from 'bcrypt';

export async function loginRoute(fastify) {
  // POST /login
  fastify.post('/login', async (request, reply) => {
    const { login, password } = request.body;
    
    // 1. Input validation
    if (!login || !password) {
      return reply.code(400).send({ 
        success: false,
        error: "Missing credentials" 
      });
    }

    // 2. Credential verification
    const user = db.prepare("SELECT * FROM users WHERE login = ?").get(login);
    const valid = user && await bcrypt.compare(password, user.password);

    if (!valid) {
      return reply.code(401).send({ 
        success: false,
        error: 'Invalid credentials',
        requires2FA: process.env.ENABLE_2FA === 'true'
      });
    }

    // 3. Set auth phase cookie
    reply.setCookie('auth_phase', 'password_verified', {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 300_000, // 5 minutes
      path: '/'
    });

    // 4. Response
    reply.send({
      success: true,
      requires2FA: process.env.ENABLE_2FA === 'true',
      userId: user.id // Critical for /generate-token
    });
  });

  // POST /generate-token
   fastify.post('/generate-token', {
    schema: {
      body: {
        type: 'object',
        required: ['userId'],
        properties: { userId: { type: 'string' } }
      }
    }
  }, async (request, reply) => {
    // 1. Validate user
    const user = db.prepare('SELECT id FROM users WHERE id = ?')
                  .get(request.body.userId);
    if (!user) return reply.code(404).send({ error: 'User not found' });
  
    // 2. Determine verification status
    const is2FAVerified = process.env.ENABLE_2FA === 'true' 
      ? request.cookies.auth_phase === '2fa_verified' // Check phase if 2FA enabled
      : true; // Auto-verify if 2FA disabled
  
    // 3. Generate token
    const token = await reply.jwtSign({
      userId: user.id,
      is2FAVerified // Critical security flag
    });
  
    // 4. Set cookie
    reply
      .setCookie('auth_token', token, { 
        httpOnly: true,
        secure: true,
        maxAge: 86400000 // 24h
      })
      .clearCookie('auth_phase') // Cleanup
      .send({ success: true });
  });
}