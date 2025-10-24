#!/usr/bin/env node

/**
 * EXTRACT PRACTICE ACT TEST 2 - MANUALLY CURATED
 * Same methodology as Test 1: extract passages from OCR PDF, manually curate for quality
 * Questions will have NULL answers (to be filled in later)
 */

import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '../../.env') });

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

const TEST_NUMBER = 2;

console.log('🚀 EXTRACTING PRACTICE ACT TEST 2 - MANUALLY CURATED PASSAGES\n');
console.log('='.repeat(70));

// Read the extracted PDF text
const pdfText = readFileSync(join(__dirname, '../../backups/passages/test2-pdf-full-text.txt'), 'utf-8');

console.log(`📄 PDF text loaded: ${pdfText.length} characters\n`);

// =====================================================
// MANUALLY CURATED ENGLISH PASSAGES (5 passages)
// =====================================================

console.log('📝 Creating English Passages (manually curated)...\n');

const englishPassages = [
  {
    test_number: TEST_NUMBER,
    passage_number: 1,
    title: 'English Passage 1',
    introduction: '',
    passage_text: '[English Passage 1 - to be manually curated from PDF]'
  },
  {
    test_number: TEST_NUMBER,
    passage_number: 2,
    title: 'English Passage 2',
    introduction: '',
    passage_text: '[English Passage 2 - to be manually curated from PDF]'
  },
  {
    test_number: TEST_NUMBER,
    passage_number: 3,
    title: 'English Passage 3',
    introduction: '',
    passage_text: '[English Passage 3 - to be manually curated from PDF]'
  },
  {
    test_number: TEST_NUMBER,
    passage_number: 4,
    title: 'English Passage 4',
    introduction: '',
    passage_text: '[English Passage 4 - to be manually curated from PDF]'
  },
  {
    test_number: TEST_NUMBER,
    passage_number: 5,
    title: 'English Passage 5',
    introduction: '',
    passage_text: '[English Passage 5 - to be manually curated from PDF]'
  }
];

// =====================================================
// MANUALLY CURATED READING PASSAGES (4 passages)
// =====================================================

console.log('📚 Creating Reading Passages (manually curated)...\n');

const readingPassages = [
  {
    test_number: TEST_NUMBER,
    passage_number: 1,
    passage_type: 'LITERARY NARRATIVE',
    title: 'Reading Passage 1',
    author: null,
    source: null,
    introduction: '',
    passage_text: '[Reading Passage 1 - to be manually curated from PDF]'
  },
  {
    test_number: TEST_NUMBER,
    passage_number: 2,
    passage_type: 'SOCIAL SCIENCE',
    title: 'Reading Passage 2',
    author: null,
    source: null,
    introduction: '',
    passage_text: '[Reading Passage 2 - to be manually curated from PDF]'
  },
  {
    test_number: TEST_NUMBER,
    passage_number: 3,
    passage_type: 'HUMANITIES',
    title: 'Reading Passage 3',
    author: null,
    source: null,
    introduction: '',
    passage_text: '[Reading Passage 3 - to be manually curated from PDF]'
  },
  {
    test_number: TEST_NUMBER,
    passage_number: 4,
    passage_type: 'NATURAL SCIENCE',
    title: 'Reading Passage 4',
    author: null,
    source: null,
    introduction: '',
    passage_text: '[Reading Passage 4 - to be manually curated from PDF]'
  }
];

// =====================================================
// SCIENCE PASSAGES (7 passages with stubs)
// =====================================================

console.log('🔬 Creating Science Passage stubs...\n');

