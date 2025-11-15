const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_ANON_KEY
);

async function checkQuestions() {
  console.log('Checking practice_test_english_questions table...\n');

  const { data, error } = await supabase
    .from('practice_test_english_questions')
    .select('id, test_number, question_number, correct_answer, explanation')
    .eq('test_number', 1)
    .limit(5);

  if (error) {
    console.error('Error:', error);
    return;
  }

  console.log(`Found ${data.length} questions:`);
  data.forEach(q => {
    const letter = q.correct_answer !== null && q.correct_answer !== undefined
      ? String.fromCharCode(65 + q.correct_answer)
      : 'NULL';
    console.log(`\nQuestion ${q.question_number}:`);
    console.log(`  ID: ${q.id}`);
    console.log(`  correct_answer index: ${q.correct_answer}`);
    console.log(`  correct_answer type: ${typeof q.correct_answer}`);
    console.log(`  correct_answer letter: ${letter}`);
    console.log(`  has explanation: ${!!q.explanation}`);
    console.log(`  explanation length: ${q.explanation?.length || 0}`);
  });

  // Check all columns available
  const { data: fullData } = await supabase
    .from('practice_test_english_questions')
    .select('*')
    .eq('test_number', 1)
    .limit(1);

  if (fullData && fullData.length > 0) {
    console.log('\n\nAll available columns in table:');
    console.log(Object.keys(fullData[0]).join(', '));
  }
}

checkQuestions().then(() => process.exit(0));
