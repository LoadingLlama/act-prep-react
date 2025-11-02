#!/usr/bin/env node

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function verifyNoGenericBlues() {
  console.log('\n🔍 Checking for remaining generic blue underlines:\n');

  const { data: lessons } = await supabase
    .from('lessons')
    .select('lesson_key, title, content');

  const patternsToCheck = [
    { name: 'Step labels', regex: /<strong style="color: #2563eb[^>]*>Step \d+[:]?<\/strong>/gi },
    { name: 'Section numbers', regex: /<strong style="color: #2563eb[^>]*>\d+\.[^<]{0,50}questions\)<\/strong>/gi },
    { name: 'Answer Choices', regex: /<strong style="color: #2563eb[^>]*>Answer [Cc]hoices<\/strong>/gi },
  ];

  let totalFound = 0;

  for (const pattern of patternsToCheck) {
    let found = false;
    console.log(`Checking for: ${pattern.name}`);

    lessons?.forEach(lesson => {
      if (lesson.content) {
        const matches = lesson.content.match(pattern.regex);
        if (matches) {
          found = true;
          totalFound += matches.length;
          console.log(`  ❌ ${lesson.lesson_key}: ${matches.length} instances`);
          matches.slice(0, 3).forEach(m => {
            const shortened = m.length > 100 ? m.substring(0, 100) + '...' : m;
            console.log(`     - ${shortened}`);
          });
        }
      }
    });

    if (!found) {
      console.log(`  ✅ None found!\n`);
    } else {
      console.log('');
    }
  }

  if (totalFound === 0) {
    console.log('✅ All generic blue underlines have been removed!\n');
  } else {
    console.log(`⚠️  Found ${totalFound} remaining generic blue underlines\n`);
  }

  process.exit(0);
}

verifyNoGenericBlues();
