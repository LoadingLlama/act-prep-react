#!/usr/bin/env node
import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '../../.env') });

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

console.log('🔍 FORMATTING CONSISTENCY VERIFICATION - ALL TESTS (1-7)\n');
console.log('Checking sentence structure, data storage, and formatting patterns...\n');
console.log('='.repeat(80));

const issues = [];

// ============================================================================
// 1. ENGLISH SECTION - HTML TAG CONSISTENCY
// ============================================================================
console.log('\n📝 1. ENGLISH HTML TAG CONSISTENCY\n');

for (let testNum = 1; testNum <= 7; testNum++) {
  const { data: englishQ } = await supabase
    .from('act_english_questions')
    .select('test_number, question_number, question_stem, underlined_text, context_before, context_after')
    .eq('test_number', testNum)
    .order('question_number');

  // Check for inconsistent HTML tag usage
  let withUnderlineTag = 0;
  let withUnderlinedField = 0;
  let mismatchedTags = [];

  for (const q of englishQ) {
    const hasUnderlineTag = q.question_stem?.includes('<u>') && q.question_stem?.includes('</u>');
    const hasUnderlinedField = q.underlined_text && q.underlined_text.trim() !== '';

    if (hasUnderlineTag) withUnderlineTag++;
    if (hasUnderlinedField) withUnderlinedField++;

    // Check if underlined_text matches what's in <u> tags
    if (hasUnderlineTag && hasUnderlinedField) {
      const tagMatch = q.question_stem.match(/<u>(.*?)<\/u>/);
      if (tagMatch && tagMatch[1] !== q.underlined_text) {
        mismatchedTags.push({
          test: testNum,
          q: q.question_number,
          inTag: tagMatch[1],
          inField: q.underlined_text
        });
      }
    }

    // Check for inconsistent tag formats (<u> vs <em> vs <i>)
    if (q.question_stem?.includes('<em>') || q.question_stem?.includes('<i>')) {
      issues.push({
        type: 'INCONSISTENT_HTML_TAG',
        test: testNum,
        section: 'English',
        question: q.question_number,
        detail: 'Uses <em> or <i> instead of <u>'
      });
    }
  }

  console.log(`Test ${testNum}:`);
  console.log(`  Questions with <u> tags: ${withUnderlineTag}`);
  console.log(`  Questions with underlined_text field: ${withUnderlinedField}`);

  if (mismatchedTags.length > 0) {
    console.log(`  ⚠️  ${mismatchedTags.length} questions with mismatched underlined_text`);
    mismatchedTags.forEach(m => {
      console.log(`      Q${m.q}: tag="${m.inTag}" vs field="${m.inField}"`);
      issues.push({
        type: 'UNDERLINED_TEXT_MISMATCH',
        test: m.test,
        section: 'English',
        question: m.q,
        detail: `Tag has "${m.inTag}" but field has "${m.inField}"`
      });
    });
  }
}

// ============================================================================
// 2. CHOICE FORMAT CONSISTENCY
// ============================================================================
console.log('\n📊 2. CHOICE FORMAT CONSISTENCY\n');

// Check English - should have NO CHANGE pattern consistency
for (let testNum = 1; testNum <= 7; testNum++) {
  const { data: englishQ } = await supabase
    .from('act_english_questions')
    .select('test_number, question_number, choice_a, choice_b, choice_c, choice_d, choice_e')
    .eq('test_number', testNum)
    .order('question_number');

  let noChangeCount = 0;
  let noChangePatterns = new Set();
  let hasChoiceE = 0;

  if (!englishQ || englishQ.length === 0) {
    console.log(`Test ${testNum} English: ⚠️  No data found`);
    continue;
  }

  for (const q of englishQ) {
    // Check for NO CHANGE variations
    if (q.choice_a?.includes('NO CHANGE') || q.choice_a?.includes('no change') || q.choice_a === 'NO CHANGE') {
      noChangeCount++;
      noChangePatterns.add(q.choice_a);
    }

    // English should NOT have choice_e
    if (q.choice_e && q.choice_e.trim() !== '') {
      hasChoiceE++;
      issues.push({
        type: 'INVALID_CHOICE_E',
        test: testNum,
        section: 'English',
        question: q.question_number,
        detail: `English question has choice_e: "${q.choice_e}"`
      });
    }
  }

  console.log(`Test ${testNum} English:`);
  console.log(`  Questions with "NO CHANGE": ${noChangeCount}`);
  if (noChangePatterns.size > 1) {
    console.log(`  ⚠️  Multiple NO CHANGE formats found: ${Array.from(noChangePatterns).join(', ')}`);
    issues.push({
      type: 'INCONSISTENT_NO_CHANGE',
      test: testNum,
      section: 'English',
      detail: `Multiple formats: ${Array.from(noChangePatterns).join(', ')}`
    });
  }
  if (hasChoiceE > 0) {
    console.log(`  ❌ ${hasChoiceE} questions have invalid choice_e`);
  }
}

