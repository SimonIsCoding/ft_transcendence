all:
	docker-compose -f ./srcs/docker-compose.yml up -d --build

stop:
	cd ./srcs && docker-compose down

retry: stop all

status:
	docker ps

clean:
	docker ps -qa | xargs -r docker rm || true
	docker images -q | xargs -r docker rmi -f || true
	docker volume ls -q | xargs -r docker volume rm || true
	docker network ls -q | xargs -r docker network rm || true
	# sudo rm -rf $(HOME)/data 

fclean: stop clean

re: fclean all

.PHONY: all stop clean fclean re

