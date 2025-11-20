const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://rabavobdklnwvwsldbix.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk3NjU0NzgsImV4cCI6MjA3NTM0MTQ3OH0.z_1N3TG-cS9Bc1s7UAif91PkIjhBKvicrUqupiNP80Y';
const supabase = createClient(supabaseUrl, supabaseKey);

async function viewSample() {
  // View one Math question as example
  const { data, error } = await supabase
    .from('practice_test_math_questions')
    .select('*')
    .eq('id', 76)
    .single();

  if (error) {
    console.error('Error:', error);
    return;
  }

  console.log('=== SAMPLE QUESTION ===\n');
  console.log(`Question ${data.question_number}:`);
  console.log(data.question_text);
  console.log(`\nChoices: ${data.choices}`);
  console.log(`\nCorrect Answer: ${data.correct_answer}`);
  console.log('\n=== EXPLANATION (HTML) ===\n');
  console.log(data.explanation);
  console.log('\n=== END ===');
}

viewSample().catch(console.error);
