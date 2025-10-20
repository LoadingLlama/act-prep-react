#!/bin/bash

# Execute the SQL fix for lesson_examples foreign key

echo "╔════════════════════════════════════════════════════════╗"
echo "║  Executing lesson_examples Foreign Key Fix via psql   ║"
echo "╚════════════════════════════════════════════════════════╝"
echo ""

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SQL_FILE="$SCRIPT_DIR/FIX_LESSON_EXAMPLES_FK.sql"

if [ ! -f "$SQL_FILE" ]; then
    echo "❌ SQL file not found: $SQL_FILE"
    exit 1
fi

echo "📄 Executing SQL from: $SQL_FILE"
echo ""

# Execute via psql
PGPASSWORD="Cheeseburg3r!" /opt/homebrew/opt/postgresql@15/bin/psql \
    -h aws-0-us-west-1.pooler.supabase.com \
    -p 6543 \
    -U postgres.cevtplwchmltdoaoxzvc \
    -d postgres \
    -f "$SQL_FILE"

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ SQL executed successfully!"
    echo ""
    echo "🔍 Verifying..."
    echo ""

    # Verify that examples now reference lessons table
    PGPASSWORD="Cheeseburg3r!" /opt/homebrew/opt/postgresql@15/bin/psql \
        -h aws-0-us-west-1.pooler.supabase.com \
        -p 6543 \
        -U postgres.cevtplwchmltdoaoxzvc \
        -d postgres \
        -c "SELECT e.id, e.lesson_id, l.lesson_key FROM lesson_examples e JOIN lessons l ON e.lesson_id = l.id LIMIT 3;"

    echo ""
    echo "✅ Verification complete!"
else
    echo ""
    echo "❌ SQL execution failed"
    exit 1
fi
