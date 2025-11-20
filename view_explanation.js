const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://rabavobdklnwvwsldbix.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk3NjU0NzgsImV4cCI6MjA3NTM0MTQ3OH0.z_1N3TG-cS9Bc1s7UAif91PkIjhBKvicrUqupiNP80Y';
const supabase = createClient(supabaseUrl, supabaseKey);

async function viewSampleExplanation() {
  // Get first English question
  const { data, error } = await supabase
    .from('practice_test_english_questions')
    .select('*')
    .eq('test_number', 1)
    .eq('id', 1)
    .single();

  if (error) {
    console.error('Error:', error);
    return;
  }

  console.log('Question:', data.question_text);
  console.log('\nChoices:', data.choices);
  console.log('\nCorrect Answer:', data.correct_answer);
  console.log('\n=== Current Explanation ===');
  console.log(data.explanation);
  console.log('\n=== End ===');
}

viewSampleExplanation();
