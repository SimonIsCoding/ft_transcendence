import bcrypt from 'bcrypt';
import db from '../src/database.js';
import { hashPassword } from './registerRoute.js'

export async function editProfileRoute(fastify) {
  fastify.put("/me", { preHandler: fastify.auth }, async (request, reply) => {
    const userId = request.user.id;
    const {
      login,
      mail,
      currentPassword,
      changePassword,
      is_2fa_activated,
      GDPR_activated,
    } = request.body;

    const stmt = db.prepare("SELECT * FROM users WHERE id = ?");
    const user = stmt.get(userId);

    if (!user) {
      return reply.status(404).send({ success: false, error: "User not found." });
    }

    const updates = {};

    // --- Handle login ---
    if (login && login !== user.login) updates.login = login;

    // --- Handle mail (skip if Google) ---
    if (user.provider !== "google" && mail && mail !== user.mail) {
      updates.mail = mail;
    }

    // --- Handle password ---
    if (currentPassword && changePassword) {
      const match = await bcrypt.compare(currentPassword, user.password);
      if (!match) {
        return reply.status(409).send({ success: false, error: "Current password does not match." });
      }
      updates.password = await hashPassword(changePassword);
    }

    // --- Handle 2FA toggle ---
    if (typeof is_2fa_activated === "number" && is_2fa_activated !== user.is_2fa_activated) {
      updates.is_2fa_activated = is_2fa_activated;
    }

    // --- Handle GDPR toggle ---
    if (typeof GDPR_activated === "number" && GDPR_activated !== user.GDPR_activated) {
      updates.GDPR_activated = GDPR_activated;
    }

    // --- Nothing to update ---
    if (Object.keys(updates).length === 0) {
      return reply.status(400).send({ success: false, error: "No changes detected." });
    }

    // --- Build dynamic SQL ---
    const columns = Object.keys(updates).map(c => `${c} = ?`).join(", ");
    const values = Object.values(updates);

    try {
      const stmtUpdate = db.prepare(`UPDATE users SET ${columns} WHERE id = ?`);
      stmtUpdate.run(...values, userId);

      return reply.status(200).send({ success: true, message: "Profile updated successfully." });
    } catch (err) {
      if (err?.code === "SQLITE_CONSTRAINT_UNIQUE" && err.message.includes("mail")) {
        return reply.status(409).send({ success: false, error: "Email already used." });
      }
      console.error(err);
      return reply.status(500).send({ success: false, error: "Database error updating profile." });
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

	fastify.put('/me/twofa', { preHandler: fastify.auth }, async (request, reply) => {
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
	fastify.get('/me/GDPR', { preHandler: fastify.auth }, async (request, reply) => {
		const userId = request.user.id;
		const stmt = db.prepare("SELECT GDPR_activated FROM users WHERE id = ?").get(userId);
		return reply.send({ is_activated: stmt.GDPR_activated})
	})

	fastify.put('/me/GDPR', { preHandler: fastify.auth }, async (request, reply) => {
		const userId = request.user.id;
		let row = db.prepare("SELECT GDPR_activated FROM users WHERE id = ?").get(userId);
		let former_value = row.GDPR_activated;
		let current_value = former_value ? 0 : 1;
		db.prepare(`UPDATE users SET GDPR_activated = ? WHERE id = ?`).run(current_value, userId);
		return reply.status(200).send({ success: true });
	})

}
