#!/usr/bin/env node

/**
 * Debug: Check the actual HTML format of blue underlined terms in lesson 1.1
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function debugLesson11HTML() {
  console.log('🔍 Checking lesson 1.1 HTML format...\n');

  const { data, error } = await supabase
    .from('lessons')
    .select('content')
    .eq('lesson_key', 'sentence-structure')
    .limit(1);

  if (error || !data || data.length === 0) {
    console.error('❌ Error:', error?.message || 'No lesson found');
    return;
  }

  const lesson = data[0];

  // Extract first 3 blue underlined terms
  const regex = /<strong[^>]*style="[^"]*color[^"]*2563eb[^"]*"[^>]*>([^<]+)<\/strong>/gi;
  const matches = [];
  let match;
  let count = 0;

  while ((match = regex.exec(lesson.content)) !== null && count < 5) {
    matches.push({
      fullTag: match[0],
      term: match[1]
    });
    count++;
  }

  console.log('📊 First 5 blue underlined terms in lesson 1.1:\n');
  matches.forEach((m, i) => {
    console.log(`${i + 1}. Term: "${m.term}"`);
    console.log(`   Full HTML tag:`);
    console.log(`   ${m.fullTag}\n`);
  });

  // Check if any of these terms exist in lesson_term_definitions
  console.log('📚 Checking if these terms have definitions:\n');

  for (const m of matches) {
    const { data: termData, error: termError } = await supabase
      .from('lesson_term_definitions')
      .select('term, definition')
      .eq('term', m.term)
      .single();

    if (termData) {
      console.log(`✅ "${m.term}" - HAS DEFINITION`);
      console.log(`   "${termData.definition.substring(0, 80)}..."\n`);
    } else {
      console.log(`❌ "${m.term}" - MISSING DEFINITION\n`);
    }
  }
}

debugLesson11HTML().then(() => process.exit(0));
