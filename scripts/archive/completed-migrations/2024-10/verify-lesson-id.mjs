import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_ANON_KEY
);

async function verifyLessonId() {
  const { data: lesson } = await supabase
    .from('lessons')
    .select('id, lesson_key, title')
    .eq('lesson_key', 'commas')
    .single();

  console.log('Commas lesson info:');
  console.log('  ID:', lesson.id);
  console.log('  Key:', lesson.lesson_key);
  console.log('  Title:', lesson.title);

  const { data: quizzes } = await supabase
    .from('quizzes')
    .select('id, title, position')
    .eq('lesson_id', lesson.id)
    .order('position');

  console.log('\nQuizzes for this lesson:');
  quizzes.forEach(q => {
    console.log(`  - ${q.title} (position ${q.position})`);
  });
}

verifyLessonId();
