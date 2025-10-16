import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: resolve(__dirname, '../.env') });

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function checkOrders() {
  console.log('\n📚 CHECKING ALL MATH LESSONS ORDER');
  console.log('='.repeat(80));

  const { data: lessons, error } = await supabase
    .from('lesson_metadata')
    .select('lesson_key, title, order_index, category')
    .like('lesson_key', '%.%')
    .order('order_index');

  if (error) {
    console.error('❌ Error:', error.message);
    return;
  }

  console.log('\n📝 Lessons by order:');
  lessons.forEach(lesson => {
    console.log(`  ${lesson.order_index}: ${lesson.lesson_key} - ${lesson.title} (${lesson.category})`);
  });

  console.log('\n' + '='.repeat(80));
}

checkOrders();
