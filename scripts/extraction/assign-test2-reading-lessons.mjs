#!/usr/bin/env node

/**
 * ASSIGN TEST 2 READING LESSONS
 * Assign lesson_id and difficulty_level to all Reading questions based on Test 1 patterns
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

console.log('📖 ASSIGNING LESSON_ID AND DIFFICULTY_LEVEL TO TEST 2 READING QUESTIONS\n');
console.log('='.repeat(70));

// Reading lesson mapping from Test 1 analysis (actual lesson IDs)
const readingLessonMapping = {
  'characterization': { lesson_id: '25fb92b6-429e-4940-802a-e339ae3a47e1', difficulty_level: 'medium' },
  'sequence': { lesson_id: '25fb92b6-429e-4940-802a-e339ae3a47e1', difficulty_level: 'hard' },
  'detail': { lesson_id: '25fb92b6-429e-4940-802a-e339ae3a47e1', difficulty_level: 'easy' },
  'inference': { lesson_id: '25fb92b6-429e-4940-802a-e339ae3a47e1', difficulty_level: 'medium' },
  'comparison': { lesson_id: '680d39ef-6fc8-490b-a574-c68fad112466', difficulty_level: 'medium' },
  'main-idea': { lesson_id: '25fb92b6-429e-4940-802a-e339ae3a47e1', difficulty_level: 'medium' },
  'vocabulary': { lesson_id: 'c22d531f-b59a-41fe-8b19-bf2f8e063b48', difficulty_level: 'easy' },
  'comprehension': { lesson_id: '25fb92b6-429e-4940-802a-e339ae3a47e1', difficulty_level: 'hard' },
  'structure': { lesson_id: '25fb92b6-429e-4940-802a-e339ae3a47e1', difficulty_level: 'medium' },
  'tone': { lesson_id: '25fb92b6-429e-4940-802a-e339ae3a47e1', difficulty_level: 'medium' },
  'interpretation': { lesson_id: '25fb92b6-429e-4940-802a-e339ae3a47e1', difficulty_level: 'hard' },
  'perspective': { lesson_id: '25fb92b6-429e-4940-802a-e339ae3a47e1', difficulty_level: 'hard' }
};

// Function to determine question type and difficulty based on content and passage
function analyzeQuestion(questionStem, questionNumber, passageId) {
  const stem = questionStem.toLowerCase();

  // Determine question type based on content
  let questionType = 'inference'; // default
  let difficulty = 'medium'; // default

  // Main idea indicators
  if (stem.includes('main idea') || stem.includes('central idea') || stem.includes('primary purpose') ||
      stem.includes('mainly about') || stem.includes('primarily') || stem.includes('overall')) {
    questionType = 'main-idea';
  }

  // Detail indicators
  else if (stem.includes('according to') || stem.includes('based on') || stem.includes('states that') ||
           stem.includes('mentioned') || stem.includes('passage indicates')) {
    questionType = 'detail';
  }

  // Inference indicators
  else if (stem.includes('implies') || stem.includes('suggests') || stem.includes('infer') ||
           stem.includes('most likely') || stem.includes('probably') || stem.includes('can be concluded')) {
    questionType = 'inference';
  }

  // Vocabulary indicators
  else if (stem.includes('meaning') || stem.includes('refers to') || stem.includes('definition') ||
           stem.includes('context') || stem.includes('word') || stem.includes('phrase')) {
    questionType = 'vocabulary';
  }

  // Tone/perspective indicators
  else if (stem.includes('author') || stem.includes('writer') || stem.includes('tone') ||
           stem.includes('attitude') || stem.includes('perspective')) {
    questionType = 'tone';
  }

  // Structure indicators
  else if (stem.includes('structure') || stem.includes('organization') || stem.includes('function') ||
           stem.includes('paragraph') || stem.includes('sentence') || stem.includes('passage')) {
    questionType = 'structure';
  }

  // Character indicators (for fiction passages)
  else if (stem.includes('character') || stem.includes('narrator') || stem.includes('story')) {
    questionType = 'characterization';
  }

  // Comparison indicators
  else if (stem.includes('compare') || stem.includes('contrast') || stem.includes('difference') ||
           stem.includes('similar') || stem.includes('unlike')) {
    questionType = 'comparison';
  }

  // Sequence indicators
  else if (stem.includes('sequence') || stem.includes('order') || stem.includes('first') ||
           stem.includes('next') || stem.includes('then') || stem.includes('chronological')) {
    questionType = 'sequence';
  }

  // Interpretation indicators
  else if (stem.includes('interpret') || stem.includes('significance') || stem.includes('symbolic') ||
           stem.includes('represents') || stem.includes('theme')) {
    questionType = 'interpretation';
  }

  // Comprehension indicators
  else if (stem.includes('understand') || stem.includes('comprehend') || stem.includes('grasp') ||
           stem.includes('reason') || stem.includes('explain')) {
    questionType = 'comprehension';
  }

  // Determine difficulty based on question position and type
  if (questionNumber <= 10) {
    difficulty = 'easy';
  } else if (questionNumber <= 30) {
    difficulty = 'medium';
  } else {
    difficulty = 'hard';
  }

  // Override difficulty for certain types
  if (questionType === 'detail' || questionType === 'vocabulary') difficulty = 'easy';
  if (questionType === 'sequence' || questionType === 'comprehension' ||
      questionType === 'interpretation' || questionType === 'perspective') {
    difficulty = 'hard';
  }

  return { questionType, difficulty };
}

// Get all Test 2 Reading questions
const { data: readingQuestions, error: fetchError } = await supabase
  .from('act_reading_questions')
  .select('question_number, question_stem, passage_id, lesson_id, difficulty_level')
  .eq('test_number', TEST_NUMBER)
  .order('question_number');

if (fetchError) {
  console.error('❌ Error fetching Reading questions:', fetchError);
  process.exit(1);
}

console.log(`📚 Found ${readingQuestions.length} Reading questions to process`);

let updateCount = 0;
let skippedCount = 0;
let errorCount = 0;

for (const question of readingQuestions) {
  // Skip if already has lesson assignment
  if (question.lesson_id && question.difficulty_level) {
    console.log(`✅ Q${question.question_number}: Already has lesson assignment`);
    skippedCount++;
    continue;
  }

  // Analyze question to determine type and difficulty
  const analysis = analyzeQuestion(question.question_stem, question.question_number, question.passage_id);
  const lessonInfo = readingLessonMapping[analysis.questionType];

  if (!lessonInfo) {
    console.log(`⚠️  Q${question.question_number}: No lesson mapping for type "${analysis.questionType}"`);
    skippedCount++;
    continue;
  }

  console.log(`🔄 Q${question.question_number}: ${analysis.questionType} (${analysis.difficulty}) -> ${lessonInfo.lesson_id}`);

  // Update the question with lesson assignment
  const { error: updateError } = await supabase
    .from('act_reading_questions')
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

console.log('\n📊 READING LESSON ASSIGNMENT RESULTS:');
console.log('='.repeat(50));
console.log(`✅ Updated: ${updateCount} questions`);
console.log(`⏭️  Skipped (already assigned): ${skippedCount} questions`);
console.log(`❌ Errors: ${errorCount} questions`);

if (updateCount > 0) {
  console.log('\n🎉 Successfully assigned lessons to Reading questions!');
}

// Verify the results
const { data: verifyData, error: verifyError } = await supabase
  .from('act_reading_questions')
  .select('question_number, lesson_id, difficulty_level, question_type')
  .eq('test_number', TEST_NUMBER)
  .order('question_number');

if (!verifyError) {
  const withLessons = verifyData.filter(q => q.lesson_id && q.difficulty_level).length;
  console.log(`\n✅ VERIFICATION: ${withLessons}/40 Reading questions now have lesson assignments`);

  if (withLessons === 40) {
    console.log('🎊 ALL READING QUESTIONS NOW HAVE LESSON ASSIGNMENTS! 🎊');
  } else {
    const stillMissing = verifyData.filter(q => !q.lesson_id || !q.difficulty_level);
    console.log('❌ Still missing lesson assignments:');
    stillMissing.slice(0, 5).forEach(q => {
      console.log(`   Q${q.question_number}: lesson_id=${q.lesson_id || 'NULL'}, difficulty=${q.difficulty_level || 'NULL'}`);
    });
  }
}

console.log('\n🏁 Reading lesson assignment complete!\n');