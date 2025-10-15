/**
 * Show EXACT Example 1 Content - Every character
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function showExactContent() {
  console.log('🔍 Fetching EXACT Example 1 content from database...\n');

  const { data: lesson } = await supabase
    .from('lessons')
    .select('content')
    .eq('lesson_key', 'geometry-angles')
    .single();

  const content = lesson.content;

  // Extract Example 1 EXACTLY
  const ex1Start = content.indexOf('<h4 style="margin-top: 1rem; margin-bottom: 0.5rem; font-size: 1.15rem;">Example 1</h4>');
  const ex2Start = content.indexOf('<h4 style="margin-top: 1rem; margin-bottom: 0.5rem; font-size: 1.15rem;">Example 2</h4>');

  if (ex1Start === -1) {
    console.log('❌ Could not find Example 1 header');
    return;
  }

  const example1Content = ex2Start !== -1
    ? content.substring(ex1Start, ex2Start)
    : content.substring(ex1Start, ex1Start + 3000);

  console.log('📊 Example 1 Content Length:', example1Content.length, 'characters\n');

  // Save to file
  fs.writeFileSync('/Users/cadenchiang/Desktop/act-prep-react/example-1-content.html', example1Content);
  console.log('✅ Saved to example-1-content.html\n');

  // Check for SVG
  const hasSVG = example1Content.includes('<svg');
  console.log(`Has <svg> tag: ${hasSVG ? '✅ YES' : '❌ NO'}\n`);

  if (hasSVG) {
    const svgStart = example1Content.indexOf('<svg');
    const svgEnd = example1Content.indexOf('</svg>') + 6;
    console.log('📐 SVG Position in Example 1:');
    console.log(`  Start: ${svgStart}`);
    console.log(`  End: ${svgEnd}`);
    console.log(`  Length: ${svgEnd - svgStart} characters\n`);

    // Show what comes BEFORE the SVG
    const beforeSVG = example1Content.substring(0, svgStart).substring(Math.max(0, svgStart - 200));
    console.log('📝 Content BEFORE SVG (last 200 chars):\n');
    console.log(beforeSVG);
    console.log('\n' + '='.repeat(70) + '\n');

    // Show what comes AFTER the SVG
    const afterSVG = example1Content.substring(svgEnd, svgEnd + 200);
    console.log('📝 Content AFTER SVG (first 200 chars):\n');
    console.log(afterSVG);
    console.log('\n');
  } else {
    console.log('⚠️  NO SVG FOUND IN EXAMPLE 1!\n');
    console.log('First 500 characters of Example 1:\n');
    console.log(example1Content.substring(0, 500));
  }
}

showExactContent();
