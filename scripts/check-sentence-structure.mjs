import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_ANON_KEY
);

// Find sentence structure lesson
const { data: lessons } = await supabase
  .from('lessons')
  .select('id, title, lesson_key, subject')
  .ilike('title', '%sentence%');

console.log('Lessons matching "sentence":');
console.table(lessons);

if (lessons && lessons.length > 0) {
  const lesson = lessons[0];
  
  // Check for quizzes
  const { data: quizzes, error } = await supabase
    .from('quizzes')
    .select('id, title, position, quiz_type')
    .eq('lesson_id', lesson.id);
  
  console.log(`\nQuizzes for "${lesson.title}":`);
  if (error) {
    console.error('Error:', error);
  } else if (quizzes && quizzes.length > 0) {
    console.table(quizzes);
  } else {
    console.log('No quizzes found!');
  }
}
