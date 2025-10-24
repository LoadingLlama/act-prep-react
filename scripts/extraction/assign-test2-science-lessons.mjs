#!/usr/bin/env node

/**
 * ASSIGN TEST 2 SCIENCE LESSONS
 * Assign lesson_id and difficulty_level to all Science questions based on Test 1 patterns
 */

import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '../../.env') });

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

const TEST_NUMBER = 2;

console.log('🔬 ASSIGNING LESSON_ID AND DIFFICULTY_LEVEL TO TEST 2 SCIENCE QUESTIONS\n');
console.log('='.repeat(70));

// Science lesson mapping from Test 1 analysis
const scienceLessonMapping = {
  // Data Analysis & Interpretation
  'data-interpretation': { lesson_id: '53c5676d-0fa7-4416-8848-38268483599e', difficulty_level: 'medium' },
  'ordering-data': { lesson_id: '53c5676d-0fa7-4416-8848-38268483599e', difficulty_level: 'hard' },
  'comparison': { lesson_id: '53c5676d-0fa7-4416-8848-38268483599e', difficulty_level: 'medium' },
  'trends': { lesson_id: 'b8825e84-e3de-4642-913e-fc5c1ea70690', difficulty_level: 'easy' },

  // Experimental Design & Analysis
  'experimental-design': { lesson_id: '1513e653-31c1-418d-9e7f-f91253d9438b', difficulty_level: 'medium' },
  'application': { lesson_id: '1513e653-31c1-418d-9e7f-f91253d9438b', difficulty_level: 'hard' },

  // Advanced Reasoning
  'two-part-reasoning': { lesson_id: 'eb0ae215-47e8-4b48-8251-250067974600', difficulty_level: 'hard' },
  'approximation': { lesson_id: '4ca7c266-f0e2-48ff-adbd-204ae486d503', difficulty_level: 'hard' },

  // Conflicting Viewpoints & Information
  'conflicting-viewpoints': { lesson_id: '6f9652ad-13d6-447f-bc9f-df706d1e45aa', difficulty_level: 'medium' },
  'finding-information': { lesson_id: '42594785-0153-49f9-bedf-b2daf9bb837a', difficulty_level: 'hard' }
};

// Function to determine question type and difficulty based on content
function analyzeQuestion(questionStem, questionNumber) {
  const stem = questionStem.toLowerCase();

  // Determine question type based on content
  let questionType = 'data-interpretation'; // default
  let difficulty = 'medium'; // default

  // Data interpretation indicators
  if (stem.includes('table') || stem.includes('figure') || stem.includes('graph') ||
      stem.includes('chart') || stem.includes('according to') || stem.includes('based on')) {
    questionType = 'data-interpretation';
  }

  // Comparison indicators
  else if (stem.includes('compare') || stem.includes('comparing') || stem.includes('greater') ||
           stem.includes('less') || stem.includes('highest') || stem.includes('lowest') ||
           stem.includes('most') || stem.includes('least')) {
    questionType = 'comparison';
  }

  // Trends indicators
  else if (stem.includes('trend') || stem.includes('increase') || stem.includes('decrease') ||
           stem.includes('pattern') || stem.includes('over time') || stem.includes('as') ||
           stem.includes('general trend')) {
    questionType = 'trends';
  }

  // Experimental design indicators
  else if (stem.includes('experiment') || stem.includes('method') || stem.includes('procedure') ||
           stem.includes('design') || stem.includes('control') || stem.includes('variable')) {
    questionType = 'experimental-design';
  }

  // Application indicators
  else if (stem.includes('apply') || stem.includes('predict') || stem.includes('if') ||
           stem.includes('would') || stem.includes('could') || stem.includes('best explains')) {
    questionType = 'application';
  }

  // Two-part reasoning indicators
  else if (stem.includes('which of the following') || stem.includes('statements') ||
           stem.includes('both') || stem.includes('neither') || stem.includes('and')) {
    questionType = 'two-part-reasoning';
  }

  // Finding information indicators
  else if (stem.includes('information') || stem.includes('data') || stem.includes('results') ||
           stem.includes('findings') || stem.includes('passage')) {
    questionType = 'finding-information';
  }

  // Conflicting viewpoints indicators
  else if (stem.includes('viewpoint') || stem.includes('theory') || stem.includes('hypothesis') ||
           stem.includes('model') || stem.includes('supports') || stem.includes('contradicts')) {
    questionType = 'conflicting-viewpoints';
  }

  // Ordering data indicators
  else if (stem.includes('order') || stem.includes('sequence') || stem.includes('rank') ||
           stem.includes('arrange') || stem.includes('increasing') || stem.includes('decreasing')) {
    questionType = 'ordering-data';
  }

  // Approximation indicators
  else if (stem.includes('approximately') || stem.includes('estimate') || stem.includes('closest') ||
           stem.includes('about') || stem.includes('nearly')) {
    questionType = 'approximation';
  }

  // Determine difficulty based on question content complexity and position
  if (questionNumber <= 13) {
    difficulty = 'easy';
  } else if (questionNumber <= 27) {
    difficulty = 'medium';
  } else {
    difficulty = 'hard';
  }

  // Override difficulty for certain types
  if (questionType === 'trends') difficulty = 'easy';
  if (questionType === 'ordering-data' || questionType === 'two-part-reasoning' ||
      questionType === 'application' || questionType === 'approximation' ||
      questionType === 'finding-information') {
    difficulty = 'hard';
  }

  return { questionType, difficulty };
}

