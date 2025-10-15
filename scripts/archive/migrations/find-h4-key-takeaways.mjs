/**
 * Find the h4 tag for Key Takeaways
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

// Find h4 tag with Key Takeaways
const h4Match = content.match(/<h4[^>]*>.*?Key Takeaways.*?<\/h4>/);
if (h4Match) {
  console.log('Found h4 tag:');
  console.log(h4Match[0]);
} else {
  console.log('Could not find h4 tag with Key Takeaways');
}
