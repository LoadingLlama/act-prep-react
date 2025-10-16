import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: resolve(__dirname, '../.env') });

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function listAll() {
  const { data: lessons } = await supabase
    .from('lessons')
    .select('id, title, lesson_key, subject, order_index')
    .order('subject')
    .order('order_index');

  const bySubject = {
    math: [],
    english: [],
    reading: [],
    science: []
  };

  lessons.forEach(lesson => {
    if (lesson.lesson_key !== 'geometry-angles') { // Skip gold standard
      bySubject[lesson.subject].push(lesson);
    }
  });

  console.log('MATH LESSONS (35 total):');
  console.log('='.repeat(80));
  bySubject.math.forEach((l, i) => console.log(`${i + 1}. ${l.title} (${l.lesson_key})`));

  console.log('\n\nENGLISH LESSONS (16 total):');
  console.log('='.repeat(80));
  bySubject.english.forEach((l, i) => console.log(`${i + 1}. ${l.title} (${l.lesson_key})`));

  console.log('\n\nREADING LESSONS (14 total):');
  console.log('='.repeat(80));
  bySubject.reading.forEach((l, i) => console.log(`${i + 1}. ${l.title} (${l.lesson_key})`));

  console.log('\n\nSCIENCE LESSONS (17 total):');
  console.log('='.repeat(80));
  bySubject.science.forEach((l, i) => console.log(`${i + 1}. ${l.title} (${l.lesson_key})`));

  console.log('\n\nTOTAL: 82 lessons (81 to revamp + 1 gold standard already done)');
}

listAll();
