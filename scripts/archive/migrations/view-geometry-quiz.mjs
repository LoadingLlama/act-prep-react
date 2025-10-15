/**
 * View Geometry Quiz Data
 * Shows current quiz questions, options, and answers
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function viewGeometryQuiz() {
  console.log('🔍 Fetching geometry-angles quiz data...\n');

  // Get lesson ID
  const { data: lesson } = await supabase
    .from('lessons')
    .select('id, title, lesson_key')
    .eq('lesson_key', 'geometry-angles')
    .single();

  console.log('📚 Lesson:', lesson.title);
  console.log('🆔 Lesson ID:', lesson.id);
  console.log('');

  // Get quizzes for this lesson
  const { data: quizzes } = await supabase
    .from('quizzes')
    .select('*')
    .eq('lesson_id', lesson.id)
    .order('position', { ascending: true });

  if (!quizzes || quizzes.length === 0) {
    console.log('❌ No quizzes found for this lesson!');
    return;
  }

  console.log(`📊 Found ${quizzes.length} quiz(es)\n`);

  for (const quiz of quizzes) {
    console.log('═══════════════════════════════════════════════════════════');
    console.log(`📝 Quiz: ${quiz.title}`);
    console.log(`   Type: ${quiz.quiz_type}`);
    console.log(`   Position: ${quiz.position}`);
    console.log(`   Required: ${quiz.is_required}`);
    console.log(`   ID: ${quiz.id}`);
    console.log('═══════════════════════════════════════════════════════════\n');

    // Get questions for this quiz
    const { data: questions } = await supabase
      .from('quiz_questions')
      .select('*')
      .eq('quiz_id', quiz.id)
      .order('question_order', { ascending: true });

    if (!questions || questions.length === 0) {
      console.log('   ⚠️  No questions found for this quiz!\n');
      continue;
    }

    for (const question of questions) {
      console.log(`\n   Question ${question.question_order + 1}:`);
      console.log(`   ${question.question_text}`);
      console.log('   ─────────────────────────────────────────────────────');

      // Get options for this question
      const { data: options } = await supabase
        .from('quiz_options')
        .select('*')
        .eq('question_id', question.id)
        .order('option_order', { ascending: true });

      if (!options || options.length === 0) {
        console.log('   ⚠️  No options found for this question!');
        continue;
      }

      const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
      for (const option of options) {
        const letter = letters[option.option_order];
        const correctMark = option.is_correct ? '✓ CORRECT' : '';
        console.log(`   ${letter}. ${option.option_text} ${correctMark}`);
        if (option.explanation) {
          console.log(`      Explanation: ${option.explanation}`);
        }
      }
    }

    console.log('\n');
  }
}

viewGeometryQuiz().then(() => {
  console.log('✨ Done viewing quiz data!');
}).catch(err => {
  console.error('❌ Error:', err);
});
