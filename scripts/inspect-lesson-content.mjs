import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: resolve(__dirname, '../.env') });

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function inspectLessons() {
  // Check a few different lessons to see what was actually parsed
  const { data: lessons } = await supabase
    .from('lessons')
    .select('lesson_key, title, content')
    .in('lesson_key', ['fractions', 'sentence-structure', 'algebra-skills', 'substitution'])
    .order('lesson_key');

  if (!lessons) {
    console.log('❌ Could not fetch lessons');
    return;
  }

  lessons.forEach(lesson => {
    console.log(`\n${'='.repeat(100)}`);
    console.log(`LESSON: ${lesson.lesson_key}`);
    console.log(`TITLE: ${lesson.title}`);
    console.log(`LENGTH: ${lesson.content ? lesson.content.length : 0} chars`);
    console.log('='.repeat(100));

    if (lesson.content) {
      // Show first 2000 chars to see structure
      console.log('\n--- FIRST 2000 CHARS ---');
      console.log(lesson.content.substring(0, 2000));
      console.log('\n...\n');
    }
  });
}

inspectLessons();
