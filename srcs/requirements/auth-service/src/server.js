import fastify from 'fastify';
import fastifyJwt from '@fastify/jwt';
import fastifyCookie from '@fastify/cookie';
import fastifyCors from '@fastify/cors';
import multipart from '@fastify/multipart';
import fastifyStatic from '@fastify/static';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import dotenv from 'dotenv';
import { loginRoute } from '../routes/loginRoute.js';
import { registerRoute } from '../routes/registerRoute.js';
import { auth } from '../plugins/auth.js';
import { uploadProfilePictureRoute } from '../routes/uploadProfilePictureRoute.js';
import { logoutRoute } from '../routes/logoutRoute.js';
import { infoUserRoute } from '../routes/infoUserRoute.js';
import { statusRoute } from '../routes/userLoggedRoute.js';
import db from './database.js';

// Load environment variables
dotenv.config();

const app = fastify({
  logger: true // Enable logging for production
});

await app.register(multipart);//to receive images

app.register(fastifyCookie, {
  secret: process.env.COOKIE_SECRET || 'super-secret-key', //to sign ur cookie // you should put it in a env file
});

app.register(fastifyCors, {
  origin: process.env.CORS_ORIGIN || 'https://localhost:4443',
  credentials: true,
});

app.register(fastifyJwt, {
  secret: process.env.JWT_SECRET || 'super-secret-key',// you should put it in a env file
  cookie: {
    cookieName: process.env.ENABLE_2FA === 'true' ? 'pre_2fa_token' : 'auth_token',
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

// Token Exchange Endpoint (for 2FA)
app.post('/token-exchange', { preHandler: [app.auth] }, async (request, reply) => {
  if (process.env.ENABLE_2FA !== 'true') {
    return reply.code(400).send({ error: '2FA not enabled' });
  }

  const newToken = await reply.jwtSign({
    ...request.user,
    is_2fa_verified: true
  }, {
    expiresIn: '24h'
  });

  reply
    .setCookie('auth_token', newToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      path: '/'
    })
    .clearCookie('pre_2fa_token')
    .send({ success: true });
});

//maybe you could put it in a specific file 
app.get('/info', { preHandler: [app.auth] }, async (request, reply) => {
    const userId = request.user?.id;

    if (!userId)
      return reply.status(401).send({ error: 'Not authenticated' });

    const stmt = db.prepare('SELECT id, login, mail, profile_picture FROM users WHERE id = ?');
    const user = stmt.get(userId);

    if (!user)
      return reply.status(404).send({ error: 'User not found' });

    return reply.send(user);
});

// Health Check
app.get('/health', async () => ({ status: 'OK' }));

app.post('/', async (request, reply) => {
  const data = request.body;
  console.log(data);// to use data
  return { status: "status ok" };
});

// Start Server
app.listen({ 
  port: process.env.PORT || 3001, 
  host: '0.0.0.0' 
}, (err) => {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
  console.log(`Auth service running on ${app.server.address().port}`);
});