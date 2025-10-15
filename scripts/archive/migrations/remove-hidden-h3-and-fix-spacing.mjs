/**
 * Remove the hidden H3 and ensure Key Takeaways is properly spaced at the end
 * Add extra paragraphs before it so it renders after the quiz
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

console.log('Step 1: Remove hidden H3...');

// Remove the hidden H3
content = content.replace('<h3 style="display: none;">Summary</h3>', '');
console.log('✓ Removed hidden H3');

console.log('\nStep 2: Ensure Key Takeaways box displays without typewriter...');

// The Key Takeaways section should render instantly without typing animation
// Add lots of spacing/paragraphs before it to push it into its own section
// and ensure it appears after the quiz

const keyStart = content.indexOf('<div class="key-takeaway-box"');

// Add spacer content that will make this a separate section
const spacer = `<p style="height: 1px; margin: 0; padding: 0;"></p>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700; visibility: hidden; height: 0; margin: 0; padding: 0; overflow: hidden;">.</h3>

`;

// Insert spacer before Key Takeaways
content = content.slice(0, keyStart) + spacer + content.slice(keyStart);

console.log('✓ Added section break before Key Takeaways');

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
console.log('- Removed hidden H3 that was causing rendering issues');
console.log('- Added proper section break before Key Takeaways');
console.log('- Key Takeaways will render correctly with green box');
