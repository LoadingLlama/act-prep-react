#!/usr/bin/env node
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

console.log('🔍 Checking Test 1 data format...\n');

const { data: passage } = await supabase
  .from('practice_test_english_passages')
  .select('*')
  .eq('test_number', 1)
  .eq('passage_number', 1)
  .single();

console.log('Sample English Passage:');
console.log(JSON.stringify(passage, null, 2));
console.log('\n');

const { data: question } = await supabase
  .from('practice_test_english_questions')
  .select('*')
  .eq('test_number', 1)
  .eq('question_number', 1)
  .single();

console.log('Sample English Question:');
console.log(JSON.stringify(question, null, 2));
