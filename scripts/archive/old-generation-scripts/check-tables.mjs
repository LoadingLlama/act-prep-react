#!/usr/bin/env node
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

console.log('🔍 Checking database tables...\n');

// Check what tables exist
const tables = [
  'practice_test_english_questions',
  'practice_test_english_passages',
  'practice_test_math_questions',
  'practice_test_reading_questions',
  'practice_test_reading_passages',
  'practice_test_science_questions',
  'practice_test_science_passages',
  'act_english_questions',
  'act_math_questions',
  'act_reading_questions',
  'act_science_questions'
];

for (const table of tables) {
  const { data, error, count } = await supabase
    .from(table)
    .select('*', { count: 'exact', head: true });
  
  if (error) {
    console.log(`❌ ${table}: Does not exist or no access`);
  } else {
    console.log(`✅ ${table}: ${count} records`);
  }
}
