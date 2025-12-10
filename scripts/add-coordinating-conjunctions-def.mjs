#!/usr/bin/env node

/**
 * Add definitions for coordinating conjunctions and comma splice
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const termDefinitions = {
  'coordinating conjunctions': {
    definition: 'Conjunctions that connect two independent clauses as equals (For, And, Nor, But, Or, Yet, So - FANBOYS)',
    context: 'When used with a comma, both clauses remain independent and equal in grammatical weight'
  },
  'comma splice': {
    definition: 'An error that occurs when two independent clauses are joined with only a comma, without a coordinating conjunction',
    context: 'One of the most common sentence errors; can be fixed by adding a coordinating conjunction, using a semicolon, or creating two separate sentences'
  }
};

async function addTerms() {
  console.log(`🔧 Adding ${Object.keys(termDefinitions).length} term definitions...\n`);

  const termsToInsert = [];

  for (const [term, data] of Object.entries(termDefinitions)) {
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
  console.log('\nTerms added:');
  termsToInsert.forEach(t => {
    console.log(`  - ${t.term}: ${t.definition}`);
  });
}

addTerms().then(() => process.exit(0));
