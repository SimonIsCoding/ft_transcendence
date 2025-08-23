import { OAuth2Client } from "google-auth-library";
import jwt from 'jsonwebtoken';
import db from '../src/database.js';
import crypto from 'crypto';

const client = new OAuth2Client("11816073281-ka847kttjiaqlci012l9p7kpip87kocr.apps.googleusercontent.com");

export async function googleRoute(fastify)
{
	fastify.post("/google", async (request, reply) => {
		const { id_token } = request.body;
		console.log(`id_token = ${id_token}`);
		if (!id_token)
			return reply.status(400).send({ error: "Missing id_token" });

		try
		{
			console.log(`entered in try with id_token = ${id_token}`);
			const ticket = await client.verifyIdToken({
				idToken: id_token,
				audience: "11816073281-ka847kttjiaqlci012l9p7kpip87kocr.apps.googleusercontent.com"
			});

			const payload = ticket.getPayload();
			console.log(`payload.sub = ${payload.sub}\npayload.email = ${payload.email}\npayload.name = ${payload.name}\npayload.picture = ${payload.picture}`);
			console.log("hola");
			console.log("env.JWT_SECRET = ", process.env.JWT_SECRET);
			const sessionToken = crypto.randomBytes(32).toString("hex");
			console.log(`sessionToken = ${sessionToken}`);
			const Gprovider = "google";
			const internalToken = jwt.sign(
				{
					userId: payload.sub,
					email: payload.email,
					name: payload.name,
					picture: payload.picture,
					sessionToken: sessionToken,
					provider: Gprovider
				},
				process.env.JWT_SECRET,
				{ expiresIn: "24h" }
			);
			return reply.setCookie("auth_token", internalToken, {
				httpOnly: true,
				secure: true,
				sameSite: "lax",
				path: "/"
			}).send({ success: true, provider: Gprovider });
		} 
		catch (err)
		{
			console.error("Err verifyIdToken:", err);
			return reply.status(401).send({success: false, error: "Invalid ID token" });
		}
	});
}

export async function googleSessionRoute(fastify)
{
	fastify.post("/googleSession", async (request, reply) => {
		try {
			// ⬇️ Récupère le JWT depuis le cookie
			console.log("entered in googleSession");
			const cookie = request.cookies.auth_token;
			console.log(`cookie = ${cookie}`);
			if (!cookie)
				return reply.status(401).send({ error: "No session cookie" });

			// ⬇️ Vérifie que le JWT est valide
			const payload = jwt.verify(cookie, process.env.JWT_SECRET);
			console.log(`2 payload.sub = ${payload.sub}\npayload.email = ${payload.email}\npayload.name = ${payload.name}\npayload.picture = ${payload.picture}`);
			console.log(`payload.userId = ${payload.userId}`);
			console.log(`payload.userId = ${payload.id}`);
			console.log(`payload.provider = ${payload.provider}`);

			// const db = await dbPromise;
			const user = db.prepare("SELECT * FROM users WHERE mail = ?").get(payload.email);
			console.log("user = ", user);
			if (!user)
			{
				console.log("entered in !user");
				// Créer l'utilisateur si nouveau
				db.prepare("INSERT INTO users (login, mail, profile_picture, provider) VALUES (?, ?, ?, ?)").run(payload.name, payload.email, payload.picture, payload.provider);
				console.log("not user and run on db");
			}

			// ⬇️ Accès accordé
			console.log(`user.provider = ${user.provider}`);
			console.log(`payload.provider = ${payload.provider}`);
			return reply.status(201).send({ userId: user.id, login: user.login, mail: user.mail, profile_picture: user.profile_picture, provider: user.provider});

		} catch (err) {
			console.log(err);
			return reply.status(401).send({ error: "Unauthorized" });
		}
	});
}