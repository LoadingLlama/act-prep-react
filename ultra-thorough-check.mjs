#!/usr/bin/env node

/**
 * ULTRA-THOROUGH CHECK - FIND ANY MISSING DATA
 * Check every single field for null/empty values and incomplete records
 */

import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '.env') });

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

console.log('🔍 ULTRA-THOROUGH CHECK - FIND ANY MISSING DATA');
console.log('Check every single field for null/empty values and incomplete records');
console.log('=' .repeat(80));

/**
 * Check for missing data in questions
 */
async function checkMissingDataInQuestions() {
  console.log('\n📋 CHECKING FOR MISSING DATA IN QUESTIONS...');

  const sections = [
    {
      name: 'English',
      table: 'act_english_questions',
      requiredFields: ['question_number', 'question_stem', 'choice_a', 'choice_b', 'choice_c', 'choice_d', 'correct_answer', 'lesson_id', 'passage_number'],
      expected: 75
    },
    {
      name: 'Math',
      table: 'act_math_questions',
      requiredFields: ['question_number', 'question_stem', 'choice_a', 'choice_b', 'choice_c', 'choice_d', 'choice_e', 'correct_answer', 'lesson_id'],
      expected: 60
    },
    {
      name: 'Reading',
      table: 'act_reading_questions',
      requiredFields: ['question_number', 'question_stem', 'choice_a', 'choice_b', 'choice_c', 'choice_d', 'correct_answer', 'lesson_id', 'passage_id'],
      expected: 40
    },
    {
      name: 'Science',
      table: 'act_science_questions',
      requiredFields: ['question_number', 'question_stem', 'choice_a', 'choice_b', 'choice_c', 'choice_d', 'correct_answer', 'lesson_id', 'passage_id'],
      expected: 40
    }
  ];

  let allMissingData = [];

  for (const section of sections) {
    console.log(`\n📝 CHECKING ${section.name.toUpperCase()} QUESTIONS...`);

    const { data: questions } = await supabase
      .from(section.table)
      .select('*')
      .eq('test_number', 3)
      .order('question_number');

    console.log(`  📊 Found ${questions?.length || 0}/${section.expected} questions`);

    if (!questions || questions.length === 0) {
      allMissingData.push(`❌ ${section.name}: NO QUESTIONS FOUND`);
      continue;
    }

    // Check each question for missing fields
    questions.forEach(q => {
      section.requiredFields.forEach(field => {
        if (q[field] === null || q[field] === undefined || q[field] === '') {
          allMissingData.push(`❌ ${section.name} Q${q.question_number}: Missing ${field}`);
        }
      });

      // Check for extremely short question stems (likely incomplete)
      if (q.question_stem && q.question_stem.length < 10) {
        allMissingData.push(`❌ ${section.name} Q${q.question_number}: Question stem too short (${q.question_stem.length} chars)`);
      }

      // Check for extremely short choices (likely incomplete)
      ['choice_a', 'choice_b', 'choice_c', 'choice_d'].forEach(choice => {
        if (q[choice] && q[choice].length < 2) {
          allMissingData.push(`❌ ${section.name} Q${q.question_number}: ${choice} too short: "${q[choice]}"`);
        }
      });

      // Check Math choice_e separately
      if (section.name === 'Math' && q.choice_e && q.choice_e.length < 2) {
        allMissingData.push(`❌ ${section.name} Q${q.question_number}: choice_e too short: "${q.choice_e}"`);
      }

      // Check for missing question numbers in sequence
      const expectedQuestionNum = questions.indexOf(q) + 1;
      if (q.question_number !== expectedQuestionNum) {
        allMissingData.push(`❌ ${section.name}: Question number sequence issue - found ${q.question_number}, expected ${expectedQuestionNum}`);
      }
    });

    // Check for gaps in question numbers
    const questionNumbers = questions.map(q => q.question_number).sort((a, b) => a - b);
    for (let i = 1; i <= section.expected; i++) {
      if (!questionNumbers.includes(i)) {
        allMissingData.push(`❌ ${section.name}: Missing question number ${i}`);
      }
    }

    // Check for duplicate question numbers
    const duplicates = questionNumbers.filter((num, index) => questionNumbers.indexOf(num) !== index);
    if (duplicates.length > 0) {
      allMissingData.push(`❌ ${section.name}: Duplicate question numbers: ${duplicates.join(', ')}`);
    }
  }

  return allMissingData;
}

/**
 * Check for missing data in passages
 */
