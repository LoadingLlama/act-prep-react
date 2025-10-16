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

async function checkCurrentContent() {
  console.log('Fetching current lesson 1.2 content...\n');

  const { data: lesson } = await supabase
    .from('lesson_metadata')
    .select('id')
    .eq('lesson_key', 'substitution')
    .single();

  if (!lesson) {
    console.log('Lesson 1.2 not found');
    return;
  }

  const { data: sections } = await supabase
    .from('lesson_sections')
    .select('*')
    .eq('lesson_id', lesson.id)
    .order('order_index');

  console.log(`Found ${sections?.length} sections\n`);

  for (const section of sections || []) {
    console.log('='.repeat(80));
    console.log(`Section ${section.order_index}: ${section.section_key}`);
    console.log(`Type: ${section.section_type}`);
    console.log(`Title: ${section.title}`);
    console.log('='.repeat(80));

    const { data: content } = await supabase
      .from('section_content')
      .select('*')
      .eq('section_id', section.id)
      .order('order_index');

    console.log(`Content blocks: ${content?.length}\n`);

    for (let i = 0; i < (content?.length || 0); i++) {
      const block = content[i];
      console.log(`--- Content Block ${i} ---`);
      console.log(`Type: ${block.content_type}`);
      console.log(`Content length: ${block.content?.length || 0} chars\n`);

      // Save full content to file
      fs.writeFileSync(
        resolve(__dirname, `../docs/LESSON_1_2_CONTENT_BLOCK_${i}.html`),
        block.content || ''
      );
      console.log(`✓ Saved to docs/LESSON_1_2_CONTENT_BLOCK_${i}.html\n`);
    }
  }
}

checkCurrentContent().catch(console.error);
