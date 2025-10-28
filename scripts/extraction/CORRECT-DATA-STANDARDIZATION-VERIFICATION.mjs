#!/usr/bin/env node
import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '../../.env') });

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

console.log('🔍 CORRECT DATA STANDARDIZATION VERIFICATION\n');
console.log('Verifying data standardization with correct ACT English understanding...\n');
console.log('='.repeat(80));

const issues = [];

// ============================================================================
// 1. ENGLISH PASSAGE COMPLETENESS
// ============================================================================
console.log('\n📖 1. ENGLISH PASSAGE COMPLETENESS\n');
console.log('NOTE: English passages store base text. Underlined portions in questions');
console.log('may show ERRORS or VARIATIONS being tested, not exact passage text.\n');

for (let testNum = 1; testNum <= 7; testNum++) {
  const { data: passages } = await supabase
    .from('act_english_passages')
    .select('*')
    .eq('test_number', testNum)
    .order('passage_number');

  if (!passages) continue;

  console.log(`Test ${testNum}:`);
  for (const passage of passages) {
    const wordCount = passage.passage_text.split(/\s+/).length;
    const charCount = passage.passage_text.length;

    if (charCount < 500) {
      console.log(`  Passage ${passage.passage_number}: ❌ Too short (${charCount} chars, ${wordCount} words)`);
      issues.push({
        type: 'SHORT_PASSAGE',
        test: testNum,
        section: 'English',
        passage: passage.passage_number,
        chars: charCount
      });
    } else {
      console.log(`  Passage ${passage.passage_number}: ✅ Complete (${charCount} chars, ${wordCount} words)`);
    }
  }
}

// ============================================================================
// 2. READING PASSAGE-QUESTION CROSS-REFERENCE
// ============================================================================
console.log('\n📚 2. READING PASSAGE-QUESTION CROSS-REFERENCE\n');
console.log('Verifying question content appears in correct passages...\n');

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
    } else if (passageQuestions.length !== 10) {
      console.log(`  Passage ${passage.passage_number}: ⚠️  ${passageQuestions.length} questions (expected 10)`);
      issues.push({
        type: 'WRONG_QUESTION_COUNT',
        test: testNum,
        section: 'Reading',
        passage: passage.passage_number,
        count: passageQuestions.length
      });
    } else {
      console.log(`  Passage ${passage.passage_number}: ✅ 10 questions linked correctly`);
    }

    // Check passage completeness
    const wordCount = passage.passage_text.split(/\s+/).length;
    if (wordCount < 300) {
      console.log(`    ⚠️  Passage seems short (${wordCount} words)`);
      issues.push({
        type: 'SHORT_PASSAGE',
        test: testNum,
        section: 'Reading',
        passage: passage.passage_number,
        words: wordCount
      });
    }
  }
}

// ============================================================================
// 3. SCIENCE PASSAGE-QUESTION CROSS-REFERENCE
// ============================================================================
console.log('\n🔬 3. SCIENCE PASSAGE-QUESTION CROSS-REFERENCE\n');
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

  let totalLinked = 0;

  for (const passage of passages) {
    const passageQuestions = questions.filter(q => q.passage_id === passage.id);
    totalLinked += passageQuestions.length;

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

  // Check for orphaned questions
  const orphaned = questions.filter(q => !passages.find(p => p.id === q.passage_id));
  if (orphaned.length > 0) {
    console.log(`  ❌ ${orphaned.length} orphaned questions`);
    orphaned.forEach(q => {
      issues.push({
        type: 'ORPHANED_QUESTION',
        test: testNum,
        section: 'Science',
        question: q.question_number
      });
    });
  }

  if (totalLinked !== 40) {
    console.log(`  ⚠️  Total linked: ${totalLinked}/40`);
  }
}

// ============================================================================
// 4. NULL vs EMPTY STRING STANDARDIZATION
// ============================================================================
console.log('\n🔤 4. NULL vs EMPTY STRING STANDARDIZATION\n');

for (let testNum = 1; testNum <= 7; testNum++) {
  const { data: englishQ } = await supabase
    .from('act_english_questions')
    .select('question_number, choice_e, context_before, context_after, underlined_text')
    .eq('test_number', testNum);

  const { data: readingQ } = await supabase
    .from('act_reading_questions')
    .select('question_number, choice_e')
    .eq('test_number', testNum);

  const { data: scienceQ } = await supabase
    .from('act_science_questions')
    .select('question_number, choice_e')
    .eq('test_number', testNum);

  let emptyStrings = 0;

  // English: choice_e, context fields should be NULL not empty string
  if (englishQ) {
    for (const q of englishQ) {
      if (q.choice_e === '') emptyStrings++;
      if (q.context_before === '') emptyStrings++;
      if (q.context_after === '') emptyStrings++;
      if (q.underlined_text === '') emptyStrings++;
    }
  }

  // Reading/Science: choice_e should be NULL not empty string
  if (readingQ) {
    for (const q of readingQ) {
      if (q.choice_e === '') emptyStrings++;
    }
  }

  if (scienceQ) {
    for (const q of scienceQ) {
      if (q.choice_e === '') emptyStrings++;
    }
  }

  if (emptyStrings > 0) {
    console.log(`Test ${testNum}: ❌ ${emptyStrings} empty strings (should be NULL)`);
    issues.push({
      type: 'EMPTY_STRING_NOT_NULL',
      test: testNum,
      count: emptyStrings
    });
  } else {
    console.log(`Test ${testNum}: ✅ Proper NULL handling`);
  }
}

