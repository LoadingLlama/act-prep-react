/**
 * Fix Broken Answer Choices HTML
 * All examples have missing opening <span> tags
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function fixAnswerChoices() {
  console.log('🔧 Fixing broken answer choice HTML...\n');
  console.log('='.repeat(70));
  console.log('\n');

  const { data: lesson } = await supabase
    .from('lessons')
    .select('*')
    .eq('lesson_key', 'geometry-angles')
    .single();

  let content = lesson.content;

  console.log('📝 Fixing answer choices in all examples...\n');

  // The problem: Answer choices look like this (BROKEN):
  //   <span ...>A. 20°</span>
  //   B. 70°</span>
  //   C. 90°</span>
  //   etc.
  //
  // Should be:
  //   <span ...>A. 20°</span>
  //   <span ...>B. 70°</span>
  //   <span ...>C. 90°</span>

  // Fix pattern: Find standalone answer choices (B-E) that are missing opening tags
  // They appear as: whitespace + letter + ". " + number + "°</span>"

  // Example 1: 20°, 70°, 90°, 110°, 140°
  // Example 2: 35°, 55°, 90°, 125°, 145°
  // Example 3: 30°, 60°, 90°, 120°, 150°

  // Generic pattern to fix any "Letter. Number°</span>" without opening tag
  // Match: newline/whitespace + [B-E]. + digits + °</span>
  const brokenPattern = /(\s+)([B-E])\.\s+(\d+)°<\/span>/g;

  const fixedContent = content.replace(
    brokenPattern,
    '$1<span style="display: inline-block; margin-right: 1rem; font-size: 0.9rem;">$2. $3°</span>'
  );

  // Count how many we fixed
  const matches = [...content.matchAll(brokenPattern)];
  console.log(`  ✅ Fixed ${matches.length} broken answer choice tags\n`);

  if (matches.length > 0) {
    console.log('  Examples of what was fixed:');
    matches.slice(0, 3).forEach((m, i) => {
      console.log(`    ${i + 1}. "${m[2]}. ${m[3]}°</span>" → "<span ...>${m[2]}. ${m[3]}°</span>"`);
    });
    console.log('');
  }

  console.log('💾 Updating database...\n');

  const { error } = await supabase
    .from('lessons')
    .update({
      content: fixedContent,
      updated_at: new Date().toISOString()
    })
    .eq('id', lesson.id);

  if (error) {
    console.error('❌ Error:', error);
    return false;
  }

  console.log('✅ All answer choices fixed!\n');
  console.log('📊 Summary:');
  console.log('  ✅ Fixed broken HTML in all examples');
  console.log('  ✅ All answer choices now have proper <span> tags');
  console.log('  ✅ Examples should now render correctly\n');

  return true;
}

async function main() {
  const success = await fixAnswerChoices();

  console.log('='.repeat(70));
  if (success) {
    console.log('\n✨ HTML fixed - examples should render now!\n');
  } else {
    console.log('\n❌ Error occurred.\n');
  }
}

main();
