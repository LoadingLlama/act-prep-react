import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function fetchAllMathLessons() {
  const { data: lessons, error } = await supabase
    .from('lessons')
    .select('*')
    .eq('subject', 'math')
    .order('order_index');

  if (error) {
    console.error('Error:', error);
    return;
  }

  const lessonsData = {};

  lessons.forEach(lesson => {
    lessonsData[lesson.lesson_key] = {
      title: lesson.title,
      content: lesson.content,
      length: lesson.content.length
    };
  });

  fs.writeFileSync('all-math-lessons.json', JSON.stringify(lessonsData, null, 2));

  console.log(`✅ Saved ${lessons.length} math lessons to all-math-lessons.json`);

  // Print first 5 for preview
  console.log('\nFirst 5 lessons:');
  lessons.slice(0, 5).forEach((l, i) => {
    console.log(`\n${i + 1}. ${l.lesson_key}`);
    console.log(`   Title: ${l.title}`);
    console.log(`   Length: ${l.content.length} chars`);
    console.log(`   Preview: ${l.content.substring(0, 200)}...`);
  });
}

fetchAllMathLessons();
