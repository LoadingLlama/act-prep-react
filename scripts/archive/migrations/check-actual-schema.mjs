/**
 * Check actual quiz_questions table schema
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Get geometry-angles lesson
const { data: lessonData } = await supabase
  .from('lessons')
  .select('id')
  .eq('lesson_key', 'geometry-angles')
  .single();

// Get the quiz
const { data: quizzes } = await supabase
  .from('quizzes')
  .select('*')
  .eq('lesson_id', lessonData.id);

const quiz = quizzes[0];
console.log('Quiz ID:', quiz.id);

// Check what columns exist by selecting all without ordering
const { data: questions, error } = await supabase
  .from('quiz_questions')
  .select('*')
  .eq('quiz_id', quiz.id)
  .limit(1);

if (error) {
  console.error('Error:', error);
} else if (questions && questions.length > 0) {
  console.log('\nAvailable columns in quiz_questions:');
  console.log(Object.keys(questions[0]));
  console.log('\nSample question:');
  console.log(JSON.stringify(questions[0], null, 2));
} else {
  console.log('\nNo questions found. Trying to insert one...');

  // Try inserting a test question
  const { data: inserted, error: insertError } = await supabase
    .from('quiz_questions')
    .insert({
      quiz_id: quiz.id,
      question_text: 'Test question',
      question_order: 0
    })
    .select()
    .single();

  if (insertError) {
    console.error('Insert error:', insertError);
  } else {
    console.log('Successfully inserted test question:');
    console.log(JSON.stringify(inserted, null, 2));
  }
}
