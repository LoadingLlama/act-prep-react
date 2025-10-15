/**
 * Debug script to examine example HTML structure
 * and test the answer extraction regex
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

const content = data.content;

// Extract all examples from the content
const exampleMatches = content.matchAll(/<h4[^>]*>Example \d+<\/h4>([\s\S]*?)(?=<h[34]|$)/gi);

let exampleNum = 1;
for (const match of exampleMatches) {
  const exampleContent = match[1];

  console.log(`\n${'='.repeat(80)}`);
  console.log(`EXAMPLE ${exampleNum}`);
  console.log('='.repeat(80));

  // Extract problem text
  let textAfterTitle = exampleContent;
  const textBeforeChoicesMatch = textAfterTitle.match(/(.*?)(?:<p[^>]*>\s*<span[^>]*>[A-E]\.|<p[^>]*>\s*<strong>Solution:<\/strong>)/is);
  if (textBeforeChoicesMatch) {
    const problemText = textBeforeChoicesMatch[1]
      .trim()
      .replace(/<\/?p[^>]*>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
    console.log('\nPROBLEM TEXT:');
    console.log(problemText);
  }

  // Extract choices
  const choicesParagraphMatch = exampleContent.match(/<p[^>]*>\s*<span[^>]*>([A-E])\.\s*(.*?)<\/span>[\s\S]*?<\/p>\s*<p[^>]*>\s*<strong>Solution:<\/strong>/is);
  if (choicesParagraphMatch) {
    console.log('\nCHOICES PARAGRAPH FOUND:');
    const choicesParagraph = choicesParagraphMatch[0];
    const spanMatches = choicesParagraph.match(/<span[^>]*>([A-E])\.\s*(.*?)<\/span>/g);
    if (spanMatches) {
      console.log('\nEXTRACTED CHOICES:');
      spanMatches.forEach(match => {
        const [, letter, text] = match.match(/<span[^>]*>([A-E])\.\s*(.*?)<\/span>/) || [];
        console.log(`  ${letter}. ${text?.trim()}`);
      });
    }
  }

  // Extract solution
  const solutionMatch = exampleContent.match(/<p[^>]*>\s*<strong>Solution:<\/strong>\s*<\/p>([\s\S]*?)(?=<h[34]|$)/i);
  if (solutionMatch) {
    const solutionContent = solutionMatch[1].trim();
    console.log('\nSOLUTION CONTENT (raw HTML):');
    console.log(solutionContent.substring(0, 500));

    // Try to extract correct answer
    console.log('\n\nTESTING ANSWER EXTRACTION PATTERNS:');

    // Pattern 1: <strong>Answer: X</strong>
    const pattern1 = solutionContent.match(/<strong>Answer:\s*([A-E])<\/strong>/i);
    console.log(`Pattern 1 (<strong>Answer: X</strong>): ${pattern1 ? pattern1[1] : 'NO MATCH'}`);

    // Pattern 2: Answer: X (without strong tags)
    const pattern2 = solutionContent.match(/Answer:\s*([A-E])/i);
    console.log(`Pattern 2 (Answer: X): ${pattern2 ? pattern2[1] : 'NO MATCH'}`);

    // Pattern 3: <strong>Answer: </strong>X or Answer: </strong>X
    const pattern3 = solutionContent.match(/Answer:\s*<\/strong>\s*([A-E])/i);
    console.log(`Pattern 3 (Answer: </strong>X): ${pattern3 ? pattern3[1] : 'NO MATCH'}`);

    // Pattern 4: Look for the answer anywhere in the solution
    const pattern4 = solutionContent.match(/<strong>\s*([A-E])\s*<\/strong>/i);
    console.log(`Pattern 4 (<strong>X</strong> anywhere): ${pattern4 ? pattern4[1] : 'NO MATCH'}`);
  }

  exampleNum++;
}

console.log('\n' + '='.repeat(80));
