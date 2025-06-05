FROM	nginx:1.25-alpine

RUN		mkdir -p /etc/nginx/ssl && \
	    apk add --no-cache openssl && \
	    openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
    	-keyout /etc/nginx/ssl/nginx.key \
	    -out /etc/nginx/ssl/nginx.crt \
    	-subj "/C=ES/L=Barcelona/CN=ft_transcendence.42.fr"

COPY	default.conf /etc/nginx/conf.d/default.conf
COPY	nginx.conf	/etc/nginx/nginx.conf
