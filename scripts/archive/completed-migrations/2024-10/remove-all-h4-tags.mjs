import { createClient } from '@supabase/supabase-js';
import { supabaseUrl, supabaseAnonKey } from './config.mjs';

// supabaseUrl imported from config.mjs
// supabaseAnonKey imported from config.mjs
const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Remove ALL H4 tags from content
 */
async function removeAllH4Tags() {
  console.log('🗑️  REMOVING ALL H4 TAGS');
  console.log('=========================\n');

  const { data: lessons } = await supabase
    .from('lesson_metadata')
    .select('id, lesson_key')
    .eq('subject', 'english');

  let updatedCount = 0;

  for (const lesson of lessons) {
    const { data: sections } = await supabase
      .from('lesson_sections')
      .select('id')
      .eq('lesson_id', lesson.id);

    if (!sections) continue;

    for (const section of sections) {
      const { data: contentBlocks } = await supabase
        .from('section_content')
        .select('*')
        .eq('section_id', section.id);

      if (!contentBlocks) continue;

      for (const block of contentBlocks) {
        if (!block.content.includes('<h4')) continue;

        let cleaned = block.content;

        // Remove ALL H4 tags completely
        cleaned = cleaned.replace(/<h4[^>]*>.*?<\/h4>/gis, '');

        // Clean up extra whitespace
        cleaned = cleaned
          .replace(/\n{3,}/g, '\n\n')
          .replace(/(<\/p>)\s*(<p)/g, '$1\n$2')
          .trim();

        const { error } = await supabase
          .from('section_content')
          .update({ content: cleaned })
          .eq('id', block.id);

        if (!error) {
          console.log(`✅ ${lesson.lesson_key} - Removed H4 tags`);
          updatedCount++;
        }
      }
    }
  }

  console.log(`\n=========================`);
  console.log(`✅ Removed H4 tags from ${updatedCount} blocks`);
}

removeAllH4Tags().catch(err => {
  console.error('❌ Failed:', err);
  process.exit(1);
});