// Check Math - all should have choice_e
for (let testNum = 1; testNum <= 7; testNum++) {
  const { data: mathQ } = await supabase
    .from('act_math_questions')
    .select('test_number, question_number, choice_a, choice_b, choice_c, choice_d, choice_e')
    .eq('test_number', testNum)
    .order('question_number');

  let missingChoiceE = 0;

  for (const q of mathQ) {
    if (!q.choice_e || q.choice_e.trim() === '') {
      missingChoiceE++;
      issues.push({
        type: 'MISSING_CHOICE_E',
        test: testNum,
        section: 'Math',
        question: q.question_number,
        detail: 'Math question missing choice_e'
      });
    }
  }

  console.log(`Test ${testNum} Math:`);
  console.log(`  Questions with choice_e: ${60 - missingChoiceE}/60`);
  if (missingChoiceE > 0) {
    console.log(`  ❌ ${missingChoiceE} questions missing choice_e`);
  }
}

// Check Reading/Science - should NOT have choice_e
for (let testNum = 1; testNum <= 7; testNum++) {
  const { data: readingQ } = await supabase
    .from('act_reading_questions')
    .select('test_number, question_number, choice_e')
    .eq('test_number', testNum)
    .order('question_number');

  const { data: scienceQ } = await supabase
    .from('act_science_questions')
    .select('test_number, question_number, choice_e')
    .eq('test_number', testNum)
    .order('question_number');

  let readingHasE = readingQ.filter(q => q.choice_e && q.choice_e.trim() !== '').length;
  let scienceHasE = scienceQ.filter(q => q.choice_e && q.choice_e.trim() !== '').length;

  console.log(`Test ${testNum} Reading: ${readingHasE > 0 ? `❌ ${readingHasE} have invalid choice_e` : '✅ No choice_e'}`);
  console.log(`Test ${testNum} Science: ${scienceHasE > 0 ? `❌ ${scienceHasE} have invalid choice_e` : '✅ No choice_e'}`);

  if (readingHasE > 0) {
    readingQ.filter(q => q.choice_e && q.choice_e.trim() !== '').forEach(q => {
      issues.push({
        type: 'INVALID_CHOICE_E',
        test: testNum,
        section: 'Reading',
        question: q.question_number,
        detail: `Reading question has choice_e`
      });
    });
  }

  if (scienceHasE > 0) {
    scienceQ.filter(q => q.choice_e && q.choice_e.trim() !== '').forEach(q => {
      issues.push({
        type: 'INVALID_CHOICE_E',
        test: testNum,
        section: 'Science',
        question: q.question_number,
        detail: `Science question has choice_e`
      });
    });
  }
}

// ============================================================================
// 3. ANSWER FORMAT CONSISTENCY
// ============================================================================
console.log('\n✅ 3. ANSWER FORMAT CONSISTENCY\n');

const validAnswers = {
  english: ['A', 'B', 'C', 'D'],
  math: ['A', 'B', 'C', 'D', 'E'],
  reading: ['A', 'B', 'C', 'D'],
  science: ['A', 'B', 'C', 'D']
};

for (let testNum = 1; testNum <= 7; testNum++) {
  const sections = [
    { name: 'English', table: 'act_english_questions', valid: validAnswers.english },
    { name: 'Math', table: 'act_math_questions', valid: validAnswers.math },
    { name: 'Reading', table: 'act_reading_questions', valid: validAnswers.reading },
    { name: 'Science', table: 'act_science_questions', valid: validAnswers.science }
  ];

  for (const section of sections) {
    const { data: questions } = await supabase
      .from(section.table)
      .select('test_number, question_number, correct_answer')
      .eq('test_number', testNum);

    let invalidAnswers = 0;
    for (const q of questions) {
      if (!section.valid.includes(q.correct_answer)) {
        invalidAnswers++;
        issues.push({
          type: 'INVALID_ANSWER_FORMAT',
          test: testNum,
          section: section.name,
          question: q.question_number,
          detail: `Answer "${q.correct_answer}" not in valid set [${section.valid.join(', ')}]`
        });
      }
    }

    console.log(`Test ${testNum} ${section.name}: ${invalidAnswers > 0 ? `❌ ${invalidAnswers} invalid answers` : '✅ All answers valid'}`);
  }
}

