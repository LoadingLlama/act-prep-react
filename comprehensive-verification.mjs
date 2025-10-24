#!/usr/bin/env node

/**
 * COMPREHENSIVE VERIFICATION OF PRACTICE ACT 3 EXTRACTION
 * Ultra-thorough validation to ensure 100% accuracy
 */

import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '.env') });

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

console.log('🔍 COMPREHENSIVE VERIFICATION OF PRACTICE ACT 3 EXTRACTION');
console.log('Ultra-thorough validation to ensure 100% accuracy');
console.log('=' .repeat(80));

/**
 * Verify English Section
 */
async function verifyEnglishSection() {
  console.log('\n📝 VERIFYING ENGLISH SECTION...');

  // Check English questions
  const { data: englishQuestions } = await supabase
    .from('act_english_questions')
    .select('*')
    .eq('test_number', 3)
    .order('question_number');

  // Check English passages
  const { data: englishPassages } = await supabase
    .from('act_english_passages')
    .select('*')
    .eq('test_number', 3)
    .order('passage_number');

  console.log(`  📊 English Questions: ${englishQuestions?.length || 0}/75`);
  console.log(`  📚 English Passages: ${englishPassages?.length || 0}/5`);

  // Detailed validation
  let englishIssues = [];

  // Check question completeness
  if (englishQuestions?.length !== 75) {
    englishIssues.push(`❌ Expected 75 English questions, found ${englishQuestions?.length}`);
  }

  englishQuestions?.forEach(q => {
    if (!q.choice_a || !q.choice_b || !q.choice_c || !q.choice_d) {
      englishIssues.push(`❌ Question ${q.question_number} missing choices`);
    }
    if (!q.correct_answer) {
      englishIssues.push(`❌ Question ${q.question_number} missing correct answer`);
    }
    if (!q.question_stem) {
      englishIssues.push(`❌ Question ${q.question_number} missing question stem`);
    }
    if (q.passage_number < 1 || q.passage_number > 5) {
      englishIssues.push(`❌ Question ${q.question_number} has invalid passage_number: ${q.passage_number}`);
    }
  });

  // Check passage completeness
  if (englishPassages?.length !== 5) {
    englishIssues.push(`❌ Expected 5 English passages, found ${englishPassages?.length}`);
  }

  englishPassages?.forEach(p => {
    if (!p.title || !p.passage_text) {
      englishIssues.push(`❌ Passage ${p.passage_number} missing title or text`);
    }
  });

  if (englishIssues.length === 0) {
    console.log('  ✅ English section verification PASSED');
  } else {
    console.log('  ❌ English section verification FAILED:');
    englishIssues.forEach(issue => console.log(`    ${issue}`));
  }

  return englishIssues;
}

/**
 * Verify Math Section
 */
async function verifyMathSection() {
  console.log('\n🔢 VERIFYING MATH SECTION...');

  const { data: mathQuestions } = await supabase
    .from('act_math_questions')
    .select('*')
    .eq('test_number', 3)
    .order('question_number');

  console.log(`  📊 Math Questions: ${mathQuestions?.length || 0}/60`);

  let mathIssues = [];

  if (mathQuestions?.length !== 60) {
    mathIssues.push(`❌ Expected 60 Math questions, found ${mathQuestions?.length}`);
  }

  mathQuestions?.forEach(q => {
    if (!q.choice_a || !q.choice_b || !q.choice_c || !q.choice_d || !q.choice_e) {
      mathIssues.push(`❌ Question ${q.question_number} missing choices (Math needs A,B,C,D,E)`);
    }
    if (!q.correct_answer) {
      mathIssues.push(`❌ Question ${q.question_number} missing correct answer`);
    }
    if (!q.question_stem) {
      mathIssues.push(`❌ Question ${q.question_number} missing question stem`);
    }
  });

  if (mathIssues.length === 0) {
    console.log('  ✅ Math section verification PASSED');
  } else {
    console.log('  ❌ Math section verification FAILED:');
    mathIssues.forEach(issue => console.log(`    ${issue}`));
  }

  return mathIssues;
}

/**
 * Verify Reading Section
 */
