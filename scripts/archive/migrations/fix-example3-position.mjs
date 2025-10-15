/**
 * Insert Example 3 after section 4 (Parallel Lines)
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

console.log('Fetching geometry-angles lesson...\n');

const { data, error } = await supabase
  .from('lessons')
  .select('content')
  .eq('lesson_key', 'geometry-angles')
  .single();

if (error) {
  console.error('Error fetching lesson:', error);
  process.exit(1);
}

let content = data.content;

console.log('Step 1: Extract Example 3...');

// Extract Example 3 (Parallel lines)
const example3Match = content.match(/<h4[^>]*>Example 3<\/h4>[\s\S]*?Answer: B\s*<\/p>/);
const example3 = example3Match ? example3Match[0] : null;

if (!example3) {
  console.error('❌ Could not find Example 3');
  process.exit(1);
}

console.log('✓ Extracted Example 3');

console.log('\nStep 2: Remove Example 3 from current location...');
content = content.replace(example3, '');
console.log('✓ Removed Example 3');

console.log('\nStep 3: Insert Example 3 after Alternate Interior Angles section...');

// Find the end of Alternate Interior Angles section
// Look for the specific closing </ul> after "These are also equal when lines are parallel"
const section4Pattern = /<li>These are also equal when lines are parallel<\/li>\s*<\/ul>\s*<\/li>\s*<\/ul>/;
const match = content.match(section4Pattern);

if (match) {
  const insertPoint = match.index + match[0].length;
  content = content.slice(0, insertPoint) + '\n\n' + example3 + content.slice(insertPoint);
  console.log('✓ Inserted Example 3 after section 4 (Parallel Lines)');
} else {
  console.log('⚠️ Could not find insertion point for Example 3');
}

// Update the database
console.log('\nUpdating database...');
const { error: updateError } = await supabase
  .from('lessons')
  .update({ content: content })
  .eq('lesson_key', 'geometry-angles');

if (updateError) {
  console.error('❌ Error updating:', updateError);
  process.exit(1);
}

console.log('✅ Successfully updated lesson!');
console.log('Example 3 now appears after section 4 (Parallel Lines)');
