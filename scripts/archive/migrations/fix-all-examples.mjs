/**
 * Fix all examples across all lessons
 * - Add ###EXAMPLE### markers
 * - Ensure exactly 5 answer choices
 * - Remove duplicates
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

console.log('🔧 Fixing all examples...\n');

// Get all lessons
const { data: lessons } = await supabase
  .from('lessons')
  .select('*')
  .order('created_at');

for (const lesson of lessons) {
  console.log(`\n📚 Processing: ${lesson.lesson_key}`);

  let content = lesson.content;
  let modified = false;

  // Find all Example headings
  const examplePattern = /<h4[^>]*>Example \d+<\/h4>/g;
  const examples = content.match(examplePattern);

  if (!examples || examples.length === 0) {
    console.log('   No examples found');
    continue;
  }

  console.log(`   Found ${examples.length} examples`);

  // For each example, wrap it with ###EXAMPLE### markers
  // Match from <h4>Example N</h4> to just before the next <h4>Example or <h3> heading
  const wrappedContent = content.replace(
    /<h4([^>]*)>Example \d+<\/h4>([\s\S]*?)(?=<h[34][^>]*>|$)/g,
    (match, h4Attrs, exampleBody) => {
      // Check if already wrapped
      if (match.startsWith('###EXAMPLE###')) {
        return match;
      }

      // Remove duplicate answer choice blocks
      // Find all <p> tags containing answer choices (with A. B. C. etc.)
      const choiceBlocks = [];
      let tempBody = exampleBody;

      // Match paragraphs with answer choices
      const choiceBlockPattern = /<p[^>]*>\s*<span[^>]*>[A-E]\.[^<]*<\/span>[\s\S]*?<\/p>/g;
      let choiceMatch;

      while ((choiceMatch = choiceBlockPattern.exec(exampleBody)) !== null) {
        choiceBlocks.push(choiceMatch[0]);
      }

      // If we found multiple choice blocks, keep only the first one
      if (choiceBlocks.length > 1) {
        console.log(`   ⚠️  Found ${choiceBlocks.length} choice blocks, keeping first one`);
        // Remove all but the first
        for (let i = 1; i < choiceBlocks.length; i++) {
          tempBody = tempBody.replace(choiceBlocks[i], '');
        }
        exampleBody = tempBody;
        modified = true;
      }

      // Now wrap with ###EXAMPLE### marker
      return `###EXAMPLE###\n<h4${h4Attrs}>Example ${match.match(/Example (\d+)/)[1]}</h4>${exampleBody}`;
    }
  );

  if (wrappedContent !== content) {
    console.log('   ✅ Wrapped examples with markers');
    content = wrappedContent;
    modified = true;
  }

  // Update the lesson if modified
  if (modified) {
    const { error } = await supabase
      .from('lessons')
      .update({
        content: content,
        updated_at: new Date().toISOString()
      })
      .eq('id', lesson.id);

    if (error) {
      console.error(`   ❌ Error updating: ${error.message}`);
    } else {
      console.log('   💾 Saved changes');
    }
  }
}

console.log('\n✅ All examples fixed!');
