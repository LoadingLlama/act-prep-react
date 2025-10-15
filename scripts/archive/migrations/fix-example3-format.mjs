/**
 * Fix Example 3 format to match Examples 1 and 2
 * Also move Key Takeaways after the interactive quiz
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

console.log('Step 1: Fix Example 3 format...');

// Remove the old broken Example 3
const example3Start = content.indexOf('<h4 style="color: #1a1a1a; font-weight: 600; margin: 2rem 0 1rem 0; font-size: 1.1rem;">Example 3</h4>');
const example3End = content.indexOf('<div class="key-takeaway-box"', example3Start);

if (example3Start === -1) {
  console.error('❌ Could not find Example 3');
  process.exit(1);
}

// Extract everything between Example 3 and Key Takeaways
const oldExample3 = content.substring(example3Start, example3End);
console.log('✓ Found old Example 3');

// Create properly formatted Example 3 matching Examples 1 and 2
const newExample3 = `<h4 style="margin: 0 0 1rem 0; padding-left: 0.75rem; border-left: 4px solid #b91c1c; color: #000000; font-weight: 700;">Example 3</h4>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">In the figure below, lines <em>l</em> and <em>m</em> are parallel, and angle 1 measures 65°. What is the measure of angle 5?</p>

<p style="margin: 0.3rem 0 0.5rem 0;">
<span style="font-family: 'Times New Roman', Times, Georgia, serif;">A. 25°</span><br>
<span style="font-family: 'Times New Roman', Times, Georgia, serif;">B. 65°</span><br>
<span style="font-family: 'Times New Roman', Times, Georgia, serif;">C. 115°</span><br>
<span style="font-family: 'Times New Roman', Times, Georgia, serif;">D. 90°</span><br>
<span style="font-family: 'Times New Roman', Times, Georgia, serif;">E. 180°</span>
</p>

<p style="margin: 1.5rem 0 0.75rem 0;"><strong>Solution:</strong></p>

<ul style="margin: 0.3rem 0 0.5rem 0; padding-left: 1.5rem; line-height: 1.5;">
  <li style="margin: 0.15rem 0;">Recognize that with parallel lines, we have only two angle values, and they sum to 180°</li>
  <li style="margin: 0.15rem 0;">If angle 1 = 65°, the other set of angles = 180° - 65° = 115°</li>
  <li style="margin: 0.15rem 0;">Angle 5 is in the same position as angle 1 (corresponding angles), so angle 5 = 65°</li>
</ul>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">
Answer: B
</p>

`;

// Replace old Example 3 with new one
content = content.substring(0, example3Start) + newExample3 + content.substring(example3End);
console.log('✓ Replaced Example 3 with clean format');

console.log('\nStep 2: Move Key Takeaways after the interactive quiz...');

// Extract Key Takeaways
const keyTakeawaysStart = content.indexOf('<div class="key-takeaway-box"');
const keyTakeawaysEnd = content.indexOf('</div>', keyTakeawaysStart) + 6;

if (keyTakeawaysStart === -1) {
  console.error('❌ Could not find Key Takeaways');
  process.exit(1);
}

// Find the closing div properly (need to find the matching closing tag)
let depth = 0;
let actualEnd = keyTakeawaysStart;
for (let i = keyTakeawaysStart; i < content.length; i++) {
  if (content.substring(i, i + 4) === '<div') depth++;
  if (content.substring(i, i + 6) === '</div>') {
    depth--;
    if (depth === 0) {
      actualEnd = i + 6;
      break;
    }
  }
}

const keyTakeaways = content.substring(keyTakeawaysStart, actualEnd);
console.log('✓ Extracted Key Takeaways');

// Remove Key Takeaways from current position
content = content.substring(0, keyTakeawaysStart) + content.substring(actualEnd);
console.log('✓ Removed Key Takeaways from current position');

// Find the end of content (just append to the very end)
content = content.trim() + '\n\n' + keyTakeaways;
console.log('✓ Moved Key Takeaways to end of content');

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
console.log('- Fixed Example 3 to match Examples 1 & 2 format');
console.log('- Answer choices now use clean <br> format');
console.log('- Solution is now a clean bullet list');
console.log('- Moved Key Takeaways to end after quiz');
