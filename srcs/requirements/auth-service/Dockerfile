FROM node:18-slim
RUN apt-get install -y bash
RUN	apt-get update && apt-get install -y sqlite3
WORKDIR /app
COPY package*.json ./
RUN npm install fastify@^5
RUN npm install bcrypt
RUN npm install better-sqlite3
RUN npm install --save-dev @types/node typescript ts-node
RUN npm install --save-dev @types/better-sqlite3
RUN npm install --save-dev @types/bcrypt
COPY . .
EXPOSE 3001
CMD ["npx", "ts-node", "server.ts"]
