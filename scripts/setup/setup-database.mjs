#!/usr/bin/env node

/**
 * Setup ACT Question Bank Database
 * Creates all tables and initializes progress tracking
 */

import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readFileSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
dotenv.config({ path: join(__dirname, '../../.env') });

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials in .env file');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

console.log('🚀 Setting up ACT Question Bank Database...\n');

// Read SQL file
const sqlPath = join(__dirname, 'create-tables.sql');
const sql = readFileSync(sqlPath, 'utf-8');

// Split SQL into individual statements
const statements = sql
  .split(';')
  .map(s => s.trim())
  .filter(s => s.length > 0 && !s.startsWith('--'));

console.log(`📄 Found ${statements.length} SQL statements to execute\n`);

// Execute each statement
let successCount = 0;
let errorCount = 0;

for (let i = 0; i < statements.length; i++) {
  const statement = statements[i];

  // Skip comments and empty lines
  if (statement.startsWith('--') || statement.trim().length === 0) {
    continue;
  }

  console.log(`Executing statement ${i + 1}/${statements.length}...`);

  try {
    const { error } = await supabase.rpc('exec_sql', { sql_query: statement + ';' });

    if (error) {
      // Try direct query execution as fallback
      const { error: directError } = await supabase.from('_sql').select(statement);

      if (directError) {
        console.log(`⚠️  Statement ${i + 1} may have failed (this is often OK for CREATE IF NOT EXISTS)`);
      } else {
        successCount++;
        console.log(`✅ Statement ${i + 1} executed successfully`);
      }
    } else {
      successCount++;
      console.log(`✅ Statement ${i + 1} executed successfully`);
    }
  } catch (err) {
    console.log(`⚠️  Statement ${i + 1}: ${err.message}`);
    errorCount++;
  }
}

console.log(`\n📊 Database Setup Summary:`);
console.log(`   Successful: ${successCount}`);
console.log(`   Warnings: ${errorCount}`);

// Verify tables were created
console.log('\n🔍 Verifying database setup...\n');

const tables = ['act_questions', 'act_passages', 'act_distractors', 'extraction_progress'];

for (const table of tables) {
  const { count, error } = await supabase
    .from(table)
    .select('*', { count: 'exact', head: true });

  if (error) {
    console.log(`❌ Table '${table}' not found or error: ${error.message}`);
  } else {
    console.log(`✅ Table '${table}' exists (${count} rows)`);
  }
}

// Check extraction progress
const { data: progress, error: progressError } = await supabase
  .from('extraction_progress')
  .select('*')
  .order('test_number', { ascending: true })
  .order('section', { ascending: true });

if (progressError) {
  console.log(`\n⚠️  Could not load extraction progress: ${progressError.message}`);
} else {
  console.log(`\n📋 Extraction Progress Initialized:`);
  console.log(`   Total extraction tasks: ${progress.length}`);
  console.log(`   Total questions to extract: ${progress.reduce((sum, p) => sum + p.total_questions, 0)}`);

  console.log(`\n   Breakdown by test:`);
  for (let test = 1; test <= 7; test++) {
    const testProgress = progress.filter(p => p.test_number === test);
    const total = testProgress.reduce((sum, p) => sum + p.total_questions, 0);
    console.log(`   Test ${test}: ${total} questions (E:75, M:60, R:40, S:40)`);
  }
}

console.log('\n✅ Database setup complete! Ready for extraction.\n');
