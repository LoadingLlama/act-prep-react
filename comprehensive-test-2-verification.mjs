#!/usr/bin/env node

/**
 * COMPREHENSIVE PRACTICE TEST 2 VERIFICATION
 * Complete data integrity check for Practice Test 2
 * Using lessons learned from Practice Test 3 verification
 */

import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '.env') });

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

console.log('🔍 COMPREHENSIVE PRACTICE TEST 2 VERIFICATION');
console.log('Complete data integrity check using Practice Test 3 lessons');
console.log('='.repeat(80));

// Enhanced validation patterns from Test 3 lessons
const NORMAL_ACT_PATTERNS = {
  english: {
    validShortChoices: [
      'so', 'by', 'at', 'to', 'in', 'on', 'of', 'or', 'if', 'as', 'is', 'it',
      'and', 'but', 'the', 'for', 'with', 'from', 'this', 'that',
      'NO CHANGE', 'DELETE', 'OMIT', '—'
    ],
    minChoiceLength: 1
  },
  math: {
    validPatterns: [
      /^\d+$/,          // Single numbers: 1, 2, 3
      /^[A-Z]$/,        // Single letters: I, II, III
      /^\d+\/\d+$/,     // Fractions: 1/2, 3/4
      /^-?\d+$/,        // Negative numbers: -1, -5
      /^\d+\.\d+$/,     // Decimals: 2.5, 3.14
      /^[a-zA-Z]+$/,    // Variables: x, y, abc
      /^\$\d+/,         // Money: $5, $10
      /^\d+%$/,         // Percentages: 50%, 75%
      /^√\d+$/,         // Square roots: √2, √3
      /^\d+π$/,         // Pi expressions: 2π, 4π
      /^\(\d+,\d+\)$/   // Coordinates: (2,3), (5,7)
    ],
    minChoiceLength: 1
  },
  science: {
    validShortChoices: [
      /^\d+%$/,      // 0%, 25%, 50%
      /^\d+$/,       // Single numbers
      /^\d+\.\d+$/,  // Decimals
      /^-?\d+$/      // Negative numbers
    ],
    minChoiceLength: 1
  }
};

/**
 * Validate if a choice is legitimate for ACT tests
 */
function isValidChoice(choice, section) {
  if (!choice || choice === null || choice === undefined) {
    return false;
  }

  const choiceStr = choice.toString().trim();
  if (!choiceStr) return false;

  const patterns = NORMAL_ACT_PATTERNS[section];
  if (!patterns) return choiceStr.length >= 1;

  switch (section) {
    case 'english':
      return patterns.validShortChoices.includes(choiceStr) || choiceStr.length >= 3;
    case 'math':
      return patterns.validPatterns.some(pattern => pattern.test(choiceStr)) || choiceStr.length >= 3;
    case 'science':
      if (patterns.validShortChoices.some(pattern =>
          typeof pattern === 'string' ? pattern === choiceStr : pattern.test(choiceStr))) {
        return true;
      }
      return choiceStr.length >= 3;
    default:
      return choiceStr.length >= 3;
  }
}

/**
 * Comprehensive Test 2 verification
 */
