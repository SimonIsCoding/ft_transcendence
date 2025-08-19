COMPOSE_FILE = ./srcs/docker-compose.yml
PROJECT_PATH := $(shell pwd)
export PROJECT_PATH

all:
	mkdir -p srcs/data/pong
	cd webdev/pong && \
	  npm install && \
	  npm run build && \
	  sudo cp -r dist/* ../../srcs/data/pong
	# docker compose -f $(COMPOSE_FILE) up -d --build
	docker compose -f $(COMPOSE_FILE) build --no-cache
	docker compose -f $(COMPOSE_FILE) up -d --remove-orphans
	sleep 2
	docker ps

webupdate:
	mkdir -p srcs/data/pong
	cd webdev/pong && \
	  rm -rf dist && \
	  npm install && \
	  npm run build && \
	  sudo cp -r dist/* ../../srcs/data/pong && \
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

clean:
	docker compose -f $(COMPOSE_FILE) down --rmi all -v
	docker image prune -af
	docker volume prune -f
	docker network prune -f
# 	sudo rm -rf srcs/data/pong/assets/index-*
	cd webdev/pong && \
	  npm run clean

fclean: clean

re: fclean all

.PHONY: all stop clean fclean re auth-service 2fa-service

