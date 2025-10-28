#!/usr/bin/env node

/**
 * COMPREHENSIVE PRACTICE TEST 1 DIAGNOSTIC
 * Manual deep review of all aspects before fixes
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

// Use REACT_APP_ prefixed vars from .env
const SUPABASE_URL = process.env.REACT_APP_SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error('❌ Missing Supabase credentials in .env file');
  console.error(`   REACT_APP_SUPABASE_URL: ${SUPABASE_URL ? '✅' : '❌'}`);
  console.error(`   SUPABASE_SERVICE_ROLE_KEY: ${SUPABASE_KEY ? '✅' : '❌'}`);
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

console.log('╔════════════════════════════════════════════════════════════════╗');
console.log('║    PRACTICE TEST 1 - COMPREHENSIVE DIAGNOSTIC REVIEW          ║');
console.log('╚════════════════════════════════════════════════════════════════╝\n');

async function runDiagnostic() {
  const issues = [];

  // ====================================================================
  // 1. QUESTION COUNTS - Verify actual vs expected
  // ====================================================================
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('1️⃣  QUESTION COUNTS VERIFICATION');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  const { count: engCount } = await supabase
    .from('practice_test_english_questions')
    .select('*', { count: 'exact', head: true })
    .eq('test_number', 1);

  const { count: mathCount } = await supabase
    .from('practice_test_math_questions')
    .select('*', { count: 'exact', head: true })
    .eq('test_number', 1);

  const { count: readCount } = await supabase
    .from('practice_test_reading_questions')
    .select('*', { count: 'exact', head: true })
    .eq('test_number', 1);

  const { count: sciCount } = await supabase
    .from('practice_test_science_questions')
    .select('*', { count: 'exact', head: true })
    .eq('test_number', 1);

  console.log('📊 ACTUAL COUNTS:');
  console.log(`   English: ${engCount} (Expected: 75)`);
  console.log(`   Math: ${mathCount} (Expected: 60)`);
  console.log(`   Reading: ${readCount} (Expected: 40)`);
  console.log(`   Science: ${sciCount} (Expected: 40)`);
  console.log(`   TOTAL: ${engCount + mathCount + readCount + sciCount} (Expected: 215)\n`);

  if (engCount !== 75) issues.push(`❌ English has ${engCount} questions instead of 75`);
  if (mathCount !== 60) issues.push(`❌ Math has ${mathCount} questions instead of 60`);
  if (readCount !== 40) issues.push(`❌ Reading has ${readCount} questions instead of 40`);
  if (sciCount !== 40) issues.push(`❌ Science has ${sciCount} questions instead of 40`);

  // ====================================================================
  // 2. ENGLISH SECTION - Underlined text verification
  // ====================================================================
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('2️⃣  ENGLISH SECTION - UNDERLINED TEXT CHECK');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  const { data: engQuestions } = await supabase
    .from('practice_test_english_questions')
    .select('*')
    .eq('test_number', 1)
    .order('question_number')
    .limit(5);

  console.log('📝 Sample English Questions (Q1-5):');
  engQuestions.forEach(q => {
    console.log(`\nQ${q.question_number}:`);
    console.log(`   Text: ${q.question_text?.substring(0, 100)}...`);
    console.log(`   Has underlined portion: ${q.question_text?.includes('<u>') || q.question_text?.includes('[UNDERLINE]') ? '✅' : '❌'}`);
  });

  const hasUnderlines = engQuestions.some(q =>
    q.question_text?.includes('<u>') ||
    q.question_text?.includes('[UNDERLINE]') ||
    q.question_prompt?.includes('underlined')
  );

  if (!hasUnderlines) {
    issues.push('❌ English questions missing underlined text formatting');
  }

  // ====================================================================
  // 3. PASSAGES - Titles and Formatting
  // ====================================================================
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('3️⃣  PASSAGE TITLES AND FORMATTING');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  const { data: engPassages } = await supabase
    .from('practice_test_english_passages')
    .select('*')
    .eq('test_number', 1)
    .order('passage_number');

  const { data: readPassages } = await supabase
    .from('practice_test_reading_passages')
    .select('*')
    .eq('test_number', 1)
    .order('passage_number');

  const { data: sciPassages } = await supabase
    .from('practice_test_science_passages')
    .select('*')
    .eq('test_number', 1)
    .order('passage_number');

  console.log('📖 ENGLISH PASSAGES:');
  engPassages.forEach(p => {
    const hasTitle = p.title || p.passage_title;
    console.log(`   P${p.passage_number}: ${hasTitle ? `"${hasTitle}"` : '❌ NO TITLE'}`);
  });

  console.log('\n📖 READING PASSAGES:');
  readPassages.forEach(p => {
    const hasTitle = p.title || p.passage_title;
    console.log(`   P${p.passage_number}: ${hasTitle ? `"${hasTitle}"` : '❌ NO TITLE'}`);
  });

  console.log('\n🔬 SCIENCE PASSAGES:');
  sciPassages.forEach(p => {
    const hasTitle = p.title || p.passage_title;
    console.log(`   P${p.passage_number}: ${hasTitle ? `"${hasTitle}"` : '❌ NO TITLE'}`);
  });

  const missingTitles = [];
  if (engPassages.some(p => !p.title && !p.passage_title)) missingTitles.push('English');
  if (readPassages.some(p => !p.title && !p.passage_title)) missingTitles.push('Reading');
  if (sciPassages.some(p => !p.title && !p.passage_title)) missingTitles.push('Science');

  if (missingTitles.length > 0) {
    issues.push(`❌ Missing passage titles in: ${missingTitles.join(', ')}`);
  }

  // ====================================================================
  // 4. SCIENCE TABLES - Formatting Check
  // ====================================================================
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('4️⃣  SCIENCE SECTION - TABLE FORMATTING');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  console.log('🔬 Science Passage Sample (P1):');
  const sciP1 = sciPassages[0];
  const hasTableMarkup = sciP1.passage_text?.includes('<table>') ||
                         sciP1.passage_text?.includes('[TABLE]');

  console.log(`   Passage length: ${sciP1.passage_text?.length} chars`);
  console.log(`   Has table HTML: ${hasTableMarkup ? '✅' : '❌'}`);
  console.log(`   Has pipe tables: ${sciP1.passage_text?.includes('|') ? '✅' : '❌'}`);
  console.log('\n   First 300 chars:');
  console.log(`   ${sciP1.passage_text?.substring(0, 300)}...\n`);

  if (!hasTableMarkup) {
    issues.push('❌ Science tables not formatted as proper HTML tables');
  }

  // ====================================================================
  // 5. MATH QUESTIONS - Quality and Word Problems
  // ====================================================================
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('5️⃣  MATH SECTION - QUESTION QUALITY');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  const { data: mathQuestions } = await supabase
    .from('practice_test_math_questions')
    .select('*')
    .eq('test_number', 1)
    .order('question_number');

  // Check for word problems (longer questions)
  const wordProblems = mathQuestions.filter(q => q.question_text?.length > 150);
  const shortQuestions = mathQuestions.filter(q => q.question_text?.length < 50);

  console.log(`📊 Math Question Statistics:`);
  console.log(`   Total questions: ${mathQuestions.length}`);
  console.log(`   Word problems (>150 chars): ${wordProblems.length}`);
  console.log(`   Short questions (<50 chars): ${shortQuestions.length}`);
  console.log(`   Average length: ${Math.round(mathQuestions.reduce((sum, q) => sum + (q.question_text?.length || 0), 0) / mathQuestions.length)} chars\n`);

  console.log('📝 Sample Math Questions:');
  [1, 15, 30, 45, 60].forEach(qNum => {
    const q = mathQuestions.find(x => x.question_number === qNum);
    if (q) {
      console.log(`\n   Q${qNum} (${q.question_text?.length} chars):`);
      console.log(`   ${q.question_text?.substring(0, 120)}${q.question_text?.length > 120 ? '...' : ''}`);
    }
  });

  if (wordProblems.length < 15) {
    issues.push(`❌ Only ${wordProblems.length} word problems in Math (should have ~20-25)`);
  }

  // ====================================================================
  // 6. PASSAGE-QUESTION LINKAGE
  // ====================================================================
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('6️⃣  PASSAGE-QUESTION LINKAGE VERIFICATION');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  const { data: allEngQ } = await supabase
    .from('practice_test_english_questions')
    .select('question_number, passage_id')
    .eq('test_number', 1)
    .order('question_number');

  const engPassageIds = new Set(engPassages.map(p => p.id));
  const orphanedQuestions = allEngQ.filter(q => q.passage_id && !engPassageIds.has(q.passage_id));
  const unlinkedQuestions = allEngQ.filter(q => !q.passage_id);

  console.log('📝 English Question-Passage Links:');
  console.log(`   Total questions: ${allEngQ.length}`);
  console.log(`   Linked to passages: ${allEngQ.filter(q => q.passage_id).length}`);
  console.log(`   Orphaned (invalid passage_id): ${orphanedQuestions.length}`);
  console.log(`   Unlinked (null passage_id): ${unlinkedQuestions.length}\n`);

  // Show question distribution per passage
  const questionsByPassage = {};
  engPassages.forEach(p => {
    questionsByPassage[p.passage_number] = allEngQ.filter(q => q.passage_id === p.id).length;
  });

  console.log('   Questions per passage:');
  Object.entries(questionsByPassage).forEach(([pNum, count]) => {
    console.log(`      Passage ${pNum}: ${count} questions`);
  });

  if (orphanedQuestions.length > 0 || unlinkedQuestions.length > 0) {
    issues.push(`❌ Passage linkage issues: ${orphanedQuestions.length} orphaned, ${unlinkedQuestions.length} unlinked`);
  }

  // ====================================================================
  // 7. CROSS-REFERENCE WITH OTHER TESTS
  // ====================================================================
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('7️⃣  CROSS-REFERENCE WITH OTHER PRACTICE TESTS');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  // Check Tests 2-7 for comparison
  for (let testNum = 2; testNum <= 7; testNum++) {
    const { count: testEngCount } = await supabase
      .from('practice_test_english_questions')
      .select('*', { count: 'exact', head: true })
      .eq('test_number', testNum);

    if (testEngCount > 0) {
      console.log(`📊 Test ${testNum}: ${testEngCount} English questions found`);

      // Sample one question for comparison
      const { data: sampleQ } = await supabase
        .from('practice_test_english_questions')
        .select('*')
        .eq('test_number', testNum)
        .limit(1);

      if (sampleQ && sampleQ.length > 0) {
        const q = sampleQ[0];
        console.log(`   Sample Q: ${q.question_text?.substring(0, 80)}...`);
        console.log(`   Has underline markup: ${q.question_text?.includes('<u>') || q.question_text?.includes('[') ? '✅' : '❌'}\n`);
      }
    }
  }

  // ====================================================================
  // FINAL SUMMARY
  // ====================================================================
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('📋 DIAGNOSTIC SUMMARY');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  if (issues.length === 0) {
    console.log('✅ NO ISSUES FOUND - Test 1 appears production ready!\n');
  } else {
    console.log(`🚨 ISSUES IDENTIFIED (${issues.length} total):\n`);
    issues.forEach((issue, idx) => {
      console.log(`   ${idx + 1}. ${issue}`);
    });
    console.log('\n');
  }

  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  return { issues, counts: { engCount, mathCount, readCount, sciCount } };
}

runDiagnostic()
  .then(result => {
    console.log('✅ Diagnostic complete!');
    process.exit(result.issues.length > 0 ? 1 : 0);
  })
  .catch(err => {
    console.error('❌ FATAL ERROR:', err.message);
    process.exit(1);
  });
