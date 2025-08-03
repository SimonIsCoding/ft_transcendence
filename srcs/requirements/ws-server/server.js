import Fastify from 'fastify';
import fastifyWebsocket from '@fastify/websocket';
import fastifyCors from '@fastify/cors';
import { readFileSync } from 'fs';

// Config
const PORT = 3002;
const HOST = '0.0.0.0';
const SSL_ENABLED = process.env.SSL_ENABLED === 'true';

// Initialize Fastify with basic logger
const server = Fastify({
  https: SSL_ENABLED ? {
    key: readFileSync(process.env.KEY_PATH || '/run/secrets/server_key'),
    cert: readFileSync(process.env.CERT_PATH || '/run/secrets/server_cert')
  } : null,
  logger: true // Simple built-in logger
});

// Register plugins
await server.register(fastifyCors, {
  origin: ['https://localhost:4443'],
  credentials: true
});

await server.register(fastifyWebsocket);

// WebSocket route
server.get('/ws', { websocket: true }, (connection, req) => {
  server.log.info(`New connection from ${req.ip}`);
  connection.socket.send('SERVER_READY');
  
  connection.socket.on('message', (message) => {
    server.log.info(`Received: ${message}`);
    const textMessage = message.toString(); 
    connection.socket.send(`ECHO:${textMessage}`);
  });
});

// Start server
try {
  await server.listen({ port: PORT, host: HOST });
  server.log.info(`WS server ready on port ${PORT}`);
} catch (err) {
  server.log.error(err);
  process.exit(1);
}

