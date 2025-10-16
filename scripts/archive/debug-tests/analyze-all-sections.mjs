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

async function analyzeAllSections() {
  console.log('Analyzing ALL sections from lessons 1.1, 2.1, and 1.2...\n');

  // Fetch lessons
  const { data: lesson11 } = await supabase
    .from('lesson_metadata')
    .select('id, lesson_key, title')
    .eq('lesson_key', 'backsolving')
    .single();

  const { data: lesson21 } = await supabase
    .from('lesson_metadata')
    .select('id, lesson_key, title')
    .eq('lesson_key', 'geometry-angles')
    .single();

  const { data: lesson12 } = await supabase
    .from('lesson_metadata')
    .select('id, lesson_key, title')
    .eq('lesson_key', 'substitution')
    .single();

  const results = {};

  // Analyze each lesson
  for (const [key, lesson] of Object.entries({ '1.1': lesson11, '2.1': lesson21, '1.2': lesson12 })) {
    if (!lesson) continue;

    console.log(`\n${'='.repeat(80)}`);
    console.log(`LESSON ${key}: ${lesson.title}`);
    console.log('='.repeat(80));

    const { data: sections } = await supabase
      .from('lesson_sections')
      .select('*')
      .eq('lesson_id', lesson.id)
      .order('order_index');

    console.log(`Total sections: ${sections?.length || 0}\n`);

    results[key] = [];

    for (const section of sections || []) {
      const { data: content } = await supabase
        .from('section_content')
        .select('*')
        .eq('section_id', section.id)
        .order('order_index');

      const contentPreview = content?.[0]?.content || '';
      const hasExample = contentPreview.includes('Example') || contentPreview.includes('example');

      console.log(`Section ${section.order_index}: ${section.section_key}`);
      console.log(`  Type: ${section.section_type}`);
      console.log(`  Title: ${section.title}`);
      console.log(`  Content blocks: ${content?.length || 0}`);
      console.log(`  Has "Example" text: ${hasExample}`);
      console.log(`  Content preview (first 200 chars):`);
      console.log(`  ${contentPreview.substring(0, 200).replace(/\n/g, ' ')}`);
      console.log();

      results[key].push({
        order_index: section.order_index,
        section_key: section.section_key,
        section_type: section.section_type,
        title: section.title,
        content_blocks: content?.length || 0,
        has_example: hasExample,
        full_content: contentPreview
      });
    }
  }

  // Write detailed results
  fs.writeFileSync(
    resolve(__dirname, '../docs/SECTION_ANALYSIS.json'),
    JSON.stringify(results, null, 2)
  );

  console.log('\n✓ Detailed analysis saved to docs/SECTION_ANALYSIS.json');
}

analyzeAllSections().catch(console.error);
