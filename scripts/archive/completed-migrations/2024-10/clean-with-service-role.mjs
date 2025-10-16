import { createClient } from '@supabase/supabase-js';
import { supabaseUrl, supabaseServiceKey } from './config.mjs';

// supabaseUrl imported from config.mjs
// Use SERVICE ROLE key for write permissions
// supabaseServiceKey imported from config.mjs
const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function cleanWithServiceRole() {
  console.log('🔧 CLEANING WITH SERVICE ROLE KEY');
  console.log('==================================\n');

  // Get all English lessons
  const { data: lessons } = await supabase
    .from('lesson_metadata')
    .select('id, lesson_key')
    .eq('subject', 'english');

  console.log(`Processing ${lessons.length} English lessons\n`);

  let successCount = 0;
  let errorCount = 0;

  for (const lesson of lessons) {
    const { data: sections } = await supabase
      .from('lesson_sections')
      .select('id')
      .eq('lesson_id', lesson.id);

    if (!sections) continue;

    for (const section of sections) {
      const { data: blocks } = await supabase
        .from('section_content')
        .select('*')
        .eq('section_id', section.id);

      if (!blocks) continue;

      for (const block of blocks) {
        // Only clean if there's an H4 tag
        if (!block.content.includes('<h4')) continue;

        // Find first H4 tag
        const h4Index = block.content.indexOf('<h4');

        if (h4Index < 100) continue; // Skip if H4 is at the beginning

        // Keep everything before the first H4
        const cleaned = block.content.substring(0, h4Index).trim();

        // Update the database
        const { error } = await supabase
          .from('section_content')
          .update({ content: cleaned })
          .eq('id', block.id);

        if (error) {
          console.log(`❌ ${lesson.lesson_key}: ${error.message}`);
          errorCount++;
        } else {
          console.log(`✅ ${lesson.lesson_key}: ${block.content.length} → ${cleaned.length} chars`);
          successCount++;
        }
      }
    }
  }

  console.log('\n==================================');
  console.log(`✅ Success: ${successCount}`);
  console.log(`❌ Errors: ${errorCount}`);
  console.log('\nNow verifying...\n');

  // Verify the cleanup
  let remainingH4Count = 0;
  for (const lesson of lessons) {
    const { data: sections } = await supabase
      .from('lesson_sections')
      .select('id')
      .eq('lesson_id', lesson.id);

    for (const section of sections) {
      const { data: blocks } = await supabase
        .from('section_content')
        .select('content')
        .eq('section_id', section.id);

      for (const block of blocks) {
        if (block.content.includes('<h4')) {
          remainingH4Count++;
        }
      }
    }
  }

  console.log(`\n📊 Verification: ${remainingH4Count} blocks still have H4 tags`);

  if (remainingH4Count === 0) {
    console.log('✅ ALL HARDCODED EXAMPLES REMOVED!');
  } else {
    console.log('⚠️  Some H4 tags remain - may need another pass');
  }
}

cleanWithServiceRole().catch(err => {
  console.error('❌ Failed:', err);
  process.exit(1);
});