// ============================================================================
// 4. QUESTION STEM SENTENCE STRUCTURE
// ============================================================================
console.log('\n📖 4. QUESTION STEM SENTENCE STRUCTURE\n');

// Check for common patterns across tests
for (let testNum = 1; testNum <= 7; testNum++) {
  const { data: englishQ } = await supabase
    .from('act_english_questions')
    .select('test_number, question_number, question_stem')
    .eq('test_number', testNum)
    .order('question_number');

  // Check for proper sentence ending (should end with punctuation or be embedded in context)
  let improperEnding = [];
  let hasColon = 0;
  let hasQuestion = 0;

  for (const q of englishQ) {
    const stem = q.question_stem?.trim();
    if (!stem) continue;

    // Check ending punctuation patterns
    if (stem.endsWith(':')) hasColon++;
    if (stem.includes('?')) hasQuestion++;

    // Check for inconsistent spacing around HTML tags
    if (stem.includes('<u> ') || stem.includes(' </u>')) {
      issues.push({
        type: 'INCONSISTENT_TAG_SPACING',
        test: testNum,
        section: 'English',
        question: q.question_number,
        detail: 'Extra space inside <u> tags'
      });
    }
  }

  console.log(`Test ${testNum} English stems:`);
  console.log(`  Stems ending with ":": ${hasColon}`);
  console.log(`  Stems with "?": ${hasQuestion}`);
}

// ============================================================================
// 5. PASSAGE TEXT STORAGE CONSISTENCY
// ============================================================================
console.log('\n📚 5. PASSAGE TEXT STORAGE CONSISTENCY\n');

for (let testNum = 1; testNum <= 7; testNum++) {
  const { data: englishP } = await supabase
    .from('act_english_passages')
    .select('test_number, passage_number, passage_text')
    .eq('test_number', testNum);

  const { data: readingP } = await supabase
    .from('act_reading_passages')
    .select('test_number, passage_number, passage_text, passage_type')
    .eq('test_number', testNum);

  const { data: scienceP } = await supabase
    .from('act_science_passages')
    .select('test_number, passage_number, passage_text, passage_type')
    .eq('test_number', testNum);

  // Check for empty or very short passages
  let englishShort = englishP.filter(p => !p.passage_text || p.passage_text.length < 100).length;
  let readingShort = readingP.filter(p => !p.passage_text || p.passage_text.length < 500).length;
  let scienceShort = scienceP.filter(p => !p.passage_text || p.passage_text.length < 100).length;

  console.log(`Test ${testNum}:`);
  console.log(`  English passages: ${englishP.length} (${englishShort > 0 ? `⚠️  ${englishShort} too short` : '✅'})`);
  console.log(`  Reading passages: ${readingP.length} (${readingShort > 0 ? `⚠️  ${readingShort} too short` : '✅'})`);
  console.log(`  Science passages: ${scienceP.length} (${scienceShort > 0 ? `⚠️  ${scienceShort} too short` : '✅'})`);

  if (englishShort > 0) {
    englishP.filter(p => !p.passage_text || p.passage_text.length < 100).forEach(p => {
      issues.push({
        type: 'SHORT_PASSAGE',
        test: testNum,
        section: 'English',
        passage: p.passage_number,
        detail: `Passage text too short: ${p.passage_text?.length || 0} chars`
      });
    });
  }

  if (readingShort > 0) {
    readingP.filter(p => !p.passage_text || p.passage_text.length < 500).forEach(p => {
      issues.push({
        type: 'SHORT_PASSAGE',
        test: testNum,
        section: 'Reading',
        passage: p.passage_number,
        detail: `Passage text too short: ${p.passage_text?.length || 0} chars`
      });
    });
  }

  if (scienceShort > 0) {
    scienceP.filter(p => !p.passage_text || p.passage_text.length < 100).forEach(p => {
      issues.push({
        type: 'SHORT_PASSAGE',
        test: testNum,
        section: 'Science',
        passage: p.passage_number,
        detail: `Passage text too short: ${p.passage_text?.length || 0} chars`
      });
    });
  }
}

