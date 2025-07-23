
# Install using apt, but docker is bigger
#FROM debian:bullseye-slim

# Install Node.js and npm
#RUN apt-get update && \
#    apt-get install -y curl && \
#    curl -fsSL https://deb.nodesource.com/setup_lts.x | bash - && \
#    apt-get install -y nodejs && \
#    rm -rf /var/lib/apt/lists/*

FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
# RUN npm install fastify@^5 @fastify/static
# RUN npm install @fastify/cors@next
# RUN npm install @fastify/cors@^8.0.0
COPY . .
EXPOSE 3000
CMD ["node", "src/server.js"]
