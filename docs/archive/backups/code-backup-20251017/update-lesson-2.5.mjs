import { supabaseUrl, supabaseServiceKey } from './config.mjs';
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function updateLesson() {
  console.log('📝 Updating Lesson 2.5...\n');

  const newContent = fs.readFileSync(
    '/Users/cadenchiang/Desktop/act-prep-react/NEW_LESSON_2_5_CIRCLES_ELLIPSES_HYPERBOLAS.html',
    'utf8'
  );

  console.log(`New content length: ${newContent.length} chars\n`);

  const { data: lesson } = await supabase
    .from('lesson_metadata')
    .select('id')
    .eq('lesson_key', '2.5')
    .single();

  if (!lesson) {
    console.error('❌ Lesson 2.5 not found');
    return;
  }

  const { data: sections } = await supabase
    .from('lesson_sections')
    .select('id')
    .eq('lesson_id', lesson.id)
    .order('order_index')
    .limit(1);

  if (!sections || sections.length === 0) {
    console.error('❌ No sections found');
    return;
  }

  const { data: contentBlocks } = await supabase
    .from('section_content')
    .select('id, content')
    .eq('section_id', sections[0].id)
    .order('order_index')
    .limit(1);

  if (!contentBlocks || contentBlocks.length === 0) {
    console.error('❌ No content blocks found');
    return;
  }

  const oldLength = contentBlocks[0].content?.length || 0;

  const { error } = await supabase
    .from('section_content')
    .update({ content: newContent })
    .eq('id', contentBlocks[0].id);

  if (error) {
    console.error('❌ Update failed:', error.message);
    return;
  }

  console.log('✅ Lesson 2.5 - Circles, Ellipses, and Hyperbolas UPDATED!');
  console.log(`📊 ${oldLength} → ${newContent.length} chars\n`);
}

updateLesson().catch(err => {
  console.error('❌ Failed:', err);
  process.exit(1);
});
