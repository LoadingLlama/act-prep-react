/**
 * Final fix for Example headings:
 * - Remove top border completely
 * - Keep dark red left border
 * - Clean styles
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

// Replace Example headings with clean styles - dark red left border only
content = content.replace(
  /<h4[^>]*>Example (\d+)<\/h4>/g,
  (match, num) => {
    return `<h4 style="margin-top: 3rem; margin-bottom: 0.5rem; font-weight: 600; color: #000000; border-left: 4px solid #b91c1c; padding-left: 1rem;">Example ${num}</h4>`;
  }
);

console.log('✓ Replaced all Example headings with clean dark red left border');

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
console.log('\nExample headings now have:');
console.log('- Dark red left border (4px solid #b91c1c)');
console.log('- 1rem left padding');
console.log('- No top border');
console.log('- 3rem top margin');
