#!/bin/bash

# ACT Prep Database Backup Script
# This script creates a full backup of your Supabase database

# Configuration
BACKUP_DIR="/Users/cadenchiang/Desktop/act-prep-react/backups"
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
BACKUP_FILE="${BACKUP_DIR}/actprep_backup_${TIMESTAMP}.sql"

# Database connection details (from your .env)
DB_HOST="aws-0-us-west-1.pooler.supabase.com"
DB_PORT="6543"
DB_NAME="postgres"
DB_USER="postgres.rabavobdklnwvwsldbix"
DB_PASSWORD="ActPrep2025!"

# Create backup directory if it doesn't exist
mkdir -p "$BACKUP_DIR"

echo "========================================="
echo "ACT Prep Database Backup"
echo "========================================="
echo "Timestamp: $(date)"
echo "Backup file: $BACKUP_FILE"
echo ""

# Create the backup using pg_dump
echo "Creating backup..."
PGPASSWORD="$DB_PASSWORD" /opt/homebrew/opt/postgresql@15/bin/pg_dump \
  -h "$DB_HOST" \
  -p "$DB_PORT" \
  -U "$DB_USER" \
  -d "$DB_NAME" \
  --no-owner \
  --no-privileges \
  --clean \
  --if-exists \
  -f "$BACKUP_FILE"

if [ $? -eq 0 ]; then
    # Get file size
    FILE_SIZE=$(ls -lh "$BACKUP_FILE" | awk '{print $5}')

    echo ""
    echo "✅ Backup completed successfully!"
    echo "File: $BACKUP_FILE"
    echo "Size: $FILE_SIZE"
    echo ""

    # Compress the backup
    echo "Compressing backup..."
    gzip "$BACKUP_FILE"
    COMPRESSED_FILE="${BACKUP_FILE}.gz"
    COMPRESSED_SIZE=$(ls -lh "$COMPRESSED_FILE" | awk '{print $5}')

    echo "✅ Compressed: ${COMPRESSED_FILE}"
    echo "Compressed size: $COMPRESSED_SIZE"
    echo ""

    # List all backups
    echo "Available backups:"
    ls -lh "$BACKUP_DIR" | grep actprep_backup

else
    echo "❌ Backup failed!"
    exit 1
fi

echo ""
echo "========================================="
echo "Backup complete!"
echo "========================================="
