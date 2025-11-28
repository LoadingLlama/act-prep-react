require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function compareScienceQuestions() {
  console.log('\n🔍 Comparing Science Questions Q1-16 (SUCCESS) vs Q17-40 (FAILED)\n');

  // Get all science questions
  const { data: allQuestions, error } = await supabase
    .from('practice_test_science_questions')
    .select('*')
    .eq('test_number', 1)
    .order('question_number', { ascending: true });

  if (error) {
    console.error('❌ Error:', error);
    return;
  }

  const successful = allQuestions.filter(q => q.question_number >= 1 && q.question_number <= 16);
  const failed = allQuestions.filter(q => q.question_number >= 17 && q.question_number <= 40);

  console.log('✅ SUCCESSFUL (Q1-16):');
  console.log('  Count:', successful.length);
  console.log('  Sample Q1:',{
    id: successful[0].id,
    question_number: successful[0].question_number,
    test_number: successful[0].test_number,
    passage_id: successful[0].passage_id,
    correct_answer: successful[0].correct_answer,
    chapter: successful[0].chapter,
    lesson_id: successful[0].lesson_id
  });
  console.log('  Sample Q16:', {
    id: successful[15].id,
    question_number: successful[15].question_number,
    test_number: successful[15].test_number,
    passage_id: successful[15].passage_id,
    correct_answer: successful[15].correct_answer,
    chapter: successful[15].chapter,
    lesson_id: successful[15].lesson_id
  });

  console.log('\n❌ FAILED (Q17-40):');
  console.log('  Count:', failed.length);
  console.log('  Sample Q17:', {
    id: failed[0].id,
    question_number: failed[0].question_number,
    test_number: failed[0].test_number,
    passage_id: failed[0].passage_id,
    correct_answer: failed[0].correct_answer,
    chapter: failed[0].chapter,
    lesson_id: failed[0].lesson_id
  });
  console.log('  Sample Q40:', {
    id: failed[23].id,
    question_number: failed[23].question_number,
    test_number: failed[23].test_number,
    passage_id: failed[23].passage_id,
    correct_answer: failed[23].correct_answer,
    chapter: failed[23].chapter,
    lesson_id: failed[23].lesson_id
  });

  console.log('\n🔍 COMPARING FIELDS:\n');

  // Check for differences
  const successFields = Object.keys(successful[0]);
  const failFields = Object.keys(failed[0]);

  console.log('Fields in Q1-16:', successFields.join(', '));
  console.log('Fields in Q17-40:', failFields.join(', '));

  // Check for null lesson_id
  const nullLessons17to40 = failed.filter(q => q.lesson_id === null);
  const nullLessons1to16 = successful.filter(q => q.lesson_id === null);

  console.log('\n📊 NULL lesson_id comparison:');
  console.log(`  Q1-16: ${nullLessons1to16.length}/${successful.length} have null lesson_id`);
  console.log(`  Q17-40: ${nullLessons17to40.length}/${failed.length} have null lesson_id`);

  // Check for null chapter
  const nullChapter17to40 = failed.filter(q => q.chapter === null);
  const nullChapter1to16 = successful.filter(q => q.chapter === null);

  console.log('\n📊 NULL chapter comparison:');
  console.log(`  Q1-16: ${nullChapter1to16.length}/${successful.length} have null chapter`);
  console.log(`  Q17-40: ${nullChapter17to40.length}/${failed.length} have null chapter`);

  // Check if ALL Q17-40 have null lesson_id
  if (nullLessons17to40.length === failed.length) {
    console.log('\n🚨 CRITICAL: ALL Q17-40 have NULL lesson_id!');
    console.log('This might be causing RLS policy violations!');
  }
}

compareScienceQuestions()
  .then(() => process.exit(0))
  .catch(err => {
    console.error('💥 Fatal error:', err);
    process.exit(1);
  });
