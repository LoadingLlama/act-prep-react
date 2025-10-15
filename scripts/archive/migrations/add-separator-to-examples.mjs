/**
 * Add horizontal separator line above Example headings
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

// Add horizontal line before Example headings
// Add <hr> with subtle styling before each Example h4
content = content.replace(
  /<h4 style="([^"]*)">Example (\d+)<\/h4>/g,
  (match, styles, num) => {
    return `<hr style="border: none; border-top: 1px solid #e5e7eb; margin: 4rem 0 2rem 0;">
<h4 style="${styles}">Example ${num}</h4>`;
  }
);

console.log('✓ Added horizontal separator lines above Example headings');

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
console.log('Example headings now have:');
console.log('- Horizontal separator line above (4rem margin-top, 2rem margin-bottom)');
console.log('- Dark red left border');
