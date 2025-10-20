import { supabaseUrl, supabaseServiceKey } from './config.mjs';
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function updateLesson() {
  const newContent = fs.readFileSync(
    '/Users/cadenchiang/Desktop/act-prep-react/LESSON_1_ENGLISH_getting-started.html',
    'utf8'
  );

  const { data: lesson } = await supabase
    .from('lesson_metadata')
    .select('id')
    .eq('lesson_key', 'getting-started')
    .single();

  const { data: sections } = await supabase
    .from('lesson_sections')
    .select('id')
    .eq('lesson_id', lesson.id)
    .order('order_index')
    .limit(1);

  const { data: contentBlocks } = await supabase
    .from('lesson_section_content')
    .select('id, content')
    .eq('section_id', sections[0].id)
    .order('order_index')
    .limit(1);

  const oldLength = contentBlocks[0].content?.length || 0;

  await supabase
    .from('lesson_section_content')
    .update({ content: newContent })
    .eq('id', contentBlocks[0].id);

  console.log(`✅ ENGLISH #1 - getting-started: ${oldLength} → ${newContent.length} chars`);
}

updateLesson().catch(err => {
  console.error('❌ Failed:', err);
  process.exit(1);
});
