/**
 * Find where practice test data is stored
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function findData() {
  console.log('=== SEARCHING FOR PRACTICE TEST DATA ===\n');

  // Try different possible table names
  const possibleTables = [
    'practice_test_questions',
    'practice_tests',
    'questions',
    'test_questions'
  ];

  for (const tableName of possibleTables) {
    try {
      console.log(`Checking ${tableName}...`);
      const { data, error, count } = await supabase
        .from(tableName)
        .select('*', { count: 'exact', head: false })
        .limit(3);

      if (!error && data) {
        console.log(`✓ Found ${tableName}!`);
        console.log(`  Count: ${count || data.length}`);
        if (data.length > 0) {
          console.log(`  Sample columns:`, Object.keys(data[0]));
          console.log(`  Sample row:`, data[0]);
        }
        console.log();
      }
    } catch (e) {
      // Table doesn't exist
    }
  }

  // Also check the separated tables with a limit
  const sectionTables = [
    'practice_test_english_questions',
    'practice_test_math_questions',
    'practice_test_reading_questions',
    'practice_test_science_questions'
  ];

  for (const tableName of sectionTables) {
    try {
      const { count } = await supabase
        .from(tableName)
        .select('*', { count: 'exact', head: true });

      console.log(`${tableName}: ${count || 0} rows`);
    } catch (e) {
      console.log(`${tableName}: Error`);
    }
  }
}

findData().then(() => process.exit(0));
