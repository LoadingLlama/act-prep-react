#!/usr/bin/env node

/**
 * VERIFY PRACTICE TEST 4 COMPLETE
 * Comprehensive verification that all sections are properly uploaded
 */

import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '.env') });

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

console.log('🏆 COMPREHENSIVE PRACTICE TEST 4 VERIFICATION');
console.log('Ultra-thorough verification of all sections and data integrity');
console.log('='.repeat(80));

async function verifyEnglishSection(testNumber) {
  console.log('\n📝 ENGLISH SECTION VERIFICATION:');

  // Check passages
  const { data: passages } = await supabase
    .from('act_english_passages')
    .select('*')
    .eq('test_number', testNumber)
    .order('passage_number');

  console.log(`  📖 Passages: ${passages?.length || 0}/5`);
  if (passages) {
    passages.forEach(p => console.log(`    • Passage ${p.passage_number}: "${p.title}"`));
  }

  // Check questions
  const { data: questions } = await supabase
    .from('act_english_questions')
    .select('question_number, passage_number, question_type, correct_answer')
    .eq('test_number', testNumber)
    .order('question_number');

  console.log(`  ❓ Questions: ${questions?.length || 0}/75`);
  if (questions && questions.length > 0) {
    console.log(`    • Range: Q${questions[0].question_number}-Q${questions[questions.length - 1].question_number}`);

    // Check distribution by passage
    const passageDistribution = {};
    questions.forEach(q => {
      passageDistribution[q.passage_number] = (passageDistribution[q.passage_number] || 0) + 1;
    });
    console.log('    • Questions per passage:', passageDistribution);
  }

  const englishComplete = (passages?.length === 5) && (questions?.length === 75);
  console.log(`  🎯 Status: ${englishComplete ? '✅ COMPLETE' : '❌ INCOMPLETE'}`);
  return { passages: passages?.length || 0, questions: questions?.length || 0, complete: englishComplete };
}

async function verifyMathSection(testNumber) {
  console.log('\n🔢 MATH SECTION VERIFICATION:');

  const { data: questions } = await supabase
    .from('act_math_questions')
    .select('question_number, question_type, correct_answer, has_figure')
    .eq('test_number', testNumber)
    .order('question_number');

  console.log(`  ❓ Questions: ${questions?.length || 0}/60`);
  if (questions && questions.length > 0) {
    console.log(`    • Range: Q${questions[0].question_number}-Q${questions[questions.length - 1].question_number}`);

    // Check question types
    const typeDistribution = {};
    questions.forEach(q => {
      typeDistribution[q.question_type] = (typeDistribution[q.question_type] || 0) + 1;
    });
    console.log('    • Question types:', typeDistribution);

    const withFigures = questions.filter(q => q.has_figure).length;
    console.log(`    • Questions with figures: ${withFigures}`);
  }

  const mathComplete = questions?.length === 60;
  console.log(`  🎯 Status: ${mathComplete ? '✅ COMPLETE' : '❌ INCOMPLETE'}`);
  return { questions: questions?.length || 0, complete: mathComplete };
}

async function verifyReadingSection(testNumber) {
  console.log('\n📖 READING SECTION VERIFICATION:');

  // Check passages
  const { data: passages } = await supabase
    .from('act_reading_passages')
    .select('*')
    .eq('test_number', testNumber)
    .order('passage_number');

  console.log(`  📖 Passages: ${passages?.length || 0}/4`);
  if (passages) {
    passages.forEach(p => console.log(`    • Passage ${p.passage_number}: "${p.title}" (${p.passage_type})`));
  }

  // Check questions with proper query
  const { data: questions } = await supabase
    .from('act_reading_questions')
    .select('question_number, passage_id, question_type, correct_answer')
    .eq('test_number', testNumber)
    .order('question_number');

  console.log(`  ❓ Questions: ${questions?.length || 0}/40`);
  if (questions && questions.length > 0) {
    console.log(`    • Range: Q${questions[0].question_number}-Q${questions[questions.length - 1].question_number}`);

    // Check passage linkage
    const passageLinks = [...new Set(questions.map(q => q.passage_id))];
    console.log(`    • Linked to ${passageLinks.length} different passages`);

    // Check distribution
    const questionsPerPassage = {};
    questions.forEach(q => {
      const passageId = q.passage_id;
      questionsPerPassage[passageId] = (questionsPerPassage[passageId] || 0) + 1;
    });
    console.log(`    • Questions per passage:`, Object.values(questionsPerPassage));
  }

  const readingComplete = (passages?.length === 4) && (questions?.length === 40);
  console.log(`  🎯 Status: ${readingComplete ? '✅ COMPLETE' : '❌ INCOMPLETE'}`);
  return { passages: passages?.length || 0, questions: questions?.length || 0, complete: readingComplete };
}

