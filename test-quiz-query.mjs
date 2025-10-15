import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_ANON_KEY
);

async function testQuery() {
  // Get a sample lesson
  const { data: lesson, error: lessonError } = await supabase
    .from('lessons')
    .select('id, title, lesson_key')
    .limit(1)
    .single();

  console.log('Sample lesson:', lesson);

  if (lesson) {
    // Try to fetch quizzes for this lesson
    const { data: quizzes, error: quizError } = await supabase
      .from('quizzes')
      .select('*')
      .eq('lesson_id', lesson.id);

    console.log('\nQuizzes for this lesson:', quizzes);
    console.log('Quiz count:', quizzes?.length || 0);
  }
}

testQuery().catch(console.error);
