const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

// Supabase setup
const supabaseUrl = 'https://rabavobdklnwvwsldbix.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk3NjU0NzgsImV4cCI6MjA3NTM0MTQ3OH0.z_1N3TG-cS9Bc1s7UAif91PkIjhBKvicrUqupiNP80Y';
const supabase = createClient(supabaseUrl, supabaseKey);

/**
 * Fetch all diagnostic test questions
 */
async function fetchAllQuestions() {
  const tables = [
    { name: 'practice_test_english_questions', subject: 'English' },
    { name: 'practice_test_math_questions', subject: 'Math' },
    { name: 'practice_test_reading_questions', subject: 'Reading' },
    { name: 'practice_test_science_questions', subject: 'Science' },
  ];

  const allQuestions = [];

  for (const table of tables) {
    const { data, error } = await supabase
      .from(table.name)
      .select('*')
      .eq('test_number', 1)
      .order('id');

    if (error) {
      console.error(`Error fetching from ${table.name}:`, error);
      continue;
    }

    console.log(`Fetched ${data.length} ${table.subject} questions`);

    for (const question of data) {
      allQuestions.push({
        ...question,
        table: table.name,
        subject: table.subject
      });
    }
  }

  return allQuestions;
}

/**
 * Save questions to a JSON file for processing
 */
async function main() {
  console.log('Fetching all diagnostic test questions...\n');

  const questions = await fetchAllQuestions();

  console.log(`\nTotal questions fetched: ${questions.length}`);

  // Save to file
  fs.writeFileSync(
    'diagnostic_questions.json',
    JSON.stringify(questions, null, 2)
  );

  console.log('\nSaved all questions to diagnostic_questions.json');
  console.log('\nNow I will process these questions and generate explanations...');
}

main();
