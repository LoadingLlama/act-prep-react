#!/usr/bin/env node

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Generic terms that should be bold but NOT blue underlined
const genericTermsToRemove = [
  // Step instructions
  'Step 1::', 'Step 2::', 'Step 3::', 'Step 4::', 'Step 5::',

  // Generic reading instructions
  'Read very quickly for general understanding',
  'read the entire passage at once',
  'Skim questions first',
  'Don\'t read the passage first',
  'only the first and last sentence',

  // Generic strategy terms
  'efficient reading habits',
  'systematic note-taking',
  'systematic strategies',
  'test-taking discipline',

  // Generic headings
  'Example: Question Type Distribution',
  'Example: Section Breakdown',

  // ACT section names (these are generic category names, not terms needing definitions)
  'Key Ideas and Details',
  'Craft and Structure',
  'Integration of Knowledge and Ideas',

  // Passage type names (already clear without needing hover definitions)
  'Prose Fiction/Literary Narrative:',
  'Social Science:',
  'Humanities:',
  'Natural Science:',
];

// Keep blue underlines for these ACT-specific terms that benefit from definitions:
// - annotation:
// - distortion:
// - line references:
// - opposite:
// - out of scope:
// - paragraph references:
// - passage-based comprehension:
// - prediction:
// - too extreme:
// - wrong answer traps:
// - Active reading:

async function removeGenericReadingUnderlines() {
  console.log('🔍 Finding reading lessons with blue underlined terms...\n');

  const { data: lessons } = await supabase
    .from('lessons')
    .select('id, lesson_key, title, content')
    .ilike('lesson_key', 'reading%');

  let totalReplacements = 0;
  let lessonsUpdated = 0;

  for (const lesson of lessons) {
    let updatedContent = lesson.content;
    let lessonReplacements = 0;

    for (const term of genericTermsToRemove) {
      // Escape special regex characters
      const escapedTerm = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

      // Match the exact blue underlined format
      const regex = new RegExp(
        `<strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">${escapedTerm}</strong>`,
        'gi'
      );

      const matches = updatedContent.match(regex);
      if (matches) {
        lessonReplacements += matches.length;
        // Replace with just bold (no color, no underline)
        updatedContent = updatedContent.replace(regex, `<strong>${term}</strong>`);
      }
    }

    if (lessonReplacements > 0) {
      console.log(`📝 ${lesson.lesson_key} - "${lesson.title}"`);
      console.log(`   Removed ${lessonReplacements} generic blue underlines\n`);

      // Update the lesson
      const { error } = await supabase
        .from('lessons')
        .update({ content: updatedContent })
        .eq('id', lesson.id);

      if (error) {
        console.error(`   ❌ Error updating: ${error.message}`);
      } else {
        totalReplacements += lessonReplacements;
        lessonsUpdated++;
      }
    }
  }

  console.log(`\n✅ Complete!`);
  console.log(`   Updated ${lessonsUpdated} lessons`);
  console.log(`   Removed ${totalReplacements} generic blue underlines`);
  console.log(`\n   ℹ️  Kept blue underlines for ACT-specific terms that need definitions`);
}

removeGenericReadingUnderlines().then(() => process.exit(0));
