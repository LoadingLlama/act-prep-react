import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function checkVisualIssues() {
  const testLessons = ['trigonometry', 'geometry-shapes', 'functions', 'quadratics'];

  console.log('🔍 Checking for visual issues in math lessons...\n');

  for (const lessonKey of testLessons) {
    const { data } = await supabase
      .from('lessons')
      .select('content')
      .eq('lesson_key', lessonKey)
      .single();

    if (!data) continue;

    console.log(`\n${'='.repeat(60)}`);
    console.log(`Lesson: ${lessonKey}`);
    console.log('='.repeat(60));

    const content = data.content;
    const issues = [];

    // Check for SVG issues
    if (content.includes('<svg')) {
      const svgCount = (content.match(/<svg/g) || []).length;
      console.log(`\nSVG Graphics: ${svgCount} found`);

      // Check for malformed attributes
      if (content.match(/[xy]1="/)) {
        issues.push('  ❌ Malformed SVG attributes (x1/y1 instead of x/y)');
      }

      // Check for thick strokes
      if (content.includes('stroke-width="4"') || content.includes('stroke-width="5"')) {
        issues.push('  ❌ Thick SVG strokes (4-5px)');
      }

      // Check for overlapping text (text elements too close together)
      const textMatches = content.match(/<text[^>]*y="(\d+)"[^>]*>/g);
      if (textMatches && textMatches.length > 5) {
        issues.push('  ⚠️  Many text elements - potential overlap');
      }

      // Check for arrow markers
      if (content.includes('marker-end') || content.includes('markerWidth')) {
        console.log('  ℹ️  Arrow markers present');
      }
    }

    // Check for color overload
    const colorMatches = content.match(/background: #[0-9a-f]{6}/g);
    if (colorMatches && colorMatches.length > 10) {
      issues.push(`  ❌ Too many colors (${colorMatches.length} different backgrounds)`);
    }

    // Check for large font sizes
    if (content.includes('font-size: 2rem') || content.includes('font-size: 1.6rem')) {
      issues.push('  ❌ Large font sizes (2rem, 1.6rem)');
    }

    // Check for gradient backgrounds
    if (content.includes('linear-gradient')) {
      issues.push('  ❌ Gradient backgrounds still present');
    }

    // Check for emojis
    const emojiCount = (content.match(/[🔑📋💡⚠️]/g) || []).length;
    if (emojiCount > 0) {
      issues.push(`  ❌ Emojis in content (${emojiCount} found)`);
    }

    // Print issues
    if (issues.length > 0) {
      console.log('\nIssues found:');
      issues.forEach(issue => console.log(issue));
    } else {
      console.log('\n✅ No major issues found');
    }
  }

  console.log(`\n${'='.repeat(60)}\n`);
}

checkVisualIssues();
