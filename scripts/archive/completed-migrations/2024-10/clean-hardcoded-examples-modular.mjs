import { createClient } from '@supabase/supabase-js';
import { supabaseUrl, supabaseAnonKey } from './config.mjs';

// supabaseUrl imported from config.mjs
// supabaseAnonKey imported from config.mjs
const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Remove hardcoded examples from section_content table
 * Examples come from examples table now, not hardcoded in HTML
 */
async function cleanHardcodedExamples() {
  console.log('🧹 CLEANING HARDCODED EXAMPLES FROM SECTION_CONTENT');
  console.log('====================================================\n');

  // Get all English lessons
  const { data: lessons, error: lessonsError } = await supabase
    .from('lesson_metadata')
    .select('id, lesson_key, title, subject')
    .eq('subject', 'english')
    .order('lesson_key');

  if (lessonsError) {
    console.error('Error fetching lessons:', lessonsError);
    return;
  }

  console.log(`Found ${lessons.length} English lessons\n`);

  let updatedCount = 0;
  let totalSectionsChecked = 0;

  for (const lesson of lessons) {
    console.log(`\n📚 ${lesson.lesson_key}: ${lesson.title}`);

    // Get all sections for this lesson
    const { data: sections, error: sectionsError } = await supabase
      .from('lesson_sections')
      .select('id, section_key, title')
      .eq('lesson_id', lesson.id)
      .order('order_index');

    if (sectionsError || !sections) {
      console.log(`   ⚠️  No sections found`);
      continue;
    }

    // Check each section's content
    for (const section of sections) {
      totalSectionsChecked++;

      // Get all content blocks for this section
      const { data: contentBlocks, error: contentError } = await supabase
        .from('section_content')
        .select('*')
        .eq('section_id', section.id)
        .order('order_index');

      if (contentError || !contentBlocks) {
        continue;
      }

      // Check and clean each content block
      for (const block of contentBlocks) {
        const hasExamples =
          block.content?.includes('Example 1:') ||
          block.content?.includes('Example 2:') ||
          block.content?.includes('Example 3:') ||
          block.content?.includes('<h4') || // H4 headers typically examples
          block.content?.includes('Which of the following alternatives') ||
          block.content?.includes('Solution:');

        if (!hasExamples) {
          continue;
        }

        console.log(`   🔍 Found examples in section: ${section.title || section.section_key}`);
        console.log(`      Content block ID: ${block.id}`);

        // Clean the content
        let cleanedContent = block.content;

        // Remove H4 example headers and their content
        cleanedContent = cleanedContent.replace(
          /<h4[^>]*>Example \d+:[^<]*<\/h4>[\s\S]*?(?=<h[23]|$)/gi,
          ''
        );

        // Remove standalone Example blocks
        cleanedContent = cleanedContent.replace(
          /Example \d+:[\s\S]*?(?=Example \d+:|<h[23]|$)/gi,
          ''
        );

        // Remove solution blocks
        cleanedContent = cleanedContent.replace(
          /Solution:[\s\S]*?(?=Example \d+:|<h[23]|Answer:|$)/gi,
          ''
        );

        // Remove "Which of the following" ACT-style question blocks
        cleanedContent = cleanedContent.replace(
          /Which of the following[\s\S]*?(?=Example \d+:|<h[23]|$)/gi,
          ''
        );

        // Remove answer blocks
        cleanedContent = cleanedContent.replace(
          /Answer:[\s\S]*?(?=Example \d+:|<h[23]|$)/gi,
          ''
        );

        // Clean up excessive whitespace
        cleanedContent = cleanedContent
          .replace(/\n{3,}/g, '\n\n')
          .replace(/(<\/p>)\s*(<p)/g, '$1\n$2')
          .trim();

        if (cleanedContent === block.content) {
          console.log(`      ℹ️  No changes needed`);
          continue;
        }

        // Update in database
        const { error: updateError } = await supabase
          .from('section_content')
          .update({ content: cleanedContent })
          .eq('id', block.id);

        if (updateError) {
          console.log(`      ❌ Error updating: ${updateError.message}`);
        } else {
          console.log(`      ✅ Cleaned (${block.content.length} → ${cleanedContent.length} chars)`);
          updatedCount++;
        }
      }
    }
  }

  console.log('\n\n====================================================');
  console.log(`✅ CLEANUP COMPLETE!`);
  console.log(`   Sections checked: ${totalSectionsChecked}`);
  console.log(`   Content blocks updated: ${updatedCount}`);
  console.log(`\n   All examples now come from examples table`);
  console.log(`   and render via ExampleCard component`);
}

cleanHardcodedExamples().catch(err => {
  console.error('❌ Failed:', err);
  process.exit(1);
});
