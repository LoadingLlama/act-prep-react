/**
 * Fix Types of Angles Diagram - Smaller Arrows
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function fixTypesOfAnglesArrows() {
  console.log('🔧 Fixing Types of Angles diagram - smaller arrows...\n');
  console.log('='.repeat(70));
  console.log('\n');

  const { data: lesson } = await supabase
    .from('lessons')
    .select('*')
    .eq('lesson_key', 'geometry-angles')
    .single();

  let content = lesson.content;

  console.log('📝 Making arrowheads smaller...\n');

  // Find and replace the arrowhead marker definition
  // Change from markerWidth="10" markerHeight="10" to markerWidth="6" markerHeight="6"
  // Change from refX="9" to refX="5"
  // Change from polygon points="0 0, 10 5, 0 10" to points="0 0, 6 3, 0 6"

  content = content.replace(
    /<marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="5" orient="auto">\s*<polygon points="0 0, 10 5, 0 10"/g,
    '<marker id="arrowhead" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">\n                            <polygon points="0 0, 6 3, 0 6"'
  );

  console.log('  ✅ Reduced arrow size: 10px → 6px\n');

  console.log('💾 Updating database...\n');

  const { error } = await supabase
    .from('lessons')
    .update({
      content: content,
      updated_at: new Date().toISOString()
    })
    .eq('id', lesson.id);

  if (error) {
    console.error('❌ Error:', error);
    return false;
  }

  console.log('✅ Arrows fixed!\n');
  console.log('📊 Changes:');
  console.log('  ✅ Arrowhead size: 10x10 → 6x6');
  console.log('  ✅ More subtle and professional');
  console.log('  ✅ Better proportions\n');

  return true;
}

async function main() {
  const success = await fixTypesOfAnglesArrows();

  console.log('='.repeat(70));
  if (success) {
    console.log('\n✨ Types of Angles diagram now has smaller arrows!\n');
  } else {
    console.log('\n❌ Error occurred.\n');
  }
}

main();
