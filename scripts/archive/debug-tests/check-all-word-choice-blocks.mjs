import { createClient } from '@supabase/supabase-js';
import { supabaseUrl, supabaseAnonKey } from './config.mjs';

// supabaseUrl imported from config.mjs
// supabaseAnonKey imported from config.mjs
const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function checkWordChoice() {
  // Get word-choice lesson
  const { data: lesson } = await supabase
    .from('lesson_metadata')
    .select('id')
    .eq('lesson_key', 'word-choice')
    .single();

  // Get all sections
  const { data: sections } = await supabase
    .from('lesson_sections')
    .select('id, section_key')
    .eq('lesson_id', lesson.id);

  console.log('\n📚 WORD-CHOICE CONTENT BLOCKS:\n');

  for (const section of sections) {
    const { data: blocks } = await supabase
      .from('section_content')
      .select('*')
      .eq('section_id', section.id)
      .order('order_index');

    console.log(`\nSection: ${section.section_key}`);
    for (const block of blocks) {
      console.log(`  Block ${block.id}:`);
      console.log(`    Length: ${block.content.length} chars`);
      console.log(`    Has H4: ${block.content.includes('<h4')}`);
      console.log(`    First 100 chars: ${block.content.substring(0, 100)}...`);
    }
  }
}

checkWordChoice();