async function comprehensiveTest2Verification() {
  console.log('\n🎯 STARTING COMPREHENSIVE TEST 2 VERIFICATION...');

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
      .eq('test_number', 2)
      .order('question_number');

    console.log(`  📋 Questions: ${questions?.length || 0}/${section.expected}`);

    // Check question count
    if (questions?.length !== section.expected) {
      allIssues.push(`❌ ${section.name}: Expected ${section.expected} questions, found ${questions?.length}`);
    } else {
      totalQuestions += questions.length;
    }

    // Verify each question
    let questionsWithIssues = 0;
    questions?.forEach(q => {
      const questionIssues = [];

      // Check basic fields
      if (!q.question_stem) questionIssues.push('Missing question stem');
      if (!q.correct_answer) questionIssues.push('Missing correct answer');
      if (!q.lesson_id) questionIssues.push('Missing lesson_id');

      // Check question stem length
      if (q.question_stem && q.question_stem.length < 15) {
        questionIssues.push(`Question stem too short: ${q.question_stem.length} chars`);
      }

      // Check choices (Math has 5, others have 4)
      if (section.name === 'Math') {
        if (!q.choice_a || !q.choice_b || !q.choice_c || !q.choice_d || !q.choice_e) {
          questionIssues.push('Missing choices (needs A,B,C,D,E)');
        }
        if (!['A', 'B', 'C', 'D', 'E'].includes(q.correct_answer)) {
          questionIssues.push(`Invalid answer ${q.correct_answer}`);
        }
      } else {
        if (!q.choice_a || !q.choice_b || !q.choice_c || !q.choice_d) {
          questionIssues.push('Missing choices (needs A,B,C,D)');
        }
        if (!['A', 'B', 'C', 'D'].includes(q.correct_answer)) {
          questionIssues.push(`Invalid answer ${q.correct_answer}`);
        }
      }

      // Validate choices using ACT pattern recognition
      ['choice_a', 'choice_b', 'choice_c', 'choice_d'].forEach(choiceField => {
        if (q[choiceField] && !isValidChoice(q[choiceField], section.name.toLowerCase())) {
          questionIssues.push(`Potentially invalid ${choiceField}: "${q[choiceField]}"`);
        }
      });

      if (section.name === 'Math' && q.choice_e && !isValidChoice(q.choice_e, 'math')) {
        questionIssues.push(`Potentially invalid choice_e: "${q.choice_e}"`);
      }

      // Check passage linkage for sections that need it
      if (section.hasPassages) {
        if ((section.name === 'English' && !q.passage_number) ||
            ((section.name === 'Reading' || section.name === 'Science') && !q.passage_id)) {
          questionIssues.push('Not linked to passage');
        }
      }

      if (questionIssues.length > 0) {
        questionsWithIssues++;
        allIssues.push(`❌ ${section.name} Q${q.question_number}: ${questionIssues.join(', ')}`);
      }
    });

    console.log(`  ${questionsWithIssues === 0 ? '✅' : '❌'} Questions with issues: ${questionsWithIssues}`);

    // Check passages if this section has them
    if (section.hasPassages) {
      const { data: passages } = await supabase
        .from(section.passageTable)
        .select('*')
        .eq('test_number', 2)
        .order('passage_number');

      console.log(`  📚 Passages: ${passages?.length || 0}/${section.expectedPassages}`);

      if (passages?.length !== section.expectedPassages) {
        allIssues.push(`❌ ${section.name}: Expected ${section.expectedPassages} passages, found ${passages?.length}`);
      } else {
        totalPassages += passages.length;
      }

      // Verify each passage
      let passagesWithIssues = 0;
      passages?.forEach(p => {
        const passageIssues = [];

        if (!p.title) passageIssues.push('Missing title');
        if (!p.passage_text) passageIssues.push('Missing passage text');

        // Check content length
        if (p.passage_text && p.passage_text.length < 200) {
          passageIssues.push(`Passage text too short: ${p.passage_text.length} chars`);
        }

        if (p.title && p.title.length < 5) {
          passageIssues.push(`Title too short: "${p.title}"`);
        }

        if (passageIssues.length > 0) {
          passagesWithIssues++;
          allIssues.push(`❌ ${section.name} Passage ${p.passage_number}: ${passageIssues.join(', ')}`);
        }
      });

      console.log(`  ${passagesWithIssues === 0 ? '✅' : '❌'} Passages with issues: ${passagesWithIssues}`);
    }

    const sectionStatus = allIssues.filter(issue => issue.includes(section.name)).length === 0 ? '✅' : '❌';
    console.log(`  ${sectionStatus} ${section.name} overall status: ${sectionStatus === '✅' ? 'GOOD' : 'NEEDS ATTENTION'}`);
  }

  return { allIssues, totalQuestions, totalPassages };
}

/**
 * Check question-passage linkage integrity
 */
