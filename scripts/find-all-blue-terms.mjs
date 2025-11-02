#!/usr/bin/env node

/**
 * Find all blue underlined terms across all lessons
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function findAllBlueTerms() {
  console.log('🔍 Finding all blue underlined terms...\n');

  const { data: lessons } = await supabase
    .from('lessons')
    .select('content, content_json, lesson_key, title');

  const allTerms = new Map(); // term -> count

  // Check old HTML format
  lessons?.forEach(lesson => {
    if (lesson.content) {
      const regex = /<strong[^>]*style="[^"]*color[^"]*2563eb[^"]*"[^>]*>([^<]+)<\/strong>/gi;
      let match;

      while ((match = regex.exec(lesson.content)) !== null) {
        const term = match[1];
        allTerms.set(term, (allTerms.get(term) || 0) + 1);
      }
    }
  });

  // Sort by frequency
  const sorted = Array.from(allTerms.entries())
    .sort((a, b) => b[1] - a[1]);

  console.log(`Total unique blue underlined terms: ${sorted.length}\n`);

  // Identify generic/non-useful terms
  const genericPatterns = [
    /^Step \d+$/,
    /^Option \d+$/,
    /^Choice [A-Z]$/,
    /^\d+\./,
    /^Part \d+$/,
    /^Section \d+$/,
    /^Example \d+$/,
    /^Strategy$/,
    /^Tip$/,
    /^Note$/,
    /^Important$/,
    /^Remember$/,
    /^Key Point$/,
    /^Common (Mistake|Error)$/,
    /^Why It Works$/,
    /^How to$/,
    /^When to Use$/,
  ];

  const genericTerms = [];
  const usefulTerms = [];

  sorted.forEach(([term, count]) => {
    const isGeneric = genericPatterns.some(pattern => pattern.test(term));
    if (isGeneric) {
      genericTerms.push({ term, count });
    } else {
      usefulTerms.push({ term, count });
    }
  });

  console.log('❌ Generic terms (should NOT be blue underlined):');
  console.log(`   Found ${genericTerms.length} generic terms\n`);
  genericTerms.slice(0, 20).forEach(({ term, count }) => {
    console.log(`   - "${term}" (${count} occurrences)`);
  });

  console.log('\n\n✅ Useful terms (should remain blue underlined):');
  console.log(`   Found ${usefulTerms.length} useful terms\n`);
  usefulTerms.slice(0, 30).forEach(({ term, count }) => {
    console.log(`   - "${term}" (${count} occurrences)`);
  });

  // Export full list
  console.log('\n\n📋 All blue underlined terms:');
  sorted.forEach(({ term, count }, i) => {
    const marker = genericPatterns.some(p => p.test(term)) ? '❌' : '✅';
    if (i < 100) {
      console.log(`${marker} ${term} (${count})`);
    }
  });
}

findAllBlueTerms().then(() => process.exit(0));
