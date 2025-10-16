import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: resolve(__dirname, '../.env') });

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function checkSchema() {
  console.log('\n🔍 CHECKING QUIZ TABLE SCHEMA');
  console.log('='.repeat(80));

  const { data, error } = await supabase
    .from('quizzes')
    .insert({ title: 'Test Quiz' })
    .select('*')
    .single();

  if (error) {
    console.error('Error:', error.message);
  } else {
    console.log('\nColumns:');
    Object.keys(data).forEach(col => console.log(`  - ${col}`));
    await supabase.from('quizzes').delete().eq('id', data.id);
  }

  console.log('\n' + '='.repeat(80));
}

checkSchema();
