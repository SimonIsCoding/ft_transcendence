#!/bin/bash

# Cargar variables del .env
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
set -a
source "$SCRIPT_DIR/.env"
set +a

echo "Esperando a que Elasticsearch esté listo para autenticación..."

# Esperar a que el usuario 'elastic' pueda autenticarse
until docker exec es01 curl -s -u elastic:"$ELASTIC_PASSWORD" \
  http://localhost:9200/_security/_authenticate | grep -q '"username":"elastic"'; do
  echo "Elastic aún no responde con autenticación válida. Esperando..."
  sleep 5
done

echo "Autenticación exitosa. Estableciendo contraseña para kibana_system..."

# Ejecutar cambio de contraseña
docker exec es01 curl -X POST -u elastic:"$ELASTIC_PASSWORD" \
  "http://localhost:9200/_security/user/kibana_system/_password" \
  -H "Content-Type: application/json" \
  -d "{ \"password\": \"${KIBANA_SYSTEM_PASSWORD}\" }"

echo "Contraseña actualizada correctamente."
