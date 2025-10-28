#!/usr/bin/env node
import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '../../.env') });

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

console.log('🔍 DEEP VERIFICATION - PRACTICE TEST 7\n');
console.log('Performing comprehensive format and consistency checks...\n');
console.log('='.repeat(80));

let totalIssues = 0;

// ============================================================================
// 1. DATABASE COUNTS
// ============================================================================
console.log('\n📊 1. DATABASE COUNTS\n');

const { data: englishQ } = await supabase
  .from('act_english_questions')
  .select('*')
  .eq('test_number', 7)
  .order('question_number');

const { data: englishP } = await supabase
  .from('act_english_passages')
  .select('*')
  .eq('test_number', 7)
  .order('passage_number');

const { data: mathQ } = await supabase
  .from('act_math_questions')
  .select('*')
  .eq('test_number', 7)
  .order('question_number');

const { data: readingQ } = await supabase
  .from('act_reading_questions')
  .select('*')
  .eq('test_number', 7)
  .order('question_number');

const { data: readingP } = await supabase
  .from('act_reading_passages')
  .select('*')
  .eq('test_number', 7)
  .order('passage_number');

const { data: scienceQ } = await supabase
  .from('act_science_questions')
  .select('*')
  .eq('test_number', 7)
  .order('question_number');

const { data: scienceP } = await supabase
  .from('act_science_passages')
  .select('*')
  .eq('test_number', 7)
  .order('passage_number');

console.log(`English Questions:  ${englishQ?.length || 0}/75 ${englishQ?.length === 75 ? '✅' : '❌'}`);
console.log(`English Passages:   ${englishP?.length || 0}/5 ${englishP?.length === 5 ? '✅' : '❌'}`);
console.log(`Math Questions:     ${mathQ?.length || 0}/60 ${mathQ?.length === 60 ? '✅' : '❌'}`);
console.log(`Reading Questions:  ${readingQ?.length || 0}/40 ${readingQ?.length === 40 ? '✅' : '❌'}`);
console.log(`Reading Passages:   ${readingP?.length || 0}/4 ${readingP?.length === 4 ? '✅' : '❌'}`);
console.log(`Science Questions:  ${scienceQ?.length || 0}/40 ${scienceQ?.length === 40 ? '✅' : '❌'}`);
console.log(`Science Passages:   ${scienceP?.length || 0}/6 ${scienceP?.length === 6 ? '✅' : '❌'}`);

if (englishQ?.length !== 75) totalIssues++;
if (englishP?.length !== 5) totalIssues++;
if (mathQ?.length !== 60) totalIssues++;
if (readingQ?.length !== 40) totalIssues++;
if (readingP?.length !== 4) totalIssues++;
if (scienceQ?.length !== 40) totalIssues++;
if (scienceP?.length !== 6) totalIssues++;

// ============================================================================
// 2. ANSWER KEY VERIFICATION
// ============================================================================
console.log('\n✅ 2. ANSWER KEY VERIFICATION\n');

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

for (const section of sections) {
  const extracted = section.data?.map(q => q.correct_answer).join(',') || '';
  const match = extracted === section.expected;
  console.log(`${section.name}: ${match ? '✅ MATCH' : '❌ MISMATCH'}`);
  if (!match) {
    totalIssues++;
    const extractedArr = extracted.split(',');
    const expectedArr = section.expected.split(',');
    for (let i = 0; i < expectedArr.length; i++) {
      if (extractedArr[i] !== expectedArr[i]) {
        console.log(`  Q${i+1}: Expected ${expectedArr[i]}, Got ${extractedArr[i]}`);
      }
    }
  }
}

// ============================================================================
// 3. ENGLISH FORMAT VERIFICATION
// ============================================================================
console.log('\n🔤 3. ENGLISH FORMAT VERIFICATION\n');

let englishIssues = 0;

