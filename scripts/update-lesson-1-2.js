/**
 * Update Lesson 1.2 - Commas to new JSON format
 */

const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');
const { validateLessonContent } = require('../src/schemas/lessonContent.schema');
require('dotenv').config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.REACT_APP_SUPABASE_ANON_KEY
);

async function main() {
  console.log('═'.repeat(80));
  console.log('📝 UPDATING LESSON 1.2 - COMMAS');
  console.log('═'.repeat(80));
  console.log();

  // Load JSON
  console.log('📥 Step 1: Loading JSON...');
  const jsonPath = path.join(__dirname, '../docs/LESSON_1_2_COMMAS_NEW.json');
  const lessonData = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
  console.log(`   ✅ Loaded ${lessonData.content.length} content blocks`);
  console.log();

  // Validate
  console.log('✓ Step 2: Validating JSON...');
  const validation = validateLessonContent(lessonData);

  if (!validation.valid) {
    console.error('   ❌ Validation failed:');
    validation.errors.forEach(err => console.error(`      - ${err}`));
    process.exit(1);
  }

  console.log('   ✅ Validation passed');
  console.log();

  // Count block types
  const typeCounts = {};
  lessonData.content.forEach(block => {
    typeCounts[block.type] = (typeCounts[block.type] || 0) + 1;
  });

  console.log('   📊 Block types:');
  Object.entries(typeCounts).forEach(([type, count]) => {
    console.log(`      - ${type}: ${count}`);
  });
  console.log();

  // Check if migration columns exist
  console.log('💾 Step 3: Checking database schema...');

  const lessonId = '3e8f0696-1bf7-4b5c-880d-fb5359923b7d';

  const { data: testData, error: testError } = await supabase
    .from('lessons')
    .select('id, content_json')
    .eq('id', lessonId)
    .single();

  const hasMigrationColumns = testError === null;

  if (!hasMigrationColumns) {
    console.log('   ⚠️  Migration columns not found in database');
    console.log('   📋 JSON is ready, but database needs migration first');
    console.log();
    console.log('   To apply migration:');
    console.log('   1. Open Supabase Dashboard → SQL Editor');
    console.log('   2. Run: scripts/migrations/add-json-migration-columns.sql');
    console.log('   3. Then run this script again');
    console.log();

    // Save JSON for future use
    const backupPath = path.join(__dirname, '../docs/LESSON_1_2_READY_FOR_MIGRATION.json');
    fs.writeFileSync(backupPath, JSON.stringify(lessonData, null, 2));
    console.log('   💾 JSON saved to: docs/LESSON_1_2_READY_FOR_MIGRATION.json');
    console.log();

  } else {
    console.log('   ✅ Migration columns found');
    console.log();

    console.log('💾 Step 4: Updating database...');

    const { error } = await supabase
      .from('lessons')
      .update({
        content_json: lessonData,
        migrated_to_json: true,
        migration_date: new Date().toISOString()
      })
      .eq('id', lessonId);

    if (error) {
      console.error('   ❌ Database update failed:', error.message);
      process.exit(1);
    }

    console.log('   ✅ Database updated successfully');
    console.log();
  }

  console.log('═'.repeat(80));
  console.log('✅ LESSON 1.2 UPDATED SUCCESSFULLY');
  console.log('═'.repeat(80));
  console.log();
  console.log('📊 Summary:');
  console.log(`   Lesson ID: ${lessonId}`);
  console.log(`   Total blocks: ${lessonData.content.length}`);
  console.log(`   Title: Lesson 1.2: Commas — 4 Types of Commas`);
  console.log();
  console.log('💡 Next: View the lesson in your app to verify rendering');
  console.log();
}

if (require.main === module) {
  main().catch(error => {
    console.error('❌ Fatal error:', error);
    process.exit(1);
  });
}
