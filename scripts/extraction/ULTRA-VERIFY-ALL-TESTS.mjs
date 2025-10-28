#!/usr/bin/env node

/**
 * ULTRA-DEEP VERIFICATION FOR ALL TESTS (1-5)
 * Extremely nitpicky format consistency check across all tests
 * For deep analytical pattern analysis readiness
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

console.log('🔍 ULTRA-DEEP VERIFICATION - ALL TESTS (1-5)\n');
console.log('Checking EVERY detail for 100% format consistency');
console.log('Preparing for deep analytical pattern analysis\n');
console.log('='.repeat(80));

const allIssues = {};
const allWarnings = {};
const testStats = {};

for (let testNum = 1; testNum <= 5; testNum++) {
  allIssues[testNum] = [];
  allWarnings[testNum] = [];
  testStats[testNum] = {
    english: { questions: 0, passages: 0, withUTags: 0 },
    math: { questions: 0 },
    reading: { questions: 0, passages: 0 },
    science: { questions: 0, passages: 0 }
  };
}

// ============================================================================
// CHECK EACH TEST
// ============================================================================

for (let testNum = 1; testNum <= 5; testNum++) {
  console.log(`\n${'='.repeat(80)}`);
  console.log(`\n📋 TEST ${testNum} VERIFICATION\n`);

  const issues = allIssues[testNum];
  const warnings = allWarnings[testNum];
  const stats = testStats[testNum];

  // -------------------------------------------------------------------------
  // ENGLISH SECTION
  // -------------------------------------------------------------------------
  console.log(`  📝 English:`);

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

  stats.english.questions = engQ?.length || 0;
  stats.english.passages = engP?.length || 0;

  console.log(`     Questions: ${stats.english.questions}/75`);
  console.log(`     Passages: ${stats.english.passages}/5`);

  if (stats.english.questions !== 75) {
    issues.push(`❌ English: Only ${stats.english.questions}/75 questions`);
  }

  if (stats.english.passages !== 5) {
    issues.push(`❌ English: Only ${stats.english.passages}/5 passages`);
  }

  // Check <u> tags
  for (const q of engQ || []) {
    if (q.question_stem.includes('<u>') && q.question_stem.includes('</u>')) {
      stats.english.withUTags++;

      // Verify underlined_text is in question_stem with tags
      if (q.underlined_text) {
        const expectedFormat = `<u>${q.underlined_text}</u>`;
        if (!q.question_stem.includes(expectedFormat)) {
          issues.push(`❌ T${testNum} Eng Q${q.question_number}: underlined_text not properly tagged in stem`);
        }
      }
    }

    // Check all fields present
    if (!q.choice_a || !q.choice_b || !q.choice_c || !q.choice_d) {
      issues.push(`❌ T${testNum} Eng Q${q.question_number}: Missing choice(s)`);
    }

    // Check question_stem not empty
    if (!q.question_stem || q.question_stem.length < 5) {
      issues.push(`❌ T${testNum} Eng Q${q.question_number}: question_stem too short`);
    }

    // Check passage_number valid
    const expectedPassage = Math.ceil(q.question_number / 15);
    if (q.passage_number !== expectedPassage) {
      issues.push(`❌ T${testNum} Eng Q${q.question_number}: passage_number=${q.passage_number}, expected ${expectedPassage}`);
    }
  }

  console.log(`     With <u> tags: ${stats.english.withUTags}/${stats.english.questions}`);

  // Check passages
  for (const p of engP || []) {
    if (!p.title) {
      issues.push(`❌ T${testNum} Eng Passage ${p.passage_number}: Missing title`);
    }
    if (!p.passage_text || p.passage_text.length < 50) {
      issues.push(`❌ T${testNum} Eng Passage ${p.passage_number}: passage_text too short`);
    }
  }

  // -------------------------------------------------------------------------
  // MATH SECTION
  // -------------------------------------------------------------------------
  console.log(`  🔢 Math:`);

  const { data: mathQ } = await supabase
    .from('act_math_questions')
    .select('*')
    .eq('test_number', testNum)
    .order('question_number');

  stats.math.questions = mathQ?.length || 0;

  console.log(`     Questions: ${stats.math.questions}/60`);

  if (stats.math.questions !== 60) {
    issues.push(`❌ Math: Only ${stats.math.questions}/60 questions`);
  }

  for (const q of mathQ || []) {
    // Check all 5 choices
    if (!q.choice_a || !q.choice_b || !q.choice_c || !q.choice_d || !q.choice_e) {
      issues.push(`❌ T${testNum} Math Q${q.question_number}: Missing choice(s)`);
    }

    if (!q.question_stem || q.question_stem.length < 5) {
      issues.push(`❌ T${testNum} Math Q${q.question_number}: question_stem too short`);
    }
  }

  // -------------------------------------------------------------------------
  // READING SECTION
  // -------------------------------------------------------------------------
  console.log(`  📖 Reading:`);

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

  stats.reading.questions = readQ?.length || 0;
  stats.reading.passages = readP?.length || 0;

  console.log(`     Questions: ${stats.reading.questions}/40`);
  console.log(`     Passages: ${stats.reading.passages}/4`);

  if (stats.reading.questions !== 40) {
    issues.push(`❌ Reading: Only ${stats.reading.questions}/40 questions`);
  }

  if (stats.reading.passages !== 4) {
    issues.push(`❌ Reading: Only ${stats.reading.passages}/4 passages`);
  }

  // Check passage types - verify all are valid ACT types
  const validTypes = ['LITERARY NARRATIVE', 'SOCIAL_SCIENCE', 'HUMANITIES', 'NATURAL_SCIENCE'];
  const foundTypes = readP?.map(p => p.passage_type) || [];

  for (const p of readP || []) {
    if (!validTypes.includes(p.passage_type)) {
      issues.push(`❌ T${testNum} Reading P${p.passage_number}: Invalid passage_type "${p.passage_type}"`);
    }
  }

  // Note: Not all tests have all 4 types - some tests may have duplicate types (e.g., paired passages)

  for (const q of readQ || []) {
    // Check passage linkage
    if (!q.passage_id) {
      issues.push(`❌ T${testNum} Reading Q${q.question_number}: No passage_id`);
    }

    // Check 4 choices
    if (!q.choice_a || !q.choice_b || !q.choice_c || !q.choice_d) {
      issues.push(`❌ T${testNum} Reading Q${q.question_number}: Missing choice(s)`);
    }
  }

  for (const p of readP || []) {
    if (!p.title) {
      issues.push(`❌ T${testNum} Reading Passage ${p.passage_number}: Missing title`);
    }
    if (!p.passage_text || p.passage_text.length < 300) {
      issues.push(`❌ T${testNum} Reading Passage ${p.passage_number}: passage_text too short`);
    }
    if (!p.passage_type) {
      issues.push(`❌ T${testNum} Reading Passage ${p.passage_number}: Missing passage_type`);
    }
  }

  // -------------------------------------------------------------------------
  // SCIENCE SECTION
  // -------------------------------------------------------------------------
  console.log(`  🔬 Science:`);

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

  stats.science.questions = sciQ?.length || 0;
  stats.science.passages = sciP?.length || 0;

  console.log(`     Questions: ${stats.science.questions}/40`);
  console.log(`     Passages: ${stats.science.passages}/6-7`);

  if (stats.science.questions !== 40) {
    issues.push(`❌ Science: Only ${stats.science.questions}/40 questions`);
  }

  if (stats.science.passages < 6 || stats.science.passages > 7) {
    warnings.push(`⚠️  Science: ${stats.science.passages} passages (expected 6-7)`);
  }

  // Check passage types
  const validSciTypes = ['DATA_REPRESENTATION', 'RESEARCH_SUMMARY', 'CONFLICTING_VIEWPOINTS'];
  for (const p of sciP || []) {
    if (!validSciTypes.includes(p.passage_type)) {
      issues.push(`❌ T${testNum} Science Passage ${p.passage_number}: Invalid passage_type "${p.passage_type}"`);
    }
    if (!p.passage_text || p.passage_text.length < 50) {
      issues.push(`❌ T${testNum} Science Passage ${p.passage_number}: passage_text too short`);
    }
  }

  for (const q of sciQ || []) {
    if (!q.passage_id) {
      issues.push(`❌ T${testNum} Science Q${q.question_number}: No passage_id`);
    }

    if (!q.choice_a || !q.choice_b || !q.choice_c || !q.choice_d) {
      issues.push(`❌ T${testNum} Science Q${q.question_number}: Missing choice(s)`);
    }
  }

  console.log(`\n  Test ${testNum} Status: ${issues.length} issues, ${warnings.length} warnings`);
}

// ============================================================================
// CROSS-TEST COMPARISON
// ============================================================================

console.log(`\n${'='.repeat(80)}`);
console.log(`\n📊 CROSS-TEST COMPARISON\n`);

console.log('English <u> tag counts:');
for (let t = 1; t <= 5; t++) {
  console.log(`  Test ${t}: ${testStats[t].english.withUTags}/${testStats[t].english.questions}`);
}

// Check consistency
const engUTagCounts = [1,2,3,4,5].map(t => testStats[t].english.withUTags);
const minU = Math.min(...engUTagCounts);
const maxU = Math.max(...engUTagCounts);

if (maxU - minU > 20) {
  allWarnings[1].push(`⚠️  CROSS-TEST: Large variation in <u> tag counts (${minU} to ${maxU})`);
}

// ============================================================================
// GENERATE REPORT
// ============================================================================

console.log(`\n${'='.repeat(80)}`);
console.log('\n📋 FINAL VERIFICATION REPORT\n');

let totalIssues = 0;
let totalWarnings = 0;

for (let t = 1; t <= 5; t++) {
  const issues = allIssues[t];
  const warnings = allWarnings[t];

  console.log(`\nTEST ${t}:`);
  console.log(`  Questions: ${testStats[t].english.questions + testStats[t].math.questions + testStats[t].reading.questions + testStats[t].science.questions}/215`);
  console.log(`  Passages: ${testStats[t].english.passages + testStats[t].reading.passages + testStats[t].science.passages}/15-16`);
  console.log(`  Issues: ${issues.length}`);
  console.log(`  Warnings: ${warnings.length}`);

  totalIssues += issues.length;
  totalWarnings += warnings.length;

  if (issues.length > 0) {
    console.log(`\n  🔴 Issues for Test ${t}:`);
    for (const issue of issues.slice(0, 10)) {
      console.log(`    ${issue}`);
    }
    if (issues.length > 10) {
      console.log(`    ... and ${issues.length - 10} more`);
    }
  }
}

console.log(`\n${'='.repeat(80)}`);
console.log(`\n🎯 OVERALL SUMMARY:`);
console.log(`  Total Issues: ${totalIssues}`);
console.log(`  Total Warnings: ${totalWarnings}`);

// Save detailed report
const reportPath = join(__dirname, '../../ULTRA-VERIFICATION-REPORT.json');
fs.writeFileSync(reportPath, JSON.stringify({
  timestamp: new Date().toISOString(),
  totalIssues,
  totalWarnings,
  testStats,
  allIssues,
  allWarnings
}, null, 2));

console.log(`\n📄 Detailed report saved: ULTRA-VERIFICATION-REPORT.json`);

console.log(`\n${'='.repeat(80)}\n`);

if (totalIssues === 0 && totalWarnings === 0) {
  console.log('✅✅✅ PERFECT! ALL TESTS HAVE 100% FORMAT CONSISTENCY! ✅✅✅\n');
  console.log('Ready for deep analytical pattern analysis\n');
  process.exit(0);
} else if (totalIssues === 0) {
  console.log(`✅ NO CRITICAL ISSUES - ${totalWarnings} warnings to review\n`);
  process.exit(0);
} else {
  console.log(`❌ FOUND ${totalIssues} CRITICAL ISSUES across all tests\n`);
  console.log('Review and fix before production\n');
  process.exit(1);
}
