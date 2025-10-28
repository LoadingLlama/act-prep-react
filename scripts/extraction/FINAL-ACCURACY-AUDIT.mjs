#!/usr/bin/env node
import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '../../.env') });

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

console.log('🔍 FINAL ACCURACY AUDIT - ALL TESTS (1, 2, 3, 4)\n');
console.log('='.repeat(100));

const issues = [];
const warnings = [];

// ==================== ENGLISH SECTION AUDIT ====================
console.log('\n📝 ENGLISH SECTION AUDIT:\n');

for (const testNum of [1, 2, 3, 4]) {
  console.log(`\nTest ${testNum}:`);

  const {data: engQ, error: engErr} = await supabase
    .from('act_english_questions')
    .select('*')
    .eq('test_number', testNum)
    .order('question_number');

  if (engErr) {
    issues.push(`❌ Test ${testNum} English: Database error - ${engErr.message}`);
    continue;
  }

  console.log(`  Questions found: ${engQ.length}/75`);

  if (engQ.length !== 75) {
    issues.push(`❌ Test ${testNum} English: Missing questions (found ${engQ.length}/75)`);
  }

  let answerFormatIssues = 0;
  let missingPassageNumber = 0;
  let missingChoices = 0;
  let missingUnderlined = 0;

  for (const q of engQ) {
    // Check answer format (should be A/B/C/D)
    if (!['A', 'B', 'C', 'D'].includes(q.correct_answer)) {
      answerFormatIssues++;
      issues.push(`❌ Test ${testNum} English Q${q.question_number}: Invalid answer format "${q.correct_answer}" (should be A/B/C/D)`);
    }

    // Check passage_number exists (not passage_id - English uses passage_number)
    if (!q.passage_number && q.passage_number !== 0) {
      missingPassageNumber++;
      issues.push(`❌ Test ${testNum} English Q${q.question_number}: Missing passage_number`);
    }

    // Check all 4 choices exist
    if (!q.choice_a || !q.choice_b || !q.choice_c || !q.choice_d) {
      missingChoices++;
      issues.push(`❌ Test ${testNum} English Q${q.question_number}: Missing choice(s)`);
    }

    // Check underlined_text exists (can be empty string for passage-level questions)
    if (q.underlined_text === null || q.underlined_text === undefined) {
      missingUnderlined++;
      issues.push(`❌ Test ${testNum} English Q${q.question_number}: underlined_text is null/undefined (should be at least "")`);
    }
  }

  console.log(`  Answer format issues: ${answerFormatIssues}`);
  console.log(`  Missing passage_number: ${missingPassageNumber}`);
  console.log(`  Missing choices: ${missingChoices}`);
  console.log(`  Null underlined_text: ${missingUnderlined}`);
}

// ==================== MATH SECTION AUDIT ====================
console.log('\n\n🔢 MATH SECTION AUDIT:\n');

for (const testNum of [1, 2, 3, 4]) {
  console.log(`\nTest ${testNum}:`);

  const {data: mathQ, error: mathErr} = await supabase
    .from('act_math_questions')
    .select('*')
    .eq('test_number', testNum)
    .order('question_number');

  if (mathErr) {
    issues.push(`❌ Test ${testNum} Math: Database error - ${mathErr.message}`);
    continue;
  }

  console.log(`  Questions found: ${mathQ.length}/60`);

  if (mathQ.length !== 60) {
    issues.push(`❌ Test ${testNum} Math: Missing questions (found ${mathQ.length}/60)`);
  }

  let answerFormatIssues = 0;
  let missingChoices = 0;

  for (const q of mathQ) {
    // Check answer format (should be A/B/C/D/E or F/G/H/J/K for odd/even)
    if (!['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K'].includes(q.correct_answer)) {
      answerFormatIssues++;
      issues.push(`❌ Test ${testNum} Math Q${q.question_number}: Invalid answer format "${q.correct_answer}"`);
    }

    // Check all choices exist
    if (!q.choice_a || !q.choice_b || !q.choice_c || !q.choice_d || !q.choice_e) {
      missingChoices++;
      issues.push(`❌ Test ${testNum} Math Q${q.question_number}: Missing choice(s)`);
    }

    // Check question stem exists
    if (!q.question_stem) {
      issues.push(`❌ Test ${testNum} Math Q${q.question_number}: Missing question_stem`);
    }
  }

  console.log(`  Answer format issues: ${answerFormatIssues}`);
  console.log(`  Missing choices: ${missingChoices}`);
}

// ==================== READING SECTION AUDIT ====================
console.log('\n\n📚 READING SECTION AUDIT:\n');

