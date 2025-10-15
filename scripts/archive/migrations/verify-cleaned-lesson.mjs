import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function verifyLesson() {
  const { data: lesson, error } = await supabase
    .from('lessons')
    .select('*')
    .eq('lesson_key', 'geometry-shapes')
    .single();

  if (error) {
    console.error('Error:', error);
    return;
  }

  console.log('=== CLEANED LESSON ===');
  console.log('Title:', lesson.title);
  console.log('Length:', lesson.content.length, 'characters');
  console.log('\n=== CONTENT ===\n');
  console.log(lesson.content);

  // Save for review
  fs.writeFileSync('final-cleaned-lesson.html', lesson.content);
  console.log('\n✅ Saved to final-cleaned-lesson.html');
}

verifyLesson();
