import { createClient } from '@supabase/supabase-js';
import { supabaseUrl, supabaseAnonKey } from './config.mjs';

// supabaseUrl imported from config.mjs
// supabaseAnonKey imported from config.mjs
const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Find ALL remaining hardcoded examples in the database
 */
async function findAllHardcodedExamples() {
  console.log('🔍 FINDING ALL HARDCODED EXAMPLES');
  console.log('==================================\n');

  // Get all English lessons
  const { data: lessons, error: lessonsError } = await supabase
    .from('lesson_metadata')
    .select('id, lesson_key, title, subject')
    .eq('subject', 'english')
    .order('lesson_key');

  if (lessonsError) {
    console.error('Error:', lessonsError);
    return;
  }

  console.log(`Checking ${lessons.length} English lessons\n`);

  let totalFound = 0;

  for (const lesson of lessons) {
    // Get all sections for this lesson
    const { data: sections } = await supabase
      .from('lesson_sections')
      .select('id, section_key, title')
      .eq('lesson_id', lesson.id)
      .order('order_index');

    if (!sections) continue;

    let lessonHasExamples = false;

    for (const section of sections) {
      // Get all content blocks
      const { data: contentBlocks } = await supabase
        .from('section_content')
        .select('*')
        .eq('section_id', section.id)
        .order('order_index');

      if (!contentBlocks) continue;

      for (const block of contentBlocks) {
        // Check for various example patterns
        const patterns = [
          /Example \d+:/i,
          /Solution:/i,
          /Answer:\s*[A-E]/i,
          /A\.\s+NO CHANGE/i,
          /[A-E]\.\s+[A-Z]/,  // Multiple choice patterns
          /<h4[^>]*>Example/i,
        ];

        const hasExample = patterns.some(pattern => pattern.test(block.content));

        if (hasExample) {
          if (!lessonHasExamples) {
            console.log(`\n📚 ${lesson.lesson_key}: ${lesson.title}`);
            lessonHasExamples = true;
          }

          console.log(`   🔸 Section: ${section.title || section.section_key}`);
          console.log(`      Block ID: ${block.id}`);

          // Show a preview
          const lines = block.content.split('\n');
          const exampleLines = lines.filter(line =>
            /Example \d+:|Solution:|Answer:/i.test(line) ||
            /^[A-E]\.\s/.test(line)
          );

          if (exampleLines.length > 0) {
            console.log(`      Preview: ${exampleLines[0].substring(0, 80)}...`);
          }

          totalFound++;
        }
      }
    }
  }

  console.log('\n==================================');
  console.log(`Total blocks with hardcoded examples: ${totalFound}`);

  if (totalFound === 0) {
    console.log('✅ No hardcoded examples found!');
  } else {
    console.log('⚠️  Hardcoded examples still present');
  }
}

findAllHardcodedExamples().catch(err => {
  console.error('❌ Failed:', err);
  process.exit(1);
});
