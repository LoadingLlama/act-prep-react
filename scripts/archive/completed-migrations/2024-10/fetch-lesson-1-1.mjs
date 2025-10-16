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

async function fetchLesson11() {
  console.log('Fetching Lesson 1.1 (Working Backwards Strategy)...\n');

  // Get lesson metadata
  const { data: metadata, error: metaError } = await supabase
    .from('lesson_metadata')
    .select('*')
    .eq('lesson_key', '1.1')
    .single();

  if (metaError) {
    console.error('Error fetching metadata:', metaError);
    return;
  }

  if (!metadata) {
    console.log('Lesson 1.1 not found. Checking for variations...');

    // Try alternative lesson keys
    const alternatives = ['backsolving', '1-1', 'working-backwards'];
    for (const key of alternatives) {
      const { data: altData } = await supabase
        .from('lesson_metadata')
        .select('*')
        .eq('lesson_key', key)
        .single();

      if (altData) {
        console.log(`Found lesson with key: ${key}`);
        Object.assign(metadata, altData);
        break;
      }
    }

    if (!metadata?.id) {
      console.log('Could not find lesson 1.1. Available math lessons:');
      const { data: allMath } = await supabase
        .from('lesson_metadata')
        .select('lesson_key, title, subject')
        .eq('subject', 'math')
        .order('order_index');

      console.log(allMath);
      return;
    }
  }

  console.log('='.repeat(80));
  console.log('LESSON METADATA');
  console.log('='.repeat(80));
  console.log(JSON.stringify(metadata, null, 2));
  console.log('\n');

  const lessonId = metadata.id;

  // Get lesson sections
  const { data: sections, error: sectionsError } = await supabase
    .from('lesson_sections')
    .select('*')
    .eq('lesson_id', lessonId)
    .order('order_index');

  if (sectionsError) {
    console.error('Error fetching sections:', sectionsError);
    return;
  }

  console.log('='.repeat(80));
  console.log(`LESSON SECTIONS (${sections?.length || 0} sections)`);
  console.log('='.repeat(80));

  const fullLesson = {
    metadata,
    sections: []
  };

  // For each section, get its content
  for (const section of sections || []) {
    console.log(`\nSection ${section.order_index}: ${section.section_key}`);
    console.log('-'.repeat(80));
    console.log(`Title: ${section.title || 'N/A'}`);

    const { data: content, error: contentError } = await supabase
      .from('section_content')
      .select('*')
      .eq('section_id', section.id)
      .order('order_index');

    if (contentError) {
      console.error('Error fetching content:', contentError);
      continue;
    }

    console.log(`Content blocks: ${content?.length || 0}`);

    fullLesson.sections.push({
      ...section,
      content: content || []
    });

    // Show first 500 chars of each content block
    for (const block of content || []) {
      console.log(`  Block ${block.order_index} (${block.content_type}):`);
      console.log(`  ${block.content.substring(0, 200)}...`);
      console.log();
    }
  }

  // Get additional lesson data
  const [examples, concepts, tips] = await Promise.all([
    supabase.from('lesson_examples').select('*').eq('lesson_id', lessonId).order('order_index'),
    supabase.from('lesson_concepts').select('*').eq('lesson_id', lessonId).order('order_index'),
    supabase.from('lesson_tips').select('*').eq('lesson_id', lessonId).order('order_index')
  ]);

  if (examples.data?.length) {
    console.log('\n' + '='.repeat(80));
    console.log(`EXAMPLES (${examples.data.length})`);
    console.log('='.repeat(80));
    fullLesson.examples = examples.data;
    examples.data.forEach((ex, i) => {
      console.log(`\nExample ${i + 1}:`);
      console.log(`  ${ex.problem_text?.substring(0, 200) || 'N/A'}...`);
    });
  }

  if (concepts.data?.length) {
    console.log('\n' + '='.repeat(80));
    console.log(`KEY CONCEPTS (${concepts.data.length})`);
    console.log('='.repeat(80));
    fullLesson.concepts = concepts.data;
    concepts.data.forEach((c, i) => {
      console.log(`\n${i + 1}. ${c.concept_name || 'N/A'}`);
    });
  }

  if (tips.data?.length) {
    console.log('\n' + '='.repeat(80));
    console.log(`TIPS (${tips.data.length})`);
    console.log('='.repeat(80));
    fullLesson.tips = tips.data;
    tips.data.forEach((t, i) => {
      console.log(`\n${i + 1}. ${t.tip_type}: ${t.tip_text?.substring(0, 150) || 'N/A'}...`);
    });
  }

  // Save to file
  const outputPath = resolve(__dirname, '../docs/LESSON_1_1_FULL.json');
  fs.writeFileSync(outputPath, JSON.stringify(fullLesson, null, 2));

  console.log('\n' + '='.repeat(80));
  console.log(`Full lesson saved to: ${outputPath}`);
  console.log('='.repeat(80));

  return fullLesson;
}

fetchLesson11().catch(console.error);
