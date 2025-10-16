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
    lesson_key: '5.1',
    title: 'Number Theory',
    subject: 'math',
    category: 'Numbers & Operations',
    difficulty_level: 3,
    duration_minutes: 25,
    order_index: 20,
    is_published: true,
    html_file: 'LESSON_5_1_NUMBER_THEORY.html',
    section_key: 'number-theory-main'
  },
  {
    lesson_key: '5.2',
    title: 'Percentages',
    subject: 'math',
    category: 'Numbers & Operations',
    difficulty_level: 3,
    duration_minutes: 25,
    order_index: 21,
    is_published: true,
    html_file: 'LESSON_5_2_PERCENTAGES.html',
    section_key: 'percentages-main'
  },
  {
    lesson_key: '5.3',
    title: 'Ratios and Proportions',
    subject: 'math',
    category: 'Numbers & Operations',
    difficulty_level: 3,
    duration_minutes: 25,
    order_index: 22,
    is_published: true,
    html_file: 'LESSON_5_3_RATIOS_PROPORTIONS.html',
    section_key: 'ratios-proportions-main'
  },
  {
    lesson_key: '5.4',
    title: 'Unit Conversion',
    subject: 'math',
    category: 'Numbers & Operations',
    difficulty_level: 3,
    duration_minutes: 20,
    order_index: 23,
    is_published: true,
    html_file: 'LESSON_5_4_UNIT_CONVERSION.html',
    section_key: 'unit-conversion-main'
  },
  {
    lesson_key: '5.5',
    title: 'Scientific Notation',
    subject: 'math',
    category: 'Numbers & Operations',
    difficulty_level: 3,
    duration_minutes: 20,
    order_index: 24,
    is_published: true,
    html_file: 'LESSON_5_5_SCIENTIFIC_NOTATION.html',
    section_key: 'scientific-notation-main'
  },
  {
    lesson_key: '5.6',
    title: 'Repeating Patterns',
    subject: 'math',
    category: 'Numbers & Operations',
    difficulty_level: 3,
    duration_minutes: 20,
    order_index: 25,
    is_published: true,
    html_file: 'LESSON_5_6_REPEATING_PATTERNS.html',
    section_key: 'repeating-patterns-main'
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
  console.log('\n📚 BATCH UPLOADING LESSONS 5.1-5.6 (Numbers & Operations)');
  console.log('='.repeat(80));

  for (const lessonData of lessons) {
    await uploadLesson(lessonData);
  }

  console.log('\n' + '='.repeat(80));
  console.log('✅ ALL CHAPTER 5 LESSONS UPLOADED SUCCESSFULLY!\n');
}

main();
