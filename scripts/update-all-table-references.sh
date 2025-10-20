#!/bin/bash

# ========================================
# Update All Table References
# Replace old table names with new lesson_ prefixed names
# ========================================

echo "╔═══════════════════════════════════════════════════╗"
echo "║   Updating All Table References                  ║"
echo "╚═══════════════════════════════════════════════════╝"
echo ""

# Define replacements
declare -A replacements=(
  ["'section_content'"]="'lesson_section_content'"
  ['"section_content"']="'lesson_section_content'"
  ["from('examples')"]="from('lesson_examples')"
  ['from("examples")']="from('lesson_examples')"
  ["'examples'"]="'lesson_examples'"
  ['"examples"']="'lesson_examples'"
  ["from('term_definitions')"]="from('lesson_term_definitions')"
  ['from("term_definitions")']="from('lesson_term_definitions')"
  ["'term_definitions'"]="'lesson_term_definitions'"
  ['"term_definitions"']="'lesson_term_definitions'"
)

# Files to update
echo "📝 Files to update:"
echo "  - src/services/api/*.js"
echo "  - scripts/*.mjs"
echo "  - scripts/*.js"
echo ""

# Backup important files
echo "💾 Creating backups..."
mkdir -p backups/code-backup-$(date +%Y%m%d)
cp -r src/services/api backups/code-backup-$(date +%Y%m%d)/
cp -r scripts/*.mjs backups/code-backup-$(date +%Y%m%d)/ 2>/dev/null || true
echo "✅ Backups created in backups/code-backup-$(date +%Y%m%d)/"
echo ""

# Update service files
echo "🔄 Updating service files..."

# Update lessons.service.js
if [ -f "src/services/api/lessons.service.js" ]; then
  sed -i.bak "s/from('section_content')/from('lesson_section_content')/g" src/services/api/lessons.service.js
  sed -i.bak 's/from("section_content")/from("lesson_section_content")/g' src/services/api/lessons.service.js
  echo "  ✅ Updated lessons.service.js"
fi

# Update examples.service.js
if [ -f "src/services/api/examples.service.js" ]; then
  sed -i.bak "s/from('examples')/from('lesson_examples')/g" src/services/api/examples.service.js
  sed -i.bak 's/from("examples")/from("lesson_examples")/g' src/services/api/examples.service.js
  echo "  ✅ Updated examples.service.js"
fi

# Update termDefinitions.service.js
if [ -f "src/services/api/termDefinitions.service.js" ]; then
  sed -i.bak "s/from('term_definitions')/from('lesson_term_definitions')/g" src/services/api/termDefinitions.service.js
  sed -i.bak 's/from("term_definitions")/from("lesson_term_definitions")/g' src/services/api/termDefinitions.service.js
  echo "  ✅ Updated termDefinitions.service.js"
fi

# Update all .mjs scripts
echo ""
echo "🔄 Updating script files..."
for file in scripts/*.mjs; do
  if [ -f "$file" ]; then
    sed -i.bak "s/from('section_content')/from('lesson_section_content')/g" "$file"
    sed -i.bak "s/from('examples')/from('lesson_examples')/g" "$file"
    sed -i.bak "s/from('term_definitions')/from('lesson_term_definitions')/g" "$file"
  fi
done
echo "  ✅ Updated all .mjs scripts"

# Clean up .bak files
find . -name "*.bak" -delete

echo ""
echo "╔═══════════════════════════════════════════════════╗"
echo "║          Update Complete!                        ║"
echo "╚═══════════════════════════════════════════════════╝"
echo ""
echo "⚠️  NEXT STEPS:"
echo "1. Run the SQL in scripts/RENAME_TABLES.sql in Supabase"
echo "2. Test the app to verify everything works"
echo "3. Delete backup files if everything is working"
echo ""
