import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import { readFileSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: resolve(__dirname, '../.env') });

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

// Load the extracted quiz data
const quizDataJson = readFileSync(resolve(__dirname, 'extracted-quiz-data.json'), 'utf8');
const allQuizData = JSON.parse(quizDataJson);

async function insertQuizForLesson(lessonKey, quizData) {
  console.log(`\n${'='.repeat(80)}`);
  console.log(`INSERTING QUIZ FOR LESSON ${lessonKey}: ${quizData.title}`);
  console.log(`${'='.repeat(80)}\n`);

  try {
    // Step 1: Get lesson ID
    console.log(`1. Getting lesson ID for ${lessonKey}...`);
    const { data: lessonData, error: lessonError } = await supabase
      .from('lesson_metadata')
      .select('id')
      .eq('lesson_key', lessonKey)
      .single();

    if (lessonError || !lessonData) {
      console.error(`ERROR: Lesson ${lessonKey} not found:`, lessonError);
      throw new Error(`Lesson ${lessonKey} not found`);
    }

    const lessonId = lessonData.id;
    console.log(`✓ Found lesson with ID: ${lessonId}\n`);

    // Step 2: Insert quiz record
    console.log('2. Inserting quiz record...');
    const { data: quizRecord, error: quizError } = await supabase
      .from('quizzes')
      .insert({
        lesson_id: lessonId,
        title: quizData.title,
        intro: quizData.intro,
        quiz_type: 'mastery',
        position: 999, // At the end of the lesson
        is_required: true
      })
      .select()
      .single();

    if (quizError) {
      console.error('ERROR inserting quiz:', quizError);
      throw quizError;
    }

    const quizId = quizRecord.id;
    console.log(`✓ Quiz inserted with ID: ${quizId}\n`);

    // Step 3: Insert questions
    console.log('3. Inserting questions...');
    let questionCount = 0;

    for (const question of quizData.questions) {
      // Insert question
      const { data: questionRecord, error: questionError } = await supabase
        .from('quiz_questions')
        .insert({
          quiz_id: quizId,
          question_text: question.text,
          question_order: question.questionNumber
        })
        .select()
        .single();

      if (questionError) {
        console.error(`ERROR inserting question ${question.questionNumber}:`, questionError);
        throw questionError;
      }

      const questionId = questionRecord.id;
      questionCount++;

      // Insert options for this question
      for (let i = 0; i < question.options.length; i++) {
        const option = question.options[i];
        const { error: optionError } = await supabase
          .from('quiz_options')
          .insert({
            question_id: questionId,
            option_text: option.text,
            is_correct: option.isCorrect,
            explanation: option.explanation,
            option_order: i + 1
          });

        if (optionError) {
          console.error(`ERROR inserting option ${i + 1} for question ${question.questionNumber}:`, optionError);
          throw optionError;
        }
      }

      console.log(`  ✓ Question ${question.questionNumber} with ${question.options.length} options`);
    }

    console.log(`\n✓ Inserted ${questionCount} questions with options\n`);

    console.log('='.repeat(80));
    console.log(`✅ SUCCESS! Quiz for lesson ${lessonKey} has been inserted!`);
    console.log('='.repeat(80));
    console.log(`Lesson ID: ${lessonId}`);
    console.log(`Quiz ID: ${quizId}`);
    console.log(`Questions: ${questionCount}`);
    console.log('='.repeat(80) + '\n');

  } catch (error) {
    console.error(`\n❌ FATAL ERROR for lesson ${lessonKey}:`, error);
    console.error('Details:', error.message);
    throw error;
  }
}

async function insertAllQuizzes() {
  console.log('\n');
  console.log('🚀 STARTING QUIZ INSERTION');
  console.log('='.repeat(80));
  console.log(`Total lessons to process: ${Object.keys(allQuizData).length}`);
  console.log('='.repeat(80));

  const results = {
    successful: [],
    failed: []
  };

  for (const [lessonKey, quizData] of Object.entries(allQuizData)) {
    try {
      await insertQuizForLesson(lessonKey, quizData);
      results.successful.push(lessonKey);
    } catch (error) {
      console.error(`\n⚠️  Failed to insert quiz for lesson ${lessonKey}`);
      results.failed.push({ lessonKey, error: error.message });
    }
  }

  // Final summary
  console.log('\n');
  console.log('='.repeat(80));
  console.log('📊 FINAL SUMMARY');
  console.log('='.repeat(80));
  console.log(`✅ Successful: ${results.successful.length}`);
  console.log(`❌ Failed: ${results.failed.length}`);

  if (results.successful.length > 0) {
    console.log('\nSuccessful lessons:');
    results.successful.forEach(key => console.log(`  ✓ ${key}`));
  }

  if (results.failed.length > 0) {
    console.log('\nFailed lessons:');
    results.failed.forEach(({ lessonKey, error }) => console.log(`  ✗ ${lessonKey}: ${error}`));
  }

  console.log('='.repeat(80) + '\n');

  if (results.failed.length > 0) {
    process.exit(1);
  }
}

insertAllQuizzes();
