import { supabaseUrl, supabaseServiceKey } from './config.mjs';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function countContent() {
  console.log('🔍 Counting all content in database\n');

  const { count: totalContent } = await supabase
    .from('lesson_section_content')
    .select('*', { count: 'exact', head: true });

  console.log(`Total content blocks: ${totalContent}`);

  if (totalContent === 0) {
    console.log('\n❌ CATASTROPHIC: section_content table is COMPLETELY EMPTY!');
    console.log('   The cleanup script deleted ALL content blocks, not just damaged ones.\n');
  }

  // Check examples table too
  const { count: exampleCount } = await supabase
    .from('lesson_examples')
    .select('*', { count: 'exact', head: true });

  console.log(`Total examples: ${exampleCount}`);
}

countContent().catch(err => {
  console.error('❌ Failed:', err);
  process.exit(1);
});
