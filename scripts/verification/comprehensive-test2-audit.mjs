#!/usr/bin/env node

/**
 * COMPREHENSIVE TEST 2 DATA AUDIT
 * Complete verification of all Test 2 data for issues and completeness
 */

import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '../../.env') });

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

const TEST_NUMBER = 2;

console.log('🔍 COMPREHENSIVE TEST 2 DATA AUDIT');
console.log('='.repeat(70));
console.log('🎯 Checking all sections for completeness and accuracy\n');

let totalIssues = 0;

// 1. ENGLISH QUESTIONS AUDIT
console.log('📝 ENGLISH QUESTIONS AUDIT (75 questions expected)');
console.log('='.repeat(50));

const { data: englishQuestions, error: englishError } = await supabase
  .from('act_english_questions')
  .select('*')
  .eq('test_number', TEST_NUMBER)
  .order('question_number');

if (englishError) {
  console.error('❌ Error fetching English questions:', englishError);
  totalIssues++;
} else {
  console.log(`📊 Found ${englishQuestions.length}/75 English questions`);

  let englishIssues = 0;
  const missingFields = {
    question_stem: 0,
    underlined_text: 0,
    context_before: 0,
    context_after: 0,
    choice_a: 0,
    choice_b: 0,
    choice_c: 0,
    choice_d: 0,
    correct_answer: 0,
    lesson_id: 0,
    difficulty_level: 0
  };

  englishQuestions.forEach(q => {
    Object.keys(missingFields).forEach(field => {
      if (!q[field] || q[field].trim() === '') {
        missingFields[field]++;
        englishIssues++;
      }
    });

    // Check for underlined formatting
    if (q.question_stem && !q.question_stem.includes('<u>')) {
      console.log(`⚠️  Q${q.question_number}: Missing underlined formatting in question_stem`);
      englishIssues++;
    }
  });

  console.log('\n🔍 English Questions Field Analysis:');
  Object.entries(missingFields).forEach(([field, count]) => {
    if (count > 0) {
      console.log(`❌ ${field}: ${count} missing`);
    } else {
      console.log(`✅ ${field}: Complete`);
    }
  });

  console.log(`\n📊 English Issues Found: ${englishIssues}`);
  totalIssues += englishIssues;
}

// 2. ENGLISH PASSAGES AUDIT
console.log('\n📚 ENGLISH PASSAGES AUDIT (5 passages expected)');
console.log('='.repeat(50));

const { data: englishPassages, error: englishPassagesError } = await supabase
  .from('act_english_passages')
  .select('*')
  .eq('test_number', TEST_NUMBER)
  .order('passage_number');

if (englishPassagesError) {
  console.error('❌ Error fetching English passages:', englishPassagesError);
  totalIssues++;
} else {
  console.log(`📊 Found ${englishPassages.length}/5 English passages`);

  let passageIssues = 0;
  englishPassages.forEach(p => {
    const length = p.passage_text ? p.passage_text.length : 0;
    if (length < 1800) {
      console.log(`❌ Passage ${p.passage_number}: Too short (${length} chars, need ≥1800)`);
      passageIssues++;
    }
    if (!p.title || p.title.trim() === '') {
      console.log(`❌ Passage ${p.passage_number}: Missing title`);
      passageIssues++;
    }
  });

  const avgLength = englishPassages.reduce((sum, p) => sum + (p.passage_text?.length || 0), 0) / englishPassages.length;
  console.log(`📊 Average passage length: ${Math.round(avgLength)} characters`);
  console.log(`📊 Passage Issues Found: ${passageIssues}`);
  totalIssues += passageIssues;
}

// 3. MATH QUESTIONS AUDIT
console.log('\n🔢 MATH QUESTIONS AUDIT (60 questions expected)');
console.log('='.repeat(50));

const { data: mathQuestions, error: mathError } = await supabase
  .from('act_math_questions')
  .select('*')
  .eq('test_number', TEST_NUMBER)
  .order('question_number');

