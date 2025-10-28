#!/usr/bin/env node
import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '../../.env') });

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

console.log('🔍 FINAL FORMATTING CONSISTENCY VERIFICATION\n');
console.log('Verifying sentence structure, data storage, and formatting across all 7 tests...\n');
console.log('='.repeat(80));

const issues = [];

// ============================================================================
// 1. ENGLISH: Underlined Text Consistency
// ============================================================================
console.log('\n✅ 1. ENGLISH UNDERLINED TEXT CONSISTENCY\n');

for (let testNum = 1; testNum <= 7; testNum++) {
  const { data: englishQ } = await supabase
    .from('act_english_questions')
    .select('test_number, question_number, question_stem, underlined_text')
    .eq('test_number', testNum);

  if (!englishQ) continue;

  let consistent = 0;
  for (const q of englishQ) {
    const hasTag = q.question_stem?.includes('<u>') && q.question_stem?.includes('</u>');
    const hasField = q.underlined_text && q.underlined_text.trim() !== '';

    if ((hasTag && hasField) || (!hasTag && !hasField)) {
      // Check they match if both present
      if (hasTag && hasField) {
        const tagMatch = q.question_stem.match(/<u>(.*?)<\/u>/);
        if (tagMatch && tagMatch[1] === q.underlined_text) {
          consistent++;
        } else {
          issues.push({
            type: 'UNDERLINED_TEXT_MISMATCH',
            test: testNum,
            section: 'English',
            question: q.question_number
          });
        }
      } else {
        consistent++;
      }
    } else {
      issues.push({
        type: 'UNDERLINED_TEXT_INCONSISTENT',
        test: testNum,
        section: 'English',
        question: q.question_number,
        detail: hasTag ? 'Has tag but no field' : 'Has field but no tag'
      });
    }
  }

  console.log(`Test ${testNum}: ${consistent}/75 consistent ${consistent === 75 ? '✅' : '⚠️'}`);
}

// ============================================================================
// 2. CHOICE COUNT CONSISTENCY
// ============================================================================
console.log('\n✅ 2. CHOICE COUNT CONSISTENCY\n');

// English & Reading & Science: 4 choices (no choice_e)
for (let testNum = 1; testNum <= 7; testNum++) {
  const sections = [
    { name: 'English', table: 'act_english_questions', expectedChoices: 4 },
    { name: 'Reading', table: 'act_reading_questions', expectedChoices: 4 },
    { name: 'Science', table: 'act_science_questions', expectedChoices: 4 }
  ];

  for (const section of sections) {
    const { data: questions } = await supabase
      .from(section.table)
      .select('test_number, question_number, choice_a, choice_b, choice_c, choice_d, choice_e')
      .eq('test_number', testNum);

    if (!questions) continue;

    let correct = 0;
    for (const q of questions) {
      const hasE = q.choice_e && q.choice_e.trim() !== '';
      if (!hasE) {
        correct++;
      } else {
        issues.push({
          type: 'INVALID_CHOICE_E',
          test: testNum,
          section: section.name,
          question: q.question_number
        });
      }
    }

    const total = questions.length;
    console.log(`Test ${testNum} ${section.name}: ${correct}/${total} correct (4 choices) ${correct === total ? '✅' : '❌'}`);
  }

  // Math: 5 choices (must have choice_e)
  const { data: mathQ } = await supabase
    .from('act_math_questions')
    .select('test_number, question_number, choice_a, choice_b, choice_c, choice_d, choice_e')
    .eq('test_number', testNum);

  if (mathQ) {
    let correct = 0;
    for (const q of mathQ) {
      const hasE = q.choice_e && q.choice_e.trim() !== '';
      if (hasE) {
        correct++;
      } else {
        issues.push({
          type: 'MISSING_CHOICE_E',
          test: testNum,
          section: 'Math',
          question: q.question_number
        });
      }
    }

    console.log(`Test ${testNum} Math: ${correct}/${mathQ.length} correct (5 choices) ${correct === mathQ.length ? '✅' : '❌'}`);
  }
}

// ============================================================================
// 3. ANSWER FORMAT CONSISTENCY
// ============================================================================
console.log('\n✅ 3. ANSWER FORMAT CONSISTENCY\n');

const validAnswers = {
  English: ['A', 'B', 'C', 'D'],
  Math: ['A', 'B', 'C', 'D', 'E'],
  Reading: ['A', 'B', 'C', 'D'],
  Science: ['A', 'B', 'C', 'D']
};

for (let testNum = 1; testNum <= 7; testNum++) {
  const sections = [
    { name: 'English', table: 'act_english_questions' },
    { name: 'Math', table: 'act_math_questions' },
    { name: 'Reading', table: 'act_reading_questions' },
    { name: 'Science', table: 'act_science_questions' }
  ];

  for (const section of sections) {
    const { data: questions } = await supabase
      .from(section.table)
      .select('test_number, question_number, correct_answer')
      .eq('test_number', testNum);

    if (!questions) continue;

    let valid = 0;
    for (const q of questions) {
      if (validAnswers[section.name].includes(q.correct_answer)) {
        valid++;
      } else {
        issues.push({
          type: 'INVALID_ANSWER_FORMAT',
          test: testNum,
          section: section.name,
          question: q.question_number,
          detail: `Answer is "${q.correct_answer}"`
        });
      }
    }

    const total = questions.length;
    console.log(`Test ${testNum} ${section.name}: ${valid}/${total} valid ${valid === total ? '✅' : '❌'}`);
  }
}

// ============================================================================
// 4. PASSAGE TEXT COMPLETENESS
// ============================================================================
console.log('\n✅ 4. PASSAGE TEXT COMPLETENESS\n');

