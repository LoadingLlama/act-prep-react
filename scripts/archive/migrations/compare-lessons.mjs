import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function compareLessons() {
  // Get an English lesson
  const { data: englishLesson } = await supabase
    .from('lessons')
    .select('lesson_key, content')
    .eq('section', 'english')
    .limit(1)
    .single();

  // Get a math lesson
  const { data: mathLesson } = await supabase
    .from('lessons')
    .select('lesson_key, content')
    .eq('section', 'math')
    .limit(1)
    .single();

  const comparison = {
    english: {
      lesson_key: englishLesson?.lesson_key,
      content: englishLesson?.content
    },
    math: {
      lesson_key: mathLesson?.lesson_key,
      content: mathLesson?.content
    }
  };

  fs.writeFileSync('lesson-comparison.json', JSON.stringify(comparison, null, 2));
  console.log('Comparison saved to lesson-comparison.json');

  console.log('\n=== ENGLISH LESSON ===');
  console.log('Key:', englishLesson?.lesson_key);
  console.log('Content preview:\n', JSON.stringify(englishLesson?.content, null, 2).substring(0, 1500));

  console.log('\n\n=== MATH LESSON ===');
  console.log('Key:', mathLesson?.lesson_key);
  console.log('Content preview:\n', JSON.stringify(mathLesson?.content, null, 2).substring(0, 1500));
}

compareLessons();
