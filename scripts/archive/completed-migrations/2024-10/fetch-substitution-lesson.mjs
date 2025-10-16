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

async function fetchSubstitutionLesson() {
  console.log('Fetching Topic 1.2 - Number Substitution Technique...\n');

  // Get lesson metadata
  const { data: metadata, error: metaError } = await supabase
    .from('lesson_metadata')
    .select('*')
    .eq('lesson_key', 'substitution')
    .single();

  if (metaError || !metadata) {
    console.error('Error fetching metadata:', metaError);
    return;
  }

  console.log('METADATA:', JSON.stringify(metadata, null, 2));

  const lessonId = metadata.id;

  // Get lesson sections
  const { data: sections } = await supabase
    .from('lesson_sections')
    .select('*')
    .eq('lesson_id', lessonId)
    .order('order_index');

  console.log(`\nFound ${sections?.length || 0} sections\n`);

  const fullLesson = {
    metadata,
    sections: []
  };

  // For each section, get its content
  for (const section of sections || []) {
    const { data: content } = await supabase
      .from('section_content')
      .select('*')
      .eq('section_id', section.id)
      .order('order_index');

    console.log(`Section: ${section.section_key}`);
    console.log(`Content blocks: ${content?.length || 0}`);
    console.log(`Total chars: ${content?.reduce((sum, c) => sum + c.content.length, 0) || 0}\n`);

    fullLesson.sections.push({
      ...section,
      content: content || []
    });
  }

  // Save to file
  const outputPath = resolve(__dirname, '../docs/LESSON_1_2_SUBSTITUTION_CURRENT.json');
  fs.writeFileSync(outputPath, JSON.stringify(fullLesson, null, 2));

  console.log(`Saved to: ${outputPath}`);

  return fullLesson;
}

fetchSubstitutionLesson().catch(console.error);
