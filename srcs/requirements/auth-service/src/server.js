import fastify from 'fastify';
import { loginRoute } from '../routes/loginRoute.js';
import { registerRoute } from '../routes/registerRoute.js';
import fastifyJwt from '@fastify/jwt';
import fastifyCookie from '@fastify/cookie';
import fastifyCors from '@fastify/cors';
import multipart from '@fastify/multipart';
import fastifyStatic from '@fastify/static';
import { uploadProfilePictureRoute } from '../routes/uploadProfilePictureRoute.js';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

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

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.register(fastifyStatic, {
  root: path.join(__dirname, 'public'),
  prefix: '/profile_pictures/', // images available on /
});

app.register(loginRoute);
app.register(registerRoute);
await uploadProfilePictureRoute(app);
// app.register(infoUserRoute);

app.get('/info', { preHandler: [app.auth] }, async (request, reply) => {
  const user = request.user;
  return {
    message: `Welcome ${user.login}`,
    userId: user.userId,
    login: user.login,
    mail: user.mail,
	profile_picture: user.profile_picture
  };
});//if you can add/get the token, it will be wonderful

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
