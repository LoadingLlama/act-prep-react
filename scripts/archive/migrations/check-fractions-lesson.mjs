import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function checkFractionsLesson() {
  const { data: lesson, error } = await supabase
    .from('lessons')
    .select('*')
    .eq('lesson_key', 'fractions')
    .single();

  if (error) {
    console.error('Error:', error);
    return;
  }

  console.log('=== FRACTIONS LESSON ===');
  console.log('Title:', lesson.title);
  console.log('Key:', lesson.lesson_key);
  console.log('Updated at:', lesson.updated_at);
  console.log('Length:', lesson.content.length);
  console.log('\n=== CONTENT ===\n');
  console.log(lesson.content);

  fs.writeFileSync('fractions-current.html', lesson.content);
  console.log('\n✅ Saved to fractions-current.html');
}

checkFractionsLesson();
