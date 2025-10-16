import { createClient } from '@supabase/supabase-js';
import { supabaseUrl, supabaseAnonKey } from './config.mjs';

// supabaseUrl imported from config.mjs
// supabaseAnonKey imported from config.mjs
const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function checkBlock() {
  const blockId = 'e320c237-310b-4255-9a97-c3052adcca49'; // word-choice block

  const { data, error } = await supabase
    .from('section_content')
    .select('*')
    .eq('id', blockId)
    .single();

  if (error) {
    console.error('Error:', error);
    return;
  }

  console.log('\n📄 CONTENT PREVIEW:');
  console.log('===================\n');
  console.log(data.content.substring(0, 1000));
  console.log('\n...\n');
  console.log(`\nTotal length: ${data.content.length} chars`);
  console.log(`\nHas H4 tags: ${data.content.includes('<h4')}`);
  console.log(`Has "Example": ${data.content.includes('Example')}`);
  console.log(`Has "Solution": ${data.content.includes('Solution')}`);
}

checkBlock();