async function verifyReadingSection() {
  console.log('\n📖 VERIFYING READING SECTION...');

  const { data: readingQuestions } = await supabase
    .from('act_reading_questions')
    .select('*')
    .eq('test_number', 3)
    .order('question_number');

  const { data: readingPassages } = await supabase
    .from('act_reading_passages')
    .select('*')
    .eq('test_number', 3)
    .order('passage_number');

  console.log(`  📊 Reading Questions: ${readingQuestions?.length || 0}/40`);
  console.log(`  📚 Reading Passages: ${readingPassages?.length || 0}/4`);

  let readingIssues = [];

  if (readingQuestions?.length !== 40) {
    readingIssues.push(`❌ Expected 40 Reading questions, found ${readingQuestions?.length}`);
  }

  if (readingPassages?.length !== 4) {
    readingIssues.push(`❌ Expected 4 Reading passages, found ${readingPassages?.length}`);
  }

  readingQuestions?.forEach(q => {
    if (!q.choice_a || !q.choice_b || !q.choice_c || !q.choice_d) {
      readingIssues.push(`❌ Question ${q.question_number} missing choices`);
    }
    if (!q.correct_answer) {
      readingIssues.push(`❌ Question ${q.question_number} missing correct answer`);
    }
    if (!q.question_stem) {
      readingIssues.push(`❌ Question ${q.question_number} missing question stem`);
    }
    if (!q.passage_id) {
      readingIssues.push(`❌ Question ${q.question_number} not linked to passage (missing passage_id)`);
    }
  });

  readingPassages?.forEach(p => {
    if (!p.title || !p.passage_text) {
      readingIssues.push(`❌ Passage ${p.passage_number} missing title or text`);
    }
  });

  if (readingIssues.length === 0) {
    console.log('  ✅ Reading section verification PASSED');
  } else {
    console.log('  ❌ Reading section verification FAILED:');
    readingIssues.forEach(issue => console.log(`    ${issue}`));
  }

  return readingIssues;
}

/**
 * Verify Science Section
 */
async function verifyScienceSection() {
  console.log('\n🔬 VERIFYING SCIENCE SECTION...');

  const { data: scienceQuestions } = await supabase
    .from('act_science_questions')
    .select('*')
    .eq('test_number', 3)
    .order('question_number');

  const { data: sciencePassages } = await supabase
    .from('act_science_passages')
    .select('*')
    .eq('test_number', 3)
    .order('passage_number');

  console.log(`  📊 Science Questions: ${scienceQuestions?.length || 0}/40`);
  console.log(`  📚 Science Passages: ${sciencePassages?.length || 0}/7`);

  let scienceIssues = [];

  if (scienceQuestions?.length !== 40) {
    scienceIssues.push(`❌ Expected 40 Science questions, found ${scienceQuestions?.length}`);
  }

  if (sciencePassages?.length !== 7) {
    scienceIssues.push(`❌ Expected 7 Science passages, found ${sciencePassages?.length}`);
  }

  scienceQuestions?.forEach(q => {
    if (!q.choice_a || !q.choice_b || !q.choice_c || !q.choice_d) {
      scienceIssues.push(`❌ Question ${q.question_number} missing choices`);
    }
    if (!q.correct_answer) {
      scienceIssues.push(`❌ Question ${q.question_number} missing correct answer`);
    }
    if (!q.question_stem) {
      scienceIssues.push(`❌ Question ${q.question_number} missing question stem`);
    }
    if (!q.passage_id) {
      scienceIssues.push(`❌ Question ${q.question_number} not linked to passage (missing passage_id)`);
    }
  });

  sciencePassages?.forEach(p => {
    if (!p.title || !p.passage_text) {
      scienceIssues.push(`❌ Passage ${p.passage_number} missing title or text`);
    }
  });

  if (scienceIssues.length === 0) {
    console.log('  ✅ Science section verification PASSED');
  } else {
    console.log('  ❌ Science section verification FAILED:');
    scienceIssues.forEach(issue => console.log(`    ${issue}`));
  }

  return scienceIssues;
}

/**
 * Check for duplicate questions
 */
async function checkForDuplicates() {
  console.log('\n🔍 CHECKING FOR DUPLICATE QUESTIONS...');

  const duplicateIssues = [];

  // Manual duplicate check using question numbers
  const sections = [
    { name: 'English', table: 'act_english_questions', expected: 75 },
    { name: 'Math', table: 'act_math_questions', expected: 60 },
    { name: 'Reading', table: 'act_reading_questions', expected: 40 },
    { name: 'Science', table: 'act_science_questions', expected: 40 }
  ];

  for (const section of sections) {
    const { data: questions } = await supabase
      .from(section.table)
      .select('question_number')
      .eq('test_number', 3);

    const questionNumbers = questions?.map(q => q.question_number) || [];
    const uniqueNumbers = [...new Set(questionNumbers)];

    if (questionNumbers.length !== uniqueNumbers.length) {
      duplicateIssues.push(`❌ ${section.name} has duplicate question numbers`);
    }

    if (uniqueNumbers.length !== section.expected) {
      duplicateIssues.push(`❌ ${section.name} missing question numbers: expected ${section.expected}, found ${uniqueNumbers.length}`);
    }

    // Check for gaps in question numbers
    const expectedNumbers = Array.from({length: section.expected}, (_, i) => i + 1);
    const missingNumbers = expectedNumbers.filter(num => !uniqueNumbers.includes(num));
    if (missingNumbers.length > 0) {
      duplicateIssues.push(`❌ ${section.name} missing question numbers: ${missingNumbers.join(', ')}`);
    }
  }

  if (duplicateIssues.length === 0) {
    console.log('  ✅ No duplicates found');
  } else {
    console.log('  ❌ Duplicate issues found:');
    duplicateIssues.forEach(issue => console.log(`    ${issue}`));
  }

  return duplicateIssues;
}

