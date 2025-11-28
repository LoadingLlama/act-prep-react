const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://rabavobdklnwvwsldbix.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk3NjU0NzgsImV4cCI6MjA3NTM0MTQ3OH0.z_1N3TG-cS9Bc1s7UAif91PkIjhBKvicrUqupiNP80Y';

const supabase = createClient(supabaseUrl, supabaseKey);

async function fetchSampleQuestions() {
  console.log('Fetching sample questions from each table...\n');

  const tables = [
    'practice_test_english_questions',
    'practice_test_math_questions',
    'practice_test_reading_questions',
    'practice_test_science_questions'
  ];

  for (const table of tables) {
    console.log(`\n========== ${table} ==========`);
    const { data, error } = await supabase
      .from(table)
      .select('*')
      .limit(2);

    if (error) {
      console.error(`Error fetching from ${table}:`, error);
    } else {
      console.log(`Found ${data.length} questions`);
      console.log(JSON.stringify(data, null, 2));
    }
  }
}

fetchSampleQuestions().catch(console.error);
