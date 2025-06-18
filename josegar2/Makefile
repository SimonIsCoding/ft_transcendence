COMPOSE_FILE = ./srcs/docker-compose.yml

all:
	docker compose -f $(COMPOSE_FILE) up -d --build

stop:
	docker compose -f $(COMPOSE_FILE) down

retry: stop all

status:
	docker compose -f $(COMPOSE_FILE) ps

clean:
	docker compose -f $(COMPOSE_FILE) down --rmi all -v
	docker volume prune -f
	docker network prune -f
	# sudo rm -rf $(HOME)/data 

fclean: clean

re: fclean all

.PHONY: all stop clean fclean re

