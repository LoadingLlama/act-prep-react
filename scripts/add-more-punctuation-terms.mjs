#!/usr/bin/env node

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const termDefinitions = {
  'independent clause': {
    definition: 'A clause that can stand alone as a complete sentence. It has a subject and verb and expresses a complete thought',
    context: 'Required before semicolons and colons. Both sides of a semicolon must be independent clauses. The part before a colon must always be an independent clause'
  },
  'apostrophe': {
    definition: 'Punctuation mark (\') used to show possession or form contractions by marking missing letters',
    context: 'Shows ownership (dog\'s, students\') or contractions (don\'t, it\'s). Possessive pronouns (its, theirs, whose) never use apostrophes'
  }
};

async function addMorePunctuationTerms() {
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

addMorePunctuationTerms().then(() => {
  console.log('\n✅ All additional terms added!');
  process.exit(0);
});
