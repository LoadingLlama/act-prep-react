/**
 * Fix examples rendering and remove blue from Key Takeaways
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

console.log('Step 1: Fixing Key Takeaways - removing blue underlined styling...');

// Remove blue underlined styling from Key Takeaways section
// Find the Key Takeaways section and remove the blue styling
content = content.replace(
  /<strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">Complementary Angles<\/strong>/g,
  'Complementary Angles'
);

content = content.replace(
  /<strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">Supplementary Angles<\/strong>/g,
  'Supplementary Angles'
);

content = content.replace(
  /<strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">Vertical angles<\/strong>/g,
  'Vertical angles'
);

console.log('✓ Removed blue styling from Key Takeaways');

console.log('\nStep 2: Fixing example structure...');

// The examples need proper structure with the answer choices in <span> tags
// Let me rebuild the examples with proper formatting

// Example 1
content = content.replace(
  /<h4[^>]*>Example 1<\/h4>[\s\S]*?Answer: A\s*<\/p>/,
  `<h4 style="margin: 0 0 1rem 0; padding-left: 0.75rem; border-left: 4px solid #b91c1c; color: #000000; font-weight: 700;">Example 1</h4>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">An angle measures 35°. What is its complement? What is its supplement?</p>

<p style="margin: 0.3rem 0 0.5rem 0;">
<span style="font-family: 'Times New Roman', Times, Georgia, serif;">A. Complement: 55°, Supplement: 145°</span><br>
<span style="font-family: 'Times New Roman', Times, Georgia, serif;">B. Complement: 145°, Supplement: 55°</span><br>
<span style="font-family: 'Times New Roman', Times, Georgia, serif;">C. Complement: 45°, Supplement: 155°</span><br>
<span style="font-family: 'Times New Roman', Times, Georgia, serif;">D. Complement: 65°, Supplement: 125°</span><br>
<span style="font-family: 'Times New Roman', Times, Georgia, serif;">E. Complement: 35°, Supplement: 180°</span>
</p>

<p style="font-weight: 600; margin: 1.5rem 0 0.75rem 0; color: #374151;">Solution:</p>

<ul style="margin: 0.3rem 0 0.5rem 0; padding-left: 1.5rem; line-height: 1.5;">
  <li style="margin: 0.15rem 0;">Complement: 90° - 35° = 55°</li>
  <li style="margin: 0.15rem 0;">Supplement: 180° - 35° = 145°</li>
</ul>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">
Answer: A
</p>`
);

// Example 2
content = content.replace(
  /<h4[^>]*>Example 2<\/h4>[\s\S]*?Answer: C\s*<\/p>/,
  `<h4 style="margin: 0 0 1rem 0; padding-left: 0.75rem; border-left: 4px solid #b91c1c; color: #000000; font-weight: 700;">Example 2</h4>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Two lines intersect, creating four angles. One of the angles measures 125°. What are the measures of the other three angles?</p>

<p style="margin: 0.3rem 0 0.5rem 0;">
<span style="font-family: 'Times New Roman', Times, Georgia, serif;">A. 55°, 55°, 125°</span><br>
<span style="font-family: 'Times New Roman', Times, Georgia, serif;">B. 125°, 125°, 55°</span><br>
<span style="font-family: 'Times New Roman', Times, Georgia, serif;">C. 55°, 125°, 125°</span><br>
<span style="font-family: 'Times New Roman', Times, Georgia, serif;">D. 125°, 55°, 55°</span><br>
<span style="font-family: 'Times New Roman', Times, Georgia, serif;">E. 62.5°, 62.5°, 62.5°</span>
</p>

<p style="font-weight: 600; margin: 1.5rem 0 0.75rem 0; color: #374151;">Solution:</p>

<ul style="margin: 0.3rem 0 0.5rem 0; padding-left: 1.5rem; line-height: 1.5;">
  <li style="margin: 0.15rem 0;">Find the vertical angle: It must also be 125° (vertical angles are equal)</li>
  <li style="margin: 0.15rem 0;">Find one adjacent angle: 180° - 125° = 55°</li>
  <li style="margin: 0.15rem 0;">The other adjacent angle is also 55° (it's vertical to the one we just found)</li>
</ul>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">
Answer: C
</p>`
);

// Example 3
content = content.replace(
  /<h4[^>]*>Example 3<\/h4>[\s\S]*?Answer: B\s*<\/p>/,
  `<h4 style="margin: 0 0 1rem 0; padding-left: 0.75rem; border-left: 4px solid #b91c1c; color: #000000; font-weight: 700;">Example 3</h4>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Two parallel lines are cut by a transversal. One of the angles formed measures 65°. What are the possible measures of the other seven angles?</p>

<p style="margin: 0.3rem 0 0.5rem 0;">
<span style="font-family: 'Times New Roman', Times, Georgia, serif;">A. All seven angles are 65°</span><br>
<span style="font-family: 'Times New Roman', Times, Georgia, serif;">B. Three angles are 65° and four are 115°</span><br>
<span style="font-family: 'Times New Roman', Times, Georgia, serif;">C. Four angles are 65° and three are 115°</span><br>
<span style="font-family: 'Times New Roman', Times, Georgia, serif;">D. Six angles are 65° and one is 115°</span><br>
<span style="font-family: 'Times New Roman', Times, Georgia, serif;">E. All eight angles are different</span>
</p>

<p style="font-weight: 600; margin: 1.5rem 0 0.75rem 0; color: #374151;">Solution:</p>

<ul style="margin: 0.3rem 0 0.5rem 0; padding-left: 1.5rem; line-height: 1.5;">
  <li style="margin: 0.15rem 0;">Identify that 65° is an acute angle</li>
  <li style="margin: 0.15rem 0;">All four acute angles = 65°</li>
  <li style="margin: 0.15rem 0;">Find the obtuse angle: 180° - 65° = 115°</li>
  <li style="margin: 0.15rem 0;">All four obtuse angles = 115°</li>
</ul>

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">
Answer: B
</p>`
);

console.log('✓ Fixed all example structures with proper span tags for answer choices');

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
console.log('- Examples now have proper structure with <span> tags');
console.log('- Key Takeaways no longer have blue underlined text');
