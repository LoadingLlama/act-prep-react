/**
 * Fix Examples:
 * 1. Remove letter labels from Examples (breaks parser)
 * 2. Add visual separation (light background, border)
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

console.log('╔══════════════════════════════════════════════════════════╗');
console.log('║     FIXING EXAMPLES                                     ║');
console.log('║     1. Remove letter labels                             ║');
console.log('║     2. Add visual separation                            ║');
console.log('╚══════════════════════════════════════════════════════════╝\n');

const { data } = await supabase
  .from('lessons')
  .select('lesson_key, content')
  .in('lesson_key', ['geometry-angles', 'geometry-shapes']);

for (const lesson of data) {
  let updatedContent = lesson.content;

  // STEP 1: Remove letter labels from Examples
  const beforeLabels = (updatedContent.match(/<h4[^>]*>[a-z]\) Example/g) || []).length;

  updatedContent = updatedContent.replace(
    /<h4([^>]*)>([a-z])\) (Example \d+)<\/h4>/g,
    '<h4$1>$3</h4>'
  );

  const afterLabels = (updatedContent.match(/<h4[^>]*>[a-z]\) Example/g) || []).length;
  console.log(lesson.lesson_key + ':');
  console.log('  Removed', beforeLabels - afterLabels, 'letter labels from Examples');

  // STEP 2: Add visual styling to Example headings
  // Change Example H4s to have a border-top for visual separation
  updatedContent = updatedContent.replace(
    /<h4 style="margin-top: 2rem; margin-bottom: 0\.5rem; font-weight: 500;">(Example \d+)<\/h4>/g,
    '<h4 style="margin-top: 3rem; padding-top: 2rem; margin-bottom: 0.5rem; font-weight: 600; border-top: 2px solid #e5e7eb; color: #2563eb;">$1</h4>'
  );

  console.log('  ✅ Added visual separation to Examples');

  await supabase
    .from('lessons')
    .update({
      content: updatedContent,
      updated_at: new Date().toISOString()
    })
    .eq('lesson_key', lesson.lesson_key);
}

console.log('\n✅ Examples fixed!');
console.log('\nChanges:');
console.log('  - Examples have NO letter labels (parser works now)');
console.log('  - Examples have border-top for visual separation');
console.log('  - Examples use blue color and slightly bolder font');
console.log('  - Examples have extra top margin/padding');
