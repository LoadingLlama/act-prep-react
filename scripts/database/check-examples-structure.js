const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = "https://rabavobdklnwvwsldbix.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk3NjU0NzgsImV4cCI6MjA3NTM0MTQ3OH0.z_1N3TG-cS9Bc1s7UAif91PkIjhBKvicrUqupiNP80Y";
const supabase = createClient(supabaseUrl, supabaseKey);

async function checkExamples() {
  try {
    // Get a sample example to see the structure
    const { data, error } = await supabase
      .from('lesson_examples')
      .select('*')
      .limit(3);

    if (error) {
      console.error('Error:', error);
      return;
    }

    if (data && data.length > 0) {
      console.log('Sample lesson examples:');
      console.log(JSON.stringify(data, null, 2));

      console.log('\n\n=== Column names ===');
      console.log(Object.keys(data[0]));

      console.log('\n\n=== First example problem_text ===');
      console.log(data[0].problem_text);
    } else {
      console.log('No lesson examples found');
    }
  } catch (err) {
    console.error('Unexpected error:', err);
  }
}

checkExamples();
