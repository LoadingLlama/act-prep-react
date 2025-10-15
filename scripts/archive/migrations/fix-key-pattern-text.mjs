/**
 * Fix Key Pattern Text to Match Diagram
 * Diagram shows 70° and 110°, not 65° and 115°
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function fixKeyPatternText() {
  console.log('🔧 Fixing Key Pattern text to match diagram...\\n');

  const { data: lesson } = await supabase
    .from('lessons')
    .select('*')
    .eq('lesson_key', 'geometry-angles')
    .single();

  let content = lesson.content;

  // Old text (incorrect - says 65° and 115°)
  const oldText = 'When parallel lines are cut by a transversal, <strong>corresponding angles are equal</strong>. Both angles shown are 65°. All four acute angles equal 65°, and all four obtuse angles equal 115° (since 65° + 115° = 180°).';

  // New text (correct - matches diagram with 70° and 110°)
  const newText = 'When parallel lines are cut by a transversal, <strong>corresponding angles are equal</strong>. The diagram shows 70° and 110°. All four acute angles equal 70°, and all four obtuse angles equal 110° (since 70° + 110° = 180°).';

  if (content.includes(oldText)) {
    content = content.replace(oldText, newText);
    console.log('✅ Found and replaced old text\\n');
  } else {
    console.log('⚠️  Could not find exact old text, searching for Key Pattern section...\\n');
    // Try broader replacement
    const keyPatternRegex = /When parallel lines are cut by a transversal,[\s\S]*?since \d+° \+ \d+° = 180°\)\./;
    if (keyPatternRegex.test(content)) {
      content = content.replace(keyPatternRegex, newText);
      console.log('✅ Replaced Key Pattern text\\n');
    }
  }

  console.log('💾 Updating database...\\n');

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

  console.log('✅ Key Pattern text fixed!\\n');
  console.log('📊 Changes:');
  console.log('  ✅ Changed: "65° and 115°" → "70° and 110°"');
  console.log('  ✅ Text now matches the diagram\\n');

  return true;
}

fixKeyPatternText().then(success => {
  if (success) {
    console.log('✨ Key Pattern text is now accurate!');
  }
}).catch(err => {
  console.error('❌ Error:', err);
});
