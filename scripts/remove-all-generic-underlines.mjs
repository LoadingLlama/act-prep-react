#!/usr/bin/env node

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Generic instructional phrases that should NOT be blue underlined
const genericTermsToRemove = [
  // Instructions about reading
  'first identify the question type',
  'cross it off and never read it again',
  'every single word carefully',
  'focus on the differences',

  // Generic test-taking advice
  'no need to rephrase',
  'exactly what the question is asking',
  'more about speed than deep comprehension',
  'supported by evidence in the passage',
  'match the entire answer choice',
  'single word can make the entire answer choice incorrect',
  'always evidence for the correct answer',
  'combined systematically',
  'every question',

  // Timing/pacing instructions
  'Complete passages one at a time and review immediately',
  'Try different approaches to find the one that works for you',

  // Method labels
  'Method #1: Read answer choices right away',
  'Method #2: Go back to the passage first',
  'Recommended approach:',
  'Work both forwards and backwards simultaneously',

  // Generic headings
  'Choose NO CHANGE when:',
  'Common eliminators:',
  'Common trap:',
  'Critical Strategy:',
  'Example:',
  'Why this matters:',

  // Step instructions (all variations)
  'Minute 0-2:',
  'Minute 2-7:',
  'Minute 7-9:',

  // Question type timing
  'Quick questions (15-20 seconds):',
  'Slower questions (45-60 seconds):',

  // Checklist items
  '→ Can the sentence stand alone?',
  '→ Does the sentence begin with a phrase?',
  '→ Is there a list or conjunction?',
  '→ Is there a pronoun?',
  '→ Is there a verb?',
  '→ Is there punctuation?',

  // Diagnostic questions
  'Different pronouns?',
  'Different punctuation marks?',
  'Different verb forms?',
  'Different word order in list?',
  'Sentence restructured?',

  // Other generic instructions
  'However:',
  'There is no storytelling!',
  'the shortest answer is almost always correct',
  'existing information should be removed',
  'only consider the sentence being added',
  'plug the sentence into each potential spot',
  'specific and accurate',

  // Math instructions
  'Check your answer',
  'Check your units',
  'Write it down',

  // Science instructions
  'Go straight to the questions',
  'Skim the introduction',
  'For each question, locate the relevant viewpoint',
  'Note key differences and similarities',
  'Identify the main claim',
  'What would each viewpoint predict?',
  'Change only ONE variable at a time',
  'Keep everything else constant',
  'Use a control group for comparison',
  'Repeat trials (replication)',

  // Working backwards instructions
  'Do NOT work backwards if:',
  'If you work backwards:',
  'Work backwards if:',
  'If you work backwards:',

  // Always pick instructions
  'Always pick the less detailed answer choice',

  // Box/circle instructions
  'Box non-confident answers:',
  'Circle guesses:',
];

async function removeAllGenericUnderlines() {
  console.log('🔍 Finding lessons with generic blue underlined terms...\n');

  const { data: lessons } = await supabase
    .from('lessons')
    .select('id, lesson_key, title, content');

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
  console.log(`\n   ℹ️  Blue underlines now only for technical ACT terms needing definitions`);
}

removeAllGenericUnderlines().then(() => process.exit(0));
