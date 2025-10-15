/**
 * Move Key Takeaways to the very end, separated from Example 3
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

console.log('Step 1: Extract Key Takeaways box...');

// Find the Key Takeaways box
const keyTakeawaysStart = content.indexOf('<div class="key-takeaway-box"');

if (keyTakeawaysStart === -1) {
  console.error('❌ Could not find Key Takeaways box');
  process.exit(1);
}

// Find the matching closing </div> for the key-takeaway-box
let depth = 0;
let keyTakeawaysEnd = keyTakeawaysStart;
for (let i = keyTakeawaysStart; i < content.length; i++) {
  if (content.substring(i, i + 4) === '<div') depth++;
  if (content.substring(i, i + 6) === '</div>') {
    depth--;
    if (depth === 0) {
      keyTakeawaysEnd = i + 6;
      break;
    }
  }
}

const keyTakeaways = content.substring(keyTakeawaysStart, keyTakeawaysEnd);
console.log('✓ Extracted Key Takeaways box');

console.log('\nStep 2: Remove Key Takeaways from current position...');
// Remove the Key Takeaways and any whitespace around it
content = content.substring(0, keyTakeawaysStart).trimEnd() + content.substring(keyTakeawaysEnd);
console.log('✓ Removed Key Takeaways');

console.log('\nStep 3: Add spacer section and Key Takeaways at the very end...');

// Add a spacer/separator before Key Takeaways so it's parsed as its own section
const spacer = `

<!-- End of Examples Section -->`;

// Add to the very end
content = content.trim() + spacer + '\n\n' + keyTakeaways;
console.log('✓ Added Key Takeaways to the end');

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
console.log('- Removed Key Takeaways from after Example 3');
console.log('- Added spacer to separate sections');
console.log('- Moved Key Takeaways to absolute end of content');
console.log('- Key Takeaways will now appear after the interactive quiz');