// Get all Test 2 Science questions
const { data: scienceQuestions, error: fetchError } = await supabase
  .from('act_science_questions')
  .select('question_number, question_stem, lesson_id, difficulty_level')
  .eq('test_number', TEST_NUMBER)
  .order('question_number');

if (fetchError) {
  console.error('❌ Error fetching Science questions:', fetchError);
  process.exit(1);
}

console.log(`📚 Found ${scienceQuestions.length} Science questions to process`);

let updateCount = 0;
let skippedCount = 0;
let errorCount = 0;

for (const question of scienceQuestions) {
  // Skip if already has lesson assignment
  if (question.lesson_id && question.difficulty_level) {
    console.log(`✅ Q${question.question_number}: Already has lesson assignment`);
    skippedCount++;
    continue;
  }

  // Analyze question to determine type and difficulty
  const analysis = analyzeQuestion(question.question_stem, question.question_number);
  const lessonInfo = scienceLessonMapping[analysis.questionType];

  if (!lessonInfo) {
    console.log(`⚠️  Q${question.question_number}: No lesson mapping for type "${analysis.questionType}"`);
    skippedCount++;
    continue;
  }

  console.log(`🔄 Q${question.question_number}: ${analysis.questionType} (${analysis.difficulty}) -> ${lessonInfo.lesson_id}`);

  // Update the question with lesson assignment
  const { error: updateError } = await supabase
    .from('act_science_questions')
    .update({
      lesson_id: lessonInfo.lesson_id,
      difficulty_level: analysis.difficulty,
      question_type: analysis.questionType
    })
    .eq('test_number', TEST_NUMBER)
    .eq('question_number', question.question_number);

  if (updateError) {
    console.error(`❌ Error updating Q${question.question_number}:`, updateError.message);
    errorCount++;
  } else {
    updateCount++;
  }
}

console.log('\n📊 SCIENCE LESSON ASSIGNMENT RESULTS:');
console.log('='.repeat(50));
console.log(`✅ Updated: ${updateCount} questions`);
console.log(`⏭️  Skipped (already assigned): ${skippedCount} questions`);
console.log(`❌ Errors: ${errorCount} questions`);

if (updateCount > 0) {
  console.log('\n🎉 Successfully assigned lessons to Science questions!');
}

// Verify the results
const { data: verifyData, error: verifyError } = await supabase
  .from('act_science_questions')
  .select('question_number, lesson_id, difficulty_level, question_type')
  .eq('test_number', TEST_NUMBER)
  .order('question_number');

if (!verifyError) {
  const withLessons = verifyData.filter(q => q.lesson_id && q.difficulty_level).length;
  console.log(`\n✅ VERIFICATION: ${withLessons}/40 Science questions now have lesson assignments`);

  if (withLessons === 40) {
    console.log('🎊 ALL SCIENCE QUESTIONS NOW HAVE LESSON ASSIGNMENTS! 🎊');
  } else {
    const stillMissing = verifyData.filter(q => !q.lesson_id || !q.difficulty_level);
    console.log('❌ Still missing lesson assignments:');
    stillMissing.slice(0, 5).forEach(q => {
      console.log(`   Q${q.question_number}: lesson_id=${q.lesson_id || 'NULL'}, difficulty=${q.difficulty_level || 'NULL'}`);
    });
  }
}

console.log('\n🏁 Science lesson assignment complete!\n');