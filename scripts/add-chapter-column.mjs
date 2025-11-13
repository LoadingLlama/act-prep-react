/**
 * Add chapter column to all practice test question tables
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function addChapterColumn() {
  console.log('=== ADDING CHAPTER COLUMN TO PRACTICE TEST TABLES ===\n');

  const tables = [
    'practice_test_english_questions',
    'practice_test_math_questions',
    'practice_test_reading_questions',
    'practice_test_science_questions'
  ];

  for (const table of tables) {
    console.log(`Adding chapter column to ${table}...`);

    try {
      // Execute SQL to add chapter column
      const { data, error } = await supabase.rpc('exec_sql', {
        sql: `ALTER TABLE ${table} ADD COLUMN IF NOT EXISTS chapter INTEGER;`
      });

      if (error) {
        console.error(`  Error:`, error.message);
      } else {
        console.log(`  ✓ Success`);
      }
    } catch (e) {
      console.error(`  Error:`, e.message);
    }
  }

  console.log('\n=== ADDING question_type COLUMN TO READING TABLE ===\n');

  try {
    const { data, error } = await supabase.rpc('exec_sql', {
      sql: `ALTER TABLE practice_test_reading_questions ADD COLUMN IF NOT EXISTS question_type TEXT;`
    });

    if (error) {
      console.error(`  Error:`, error.message);
    } else {
      console.log(`  ✓ Success`);
    }
  } catch (e) {
    console.error(`  Error:`, e.message);
  }
}

addChapterColumn().then(() => process.exit(0));