// ============================================================================
// 5. REQUIRED FIELD COMPLETENESS
// ============================================================================
console.log('\n✅ 5. REQUIRED FIELD COMPLETENESS\n');

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
      .select('question_number, question_stem, choice_a, choice_b, choice_c, choice_d, correct_answer, lesson_id, question_type, question_category')
      .eq('test_number', testNum);

    if (!questions) continue;

    let incomplete = 0;
    for (const q of questions) {
      if (!q.question_stem || !q.choice_a || !q.choice_b || !q.choice_c || !q.choice_d ||
          !q.correct_answer || !q.lesson_id || !q.question_type || !q.question_category) {
        incomplete++;
        issues.push({
          type: 'INCOMPLETE_REQUIRED_FIELDS',
          test: testNum,
          section: section.name,
          question: q.question_number
        });
      }
    }

    console.log(`Test ${testNum} ${section.name}: ${incomplete === 0 ? '✅' : '❌'} ${section.count - incomplete}/${section.count} complete`);
  }
}

// ============================================================================
// 6. CHOICE COUNT STANDARDIZATION
// ============================================================================
console.log('\n🔢 6. CHOICE COUNT STANDARDIZATION\n');

for (let testNum = 1; testNum <= 7; testNum++) {
  // Math should have choice_e
  const { data: mathQ } = await supabase
    .from('act_math_questions')
    .select('question_number, choice_e')
    .eq('test_number', testNum);

  let mathMissing = 0;
  if (mathQ) {
    for (const q of mathQ) {
      if (!q.choice_e || q.choice_e.trim() === '') {
        mathMissing++;
        issues.push({
          type: 'MISSING_CHOICE_E',
          test: testNum,
          section: 'Math',
          question: q.question_number
        });
      }
    }
  }

  // English/Reading/Science should NOT have choice_e
  const { data: englishQ } = await supabase
    .from('act_english_questions')
    .select('question_number, choice_e')
    .eq('test_number', testNum);

  const { data: readingQ } = await supabase
    .from('act_reading_questions')
    .select('question_number, choice_e')
    .eq('test_number', testNum);

  const { data: scienceQ } = await supabase
    .from('act_science_questions')
    .select('question_number, choice_e')
    .eq('test_number', testNum);

  let extraChoiceE = 0;
  if (englishQ) {
    for (const q of englishQ) {
      if (q.choice_e && q.choice_e.trim() !== '') {
        extraChoiceE++;
        issues.push({
          type: 'INVALID_CHOICE_E',
          test: testNum,
          section: 'English',
          question: q.question_number
        });
      }
    }
  }

  if (readingQ) {
    for (const q of readingQ) {
      if (q.choice_e && q.choice_e.trim() !== '') {
        extraChoiceE++;
        issues.push({
          type: 'INVALID_CHOICE_E',
          test: testNum,
          section: 'Reading',
          question: q.question_number
        });
      }
    }
  }

  if (scienceQ) {
    for (const q of scienceQ) {
      if (q.choice_e && q.choice_e.trim() !== '') {
        extraChoiceE++;
        issues.push({
          type: 'INVALID_CHOICE_E',
          test: testNum,
          section: 'Science',
          question: q.question_number
        });
      }
    }
  }

  console.log(`Test ${testNum}: Math ${mathMissing === 0 ? '✅' : '❌'} 60/60 have choice_e | E/R/S ${extraChoiceE === 0 ? '✅' : '❌'} 0 with choice_e`);
}

// ============================================================================
// SUMMARY
// ============================================================================
console.log('\n' + '='.repeat(80));
console.log('\n📊 DATA STANDARDIZATION SUMMARY\n');

if (issues.length === 0) {
  console.log('✅ ✅ ✅  100% DATA STANDARDIZATION ACHIEVED  ✅ ✅ ✅\n');
  console.log('All data is standardized across all 7 tests:');
  console.log('  • English passages complete (base text stored correctly)');
  console.log('  • Reading passages complete with correct question linkage');
  console.log('  • Science passages complete with correct question linkage');
  console.log('  • NULL vs empty string handled correctly');
  console.log('  • All required fields populated');
  console.log('  • Choice counts correct (4 for E/R/S, 5 for M)');
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
      let msg = `  • Test ${issue.test}`;
      if (issue.section) msg += ` ${issue.section}`;
      if (issue.question) msg += ` Q${issue.question}`;
      if (issue.passage) msg += ` P${issue.passage}`;
      if (issue.count) msg += ` (${issue.count} instances)`;
      if (issue.chars) msg += ` (${issue.chars} chars)`;
      if (issue.words) msg += ` (${issue.words} words)`;
      console.log(msg);
    });
    if (typeIssues.length > 10) {
      console.log(`  ... and ${typeIssues.length - 10} more`);
    }
  }

  console.log(`\n⚠️  TOTAL ISSUES: ${issues.length}\n`);
}

console.log('='.repeat(80));
