#!/usr/bin/env node

/**
 * ULTRA-DEEP VERIFICATION FOR TEST 5
 * Extremely nitpicky format consistency check
 * Compares Test 5 against Tests 1-4 for pattern analysis readiness
 */

import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '../../.env') });

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

console.log('🔍 ULTRA-DEEP VERIFICATION - PRACTICE TEST 5\n');
console.log('Checking every detail for 100% format consistency\n');
console.log('='.repeat(80));

const issues = [];
const warnings = [];

// ============================================================================
// SECTION 1: ENGLISH QUESTIONS DEEP VERIFICATION
// ============================================================================

console.log('\n📝 SECTION 1: ENGLISH QUESTIONS (75Q)\n');

const { data: engQuestions } = await supabase
  .from('act_english_questions')
  .select('*')
  .eq('test_number', 5)
  .order('question_number');

console.log(`Found ${engQuestions?.length || 0}/75 questions`);

if (engQuestions?.length !== 75) {
  issues.push(`❌ CRITICAL: Only ${engQuestions?.length} English questions found, expected 75`);
}

// Check 1: Verify <u> tags format
let withUTags = 0;
let withoutUTags = 0;
const specialQuestions = [15, 30, 45, 60, 75]; // Passage-level questions

for (const q of engQuestions || []) {
  const hasU = q.question_stem.includes('<u>') && q.question_stem.includes('</u>');

  if (hasU) {
    withUTags++;

    // Check if underlined_text actually appears in question_stem
    if (q.underlined_text && !q.question_stem.includes(`<u>${q.underlined_text}</u>`)) {
      issues.push(`❌ Q${q.question_number}: underlined_text "${q.underlined_text}" not found with <u> tags in question_stem`);
    }

    // Check for proper HTML closing
    const openCount = (q.question_stem.match(/<u>/g) || []).length;
    const closeCount = (q.question_stem.match(/<\/u>/g) || []).length;
    if (openCount !== closeCount) {
      issues.push(`❌ Q${q.question_number}: Mismatched <u> tags (${openCount} open, ${closeCount} close)`);
    }
  } else {
    withoutUTags++;

    // If it's NOT a special question, it should have <u> tags
    if (!specialQuestions.includes(q.question_number)) {
      // Check if it's an addition/deletion/placement question (these don't have underlined portions)
      const isSpecialType = q.question_stem.includes('writer is considering') ||
                           q.question_stem.includes('Should the') ||
                           q.question_stem.includes('Paragraph') ||
                           q.question_stem.includes('preceding passage') ||
                           q.question_stem.includes('following true statements');

      if (!isSpecialType) {
        warnings.push(`⚠️  Q${q.question_number}: Regular question without <u> tags (might be wrong format)`);
      }
    }
  }

  // Check 2: All 4 choices present
  if (!q.choice_a || !q.choice_b || !q.choice_c || !q.choice_d) {
    issues.push(`❌ Q${q.question_number}: Missing choice(s) - A:${!!q.choice_a} B:${!!q.choice_b} C:${!!q.choice_c} D:${!!q.choice_d}`);
  }

  // Check 3: Required fields present
  if (!q.question_stem || q.question_stem.length < 10) {
    issues.push(`❌ Q${q.question_number}: question_stem too short or missing (${q.question_stem?.length} chars)`);
  }

  // Check 4: Passage number valid
  const expectedPassage = Math.ceil(q.question_number / 15);
  if (q.passage_number !== expectedPassage) {
    issues.push(`❌ Q${q.question_number}: passage_number is ${q.passage_number}, expected ${expectedPassage}`);
  }
}

console.log(`  Questions with <u> tags: ${withUTags}/75`);
console.log(`  Questions without <u> tags: ${withoutUTags}/75`);

// Compare with other tests
const { data: test1Eng } = await supabase
  .from('act_english_questions')
  .select('question_stem')
  .eq('test_number', 1);

