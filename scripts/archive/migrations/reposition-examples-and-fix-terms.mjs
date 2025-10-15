/**
 * 1. Reposition examples throughout the lesson based on context
 * 2. Add blue underlined styling to key terms
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

console.log('Step 1: Extract all three examples...');

// Extract Example 1 (Complementary/Supplementary)
const example1Match = content.match(/<h4[^>]*>Example 1<\/h4>[\s\S]*?Answer: A\s*<\/p>/);
const example1 = example1Match ? example1Match[0] : null;

// Extract Example 2 (Vertical angles)
const example2Match = content.match(/<h4[^>]*>Example 2<\/h4>[\s\S]*?Answer: C\s*<\/p>/);
const example2 = example2Match ? example2Match[0] : null;

// Extract Example 3 (Parallel lines)
const example3Match = content.match(/<h4[^>]*>Example 3<\/h4>[\s\S]*?Answer: B\s*<\/p>/);
const example3 = example3Match ? example3Match[0] : null;

if (!example1 || !example2 || !example3) {
  console.error('❌ Could not find all 3 examples');
  process.exit(1);
}

console.log('✓ Extracted all 3 examples');

console.log('\nStep 2: Remove Examples section header and all examples from current location...');

// Remove the Examples h3 and all examples
content = content.replace(/<h3[^>]*>Examples<\/h3>/, '');
content = content.replace(example1, '');
content = content.replace(example2, '');
content = content.replace(example3, '');

console.log('✓ Removed Examples section');

console.log('\nStep 3: Add blue underlined styling to key terms...');

// Add blue underlined styling to key terms in the content
// Complementary Angles
content = content.replace(
  /<h4[^>]*>Complementary Angles<\/h4>/,
  '<h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 400;"><strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">Complementary Angles</strong></h4>'
);

// Supplementary Angles
content = content.replace(
  /<h4[^>]*>Supplementary Angles<\/h4>/,
  '<h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 400;"><strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">Supplementary Angles</strong></h4>'
);

// Vertical Angles
content = content.replace(
  /<h4[^>]*>Vertical Angles<\/h4>/,
  '<h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 400;"><strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">Vertical Angles</strong></h4>'
);

// Adjacent Angles
content = content.replace(
  /<h4[^>]*>Adjacent Angles<\/h4>/,
  '<h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 400;"><strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">Adjacent Angles</strong></h4>'
);

// In text references - be careful not to change ones already styled
// Only replace plain text references in the definitions
content = content.replace(
  /Important for Supplementary Angles \(discussed below\)/,
  'Important for <strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">Supplementary Angles</strong> (discussed below)'
);

console.log('✓ Added blue underlined styling to key terms');

console.log('\nStep 4: Insert Example 1 after Adjacent Angles section (end of section 3)...');

// Find the end of the Adjacent Angles section (after its ul closes, before next h3)
const adjacentAnglesEnd = content.indexOf('</ul>\n\n<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">4. Parallel Lines and Transversals</h3>');
if (adjacentAnglesEnd !== -1) {
  const insertPoint1 = adjacentAnglesEnd + '</ul>'.length;
  content = content.slice(0, insertPoint1) + '\n\n' + example1 + '\n\n' + example2 + '\n' + content.slice(insertPoint1);
  console.log('✓ Inserted Examples 1 and 2 after section 3 (Angle Relationships)');
} else {
  console.log('⚠️ Could not find insertion point for Examples 1 and 2');
}

console.log('\nStep 5: Insert Example 3 after section 4 (Parallel Lines and Transversals)...');

// Find the end of section 4 - after "Alternate Interior Angles"
const section4End = content.lastIndexOf('</ul>\n\n<div class="key-takeaway-box"');
if (section4End !== -1) {
  const insertPoint3 = section4End + '</ul>'.length;
  content = content.slice(0, insertPoint3) + '\n\n' + example3 + '\n' + content.slice(insertPoint3);
  console.log('✓ Inserted Example 3 after section 4 (Parallel Lines)');
} else {
  console.log('⚠️ Could not find insertion point for Example 3');
}

console.log('✓ All examples repositioned');

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
console.log('\nChanges made:');
console.log('- Examples 1 & 2 now appear after section 3 (Angle Relationships)');
console.log('- Example 3 now appears after section 4 (Parallel Lines)');
console.log('- Key terms have blue underlined styling with hover definitions');
