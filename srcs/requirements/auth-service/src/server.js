import fastify from 'fastify';
import { loginRoute, registerRoute, infoUserRoute } from './login.js';
import fastifyJwt from '@fastify/jwt';
import fastifyCookie from '@fastify/cookie';
import fastifyCors from '@fastify/cors';
import multipart from '@fastify/multipart';
import { uploadProfilePictureRoute } from '../routes/uploadAvatar.js';

const app = fastify();

await app.register(multipart);//to receive images

app.register(fastifyCookie, {
  secret: 'super-secret-key',
});

app.register(fastifyCors, {
  origin: 'https://localhost:4443',
  credentials: true,
});

app.register(fastifyJwt, {
  secret: 'super-secret-key',
  cookie: {
    cookieName: 'token',
    signed: false,
  }
});

app.decorate('auth', async (request, reply) => {
  try
  {
	  await request.jwtVerify();
	  console.log("✅ User Authentificated :", request.user);
  }
  catch (err)
  {
    reply.status(401).send({ error: 'Unauthorized' });
  }
});

app.register(loginRoute);
app.register(registerRoute);
app.register(infoUserRoute);
await uploadProfilePictureRoute(app);

app.get('/api/private/info', { preHandler: [app.auth] }, async (request, reply) => {
  const user = request.user;
  return {
    message: `Welcome ${user.login}`,
    userId: user.userId,
    login: user.login,
    mail: user.mail,
	profile_picture: user.profile_picture
  };
});

app.post('/', async (request, reply) => {
  const data = request.body;
  console.log(data);
  return { status: "ok that's wonderful" };
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
