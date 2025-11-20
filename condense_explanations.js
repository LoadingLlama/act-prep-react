const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

const supabaseUrl = 'https://rabavobdklnwvwsldbix.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk3NjU0NzgsImV4cCI6MjA3NTM0MTQ3OH0.z_1N3TG-cS9Bc1s7UAif91PkIjhBKvicrUqupiNP80Y';

const supabase = createClient(supabaseUrl, supabaseKey);

async function fetchQuestions() {
  const { data, error } = await supabase
    .from('practice_test_english_questions')
    .select('id, question_number, explanation')
    .order('id', { ascending: true });

  if (error) {
    console.error('Error fetching questions:', error);
    process.exit(1);
  }

  return data;
}

async function main() {
  const questions = await fetchQuestions();
  console.log(`Fetched ${questions.length} questions`);

  // Save to a more manageable file
  fs.writeFileSync('questions_to_condense.json', JSON.stringify(questions, null, 2));
  console.log('Saved questions to questions_to_condense.json');
}

main();
