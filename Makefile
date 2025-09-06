COMPOSE_FILE = ./srcs/docker-compose.yml
PROJECT_PATH := $(shell pwd)
export PROJECT_PATH

all:
	# docker compose -f $(COMPOSE_FILE) up -d --build
	docker compose -f $(COMPOSE_FILE) build --no-cache
	docker compose -f $(COMPOSE_FILE) up -d --remove-orphans
	sleep 2
	$(MAKE) configure-kibana-password
	docker ps

w webupdate:
	docker run --rm \
	  -v $(PROJECT_PATH)/webdev/pong:/app \
	  -v $(PROJECT_PATH)/srcs/data/pong:/var/www/html/pong \
	  node:18-bullseye \
	  sh -c "cd /app && npm install && npm run build && cp -r dist/* /var/www/html/pong/"
	docker exec nginx /usr/sbin/nginx -s reload

auth-service:
	docker compose -f $(COMPOSE_FILE) up -d --build auth-service
#to rebuild and restart the auth-service container - useful for User Management module

2fa-service:
	docker compose -f $(COMPOSE_FILE) up -d --build 2fa-service

stop:
	docker compose -f $(COMPOSE_FILE) down

retry: stop all

status:
	docker compose -f $(COMPOSE_FILE) ps

configure-kibana-password:
	./srcs/configure-kibana-password.sh

clean:
	docker compose -f $(COMPOSE_FILE) down --rmi all -v
	docker image prune -af
	docker volume prune -f
	docker network prune -f

fclean: clean
	# clean db
	rm -rf srcs/data/DB/users.db
	# temporal docker command to clean pong data
	docker run --rm -v $(PWD)/srcs/data/pong:/pong alpine sh -c "rm -rf /pong/*"

re: fclean all

.PHONY: all stop clean fclean re auth-service 2fa-service

