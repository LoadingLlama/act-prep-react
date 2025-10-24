#!/usr/bin/env node

/**
 * CHECK DATABASE SCHEMA
 * Find out the actual column names in the question tables
 */

import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '../../.env') });

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

console.log('🔍 CHECKING DATABASE SCHEMA\n');
console.log('='.repeat(70));

const tables = [
  'act_english_questions',
  'act_math_questions',
  'act_reading_questions',
  'act_science_questions'
];

for (const tableName of tables) {
  console.log(`\n📊 ${tableName.toUpperCase()}:`);

  // Get the first record to see actual column structure
  const { data, error } = await supabase
    .from(tableName)
    .select('*')
    .limit(1);

  if (error) {
    console.error(`❌ Error fetching from ${tableName}:`, error.message);
  } else if (data && data.length > 0) {
    const columns = Object.keys(data[0]);
    console.log(`Columns (${columns.length}):`, columns.join(', '));

    // Show choice columns specifically
    const choiceColumns = columns.filter(col => col.startsWith('choice_'));
    console.log(`Choice columns:`, choiceColumns.join(', '));
  } else {
    console.log('No data found in table');
  }
}

console.log('\n✅ Schema check complete!\n');