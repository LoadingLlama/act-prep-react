import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: resolve(__dirname, '../.env') });

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

/**
 * Fix intro paragraphs for lessons 3.4-3.6 to match the concise style of lessons 2.2-3.3
 */
const introUpdates = [
  {
    lessonKey: '3.4',
    oldParagraph: '<strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">Logarithms</strong> are one of the most powerful mathematical tools for working with exponential relationships. While they may seem intimidating at first, logarithms are simply another way to express <strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">exponents</strong>. Understanding logarithms opens up elegant solutions to complex exponential equations and is essential for scoring well on the ACT Math section. This lesson will build your understanding from the ground up, explaining not just the rules, but <em>why</em> they work.',
    newParagraph: '<strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">Logarithms</strong> are one of the most powerful mathematical tools for working with exponential relationships—appearing in 2-4 questions per ACT Math test. While they may seem intimidating at first, logarithms are simply another way to express <strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">exponents</strong>. Once you understand the fundamental relationship between logs and exponents, these questions become straightforward.'
  },
  {
    lessonKey: '3.5',
    oldParagraph: '<strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">Inequalities</strong> are expressions that compare two values using symbols like <, >, ≤, and ≥. While similar to equations, inequalities require special care—especially when multiplying or dividing by negative numbers. Mastering inequalities is crucial for ACT success, as they appear in algebra problems, graphing questions, and systems of inequalities. This lesson will build your complete understanding from basic concepts through advanced graphing techniques.',
    newParagraph: '<strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">Inequalities</strong> are expressions that compare two values using symbols like <, >, ≤, and ≥. While similar to equations, inequalities require special care—especially when multiplying or dividing by negative numbers. These concepts appear in 6-8 questions per ACT Math test, making them essential for reaching your target score.'
  },
  {
    lessonKey: '3.6',
    oldParagraph: '<strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">Absolute value</strong> is one of the most important concepts in algebra. At its core, absolute value measures <strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">distance from zero</strong>—and distance is always positive (or zero). Once you truly understand this fundamental idea, absolute value equations, inequalities, and functions become much easier to handle. This comprehensive lesson will take you from basic concepts through advanced graphing and transformations.',
    newParagraph: '<strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">Absolute value</strong> is one of the most important concepts in algebra—appearing in 4-6 questions per ACT Math test. At its core, absolute value measures <strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">distance from zero</strong>—and distance is always positive (or zero). Once you understand this fundamental idea, absolute value equations, inequalities, and functions become straightforward.'
  }
];

async function fixIntroFormatting() {
  console.log('\n📝 FIXING INTRO PARAGRAPHS FOR LESSONS 3.4-3.6');
  console.log('='.repeat(80));

  let successCount = 0;
  let errorCount = 0;

  for (const update of introUpdates) {
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
          console.log(`  Old length: ${update.oldParagraph.length} chars`);
          console.log(`  New length: ${update.newParagraph.length} chars`);
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

fixIntroFormatting();
