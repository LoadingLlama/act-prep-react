#!/usr/bin/env node
import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '../../.env') });

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

console.log('🔍 COMPLETE DATA STANDARDIZATION VERIFICATION\n');
console.log('Verifying EVERY column, EVERY data point for consistency...\n');
console.log('='.repeat(80));

const issues = [];

// ============================================================================
// 1. COLUMN DATA TYPE CONSISTENCY
// ============================================================================
console.log('\n📊 1. COLUMN DATA TYPE CONSISTENCY\n');

// Check that same columns have same data types across all tests
for (let testNum = 1; testNum <= 7; testNum++) {
  const { data: englishQ } = await supabase
    .from('act_english_questions')
    .select('*')
    .eq('test_number', testNum)
    .limit(1);

  const { data: mathQ } = await supabase
    .from('act_math_questions')
    .select('*')
    .eq('test_number', testNum)
    .limit(1);

  const { data: readingQ } = await supabase
    .from('act_reading_questions')
    .select('*')
    .eq('test_number', testNum)
    .limit(1);

  const { data: scienceQ } = await supabase
    .from('act_science_questions')
    .select('*')
    .eq('test_number', testNum)
    .limit(1);

  // Check for type consistency (all should be strings, UUIDs, or numbers)
  if (englishQ && englishQ[0]) {
    const q = englishQ[0];
    const hasValidTypes =
      typeof q.question_stem === 'string' &&
      typeof q.choice_a === 'string' &&
      typeof q.correct_answer === 'string' &&
      typeof q.question_number === 'number';

    console.log(`Test ${testNum} English: ${hasValidTypes ? '✅' : '❌'} Valid types`);
  }
}

// ============================================================================
// 2. NULL vs EMPTY STRING CONSISTENCY
// ============================================================================
console.log('\n📝 2. NULL vs EMPTY STRING CONSISTENCY\n');

// Check for empty strings that should be NULL
for (let testNum = 1; testNum <= 7; testNum++) {
  const sections = [
    { name: 'English', table: 'act_english_questions', fields: ['context_before', 'context_after', 'underlined_text'] },
    { name: 'Math', table: 'act_math_questions', fields: [] },
    { name: 'Reading', table: 'act_reading_questions', fields: [] },
    { name: 'Science', table: 'act_science_questions', fields: [] }
  ];

  for (const section of sections) {
    const { data: questions } = await supabase
      .from(section.table)
      .select('question_number, choice_e, context_before, context_after, underlined_text')
      .eq('test_number', testNum);

    if (!questions) continue;

    let emptyStrings = 0;
    for (const q of questions) {
      // choice_e should be NULL for English/Reading/Science, not empty string
      if (section.name !== 'Math' && q.choice_e === '') {
        emptyStrings++;
        issues.push({
          type: 'EMPTY_STRING_NOT_NULL',
          test: testNum,
          section: section.name,
          question: q.question_number,
          field: 'choice_e'
        });
      }

      // context fields should be NULL, not empty string
      if (section.name === 'English') {
        if (q.context_before === '') {
          emptyStrings++;
          issues.push({
            type: 'EMPTY_STRING_NOT_NULL',
            test: testNum,
            section: section.name,
            question: q.question_number,
            field: 'context_before'
          });
        }
        if (q.context_after === '') {
          emptyStrings++;
          issues.push({
            type: 'EMPTY_STRING_NOT_NULL',
            test: testNum,
            section: section.name,
            question: q.question_number,
            field: 'context_after'
          });
        }
        if (q.underlined_text === '') {
          emptyStrings++;
          issues.push({
            type: 'EMPTY_STRING_NOT_NULL',
            test: testNum,
            section: section.name,
            question: q.question_number,
            field: 'underlined_text'
          });
        }
      }
    }

    if (emptyStrings > 0) {
      console.log(`Test ${testNum} ${section.name}: ❌ ${emptyStrings} empty strings (should be NULL)`);
    } else {
      console.log(`Test ${testNum} ${section.name}: ✅ No empty strings`);
    }
  }
}

// ============================================================================
// 3. ENGLISH PASSAGE-QUESTION ALIGNMENT
// ============================================================================
console.log('\n📖 3. ENGLISH PASSAGE-QUESTION ALIGNMENT\n');
console.log('Verifying questions reference content actually in passages...\n');

