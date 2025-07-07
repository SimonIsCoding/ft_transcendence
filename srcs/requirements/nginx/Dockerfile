FROM debian:bullseye

#Install nginx openssl
RUN apt-get update && apt-get -y install \
	nginx \
	gosu \
	openssl \
	bash

COPY ./tools/nginxentry.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/nginxentry.sh

EXPOSE 443

ENTRYPOINT ["nginxentry.sh"]

#CMD ["nginx", "-g", "daemon off;"]
