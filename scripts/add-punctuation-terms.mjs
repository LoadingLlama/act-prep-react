#!/usr/bin/env node

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const termDefinitions = {
  'comma splice': {
    definition: 'An error that occurs when two independent clauses are joined with only a comma, without a coordinating conjunction',
    context: 'One of the most common sentence errors on the ACT. Can be fixed by adding a coordinating conjunction, using a semicolon, or creating two separate sentences'
  },
  'dashes': {
    definition: 'Punctuation marks (—) that set off unnecessary information or introduce explanations. Can function like commas, parentheses, or colons',
    context: 'Must be used in pairs to set off unnecessary information (never mix with commas). A single dash can introduce a list or explanation like a colon'
  },
  'possessive pronouns': {
    definition: 'Pronouns that show ownership: its, hers, yours, ours, theirs, whose. These NEVER use an apostrophe',
    context: 'Common ACT trap: "its" (possessive) vs "it\'s" (it is). Use the plug-in test to check if the contraction makes sense'
  }
};

async function addPunctuationTerms() {
  for (const [term, data] of Object.entries(termDefinitions)) {
    const { error } = await supabase
      .from('lesson_term_definitions')
      .insert({
        lesson_key: 'punctuation',
        term: term,
        definition: data.definition,
        context: data.context
      });

    if (error) {
      console.error(`Error adding "${term}":`, error.message);
    } else {
      console.log(`✓ Added definition for "${term}"`);
    }
  }
}

addPunctuationTerms().then(() => {
  console.log('\n✅ All missing terms added!');
  process.exit(0);
});
