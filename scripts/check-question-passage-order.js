const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function checkOrder() {
  // Get passages
  const { data: passages } = await supabase
    .from('practice_test_science_passages')
    .select('id, passage_number, passage_title')
    .eq('test_number', 1)
    .order('passage_number');

  // Get questions
  const { data: questions } = await supabase
    .from('practice_test_science_questions')
    .select('question_number, passage_id')
    .eq('test_number', 1)
    .order('question_number');

  console.log('\n=== PASSAGE TO QUESTIONS MAPPING ===\n');

  passages.forEach(p => {
    const passageQuestions = questions.filter(q => q.passage_id === p.id);
    const questionNums = passageQuestions.map(q => q.question_number).sort((a, b) => a - b);

    console.log(`Passage ${p.passage_number}: ${p.passage_title}`);
    console.log(`  Questions: ${questionNums.join(', ')}`);
    console.log(`  First question: ${questionNums[0] || 'none'}`);
    console.log();
  });

  console.log('\n=== QUESTION ORDER (first 10) ===\n');
  questions.slice(0, 10).forEach(q => {
    const passage = passages.find(p => p.id === q.passage_id);
    console.log(`Q${q.question_number}: Passage ${passage?.passage_number} (${passage?.passage_title})`);
  });
}

checkOrder();
