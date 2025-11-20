const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://rabavobdklnwvwsldbix.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk3NjU0NzgsImV4cCI6MjA3NTM0MTQ3OH0.z_1N3TG-cS9Bc1s7UAif91PkIjhBKvicrUqupiNP80Y';

const supabase = createClient(supabaseUrl, supabaseKey);

async function fetchReadingQuestions() {
  const { data, error } = await supabase
    .from('practice_test_reading_questions')
    .select('*')
    .order('id', { ascending: true });

  if (error) {
    console.error('Error fetching reading questions:', error);
    return null;
  }

  console.log(`Fetched ${data.length} reading questions`);
  return data;
}

async function fetchScienceQuestions() {
  const { data, error } = await supabase
    .from('practice_test_science_questions')
    .select('*')
    .order('id', { ascending: true });

  if (error) {
    console.error('Error fetching science questions:', error);
    return null;
  }

  console.log(`Fetched ${data.length} science questions`);
  return data;
}

async function updateQuestionExplanation(table, id, explanation) {
  const { error } = await supabase
    .from(table)
    .update({ explanation: explanation })
    .eq('id', id);

  if (error) {
    console.error(`Error updating question ${id}:`, error);
    return false;
  }

  return true;
}

async function main() {
  // Fetch reading questions
  const readingQuestions = await fetchReadingQuestions();
  if (readingQuestions) {
    console.log('\n=== READING QUESTIONS ===');
    readingQuestions.forEach((q, idx) => {
      console.log(`\n--- Question ${idx + 1} (ID: ${q.id}) ---`);
      console.log('Question:', q.question_text?.substring(0, 100) + '...');
      console.log('Correct Answer:', q.correct_answer);
      console.log('Current Explanation:', q.explanation ? 'EXISTS' : 'MISSING');
    });
  }

  console.log('\n\n=== SCIENCE QUESTIONS ===');
  // Fetch science questions
  const scienceQuestions = await fetchScienceQuestions();
  if (scienceQuestions) {
    scienceQuestions.forEach((q, idx) => {
      console.log(`\n--- Question ${idx + 1} (ID: ${q.id}) ---`);
      console.log('Question:', q.question_text?.substring(0, 100) + '...');
      console.log('Correct Answer:', q.correct_answer);
      console.log('Current Explanation:', q.explanation ? 'EXISTS' : 'MISSING');
    });
  }
}

main();
