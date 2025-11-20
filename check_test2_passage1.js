/**
 * Check specifically Test 2 Passage 1 - "A Mouthful of Music"
 */

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function checkTest2Passage1() {
  console.log('🔍 CHECKING TEST 2 (Practice Test 1) PASSAGE 1\n');

  // Get passage 1
  const { data: passage, error: passageError } = await supabase
    .from('practice_test_english_passages')
    .select('*')
    .eq('test_number', 2)
    .eq('passage_number', 1)
    .single();

  if (passageError || !passage) {
    console.error('❌ ERROR fetching passage:', passageError);
    return;
  }

  console.log('✅ PASSAGE FOUND:');
  console.log(`  ID: ${passage.id}`);
  console.log(`  Title: "${passage.passage_title}"`);
  console.log(`  Test Number: ${passage.test_number}`);
  console.log(`  Passage Number: ${passage.passage_number}`);
  console.log(`  Text length: ${passage.passage_text.length} chars`);
  console.log(`  First 200 chars: ${passage.passage_text.substring(0, 200)}...\n`);

  // Get questions for this passage
  const { data: questions, error: questionsError } = await supabase
    .from('practice_test_english_questions')
    .select('*')
    .eq('test_number', 2)
    .eq('passage_id', passage.id)
    .order('question_number', { ascending: true });

  if (questionsError) {
    console.error('❌ ERROR fetching questions:', questionsError);
    return;
  }

  console.log(`📝 QUESTIONS LINKED TO THIS PASSAGE: ${questions.length}`);
  console.log('-'.repeat(70));

  questions.forEach(q => {
    const answer = String(q.correct_answer || '').trim();
    const textOk = q.question_text && q.question_text.trim().length > 0 && !q.question_text.includes('TBD');
    const answerOk = answer && !answer.includes('TBD') && (/^[A-K]$/i.test(answer) || /^\d+$/.test(answer));

    const status = (textOk && answerOk) ? '✅ VALID' : '❌ INVALID';

    console.log(`\nQ${q.question_number}: ${status}`);
    console.log(`  correct_answer: "${answer}" ${answerOk ? '✓' : '✗'}`);
    console.log(`  question_text: ${textOk ? '✓' : '✗ MISSING/INVALID'}`);
    if (!textOk && q.question_text) {
      console.log(`  -> Text: "${q.question_text.substring(0, 100)}..."`);
    }
  });

  const validCount = questions.filter(q => {
    const answer = String(q.correct_answer || '').trim();
    const textOk = q.question_text && q.question_text.trim().length > 0 && !q.question_text.includes('TBD');
    const answerOk = answer && !answer.includes('TBD') && (/^[A-K]$/i.test(answer) || /^\d+$/.test(answer));
    return textOk && answerOk;
  }).length;

  console.log('\n' + '='.repeat(70));
  console.log(`\n📊 SUMMARY:`);
  console.log(`  Total questions: ${questions.length}`);
  console.log(`  Valid questions: ${validCount}`);
  console.log(`  Filtered out: ${questions.length - validCount}`);

  if (validCount === 0) {
    console.log(`\n⚠️  ALL QUESTIONS FOR PASSAGE 1 ARE FILTERED OUT!`);
    console.log(`  This is why Passage 1 doesn't display - no valid questions = no passage`);
  } else {
    console.log(`\n✅ This passage should display with ${validCount} questions`);
  }
}

checkTest2Passage1().catch(console.error);
