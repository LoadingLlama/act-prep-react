const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://rabavobdklnwvwsldbix.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk3NjU0NzgsImV4cCI6MjA3NTM0MTQ3OH0.z_1N3TG-cS9Bc1s7UAif91PkIjhBKvicrUqupiNP80Y';

const supabase = createClient(supabaseUrl, supabaseKey);

/**
 * Fetch all questions from a table with their associated passages
 */
async function fetchAllQuestions(questionTable, passageTable = null) {
  console.log(`\nFetching from ${questionTable}...`);

  const { data: questions, error } = await supabase
    .from(questionTable)
    .select('*')
    .order('question_number');

  if (error) {
    console.error(`Error fetching ${questionTable}:`, error);
    return [];
  }

  console.log(`Found ${questions.length} questions`);

  // If there's a passage table, fetch passages
  if (passageTable) {
    const { data: passages, error: passageError } = await supabase
      .from(passageTable)
      .select('*');

    if (passageError) {
      console.error(`Error fetching passages:`, passageError);
    } else {
      // Map passages to questions
      const passageMap = {};
      passages.forEach(p => {
        passageMap[p.id] = p;
      });

      questions.forEach(q => {
        if (q.passage_id && passageMap[q.passage_id]) {
          q.passage = passageMap[q.passage_id];
        }
      });
    }
  }

  return questions;
}

/**
 * Main function to fetch all 215 questions
 */
async function getAllQuestions() {
  console.log('Fetching all 215 diagnostic test questions...\n');

  const allQuestions = {
    english: await fetchAllQuestions('practice_test_english_questions', 'practice_test_english_passages'),
    math: await fetchAllQuestions('practice_test_math_questions'),
    reading: await fetchAllQuestions('practice_test_reading_questions', 'practice_test_reading_passages'),
    science: await fetchAllQuestions('practice_test_science_questions', 'practice_test_science_passages')
  };

  const total = allQuestions.english.length + allQuestions.math.length +
                allQuestions.reading.length + allQuestions.science.length;

  console.log(`\n=== SUMMARY ===`);
  console.log(`English: ${allQuestions.english.length} questions`);
  console.log(`Math: ${allQuestions.math.length} questions`);
  console.log(`Reading: ${allQuestions.reading.length} questions`);
  console.log(`Science: ${allQuestions.science.length} questions`);
  console.log(`TOTAL: ${total} questions`);

  return allQuestions;
}

// Run the fetch
getAllQuestions()
  .then(data => {
    console.log('\n\nSample English Question:');
    console.log(JSON.stringify(data.english[0], null, 2).substring(0, 800));

    console.log('\n\nSample Math Question:');
    console.log(JSON.stringify(data.math[0], null, 2).substring(0, 800));

    console.log('\n\nSample Reading Question:');
    console.log(JSON.stringify(data.reading[0], null, 2).substring(0, 800));

    console.log('\n\nSample Science Question:');
    console.log(JSON.stringify(data.science[0], null, 2).substring(0, 800));
  })
  .catch(console.error);
