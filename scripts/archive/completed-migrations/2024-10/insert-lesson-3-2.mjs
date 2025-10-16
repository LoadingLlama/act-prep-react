import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import { readFileSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: resolve(__dirname, '../.env') });

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function insertLesson32() {
  console.log('\n' + '='.repeat(60));
  console.log('INSERTING LESSON 3.2: Fractions');
  console.log('='.repeat(60) + '\n');

  try {
    // Read the HTML content
    const content = readFileSync(resolve(__dirname, '../docs/LESSON_3_2_FRACTIONS.html'), 'utf8');
    console.log(`✓ Content loaded (${content.length} characters)\n`);

    // Step 1: Insert lesson metadata
    console.log('1. Inserting lesson metadata...');
    const { data: lessonData, error: lessonError } = await supabase
      .from('lesson_metadata')
      .insert({
        lesson_key: '3.2',
        title: 'Fractions',
        subject: 'math',
        category: 'Algebra Fundamentals',
        difficulty_level: 2,
        duration_minutes: 30,
        order_index: 12,
        is_published: true
      })
      .select()
      .single();

    if (lessonError) {
      console.error('ERROR inserting lesson metadata:', lessonError);
      throw lessonError;
    }

    const lessonId = lessonData.id;
    console.log(`✓ Lesson metadata inserted with ID: ${lessonId}\n`);

    // Step 2: Insert main content section
    console.log('2. Inserting main content section...');
    const { data: sectionData, error: sectionError } = await supabase
      .from('lesson_sections')
      .insert({
        lesson_id: lessonId,
        section_key: '3.2-main',
        section_type: 'content',
        title: 'Main Content',
        order_index: 0
      })
      .select()
      .single();

    if (sectionError) {
      console.error('ERROR inserting section:', sectionError);
      throw sectionError;
    }

    const sectionId = sectionData.id;
    console.log(`✓ Section inserted with ID: ${sectionId}\n`);

    // Step 3: Insert section content
    console.log('3. Inserting section content...');
    const { error: contentError } = await supabase
      .from('section_content')
      .insert({
        section_id: sectionId,
        content_type: 'html',
        content: content,
        order_index: 1
      });

    if (contentError) {
      console.error('ERROR inserting content:', contentError);
      throw contentError;
    }

    console.log(`✓ Content inserted (${content.length} characters)\n`);

    console.log('='.repeat(60));
    console.log('✅ SUCCESS! Lesson 3.2 has been inserted!');
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

insertLesson32();
