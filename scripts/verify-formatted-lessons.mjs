import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: resolve(__dirname, '../.env') });

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function verify() {
  console.log('🔍 VERIFYING FORMATTED LESSON CONTENT...\n');

  // Check 5 random lessons that should have been formatted
  const { data: lessons } = await supabase
    .from('lessons')
    .select('id, title, lesson_key, content')
    .neq('lesson_key', 'geometry-angles')
    .limit(5);

  let allGood = true;

  for (const lesson of lessons) {
    console.log(`\n📝 Checking: ${lesson.title}`);
    console.log(`   Key: ${lesson.lesson_key}`);

    // Check if content has blue underlined terms (inline style)
    const hasInlineStyles = lesson.content?.includes('color: #2563eb; font-weight: 600; text-decoration: underline');

    // Check if content has bullet points with proper styling
    const hasBullets = lesson.content?.includes('<ul style="margin: 0.3rem 0 0.5rem 0');

    // Check if content has h3 headings
    const hasHeadings = lesson.content?.includes('<h3 style="margin-top: 5rem');

    // Count styled terms
    const termMatches = lesson.content?.match(/color: #2563eb; font-weight: 600; text-decoration: underline/g);
    const termCount = termMatches?.length || 0;

    console.log(`   ✓ Has blue underlined terms: ${hasInlineStyles ? '✅' : '❌'} (${termCount} terms)`);
    console.log(`   ✓ Has styled bullet points: ${hasBullets ? '✅' : '❌'}`);
    console.log(`   ✓ Has styled headings: ${hasHeadings ? '✅' : '❌'}`);

    // Show first 300 chars of content
    console.log(`\n   Content preview:`);
    console.log(`   ${lesson.content?.substring(0, 300)}...`);

    if (!hasInlineStyles || !hasBullets || !hasHeadings) {
      allGood = false;
      console.log('   ⚠️  MISSING FORMATTING!');
    }
  }

  console.log('\n' + '='.repeat(50));
  if (allGood) {
    console.log('✅ ALL CHECKED LESSONS ARE PROPERLY FORMATTED!');
  } else {
    console.log('❌ SOME LESSONS ARE MISSING FORMATTING!');
  }
}

verify();
