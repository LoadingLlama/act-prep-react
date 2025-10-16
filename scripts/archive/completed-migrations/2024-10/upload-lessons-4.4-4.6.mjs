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
    lesson_key: '4.4',
    title: 'Shifting and Transforming Functions',
    subject: 'math',
    category: 'Advanced Algebra',
    difficulty_level: 4,
    duration_minutes: 30,
    order_index: 17,
    is_published: true,
    html_file: 'LESSON_4_4_TRANSFORMING_FUNCTIONS.html',
    section_key: 'transforming-functions-main'
  },
  {
    lesson_key: '4.5',
    title: 'Exponential Growth and Decay',
    subject: 'math',
    category: 'Advanced Algebra',
    difficulty_level: 4,
    duration_minutes: 30,
    order_index: 18,
    is_published: true,
    html_file: 'LESSON_4_5_EXPONENTIAL_GROWTH_DECAY.html',
    section_key: 'exponential-growth-decay-main'
  },
  {
    lesson_key: '4.6',
    title: 'Sequences',
    subject: 'math',
    category: 'Advanced Algebra',
    difficulty_level: 4,
    duration_minutes: 30,
    order_index: 19,
    is_published: true,
    html_file: 'LESSON_4_6_SEQUENCES.html',
    section_key: 'sequences-main'
  }
];

async function uploadLesson(lessonData) {
  console.log(`\n📚 Uploading ${lessonData.lesson_key}: ${lessonData.title}`);
  console.log('-'.repeat(80));

  // Step 1: Get or create lesson metadata
  let { data: lesson, error: getLessonError } = await supabase
    .from('lesson_metadata')
    .select('id')
    .eq('lesson_key', lessonData.lesson_key)
    .single();

  if (getLessonError && getLessonError.code !== 'PGRST116') {
    console.error('❌ Error checking lesson:', getLessonError.message);
    return null;
  }

  if (!lesson) {
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
      return null;
    }
    lesson = newLesson;
    console.log(`✓ Lesson created with ID: ${lesson.id}`);
  } else {
    console.log(`✓ Lesson exists with ID: ${lesson.id}`);
  }

  // Step 2: Read HTML file
  const htmlPath = resolve(__dirname, '../docs', lessonData.html_file);
  const htmlContent = readFileSync(htmlPath, 'utf-8');
  console.log(`✓ Read ${htmlContent.length} characters`);

  // Step 3: Get or create lesson section
  let { data: section, error: getSectionError } = await supabase
    .from('lesson_sections')
    .select('id')
    .eq('lesson_id', lesson.id)
    .eq('section_key', lessonData.section_key)
    .single();

  if (getSectionError && getSectionError.code !== 'PGRST116') {
    console.error('❌ Error checking section:', getSectionError.message);
    return null;
  }

  if (!section) {
    const { data: newSection, error: sectionError } = await supabase
      .from('lesson_sections')
      .insert({
        lesson_id: lesson.id,
        section_key: lessonData.section_key,
        title: 'Main Content',
        section_type: 'content',
        order_index: 0
      })
      .select('id')
      .single();

    if (sectionError) {
      console.error('❌ Error creating section:', sectionError.message);
      return null;
    }
    section = newSection;
    console.log(`✓ Section created`);
  } else {
    console.log(`✓ Section exists`);
  }

  // Step 4: Check for existing content and insert or update
  const { data: existingContent } = await supabase
    .from('section_content')
    .select('id')
    .eq('section_id', section.id)
    .eq('order_index', 0)
    .single();

  if (!existingContent) {
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
      return null;
    }
    console.log('✓ Content inserted');
  } else {
    const { error: updateError } = await supabase
      .from('section_content')
      .update({
        content: htmlContent,
        content_type: 'html'
      })
      .eq('id', existingContent.id);

    if (updateError) {
      console.error('❌ Error updating content:', updateError.message);
      return null;
    }
    console.log('✓ Content updated');
  }

  return lesson.id;
}

async function main() {
  console.log('\n📚 BATCH UPLOADING LESSONS 4.4-4.6');
  console.log('='.repeat(80));

  for (const lessonData of lessons) {
    await uploadLesson(lessonData);
  }

  console.log('\n' + '='.repeat(80));
  console.log('✅ ALL LESSONS UPLOADED SUCCESSFULLY!\n');
}

main();
