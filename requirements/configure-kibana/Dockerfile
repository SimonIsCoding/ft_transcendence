FROM curlimages/curl:latest

WORKDIR /app
COPY configure-kibana-password.sh .

CMD ["/bin/sh", "-c", "./configure-kibana-password.sh"]