async function checkTest2LinkageIntegrity() {
  console.log('\n🔗 CHECKING TEST 2 QUESTION-PASSAGE LINKAGE...');

  let linkageIssues = [];

  // Check English questions linked to passages
  const { data: englishQuestions } = await supabase
    .from('act_english_questions')
    .select('question_number, passage_number')
    .eq('test_number', 2);

  const { data: englishPassages } = await supabase
    .from('act_english_passages')
    .select('passage_number')
    .eq('test_number', 2);

  const englishPassageNumbers = englishPassages?.map(p => p.passage_number) || [];

  englishQuestions?.forEach(q => {
    if (!englishPassageNumbers.includes(q.passage_number)) {
      linkageIssues.push(`❌ English Q${q.question_number}: Links to non-existent passage ${q.passage_number}`);
    }
  });

  // Check Reading questions linked to passages
  const { data: readingQuestions } = await supabase
    .from('act_reading_questions')
    .select('question_number, passage_id')
    .eq('test_number', 2);

  const { data: readingPassages } = await supabase
    .from('act_reading_passages')
    .select('id')
    .eq('test_number', 2);

  const readingPassageIds = readingPassages?.map(p => p.id) || [];

  readingQuestions?.forEach(q => {
    if (!readingPassageIds.includes(q.passage_id)) {
      linkageIssues.push(`❌ Reading Q${q.question_number}: Links to non-existent passage ID ${q.passage_id}`);
    }
  });

  // Check Science questions linked to passages
  const { data: scienceQuestions } = await supabase
    .from('act_science_questions')
    .select('question_number, passage_id')
    .eq('test_number', 2);

  const { data: sciencePassages } = await supabase
    .from('act_science_passages')
    .select('id')
    .eq('test_number', 2);

  const sciencePassageIds = sciencePassages?.map(p => p.id) || [];

  scienceQuestions?.forEach(q => {
    if (!sciencePassageIds.includes(q.passage_id)) {
      linkageIssues.push(`❌ Science Q${q.question_number}: Links to non-existent passage ID ${q.passage_id}`);
    }
  });

  console.log(`  🔍 Found ${linkageIssues.length} linkage issues`);

  return linkageIssues;
}

/**
 * Sample data quality check
 */
async function sampleTest2DataQuality() {
  console.log('\n🔬 SAMPLING TEST 2 DATA QUALITY...');

  const samples = [
    { section: 'English', table: 'act_english_questions', questionNum: 1 },
    { section: 'Math', table: 'act_math_questions', questionNum: 1 },
    { section: 'Reading', table: 'act_reading_questions', questionNum: 1 },
    { section: 'Science', table: 'act_science_questions', questionNum: 1 }
  ];

  for (const sample of samples) {
    const { data: question } = await supabase
      .from(sample.table)
      .select('*')
      .eq('test_number', 2)
      .eq('question_number', sample.questionNum)
      .single();

    console.log(`\n📋 ${sample.section} Q${sample.questionNum} Sample:`);
    if (question) {
      console.log(`  Stem: ${question.question_stem?.substring(0, 80)}...`);
      console.log(`  A: "${question.choice_a}"`);
      console.log(`  B: "${question.choice_b}"`);
      console.log(`  C: "${question.choice_c}"`);
      console.log(`  D: "${question.choice_d}"`);
      if (sample.section === 'Math') console.log(`  E: "${question.choice_e}"`);
      console.log(`  Answer: ${question.correct_answer}`);
      console.log(`  Lesson ID: ${question.lesson_id ? 'Present' : 'MISSING'}`);

      // Check if this looks like corrupted data
      const hasEmptyChoices = [question.choice_a, question.choice_b, question.choice_c, question.choice_d]
        .some(choice => !choice || choice.length < 2);

      if (hasEmptyChoices) {
        console.log(`  ⚠️  WARNING: This question has suspiciously short/missing choices`);
      }

      if (!question.question_stem || question.question_stem.length < 20) {
        console.log(`  ⚠️  WARNING: Question stem appears incomplete`);
      }
    } else {
      console.log(`  ❌ Question not found!`);
    }
  }
}

