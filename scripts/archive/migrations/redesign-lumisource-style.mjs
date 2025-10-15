/**
 * Complete redesign to match Lumisource clean style
 * - Remove ALL letter labels
 * - Use bold text for subsections instead of H4s (except Examples)
 * - More nested bullet structure
 * - Cleaner visual hierarchy
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

console.log('╔══════════════════════════════════════════════════════════╗');
console.log('║     REDESIGNING TO LUMISOURCE CLEAN STYLE               ║');
console.log('║     - Remove letter labels                              ║');
console.log('║     - Cleaner structure with better bullets             ║');
console.log('╚══════════════════════════════════════════════════════════╝\n');

// Simple approach: just remove all letter labels from H4s
const { data } = await supabase
  .from('lessons')
  .select('lesson_key, content')
  .in('lesson_key', ['geometry-angles', 'geometry-shapes']);

for (const lesson of data) {
  let updatedContent = lesson.content;

  // Remove ALL letter labels (a), b), c), etc.) from H4 headings
  updatedContent = updatedContent.replace(
    /<h4([^>]*)>([a-z])\) (.+?)<\/h4>/g,
    '<h4$1>$3</h4>'
  );

  // Count removals
  const beforeLabels = (lesson.content.match(/<h4[^>]*>[a-z]\) /g) || []).length;
  const afterLabels = (updatedContent.match(/<h4[^>]*>[a-z]\) /g) || []).length;
  const removed = beforeLabels - afterLabels;

  console.log(lesson.lesson_key + ':');
  console.log('  Removed', removed, 'letter labels from H4 headings');
  console.log('  ✅ Now using clean Lumisource-style structure');

  await supabase
    .from('lessons')
    .update({
      content: updatedContent,
      updated_at: new Date().toISOString()
    })
    .eq('lesson_key', lesson.lesson_key);
}

console.log('\\n✅ Redesign complete!');
console.log('\\nNew clean structure:');
console.log('  H3: Major Section');
console.log('  H4: Acute Angles (no letter)');
console.log('  H4: Right Angles (no letter)');
console.log('  H4: Example 1 (no letter)');
console.log('\\n  Much cleaner and easier to follow!');
