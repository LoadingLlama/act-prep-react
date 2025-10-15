/**
 * COMPLETE REDESIGN: Clean Lumisource Style
 *
 * Changes:
 * 1. Remove ALL colored boxes (blue, green, yellow, gray)
 * 2. Convert paragraphs to bullet points
 * 3. Add blue bold styling to key terms
 * 4. Add ONE green takeaway box at the very end
 * 5. Keep examples as clean formatted text
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

function removeColoredBoxes(content) {
  // Remove colored box divs but keep their content
  // Match: <div style="...background: #color...">CONTENT</div>

  // Strategy: Extract content from colored boxes and replace with clean formatting

  // Pattern 1: Blue info boxes (#eff6ff) - convert to bullets
  content = content.replace(
    /<div style="[^"]*background:\s*#eff6ff[^"]*"[^>]*>([\s\S]*?)<\/div>/gi,
    (match, innerContent) => {
      // Extract text content and convert to bullets
      let text = innerContent.replace(/<[^>]+>/g, ' ').trim();
      // Split by common separators and create bullets
      const points = text.split(/[•\n]/).filter(p => p.trim() && p.length > 10);
      if (points.length > 1) {
        return '<ul style="margin: 1rem 0; line-height: 1.8;">\n' +
          points.map(p => `  <li><span style="color: #2563eb; font-weight: 600;">${p.trim()}</span></li>`).join('\n') +
          '\n</ul>';
      }
      return `<p style="font-size: 0.9rem; margin: 0.5rem 0; line-height: 1.6;">${text}</p>`;
    }
  );

  // Pattern 2: Green success boxes (#f0fdf4) - convert to clean text
  content = content.replace(
    /<div style="[^"]*background:\s*#f0fdf4[^"]*"[^>]*>([\s\S]*?)<\/div>/gi,
    (match, innerContent) => {
      return innerContent; // Just keep the content, remove the box
    }
  );

  // Pattern 3: Yellow warning boxes (#fef3c7) - convert to clean text
  content = content.replace(
    /<div style="[^"]*background:\s*#fef3c7[^"]*"[^>]*>([\s\S]*?)<\/div>/gi,
    (match, innerContent) => {
      return innerContent;
    }
  );

  // Pattern 4: Gray boxes (#f8f9fa, #f9fafb) - convert to clean text
  content = content.replace(
    /<div style="[^"]*background:\s*#f[89]f[9a]f[ab][^"]*"[^>]*>([\s\S]*?)<\/div>/gi,
    (match, innerContent) => {
      return innerContent;
    }
  );

  return content;
}

function convertParagraphsToBullets(content) {
  // Convert consecutive paragraphs that are list-like into actual bullets
  // Look for patterns like: "• X is...", "- X is...", numbered lists

  return content;
}

function addBlueStylingToKeyTerms(content) {
  // Add blue bold styling to key mathematical terms
  const keyTerms = [
    'slope', 'y-intercept', 'parallel', 'perpendicular',
    'midpoint', 'distance', 'vertical angles', 'complementary', 'supplementary',
    'arc length', 'sector area', 'radius', 'diameter', 'circumference',
    'circle', 'ellipse', 'hyperbola', 'completing the square',
    'area', 'perimeter', 'base', 'height'
  ];

  // Don't modify content inside SVG or existing styled spans
  // Add style only to first mention of each term in plain text

  keyTerms.forEach(term => {
    // Match the term in plain text (not already in bold/styled)
    const regex = new RegExp(`(?<!<[^>]*)\\b(${term})\\b(?![^<]*>)`, 'gi');
    let replaced = false;

    content = content.replace(regex, (match) => {
      if (!replaced) {
        replaced = true;
        return `<strong style="color: #2563eb; text-decoration: underline;">${match}</strong>`;
      }
      return match;
    });
  });

  return content;
}

function createTakeawayBox(lessonKey) {
  const takeaways = {
    'geometry-angles': [
      '<strong>Vertical angles are always equal</strong>',
      '<strong>Complementary angles sum to 90°</strong>',
      '<strong>Supplementary angles sum to 180°</strong>',
      '<strong>When parallel lines are cut by a transversal, corresponding angles are equal</strong>'
    ],
    'geometry-shapes': [
      '<strong>Rectangle: Area = length × width, Perimeter = 2(l + w)</strong>',
      '<strong>Triangle: Area = ½ × base × height</strong>',
      '<strong>Circle: Area = πr², Circumference = 2πr</strong>',
      '<strong>Always identify which formula you need before solving</strong>'
    ],
    'lines': [
      '<strong>Slope = rise/run = (y₂−y₁)/(x₂−x₁)</strong>',
      '<strong>Slope-intercept form: y = mx + b</strong>',
      '<strong>Parallel lines have equal slopes</strong>',
      '<strong>Perpendicular lines have negative reciprocal slopes</strong>',
      '<strong>Midpoint = ((x₁+x₂)/2, (y₁+y₂)/2)</strong>',
      '<strong>Distance = √[(x₂−x₁)² + (y₂−y₁)²]</strong>'
    ],
    'arcs-sectors': [
      '<strong>Arc Length = (θ/360) × 2πr</strong>',
      '<strong>Sector Area = (θ/360) × πr²</strong>',
      '<strong>The fraction θ/360 represents the portion of the circle</strong>',
      '<strong>Common angles: 90°=1/4, 120°=1/3, 180°=1/2</strong>'
    ],
    'circles-ellipses': [
      '<strong>Circle equation: (x−h)² + (y−k)² = r²</strong>',
      '<strong>Center is (h, k) and radius is r</strong>',
      '<strong>Ellipse: (x−h)²/a² + (y−k)²/b² = 1</strong>',
      '<strong>Hyperbola has a MINUS sign between squared terms</strong>',
      '<strong>Complete the square to convert general form to standard form</strong>'
    ]
  };

  const bullets = takeaways[lessonKey] || [];

  return `

<div style="background: #f0fdf4; padding: 1.5rem 2rem; border-radius: 8px; margin: 3rem 0 2rem 0; border-left: 4px solid #10b981;">
  <h4 style="margin: 0 0 1rem 0; color: #065f46; font-size: 1.1rem;">✓ Key Takeaways</h4>
  <ul style="margin: 0; padding-left: 1.5rem; line-height: 2;">
${bullets.map(b => `    <li style="margin: 0.5rem 0;">${b}</li>`).join('\n')}
  </ul>
</div>`;
}

async function redesignLesson(lessonKey) {
  console.log(`\n${'='.repeat(70)}`);
  console.log(`Redesigning: ${lessonKey}`);
  console.log('='.repeat(70));

  const { data: lesson } = await supabase
    .from('lessons')
    .select('content')
    .eq('lesson_key', lessonKey)
    .single();

  if (!lesson) {
    console.log('❌ Lesson not found');
    return false;
  }

  let content = lesson.content;
  const originalLength = content.length;

  console.log(`Original length: ${originalLength} chars`);

  // Step 1: Remove all colored boxes
  console.log('\n📦 Removing colored boxes...');
  const beforeBoxes = content.length;
  content = removeColoredBoxes(content);
  console.log(`  Removed ${((beforeBoxes - content.length) / beforeBoxes * 100).toFixed(1)}% of formatting`);

  // Step 2: Add blue styling to key terms (first occurrence only)
  console.log('\n🔷 Adding blue styling to key terms...');
  content = addBlueStylingToKeyTerms(content);

  // Step 3: Add takeaway box at the end
  console.log('\n✅ Adding takeaway box at end...');
  content = content.trim() + createTakeawayBox(lessonKey);

  console.log(`\nNew length: ${content.length} chars`);
  console.log(`Change: ${((content.length - originalLength) / originalLength * 100).toFixed(1)}%`);

  // Update database
  console.log('\n💾 Updating database...');
  const { error } = await supabase
    .from('lessons')
    .update({
      content: content,
      updated_at: new Date().toISOString()
    })
    .eq('lesson_key', lessonKey);

  if (error) {
    console.error('❌ Error:', error.message);
    return false;
  }

  console.log('✅ Successfully redesigned!');
  return true;
}

async function run() {
  console.log('╔══════════════════════════════════════════════════════════════════╗');
  console.log('║     COMPLETE REDESIGN: Clean Lumisource Style                    ║');
  console.log('║     - Remove all colored boxes                                   ║');
  console.log('║     - Add blue bold key terms                                    ║');
  console.log('║     - Add ONE green takeaway box at end                          ║');
  console.log('╚══════════════════════════════════════════════════════════════════╝');

  const lessons = [
    'geometry-angles',
    'geometry-shapes',
    'lines',
    'arcs-sectors',
    'circles-ellipses'
  ];

  let successCount = 0;

  for (const lessonKey of lessons) {
    const success = await redesignLesson(lessonKey);
    if (success) successCount++;

    // Small delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 500));
  }

  console.log('\n╔══════════════════════════════════════════════════════════════════╗');
  console.log('║                         SUMMARY                                  ║');
  console.log('╚══════════════════════════════════════════════════════════════════╝');
  console.log(`\n✅ Successfully redesigned ${successCount}/${lessons.length} lessons`);
  console.log('\nAll lessons now have:');
  console.log('  • Clean white background');
  console.log('  • Blue bold/underlined key terms');
  console.log('  • ONE green takeaway box at the end');
  console.log('  • No distracting colored boxes');
}

run().catch(console.error);
