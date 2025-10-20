import { supabaseUrl, supabaseServiceKey } from './config.mjs';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function analyze() {
  const { data } = await supabase
    .from('lesson_metadata')
    .select('lesson_key, title')
    .eq('subject', 'math')
    .order('lesson_key');

  const numeric = data.filter(l => /^[0-9]/.test(l.lesson_key));
  const named = data.filter(l => !/^[0-9]/.test(l.lesson_key));

  console.log(`Numeric lesson keys (like 2.2, 3.1): ${numeric.length}`);
  console.log(`Named lesson keys (like algebra-skills): ${named.length}`);
  console.log(`Total: ${data.length}\n`);

  console.log('Sample numeric lessons:');
  numeric.slice(0, 5).forEach(l => console.log(`  ${l.lesson_key}: ${l.title}`));

  console.log('\nSample named lessons:');
  named.slice(0, 5).forEach(l => console.log(`  ${l.lesson_key}: ${l.title}`));
}

analyze();