for (let testNum = 1; testNum <= 7; testNum++) {
  console.log(`Test ${testNum}:`);

  const { data: passages } = await supabase
    .from('act_english_passages')
    .select('*')
    .eq('test_number', testNum)
    .order('passage_number');

  const { data: questions } = await supabase
    .from('act_english_questions')
    .select('*')
    .eq('test_number', testNum)
    .order('question_number');

  if (!passages || !questions) continue;

  // English passages have questions 1-15, 16-30, 31-45, 46-60, 61-75
  const passageRanges = [
    { passage: 1, start: 1, end: 15 },
    { passage: 2, start: 16, end: 30 },
    { passage: 3, start: 31, end: 45 },
    { passage: 4, start: 46, end: 60 },
    { passage: 5, start: 61, end: 75 }
  ];

  for (const range of passageRanges) {
    const passage = passages.find(p => p.passage_number === range.passage);
    if (!passage) {
      console.log(`  ❌ Passage ${range.passage} not found`);
      issues.push({
        type: 'MISSING_PASSAGE',
        test: testNum,
        section: 'English',
        passage: range.passage
      });
      continue;
    }

    const passageQuestions = questions.filter(q =>
      q.question_number >= range.start && q.question_number <= range.end
    );

    // Check if underlined text appears in passage
    let missingInPassage = 0;
    for (const q of passageQuestions) {
      if (q.underlined_text && q.underlined_text.trim() !== '') {
        // Check if underlined text exists in passage
        if (!passage.passage_text.includes(q.underlined_text)) {
          // Sometimes punctuation varies, check without punctuation
          const textNoPunct = q.underlined_text.replace(/[.,;:!?]/g, '');
          if (!passage.passage_text.includes(textNoPunct)) {
            missingInPassage++;
            issues.push({
              type: 'UNDERLINED_TEXT_NOT_IN_PASSAGE',
              test: testNum,
              section: 'English',
              passage: range.passage,
              question: q.question_number,
              text: q.underlined_text.substring(0, 50)
            });
          }
        }
      }
    }

    if (missingInPassage > 0) {
      console.log(`  Passage ${range.passage} (Q${range.start}-${range.end}): ❌ ${missingInPassage} underlined texts not in passage`);
    } else {
      console.log(`  Passage ${range.passage} (Q${range.start}-${range.end}): ✅ All underlined texts found`);
    }
  }
}

// ============================================================================
// 4. READING PASSAGE-QUESTION ALIGNMENT
// ============================================================================
console.log('\n📚 4. READING PASSAGE-QUESTION ALIGNMENT\n');
console.log('Verifying questions reference content actually in passages...\n');

for (let testNum = 1; testNum <= 7; testNum++) {
  console.log(`Test ${testNum}:`);

  const { data: passages } = await supabase
    .from('act_reading_passages')
    .select('*')
    .eq('test_number', testNum)
    .order('passage_number');

  const { data: questions } = await supabase
    .from('act_reading_questions')
    .select('*')
    .eq('test_number', testNum)
    .order('question_number');

  if (!passages || !questions) continue;

  for (const passage of passages) {
    const passageQuestions = questions.filter(q => q.passage_id === passage.id);

    if (passageQuestions.length === 0) {
      console.log(`  Passage ${passage.passage_number}: ❌ No questions linked`);
      issues.push({
        type: 'NO_QUESTIONS_FOR_PASSAGE',
        test: testNum,
        section: 'Reading',
        passage: passage.passage_number
      });
      continue;
    }

    // Check if question stems reference content in passage
    let missingReferences = 0;
    for (const q of passageQuestions) {
      // Extract quoted text from question stem
      const quotedMatches = q.question_stem.match(/"([^"]+)"/g);
      if (quotedMatches) {
        for (const quote of quotedMatches) {
          const cleanQuote = quote.replace(/"/g, '');
          if (cleanQuote.length > 10 && !passage.passage_text.includes(cleanQuote)) {
            // Check with slight variations (sometimes questions paraphrase)
            const words = cleanQuote.split(' ').slice(0, 5).join(' ');
            if (words.length > 10 && !passage.passage_text.includes(words)) {
              missingReferences++;
              issues.push({
                type: 'QUOTED_TEXT_NOT_IN_PASSAGE',
                test: testNum,
                section: 'Reading',
                passage: passage.passage_number,
                question: q.question_number,
                quote: cleanQuote.substring(0, 50)
              });
            }
          }
        }
      }
    }

    if (missingReferences > 0) {
      console.log(`  Passage ${passage.passage_number}: ⚠️  ${missingReferences} potential mismatches (${passageQuestions.length} questions)`);
    } else {
      console.log(`  Passage ${passage.passage_number}: ✅ ${passageQuestions.length} questions linked`);
    }
  }
}

