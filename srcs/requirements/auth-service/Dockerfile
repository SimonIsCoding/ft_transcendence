FROM node:18-slim
RUN apt-get install -y bash
RUN	apt-get update && apt-get install -y sqlite3
WORKDIR /app
COPY package*.json ./
RUN npm install --omit=dev \
  && npm install fastify \
  && npm install --save-dev @types/node typescript ts-node
COPY . .
EXPOSE 3001
CMD ["npx", "ts-node", "server.ts"]
