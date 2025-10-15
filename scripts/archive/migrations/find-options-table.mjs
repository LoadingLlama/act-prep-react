/**
 * Find where quiz answer options are stored
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Get a sample question
const { data: questions } = await supabase
  .from('quiz_questions')
  .select('*')
  .limit(1);

if (questions && questions.length > 0) {
  const questionId = questions[0].id;
  console.log('Sample question ID:', questionId);

  // Try to find options in quiz_options table
  const { data: options, error } = await supabase
    .from('quiz_options')
    .select('*')
    .eq('question_id', questionId);

  if (error) {
    console.log('Error checking quiz_options:', error.message);
  } else {
    console.log('\nOptions found:', options ? options.length : 0);
    if (options && options.length > 0) {
      console.log('\nSample option:');
      console.log(JSON.stringify(options[0], null, 2));
    }
  }
}
