const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  'https://rabavobdklnwvwsldbix.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk3NjU0NzgsImV4cCI6MjA3NTM0MTQ3OH0.z_1N3TG-cS9Bc1s7UAif91PkIjhBKvicrUqupiNP80Y'
);

async function check() {
  console.log('Checking diagnostic_test_questions table...\n');

  const { data, error, count } = await supabase
    .from('diagnostic_test_questions')
    .select('*', { count: 'exact' })
    .limit(5);

  if (error) {
    console.error('Error:', error);
    return;
  }

  console.log(`Total questions: ${count}\n`);

  if (data && data.length > 0) {
    console.log('Columns:', Object.keys(data[0]).join(', '));
    console.log('\n=== SAMPLE QUESTIONS ===\n');

    data.forEach((q, idx) => {
      console.log(`Question ${idx + 1}:`);
      console.log(JSON.stringify(q, null, 2));
      console.log('\n---\n');
    });
  }
}

check().catch(console.error);
