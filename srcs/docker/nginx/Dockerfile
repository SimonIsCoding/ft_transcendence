FROM	debian:bullseye-slim

RUN		apt update && apt upgrade -y && apt install -y nginx openssl
RUN 	mkdir -p /etc/nginx/ssl && \
	    openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
	    -keyout /etc/nginx/ssl/nginx.key \
	    -out /etc/nginx/ssl/nginx.crt \
	    -subj "/C=ES/L=Barcelona/CN=ft_transcendence.42.fr"

COPY	default.conf /etc/nginx/sites-available/.
RUN mkdir -p /etc/nginx/sites-available /etc/nginx/sites-enabled

COPY default.conf /etc/nginx/sites-available/default.conf
RUN ln -s /etc/nginx/sites-available/default.conf /etc/nginx/sites-enabled/default.conf

COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE	443

CMD		["nginx", "-g", "daemon off;"]
