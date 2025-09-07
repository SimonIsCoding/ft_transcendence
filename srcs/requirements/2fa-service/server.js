// requirements/2fa-service/server.js
import fastify from 'fastify';
import fastifyJwt from '@fastify/jwt';
import fastifyCookie from '@fastify/cookie';
import helmet from '@fastify/helmet';
import rateLimit from '@fastify/rate-limit';
import cors from '@fastify/cors';
import { config } from './config.js';
import authRoutes from './routes/twofaRoutes.js';
import dotenv from 'dotenv';


// Load environment variables
dotenv.config();

// Initialize Fastify
const server = fastify({ 
//   logger: true,
  trustProxy: true 
});

await server.register(fastifyJwt, {
  secret: config.JWT_SECRET,
});

server.register(fastifyCookie, {
  secret: config.COOKIE_SECRET, //to sign ur cookie // you should put it in a env file
});

// Security Middleware
await server.register(helmet);
await server.register(rateLimit, {
  max: 100,
  timeWindow: '1 minute'
});

// CORS
await server.register(cors, {
  origin: config.CORS_ORIGINS,
  methods: ['POST', 'OPTIONS']
});

// Database (SQLite)
import './services/dbService.js';

// Routes
await server.register(authRoutes);

// Health Check
server.get('/health', async () => ({ status: 'ok' }));

// Start Server
try {
// Add to debug routes
  await server.listen({
    port: config.PORT,
    host: '0.0.0.0'
  });
  server.log.info(`2FA Service running on port ${config.PORT}`);
} catch (err) {
  server.log.error(err);
  process.exit(1);
}
