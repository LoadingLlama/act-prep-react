/**
 * Find the unclosed strong tag
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

let content = data.content;

// Find all strong tags with their positions
const strongOpenRegex = /<strong[^>]*>/g;
const strongCloseRegex = /<\/strong>/g;

let match;
const openPositions = [];
const closePositions = [];

while ((match = strongOpenRegex.exec(content)) !== null) {
  openPositions.push({ pos: match.index, text: match[0] });
}

while ((match = strongCloseRegex.exec(content)) !== null) {
  closePositions.push({ pos: match.index });
}

console.log('Opening tags:', openPositions.length);
console.log('Closing tags:', closePositions.length);
console.log('');

// Show context around each opening tag
console.log('All strong opening tags:');
openPositions.forEach((open, idx) => {
  const context = content.substring(open.pos, open.pos + 150);
  console.log(`\n${idx + 1}. Position ${open.pos}:`);
  console.log(`   ${context.substring(0, 100)}...`);
});
