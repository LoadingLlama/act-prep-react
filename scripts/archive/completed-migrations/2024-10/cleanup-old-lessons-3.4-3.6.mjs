import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: resolve(__dirname, '../.env') });

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

const lessonKeys = ['3.4', '3.5', '3.6'];

/**
 * Delete old lesson sections and keep only the new X.X-main sections
 */
async function cleanupOldLessons() {
  console.log('\n🧹 CLEANING UP OLD LESSON SECTIONS');
  console.log('='.repeat(80));

  let deletedSections = 0;
  let keptSections = 0;

  for (const key of lessonKeys) {
    try {
      console.log(`\nProcessing lesson ${key}...`);

      // Get lesson ID
      const { data: lesson, error: lessonError } = await supabase
        .from('lesson_metadata')
        .select('id, title')
        .eq('lesson_key', key)
        .single();

      if (lessonError || !lesson) {
        console.error(`  ✗ Lesson ${key} not found`);
        continue;
      }

      // Get all sections
      const { data: sections, error: sectionsError } = await supabase
        .from('lesson_sections')
        .select('id, section_key')
        .eq('lesson_id', lesson.id);

      if (sectionsError || !sections) {
        console.error(`  ✗ Could not fetch sections for lesson ${key}`);
        continue;
      }

      console.log(`  Found ${sections.length} sections`);

      // Keep only the X.X-main section, delete all others
      const keepSectionKey = `${key}-main`;

      for (const section of sections) {
        if (section.section_key === keepSectionKey) {
          console.log(`  ✓ Keeping: ${section.section_key}`);
          keptSections++;
        } else {
          // Delete section content first
          const { error: contentDeleteError } = await supabase
            .from('section_content')
            .delete()
            .eq('section_id', section.id);

          if (contentDeleteError) {
            console.error(`  ✗ Error deleting content for ${section.section_key}:`, contentDeleteError.message);
          }

          // Delete the section
          const { error: sectionDeleteError } = await supabase
            .from('lesson_sections')
            .delete()
            .eq('id', section.id);

          if (sectionDeleteError) {
            console.error(`  ✗ Error deleting section ${section.section_key}:`, sectionDeleteError.message);
          } else {
            console.log(`  ✗ Deleted: ${section.section_key}`);
            deletedSections++;
          }
        }
      }

    } catch (error) {
      console.error(`✗ Error processing lesson ${key}:`, error.message);
    }
  }

  console.log('\n' + '='.repeat(80));
  console.log('📊 SUMMARY');
  console.log('='.repeat(80));
  console.log(`✓ Sections kept: ${keptSections}`);
  console.log(`✗ Sections deleted: ${deletedSections}`);
  console.log('='.repeat(80) + '\n');
}

cleanupOldLessons();
