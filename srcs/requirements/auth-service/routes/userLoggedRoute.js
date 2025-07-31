// import { auth } from '../plugins/auth.js';

export async function userLoggedRoutes(app)
{
  fastify.get('/me', { preHandler: [fastify.auth] }, async (request, reply) => {
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
