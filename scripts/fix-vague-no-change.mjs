#!/usr/bin/env node

/**
 * Fix all vague NO CHANGE explanations to be specific
 * References the actual underlined text and explains the specific error
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

function extractUnderlinedText(problemText) {
  if (!problemText) return '';
  const match = problemText.match(/<u>(.*?)<\/u>/);
  return match ? match[1] : '';
}

function generateSpecificExplanation(example) {
  const underlined = extractUnderlinedText(example.problem_text);
  const noChangeChoice = example.choices?.find(c => c.text.toUpperCase().includes('NO CHANGE'));
  if (!noChangeChoice) return null;

  const isCorrect = noChangeChoice.letter === example.correct_answer;
  const title = example.title || '';
  const cleanText = example.problem_text?.replace(/<[^>]*>/g, '') || '';

  let specificText = '';

  // Generate specific explanations based on what's wrong with the underlined text

  // Check for missing verbs
  if (underlined && !underlined.match(/\b(is|was|were|are|be|been|being|has|have|had)\b/i) &&
      cleanText.includes('was') && cleanText.indexOf('was') > cleanText.indexOf(underlined)) {
    specificText = isCorrect
      ? `The phrase "${underlined}" is grammatically complete in this context.`
      : `The phrase "${underlined}" is missing a verb. The sentence structure requires a verb between these words to be grammatically correct. Without it, the sentence is incomplete and confusing.`;
  }

  // Check for wordiness
  else if (title.toLowerCase().includes('wordiness') || title.toLowerCase().includes('concise')) {
    specificText = isCorrect
      ? `The phrase "${underlined}" is the most concise and clear expression for this context.`
      : `The phrase "${underlined}" is wordy and can be expressed more concisely. This verbose phrasing adds unnecessary words without adding meaning, making the sentence less direct and harder to read.`;
  }

  // Check for unnecessary information / dashes
  else if (title.toLowerCase().includes('dash') || title.toLowerCase().includes('unnecessary')) {
    specificText = isCorrect
      ? `The phrase "${underlined}" is correctly punctuated with appropriate use of dashes or commas.`
      : `The phrase "${underlined}" needs to be set off with a pair of dashes or commas on both sides because it's nonessential information. As written, it interrupts the sentence flow without proper punctuation boundaries.`;
  }

  // Check for pronoun issues
  else if (title.toLowerCase().includes('pronoun') || underlined.match(/\b(they|their|its|it's|who|whom)\b/i)) {
    specificText = isCorrect
      ? `The pronoun or possessive "${underlined}" is correctly used in this context.`
      : `The phrase "${underlined}" contains a pronoun or possessive error. Check for agreement with the antecedent, correct pronoun case, or confusion between possessive and contraction forms.`;
  }

  // Check for subject-verb agreement
  else if (title.toLowerCase().includes('subject') || title.toLowerCase().includes('agreement')) {
    specificText = isCorrect
      ? `The verb "${underlined}" correctly agrees with its subject.`
      : `The phrase "${underlined}" contains a subject-verb agreement error. The verb doesn't match the number (singular/plural) of its subject.`;
  }

  // Check for modifier issues
  else if (title.toLowerCase().includes('modifier') || title.toLowerCase().includes('misplaced')) {
    specificText = isCorrect
      ? `The phrase "${underlined}" is correctly placed to modify the intended word.`
      : `The phrase "${underlined}" creates a misplaced or dangling modifier. It's positioned so that it appears to modify the wrong noun, creating confusion about what it's describing.`;
  }

  // Check for transition issues
  else if (title.toLowerCase().includes('transition') || underlined.match(/\b(however|therefore|thus|moreover|furthermore)\b/i)) {
    specificText = isCorrect
      ? `The transition "${underlined}" correctly connects the ideas with appropriate logic.`
      : `The transition "${underlined}" doesn't logically connect the ideas in context. The relationship between sentences requires a different transitional word or phrase.`;
  }

  // Check for comma issues
  else if (underlined.includes(',') || title.toLowerCase().includes('comma')) {
    specificText = isCorrect
      ? `The punctuation in "${underlined}" is correct for this sentence structure.`
      : `The punctuation in "${underlined}" is incorrect. Check for missing commas, unnecessary commas, or comma splices that join independent clauses incorrectly.`;
  }

  // Check for apostrophe/possessive issues
  else if (underlined.includes("'") || title.toLowerCase().includes('possessive')) {
    specificText = isCorrect
      ? `The apostrophe usage in "${underlined}" is correct.`
      : `The phrase "${underlined}" has an apostrophe error. This could be using a possessive when a plural is needed, missing an apostrophe for possession, or confusing a contraction with a possessive.`;
  }

  // Check for fragment issues
  else if (title.toLowerCase().includes('fragment') || underlined.match(/\b(while|although|because|since|when)\b/i)) {
    specificText = isCorrect
      ? `The phrase "${underlined}" is part of a complete sentence.`
      : `Starting with "${underlined}" creates a sentence fragment. The subordinating conjunction makes this a dependent clause that can't stand alone - it needs an independent clause to complete the thought.`;
  }

  // Default: Extract the specific issue from context
  else {
    const issue = determineIssueFromContext(example, underlined);
    specificText = isCorrect
      ? `The phrase "${underlined}" is grammatically correct and effectively expresses the intended meaning in this context.`
      : `The phrase "${underlined}" contains an error${issue ? `: ${issue}` : ''}. One of the other answer choices provides the grammatically correct or more effective wording.`;
  }

  return specificText;
}

function determineIssueFromContext(example, underlined) {
  const correct = example.choices?.find(c => c.letter === example.correct_answer)?.text;
  if (!correct || correct.toUpperCase().includes('NO CHANGE')) return '';

  // Try to infer what's wrong by comparing to correct answer
  if (correct.toUpperCase() === 'DELETE THE UNDERLINED PORTION') {
    return 'this information is unnecessary or redundant';
  }

  if (underlined.length > correct.length * 1.5) {
    return 'it uses more words than necessary to express the idea';
  }

  return '';
}

async function fixAllVagueNoChange() {
  console.log('🔧 Fixing vague NO CHANGE explanations...\\n');

  const { data: examples } = await supabase
    .from('lesson_examples')
    .select('*');

  const noChangeExamples = examples.filter(ex =>
    ex.choices?.some(c => c.text.toUpperCase().includes('NO CHANGE'))
  );

  const vagueExamples = noChangeExamples.filter(ex =>
    ex.answer_explanation?.includes('The underlined portion contains an error that needs correction')
  );

  console.log(`Found ${vagueExamples.length} examples with vague explanations\\n`);

  let updated = 0;

  for (const ex of vagueExamples) {
    const specificText = generateSpecificExplanation(ex);
    if (!specificText) continue;

    const noChangeChoice = ex.choices.find(c => c.text.toUpperCase().includes('NO CHANGE'));
    const isCorrect = noChangeChoice.letter === ex.correct_answer;
    const marker = isCorrect ? '✓ CORRECT' : '✗ Incorrect';

    // Find and replace the NO CHANGE explanation
    let explanation = ex.answer_explanation || '';

    // Match the vague pattern
    const vaguePatt = `**Choice ${noChangeChoice.letter}: "${noChangeChoice.text}"**
The underlined portion contains an error that needs correction. One of the other choices provides the grammatically correct or more effective wording.
${marker}`;

    const newExplanation = `**Choice ${noChangeChoice.letter}: "${noChangeChoice.text}"**
${specificText}
${marker}`;

    if (explanation.includes(vaguePatt)) {
      explanation = explanation.replace(vaguePatt, newExplanation);

      const { error } = await supabase
        .from('lesson_examples')
        .update({ answer_explanation: explanation })
        .eq('id', ex.id);

      if (!error) {
        updated++;
        const underlined = extractUnderlinedText(ex.problem_text);
        console.log(`✅ ${updated}. Updated "${ex.title}" - "${underlined}"`);
      } else {
        console.error(`❌ Error updating ${ex.title}:`, error.message);
      }
    }
  }

  console.log(`\\n✅ Successfully updated ${updated} NO CHANGE explanations`);
}

fixAllVagueNoChange().then(() => process.exit(0));
