import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import { readFileSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: resolve(__dirname, '../.env') });

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

const lessons = [
  {
    key: '3.4',
    file: 'LESSON_3_4_LOGARITHMS.html'
  },
  {
    key: '3.5',
    file: 'LESSON_3_5_INEQUALITIES.html'
  },
  {
    key: '3.6',
    file: 'LESSON_3_6_ABSOLUTE_VALUE.html'
  }
];

async function uploadLessons() {
  console.log('\n📤 UPLOADING LESSONS 3.4-3.6 TO DATABASE');
  console.log('='.repeat(80));

  let successCount = 0;
  let errorCount = 0;

  for (const lesson of lessons) {
    try {
      console.log(`\nProcessing lesson ${lesson.key}...`);

      // Read HTML file
      const filePath = resolve(__dirname, '../docs', lesson.file);
      const htmlContent = readFileSync(filePath, 'utf8');

      console.log(`  • Read ${lesson.file} (${htmlContent.length} chars)`);

      // Get lesson ID
      const { data: lessonData, error: lessonError } = await supabase
        .from('lesson_metadata')
        .select('id, title')
        .eq('lesson_key', lesson.key)
        .single();

      if (lessonError || !lessonData) {
        console.error(`  ✗ Lesson ${lesson.key} not found in database`);
        errorCount++;
        continue;
      }

      console.log(`  • Found lesson: ${lessonData.title}`);

      // Get or create section
      let sectionId;
      const { data: existingSections } = await supabase
        .from('lesson_sections')
        .select('id')
        .eq('lesson_id', lessonData.id)
        .eq('section_key', `${lesson.key}-main`)
        .single();

      if (existingSections) {
        sectionId = existingSections.id;
        console.log(`  • Using existing section`);
      } else {
        const { data: newSection, error: sectionError } = await supabase
          .from('lesson_sections')
          .insert({
            lesson_id: lessonData.id,
            section_key: `${lesson.key}-main`,
            title: 'Main Content',
            section_type: 'content',
            order_index: 0
          })
          .select('id')
          .single();

        if (sectionError || !newSection) {
          console.error(`  ✗ Error creating section:`, sectionError);
          errorCount++;
          continue;
        }

        sectionId = newSection.id;
        console.log(`  • Created new section`);
      }

      // Check if content already exists
      const { data: existingContent } = await supabase
        .from('section_content')
        .select('id')
        .eq('section_id', sectionId)
        .eq('content_type', 'html')
        .single();

      if (existingContent) {
        // Update existing content
        const { error: updateError } = await supabase
          .from('section_content')
          .update({ content: htmlContent })
          .eq('id', existingContent.id);

        if (updateError) {
          console.error(`  ✗ Error updating content:`, updateError);
          errorCount++;
        } else {
          console.log(`  ✓ Updated existing content`);
          successCount++;
        }
      } else {
        // Insert new content
        const { error: insertError } = await supabase
          .from('section_content')
          .insert({
            section_id: sectionId,
            content_type: 'html',
            content: htmlContent,
            order_index: 0
          });

        if (insertError) {
          console.error(`  ✗ Error inserting content:`, insertError);
          errorCount++;
        } else {
          console.log(`  ✓ Inserted new content`);
          successCount++;
        }
      }

    } catch (error) {
      console.error(`✗ Error processing lesson ${lesson.key}:`, error.message);
      errorCount++;
    }
  }

  console.log('\n' + '='.repeat(80));
  console.log('📊 SUMMARY');
  console.log('='.repeat(80));
  console.log(`✅ Successfully uploaded: ${successCount}`);
  console.log(`❌ Errors: ${errorCount}`);
  console.log('='.repeat(80) + '\n');
}

uploadLessons();
