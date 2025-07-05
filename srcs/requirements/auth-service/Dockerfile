# FROM node:18-alpine
# WORKDIR /app
# COPY package*.json ./
# RUN npm install
# COPY . .
# EXPOSE 3001
# CMD ["npx", "ts-node", "server.ts"]
FROM node:18-alpine

# Installe les dépendances nécessaires pour ts-node et les types
RUN apk add --no-cache bash

# Crée et définit le répertoire de travail
WORKDIR /app

# Copie les fichiers package.json et installe les deps
COPY package*.json ./
RUN npm install --omit=dev  # ou --only=production si prod
# RUN npm install

# Copie le reste du code (y compris les .ts)
COPY . .

# Expose le port de ton service
EXPOSE 3001

# Démarre le serveur avec ts-node
CMD ["npx", "ts-node", "server.ts"]
