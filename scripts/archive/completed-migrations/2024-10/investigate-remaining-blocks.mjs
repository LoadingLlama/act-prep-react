import { createClient } from '@supabase/supabase-js';
import { supabaseUrl, supabaseAnonKey } from './config.mjs';

// supabaseUrl imported from config.mjs
// supabaseAnonKey imported from config.mjs
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const blockIds = [
  'd157421f-3b39-4258-9e3f-13bb6187154e',
  'b5e0ac08-6a9a-4215-8f9d-3bf3e0fb3770',
  '6109f98d-743a-4a0f-b796-0fccc9d31926'
];

async function investigateBlocks() {
  console.log('🔍 INVESTIGATING REMAINING BLOCKS\n');

  for (const blockId of blockIds) {
    const { data: block } = await supabase
      .from('section_content')
      .select('*')
      .eq('id', blockId)
      .single();

    if (block) {
      console.log(`\n${'='.repeat(60)}`);
      console.log(`Block ID: ${blockId}`);
      console.log(`Content Length: ${block.content.length} chars`);
      console.log(`Has H4: ${block.content.includes('<h4')}`);
      console.log(`Has "Example": ${/Example \d+:/i.test(block.content)}`);
      console.log(`\nFull Content:\n`);
      console.log(block.content);
      console.log(`${'='.repeat(60)}\n`);
    }
  }
}

investigateBlocks().catch(err => {
  console.error('❌ Failed:', err);
  process.exit(1);
});
