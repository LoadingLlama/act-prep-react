/**
 * Check if quiz options exist
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

// Get questions with options
const { data: questions, error } = await supabase
  .from('quiz_questions')
  .select(`
    *,
    quiz_options (*)
  `)
  .eq('quiz_id', quiz.id)
  .order('question_order');

if (error) {
  console.error('Error:', error);
} else {
  console.log(`\n✅ Found ${questions.length} questions\n`);

  questions.forEach((q, idx) => {
    console.log(`${idx + 1}. ${q.question_text.substring(0, 60)}...`);
    console.log(`   Options: ${q.quiz_options ? q.quiz_options.length : 0}`);

    if (q.quiz_options && q.quiz_options.length > 0) {
      // Sort options by option_order
      const sortedOptions = q.quiz_options.sort((a, b) => a.option_order - b.option_order);
      sortedOptions.forEach((opt, i) => {
        const letter = String.fromCharCode(65 + i);
        const correct = opt.is_correct ? ' ✓' : '';
        console.log(`      ${letter}. ${opt.option_text}${correct}`);
      });
    }
    console.log('');
  });
}
