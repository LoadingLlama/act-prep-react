/**
 * Add H3 header before Key Takeaways to separate it from Example 3
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

console.log('Step 1: Find Key Takeaways box...');

const keyTakeawaysStart = content.indexOf('<div class="key-takeaway-box"');

if (keyTakeawaysStart === -1) {
  console.error('❌ Could not find Key Takeaways');
  process.exit(1);
}

console.log('✓ Found Key Takeaways at position:', keyTakeawaysStart);

console.log('\nStep 2: Find Example 3 end (Answer: B)...');

// Find where Example 3 actually ends (after "Answer: B")
const example3Start = content.indexOf('Example 3');
const answerBIndex = content.indexOf('Answer: B', example3Start);

if (answerBIndex === -1) {
  console.error('❌ Could not find Answer: B');
  process.exit(1);
}

// Find the closing </p> after "Answer: B"
const answerEndIndex = content.indexOf('</p>', answerBIndex) + 4;
console.log('✓ Example 3 ends at position:', answerEndIndex);

console.log('\nStep 3: Remove comment and insert H3 section before Key Takeaways...');

// Remove the comment
content = content.replace('<!-- End of Examples Section -->', '');

// Find Key Takeaways again after removal
const keyPos = content.indexOf('<div class="key-takeaway-box"');

// Insert an invisible H3 section that will cause the parser to split here
// This H3 won't be visible but will separate the sections
const separator = `

<h3 style="display: none;">Summary</h3>

`;

// Insert the separator right before Key Takeaways
content = content.slice(0, keyPos) + separator + content.slice(keyPos);

console.log('✓ Added H3 separator before Key Takeaways');

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
console.log('- Added hidden H3 separator before Key Takeaways');
console.log('- Parser will now treat Key Takeaways as separate section');
console.log('- Key Takeaways will appear after the quiz');
