/**
 * Check All Questions in Quiz
 * Verify question ordering and find Question 1
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function checkAllQuestions() {
  console.log('🔍 Checking all questions in geometry-angles quiz...\n');

  // Get quiz ID
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

  console.log('📝 Quiz:', quiz.title);
  console.log('🆔 Quiz ID:', quiz.id);
  console.log('');

  // Get ALL questions (no order filter)
  const { data: questions } = await supabase
    .from('quiz_questions')
    .select('id, question_order, question_text')
    .eq('quiz_id', quiz.id);

  console.log(`📊 Total questions found: ${questions.length}\n`);

  // Sort by question_order
  questions.sort((a, b) => a.question_order - b.question_order);

  questions.forEach((q, idx) => {
    console.log(`Question ${idx + 1}:`);
    console.log(`  question_order: ${q.question_order}`);
    console.log(`  question_text: ${q.question_text.substring(0, 100)}...`);
    console.log('');
  });

  // Check for gaps
  console.log('🔍 Checking for gaps in question_order...');
  for (let i = 0; i < questions.length; i++) {
    if (questions[i].question_order !== i) {
      console.log(`⚠️  GAP FOUND: Expected question_order ${i}, but found ${questions[i].question_order}`);
    }
  }

  console.log('\n✨ Done!');
}

checkAllQuestions().catch(err => {
  console.error('❌ Error:', err);
});
