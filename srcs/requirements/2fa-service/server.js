// requirements/2fa-service/server.js
import fastify from 'fastify';
import helmet from '@fastify/helmet';
import rateLimit from '@fastify/rate-limit';
import cors from '@fastify/cors';
import { config } from './config.js';
import authRoutes from './routes/authRoutes.js';

// Initialize Fastify
const server = fastify({ 
  logger: true,
  trustProxy: true 
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
await server.register(
  async (fastify) => {
    await fastify.register(authRoutes);
  },
  { prefix: '/api/2fa' }
);

// Health Check
server.get('/health', async () => ({ status: 'ok' }));

// Start Server
try {
// Add to debug routes
// console.log('Registered routes:');
// console.log(server.printRoutes());
  await server.listen({
    port: config.PORT,
    host: '0.0.0.0'
  });
  server.log.info(`2FA Service running on port ${config.PORT}`);
} catch (err) {
  server.log.error(err);
  process.exit(1);
}