async function verifyScienceSection(testNumber) {
  console.log('\n🔬 SCIENCE SECTION VERIFICATION:');

  // Check passages
  const { data: passages } = await supabase
    .from('act_science_passages')
    .select('*')
    .eq('test_number', testNumber)
    .order('passage_number');

  console.log(`  📖 Passages: ${passages?.length || 0}/6`);
  if (passages) {
    passages.forEach(p => console.log(`    • Passage ${p.passage_number}: "${p.title}" (${p.passage_type})`));
  }

  // Check questions with proper query
  const { data: questions } = await supabase
    .from('act_science_questions')
    .select('question_number, passage_id, question_type, correct_answer')
    .eq('test_number', testNumber)
    .order('question_number');

  console.log(`  ❓ Questions: ${questions?.length || 0}/40`);
  if (questions && questions.length > 0) {
    console.log(`    • Range: Q${questions[0].question_number}-Q${questions[questions.length - 1].question_number}`);

    // Check passage linkage
    const passageLinks = [...new Set(questions.map(q => q.passage_id))];
    console.log(`    • Linked to ${passageLinks.length} different passages`);

    // Check distribution (approximately 6-7 questions per passage)
    const questionsPerPassage = {};
    questions.forEach(q => {
      const passageId = q.passage_id;
      questionsPerPassage[passageId] = (questionsPerPassage[passageId] || 0) + 1;
    });
    console.log(`    • Questions per passage:`, Object.values(questionsPerPassage));
  }

  const scienceComplete = (passages?.length === 6) && (questions?.length === 40);
  console.log(`  🎯 Status: ${scienceComplete ? '✅ COMPLETE' : '❌ INCOMPLETE'}`);
  return { passages: passages?.length || 0, questions: questions?.length || 0, complete: scienceComplete };
}

async function main() {
  const testNumber = 4;

  const englishResults = await verifyEnglishSection(testNumber);
  const mathResults = await verifyMathSection(testNumber);
  const readingResults = await verifyReadingSection(testNumber);
  const scienceResults = await verifyScienceSection(testNumber);

  console.log('\n' + '='.repeat(80));
  console.log('🏆 PRACTICE TEST 4 FINAL VERIFICATION RESULTS');
  console.log('='.repeat(80));

  const totalItems = englishResults.passages + englishResults.questions + mathResults.questions +
                    readingResults.passages + readingResults.questions +
                    scienceResults.passages + scienceResults.questions;

  const expectedTotal = 5 + 75 + 60 + 4 + 40 + 6 + 40; // 230 total items

  console.log(`📊 COMPREHENSIVE SUMMARY:`);
  console.log(`  ✅ Total items: ${totalItems}/${expectedTotal}`);
  console.log(`  📝 English: ${englishResults.complete ? '✅' : '❌'} (${englishResults.passages}/5 passages, ${englishResults.questions}/75 questions)`);
  console.log(`  🔢 Math: ${mathResults.complete ? '✅' : '❌'} (${mathResults.questions}/60 questions)`);
  console.log(`  📖 Reading: ${readingResults.complete ? '✅' : '❌'} (${readingResults.passages}/4 passages, ${readingResults.questions}/40 questions)`);
  console.log(`  🔬 Science: ${scienceResults.complete ? '✅' : '❌'} (${scienceResults.passages}/6 passages, ${scienceResults.questions}/40 questions)`);

  const overallComplete = englishResults.complete && mathResults.complete && readingResults.complete && scienceResults.complete;

  console.log(`\n🎯 OVERALL STATUS: ${overallComplete ? '🎉 PRACTICE TEST 4 COMPLETE! 🎉' : '❌ PRACTICE TEST 4 INCOMPLETE'}`);

  if (overallComplete) {
    console.log(`\n✨ SUCCESS! Practice Test 4 is 100% complete with all ${expectedTotal} items uploaded successfully!`);
    console.log(`📋 READY TO PROCEED: Extract Practice Tests 5, 6, and 7 next`);
  } else {
    console.log(`\n⚠️  Some sections need attention before proceeding to the next practice tests`);
  }

  return {
    complete: overallComplete,
    totalItems,
    expectedTotal,
    sections: {
      english: englishResults,
      math: mathResults,
      reading: readingResults,
      science: scienceResults
    }
  };
}

main().catch(console.error);