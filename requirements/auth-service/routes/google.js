import { OAuth2Client } from "google-auth-library";
import jwt from 'jsonwebtoken';
import db from '../src/database.js';
import crypto from 'crypto';
import { config } from '../src/config.js';

const client = new OAuth2Client("11816073281-ka847kttjiaqlci012l9p7kpip87kocr.apps.googleusercontent.com");

export async function googleRoute(fastify)
{
	// this could be a get I think
	fastify.post("/google", async (request, reply) => {
	  const SESSION_LIFETIME = process.env.SESSION_LIFETIME
	    ? parseInt(process.env.SESSION_LIFETIME, 10)
	    : 86400; // default 24h if not set

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
			const internalToken = await reply.jwtSign(
				{
					userId: payload.sub,
					email: payload.email,
					name: payload.name,
					picture: payload.picture,
					sessionToken: sessionToken,
					provider: "google"
				},
				{ expiresIn: SESSION_LIFETIME }
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
	
			const payload = jwt.verify(cookie, config.JWT_SECRET);
			let user = db.prepare("SELECT * FROM users WHERE mail = ?").get(payload.email);
			if (!user)
			{
				db.prepare("INSERT INTO users (login, mail, profile_picture, provider) VALUES (?, ?, ?, ?)").run(payload.name, payload.email, payload.picture, payload.provider);
				user = db.prepare("SELECT * FROM users WHERE mail = ?").get(payload.email);
			}

   			// Determine auth phase
   			// if (process.env.ENABLE_2FA === "true") {
   			  reply.setCookie("auth_phase", "2fa_verified", {
   			    httpOnly: true,
   			    secure: true,
   			    sameSite: "strict",
   			    path: "/",
   			    maxAge: 300_000 // 5 minutes
   			  });
   			// } else {
   			//   reply.setCookie("auth_phase", "password_verified", {
   			//     httpOnly: true,
   			//     secure: true,
   			//     sameSite: "strict",
   			//     path: "/",
   			//     maxAge: 300_000 // 5 minutes
   			//   });
   			// }
	
			return reply.status(201).send({ userId: user.id, login: user.login, mail: user.mail, profile_picture: user.profile_picture, provider: user.provider});
	
		}
		catch (err)
		{
			return reply.status(401).send({ error: "Unauthorized" });
		}
	});

	// fastify.get("/proxy/avatar", async (request, reply) => {
	// 	const { url } = request.query
	// 	if (!url)
	// 		return reply.status(400).send({ error: "Missing url" })

	// 	try {
	// 		const response = await fetch(url)
	// 		if (!response.ok)
	// 			return reply.status(502).send({ error: "Failed to fetch image" })

	// 		const buffer = await response.arrayBuffer()
	// 		reply
	// 			.header("Content-Type", response.headers.get("content-type") || "image/jpeg")
	// 			.send(Buffer.from(buffer))
	// 	}
	// 	catch (err) {
	// 		console.error("Proxy error:", err)
	// 		return reply.status(500).send({ error: "Internal proxy error" })
	// 	}
	// })
}
