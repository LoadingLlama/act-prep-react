import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_ANON_KEY
);

async function cascadeDeleteQuizzes() {
  const { data: lesson } = await supabase
    .from('lessons')
    .select('id')
    .eq('lesson_key', 'commas')
    .single();

  // Get all quizzes
  const { data: allQuizzes } = await supabase
    .from('quizzes')
    .select('id, title, position')
    .eq('lesson_id', lesson.id)
    .order('position');

  // Identify old-style quizzes
  const oldQuizzes = allQuizzes.filter(q =>
    !q.title.startsWith('Practice:') && !q.title.startsWith('Final Assessment:')
  );

  console.log(`Found ${oldQuizzes.length} old-style quizzes to delete\n`);

  for (const quiz of oldQuizzes) {
    console.log(`\nDeleting quiz: ${quiz.title}`);

    // First delete all quiz_options for this quiz's questions
    const { data: questions } = await supabase
      .from('quiz_questions')
      .select('id')
      .eq('quiz_id', quiz.id);

    if (questions && questions.length > 0) {
      for (const question of questions) {
        const { error: optionsError } = await supabase
          .from('quiz_options')
          .delete()
          .eq('question_id', question.id);

        if (optionsError) {
          console.error(`  ✗ Error deleting options for question ${question.id}:`, optionsError);
        } else {
          console.log(`  ✓ Deleted options for question ${question.id}`);
        }
      }

      // Then delete quiz_questions
      const { error: questionsError } = await supabase
        .from('quiz_questions')
        .delete()
        .eq('quiz_id', quiz.id);

      if (questionsError) {
        console.error(`  ✗ Error deleting questions:`, questionsError);
      } else {
        console.log(`  ✓ Deleted ${questions.length} questions`);
      }
    }

    // Finally delete the quiz itself
    const { error: quizError } = await supabase
      .from('quizzes')
      .delete()
      .eq('id', quiz.id);

    if (quizError) {
      console.error(`  ✗ Error deleting quiz:`, quizError);
    } else {
      console.log(`  ✓ Deleted quiz: ${quiz.title}`);
    }
  }

  // Verify deletion
  const { data: remaining } = await supabase
    .from('quizzes')
    .select('title')
    .eq('lesson_id', lesson.id);

  console.log(`\n\n=== FINAL STATE ===`);
  console.log(`Remaining quizzes: ${remaining.length}`);
  remaining.forEach(q => console.log(`  - ${q.title}`));
}

cascadeDeleteQuizzes();
