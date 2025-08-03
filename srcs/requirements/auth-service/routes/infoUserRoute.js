//just to check what info I received - for debugging
export async function infoUserRoute(fastify)
{
	fastify.get('/infoUser', { preHandler: [fastify.auth] }, async (request, reply) => {
		console.log('id: ', request.user.id);
		console.log('login: ', request.user.login);
		console.log('email: ', request.user.email);
		console.log('profile_picture: ', request.user.profile_picture);
		console.log('token: ', request.cookies.token);
		console.log("________________________________________________________________________\n");

    return reply.send({ user: request.user });
  });
}