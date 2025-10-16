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
  { key: '2.2', file: 'LESSON_2_2_AREAS_VOLUMES_TRIANGLES.html' },
  { key: '2.3', file: 'LESSON_2_3_LINES.html' },
  { key: '2.4', file: 'LESSON_2_4_ARCS_SECTORS.html' },
  { key: '2.5', file: 'LESSON_2_5_CIRCLES_ELLIPSES_HYPERBOLAS.html' },
  { key: '3.1', file: 'LESSON_3_1_ALGEBRA_SKILLS.html' },
  { key: '3.2', file: 'LESSON_3_2_FRACTIONS.html' },
  { key: '3.3', file: 'LESSON_3_3_EXPONENTS_ROOTS.html' }
];

async function updateLessonContent(lessonKey, htmlFileName) {
  console.log(`\n${'='.repeat(60)}`);
  console.log(`UPDATING LESSON ${lessonKey}`);
  console.log(`${'='.repeat(60)}\n`);

  try {
    // Read the HTML content
    const content = readFileSync(resolve(__dirname, `../docs/${htmlFileName}`), 'utf8');
    console.log(`✓ Content loaded (${content.length} characters)\n`);

    // Step 1: Get lesson ID
    console.log(`1. Getting lesson metadata for ${lessonKey}...`);
    const { data: lessonData, error: lessonError } = await supabase
      .from('lesson_metadata')
      .select('id')
      .eq('lesson_key', lessonKey)
      .single();

    if (lessonError || !lessonData) {
      console.error('ERROR: Lesson not found:', lessonError);
      throw new Error(`Lesson ${lessonKey} not found`);
    }

    const lessonId = lessonData.id;
    console.log(`✓ Found lesson with ID: ${lessonId}\n`);

    // Step 2: Get section ID
    console.log('2. Getting section ID...');
    const { data: sectionData, error: sectionError } = await supabase
      .from('lesson_sections')
      .select('id')
      .eq('lesson_id', lessonId)
      .eq('section_key', `${lessonKey}-main`)
      .single();

    if (sectionError || !sectionData) {
      console.error('ERROR: Section not found:', sectionError);
      throw new Error(`Section for lesson ${lessonKey} not found`);
    }

    const sectionId = sectionData.id;
    console.log(`✓ Found section with ID: ${sectionId}\n`);

    // Step 3: Update section content
    console.log('3. Updating section content...');
    const { error: updateError } = await supabase
      .from('section_content')
      .update({ content: content })
      .eq('section_id', sectionId);

    if (updateError) {
      console.error('ERROR updating content:', updateError);
      throw updateError;
    }

    console.log(`✓ Content updated (${content.length} characters)\n`);

    console.log('='.repeat(60));
    console.log(`✅ SUCCESS! Lesson ${lessonKey} has been updated!`);
    console.log('='.repeat(60) + '\n');

    return { lessonKey, success: true };

  } catch (error) {
    console.error('\n❌ FATAL ERROR:', error);
    console.error('Details:', error.message);
    return { lessonKey, success: false, error: error.message };
  }
}

async function updateAllLessons() {
  console.log('\n');
  console.log('🚀 STARTING LESSON CONTENT UPDATE');
  console.log('='.repeat(60));
  console.log(`Total lessons to update: ${lessons.length}`);
  console.log('='.repeat(60));

  const results = [];

  for (const lesson of lessons) {
    const result = await updateLessonContent(lesson.key, lesson.file);
    results.push(result);
  }

  // Final summary
  console.log('\n');
  console.log('='.repeat(60));
  console.log('📊 FINAL SUMMARY');
  console.log('='.repeat(60));

  const successful = results.filter(r => r.success);
  const failed = results.filter(r => !r.success);

  console.log(`✅ Successful: ${successful.length}`);
  console.log(`❌ Failed: ${failed.length}`);

  if (successful.length > 0) {
    console.log('\nSuccessful lessons:');
    successful.forEach(r => console.log(`  ✓ ${r.lessonKey}`));
  }

  if (failed.length > 0) {
    console.log('\nFailed lessons:');
    failed.forEach(r => console.log(`  ✗ ${r.lessonKey}: ${r.error}`));
  }

  console.log('='.repeat(60) + '\n');

  if (failed.length > 0) {
    process.exit(1);
  }
}

updateAllLessons();
