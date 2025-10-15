import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const { data: lesson } = await supabase
  .from('lessons')
  .select('*')
  .eq('lesson_key', 'math-1-1')
  .single();

console.log('CURRENT LESSON 1 CONTENT:');
console.log('='.repeat(70));
console.log(lesson.content);
console.log('='.repeat(70));
console.log('\nCHECKS:');
console.log('Contains "Example 1":', lesson.content.includes('Example 1') ? 'YES' : 'NO');
console.log('Contains "√(x + 10)":', lesson.content.includes('√(x + 10)') ? 'YES' : 'NO');
console.log('Contains "x³":', lesson.content.includes('x³') ? 'YES' : 'NO');
console.log('Content length:', lesson.content.length, 'characters');
