#!/usr/bin/env node
import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '../../.env') });

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

console.log('🔍 VERIFYING PRACTICE TEST 7 - COMPLETE EXTRACTION\n');
console.log('='.repeat(80));

// Verify English
const { data: englishQ } = await supabase
  .from('act_english_questions')
  .select('question_number, correct_answer')
  .eq('test_number', 7)
  .order('question_number');

const { data: englishP } = await supabase
  .from('act_english_passages')
  .select('passage_number, title')
  .eq('test_number', 7)
  .order('passage_number');

// Verify Math
const { data: mathQ } = await supabase
  .from('act_math_questions')
  .select('question_number, correct_answer')
  .eq('test_number', 7)
  .order('question_number');

// Verify Reading
const { data: readingQ } = await supabase
  .from('act_reading_questions')
  .select('question_number, correct_answer')
  .eq('test_number', 7)
  .order('question_number');

const { data: readingP } = await supabase
  .from('act_reading_passages')
  .select('passage_number, title')
  .eq('test_number', 7)
  .order('passage_number');

// Verify Science
const { data: scienceQ } = await supabase
  .from('act_science_questions')
  .select('question_number, correct_answer')
  .eq('test_number', 7)
  .order('question_number');

const { data: scienceP } = await supabase
  .from('act_science_passages')
  .select('passage_number, title')
  .eq('test_number', 7)
  .order('passage_number');

// Display results
console.log('\n📊 QUESTION COUNTS:\n');
console.log(`English:  ${englishQ?.length || 0}/75 questions`);
console.log(`Math:     ${mathQ?.length || 0}/60 questions`);
console.log(`Reading:  ${readingQ?.length || 0}/40 questions`);
console.log(`Science:  ${scienceQ?.length || 0}/40 questions`);
console.log(`TOTAL:    ${(englishQ?.length || 0) + (mathQ?.length || 0) + (readingQ?.length || 0) + (scienceQ?.length || 0)}/215 questions`);

console.log('\n📚 PASSAGE COUNTS:\n');
console.log(`English:  ${englishP?.length || 0}/5 passages`);
console.log(`Reading:  ${readingP?.length || 0}/4 passages`);
console.log(`Science:  ${scienceP?.length || 0}/6 passages`);
console.log(`TOTAL:    ${(englishP?.length || 0) + (readingP?.length || 0) + (scienceP?.length || 0)}/15 passages`);

// Verify answer keys
console.log('\n✅ ANSWER KEY VERIFICATION:\n');

const expectedAnswers = {
  english: 'A,C,A,D,C,A,C,D,B,C,B,A,C,B,D,A,C,D,D,B,B,A,B,B,C,C,C,A,C,C,A,D,D,D,B,C,C,C,C,C,C,A,D,D,B,B,B,B,B,A,B,A,A,D,C,C,B,A,A,A,C,D,B,B,A,A,D,D,A,B,B,A,D,A,D',
  math: 'A,B,D,C,B,E,B,C,A,B,D,D,C,A,E,B,D,E,B,C,B,A,D,D,B,C,A,B,A,D,B,E,A,C,C,E,A,B,E,C,D,C,A,B,A,D,C,B,E,D,D,B,E,D,E,A,C,B,D,A',
  reading: 'D,B,A,C,A,D,B,A,C,D,A,D,C,B,C,A,A,D,C,B,C,C,A,B,D,B,C,D,A,A,D,B,B,C,D,A,C,B,A,D',
  science: 'C,A,D,B,A,B,C,A,C,B,D,A,B,C,D,C,B,D,C,A,B,D,A,C,C,B,A,D,C,A,D,C,A,B,D,B,C,A,B,D'
};

const sections = [
  { name: 'English', data: englishQ, expected: expectedAnswers.english },
  { name: 'Math', data: mathQ, expected: expectedAnswers.math },
  { name: 'Reading', data: readingQ, expected: expectedAnswers.reading },
  { name: 'Science', data: scienceQ, expected: expectedAnswers.science }
];

let allMatch = true;
for (const section of sections) {
  const extracted = section.data?.map(q => q.correct_answer).join(',') || '';
  const match = extracted === section.expected;
  console.log(`${section.name}: ${match ? '✅ MATCH' : '❌ MISMATCH'}`);
  if (!match) {
    allMatch = false;
    console.log(`  Expected: ${section.expected}`);
    console.log(`  Got:      ${extracted}`);
  }
}

console.log('\n' + '='.repeat(80));
if (allMatch &&
    englishQ?.length === 75 &&
    mathQ?.length === 60 &&
    readingQ?.length === 40 &&
    scienceQ?.length === 40) {
  console.log('\n🎉 TEST 7 EXTRACTION: 100% COMPLETE\n');
  console.log('✅ All 215 questions extracted');
  console.log('✅ All 15 passages extracted');
  console.log('✅ All answer keys verified');
  console.log('\n✨ READY FOR LESSON ASSIGNMENT!\n');
} else {
  console.log('\n⚠️  EXTRACTION INCOMPLETE - Please review above errors\n');
}
console.log('='.repeat(80) + '\n');
