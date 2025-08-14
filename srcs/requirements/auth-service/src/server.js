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
import { statusRoute/*, userLoggedRoute*/ } from '../routes/userLoggedRoute.js';
import { editProfileRoute } from '../routes/editProfileRoute.js';
import { eraseAccountRoute } from '../routes/eraseAccountRoute.js';
import db from './database.js';
import { loadSecretKey } from '../utils/loadSecretKey.js';
import { countTotalUsers, requestFriendExistsRoute, getFriendsListRoute, getUserByIdRoute, randomEligibleOtherUserRoute, sendFriendRequestRoute, updateFriendshipStatusRoute, FriendsRoute, invitationReceivedRoute } from '../routes/manageFriends.js';

const app = fastify();
const cookieSecretKey = loadSecretKey('SECRET_KEY_FILE');

await app.register(multipart);//to receive images

app.register(fastifyCookie, {
  secret: cookieSecretKey, //to sign ur cookie
});

app.register(fastifyCors, {
  origin: 'https://localhost:4443',
  credentials: true,
});


app.register(fastifyJwt, {
  secret: cookieSecretKey,
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
await countTotalUsers(app);
await logoutRoute(app);
await statusRoute(app);
await requestFriendExistsRoute(app);
// await userLoggedRoute(app);
app.register(editProfileRoute);
app.register(eraseAccountRoute);
app.register(sendFriendRequestRoute);
app.register(FriendsRoute);
app.register(getFriendsListRoute);
app.register(invitationReceivedRoute);
app.register(updateFriendshipStatusRoute);
app.register(getUserByIdRoute);
app.register(randomEligibleOtherUserRoute);


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

//might be useless
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
