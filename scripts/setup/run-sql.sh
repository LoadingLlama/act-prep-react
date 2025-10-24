#!/bin/bash

# Load environment variables
export $(cat .env | xargs)

# SQL to create tables
SQL=$(cat scripts/setup/create-tables.sql)

# Execute via Supabase REST API
curl -X POST "${REACT_APP_SUPABASE_URL}/rest/v1/rpc/exec" \
  -H "apikey: ${SUPABASE_SERVICE_ROLE_KEY}" \
  -H "Authorization: Bearer ${SUPABASE_SERVICE_ROLE_KEY}" \
  -H "Content-Type: application/json" \
  -d "{\"query\": $(echo "$SQL" | jq -Rs .)}"
