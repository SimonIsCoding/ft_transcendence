import db from '../src/database.js';
import bcrypt from 'bcrypt';

async function hashPassword(password)
{
  const saltRounds = 10;
  const hash = await bcrypt.hash(password, saltRounds);
  return hash;
}

export function getRandomAvatar()
{
	const avatarId = Math.floor(Math.random() * 5) + 1;
	return `/profile_pictures/avatar_${avatarId}.png`;
}

export async function registerRoute(fastify)
{
	//to create an account
	fastify.post('/register', async (request, reply) => {
		const { login, mail } = request.body;
		
		if (!login || !mail)
			return reply.status(400).send({ success: false, error: "All fields required" });
	  const existsLogin = db.prepare("SELECT 1 FROM users WHERE login = ?").get(login);
	  if (existsLogin) return reply.code(409).send({ success: false, error: "Login already exists" });
	  const existsMail = db.prepare("SELECT 1 FROM users WHERE mail = ?").get(mail);
	  if (existsMail) return reply.code(409).send({ success: false, error: "Email already used" });

	  // 2. store pending info in signed cookie
	  reply.setCookie('pending_registration', JSON.stringify({ login, mail }), {
	    httpOnly: true,
	    secure: true,
	    signed: true,   // <--- requires fastify-cookie secret
	    sameSite: 'strict',
	    maxAge: 300_000,
	    path: '/'
	  });

	  return reply.send({ success: true, requires2FA: process.env.ENABLE_2FA === 'true' });
	});

	fastify.post('/register-end', async (req, reply) => {
	  const pending = req.unsignCookie(req.cookies.pending_registration || '');
	  if (!pending.valid) return reply.code(400).send({ success: false, error: "No pending registration" });

	  const { login, mail } = JSON.parse(pending.value);
  	  // extract password from request body
	  const { password } = req.body;
	  if (!password) return reply.code(400).send({ success: false, error: "Password required" });

	  // If 2FA required, check that auth_phase is verified
	  if (process.env.ENABLE_2FA === 'true' && req.cookies.auth_phase !== '2fa_verified') {
	    return reply.code(401).send({ success: false, error: "2FA not verified" });
	  }

	  const encryptedPassword = await bcrypt.hash(password, 10);
	  const avatarPath = getRandomAvatar();
	  db.prepare("INSERT INTO users (login, password, mail, profile_picture) VALUES (?, ?, ?, ?)")
	    .run(login, encryptedPassword, mail, avatarPath);

	  reply.clearCookie('pending_registration').clearCookie('auth_phase');
	  return reply.send({ success: true, message: "User registered" });
	});

}