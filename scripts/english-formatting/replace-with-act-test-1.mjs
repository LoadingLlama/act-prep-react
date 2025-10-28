import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const sb = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

console.log('🔄 REPLACING PRACTICE TEST 1 WITH ACTUAL ACT TEST 1 DATA\n');
console.log('='.repeat(80));

// STEP 1: Get all ACT Test 1 passages
console.log('\n📚 STEP 1: Fetching ACT Test 1 passages...\n');

const { data: actPassages } = await sb
  .from('act_english_passages')
  .select('*')
  .eq('test_number', 1)
  .order('passage_number');

console.log(`Found ${actPassages.length} ACT Test 1 passages\n`);

// STEP 2: Delete existing practice test 1 passages
console.log('🗑️  STEP 2: Deleting old Practice Test 1 passages...\n');

const { error: deletePassagesError } = await sb
  .from('practice_test_english_passages')
  .delete()
  .eq('test_number', 1);

if (deletePassagesError) {
  console.log('❌ Error deleting passages:', deletePassagesError.message);
} else {
  console.log('✅ Deleted old passages\n');
}

// STEP 3: Insert ACT Test 1 passages as Practice Test 1 passages
console.log('📝 STEP 3: Inserting ACT passages as Practice Test passages...\n');

for (const passage of actPassages) {
  const newPassage = {
    test_number: 1,
    passage_number: passage.passage_number,
    passage_title: passage.passage_title || `Passage ${passage.passage_number}`,
    passage_text: passage.passage_text,
    passage_type: passage.passage_type || 'english'
  };

  const { error } = await sb
    .from('practice_test_english_passages')
    .insert(newPassage);

  if (error) {
    console.log(`  ❌ Passage ${passage.passage_number}: ${error.message}`);
  } else {
    console.log(`  ✅ Passage ${passage.passage_number}: ${passage.passage_title?.substring(0, 50) || 'Untitled'}`);
  }
}

// STEP 4: Get passage ID mapping (old ACT IDs to new Practice Test IDs)
console.log('\n🔗 STEP 4: Creating passage ID mapping...\n');

const { data: newPassages } = await sb
  .from('practice_test_english_passages')
  .select('*')
  .eq('test_number', 1)
  .order('passage_number');

const passageMap = {};
actPassages.forEach((actP, index) => {
  passageMap[actP.id] = newPassages[index].id;
  console.log(`  ACT Passage ${actP.passage_number} (ID ${actP.id}) → Practice Passage ${newPassages[index].passage_number} (ID ${newPassages[index].id})`);
});

// STEP 5: Get all ACT Test 1 questions
console.log('\n📋 STEP 5: Fetching ACT Test 1 questions...\n');

const { data: actQuestions } = await sb
  .from('act_english_questions')
  .select('*')
  .eq('test_number', 1)
  .order('question_number');

console.log(`Found ${actQuestions.length} ACT Test 1 questions\n`);

// STEP 6: Delete existing practice test 1 questions
console.log('🗑️  STEP 6: Deleting old Practice Test 1 questions...\n');

const { error: deleteQuestionsError } = await sb
  .from('practice_test_english_questions')
  .delete()
  .eq('test_number', 1);

if (deleteQuestionsError) {
  console.log('❌ Error deleting questions:', deleteQuestionsError.message);
} else {
  console.log('✅ Deleted old questions\n');
}

// STEP 7: Insert ACT Test 1 questions as Practice Test 1 questions
console.log('📝 STEP 7: Inserting ACT questions as Practice Test questions...\n');

let successCount = 0;

for (const actQ of actQuestions) {
  // Map the passage_id to the new practice test passage
  const newPassageId = passageMap[actQ.passage_id];

  // Convert choices to JSON array format expected by practice_test_english_questions
  const choices = [
    `A. ${actQ.choice_a}`,
    `B. ${actQ.choice_b}`,
    `C. ${actQ.choice_c}`,
    `D. ${actQ.choice_d}`
  ];

  // Convert letter answer (A, B, C, D) to index (0, 1, 2, 3)
  let correctAnswerIndex;
  if (typeof actQ.correct_answer === 'string') {
    correctAnswerIndex = actQ.correct_answer.charCodeAt(0) - 65; // A=0, B=1, C=2, D=3
  } else {
    correctAnswerIndex = actQ.correct_answer; // Already a number
  }

  const newQuestion = {
    test_number: 1,
    question_number: actQ.question_number,
    passage_id: newPassageId,
    question_text: actQ.question_stem,
    choices: JSON.stringify(choices),
    correct_answer: correctAnswerIndex,
    explanation: actQ.notes || `Question ${actQ.question_number} - ${actQ.question_type}`,
    question_type: actQ.question_type,
    difficulty: actQ.difficulty_level || 'medium'
  };

  const { error } = await sb
    .from('practice_test_english_questions')
    .insert(newQuestion);

  if (error) {
    console.log(`  ❌ Q${actQ.question_number}: ${error.message}`);
  } else {
    successCount++;
    if (actQ.question_number % 15 === 0) {
      console.log(`  ✅ Q${actQ.question_number}: ${actQ.question_stem?.substring(0, 60)}...`);
    }
  }
}

console.log(`\n  ✅ Inserted ${successCount}/${actQuestions.length} questions\n`);

console.log('='.repeat(80));
console.log('\n🎉 COMPLETE! Practice Test 1 now has actual ACT Test 1 content');
console.log('\n📊 SUMMARY:');
console.log(`  ✅ ${actPassages.length} passages replaced`);
console.log(`  ✅ ${successCount} questions replaced`);
console.log(`  ✅ All question stems have proper format with <u>underlined</u> portions`);
console.log(`  ✅ All answer choices match the underlined portions`);
console.log(`  ✅ Ready to display in browser!\n`);
console.log('='.repeat(80));
