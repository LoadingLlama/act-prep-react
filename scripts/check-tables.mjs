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

async function checkTables() {
  console.log('Checking for quizzes table...\n');
  
  const { data: quizzes, error: qError } = await supabase
    .from('quizzes')
    .select('*')
    .limit(1);
  
  if (qError) {
    console.log('❌ quizzes table:', qError.message);
  } else {
    console.log('✅ quizzes table exists');
    if (quizzes && quizzes.length > 0) {
      console.log('Columns:', Object.keys(quizzes[0]));
    }
  }
  
  console.log('\nChecking for quiz_questions table...\n');
  
  const { data: questions, error: questError } = await supabase
    .from('quiz_questions')
    .select('*')
    .limit(1);
  
  if (questError) {
    console.log('❌ quiz_questions table:', questError.message);
  } else {
    console.log('✅ quiz_questions table exists');
    if (questions && questions.length > 0) {
      console.log('Columns:', Object.keys(questions[0]));
    }
  }
}

checkTables();
