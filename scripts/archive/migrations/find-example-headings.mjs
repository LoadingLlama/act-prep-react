/**
 * Find how Example headings are styled
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

// Find all h4 tags with "Example" in them
const exampleH4s = content.match(/<h4[^>]*>Example[^<]*<\/h4>/g);

if (exampleH4s) {
  console.log(`Found ${exampleH4s.length} Example h4 tags:\n`);
  exampleH4s.forEach((tag, i) => {
    console.log(`${i + 1}. ${tag}`);
  });
} else {
  console.log('No Example h4 tags found');
}