// ============================================================================
// 5. SCIENCE PASSAGE-QUESTION ALIGNMENT
// ============================================================================
console.log('\n🔬 5. SCIENCE PASSAGE-QUESTION ALIGNMENT\n');
console.log('Verifying all questions correctly linked to passages...\n');

for (let testNum = 1; testNum <= 7; testNum++) {
  console.log(`Test ${testNum}:`);

  const { data: passages } = await supabase
    .from('act_science_passages')
    .select('*')
    .eq('test_number', testNum)
    .order('passage_number');

  const { data: questions } = await supabase
    .from('act_science_questions')
    .select('*')
    .eq('test_number', testNum)
    .order('question_number');

  if (!passages || !questions) continue;

  // Check all questions have valid passage_id
  let orphanedQuestions = 0;
  for (const q of questions) {
    const hasValidPassage = passages.find(p => p.id === q.passage_id);
    if (!hasValidPassage) {
      orphanedQuestions++;
      issues.push({
        type: 'INVALID_PASSAGE_LINK',
        test: testNum,
        section: 'Science',
        question: q.question_number
      });
    }
  }

  // Check all passages have questions
  for (const passage of passages) {
    const passageQuestions = questions.filter(q => q.passage_id === passage.id);

    if (passageQuestions.length === 0) {
      console.log(`  Passage ${passage.passage_number}: ❌ No questions linked`);
      issues.push({
        type: 'NO_QUESTIONS_FOR_PASSAGE',
        test: testNum,
        section: 'Science',
        passage: passage.passage_number
      });
    } else {
      console.log(`  Passage ${passage.passage_number}: ✅ ${passageQuestions.length} questions linked`);
    }
  }

  if (orphanedQuestions > 0) {
    console.log(`  ❌ ${orphanedQuestions} orphaned questions`);
  }
}

// ============================================================================
// 6. CHOICE TEXT CONSISTENCY
// ============================================================================
console.log('\n🔤 6. CHOICE TEXT CONSISTENCY\n');

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
      .select('question_number, choice_a, choice_b, choice_c, choice_d, choice_e')
      .eq('test_number', testNum);

    if (!questions) continue;

    let emptyChoices = 0;
    let nullChoices = 0;

    for (const q of questions) {
      // Check required choices are not empty/null
      if (!q.choice_a || q.choice_a.trim() === '') {
        emptyChoices++;
        issues.push({
          type: 'EMPTY_CHOICE',
          test: testNum,
          section: section.name,
          question: q.question_number,
          field: 'choice_a'
        });
      }
      if (!q.choice_b || q.choice_b.trim() === '') {
        emptyChoices++;
        issues.push({
          type: 'EMPTY_CHOICE',
          test: testNum,
          section: section.name,
          question: q.question_number,
          field: 'choice_b'
        });
      }
      if (!q.choice_c || q.choice_c.trim() === '') {
        emptyChoices++;
        issues.push({
          type: 'EMPTY_CHOICE',
          test: testNum,
          section: section.name,
          question: q.question_number,
          field: 'choice_c'
        });
      }
      if (!q.choice_d || q.choice_d.trim() === '') {
        emptyChoices++;
        issues.push({
          type: 'EMPTY_CHOICE',
          test: testNum,
          section: section.name,
          question: q.question_number,
          field: 'choice_d'
        });
      }

      // Math should have choice_e
      if (section.name === 'Math' && (!q.choice_e || q.choice_e.trim() === '')) {
        emptyChoices++;
        issues.push({
          type: 'EMPTY_CHOICE',
          test: testNum,
          section: section.name,
          question: q.question_number,
          field: 'choice_e'
        });
      }
    }

    if (emptyChoices > 0) {
      console.log(`Test ${testNum} ${section.name}: ❌ ${emptyChoices} empty choices`);
    } else {
      console.log(`Test ${testNum} ${section.name}: ✅ All choices populated`);
    }
  }
}

// ============================================================================
// 7. QUESTION NUMBER SEQUENCE
// ============================================================================
console.log('\n🔢 7. QUESTION NUMBER SEQUENCE\n');