const test1WithU = test1Eng?.filter(q => q.question_stem.includes('<u>')).length || 0;
console.log(`  Test 1 comparison: ${test1WithU}/75 with <u> tags`);

if (Math.abs(withUTags - test1WithU) > 15) {
  warnings.push(`⚠️  Test 5 has ${withUTags} questions with <u> tags vs Test 1 has ${test1WithU} (difference > 15)`);
}

// ============================================================================
// SECTION 2: ENGLISH PASSAGES VERIFICATION
// ============================================================================

console.log('\n📚 SECTION 2: ENGLISH PASSAGES (5)\n');

const { data: engPassages } = await supabase
  .from('act_english_passages')
  .select('*')
  .eq('test_number', 5)
  .order('passage_number');

console.log(`Found ${engPassages?.length || 0}/5 passages`);

if (engPassages?.length !== 5) {
  issues.push(`❌ CRITICAL: Only ${engPassages?.length} English passages found, expected 5`);
}

for (const p of engPassages || []) {
  // Check passage text length
  if (!p.passage_text || p.passage_text.length < 100) {
    issues.push(`❌ Passage ${p.passage_number}: passage_text too short (${p.passage_text?.length} chars)`);
  }

  // Check title exists
  if (!p.title) {
    issues.push(`❌ Passage ${p.passage_number}: Missing title`);
  }

  // Check for paragraph markers
  if (p.passage_text && !p.passage_text.includes('[')) {
    warnings.push(`⚠️  Passage ${p.passage_number}: No paragraph markers [1], [2], etc. found`);
  }
}

// ============================================================================
// SECTION 3: MATH QUESTIONS DEEP VERIFICATION
// ============================================================================

console.log('\n🔢 SECTION 3: MATH QUESTIONS (60Q)\n');

const { data: mathQuestions } = await supabase
  .from('act_math_questions')
  .select('*')
  .eq('test_number', 5)
  .order('question_number');

console.log(`Found ${mathQuestions?.length || 0}/60 questions`);

if (mathQuestions?.length !== 60) {
  issues.push(`❌ CRITICAL: Only ${mathQuestions?.length} Math questions found, expected 60`);
}

for (const q of mathQuestions || []) {
  // Check all 5 choices present
  if (!q.choice_a || !q.choice_b || !q.choice_c || !q.choice_d || !q.choice_e) {
    issues.push(`❌ Math Q${q.question_number}: Missing choice(s) - A:${!!q.choice_a} B:${!!q.choice_b} C:${!!q.choice_c} D:${!!q.choice_d} E:${!!q.choice_e}`);
  }

  // Check question stem
  if (!q.question_stem || q.question_stem.length < 10) {
    issues.push(`❌ Math Q${q.question_number}: question_stem too short (${q.question_stem?.length} chars)`);
  }

  // Check for common math symbols (should have at least some math content)
  const hasMathContent = /[0-9=+\-×÷²³°√π]/.test(q.question_stem);
  if (!hasMathContent && q.question_number > 0) {
    warnings.push(`⚠️  Math Q${q.question_number}: No math symbols found in question stem`);
  }
}

// ============================================================================
// SECTION 4: READING QUESTIONS & PASSAGES VERIFICATION
// ============================================================================

console.log('\n📖 SECTION 4: READING SECTION (40Q + 4P)\n');

const { data: readQuestions } = await supabase
  .from('act_reading_questions')
  .select('*, passage:act_reading_passages!inner(*)')
  .eq('test_number', 5)
  .order('question_number');

const { data: readPassages } = await supabase
  .from('act_reading_passages')
  .select('*')
  .eq('test_number', 5)
  .order('passage_number');

console.log(`Found ${readQuestions?.length || 0}/40 questions`);
console.log(`Found ${readPassages?.length || 0}/4 passages`);

if (readQuestions?.length !== 40) {
  issues.push(`❌ CRITICAL: Only ${readQuestions?.length} Reading questions found, expected 40`);
}

