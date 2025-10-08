import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_ANON_KEY
);

const lessonId = '004d1c35-daf4-432b-9b7d-6c363d328713'; // Commas lesson

async function getLessonContent() {
  const { data: lesson, error } = await supabase
    .from('lessons')
    .select('*')
    .eq('id', lessonId)
    .single();

  if (error) {
    console.error('Error:', error);
    return;
  }

  console.log('Lesson:', lesson.title);
  console.log('Key:', lesson.lesson_key);
  console.log('\nContent:\n');
  console.log(lesson.content);
}

getLessonContent();
