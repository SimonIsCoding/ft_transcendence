import fastify from 'fastify';
import { loginRoute, registerRoute } from './src/login.js';
import fastifyJwt from '@fastify/jwt';
import fastifyCookie from '@fastify/cookie';

const app = fastify();

app.register(loginRoute);
app.register(registerRoute);
app.register(fastifyCookie);
app.register(fastifyJwt, {
  secret: 'super-secret-key', // 🔒 it should be an env variable
  cookie: {
    cookieName: 'token',
    signed: false,
  }
});

app.decorate("auth", async (request, reply) => {
  try {
    await request.jwtVerify();
  } catch (err) {
    reply.status(401).send({ error: 'Unauthorized' });
  }
});

app.get('/api/auth/info', { preHandler: [app.auth] }, async (request, reply) => {
  const user = request.user;
  return { message: `Welcome ${user.login}`, alias: user.alias };
});

app.get('/api/auth/debug-token', async (request, reply) => {
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
