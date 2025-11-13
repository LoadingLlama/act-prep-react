const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function checkNullQuestions() {
  const { data: questions } = await supabase
    .from('practice_test_science_questions')
    .select('question_number, passage_id, question_text')
    .eq('test_number', 1)
    .is('passage_id', null);

  console.log(`Found ${questions.length} questions with null passage_id\n`);

  questions.forEach(q => {
    console.log(`Q${q.question_number}:`);
    console.log(q.question_text);
    console.log('\n---\n');
  });
}

checkNullQuestions();
