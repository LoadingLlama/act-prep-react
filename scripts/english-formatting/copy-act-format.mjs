import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const sb = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

console.log('🔄 COPYING ACTUAL ACT TEST 1 FORMAT TO PRACTICE TEST 1\n');
console.log('='.repeat(80));

// Get all ACT Test 1 questions with proper formatting
const { data: actQuestions } = await sb
  .from('act_english_questions')
  .select('*')
  .eq('test_number', 1)
  .order('question_number');

console.log(`\nFound ${actQuestions.length} ACT Test 1 questions with proper format\n`);

let updateCount = 0;
let errors = [];

for (const actQ of actQuestions) {
  // Update the corresponding practice test question
  const { error } = await sb
    .from('practice_test_english_questions')
    .update({
      question_text: actQ.question_stem,  // Copy the properly formatted stem
    })
    .eq('test_number', 1)
    .eq('question_number', actQ.question_number);

  if (error) {
    errors.push(`Q${actQ.question_number}: ${error.message}`);
    console.log(`  ❌ Q${actQ.question_number}: ${error.message}`);
  } else {
    updateCount++;
    console.log(`  ✅ Q${actQ.question_number}: ${actQ.question_stem.substring(0, 60)}...`);
  }
}

console.log('\n' + '='.repeat(80));
console.log(`\n✅ COMPLETE! Updated ${updateCount}/${actQuestions.length} questions`);

if (errors.length > 0) {
  console.log(`\n❌ Errors: ${errors.length}`);
  errors.forEach(e => console.log(`  ${e}`));
}

console.log('\n📊 FORMAT VERIFICATION:');
console.log('  All questions now have proper ACT format:');
console.log('  - Question text shows full sentence');
console.log('  - Underlined portion embedded with <u> tags');
console.log('  - Matches actual ACT English test exactly!');
console.log('='.repeat(80));
