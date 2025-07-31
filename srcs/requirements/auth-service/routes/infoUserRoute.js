// // check if this code is useful - to forget for the moment if you are reading this file
// export async function infoUserRoute(fastify)
// {
// 	fastify.get('/api/auth/info', { preHandler: [fastify.auth] }, async (request, reply) => {
// 		const user = request.user;
// 		return { message: `Welcome ${user.login}`, userId: user.userId, login: user.login, mail: user.mail };
// 	});
// }

// import { auth } from '../plugins/auth.js';

fastify.get('/info', { preHandler: [fastify.auth] }, async (request, reply) => {
	const { id, login, mail, profile_picture, token } = request.user;
	return { id, login, mail, profile_picture, token };
});
