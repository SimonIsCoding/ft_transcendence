import { OAuth2Client } from "google-auth-library";
import jwt from 'jsonwebtoken';
import db from '../src/database.js';
import crypto from 'crypto';

const client = new OAuth2Client("11816073281-ka847kttjiaqlci012l9p7kpip87kocr.apps.googleusercontent.com");

export async function googleRoute(fastify)
{
	// this could be a get I think
	fastify.post("/google", async (request, reply) => {
		const { id_token } = request.body;
		if (!id_token)
			return reply.status(400).send({ error: "Missing id_token" });

		try
		{
			const ticket = await client.verifyIdToken({
				idToken: id_token,
				audience: "11816073281-ka847kttjiaqlci012l9p7kpip87kocr.apps.googleusercontent.com"
			});

			const payload = ticket.getPayload();
			const sessionToken = crypto.randomBytes(32).toString("hex");
			// const Gprovider = "google";
			const internalToken = jwt.sign(
				{
					userId: payload.sub,
					email: payload.email,
					name: payload.name,
					picture: payload.picture,
					sessionToken: sessionToken,
					provider: "google"
				},
				process.env.JWT_SECRET,
				{ expiresIn: "24h" }
			);
			return reply.setCookie("auth_token", internalToken, {
				httpOnly: true,
				secure: true,
				sameSite: "lax",
				path: "/"
			}).send({ success: true, provider: "google" });
		} 
		catch (err)
		{
			console.error("Err verifyIdToken:", err);
			return reply.status(401).send({success: false, error: "Invalid ID token" });
		}
	});

	fastify.post("/googleSession", async (request, reply) => {
		try
		{
			const cookie = request.cookies.auth_token;
			if (!cookie)
				return reply.status(401).send({ error: "No session cookie" });
	
			const payload = jwt.verify(cookie, process.env.JWT_SECRET);
			let user = db.prepare("SELECT * FROM users WHERE mail = ?").get(payload.email);
			if (!user)
			{
				db.prepare("INSERT INTO users (login, mail, profile_picture, provider) VALUES (?, ?, ?, ?)").run(payload.name, payload.email, payload.picture, payload.provider);
				user = db.prepare("SELECT * FROM users WHERE mail = ?").get(payload.email);
			}

   			// Determine auth phase
   			if (process.env.ENABLE_2FA === "true") {
   			  reply.setCookie("auth_phase", "2fa_verified", {
   			    httpOnly: true,
   			    secure: true,
   			    sameSite: "strict",
   			    path: "/",
   			    maxAge: 300_000 // 5 minutes
   			  });
   			} else {
   			  reply.setCookie("auth_phase", "password_verified", {
   			    httpOnly: true,
   			    secure: true,
   			    sameSite: "strict",
   			    path: "/",
   			    maxAge: 300_000 // 5 minutes
   			  });
   			}
	
			return reply.status(201).send({ userId: user.id, login: user.login, mail: user.mail, profile_picture: user.profile_picture, provider: user.provider});
	
		}
		catch (err)
		{
			console.log(err);
			return reply.status(401).send({ error: "Unauthorized" });
		}
	});
}
