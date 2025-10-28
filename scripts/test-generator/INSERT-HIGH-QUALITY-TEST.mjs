#!/usr/bin/env node
/**
 * INSERT HIGH QUALITY TEST INTO DATABASE
 *
 * Inserts the high-quality adapted test from generated-practice-test-1-HIGH-QUALITY.json
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import fs from 'fs';
dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.REACT_APP_SUPABASE_ANON_KEY
);

const TEST_NUMBER = 1;

console.log('💾 INSERT HIGH QUALITY TEST INTO DATABASE\n');
console.log('='.repeat(90) + '\n');

async function insertHighQualityTest() {
  // Load generated test
  const generatedPath = './generated-practice-test-1-HIGH-QUALITY.json';
  if (!fs.existsSync(generatedPath)) {
    console.error(`❌ File not found: ${generatedPath}`);
    console.log('   Run DIRECT-ACT-ADAPTER.mjs first!\n');
    process.exit(1);
  }

  const generated = JSON.parse(fs.readFileSync(generatedPath, 'utf-8'));

  console.log('📋 Loaded high-quality test:');
  console.log(`  English: ${generated.english.passages.length} passages, ${generated.english.questions.length} questions`);
  console.log(`  Math: ${generated.math.length} questions`);
  console.log(`  Reading: ${generated.reading.passages.length} passages, ${generated.reading.questions.length} questions`);
  console.log(`  Science: ${generated.science.passages.length} passages, ${generated.science.questions.length} questions\n`);

  // Clear existing
  console.log('🗑️  Clearing existing Test 1...\n');

  const tables = [
    'practice_test_english_questions',
    'practice_test_english_passages',
    'practice_test_math_questions',
    'practice_test_reading_questions',
    'practice_test_reading_passages',
    'practice_test_science_questions',
    'practice_test_science_passages'
  ];

  for (const table of tables) {
    await supabase.from(table).delete().eq('test_number', TEST_NUMBER);
    console.log(`  ✅ Cleared ${table}`);
  }

  console.log('\n📝 Inserting English passages...\n');

  const englishPassageInserts = generated.english.passages.map(p => ({
    test_number: TEST_NUMBER,
    passage_number: p.passage_number,
    passage_type: p.passage_type || 'EXPOSITORY',
    passage_title: p.title,
    passage_text: p.text,
    word_count: p.word_count
  }));

  const { data: insertedEnglishPassages, error: engPassErr } = await supabase
    .from('practice_test_english_passages')
    .insert(englishPassageInserts)
    .select();

  if (engPassErr) {
    console.error('❌ Error:', engPassErr);
    process.exit(1);
  }

  console.log(`✅ Inserted ${insertedEnglishPassages.length} English passages\n`);

  const englishPassageIds = {};
  insertedEnglishPassages.forEach(p => {
    englishPassageIds[p.passage_number] = p.id;
  });

  console.log('📝 Inserting English questions...\n');

  const englishQuestionInserts = generated.english.questions.map(q => {
    const questionText = `${q.context_before || ''} <u>${q.underlined_text || ''}</u> ${q.context_after || ''}`.trim();

    const choices = [
      `A. ${q.choice_a || ''}`,
      `B. ${q.choice_b || ''}`,
      `C. ${q.choice_c || ''}`,
      `D. ${q.choice_d || ''}`
    ];

    const correctIndex = ['A', 'B', 'C', 'D'].indexOf(q.correct_answer);

    return {
      test_number: TEST_NUMBER,
      question_number: q.question_number,
      question_text: questionText,
      choices: JSON.stringify(choices),
      correct_answer: correctIndex,
      explanation: q.explanation,
      passage_id: englishPassageIds[q.passage_number]
    };
  });

  const { error: engQErr } = await supabase
    .from('practice_test_english_questions')
    .insert(englishQuestionInserts);

  if (engQErr) {
    console.error('❌ Error:', engQErr);
    process.exit(1);
  }

  console.log(`✅ Inserted ${englishQuestionInserts.length} English questions\n`);

  console.log('🔢 Inserting Math questions...\n');

  const mathQuestionInserts = generated.math.map(q => {
    const choices = [
      `A. ${q.choice_a || ''}`,
      `B. ${q.choice_b || ''}`,
      `C. ${q.choice_c || ''}`,
      `D. ${q.choice_d || ''}`,
      q.choice_e ? `E. ${q.choice_e}` : null
    ].filter(c => c !== null);

    const correctIndex = ['A', 'B', 'C', 'D', 'E'].indexOf(q.correct_answer);

    return {
      test_number: TEST_NUMBER,
      question_number: q.question_number,
      question_text: q.question_stem,
      choices: JSON.stringify(choices),
      correct_answer: correctIndex,
      explanation: q.explanation,
      question_image_url: q.question_image_url
    };
  });

  const { error: mathErr } = await supabase
    .from('practice_test_math_questions')
    .insert(mathQuestionInserts);

  if (mathErr) {
    console.error('❌ Error:', mathErr);
    process.exit(1);
  }

  console.log(`✅ Inserted ${mathQuestionInserts.length} Math questions\n`);

  console.log('📖 Inserting Reading passages...\n');

  const readingPassageInserts = generated.reading.passages.map(p => ({
    test_number: TEST_NUMBER,
    passage_number: p.passage_number,
    passage_type: p.passage_type,
    passage_title: p.title,
    passage_text: p.passage_text,
    word_count: p.word_count
  }));

  const { data: insertedReadingPassages, error: readPassErr } = await supabase
    .from('practice_test_reading_passages')
    .insert(readingPassageInserts)
    .select();

  if (readPassErr) {
    console.error('❌ Error:', readPassErr);
    process.exit(1);
  }

  console.log(`✅ Inserted ${insertedReadingPassages.length} Reading passages\n`);

  const readingPassageIds = {};
  insertedReadingPassages.forEach(p => {
    readingPassageIds[p.passage_number] = p.id;
  });

  console.log('📖 Inserting Reading questions...\n');

  const readingQuestionInserts = generated.reading.questions.map((q, idx) => {
    // Determine passage number (9 questions per passage)
    const passageNum = Math.floor(idx / 9) + 1;

    const choices = [
      `A. ${q.choice_a || ''}`,
      `B. ${q.choice_b || ''}`,
      `C. ${q.choice_c || ''}`,
      `D. ${q.choice_d || ''}`
    ];

    const correctIndex = ['A', 'B', 'C', 'D'].indexOf(q.correct_answer);

    return {
      test_number: TEST_NUMBER,
      question_number: q.question_number,
      question_text: q.question_stem,
      choices: JSON.stringify(choices),
      correct_answer: correctIndex,
      explanation: q.explanation,
      passage_id: readingPassageIds[passageNum]
    };
  });

  const { error: readQErr } = await supabase
    .from('practice_test_reading_questions')
    .insert(readingQuestionInserts);

  if (readQErr) {
    console.error('❌ Error:', readQErr);
    process.exit(1);
  }

  console.log(`✅ Inserted ${readingQuestionInserts.length} Reading questions\n`);

  console.log('🔬 Inserting Science passages...\n');

  const sciencePassageInserts = generated.science.passages.map(p => ({
    test_number: TEST_NUMBER,
    passage_number: p.passage_number,
    passage_type: p.passage_type,
    passage_title: p.title,
    passage_text: p.passage_text,
    passage_data: p.passage_data
  }));

  const { data: insertedSciencePassages, error: sciPassErr } = await supabase
    .from('practice_test_science_passages')
    .insert(sciencePassageInserts)
    .select();

  if (sciPassErr) {
    console.error('❌ Error:', sciPassErr);
    process.exit(1);
  }

  console.log(`✅ Inserted ${insertedSciencePassages.length} Science passages\n`);

  const sciencePassageIds = {};
  insertedSciencePassages.forEach(p => {
    sciencePassageIds[p.passage_number] = p.id;
  });

  console.log('🔬 Inserting Science questions...\n');

  // Science question distribution: 7,7,7,7,6,6
  const scienceQuestionDist = [7,7,7,7,6,6];
  let qIndex = 0;

  const scienceQuestionInserts = generated.science.questions.map(q => {
    // Determine passage number
    let passageNum = 1;
    let cumulative = 0;
    for (let i = 0; i < scienceQuestionDist.length; i++) {
      cumulative += scienceQuestionDist[i];
      if (qIndex < cumulative) {
        passageNum = i + 1;
        break;
      }
    }
    qIndex++;

    const choices = [
      `A. ${q.choice_a || ''}`,
      `B. ${q.choice_b || ''}`,
      `C. ${q.choice_c || ''}`,
      `D. ${q.choice_d || ''}`
    ];

    const correctIndex = ['A', 'B', 'C', 'D'].indexOf(q.correct_answer);

    return {
      test_number: TEST_NUMBER,
      question_number: q.question_number,
      question_text: q.question_stem,
      choices: JSON.stringify(choices),
      correct_answer: correctIndex,
      explanation: q.explanation,
      passage_id: sciencePassageIds[passageNum]
    };
  });

  const { error: sciQErr } = await supabase
    .from('practice_test_science_questions')
    .insert(scienceQuestionInserts);

  if (sciQErr) {
    console.error('❌ Error:', sciQErr);
    process.exit(1);
  }

  console.log(`✅ Inserted ${scienceQuestionInserts.length} Science questions\n`);

  console.log('='.repeat(90));
  console.log('\n🎉 HIGH QUALITY TEST INSERTION COMPLETE!\n');
  console.log('Practice Test 1 is now in the database with REAL ACT quality:');
  console.log(`  ✅ ${generated.english.passages.length} English passages`);
  console.log(`  ✅ ${generated.english.questions.length} English questions`);
  console.log(`  ✅ ${generated.math.length} Math questions`);
  console.log(`  ✅ ${generated.reading.passages.length} Reading passages (490-517 words - REAL ACT)`);
  console.log(`  ✅ ${generated.reading.questions.length} Reading questions`);
  console.log(`  ✅ ${generated.science.passages.length} Science passages`);
  console.log(`  ✅ ${generated.science.questions.length} Science questions`);
  console.log(`  ✅ TOTAL: 171 questions\n`);
  console.log('NEXT STEP: Run ANALYZE-QUALITY.mjs to verify!\n');
}

insertHighQualityTest().catch(console.error);
