#!/usr/bin/env node

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const termDefinitions = {
  'subject': {
    definition: 'The person, place, or thing doing the action in a sentence',
    context: 'Usually at the beginning of the sentence. Must agree with the verb in number (singular or plural)'
  },
  'subject-verb agreement': {
    definition: 'The rule that singular subjects take singular verbs, and plural subjects take plural verbs',
    context: 'Cross out prepositional phrases and unnecessary information to find the true subject'
  },
  'prepositional phrases': {
    definition: 'Phrases that begin with prepositions (of, in, on, at, for, with, etc.) that modify nouns',
    context: 'Prepositional phrases NEVER contain the subject or verb. Common trap on the ACT'
  },
  'group nouns': {
    definition: 'Nouns representing a group of people or things (team, committee, class, herd, jury) that are grammatically singular',
    context: 'Even though the group contains multiple members, use a singular verb (The team plays, not play)'
  },
  'verb tense': {
    definition: 'The form of a verb that shows when an action takes place (past, present, future)',
    context: 'Trust your ear and read for context. Match the tense in the rest of the paragraph'
  },
  'perfect tense': {
    definition: 'Verb tense formed with has/have/had + past participle, used when there are multiple timelines',
    context: 'Examples: has gone, have eaten, had finished. Shows action completed before another time'
  },
  'conditional tense': {
    definition: 'Verb tense using would/could to describe hypothetical or possible outcomes',
    context: 'Form depends on likelihood: probable (will), improbable (would), impossible (would have)'
  },
  'irregular verbs': {
    definition: 'Verbs that don\'t follow normal conjugation patterns (begin/began/begun, swim/swam/swum)',
    context: 'Many have "a" version for past tense (swam, began) and "u" version for perfect tense (swum, begun)'
  }
};

async function addVerbsTerms() {
  for (const [term, data] of Object.entries(termDefinitions)) {
    const { error } = await supabase
      .from('lesson_term_definitions')
      .insert({
        lesson_key: 'verbs',
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

addVerbsTerms().then(() => {
  console.log('\n✅ All verbs terms added!');
  process.exit(0);
});
