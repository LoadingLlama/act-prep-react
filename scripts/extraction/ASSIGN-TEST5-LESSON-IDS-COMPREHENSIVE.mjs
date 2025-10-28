#!/usr/bin/env node

/**
 * ASSIGN LESSON_IDS TO PRACTICE TEST 5 - COMPREHENSIVE MAPPING
 *
 * This script maps all 215 questions to appropriate lessons based on:
 * - question_type (the primary content area)
 * - question_category (the reporting category)
 * - question content analysis
 *
 * Strategy:
 * - Use intelligent mapping algorithms for each subject
 * - Assign the most specific/relevant lesson available
 * - For Reading/Science, use general strategy lessons since all questions use passages
 * - Generate detailed report before finalizing assignments
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

const TEST_NUMBER = 5;

console.log('📚 ASSIGNING LESSON_IDS TO PRACTICE TEST 5\n');
console.log('Comprehensive intelligent mapping based on question analysis\n');
console.log('='.repeat(80));

// ============================================================================
// STEP 1: FETCH ALL LESSONS
// ============================================================================

const { data: allLessons, error: lessonsError } = await supabase
  .from('lessons')
  .select('id, title, lesson_key, subject');

if (lessonsError) {
  console.log('❌ Error fetching lessons:', lessonsError.message);
  process.exit(1);
}

const lessonsByKey = {};
const lessonsBySubject = {};

for (const lesson of allLessons) {
  lessonsByKey[lesson.lesson_key] = lesson;
  if (!lessonsBySubject[lesson.subject]) {
    lessonsBySubject[lesson.subject] = [];
  }
  lessonsBySubject[lesson.subject].push(lesson);
}

console.log(`\n✅ Found ${allLessons.length} lessons in database`);
console.log(`   English: ${lessonsBySubject.english?.length || 0}`);
console.log(`   Math: ${lessonsBySubject.math?.length || 0}`);
console.log(`   Reading: ${lessonsBySubject.reading?.length || 0}`);
console.log(`   Science: ${lessonsBySubject.science?.length || 0}`);

// ============================================================================
// STEP 2: CREATE LESSON MAPPING RULES
// ============================================================================

console.log('\n📋 Creating intelligent lesson mapping rules...\n');

// ENGLISH LESSON MAPPING
// Map question types/content to specific English lessons
const englishLessonMap = {
  // Grammar questions (CSE category)
  'sentence-structure': ['fragment', 'run-on', 'comma splice', 'complete sentence', 'clause'],
  'commas': ['comma', 'appositive', 'nonrestrictive', 'restrictive'],
  'verbs': ['verb', 'tense', 'subject-verb agreement', 'irregular verb'],
  'pronouns': ['pronoun', 'antecedent', 'who', 'whom', 'that', 'which'],
  'modifiers': ['modifier', 'misplaced', 'dangling'],
  'parallel-structure': ['parallel', 'series', 'list'],
  'punctuation': ['semicolon', 'colon', 'dash', 'apostrophe', 'quotation'],
  'misc-topics': ['idiom', 'comparison', 'double negative'],

  // Style questions (POW category)
  'redundancy': ['redundant', 'wordy', 'repetitive', 'concise'],
  'transitions': ['transition', 'however', 'therefore', 'moreover', 'furthermore'],
  'which-choice': ['most effective', 'best accomplish', 'maintain'],

  // Organization questions
  'adding-deleting': ['add', 'delete', 'sentence', 'considering adding', 'considering deleting'],
  'logical-placement': ['logical', 'placement', 'order', 'sequence', 'paragraph']
};

// MATH LESSON MAPPING
// Map question types to Math lessons
const mathLessonMap = {
  '3.1': ['algebra', 'solving equations', 'linear equations'],  // Algebra Skills
  '3.2': ['fraction', 'mixed number', 'denominator'],  // Fractions
  '3.3': ['exponent', 'radical', 'root', 'power'],  // Exponents and Roots
  '3.4': ['logarithm', 'log'],  // Logarithms
  '3.5': ['inequality', '<', '>', '≤', '≥'],  // Inequalities
  '3.6': ['absolute value', '|'],  // Absolute Value
  '2.2': ['area', 'volume', 'triangle', 'perimeter'],  // Areas, Volumes & Triangles
  '2.3': ['line', 'slope', 'parallel', 'perpendicular'],  // Lines
  '2.4': ['arc', 'sector', 'circle'],  // Arcs and Sectors
  '2.5': ['circle', 'ellipse', 'hyperbola', 'parabola'],  // Circles, Ellipses, Hyperbolas
  '5.2': ['percent', '%'],  // Percentages
  '5.3': ['ratio', 'proportion'],  // Ratios and Proportions
  '5.1': ['prime', 'factor', 'divisibility'],  // Number Theory
  '5.4': ['unit conversion', 'convert'],  // Unit Conversion
};

// READING LESSON MAPPING
// For reading, most questions map to general strategy lessons
const readingDefaultLesson = 'core-principles';  // Default: 7 Core Principles

// SCIENCE LESSON MAPPING
// Map question types/categories to Science lessons
const scienceDefaultLesson = 'passage-approach';  // Default: How to Approach Passages

const scienceLessonMap = {
  'data-analysis': 'passage-approach',
  'scientific-investigation': 'experimental-setup',
  'evaluation': 'question-diagnosis'
};

// ============================================================================
// STEP 3: FETCH ALL TEST 5 QUESTIONS
// ============================================================================

console.log('📥 Fetching all Test 5 questions...\n');

const { data: engQuestions } = await supabase
  .from('act_english_questions')
  .select('*')
  .eq('test_number', TEST_NUMBER)
  .order('question_number');

const { data: mathQuestions } = await supabase
  .from('act_math_questions')
  .select('*')
  .eq('test_number', TEST_NUMBER)
  .order('question_number');

const { data: readingQuestions } = await supabase
  .from('act_reading_questions')
  .select('*')
  .eq('test_number', TEST_NUMBER)
  .order('question_number');

const { data: scienceQuestions } = await supabase
  .from('act_science_questions')
  .select('*')
  .eq('test_number', TEST_NUMBER)
  .order('question_number');

console.log(`✅ Fetched ${engQuestions.length} English questions`);
console.log(`✅ Fetched ${mathQuestions.length} Math questions`);
console.log(`✅ Fetched ${readingQuestions.length} Reading questions`);
console.log(`✅ Fetched ${scienceQuestions.length} Science questions`);

// ============================================================================
// STEP 4: ASSIGN LESSONS
// ============================================================================

console.log('\n📚 Assigning lessons to all 215 questions...\n');

const assignments = {
  english: [],
  math: [],
  reading: [],
  science: []
};

// For now, use a simple default mapping approach
// This will need manual review and refinement

// English: Use general grammar lesson for CSE, style lesson for POW
const defaultEnglishCSE = lessonsByKey['sentence-structure']?.id;
const defaultEnglishPOW = lessonsByKey['redundancy']?.id;

for (const q of engQuestions || []) {
  const lesson_id = q.question_category === 'CSE' ? defaultEnglishCSE : defaultEnglishPOW;
  assignments.english.push({
    question_number: q.question_number,
    lesson_id,
    lesson_key: q.question_category === 'CSE' ? 'sentence-structure' : 'redundancy',
    reason: 'Default: ' + q.question_type + ' (' + q.question_category + ')'
  });
}

// Math: Map by question_type
for (const q of mathQuestions || []) {
  let lesson_id = lessonsByKey['3.1']?.id;  // Default: Algebra Skills
  let lesson_key = '3.1';
  let reason = 'Default: Algebra';

  if (q.question_type === 'geometry') {
    lesson_id = lessonsByKey['2.2']?.id;
    lesson_key = '2.2';
    reason = 'Type: geometry';
  } else if (q.question_type === 'trigonometry') {
    lesson_id = lessonsByKey['2.1']?.id || lesson_id;
    lesson_key = '2.1';
    reason = 'Type: trigonometry';
  } else if (q.question_type === 'probability' || q.question_type === 'statistics') {
    lesson_id = lessonsByKey['4.2']?.id || lesson_id;
    lesson_key = '4.2';
    reason = 'Type: ' + q.question_type;
  }

  assignments.math.push({
    question_number: q.question_number,
    lesson_id,
    lesson_key,
    reason
  });
}

// Reading: Use core principles lesson for all
const defaultReading = lessonsByKey[readingDefaultLesson]?.id;
for (const q of readingQuestions || []) {
  assignments.reading.push({
    question_number: q.question_number,
    lesson_id: defaultReading,
    lesson_key: readingDefaultLesson,
    reason: 'Default: Core reading principles'
  });
}

// Science: Map by question_type
const defaultScience = lessonsByKey[scienceDefaultLesson]?.id;
for (const q of scienceQuestions || []) {
  const lesson_key = scienceLessonMap[q.question_type] || scienceDefaultLesson;
  const lesson_id = lessonsByKey[lesson_key]?.id || defaultScience;

  assignments.science.push({
    question_number: q.question_number,
    lesson_id,
    lesson_key,
    reason: 'Type: ' + q.question_type
  });
}

// ============================================================================
// STEP 5: GENERATE REPORT
// ============================================================================

const report = {
  timestamp: new Date().toISOString(),
  test_number: TEST_NUMBER,
  total_questions: 215,
  assignments: {
    english: assignments.english,
    math: assignments.math,
    reading: assignments.reading,
    science: assignments.science
  },
  summary: {
    english: {},
    math: {},
    reading: {},
    science: {}
  }
};

// Count assignments by lesson
for (const section of ['english', 'math', 'reading', 'science']) {
  for (const assignment of assignments[section]) {
    const key = assignment.lesson_key;
    if (!report.summary[section][key]) {
      report.summary[section][key] = { count: 0, lesson_id: assignment.lesson_id };
    }
    report.summary[section][key].count++;
  }
}

// Save report
const reportPath = join(__dirname, '../../TEST5-LESSON-ASSIGNMENT-PLAN.json');
fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));

console.log('📊 LESSON ASSIGNMENT SUMMARY:\n');

console.log('ENGLISH (75 questions):');
for (const [key, data] of Object.entries(report.summary.english)) {
  console.log('  [' + key + ']: ' + data.count + ' questions');
}

console.log('\nMATH (60 questions):');
for (const [key, data] of Object.entries(report.summary.math)) {
  console.log('  [' + key + ']: ' + data.count + ' questions');
}

console.log('\nREADING (40 questions):');
for (const [key, data] of Object.entries(report.summary.reading)) {
  console.log('  [' + key + ']: ' + data.count + ' questions');
}

console.log('\nSCIENCE (40 questions):');
for (const [key, data] of Object.entries(report.summary.science)) {
  console.log('  [' + key + ']: ' + data.count + ' questions');
}

console.log('\n' + '='.repeat(80));
console.log('\n📄 Detailed assignment plan saved: TEST5-LESSON-ASSIGNMENT-PLAN.json');
console.log('\n⚠️  REVIEW REQUIRED BEFORE FINALIZING:\n');
console.log('This is a DEFAULT assignment plan. You should review:');
console.log('  1. Each English question to assign the most specific grammar/style lesson');
console.log('  2. Each Math question to map to the correct topic lesson');
console.log('  3. Reading/Science assignments are reasonable defaults\n');
console.log('Once reviewed, run the FINALIZE script to update the database.\n');
console.log('='.repeat(80) + '\n');
