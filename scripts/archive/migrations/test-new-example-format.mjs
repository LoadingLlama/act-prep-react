/**
 * Test new example parsing with answer choices
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

console.log('TESTING PARSER LOGIC:\n');

// Extract problem text
const problemParagraphMatch = content.match(/<p[^>]*>\s*<strong>Problem:<\/strong>\s*(.*?)<\/p>/is);
console.log('1. Problem match:', problemParagraphMatch ? 'YES' : 'NO');
if (problemParagraphMatch) {
  console.log('   Problem text:', problemParagraphMatch[1].trim());
}

// Extract choices
console.log('\n2. Looking for choices...');
const choicesParagraphMatch = content.match(/<p[^>]*>\s*<span[^>]*>([A-E])\.\s*(.*?)<\/span>[\s\S]*?<\/p>\s*<p[^>]*>\s*<strong>Solution:<\/strong>/is);
console.log('   Choices paragraph match:', choicesParagraphMatch ? 'YES' : 'NO');

if (choicesParagraphMatch) {
  const choicesParagraph = choicesParagraphMatch[0];
  console.log('\n   Choices paragraph (first 300 chars):');
  console.log('   ', choicesParagraph.substring(0, 300));

  const spanMatches = choicesParagraph.match(/<span[^>]*>([A-E])\.\s*(.*?)<\/span>/g);
  console.log('\n   Span matches found:', spanMatches ? spanMatches.length : 0);

  if (spanMatches) {
    spanMatches.forEach((match, idx) => {
      const [, letter, text] = match.match(/<span[^>]*>([A-E])\.\s*(.*?)<\/span>/) || [];
      console.log(`   ${idx + 1}. Letter: ${letter}, Text: ${text?.trim()}`);
    });
  }
} else {
  console.log('\n   Choices paragraph NOT FOUND');
  console.log('\n   Let me search for <span> tags directly...');
  const spanMatches = content.match(/<span[^>]*>([A-E])\.\s*(.*?)<\/span>/g);
  console.log('   Direct span matches:', spanMatches ? spanMatches.length : 0);

  if (spanMatches) {
    spanMatches.forEach((match, idx) => {
      console.log(`   ${idx + 1}. ${match.substring(0, 100)}`);
    });
  }
}

// Show the actual content structure
console.log('\n\nFULL EXAMPLE CONTENT:');
console.log(content);