/**
 * Main verification function
 */
async function runComprehensiveTest2Verification() {
  const verificationResults = await comprehensiveTest2Verification();
  const linkageIssues = await checkTest2LinkageIntegrity();
  await sampleTest2DataQuality();

  const allIssues = [...verificationResults.allIssues, ...linkageIssues];

  console.log('\n' + '='.repeat(80));
  console.log('🎯 COMPREHENSIVE TEST 2 VERIFICATION RESULTS');
  console.log('='.repeat(80));

  if (allIssues.length === 0) {
    console.log('🎉 ✅ TEST 2 VERIFICATION PASSED: ALL DATA IS COMPLETE AND VALID!');
    console.log('');
    console.log('🏆 CONFIRMED PERFECT DATA QUALITY:');
    console.log('  ✅ English: 75 questions + 5 passages - PERFECT');
    console.log('  ✅ Math: 60 questions - PERFECT');
    console.log('  ✅ Reading: 40 questions + 4 passages - PERFECT');
    console.log('  ✅ Science: 40 questions + 7 passages - PERFECT');
    console.log('  ✅ All linkages verified - PERFECT');
    console.log('  ✅ All data patterns valid - PERFECT');
    console.log('');
    console.log(`🏆 GRAND TOTAL: ${verificationResults.totalQuestions} questions + ${verificationResults.totalPassages} passages - 100% ACCURATE`);
  } else {
    console.log('❌ TEST 2 VERIFICATION FOUND ISSUES:');
    console.log(`❌ Total Issues Found: ${allIssues.length}`);
    console.log('');
    console.log('📋 DETAILED ISSUES REQUIRING ATTENTION:');

    // Group issues by type for better readability
    const issuesBySection = {};
    allIssues.forEach(issue => {
      const section = issue.split(' ')[1]?.split(':')[0] || 'Unknown';
      if (!issuesBySection[section]) issuesBySection[section] = [];
      issuesBySection[section].push(issue);
    });

    Object.entries(issuesBySection).forEach(([section, issues]) => {
      console.log(`\n  🔸 ${section} Issues (${issues.length}):`);
      issues.slice(0, 10).forEach(issue => console.log(`    ${issue}`));
      if (issues.length > 10) {
        console.log(`    ... and ${issues.length - 10} more issues`);
      }
    });

    console.log('');
    console.log('🎯 RECOMMENDED ACTIONS:');

    // Analyze issue patterns and recommend actions
    const hasQuestionIssues = allIssues.some(issue => issue.includes('Q') && !issue.includes('Passage'));
    const hasPassageIssues = allIssues.some(issue => issue.includes('Passage'));
    const hasLinkageIssues = allIssues.some(issue => issue.includes('Links to non-existent'));
    const hasMissingChoices = allIssues.some(issue => issue.includes('Missing choices'));
    const hasShortContent = allIssues.some(issue => issue.includes('too short'));

    if (hasMissingChoices || hasShortContent) {
      console.log('  🔧 CRITICAL: Data appears to be from failed automatic extraction');
      console.log('  📋 RECOMMENDED: Complete manual re-extraction like Practice Test 3');
    }

    if (hasPassageIssues) {
      console.log('  📚 RECOMMENDED: Re-extract passages using manual method');
    }

    if (hasLinkageIssues) {
      console.log('  🔗 RECOMMENDED: Fix passage-question linkages');
    }

    if (hasQuestionIssues) {
      console.log('  📝 RECOMMENDED: Review and fix question data');
    }

    console.log('  🏆 SOLUTION: Use Golden Template V2 with manual extraction workflow');
  }

  return {
    passed: allIssues.length === 0,
    totalIssues: allIssues.length,
    issues: allIssues,
    totalQuestions: verificationResults.totalQuestions,
    totalPassages: verificationResults.totalPassages,
    recommendManualExtraction: allIssues.some(issue =>
      issue.includes('Missing choices') ||
      issue.includes('too short') ||
      issue.includes('Missing question stem')
    )
  };
}

runComprehensiveTest2Verification().catch(console.error);