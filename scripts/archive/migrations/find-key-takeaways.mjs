/**
 * Find the Key Takeaways section to see its structure
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const { data } = await supabase
  .from('lessons')
  .select('content')
  .eq('lesson_key', 'geometry-angles')
  .single();

const content = data.content;

// Find Key Takeaways section
const keyTakeawaysIndex = content.indexOf('Key Takeaways');
if (keyTakeawaysIndex !== -1) {
  // Show 1000 characters after "Key Takeaways"
  const context = content.substring(keyTakeawaysIndex, keyTakeawaysIndex + 1000);
  console.log('Key Takeaways section:');
  console.log('---');
  console.log(context);
  console.log('---');
}
