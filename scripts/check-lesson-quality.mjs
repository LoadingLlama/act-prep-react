import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: resolve(__dirname, '../.env') });

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function checkLesson() {
  // Fetch backsolving (gold standard) and fractions (recently parsed)
  const { data: lessons } = await supabase
    .from('lessons')
    .select('lesson_key, title, content')
    .in('lesson_key', ['backsolving', 'fractions', 'sentence-structure']);

  if (!lessons) {
    console.log('❌ Could not fetch lessons');
    return;
  }

  lessons.forEach(lesson => {
    console.log(`\n${'='.repeat(80)}`);
    console.log(`Lesson: ${lesson.lesson_key}`);
    console.log(`Title: ${lesson.title}`);
    console.log(`Content Length: ${lesson.content ? lesson.content.length : 0} chars`);

    if (lesson.content) {
      // Show first 1500 chars
      console.log(`\nFirst 1500 chars:`);
      console.log(lesson.content.substring(0, 1500));
      console.log('...');

      // Show last 1000 chars
      console.log(`\nLast 1000 chars:`);
      console.log(lesson.content.substring(lesson.content.length - 1000));
    }
  });
}

checkLesson();
