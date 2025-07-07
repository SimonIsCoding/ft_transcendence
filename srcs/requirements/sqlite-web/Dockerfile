FROM python:3.9-slim
RUN pip install sqlite-web
WORKDIR /app
EXPOSE 9090
# sqlite on webserver
CMD ["sqlite_web", "--host=0.0.0.0", "--port=9090", "users.db"]
