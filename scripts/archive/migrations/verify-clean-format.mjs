import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const { data: mathLesson } = await supabase
  .from('lessons')
  .select('*')
  .eq('lesson_key', 'math-1-1')
  .single();

const { data: englishLesson } = await supabase
  .from('lessons')
  .select('*')
  .eq('subject', 'english')
  .limit(1)
  .single();

console.log('ENGLISH LESSON FORMAT (REFERENCE):');
console.log('='.repeat(70));
console.log(englishLesson.content.substring(0, 600));
console.log('\n\n');

console.log('MATH LESSON FORMAT (SHOULD MATCH):');
console.log('='.repeat(70));
console.log(mathLesson.content.substring(0, 600));
console.log('\n\n');

console.log('QUALITY CHECKS:');
console.log('='.repeat(70));
console.log('Math has inline styles:', mathLesson.content.includes('style=') ? '❌ YES (bad)' : '✅ NO (good)');
console.log('Math has class attributes:', mathLesson.content.includes('class=') ? '❌ YES (bad)' : '✅ NO (good)');
console.log('Math has div wrapper:', mathLesson.content.includes('<div') ? '❌ YES (bad)' : '✅ NO (good)');
console.log('Math has clean indentation:', mathLesson.content.includes('            <h3>') ? '✅ YES (good)' : '❌ NO (bad)');
console.log('English has inline styles:', englishLesson.content.includes('style=') ? '❌ YES' : '✅ NO');
console.log('English has clean indentation:', englishLesson.content.includes('            <h3>') ? '✅ YES' : '❌ NO');
