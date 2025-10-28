#!/usr/bin/env node
import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '../../.env') });

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

console.log('🔍 DEEP COLUMN-BY-COLUMN AUDIT - ALL FIELDS\n');
console.log('='.repeat(120));

const issues = [];

// ==================== ENGLISH SECTION - DEEP DIVE ====================
console.log('\n📝 ENGLISH SECTION - DETAILED COLUMN AUDIT:\n');

for (const testNum of [1, 2, 3, 4]) {
  console.log(`\n━━━ TEST ${testNum} ENGLISH ━━━`);

  const {data: engQ} = await supabase
    .from('act_english_questions')
    .select('*')
    .eq('test_number', testNum)
    .order('question_number');

  // Check each column systematically
  let nullCounts = {
    question_stem: 0,
    underlined_text: 0,
    context_before: 0,
    context_after: 0,
    choice_a: 0,
    choice_b: 0,
    choice_c: 0,
    choice_d: 0,
    correct_answer: 0,
    passage_number: 0,
    question_type: 0,
    question_category: 0,
    lesson_id: 0
  };

  let emptyStrings = {
    question_stem: 0,
    underlined_text: 0,
    context_before: 0,
    context_after: 0
  };

  // Analyze question_stem format patterns
  let questionStemPatterns = {
    hasQuestionStem: 0,
    isNull: 0,
    isEmpty: 0,
    hasBrackets: 0,
    hasNumbers: 0,
    avgLength: 0
  };

  let totalStemLength = 0;

  for (const q of engQ) {
    // Check for nulls
    Object.keys(nullCounts).forEach(field => {
      if (q[field] === null || q[field] === undefined) {
        nullCounts[field]++;
      }
    });

    // Check for empty strings
    Object.keys(emptyStrings).forEach(field => {
      if (q[field] === '') {
        emptyStrings[field]++;
      }
    });

    // Analyze question_stem patterns
    if (q.question_stem === null || q.question_stem === undefined) {
      questionStemPatterns.isNull++;
    } else if (q.question_stem === '') {
      questionStemPatterns.isEmpty++;
    } else {
      questionStemPatterns.hasQuestionStem++;
      totalStemLength += q.question_stem.length;

      if (q.question_stem.includes('[')) questionStemPatterns.hasBrackets++;
      if (/\d/.test(q.question_stem)) questionStemPatterns.hasNumbers++;
    }

    // Check answer format
    if (!['A', 'B', 'C', 'D'].includes(q.correct_answer)) {
      issues.push(`❌ Test ${testNum} English Q${q.question_number}: Invalid answer "${q.correct_answer}"`);
    }
  }

  questionStemPatterns.avgLength = questionStemPatterns.hasQuestionStem > 0
    ? (totalStemLength / questionStemPatterns.hasQuestionStem).toFixed(1)
    : 0;

  // Report findings
  console.log(`  Total Questions: ${engQ.length}/75`);
  console.log(`\n  Column Null Counts:`);
  Object.entries(nullCounts).forEach(([field, count]) => {
    if (count > 0) {
      console.log(`    ❌ ${field}: ${count} nulls`);
      issues.push(`❌ Test ${testNum} English: ${count} questions with null ${field}`);
    } else {
      console.log(`    ✅ ${field}: 0 nulls`);
    }
  });

  console.log(`\n  Empty String Counts:`);
  Object.entries(emptyStrings).forEach(([field, count]) => {
    console.log(`    ${count > 0 ? '⚠️ ' : '✅'} ${field}: ${count} empty strings`);
  });

  console.log(`\n  Question Stem Analysis:`);
  console.log(`    Has question_stem: ${questionStemPatterns.hasQuestionStem}/75`);
  console.log(`    Is null: ${questionStemPatterns.isNull}`);
  console.log(`    Is empty string: ${questionStemPatterns.isEmpty}`);
  console.log(`    Contains brackets []: ${questionStemPatterns.hasBrackets}`);
  console.log(`    Contains numbers: ${questionStemPatterns.hasNumbers}`);
  console.log(`    Avg length: ${questionStemPatterns.avgLength} chars`);

  if (questionStemPatterns.hasQuestionStem > 0 && questionStemPatterns.hasQuestionStem < 75) {
    issues.push(`⚠️  Test ${testNum} English: Inconsistent question_stem usage (${questionStemPatterns.hasQuestionStem}/75 have stems)`);
  }

  // Sample 3 question_stems to show format
  console.log(`\n  Sample question_stems (Q1, Q25, Q50):`);
  [1, 25, 50].forEach(qNum => {
    const q = engQ.find(x => x.question_number === qNum);
    if (q) {
      const stem = q.question_stem || '(null)';
      const preview = stem.length > 80 ? stem.substring(0, 80) + '...' : stem;
      console.log(`    Q${qNum}: "${preview}"`);
    }
  });
}

// ==================== MATH SECTION - DEEP DIVE ====================
console.log('\n\n🔢 MATH SECTION - DETAILED COLUMN AUDIT:\n');

