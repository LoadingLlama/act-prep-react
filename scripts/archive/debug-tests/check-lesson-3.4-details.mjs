import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: resolve(__dirname, '../.env') });

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function checkLesson() {
  console.log('\n🔍 CHECKING LESSON 3.4 DETAILS');
  console.log('='.repeat(80));

  const { data: lesson, error } = await supabase
    .from('lesson_metadata')
    .select('*')
    .eq('lesson_key', '3.4')
    .single();

  if (error) {
    console.error('❌ Error:', error.message);
    return;
  }

  console.log('\n📝 Lesson 3.4 details:');
  console.log(JSON.stringify(lesson, null, 2));

  console.log('\n' + '='.repeat(80));
}

checkLesson();
