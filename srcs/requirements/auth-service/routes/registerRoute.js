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
		const { login, password, mail } = request.body;
		const avatarPath = getRandomAvatar();

		if (!login || !password || !mail)
			return reply.status(400).send({ success: false, error: "All fields required" });
		const encryptedPassword = await hashPassword(password);
		try
		{
			const stmt = db.prepare("INSERT INTO users (login, password, mail, profile_picture) VALUES (?, ?, ?, ?)");
			stmt.run(login, encryptedPassword, mail, avatarPath);
			return reply.status(200).send({ success: true, message: "User registered" });
		}
		catch (err)
		{
			if (err && typeof err === 'object' && 'code' in err && err.code === 'SQLITE_CONSTRAINT_UNIQUE')
			{
				if (err.message.includes('login'))
					return reply.status(409).send({ success: false, error: "Login already exists" });
				if (err.message.includes('mail'))
					return reply.status(409).send({ success: false, error: "Email already used" });
			}
			console.log("body received:", request.body);
			console.error("SQL Error:", err);
			return reply.status(500).send({ success: false, error: "Database error" });
		}
	});
}