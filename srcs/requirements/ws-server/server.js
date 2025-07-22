import Fastify from 'fastify';
import fastifyWebsocket from '@fastify/websocket';
import fastifyCors from '@fastify/cors';
import { readFileSync } from 'fs';
import jwt from 'jsonwebtoken';

// Initialize Fastify with HTTPS
const server = Fastify({
  https: {
    key: readFileSync(process.env.KEY_PATH),
    cert: readFileSync(process.env.CERT_PATH),
  },
  logger: true
});

// Register plugins
await server.register(fastifyCors, {
  origin: 'https://localhost:4443',
  credentials: true
});

await server.register(fastifyWebsocket);

// Game state
const gameRooms = new Map();

// WebSocket endpoint
server.get('/ws', { websocket: true }, (connection, req) => {
  try {
    // Auth - extract from cookies or headers
    const token = req.headers['sec-websocket-protocol'] || 
                 req.cookies?.session_token;
    
    const { playerId, roomId } = jwt.verify(token, process.env.JWT_SECRET);
    
    if (!gameRooms.has(roomId)) {
      gameRooms.set(roomId, new Set());
    }
    const room = gameRooms.get(roomId);
    
    // Add client to room
    room.add(connection.socket);
    
    connection.socket.on('message', (raw) => {
      const message = JSON.parse(raw.toString());
      
      // Broadcast to all in room except sender
      room.forEach(client => {
        if (client !== connection.socket && client.readyState === 1) {
          client.send(JSON.stringify({
            type: 'gameUpdate',
            playerId,
            ...message
          }));
        }
      });
    });
    
    connection.socket.on('close', () => {
      room.delete(connection.socket);
      if (room.size === 0) gameRooms.delete(roomId);
    });
    
  } catch (err) {
    connection.socket.close(1008, 'Authentication failed');
  }
});

// Health check
server.get('/health', async () => ({ status: 'ok' }));

// Start server
const start = async () => {
  try {
    await server.listen({
      port: 3002,
      host: '0.0.0.0'
    });
    console.log(`WS Server running at wss://localhost:3002`);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();