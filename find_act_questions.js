const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  'https://rabavobdklnwvwsldbix.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk3NjU0NzgsImV4cCI6MjA3NTM0MTQ3OH0.z_1N3TG-cS9Bc1s7UAif91PkIjhBKvicrUqupiNP80Y'
);

async function searchTables() {
  // Try different table names
  const possibleTables = [
    'act_questions',
    'act_practice_questions',
    'practice_questions',
    'questions',
    'test_questions',
    'english_questions',
    'math_questions'
  ];

  for (const tableName of possibleTables) {
    console.log(`\nTrying table: ${tableName}`);
    const { data, error, count } = await supabase
      .from(tableName)
      .select('*', { count: 'exact' })
      .limit(1);

    if (!error) {
      console.log(`✓ Table exists! Count: ${count}`);
      if (data && data.length > 0) {
        console.log('Columns:', Object.keys(data[0]));
        console.log('Sample:', JSON.stringify(data[0], null, 2));
      }
    } else {
      console.log(`✗ ${error.message}`);
    }
  }
}

searchTables().catch(console.error);
