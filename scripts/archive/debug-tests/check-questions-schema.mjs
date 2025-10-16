import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: resolve(__dirname, '../.env') });

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function checkSchema() {
  console.log('\n🔍 CHECKING QUIZ_QUESTIONS TABLE SCHEMA');
  console.log('='.repeat(80));

  const { data, error } = await supabase
    .from('quiz_questions')
    .select('*')
    .limit(1);

  if (error) {
    console.error('Error:', error.message);
  } else if (data && data.length > 0) {
    console.log('\nColumns:');
    Object.keys(data[0]).forEach(col => console.log(`  - ${col}`));
  } else {
    console.log('No data found. Trying insert test...');
    const { data: testData, error: insertError } = await supabase
      .from('quiz_questions')
      .insert({ question_text: 'Test' })
      .select('*')
      .single();

    if (insertError) {
      console.error('Insert error:', insertError.message);
    } else {
      console.log('\nColumns:');
      Object.keys(testData).forEach(col => console.log(`  - ${col}`));
      await supabase.from('quiz_questions').delete().eq('id', testData.id);
    }
  }

  console.log('\n' + '='.repeat(80));
}

checkSchema();
