/**
 * Fix examples:
 * 1. Remove "Problem:" text
 * 2. Add dark red line dash to Example 1 and Example 2 headings
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
console.log('Original content length:', content.length);

// Count occurrences before
const problemMatches = content.match(/Problem:/g);
console.log('\nFound "Problem:" occurrences:', problemMatches ? problemMatches.length : 0);

const exampleMatches = content.match(/<h4[^>]*>Example \d+<\/h4>/g);
console.log('Found Example headings:', exampleMatches ? exampleMatches.length : 0);
if (exampleMatches) {
  exampleMatches.forEach(match => console.log('  -', match));
}

// 1. Remove "Problem:" text
content = content.replace(/Problem:\s*/g, '');
console.log('\n✓ Removed "Problem:" text');

// 2. Add dark red left border to Example headings (if not already present)
// Dark red color: #b91c1c
content = content.replace(
  /<h4([^>]*)>Example (\d+)<\/h4>/g,
  (match, attrs, num) => {
    // Check if border-left is already present
    if (attrs.includes('border-left')) {
      return match; // Already has border
    }

    // Add dark red left border
    const style = attrs.match(/style="([^"]*)"/);
    if (style) {
      const newStyle = style[1] + ' border-left: 4px solid #b91c1c; padding-left: 1rem;';
      return `<h4${attrs.replace(/style="[^"]*"/, `style="${newStyle}`)}>Example ${num}</h4>`;
    } else {
      return `<h4${attrs} style="border-left: 4px solid #b91c1c; padding-left: 1rem;">Example ${num}</h4>`;
    }
  }
);

console.log('✓ Added dark red left border to Example headings');

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
console.log('\nChanges:');
console.log('- Removed all "Problem:" text');
console.log('- Added dark red left border to Example headings');