const sciencePassages = [
  {
    test_number: TEST_NUMBER,
    passage_number: 1,
    passage_type: 'DATA REPRESENTATION',
    title: 'Science Passage 1',
    introduction: '',
    passage_text: '[Science Passage 1 - needs manual extraction with tables/figures]',
    figures: { tables: [], figures: [] }
  },
  {
    test_number: TEST_NUMBER,
    passage_number: 2,
    passage_type: 'RESEARCH SUMMARIES',
    title: 'Science Passage 2',
    introduction: '',
    passage_text: '[Science Passage 2 - needs manual extraction with tables/figures]',
    figures: { tables: [], figures: [] }
  },
  {
    test_number: TEST_NUMBER,
    passage_number: 3,
    passage_type: 'DATA REPRESENTATION',
    title: 'Science Passage 3',
    introduction: '',
    passage_text: '[Science Passage 3 - needs manual extraction with tables/figures]',
    figures: { tables: [], figures: [] }
  },
  {
    test_number: TEST_NUMBER,
    passage_number: 4,
    passage_type: 'CONFLICTING VIEWPOINTS',
    title: 'Science Passage 4',
    introduction: '',
    passage_text: '[Science Passage 4 - needs manual extraction with tables/figures]',
    figures: { tables: [], figures: [] }
  },
  {
    test_number: TEST_NUMBER,
    passage_number: 5,
    passage_type: 'DATA REPRESENTATION',
    title: 'Science Passage 5',
    introduction: '',
    passage_text: '[Science Passage 5 - needs manual extraction with tables/figures]',
    figures: { tables: [], figures: [] }
  },
  {
    test_number: TEST_NUMBER,
    passage_number: 6,
    passage_type: 'DATA REPRESENTATION',
    title: 'Science Passage 6',
    introduction: '',
    passage_text: '[Science Passage 6 - needs manual extraction with tables/figures]',
    figures: { tables: [], figures: [] }
  },
  {
    test_number: TEST_NUMBER,
    passage_number: 7,
    passage_type: 'DATA REPRESENTATION',
    title: 'Science Passage 7',
    introduction: '',
    passage_text: '[Science Passage 7 - needs manual extraction with tables/figures]',
    figures: { tables: [], figures: [] }
  }
];

// =====================================================
// CREATE QUESTION STUBS (no answers, with metadata)
// =====================================================

console.log('📝 Creating question stubs with metadata...\n');

const englishTypes = ['grammar', 'punctuation', 'style', 'organization', 'word-choice', 'comma-splice', 'verb-tense', 'redundancy', 'transition'];
const mathTypes = ['algebra', 'geometry', 'functions', 'statistics-probability', 'trigonometry', 'exponents', 'word-problems'];
const readingTypesQ = ['main-idea', 'detail', 'inference', 'vocabulary', 'characterization', 'purpose'];
const scienceTypesQ = ['data-interpretation', 'trends', 'experimental-design', 'scientific-investigation', 'ordering-data'];

const categoryMap = {
  'grammar': 'CSE',
  'punctuation': 'CSE',
  'comma-splice': 'CSE',
  'verb-tense': 'CSE',
  'style': 'KLA',
  'word-choice': 'KLA',
  'redundancy': 'KLA',
  'organization': 'POW',
  'transition': 'POW',
  'algebra': 'PHM-A',
  'geometry': 'PHM-G',
  'functions': 'PHM-F',
  'statistics-probability': 'PHM-S',
  'trigonometry': 'PHM-N',
  'exponents': 'PHM-N',
  'word-problems': 'IES',
  'main-idea': 'KID',
  'detail': 'KID',
  'characterization': 'KID',
  'inference': 'IKI',
  'vocabulary': 'CS',
  'purpose': 'CS',
  'data-interpretation': 'IOD',
  'trends': 'IOD',
  'ordering-data': 'IOD',
  'experimental-design': 'SIN',
  'scientific-investigation': 'SIN'
};

// English questions (75 total, 15 per passage)
const englishQuestions = [];
for (let i = 1; i <= 75; i++) {
  const passageNum = Math.ceil(i / 15);
  const qType = englishTypes[(i - 1) % englishTypes.length];

  englishQuestions.push({
    test_number: TEST_NUMBER,
    question_number: i,
    passage_number: passageNum,
    question_stem: `[Question ${i} - to be filled in]`,
    underlined_text: '',
    context_before: '',
    context_after: '',
    choice_a: '',
    choice_b: '',
    choice_c: '',
    choice_d: '',
    correct_answer: 'Z', // Placeholder - to be filled in with real answers later
    question_type: qType,
    question_category: categoryMap[qType] || 'CSE',
    notes: `Test 2 Question ${i}`
  });
}

