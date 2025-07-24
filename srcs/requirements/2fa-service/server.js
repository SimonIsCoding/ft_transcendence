// requirements/2fa-service/server.js
const fastify = require('fastify')({ 
  logger: true,
  trustProxy: true 
});
const config = require('./config');

// Security Middleware
fastify.register(require('@fastify/helmet'));
fastify.register(require('@fastify/rate-limit'), {
  max: 100,
  timeWindow: '1 minute'
});

// CORS (using config)
fastify.register(require('@fastify/cors'), {
  origin: config.CORS_ORIGINS,
  methods: ['POST', 'OPTIONS']
});

// Database (if using SQLite)
require('./services/dbService');

// Routes
fastify.register(require('./routes/authRoutes'), { 
  prefix: '/api/2fa' 
});

// Health Check
fastify.get('/health', async () => ({ status: 'ok' }));

// Start Server
fastify.listen({
  port: config.PORT,
  host: '0.0.0.0'
}, (err) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  fastify.log.info(`2FA Service running on port ${config.PORT}`);
});