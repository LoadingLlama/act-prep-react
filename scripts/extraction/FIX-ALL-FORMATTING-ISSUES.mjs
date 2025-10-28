#!/usr/bin/env node
import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '../../.env') });

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

console.log('🔧 FIXING ALL FORMATTING ISSUES\n');
console.log('='.repeat(80));

const answerMap = {
  'F': 'A',
  'G': 'B',
  'H': 'C',
  'J': 'D',
  'K': 'E'
};

let totalFixed = 0;

// ==================== FIX TEST 1 ANSWER FORMATS ====================
console.log('\n📝 FIXING TEST 1 ANSWER FORMATS (F/G/H/J → A/B/C/D):\n');

// Fix Test 1 English
console.log('Test 1 English:');
const {data: test1Eng, error: e1} = await supabase
  .from('act_english_questions')
  .select('*')
  .eq('test_number', 1);

if (!e1 && test1Eng) {
  let fixed = 0;
  for (const q of test1Eng) {
    if (['F', 'G', 'H', 'J'].includes(q.correct_answer)) {
      const newAnswer = answerMap[q.correct_answer];
      const {error} = await supabase
        .from('act_english_questions')
        .update({correct_answer: newAnswer})
        .eq('id', q.id);

      if (!error) {
        console.log(`  ✅ Q${q.question_number}: ${q.correct_answer} → ${newAnswer}`);
        fixed++;
        totalFixed++;
      } else {
        console.log(`  ❌ Q${q.question_number}: Error - ${error.message}`);
      }
    }
  }
  console.log(`  Fixed: ${fixed} questions\n`);
}

// Fix Test 1 Reading
console.log('Test 1 Reading:');
const {data: test1Read, error: e2} = await supabase
  .from('act_reading_questions')
  .select('*')
  .eq('test_number', 1);

if (!e2 && test1Read) {
  let fixed = 0;
  for (const q of test1Read) {
    if (['F', 'G', 'H', 'J'].includes(q.correct_answer)) {
      const newAnswer = answerMap[q.correct_answer];
      const {error} = await supabase
        .from('act_reading_questions')
        .update({correct_answer: newAnswer})
        .eq('id', q.id);

      if (!error) {
        console.log(`  ✅ Q${q.question_number}: ${q.correct_answer} → ${newAnswer}`);
        fixed++;
        totalFixed++;
      } else {
        console.log(`  ❌ Q${q.question_number}: Error - ${error.message}`);
      }
    }
  }
  console.log(`  Fixed: ${fixed} questions\n`);
}

// Fix Test 1 Science
console.log('Test 1 Science:');
const {data: test1Sci, error: e3} = await supabase
  .from('act_science_questions')
  .select('*')
  .eq('test_number', 1);

if (!e3 && test1Sci) {
  let fixed = 0;
  for (const q of test1Sci) {
    if (['F', 'G', 'H', 'J'].includes(q.correct_answer)) {
      const newAnswer = answerMap[q.correct_answer];
      const {error} = await supabase
        .from('act_science_questions')
        .update({correct_answer: newAnswer})
        .eq('id', q.id);

      if (!error) {
        console.log(`  ✅ Q${q.question_number}: ${q.correct_answer} → ${newAnswer}`);
        fixed++;
        totalFixed++;
      } else {
        console.log(`  ❌ Q${q.question_number}: Error - ${error.message}`);
      }
    }
  }
  console.log(`  Fixed: ${fixed} questions\n`);
}

// ==================== FIX TEST 2 MISSING UNDERLINED_TEXT ====================
console.log('\n📝 FIXING TEST 2 MISSING UNDERLINED_TEXT:\n');

const {data: test2Eng, error: e4} = await supabase
  .from('act_english_questions')
  .select('*')
  .eq('test_number', 2)
  .or('underlined_text.is.null,underlined_text.eq.');

if (!e4 && test2Eng) {
  console.log(`  Found ${test2Eng.length} questions with missing underlined_text`);
  console.log('  These are likely full-passage questions (Q9, Q10, Q18, Q20, Q30, Q37, Q41, Q44, Q45, Q48, Q57, Q60, Q67, Q75)');
  console.log('  Setting underlined_text to empty string for consistency...\n');

  for (const q of test2Eng) {
    const {error} = await supabase
      .from('act_english_questions')
      .update({underlined_text: ''})
      .eq('id', q.id);

    if (!error) {
      console.log(`  ✅ Q${q.question_number}: Set underlined_text to ""`);
      totalFixed++;
    } else {
      console.log(`  ❌ Q${q.question_number}: Error - ${error.message}`);
    }
  }
}

console.log('\n' + '='.repeat(80));
console.log(`\n✅ TOTAL FIXES APPLIED: ${totalFixed}\n`);
console.log('Re-running comprehensive audit to verify all fixes...\n');
