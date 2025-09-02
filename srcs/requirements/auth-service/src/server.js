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
import { authCheck } from '../plugins/auth.js';
import { uploadProfilePictureRoute } from '../routes/uploadProfilePictureRoute.js';
import { logoutRoute } from '../routes/logoutRoute.js';
import { editProfileRoute, GDPRManagementRoute, twofaManagementRoute } from '../routes/editProfileRoute.js';
import { eraseAccountRoute } from '../routes/eraseAccountRoute.js';
import { getSecretFromFile } from '../utils/loadSecretKey.js';
import { FriendsRoute } from '../routes/manageFriends.js';
import { infoUserRoute } from '../routes/infoUserRoute.js';
import {deleteExpiredSessions} from '../utils/sessionTokens.js';
import { googleRoute } from '../routes/google.js';
import { matchesRoutes } from '../routes/matchesRoute.js';
import { tournamentsRoutes } from '../routes/tournamentsRoute.js';
import { statsRoutes } from '../routes/statsRoute.js';

// Load environment variables
dotenv.config();

const app = fastify({
//   logger: true // Enable logging for production
});

await app.register(multipart);//to receive images

app.register(fastifyCookie, {
  secret: getSecretFromFile('COOKIE_SECRET','super-secret-key'), //to sign ur cookie // you should put it in a env file
});

app.register(fastifyCors, {
  origin: process.env.CORS_ORIGIN || 'https://localhost:4443',
  credentials: true,
});


app.register(fastifyJwt, {
  secret: getSecretFromFile('JWT_SECRET', 'super-secret-key'),// you should put it in a env file
  cookie: {
    cookieName: 'auth_token',
    signed: false,
  }
});

app.decorate('auth', authCheck);

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.register(fastifyStatic, {
  root: path.join(__dirname, 'public'),
  prefix: '/profile_pictures/',
});

app.register(loginRoute); // users/check and /users/sesions
app.register(registerRoute); // /users/verify and /users
app.register(uploadProfilePictureRoute);
app.register(infoUserRoute);  // me/info and me/status api calls
app.register(twofaManagementRoute);
app.register(GDPRManagementRoute);
app.register(editProfileRoute);//post
app.register(eraseAccountRoute); // delete /me
app.register(FriendsRoute); // /friends routes
app.register(logoutRoute);  // delete /me/sessions
app.register(googleRoute);
app.register(statsRoutes);
app.register(matchesRoutes);
app.register(tournamentsRoutes);

// --- Cleanup expired sessions daily ---
setInterval(() => {
  const removed = deleteExpiredSessions();
  if (removed > 0) console.log(`Deleted ${removed} expired sessions`);
}, 24 * 60 * 60 * 1000); // every 24h

// Optional: run once at startup
const removed = deleteExpiredSessions();
if (removed > 0) console.log(`Deleted ${removed} expired sessions at startup`)

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

