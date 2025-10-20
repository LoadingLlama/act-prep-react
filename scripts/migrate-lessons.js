/**
 * ============================================================================
 * LESSON MIGRATION SCRIPT
 * ============================================================================
 *
 * Migrates lessons from HTML content to component-based JSON format.
 * Features:
 * - Automatic backup creation before migration
 * - Rollback capability if migration fails
 * - Batch processing with progress tracking
 * - Validation of converted content
 * - Dry-run mode to preview changes
 *
 * Usage:
 * node scripts/migrate-lessons.js --dry-run          (preview migrations)
 * node scripts/migrate-lessons.js --lesson-id=ID     (migrate single lesson)
 * node scripts/migrate-lessons.js --all              (migrate all lessons)
 * node scripts/migrate-lessons.js --rollback=ID      (rollback a migration)
 *
 * SAFE: Always creates backups before modifying database
 */

const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');
const { convertHtmlToJson } = require('../src/utils/lessonConverter');
const { validateLessonContent } = require('../src/schemas/lessonContent.schema');
require('dotenv').config();

// ============================================================================
// CONFIGURATION
// ============================================================================

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.REACT_APP_SUPABASE_ANON_KEY
);

const DRY_RUN = process.argv.includes('--dry-run');
const MIGRATE_ALL = process.argv.includes('--all');
const BACKUP_DIR = path.join(__dirname, '../backups/migrations');

// ============================================================================
// COMMAND LINE ARGUMENT PARSING
// ============================================================================

function getArgValue(argName) {
  const arg = process.argv.find(a => a.startsWith(`--${argName}=`));
  return arg ? arg.split('=')[1] : null;
}

const LESSON_ID = getArgValue('lesson-id');
const ROLLBACK_ID = getArgValue('rollback');

// ============================================================================
// MAIN EXECUTION
// ============================================================================

async function main() {
  console.log('═'.repeat(80));
  console.log('🔄 LESSON MIGRATION SCRIPT');
  console.log('═'.repeat(80));
  console.log();

  if (DRY_RUN) {
    console.log('🔍 DRY-RUN MODE: No database changes will be made');
    console.log();
  }

  // Ensure backup directory exists
  ensureBackupDirectory();

  // Handle rollback
  if (ROLLBACK_ID) {
    await rollbackMigration(ROLLBACK_ID);
    return;
  }

  // Handle single lesson migration
  if (LESSON_ID) {
    await migrateSingleLesson(LESSON_ID);
    return;
  }

  // Handle batch migration
  if (MIGRATE_ALL) {
    await migrateAllLessons();
    return;
  }

  // No valid arguments - show help
  showHelp();
}

// ============================================================================
// SINGLE LESSON MIGRATION
// ============================================================================