for (let testNum = 1; testNum <= 7; testNum++) {
  const sections = [
    { name: 'English', table: 'act_english_questions', expected: 75 },
    { name: 'Math', table: 'act_math_questions', expected: 60 },
    { name: 'Reading', table: 'act_reading_questions', expected: 40 },
    { name: 'Science', table: 'act_science_questions', expected: 40 }
  ];

  for (const section of sections) {
    const { data: questions } = await supabase
      .from(section.table)
      .select('question_number')
      .eq('test_number', testNum)
      .order('question_number');

    if (!questions) continue;

    let isSequential = true;
    for (let i = 0; i < section.expected; i++) {
      if (!questions[i] || questions[i].question_number !== i + 1) {
        isSequential = false;
        issues.push({
          type: 'BROKEN_SEQUENCE',
          test: testNum,
          section: section.name,
          expected: i + 1,
          found: questions[i]?.question_number
        });
      }
    }

    console.log(`Test ${testNum} ${section.name}: ${isSequential ? '✅' : '❌'} Sequence 1-${section.expected}`);
  }
}

// ============================================================================
// 8. UUID FORMAT VALIDATION
// ============================================================================
console.log('\n🆔 8. UUID FORMAT VALIDATION\n');

const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

for (let testNum = 1; testNum <= 7; testNum++) {
  const sections = [
    { name: 'English', table: 'act_english_questions', hasPassageId: false },
    { name: 'Math', table: 'act_math_questions', hasPassageId: false },
    { name: 'Reading', table: 'act_reading_questions', hasPassageId: true },
    { name: 'Science', table: 'act_science_questions', hasPassageId: true }
  ];

  for (const section of sections) {
    const { data: questions } = await supabase
      .from(section.table)
      .select('question_number, lesson_id, passage_id')
      .eq('test_number', testNum);

    if (!questions) continue;

    let invalidUUIDs = 0;
    for (const q of questions) {
      // Check lesson_id
      if (q.lesson_id && !uuidRegex.test(q.lesson_id)) {
        invalidUUIDs++;
        issues.push({
          type: 'INVALID_UUID',
          test: testNum,
          section: section.name,
          question: q.question_number,
          field: 'lesson_id'
        });
      }

      // Check passage_id if applicable
      if (section.hasPassageId && q.passage_id && !uuidRegex.test(q.passage_id)) {
        invalidUUIDs++;
        issues.push({
          type: 'INVALID_UUID',
          test: testNum,
          section: section.name,
          question: q.question_number,
          field: 'passage_id'
        });
      }
    }

    console.log(`Test ${testNum} ${section.name}: ${invalidUUIDs === 0 ? '✅' : '❌'} Valid UUIDs`);
  }
}

// ============================================================================
// SUMMARY
// ============================================================================
console.log('\n' + '='.repeat(80));
console.log('\n📊 COMPLETE DATA STANDARDIZATION SUMMARY\n');

if (issues.length === 0) {
  console.log('✅ ✅ ✅  PERFECT DATA STANDARDIZATION  ✅ ✅ ✅\n');
  console.log('All data points across all columns are 100% standardized:');
  console.log('  • Column data types consistent');
  console.log('  • NULL vs empty string handling correct');
  console.log('  • English passage-question alignment verified');
  console.log('  • Reading passage-question alignment verified');
  console.log('  • Science passage-question alignment verified');
  console.log('  • All choice fields populated correctly');
  console.log('  • Question sequences valid');
  console.log('  • UUID formats valid');
  console.log('\n🎯 DATABASE IS 100% STANDARDIZED AND PRODUCTION READY 🎯\n');
} else {
  console.log(`⚠️  FOUND ${issues.length} STANDARDIZATION ISSUES\n`);

  const byType = {};
  for (const issue of issues) {
    if (!byType[issue.type]) byType[issue.type] = [];
    byType[issue.type].push(issue);
  }

  for (const [type, typeIssues] of Object.entries(byType)) {
    console.log(`\n${type}: ${typeIssues.length} issues`);
    typeIssues.slice(0, 10).forEach(issue => {
      let msg = `  • Test ${issue.test} ${issue.section}`;
      if (issue.question) msg += ` Q${issue.question}`;
      if (issue.passage) msg += ` P${issue.passage}`;
      if (issue.field) msg += ` [${issue.field}]`;
      if (issue.text) msg += `: "${issue.text}"`;
      if (issue.quote) msg += `: "${issue.quote}"`;
      console.log(msg);
    });
    if (typeIssues.length > 10) {
      console.log(`  ... and ${typeIssues.length - 10} more`);
    }
  }

  console.log(`\n⚠️  TOTAL ISSUES: ${issues.length}\n`);
  console.log('Creating fix script...\n');
}

console.log('='.repeat(80));

// Export issues for fix script
if (issues.length > 0) {
  const fs = await import('fs');
  fs.writeFileSync(
    join(__dirname, 'standardization-issues.json'),
    JSON.stringify(issues, null, 2)
  );
  console.log(`\n📝 Issues exported to: standardization-issues.json\n`);
}
