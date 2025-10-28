#!/usr/bin/env node
/**
 * MANUAL REVIEW OF PRACTICE TEST 1
 * Check if answer choices are actually filled in, not just placeholder
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.REACT_APP_SUPABASE_ANON_KEY
);

console.log('🔍 MANUAL REVIEW: PRACTICE TEST 1 - ANSWER CHOICES\n');
console.log('='.repeat(90) + '\n');

async function reviewTest1() {
  const issues = [];

  // Check English questions
  console.log('📝 ENGLISH SECTION REVIEW:\n');
  const { data: engQuestions } = await supabase
    .from('practice_test_english_questions')
    .select('*')
    .eq('test_number', 1)
    .order('question_number');

  engQuestions.forEach(q => {
    const choices = JSON.parse(q.choices);
    console.log(`Q${q.question_number}: ${q.question_text.substring(0, 50)}...`);
    console.log(`   Choices: ${choices.join(' | ')}`);
    console.log(`   Correct: ${choices[q.correct_answer]}`);
    console.log(`   Difficulty: ${q.difficulty}, Type: ${q.question_type}\n`);
    
    // Check for placeholder text
    if (choices.some(c => c.includes('Option ') || c.includes('Choice '))) {
      issues.push(`English Q${q.question_number}: Contains placeholder choices`);
    }
  });

  // Check Math questions
  console.log('\n\n🔢 MATH SECTION REVIEW:\n');
  const { data: mathQuestions } = await supabase
    .from('practice_test_math_questions')
    .select('*')
    .eq('test_number', 1)
    .order('question_number');

  mathQuestions.slice(0, 10).forEach(q => {
    const choices = JSON.parse(q.choices);
    console.log(`Q${q.question_number}: ${q.question_text.substring(0, 60)}...`);
    console.log(`   Choices: ${choices.join(' | ')}`);
    console.log(`   Correct: ${choices[q.correct_answer]}`);
    console.log(`   Difficulty: ${q.difficulty}, Type: ${q.question_type}\n`);
  });

  console.log(`\n...[Showing first 10 math questions, ${mathQuestions.length} total]\n`);

  // Check Reading questions
  console.log('\n\n📖 READING SECTION REVIEW:\n');
  const { data: readQuestions } = await supabase
    .from('practice_test_reading_questions')
    .select('*')
    .eq('test_number', 1)
    .order('question_number');

  readQuestions.slice(0, 5).forEach(q => {
    const choices = JSON.parse(q.choices);
    console.log(`Q${q.question_number}: ${q.question_text.substring(0, 60)}...`);
    console.log(`   Choices:`);
    choices.forEach((c, i) => console.log(`      ${String.fromCharCode(65 + i)}. ${c}`));
    console.log(`   Correct: ${choices[q.correct_answer]}\n`);
  });

  console.log(`\n...[Showing first 5 reading questions, ${readQuestions.length} total]\n`);

  // Check Science questions
  console.log('\n\n🔬 SCIENCE SECTION REVIEW:\n');
  const { data: sciQuestions } = await supabase
    .from('practice_test_science_questions')
    .select('*')
    .eq('test_number', 1)
    .order('question_number');

  sciQuestions.slice(0, 5).forEach(q => {
    const choices = JSON.parse(q.choices);
    console.log(`Q${q.question_number}: ${q.question_text.substring(0, 60)}...`);
    console.log(`   Choices: ${choices.join(' | ')}`);
    console.log(`   Correct: ${choices[q.correct_answer]}\n`);
  });

  console.log(`\n...[Showing first 5 science questions, ${sciQuestions.length} total]\n`);

  // Summary
  console.log('\n' + '='.repeat(90));
  console.log('📊 REVIEW SUMMARY:\n');
  console.log(`English: ${engQuestions.length}/50 questions`);
  console.log(`Math: ${mathQuestions.length}/45 questions`);
  console.log(`Reading: ${readQuestions.length}/36 questions`);
  console.log(`Science: ${sciQuestions.length}/40 questions`);
  
  if (issues.length > 0) {
    console.log('\n⚠️  ISSUES FOUND:\n');
    issues.forEach(issue => console.log(`   - ${issue}`));
  } else {
    console.log('\n✅ No placeholder text found in reviewed questions');
  }
}

reviewTest1().catch(console.error);
