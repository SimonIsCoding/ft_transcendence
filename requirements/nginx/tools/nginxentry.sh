#!/bin/bash
set -e

# Copy/process secrets/configs (if needed)
[ -f $FULLCHAIN_FILE ] && {
  mkdir -p /etc/nginx/certs
  cp $FULLCHAIN_FILE /etc/nginx/certs/cert.pem
  cp $PRIVKEY_FILE /etc/nginx/certs/key.pem
  chmod 400 /etc/nginx/certs/*
  chown www-data:www-data /etc/nginx/certs/*
}

TARGET=/var/www/html/pong
SOURCE=/image-dist

if [ -d "$SOURCE" ]; then
  echo "Syncing frontend build from $SOURCE to $TARGET ..."
  rm -rf "$TARGET"/*
  cp -r "$SOURCE"/* "$TARGET"/
  chown -R www-data:www-data "$TARGET"
fi

chown -R www-data:www-data /var/www/html

mkdir -p /var/cache/nginx /var/log/nginx
chown -R www-data:www-data /var/cache/nginx /var/log/nginx
chown -R www-data:www-data /var/lib/nginx

touch /run/nginx.pid
chown www-data:www-data /run/nginx.pid
chmod 644 /run/nginx.pid 

# Launch NGINX as PID 1
exec gosu www-data nginx -g "daemon off;"

