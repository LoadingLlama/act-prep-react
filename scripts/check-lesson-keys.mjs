#!/usr/bin/env node

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function checkLessonKeys() {
  const { data } = await supabase
    .from('lesson_term_definitions')
    .select('lesson_key');

  const nullCount = data?.filter(t => t.lesson_key === null).length;
  const nonNullCount = data?.filter(t => t.lesson_key !== null).length;

  console.log('\nlesson_term_definitions:');
  console.log('  Terms with lesson_key = null:', nullCount);
  console.log('  Terms with specific lesson_key:', nonNullCount);

  if (nonNullCount > 0) {
    const uniqueKeys = [...new Set(data?.filter(t => t.lesson_key !== null).map(t => t.lesson_key))];
    console.log('\n  Sample lesson_keys:', uniqueKeys.slice(0, 10));
  }

  process.exit(0);
}

checkLessonKeys();
