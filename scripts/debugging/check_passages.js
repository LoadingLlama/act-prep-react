const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://rabavobdklnwvwsldbix.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk3NjU0NzgsImV4cCI6MjA3NTM0MTQ3OH0.z_1N3TG-cS9Bc1s7UAif91PkIjhBKvicrUqupiNP80Y';

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkPassages() {
  // Check for passage tables
  const passageTables = [
    'practice_test_english_passages',
    'practice_test_reading_passages',
    'practice_test_science_passages',
    'passages'
  ];

  console.log('Checking for passage tables...\n');

  for (const table of passageTables) {
    const { data, error } = await supabase
      .from(table)
      .select('*')
      .limit(1);

    if (error) {
      console.log(`Table ${table}: Does not exist or error - ${error.message}`);
    } else {
      console.log(`Table ${table}: EXISTS with columns:`, Object.keys(data[0] || {}));
      if (data[0]) {
        console.log('Sample:', JSON.stringify(data[0], null, 2).substring(0, 500));
      }
    }
    console.log('');
  }
}

checkPassages().catch(console.error);
