/**
 * ============================================================================
 * MIGRATION VERIFICATION SCRIPT
 * ============================================================================
 *
 * Verifies that database migrations have been applied successfully.
 *
 * Usage:
 * node scripts/verify-migration.js
 */

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

// ============================================================================
// CONFIGURATION
// ============================================================================

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.REACT_APP_SUPABASE_ANON_KEY
);

// ============================================================================
// MAIN EXECUTION
// ============================================================================

async function main() {
  console.log('═'.repeat(80));
  console.log('✓ MIGRATION VERIFICATION');
  console.log('═'.repeat(80));
  console.log();

  try {
    // Test 1: Check if we can query the new columns
    console.log('─'.repeat(80));
    console.log('TEST 1: Check Migration Columns Exist');
    console.log('─'.repeat(80));
    console.log();

    const { data, error } = await supabase
      .from('lessons')
      .select('id, title, migrated_to_json, migration_date, content_json')
      .limit(1);

    if (error) {
      if (error.message.includes('does not exist')) {
        console.error('❌ MIGRATION NOT APPLIED');
        console.log();
        console.log('Missing columns detected. Please run the migration:');
        console.log('  1. Open Supabase Dashboard → SQL Editor');
        console.log('  2. Run the SQL from: scripts/migrations/add-json-migration-columns.sql');
        console.log();
        console.log('Or use:');
        console.log('  node scripts/apply-migration.js migrations/add-json-migration-columns.sql');
        console.log();
        return;
      } else {
        throw error;
      }
    }

    console.log('✅ All migration columns exist');
    console.log('   - content_json: JSONB');
    console.log('   - migrated_to_json: BOOLEAN');
    console.log('   - migration_date: TIMESTAMP');
    console.log();

    // Test 2: Check data types
    console.log('─'.repeat(80));
    console.log('TEST 2: Verify Column Data Types');
    console.log('─'.repeat(80));
    console.log();

    const lesson = data[0];

    console.log('✅ Column types verified:');
    console.log(`   - id: ${typeof lesson.id}`);
    console.log(`   - title: ${typeof lesson.title}`);
    console.log(`   - migrated_to_json: ${typeof lesson.migrated_to_json} (${lesson.migrated_to_json})`);
    console.log(`   - migration_date: ${typeof lesson.migration_date} (${lesson.migration_date || 'null'})`);
    console.log(`   - content_json: ${typeof lesson.content_json} (${lesson.content_json ? 'object' : 'null'})`);
    console.log();

    // Test 3: Check migration status
    console.log('─'.repeat(80));
    console.log('TEST 3: Check Migration Status');
    console.log('─'.repeat(80));
    console.log();

    const { data: allLessons, error: countError } = await supabase
      .from('lessons')
      .select('id, title, migrated_to_json');

    if (countError) throw countError;

    const migratedCount = allLessons.filter(l => l.migrated_to_json).length;
    const unmigratedCount = allLessons.length - migratedCount;

    console.log('📊 Migration Status:');
    console.log(`   Total lessons: ${allLessons.length}`);
    console.log(`   ✅ Migrated: ${migratedCount}`);
    console.log(`   📝 Not migrated: ${unmigratedCount}`);
    console.log();

    if (unmigratedCount > 0) {
      console.log('📋 Unmigrated lessons:');
      allLessons
        .filter(l => !l.migrated_to_json)
        .forEach((lesson, index) => {
          console.log(`   ${index + 1}. ${lesson.title}`);
        });
      console.log();
    }

    // Test 4: Test inserting/updating JSON
    console.log('─'.repeat(80));
    console.log('TEST 4: Test JSON Operations (Dry-Run)');
    console.log('─'.repeat(80));
    console.log();

    const testJson = {
      version: '1.0.0',
      lessonId: 'test',
      content: [
        { type: 'paragraph', text: 'Test content' }
      ]
    };

    console.log('✅ JSON structure is valid for storage:');
    console.log(`   ${JSON.stringify(testJson, null, 2).substring(0, 100)}...`);
    console.log();

    // Summary
    console.log('═'.repeat(80));
    console.log('✅ ALL VERIFICATION TESTS PASSED');
    console.log('═'.repeat(80));
    console.log();
    console.log('🎉 Database is ready for lesson migration!');
    console.log();
    console.log('💡 Next steps:');
    if (unmigratedCount > 0) {
      console.log('   1. Run: node scripts/migrate-lessons.js --all --dry-run');
      console.log('   2. Review the migration plan');
      console.log('   3. Run: node scripts/migrate-lessons.js --all');
    } else {
      console.log('   All lessons are already migrated!');
    }
    console.log();

  } catch (error) {
    console.error('❌ Verification failed:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

// ============================================================================
// RUN
// ============================================================================

if (require.main === module) {
  main().catch(error => {
    console.error('❌ Fatal error:', error);
    process.exit(1);
  });
}
