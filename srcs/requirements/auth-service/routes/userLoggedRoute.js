// import { auth } from '../plugins/auth.js';

export async function statusRoute(fastify) {
  fastify.get('/status', async (request, reply) => {
    const token = request.cookies.token;

    if (!token) {
      return reply.send({ authenticated: false });
    }

    try {
      const decoded = fastify.jwt.verify(token);//jwt.verify(token, 'super-secret-key'); doesn't work well :|
      return reply.send({ authenticated: true, user: decoded });
    } catch (err) {
      return reply.send({ authenticated: false });
    }
  });
}

// useless for the moment - but useful when I will add a profile page
export async function userLoggedRoutes(app)
{
	app.get('/me', { preHandler: [app.auth] }, async (request, reply) => {
		return {
			success: true,
			user: {
				id: request.user.id,
				login: request.user.login,
				email: request.user.mail,
				profile_picture: request.user.profile_picture,
				token: request.user.token,
			}
		};
	});
}
