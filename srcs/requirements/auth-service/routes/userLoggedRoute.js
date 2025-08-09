// import { auth } from '../plugins/auth.js';

export async function statusRoute(fastify) {
  fastify.get('/status', async (request, reply) => {
    const token = request.cookies.token;

    if (!token)
      return reply.send({ authenticated: false });

    try
	{
      const decoded = fastify.jwt.verify(token);
      return reply.send({ authenticated: true, user: decoded });
    }
	catch (err)
	{
      return reply.send({ authenticated: false });
    }
  });
}

// useless for the moment - but useful when I will add a profile page
export async function userLoggedRoute(app)
{
	console.log("entered in userLoggedRoutes <=> /api/auth/me");
	app.get('/me', { preHandler: [app.auth] }, async (request, reply) => {
		console.log("entered in userLoggedRoutes <=> /api/auth/me Entered in app.get");
		console.log("request.user =", request.user);
		return {
			success: true,
			user: {
				id: request.user.id,
				login: request.user.login,
				email: request.user.mail,
				profile_picture: request.user.profile_picture,
			}
		};
	});
}
