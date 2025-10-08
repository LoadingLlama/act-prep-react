import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_ANON_KEY
);

const { data: lessons, error } = await supabase
  .from('lessons')
  .select('id, title, lesson_key, content')
  .limit(3);

if (error) {
  console.error('Error:', error);
  process.exit(1);
}

lessons.forEach(lesson => {
  console.log(`\n=== ${lesson.title} (${lesson.lesson_key}) ===`);
  const quizMatches = lesson.content.match(/<!-- QUIZ_\d+ -->/g);
  if (quizMatches) {
    console.log('Quiz markers found:', quizMatches);
  } else {
    console.log('No quiz markers found');
  }
  
  // Show a snippet of content
  console.log('Content length:', lesson.content.length);
  console.log('First 300 chars:', lesson.content.substring(0, 300));
});
