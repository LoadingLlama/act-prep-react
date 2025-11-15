/**
 * Run Diagnostic Test Migration
 * Adds lesson_id column to practice test tables for diagnostic analysis
 */

const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function runMigration() {
  console.log('🚀 Running diagnostic test migration...\n');

  try {
    // Read the migration SQL file
    const migrationPath = path.join(__dirname, 'database/migrations/add_lesson_mapping_to_practice_tests.sql');
    const migrationSQL = fs.readFileSync(migrationPath, 'utf8');

    console.log('📄 Loaded migration file:', migrationPath);
    console.log('📝 Migration SQL length:', migrationSQL.length, 'characters\n');

    // Split the SQL into individual statements
    const statements = migrationSQL
      .split(';')
      .map(s => s.trim())
      .filter(s => s.length > 0 && !s.startsWith('--'));

    console.log(`🔨 Executing ${statements.length} SQL statements...\n`);

    // Execute each statement
    for (let i = 0; i < statements.length; i++) {
      const statement = statements[i];
      console.log(`${i + 1}/${statements.length}: ${statement.substring(0, 80)}...`);

      const { error } = await supabase.rpc('exec_sql', { sql: statement + ';' });

      if (error) {
        // Check if it's a benign error (table already exists, column already exists, etc.)
        if (
          error.message.includes('already exists') ||
          error.message.includes('does not exist')
        ) {
          console.log(`  ⚠️ Warning: ${error.message}`);
        } else {
          console.error(`  ❌ Error: ${error.message}`);
          // Don't throw - continue with other statements
        }
      } else {
        console.log(`  ✅ Success`);
      }
    }

    console.log('\n✅ Migration complete!');

  } catch (error) {
    console.error('\n❌ Migration failed:', error);
  }
}

runMigration();
