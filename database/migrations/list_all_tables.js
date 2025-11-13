/**
 * List all tables in the database
 */

require('dotenv').config({ path: '../../.env' });
const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = process.env.REACT_APP_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(SUPABASE_URL, SERVICE_KEY);

async function main() {
  console.log('🔍 Checking all tables in database...\n');

  // Try common table names
  const tablesToCheck = [
    'lessons',
    'examples',
    'lesson_examples',
    'practice_questions',
    'questions',
    'test_questions',
    'diagnostic_test_questions'
  ];

  for (const table of tablesToCheck) {
    const { data, error } = await supabase
      .from(table)
      .select('*', { count: 'exact', head: true });

    if (error) {
      console.log(`❌ ${table}: doesn't exist`);
    } else {
      console.log(`✅ ${table}: exists (${data !== null ? 'accessible' : 'count available'})`);

      // Get count
      const { count } = await supabase
        .from(table)
        .select('*', { count: 'exact', head: true });

      console.log(`   Total records: ${count}`);
    }
  }
}

main();
