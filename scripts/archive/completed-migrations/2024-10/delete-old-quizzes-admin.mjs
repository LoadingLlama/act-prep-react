import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

// Use service role key for admin privileges
const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function deleteOldQuizzes() {
  const { data: lesson } = await supabase
    .from('lessons')
    .select('id')
    .eq('lesson_key', 'commas')
    .single();

  console.log('Using service role key for admin access...\n');

  // Get all quizzes
  const { data: allQuizzes } = await supabase
    .from('quizzes')
    .select('id, title, position')
    .eq('lesson_id', lesson.id)
    .order('position');

  console.log('Current quizzes:');
  allQuizzes.forEach(q => console.log(`  - ${q.title} (pos ${q.position})`));

  // Identify old-style quizzes (ones that don't start with "Practice:" or "Final Assessment:")
  const oldQuizzes = allQuizzes.filter(q =>
    !q.title.startsWith('Practice:') && !q.title.startsWith('Final Assessment:')
  );

  console.log(`\nDeleting ${oldQuizzes.length} old-style quizzes...\n`);

  for (const quiz of oldQuizzes) {
    // Delete quiz (cascading should handle questions and options)
    const { error } = await supabase
      .from('quizzes')
      .delete()
      .eq('id', quiz.id);

    if (error) {
      console.error(`✗ Error deleting "${quiz.title}":`, error);
    } else {
      console.log(`✓ Deleted: ${quiz.title}`);
    }
  }

  // Verify deletion
  const { data: remaining } = await supabase
    .from('quizzes')
    .select('title, position')
    .eq('lesson_id', lesson.id)
    .order('position');

  console.log(`\n=== FINAL STATE ===`);
  console.log(`Remaining quizzes: ${remaining.length}`);
  remaining.forEach(q => console.log(`  - ${q.title} (pos ${q.position})`));
  console.log('\n✅ Cleanup complete! Only ACT-style quizzes remain.');
}

deleteOldQuizzes();
