#!/usr/bin/env node
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

console.log('🎯 INSERTING PRACTICE TEST 8 TO DATABASE\n');

// Load complete test
const test = JSON.parse(fs.readFileSync('test-8-complete-auto.json', 'utf8'));

async function insertTest() {
  try {
    // STEP 1: Clear existing practice_test data (Test 8 if exists)
    console.log('🗑️  Clearing existing Test 8 data (if any)...');

    await supabase.from('practice_test_english_questions').delete().eq('test_number', 8);
    await supabase.from('practice_test_english_passages').delete().eq('test_number', 8);
    await supabase.from('practice_test_math_questions').delete().eq('test_number', 8);
    await supabase.from('practice_test_reading_questions').delete().eq('test_number', 8);
    await supabase.from('practice_test_reading_passages').delete().eq('test_number', 8);
    await supabase.from('practice_test_science_questions').delete().eq('test_number', 8);
    await supabase.from('practice_test_science_passages').delete().eq('test_number', 8);

    console.log('   ✅ Cleared old data\n');

    // STEP 2: Insert English passages
    console.log('📝 Inserting English passages...');
    const englishPassages = test.english.passages.map(p => ({
      test_number: 8,
      passage_number: p.passage_number,
      title: p.title,
      passage_text: p.passage_text
    }));

    const { error: epError } = await supabase
      .from('practice_test_english_passages')
      .insert(englishPassages);

    if (epError) throw epError;
    console.log(`   ✅ Inserted ${englishPassages.length} English passages\n`);

    // STEP 3: Insert English questions
    console.log('📝 Inserting English questions...');
    const englishQuestions = test.english.questions.map(q => ({
      test_number: 8,
      question_number: q.question_number,
      passage_number: q.passage_number,
      question_type: q.question_type,
      question_category: q.question_category,
      difficulty_level: q.difficulty_level,
      context_before: q.context_before,
      underlined_text: q.underlined_text,
      context_after: q.context_after,
      question_stem: q.question_stem,
      choice_a: q.choice_a,
      choice_b: q.choice_b,
      choice_c: q.choice_c,
      choice_d: q.choice_d,
      correct_answer: q.correct_answer,
      notes: q.notes,
      lesson_id: q.lesson_id
    }));

    const { error: eqError } = await supabase
      .from('practice_test_english_questions')
      .insert(englishQuestions);

    if (eqError) throw eqError;
    console.log(`   ✅ Inserted ${englishQuestions.length} English questions\n`);

    // STEP 4: Insert Math questions
    console.log('🔢 Inserting Math questions...');
    const mathQuestions = test.math.questions.map(q => ({
      test_number: 8,
      question_number: q.question_number,
      difficulty_level: q.difficulty_level,
      topic: q.topic,
      question_stem: q.question_stem,
      choice_a: q.choice_a,
      choice_b: q.choice_b,
      choice_c: q.choice_c,
      choice_d: q.choice_d,
      choice_e: q.choice_e,
      correct_answer: q.correct_answer,
      notes: q.notes,
      lesson_id: q.lesson_id
    }));

    const { error: mqError } = await supabase
      .from('practice_test_math_questions')
      .insert(mathQuestions);

    if (mqError) throw mqError;
    console.log(`   ✅ Inserted ${mathQuestions.length} Math questions\n`);

    // STEP 5: Insert Reading passages
    console.log('📖 Inserting Reading passages...');
    const readingPassages = test.reading.passages.map(p => ({
      test_number: 8,
      passage_number: p.passage_number,
      title: p.title,
      passage_text: p.passage_text,
      passage_type: p.passage_type
    }));

    const { error: rpError } = await supabase
      .from('practice_test_reading_passages')
      .insert(readingPassages);

    if (rpError) throw rpError;
    console.log(`   ✅ Inserted ${readingPassages.length} Reading passages\n`);

    // STEP 6: Insert Reading questions
    console.log('📖 Inserting Reading questions...');
    const readingQuestions = test.reading.questions.map(q => ({
      test_number: 8,
      question_number: q.question_number,
      passage_number: q.passage_number,
      difficulty_level: q.difficulty_level,
      question_stem: q.question_stem,
      choice_a: q.choice_a,
      choice_b: q.choice_b,
      choice_c: q.choice_c,
      choice_d: q.choice_d,
      correct_answer: q.correct_answer,
      notes: q.notes,
      lesson_id: q.lesson_id
    }));

    const { error: rqError } = await supabase
      .from('practice_test_reading_questions')
      .insert(readingQuestions);

    if (rqError) throw rqError;
    console.log(`   ✅ Inserted ${readingQuestions.length} Reading questions\n`);

    // STEP 7: Insert Science passages
    console.log('🔬 Inserting Science passages...');
    const sciencePassages = test.science.passages.map(p => ({
      test_number: 8,
      passage_number: p.passage_number,
      title: p.title,
      passage_text: p.passage_text,
      passage_type: p.passage_type,
      has_figures: p.has_figures,
      figure_count: p.figure_count
    }));

    const { error: spError } = await supabase
      .from('practice_test_science_passages')
      .insert(sciencePassages);

    if (spError) throw spError;
    console.log(`   ✅ Inserted ${sciencePassages.length} Science passages\n`);

    // STEP 8: Insert Science questions
    console.log('🔬 Inserting Science questions...');
    const scienceQuestions = test.science.questions.map(q => ({
      test_number: 8,
      question_number: q.question_number,
      passage_number: q.passage_number,
      difficulty_level: q.difficulty_level,
      question_stem: q.question_stem,
      choice_a: q.choice_a,
      choice_b: q.choice_b,
      choice_c: q.choice_c,
      choice_d: q.choice_d,
      correct_answer: q.correct_answer,
      notes: q.notes,
      lesson_id: q.lesson_id
    }));

    const { error: sqError } = await supabase
      .from('practice_test_science_questions')
      .insert(scienceQuestions);

    if (sqError) throw sqError;
    console.log(`   ✅ Inserted ${scienceQuestions.length} Science questions\n`);

    // FINAL SUMMARY
    console.log('═══════════════════════════════════════════════');
    console.log('✅ PRACTICE TEST 8 SUCCESSFULLY INSERTED');
    console.log('═══════════════════════════════════════════════');
    console.log('📊 DATABASE RECORDS CREATED:');
    console.log(`   • English: ${englishPassages.length} passages, ${englishQuestions.length} questions`);
    console.log(`   • Math: ${mathQuestions.length} questions`);
    console.log(`   • Reading: ${readingPassages.length} passages, ${readingQuestions.length} questions`);
    console.log(`   • Science: ${sciencePassages.length} passages, ${scienceQuestions.length} questions`);
    console.log(`   • TOTAL: 215 questions, 15 passages`);
    console.log('\n🎯 NEXT STEPS:');
    console.log('   1. Review English section (production-ready)');
    console.log('   2. Refine Math/Reading/Science question stems');
    console.log('   3. Add actual passage text for Reading/Science');
    console.log('   4. Verify all answer keys');
    console.log('   5. Test in application\n');

  } catch (error) {
    console.error('❌ ERROR:', error.message);
    console.error('Details:', error);
    process.exit(1);
  }
}

insertTest();
