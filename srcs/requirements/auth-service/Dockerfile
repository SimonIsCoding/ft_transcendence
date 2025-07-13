FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install fastify@^5
RUN npm install bcrypt
RUN npm install better-sqlite3
RUN npm install @fastify/jwt @fastify/cookie
RUN npm install @fastify/cors
RUN npm install --save-dev @types/node typescript ts-node
RUN npm install --save-dev @types/better-sqlite3
RUN npm install --save-dev @types/bcrypt
COPY . .
EXPOSE 3001
CMD ["node", "server.js"]