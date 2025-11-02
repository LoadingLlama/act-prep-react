#!/usr/bin/env node

/**
 * Add definitions for all missing important terms
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Important terms that need definitions (excluding section headers, steps, etc.)
const importantTermDefinitions = {
  // Pronouns & Grammar
  'Subject pronouns': {
    definition: 'Pronouns used as the subject of a sentence (I, we, you, he, she, it, they, who)',
    context: 'Use these when the pronoun is doing the action'
  },
  'Object pronouns': {
    definition: 'Pronouns used as the object of a verb or preposition (me, us, you, him, her, it, them, whom)',
    context: 'Use these when the pronoun is receiving the action'
  },
  'Reflexive pronouns': {
    definition: 'Pronouns that refer back to the subject (myself, yourself, himself, herself, itself, ourselves, themselves)',
    context: 'Used when the subject and object are the same person/thing'
  },
  'Group nouns': {
    definition: 'Nouns that refer to a group of people or things acting as a single unit (team, class, committee, family)',
    context: 'Usually treated as singular when acting together'
  },

  // Structure & Voice
  'Parallel structure': {
    definition: 'Using the same grammatical form for items in a list or comparison',
    context: 'All items should match in form (all verbs, all nouns, all phrases)'
  },
  'Active voice': {
    definition: 'Sentence structure where the subject performs the action (e.g., "The dog bit the man")',
    context: 'Generally clearer and more direct than passive voice'
  },
  'Passive voice': {
    definition: 'Sentence structure where the subject receives the action (e.g., "The man was bitten by the dog")',
    context: 'Often wordier and less direct than active voice'
  },

  // Sentence Issues
  'Sentence fragment': {
    definition: 'An incomplete sentence missing a subject, verb, or complete thought',
    context: 'Cannot stand alone as a complete sentence'
  },
  'Redundancy': {
    definition: 'Unnecessarily repeating the same idea in different words',
    context: 'Makes writing wordy and less concise'
  },
  'Irrelevant information': {
    definition: 'Details that do not contribute to the main point or flow of the passage',
    context: 'Should usually be removed for clarity'
  },

  // Punctuation
  'Quotation marks': {
    definition: 'Punctuation used to indicate direct speech, quotes, or titles',
    context: 'Commas and periods go inside; colons and semicolons go outside'
  },
  'Dashes': {
    definition: 'Punctuation marks (—) used to set off non-essential information or create emphasis',
    context: 'Must be used in pairs or to set off final information'
  },
  'Period': {
    definition: 'Punctuation mark (.) used to end a complete sentence',
    context: 'Indicates a full stop between independent clauses'
  },

  // Verbs
  'Irregular verbs': {
    definition: 'Verbs that do not follow regular past tense patterns (go→went, run→ran, swim→swam)',
    context: 'Must memorize these special forms'
  },
  'Perfect tense': {
    definition: 'Verb tenses using "have/has/had" + past participle to show completed action',
    context: 'Present perfect (has done), past perfect (had done), future perfect (will have done)'
  },
  'Conditional tense': {
    definition: 'Verb tenses used for hypothetical or conditional situations (would, could, should)',
    context: 'Used with "if" clauses to describe possible or imaginary scenarios'
  },

  // Word Choice
  'Than': {
    definition: 'Conjunction used in comparisons ("bigger than")',
    context: 'Do not confuse with "then" (time sequence)'
  },
  'Then': {
    definition: 'Adverb indicating time sequence ("first this, then that")',
    context: 'Do not confuse with "than" (comparisons)'
  },
  'Affect': {
    definition: 'Verb meaning to influence or change something',
    context: 'Do not confuse with "effect" (noun meaning result)'
  },
  'Effect': {
    definition: 'Noun meaning a result or consequence',
    context: 'Do not confuse with "affect" (verb meaning to influence)'
  },

  // Reading
  'Main idea questions': {
    definition: 'Questions asking about the central point or primary message of a passage',
    context: 'Focus on the overall theme, not specific details'
  },
  'Clear evidence questions': {
    definition: 'Questions where the answer is explicitly stated in the passage',
    context: 'Look for direct quotes or paraphrases that match'
  },
  'Inference questions': {
    definition: 'Questions requiring you to draw conclusions from evidence rather than explicit statements',
    context: 'Answer must be supported by passage evidence, not outside knowledge'
  },
  'Purpose questions': {
    definition: 'Questions asking why the author included specific information or used certain techniques',
    context: 'Consider the author\'s intent and rhetorical strategy'
  },
  'Words in context questions': {
    definition: 'Questions asking for the meaning of a word as used in the passage',
    context: 'Use surrounding context clues, not just dictionary definitions'
  },

  // Reading Passages
  'Prose Fiction/Literary Narrative': {
    definition: 'Fictional stories or memoirs with narrative structure',
    context: 'Focus on character, plot, and literary elements'
  },
  'Social Science': {
    definition: 'Passages about psychology, sociology, economics, or history',
    context: 'Often discuss human behavior, society, or historical events'
  },
  'Humanities': {
    definition: 'Passages about art, music, philosophy, or cultural topics',
    context: 'May discuss artistic movements, cultural analysis, or critical perspectives'
  },
  'Natural Science': {
    definition: 'Passages about biology, chemistry, physics, or earth science',
    context: 'Focus on scientific concepts, experiments, or natural phenomena'
  },

  // Science
  'Data Representation': {
    definition: 'ACT Science passage type presenting graphs, tables, or diagrams to analyze',
    context: 'Focus on reading data accurately and identifying trends'
  },
  'Research Summaries': {
    definition: 'ACT Science passage type describing one or more experiments',
    context: 'Focus on experimental design, variables, and results'
  },
  'Conflicting Viewpoints': {
    definition: 'ACT Science passage type presenting 2-3 different scientific perspectives',
    context: 'Compare and contrast the viewpoints, identify key disagreements'
  },
  'Control': {
    definition: 'The standard or baseline condition in an experiment for comparison',
    context: 'Allows scientists to isolate the effect of the independent variable'
  },
  'Independent variables': {
    definition: 'Variables that are deliberately changed or manipulated in an experiment',
    context: 'The "cause" in a cause-and-effect relationship'
  },
  'Dependent variables': {
    definition: 'Variables that are measured or observed in response to changes',
    context: 'The "effect" in a cause-and-effect relationship'
  },

  // Math
  'Prime numbers': {
    definition: 'Numbers greater than 1 that have exactly two factors: 1 and themselves',
    context: 'Examples: 2, 3, 5, 7, 11, 13 (note: 1 is not prime)'
  },
  'Integers': {
    definition: 'Whole numbers and their opposites, including zero (...-2, -1, 0, 1, 2...)',
    context: 'No fractions or decimals'
  },
  'Rational numbers': {
    definition: 'Numbers that can be expressed as a ratio of two integers (fractions, terminating decimals)',
    context: 'Includes all integers, fractions, and repeating/terminating decimals'
  },
  'Domain': {
    definition: 'The set of all possible input values (x-values) for a function',
    context: 'What you can plug into a function'
  },
  'Range': {
    definition: 'The set of all possible output values (y-values) for a function',
    context: 'What you can get out of a function'
  },
  'Inverse': {
    definition: 'A function that "undoes" another function; swaps inputs and outputs',
    context: 'If f(x) = y, then f⁻¹(y) = x'
  },

  // Test Strategy
  'Backsolving': {
    definition: 'Strategy of plugging answer choices back into the problem to find which works',
    context: 'Especially useful when algebra gets complex'
  },
  'Estimation': {
    definition: 'Strategy of rounding numbers to get approximate answer and eliminate choices',
    context: 'Saves time when exact calculation is unnecessary'
  }
};

async function addMissingTerms() {
  console.log(`🔧 Adding ${Object.keys(importantTermDefinitions).length} missing term definitions...\\n`);

  const termsToInsert = [];

  for (const [term, data] of Object.entries(importantTermDefinitions)) {
    termsToInsert.push({
      term: term,
      definition: data.definition,
      context: data.context,
      lesson_key: null  // Available in all lessons
    });
  }

  const { data, error } = await supabase
    .from('lesson_term_definitions')
    .insert(termsToInsert);

  if (error) {
    console.error('❌ Error inserting terms:', error.message);
    return;
  }

  console.log(`✅ Successfully added ${termsToInsert.length} term definitions!`);
  console.log('\\nSample terms added:');
  termsToInsert.slice(0, 10).forEach(t => {
    console.log(`  - ${t.term}`);
  });
}

addMissingTerms().then(() => process.exit(0));
