/**
 * Fix the unclosed strong tag around "transversal"
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

console.log('Fixing unclosed strong tag...\n');

// Get geometry-angles lesson
const { data: lessonData } = await supabase
  .from('lessons')
  .select('content')
  .eq('lesson_key', 'geometry-angles')
  .single();

let content = lessonData.content;

// Find and fix the broken transversal tag
// It's currently: <strong style="color: #2563eb; text-decoration: underline;">transversal) crosses
// Should be: <strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">transversal</strong>) crosses

const brokenTag = '<strong style="color: #2563eb; text-decoration: underline;">transversal) crosses';
const fixedTag = '<strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">transversal</strong>) crosses';

if (content.includes(brokenTag)) {
  content = content.replace(brokenTag, fixedTag);
  console.log('✅ Fixed the unclosed <strong> tag around "transversal"');
} else {
  console.log('⚠️  Could not find the exact broken tag pattern');
  console.log('Searching for alternative patterns...');

  // Try a more flexible regex
  content = content.replace(
    /<strong style="color: #2563eb; text-decoration: underline;">transversal\) crosses/g,
    '<strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">transversal</strong>) crosses'
  );
  console.log('✅ Fixed using regex pattern');
}

// Verify the fix
const openingTags = (content.match(/<strong[^>]*>/g) || []).length;
const closingTags = (content.match(/<\/strong>/g) || []).length;

console.log('');
console.log('After fix:');
console.log('  Opening tags:', openingTags);
console.log('  Closing tags:', closingTags);
console.log('  Balanced:', openingTags === closingTags ? '✅ YES' : '❌ NO');
console.log('');

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
  console.log('💾 Lesson updated successfully!');
}
