import fastify from 'fastify';
import fastifyJwt from '@fastify/jwt';
import fastifyCookie from '@fastify/cookie';
import fastifyCors from '@fastify/cors';
import multipart from '@fastify/multipart';
import fastifyStatic from '@fastify/static';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { loginRoute } from '../routes/loginRoute.js';
import { registerRoute } from '../routes/registerRoute.js';
import { auth } from '../plugins/auth.js';
import { uploadProfilePictureRoute } from '../routes/uploadProfilePictureRoute.js';
import { logoutRoute } from '../routes/logoutRoute.js';
import { infoUserRoute } from '../routes/infoUserRoute.js';
import { statusRoute } from '../routes/userLoggedRoute.js';

const app = fastify();

await app.register(multipart);//to receive images

app.register(fastifyCookie, {
  secret: 'super-secret-key', //to sign ur cookie // you should put it in a env file
});

app.register(fastifyCors, {
  origin: 'https://localhost:4443',
  credentials: true,
});

app.register(fastifyJwt, {
  secret: 'super-secret-key',// you should put it in a env file
  cookie: {
    cookieName: 'token',
    signed: false,
  }
});

app.decorate('auth', auth);

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.register(fastifyStatic, {
  root: path.join(__dirname, 'public'),
  prefix: '/profile_pictures/',
});

app.register(loginRoute);
app.register(registerRoute);
await uploadProfilePictureRoute(app);
await infoUserRoute(app);
await logoutRoute(app);
await statusRoute(app);

app.get('/info', { preHandler: [app.auth] }, async (request, reply) => {
  const user = request.user;
  return {
    message: `Welcome ${user.login}`,
    userId: user.userId,
    login: user.login,
    mail: user.mail,
	profile_picture: user.profile_picture, 
	token: user.token
  };
});

app.post('/', async (request, reply) => {
  const data = request.body;
  console.log(data);// to use data
  return { status: "status ok" };
});

app.listen({ port: 3001, host: '0.0.0.0' }, err => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log('Auth service running on http://localhost:3001');
});
