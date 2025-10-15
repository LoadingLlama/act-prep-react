/**
 * Check if quiz questions actually exist in database
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
  .select('id, lesson_key')
  .eq('lesson_key', 'geometry-angles')
  .single();

console.log('Lesson:', lessonData.lesson_key);
console.log('Lesson ID:', lessonData.id);

// Get the quiz
const { data: quizzes } = await supabase
  .from('quizzes')
  .select('*')
  .eq('lesson_id', lessonData.id);

console.log('\nQuizzes found:', quizzes.length);

if (quizzes.length > 0) {
  const quiz = quizzes[0];
  console.log('Quiz ID:', quiz.id);
  console.log('Quiz Title:', quiz.title);

  // Get questions
  const { data: questions, error } = await supabase
    .from('quiz_questions')
    .select('*')
    .eq('quiz_id', quiz.id)
    .order('order_index');

  console.log('\nQuestions found:', questions ? questions.length : 0);

  if (error) {
    console.error('Error fetching questions:', error);
  }

  if (questions && questions.length > 0) {
    console.log('\nQuestion details:');
    questions.forEach((q, idx) => {
      console.log(`\n${idx + 1}. ${q.question_text}`);
      console.log(`   Order index: ${q.order_index}`);
      console.log(`   Options: ${q.options ? q.options.length : 'NONE'}`);
      if (q.options && q.options.length > 0) {
        q.options.forEach((opt, i) => {
          console.log(`      ${String.fromCharCode(65 + i)}. ${opt.text} ${opt.is_correct ? '✓' : ''}`);
        });
      }
    });
  } else {
    console.log('\n❌ NO QUESTIONS FOUND IN DATABASE!');
  }
}
