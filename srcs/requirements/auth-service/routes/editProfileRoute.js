import bcrypt from 'bcrypt';
import db from '../src/database.js';
import { hashPassword } from './registerRoute.js'

export async function editProfileRoute(fastify)
{
	fastify.post('/changeInfo', async (request, reply) => {
		const { login, currentPassword, changePassword, changeMail } = request.body;
		const stmt = db.prepare("SELECT * FROM users WHERE login = ?");
		const user = stmt.get(login);
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
					const stmt = db.prepare("UPDATE users SET password = ?, mail = ? WHERE login = ?");
					stmt.run(encryptedPassword, changeMail, user.login);
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
				const stmt3 = db.prepare("UPDATE users SET mail = ? WHERE login = ?");
				stmt3.run(changeMail, user.login);
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