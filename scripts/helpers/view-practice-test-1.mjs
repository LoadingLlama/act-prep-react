#!/usr/bin/env node

/**
 * HELPER SCRIPT: View Complete Practice Test 1
 * Makes it easy to see all Test 1 data in one place
 * WITHOUT changing database structure
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.REACT_APP_SUPABASE_ANON_KEY
);

async function viewTest1() {
  console.log('\n' + '='.repeat(90));
  console.log('📚 COMPLETE PRACTICE TEST 1 - UNIFIED VIEW');
  console.log('='.repeat(90) + '\n');

  // English
  const { data: engPassages } = await supabase
    .from('practice_test_english_passages')
    .select('*')
    .eq('test_number', 1)
    .order('passage_number');

  const { data: engQuestions } = await supabase
    .from('practice_test_english_questions')
    .select('*')
    .eq('test_number', 1)
    .order('question_number');

  console.log('📝 ENGLISH SECTION:\n');
  console.log(`   Passages: ${engPassages.length}`);
  console.log(`   Questions: ${engQuestions.length}/50`);
  engPassages.forEach(p => {
    const qCount = engQuestions.filter(q => q.passage_id === p.id).length;
    console.log(`   • Passage ${p.passage_number}: "${p.passage_title}" (${p.word_count} words, ${qCount} questions)`);
  });

  // Math
  const { data: mathQuestions } = await supabase
    .from('practice_test_math_questions')
    .select('*')
    .eq('test_number', 1)
    .order('question_number');

  const mathTopics = {};
  mathQuestions.forEach(q => {
    mathTopics[q.question_type] = (mathTopics[q.question_type] || 0) + 1;
  });

  console.log('\n🔢 MATH SECTION:\n');
  console.log(`   Questions: ${mathQuestions.length}/45`);
  Object.entries(mathTopics).forEach(([topic, count]) => {
    console.log(`   • ${topic}: ${count} questions`);
  });

  // Reading
  const { data: readPassages } = await supabase
    .from('practice_test_reading_passages')
    .select('*')
    .eq('test_number', 1)
    .order('passage_number');

  const { data: readQuestions } = await supabase
    .from('practice_test_reading_questions')
    .select('*')
    .eq('test_number', 1)
    .order('question_number');

  console.log('\n📖 READING SECTION:\n');
  console.log(`   Passages: ${readPassages.length}`);
  console.log(`   Questions: ${readQuestions.length}/36`);
  readPassages.forEach(p => {
    const qCount = readQuestions.filter(q => q.passage_id === p.id).length;
    console.log(`   • Passage ${p.passage_number}: "${p.passage_title}" (${p.word_count} words, ${qCount} questions)`);
  });

  // Science
  const { data: sciPassages } = await supabase
    .from('practice_test_science_passages')
    .select('*')
    .eq('test_number', 1)
    .order('passage_number');

  const { data: sciQuestions } = await supabase
    .from('practice_test_science_questions')
    .select('*')
    .eq('test_number', 1)
    .order('question_number');

  console.log('\n🔬 SCIENCE SECTION:\n');
  console.log(`   Passages: ${sciPassages.length}`);
  console.log(`   Questions: ${sciQuestions.length}/40`);
  sciPassages.forEach(p => {
    const qCount = sciQuestions.filter(q => q.passage_id === p.id).length;
    console.log(`   • Passage ${p.passage_number}: "${p.passage_title}" (${p.passage_type}, ${qCount} questions)`);
  });

  // Summary
  const totalPassages = engPassages.length + readPassages.length + sciPassages.length;
  const totalQuestions = engQuestions.length + mathQuestions.length + readQuestions.length + sciQuestions.length;

  console.log('\n' + '='.repeat(90));
  console.log('📊 SUMMARY:\n');
  console.log(`   Total Passages: ${totalPassages}`);
  console.log(`   Total Questions: ${totalQuestions}/171`);
  console.log(`   Completion: ${(totalQuestions/171*100).toFixed(1)}%`);
  console.log('\n' + '='.repeat(90) + '\n');

  console.log('💡 This view combines data from 7 tables:');
  console.log('   • practice_test_english_questions + practice_test_english_passages');
  console.log('   • practice_test_math_questions');
  console.log('   • practice_test_reading_questions + practice_test_reading_passages');
  console.log('   • practice_test_science_questions + practice_test_science_passages\n');

  console.log('The service layer (practiceTests.service.js) handles these queries automatically.');
  console.log('This unified view is just for easier data management!\n');
}

viewTest1();
