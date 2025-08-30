import bcrypt from 'bcrypt';
import db from '../src/database.js';
import { hashPassword } from './registerRoute.js'

export async function editProfileRoute(fastify)
{
	fastify.post('/me/update', { preHandler: fastify.auth }, async (request, reply) => {
		const userId = request.user.id;
		const { currentPassword, changePassword, changeMail } = request.body;
		const stmt = db.prepare("SELECT * FROM users WHERE id = ?");
		const user = stmt.get(userId);
		if (currentPassword && currentPassword.trim() !== "")
		{
			const match = user ? await bcrypt.compare(currentPassword, user.password) : false;
			if (!match)
				return reply.status(409).send({success: false, error: 'Current password is not matching the real password.'})
			const encryptedPassword = await hashPassword(changePassword);
			try
			{
				if (changeMail && changeMail.trim() !== "")
				{
					const stmt = db.prepare("UPDATE users SET password = ?, mail = ? WHERE id = ?");
					stmt.run(encryptedPassword, changeMail, userId);
					return reply.status(200).send({ success: true, message: "Password & mail modified" });
				}
				const stmt2 = db.prepare("UPDATE users SET password = ? WHERE login = ?");
				stmt2.run(encryptedPassword, user.login);
				return reply.status(200).send({ success: true, message: "Password modified" });
			}
			catch (err)
			{
				if (err && typeof err === 'object' && 'code' in err && err.code === 'SQLITE_CONSTRAINT_UNIQUE')
				{
					if (err.message.includes('mail'))
						return reply.status(409).send({ success: false, error: "Email already used" });
				}
				return reply.status(500).send({ success: false, error: "Database error in editProfileRoute" });
			}
		}
		if (changeMail && changeMail.trim() !== "")
		{
			try
			{
				const stmt3 = db.prepare("UPDATE users SET mail = ? WHERE id = ?");
				stmt3.run(changeMail, userId);
				return reply.status(200).send({ success: true, message: "Mail modified" });
			}
			catch (err)
			{
				if (err && typeof err === 'object' && 'code' in err && err.code === 'SQLITE_CONSTRAINT_UNIQUE')
				{
					if (err.message.includes('mail'))
						return reply.status(409).send({ success: false, error: "Email already used" });
				}
				return reply.status(500).send({ success: false, error: "Database error in editProfileRoute 2" });
			}
		}
	});
}

export async function twofaManagementRoute(fastify)
{
	fastify.get('/me/twofa', { preHandler: fastify.auth }, async (request, reply) => {
		const userId = request.user.id;

		const stmt = db.prepare("SELECT is_2fa_activated FROM users WHERE id = ?").get(userId);
		return reply.send({ is_activated: stmt.is_2fa_activated})

	})

	fastify.post('/me/twofa', { preHandler: fastify.auth }, async (request, reply) => {
		const userId = request.user.id;

		let row = db.prepare("SELECT is_2fa_activated FROM users WHERE id = ?").get(userId);
		let former_value = row.is_2fa_activated;
		let current_value = former_value ? 0 : 1;
		db.prepare(`UPDATE users SET is_2fa_activated = ? WHERE id = ?`).run(current_value, userId);
		return reply.status(200).send({ success: true });

	})
}

export async function GDPRManagementRoute(fastify)
{
	fastify.get('/me/GDPRCheck', async (request, reply) => {
		const token = request.cookies.auth_token;
		if (token)
		{
			const decoded = await request.jwtVerify(token);
			if (decoded.userId && decoded.sessionToken) 
			{
				const stmt = db.prepare("SELECT GDPR_activated FROM users WHERE id = ?").get(decoded.userId);
				return reply.send({ is_activated: stmt.GDPR_activated})
			}
		}
	})

	fastify.post('/me/GDPRChangeValue', async (request, reply) => {
		const { userId } = request.body;
		const token = request.cookies.auth_token;
		if (token)
		{
			const decoded = await request.jwtVerify(token);
			if (decoded.userId && decoded.userId == userId && decoded.sessionToken)
			{
				let row = db.prepare("SELECT GDPR_activated FROM users WHERE id = ?").get(decoded.userId);
				let former_value = row.GDPR_activated;
				let current_value = former_value ? 0 : 1;
				db.prepare(`UPDATE users SET GDPR_activated = ? WHERE id = ?`).run(current_value, decoded.userId);
				return reply.status(200).send({ success: true });
			}
		}
	})

	fastify.post('/me/checkGDPRFriend', async (request, reply) => {
		const { friendUserId } = request.body;
		const token = request.cookies.auth_token;
		if (token)
		{
			const decoded = await request.jwtVerify(token);
			if (decoded.userId && decoded.sessionToken)
			{
				let row = db.prepare("SELECT GDPR_activated FROM users WHERE id = ?").get(friendUserId);
				let check = row.GDPR_activated;
				return reply.status(200).send({ value: check });
			}
		}
	})
}
