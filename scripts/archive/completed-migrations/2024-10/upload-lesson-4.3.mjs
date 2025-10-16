import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import { readFileSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: resolve(__dirname, '../.env') });

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

const lessonData = {
  lesson_key: '4.3',
  title: 'Functions',
  subject: 'math',
  category: 'Advanced Algebra',
  difficulty_level: 4,
  duration_minutes: 30,
  order_index: 16,
  is_published: true
};

async function uploadLesson() {
  console.log('\n📚 UPLOADING LESSON 4.3: FUNCTIONS');
  console.log('='.repeat(80));

  // Step 1: Get or create lesson metadata
  console.log('\n1️⃣ Checking for existing lesson...');
  let { data: lesson, error: getLessonError } = await supabase
    .from('lesson_metadata')
    .select('id')
    .eq('lesson_key', lessonData.lesson_key)
    .single();

  if (getLessonError && getLessonError.code !== 'PGRST116') {
    console.error('❌ Error checking lesson:', getLessonError.message);
    return;
  }

  if (!lesson) {
    console.log('Creating new lesson metadata...');
    const { data: newLesson, error: lessonError } = await supabase
      .from('lesson_metadata')
      .insert({
        lesson_key: lessonData.lesson_key,
        title: lessonData.title,
        subject: lessonData.subject,
        category: lessonData.category,
        difficulty_level: lessonData.difficulty_level,
        duration_minutes: lessonData.duration_minutes,
        order_index: lessonData.order_index,
        is_published: lessonData.is_published
      })
      .select('id')
      .single();

    if (lessonError) {
      console.error('❌ Error creating lesson:', lessonError.message);
      return;
    }
    lesson = newLesson;
    console.log(`✓ Lesson created with ID: ${lesson.id}`);
  } else {
    console.log(`✓ Lesson already exists with ID: ${lesson.id}`);
  }

  // Step 2: Read HTML file
  console.log('\n2️⃣ Reading HTML file...');
  const htmlPath = resolve(__dirname, '../docs/LESSON_4_3_FUNCTIONS.html');
  const htmlContent = readFileSync(htmlPath, 'utf-8');
  console.log(`✓ Read ${htmlContent.length} characters`);

  // Step 3: Get or create lesson section
  console.log('\n3️⃣ Checking for existing section...');
  let { data: section, error: getSectionError } = await supabase
    .from('lesson_sections')
    .select('id')
    .eq('lesson_id', lesson.id)
    .eq('section_key', 'functions-main')
    .single();

  if (getSectionError && getSectionError.code !== 'PGRST116') {
    console.error('❌ Error checking section:', getSectionError.message);
    return;
  }

  if (!section) {
    console.log('Creating new section...');
    const { data: newSection, error: sectionError } = await supabase
      .from('lesson_sections')
      .insert({
        lesson_id: lesson.id,
        section_key: 'functions-main',
        title: 'Main Content',
        section_type: 'content',
        order_index: 0
      })
      .select('id')
      .single();

    if (sectionError) {
      console.error('❌ Error creating section:', sectionError.message);
      return;
    }
    section = newSection;
    console.log(`✓ Section created with ID: ${section.id}`);
  } else {
    console.log(`✓ Section already exists with ID: ${section.id}`);
  }

  // Step 4: Check for existing content and insert or update
  console.log('\n4️⃣ Checking for existing content...');
  const { data: existingContent, error: getContentError } = await supabase
    .from('section_content')
    .select('id')
    .eq('section_id', section.id)
    .eq('order_index', 0)
    .single();

  if (getContentError && getContentError.code !== 'PGRST116') {
    console.error('❌ Error checking content:', getContentError.message);
    return;
  }

  if (!existingContent) {
    console.log('Inserting new content...');
    const { error: contentError } = await supabase
      .from('section_content')
      .insert({
        section_id: section.id,
        content_type: 'html',
        content: htmlContent,
        order_index: 0
      });

    if (contentError) {
      console.error('❌ Error inserting content:', contentError.message);
      return;
    }
    console.log('✓ Content inserted successfully');
  } else {
    console.log('Updating existing content...');
    const { error: updateError } = await supabase
      .from('section_content')
      .update({
        content: htmlContent,
        content_type: 'html'
      })
      .eq('id', existingContent.id);

    if (updateError) {
      console.error('❌ Error updating content:', updateError.message);
      return;
    }
    console.log('✓ Content updated successfully');
  }

  console.log('\n' + '='.repeat(80));
  console.log('✅ LESSON 4.3 UPLOADED SUCCESSFULLY!\n');
}

uploadLesson();
