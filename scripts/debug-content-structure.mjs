import { supabaseUrl, supabaseServiceKey } from './config.mjs';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function debug() {
  console.log('🔍 Debugging content structure\n');

  // Pick a specific lesson: 3.1 (Algebra Skills)
  const lessonKey = '3.1';

  console.log(`Checking lesson: ${lessonKey}\n`);

  // Get lesson metadata
  const { data: lesson } = await supabase
    .from('lesson_metadata')
    .select('*')
    .eq('lesson_key', lessonKey)
    .single();

  if (!lesson) {
    console.log('❌ Lesson not found');
    return;
  }

  console.log('✅ Lesson found:');
  console.log(`  ID: ${lesson.id}`);
  console.log(`  Title: ${lesson.title}`);

  // Get sections
  const { data: sections } = await supabase
    .from('lesson_sections')
    .select('*')
    .eq('lesson_id', lesson.id)
    .order('order_index');

  console.log(`\n✅ Found ${sections?.length || 0} sections:`);
  if (sections) {
    sections.forEach(s => {
      console.log(`  Section: ${s.section_key} (${s.section_type})`);
      console.log(`    ID: ${s.id}`);
      console.log(`    Order: ${s.order_index}`);
    });
  }

  if (!sections || sections.length === 0) {
    console.log('\n❌ NO SECTIONS - This is the problem!');
    return;
  }

  // Get content for first section
  const firstSection = sections[0];
  console.log(`\n🔍 Checking content for section: ${firstSection.section_key}`);

  const { data: content } = await supabase
    .from('lesson_section_content')
    .select('*')
    .eq('section_id', firstSection.id)
    .order('position');

  console.log(`\n✅ Found ${content?.length || 0} content blocks:`);
  if (content && content.length > 0) {
    content.forEach(c => {
      console.log(`  Block ${c.position}:`);
      console.log(`    Type: ${c.block_type}`);
      console.log(`    Content length: ${c.content?.length || 0} chars`);
    });
  } else {
    console.log('\n❌ NO CONTENT BLOCKS - This is the problem!');
  }
}

debug().catch(err => {
  console.error('❌ Failed:', err);
  process.exit(1);
});
