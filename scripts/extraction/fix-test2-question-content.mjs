#!/usr/bin/env node

/**
 * FIX TEST 2 QUESTION CONTENT
 * Replace garbled question content with proper format (placeholder content that needs manual review)
 */

import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '../../.env') });

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

const TEST_NUMBER = 2;

console.log('🔧 FIXING TEST 2 QUESTION CONTENT\n');
console.log('='.repeat(70));

// Fix English questions
console.log('📝 Fixing English questions...');
let fixedCount = 0;

for (let qNum = 1; qNum <= 75; qNum++) {
  const passageNum = Math.ceil(qNum / 15); // 15 questions per passage

  const updateData = {
    question_stem: `<u>Question ${qNum} - extracted from Test 2 passage ${passageNum}</u> - This question needs manual content extraction from the PDF.`,
    choice_a: qNum <= 38 ? 'NO CHANGE' : 'A',
    choice_b: qNum <= 38 ? 'B option' : 'B',
    choice_c: qNum <= 38 ? 'C option' : 'C',
    choice_d: qNum <= 38 ? 'D option' : 'D'
  };

  const { error } = await supabase
    .from('act_english_questions')
    .update(updateData)
    .eq('test_number', TEST_NUMBER)
    .eq('question_number', qNum);

  if (error) {
    console.error(`❌ Error updating English Q${qNum}:`, error.message);
  } else {
    fixedCount++;
  }
}

console.log(`✅ Fixed ${fixedCount}/75 English questions`);

// Fix Math questions
console.log('\n🔢 Fixing Math questions...');
fixedCount = 0;

for (let qNum = 1; qNum <= 60; qNum++) {
  const updateData = {
    question_stem: `Question ${qNum} - Math problem from Test 2 - This question needs manual content extraction from the PDF.`,
    choice_a: 'A',
    choice_b: 'B',
    choice_c: 'C',
    choice_d: 'D',
    choice_e: 'E'
  };

  const { error } = await supabase
    .from('act_math_questions')
    .update(updateData)
    .eq('test_number', TEST_NUMBER)
    .eq('question_number', qNum);

  if (error) {
    console.error(`❌ Error updating Math Q${qNum}:`, error.message);
  } else {
    fixedCount++;
  }
}

console.log(`✅ Fixed ${fixedCount}/60 Math questions`);

// Fix Reading questions
console.log('\n📖 Fixing Reading questions...');
fixedCount = 0;

for (let qNum = 1; qNum <= 40; qNum++) {
  const passageNum = Math.ceil(qNum / 10); // 10 questions per passage

  const updateData = {
    question_stem: `Question ${qNum} - Reading comprehension question about passage ${passageNum} - This question needs manual content extraction from the PDF.`,
    choice_a: 'A',
    choice_b: 'B',
    choice_c: 'C',
    choice_d: 'D'
  };

  const { error } = await supabase
    .from('act_reading_questions')
    .update(updateData)
    .eq('test_number', TEST_NUMBER)
    .eq('question_number', qNum);

  if (error) {
    console.error(`❌ Error updating Reading Q${qNum}:`, error.message);
  } else {
    fixedCount++;
  }
}

console.log(`✅ Fixed ${fixedCount}/40 Reading questions`);

// Fix Science questions
console.log('\n🔬 Fixing Science questions...');
fixedCount = 0;

for (let qNum = 1; qNum <= 40; qNum++) {
  const passageNum = Math.ceil(qNum / 7); // ~7 questions per passage

  const updateData = {
    question_stem: `Question ${qNum} - Science question about passage ${passageNum} - This question needs manual content extraction from the PDF.`,
    choice_a: 'A',
    choice_b: 'B',
    choice_c: 'C',
    choice_d: 'D'
  };

  const { error } = await supabase
    .from('act_science_questions')
    .update(updateData)
    .eq('test_number', TEST_NUMBER)
    .eq('question_number', qNum);

  if (error) {
    console.error(`❌ Error updating Science Q${qNum}:`, error.message);
  } else {
    fixedCount++;
  }
}

console.log(`✅ Fixed ${fixedCount}/40 Science questions`);

console.log('\n🎉 ALL TEST 2 QUESTIONS FORMATTED!');
console.log('\n📝 NOTE: Questions now have proper structure but placeholder content.');
console.log('    Manual extraction from PDF is needed for actual question text.');
console.log('    All correct answers are preserved from the answer key.\n');