import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: resolve(__dirname, '../.env') });

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function listMathLessons() {
  console.log('Fetching all Math lessons from lesson_metadata...\n');

  const { data: lessons, error } = await supabase
    .from('lesson_metadata')
    .select('*')
    .eq('subject', 'math')
    .order('order_index');

  if (error) {
    console.error('Error:', error);
    return;
  }

  console.log(`Found ${lessons?.length || 0} Math lessons:\n`);
  console.log('='.repeat(100));
  console.log('Order | Lesson Key | Title | Category');
  console.log('='.repeat(100));

  for (const lesson of lessons || []) {
    console.log(
      `${String(lesson.order_index).padEnd(5)} | ${String(lesson.lesson_key).padEnd(20)} | ${String(lesson.title).padEnd(40)} | ${lesson.category || 'N/A'}`
    );
  }

  console.log('='.repeat(100));

  // Check if 'backsolving' or 'working-backwards' exists
  const keysToCheck = ['1.1', 'backsolving', 'working-backwards', 'working-backwards-strategy'];

  console.log('\nChecking for potential lesson 1.1 variations:');
  for (const key of keysToCheck) {
    const match = lessons?.find(l => l.lesson_key === key);
    if (match) {
      console.log(`  ✓ Found: ${key} → "${match.title}"`);
    } else {
      console.log(`  ✗ Not found: ${key}`);
    }
  }
}

listMathLessons().catch(console.error);
