const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://rabavobdklnwvwsldbix.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk3NjU0NzgsImV4cCI6MjA3NTM0MTQ3OH0.z_1N3TG-cS9Bc1s7UAif91PkIjhBKvicrUqupiNP80Y';

const supabase = createClient(supabaseUrl, supabaseKey);

async function verifySampleQuestions() {
  console.log('Verifying sample questions...\n');

  // Check questions 1, 5, 10, 25, 50, 60
  const sampleIds = [76, 80, 85, 100, 125, 135];

  for (const id of sampleIds) {
    const { data, error } = await supabase
      .from('practice_test_math_questions')
      .select('id, question_number, question_text, correct_answer, explanation')
      .eq('id', id)
      .single();

    if (error) {
      console.error(`Error fetching question ${id}:`, error);
      continue;
    }

    console.log('='.repeat(80));
    console.log(`Question ${data.question_number} (ID: ${data.id})`);
    console.log('='.repeat(80));
    console.log(`Question: ${data.question_text.substring(0, 100)}...`);
    console.log(`Correct Answer: ${data.correct_answer}`);
    console.log(`\nExplanation Preview:`);
    console.log(data.explanation.substring(0, 300));
    console.log('...\n\n');
  }
}

verifySampleQuestions();