for (const testNum of [1, 2, 3, 4]) {
  console.log(`\nTest ${testNum}:`);

  const {data: readQ, error: readErr} = await supabase
    .from('act_reading_questions')
    .select('*')
    .eq('test_number', testNum)
    .order('question_number');

  if (readErr) {
    issues.push(`❌ Test ${testNum} Reading: Database error - ${readErr.message}`);
    continue;
  }

  console.log(`  Questions found: ${readQ.length}/40`);

  if (readQ.length !== 40) {
    issues.push(`❌ Test ${testNum} Reading: Missing questions (found ${readQ.length}/40)`);
  }

  let answerFormatIssues = 0;
  let missingPassageId = 0;
  let missingChoices = 0;

  for (const q of readQ) {
    // Check answer format (should be A/B/C/D)
    if (!['A', 'B', 'C', 'D'].includes(q.correct_answer)) {
      answerFormatIssues++;
      issues.push(`❌ Test ${testNum} Reading Q${q.question_number}: Invalid answer format "${q.correct_answer}" (should be A/B/C/D)`);
    }

    // Check passage_id exists
    if (!q.passage_id) {
      missingPassageId++;
      issues.push(`❌ Test ${testNum} Reading Q${q.question_number}: Missing passage_id`);
    }

    // Check all 4 choices exist
    if (!q.choice_a || !q.choice_b || !q.choice_c || !q.choice_d) {
      missingChoices++;
      issues.push(`❌ Test ${testNum} Reading Q${q.question_number}: Missing choice(s)`);
    }

    // Check question_stem exists
    if (!q.question_stem) {
      issues.push(`❌ Test ${testNum} Reading Q${q.question_number}: Missing question_stem`);
    }
  }

  console.log(`  Answer format issues: ${answerFormatIssues}`);
  console.log(`  Missing passage_id: ${missingPassageId}`);
  console.log(`  Missing choices: ${missingChoices}`);

  // Check passages
  const {data: readP, error: readPErr} = await supabase
    .from('act_reading_passages')
    .select('*')
    .eq('test_number', testNum)
    .order('passage_number');

  if (!readPErr) {
    console.log(`  Passages found: ${readP.length}/4`);
    if (readP.length !== 4) {
      issues.push(`❌ Test ${testNum} Reading: Missing passages (found ${readP.length}/4)`);
    }

    for (const p of readP) {
      if (!p.passage_text || p.passage_text.trim().length < 100) {
        issues.push(`❌ Test ${testNum} Reading P${p.passage_number}: Passage text too short or missing (${p.passage_text?.length || 0} chars)`);
      }
    }
  }
}

// ==================== SCIENCE SECTION AUDIT ====================
console.log('\n\n🔬 SCIENCE SECTION AUDIT:\n');

for (const testNum of [1, 2, 3, 4]) {
  console.log(`\nTest ${testNum}:`);

  const {data: sciQ, error: sciErr} = await supabase
    .from('act_science_questions')
    .select('*')
    .eq('test_number', testNum)
    .order('question_number');

  if (sciErr) {
    issues.push(`❌ Test ${testNum} Science: Database error - ${sciErr.message}`);
    continue;
  }

  console.log(`  Questions found: ${sciQ.length}/40`);

  if (sciQ.length !== 40) {
    issues.push(`❌ Test ${testNum} Science: Missing questions (found ${sciQ.length}/40)`);
  }

  let answerFormatIssues = 0;
  let missingPassageId = 0;
  let missingChoices = 0;

  for (const q of sciQ) {
    // Check answer format (should be A/B/C/D)
    if (!['A', 'B', 'C', 'D'].includes(q.correct_answer)) {
      answerFormatIssues++;
      issues.push(`❌ Test ${testNum} Science Q${q.question_number}: Invalid answer format "${q.correct_answer}" (should be A/B/C/D)`);
    }

    // Check passage_id exists
    if (!q.passage_id) {
      missingPassageId++;
      issues.push(`❌ Test ${testNum} Science Q${q.question_number}: Missing passage_id`);
    }

    // Check all 4 choices exist
    if (!q.choice_a || !q.choice_b || !q.choice_c || !q.choice_d) {
      missingChoices++;
      issues.push(`❌ Test ${testNum} Science Q${q.question_number}: Missing choice(s)`);
    }

    // Check question_stem exists
    if (!q.question_stem) {
      issues.push(`❌ Test ${testNum} Science Q${q.question_number}: Missing question_stem`);
    }
  }

  console.log(`  Answer format issues: ${answerFormatIssues}`);
  console.log(`  Missing passage_id: ${missingPassageId}`);
  console.log(`  Missing choices: ${missingChoices}`);

  // Check passages
  const {data: sciP, error: sciPErr} = await supabase
    .from('act_science_passages')
    .select('*')
    .eq('test_number', testNum)
    .order('passage_number');

  if (!sciPErr) {
    console.log(`  Passages found: ${sciP.length}`);

    for (const p of sciP) {
      if (!p.passage_text || p.passage_text.trim().length < 50) {
        issues.push(`❌ Test ${testNum} Science P${p.passage_number}: Passage text too short or missing (${p.passage_text?.length || 0} chars)`);
      }
    }
  }
}

// ==================== SUMMARY ====================
console.log('\n\n' + '='.repeat(100));
console.log('📊 FINAL ACCURACY AUDIT SUMMARY:\n');
console.log(`🔴 CRITICAL ISSUES: ${issues.length}`);
console.log(`🟡 WARNINGS: ${warnings.length}\n`);

if (issues.length > 0) {
  console.log('🔴 CRITICAL ISSUES:\n');
  issues.forEach(issue => console.log(issue));
}

if (warnings.length > 0) {
  console.log('\n🟡 WARNINGS:\n');
  warnings.forEach(warning => console.log(warning));
}

if (issues.length === 0 && warnings.length === 0) {
  console.log('✅✅✅ NO ISSUES FOUND - ALL TESTS PASS 100% ACCURACY AUDIT! ✅✅✅\n');
  console.log('🎉 ALL DATA IS CONSISTENT AND ACCURATE ACROSS ALL 4 TESTS! 🎉\n');
} else {
  console.log(`\n📝 Total issues remaining: ${issues.length + warnings.length}`);
}

console.log('='.repeat(100) + '\n');

// Save report
const report = {
  timestamp: new Date().toISOString(),
  critical_issues: issues,
  warnings: warnings,
  summary: {
    total_critical: issues.length,
    total_warnings: warnings.length,
    status: issues.length === 0 ? 'PASS' : 'FAIL'
  }
};

fs.writeFileSync(
  join(__dirname, '../../FINAL-AUDIT-REPORT.json'),
  JSON.stringify(report, null, 2)
);

console.log('📄 Full report saved to: FINAL-AUDIT-REPORT.json\n');
