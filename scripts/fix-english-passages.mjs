#!/usr/bin/env node
/**
 * FIX ENGLISH PASSAGES
 *
 * Properly reconstructs English passages from act_ tables by:
 * - Deduplicating overlapping context
 * - Removing question artifacts like [Should this sentence be deleted?]
 * - Cleaning up spacing and formatting
 * - Adding proper paragraph breaks
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

console.log('📝 FIXING ENGLISH PASSAGES\n');
console.log('='.repeat(80) + '\n');

/**
 * Clean passage text by removing artifacts and fixing formatting
 */
function cleanPassageText(text) {
  if (!text) return '';

  let cleaned = text;

  // Remove ALL bracketed question artifacts (comprehensive)
  cleaned = cleaned.replace(/\[[^\]]+\?\]/g, ''); // Remove any bracket with question mark inside
  cleaned = cleaned.replace(/\[DELETE[^\]]*\]/gi, '');
  cleaned = cleaned.replace(/\[NO CHANGE\]/gi, '');
  cleaned = cleaned.replace(/\[OMIT[^\]]*\]/gi, '');

  // Fix spacing issues
  cleaned = cleaned.replace(/\s{3,}/g, ' '); // Replace 3+ spaces with single space
  cleaned = cleaned.replace(/\s*<u/g, ' <u'); // Space before underline tags
  cleaned = cleaned.replace(/<\/u>\s*/g, '</u> '); // Space after underline tags
  cleaned = cleaned.replace(/\s+([.,;:!?])/g, '$1'); // Remove space before punctuation
  cleaned = cleaned.replace(/([.,;:!?])([A-Z])/g, '$1 $2'); // Add space after punctuation before capital

  // Remove empty underline tags
  cleaned = cleaned.replace(/<u[^>]*>\s*<\/u>/g, '');

  // Trim and normalize
  cleaned = cleaned.trim();
  cleaned = cleaned.replace(/\n{3,}/g, '\n\n'); // Max 2 newlines

  return cleaned;
}

/**
 * Rebuild English passage from ACT questions
 */
async function rebuildEnglishPassage(testNumber, passageNumber) {
  // Get all questions for this passage
  const { data: questions } = await supabase
    .from('act_english_questions')
    .select('*')
    .eq('test_number', testNumber)
    .eq('passage_number', passageNumber)
    .order('question_number');

  if (!questions || questions.length === 0) {
    console.log(`  ⚠️  No questions found for Test ${testNumber}, Passage ${passageNumber}`);
    return null;
  }

  // Build passage by tracking what we've already added
  let passageText = '';

  for (const q of questions) {
    const before = q.context_before || '';
    const underlined = q.underlined_text || '';
    const after = q.context_after || '';

    // If context_before is not empty and not just "..."
    if (before && before.trim() !== '...' && before.trim() !== '') {
      // Check if this text already exists in the passage (overlap detection)
      const beforeTrimmed = before.trim();
      const existingText = passageText.replace(/<[^>]+>/g, '').trim(); // Strip HTML tags

      if (!existingText.includes(beforeTrimmed) && !beforeTrimmed.includes(existingText)) {
        // No overlap, add it
        passageText += before + ' ';
      }
    }

    // Add underlined portion with tag
    if (underlined && underlined.trim()) {
      passageText += `<u id="q${q.question_number}">${underlined}</u>`;
    }

    // Add context after
    if (after && after.trim() !== '...' && after.trim() !== '') {
      passageText += ' ' + after;
    }
  }

  // Clean the passage
  passageText = cleanPassageText(passageText);

  return passageText;
}

/**
 * Fix all English passages for a test
 */
async function fixTestEnglishPassages(testNumber) {
  console.log(`\n🔄 Processing Test ${testNumber}...`);

  // Get all passage numbers for this test
  const { data: passages } = await supabase
    .from('practice_test_english_passages')
    .select('id, passage_number')
    .eq('test_number', testNumber)
    .order('passage_number');

  if (!passages || passages.length === 0) {
    console.log(`  ⚠️  No passages found`);
    return;
  }

  let fixed = 0;

  for (const passage of passages) {
    const newText = await rebuildEnglishPassage(testNumber, passage.passage_number);

    if (newText) {
      // Update the passage
      const wordCount = newText.split(/\s+/).filter(w => w.length > 0).length;

      const { error } = await supabase
        .from('practice_test_english_passages')
        .update({
          passage_text: newText,
          word_count: wordCount
        })
        .eq('id', passage.id);

      if (error) {
        console.log(`  ❌ Error updating Passage ${passage.passage_number}: ${error.message}`);
      } else {
        console.log(`  ✅ Fixed Passage ${passage.passage_number} (${wordCount} words)`);
        fixed++;
      }
    }
  }

  console.log(`  📊 Fixed ${fixed}/${passages.length} passages`);
}

/**
 * Main execution
 */
async function fixAllEnglishPassages() {
  for (let testNum = 1; testNum <= 7; testNum++) {
    await fixTestEnglishPassages(testNum);
  }

  console.log('\n' + '='.repeat(80));
  console.log('\n✅ ALL ENGLISH PASSAGES FIXED!\n');
}

fixAllEnglishPassages().catch(console.error);
