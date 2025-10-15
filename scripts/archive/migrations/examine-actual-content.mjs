/**
 * Examine Actual Content - See what's really there
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function examineContent() {
  console.log('🔍 Examining actual content...\n');

  const { data: lesson } = await supabase
    .from('lessons')
    .select('content')
    .eq('lesson_key', 'geometry-angles')
    .single();

  const content = lesson.content;

  // Find all plain <p> tags
  const plainPRegex = /<p>([^]*?)<\/p>/g;
  const matches = [...content.matchAll(plainPRegex)];

  console.log(`Found ${matches.length} <p> tags total\n`);

  // Filter to only those WITHOUT style attribute
  const unstyledMatches = matches.filter(m => !m[0].includes('style='));

  console.log(`Found ${unstyledMatches.length} UNSTYLED <p> tags:\n`);

  unstyledMatches.forEach((match, i) => {
    console.log(`${i + 1}. ${match[0].substring(0, 150)}`);
    console.log(`   Full: "${match[0]}"\n`);
  });

  // Also check for the 14px
  const pxMatch = content.match(/font-size:\s*14px[^>]*>[^<]*<[^>]*>[^<]*/);
  if (pxMatch) {
    console.log('14px context:');
    const idx = content.indexOf('font-size: 14px');
    console.log(content.substring(idx - 100, idx + 200));
  }
}

examineContent();
