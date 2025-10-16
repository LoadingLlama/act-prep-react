import { createClient } from '@supabase/supabase-js';
import { supabaseUrl, supabaseAnonKey } from './config.mjs';

// supabaseUrl imported from config.mjs
// supabaseAnonKey imported from config.mjs
const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Nuclear option: Remove ALL hardcoded examples completely
 */
async function nuclearCleanExamples() {
  console.log('💣 NUCLEAR CLEAN: REMOVING ALL HARDCODED EXAMPLES');
  console.log('==================================================\n');

  // Get all English lessons
  const { data: lessons } = await supabase
    .from('lesson_metadata')
    .select('id, lesson_key, title')
    .eq('subject', 'english')
    .order('lesson_key');

  console.log(`Processing ${lessons.length} English lessons\n`);

  let updatedCount = 0;

  for (const lesson of lessons) {
    // Get all sections
    const { data: sections } = await supabase
      .from('lesson_sections')
      .select('id, section_key, title')
      .eq('lesson_id', lesson.id);

    if (!sections) continue;

    for (const section of sections) {
      // Get all content blocks
      const { data: contentBlocks } = await supabase
        .from('section_content')
        .select('*')
        .eq('section_id', section.id);

      if (!contentBlocks) continue;

      for (const block of contentBlocks) {
        let cleaned = block.content;
        const originalLength = cleaned.length;

        // 1. Remove ALL H4 tags and their content until next major element
        cleaned = cleaned.replace(
          /<h4[^>]*>.*?<\/h4>[\s\S]*?(?=<h[23]|<p style="font-size: 16px|<ul|<ol|$)/gi,
          ''
        );

        // 2. Remove "Example N:" patterns and everything until next H3 or major element
        cleaned = cleaned.replace(
          /Example \d+:.*?[\s\S]*?(?=Example \d+:|<h[23]|<p style="font-size: 16px|$)/gi,
          ''
        );

        // 3. Remove "Solution:" blocks
        cleaned = cleaned.replace(
          /Solution:[\s\S]*?(?=Example|<h[23]|<p style="font-size: 16px|$)/gi,
          ''
        );

        // 4. Remove list items containing "Solution:"
        cleaned = cleaned.replace(
          /<li[^>]*>.*?Solution:.*?<\/li>/gi,
          ''
        );

        // 5. Remove "Correct answer:" patterns
        cleaned = cleaned.replace(
          /<li[^>]*>.*?Correct answer:.*?<\/li>/gi,
          ''
        );

        // 6. Remove "Answer:" blocks
        cleaned = cleaned.replace(
          /Answer:[\s\S]*?(?=Example|<h[23]|<p style="font-size: 16px|$)/gi,
          ''
        );

        // 7. Remove multiple choice patterns (A. B. C. D. format)
        cleaned = cleaned.replace(
          /[A-E]\.\s+NO CHANGE[\s\S]*?(?=[A-E]\.|Example|<h[23]|<p style="font-size: 16px|$)/gi,
          ''
        );

        cleaned = cleaned.replace(
          /^[A-E]\.\s+.*$/gm,
          ''
        );

        // 8. Remove "Which of the following" question blocks
        cleaned = cleaned.replace(
          /Which of the following[\s\S]*?(?=Example|<h[23]|<p style="font-size: 16px|$)/gi,
          ''
        );

        // 9. Clean up empty list items
        cleaned = cleaned.replace(
          /<li[^>]*>\s*<\/li>/gi,
          ''
        );

        // 10. Clean up empty lists
        cleaned = cleaned.replace(
          /<ul[^>]*>\s*<\/ul>/gi,
          ''
        );
        cleaned = cleaned.replace(
          /<ol[^>]*>\s*<\/ol>/gi,
          ''
        );

        // 11. Clean up excessive whitespace
        cleaned = cleaned
          .replace(/\n{3,}/g, '\n\n')
          .replace(/\s{2,}/g, ' ')
          .replace(/(<\/p>)\s*(<p)/g, '$1\n$2')
          .replace(/(<\/li>)\s*(<li)/g, '$1\n$2')
          .trim();

        if (cleaned !== block.content) {
          const { error } = await supabase
            .from('section_content')
            .update({ content: cleaned })
            .eq('id', block.id);

          if (error) {
            console.log(`❌ Error updating ${lesson.lesson_key}: ${error.message}`);
          } else {
            console.log(`✅ ${lesson.lesson_key} - ${section.title || section.section_key}`);
            console.log(`   ${originalLength} → ${cleaned.length} chars`);
            updatedCount++;
          }
        }
      }
    }
  }

  console.log('\n==================================================');
  console.log(`✅ NUCLEAR CLEAN COMPLETE!`);
  console.log(`   Updated: ${updatedCount} content blocks`);
  console.log(`\n   ALL hardcoded examples removed`);
  console.log(`   Only database examples via ExampleCard remain`);
}

nuclearCleanExamples().catch(err => {
  console.error('❌ Failed:', err);
  process.exit(1);
});
