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

async function consolidate() {
  console.log('Consolidating lesson 1.2 content into single block like 1.1 and 2.1...\n');

  // Get lesson 1.2
  const { data: lesson } = await supabase
    .from('lesson_metadata')
    .select('id')
    .eq('lesson_key', 'substitution')
    .single();

  if (!lesson) {
    console.log('Lesson 1.2 not found');
    return;
  }

  // Get the main section
  const { data: sections } = await supabase
    .from('lesson_sections')
    .select('*')
    .eq('lesson_id', lesson.id)
    .eq('section_key', 'substitution-main')
    .single();

  if (!sections) {
    console.log('Main section not found');
    return;
  }

  // Get all content blocks
  const { data: contentBlocks } = await supabase
    .from('section_content')
    .select('*')
    .eq('section_id', sections.id)
    .order('order_index');

  console.log(`Found ${contentBlocks?.length} content blocks`);

  // Combine all blocks with double newline (like lessons.service.js does)
  const combinedContent = contentBlocks.map(b => b.content).join('\n\n');

  console.log(`Combined content length: ${combinedContent.length} chars\n`);

  // Save to file for inspection
  fs.writeFileSync(
    resolve(__dirname, '../docs/LESSON_1_2_COMBINED.html'),
    combinedContent
  );
  console.log('✓ Saved combined content to docs/LESSON_1_2_COMBINED.html\n');

  // Delete all existing content blocks
  const { error: deleteError } = await supabase
    .from('section_content')
    .delete()
    .eq('section_id', sections.id);

  if (deleteError) {
    console.error('Error deleting content blocks:', deleteError);
    return;
  }

  console.log('✓ Deleted all existing content blocks\n');

  // Insert single consolidated block
  const { error: insertError } = await supabase
    .from('section_content')
    .insert([
      {
        section_id: sections.id,
        content_type: 'html',
        content: combinedContent,
        order_index: 0
      }
    ]);

  if (insertError) {
    console.error('Error inserting combined content:', insertError);
    return;
  }

  console.log('✓ Inserted single consolidated content block\n');
  console.log('✅ Lesson 1.2 now has the same structure as lessons 1.1 and 2.1!');
}

consolidate().catch(console.error);
