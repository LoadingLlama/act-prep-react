const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://rabavobdklnwvwsldbix.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk3NjU0NzgsImV4cCI6MjA3NTM0MTQ3OH0.z_1N3TG-cS9Bc1s7UAif91PkIjhBKvicrUqupiNP80Y';

const supabase = createClient(supabaseUrl, supabaseKey);

async function fetchAllQuestions() {
  console.log('Fetching all math questions...');

  const { data, error } = await supabase
    .from('practice_test_math_questions')
    .select('*')
    .order('id', { ascending: true })
    .limit(60);

  if (error) {
    console.error('Error fetching questions:', error);
    return null;
  }

  console.log(`Found ${data.length} questions`);
  return data;
}

async function main() {
  const questions = await fetchAllQuestions();

  if (!questions) {
    console.error('Failed to fetch questions');
    return;
  }

  // Display first question structure
  console.log('\n=== First Question Structure ===\n');
  console.log(JSON.stringify(questions[0], null, 2));

  console.log('\n=== Sample Questions ===\n');
  questions.slice(0, 3).forEach((q, idx) => {
    console.log(`\nQuestion ${idx + 1} (ID: ${q.id}):`);
    console.log(`Text: ${q.question_text}`);
    console.log(`Choices: ${q.choices}`);
    console.log(`Correct Answer: ${q.correct_answer}`);
    console.log(`Has Explanation: ${q.explanation ? 'YES' : 'NO'}`);
    console.log('---');
  });

  console.log(`\n\nTotal questions fetched: ${questions.length}`);
}

main();
