/**
 * Restore Example 3 and position it after section 4 (Parallel Lines)
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

console.log('Restoring Example 3...');

// Example 3 full content
const example3 = `<h4 style="color: #1a1a1a; font-weight: 600; margin: 2rem 0 1rem 0; font-size: 1.1rem;">Example 3</h4>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0; font-family: 'Times New Roman', Times, Georgia, serif; letter-spacing: 0.01em;">
In the figure below, lines <em>l</em> and <em>m</em> are parallel, and angle 1 measures 65°. What is the measure of angle 5?
</p>

<p><strong>Solution:</strong></p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0; font-family: 'Times New Roman', Times, Georgia, serif; letter-spacing: 0.01em;">
<strong>Step 1:</strong> Recognize that with parallel lines, we have only two angle values, and they sum to 180°.
</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0; font-family: 'Times New Roman', Times, Georgia, serif; letter-spacing: 0.01em;">
<strong>Step 2:</strong> If angle 1 = 65°, the other set of angles = 180° - 65° = 115°.
</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0; font-family: 'Times New Roman', Times, Georgia, serif; letter-spacing: 0.01em;">
<strong>Step 3:</strong> Angle 5 is in the same position as angle 1 (corresponding angles), so angle 5 = 65°.
</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0; font-family: 'Times New Roman', Times, Georgia, serif; letter-spacing: 0.01em;">
Answer the following:
</p>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1.5rem 0; font-family: 'Times New Roman', Times, Georgia, serif; letter-spacing: 0.01em;">
<span style="display: block; margin-bottom: 0.3rem;">A) 25°</span>
<span style="display: block; margin-bottom: 0.3rem;">B) 65°</span>
<span style="display: block; margin-bottom: 0.3rem;">C) 115°</span>
<span style="display: block; margin-bottom: 0.3rem;">D) 90°</span>
</p>

<p style="font-size: 16px; line-height: 1.7; margin: 1rem 0; font-family: 'Times New Roman', Times, Georgia, serif; letter-spacing: 0.01em;">
Answer: B
</p>`;

console.log('✓ Example 3 content prepared');

console.log('\nInserting Example 3 after section 4 (Parallel Lines)...');

// Find the end of Alternate Interior Angles section
// Look for the specific closing </ul> after "These are also equal when lines are parallel"
const section4Pattern = /<li>These are also equal when lines are parallel<\/li>\s*<\/ul>\s*<\/li>\s*<\/ul>/;
const match = content.match(section4Pattern);

if (match) {
  const insertPoint = match.index + match[0].length;
  content = content.slice(0, insertPoint) + '\n\n' + example3 + content.slice(insertPoint);
  console.log('✓ Inserted Example 3 after section 4 (Parallel Lines)');
} else {
  console.log('⚠️ Could not find insertion point, trying alternative...');

  // Alternative: Insert before Key Takeaways
  const keyTakeawaysIdx = content.indexOf('<div class="key-takeaway-box"');
  if (keyTakeawaysIdx !== -1) {
    content = content.slice(0, keyTakeawaysIdx) + example3 + '\n\n' + content.slice(keyTakeawaysIdx);
    console.log('✓ Inserted Example 3 before Key Takeaways');
  } else {
    console.error('❌ Could not find any insertion point');
    process.exit(1);
  }
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
console.log('Example 3 restored and positioned after section 4 (Parallel Lines)');
