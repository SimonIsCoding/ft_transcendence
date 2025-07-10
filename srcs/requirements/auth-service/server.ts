import fastify from 'fastify';
import { loginRoute, registerRoute } from './src/login';

const app = fastify();

app.register(loginRoute); // tu enregistres bien la route
app.register(registerRoute);

app.listen({ port: 3001, host: '0.0.0.0' }, err => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log('Auth service running on http://localhost:3001');
});