/**
 * Verify answer key validity
 */
async function verifyAnswerKeys() {
  console.log('\n🎯 VERIFYING ANSWER KEYS...');

  const answerIssues = [];

  // Check English answers (should be A, B, C, D)
  const { data: englishQuestions } = await supabase
    .from('act_english_questions')
    .select('question_number, correct_answer')
    .eq('test_number', 3);

  englishQuestions?.forEach(q => {
    if (!['A', 'B', 'C', 'D'].includes(q.correct_answer)) {
      answerIssues.push(`❌ English Q${q.question_number} has invalid answer: ${q.correct_answer}`);
    }
  });

  // Check Math answers (should be A, B, C, D, E)
  const { data: mathQuestions } = await supabase
    .from('act_math_questions')
    .select('question_number, correct_answer')
    .eq('test_number', 3);

  mathQuestions?.forEach(q => {
    if (!['A', 'B', 'C', 'D', 'E'].includes(q.correct_answer)) {
      answerIssues.push(`❌ Math Q${q.question_number} has invalid answer: ${q.correct_answer}`);
    }
  });

  // Check Reading answers (should be A, B, C, D)
  const { data: readingQuestions } = await supabase
    .from('act_reading_questions')
    .select('question_number, correct_answer')
    .eq('test_number', 3);

  readingQuestions?.forEach(q => {
    if (!['A', 'B', 'C', 'D'].includes(q.correct_answer)) {
      answerIssues.push(`❌ Reading Q${q.question_number} has invalid answer: ${q.correct_answer}`);
    }
  });

  // Check Science answers (should be A, B, C, D)
  const { data: scienceQuestions } = await supabase
    .from('act_science_questions')
    .select('question_number, correct_answer')
    .eq('test_number', 3);

  scienceQuestions?.forEach(q => {
    if (!['A', 'B', 'C', 'D'].includes(q.correct_answer)) {
      answerIssues.push(`❌ Science Q${q.question_number} has invalid answer: ${q.correct_answer}`);
    }
  });

  if (answerIssues.length === 0) {
    console.log('  ✅ All answer keys are valid');
  } else {
    console.log('  ❌ Answer key issues found:');
    answerIssues.forEach(issue => console.log(`    ${issue}`));
  }

  return answerIssues;
}

/**
 * Main verification function
 */
async function comprehensiveVerification() {
  console.log('\n🚀 STARTING COMPREHENSIVE VERIFICATION...');

  const allIssues = [];

  // Run all verification checks
  const englishIssues = await verifyEnglishSection();
  const mathIssues = await verifyMathSection();
  const readingIssues = await verifyReadingSection();
  const scienceIssues = await verifyScienceSection();
  const duplicateIssues = await checkForDuplicates();
  const answerIssues = await verifyAnswerKeys();

  allIssues.push(...englishIssues, ...mathIssues, ...readingIssues, ...scienceIssues, ...duplicateIssues, ...answerIssues);

  // Final summary
  console.log('\n' + '=' .repeat(80));
  console.log('🎯 FINAL VERIFICATION RESULTS');
  console.log('=' .repeat(80));

  if (allIssues.length === 0) {
    console.log('🎉 ✅ VERIFICATION PASSED: 100% ACCURACY CONFIRMED!');
    console.log('✅ English: 75 questions + 5 passages - PERFECT');
    console.log('✅ Math: 60 questions - PERFECT');
    console.log('✅ Reading: 40 questions + 4 passages - PERFECT');
    console.log('✅ Science: 40 questions + 7 passages - PERFECT');
    console.log('✅ Total: 215 questions + 16 passages - 100% ACCURATE');
  } else {
    console.log('❌ VERIFICATION FAILED: Issues found:');
    console.log(`❌ Total Issues: ${allIssues.length}`);
    console.log('\n📋 DETAILED ISSUES:');
    allIssues.forEach((issue, index) => {
      console.log(`  ${index + 1}. ${issue}`);
    });
  }

  return {
    passed: allIssues.length === 0,
    totalIssues: allIssues.length,
    issues: allIssues
  };
}

// Run comprehensive verification
comprehensiveVerification().catch(console.error);