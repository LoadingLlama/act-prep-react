#!/usr/bin/env node

/**
 * Extract all blue underlined terms from lessons and populate term_definitions table
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function extractAndPopulateTerms() {
  console.log('🔍 Extracting all blue underlined terms from lessons...\n');

  const { data: lessons } = await supabase
    .from('lessons')
    .select('content, subject, title');

  const allTerms = new Map(); // Map to store term => context

  // Extract all terms from lessons
  lessons?.forEach(lesson => {
    if (lesson.content) {
      // Match the blue underlined pattern
      const regex = /<strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">([^<]+)<\/strong>/g;
      let match;

      while ((match = regex.exec(lesson.content)) !== null) {
        const term = match[1];

        // Store first occurrence context
        if (!allTerms.has(term)) {
          allTerms.set(term, {
            subject: lesson.subject,
            lesson: lesson.title
          });
        }
      }
    }
  });

  console.log(`Found ${allTerms.size} unique terms\n`);

  // Common ACT terms with definitions
  const termDefinitions = {
    // Pronouns
    'Pronouns': 'Words that stand in for a person, place, or thing (he, she, it, they, who, etc.)',
    'Subject pronouns': 'Pronouns used as the subject of a sentence (I, we, you, he, she, it, they, who)',
    'Object pronouns': 'Pronouns used as the object of a verb or preposition (me, us, you, him, her, it, them, whom)',
    'Antecedent': 'The noun that a pronoun refers back to or replaces',

    // Apostrophes
    'Apostrophes': 'Punctuation marks used to show possession or contraction',
    'apostrophes': 'Punctuation marks used to show possession or contraction',
    'Possessive': 'A form that shows ownership (e.g., "Sarah\'s book")',

    // Commas
    'Comma': 'Punctuation mark used to separate elements, indicate pauses, or set off non-essential information',
    'commas': 'Punctuation marks used to separate elements, indicate pauses, or set off non-essential information',
    'Nonessential clause': 'A clause that adds extra information but can be removed without changing the sentence\'s core meaning',
    'Essential clause': 'A clause that provides necessary information to identify the noun it modifies',

    // Modifiers
    'misplaced modifier': 'A word, phrase, or clause improperly separated from the noun it modifies, creating confusion',
    'Misplaced modifier': 'A word, phrase, or clause improperly separated from the noun it modifies, creating confusion',
    'modifier': 'A word, phrase, or clause that describes or gives more information about another word',
    'Dangling modifier': 'A modifier that doesn\\'t logically connect to any word in the sentence',

    // Subject-Verb Agreement
    'subject-verb agreement': 'Rule that subjects and verbs must match in number (singular subjects take singular verbs)',
    'Subject-verb agreement': 'Rule that subjects and verbs must match in number (singular subjects take singular verbs)',

    // Parallelism
    'parallel structure': 'Using the same grammatical form for items in a list or comparison',
    'Parallel structure': 'Using the same grammatical form for items in a list or comparison',
    'parallelism': 'Using the same grammatical form for items in a list or comparison',

    // Verb Tense
    'verb tense': 'The form of a verb that shows when an action occurs (past, present, future)',
    'Verb tense': 'The form of a verb that shows when an action occurs (past, present, future)',

    // Fragments and Run-ons
    'sentence fragment': 'An incomplete sentence missing a subject, verb, or complete thought',
    'Sentence fragment': 'An incomplete sentence missing a subject, verb, or complete thought',
    'run-on sentence': 'Two or more independent clauses incorrectly joined without proper punctuation',
    'comma splice': 'Two independent clauses incorrectly joined with only a comma',

    // Transitions
    'transition': 'A word or phrase that connects ideas and shows the relationship between sentences',
    'transitional phrase': 'A multi-word phrase that connects ideas (e.g., "in addition," "on the other hand")',

    // Reading-specific
    'main idea': 'The central point or primary message of a passage',
    'supporting detail': 'Specific information that backs up or explains the main idea',
    'inference': 'A conclusion drawn from evidence and reasoning rather than explicit statements',
    'context clues': 'Words or phrases surrounding an unfamiliar word that help determine its meaning',

    // Passage types
    'Broad passage questions': 'Questions asking about the passage as a whole (theme, purpose, structure)',
    'broad passage questions': 'Questions asking about the passage as a whole (theme, purpose, structure)',

    // Pacing
    '10 minutes per passage on average': 'Standard ACT Reading pacing target (40 minutes ÷ 4 passages)',

    // Comparisons
    'comparative': 'Form used to compare two things (bigger, more interesting)',
    'superlative': 'Form used to compare three or more things (biggest, most interesting)',

    // Wordiness
    'concise': 'Expressing ideas in the fewest words possible without losing meaning',
    'redundant': 'Unnecessarily repeating the same idea in different words',
    'wordy': 'Using more words than necessary to express an idea'
  };

  // Add all extracted terms with generic or specific definitions
  const termsToInsert = [];

  for (const [term, context] of allTerms) {
    const definition = termDefinitions[term] || \`A key concept in ACT \${context.subject} (from \${context.lesson})\`;

    termsToInsert.push({
      term: term,
      definition: definition,
      context: \`This term appears in \${context.subject} lessons\`,
      subject: context.subject
    });
  }

  // Insert into database
  console.log(\`Inserting \${termsToInsert.length} term definitions...\\n\`);

  const { data, error } = await supabase
    .from('term_definitions')
    .insert(termsToInsert);

  if (error) {
    console.error('❌ Error inserting terms:', error.message);
    return;
  }

  console.log(\`✅ Successfully inserted \${termsToInsert.length} term definitions!\\n\`);
  console.log('Sample terms added:');
  termsToInsert.slice(0, 10).forEach(t => {
    console.log(\`  - \${t.term}: \${t.definition.substring(0, 60)}...\`);
  });
}

extractAndPopulateTerms().then(() => process.exit(0));
