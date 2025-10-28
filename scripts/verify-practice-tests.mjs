#!/usr/bin/env node
/**
 * COMPREHENSIVE VERIFICATION OF PRACTICE TESTS
 * Checks for bugs, data integrity, and format issues
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

console.log('🔍 COMPREHENSIVE VERIFICATION - PRACTICE TESTS\n');
console.log('='.repeat(80) + '\n');

async function verifyTest(testNumber) {
  console.log(`\n📋 TEST ${testNumber} VERIFICATION:\n`);

  const issues = [];

  // 1. Check English Questions & Passages
  const { data: engQuestions } = await supabase
    .from('practice_test_english_questions')
    .select('*')
    .eq('test_number', testNumber)
    .order('question_number');

  const { data: engPassages } = await supabase
    .from('practice_test_english_passages')
    .select('*')
    .eq('test_number', testNumber)
    .order('passage_number');

  console.log(`English: ${engQuestions?.length || 0} questions, ${engPassages?.length || 0} passages`);

  if (engQuestions && engQuestions.length > 0) {
    // Check for null/undefined values
    const nullQuestionText = engQuestions.filter(q => !q.question_text);
    const nullChoices = engQuestions.filter(q => !q.choices);
    const nullPassageId = engQuestions.filter(q => !q.passage_id);

    if (nullQuestionText.length > 0) issues.push(`  ❌ ${nullQuestionText.length} English questions missing question_text`);
    if (nullChoices.length > 0) issues.push(`  ❌ ${nullChoices.length} English questions missing choices`);
    if (nullPassageId.length > 0) issues.push(`  ❌ ${nullPassageId.length} English questions missing passage_id`);

    // Check choices format
    const sample = engQuestions[0];
    try {
      const choices = JSON.parse(sample.choices);
      if (!Array.isArray(choices)) issues.push(`  ❌ English choices not an array`);
      if (choices.length !== 4) issues.push(`  ❌ English has ${choices.length} choices (should be 4)`);
      console.log(`  Sample choices: ${choices[0].substring(0, 30)}...`);
    } catch (e) {
      issues.push(`  ❌ English choices JSON parse error: ${e.message}`);
    }

    // Check correct_answer is valid index
    const invalidAnswers = engQuestions.filter(q => q.correct_answer < 0 || q.correct_answer > 3);
    if (invalidAnswers.length > 0) issues.push(`  ❌ ${invalidAnswers.length} English questions have invalid correct_answer`);
  }

  if (engPassages && engPassages.length > 0) {
    const nullText = engPassages.filter(p => !p.passage_text);
    if (nullText.length > 0) issues.push(`  ❌ ${nullText.length} English passages missing passage_text`);

    // Check word counts
    engPassages.forEach(p => {
      const actualWords = p.passage_text?.split(/\s+/).filter(w => w.length > 0).length || 0;
      if (Math.abs(actualWords - (p.word_count || 0)) > 5) {
        issues.push(`  ⚠️  English Passage ${p.passage_number}: word_count mismatch (${p.word_count} stored, ${actualWords} actual)`);
      }
    });
  }

  // 2. Check Math Questions
  const { data: mathQuestions } = await supabase
    .from('practice_test_math_questions')
    .select('*')
    .eq('test_number', testNumber)
    .order('question_number');

  console.log(`Math: ${mathQuestions?.length || 0} questions`);

  if (mathQuestions && mathQuestions.length > 0) {
    const nullQuestionText = mathQuestions.filter(q => !q.question_text);
    const nullChoices = mathQuestions.filter(q => !q.choices);

    if (nullQuestionText.length > 0) issues.push(`  ❌ ${nullQuestionText.length} Math questions missing question_text`);
    if (nullChoices.length > 0) issues.push(`  ❌ ${nullChoices.length} Math questions missing choices`);

    // Check choices format (should have 5 choices A-E)
    const sample = mathQuestions[0];
    try {
      const choices = JSON.parse(sample.choices);
      if (choices.length !== 5) issues.push(`  ❌ Math has ${choices.length} choices (should be 5)`);
    } catch (e) {
      issues.push(`  ❌ Math choices JSON parse error: ${e.message}`);
    }

    const invalidAnswers = mathQuestions.filter(q => q.correct_answer < 0 || q.correct_answer > 4);
    if (invalidAnswers.length > 0) issues.push(`  ❌ ${invalidAnswers.length} Math questions have invalid correct_answer`);
  }

  // 3. Check Reading Questions & Passages
  const { data: readQuestions } = await supabase
    .from('practice_test_reading_questions')
    .select('*')
    .eq('test_number', testNumber)
    .order('question_number');

  const { data: readPassages } = await supabase
    .from('practice_test_reading_passages')
    .select('*')
    .eq('test_number', testNumber)
    .order('passage_number');

  console.log(`Reading: ${readQuestions?.length || 0} questions, ${readPassages?.length || 0} passages`);

  if (readQuestions && readQuestions.length > 0) {
    const nullPassageId = readQuestions.filter(q => !q.passage_id);
    if (nullPassageId.length > 0) issues.push(`  ❌ ${nullPassageId.length} Reading questions missing passage_id`);

    const invalidAnswers = readQuestions.filter(q => q.correct_answer < 0 || q.correct_answer > 3);
    if (invalidAnswers.length > 0) issues.push(`  ❌ ${invalidAnswers.length} Reading questions have invalid correct_answer`);
  }

  if (readPassages && readPassages.length > 0) {
    const nullText = readPassages.filter(p => !p.passage_text);
    if (nullText.length > 0) issues.push(`  ❌ ${nullText.length} Reading passages missing passage_text`);

    // Check passage types
    const invalidTypes = readPassages.filter(p => !p.passage_type);
    if (invalidTypes.length > 0) issues.push(`  ❌ ${invalidTypes.length} Reading passages missing passage_type`);

    // Check word counts are reasonable (should be 400-700 words)
    readPassages.forEach(p => {
      const actualWords = p.passage_text?.split(/\s+/).filter(w => w.length > 0).length || 0;
      if (actualWords < 300) issues.push(`  ⚠️  Reading Passage ${p.passage_number}: too short (${actualWords} words)`);
      if (actualWords > 800) issues.push(`  ⚠️  Reading Passage ${p.passage_number}: too long (${actualWords} words)`);
    });
  }

  // 4. Check Science Questions & Passages
  const { data: sciQuestions } = await supabase
    .from('practice_test_science_questions')
    .select('*')
    .eq('test_number', testNumber)
    .order('question_number');

  const { data: sciPassages } = await supabase
    .from('practice_test_science_passages')
    .select('*')
    .eq('test_number', testNumber)
    .order('passage_number');

  console.log(`Science: ${sciQuestions?.length || 0} questions, ${sciPassages?.length || 0} passages`);

  if (sciQuestions && sciQuestions.length > 0) {
    const nullPassageId = sciQuestions.filter(q => !q.passage_id);
    if (nullPassageId.length > 0) issues.push(`  ❌ ${nullPassageId.length} Science questions missing passage_id`);

    const invalidAnswers = sciQuestions.filter(q => q.correct_answer < 0 || q.correct_answer > 3);
    if (invalidAnswers.length > 0) issues.push(`  ❌ ${invalidAnswers.length} Science questions have invalid correct_answer`);
  }

  if (sciPassages && sciPassages.length > 0) {
    const nullType = sciPassages.filter(p => !p.passage_type);
    if (nullType.length > 0) issues.push(`  ❌ ${nullType.length} Science passages missing passage_type`);
  }

  // Print results
  if (issues.length === 0) {
    console.log(`\n✅ TEST ${testNumber}: ALL CHECKS PASSED!`);
  } else {
    console.log(`\n❌ TEST ${testNumber}: ${issues.length} ISSUES FOUND:`);
    issues.forEach(issue => console.log(issue));
  }

  return issues.length;
}

async function verifyAll() {
  let totalIssues = 0;

  for (let testNum = 1; testNum <= 7; testNum++) {
    const issues = await verifyTest(testNum);
    totalIssues += issues;
  }

  console.log('\n' + '='.repeat(80));
  if (totalIssues === 0) {
    console.log('\n🎉 ALL TESTS VERIFIED - NO ISSUES FOUND!\n');
  } else {
    console.log(`\n⚠️  TOTAL ISSUES FOUND: ${totalIssues}\n`);
  }
}

verifyAll().catch(console.error);
