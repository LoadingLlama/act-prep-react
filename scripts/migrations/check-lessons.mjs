import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const { data: lessons } = await supabase
  .from('lesson_metadata')
  .select('id, lesson_key, title, category')
  .order('category', { ascending: true })
  .order('order_index', { ascending: true });

console.log('\n=== LESSONS IN DATABASE ===\n');
let currentCategory = '';
lessons.forEach(lesson => {
  if (lesson.category !== currentCategory) {
    currentCategory = lesson.category;
    console.log(`\n${currentCategory}:`);
  }
  console.log(`  - ${lesson.lesson_key} (${lesson.title})`);
});

console.log(`\n\nTotal lessons: ${lessons.length}`);
