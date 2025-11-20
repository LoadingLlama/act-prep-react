const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

const supabaseUrl = 'https://rabavobdklnwvwsldbix.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk3NjU0NzgsImV4cCI6MjA3NTM0MTQ3OH0.z_1N3TG-cS9Bc1s7UAif91PkIjhBKvicrUqupiNP80Y';

const supabase = createClient(supabaseUrl, supabaseKey);

async function fetchAllQuestions() {
  try {
    console.log('Fetching Math questions...');
    const { data: mathQuestions, error: mathError } = await supabase
      .from('practice_test_math_questions')
      .select('*')
      .eq('test_number', 1)
      .order('question_number');

    if (mathError) throw mathError;
    console.log(`Fetched ${mathQuestions.length} Math questions`);

    console.log('Fetching Reading questions...');
    const { data: readingQuestions, error: readingError } = await supabase
      .from('practice_test_reading_questions')
      .select('*')
      .eq('test_number', 1)
      .order('question_number');

    if (readingError) throw readingError;
    console.log(`Fetched ${readingQuestions.length} Reading questions`);

    console.log('Fetching Reading passages...');
    const { data: readingPassages, error: readingPassagesError } = await supabase
      .from('practice_test_reading_passages')
      .select('*')
      .eq('test_number', 1)
      .order('passage_number');

    if (readingPassagesError) throw readingPassagesError;
    console.log(`Fetched ${readingPassages.length} Reading passages`);

    console.log('Fetching Science questions...');
    const { data: scienceQuestions, error: scienceError } = await supabase
      .from('practice_test_science_questions')
      .select('*')
      .eq('test_number', 1)
      .order('question_number');

    if (scienceError) throw scienceError;
    console.log(`Fetched ${scienceQuestions.length} Science questions`);

    console.log('Fetching Science passages...');
    const { data: sciencePassages, error: sciencePassagesError } = await supabase
      .from('practice_test_science_passages')
      .select('*')
      .eq('test_number', 1)
      .order('passage_number');

    if (sciencePassagesError) throw sciencePassagesError;
    console.log(`Fetched ${sciencePassages.length} Science passages`);

    // Save to files
    fs.writeFileSync('./data/math-questions.json', JSON.stringify(mathQuestions, null, 2));
    fs.writeFileSync('./data/reading-questions.json', JSON.stringify(readingQuestions, null, 2));
    fs.writeFileSync('./data/reading-passages.json', JSON.stringify(readingPassages, null, 2));
    fs.writeFileSync('./data/science-questions.json', JSON.stringify(scienceQuestions, null, 2));
    fs.writeFileSync('./data/science-passages.json', JSON.stringify(sciencePassages, null, 2));

    console.log('\n✓ All data saved to ./data/ directory');
    console.log(`\nTotal questions to explain: ${mathQuestions.length + readingQuestions.length + scienceQuestions.length}`);
  } catch (error) {
    console.error('Error fetching questions:', error);
    process.exit(1);
  }
}

fetchAllQuestions();
