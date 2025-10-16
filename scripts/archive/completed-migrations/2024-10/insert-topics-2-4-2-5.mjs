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
    lesson_key: '2.4',
    title: 'Arcs and Sectors',
    subject: 'math',
    category: 'Geometry',
    difficulty_level: 3,
    duration_minutes: 30,
    order_index: 8,
    content_file: 'TOPIC_2_4_ARCS_SECTORS_CONTENT.html',
    quiz_file: 'TOPIC_2_4_ARCS_SECTORS_QUIZ.html'
  },
  {
    lesson_key: '2.5',
    title: 'Circles, Ellipses, and Hyperbolas',
    subject: 'math',
    category: 'Geometry',
    difficulty_level: 4,
    duration_minutes: 35,
    order_index: 9,
    content_file: 'TOPIC_2_5_CIRCLES_ELLIPSES_HYPERBOLAS_CONTENT.html',
    quiz_file: 'TOPIC_2_5_CIRCLES_ELLIPSES_HYPERBOLAS_QUIZ.html'
  }
];

async function insertLesson(lessonData) {
  const { lesson_key, title, content_file, quiz_file, ...metadata } = lessonData;

  try {
    console.log(`\n${'='.repeat(60)}`);
    console.log(`Starting insertion of ${lesson_key}: ${title}...`);
    console.log('='.repeat(60));

    // Read the HTML content files
    const mainContent = readFileSync(resolve(__dirname, `../docs/${content_file}`), 'utf8');
    const quizContent = readFileSync(resolve(__dirname, `../docs/${quiz_file}`), 'utf8');

    // Step 1: Insert lesson metadata
    console.log('1. Inserting lesson metadata...');
    const { data: lessonDataInsert, error: lessonError } = await supabase
      .from('lesson_metadata')
      .insert({
        lesson_key,
        title,
        ...metadata,
        is_published: true
      })
      .select()
      .single();

    if (lessonError) {
      console.error(`Error inserting lesson metadata for ${lesson_key}:`, lessonError);
      throw lessonError;
    }

    const lessonId = lessonDataInsert.id;
    console.log(`✓ Lesson metadata inserted with ID: ${lessonId}`);

    // Step 2: Insert Introduction section
    console.log('2. Inserting Introduction section...');
    const { data: introSection, error: introSectionError } = await supabase
      .from('lesson_sections')
      .insert({
        lesson_id: lessonId,
        section_key: `${lesson_key}-intro`,
        section_type: 'content',
        title: 'Introduction',
        order_index: 1
      })
      .select()
      .single();

    if (introSectionError) throw introSectionError;

    await supabase.from('section_content').insert({
      section_id: introSection.id,
      content_type: 'text',
      content: `<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Welcome to ${title}! This lesson will teach you everything you need to know about this topic for the ACT Math section.</p>`,
      order_index: 1
    });

    console.log('✓ Introduction section inserted');

    // Step 3: Insert Main Content section
    console.log('3. Inserting Main Content section...');
    const { data: mainSection, error: mainSectionError } = await supabase
      .from('lesson_sections')
      .insert({
        lesson_id: lessonId,
        section_key: `${lesson_key}-main`,
        section_type: 'content',
        title: 'Key Concepts & Examples',
        order_index: 2
      })
      .select()
      .single();

    if (mainSectionError) throw mainSectionError;

    await supabase.from('section_content').insert({
      section_id: mainSection.id,
      content_type: 'html',
      content: mainContent,
      order_index: 1
    });

    console.log(`✓ Main content section inserted (${mainContent.length} chars)`);

    // Step 4: Insert Mastery Check Quiz section
    console.log('4. Inserting Mastery Check Quiz section...');
    const { data: quizSection, error: quizSectionError } = await supabase
      .from('lesson_sections')
      .insert({
        lesson_id: lessonId,
        section_key: `${lesson_key}-quiz`,
        section_type: 'quiz',
        title: 'Mastery Check Quiz',
        order_index: 3
      })
      .select()
      .single();

    if (quizSectionError) throw quizSectionError;

    await supabase.from('section_content').insert({
      section_id: quizSection.id,
      content_type: 'html',
      content: quizContent,
      order_index: 1
    });

    console.log(`✓ Mastery Check Quiz section inserted (${quizContent.length} chars)`);

    // Step 5: Insert Summary section
    console.log('5. Inserting Summary section...');
    const { data: summarySection, error: summarySectionError } = await supabase
      .from('lesson_sections')
      .insert({
        lesson_id: lessonId,
        section_key: `${lesson_key}-summary`,
        section_type: 'content',
        title: 'Summary',
        order_index: 4
      })
      .select()
      .single();

    if (summarySectionError) throw summarySectionError;

    await supabase.from('section_content').insert({
      section_id: summarySection.id,
      content_type: 'text',
      content: `<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Congratulations! You've completed the ${title} lesson. Keep practicing these concepts to build fluency for test day.</p>`,
      order_index: 1
    });

    console.log('✓ Summary section inserted');

    console.log('='.repeat(60));
    console.log(`✅ SUCCESS! ${lesson_key}: ${title} has been inserted!`);
    console.log('='.repeat(60));
    console.log(`Lesson ID: ${lessonId}`);
    console.log(`Category: ${metadata.category}`);
    console.log('='.repeat(60));

    return { success: true, lessonId, lesson_key };

  } catch (error) {
    console.error(`\n❌ ERROR during insertion of ${lesson_key}:`, error);
    console.error('Details:', error.message);
    return { success: false, lesson_key, error: error.message };
  }
}

async function insertAllLessons() {
  console.log('\n\n');
  console.log('╔' + '═'.repeat(78) + '╗');
  console.log('║' + ' '.repeat(15) + 'INSERTING LESSONS 2.4 AND 2.5' + ' '.repeat(34) + '║');
  console.log('╚' + '═'.repeat(78) + '╝');
  console.log(`\nInserting ${lessons.length} lessons...\n`);

  const results = [];

  for (const lesson of lessons) {
    const result = await insertLesson(lesson);
    results.push(result);
  }

  console.log('\n\n');
  console.log('╔' + '═'.repeat(78) + '╗');
  console.log('║' + ' '.repeat(30) + 'FINAL SUMMARY' + ' '.repeat(35) + '║');
  console.log('╚' + '═'.repeat(78) + '╝\n');

  const successful = results.filter(r => r.success);
  const failed = results.filter(r => !r.success);

  console.log(`✅ Successful: ${successful.length}/${lessons.length}`);
  successful.forEach(r => {
    console.log(`   - ${r.lesson_key} (ID: ${r.lessonId})`);
  });

  if (failed.length > 0) {
    console.log(`\n❌ Failed: ${failed.length}/${lessons.length}`);
    failed.forEach(r => {
      console.log(`   - ${r.lesson_key}: ${r.error}`);
    });
  }

  console.log('\n' + '='.repeat(80) + '\n');
}

// Run the batch insertion
insertAllLessons();
