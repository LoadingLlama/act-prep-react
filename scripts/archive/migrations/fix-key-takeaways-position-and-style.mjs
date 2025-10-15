/**
 * Fix Key Takeaways:
 * 1. Add green box styling
 * 2. Move it to the end (after quiz position)
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

console.log('Step 1: Extract Key Takeaways section...');

// Extract the Key Takeaways section (h3 title + ul list)
const keyTakeawaysMatch = content.match(/<h3[^>]*>Key Takeaways<\/h3>[\s\S]*?<\/ul>/);
if (!keyTakeawaysMatch) {
  console.error('❌ Could not find Key Takeaways section');
  process.exit(1);
}

const keyTakeawaysSection = keyTakeawaysMatch[0];
console.log('✓ Found Key Takeaways section');

console.log('\nStep 2: Remove Key Takeaways from current position...');
content = content.replace(keyTakeawaysSection, '<!-- KEY_TAKEAWAYS_MOVED -->');
console.log('✓ Removed from current position');

console.log('\nStep 3: Add green box styling and move to end...');

// The styled Key Takeaways with green box
const styledKeyTakeaways = `
<div class="key-takeaway-box" style="background: linear-gradient(135deg, #e8f5e9 0%, #f1f8f1 100%); border: 2px solid #4caf50; border-radius: 12px; padding: 2rem; margin: 3rem 0;">
  <h3 style="color: #2e7d32; font-size: 1.6rem; font-weight: 800; margin: 0 0 1.5rem 0; border-bottom: 2px solid #4caf50; padding-bottom: 0.75rem; display: flex; align-items: center; gap: 0.5rem;">
    Key Takeaways
  </h3>
  <ul style="list-style: none; padding-left: 0; margin: 0;">
    <li style="padding-left: 2rem; margin-bottom: 1rem; position: relative; color: #1b5e20; font-size: 16px; line-height: 1.7;">
      <span style="position: absolute; left: 0; color: #4caf50; font-weight: bold; font-size: 1.2rem;">✓</span>
      Angle types: Acute (<90°), Right (90°), Obtuse (90°-180°), Straight (180°)
    </li>
    <li style="padding-left: 2rem; margin-bottom: 1rem; position: relative; color: #1b5e20; font-size: 16px; line-height: 1.7;">
      <span style="position: absolute; left: 0; color: #4caf50; font-weight: bold; font-size: 1.2rem;">✓</span>
      Complementary Angles add to 90°; Supplementary Angles add to 180°
    </li>
    <li style="padding-left: 2rem; margin-bottom: 1rem; position: relative; color: #1b5e20; font-size: 16px; line-height: 1.7;">
      <span style="position: absolute; left: 0; color: #4caf50; font-weight: bold; font-size: 1.2rem;">✓</span>
      Vertical angles are always equal when two lines intersect
    </li>
    <li style="padding-left: 2rem; margin-bottom: 1rem; position: relative; color: #1b5e20; font-size: 16px; line-height: 1.7;">
      <span style="position: absolute; left: 0; color: #4caf50; font-weight: bold; font-size: 1.2rem;">✓</span>
      Adjacent angles on a straight line are supplementary (sum to 180°)
    </li>
    <li style="padding-left: 2rem; margin-bottom: 1rem; position: relative; color: #1b5e20; font-size: 16px; line-height: 1.7;">
      <span style="position: absolute; left: 0; color: #4caf50; font-weight: bold; font-size: 1.2rem;">✓</span>
      Parallel lines + transversal create only TWO angle measures that sum to 180°
    </li>
  </ul>
</div>`;

// Append to the end of the content
content = content + '\n\n' + styledKeyTakeaways;

console.log('✓ Added styled Key Takeaways to end of content');

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
console.log('Key Takeaways now:');
console.log('- Has green box styling');
console.log('- Has dark green title');
console.log('- Positioned at the end (after quiz)');
