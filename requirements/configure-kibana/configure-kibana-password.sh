#!/bin/bash

# Load .env variables
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
set -a
source "$SCRIPT_DIR/.env"
set +a

echo "Waiting for Elasticsearch to be ready for authentication..."

# Wait for elastic user to be able to authenticate
until curl -s -u elastic:"$ELASTIC_PASSWORD" \
  http://es01:9200/_security/_authenticate | grep -q '"username":"elastic"'; do
  echo "Elasticsearch not responding with valid authentication. Waiting..."
  sleep 5
done

echo "Authentication successful. Setting password for kibana_system..."

# Execute password change
curl -X POST -u elastic:"$ELASTIC_PASSWORD" \
  "http://es01:9200/_security/user/kibana_system/_password" \
  -H "Content-Type: application/json" \
  -d "{ \"password\": \"${KIBANA_SYSTEM_PASSWORD}\" }"

echo "Password updated successfully."