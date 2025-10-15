/**
 * Fix blue bold to ONLY apply to key term names, not descriptive phrases
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

console.log('Fixing blue bold usage...\n');

// Get geometry-angles lesson
const { data: lessonData } = await supabase
  .from('lessons')
  .select('content')
  .eq('lesson_key', 'geometry-angles')
  .single();

let content = lessonData.content;

// First, revert ALL blue bold back to regular bold
content = content.replace(/<strong style="color: #2563eb; font-weight: 600;">/g, '<strong>');

console.log('✓ Reverted all blue bold to regular bold\n');

// Now ONLY apply blue bold to actual key term names
// These should be the H4 headers that introduce the terms
const keyTermHeaders = [
  'Acute Angles',
  'Right Angles',
  'Obtuse Angles',
  'Straight Angles',
  'Reflex Angles',
  'Complementary Angles',
  'Supplementary Angles',
  'Vertical Angles',
  'Adjacent Angles'
];

console.log('Applying blue bold to key terms in H4 headers:\n');

let count = 0;
keyTermHeaders.forEach(term => {
  // Match the term when it appears in an H4 header or as the first mention in a definition
  const h4Regex = new RegExp(`(<h4[^>]*>)(${term})`, 'g');
  const matches = content.match(h4Regex);

  if (matches) {
    content = content.replace(
      h4Regex,
      `$1<strong style="color: #2563eb; font-weight: 600;">${term}</strong>`
    );
    count += matches.length;
    console.log(`  ✓ ${term}`);
  }
});

console.log(`\n✅ Applied blue bold to ${count} key terms\n`);

// Update in database
const { error } = await supabase
  .from('lessons')
  .update({
    content: content,
    updated_at: new Date().toISOString()
  })
  .eq('lesson_key', 'geometry-angles');

if (error) {
  console.error('❌ Error:', error);
} else {
  console.log('💾 Successfully updated lesson!');
  console.log('   - Key term names: blue bold');
  console.log('   - Everything else: regular bold');
}
