/**
 * Check All Examples HTML - Find broken tags
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function checkAllExamples() {
  console.log('🔍 Checking all examples for HTML errors...\n');
  console.log('='.repeat(70));
  console.log('\n');

  const { data: lesson } = await supabase
    .from('lessons')
    .select('content')
    .eq('lesson_key', 'geometry-angles')
    .single();

  const content = lesson.content;

  for (let i = 1; i <= 3; i++) {
    console.log(`📝 Example ${i}:\n`);

    const exRegex = new RegExp(`<h4[^>]*>Example ${i}<\\/h4>([\\s\\S]*?)(?=<h4|$)`);
    const exMatch = content.match(exRegex);

    if (!exMatch) {
      console.log(`  ❌ Not found\n`);
      continue;
    }

    const exContent = exMatch[1];

    // Check for diagram
    const hasSVG = exContent.includes('<svg');
    console.log(`  Diagram: ${hasSVG ? '✅ Present' : '❌ Missing'}`);

    // Check answer choices - find the answer choice section
    const answerMatch = exContent.match(/([AB]\..*?°.*?<\/span>.*?[BCDE]\..*?°.*?<\/[^>]+>)/s);

    if (answerMatch) {
      console.log(`  Answer choices found:`);
      const answerSection = answerMatch[0];

      // Count opening and closing span tags
      const openSpans = (answerSection.match(/<span[^>]*>/g) || []).length;
      const closeSpans = (answerSection.match(/<\/span>/g) || []).length;

      console.log(`    Opening <span> tags: ${openSpans}`);
      console.log(`    Closing </span> tags: ${closeSpans}`);

      if (openSpans !== closeSpans) {
        console.log(`    ⚠️  MISMATCH! HTML is broken`);
        console.log(`\n    Raw HTML:`);
        console.log(`    ${answerSection.substring(0, 300)}...\n`);
      } else {
        console.log(`    ✅ Tags match`);
      }
    }

    console.log('');
  }

  console.log('='.repeat(70));
}

checkAllExamples();