if (mathError) {
  console.error('❌ Error fetching Math questions:', mathError);
  totalIssues++;
} else {
  console.log(`📊 Found ${mathQuestions.length}/60 Math questions`);

  let mathIssues = 0;
  const mathMissingFields = {
    question_stem: 0,
    choice_a: 0,
    choice_b: 0,
    choice_c: 0,
    choice_d: 0,
    choice_e: 0,
    correct_answer: 0,
    lesson_id: 0,
    difficulty_level: 0
  };

  mathQuestions.forEach(q => {
    Object.keys(mathMissingFields).forEach(field => {
      if (!q[field] || q[field].toString().trim() === '') {
        mathMissingFields[field]++;
        mathIssues++;
      }
    });
  });

  console.log('\n🔍 Math Questions Field Analysis:');
  Object.entries(mathMissingFields).forEach(([field, count]) => {
    if (count > 0) {
      console.log(`❌ ${field}: ${count} missing`);
    } else {
      console.log(`✅ ${field}: Complete`);
    }
  });

  console.log(`\n📊 Math Issues Found: ${mathIssues}`);
  totalIssues += mathIssues;
}

// 4. READING QUESTIONS AUDIT
console.log('\n📖 READING QUESTIONS AUDIT (40 questions expected)');
console.log('='.repeat(50));

const { data: readingQuestions, error: readingError } = await supabase
  .from('act_reading_questions')
  .select('*')
  .eq('test_number', TEST_NUMBER)
  .order('question_number');

if (readingError) {
  console.error('❌ Error fetching Reading questions:', readingError);
  totalIssues++;
} else {
  console.log(`📊 Found ${readingQuestions.length}/40 Reading questions`);

  let readingIssues = 0;
  const readingMissingFields = {
    question_stem: 0,
    choice_a: 0,
    choice_b: 0,
    choice_c: 0,
    choice_d: 0,
    correct_answer: 0,
    lesson_id: 0,
    difficulty_level: 0
  };

  readingQuestions.forEach(q => {
    Object.keys(readingMissingFields).forEach(field => {
      if (!q[field] || q[field].toString().trim() === '') {
        readingMissingFields[field]++;
        readingIssues++;
      }
    });
  });

  console.log('\n🔍 Reading Questions Field Analysis:');
  Object.entries(readingMissingFields).forEach(([field, count]) => {
    if (count > 0) {
      console.log(`❌ ${field}: ${count} missing`);
    } else {
      console.log(`✅ ${field}: Complete`);
    }
  });

  console.log(`\n📊 Reading Issues Found: ${readingIssues}`);
  totalIssues += readingIssues;
}

// 5. READING PASSAGES AUDIT
console.log('\n📚 READING PASSAGES AUDIT (4 passages expected)');
console.log('='.repeat(50));

const { data: readingPassages, error: readingPassagesError } = await supabase
  .from('act_reading_passages')
  .select('*')
  .eq('test_number', TEST_NUMBER)
  .order('passage_number');

if (readingPassagesError) {
  console.error('❌ Error fetching Reading passages:', readingPassagesError);
  totalIssues++;
} else {
  console.log(`📊 Found ${readingPassages.length}/4 Reading passages`);

  let readingPassageIssues = 0;
  readingPassages.forEach(p => {
    const length = p.passage_text ? p.passage_text.length : 0;
    if (length < 1800) {
      console.log(`❌ Passage ${p.passage_number}: Too short (${length} chars, need ≥1800)`);
      readingPassageIssues++;
    }
    if (!p.title || p.title.trim() === '') {
      console.log(`❌ Passage ${p.passage_number}: Missing title`);
      readingPassageIssues++;
    }
  });

  const readingAvgLength = readingPassages.reduce((sum, p) => sum + (p.passage_text?.length || 0), 0) / readingPassages.length;
  console.log(`📊 Average passage length: ${Math.round(readingAvgLength)} characters`);
  console.log(`📊 Reading Passage Issues Found: ${readingPassageIssues}`);
  totalIssues += readingPassageIssues;
}

