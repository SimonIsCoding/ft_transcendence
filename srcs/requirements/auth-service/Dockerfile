FROM node:18-alpine
RUN apk add --no-cache bash
WORKDIR /app
COPY package*.json ./
RUN npm install --omit=dev \
  && npm install fastify \
  && npm install --save-dev @types/node typescript ts-node
COPY . .
EXPOSE 3001
CMD ["npx", "ts-node", "server.ts"]
