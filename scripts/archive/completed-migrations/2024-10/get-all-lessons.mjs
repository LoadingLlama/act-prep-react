import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_ANON_KEY
);

async function getAllLessons() {
  const { data: lessons, error } = await supabase
    .from('lessons')
    .select('*')
    .order('created_at', { ascending: true });

  if (error) {
    console.error('Error fetching lessons:', error);
    return;
  }

  console.log('Total lessons:', lessons.length);
  console.log('\nEnglish Lessons:');
  lessons.forEach((lesson, index) => {
    console.log(`${index + 1}. ${lesson.lesson_key} - ${lesson.title}`);
    console.log(`   ID: ${lesson.id}`);
    console.log(`   Order: ${lesson.lesson_order}`);
    console.log(`   Content length: ${lesson.content?.length || 0} chars\n`);
  });

  return lessons;
}

getAllLessons();
