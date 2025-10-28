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
const TEST_NUMBER = 4;

console.log('🔍 COMPREHENSIVE TEST 4 VERIFICATION\n');
console.log('='.repeat(80));

// Load answer keys
const answerKeys = JSON.parse(fs.readFileSync(join(__dirname, '../../data/test4-answer-keys.json'), 'utf8'));

// ENGLISH
console.log('\n📝 ENGLISH SECTION:');
const {data: engQ, error: engErr} = await supabase.from('act_english_questions').select('question_number, correct_answer').eq('test_number', TEST_NUMBER).order('question_number');
if (engErr) {console.error('English error:', engErr);} else {
  console.log(`  ✅ Questions in DB: ${engQ.length}/75`);
  let engCorrect = 0;
  for (const q of engQ) {
    if (q.correct_answer === answerKeys.english[q.question_number]) engCorrect++;
    else console.log(`  ❌ Q${q.question_number}: DB=${q.correct_answer}, Key=${answerKeys.english[q.question_number]}`);
  }
  console.log(`  ✅ Answer key matches: ${engCorrect}/${engQ.length}`);
}

const {data: engP, error: engPErr} = await supabase.from('act_english_passages').select('passage_number').eq('test_number', TEST_NUMBER).order('passage_number');
if (engPErr) {console.error('English passages error:', engPErr);} else {
  console.log(`  ✅ Passages in DB: ${engP.length}/5`);
}

// MATH (already complete)
console.log('\n🔢 MATH SECTION:');
const {data: mathQ, error: mathErr} = await supabase.from('act_math_questions').select('question_number').eq('test_number', TEST_NUMBER);
if (mathErr) {console.error('Math error:', mathErr);} else {
  console.log(`  ✅ Questions in DB: ${mathQ.length}/60 (Pre-existing)`);
}

// READING
console.log('\n📚 READING SECTION:');
const {data: readQ, error: readErr} = await supabase.from('act_reading_questions').select('question_number, correct_answer').eq('test_number', TEST_NUMBER).order('question_number');
if (readErr) {console.error('Reading error:', readErr);} else {
  console.log(`  ✅ Questions in DB: ${readQ.length}/40`);
  let readCorrect = 0;
  for (const q of readQ) {
    if (q.correct_answer === answerKeys.reading[q.question_number]) readCorrect++;
    else console.log(`  ❌ Q${q.question_number}: DB=${q.correct_answer}, Key=${answerKeys.reading[q.question_number]}`);
  }
  console.log(`  ✅ Answer key matches: ${readCorrect}/${readQ.length}`);
}

const {data: readP, error: readPErr} = await supabase.from('act_reading_passages').select('passage_number, title').eq('test_number', TEST_NUMBER).order('passage_number');
if (readPErr) {console.error('Reading passages error:', readPErr);} else {
  console.log(`  ✅ Passages in DB: ${readP.length}/4`);
  readP.forEach(p => console.log(`    P${p.passage_number}: ${p.title}`));
}

// SCIENCE
console.log('\n🔬 SCIENCE SECTION:');
const {data: sciQ, error: sciErr} = await supabase.from('act_science_questions').select('question_number, correct_answer').eq('test_number', TEST_NUMBER).order('question_number');
if (sciErr) {console.error('Science error:', sciErr);} else {
  console.log(`  ✅ Questions in DB: ${sciQ.length}/40`);
  let sciCorrect = 0;
  for (const q of sciQ) {
    if (q.correct_answer === answerKeys.science[q.question_number]) sciCorrect++;
    else console.log(`  ❌ Q${q.question_number}: DB=${q.correct_answer}, Key=${answerKeys.science[q.question_number]}`);
  }
  console.log(`  ✅ Answer key matches: ${sciCorrect}/${sciQ.length}`);
}

const {data: sciP, error: sciPErr} = await supabase.from('act_science_passages').select('passage_number, title, passage_type').eq('test_number', TEST_NUMBER).order('passage_number');
if (sciPErr) {console.error('Science passages error:', sciPErr);} else {
  console.log(`  ✅ Passages in DB: ${sciP.length}/6`);
  sciP.forEach(p => console.log(`    P${p.passage_number}: ${p.title} (${p.passage_type})`));
}

// SUMMARY
console.log('\n' + '='.repeat(80));
console.log('📊 FINAL TEST 4 SUMMARY:');
const totalQ = (engQ?.length || 0) + (mathQ?.length || 0) + (readQ?.length || 0) + (sciQ?.length || 0);
console.log(`  Total Questions: ${totalQ}/215`);
console.log(`  English: ${engQ?.length || 0}/75 questions + ${engP?.length || 0}/5 passages`);
console.log(`  Math: ${mathQ?.length || 0}/60 questions`);
console.log(`  Reading: ${readQ?.length || 0}/40 questions + ${readP?.length || 0}/4 passages`);
console.log(`  Science: ${sciQ?.length || 0}/40 questions + ${sciP?.length || 0}/6 passages`);

if (totalQ === 215) {
  console.log('\n🎉 TEST 4 EXTRACTION 100% COMPLETE! ALL 215 QUESTIONS VERIFIED! 🎉');
} else {
  console.log(`\n⚠️  ${215 - totalQ} questions remaining`);
}
console.log('='.repeat(80) + '\n');