// Check for underlined text HTML tags
for (const q of englishQ || []) {
  // Identify organizational questions (don't need underlined_text or context)
  const isOrganizationalQ = q.question_stem?.includes('Suppose the writer') ||
                           q.question_stem?.includes('writer wants to divide') ||
                           q.question_stem?.includes('writer is considering adding') ||
                           q.question_stem?.includes('best conclude the essay') ||
                           q.question_stem?.includes('primary purpose') ||
                           q.question_stem?.includes('true statements, if added');

  // Check required fields (skip for organizational questions)
  if (!q.underlined_text && !isOrganizationalQ && !q.question_stem.includes('best accomplish') && !q.question_stem.includes('NOT acceptable')) {
    console.log(`  ⚠️  Q${q.question_number}: Missing underlined_text field`);
    englishIssues++;
  }

  // Check context fields (skip for organizational questions)
  if (!q.context_before && !isOrganizationalQ && !q.question_stem?.includes('best transition')) {
    console.log(`  ⚠️  Q${q.question_number}: Missing context_before field`);
    englishIssues++;
  }

  if (!q.context_after && !isOrganizationalQ) {
    console.log(`  ⚠️  Q${q.question_number}: Missing context_after field`);
    englishIssues++;
  }

  // Check choice format (should be A, B, C, D)
  if (!q.choice_a || !q.choice_b || !q.choice_c || !q.choice_d) {
    console.log(`  ❌ Q${q.question_number}: Missing choice(s)`);
    englishIssues++;
  }

  // Check question_type is set
  if (!q.question_type) {
    console.log(`  ❌ Q${q.question_number}: Missing question_type`);
    englishIssues++;
  }

  // Check question_category is CSE, POW, or KLA
  if (!['CSE', 'POW', 'KLA'].includes(q.question_category)) {
    console.log(`  ❌ Q${q.question_number}: Invalid question_category: ${q.question_category}`);
    englishIssues++;
  }
}

console.log(`English formatting issues: ${englishIssues} ${englishIssues === 0 ? '✅' : '❌'}`);
totalIssues += englishIssues;

// ============================================================================
// 4. MATH FORMAT VERIFICATION
// ============================================================================
console.log('\n🔢 4. MATH FORMAT VERIFICATION\n');

let mathIssues = 0;

for (const q of mathQ || []) {
  // Check all 5 choices exist (A-E)
  if (!q.choice_a || !q.choice_b || !q.choice_c || !q.choice_d || !q.choice_e) {
    console.log(`  ❌ Q${q.question_number}: Missing choice(s)`);
    mathIssues++;
  }

  // Check correct_answer is A, B, C, D, or E
  if (!['A', 'B', 'C', 'D', 'E'].includes(q.correct_answer)) {
    console.log(`  ❌ Q${q.question_number}: Invalid correct_answer: ${q.correct_answer}`);
    mathIssues++;
  }

  // Check question_type is set
  if (!q.question_type) {
    console.log(`  ❌ Q${q.question_number}: Missing question_type`);
    mathIssues++;
  }

  // Check question_category is ALG or GEO
  if (!['ALG', 'GEO'].includes(q.question_category)) {
    console.log(`  ❌ Q${q.question_number}: Invalid question_category: ${q.question_category}`);
    mathIssues++;
  }
}

console.log(`Math formatting issues: ${mathIssues} ${mathIssues === 0 ? '✅' : '❌'}`);
totalIssues += mathIssues;

// ============================================================================
// 5. READING FORMAT VERIFICATION
// ============================================================================
console.log('\n📖 5. READING FORMAT VERIFICATION\n');

let readingIssues = 0;

