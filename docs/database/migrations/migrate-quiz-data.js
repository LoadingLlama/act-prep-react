/**
 * Migration Script for Quiz Data
 * This script migrates hardcoded quiz data from lessonQuizData.js to Supabase
 *
 * Tables required in Supabase:
 * - quizzes (id, lesson_id, title, intro, quiz_type, position, is_required)
 * - quiz_questions (id, quiz_id, question_text, question_order)
 * - quiz_options (id, question_id, option_text, is_correct, explanation, option_order)
 *
 * Run this script once to populate the database with quiz data
 */

import { createClient } from '@supabase/supabase-js';

// Import the quiz data (we'll convert the function to export the data directly)
import { quizData } from '../../src/utils/quizDataForMigration';

// Initialize Supabase client
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY; // Use service key for migrations
const supabase = createClient(supabaseUrl, supabaseServiceKey);

/**
 * Migrate quiz data to Supabase
 */
async function migrateQuizData() {
  console.log('Starting quiz data migration...');

  let successCount = 0;
  let errorCount = 0;

  for (const [quizKey, quiz] of Object.entries(quizData)) {
    try {
      // First, create the quiz
      const { data: quizRecord, error: quizError } = await supabase
        .from('quizzes')
        .insert({
          title: quiz.title,
          intro: quiz.intro || '',
          quiz_type: quiz.type || 'practice',
          position: parseInt(quizKey),
          is_required: quiz.isRequired || false,
          lesson_id: quiz.lessonId || null // You'll need to map this to actual lesson IDs
        })
        .select()
        .single();

      if (quizError) {
        console.error(`Error creating quiz ${quizKey}:`, quizError);
        errorCount++;
        continue;
      }

      console.log(`Created quiz: ${quiz.title}`);

      // Now add questions for this quiz
      if (quiz.questions && quiz.questions.length > 0) {
        for (let qIndex = 0; qIndex < quiz.questions.length; qIndex++) {
          const question = quiz.questions[qIndex];

          const { data: questionRecord, error: questionError } = await supabase
            .from('quiz_questions')
            .insert({
              quiz_id: quizRecord.id,
              question_text: question.text,
              question_order: qIndex + 1
            })
            .select()
            .single();

          if (questionError) {
            console.error(`Error creating question ${qIndex} for quiz ${quizKey}:`, questionError);
            continue;
          }

          // Add options for this question
          if (question.options && question.options.length > 0) {
            const optionsToInsert = question.options.map((option, oIndex) => ({
              question_id: questionRecord.id,
              option_text: option.text,
              is_correct: option.isCorrect || false,
              explanation: option.explanation || '',
              option_order: oIndex + 1
            }));

            const { error: optionsError } = await supabase
              .from('quiz_options')
              .insert(optionsToInsert);

            if (optionsError) {
              console.error(`Error creating options for question ${qIndex}:`, optionsError);
            }
          }
        }
      }

      successCount++;
      console.log(`Successfully migrated quiz ${quizKey}: ${quiz.title}`);

    } catch (error) {
      console.error(`Unexpected error migrating quiz ${quizKey}:`, error);
      errorCount++;
    }
  }

  console.log('\n=== Migration Complete ===');
  console.log(`Successful: ${successCount} quizzes`);
  console.log(`Errors: ${errorCount} quizzes`);
}

// Run the migration
migrateQuizData()
  .then(() => {
    console.log('Migration script completed');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Migration failed:', error);
    process.exit(1);
  });