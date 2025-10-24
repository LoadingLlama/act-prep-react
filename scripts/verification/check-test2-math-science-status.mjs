#!/usr/bin/env node

import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '../../.env') });

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

console.log('🔍 CHECKING TEST 2 MATH AND SCIENCE QUESTIONS STATUS');
console.log('='.repeat(70));

// Check Math questions
const { data: mathData, error: mathError } = await supabase
  .from('act_math_questions')
  .select('question_number, question_stem, choice_a, choice_b, choice_c, choice_d, choice_e, lesson_id, difficulty_level, correct_answer')
  .eq('test_number', 2)
  .order('question_number')
  .limit(10);

if (mathError) {
  console.error('❌ Error fetching Math questions:', mathError);
} else {
  console.log('\n📊 MATH QUESTIONS SAMPLE (first 10):');
  console.log('='.repeat(50));

  let mathIssues = 0;
  mathData.forEach(q => {
    const missingChoices = !q.choice_a || !q.choice_b || !q.choice_c || !q.choice_d || !q.choice_e;
    const missingLesson = !q.lesson_id || !q.difficulty_level;
    const missingAnswer = !q.correct_answer;

    if (missingChoices || missingLesson || missingAnswer) mathIssues++;

    console.log(`Q${q.question_number}: ${q.question_stem ? q.question_stem.substring(0, 60) + '...' : 'NO STEM'}`);
    console.log(`  Choices: A=${q.choice_a ? '✅' : '❌'} B=${q.choice_b ? '✅' : '❌'} C=${q.choice_c ? '✅' : '❌'} D=${q.choice_d ? '✅' : '❌'} E=${q.choice_e ? '✅' : '❌'}`);
    console.log(`  Lesson: ${q.lesson_id ? '✅' : '❌'} Difficulty: ${q.difficulty_level ? '✅' : '❌'} Answer: ${q.correct_answer ? '✅' : '❌'}`);
    console.log('---');
  });

  console.log(`\nMath questions with issues: ${mathIssues}/10 (sample)`);
}

// Check Science questions
const { data: scienceData, error: scienceError } = await supabase
  .from('act_science_questions')
  .select('question_number, question_stem, choice_a, choice_b, choice_c, choice_d, lesson_id, difficulty_level, correct_answer')
  .eq('test_number', 2)
  .order('question_number')
  .limit(10);

if (scienceError) {
  console.error('❌ Error fetching Science questions:', scienceError);
} else {
  console.log('\n📊 SCIENCE QUESTIONS SAMPLE (first 10):');
  console.log('='.repeat(50));

  let scienceIssues = 0;
  scienceData.forEach(q => {
    const missingChoices = !q.choice_a || !q.choice_b || !q.choice_c || !q.choice_d;
    const missingLesson = !q.lesson_id || !q.difficulty_level;
    const missingAnswer = !q.correct_answer;

    if (missingChoices || missingLesson || missingAnswer) scienceIssues++;

    console.log(`Q${q.question_number}: ${q.question_stem ? q.question_stem.substring(0, 60) + '...' : 'NO STEM'}`);
    console.log(`  Choices: A=${q.choice_a ? '✅' : '❌'} B=${q.choice_b ? '✅' : '❌'} C=${q.choice_c ? '✅' : '❌'} D=${q.choice_d ? '✅' : '❌'}`);
    console.log(`  Lesson: ${q.lesson_id ? '✅' : '❌'} Difficulty: ${q.difficulty_level ? '✅' : '❌'} Answer: ${q.correct_answer ? '✅' : '❌'}`);
    console.log('---');
  });

  console.log(`\nScience questions with issues: ${scienceIssues}/10 (sample)`);
}

// Get total counts
const [mathCount, scienceCount] = await Promise.all([
  supabase.from('act_math_questions').select('question_number', { count: 'exact' }).eq('test_number', 2),
  supabase.from('act_science_questions').select('question_number', { count: 'exact' }).eq('test_number', 2)
]);

console.log('\n📋 SUMMARY:');
console.log(`Total Math questions: ${mathCount.count}/60`);
console.log(`Total Science questions: ${scienceCount.count}/40`);
console.log('\n⚠️  Issues found - need complete extraction with:');
console.log('   1. All answer choices (Math: A-E/F-K, Science: A-D/F-J)');
console.log('   2. lesson_id assignment');
console.log('   3. difficulty_level assignment');

// Check a few specific questions to see the current state
const { data: mathSample } = await supabase
  .from('act_math_questions')
  .select('*')
  .eq('test_number', 2)
  .eq('question_number', 1)
  .single();

const { data: scienceSample } = await supabase
  .from('act_science_questions')
  .select('*')
  .eq('test_number', 2)
  .eq('question_number', 1)
  .single();

console.log('\n🔍 DETAILED SAMPLE ANALYSIS:');
if (mathSample) {
  console.log('\nMath Q1 current state:');
  console.log(`  Stem: ${mathSample.question_stem || 'MISSING'}`);
  console.log(`  Choice A: ${mathSample.choice_a || 'MISSING'}`);
  console.log(`  Choice B: ${mathSample.choice_b || 'MISSING'}`);
  console.log(`  Choice C: ${mathSample.choice_c || 'MISSING'}`);
  console.log(`  Choice D: ${mathSample.choice_d || 'MISSING'}`);
  console.log(`  Choice E: ${mathSample.choice_e || 'MISSING'}`);
  console.log(`  Lesson ID: ${mathSample.lesson_id || 'MISSING'}`);
  console.log(`  Difficulty: ${mathSample.difficulty_level || 'MISSING'}`);
}

if (scienceSample) {
  console.log('\nScience Q1 current state:');
  console.log(`  Stem: ${scienceSample.question_stem || 'MISSING'}`);
  console.log(`  Choice A: ${scienceSample.choice_a || 'MISSING'}`);
  console.log(`  Choice B: ${scienceSample.choice_b || 'MISSING'}`);
  console.log(`  Choice C: ${scienceSample.choice_c || 'MISSING'}`);
  console.log(`  Choice D: ${scienceSample.choice_d || 'MISSING'}`);
  console.log(`  Lesson ID: ${scienceSample.lesson_id || 'MISSING'}`);
  console.log(`  Difficulty: ${scienceSample.difficulty_level || 'MISSING'}`);
}