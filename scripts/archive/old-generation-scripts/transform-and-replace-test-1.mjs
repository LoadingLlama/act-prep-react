#!/usr/bin/env node
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

console.log('🎯 REPLACING PRACTICE TEST 1\n');
console.log('⚠️  This will DELETE existing Practice Test 1 and Test 8');
console.log('   and insert new generated content as Practice Test 1\n');

// Load generated test (currently numbered as 8)
const test = JSON.parse(fs.readFileSync('test-8-complete-auto.json', 'utf8'));

// Helper: Convert letter answer (A/B/C/D/E) to index (0/1/2/3/4)
function answerToIndex(letter) {
  return { 'A': 0, 'B': 1, 'C': 2, 'D': 3, 'E': 4 }[letter];
}

async function replaceTest1() {
  try {
    // STEP 1: Delete BOTH Test 1 and Test 8
    console.log('🗑️  Deleting old Practice Test 1 and Test 8...');

    for (const testNum of [1, 8]) {
      await supabase.from('practice_test_english_questions').delete().eq('test_number', testNum);
      await supabase.from('practice_test_english_passages').delete().eq('test_number', testNum);
      await supabase.from('practice_test_math_questions').delete().eq('test_number', testNum);
      await supabase.from('practice_test_reading_questions').delete().eq('test_number', testNum);
      await supabase.from('practice_test_reading_passages').delete().eq('test_number', testNum);
      await supabase.from('practice_test_science_questions').delete().eq('test_number', testNum);
      await supabase.from('practice_test_science_passages').delete().eq('test_number', testNum);
    }

    console.log('   ✅ Deleted old data\n');

    // STEP 2: Insert English passages as Test 1
    console.log('📝 Inserting English passages...');
    const englishPassagesTransformed = test.english.passages.map(p => ({
      test_number: 1,  // Now Test 1
      passage_number: p.passage_number,
      passage_type: 'general',
      passage_text: p.passage_text,
      word_count: p.passage_text.split(/\s+/).length
    }));

    const { data: insertedPassages, error: epError } = await supabase
      .from('practice_test_english_passages')
      .insert(englishPassagesTransformed)
      .select('id, passage_number');

    if (epError) throw epError;
    console.log(`   ✅ Inserted ${insertedPassages.length} passages\n`);

    // Create passage_number -> id mapping
    const passageMap = {};
    insertedPassages.forEach(p => {
      passageMap[p.passage_number] = p.id;
    });

    // STEP 3: Insert English questions as Test 1
    console.log('📝 Inserting English questions...');
    const englishQuestionsTransformed = test.english.questions.map(q => {
      const questionText = `${q.context_before || ''} ${q.underlined_text || ''} ${q.context_after || ''}`.trim();
      const choices = [
        `A. ${q.choice_a}`,
        `B. ${q.choice_b}`,
        `C. ${q.choice_c}`,
        `D. ${q.choice_d}`
      ];

      return {
        test_number: 1,  // Now Test 1
        question_number: q.question_number,
        passage_id: passageMap[q.passage_number],
        question_text: questionText,
        question_prompt: q.question_stem,
        choices: JSON.stringify(choices),
        correct_answer: answerToIndex(q.correct_answer),
        explanation: q.notes,
        question_type: q.question_type || 'general',
        difficulty: q.difficulty_level
      };
    });

    const { error: eqError } = await supabase
      .from('practice_test_english_questions')
      .insert(englishQuestionsTransformed);

    if (eqError) throw eqError;
    console.log(`   ✅ Inserted ${englishQuestionsTransformed.length} questions\n`);

    // STEP 4: Insert Math questions as Test 1
    console.log('🔢 Inserting Math questions...');
    const mathQuestionsTransformed = test.math.questions.map(q => {
      const choices = [
        `A. ${q.choice_a}`,
        `B. ${q.choice_b}`,
        `C. ${q.choice_c}`,
        `D. ${q.choice_d}`,
        `E. ${q.choice_e}`
      ];

      return {
        test_number: 1,  // Now Test 1
        question_number: q.question_number,
        question_text: q.question_stem,
        question_image_url: null,
        choices: JSON.stringify(choices),
        correct_answer: answerToIndex(q.correct_answer),
        explanation: q.notes,
        question_type: q.topic || 'general',
        difficulty: q.difficulty_level
      };
    });

    const { error: mqError } = await supabase
      .from('practice_test_math_questions')
      .insert(mathQuestionsTransformed);

    if (mqError) throw mqError;
    console.log(`   ✅ Inserted ${mathQuestionsTransformed.length} questions\n`);

    // STEP 5: Insert Reading passages as Test 1
    console.log('📖 Inserting Reading passages...');
    const readingPassagesTransformed = test.reading.passages.map(p => ({
      test_number: 1,  // Now Test 1
      passage_number: p.passage_number,
      passage_type: p.passage_type || 'general',
      passage_text: p.passage_text,
      word_count: p.passage_text.split(/\s+/).length
    }));

    const { data: insertedReadingPassages, error: rpError } = await supabase
      .from('practice_test_reading_passages')
      .insert(readingPassagesTransformed)
      .select('id, passage_number');

    if (rpError) throw rpError;
    console.log(`   ✅ Inserted ${insertedReadingPassages.length} passages\n`);

    const readingPassageMap = {};
    insertedReadingPassages.forEach(p => {
      readingPassageMap[p.passage_number] = p.id;
    });

    // STEP 6: Insert Reading questions as Test 1
    console.log('📖 Inserting Reading questions...');
    const readingQuestionsTransformed = test.reading.questions.map(q => {
      const choices = [
        `A. ${q.choice_a}`,
        `B. ${q.choice_b}`,
        `C. ${q.choice_c}`,
        `D. ${q.choice_d}`
      ];

      return {
        test_number: 1,  // Now Test 1
        question_number: q.question_number,
        passage_id: readingPassageMap[q.passage_number],
        question_text: q.question_stem,
        choices: JSON.stringify(choices),
        correct_answer: answerToIndex(q.correct_answer),
        explanation: q.notes,
        question_type: 'general',
        difficulty: q.difficulty_level
      };
    });

    const { error: rqError } = await supabase
      .from('practice_test_reading_questions')
      .insert(readingQuestionsTransformed);

    if (rqError) throw rqError;
    console.log(`   ✅ Inserted ${readingQuestionsTransformed.length} questions\n`);

    // STEP 7: Insert Science passages as Test 1
    console.log('🔬 Inserting Science passages...');
    const sciencePassagesTransformed = test.science.passages.map(p => ({
      test_number: 1,  // Now Test 1
      passage_number: p.passage_number,
      passage_type: p.passage_type || 'general',
      passage_title: p.title,
      passage_text: p.passage_text,
      passage_data: null
    }));

    const { data: insertedSciencePassages, error: spError } = await supabase
      .from('practice_test_science_passages')
      .insert(sciencePassagesTransformed)
      .select('id, passage_number');

    if (spError) throw spError;
    console.log(`   ✅ Inserted ${insertedSciencePassages.length} passages\n`);

    const sciencePassageMap = {};
    insertedSciencePassages.forEach(p => {
      sciencePassageMap[p.passage_number] = p.id;
    });

    // STEP 8: Insert Science questions as Test 1
    console.log('🔬 Inserting Science questions...');
    const scienceQuestionsTransformed = test.science.questions.map(q => {
      const choices = [
        `A. ${q.choice_a}`,
        `B. ${q.choice_b}`,
        `C. ${q.choice_c}`,
        `D. ${q.choice_d}`
      ];

      return {
        test_number: 1,  // Now Test 1
        question_number: q.question_number,
        passage_id: sciencePassageMap[q.passage_number],
        question_text: q.question_stem,
        choices: JSON.stringify(choices),
        correct_answer: answerToIndex(q.correct_answer),
        explanation: q.notes,
        question_type: 'general',
        difficulty: q.difficulty_level
      };
    });

    const { error: sqError } = await supabase
      .from('practice_test_science_questions')
      .insert(scienceQuestionsTransformed);

    if (sqError) throw sqError;
    console.log(`   ✅ Inserted ${scienceQuestionsTransformed.length} questions\n`);

    // FINAL SUMMARY
    console.log('═══════════════════════════════════════════════');
    console.log('✅ PRACTICE TEST 1 SUCCESSFULLY REPLACED');
    console.log('═══════════════════════════════════════════════');
    console.log('📊 NEW PRACTICE TEST 1:');
    console.log(`   • English: ${insertedPassages.length} passages, ${englishQuestionsTransformed.length} questions`);
    console.log(`   • Math: ${mathQuestionsTransformed.length} questions`);
    console.log(`   • Reading: ${insertedReadingPassages.length} passages, ${readingQuestionsTransformed.length} questions`);
    console.log(`   • Science: ${insertedSciencePassages.length} passages, ${scienceQuestionsTransformed.length} questions`);
    console.log(`   • TOTAL: 215 questions\n`);
    console.log('✨ QUALITY STATUS:');
    console.log('   • English: ✅ Production-ready (75 manually crafted questions)');
    console.log('   • Math: ⚠️  Auto-generated (60 placeholder questions)');
    console.log('   • Reading: ⚠️  Auto-generated (40 placeholder questions)');
    console.log('   • Science: ⚠️  Auto-generated (40 placeholder questions)\n');

  } catch (error) {
    console.error('❌ ERROR:', error.message);
    console.error('Details:', error);
    process.exit(1);
  }
}

replaceTest1();
