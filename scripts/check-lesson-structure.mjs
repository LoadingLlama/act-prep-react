import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_ANON_KEY
);

const { data: lesson } = await supabase
  .from('lessons')
  .select('*')
  .eq('lesson_key', 'sentence-structure')
  .single();

console.log('Lesson object structure:');
console.log(JSON.stringify(lesson, null, 2));
console.log('\nLesson keys:', Object.keys(lesson));
