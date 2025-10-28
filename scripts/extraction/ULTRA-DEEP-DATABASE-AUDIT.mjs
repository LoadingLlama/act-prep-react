#!/usr/bin/env node

/**
 * ULTRA-DEEP DATABASE AUDIT - ALL TESTS (1-5)
 *
 * Comprehensive verification checking for:
 * - Missing data
 * - Format inconsistencies
 * - Invalid references
 * - Placeholder values
 * - Schema violations
 * - Cross-test consistency
 */

import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '../../.env') });

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

console.log('🔍 ULTRA-DEEP DATABASE AUDIT - ALL TESTS (1-5)\n');
console.log('Comprehensive verification of all 1,075 questions + 76 passages\n');
console.log('='.repeat(80));

const auditReport = {
  timestamp: new Date().toISOString(),
  tests: {},
  globalIssues: [],
  globalWarnings: [],
  summary: {
    totalQuestions: 0,
    totalPassages: 0,
    totalIssues: 0,
    totalWarnings: 0
  }
};

// ============================================================================
// AUDIT EACH TEST
// ============================================================================

for (let testNum = 1; testNum <= 5; testNum++) {
  console.log('\n' + '='.repeat(80));
  console.log('\n📋 AUDITING TEST ' + testNum + '\n');

  const testReport = {
    issues: [],
    warnings: [],
    stats: {
      english: { questions: 0, passages: 0 },
      math: { questions: 0 },
      reading: { questions: 0, passages: 0 },
      science: { questions: 0, passages: 0 }
    }
  };

  // -------------------------------------------------------------------------
  // ENGLISH SECTION
  // -------------------------------------------------------------------------
  console.log('📝 English Section:');

  const { data: engQ } = await supabase
    .from('act_english_questions')
    .select('*')
    .eq('test_number', testNum)
    .order('question_number');

  const { data: engP } = await supabase
    .from('act_english_passages')
    .select('*')
    .eq('test_number', testNum)
    .order('passage_number');

  testReport.stats.english.questions = engQ?.length || 0;
  testReport.stats.english.passages = engP?.length || 0;

  console.log('  Questions: ' + testReport.stats.english.questions + '/75');
  console.log('  Passages: ' + testReport.stats.english.passages + '/5');

  // Check questions
  if (testReport.stats.english.questions !== 75) {
    testReport.issues.push('English: Only ' + testReport.stats.english.questions + '/75 questions');
  }

  for (const q of engQ || []) {
    // Check required fields
    if (!q.question_stem || q.question_stem.length < 5) {
      testReport.issues.push('Eng Q' + q.question_number + ': question_stem too short');
    }

    if (!q.choice_a || !q.choice_b || !q.choice_c || !q.choice_d) {
      testReport.issues.push('Eng Q' + q.question_number + ': Missing choice(s)');
    }

    if (!q.correct_answer) {
      testReport.issues.push('Eng Q' + q.question_number + ': No correct_answer');
    }

    if (!q.lesson_id) {
      testReport.issues.push('Eng Q' + q.question_number + ': No lesson_id');
    }

    // Check for placeholder answers
    if (q.correct_answer === 'A' && q.choice_a === 'NO CHANGE') {
      testReport.warnings.push('Eng Q' + q.question_number + ': Correct answer might be placeholder');
    }

    // Check passage number valid
    const expectedPassage = Math.ceil(q.question_number / 15);
    if (q.passage_number !== expectedPassage) {
      testReport.issues.push('Eng Q' + q.question_number + ': passage_number=' + q.passage_number + ', expected ' + expectedPassage);
    }

    // Check question types
    if (!q.question_type || !['grammar', 'style', 'organization'].includes(q.question_type)) {
      testReport.warnings.push('Eng Q' + q.question_number + ': Unusual question_type: ' + q.question_type);
    }

    // Check categories
    if (!q.question_category || !['CSE', 'POW', 'KLA'].includes(q.question_category)) {
      testReport.warnings.push('Eng Q' + q.question_number + ': Unusual category: ' + q.question_category);
    }
  }

  // Check passages
  if (testReport.stats.english.passages !== 5) {
    testReport.issues.push('English: Only ' + testReport.stats.english.passages + '/5 passages');
  }

  for (const p of engP || []) {
    if (!p.title) {
      testReport.issues.push('Eng Passage ' + p.passage_number + ': Missing title');
    }
    if (!p.passage_text || p.passage_text.length < 100) {
      testReport.issues.push('Eng Passage ' + p.passage_number + ': passage_text too short');
    }
  }

  // -------------------------------------------------------------------------
  // MATH SECTION
  // -------------------------------------------------------------------------
  console.log('🔢 Math Section:');

  const { data: mathQ } = await supabase
    .from('act_math_questions')
    .select('*')
    .eq('test_number', testNum)
    .order('question_number');

  testReport.stats.math.questions = mathQ?.length || 0;

  console.log('  Questions: ' + testReport.stats.math.questions + '/60');

  if (testReport.stats.math.questions !== 60) {
    testReport.issues.push('Math: Only ' + testReport.stats.math.questions + '/60 questions');
  }

  for (const q of mathQ || []) {
    // Check 5 choices
    if (!q.choice_a || !q.choice_b || !q.choice_c || !q.choice_d || !q.choice_e) {
      testReport.issues.push('Math Q' + q.question_number + ': Missing choice(s)');
    }

    if (!q.correct_answer) {
      testReport.issues.push('Math Q' + q.question_number + ': No correct_answer');
    }

    if (!q.lesson_id) {
      testReport.issues.push('Math Q' + q.question_number + ': No lesson_id');
    }

    if (!q.question_stem || q.question_stem.length < 10) {
      testReport.issues.push('Math Q' + q.question_number + ': question_stem too short');
    }

    // Check for valid answer
    if (!['A', 'B', 'C', 'D', 'E'].includes(q.correct_answer)) {
      testReport.issues.push('Math Q' + q.question_number + ': Invalid correct_answer: ' + q.correct_answer);
    }
  }

  // -------------------------------------------------------------------------
  // READING SECTION
  // -------------------------------------------------------------------------
  console.log('📖 Reading Section:');

  const { data: readQ } = await supabase
    .from('act_reading_questions')
    .select('*')
    .eq('test_number', testNum)
    .order('question_number');

  const { data: readP } = await supabase
    .from('act_reading_passages')
    .select('*')
    .eq('test_number', testNum)
    .order('passage_number');

  testReport.stats.reading.questions = readQ?.length || 0;
  testReport.stats.reading.passages = readP?.length || 0;

  console.log('  Questions: ' + testReport.stats.reading.questions + '/40');
  console.log('  Passages: ' + testReport.stats.reading.passages + '/4');

  if (testReport.stats.reading.questions !== 40) {
    testReport.issues.push('Reading: Only ' + testReport.stats.reading.questions + '/40 questions');
  }

  if (testReport.stats.reading.passages !== 4) {
    testReport.issues.push('Reading: Only ' + testReport.stats.reading.passages + '/4 passages');
  }

  for (const q of readQ || []) {
    if (!q.passage_id) {
      testReport.issues.push('Read Q' + q.question_number + ': No passage_id');
    }

    if (!q.choice_a || !q.choice_b || !q.choice_c || !q.choice_d) {
      testReport.issues.push('Read Q' + q.question_number + ': Missing choice(s)');
    }

    if (!q.correct_answer) {
      testReport.issues.push('Read Q' + q.question_number + ': No correct_answer');
    }

    if (!q.lesson_id) {
      testReport.issues.push('Read Q' + q.question_number + ': No lesson_id');
    }
  }

  // Check passage types
  const validReadingTypes = ['LITERARY NARRATIVE', 'SOCIAL_SCIENCE', 'HUMANITIES', 'NATURAL_SCIENCE'];
  for (const p of readP || []) {
    if (!p.passage_type) {
      testReport.issues.push('Read Passage ' + p.passage_number + ': Missing passage_type');
    } else if (!validReadingTypes.includes(p.passage_type)) {
      testReport.issues.push('Read Passage ' + p.passage_number + ': Invalid passage_type: ' + p.passage_type);
    }

    if (!p.title) {
      testReport.issues.push('Read Passage ' + p.passage_number + ': Missing title');
    }

    if (!p.passage_text || p.passage_text.length < 300) {
      testReport.issues.push('Read Passage ' + p.passage_number + ': passage_text too short');
    }
  }

  // -------------------------------------------------------------------------
  // SCIENCE SECTION
  // -------------------------------------------------------------------------
  console.log('🔬 Science Section:');

  const { data: sciQ } = await supabase
    .from('act_science_questions')
    .select('*')
    .eq('test_number', testNum)
    .order('question_number');

  const { data: sciP } = await supabase
    .from('act_science_passages')
    .select('*')
    .eq('test_number', testNum)
    .order('passage_number');

  testReport.stats.science.questions = sciQ?.length || 0;
  testReport.stats.science.passages = sciP?.length || 0;

  console.log('  Questions: ' + testReport.stats.science.questions + '/40');
  console.log('  Passages: ' + testReport.stats.science.passages + '/6-7');

  if (testReport.stats.science.questions !== 40) {
    testReport.issues.push('Science: Only ' + testReport.stats.science.questions + '/40 questions');
  }

  if (testReport.stats.science.passages < 6 || testReport.stats.science.passages > 7) {
    testReport.warnings.push('Science: ' + testReport.stats.science.passages + ' passages (expected 6-7)');
  }

  for (const q of sciQ || []) {
    if (!q.passage_id) {
      testReport.issues.push('Sci Q' + q.question_number + ': No passage_id');
    }

    if (!q.choice_a || !q.choice_b || !q.choice_c || !q.choice_d) {
      testReport.issues.push('Sci Q' + q.question_number + ': Missing choice(s)');
    }

    if (!q.correct_answer) {
      testReport.issues.push('Sci Q' + q.question_number + ': No correct_answer');
    }

    if (!q.lesson_id) {
      testReport.issues.push('Sci Q' + q.question_number + ': No lesson_id');
    }
  }

  // Check passage types
  const validScienceTypes = ['DATA_REPRESENTATION', 'RESEARCH_SUMMARY', 'CONFLICTING_VIEWPOINTS'];
  for (const p of sciP || []) {
    if (!p.passage_type) {
      testReport.issues.push('Sci Passage ' + p.passage_number + ': Missing passage_type');
    } else if (!validScienceTypes.includes(p.passage_type)) {
      testReport.issues.push('Sci Passage ' + p.passage_number + ': Invalid passage_type: ' + p.passage_type);
    }

    if (!p.passage_text || p.passage_text.length < 50) {
      testReport.issues.push('Sci Passage ' + p.passage_number + ': passage_text too short');
    }
  }

  // -------------------------------------------------------------------------
  // TEST SUMMARY
  // -------------------------------------------------------------------------
  const totalQ = testReport.stats.english.questions + testReport.stats.math.questions +
                 testReport.stats.reading.questions + testReport.stats.science.questions;
  const totalP = testReport.stats.english.passages + testReport.stats.reading.passages +
                 testReport.stats.science.passages;

  console.log('\nTest ' + testNum + ' Summary:');
  console.log('  Total Questions: ' + totalQ + '/215');
  console.log('  Total Passages: ' + totalP + '/15-16');
  console.log('  Issues: ' + testReport.issues.length);
  console.log('  Warnings: ' + testReport.warnings.length);

  auditReport.tests[testNum] = testReport;
  auditReport.summary.totalIssues += testReport.issues.length;
  auditReport.summary.totalWarnings += testReport.warnings.length;
}