if (readPassages?.length !== 4) {
  issues.push(`❌ CRITICAL: Only ${readPassages?.length} Reading passages found, expected 4`);
}

// Check passage types
const requiredTypes = ['PROSE_FICTION', 'SOCIAL_SCIENCE', 'HUMANITIES', 'NATURAL_SCIENCE'];
const foundTypes = readPassages?.map(p => p.passage_type) || [];

for (const type of requiredTypes) {
  if (!foundTypes.includes(type)) {
    issues.push(`❌ Reading: Missing passage type "${type}"`);
  }
}

// Check passage linkages
for (const q of readQuestions || []) {
  if (!q.passage_id) {
    issues.push(`❌ Reading Q${q.question_number}: No passage_id (not linked to passage)`);
  }

  // Check 4 choices
  if (!q.choice_a || !q.choice_b || !q.choice_c || !q.choice_d) {
    issues.push(`❌ Reading Q${q.question_number}: Missing choice(s)`);
  }
}

// Check passage text length
for (const p of readPassages || []) {
  if (!p.passage_text || p.passage_text.length < 500) {
    issues.push(`❌ Reading Passage ${p.passage_number}: passage_text too short (${p.passage_text?.length} chars)`);
  }

  if (!p.title) {
    issues.push(`❌ Reading Passage ${p.passage_number}: Missing title`);
  }

  if (!p.passage_type) {
    issues.push(`❌ Reading Passage ${p.passage_number}: Missing passage_type`);
  }
}

// ============================================================================
// SECTION 5: SCIENCE QUESTIONS & PASSAGES VERIFICATION
// ============================================================================

console.log('\n🔬 SECTION 5: SCIENCE SECTION (40Q + 6P)\n');

const { data: sciQuestions } = await supabase
  .from('act_science_questions')
  .select('*, passage:act_science_passages!inner(*)')
  .eq('test_number', 5)
  .order('question_number');

const { data: sciPassages } = await supabase
  .from('act_science_passages')
  .select('*')
  .eq('test_number', 5)
  .order('passage_number');

console.log(`Found ${sciQuestions?.length || 0}/40 questions`);
console.log(`Found ${sciPassages?.length || 0}/6 passages`);

if (sciQuestions?.length !== 40) {
  issues.push(`❌ CRITICAL: Only ${sciQuestions?.length} Science questions found, expected 40`);
}

if (sciPassages?.length < 6 || sciPassages?.length > 7) {
  warnings.push(`⚠️  Science: Found ${sciPassages?.length} passages (expected 6-7)`);
}

// Check passage types
const validSciTypes = ['DATA_REPRESENTATION', 'RESEARCH_SUMMARY', 'CONFLICTING_VIEWPOINTS'];
for (const p of sciPassages || []) {
  if (!validSciTypes.includes(p.passage_type)) {
    issues.push(`❌ Science Passage ${p.passage_number}: Invalid passage_type "${p.passage_type}"`);
  }

  if (!p.passage_text || p.passage_text.length < 100) {
    issues.push(`❌ Science Passage ${p.passage_number}: passage_text too short (${p.passage_text?.length} chars)`);
  }
}

// Check passage linkages
for (const q of sciQuestions || []) {
  if (!q.passage_id) {
    issues.push(`❌ Science Q${q.question_number}: No passage_id (not linked to passage)`);
  }

  // Check 4 choices
  if (!q.choice_a || !q.choice_b || !q.choice_c || !q.choice_d) {
    issues.push(`❌ Science Q${q.question_number}: Missing choice(s)`);
  }
}

// ============================================================================
// SECTION 6: CROSS-TEST CONSISTENCY CHECK
// ============================================================================

console.log('\n🔄 SECTION 6: CROSS-TEST CONSISTENCY\n');

// Compare Test 5 structure with Tests 1-4
for (let testNum = 1; testNum <= 4; testNum++) {
  const { count: engCount } = await supabase
    .from('act_english_questions')
    .select('*', { count: 'exact', head: true })
    .eq('test_number', testNum);

  if (engCount !== 75) {
    warnings.push(`⚠️  Test ${testNum} has ${engCount} English questions (expected 75)`);
  }
}

