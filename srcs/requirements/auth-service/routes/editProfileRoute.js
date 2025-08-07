import bcrypt from 'bcrypt';
import db from '../src/database.js';
import { hashPassword } from './registerRoute.js'

export async function editProfileRoute(fastify)
{
	console.log("entered in editProfileRoute => api-auth=>server")
	fastify.post('/changeInfo', async (request, reply) => {
		console.log("entered in fastify.post('/changeInfo'");
		const { login, currentPassword, changePassword, changeMail } = request.body;
		if (currentPassword && currentPassword.trim() !== "")
		{
			console.log("there is a currentPassword");
			const stmt = db.prepare("SELECT * FROM users WHERE login = ?");
			const user = stmt.get(login);
			console.log("user.password = ", user.password);
			const match = user ? await bcrypt.compare(currentPassword, user.password) : false;
			if (!match)
				return reply.status(409).send({success: false, error: 'Current password is not matching the real password.'})
			console.log("match = ", match);
			const encryptedPassword = await hashPassword(changePassword);
			console.log("encryptedPassword = ", encryptedPassword);
			try
			{
				console.log("changing the password in db");
				const stmt = db.prepare("UPDATE users SET password = ? WHERE login = ?");
				stmt.run(encryptedPassword, user.login);
				if (changeMail && changeMail.trim() !== "")
				{
					console.log("changing the mail in db");
					const stmt2 = db.prepare("UPDATE users SET mail = ? WHERE login = ?");
					stmt2.run(changeMail, user.mail);
					return reply.status(200).send({ success: true, message: "Password & mail modified" });
				}
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
			// console.log("reached return line");
			//change mail if needed
			// return reply.status(200).send({message: 'status 200 send => on return line'});
		}
		if (changeMail && changeMail.trim() !== "")
		{
			try
			{
				const stmt3 = db.prepare("INSERT INTO users mail VALUES ?");
				stmt3.run(changeMail);
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