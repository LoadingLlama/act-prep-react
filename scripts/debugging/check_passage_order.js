/**
 * Check which passages/questions are actually valid after filtering
 */

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function checkPassageOrder() {
  console.log('🔍 CHECKING PASSAGE ORDER FOR TEST 2 ENGLISH\n');

  // Get all questions for Test 2 English
  const { data: questions, error: questionsError } = await supabase
    .from('practice_test_english_questions')
    .select('*')
    .eq('test_number', 2)
    .order('question_number', { ascending: true });

  if (questionsError || !questions) {
    console.error('Error:', questionsError);
    return;
  }

  // Get passages
  const { data: passages, error: passagesError } = await supabase
    .from('practice_test_english_passages')
    .select('*')
    .eq('test_number', 2)
    .order('passage_number', { ascending: true });

  if (passagesError || !passages) {
    console.error('Error:', passagesError);
    return;
  }

  // Create passage lookup
  const passageMap = {};
  passages.forEach(p => {
    passageMap[p.id] = p;
  });

  // Add passage info to questions
  questions.forEach(q => {
    if (q.passage_id && passageMap[q.passage_id]) {
      q.passage_number = passageMap[q.passage_id].passage_number;
      q.passage_title = passageMap[q.passage_id].passage_title;
    }
  });

  // Apply same filtering as service
  const validQuestions = questions.filter(q => {
    if (!q.correct_answer) return false;
    const answer = String(q.correct_answer).trim();
    if (answer.includes('TBD')) return false;
    if (!/^[A-K]$/i.test(answer) && !/^\d+$/.test(answer)) return false;
    if (!q.question_text || q.question_text.trim().length === 0) return false;
    if (q.question_text.includes('TBD')) return false;
    return true;
  });

  console.log(`Total questions: ${questions.length}`);
  console.log(`Valid questions after filtering: ${validQuestions.length}\n`);

  // Group by passage
  const byPassage = {};
  validQuestions.forEach(q => {
    const pNum = q.passage_number || 'unknown';
    if (!byPassage[pNum]) {
      byPassage[pNum] = {
        passage_number: pNum,
        passage_title: q.passage_title || 'N/A',
        questions: []
      };
    }
    byPassage[pNum].questions.push(q.question_number);
  });

  // Sort by passage number and display
  const sortedPassages = Object.values(byPassage).sort((a, b) => a.passage_number - b.passage_number);

  console.log('PASSAGES IN ORDER (after filtering):');
  console.log('='.repeat(70));

  sortedPassages.forEach(p => {
    console.log(`\nPassage ${p.passage_number}: "${p.passage_title}"`);
    console.log(`  Question count: ${p.questions.length}`);
    console.log(`  Questions: ${p.questions.join(', ')}`);
  });

  console.log('\n' + '='.repeat(70));
  console.log('\n⚠️  FIRST PASSAGE THAT WILL DISPLAY:');
  if (sortedPassages.length > 0) {
    const first = sortedPassages[0];
    console.log(`  Passage ${first.passage_number}: "${first.passage_title}"`);
    console.log(`  This ${first.passage_number === 1 ? '✅ IS' : '❌ IS NOT'} passage 1`);
  }
}

checkPassageOrder().catch(console.error);
