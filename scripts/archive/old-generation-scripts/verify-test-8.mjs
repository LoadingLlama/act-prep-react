#!/usr/bin/env node
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

console.log('🔍 VERIFYING PRACTICE TEST 8 IN DATABASE\n');

async function verify() {
  const tables = [
    { name: 'practice_test_english_questions', expected: 75 },
    { name: 'practice_test_english_passages', expected: 5 },
    { name: 'practice_test_math_questions', expected: 60 },
    { name: 'practice_test_reading_questions', expected: 40 },
    { name: 'practice_test_reading_passages', expected: 4 },
    { name: 'practice_test_science_questions', expected: 40 },
    { name: 'practice_test_science_passages', expected: 6 }
  ];

  let allCorrect = true;

  for (const table of tables) {
    const { count, error } = await supabase
      .from(table.name)
      .select('*', { count: 'exact', head: true })
      .eq('test_number', 8);

    if (error) {
      console.log(`❌ ${table.name}: ERROR`);
      allCorrect = false;
    } else if (count === table.expected) {
      console.log(`✅ ${table.name}: ${count}/${table.expected} records`);
    } else {
      console.log(`⚠️  ${table.name}: ${count}/${table.expected} records (MISMATCH!)`);
      allCorrect = false;
    }
  }

  console.log('\n═══════════════════════════════════════════════');
  if (allCorrect) {
    console.log('✅ ALL VERIFICATION PASSED');
    console.log('Practice Test 8 successfully inserted with all 215 questions!');
  } else {
    console.log('⚠️  SOME ISSUES DETECTED');
    console.log('Review the counts above.');
  }
  console.log('═══════════════════════════════════════════════\n');

  // Show sample question from each section
  console.log('📝 Sample Questions:\n');

  const { data: engQ } = await supabase
    .from('practice_test_english_questions')
    .select('question_number, correct_answer, difficulty')
    .eq('test_number', 8)
    .eq('question_number', 1)
    .single();

  console.log(`English Q1: Answer=${engQ.correct_answer} (index), Difficulty=${engQ.difficulty}`);

  const { data: mathQ } = await supabase
    .from('practice_test_math_questions')
    .select('question_number, correct_answer, difficulty')
    .eq('test_number', 8)
    .eq('question_number', 1)
    .single();

  console.log(`Math Q1: Answer=${mathQ.correct_answer} (index), Difficulty=${mathQ.difficulty}`);

  const { data: readQ } = await supabase
    .from('practice_test_reading_questions')
    .select('question_number, correct_answer, difficulty')
    .eq('test_number', 8)
    .eq('question_number', 1)
    .single();

  console.log(`Reading Q1: Answer=${readQ.correct_answer} (index), Difficulty=${readQ.difficulty}`);

  const { data: sciQ } = await supabase
    .from('practice_test_science_questions')
    .select('question_number, correct_answer, difficulty')
    .eq('test_number', 8)
    .eq('question_number', 1)
    .single();

  console.log(`Science Q1: Answer=${sciQ.correct_answer} (index), Difficulty=${sciQ.difficulty}\n`);
}

verify();
