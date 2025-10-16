import { createClient } from '@supabase/supabase-js';
import { supabaseUrl, supabaseAnonKey } from './config.mjs';

// supabaseUrl imported from config.mjs
// supabaseAnonKey imported from config.mjs
const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function finalTotalCleanup() {
  console.log('🧹 FINAL TOTAL CLEANUP - REMOVING ALL TRACES');
  console.log('=============================================\n');

  // Get all content blocks for English lessons
  const { data: englishLessons } = await supabase
    .from('lesson_metadata')
    .select('id, lesson_key')
    .eq('subject', 'english');

  let totalUpdated = 0;

  for (const lesson of englishLessons) {
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
        let content = block.content;
        const originalLength = content.length;

        // Keep H3 tags but remove everything else example-related
        const h3Pattern = /<h3[^>]*>.*?<\/h3>/gis;
        const h3Tags = content.match(h3Pattern) || [];

        // Split content by H3 tags
        const parts = content.split(h3Pattern);

        // Clean each part (between H3 sections)
        const cleanedParts = parts.map(part => {
          // Remove H4 tags and everything after them until next major element
          let cleaned = part.replace(/<h4[\s\S]*$/gi, '');

          // Remove any remaining H4 closing tags
          cleaned = cleaned.replace(/<\/h4>/gi, '');

          return cleaned.trim();
        });

        // Reconstruct content with H3 tags
        let newContent = '';
        for (let i = 0; i < cleanedParts.length; i++) {
          newContent += cleanedParts[i];
          if (i < h3Tags.length) {
            newContent += '\n\n' + h3Tags[i] + '\n\n';
          }
        }

        // Final cleanup
        newContent = newContent
          .replace(/\n{3,}/g, '\n\n')
          .trim();

        if (newContent !== content && newContent.length > 100) {
          const { error } = await supabase
            .from('section_content')
            .update({ content: newContent })
            .eq('id', block.id);

          if (!error) {
            console.log(`✅ ${lesson.lesson_key}: ${originalLength} → ${newContent.length} chars`);
            totalUpdated++;
          } else {
            console.log(`❌ Error: ${error.message}`);
          }
        }
      }
    }
  }

  console.log(`\n=============================================`);
  console.log(`✅ Updated ${totalUpdated} blocks`);
}

finalTotalCleanup().catch(err => {
  console.error('❌ Failed:', err);
  process.exit(1);
});
