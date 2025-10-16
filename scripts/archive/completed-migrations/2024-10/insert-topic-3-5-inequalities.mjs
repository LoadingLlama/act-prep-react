import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import { readFileSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: resolve(__dirname, '../.env') });

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function insertTopic35Inequalities() {
  try {
    console.log('Starting insertion of Topic 3.5: Inequalities...\n');

    // Read the HTML content files
    const mainContent = readFileSync(resolve(__dirname, '../docs/TOPIC_3_5_INEQUALITIES_CONTENT.html'), 'utf8');
    const quizContent = readFileSync(resolve(__dirname, '../docs/TOPIC_3_5_INEQUALITIES_QUIZ.html'), 'utf8');

    // Step 1: Insert lesson metadata
    console.log('1. Inserting lesson metadata...');
    const { data: lessonData, error: lessonError } = await supabase
      .from('lesson_metadata')
      .insert({
        lesson_key: '3.5',
        title: 'Inequalities',
        subject: 'math',
        category: 'Algebra Fundamentals',
        difficulty_level: 3,
        duration_minutes: 30,
        order_index: 11,
        is_published: true
      })
      .select()
      .single();

    if (lessonError) {
      console.error('Error inserting lesson metadata:', lessonError);
      throw lessonError;
    }

    const lessonId = lessonData.id;
    console.log(`✓ Lesson metadata inserted with ID: ${lessonId}\n`);

    // Step 2: Insert Introduction section
    console.log('2. Inserting Introduction section...');
    const { data: introSection, error: introSectionError } = await supabase
      .from('lesson_sections')
      .insert({
        lesson_id: lessonId,
        section_key: 'inequalities-intro',
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
      content: `<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Welcome to inequalities! This lesson will teach you everything you need to know about solving and graphing inequalities for the ACT Math section. You'll learn when to flip the inequality sign, how to solve compound and absolute value inequalities, and how to graph inequality systems.</p>`,
      order_index: 1
    });

    console.log('✓ Introduction section inserted\n');

    // Step 3: Insert Main Content section
    console.log('3. Inserting Main Content section...');
    const { data: mainSection, error: mainSectionError } = await supabase
      .from('lesson_sections')
      .insert({
        lesson_id: lessonId,
        section_key: 'inequalities-main',
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

    console.log('✓ Main content section inserted\n');

    // Step 4: Insert Mastery Check Quiz section
    console.log('4. Inserting Mastery Check Quiz section...');
    const { data: quizSection, error: quizSectionError } = await supabase
      .from('lesson_sections')
      .insert({
        lesson_id: lessonId,
        section_key: 'inequalities-quiz',
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

    console.log('✓ Mastery Check Quiz section inserted\n');

    // Step 5: Insert Key Takeaways section
    console.log('5. Inserting Key Takeaways section...');
    const { data: takeawaysSection, error: takeawaysSectionError } = await supabase
      .from('lesson_sections')
      .insert({
        lesson_id: lessonId,
        section_key: 'inequalities-summary',
        section_type: 'content',
        title: 'Summary',
        order_index: 4
      })
      .select()
      .single();

    if (takeawaysSectionError) throw takeawaysSectionError;

    await supabase.from('section_content').insert({
      section_id: takeawaysSection.id,
      content_type: 'text',
      content: `<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Congratulations! You've completed the inequalities lesson. You now understand when to flip the inequality sign, how to solve compound and absolute value inequalities, and how to graph linear inequalities and systems. Remember to always watch for that negative sign when solving!</p>`,
      order_index: 1
    });

    console.log('✓ Key Takeaways section inserted\n');

    console.log('═══════════════════════════════════════════════════════');
    console.log('✅ SUCCESS! Topic 3.5: Inequalities has been inserted!');
    console.log('═══════════════════════════════════════════════════════');
    console.log(`Lesson ID: ${lessonId}`);
    console.log(`Lesson Key: 3.5`);
    console.log(`Title: Inequalities`);
    console.log(`Category: Algebra Fundamentals`);
    console.log('═══════════════════════════════════════════════════════\n');

  } catch (error) {
    console.error('\n❌ ERROR during insertion:', error);
    console.error('Details:', error.message);
    process.exit(1);
  }
}

// Run the insertion
insertTopic35Inequalities();
