#!/usr/bin/env node

/**
 * CLEANUP INCORRECT PRACTICE ACT 3 DATA
 * Remove all incorrectly extracted data before manual entry
 */

import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '.env') });

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

console.log('🧹 CLEANING UP INCORRECT PRACTICE ACT 3 DATA');
console.log('Removing all incorrectly extracted data before manual entry');
console.log('=' .repeat(80));

async function cleanupIncorrectData() {
  console.log('\n🗑️ REMOVING INCORRECT PRACTICE ACT 3 DATA...');

  const tables = [
    'act_english_questions',
    'act_math_questions',
    'act_reading_questions',
    'act_science_questions',
    'act_english_passages',
    'act_reading_passages',
    'act_science_passages'
  ];

  let totalDeleted = 0;
  const errors = [];

  for (const table of tables) {
    try {
      console.log(`🗑️ Cleaning ${table}...`);

      const { data, error } = await supabase
        .from(table)
        .delete()
        .eq('test_number', 3);

      if (error) {
        errors.push(`${table}: ${error.message}`);
      } else {
        console.log(`  ✅ Cleaned ${table}`);
        totalDeleted++;
      }
    } catch (err) {
      errors.push(`${table}: ${err.message}`);
    }
  }

  console.log(`\n✅ Cleanup complete: ${totalDeleted}/${tables.length} tables cleaned`);
  if (errors.length > 0) {
    console.log(`⚠️ Errors: ${errors.length}`);
    errors.forEach(error => console.log(`  • ${error}`));
  }

  return { totalDeleted, errors };
}

// Run cleanup
cleanupIncorrectData().catch(console.error);