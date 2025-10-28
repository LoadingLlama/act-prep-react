#!/usr/bin/env node
import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '../../.env') });

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

console.log('🔍 ANSWER KEY VERIFICATION - ALL TESTS\n');
console.log('='.repeat(100));

let totalErrors = 0;
let totalVerified = 0;

// Check if answer key files exist for each test
for (const testNum of [2, 3, 4]) {
  console.log(`\n📋 TEST ${testNum} ANSWER KEY VERIFICATION:\n`);

  const keyPath = join(__dirname, `../../data/test${testNum}-answer-keys.json`);

  if (!fs.existsSync(keyPath)) {
    console.log(`  ⚠️  Answer key file not found: ${keyPath}\n`);
    continue;
  }

  const answerKeys = JSON.parse(fs.readFileSync(keyPath, 'utf8'));

  // Verify English
  console.log(`  📝 English Section:`);
  const {data: engQ} = await supabase
    .from('act_english_questions')
    .select('question_number, correct_answer')
    .eq('test_number', testNum)
    .order('question_number');

  let engErrors = 0;
  for (const q of engQ) {
    const expectedAnswer = answerKeys.english[q.question_number];
    if (q.correct_answer !== expectedAnswer) {
      console.log(`    ❌ Q${q.question_number}: DB=${q.correct_answer}, Expected=${expectedAnswer}`);
      engErrors++;
      totalErrors++;
    }
    totalVerified++;
  }
  console.log(`    ${engErrors === 0 ? '✅' : '❌'} Verified: ${engQ.length - engErrors}/${engQ.length} correct`);

  // Verify Math
  console.log(`  🔢 Math Section:`);
  const {data: mathQ} = await supabase
    .from('act_math_questions')
    .select('question_number, correct_answer')
    .eq('test_number', testNum)
    .order('question_number');

  let mathErrors = 0;
  for (const q of mathQ) {
    const expectedAnswer = answerKeys.math[q.question_number];
    if (q.correct_answer !== expectedAnswer) {
      console.log(`    ❌ Q${q.question_number}: DB=${q.correct_answer}, Expected=${expectedAnswer}`);
      mathErrors++;
      totalErrors++;
    }
    totalVerified++;
  }
  console.log(`    ${mathErrors === 0 ? '✅' : '❌'} Verified: ${mathQ.length - mathErrors}/${mathQ.length} correct`);

  // Verify Reading
  console.log(`  📚 Reading Section:`);
  const {data: readQ} = await supabase
    .from('act_reading_questions')
    .select('question_number, correct_answer')
    .eq('test_number', testNum)
    .order('question_number');

  let readErrors = 0;
  for (const q of readQ) {
    const expectedAnswer = answerKeys.reading[q.question_number];
    if (q.correct_answer !== expectedAnswer) {
      console.log(`    ❌ Q${q.question_number}: DB=${q.correct_answer}, Expected=${expectedAnswer}`);
      readErrors++;
      totalErrors++;
    }
    totalVerified++;
  }
  console.log(`    ${readErrors === 0 ? '✅' : '❌'} Verified: ${readQ.length - readErrors}/${readQ.length} correct`);

  // Verify Science
  console.log(`  🔬 Science Section:`);
  const {data: sciQ} = await supabase
    .from('act_science_questions')
    .select('question_number, correct_answer')
    .eq('test_number', testNum)
    .order('question_number');

  let sciErrors = 0;
  for (const q of sciQ) {
    const expectedAnswer = answerKeys.science[q.question_number];
    if (q.correct_answer !== expectedAnswer) {
      console.log(`    ❌ Q${q.question_number}: DB=${q.correct_answer}, Expected=${expectedAnswer}`);
      sciErrors++;
      totalErrors++;
    }
    totalVerified++;
  }
  console.log(`    ${sciErrors === 0 ? '✅' : '❌'} Verified: ${sciQ.length - sciErrors}/${sciQ.length} correct\n`);
}

console.log('='.repeat(100));
console.log('\n📊 ANSWER KEY VERIFICATION SUMMARY:\n');
console.log(`  Total Questions Verified: ${totalVerified}`);
console.log(`  Total Errors Found: ${totalErrors}`);
console.log(`  Accuracy: ${((totalVerified - totalErrors) / totalVerified * 100).toFixed(2)}%\n`);

if (totalErrors === 0) {
  console.log('✅✅✅ PERFECT! 100% ANSWER KEY ACCURACY ACROSS ALL TESTS! ✅✅✅\n');
} else {
  console.log(`❌ ${totalErrors} answer(s) need correction\n`);
}

console.log('='.repeat(100) + '\n');