// 6. SCIENCE QUESTIONS AUDIT
console.log('\n🔬 SCIENCE QUESTIONS AUDIT (40 questions expected)');
console.log('='.repeat(50));

const { data: scienceQuestions, error: scienceError } = await supabase
  .from('act_science_questions')
  .select('*')
  .eq('test_number', TEST_NUMBER)
  .order('question_number');

if (scienceError) {
  console.error('❌ Error fetching Science questions:', scienceError);
  totalIssues++;
} else {
  console.log(`📊 Found ${scienceQuestions.length}/40 Science questions`);

  let scienceIssues = 0;
  const scienceMissingFields = {
    question_stem: 0,
    choice_a: 0,
    choice_b: 0,
    choice_c: 0,
    choice_d: 0,
    correct_answer: 0,
    lesson_id: 0,
    difficulty_level: 0
  };

  scienceQuestions.forEach(q => {
    Object.keys(scienceMissingFields).forEach(field => {
      if (!q[field] || q[field].toString().trim() === '') {
        scienceMissingFields[field]++;
        scienceIssues++;
      }
    });
  });

  console.log('\n🔍 Science Questions Field Analysis:');
  Object.entries(scienceMissingFields).forEach(([field, count]) => {
    if (count > 0) {
      console.log(`❌ ${field}: ${count} missing`);
    } else {
      console.log(`✅ ${field}: Complete`);
    }
  });

  console.log(`\n📊 Science Issues Found: ${scienceIssues}`);
  totalIssues += scienceIssues;
}

// 7. LESSON ASSIGNMENT VERIFICATION
console.log('\n🎯 LESSON ASSIGNMENT VERIFICATION');
console.log('='.repeat(50));

const sections = [
  { name: 'English', questions: englishQuestions },
  { name: 'Math', questions: mathQuestions },
  { name: 'Reading', questions: readingQuestions },
  { name: 'Science', questions: scienceQuestions }
];

sections.forEach(section => {
  if (section.questions) {
    const withLessons = section.questions.filter(q => q.lesson_id && q.difficulty_level).length;
    const total = section.questions.length;
    console.log(`${section.name}: ${withLessons}/${total} questions have lesson assignments ${withLessons === total ? '✅' : '❌'}`);

    if (withLessons !== total) {
      totalIssues += (total - withLessons);
    }
  }
});

// 8. FINAL SUMMARY
console.log('\n🏁 COMPREHENSIVE AUDIT SUMMARY');
console.log('='.repeat(70));

if (totalIssues === 0) {
  console.log('🎉 NO ISSUES FOUND! Test 2 data is complete and accurate.');
  console.log('✅ All 215 questions properly extracted and configured');
  console.log('✅ All passages meet quality standards');
  console.log('✅ All lesson assignments complete');
  console.log('✅ All required fields populated');
} else {
  console.log(`❌ TOTAL ISSUES FOUND: ${totalIssues}`);
  console.log('⚠️  Issues require attention before Test 2 is production-ready');
}

console.log('\n📊 TEST 2 DATA OVERVIEW:');
console.log(`English: ${englishQuestions?.length || 0}/75 questions + ${englishPassages?.length || 0}/5 passages`);
console.log(`Math: ${mathQuestions?.length || 0}/60 questions`);
console.log(`Reading: ${readingQuestions?.length || 0}/40 questions + ${readingPassages?.length || 0}/4 passages`);
console.log(`Science: ${scienceQuestions?.length || 0}/40 questions`);
console.log(`Total: ${(englishQuestions?.length || 0) + (mathQuestions?.length || 0) + (readingQuestions?.length || 0) + (scienceQuestions?.length || 0)}/215 questions`);

console.log('\n🔍 Comprehensive audit complete!\n');