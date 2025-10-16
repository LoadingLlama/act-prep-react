import { createClient } from '@supabase/supabase-js';
import { supabaseUrl, supabaseAnonKey } from './config.mjs';

// supabaseUrl imported from config.mjs
// supabaseAnonKey imported from config.mjs
const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function directClean() {
  console.log('🔧 DIRECT CLEAN WITH VERIFICATION\n');

  // Get all English lessons
  const { data: lessons } = await supabase
    .from('lesson_metadata')
    .select('id, lesson_key')
    .eq('subject', 'english');

  for (const lesson of lessons) {
    const { data: sections } = await supabase
      .from('lesson_sections')
      .select('id')
      .eq('lesson_id', lesson.id);

    for (const section of sections) {
      const { data: blocks } = await supabase
        .from('section_content')
        .select('*')
        .eq('section_id', section.id);

      for (const block of blocks) {
        // Keep only content before the first H4 tag
        if (block.content.includes('<h4')) {
          // Find the first H4 tag
          const h4Index = block.content.indexOf('<h4');

          if (h4Index > 100) { // Only if there's significant content before it
            const cleaned = block.content.substring(0, h4Index).trim();

            console.log(`\n${lesson.lesson_key}:`);
            console.log(`  Before: ${block.content.length} chars`);
            console.log(`  After: ${cleaned.length} chars`);

            // Update with proper error handling
            const { data, error } = await supabase
              .from('section_content')
              .update({ content: cleaned })
              .eq('id', block.id)
              .select();

            if (error) {
              console.log(`  ❌ ERROR: ${error.message}`);
              console.log(`  Details:`, error);
            } else {
              console.log(`  ✅ Updated successfully`);

              // Verify the update
              const { data: verified } = await supabase
                .from('section_content')
                .select('content')
                .eq('id', block.id)
                .single();

              console.log(`  ✓ Verified: ${verified.content.length} chars (${!verified.content.includes('<h4') ? 'no H4' : 'still has H4'})`);
            }
          }
        }
      }
    }
  }

  console.log('\n✅ Direct clean complete\n');
}

directClean().catch(err => {
  console.error('❌ Failed:', err);
  process.exit(1);
});
