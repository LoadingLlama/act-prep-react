/**
 * Find paragraphs with smaller font-size in lesson content
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

// Find all <p> tags with font-size in their style attribute
const pTagsWithFontSize = content.match(/<p[^>]*style="[^"]*font-size:[^"]*"[^>]*>/g);

if (pTagsWithFontSize) {
  console.log(`Found ${pTagsWithFontSize.length} <p> tags with font-size:\n`);
  pTagsWithFontSize.forEach((tag, i) => {
    console.log(`${i + 1}. ${tag}`);
  });
} else {
  console.log('No <p> tags with font-size found');
}

// Also search for the specific text mentioned
const searchText = 'This is one of the most important angle concepts';
const index = content.indexOf(searchText);
if (index !== -1) {
  const context = content.substring(Math.max(0, index - 100), index + 300);
  console.log('\n\nContext around "This is one of the most important angle concepts":');
  console.log('---');
  console.log(context);
  console.log('---');
}
