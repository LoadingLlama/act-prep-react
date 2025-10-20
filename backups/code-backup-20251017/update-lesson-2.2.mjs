import { supabaseUrl, supabaseServiceKey } from './config.mjs';
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function updateLesson() {
  console.log('📝 Updating Lesson 2.2...\n');

  // Read new content
  const newContent = fs.readFileSync(
    '/Users/cadenchiang/Desktop/act-prep-react/NEW_LESSON_2_2_AREAS_VOLUMES_TRIANGLES.html',
    'utf8'
  );

  console.log(`New content length: ${newContent.length} chars\n`);

  // Get lesson
  const { data: lesson } = await supabase
    .from('lesson_metadata')
    .select('id')
    .eq('lesson_key', '2.2')
    .single();

  if (!lesson) {
    console.error('❌ Lesson 2.2 not found');
    return;
  }

  console.log(`✅ Found lesson: ${lesson.id}\n`);

  // Get section
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

  const sectionId = sections[0].id;
  console.log(`✅ Found section: ${sectionId}\n`);

  // Get content block
  const { data: contentBlocks } = await supabase
    .from('section_content')
    .select('id, content')
    .eq('section_id', sectionId)
    .order('order_index')
    .limit(1);

  if (!contentBlocks || contentBlocks.length === 0) {
    console.error('❌ No content blocks found');
    return;
  }

  const contentId = contentBlocks[0].id;
  const oldLength = contentBlocks[0].content?.length || 0;

  console.log(`✅ Found content block: ${contentId}`);
  console.log(`Old content length: ${oldLength} chars\n`);

  // Update content
  const { error } = await supabase
    .from('section_content')
    .update({ content: newContent })
    .eq('id', contentId);

  if (error) {
    console.error('❌ Update failed:', error.message);
    return;
  }

  console.log('✅ UPDATE SUCCESSFUL!');
  console.log(`📊 ${oldLength} → ${newContent.length} chars\n`);
  console.log('🎉 Lesson 2.2 has been updated with comprehensive content!');
  console.log('🌐 Test it at: http://localhost:3000/lessons/2.2\n');
}

updateLesson().catch(err => {
  console.error('❌ Failed:', err);
  process.exit(1);
});
