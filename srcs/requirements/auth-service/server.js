import fastify from 'fastify';
import { loginRoute, registerRoute, infoUserRoute } from './src/login.js';
import fastifyJwt from '@fastify/jwt';
import fastifyCookie from '@fastify/cookie';
import fastifyCors from '@fastify/cors';

const app = fastify();

app.register(loginRoute);
app.register(registerRoute);
app.register(infoUserRoute);

app.register(fastifyCookie, {
  secret: 'super-secret-key',
});

app.register(fastifyCors, {
  origin: 'https://localhost:4443',
  credentials: true,
});

app.register(fastifyJwt, {
  secret: 'super-secret-key', // 🔒 it should be an env variable
  cookie: {
    cookieName: 'token',
    signed: false,
  }
});

app.decorate("auth", async (request, reply) => {
	try
	{
	await request.jwtVerify();
	}
	catch (err)
	{
	reply.status(401).send({ error: 'Unauthorized' });
	}
});

// en gros la tu crees une route qui va te retourner les informations dont tu as besoin
// si tu as besoin de ces infos tu vas appeler l'adresse avec la methode get
app.get('/api/private/info', { preHandler: [app.auth] }, async (request, reply) => {
  const user = request.user;
  return { message: `Welcome ${user.login}`, userId: user.userId, login: user.login, alias: user.alias };
});

// app.get('/api/auth/info', { preHandler: [app.auth] }, async (request, reply) => {
//   const user = request.user; // JWT payload
//   return { userId: user.userId };
// });
app.post('/', async (request, reply) => {
  const data = request.body;
  console.log(data); // pour tester
  return { status: 'ok that\'s wonderful' };
});

app.get('/debug-token', async (request, reply) => {
  const token = request.cookies.token;
  console.log("JWToken :", token);
  return { token };
});

app.listen({ port: 3001, host: '0.0.0.0' }, err => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log('Auth service running on http://localhost:3001');
});