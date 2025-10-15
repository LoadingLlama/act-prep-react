import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function findMissing() {
  console.log('Finding lessons without quizzes...\n');

  const { data: allLessons } = await supabase
    .from('lessons')
    .select('id, lesson_key, title, subject')
    .order('lesson_key');

  const lessonsWithoutQuizzes = [];

  for (const lesson of allLessons) {
    const { data: quizzes } = await supabase
      .from('quizzes')
      .select('id')
      .eq('lesson_id', lesson.id);

    if (!quizzes || quizzes.length === 0) {
      lessonsWithoutQuizzes.push(lesson);
    }
  }

  console.log('Lessons without quizzes: ' + lessonsWithoutQuizzes.length + '\n');

  lessonsWithoutQuizzes.forEach(lesson => {
    console.log('  - ' + lesson.lesson_key + ' (' + lesson.subject + ')');
  });
}

findMissing().catch(console.error);