for (const testNum of [1, 2, 3, 4]) {
  console.log(`\n━━━ TEST ${testNum} MATH ━━━`);

  const {data: mathQ} = await supabase
    .from('act_math_questions')
    .select('*')
    .eq('test_number', testNum)
    .order('question_number');

  let nullCounts = {
    question_stem: 0,
    choice_a: 0,
    choice_b: 0,
    choice_c: 0,
    choice_d: 0,
    choice_e: 0,
    correct_answer: 0,
    question_type: 0,
    question_category: 0,
    lesson_id: 0
  };

  for (const q of mathQ) {
    Object.keys(nullCounts).forEach(field => {
      if (q[field] === null || q[field] === undefined) {
        nullCounts[field]++;
      }
    });
  }

  console.log(`  Total Questions: ${mathQ.length}/60`);
  console.log(`\n  Column Null Counts:`);
  Object.entries(nullCounts).forEach(([field, count]) => {
    if (count > 0) {
      console.log(`    ❌ ${field}: ${count} nulls`);
      issues.push(`❌ Test ${testNum} Math: ${count} questions with null ${field}`);
    } else {
      console.log(`    ✅ ${field}: 0 nulls`);
    }
  });
}

// ==================== READING SECTION - DEEP DIVE ====================
console.log('\n\n📚 READING SECTION - DETAILED COLUMN AUDIT:\n');

for (const testNum of [1, 2, 3, 4]) {
  console.log(`\n━━━ TEST ${testNum} READING ━━━`);

  const {data: readQ} = await supabase
    .from('act_reading_questions')
    .select('*')
    .eq('test_number', testNum)
    .order('question_number');

  let nullCounts = {
    question_stem: 0,
    passage_id: 0,
    choice_a: 0,
    choice_b: 0,
    choice_c: 0,
    choice_d: 0,
    correct_answer: 0,
    question_type: 0,
    question_category: 0,
    lesson_id: 0
  };

  for (const q of readQ) {
    Object.keys(nullCounts).forEach(field => {
      if (q[field] === null || q[field] === undefined) {
        nullCounts[field]++;
      }
    });
  }

  console.log(`  Total Questions: ${readQ.length}/40`);
  console.log(`\n  Column Null Counts:`);
  Object.entries(nullCounts).forEach(([field, count]) => {
    if (count > 0) {
      console.log(`    ❌ ${field}: ${count} nulls`);
      issues.push(`❌ Test ${testNum} Reading: ${count} questions with null ${field}`);
    } else {
      console.log(`    ✅ ${field}: 0 nulls`);
    }
  });

  // Check passages
  const {data: readP} = await supabase
    .from('act_reading_passages')
    .select('*')
    .eq('test_number', testNum)
    .order('passage_number');

  console.log(`\n  Passages: ${readP.length}/4`);
  readP.forEach(p => {
    const hasText = p.passage_text && p.passage_text.length > 100;
    const hasTitle = !!p.title;
    console.log(`    P${p.passage_number}: ${hasTitle ? '✅' : '❌'} Title, ${hasText ? '✅' : '❌'} Text (${p.passage_text?.length || 0} chars)`);

    if (!hasText) {
      issues.push(`❌ Test ${testNum} Reading P${p.passage_number}: Passage text too short (${p.passage_text?.length || 0} chars)`);
    }
  });
}

// ==================== SCIENCE SECTION - DEEP DIVE ====================
console.log('\n\n🔬 SCIENCE SECTION - DETAILED COLUMN AUDIT:\n');

for (const testNum of [1, 2, 3, 4]) {
  console.log(`\n━━━ TEST ${testNum} SCIENCE ━━━`);

  const {data: sciQ} = await supabase
    .from('act_science_questions')
    .select('*')
    .eq('test_number', testNum)
    .order('question_number');

  let nullCounts = {
    question_stem: 0,
    passage_id: 0,
    choice_a: 0,
    choice_b: 0,
    choice_c: 0,
    choice_d: 0,
    correct_answer: 0,
    question_type: 0,
    question_category: 0,
    lesson_id: 0
  };

  for (const q of sciQ) {
    Object.keys(nullCounts).forEach(field => {
      if (q[field] === null || q[field] === undefined) {
        nullCounts[field]++;
      }
    });
  }

  console.log(`  Total Questions: ${sciQ.length}/40`);
  console.log(`\n  Column Null Counts:`);
  Object.entries(nullCounts).forEach(([field, count]) => {
    if (count > 0) {
      console.log(`    ❌ ${field}: ${count} nulls`);
      issues.push(`❌ Test ${testNum} Science: ${count} questions with null ${field}`);
    } else {
      console.log(`    ✅ ${field}: 0 nulls`);
    }
  });

  // Check passages
  const {data: sciP} = await supabase
    .from('act_science_passages')
    .select('*')
    .eq('test_number', testNum)
    .order('passage_number');

  console.log(`\n  Passages: ${sciP.length}`);
  sciP.forEach(p => {
    const hasText = p.passage_text && p.passage_text.length > 50;
    const hasTitle = !!p.title;
    console.log(`    P${p.passage_number}: ${hasTitle ? '✅' : '❌'} Title, ${hasText ? '✅' : '❌'} Text (${p.passage_text?.length || 0} chars)`);

    if (!hasText) {
      issues.push(`❌ Test ${testNum} Science P${p.passage_number}: Passage text too short (${p.passage_text?.length || 0} chars)`);
    }
  });
}

// ==================== SUMMARY ====================
console.log('\n\n' + '='.repeat(120));
console.log('\n📊 DEEP AUDIT SUMMARY:\n');

if (issues.length === 0) {
  console.log('✅✅✅ ALL COLUMNS FULLY POPULATED - NO ISSUES FOUND! ✅✅✅\n');
} else {
  console.log(`🔴 ISSUES FOUND: ${issues.length}\n`);
  issues.forEach(issue => console.log(issue));
}

console.log('\n' + '='.repeat(120) + '\n');