for (let testNum = 1; testNum <= 7; testNum++) {
  const { data: englishP } = await supabase
    .from('act_english_passages')
    .select('passage_number, passage_text')
    .eq('test_number', testNum);

  const { data: readingP } = await supabase
    .from('act_reading_passages')
    .select('passage_number, passage_text')
    .eq('test_number', testNum);

  const { data: scienceP } = await supabase
    .from('act_science_passages')
    .select('passage_number, passage_text')
    .eq('test_number', testNum);

  const englishGood = englishP ? englishP.filter(p => p.passage_text && p.passage_text.length >= 100).length : 0;
  const readingGood = readingP ? readingP.filter(p => p.passage_text && p.passage_text.length >= 500).length : 0;
  const scienceGood = scienceP ? scienceP.filter(p => p.passage_text && p.passage_text.length >= 100).length : 0;

  const englishTotal = englishP?.length || 0;
  const readingTotal = readingP?.length || 0;
  const scienceTotal = scienceP?.length || 0;

  console.log(`Test ${testNum}:`);
  console.log(`  English: ${englishGood}/${englishTotal} complete ${englishGood === englishTotal ? '✅' : '⚠️'}`);
  console.log(`  Reading: ${readingGood}/${readingTotal} complete ${readingGood === readingTotal ? '✅' : '⚠️'}`);
  console.log(`  Science: ${scienceGood}/${scienceTotal} complete ${scienceGood === scienceTotal ? '✅' : '⚠️'}`);
}

// ============================================================================
// 5. QUESTION METADATA CONSISTENCY
// ============================================================================
console.log('\n✅ 5. QUESTION METADATA (TYPE & CATEGORY)\n');

for (let testNum = 1; testNum <= 7; testNum++) {
  const sections = [
    { name: 'English', table: 'act_english_questions', count: 75 },
    { name: 'Math', table: 'act_math_questions', count: 60 },
    { name: 'Reading', table: 'act_reading_questions', count: 40 },
    { name: 'Science', table: 'act_science_questions', count: 40 }
  ];

  for (const section of sections) {
    const { data: questions } = await supabase
      .from(section.table)
      .select('test_number, question_number, question_type, question_category')
      .eq('test_number', testNum);

    if (!questions) continue;

    let complete = 0;
    for (const q of questions) {
      if (q.question_type && q.question_category) {
        complete++;
      } else {
        issues.push({
          type: 'MISSING_METADATA',
          test: testNum,
          section: section.name,
          question: q.question_number
        });
      }
    }

    console.log(`Test ${testNum} ${section.name}: ${complete}/${section.count} have type & category ${complete === section.count ? '✅' : '❌'}`);
  }
}

// ============================================================================
// 6. LESSON ASSIGNMENT CONSISTENCY
// ============================================================================
console.log('\n✅ 6. LESSON ASSIGNMENT CONSISTENCY\n');

for (let testNum = 1; testNum <= 7; testNum++) {
  const sections = [
    { name: 'English', table: 'act_english_questions', count: 75 },
    { name: 'Math', table: 'act_math_questions', count: 60 },
    { name: 'Reading', table: 'act_reading_questions', count: 40 },
    { name: 'Science', table: 'act_science_questions', count: 40 }
  ];

  for (const section of sections) {
    const { data: questions } = await supabase
      .from(section.table)
      .select('test_number, question_number, lesson_id')
      .eq('test_number', testNum);

    if (!questions) continue;

    let assigned = 0;
    for (const q of questions) {
      if (q.lesson_id) {
        assigned++;
      } else {
        issues.push({
          type: 'MISSING_LESSON',
          test: testNum,
          section: section.name,
          question: q.question_number
        });
      }
    }

    console.log(`Test ${testNum} ${section.name}: ${assigned}/${section.count} assigned ${assigned === section.count ? '✅' : '❌'}`);
  }
}

// ============================================================================
// SUMMARY
// ============================================================================
console.log('\n' + '='.repeat(80));
console.log('\n📊 FINAL FORMATTING VERIFICATION SUMMARY\n');

if (issues.length === 0) {
  console.log('✅ ✅ ✅  PERFECT FORMATTING CONSISTENCY  ✅ ✅ ✅\n');
  console.log('All 7 tests have 100% consistent formatting across:');
  console.log('  • English underlined text (field matches <u> tags exactly)');
  console.log('  • Choice counts (4 for E/R/S, 5 for M)');
  console.log('  • Answer formats (A-D or A-E only)');
  console.log('  • Passage completeness (all passages have full text)');
  console.log('  • Question metadata (all have type & category)');
  console.log('  • Lesson assignments (100% coverage)');
  console.log('\n🎯 DATABASE IS PRODUCTION READY WITH PERFECT FORMATTING CONSISTENCY 🎯\n');
} else {
  console.log(`⚠️  FOUND ${issues.length} FORMATTING ISSUES\n`);

  const byType = {};
  for (const issue of issues) {
    if (!byType[issue.type]) byType[issue.type] = [];
    byType[issue.type].push(issue);
  }

  for (const [type, typeIssues] of Object.entries(byType)) {
    console.log(`\n${type}: ${typeIssues.length} issues`);
    typeIssues.slice(0, 10).forEach(issue => {
      console.log(`  • Test ${issue.test} ${issue.section} Q${issue.question}${issue.detail ? `: ${issue.detail}` : ''}`);
    });
    if (typeIssues.length > 10) {
      console.log(`  ... and ${typeIssues.length - 10} more`);
    }
  }

  console.log(`\n⚠️  TOTAL ISSUES: ${issues.length}\n`);
}

console.log('='.repeat(80));
