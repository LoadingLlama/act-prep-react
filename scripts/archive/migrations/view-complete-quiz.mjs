/**
 * View Complete Quiz Data
 * Shows ALL questions including Question 1
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function viewCompleteQuiz() {
  console.log('🔍 Viewing complete geometry-angles quiz...\n');

  // Get quiz
  const { data: lesson } = await supabase
    .from('lessons')
    .select('id')
    .eq('lesson_key', 'geometry-angles')
    .single();

  const { data: quiz } = await supabase
    .from('quizzes')
    .select('id, title')
    .eq('lesson_id', lesson.id)
    .single();

  // Get ALL questions
  const { data: questions } = await supabase
    .from('quiz_questions')
    .select('id, question_order, question_text')
    .eq('quiz_id', quiz.id);

  questions.sort((a, b) => a.question_order - b.question_order);

  for (const question of questions) {
    console.log('═══════════════════════════════════════════════════════════');
    console.log(`Question ${question.question_order}:`);
    console.log('═══════════════════════════════════════════════════════════');
    console.log(question.question_text);
    console.log('');

    // Get options
    const { data: options } = await supabase
      .from('quiz_options')
      .select('*')
      .eq('question_id', question.id)
      .order('option_order', { ascending: true });

    const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    for (const option of options) {
      const letter = letters[option.option_order];
      const correctMark = option.is_correct ? '✓ CORRECT' : '';
      console.log(`${letter}. ${option.option_text} ${correctMark}`);
      if (option.explanation) {
        console.log(`   Explanation: ${option.explanation}`);
      }
    }
    console.log('\n');
  }
}

viewCompleteQuiz().then(() => {
  console.log('✨ Done!');
}).catch(err => {
  console.error('❌ Error:', err);
});