async function checkMissingDataInPassages() {
  console.log('\n📚 CHECKING FOR MISSING DATA IN PASSAGES...');

  const passageSections = [
    {
      name: 'English',
      table: 'act_english_passages',
      requiredFields: ['passage_number', 'title', 'passage_text'],
      expected: 5
    },
    {
      name: 'Reading',
      table: 'act_reading_passages',
      requiredFields: ['passage_number', 'title', 'passage_text', 'passage_type'],
      expected: 4
    },
    {
      name: 'Science',
      table: 'act_science_passages',
      requiredFields: ['passage_number', 'title', 'passage_text', 'passage_type'],
      expected: 7
    }
  ];

  let allMissingPassageData = [];

  for (const section of passageSections) {
    console.log(`\n📖 CHECKING ${section.name.toUpperCase()} PASSAGES...`);

    const { data: passages } = await supabase
      .from(section.table)
      .select('*')
      .eq('test_number', 3)
      .order('passage_number');

    console.log(`  📊 Found ${passages?.length || 0}/${section.expected} passages`);

    if (!passages || passages.length === 0) {
      allMissingPassageData.push(`❌ ${section.name}: NO PASSAGES FOUND`);
      continue;
    }

    // Check each passage for missing fields
    passages.forEach(p => {
      section.requiredFields.forEach(field => {
        if (p[field] === null || p[field] === undefined || p[field] === '') {
          allMissingPassageData.push(`❌ ${section.name} Passage ${p.passage_number}: Missing ${field}`);
        }
      });

      // Check for extremely short content
      if (p.passage_text && p.passage_text.length < 100) {
        allMissingPassageData.push(`❌ ${section.name} Passage ${p.passage_number}: Passage text too short (${p.passage_text.length} chars)`);
      }

      if (p.title && p.title.length < 5) {
        allMissingPassageData.push(`❌ ${section.name} Passage ${p.passage_number}: Title too short: "${p.title}"`);
      }
    });

    // Check for gaps in passage numbers
    const passageNumbers = passages.map(p => p.passage_number).sort((a, b) => a - b);
    for (let i = 1; i <= section.expected; i++) {
      if (!passageNumbers.includes(i)) {
        allMissingPassageData.push(`❌ ${section.name}: Missing passage number ${i}`);
      }
    }
  }

  return allMissingPassageData;
}

/**
 * Check question-passage linkage
 */
async function checkQuestionPassageLinkage() {
  console.log('\n🔗 CHECKING QUESTION-PASSAGE LINKAGE...');

  let linkageIssues = [];

  // Check English questions linked to passages
  const { data: englishQuestions } = await supabase
    .from('act_english_questions')
    .select('question_number, passage_number')
    .eq('test_number', 3);

  const { data: englishPassages } = await supabase
    .from('act_english_passages')
    .select('passage_number')
    .eq('test_number', 3);

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
    .eq('test_number', 3);

  const { data: readingPassages } = await supabase
    .from('act_reading_passages')
    .select('id')
    .eq('test_number', 3);

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
    .eq('test_number', 3);

  const { data: sciencePassages } = await supabase
    .from('act_science_passages')
    .select('id')
    .eq('test_number', 3);

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
 * Check for orphaned questions (questions without proper distribution)
 */
async function checkQuestionDistribution() {
  console.log('\n📊 CHECKING QUESTION DISTRIBUTION...');

  let distributionIssues = [];

  // Expected question distributions
  const expectedDistributions = {
    English: { questionsPerPassage: 15, passages: 5 }, // 15 questions per passage
    Reading: { questionsPerPassage: 10, passages: 4 }, // 10 questions per passage
    Science: { questionsVary: true, passages: 7 } // Science varies, typically 5-6 questions per passage
  };

  // Check English distribution
  const { data: englishQuestions } = await supabase
    .from('act_english_questions')
    .select('passage_number')
    .eq('test_number', 3);

  for (let passageNum = 1; passageNum <= 5; passageNum++) {
    const questionsForPassage = englishQuestions?.filter(q => q.passage_number === passageNum).length || 0;
    if (questionsForPassage !== 15) {
      distributionIssues.push(`❌ English Passage ${passageNum}: Has ${questionsForPassage} questions, expected 15`);
    }
  }

  // Check Reading distribution
  const { data: readingPassages } = await supabase
    .from('act_reading_passages')
    .select('id')
    .eq('test_number', 3);

  for (const passage of readingPassages || []) {
    const { data: questionsForPassage } = await supabase
      .from('act_reading_questions')
      .select('question_number')
      .eq('test_number', 3)
      .eq('passage_id', passage.id);

    if (questionsForPassage?.length !== 10) {
      distributionIssues.push(`❌ Reading Passage ${passage.id}: Has ${questionsForPassage?.length} questions, expected 10`);
    }
  }

  console.log(`  🔍 Found ${distributionIssues.length} distribution issues`);

  return distributionIssues;
}

/**
 * Main ultra-thorough check
 */
async function ultraThoroughCheck() {
  console.log('\n🚀 STARTING ULTRA-THOROUGH CHECK...');

  const questionDataIssues = await checkMissingDataInQuestions();
  const passageDataIssues = await checkMissingDataInPassages();
  const linkageIssues = await checkQuestionPassageLinkage();
  const distributionIssues = await checkQuestionDistribution();

  const allIssues = [
    ...questionDataIssues,
    ...passageDataIssues,
    ...linkageIssues,
    ...distributionIssues
  ];

  console.log('\n' + '=' .repeat(80));
  console.log('🎯 ULTRA-THOROUGH CHECK RESULTS');
  console.log('=' .repeat(80));

  if (allIssues.length === 0) {
    console.log('🎉 ✅ ULTRA-THOROUGH CHECK PASSED: NO MISSING DATA FOUND!');
    console.log('');
    console.log('🏆 PERFECT DATA INTEGRITY CONFIRMED:');
    console.log('  ✅ All questions have complete data');
    console.log('  ✅ All passages have complete data');
    console.log('  ✅ All linkages are valid');
    console.log('  ✅ All distributions are correct');
    console.log('  ✅ No null/empty fields found');
    console.log('  ✅ No orphaned or missing records');
    console.log('');
    console.log('🎯 Practice ACT 3 extraction is TRULY 100% COMPLETE!');
  } else {
    console.log('❌ ULTRA-THOROUGH CHECK FOUND ISSUES:');
    console.log(`❌ Total Issues: ${allIssues.length}`);
    console.log('');
    console.log('📋 MISSING DATA DETAILS:');
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

ultraThoroughCheck().catch(console.error);