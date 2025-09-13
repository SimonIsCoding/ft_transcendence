# --- Stage 1: build frontend ---
FROM node:18-bullseye AS builder
WORKDIR /app
COPY webdev/pong/package*.json ./
RUN npm install
COPY webdev/pong .
RUN npm run build


# --- Stage 2: nginx ---
FROM debian:bullseye

# Install nginx + tools
RUN apt-get update && apt-get -y install \
    nginx \
    gosu \
    openssl \
 && rm -rf /var/lib/apt/lists/*

COPY requirements/nginx/tools/nginxentry.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/nginxentry.sh

# Default location where nginx will serve files
RUN mkdir -p /var/www/html/pong

# Copy freshly built frontend into the image
# ⚠️ This will be overridden by the volume at runtime,
# but ensures the image is usable even without the volume.
COPY --from=builder /app/dist/ /image-dist

RUN chown -R www-data:www-data /var/www/html/pong

EXPOSE 443
ENTRYPOINT ["nginxentry.sh"]


#CMD ["nginx", "-g", "daemon off;"]
