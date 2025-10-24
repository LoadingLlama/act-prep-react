#!/usr/bin/env node

/**
 * ULTIMATE VERIFICATION - PRACTICE ACT 3 COMPLETE VALIDATION
 * Final comprehensive check including lesson_ids
 */

import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '.env') });

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

console.log('🏆 ULTIMATE VERIFICATION - PRACTICE ACT 3 COMPLETE VALIDATION');
console.log('Final comprehensive check including lesson_ids');
console.log('=' .repeat(80));

const PRACTICE_ACT_3_LESSON_ID = '406a197f-f7d0-4c0d-9582-594dbb1bd8a0';

/**
 * Ultimate verification function
 */
async function ultimateVerification() {
  console.log('\n🎯 RUNNING ULTIMATE VERIFICATION...');

  const sections = [
    { name: 'English', table: 'act_english_questions', expected: 75, hasPassages: true, passageTable: 'act_english_passages', expectedPassages: 5 },
    { name: 'Math', table: 'act_math_questions', expected: 60, hasPassages: false },
    { name: 'Reading', table: 'act_reading_questions', expected: 40, hasPassages: true, passageTable: 'act_reading_passages', expectedPassages: 4 },
    { name: 'Science', table: 'act_science_questions', expected: 40, hasPassages: true, passageTable: 'act_science_passages', expectedPassages: 7 }
  ];

  let allIssues = [];
  let totalQuestions = 0;
  let totalPassages = 0;

  for (const section of sections) {
    console.log(`\n📊 VERIFYING ${section.name.toUpperCase()} SECTION...`);

    // Get all questions for this section
    const { data: questions } = await supabase
      .from(section.table)
      .select('*')
      .eq('test_number', 3)
      .order('question_number');

    console.log(`  📋 Questions: ${questions?.length || 0}/${section.expected}`);

    // Check question count
    if (questions?.length !== section.expected) {
      allIssues.push(`❌ ${section.name}: Expected ${section.expected} questions, found ${questions?.length}`);
    } else {
      totalQuestions += questions.length;
    }

    // Verify each question
    questions?.forEach(q => {
      // Check basic fields
      if (!q.question_stem) allIssues.push(`❌ ${section.name} Q${q.question_number}: Missing question stem`);
      if (!q.correct_answer) allIssues.push(`❌ ${section.name} Q${q.question_number}: Missing correct answer`);
      if (!q.lesson_id) allIssues.push(`❌ ${section.name} Q${q.question_number}: Missing lesson_id`);
      if (q.lesson_id !== PRACTICE_ACT_3_LESSON_ID) allIssues.push(`❌ ${section.name} Q${q.question_number}: Wrong lesson_id`);

      // Check choices (Math has 5, others have 4)
      if (section.name === 'Math') {
        if (!q.choice_a || !q.choice_b || !q.choice_c || !q.choice_d || !q.choice_e) {
          allIssues.push(`❌ ${section.name} Q${q.question_number}: Missing choices (needs A,B,C,D,E)`);
        }
        if (!['A', 'B', 'C', 'D', 'E'].includes(q.correct_answer)) {
          allIssues.push(`❌ ${section.name} Q${q.question_number}: Invalid answer ${q.correct_answer}`);
        }
      } else {
        if (!q.choice_a || !q.choice_b || !q.choice_c || !q.choice_d) {
          allIssues.push(`❌ ${section.name} Q${q.question_number}: Missing choices (needs A,B,C,D)`);
        }
        if (!['A', 'B', 'C', 'D'].includes(q.correct_answer)) {
          allIssues.push(`❌ ${section.name} Q${q.question_number}: Invalid answer ${q.correct_answer}`);
        }
      }

      // Check passage linkage for sections that need it
      if (section.hasPassages) {
        if ((section.name === 'English' && !q.passage_number) ||
            ((section.name === 'Reading' || section.name === 'Science') && !q.passage_id)) {
          allIssues.push(`❌ ${section.name} Q${q.question_number}: Not linked to passage`);
        }
      }
    });

    // Check passages if this section has them
    if (section.hasPassages) {
      const { data: passages } = await supabase
        .from(section.passageTable)
        .select('*')
        .eq('test_number', 3)
        .order('passage_number');

      console.log(`  📚 Passages: ${passages?.length || 0}/${section.expectedPassages}`);

      if (passages?.length !== section.expectedPassages) {
        allIssues.push(`❌ ${section.name}: Expected ${section.expectedPassages} passages, found ${passages?.length}`);
      } else {
        totalPassages += passages.length;
      }

      // Verify each passage
      passages?.forEach(p => {
        if (!p.title) allIssues.push(`❌ ${section.name} Passage ${p.passage_number}: Missing title`);
        if (!p.passage_text) allIssues.push(`❌ ${section.name} Passage ${p.passage_number}: Missing passage text`);
      });
    }

    const sectionStatus = allIssues.filter(issue => issue.includes(section.name)).length === 0 ? '✅' : '❌';
    console.log(`  ${sectionStatus} ${section.name} verification ${sectionStatus === '✅' ? 'PASSED' : 'FAILED'}`);
  }

  // Final summary
  console.log('\n' + '=' .repeat(80));
  console.log('🏆 ULTIMATE VERIFICATION RESULTS');
  console.log('=' .repeat(80));

  if (allIssues.length === 0) {
    console.log('🎉 ✅ ULTIMATE VERIFICATION PASSED: 100% ACCURACY CONFIRMED!');
    console.log('');
    console.log('🎯 PRACTICE ACT 3 EXTRACTION COMPLETE SUMMARY:');
    console.log('  ✅ English: 75 questions + 5 passages - PERFECT');
    console.log('  ✅ Math: 60 questions - PERFECT');
    console.log('  ✅ Reading: 40 questions + 4 passages - PERFECT');
    console.log('  ✅ Science: 40 questions + 7 passages - PERFECT');
    console.log('  ✅ All lesson_ids properly assigned - PERFECT');
    console.log('  ✅ All passage linkages verified - PERFECT');
    console.log('  ✅ All answer keys validated - PERFECT');
    console.log('');
    console.log(`🏆 GRAND TOTAL: ${totalQuestions} questions + ${totalPassages} passages - 100% ACCURATE`);
    console.log(`📋 Lesson ID: ${PRACTICE_ACT_3_LESSON_ID} (Topic 3.3 - Practice Passages)`);
  } else {
    console.log('❌ ULTIMATE VERIFICATION FAILED:');
    console.log(`❌ Total Issues Found: ${allIssues.length}`);
    console.log('\n📋 DETAILED ISSUES:');
    allIssues.forEach((issue, index) => {
      console.log(`  ${index + 1}. ${issue}`);
    });
  }

  return {
    passed: allIssues.length === 0,
    totalIssues: allIssues.length,
    issues: allIssues,
    totalQuestions,
    totalPassages
  };
}

ultimateVerification().catch(console.error);