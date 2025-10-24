#!/usr/bin/env node

/**
 * ASSIGN TEST 2 MATH LESSONS
 * Assign lesson_id and difficulty_level to all Math questions based on Test 1 patterns
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

console.log('🔢 ASSIGNING LESSON_ID AND DIFFICULTY_LEVEL TO TEST 2 MATH QUESTIONS\n');
console.log('='.repeat(70));

// Math lesson mapping from Test 1 analysis
const mathLessonMapping = {
  // Algebra & Functions
  'algebra': { lesson_id: '8d9e41b9-d906-48f6-a1d3-eecb02a7be9f', difficulty_level: 'medium' },
  'functions': { lesson_id: '89b5a825-cb28-4e50-a4a7-de9d73922bc9', difficulty_level: 'medium' },
  'complex-numbers': { lesson_id: '0090877d-e7d2-4ac4-80b4-87a42502a214', difficulty_level: 'medium' },

  // Geometry & Trigonometry
  'geometry': { lesson_id: '3e2c98a9-98e3-40e3-8301-11f38aa0c15b', difficulty_level: 'medium' },
  'trigonometry': { lesson_id: 'a0cddccc-a9e8-4ec0-a0b2-ef1cc46a161a', difficulty_level: 'medium' },
  'vectors': { lesson_id: '7af23229-16aa-4455-a777-66cdd8011dff', difficulty_level: 'hard' },

  // Statistics & Probability
  'statistics-probability': { lesson_id: 'b5f5c943-7bcd-431a-aa94-df51be6612e2', difficulty_level: 'medium' },

  // Number Theory & Sequences
  'number-theory': { lesson_id: '74013e77-3111-4dc6-beca-ff15948e4351', difficulty_level: 'easy' },
  'sequences': { lesson_id: 'ad844a99-7156-4315-ac86-958f52468df2', difficulty_level: 'hard' },
  'counting': { lesson_id: 'aaea35f0-81c0-4b3e-930c-d13edeeb3db5', difficulty_level: 'medium' },

  // Problem Solving
  'word-problem': { lesson_id: 'ec9b95cf-47f7-4c01-8118-91aef61f7170', difficulty_level: 'medium' },
  'math-problem-solving': { lesson_id: '27833f99-7aa1-4e5d-92e4-c953fadebc0d', difficulty_level: 'medium' },

  // Advanced Topics
  'matrices': { lesson_id: '6e95c291-2e8a-4ae9-8f7e-10caad8588b9', difficulty_level: 'medium' }
};

// Function to determine question type and difficulty based on content
function analyzeQuestion(questionStem, questionNumber) {
  const stem = questionStem.toLowerCase();

  // Determine question type based on content
  let questionType = 'math-problem-solving'; // default
  let difficulty = 'medium'; // default

  // Geometry indicators
  if (stem.includes('parallelogram') || stem.includes('rectangle') || stem.includes('triangle') ||
      stem.includes('circle') || stem.includes('angle') || stem.includes('perimeter') ||
      stem.includes('area') || stem.includes('volume') || stem.includes('diagonal')) {
    questionType = 'geometry';
  }

  // Algebra indicators
  else if (stem.includes('equation') || stem.includes('solve') || stem.includes('x =') ||
           stem.includes('value of x') || stem.includes('quadratic') || stem.includes('factor')) {
    questionType = 'algebra';
  }

  // Statistics/Probability indicators
  else if (stem.includes('probability') || stem.includes('average') || stem.includes('median') ||
           stem.includes('mean') || stem.includes('standard deviation') || stem.includes('data set') ||
           stem.includes('commission') || stem.includes('percent')) {
    questionType = 'statistics-probability';
  }

  // Functions indicators
  else if (stem.includes('function') || stem.includes('f(x)') || stem.includes('g(x)') ||
           stem.includes('domain') || stem.includes('range')) {
    questionType = 'functions';
  }

  // Number theory indicators
  else if (stem.includes('greatest common factor') || stem.includes('least common multiple') ||
           stem.includes('prime') || stem.includes('divisible')) {
    questionType = 'number-theory';
  }

  // Word problem indicators
  else if (stem.includes('store') || stem.includes('cost') || stem.includes('price') ||
           stem.includes('sells') || stem.includes('charges') || stem.includes('day') ||
           stem.includes('plants') || stem.includes('service') || stem.includes('map')) {
    questionType = 'word-problem';
  }

  // Sequences indicators
  else if (stem.includes('sequence') || stem.includes('arithmetic') || stem.includes('geometric') ||
           stem.includes('term') || stem.includes('pattern')) {
    questionType = 'sequences';
  }

  // Trigonometry indicators
  else if (stem.includes('sin') || stem.includes('cos') || stem.includes('tan') ||
           stem.includes('trigonometric') || stem.includes('angle')) {
    questionType = 'trigonometry';
  }

  // Determine difficulty based on question number (general pattern)
  if (questionNumber <= 20) {
    difficulty = 'easy';
  } else if (questionNumber <= 40) {
    difficulty = 'medium';
  } else {
    difficulty = 'hard';
  }

  // Override difficulty for certain types
  if (questionType === 'number-theory') difficulty = 'easy';
  if (questionType === 'sequences' || questionType === 'vectors') difficulty = 'hard';

  return { questionType, difficulty };
}

// Get all Test 2 Math questions
const { data: mathQuestions, error: fetchError } = await supabase
  .from('act_math_questions')
  .select('question_number, question_stem, lesson_id, difficulty_level')
  .eq('test_number', TEST_NUMBER)
  .order('question_number');

if (fetchError) {
  console.error('❌ Error fetching Math questions:', fetchError);
  process.exit(1);
}

console.log(`📚 Found ${mathQuestions.length} Math questions to process`);

let updateCount = 0;
let skippedCount = 0;
let errorCount = 0;

for (const question of mathQuestions) {
  // Skip if already has lesson assignment
  if (question.lesson_id && question.difficulty_level) {
    console.log(`✅ Q${question.question_number}: Already has lesson assignment`);
    skippedCount++;
    continue;
  }

  // Analyze question to determine type and difficulty
  const analysis = analyzeQuestion(question.question_stem, question.question_number);
  const lessonInfo = mathLessonMapping[analysis.questionType];

  if (!lessonInfo) {
    console.log(`⚠️  Q${question.question_number}: No lesson mapping for type "${analysis.questionType}"`);
    skippedCount++;
    continue;
  }

  console.log(`🔄 Q${question.question_number}: ${analysis.questionType} (${analysis.difficulty}) -> ${lessonInfo.lesson_id}`);

  // Update the question with lesson assignment
  const { error: updateError } = await supabase
    .from('act_math_questions')
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

console.log('\n📊 MATH LESSON ASSIGNMENT RESULTS:');
console.log('='.repeat(50));
console.log(`✅ Updated: ${updateCount} questions`);
console.log(`⏭️  Skipped (already assigned): ${skippedCount} questions`);
console.log(`❌ Errors: ${errorCount} questions`);

if (updateCount > 0) {
  console.log('\n🎉 Successfully assigned lessons to Math questions!');
}

// Verify the results
const { data: verifyData, error: verifyError } = await supabase
  .from('act_math_questions')
  .select('question_number, lesson_id, difficulty_level, question_type')
  .eq('test_number', TEST_NUMBER)
  .order('question_number');

if (!verifyError) {
  const withLessons = verifyData.filter(q => q.lesson_id && q.difficulty_level).length;
  console.log(`\n✅ VERIFICATION: ${withLessons}/60 Math questions now have lesson assignments`);

  if (withLessons === 60) {
    console.log('🎊 ALL MATH QUESTIONS NOW HAVE LESSON ASSIGNMENTS! 🎊');
  } else {
    const stillMissing = verifyData.filter(q => !q.lesson_id || !q.difficulty_level);
    console.log('❌ Still missing lesson assignments:');
    stillMissing.slice(0, 5).forEach(q => {
      console.log(`   Q${q.question_number}: lesson_id=${q.lesson_id || 'NULL'}, difficulty=${q.difficulty_level || 'NULL'}`);
    });
  }
}

console.log('\n🏁 Math lesson assignment complete!\n');