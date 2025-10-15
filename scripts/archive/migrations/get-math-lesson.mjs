import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function getMathLesson() {
  // Get a math lesson
  const { data: mathLesson, error } = await supabase
    .from('lessons')
    .select('*')
    .eq('subject', 'math')
    .limit(1)
    .single();

  if (error) {
    console.error('Error:', error);
    return;
  }

  console.log('=== MATH LESSON ===');
  console.log('Key:', mathLesson.lesson_key);
  console.log('Title:', mathLesson.title);
  console.log('Subject:', mathLesson.subject);
  console.log('\nContent preview (first 3000 chars):');
  console.log(mathLesson.content?.substring(0, 3000));

  // Save for analysis
  fs.writeFileSync('math-lesson-sample.json', JSON.stringify(mathLesson, null, 2));
  console.log('\nSaved to math-lesson-sample.json');
}

getMathLesson();
