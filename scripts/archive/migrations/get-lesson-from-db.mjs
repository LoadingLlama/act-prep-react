import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function getLessons() {
  // Get an English lesson - sentence-structure
  const { data: englishLesson, error: englishError } = await supabase
    .from('lessons')
    .select('*')
    .eq('lesson_key', 'sentence-structure')
    .single();

  if (englishError) {
    console.error('Error fetching English lesson:', englishError);
  }

  // Get a math lesson - any one
  const { data: mathLesson, error: mathError } = await supabase
    .from('lessons')
    .select('*')
    .eq('section', 'math')
    .limit(1)
    .single();

  if (mathError) {
    console.error('Error fetching math lesson:', mathError);
  }

  console.log('=== ENGLISH LESSON ===');
  if (englishLesson) {
    console.log('Key:', englishLesson.lesson_key);
    console.log('Title:', englishLesson.title);
    console.log('Section:', englishLesson.section);
    console.log('\nContent preview (first 2000 chars):');
    console.log(englishLesson.content?.substring(0, 2000));

    // Save full lesson for analysis
    fs.writeFileSync('english-lesson-sample.json', JSON.stringify(englishLesson, null, 2));
  }

  console.log('\n\n=== MATH LESSON ===');
  if (mathLesson) {
    console.log('Key:', mathLesson.lesson_key);
    console.log('Title:', mathLesson.title);
    console.log('Section:', mathLesson.section);
    console.log('\nContent preview (first 2000 chars):');
    console.log(mathLesson.content?.substring(0, 2000));

    // Save full lesson for analysis
    fs.writeFileSync('math-lesson-sample.json', JSON.stringify(mathLesson, null, 2));
  }
}

getLessons();
