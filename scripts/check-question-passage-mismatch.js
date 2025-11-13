const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function checkMismatch() {
  // Get passages
  const { data: passages } = await supabase
    .from('practice_test_science_passages')
    .select('id, passage_number, passage_title')
    .eq('test_number', 1)
    .order('passage_number');

  // Get first 10 questions
  const { data: questions } = await supabase
    .from('practice_test_science_questions')
    .select('question_number, passage_id, question_text')
    .eq('test_number', 1)
    .order('question_number')
    .limit(10);

  console.log('\n=== PASSAGE ID MAPPING ===');
  passages.forEach(p => {
    console.log(`ID ${p.id} = Passage ${p.passage_number}: ${p.passage_title}`);
  });

  console.log('\n\n=== FIRST 10 QUESTIONS ===\n');
  questions.forEach(q => {
    const passage = passages.find(p => p.id === q.passage_id);
    console.log(`Q${q.question_number} -> Passage ${passage?.passage_number} (${passage?.passage_title})`);
    console.log(`  Text: ${q.question_text.substring(0, 100)}...`);
    console.log();
  });

  // Check if question 1 mentions Table 1
  const q1 = questions.find(q => q.question_number === 1);
  console.log('\n=== QUESTION 1 ANALYSIS ===');
  console.log('Full text:', q1.question_text);
  console.log('\nMentions Table 1?', q1.question_text.includes('Table 1'));
  console.log('Mentions H₂?', q1.question_text.includes('H₂'));
  console.log('Should be from:', q1.question_text.includes('Table 1') ? 'Molar Volume (Passage 1)' : 'Unknown');
  console.log('Actually assigned to:', passages.find(p => p.id === q1.passage_id)?.passage_title);
}

checkMismatch();
