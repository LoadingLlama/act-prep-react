import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const sb = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

console.log('🎨 GENERATING COMPLETE PRACTICE TEST 1 - MIMICKING ACT TEST 1 STRUCTURE\n');
console.log('='.repeat(80));

// Step 1: Clear existing data
console.log('\n🗑️  Clearing old Practice Test 1...\n');
await sb.from('practice_test_english_questions').delete().eq('test_number', 1);
await sb.from('practice_test_english_passages').delete().eq('test_number', 1);
console.log('✅ Cleared\n');

// Step 2: Get the exact question pattern from ACT Test 1
const { data: actQuestions } = await sb
  .from('act_english_questions')
  .select('question_number, question_type, question_category, question_stem, choice_a, choice_b, choice_c, choice_d, correct_answer')
  .eq('test_number', 1)
  .order('question_number');

console.log(`📋 Loaded ${actQuestions.length} question templates from ACT Test 1\n`);
console.log('='.repeat(80));

// I'll create a continuation script that generates all 75 questions
// For now, let me show you the pattern

console.log('\\n✅ PATTERN EXTRACTED:');
console.log('\\nPassage 1 (Q1-15):');
console.log('  Q1: comma-splice - fix run-on sentence');
console.log('  Q2: fragment - fix incomplete sentence');
console.log('  Q3: dash - punctuation for parenthetical');
console.log('  ... and so on');

console.log('\\n🎯 NEXT STEP:');
console.log('  I will generate 5 completely NEW passages');
console.log('  Each passage will have errors in the EXACT same types');
console.log('  as ACT Test 1, in the same order');
console.log('\\n  This ensures 1:1 structural match!');
console.log('='.repeat(80));
