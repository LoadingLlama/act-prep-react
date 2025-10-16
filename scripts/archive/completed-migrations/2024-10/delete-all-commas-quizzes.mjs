import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_ANON_KEY
);

async function deleteAllCommasQuizzes() {
  const { data: lesson } = await supabase
    .from('lessons')
    .select('id')
    .eq('lesson_key', 'commas')
    .single();

  const { data: quizzes, error } = await supabase
    .from('quizzes')
    .delete()
    .eq('lesson_id', lesson.id)
    .select();

  if (error) {
    console.error('Error:', error);
    return;
  }

  console.log(`✅ Deleted ${quizzes.length} quizzes from Commas lesson`);
  quizzes.forEach(q => {
    console.log(`  - ${q.title} (position ${q.position})`);
  });

  console.log('\nReady to create new properly-aligned quizzes!');
}

deleteAllCommasQuizzes();
