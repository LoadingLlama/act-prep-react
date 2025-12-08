/**
 * Get all Test 4 passages with their questions
 */

const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
require('dotenv').config();

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function getTest4Passages() {
  console.log('🔍 Fetching Test 4 passages...\n');

  // Get all unique passage_ids from Test 4 questions
  const { data: questions, error: qError } = await supabase
    .from('practice_test_english_questions')
    .select('passage_id')
    .eq('test_number', 4);

  if (qError) {
    console.error('❌ Error fetching questions:', qError);
    return;
  }

  const passageIds = [...new Set(questions.map(q => q.passage_id))];
  console.log(`📊 Found ${passageIds.length} unique passages for Test 4`);
  console.log(`Passage IDs: ${passageIds.join(', ')}\n`);

  // Get passage content for each passage_id
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

  // Get questions for each passage
  const { data: allQuestions, error: allQError } = await supabase
    .from('practice_test_english_questions')
    .select('*')
    .eq('test_number', 4)
    .order('question_number', { ascending: true });

  if (allQError) {
    console.error('❌ Error fetching all questions:', allQError);
    return;
  }

  // Organize by passage
  const passagesWithQuestions = passages.map(passage => ({
    ...passage,
    questions: allQuestions.filter(q => q.passage_id === passage.id)
  }));

  // Save to JSON file
  fs.writeFileSync(
    'test4_passages.json',
    JSON.stringify(passagesWithQuestions, null, 2)
  );
  console.log('✅ Saved to test4_passages.json\n');

  // Display summary
  passagesWithQuestions.forEach(p => {
    console.log(`\n📝 Passage ${p.id}:`);
    console.log(`  Title: ${p.passage_title || 'N/A'}`);
    console.log(`  Questions: ${p.questions.length}`);
    console.log(`  Question numbers: ${p.questions.map(q => q.question_number).join(', ')}`);
  });
}

getTest4Passages()
  .then(() => process.exit(0))
  .catch(err => {
    console.error('Error:', err);
    process.exit(1);
  });
