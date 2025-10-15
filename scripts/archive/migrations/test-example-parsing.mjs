/**
 * Test what InteractiveExample component would see
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

const exampleContent = exampleMatch ? exampleMatch[0] : null;

if (!exampleContent) {
  console.log('NO EXAMPLE FOUND!');
  process.exit(1);
}

console.log('Example content that InteractiveExample would receive:\n');
console.log(exampleContent);

console.log('\n\n' + '='.repeat(60));
console.log('Testing parser logic from InteractiveExample:');
console.log('='.repeat(60));

// Test problem extraction
const problemMatch = exampleContent.match(/<strong>Problem:<\/strong><\/p>([\s\S]*?)(?=<p[^>]*><strong>Solution:)/i);
console.log('\nProblem match:', problemMatch ? 'YES' : 'NO');
if (problemMatch) {
  console.log('Problem content length:', problemMatch[1].trim().length);
}

// Test solution extraction
const solutionMatch = exampleContent.match(/<strong>Solution:<\/strong><\/p>([\s\S]*?)(?=<h[34]|$)/i);
console.log('\nSolution match:', solutionMatch ? 'YES' : 'NO');
if (solutionMatch) {
  console.log('Solution content length:', solutionMatch[1].trim().length);
  console.log('Solution content:', solutionMatch[1].trim());
}
