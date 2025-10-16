import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: resolve(__dirname, '../.env') });

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function checkLessons() {
  console.log('=== CHECKING LESSON FORMATTING ===\n');

  // Check a few random lessons from different subjects
  const lessonKeys = ['substitution', 'geometry-angles', 'fractions', 'sentence-structure', 'core-principles', 'passage-approach'];

  for (const key of lessonKeys) {
    const { data: lesson, error } = await supabase
      .from('lessons')
      .select('lesson_key, title, content')
      .eq('lesson_key', key)
      .single();

    if (!error && lesson) {
      const markers = {
        'h3 5rem': lesson.content.includes('h3 style="margin-top: 5rem'),
        'h4 2rem': lesson.content.includes('h4 style="margin-top: 2rem'),
        'blue terms': lesson.content.includes('color: #2563eb'),
        'green takeaways': lesson.content.includes('color: #2e7d32'),
      };

      const blueCount = (lesson.content.match(/color: #2563eb/g) || []).length;
      const allGood = Object.values(markers).every(v => v);

      console.log(`${allGood ? '✓' : '✗'} ${lesson.title} (${key})`);
      console.log(`   Blue terms: ${blueCount}`);
      console.log(`   Markers: ${JSON.stringify(markers)}\n`);
    }
  }
}

checkLessons();
