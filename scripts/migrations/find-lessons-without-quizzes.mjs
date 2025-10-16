import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_ANON_KEY
);

async function findLessonsWithoutQuizzes() {
  const { data: lessons } = await supabase
    .from('lessons')
    .select('id, title, lesson_key, subject')
    .order('order_index');

  console.log('Checking which lessons have no quizzes...\n');
  const lessonsWithoutQuizzes = [];

  for (const lesson of lessons) {
    const { data: quizzes } = await supabase
      .from('quizzes')
      .select('id')
      .eq('lesson_id', lesson.id);
    
    if (!quizzes || quizzes.length === 0) {
      console.log(`❌ NO QUIZZES: ${lesson.lesson_key}`);
      lessonsWithoutQuizzes.push(lesson);
    }
  }

  console.log(`\nTotal lessons without quizzes: ${lessonsWithoutQuizzes.length}`);
  return lessonsWithoutQuizzes;
}

findLessonsWithoutQuizzes().catch(console.error);
