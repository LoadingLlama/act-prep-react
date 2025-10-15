import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: resolve(__dirname, '../.env') });

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function count() {
  console.log('📊 COUNTING ALL FORMATTED LESSONS...\n');

  const { data: allLessons } = await supabase
    .from('lessons')
    .select('id, title, lesson_key, content, subject');

  let formatted = 0;
  let notFormatted = 0;
  const bySubject = { math: 0, english: 0, reading: 0, science: 0 };

  for (const lesson of allLessons) {
    const hasFormatting = lesson.content?.includes('color: #2563eb; font-weight: 600; text-decoration: underline');

    if (hasFormatting) {
      formatted++;
      bySubject[lesson.subject]++;
    } else {
      notFormatted++;
      console.log(`❌ NOT FORMATTED: ${lesson.title} (${lesson.lesson_key})`);
    }
  }

  console.log('\n' + '='.repeat(60));
  console.log(`📚 TOTAL LESSONS: ${allLessons.length}`);
  console.log(`✅ FORMATTED: ${formatted}`);
  console.log(`❌ NOT FORMATTED: ${notFormatted}`);
  console.log('\nBy Subject:');
  console.log(`  📐 Math: ${bySubject.math}`);
  console.log(`  ✍️  English: ${bySubject.english}`);
  console.log(`  📖 Reading: ${bySubject.reading}`);
  console.log(`  🔬 Science: ${bySubject.science}`);
  console.log('='.repeat(60));

  if (formatted === allLessons.length) {
    console.log('\n🎉 ALL LESSONS ARE FORMATTED! ✅');
  } else {
    console.log(`\n⚠️  ${notFormatted} lessons still need formatting!`);
  }
}

count();