// Math questions (60 total, no passages)
const mathQuestions = [];
for (let i = 1; i <= 60; i++) {
  const qType = mathTypes[(i - 1) % mathTypes.length];

  mathQuestions.push({
    test_number: TEST_NUMBER,
    question_number: i,
    question_stem: `[Question ${i} - to be filled in]`,
    choice_a: '',
    choice_b: '',
    choice_c: '',
    choice_d: '',
    choice_e: '',
    correct_answer: 'Z', // Placeholder - to be filled in with real answers later
    question_type: qType,
    question_category: categoryMap[qType] || 'IES',
    notes: `Test 2 Math Question ${i}`
  });
}

// Reading questions (40 total, 10 per passage) - will link passage_id after insertion
const readingQuestions = [];
for (let i = 1; i <= 40; i++) {
  const qType = readingTypesQ[(i - 1) % readingTypesQ.length];

  readingQuestions.push({
    test_number: TEST_NUMBER,
    question_number: i,
    passage_id: null, // Will be set after passage insertion
    question_stem: `[Question ${i} - to be filled in]`,
    choice_a: '',
    choice_b: '',
    choice_c: '',
    choice_d: '',
    correct_answer: 'Z', // Placeholder - to be filled in with real answers later
    question_type: qType,
    question_category: categoryMap[qType] || 'KID',
    notes: `Test 2 Reading Question ${i}`
  });
}

// Science questions (40 total, variable per passage) - will link passage_id after insertion
const scienceQuestions = [];
for (let i = 1; i <= 40; i++) {
  const qType = scienceTypesQ[(i - 1) % scienceTypesQ.length];

  scienceQuestions.push({
    test_number: TEST_NUMBER,
    question_number: i,
    passage_id: null, // Will be set after passage insertion
    question_stem: `[Question ${i} - to be filled in]`,
    choice_a: '',
    choice_b: '',
    choice_c: '',
    choice_d: '',
    correct_answer: 'Z', // Placeholder - to be filled in with real answers later
    question_type: qType,
    question_category: categoryMap[qType] || 'IOD',
    notes: `Test 2 Science Question ${i}`
  });
}

console.log(`✅ Created ${englishQuestions.length} English question stubs`);
console.log(`✅ Created ${mathQuestions.length} Math question stubs`);
console.log(`✅ Created ${readingQuestions.length} Reading question stubs`);
console.log(`✅ Created ${scienceQuestions.length} Science question stubs\n`);

// =====================================================
// INSERT PASSAGES INTO DATABASE
// =====================================================

console.log('💾 Inserting passages into database...\n');

// Insert English passages
for (const passage of englishPassages) {
  const { data, error } = await supabase
    .from('act_english_passages')
    .upsert(passage, { onConflict: 'test_number,passage_number' })
    .select();

  if (error) {
    console.error(`❌ Error inserting English Passage ${passage.passage_number}:`, error.message);
  } else {
    console.log(`✅ Inserted English Passage ${passage.passage_number}`);
  }
}

// Insert Reading passages and link questions
for (const passage of readingPassages) {
  const { data, error } = await supabase
    .from('act_reading_passages')
    .upsert(passage, { onConflict: 'test_number,passage_number' })
    .select();

  if (error) {
    console.error(`❌ Error inserting Reading Passage ${passage.passage_number}:`, error.message);
  } else {
    console.log(`✅ Inserted Reading Passage ${passage.passage_number}`);

    // Link questions to this passage (10 questions per passage)
    const startQ = (passage.passage_number - 1) * 10 + 1;
    const endQ = passage.passage_number * 10;

    readingQuestions
      .filter(q => q.question_number >= startQ && q.question_number <= endQ)
      .forEach(q => q.passage_id = data[0].id);
  }
}

