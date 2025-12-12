#!/usr/bin/env node

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function checkPunctuationTerms() {
  // Get all terms for punctuation lesson
  const { data, error } = await supabase
    .from('lesson_term_definitions')
    .select('*')
    .eq('lesson_key', 'punctuation');

  if (error) {
    console.error('Error:', error.message);
    return;
  }

  console.log(`Found ${data.length} terms for punctuation lesson:`);
  data.forEach(term => {
    console.log(`- ${term.term}: ${term.definition.substring(0, 50)}...`);
  });

  // Terms used in the lesson
  const termsInLesson = [
    'semicolon',
    'colon',
    'comma splice',
    'dashes',
    'apostrophes',
    'possessive pronouns',
    'contractions',
    'quotation marks'
  ];

  console.log('\n\nTerms used in lesson that need definitions:');
  const existingTerms = data.map(d => d.term.toLowerCase());
  termsInLesson.forEach(term => {
    const exists = existingTerms.includes(term.toLowerCase());
    console.log(`${exists ? '✓' : '✗'} ${term}`);
  });
}

checkPunctuationTerms().then(() => process.exit(0));
