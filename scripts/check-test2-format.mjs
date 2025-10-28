import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const sb = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

// Get Test 2 English questions to see format
const { data, error } = await sb
  .from('practice_test_english_questions')
  .select('question_number, question_text, question_prompt, passage_id')
  .eq('test_number', 2)
  .order('question_number')
  .limit(10);

if (error) {
  console.error('Error:', error.message);
} else if (!data || data.length === 0) {
  console.log('No Test 2 found. Let me check what tests exist...');

  const { data: allTests } = await sb
    .from('practice_test_english_questions')
    .select('test_number')
    .order('test_number');

  const uniqueTests = [...new Set(allTests.map(q => q.test_number))];
  console.log('Available tests:', uniqueTests);
} else {
  console.log('TEST 2 - ENGLISH QUESTION FORMAT:\n');
  data.forEach(q => {
    console.log('======================================================================');
    console.log(`Q${q.question_number}`);
    console.log(`Question Text: ${q.question_text}`);
    console.log(`Question Prompt: ${q.question_prompt || 'N/A'}`);
    console.log('');
  });
}
