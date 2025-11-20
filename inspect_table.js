const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  'https://rabavobdklnwvwsldbix.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk3NjU0NzgsImV4cCI6MjA3NTM0MTQ3OH0.z_1N3TG-cS9Bc1s7UAif91PkIjhBKvicrUqupiNP80Y'
);

async function inspect() {
  console.log('Fetching first 5 questions to inspect structure...\n');

  const { data, error } = await supabase
    .from('quiz_questions')
    .select('*')
    .limit(5);

  if (error) {
    console.error('Error:', error);
    return;
  }

  console.log(`Found ${data.length} questions\n`);

  if (data.length > 0) {
    console.log('Column names:', Object.keys(data[0]));
    console.log('\nFirst question:');
    console.log(JSON.stringify(data[0], null, 2));
    console.log('\nSecond question:');
    console.log(JSON.stringify(data[1], null, 2));
  }
}

inspect().catch(console.error);
