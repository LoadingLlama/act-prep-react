import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const sb = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

console.log('🔧 FIXING BACK-TO-BACK UNDERLINES IN PASSAGE 1\n');
console.log('='.repeat(80));

// Get current Passage 1
const { data: passage } = await sb
  .from('practice_test_english_passages')
  .select('*')
  .eq('test_number', 1)
  .eq('passage_number', 1)
  .single();

console.log('\n📋 CURRENT TEXT:');
console.log('  "...San Francisco<u>;</u> <u>converting</u> vacant lots..."');

console.log('\n🔍 PROBLEM:');
console.log('  Two underlines are back-to-back with only a space between them.');
console.log('  This is non-standard for ACT English format.');

console.log('\n✅ SOLUTION:');
console.log('  Expand Q2 underline to include more context.');
console.log('  Change: "Francisco<u>;</u> <u>converting</u>"');
console.log('  To:     "Francisco<u>, converting</u>"');
console.log('\n  Wait - checking Q2 answer choices...');

// Check Q2 choices
const { data: q2 } = await sb
  .from('practice_test_english_questions')
  .select('*')
  .eq('question_number', 2)
  .single();

const { data: q3 } = await sb
  .from('practice_test_english_questions')
  .select('*')
  .eq('question_number', 3)
  .single();

console.log('\n  Q2 choices:', JSON.parse(q2.choices));
console.log('  Q2 correct answer:', JSON.parse(q2.choices)[q2.correct_answer]);

console.log('\n  Q3 choices:', JSON.parse(q3.choices));
console.log('  Q3 correct answer:', JSON.parse(q3.choices)[q3.correct_answer]);

console.log('\n💡 ANALYSIS:');
console.log('  Q2 tests: punctuation mark (;, :, ,, —)');
console.log('  Q3 tests: what comes before "converting" (nothing, comma, semicolon, "and")');
console.log('\n  These overlap! Both test the transition between "Francisco" and "converting".');
console.log('  In standard ACT format, this would be ONE question, not two.');

console.log('\n🛠️  RECOMMENDED FIX:');
console.log('  Option 1: Combine into one question testing the full transition');
console.log('  Option 2: Expand underlines to avoid direct adjacency');
console.log('  Option 3: Keep as-is (non-standard but functional)');

console.log('\n' + '='.repeat(80));
console.log('\n⏸️  PAUSED - Awaiting user decision on how to fix this.');
console.log('   The current format IS functional but non-standard.');
console.log('='.repeat(80));
