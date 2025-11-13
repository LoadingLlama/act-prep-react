#!/bin/bash

##############################################################################
# Direct Database Restoration Script
# Restores RESTORE_FULL_CONTENT.sql to Supabase using psql
##############################################################################

set -e  # Exit on error

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${BLUE}╔════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║   Supabase Direct Database Restoration    ║${NC}"
echo -e "${BLUE}╔════════════════════════════════════════════╗${NC}"
echo ""

# Configuration
PROJECT_ID="rabavobdklnwvwsldbix"
SQL_FILE="./RESTORE_FULL_CONTENT.sql"
PSQL_PATH="/opt/homebrew/opt/postgresql@15/bin/psql"

# Validate SQL file exists
if [ ! -f "$SQL_FILE" ]; then
    echo -e "${RED}❌ Error: SQL file not found at $SQL_FILE${NC}"
    exit 1
fi

FILE_SIZE=$(du -h "$SQL_FILE" | cut -f1)
echo -e "${GREEN}✓${NC} SQL file found: $SQL_FILE (${FILE_SIZE})"
echo ""

# Get database password
echo -e "${YELLOW}🔐 Enter your Supabase database password:${NC}"
echo -e "   ${BLUE}(Find it at: Supabase Dashboard → Settings → Database → Database password)${NC}"
read -s -p "   Password: " DB_PASSWORD
echo ""
echo ""

if [ -z "$DB_PASSWORD" ]; then
    echo -e "${RED}❌ Error: Password cannot be empty${NC}"
    exit 1
fi

# Build connection string
DB_HOST="db.${PROJECT_ID}.supabase.co"
DB_PORT="5432"
DB_NAME="postgres"
DB_USER="postgres"
CONNECTION_STRING="postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}"

echo -e "${BLUE}📡 Connecting to: ${DB_HOST}${NC}"
echo ""

# Test connection first
echo -e "${YELLOW}⏳ Testing database connection...${NC}"
if ! $PSQL_PATH "$CONNECTION_STRING" -c "SELECT version();" > /dev/null 2>&1; then
    echo -e "${RED}❌ Connection failed!${NC}"
    echo -e "${RED}   Please check:${NC}"
    echo -e "${RED}   1. Your password is correct${NC}"
    echo -e "${RED}   2. Your IP is allowed in Supabase (Settings → Database → Connection pooling)${NC}"
    echo -e "${RED}   3. Database is not paused${NC}"
    exit 1
fi
echo -e "${GREEN}✓${NC} Connection successful!"
echo ""

# Execute SQL file
echo -e "${BLUE}╔════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║   Starting SQL Restoration...             ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════════╝${NC}"
echo ""

START_TIME=$(date +%s)

# Run the SQL file with progress
echo -e "${YELLOW}⏳ Executing SQL file (this may take 30-60 seconds)...${NC}"
echo ""

if $PSQL_PATH "$CONNECTION_STRING" -f "$SQL_FILE" -v ON_ERROR_STOP=1; then
    END_TIME=$(date +%s)
    DURATION=$((END_TIME - START_TIME))

    echo ""
    echo -e "${GREEN}╔════════════════════════════════════════════╗${NC}"
    echo -e "${GREEN}║   ✓ Restoration Completed Successfully!   ║${NC}"
    echo -e "${GREEN}╚════════════════════════════════════════════╝${NC}"
    echo ""
    echo -e "${GREEN}⏱  Duration: ${DURATION} seconds${NC}"
    echo ""

    # Verify restoration
    echo -e "${YELLOW}📊 Verifying restoration...${NC}"
    LESSON_COUNT=$($PSQL_PATH "$CONNECTION_STRING" -t -c "SELECT COUNT(*) FROM lessons;")
    echo -e "${GREEN}✓${NC} Total lessons in database: ${LESSON_COUNT}"
    echo ""

    if [ "$LESSON_COUNT" -ge 84 ]; then
        echo -e "${GREEN}🎉 All 84 lessons restored successfully!${NC}"
    else
        echo -e "${YELLOW}⚠️  Warning: Expected 84 lessons, found ${LESSON_COUNT}${NC}"
    fi

else
    echo ""
    echo -e "${RED}╔════════════════════════════════════════════╗${NC}"
    echo -e "${RED}║   ✗ Restoration Failed                    ║${NC}"
    echo -e "${RED}╚════════════════════════════════════════════╝${NC}"
    echo ""
    echo -e "${RED}Check the error messages above for details.${NC}"
    exit 1
fi

echo ""
echo -e "${BLUE}════════════════════════════════════════════${NC}"
echo -e "${GREEN}Done! Your content has been restored.${NC}"
echo -e "${BLUE}════════════════════════════════════════════${NC}"
