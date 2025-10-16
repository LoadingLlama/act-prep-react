import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: resolve(__dirname, '../.env') });

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function analyzeExamples() {
  console.log('Analyzing example sections from lessons 1.1 and 2.1...\n');

  // Fetch lesson 1.1 (backsolving)
  const { data: lesson11 } = await supabase
    .from('lesson_metadata')
    .select('id')
    .eq('lesson_key', 'backsolving')
    .single();

  // Fetch lesson 2.1 (geometry-angles)
  const { data: lesson21 } = await supabase
    .from('lesson_metadata')
    .select('id')
    .eq('lesson_key', 'geometry-angles')
    .single();

  // Fetch lesson 1.2 (substitution)
  const { data: lesson12 } = await supabase
    .from('lesson_metadata')
    .select('id')
    .eq('lesson_key', 'substitution')
    .single();

  const results = {
    lesson_1_1: { examples: [] },
    lesson_2_1: { examples: [] },
    lesson_1_2: { examples: [] }
  };

  // Get example sections from 1.1
  if (lesson11) {
    const { data: sections } = await supabase
      .from('lesson_sections')
      .select('*')
      .eq('lesson_id', lesson11.id)
      .eq('section_type', 'example')
      .order('order_index');

    for (const section of sections || []) {
      const { data: content } = await supabase
        .from('section_content')
        .select('*')
        .eq('section_id', section.id)
        .order('order_index');

      results.lesson_1_1.examples.push({
        section_key: section.section_key,
        title: section.title,
        order_index: section.order_index,
        content: content?.[0]?.content || ''
      });
    }
  }

  // Get example sections from 2.1
  if (lesson21) {
    const { data: sections } = await supabase
      .from('lesson_sections')
      .select('*')
      .eq('lesson_id', lesson21.id)
      .eq('section_type', 'example')
      .order('order_index');

    for (const section of sections || []) {
      const { data: content } = await supabase
        .from('section_content')
        .select('*')
        .eq('section_id', section.id)
        .order('order_index');

      results.lesson_2_1.examples.push({
        section_key: section.section_key,
        title: section.title,
        order_index: section.order_index,
        content: content?.[0]?.content || ''
      });
    }
  }

  // Get example sections from 1.2
  if (lesson12) {
    const { data: sections } = await supabase
      .from('lesson_sections')
      .select('*')
      .eq('lesson_id', lesson12.id)
      .order('order_index');

    for (const section of sections || []) {
      const { data: content } = await supabase
        .from('section_content')
        .select('*')
        .eq('section_id', section.id)
        .order('order_index');

      results.lesson_1_2.examples.push({
        section_key: section.section_key,
        title: section.title,
        section_type: section.section_type,
        order_index: section.order_index,
        content: (content?.[0]?.content || '').substring(0, 500)
      });
    }
  }

  // Write to file
  fs.writeFileSync(
    resolve(__dirname, '../docs/EXAMPLE_ANALYSIS.json'),
    JSON.stringify(results, null, 2)
  );

  console.log('✓ Analysis saved to docs/EXAMPLE_ANALYSIS.json');
  console.log(`\nLesson 1.1: ${results.lesson_1_1.examples.length} examples`);
  console.log(`Lesson 2.1: ${results.lesson_2_1.examples.length} examples`);
  console.log(`Lesson 1.2: ${results.lesson_1_2.examples.length} sections\n`);

  // Show first example from each lesson
  if (results.lesson_1_1.examples[0]) {
    console.log('='.repeat(80));
    console.log('LESSON 1.1 - FIRST EXAMPLE:');
    console.log('='.repeat(80));
    console.log('Section key:', results.lesson_1_1.examples[0].section_key);
    console.log('Title:', results.lesson_1_1.examples[0].title);
    console.log('Content preview:', results.lesson_1_1.examples[0].content.substring(0, 300));
    console.log('\n');
  }

  if (results.lesson_2_1.examples[0]) {
    console.log('='.repeat(80));
    console.log('LESSON 2.1 - FIRST EXAMPLE:');
    console.log('='.repeat(80));
    console.log('Section key:', results.lesson_2_1.examples[0].section_key);
    console.log('Title:', results.lesson_2_1.examples[0].title);
    console.log('Content preview:', results.lesson_2_1.examples[0].content.substring(0, 300));
    console.log('\n');
  }
}

analyzeExamples().catch(console.error);
