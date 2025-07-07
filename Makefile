COMPOSE_FILE = ./srcs/docker-compose.yml

all:
	mkdir -p srcs/data/pong
	cd webdev/pong && \
	  npm install && \
	  npm run build && \
	  sudo cp -r dist/* ../../srcs/data/pong
	#   docker compose -f $(COMPOSE_FILE) up -d --build
	docker-compose -f $(COMPOSE_FILE) build --no-cache
	docker compose -f $(COMPOSE_FILE) up -d

webupdate:
	mkdir -p srcs/data/pong
	cd webdev/pong && \
	  rm -r dist && \
	  npm install && \
	  npm run build && \
	  sudo cp -r dist/* ../../srcs/data/pong && \
	  docker exec nginx /usr/sbin/nginx -s reload

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
	cd webdev/pong && \
	  npm run clean

fclean: clean

re: fclean all

.PHONY: all stop clean fclean re

