import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: resolve(__dirname, '../.env') });

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

/**
 * Fix the intro paragraph formatting for lessons 3.1, 3.2, 3.3
 * Break long run-on paragraphs into shorter, more readable ones
 */
async function fixChapter3IntroFormatting() {
  console.log('\n📝 FIXING CHAPTER 3 INTRO FORMATTING');
  console.log('='.repeat(80));

  const updates = [
    {
      lessonKey: '3.1',
      oldParagraph: 'Mastering fundamental algebra skills is absolutely essential for ACT Math success. These foundational concepts appear in over 20 questions per test across all difficulty levels. Whether you\'re simplifying expressions, solving equations, or working with polynomials, these skills form the bedrock of mathematical reasoning. In this lesson, we\'ll build your confidence with clear explanations, strategic tips, and plenty of practice that mirrors what you\'ll see on test day.',
      newParagraph: 'Mastering fundamental <strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">algebra skills</strong> is absolutely essential for ACT Math success. These foundational concepts appear in over 20 questions per test across all difficulty levels—that\'s more than one-third of the entire math section! Whether you\'re simplifying expressions, solving equations, or working with polynomials, these skills form the bedrock of mathematical reasoning on the ACT.'
    },
    {
      lessonKey: '3.2',
      oldParagraph: 'Mastering fractions is critical for ACT Math success—these concepts appear in 10-15 questions per test and are frequently combined with algebra, ratios, and percentages. Many students lose points on fraction problems not because the concepts are difficult, but because they rush through the steps or forget key rules. In this lesson, we\'ll build your confidence with clear explanations, step-by-step techniques, and strategic shortcuts that will help you solve fraction problems quickly and accurately on test day.',
      newParagraph: 'Mastering <strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">fractions</strong> is critical for ACT Math success—these concepts appear in 10-15 questions per test and are frequently combined with algebra, ratios, and percentages. Many students lose points on fraction problems not because the concepts are difficult, but because they rush through the steps or forget key rules. Knowing the right techniques and shortcuts will help you solve these problems quickly and accurately.'
    },
    {
      lessonKey: '3.3',
      oldParagraph: 'Understanding exponents and roots is essential for ACT Math success—these concepts appear in 8-12 questions per test and form the foundation for algebra, functions, and higher mathematics. While the rules may seem abstract at first, they follow logical patterns that, once mastered, make solving problems quick and efficient. In this lesson, we\'ll break down each rule with clear explanations and strategic insights that will help you tackle even the trickiest exponent questions on test day.',
      newParagraph: 'Understanding <strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">exponents</strong> and <strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">roots</strong> is essential for ACT Math success—these concepts appear in 8-12 questions per test and form the foundation for algebra, functions, and higher mathematics. While the rules may seem abstract at first, they follow logical patterns that, once mastered, make solving problems quick and efficient.'
    }
  ];

  let successCount = 0;
  let errorCount = 0;

  for (const update of updates) {
    try {
      console.log(`\nProcessing lesson ${update.lessonKey}...`);

      // Get lesson ID
      const { data: lesson, error: lessonError } = await supabase
        .from('lesson_metadata')
        .select('id, title')
        .eq('lesson_key', update.lessonKey)
        .single();

      if (lessonError || !lesson) {
        console.error(`✗ Lesson ${update.lessonKey} not found:`, lessonError);
        errorCount++;
        continue;
      }

      // Get sections
      const { data: sections, error: sectionsError } = await supabase
        .from('lesson_sections')
        .select('id')
        .eq('lesson_id', lesson.id)
        .order('order_index');

      if (sectionsError || !sections || sections.length === 0) {
        console.error(`✗ No sections found for lesson ${update.lessonKey}`);
        errorCount++;
        continue;
      }

      const sectionIds = sections.map(s => s.id);

      // Get HTML content
      const { data: contentBlocks, error: contentError } = await supabase
        .from('section_content')
        .select('id, content')
        .in('section_id', sectionIds)
        .eq('content_type', 'html');

      if (contentError || !contentBlocks || contentBlocks.length === 0) {
        console.error(`✗ No content found for lesson ${update.lessonKey}`);
        errorCount++;
        continue;
      }

      // Update the first content block (intro paragraph)
      const block = contentBlocks[0];
      let content = block.content;

      // Replace the old paragraph with the new one
      if (content.includes(update.oldParagraph)) {
        content = content.replace(update.oldParagraph, update.newParagraph);

        const { error: updateError } = await supabase
          .from('section_content')
          .update({ content })
          .eq('id', block.id);

        if (updateError) {
          console.error(`✗ Error updating lesson ${update.lessonKey}:`, updateError);
          errorCount++;
        } else {
          console.log(`✓ ${lesson.title} - Updated intro paragraph`);
          successCount++;
        }
      } else {
        console.log(`  ℹ Paragraph not found or already updated for lesson ${update.lessonKey}`);
      }

    } catch (error) {
      console.error(`✗ Error processing lesson ${update.lessonKey}:`, error.message);
      errorCount++;
    }
  }

  console.log('\n' + '='.repeat(80));
  console.log('📊 SUMMARY');
  console.log('='.repeat(80));
  console.log(`✅ Lessons updated: ${successCount}`);
  console.log(`❌ Errors: ${errorCount}`);
  console.log('='.repeat(80) + '\n');
}

fixChapter3IntroFormatting();