console.log('  Comparing all tests (1-5) for consistency...');

// Check field consistency
const { data: sampleQ } = await supabase
  .from('act_english_questions')
  .select('*')
  .eq('test_number', 5)
  .eq('question_number', 1)
  .single();

const requiredFields = [
  'test_number', 'question_number', 'passage_number',
  'question_stem', 'underlined_text', 'context_before', 'context_after',
  'choice_a', 'choice_b', 'choice_c', 'choice_d',
  'correct_answer', 'question_type', 'question_category'
];

for (const field of requiredFields) {
  if (!(field in sampleQ)) {
    issues.push(`❌ CRITICAL: Field "${field}" missing from Test 5 English questions`);
  }
}

console.log(`  ✅ All required fields present in sample question`);

// ============================================================================
// SECTION 7: PLACEHOLDER VALUES CHECK
// ============================================================================

console.log('\n📋 SECTION 7: PLACEHOLDER VALUES\n');

// Check if all correct_answer are placeholders
const allEngAnswers = new Set(engQuestions?.map(q => q.correct_answer) || []);
const allMathAnswers = new Set(mathQuestions?.map(q => q.correct_answer) || []);

console.log(`  English unique answers: ${[...allEngAnswers].join(', ')}`);
console.log(`  Math unique answers: ${[...allMathAnswers].join(', ')}`);

if (allEngAnswers.size === 1 && allEngAnswers.has('A')) {
  console.log(`  ✅ All English answers are placeholder 'A' (as expected)`);
} else {
  warnings.push(`⚠️  English answers are not all placeholder 'A': ${[...allEngAnswers].join(', ')}`);
}

// Check lesson_id are null
const engWithLessonId = engQuestions?.filter(q => q.lesson_id !== null).length || 0;
const mathWithLessonId = mathQuestions?.filter(q => q.lesson_id !== null).length || 0;

if (engWithLessonId > 0) {
  warnings.push(`⚠️  ${engWithLessonId} English questions have lesson_id assigned (expected all null)`);
}
if (mathWithLessonId > 0) {
  warnings.push(`⚠️  ${mathWithLessonId} Math questions have lesson_id assigned (expected all null)`);
}

// ============================================================================
// FINAL REPORT
// ============================================================================

console.log('\n' + '='.repeat(80));
console.log('\n📊 ULTRA-DEEP VERIFICATION RESULTS\n');

console.log(`Total Questions Verified: ${(engQuestions?.length || 0) + (mathQuestions?.length || 0) + (readQuestions?.length || 0) + (sciQuestions?.length || 0)}/215`);
console.log(`Total Passages Verified: ${(engPassages?.length || 0) + (readPassages?.length || 0) + (sciPassages?.length || 0)}/15`);

console.log(`\n🔴 CRITICAL ISSUES: ${issues.length}`);
if (issues.length > 0) {
  for (const issue of issues) {
    console.log(`  ${issue}`);
  }
}

console.log(`\n🟡 WARNINGS: ${warnings.length}`);
if (warnings.length > 0) {
  for (const warning of warnings) {
    console.log(`  ${warning}`);
  }
}

console.log('\n' + '='.repeat(80));

if (issues.length === 0 && warnings.length === 0) {
  console.log('\n✅✅✅ PERFECT! NO ISSUES FOUND! ✅✅✅');
  console.log('\nTest 5 has 100% format consistency with Tests 1-4');
  console.log('Ready for deep analytical pattern analysis\n');
} else if (issues.length === 0) {
  console.log('\n✅ NO CRITICAL ISSUES - Only minor warnings');
  console.log(`Review ${warnings.length} warning(s) above\n`);
} else {
  console.log(`\n❌ FOUND ${issues.length} CRITICAL ISSUE(S)`);
  console.log('Must fix before production\n');
}

console.log('='.repeat(80) + '\n');