// ============================================================================
// 6. QUESTION TYPE & CATEGORY CONSISTENCY
// ============================================================================
console.log('\n🏷️  6. QUESTION TYPE & CATEGORY CONSISTENCY\n');

for (let testNum = 1; testNum <= 7; testNum++) {
  const { data: englishQ } = await supabase
    .from('act_english_questions')
    .select('question_type, question_category')
    .eq('test_number', testNum);

  const { data: mathQ } = await supabase
    .from('act_math_questions')
    .select('question_type, question_category')
    .eq('test_number', testNum);

  const { data: readingQ } = await supabase
    .from('act_reading_questions')
    .select('question_type, question_category')
    .eq('test_number', testNum);

  const { data: scienceQ } = await supabase
    .from('act_science_questions')
    .select('question_type, question_category')
    .eq('test_number', testNum);

  const englishMissing = englishQ.filter(q => !q.question_type || !q.question_category).length;
  const mathMissing = mathQ.filter(q => !q.question_type || !q.question_category).length;
  const readingMissing = readingQ.filter(q => !q.question_type || !q.question_category).length;
  const scienceMissing = scienceQ.filter(q => !q.question_type || !q.question_category).length;

  console.log(`Test ${testNum}:`);
  console.log(`  English: ${englishMissing > 0 ? `❌ ${englishMissing} missing type/category` : '✅ All have type/category'}`);
  console.log(`  Math: ${mathMissing > 0 ? `❌ ${mathMissing} missing type/category` : '✅ All have type/category'}`);
  console.log(`  Reading: ${readingMissing > 0 ? `❌ ${readingMissing} missing type/category` : '✅ All have type/category'}`);
  console.log(`  Science: ${scienceMissing > 0 ? `❌ ${scienceMissing} missing type/category` : '✅ All have type/category'}`);

  if (englishMissing > 0) {
    issues.push({ type: 'MISSING_METADATA', test: testNum, section: 'English', detail: `${englishMissing} questions missing type/category` });
  }
  if (mathMissing > 0) {
    issues.push({ type: 'MISSING_METADATA', test: testNum, section: 'Math', detail: `${mathMissing} questions missing type/category` });
  }
  if (readingMissing > 0) {
    issues.push({ type: 'MISSING_METADATA', test: testNum, section: 'Reading', detail: `${readingMissing} questions missing type/category` });
  }
  if (scienceMissing > 0) {
    issues.push({ type: 'MISSING_METADATA', test: testNum, section: 'Science', detail: `${scienceMissing} questions missing type/category` });
  }
}

// ============================================================================
// SUMMARY
// ============================================================================
console.log('\n' + '='.repeat(80));
console.log('\n📊 FORMATTING CONSISTENCY SUMMARY\n');

if (issues.length === 0) {
  console.log('✅ NO FORMATTING INCONSISTENCIES FOUND!\n');
  console.log('All 7 tests have consistent:');
  console.log('  • HTML tag usage (<u> tags for English)');
  console.log('  • Choice formats (4 or 5 choices as appropriate)');
  console.log('  • Answer formats (A-D or A-E)');
  console.log('  • Sentence structure patterns');
  console.log('  • Passage text storage');
  console.log('  • Question metadata (type/category)');
  console.log('\n✨ DATABASE FORMATTING IS 100% CONSISTENT ✨\n');
} else {
  console.log(`⚠️  FOUND ${issues.length} FORMATTING ISSUES\n`);

  // Group by type
  const byType = {};
  for (const issue of issues) {
    if (!byType[issue.type]) byType[issue.type] = [];
    byType[issue.type].push(issue);
  }

  for (const [type, typeIssues] of Object.entries(byType)) {
    console.log(`\n${type}: ${typeIssues.length} issues`);
    typeIssues.forEach(issue => {
      console.log(`  • Test ${issue.test} ${issue.section}${issue.question ? ` Q${issue.question}` : ''}${issue.passage ? ` P${issue.passage}` : ''}: ${issue.detail}`);
    });
  }

  console.log('\n' + '='.repeat(80));
  console.log(`\n⚠️  TOTAL ISSUES: ${issues.length}`);
  console.log('\nRecommendation: Review and fix formatting inconsistencies for production quality.\n');
}

console.log('='.repeat(80));
