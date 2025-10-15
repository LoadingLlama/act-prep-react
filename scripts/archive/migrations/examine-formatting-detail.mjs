import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const { data: lessons } = await supabase
  .from('lessons')
  .select('*')
  .eq('subject', 'math')
  .order('order_index');

// Look at first 3 lessons in detail
console.log('EXAMINING LESSON FORMATTING IN DETAIL...\n');

for (let i = 0; i < 3; i++) {
  const lesson = lessons[i];
  console.log('='.repeat(70));
  console.log(`LESSON ${i + 1}: ${lesson.title}`);
  console.log('='.repeat(70));
  console.log(lesson.content);
  console.log('\n\n');
}

// Also check one enhanced lesson
const matrices = lessons.find(l => l.title === 'Matrices');
console.log('='.repeat(70));
console.log('MATRICES LESSON (ENHANCED):');
console.log('='.repeat(70));
console.log(matrices.content);
