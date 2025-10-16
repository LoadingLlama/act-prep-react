import { createClient } from '@supabase/supabase-js';
import { supabaseUrl, supabaseAnonKey } from './config.mjs';

// supabaseUrl imported from config.mjs
// supabaseAnonKey imported from config.mjs
const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function checkMathLessons() {
  console.log('🔍 CHECKING MATH LESSONS FOR HARDCODED EXAMPLES');
  console.log('================================================\n');

  // Get all Math lessons
  const { data: lessons } = await supabase
    .from('lesson_metadata')
    .select('id, lesson_key, title')
    .eq('subject', 'math')
    .order('lesson_key');

  console.log(`Checking ${lessons.length} Math lessons\n`);

  const issues = [];

  for (const lesson of lessons) {
    const { data: sections } = await supabase
      .from('lesson_sections')
      .select('id, section_key')
      .eq('lesson_id', lesson.id);

    if (!sections) continue;

    for (const section of sections) {
      const { data: blocks } = await supabase
        .from('section_content')
        .select('*')
        .eq('section_id', section.id);

      if (!blocks) continue;

      for (const block of blocks) {
        const content = block.content;

        // Check for hardcoded example patterns
        const hasIssues =
          content.includes('<h4') ||
          /Example \d+:/i.test(content) ||
          /Solution:/i.test(content) ||
          /Answer:\s*[A-E]/i.test(content) ||
          /Strategy:/i.test(content);

        if (hasIssues) {
          issues.push({
            lesson: lesson.lesson_key,
            title: lesson.title,
            block: block.id,
            length: content.length,
            preview: content.substring(0, 200).replace(/\s+/g, ' ')
          });
        }
      }
    }
  }

  console.log('📊 RESULTS:\n');

  if (issues.length > 0) {
    console.log(`❌ FOUND ${issues.length} BLOCKS WITH HARDCODED EXAMPLES:\n`);
    issues.forEach(issue => {
      console.log(`  ${issue.lesson} (${issue.title})`);
      console.log(`    Block: ${issue.block}`);
      console.log(`    Length: ${issue.length} chars`);
      console.log(`    Preview: ${issue.preview}...`);
      console.log('');
    });
  } else {
    console.log('✅ NO HARDCODED EXAMPLES FOUND IN MATH LESSONS!');
  }

  console.log('================================================');
  console.log(`Total issues: ${issues.length}`);
}

checkMathLessons().catch(err => {
  console.error('❌ Failed:', err);
  process.exit(1);
});
