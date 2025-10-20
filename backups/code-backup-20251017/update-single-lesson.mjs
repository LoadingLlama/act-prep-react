import { supabaseUrl, supabaseServiceKey } from './config.mjs';
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const lessonKey = process.argv[2];
const filePath = process.argv[3];

async function updateLesson() {
  const newContent = fs.readFileSync(filePath, 'utf8');

  // Get lesson and section
  const { data: lesson } = await supabase.from('lesson_metadata').select('id').eq('lesson_key', lessonKey).single();
  const { data: sections } = await supabase.from('lesson_sections').select('id').eq('lesson_id', lesson.id).order('order_index').limit(1);

  // Get ALL content blocks for this section
  const { data: allBlocks } = await supabase.from('section_content').select('id, content, order_index').eq('section_id', sections[0].id).order('order_index');

  const oldLength = allBlocks[0].content?.length || 0;

  // Update block 0 with new content
  await supabase.from('section_content').update({ content: newContent }).eq('id', allBlocks[0].id);

  // Delete any extra blocks (1, 2, 3, etc.) to avoid duplicate content
  if (allBlocks.length > 1) {
    const toDelete = allBlocks.slice(1).map(b => b.id);
    await supabase.from('section_content').delete().in('id', toDelete);
    console.log(`✅ ${lessonKey}: ${oldLength} → ${newContent.length} chars (cleaned ${toDelete.length} old blocks)`);
  } else {
    console.log(`✅ ${lessonKey}: ${oldLength} → ${newContent.length} chars`);
  }
}

updateLesson().catch(err => { console.error('❌ Failed:', err); process.exit(1); });
