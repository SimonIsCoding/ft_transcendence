all:
	docker-compose -f ./srcs/docker-compose.yml up -d --build
	@docker exec -it website npm install typescript > .osef
	@docker exec -it website npx tsc
	@rm -rf .osef

stop:
	cd ./srcs && docker-compose down

retry: stop all

status:
	docker ps

live:
	@docker exec -it website npm install typescript > .osef
	@docker exec -it website npx tsc
	@rm -rf .osef

clean:
	docker ps -qa | xargs -r docker rm || true
	docker images -q | xargs -r docker rmi -f || true
	docker volume ls -q | xargs -r docker volume rm || true
	docker network ls -q | xargs -r docker network rm || true
	# sudo rm -rf $(HOME)/data 

fclean: stop clean

re: fclean all

.PHONY: all stop clean fclean re

