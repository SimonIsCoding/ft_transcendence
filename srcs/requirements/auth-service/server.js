import fastify from 'fastify';
import { loginRoute, registerRoute } from './src/login.js';

const app = fastify();

app.register(loginRoute);
app.register(registerRoute);

app.listen({ port: 3001, host: '0.0.0.0' }, err => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log('Auth service running on http://localhost:3001');
});
