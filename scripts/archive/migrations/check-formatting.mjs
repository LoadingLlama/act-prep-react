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

console.log('LESSON 1.1 - FORMATTED VERSION:');
console.log('='.repeat(70));
console.log(lesson.content.substring(0, 1500));
console.log('\n...\n');
console.log('='.repeat(70));
console.log('\nChecking for issues:');
console.log('- "test - taking" found:', lesson.content.includes('test - taking') ? 'YES ❌' : 'NO ✅');
console.log('- "guess - and - check" found:', lesson.content.includes('guess - and - check') ? 'YES ❌' : 'NO ✅');
console.log('- "test-taking" found:', lesson.content.includes('test-taking') ? 'YES ✅' : 'NO ❌');
console.log('- Broken SVG tags:', lesson.content.match(/<\/(line|path|rect)>$/gm) ? 'YES ❌' : 'NO ✅');
