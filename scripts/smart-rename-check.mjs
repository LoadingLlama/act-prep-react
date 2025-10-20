#!/usr/bin/env node

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '../.env') });

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase credentials');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function checkAndExecuteRename() {
  console.log('\n╔═══════════════════════════════════════════════════╗');
  console.log('║    Smart Table Rename - Check & Execute          ║');
  console.log('╚═══════════════════════════════════════════════════╝\n');

  // First, check if new tables already exist
  console.log('🔍 Checking current table state...\n');

  let newTablesExist = 0;
  let oldTablesExist = 0;

  // Check new tables
  const newTables = ['lesson_section_content', 'lesson_examples', 'lesson_term_definitions'];
  for (const table of newTables) {
    try {
      const { error } = await supabase.from(table).select('id', { count: 'exact', head: true });
      if (!error) {
        console.log(`✅ ${table} exists`);
        newTablesExist++;
      }
    } catch (err) {
      console.log(`❌ ${table} does not exist`);
    }
  }

  // Check old tables
  const oldTables = ['section_content', 'examples', 'term_definitions'];
  for (const table of oldTables) {
    try {
      const { error } = await supabase.from(table).select('id', { count: 'exact', head: true });
      if (!error) {
        console.log(`⚠️  ${table} still exists (old name)`);
        oldTablesExist++;
      }
    } catch (err) {
      console.log(`✅ ${table} removed (good)`);
    }
  }

  console.log('\n' + '─'.repeat(60));

  if (newTablesExist === 3 && oldTablesExist === 0) {
    console.log('\n✅ RENAME ALREADY COMPLETED!');
    console.log('   All tables have been renamed successfully.\n');
    console.log('🔍 Running full verification...\n');

    // Run verification
    const { execSync } = await import('child_process');
    execSync('node scripts/verify-rename-complete.mjs', { stdio: 'inherit' });
    return;
  }

  if (oldTablesExist === 3 && newTablesExist === 0) {
    console.log('\n⚠️  RENAME NOT YET EXECUTED');
    console.log('   Tables still have old names.\n');
    console.log('📝 To execute the rename, run these SQL commands in Supabase SQL Editor:');
    console.log('   (The SQL Editor has been opened for you, commands are in clipboard)\n');
    console.log('   ALTER TABLE section_content RENAME TO lesson_section_content;');
    console.log('   ALTER TABLE examples RENAME TO lesson_examples;');
    console.log('   ALTER TABLE term_definitions RENAME TO lesson_term_definitions;\n');
    console.log('Or manually copy from: scripts/EXECUTE_TABLE_RENAME.sql\n');
    return;
  }

  console.log('\n⚠️  PARTIAL RENAME DETECTED');
  console.log(`   New tables found: ${newTablesExist}/3`);
  console.log(`   Old tables found: ${oldTablesExist}/3\n`);
  console.log('This suggests the rename was partially executed.');
  console.log('Please check the Supabase SQL Editor for errors.\n');
}

checkAndExecuteRename();
