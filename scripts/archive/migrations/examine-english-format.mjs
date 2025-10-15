import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const { data: englishLessons } = await supabase
  .from('lessons')
  .select('*')
  .eq('subject', 'english')
  .order('order_index')
  .limit(2);

console.log('ENGLISH LESSON FORMAT (REFERENCE):');
console.log('='.repeat(70));
console.log('\n');

if (englishLessons && englishLessons.length > 0) {
  const lesson = englishLessons[0];
  console.log(`TITLE: ${lesson.title}\n`);
  console.log('CONTENT:\n');
  console.log(lesson.content);
} else {
  console.log('No English lessons found');
}
