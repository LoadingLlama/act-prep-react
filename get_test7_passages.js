/**
 * Get all Test 7 passages with their questions
 */

const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
require('dotenv').config();

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function getTest7Passages() {
  console.log('🔍 Fetching Test 7 passages...\n');

  const { data: questions, error: qError } = await supabase
    .from('practice_test_english_questions')
    .select('passage_id')
    .eq('test_number', 7);

  if (qError) {
    console.error('❌ Error fetching questions:', qError);
    return;
  }

  const passageIds = [...new Set(questions.map(q => q.passage_id))];
  console.log(`📊 Found ${passageIds.length} unique passages for Test 7`);
  console.log(`Passage IDs: ${passageIds.join(', ')}\n`);

  const { data: passages, error: pError } = await supabase
    .from('practice_test_english_passages')
    .select('*')
    .in('id', passageIds)
    .order('id', { ascending: true });

  if (pError) {
    console.error('❌ Error fetching passages:', pError);
    return;
  }

  console.log(`✅ Fetched ${passages.length} passages\n`);

  const { data: allQuestions, error: allQError } = await supabase
    .from('practice_test_english_questions')
    .select('*')
    .eq('test_number', 7)
    .order('question_number', { ascending: true });

  if (allQError) {
    console.error('❌ Error fetching all questions:', allQError);
    return;
  }

  const passagesWithQuestions = passages.map(passage => ({
    ...passage,
    questions: allQuestions.filter(q => q.passage_id === passage.id)
  }));

  fs.writeFileSync(
    'test7_passages.json',
    JSON.stringify(passagesWithQuestions, null, 2)
  );
  console.log('✅ Saved to test7_passages.json\n');

  passagesWithQuestions.forEach(p => {
    console.log(`\n📝 Passage ${p.id}:`);
    console.log(`  Title: ${p.passage_title || 'N/A'}`);
    console.log(`  Questions: ${p.questions.length}`);
    console.log(`  Question numbers: ${p.questions.map(q => q.question_number).join(', ')}`);
  });
}

getTest7Passages()
  .then(() => process.exit(0))
  .catch(err => {
    console.error('Error:', err);
    process.exit(1);
  });
