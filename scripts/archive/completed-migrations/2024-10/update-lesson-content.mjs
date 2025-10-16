import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import { readFileSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: resolve(__dirname, '../.env') });

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

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
    console.log('='.repeat(60));
    console.log(`Lesson ID: ${lessonId}`);
    console.log(`Section ID: ${sectionId}`);
    console.log(`Content Size: ${content.length} characters`);
    console.log('='.repeat(60) + '\n');

  } catch (error) {
    console.error('\n❌ FATAL ERROR:', error);
    console.error('Details:', error.message);
    process.exit(1);
  }
}

// Get lesson key and filename from command line args
const lessonKey = process.argv[2];
const htmlFileName = process.argv[3];

if (!lessonKey || !htmlFileName) {
  console.error('Usage: node update-lesson-content.mjs <lesson-key> <html-filename>');
  console.error('Example: node update-lesson-content.mjs 2.2 LESSON_2_2_AREAS_VOLUMES_TRIANGLES.html');
  process.exit(1);
}

updateLessonContent(lessonKey, htmlFileName);