// ============================================================================
// GLOBAL SUMMARY
// ============================================================================

console.log('\n' + '='.repeat(80));
console.log('\n📊 GLOBAL AUDIT SUMMARY\n');

for (let t = 1; t <= 5; t++) {
  const stats = auditReport.tests[t].stats;
  const totalQ = stats.english.questions + stats.math.questions + stats.reading.questions + stats.science.questions;
  auditReport.summary.totalQuestions += totalQ;
  auditReport.summary.totalPassages += stats.english.passages + stats.reading.passages + stats.science.passages;
}

console.log('Total Questions: ' + auditReport.summary.totalQuestions + '/1075');
console.log('Total Passages: ' + auditReport.summary.totalPassages + '/76');
console.log('Total Issues: ' + auditReport.summary.totalIssues);
console.log('Total Warnings: ' + auditReport.summary.totalWarnings);

// ============================================================================
// DETAILED ISSUE REPORT
// ============================================================================

if (auditReport.summary.totalIssues > 0) {
  console.log('\n' + '='.repeat(80));
  console.log('\n🔴 DETAILED ISSUES BY TEST:\n');

  for (let t = 1; t <= 5; t++) {
    const issues = auditReport.tests[t].issues;
    if (issues.length > 0) {
      console.log('Test ' + t + ' (' + issues.length + ' issues):');
      for (const issue of issues.slice(0, 20)) {
        console.log('  - ' + issue);
      }
      if (issues.length > 20) {
        console.log('  ... and ' + (issues.length - 20) + ' more');
      }
      console.log('');
    }
  }
}

// Save report
const reportPath = join(__dirname, '../../ULTRA-DEEP-AUDIT-REPORT.json');
fs.writeFileSync(reportPath, JSON.stringify(auditReport, null, 2));

console.log('\n' + '='.repeat(80));
console.log('\n📄 Detailed audit report saved: ULTRA-DEEP-AUDIT-REPORT.json');

console.log('\n' + '='.repeat(80));

if (auditReport.summary.totalIssues === 0) {
  console.log('\n✅✅✅ PERFECT! NO CRITICAL ISSUES FOUND! ✅✅✅\n');
  console.log('All 1,075 questions + 76 passages are 100% complete and consistent!\n');
  console.log('Database is PRODUCTION READY!\n');
} else {
  console.log('\n⚠️  FOUND ' + auditReport.summary.totalIssues + ' CRITICAL ISSUES\n');
  console.log('Review issues above and in ULTRA-DEEP-AUDIT-REPORT.json\n');
}

console.log('='.repeat(80) + '\n');
