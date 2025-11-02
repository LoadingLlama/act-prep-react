#!/usr/bin/env node

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function checkRemainingEscapes() {
  const { data: examples } = await supabase
    .from('lesson_examples')
    .select('title, problem_text');

  const withEscapes = examples.filter(ex =>
    ex.problem_text && (
      ex.problem_text.includes('\\n') ||
      ex.problem_text.includes('\\t') ||
      ex.problem_text.includes('\\r')
    )
  );

  console.log('\nExamples with literal escape characters:', withEscapes.length);

  if (withEscapes.length > 0) {
    console.log('\nExamples that still need fixing:');
    withEscapes.forEach((ex, i) => {
      console.log(`  ${i + 1}. ${ex.title}`);
      console.log(`     Preview: ${ex.problem_text.substring(0, 80)}...`);
    });
  } else {
    console.log('✅ All examples are clean - no escape characters found!');
  }

  process.exit(0);
}

checkRemainingEscapes();
