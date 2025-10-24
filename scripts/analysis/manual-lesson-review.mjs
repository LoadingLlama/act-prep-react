#!/usr/bin/env node

/**
 * MANUAL LESSON REVIEW AND REASSIGNMENT
 * Comprehensive review of all question-to-lesson assignments
 */

import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '../../.env') });

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

console.log('🔍 MANUAL LESSON REVIEW - COMPREHENSIVE ANALYSIS');
console.log('='.repeat(80));

// Get all lessons first
console.log('📚 Getting all available lessons...');
const { data: lessons } = await supabase.from('lessons').select('*').order('subject', { ascending: true });

const lessonMap = {};
const lessonsBySubject = {};

lessons?.forEach(lesson => {
  lessonMap[lesson.id] = lesson;
  if (!lessonsBySubject[lesson.subject]) {
    lessonsBySubject[lesson.subject] = [];
  }
  lessonsBySubject[lesson.subject].push(lesson);
});

console.log('\n📋 LESSON CATALOG:');
Object.keys(lessonsBySubject).forEach(subject => {
  console.log(`\n${subject.toUpperCase()}:`);
  lessonsBySubject[subject].forEach(lesson => {
    console.log(`  ${lesson.title} (${lesson.id})`);
  });
});

// Sample questions for manual review
console.log('\n\n🔍 MANUAL REVIEW - SAMPLING QUESTIONS FOR ANALYSIS');
console.log('='.repeat(80));

// English questions sample
console.log('\n📝 ENGLISH QUESTIONS SAMPLE:');
const { data: englishSample } = await supabase
  .from('act_english_questions')
  .select('*')
  .in('test_number', [1, 2])
  .order('question_number')
  .limit(20);

englishSample?.forEach((q, index) => {
  const lesson = lessonMap[q.lesson_id];
  console.log(`\nQ${q.question_number} (Test ${q.test_number}):`);
  console.log(`Question: ${q.question_stem.substring(0, 100)}...`);
  console.log(`Type: ${q.question_type}`);
  console.log(`Current Lesson: ${lesson?.title || 'NO LESSON ASSIGNED'}`);
  console.log(`Choices: A) ${q.choice_a?.substring(0, 30)}...`);
  console.log(`Answer: ${q.correct_answer}`);

  if (index >= 9) return; // Limit output for readability
});

// Math questions sample
console.log('\n\n🔢 MATH QUESTIONS SAMPLE:');
const { data: mathSample } = await supabase
  .from('act_math_questions')
  .select('*')
  .in('test_number', [1, 2])
  .order('question_number')
  .limit(15);

mathSample?.forEach((q, index) => {
  const lesson = lessonMap[q.lesson_id];
  console.log(`\nQ${q.question_number} (Test ${q.test_number}):`);
  console.log(`Question: ${q.question_stem.substring(0, 100)}...`);
  console.log(`Current Lesson: ${lesson?.title || 'NO LESSON ASSIGNED'}`);
  console.log(`Answer: ${q.correct_answer}`);

  if (index >= 9) return;
});

// Reading questions sample
console.log('\n\n📖 READING QUESTIONS SAMPLE:');
const { data: readingSample } = await supabase
  .from('act_reading_questions')
  .select('*')
  .in('test_number', [1, 2])
  .order('question_number')
  .limit(15);

readingSample?.forEach((q, index) => {
  const lesson = lessonMap[q.lesson_id];
  console.log(`\nQ${q.question_number} (Test ${q.test_number}):`);
  console.log(`Question: ${q.question_stem.substring(0, 100)}...`);
  console.log(`Current Lesson: ${lesson?.title || 'NO LESSON ASSIGNED'}`);
  console.log(`Answer: ${q.correct_answer}`);

  if (index >= 9) return;
});

// Science questions sample
console.log('\n\n🔬 SCIENCE QUESTIONS SAMPLE:');
const { data: scienceSample } = await supabase
  .from('act_science_questions')
  .select('*')
  .in('test_number', [1, 2])
  .order('question_number')
  .limit(15);

scienceSample?.forEach((q, index) => {
  const lesson = lessonMap[q.lesson_id];
  console.log(`\nQ${q.question_number} (Test ${q.test_number}):`);
  console.log(`Question: ${q.question_stem.substring(0, 100)}...`);
  console.log(`Current Lesson: ${lesson?.title || 'NO LESSON ASSIGNED'}`);
  console.log(`Answer: ${q.correct_answer}`);

  if (index >= 9) return;
});

console.log('\n\n🎯 ANALYSIS COMPLETE - READY FOR MANUAL REASSIGNMENT');
console.log('Review the above samples and identify misassigned questions.');