import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: resolve(__dirname, '../.env') });

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

const lessonKeys = ['2.2', '2.3', '2.4', '2.5', '3.1', '3.2', '3.3'];

/**
 * Fix problematic blue underlined terms in lesson HTML:
 * 1. Remove blue underline from single letters (A, D, E, M, P, S in lesson 3.1)
 * 2. Remove trailing colons from terms (Circle:, Cone:, etc.)
 */
async function fixProblematicTerms() {
  console.log('\n🔧 FIXING PROBLEMATIC BLUE UNDERLINED TERMS');
  console.log('='.repeat(80));

  let fixCount = 0;
  let errorCount = 0;
  let totalChanges = 0;

  for (const lessonKey of lessonKeys) {
    try {
      console.log(`\nProcessing lesson ${lessonKey}...`);

      // Get lesson ID
      const { data: lessonData, error: lessonError } = await supabase
        .from('lesson_metadata')
        .select('id')
        .eq('lesson_key', lessonKey)
        .single();

      if (lessonError || !lessonData) {
        console.error(`✗ Error fetching lesson ${lessonKey}:`, lessonError);
        errorCount++;
        continue;
      }

      // Get all sections for this lesson
      const { data: sections, error: sectionsError } = await supabase
        .from('lesson_sections')
        .select('id')
        .eq('lesson_id', lessonData.id);

      if (sectionsError || !sections || sections.length === 0) {
        console.error(`✗ No sections found for lesson ${lessonKey}:`, sectionsError);
        errorCount++;
        continue;
      }

      const sectionIds = sections.map(s => s.id);

      // Get all HTML content blocks for these sections
      const { data: contentBlocks, error: contentError } = await supabase
        .from('section_content')
        .select('id, content')
        .in('section_id', sectionIds)
        .eq('content_type', 'html');

      if (contentError || !contentBlocks || contentBlocks.length === 0) {
        console.error(`✗ No content blocks found for lesson ${lessonKey}:`, contentError);
        errorCount++;
        continue;
      }

      let lessonChangesMade = false;
      const changes = [];

      // Process each content block
      for (const block of contentBlocks) {
        let content = block.content;
        let blockChanged = false;

        // Fix 1: Remove blue underline from single letters in lesson 3.1 (PEMDAS)
        if (lessonKey === '3.1') {
          const singleLetters = ['A', 'D', 'E', 'M', 'P', 'S'];
          for (const letter of singleLetters) {
            // Match: <strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">X</strong>
            const pattern = new RegExp(
              `<strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">${letter}</strong>`,
              'g'
            );

            const matches = content.match(pattern);
            if (matches && matches.length > 0) {
              // Remove underline but keep the styling
              content = content.replace(
                pattern,
                `<strong style="color: #2563eb; font-weight: 600;">${letter}</strong>`
              );
              changes.push(`  • Removed underline from single letter "${letter}" (${matches.length} occurrences)`);
              blockChanged = true;
              lessonChangesMade = true;
              totalChanges += matches.length;
            }
          }
        }

        // Fix 2: Remove trailing colons from blue underlined terms
        const termsWithColons = [
          'Circle', 'Cone', 'Cylinder', 'Rectangle', 'Rectangular Prism \\(Box\\)',
          'Sphere', 'Trapezoid', 'Triangle',
          'Negative slope', 'Positive slope', 'Zero slope', 'Undefined slope'
        ];

        for (const term of termsWithColons) {
          // Match: <strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">Term:</strong>
          const pattern = new RegExp(
            `<strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">${term}:</strong>`,
            'g'
          );

          const matches = content.match(pattern);
          if (matches && matches.length > 0) {
            const cleanTerm = term.replace(/\\([^)]*\\)/g, '($1)');
            content = content.replace(
              pattern,
              `<strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">${cleanTerm}</strong>`
            );
            const displayTerm = term.replace(/\\\(/g, '(').replace(/\\\)/g, ')');
            changes.push(`  • Removed trailing colon from "${displayTerm}" (${matches.length} occurrences)`);
            blockChanged = true;
            lessonChangesMade = true;
            totalChanges += matches.length;
          }
        }

        // Update this content block if changed
        if (blockChanged) {
          const { error: updateError } = await supabase
            .from('section_content')
            .update({ content })
            .eq('id', block.id);

          if (updateError) {
            console.error(`✗ Error updating content block for lesson ${lessonKey}:`, updateError);
            errorCount++;
          }
        }
      }

      if (lessonChangesMade) {
        console.log(`✓ Lesson ${lessonKey} updated successfully:`);
        changes.forEach(change => console.log(change));
        fixCount++;
      } else {
        console.log(`  ℹ No problematic terms found in lesson ${lessonKey}`);
      }

    } catch (error) {
      console.error(`✗ Error processing lesson ${lessonKey}:`, error.message);
      errorCount++;
    }
  }

  console.log('\n' + '='.repeat(80));
  console.log('📊 SUMMARY');
  console.log('='.repeat(80));
  console.log(`✅ Lessons fixed: ${fixCount}`);
  console.log(`🔧 Total term instances corrected: ${totalChanges}`);
  console.log(`❌ Errors: ${errorCount}`);
  console.log('='.repeat(80) + '\n');
}

fixProblematicTerms();
