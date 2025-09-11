
# Define all required secret files
SECRET_FILES = \
    ./secrets/cert.pem \
    ./secrets/key.pem \
    ./secrets/apicert.pem \
    ./secrets/apikey.pem \
    ./secrets/email_user.txt \
    ./secrets/email_password.txt \
    ./secrets/secret_key.txt \
    ./secrets/cookie_secret.txt \
    ./secrets/jwt_secret.txt

all: check-secrets
	mkdir -p data/pong
	mkdir -p data/DB
	docker compose build --no-cache
	docker compose up -d --remove-orphans
	sleep 2
# 	$(MAKE) configure-kibana-password
	docker ps

# Check if secret files exist
check-secrets:
	@echo "Checking required secret files..."
	@missing=0; \
	for file in $(SECRET_FILES); do \
		if [ ! -f "$$file" ]; then \
			echo "❌ Missing: $$file"; \
			missing=1; \
		else \
			echo "✅ Found: $$file"; \
		fi; \
	done; \
	if [ $$missing -eq 1 ]; then \
		echo ""; \
		echo "Error: Some secret files are missing!"; \
		echo "Please create the missing files before continuing."; \
		exit 1; \
	fi; \
	echo ""; \
	echo "✅ All secret files are present!"; \

w webupdate:
	docker run --rm \
	  -v webdev/pong:/app \
	  -v data/pong:/var/www/html/pong \
	  node:18-bullseye \
	  sh -c "cd /app && npm install && npm run build && cp -r dist/* /var/www/html/pong/"
	docker exec nginx /usr/sbin/nginx -s reload

auth-service: check-secrets
	docker compose up -d --build auth-service

2fa-service: check-secrets
	docker compose up -d --build 2fa-service

stop:
	docker compose down

retry: stop all

status:
	docker compose ps

configure-kibana-password:
	docker compose up configure-kibana

clean:
	docker compose down --rmi all -v
	docker image prune -af
	docker volume prune -f
	docker network prune -f

fclean: clean
	# clean db
	rm -rf srcs/data/DB/users.db
	# temporal docker command to clean pong data
	docker run --rm -v data/pong:/pong alpine sh -c "rm -rf /pong/*"

re: fclean all

.PHONY: all stop retry clean fclean re auth-service 2fa-service status w webupdate check-secrets configure-kibana-password

