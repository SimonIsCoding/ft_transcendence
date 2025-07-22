# Use Node.js LTS Alpine image
FROM node:18-alpine

# Create app directory
WORKDIR /app

# Install dependencies first for better caching
COPY package.json .
RUN npm install --production

# Copy app source
COPY server.js .

# Environment variables
ENV NODE_ENV=production
ENV JWT_SECRET=your_jwt_secret
ENV KEY_PATH=/run/secrets/server_key
ENV CERT_PATH=/run/secrets/server_cert

# Expose WS port
EXPOSE 3002

# Health check
HEALTHCHECK --interval=30s --timeout=3s \
  CMD wget --no-verbose --tries=1 --spider https://localhost:3000/health || exit 1

# Run server
CMD ["node", "server.js"]