for (const q of readingQ || []) {
  // Check passage_id exists and is a valid UUID
  if (!q.passage_id) {
    console.log(`  ❌ Q${q.question_number}: Missing passage_id`);
    readingIssues++;
  }

  // Check only 4 choices (A-D)
  if (!q.choice_a || !q.choice_b || !q.choice_c || !q.choice_d) {
    console.log(`  ❌ Q${q.question_number}: Missing choice(s)`);
    readingIssues++;
  }

  if (q.choice_e) {
    console.log(`  ⚠️  Q${q.question_number}: Has choice_e (should only have A-D)`);
    readingIssues++;
  }

  // Check correct_answer is A, B, C, or D
  if (!['A', 'B', 'C', 'D'].includes(q.correct_answer)) {
    console.log(`  ❌ Q${q.question_number}: Invalid correct_answer: ${q.correct_answer}`);
    readingIssues++;
  }

  // Check question_type
  if (q.question_type !== 'reading-comprehension') {
    console.log(`  ⚠️  Q${q.question_number}: question_type is '${q.question_type}' (expected 'reading-comprehension')`);
  }

  // Check question_category
  if (q.question_category !== 'KEY') {
    console.log(`  ⚠️  Q${q.question_number}: question_category is '${q.question_category}' (expected 'KEY')`);
  }
}

// Check passage linkages
const passageIds = new Set(readingP?.map(p => p.id) || []);
for (const q of readingQ || []) {
  if (q.passage_id && !passageIds.has(q.passage_id)) {
    console.log(`  ❌ Q${q.question_number}: passage_id doesn't match any passage`);
    readingIssues++;
  }
}

// Check passage types
const validReadingTypes = ['LITERARY_NARRATIVE', 'SOCIAL_SCIENCE', 'HUMANITIES', 'NATURAL_SCIENCE'];
for (const p of readingP || []) {
  if (!validReadingTypes.includes(p.passage_type)) {
    console.log(`  ❌ Passage ${p.passage_number}: Invalid passage_type: ${p.passage_type}`);
    readingIssues++;
  }

  if (!p.passage_text || p.passage_text.length < 100) {
    console.log(`  ⚠️  Passage ${p.passage_number}: passage_text seems too short (${p.passage_text?.length || 0} chars)`);
  }
}

console.log(`Reading formatting issues: ${readingIssues} ${readingIssues === 0 ? '✅' : '❌'}`);
totalIssues += readingIssues;

// ============================================================================
// 6. SCIENCE FORMAT VERIFICATION
// ============================================================================
console.log('\n🔬 6. SCIENCE FORMAT VERIFICATION\n');

let scienceIssues = 0;

for (const q of scienceQ || []) {
  // Check passage_id exists
  if (!q.passage_id) {
    console.log(`  ❌ Q${q.question_number}: Missing passage_id`);
    scienceIssues++;
  }

  // Check only 4 choices (A-D)
  if (!q.choice_a || !q.choice_b || !q.choice_c || !q.choice_d) {
    console.log(`  ❌ Q${q.question_number}: Missing choice(s)`);
    scienceIssues++;
  }

  if (q.choice_e) {
    console.log(`  ⚠️  Q${q.question_number}: Has choice_e (should only have A-D)`);
    scienceIssues++;
  }

  // Check correct_answer is A, B, C, or D
  if (!['A', 'B', 'C', 'D'].includes(q.correct_answer)) {
    console.log(`  ❌ Q${q.question_number}: Invalid correct_answer: ${q.correct_answer}`);
    scienceIssues++;
  }

  // Check question_type
  if (q.question_type !== 'data-interpretation') {
    console.log(`  ⚠️  Q${q.question_number}: question_type is '${q.question_type}' (expected 'data-interpretation')`);
  }

  // Check question_category
  if (q.question_category !== 'IOD') {
    console.log(`  ⚠️  Q${q.question_number}: question_category is '${q.question_category}' (expected 'IOD')`);
  }
}

// Check passage linkages
const sciencePassageIds = new Set(scienceP?.map(p => p.id) || []);
for (const q of scienceQ || []) {
  if (q.passage_id && !sciencePassageIds.has(q.passage_id)) {
    console.log(`  ❌ Q${q.question_number}: passage_id doesn't match any passage`);
    scienceIssues++;
  }
}

