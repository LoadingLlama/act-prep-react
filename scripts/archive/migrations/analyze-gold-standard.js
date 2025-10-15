const fs = require('fs');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_ANON_KEY
);

async function main() {
  console.log('='

.repeat(80));
  console.log('ULTRA-DEEP ANALYSIS OF GEOMETRY-ANGLES (Gold Standard 2.1)');
  console.log('='.repeat(80));
  console.log();

  const { data } = await supabase
    .from('lessons')
    .select('content')
    .eq('lesson_key', 'geometry-angles')
    .single();

  const content = data.content;

  // Save for manual inspection
  fs.writeFileSync('./geometry-angles-gold-standard.html', content);
  console.log('✓ Saved to ./geometry-angles-gold-standard.html');
  console.log();

  console.log('BASIC STATS');
  console.log('-'.repeat(40));
  console.log('Total length:', content.length, 'characters');
  console.log();

  // Count HTML elements
  console.log('HTML ELEMENT COUNTS');
  console.log('-'.repeat(40));
  console.log('H3 headers:', (content.match(/<h3/g) || []).length);
  console.log('H4 headers:', (content.match(/<h4/g) || []).length);
  console.log('Paragraphs:', (content.match(/<p /g) || []).length);
  console.log('UL lists:', (content.match(/<ul /g) || []).length);
  console.log('LI items:', (content.match(/<li /g) || []).length);
  console.log('Examples:', (content.match(/Example \d/g) || []).length);
  console.log();

  // Analyze H3 headers
  console.log('H3 HEADERS (Main Sections)');
  console.log('-'.repeat(40));
  const h3Matches = content.matchAll(/<h3[^>]*>(.*?)<\/h3>/gs);
  for (const match of h3Matches) {
    const text = match[1].replace(/<[^>]*>/g, '');
    console.log(`  ${text}`);
  }
  console.log();

  // Analyze H4 headers
  console.log('H4 HEADERS (Subsections)');
  console.log('-'.repeat(40));
  const h4Matches = content.matchAll(/<h4[^>]*>(.*?)<\/h4>/gs);
  let h4Count = 0;
  for (const match of h4Matches) {
    const text = match[1].replace(/<[^>]*>/g, '');
    console.log(`  ${text}`);
    h4Count++;
    if (h4Count > 10) {
      console.log('  ... and more');
      break;
    }
  }
  console.log();

  // Analyze blue underlined terms
  console.log('BLUE UNDERLINED TERMS');
  console.log('-'.repeat(40));
  const blueTerms = content.matchAll(/<strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">(.*?)<\/strong>/g);
  let termCount = 0;
  for (const match of blueTerms) {
    console.log(`  "${match[1]}"`);
    termCount++;
    if (termCount > 15) {
      console.log('  ... and more');
      break;
    }
  }
  console.log();

  // Analyze example structure
  console.log('EXAMPLE STRUCTURE');
  console.log('-'.repeat(40));
  const exampleMatches = content.matchAll(/<h4 style="margin: 0 0 1rem 0; padding-left: 0\.75rem; border-left: 4px solid #b91c1c;[^"]*">(.*?)<\/h4>/g);
  for (const match of exampleMatches) {
    console.log(`  ${match[1]}`);
  }
  console.log();

  // Analyze spacing in first section
  console.log('DETAILED SPACING ANALYSIS (First Section)');
  console.log('-'.repeat(40));
  const firstSection = content.substring(0, 2000);
  console.log('First 2000 chars:\n');
  console.log(firstSection);
  console.log();

  // Analyze all inline styles
  console.log('ALL UNIQUE INLINE STYLES');
  console.log('-'.repeat(40));
  const styleMatches = content.matchAll(/style="([^"]*)"/g);
  const styles = new Set();
  for (const match of styleMatches) {
    styles.add(match[1]);
  }
  console.log(`Total unique styles: ${styles.size}`);
  console.log();
  let styleNum = 0;
  for (const style of styles) {
    styleNum++;
    console.log(`${styleNum}. ${style}`);
    if (styleNum > 20) {
      console.log('   ... and more');
      break;
    }
  }

  process.exit(0);
}

main();
