const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

const supabaseUrl = 'https://rabavobdklnwvwsldbix.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk3NjU0NzgsImV4cCI6MjA3NTM0MTQ3OH0.z_1N3TG-cS9Bc1s7UAif91PkIjhBKvicrUqupiNP80Y';

const supabase = createClient(supabaseUrl, supabaseKey);

/**
 * Fetch all questions from a specific test with their associated passages
 */
async function fetchTestQuestions(questionTable, passageTable = null, testNumber = 1) {
  console.log(`\nFetching test ${testNumber} from ${questionTable}...`);

  const { data: questions, error } = await supabase
    .from(questionTable)
    .select('*')
    .eq('test_number', testNumber)
    .order('question_number');

  if (error) {
    console.error(`Error fetching ${questionTable}:`, error);
    return [];
  }

  console.log(`Found ${questions.length} questions for test ${testNumber}`);

  // If there's a passage table, fetch passages for this test
  if (passageTable) {
    const { data: passages, error: passageError } = await supabase
      .from(passageTable)
      .select('*')
      .eq('test_number', testNumber);

    if (passageError) {
      console.error(`Error fetching passages:`, passageError);
    } else {
      console.log(`Found ${passages.length} passages for test ${testNumber}`);

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
 * Main function to fetch all diagnostic test questions (test 1)
 */
async function getDiagnosticQuestions() {
  console.log('Fetching all diagnostic test questions (Test 1)...\n');

  const allQuestions = {
    english: await fetchTestQuestions('practice_test_english_questions', 'practice_test_english_passages', 1),
    math: await fetchTestQuestions('practice_test_math_questions', null, 1),
    reading: await fetchTestQuestions('practice_test_reading_questions', 'practice_test_reading_passages', 1),
    science: await fetchTestQuestions('practice_test_science_questions', 'practice_test_science_passages', 1)
  };

  const total = allQuestions.english.length + allQuestions.math.length +
                allQuestions.reading.length + allQuestions.science.length;

  console.log(`\n=== DIAGNOSTIC TEST SUMMARY ===`);
  console.log(`English: ${allQuestions.english.length} questions`);
  console.log(`Math: ${allQuestions.math.length} questions`);
  console.log(`Reading: ${allQuestions.reading.length} questions`);
  console.log(`Science: ${allQuestions.science.length} questions`);
  console.log(`TOTAL: ${total} questions\n`);

  // Save to file
  fs.writeFileSync('diagnostic_questions_full.json', JSON.stringify(allQuestions, null, 2));
  console.log('Saved all questions to diagnostic_questions_full.json');

  return allQuestions;
}

// Run the fetch
getDiagnosticQuestions()
  .then(data => {
    console.log('\n\nSample English Question #1:');
    if (data.english[0]) {
      console.log('Question ID:', data.english[0].id);
      console.log('Question #:', data.english[0].question_number);
      console.log('Passage ID:', data.english[0].passage_id);
      console.log('Choices:', data.english[0].choices);
      console.log('Correct Answer:', data.english[0].correct_answer);
      if (data.english[0].passage) {
        console.log('Passage text (first 200 chars):', data.english[0].passage.passage_text.substring(0, 200));
      }
    }

    console.log('\n\nSample Math Question #1:');
    if (data.math[0]) {
      console.log('Question ID:', data.math[0].id);
      console.log('Question #:', data.math[0].question_number);
      console.log('Question Text:', data.math[0].question_text);
      console.log('Choices:', data.math[0].choices);
      console.log('Correct Answer:', data.math[0].correct_answer);
    }

    console.log('\n\nSample Reading Question #1:');
    if (data.reading[0]) {
      console.log('Question ID:', data.reading[0].id);
      console.log('Question #:', data.reading[0].question_number);
      console.log('Question Text:', data.reading[0].question_text);
      console.log('Choices:', data.reading[0].choices);
      console.log('Correct Answer:', data.reading[0].correct_answer);
      if (data.reading[0].passage) {
        console.log('Passage title:', data.reading[0].passage.passage_title);
        console.log('Passage text (first 200 chars):', data.reading[0].passage.passage_text.substring(0, 200));
      }
    }

    console.log('\n\nSample Science Question #1:');
    if (data.science[0]) {
      console.log('Question ID:', data.science[0].id);
      console.log('Question #:', data.science[0].question_number);
      console.log('Question Text:', data.science[0].question_text);
      console.log('Choices:', data.science[0].choices);
      console.log('Correct Answer:', data.science[0].correct_answer);
      if (data.science[0].passage) {
        console.log('Passage title:', data.science[0].passage.passage_title);
        console.log('Passage text (first 200 chars):', data.science[0].passage.passage_text.substring(0, 200));
      }
    }
  })
  .catch(console.error);