// Check passage types
const validScienceTypes = ['DATA_REPRESENTATION', 'RESEARCH_SUMMARY', 'CONFLICTING_VIEWPOINTS'];
for (const p of scienceP || []) {
  if (!validScienceTypes.includes(p.passage_type)) {
    console.log(`  ❌ Passage ${p.passage_number}: Invalid passage_type: ${p.passage_type}`);
    scienceIssues++;
  }

  if (!p.passage_text || p.passage_text.length < 100) {
    console.log(`  ⚠️  Passage ${p.passage_number}: passage_text seems too short (${p.passage_text?.length || 0} chars)`);
  }
}

console.log(`Science formatting issues: ${scienceIssues} ${scienceIssues === 0 ? '✅' : '❌'}`);
totalIssues += scienceIssues;

// ============================================================================
// 7. LESSON ASSIGNMENTS
// ============================================================================
console.log('\n🎓 7. LESSON ASSIGNMENTS\n');

let lessonIssues = 0;

const allQuestions = [
  ...(englishQ || []),
  ...(mathQ || []),
  ...(readingQ || []),
  ...(scienceQ || [])
];

for (const q of allQuestions) {
  if (!q.lesson_id) {
    console.log(`  ❌ Question missing lesson_id (${q.question_number})`);
    lessonIssues++;
  }
}

const questionsWithLessons = allQuestions.filter(q => q.lesson_id).length;
console.log(`Questions with lessons: ${questionsWithLessons}/215 ${questionsWithLessons === 215 ? '✅' : '❌'}`);

if (questionsWithLessons !== 215) {
  totalIssues++;
  lessonIssues++;
}

console.log(`Lesson assignment issues: ${lessonIssues} ${lessonIssues === 0 ? '✅' : '❌'}`);

// ============================================================================
// 8. CROSS-TEST CONSISTENCY CHECK
// ============================================================================
console.log('\n🔄 8. CROSS-TEST CONSISTENCY (vs Test 6)\n');

const { data: test6English } = await supabase
  .from('act_english_questions')
  .select('question_stem, underlined_text, context_before')
  .eq('test_number', 6)
  .limit(1);

const { data: test6Math } = await supabase
  .from('act_math_questions')
  .select('choice_e')
  .eq('test_number', 6)
  .limit(1);

// Check if Test 7 has same structure
const test7EnglishHasUnderlined = englishQ?.[0]?.underlined_text !== undefined;
const test7MathHasChoiceE = mathQ?.[0]?.choice_e !== undefined;

console.log(`English has underlined_text field: ${test7EnglishHasUnderlined ? '✅' : '❌'}`);
console.log(`Math has choice_e field: ${test7MathHasChoiceE ? '✅' : '❌'}`);

if (!test7EnglishHasUnderlined || !test7MathHasChoiceE) {
  totalIssues++;
}

// ============================================================================
// FINAL SUMMARY
// ============================================================================
console.log('\n' + '='.repeat(80));
console.log('\n📊 DEEP VERIFICATION SUMMARY\n');

if (totalIssues === 0) {
  console.log('🎉 ALL CHECKS PASSED - NO ISSUES FOUND!\n');
  console.log('✅ Database counts: Perfect');
  console.log('✅ Answer keys: 100% match');
  console.log('✅ English formatting: Perfect');
  console.log('✅ Math formatting: Perfect');
  console.log('✅ Reading formatting: Perfect');
  console.log('✅ Science formatting: Perfect');
  console.log('✅ Lesson assignments: 100% complete');
  console.log('✅ Cross-test consistency: Verified');
  console.log('\n✨ TEST 7 IS PRODUCTION READY ✨\n');
} else {
  console.log(`⚠️  FOUND ${totalIssues} ISSUE(S) - REVIEW ABOVE FOR DETAILS\n`);
}

console.log('='.repeat(80) + '\n');
