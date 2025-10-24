#!/usr/bin/env node

import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '../../.env') });

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

console.log('🔍 Validating Test 1 Extraction...\n');

// Get all questions for Test 1
const { data: questions, error } = await supabase
  .from('act_questions')
  .select('*')
  .eq('test_number', 1)
  .order('section')
  .order('question_number');

if (error) {
  console.error('❌ Error:', error);
  process.exit(1);
}

console.log(`✅ Total questions extracted: ${questions.length}/215\n`);

// Count by section
const sections = {
  E: { name: 'English', expected: 75, actual: 0 },
  M: { name: 'Math', expected: 60, actual: 0 },
  R: { name: 'Reading', expected: 40, actual: 0 },
  S: { name: 'Science', expected: 40, actual: 0 }
};

questions.forEach(q => {
  if (sections[q.section]) {
    sections[q.section].actual++;
  }
});

console.log('📊 Breakdown by section:');
for (const [key, sec] of Object.entries(sections)) {
  const status = sec.actual === sec.expected ? '✅' : '❌';
  console.log(`  ${status} ${sec.name} (${key}): ${sec.actual}/${sec.expected}`);
}

// Check for missing question numbers
console.log('\n🔎 Checking for gaps...');
let gaps = [];
for (const [key, sec] of Object.entries(sections)) {
  const sectionQuestions = questions.filter(q => q.section === key);
  const nums = sectionQuestions.map(q => q.question_number).sort((a, b) => a - b);

  for (let i = 1; i <= sec.expected; i++) {
    if (!nums.includes(i)) {
      gaps.push(`${sec.name} Q${i}`);
    }
  }
}

if (gaps.length === 0) {
  console.log('  ✅ No gaps found - all question numbers present!');
} else {
  console.log(`  ❌ Missing questions: ${gaps.join(', ')}`);
}

// Check for required fields
console.log('\n📝 Checking data quality...');
let issues = [];
questions.forEach(q => {
  if (!q.question_stem || q.question_stem.trim() === '') {
    issues.push(`Q${q.question_number} (${sections[q.section]?.name}): Missing question_stem`);
  }
  if (!q.correct_answer || q.correct_answer.trim() === '') {
    issues.push(`Q${q.question_number} (${sections[q.section]?.name}): Missing correct_answer`);
  }
  if (!q.choice_a && q.section !== 'R' && q.section !== 'S') {
    issues.push(`Q${q.question_number} (${sections[q.section]?.name}): Missing choice_a`);
  }
});

if (issues.length === 0) {
  console.log('  ✅ All questions have required fields!');
} else {
  console.log(`  ⚠️  Issues found:`);
  issues.slice(0, 10).forEach(issue => console.log(`     - ${issue}`));
  if (issues.length > 10) {
    console.log(`     ... and ${issues.length - 10} more`);
  }
}

// Sample questions
console.log('\n📋 Sample questions:');
const samples = [
  questions.find(q => q.section === 'E' && q.question_number === 1),
  questions.find(q => q.section === 'M' && q.question_number === 1),
  questions.find(q => q.section === 'R' && q.question_number === 1),
  questions.find(q => q.section === 'S' && q.question_number === 1)
];

samples.forEach(q => {
  if (q) {
    console.log(`\n  ${sections[q.section].name} Q${q.question_number}:`);
    console.log(`    Stem: ${q.question_stem.substring(0, 80)}...`);
    console.log(`    Answer: ${q.correct_answer}`);
    console.log(`    Type: ${q.question_type || 'N/A'}`);
  }
});

console.log('\n' + '='.repeat(60));
if (questions.length === 215 && gaps.length === 0 && issues.length === 0) {
  console.log('🎉 TEST 1 VALIDATION COMPLETE - ALL CHECKS PASSED! 🎉');
} else {
  console.log('⚠️  VALIDATION COMPLETE - SOME ISSUES FOUND');
}
console.log('='.repeat(60));
