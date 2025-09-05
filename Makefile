COMPOSE_FILE = ./srcs/docker-compose.yml
PROJECT_PATH := $(shell pwd)
export PROJECT_PATH

all:
	mkdir -p srcs/data/pong
	mkdir -p srcs/data/DB
	docker compose -f $(COMPOSE_FILE) build --no-cache
	docker compose -f $(COMPOSE_FILE) up -d --remove-orphans
	sleep 2
	$(MAKE) configure-kibana-password
	docker ps

webupdate:
	# Just rebuild nginx (this will also rebuild the frontend in builder stage)
	docker compose -f $(COMPOSE_FILE) build nginx
	docker compose -f $(COMPOSE_FILE) up -d --no-deps nginx
	# optional reload if container is already running
	docker exec nginx /usr/sbin/nginx -s reload || true
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

	# Opcional: limpiar la carpeta de build del frontend
	cd webdev/pong && npm run clean || true

re: fclean all

.PHONY: all stop clean fclean re auth-service 2fa-service

