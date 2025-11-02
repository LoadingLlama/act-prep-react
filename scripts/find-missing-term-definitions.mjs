#!/usr/bin/env node

/**
 * Find all blue underlined terms missing from lesson_term_definitions
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function findMissingTerms() {
  console.log('🔍 Finding missing term definitions...\n');

  // Get all existing terms
  const { data: existingTerms } = await supabase
    .from('lesson_term_definitions')
    .select('term');

  const existingSet = new Set(existingTerms?.map(t => t.term) || []);

  // Get all lessons
  const { data: lessons } = await supabase
    .from('lessons')
    .select('content');

  const allTermsInLessons = new Set();

  // Extract all blue underlined terms
  lessons?.forEach(lesson => {
    if (lesson.content) {
      const regex = /<strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">([^<]+)<\/strong>/g;
      let match;
      while ((match = regex.exec(lesson.content)) !== null) {
        allTermsInLessons.add(match[1]);
      }
    }
  });

  // Find missing terms
  const missing = [];
  for (const term of allTermsInLessons) {
    if (!existingSet.has(term)) {
      missing.push(term);
    }
  }

  console.log(`Total blue underlined terms in lessons: ${allTermsInLessons.size}`);
  console.log(`Terms with definitions: ${existingSet.size}`);
  console.log(`Missing definitions: ${missing.length}\n`);

  if (missing.length > 0) {
    console.log('❌ Missing terms:');
    missing.sort().forEach((term, i) => console.log(`  ${(i + 1).toString().padStart(3)}. ${term}`));
  } else {
    console.log('✅ All terms have definitions!');
  }
}

findMissingTerms().then(() => process.exit(0));
