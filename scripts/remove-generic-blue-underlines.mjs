#!/usr/bin/env node

/**
 * Remove blue underlines from generic non-useful terms like "Step 1", "Step 2", etc.
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Terms that should NOT have blue underlines
const genericTermsToRemove = [
  // Step labels
  'Step 1:',
  'Step 2:',
  'Step 3:',
  'Step 4:',
  'Step 5:',
  'Step 1',
  'Step 2',
  'Step 3',
  'Step 4',
  'Step 5',

  // Section headers with question counts
  '1. Punctuation (15-18 questions)',
  '2. Sentence Structure (15-18 questions)',
  '3. Verbs (8-10 questions)',
  '4. Pronouns (5-7 questions)',
  '5. Modifiers (4-6 questions)',
  '6. Parallel Structure (3-5 questions)',
  '7. Word Choice &amp; Idioms (3-5 questions)',
  '7. Word Choice & Idioms (3-5 questions)',

  // Other generic labels
  'Strategy',
  'Tip',
  'Note',
  'Important',
  'Remember',
  'Key Point',
  'Common Mistake',
  'Common Error',
  'Why It Works',
  'How to',
  'When to Use',
  'Example',
  'Part 1',
  'Part 2',
  'Part 3',
  'Section 1',
  'Section 2',
  'Section 3',

  // Generic navigation/structure terms
  'Answer choices',
  'Answer Choices',
];

async function removeGenericBlueUnderlines() {
  console.log('🔧 Removing blue underlines from generic terms...\n');

  const { data: lessons } = await supabase
    .from('lessons')
    .select('id, lesson_key, title, content');

  let totalUpdates = 0;
  let totalReplacements = 0;

  for (const lesson of lessons) {
    if (!lesson.content) continue;

    let updatedContent = lesson.content;
    let lessonReplacements = 0;

    // Remove blue underline from each generic term
    for (const term of genericTermsToRemove) {
      // Escape special regex characters
      const escapedTerm = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

      // Match the full blue underlined strong tag
      const regex = new RegExp(
        `<strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">${escapedTerm}</strong>`,
        'gi'
      );

      const matches = updatedContent.match(regex);
      if (matches) {
        // Replace with regular bold (no blue, no underline)
        updatedContent = updatedContent.replace(
          regex,
          `<strong>${term}</strong>`
        );
        lessonReplacements += matches.length;
      }
    }

    // Update lesson if changes were made
    if (lessonReplacements > 0) {
      const { error } = await supabase
        .from('lessons')
        .update({ content: updatedContent })
        .eq('id', lesson.id);

      if (!error) {
        totalUpdates++;
        totalReplacements += lessonReplacements;
        console.log(`✅ ${lesson.lesson_key}: ${lessonReplacements} replacements`);
      } else {
        console.error(`❌ Error updating ${lesson.lesson_key}:`, error.message);
      }
    }
  }

  console.log(`\n✅ Updated ${totalUpdates} lessons`);
  console.log(`📊 Total replacements: ${totalReplacements}`);
}

removeGenericBlueUnderlines().then(() => process.exit(0));
