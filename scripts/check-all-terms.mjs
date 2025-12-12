#!/usr/bin/env node

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const { data, error } = await supabase
  .from('lesson_term_definitions')
  .select('lesson_key, term')
  .order('lesson_key', { ascending: true });

if (error) {
  console.error('Error:', error);
  process.exit(1);
}

console.log('\n=== Terms in Database ===\n');

const byLesson = {};
data.forEach(row => {
  if (!byLesson[row.lesson_key]) {
    byLesson[row.lesson_key] = [];
  }
  byLesson[row.lesson_key].push(row.term);
});

for (const [lesson, terms] of Object.entries(byLesson)) {
  console.log(`📚 ${lesson}: ${terms.length} terms`);
  terms.forEach(term => console.log(`   - ${term}`));
  console.log('');
}

console.log(`Total: ${data.length} terms\n`);
process.exit(0);
