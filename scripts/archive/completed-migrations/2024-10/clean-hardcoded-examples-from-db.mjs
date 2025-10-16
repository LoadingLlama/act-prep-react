import { createClient } from '@supabase/supabase-js';
import { supabaseUrl, supabaseAnonKey } from './config.mjs';

// supabaseUrl imported from config.mjs
// supabaseAnonKey imported from config.mjs
const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Remove hardcoded examples from lesson content in database
 * Examples like "Example 1: Basic pronoun case" should be removed
 * since examples now come from the examples table
 */
async function cleanHardcodedExamples() {
  console.log('🧹 CLEANING HARDCODED EXAMPLES FROM DATABASE');
  console.log('=============================================\n');

  // Get all English lessons from lessons table
  const { data: lessons, error } = await supabase
    .from('lessons')
    .select('*')
    .eq('subject', 'english')
    .order('lesson_key');

  if (error) {
    console.error('Error fetching lessons:', error);
    return;
  }

  console.log(`Found ${lessons.length} English lessons in database\n`);

  let updatedCount = 0;

  for (const lesson of lessons) {
    console.log(`\n📚 Checking ${lesson.lesson_key}: ${lesson.title}`);

    // Check if content has hardcoded examples
    const hasExamples =
      lesson.content?.includes('Example 1:') ||
      lesson.content?.includes('Example 2:') ||
      lesson.content?.includes('Example 3:') ||
      lesson.content?.includes('<h4') || // H4 headers typically indicate examples
      lesson.content?.includes('Which of the following alternatives') ||
      lesson.content?.includes('Solution:');

    if (!hasExamples) {
      console.log('   ✓ No hardcoded examples found');
      continue;
    }

    console.log('   ⚠️  Found hardcoded examples - cleaning...');

    // Remove example blocks
    // Pattern 1: "Example N: Title" followed by content until next H3 or Example
    let cleanedContent = lesson.content;

    // Remove H4 example headers and their content
    cleanedContent = cleanedContent.replace(
      /<h4[^>]*>Example \d+:[^<]*<\/h4>[\s\S]*?(?=<h[23]|$)/gi,
      ''
    );

    // Remove standalone Example blocks without H4 tags
    cleanedContent = cleanedContent.replace(
      /Example \d+:[\s\S]*?(?=Example \d+:|<h[23]|$)/gi,
      ''
    );

    // Remove solution blocks
    cleanedContent = cleanedContent.replace(
      /Solution:[\s\S]*?(?=Example \d+:|<h[23]|$)/gi,
      ''
    );

    // Remove "Which of the following" question blocks (ACT-style questions)
    cleanedContent = cleanedContent.replace(
      /Which of the following[\s\S]*?(?=Example \d+:|<h[23]|$)/gi,
      ''
    );

    // Clean up excessive whitespace
    cleanedContent = cleanedContent
      .replace(/\n{3,}/g, '\n\n')
      .replace(/(<\/p>)\s*(<p)/g, '$1\n$2')
      .trim();

    // Update in database
    const { error: updateError } = await supabase
      .from('lessons')
      .update({ content: cleanedContent })
      .eq('id', lesson.id);

    if (updateError) {
      console.log(`   ❌ Error updating: ${updateError.message}`);
    } else {
      console.log(`   ✅ Cleaned and updated`);
      console.log(`   Reduced from ${lesson.content.length} to ${cleanedContent.length} chars`);
      updatedCount++;
    }
  }

  console.log('\n\n=============================================');
  console.log(`✅ CLEANUP COMPLETE!`);
  console.log(`   Updated: ${updatedCount} lessons`);
  console.log(`\n   All examples now come from examples table`);
  console.log(`   and render via ExampleCard component`);
}

cleanHardcodedExamples().catch(err => {
  console.error('❌ Failed:', err);
  process.exit(1);
});
