/**
 * ============================================================================
 * DATABASE MIGRATION APPLIER
 * ============================================================================
 *
 * Applies SQL migrations to the Supabase database.
 *
 * Usage:
 * node scripts/apply-migration.js migrations/add-json-migration-columns.sql
 * node scripts/apply-migration.js migrations/add-json-migration-columns.sql --dry-run
 *
 * IMPORTANT: This uses Supabase service role key for admin operations
 */

const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

// ============================================================================
// CONFIGURATION
// ============================================================================

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.REACT_APP_SUPABASE_ANON_KEY
);

const DRY_RUN = process.argv.includes('--dry-run');

// ============================================================================
// MAIN EXECUTION
// ============================================================================

async function main() {
  console.log('═'.repeat(80));
  console.log('🗄️  DATABASE MIGRATION APPLIER');
  console.log('═'.repeat(80));
  console.log();

  // Get migration file path
  const migrationArg = process.argv.find(arg => !arg.includes('node') && !arg.includes('apply-migration') && !arg.includes('--'));

  if (!migrationArg) {
    console.error('❌ Error: No migration file specified');
    console.log();
    console.log('Usage:');
    console.log('  node scripts/apply-migration.js migrations/MIGRATION_FILE.sql');
    console.log('  node scripts/apply-migration.js migrations/MIGRATION_FILE.sql --dry-run');
    console.log();
    process.exit(1);
  }

  // Resolve migration file path
  const migrationPath = path.isAbsolute(migrationArg)
    ? migrationArg
    : path.join(__dirname, migrationArg);

  if (!fs.existsSync(migrationPath)) {
    console.error(`❌ Error: Migration file not found: ${migrationPath}`);
    process.exit(1);
  }

  console.log(`📄 Migration file: ${path.basename(migrationPath)}`);
  console.log();

  if (DRY_RUN) {
    console.log('🔍 DRY-RUN MODE: Will display SQL but not execute');
    console.log();
  }

  // Read migration file
  console.log('📥 Reading migration file...');
  const sql = fs.readFileSync(migrationPath, 'utf8');

  // Clean and parse SQL
  const sqlStatements = sql
    .split(';')
    .map(s => s.trim())
    .filter(s => s.length > 0 && !s.startsWith('--') && !s.startsWith('/*'));

  console.log(`   ✅ Loaded ${sqlStatements.length} SQL statements`);
  console.log();

  if (DRY_RUN) {
    console.log('─'.repeat(80));
    console.log('SQL TO EXECUTE:');
    console.log('─'.repeat(80));
    console.log();
    console.log(sql);
    console.log();
    console.log('─'.repeat(80));
    console.log();
    console.log('💡 Remove --dry-run flag to execute this migration');
    console.log();
    return;
  }

  // Execute migration
  console.log('🔄 Applying migration...');
  console.log();

  try {
    // Note: Supabase client doesn't directly support raw SQL execution for DDL
    // We need to use the Supabase dashboard SQL editor or PostgreSQL connection
    console.log('⚠️  IMPORTANT: This migration needs to be run manually');
    console.log();
    console.log('📋 Instructions:');
    console.log('   1. Go to your Supabase Dashboard');
    console.log('   2. Navigate to: SQL Editor');
    console.log('   3. Create a new query');
    console.log('   4. Copy and paste the SQL from:');
    console.log(`      ${migrationPath}`);
    console.log('   5. Click "Run" to execute');
    console.log();
    console.log('─'.repeat(80));
    console.log('SQL TO RUN:');
    console.log('─'.repeat(80));
    console.log();
    console.log(sql);
    console.log();
    console.log('─'.repeat(80));
    console.log();
    console.log('💡 After running the SQL, verify with:');
    console.log('   node scripts/verify-migration.js');
    console.log();

  } catch (error) {
    console.error('❌ Migration failed:', error.message);
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
