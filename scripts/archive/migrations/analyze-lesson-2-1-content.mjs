/**
 * Analyze Lesson 2.1 Content - Find all diagrams and identify duplicates
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function analyzeLesson() {
  console.log('📖 Analyzing Lesson 2.1 content...\n');

  const { data: lesson, error } = await supabase
    .from('lessons')
    .select('*')
    .eq('lesson_key', 'geometry-angles')
    .single();

  if (error) {
    console.error('❌ Error:', error);
    return;
  }

  console.log('✅ Retrieved lesson content\n');

  const content = lesson.content;

  // Save full content to file for inspection
  fs.writeFileSync('lesson-2-1-full-content.html', content);
  console.log('📄 Saved full content to: lesson-2-1-full-content.html\n');

  // Count SVG diagrams
  const svgMatches = content.match(/<svg[^>]*>[\s\S]*?<\/svg>/gi) || [];
  console.log(`🎨 Found ${svgMatches.length} SVG diagrams\n`);

  // Identify parallel lines diagrams (look for parallel lines indicators)
  const parallelLinesDiagrams = svgMatches.filter(svg =>
    svg.includes('parallel') ||
    svg.includes('transversal') ||
    (svg.match(/<line/g) || []).length >= 3 // At least 3 lines = likely parallel lines + transversal
  );

  console.log(`📐 Found ${parallelLinesDiagrams.length} parallel lines diagrams\n`);

  // Find examples (look for "Example" headers)
  const exampleMatches = content.match(/<h3>Example \d+:.*?<\/h3>/gi) || [];
  console.log(`📝 Found ${exampleMatches.length} examples:`);
  exampleMatches.forEach((ex, i) => {
    console.log(`  ${i + 1}. ${ex.replace(/<\/?h3>/g, '')}`);
  });
  console.log('');

  // Find test sections
  const testMatches = content.match(/<h3>.*?Test.*?<\/h3>/gi) || [];
  console.log(`📋 Found ${testMatches.length} test sections:`);
  testMatches.forEach((test, i) => {
    console.log(`  ${i + 1}. ${test.replace(/<\/?h3>/g, '')}`);
  });
  console.log('');

  // Check for duplicates - look for repeated blocks
  const contentSections = content.split(/<h3>/);
  const testSections = contentSections.filter(section => section.toLowerCase().includes('test'));

  console.log('🔍 Analyzing test sections for duplicates...');
  const testContents = testSections.map(s => s.substring(0, 200)); // First 200 chars of each
  const duplicates = testContents.filter((item, index) =>
    testContents.indexOf(item) !== index
  );

  if (duplicates.length > 0) {
    console.log(`⚠️  Found ${duplicates.length} duplicate test sections!`);
  } else {
    console.log('✅ No duplicate test sections detected (by this method)');
  }

  console.log('\n📊 Summary:');
  console.log(`  - Total SVGs: ${svgMatches.length}`);
  console.log(`  - Parallel lines diagrams: ${parallelLinesDiagrams.length}`);
  console.log(`  - Examples: ${exampleMatches.length}`);
  console.log(`  - Test sections: ${testMatches.length}`);
  console.log(`  - Content length: ${content.length} characters`);
}

analyzeLesson();