async function migrateSingleLesson(lessonId) {
  console.log('─'.repeat(80));
  console.log(`📘 Migrating Lesson: ${lessonId}`);
  console.log('─'.repeat(80));
  console.log();

  try {
    // Step 1: Fetch lesson
    console.log('📥 Step 1: Fetching lesson from database...');
    const { data: lesson, error: fetchError } = await supabase
      .from('lessons')
      .select('*')
      .eq('id', lessonId)
      .single();

    if (fetchError) throw fetchError;

    console.log(`   ✅ Lesson fetched: "${lesson.title}"`);
    console.log(`   📊 Current content length: ${lesson.content.length} characters`);
    console.log();

    // Step 2: Create backup
    console.log('💾 Step 2: Creating backup...');
    const backupPath = createBackup(lesson);
    console.log(`   ✅ Backup created: ${path.basename(backupPath)}`);
    console.log();

    // Step 3: Convert to JSON
    console.log('🔄 Step 3: Converting HTML to JSON...');
    const jsonContent = convertHtmlToJson(lesson.content, lessonId);
    console.log(`   ✅ Conversion complete`);
    console.log(`   📦 Content blocks created: ${jsonContent.content.length}`);
    console.log();

    // Step 4: Validate
    console.log('✓ Step 4: Validating JSON...');
    const validation = validateLessonContent(jsonContent);

    if (!validation.valid) {
      console.error('   ❌ Validation failed:');
      validation.errors.forEach(err => console.error(`      - ${err}`));
      console.log();
      console.log('💡 Migration aborted. Original lesson unchanged.');
      return;
    }

    console.log('   ✅ Validation passed');
    console.log();

    // Step 5: Update database
    if (DRY_RUN) {
      console.log('🔍 Step 5: DRY-RUN - Would update database');
      console.log('   📝 Update payload:');
      console.log(`      content_json: ${JSON.stringify(jsonContent).substring(0, 100)}...`);
      console.log(`      migrated_to_json: true`);
      console.log(`      migration_date: ${new Date().toISOString()}`);
    } else {
      console.log('💾 Step 5: Updating database...');

      const { error: updateError } = await supabase
        .from('lessons')
        .update({
          content_json: jsonContent,
          migrated_to_json: true,
          migration_date: new Date().toISOString()
        })
        .eq('id', lessonId);

      if (updateError) {
        console.error('   ❌ Database update failed:', updateError.message);
        console.log();
        console.log('💡 Backup preserved at:', backupPath);
        throw updateError;
      }

      console.log('   ✅ Database updated successfully');
    }

    console.log();
    console.log('═'.repeat(80));
    console.log('✅ MIGRATION COMPLETE');
    console.log('═'.repeat(80));
    console.log();
    console.log('📊 Summary:');
    console.log(`   Lesson ID: ${lessonId}`);
    console.log(`   Title: ${lesson.title}`);
    console.log(`   Content blocks: ${jsonContent.content.length}`);
    console.log(`   Backup: ${path.basename(backupPath)}`);
    console.log();

    if (!DRY_RUN) {
      console.log('💡 To rollback this migration:');
      console.log(`   node scripts/migrate-lessons.js --rollback=${lessonId}`);
      console.log();
    }

  } catch (error) {
    console.error('❌ Migration failed:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

// ============================================================================
// BATCH MIGRATION
// ============================================================================

async function migrateAllLessons() {
  console.log('─'.repeat(80));
  console.log('📚 Migrating All Lessons');
  console.log('─'.repeat(80));
  console.log();

  try {
    // Fetch all lessons that haven't been migrated
    console.log('📥 Fetching lessons...');
    const { data: lessons, error: fetchError } = await supabase
      .from('lessons')
      .select('id, title, migrated_to_json')
      .order('created_at', { ascending: true });

    if (fetchError) throw fetchError;

    const unmigrated = lessons.filter(l => !l.migrated_to_json);

    console.log(`   ✅ Found ${lessons.length} total lessons`);
    console.log(`   📝 ${unmigrated.length} lessons need migration`);
    console.log(`   ✓ ${lessons.length - unmigrated.length} lessons already migrated`);
    console.log();

    if (unmigrated.length === 0) {
      console.log('🎉 All lessons are already migrated!');
      return;
    }

    console.log('📋 Lessons to migrate:');
    unmigrated.forEach((lesson, index) => {
      console.log(`   ${index + 1}. ${lesson.title} (${lesson.id})`);
    });
    console.log();

    if (DRY_RUN) {
      console.log('🔍 DRY-RUN: Would migrate these lessons');
      console.log();
      return;
    }

    // Migrate each lesson
    let successCount = 0;
    let failureCount = 0;
    const failures = [];

    for (let i = 0; i < unmigrated.length; i++) {
      const lesson = unmigrated[i];

      console.log('─'.repeat(80));
      console.log(`📘 [${i + 1}/${unmigrated.length}] ${lesson.title}`);
      console.log('─'.repeat(80));
      console.log();

      try {
        await migrateSingleLesson(lesson.id);
        successCount++;
        console.log('✅ Success!');
        console.log();
      } catch (error) {
        failureCount++;
        failures.push({ lesson: lesson.title, error: error.message });
        console.error(`❌ Failed: ${error.message}`);
        console.log();
      }

      // Add a small delay between migrations
      if (i < unmigrated.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 500));
      }
    }

    // Final summary
    console.log('═'.repeat(80));
    console.log('📊 BATCH MIGRATION COMPLETE');
    console.log('═'.repeat(80));
    console.log();
    console.log(`✅ Successful: ${successCount}`);
    console.log(`❌ Failed: ${failureCount}`);
    console.log();

    if (failures.length > 0) {
      console.log('⚠️  Failed lessons:');
      failures.forEach(f => {
        console.log(`   - ${f.lesson}: ${f.error}`);
      });
      console.log();
    }

  } catch (error) {
    console.error('❌ Batch migration failed:', error.message);
    process.exit(1);
  }
}

// ============================================================================
// ROLLBACK
// ============================================================================

async function rollbackMigration(lessonId) {
  console.log('─'.repeat(80));
  console.log(`⏮️  Rolling Back Lesson: ${lessonId}`);
  console.log('─'.repeat(80));
  console.log();

  try {
    // Find backup file
    console.log('🔍 Step 1: Finding backup...');
    const backupFiles = fs.readdirSync(BACKUP_DIR)
      .filter(f => f.includes(lessonId))
      .sort()
      .reverse(); // Most recent first

    if (backupFiles.length === 0) {
      console.error('   ❌ No backup found for this lesson');
      console.log();
      console.log('💡 Available backups:');
      const allBackups = fs.readdirSync(BACKUP_DIR);
      if (allBackups.length === 0) {
        console.log('   (none)');
      } else {
        allBackups.forEach(f => console.log(`   - ${f}`));
      }
      return;
    }

    const backupFile = backupFiles[0];
    const backupPath = path.join(BACKUP_DIR, backupFile);

    console.log(`   ✅ Found backup: ${backupFile}`);
    console.log();

    // Load backup
    console.log('📥 Step 2: Loading backup...');
    const backup = JSON.parse(fs.readFileSync(backupPath, 'utf8'));
    console.log(`   ✅ Backup loaded`);
    console.log(`   📝 Lesson: "${backup.title}"`);
    console.log();

    // Restore to database
    if (DRY_RUN) {
      console.log('🔍 Step 3: DRY-RUN - Would restore to database');
      console.log('   📝 Restore payload:');
      console.log(`      content: ${backup.content.substring(0, 100)}...`);
      console.log(`      migrated_to_json: false`);
    } else {
      console.log('💾 Step 3: Restoring to database...');

      const { error: updateError } = await supabase
        .from('lessons')
        .update({
          content: backup.content,
          content_json: null,
          migrated_to_json: false,
          migration_date: null
        })
        .eq('id', lessonId);

      if (updateError) throw updateError;

      console.log('   ✅ Database restored successfully');
    }

    console.log();
    console.log('═'.repeat(80));
    console.log('✅ ROLLBACK COMPLETE');
    console.log('═'.repeat(80));
    console.log();
    console.log('📊 Summary:');
    console.log(`   Lesson ID: ${lessonId}`);
    console.log(`   Restored from: ${backupFile}`);
    console.log(`   Lesson reverted to HTML format`);
    console.log();

  } catch (error) {
    console.error('❌ Rollback failed:', error.message);
    process.exit(1);
  }
}

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

function ensureBackupDirectory() {
  if (!fs.existsSync(BACKUP_DIR)) {
    fs.mkdirSync(BACKUP_DIR, { recursive: true });
  }
}

function createBackup(lesson) {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const filename = `${lesson.id}_${timestamp}.json`;
  const filepath = path.join(BACKUP_DIR, filename);

  const backup = {
    id: lesson.id,
    title: lesson.title,
    content: lesson.content,
    backed_up_at: new Date().toISOString(),
    original_updated_at: lesson.updated_at
  };

  fs.writeFileSync(filepath, JSON.stringify(backup, null, 2));

  return filepath;
}

function showHelp() {
  console.log('Usage:');
  console.log('  node scripts/migrate-lessons.js --dry-run          (preview migrations)');
  console.log('  node scripts/migrate-lessons.js --lesson-id=ID     (migrate single lesson)');
  console.log('  node scripts/migrate-lessons.js --all              (migrate all lessons)');
  console.log('  node scripts/migrate-lessons.js --rollback=ID      (rollback a migration)');
  console.log();
  console.log('Examples:');
  console.log('  node scripts/migrate-lessons.js --lesson-id=06685249-874d-431f-9b7f-1c711d64a9cf');
  console.log('  node scripts/migrate-lessons.js --all --dry-run');
  console.log('  node scripts/migrate-lessons.js --rollback=06685249-874d-431f-9b7f-1c711d64a9cf');
  console.log();
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

module.exports = {
  migrateSingleLesson,
  migrateAllLessons,
  rollbackMigration
};
