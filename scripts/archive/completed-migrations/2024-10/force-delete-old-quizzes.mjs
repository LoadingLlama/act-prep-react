import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_ANON_KEY
);

async function forceDeleteOldQuizzes() {
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

  console.log('Current quizzes:\n');
  allQuizzes.forEach((q, i) => {
    console.log(`${i + 1}. ${q.title} (pos ${q.position}) - ID: ${q.id}`);
  });

  // Identify old-style quizzes (ones that don't start with "Practice:" or "Final Assessment:")
  const oldQuizzes = allQuizzes.filter(q =>
    !q.title.startsWith('Practice:') && !q.title.startsWith('Final Assessment:')
  );

  console.log('\n\nDeleting old-style quizzes:\n');

  for (const quiz of oldQuizzes) {
    const { error } = await supabase
      .from('quizzes')
      .delete()
      .eq('id', quiz.id);

    if (error) {
      console.error(`✗ Error deleting "${quiz.title}":`, error);
    } else {
      console.log(`✓ Deleted: ${quiz.title} (ID: ${quiz.id})`);
    }
  }

  console.log('\n✅ Cleanup complete!');
}

forceDeleteOldQuizzes();
