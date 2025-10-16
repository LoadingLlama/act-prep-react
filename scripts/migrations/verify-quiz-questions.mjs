import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_ANON_KEY
);

async function verify() {
  // Get a quiz with questions
  const { data: quiz, error } = await supabase
    .from('quizzes')
    .select(`
      *,
      quiz_questions (
        *,
        quiz_options (*)
      )
    `)
    .eq('quiz_type', 'final')
    .limit(1)
    .single();

  if (error) {
    console.log('Error:', error);
    return;
  }

  console.log('Quiz:', quiz.title);
  console.log('Questions:', quiz.quiz_questions?.length || 0);
  
  if (quiz.quiz_questions && quiz.quiz_questions.length > 0) {
    const firstQ = quiz.quiz_questions[0];
    console.log('\nFirst question:', firstQ.question_text);
    console.log('Options:', firstQ.quiz_options?.length || 0);
  }
}

verify().catch(console.error);
