/**
 * Fix Key Takeaways with clean formatting:
 * - Dark green heading
 * - Green checkmarks
 * - No indents
 * - Dark green text
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

console.log('Fetching lesson content...\n');

const { data } = await supabase
  .from('lessons')
  .select('content')
  .eq('lesson_key', 'geometry-angles')
  .single();

let content = data.content;

console.log('Step 1: Remove old Key Takeaways section...');

// Find and remove the entire Key Takeaways section
const keyStart = content.lastIndexOf('<h3');
const searchFrom = content.indexOf('Key Takeaways', keyStart);
const actualKeyStart = content.lastIndexOf('<h3', searchFrom);
const keyEnd = content.indexOf('</ul>', searchFrom) + 5;

content = content.substring(0, actualKeyStart);
console.log('✓ Removed old Key Takeaways');

console.log('\nStep 2: Create clean Key Takeaways...');

// Create clean, properly formatted Key Takeaways
const cleanKeyTakeaways = `<h3 style="color: #2e7d32; font-size: 1.4rem; font-weight: 700; margin: 3rem 0 1.5rem 0;">Key Takeaways</h3>

<ul style="list-style: none; padding: 0; margin: 0;">
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Angle types: Acute (<90°), Right (90°), Obtuse (90°-180°), Straight (180°)
  </li>
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Complementary Angles add to 90°; Supplementary Angles add to 180°
  </li>
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Vertical angles are always equal when two lines intersect
  </li>
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Adjacent angles on a straight line are supplementary (sum to 180°)
  </li>
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Parallel lines + transversal create only TWO angle measures that sum to 180°
  </li>
</ul>`;

// Add to end
content = content.trim() + '\n\n' + cleanKeyTakeaways;

console.log('✓ Created clean Key Takeaways');

// Update database
console.log('\nUpdating database...');
const { error } = await supabase
  .from('lessons')
  .update({ content: content })
  .eq('lesson_key', 'geometry-angles');

if (error) {
  console.error('❌ Error:', error);
  process.exit(1);
}

console.log('✅ Successfully updated Key Takeaways!');
console.log('\nFormatting:');
console.log('✓ Dark green heading (#2e7d32)');
console.log('✓ Green checkmarks (✓) before each item');
console.log('✓ No indents (padding: 0)');
console.log('✓ Dark green text (#2e7d32)');
console.log('✓ Clean spacing');
