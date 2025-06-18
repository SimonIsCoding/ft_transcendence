FROM debian:bullseye

#Install nginx openssl
RUN apt-get update && apt-get -y install \
	nginx \
	gosu \
	openssl

COPY ./tools/nginxentry.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/nginxentry.sh

RUN chmod 755 /etc/nginx && \
    chmod 644 /etc/nginx/nginx.conf

EXPOSE 443

ENTRYPOINT ["nginxentry.sh"]

#CMD ["nginx", "-g", "daemon off;"]
