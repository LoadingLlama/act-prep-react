#!/usr/bin/env node

import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '../../.env') });

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

console.log('🔍 CHECKING PRACTICE TEST 4 DATA IN SUPABASE\n');
console.log('='.repeat(80));

// Check lessons for Test 4
const { data: lessons, error: lessonsError } = await supabase
  .from('lessons')
  .select('*')
  .eq('practice_test_number', 4)
  .order('subject', { ascending: true })
  .order('lesson_number', { ascending: true });

if (lessonsError) {
  console.error('❌ Error fetching lessons:', lessonsError);
} else {
  console.log('\n📚 PRACTICE TEST 4 LESSONS:');
  console.log(`Found ${lessons?.length || 0} lessons for Test 4\n`);

  if (lessons && lessons.length > 0) {
    lessons.forEach(lesson => {
      console.log(`  • ${lesson.subject} - Lesson ${lesson.lesson_number}: ${lesson.title || 'Untitled'}`);
      console.log(`    ID: ${lesson.id}`);
      console.log(`    Test: ${lesson.practice_test_number}`);
    });
  } else {
    console.log('  ⚠️ No lessons found for Practice Test 4');
  }
}

// Check English questions
const { data: englishQuestions, error: engError } = await supabase
  .from('act_english_questions')
  .select('question_number, test_number')
  .eq('test_number', 4)
  .order('question_number');

console.log(`\n📝 ENGLISH QUESTIONS: ${englishQuestions?.length || 0} questions`);
if (englishQuestions && englishQuestions.length > 0) {
  const qNums = englishQuestions.map(q => q.question_number);
  console.log(`  Range: Q${Math.min(...qNums)} - Q${Math.max(...qNums)}`);
  console.log(`  Expected: 75 questions (Q1-75)`);
  console.log(`  Missing: ${75 - englishQuestions.length} questions`);
} else {
  console.log('  ⚠️ No English questions found - ALL 75 questions need extraction');
}

// Check English passages
const { data: englishPassages, error: engPassError } = await supabase
  .from('act_english_passages')
  .select('passage_number, title, test_number')
  .eq('test_number', 4)
  .order('passage_number');

console.log(`\n📖 ENGLISH PASSAGES: ${englishPassages?.length || 0} passages`);
if (englishPassages && englishPassages.length > 0) {
  englishPassages.forEach(p => {
    console.log(`  • Passage ${p.passage_number}: ${p.title || 'Untitled'}`);
  });
  console.log(`  Expected: 5 passages`);
  console.log(`  Missing: ${5 - englishPassages.length} passages`);
} else {
  console.log('  ⚠️ No English passages found - ALL 5 passages need extraction');
}

// Check Math questions
const { data: mathQuestions, error: mathError } = await supabase
  .from('act_math_questions')
  .select('question_number, test_number')
  .eq('test_number', 4)
  .order('question_number');

console.log(`\n🔢 MATH QUESTIONS: ${mathQuestions?.length || 0} questions`);
if (mathQuestions && mathQuestions.length > 0) {
  const qNums = mathQuestions.map(q => q.question_number);
  console.log(`  Range: Q${Math.min(...qNums)} - Q${Math.max(...qNums)}`);
  console.log(`  Expected: 60 questions (Q1-60)`);
  console.log(`  Missing: ${60 - mathQuestions.length} questions`);
} else {
  console.log('  ⚠️ No Math questions found - ALL 60 questions need extraction');
}

// Check Reading questions
const { data: readingQuestions, error: readError } = await supabase
  .from('act_reading_questions')
  .select('question_number, test_number')
  .eq('test_number', 4)
  .order('question_number');

console.log(`\n📚 READING QUESTIONS: ${readingQuestions?.length || 0} questions`);
if (readingQuestions && readingQuestions.length > 0) {
  const qNums = readingQuestions.map(q => q.question_number);
  console.log(`  Range: Q${Math.min(...qNums)} - Q${Math.max(...qNums)}`);
  console.log(`  Expected: 40 questions (Q1-40)`);
  console.log(`  Missing: ${40 - readingQuestions.length} questions`);
} else {
  console.log('  ⚠️ No Reading questions found - ALL 40 questions need extraction');
}

// Check Reading passages
const { data: readingPassages, error: readPassError } = await supabase
  .from('act_reading_passages')
  .select('passage_number, title, passage_type, test_number')
  .eq('test_number', 4)
  .order('passage_number');

console.log(`\n📖 READING PASSAGES: ${readingPassages?.length || 0} passages`);
if (readingPassages && readingPassages.length > 0) {
  readingPassages.forEach(p => {
    console.log(`  • Passage ${p.passage_number} (${p.passage_type}): ${p.title || 'Untitled'}`);
  });
  console.log(`  Expected: 4 passages`);
  console.log(`  Missing: ${4 - readingPassages.length} passages`);
} else {
  console.log('  ⚠️ No Reading passages found - ALL 4 passages need extraction');
}

// Check Science questions
const { data: scienceQuestions, error: sciError } = await supabase
  .from('act_science_questions')
  .select('question_number, test_number')
  .eq('test_number', 4)
  .order('question_number');

console.log(`\n🔬 SCIENCE QUESTIONS: ${scienceQuestions?.length || 0} questions`);
if (scienceQuestions && scienceQuestions.length > 0) {
  const qNums = scienceQuestions.map(q => q.question_number);
  console.log(`  Range: Q${Math.min(...qNums)} - Q${Math.max(...qNums)}`);
  console.log(`  Expected: 40 questions (Q1-40)`);
  console.log(`  Missing: ${40 - scienceQuestions.length} questions`);
} else {
  console.log('  ⚠️ No Science questions found - ALL 40 questions need extraction');
}

// Check Science passages
const { data: sciencePassages, error: sciPassError } = await supabase
  .from('act_science_passages')
  .select('passage_number, title, passage_type, test_number')
  .eq('test_number', 4)
  .order('passage_number');

console.log(`\n📖 SCIENCE PASSAGES: ${sciencePassages?.length || 0} passages`);
if (sciencePassages && sciencePassages.length > 0) {
  sciencePassages.forEach(p => {
    console.log(`  • Passage ${p.passage_number} (${p.passage_type}): ${p.title || 'Untitled'}`);
  });
  console.log(`  Expected: 6-7 passages`);
} else {
  console.log('  ⚠️ No Science passages found - ALL passages need extraction');
}

console.log('\n' + '='.repeat(80));
console.log('📊 SUMMARY FOR PRACTICE TEST 4:\n');

const totalExpected = 75 + 60 + 40 + 40; // 215 total questions
const totalFound = (englishQuestions?.length || 0) + (mathQuestions?.length || 0) +
                   (readingQuestions?.length || 0) + (scienceQuestions?.length || 0);

console.log(`Total Questions Expected: ${totalExpected}`);
console.log(`Total Questions Found: ${totalFound}`);
console.log(`Total Questions Missing: ${totalExpected - totalFound}`);
console.log(`Completion: ${Math.round((totalFound / totalExpected) * 100)}%`);

const totalPassagesExpected = 5 + 4 + 7; // English + Reading + Science
const totalPassagesFound = (englishPassages?.length || 0) + (readingPassages?.length || 0) +
                            (sciencePassages?.length || 0);

console.log(`\nTotal Passages Expected: ${totalPassagesExpected}`);
console.log(`Total Passages Found: ${totalPassagesFound}`);
console.log(`Total Passages Missing: ${totalPassagesExpected - totalPassagesFound}`);
console.log(`Completion: ${Math.round((totalPassagesFound / totalPassagesExpected) * 100)}%`);

console.log('\n' + '='.repeat(80));
