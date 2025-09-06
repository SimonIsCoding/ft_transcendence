import db from '../src/database.js';
import bcrypt from 'bcrypt';
import {hashToken, createSessionToken} from '../utils/sessionTokens.js';

export async function loginRoute(fastify) {
  // POST /login
  fastify.post('/users/check', async (request, reply) => {
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
	if (!user)
		return reply.status(401).send({ error: 'Login not found', success: false});
    const valid = await bcrypt.compare(password, user.password);

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

	// 4. check 2FA
	const env2faDisabled = process.env.ENABLE_2FA === 'false';
	const requires2FA = !env2faDisabled && Boolean(Number(user.is_2fa_activated));

    // 5. Response
    reply.send({
      success: true,
      requires2FA,
      userId: user.id, // Critical for /generate-token
      mail: user.mail // Add this field

    });
  });

  // POST /generate-token
   fastify.post('/users/sessions', {
    schema: {
      body: {
        type: 'object',
        required: ['userId'],
        properties: { userId: { type: 'string' } }
      }
    }
  }, async (request, reply) => {

	const SESSION_LIFETIME = process.env.SESSION_LIFETIME
	  ? parseInt(process.env.SESSION_LIFETIME, 10)
	  : 86400; // default 24h if not set
    // 1. Validate user
    const user = db.prepare('SELECT id, is_2fa_activated FROM users WHERE id = ?')
                  .get(request.body.userId);
    if (!user) return reply.code(404).send({ error: 'User not found' });
  
    // 2. Determine verification status
    const env2faDisabled = process.env.ENABLE_2FA === 'false';
	const requires2FA = !env2faDisabled && user.is_2fa_activated;

	const is2FAVerified = requires2FA
      ? request.cookies.auth_phase === '2fa_verified' // Check phase if 2FA enabled
      : true; // Auto-verify if 2FA disabled
  	
	if (!is2FAVerified) {
	  return reply.code(403).send({ error: '2FA verification required' });
	}

 	// 3. Create session_token (random string / UUID)
	const rawSessionToken = createSessionToken();  // to send back
	const hashedToken = hashToken(rawSessionToken);  // to store in db

  // 4. Insert session in DB
	const validUntil = new Date(Date.now() + SESSION_LIFETIME * 1000).toISOString();

  	db.prepare(`
      INSERT INTO sessions (user_id, session_token, created_at, last_seen_at, valid_until, user_agent, ip_address)
      VALUES (?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, ?, ?, ?)
    `).run(
      user.id,
      hashedToken,
      validUntil,
	  request.headers['user-agent'] || null,
      request.ip || null
    );
    // 5. Generate token
    const token = await reply.jwtSign({
      userId: user.id,
	  sessionToken: rawSessionToken
      },
      { expiresIn: SESSION_LIFETIME }
	);
  
    // 6. Set cookie
    reply
      .setCookie('auth_token', token, { 
        httpOnly: true,
        secure: true,
		sameSite: 'None',
		path: '/',
        maxAge: SESSION_LIFETIME
      })
      .clearCookie('auth_phase') // Cleanup
      .send({ success: true });
  });
}
