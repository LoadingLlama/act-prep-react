import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_ANON_KEY
);

async function listAllEnglishLessons() {
  const { data: lessons } = await supabase
    .from('lessons')
    .select('id, title, lesson_key, subject')
    .eq('subject', 'english')
    .order('title');

  console.log('=== ALL ENGLISH LESSONS ===\n');
  console.log(`Found ${lessons.length} English lessons:\n`);

  for (const lesson of lessons) {
    const { data: quizzes } = await supabase
      .from('quizzes')
      .select('id')
      .eq('lesson_id', lesson.id);

    const hasQuizzes = quizzes && quizzes.length > 0;
    const status = hasQuizzes ? `✅ ${quizzes.length} quizzes` : '❌ No quizzes';

    console.log(`${status} - ${lesson.title}`);
    console.log(`   Key: ${lesson.lesson_key}`);
    console.log('');
  }
}

listAllEnglishLessons();
