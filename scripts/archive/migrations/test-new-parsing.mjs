/**
 * Test new parsing logic
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

// Extract first example
const exampleMatch = data.content.match(/<h4[^>]*>Example 1<\/h4>[\s\S]*?(?=<h4[^>]*>Example|<h3|$)/i);
const content = exampleMatch[0];

console.log('Testing NEW parsing logic:\n');

// Extract problem text
const problemParagraphMatch = content.match(/<p[^>]*>\s*<strong>Problem:<\/strong>\s*(.*?)<\/p>/is);
console.log('Problem match:', problemParagraphMatch ? 'YES' : 'NO');
if (problemParagraphMatch) {
  console.log('Problem text:', problemParagraphMatch[1].trim());
}

// Extract solution
const solutionMatch = content.match(/<p[^>]*>\s*<strong>Solution:<\/strong>\s*<\/p>([\s\S]*?)(?=<h[34]|$)/i);
console.log('\nSolution match:', solutionMatch ? 'YES' : 'NO');
if (solutionMatch) {
  console.log('Solution content:', solutionMatch[1].trim());
}
