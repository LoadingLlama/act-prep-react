/**
 * Check if examples are being detected as examples by the parser
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
  .select('lesson_key, content')
  .eq('lesson_key', 'geometry-angles')
  .single();

console.log('Checking if examples would be detected as "example" sections by parser...\n');

// Test the parser logic
const content = data.content;

// Split by H3 headers
const h3Parts = content.split(/(?=<h3[^>]*>)/);

for (let i = 0; i < h3Parts.length; i++) {
  const part = h3Parts[i].trim();
  if (part.length < 50) continue;

  // Get H3 title
  const h3Match = part.match(/<h3[^>]*>([^<]+)<\/h3>/);
  const h3Title = h3Match ? h3Match[1] : 'Unknown';

  // Check if this section contains examples using parser logic
  const isExampleSection = part.includes('<h4') &&
                          /Example \d+/i.test(part) &&
                          /Problem:/i.test(part) &&
                          /Solution:/i.test(part);

  console.log(`Section ${i}: ${h3Title}`);
  console.log(`  - Has h4: ${part.includes('<h4')}`);
  console.log(`  - Has "Example \\d+": ${/Example \d+/i.test(part)}`);
  console.log(`  - Has "Problem:": ${/Problem:/i.test(part)}`);
  console.log(`  - Has "Solution:": ${/Solution:/i.test(part)}`);
  console.log(`  - Is Example Section: ${isExampleSection}`);

  if (isExampleSection) {
    // Count examples in this section
    const exampleMatches = part.match(/<h4[^>]*>Example \d+<\/h4>/gi);
    console.log(`  - Number of examples: ${exampleMatches?.length || 0}`);

    // Check for diagrams
    const hasDiagrams = part.includes('<svg');
    console.log(`  - Has SVG diagrams: ${hasDiagrams}`);
  }

  console.log('');
}
