import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: resolve(__dirname, '../.env') });

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function checkSchema() {
  console.log('\n🔍 CHECKING LESSON_METADATA TABLE SCHEMA');
  console.log('='.repeat(80));

  // Get one existing lesson to see the structure
  const { data: lessons, error } = await supabase
    .from('lesson_metadata')
    .select('*')
    .limit(1);

  if (error) {
    console.error('❌ Error:', error.message);
    return;
  }

  if (lessons && lessons.length > 0) {
    console.log('\n📊 Available columns:');
    console.log(Object.keys(lessons[0]));
    console.log('\n📝 Example lesson:');
    console.log(JSON.stringify(lessons[0], null, 2));
  }

  console.log('\n' + '='.repeat(80));
}

checkSchema();
