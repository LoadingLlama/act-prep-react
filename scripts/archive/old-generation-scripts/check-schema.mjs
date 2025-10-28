#!/usr/bin/env node
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

console.log('🔍 Checking table schemas...\n');

const { data: passages } = await supabase
  .from('practice_test_english_passages')
  .select('*')
  .limit(1);

console.log('practice_test_english_passages columns:');
console.log(Object.keys(passages[0]));
console.log();

const { data: questions } = await supabase
  .from('practice_test_english_questions')
  .select('*')
  .limit(1);

console.log('practice_test_english_questions columns:');
console.log(Object.keys(questions[0]));
