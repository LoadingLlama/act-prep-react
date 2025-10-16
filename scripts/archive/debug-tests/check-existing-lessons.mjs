import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: resolve(__dirname, '../.env') });

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function checkLessons() {
  console.log('\n📚 CHECKING EXISTING MATH LESSONS IN DATABASE');
  console.log('='.repeat(80));

  const { data: lessons, error } = await supabase
    .from('lesson_metadata')
    .select('lesson_key, title')
    .like('lesson_key', '%.%')
    .order('lesson_key');

  if (error) {
    console.error('Error:', error.message);
    return;
  }

  console.log('\nLessons found:');
  const mathLessons = lessons.filter(l => /^\d+\.\d+$/.test(l.lesson_key));

  mathLessons.forEach(lesson => {
    console.log(`  ${lesson.lesson_key}: ${lesson.title}`);
  });

  console.log(`\nTotal math lessons: ${mathLessons.length}`);

  const chapter3Needed = ['3.1', '3.2', '3.3', '3.4', '3.5', '3.6'];
  const chapter3Exists = mathLessons
    .filter(l => l.lesson_key.startsWith('3.'))
    .map(l => l.lesson_key);

  const missing = chapter3Needed.filter(key => !chapter3Exists.includes(key));

  if (missing.length > 0) {
    console.log('\n⚠️  MISSING LESSONS FROM CHAPTER 3:');
    missing.forEach(key => {
      const titles = {
        '3.1': 'Algebra Skills',
        '3.2': 'Fractions',
        '3.3': 'Exponents and Roots',
        '3.4': 'Logarithms',
        '3.5': 'Inequalities',
        '3.6': 'Absolute Value'
      };
      console.log(`  ${key}: ${titles[key]}`);
    });
  }

  console.log('\n' + '='.repeat(80));
}

checkLessons();