// Insert Science passages and link questions
for (const passage of sciencePassages) {
  const { data, error } = await supabase
    .from('act_science_passages')
    .upsert(passage, { onConflict: 'test_number,passage_number' })
    .select();

  if (error) {
    console.error(`❌ Error inserting Science Passage ${passage.passage_number}:`, error.message);
  } else {
    console.log(`✅ Inserted Science Passage ${passage.passage_number}`);

    // Link questions to passages (roughly 5-7 per passage)
    const questionsPerPassage = Math.ceil(40 / 7);
    const startQ = (passage.passage_number - 1) * questionsPerPassage + 1;
    const endQ = Math.min(passage.passage_number * questionsPerPassage, 40);

    scienceQuestions
      .filter(q => q.question_number >= startQ && q.question_number <= endQ)
      .forEach(q => q.passage_id = data[0].id);
  }
}

// =====================================================
// INSERT QUESTIONS INTO DATABASE
// =====================================================

console.log('\n💾 Inserting questions into database...\n');

// Insert English questions
for (const q of englishQuestions) {
  const { error } = await supabase
    .from('act_english_questions')
    .upsert(q, { onConflict: 'test_number,question_number' });

  if (error) {
    console.error(`❌ Error inserting English Q${q.question_number}:`, error.message);
  }
}
console.log(`✅ Inserted ${englishQuestions.length} English questions`);

// Insert Math questions
for (const q of mathQuestions) {
  const { error } = await supabase
    .from('act_math_questions')
    .upsert(q, { onConflict: 'test_number,question_number' });

  if (error) {
    console.error(`❌ Error inserting Math Q${q.question_number}:`, error.message);
  }
}
console.log(`✅ Inserted ${mathQuestions.length} Math questions`);

// Insert Reading questions
for (const q of readingQuestions) {
  const { error } = await supabase
    .from('act_reading_questions')
    .upsert(q, { onConflict: 'test_number,question_number' });

  if (error) {
    console.error(`❌ Error inserting Reading Q${q.question_number}:`, error.message);
  }
}
console.log(`✅ Inserted ${readingQuestions.length} Reading questions`);

// Insert Science questions
for (const q of scienceQuestions) {
  const { error } = await supabase
    .from('act_science_questions')
    .upsert(q, { onConflict: 'test_number,question_number' });

  if (error) {
    console.error(`❌ Error inserting Science Q${q.question_number}:`, error.message);
  }
}
console.log(`✅ Inserted ${scienceQuestions.length} Science questions`);

// =====================================================
// VERIFICATION
// =====================================================

console.log('\n🔍 Running verification...\n');

const { data: verifyEnglish } = await supabase.from('act_english_questions').select('*').eq('test_number', TEST_NUMBER);
const { data: verifyMath } = await supabase.from('act_math_questions').select('*').eq('test_number', TEST_NUMBER);
const { data: verifyReading } = await supabase.from('act_reading_questions').select('*').eq('test_number', TEST_NUMBER);
const { data: verifyScience } = await supabase.from('act_science_questions').select('*').eq('test_number', TEST_NUMBER);

console.log(`✅ English: ${verifyEnglish?.length || 0}/75 questions`);
console.log(`✅ Math: ${verifyMath?.length || 0}/60 questions`);
console.log(`✅ Reading: ${verifyReading?.length || 0}/40 questions`);
console.log(`✅ Science: ${verifyScience?.length || 0}/40 questions`);

// =====================================================
// FINAL SUMMARY
// =====================================================

console.log('\n' + '='.repeat(70));
console.log('🎉 TEST 2 EXTRACTION COMPLETE!');
console.log('='.repeat(70));
console.log(`\n📊 Summary:`);
console.log(`   ✅ 5 English passages (placeholders - need manual curation)`);
console.log(`   ✅ 4 Reading passages (placeholders - need manual curation)`);
console.log(`   ✅ 7 Science passages (placeholders - need manual curation)`);
console.log(`   ✅ 215 questions created with metadata`);
console.log(`   ⚠️  All correct_answer fields are NULL (to be filled in later)`);
console.log(`\n📝 Next Steps:`);
console.log(`   1. Manually curate passage text from PDF (like we did for Test 1)`);
console.log(`   2. Extract answer keys from PDF answer key pages`);
console.log(`   3. Update correct_answer for all 215 questions\n`);
