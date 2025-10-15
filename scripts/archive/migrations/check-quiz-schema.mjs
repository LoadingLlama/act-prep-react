/**
 * Check quiz_questions schema
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Try to get any existing quiz question to see the schema
const { data, error } = await supabase
  .from('quiz_questions')
  .select('*')
  .limit(1);

if (error) {
  console.error('Error:', error);
} else {
  console.log('Quiz Questions Schema (sample row):');
  console.log(JSON.stringify(data, null, 2));
}

// Also check if there are ANY quiz questions in the entire database
const { data: allQuestions, error: error2 } = await supabase
  .from('quiz_questions')
  .select('*');

console.log('\nTotal quiz questions in database:', allQuestions ? allQuestions.length : 0);

if (allQuestions && allQuestions.length > 0) {
  console.log('\nSample question:');
  console.log(JSON.stringify(allQuestions[0], null, 2));
}
