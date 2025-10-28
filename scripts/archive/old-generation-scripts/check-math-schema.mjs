#!/usr/bin/env node
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

const { data } = await supabase
  .from('practice_test_math_questions')
  .select('*')
  .limit(1);

console.log('practice_test_math_questions columns:');
console.log(Object.keys(data[0]));
console.log('\nSample:');
console.log(JSON.stringify(data[0], null, 2));
