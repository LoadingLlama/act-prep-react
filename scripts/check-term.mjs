#!/usr/bin/env node

/**
 * Check if a term exists in the database
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function checkTerm() {
  const { data, error } = await supabase
    .from('lesson_term_definitions')
    .select('*')
    .ilike('term', 'coordinating conjunctions');

  if (error) {
    console.error('❌ Error:', error.message);
    return;
  }

  console.log('✅ Found terms:');
  console.log(JSON.stringify(data, null, 2));
}

checkTerm().then(() => process.exit(0));
