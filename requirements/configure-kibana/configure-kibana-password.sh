#!/bin/sh

echo "Waiting for Elasticsearch to be ready for authentication..."

until curl -s -u elastic:"$ELASTIC_PASSWORD" \
  http://es01:9200/_security/_authenticate | grep -q '"username":"elastic"'; do
  echo "Elasticsearch not responding with valid authentication. Waiting..."
  sleep 5
done

echo "Authentication successful. Setting password for kibana_system..."

curl -X POST -u elastic:"$ELASTIC_PASSWORD" \
  "http://es01:9200/_security/user/kibana_system/_password" \
  -H "Content-Type: application/json" \
  -d "{ \"password\": \"${KIBANA_SYSTEM_PASSWORD}\" }"

echo "Password updated successfully."

