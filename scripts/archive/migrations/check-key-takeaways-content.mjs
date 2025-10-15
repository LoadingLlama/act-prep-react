/**
 * Check the Key Takeaways content
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

console.log('Checking Key Takeaways content...\n');

const { data } = await supabase
  .from('lessons')
  .select('content')
  .eq('lesson_key', 'geometry-angles')
  .single();

// Find Key Takeaways section
const keyStart = data.content.indexOf('Key Takeaways');
if (keyStart === -1) {
  console.log('❌ Key Takeaways not found!');
  process.exit(1);
}

// Get the Key Takeaways section (from <h3> to end)
const h3Start = data.content.lastIndexOf('<h3', keyStart);
const keyTakeawaysContent = data.content.substring(h3Start);

console.log('=== KEY TAKEAWAYS CONTENT ===\n');
console.log(keyTakeawaysContent);
console.log('\n=== END ===\n');

console.log('Length:', keyTakeawaysContent.length, 'characters');
console.log('Starts with H3?', keyTakeawaysContent.startsWith('<h3'));

// Check if it will pass the 50 character minimum
console.log('Passes 50 char minimum?', keyTakeawaysContent.length > 50 ? 'YES ✓' : 'NO ✗');
