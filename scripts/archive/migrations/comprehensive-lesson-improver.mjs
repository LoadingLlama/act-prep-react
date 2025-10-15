import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import * as cheerio from 'cheerio';
import fs from 'fs';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Improved lesson templates with visuals
const improvedLessons = {
  'fractions': fs.readFileSync('./improved-fractions-test.html', 'utf8'),
  'inequalities': fs.readFileSync('./improved-inequalities-test.html', 'utf8'),
  'percentages': fs.readFileSync('./improved-percentages-test.html', 'utf8'),
  'geometry-shapes': fs.readFileSync('./improved-geometry-shapes-test.html', 'utf8')
};

// Helper function to create visual for number line
function createNumberLineVisual(values, highlight = null) {
  const width = 400;
  const height = 80;
  const startX = 50;
  const endX = 350;
  const y = 40;

  const range = Math.max(...values) - Math.min(...values);
  const scale = (endX - startX) / range;

  let svg = `<svg width="${width}" height="${height}" style="display: block; margin: 1rem auto;">
  <line x1="${startX}" y1="${y}" x2="${endX}" y2="${y}" stroke="#333" stroke-width="2"/>`;

  values.forEach(val => {
    const x = startX + (val - Math.min(...values)) * scale;
    svg += `
  <line x1="${x}" y1="${y-5}" x2="${x}" y2="${y+5}" stroke="#333" stroke-width="2"/>
  <text x="${x}" y="${y+20}" text-anchor="middle" font-size="14">${val}</text>`;
  });

  svg += '\n</svg>';
  return svg;
}

// Helper function to create visual for fractions
function createFractionVisual(numerator, denominator, color = '#4A90E2') {
  const boxWidth = 50;
  const boxHeight = 40;
  const spacing = 5;
  const totalWidth = denominator * (boxWidth + spacing);

  let svg = `<svg width="${totalWidth + 20}" height="80" style="display: block; margin: 1rem auto;">`;

  for (let i = 0; i < denominator; i++) {
    const fill = i < numerator ? color : 'white';
    const x = 10 + i * (boxWidth + spacing);
    svg += `
  <rect x="${x}" y="20" width="${boxWidth}" height="${boxHeight}" fill="${fill}" stroke="#2E5C8A" stroke-width="2"/>`;
  }

  svg += `
  <text x="${totalWidth/2 + 10}" y="75" text-anchor="middle" font-size="14" fill="#333">${numerator}/${denominator}</text>
</svg>`;

  return svg;
}

// Function to improve specific lesson types
function improveLesson(lessonKey, currentContent) {
  // If we have a pre-made improved version, use it
  if (improvedLessons[lessonKey]) {
    return improvedLessons[lessonKey];
  }

  // Otherwise, apply general improvements
  const $ = cheerio.load(currentContent, { xmlMode: false, decodeEntities: false });

  // Ensure lesson-intro class exists
  const firstP = $('.lesson-content > p').first();
  if (firstP.length && !firstP.hasClass('lesson-intro')) {
    firstP.addClass('lesson-intro');
  }

  // Improve step-by-step sections
  $('p').each(function() {
    const $p = $(this);
    const html = $p.html();

    // Add emphasis to key rules
    if (html.match(/rule|important|remember|key point/i) && !html.includes('background:')) {
      $p.attr('style', 'background: #FFF3CD; padding: 1rem; border-left: 4px solid #FFA500; margin: 1rem 0;');
    }
  });

  // Make formulas more prominent
  $('p').each(function() {
    const $p = $(this);
    const text = $p.text().trim();

    // If paragraph contains only a formula (mathematical symbols)
    if (text.match(/^[a-z]\s*=.*[+\-×÷]/i) && text.length < 50) {
      const currentHtml = $p.html();
      if (!currentHtml.includes('<strong>')) {
        $p.html('<strong>' + currentHtml + '</strong>');
      }
    }
  });

  return $.html('.lesson-content');
}

// Main function to update all lessons
async function updateAllLessons() {
  console.log('📚 Improving all math lessons with better teaching and visuals...\\n');

  const { data: lessons, error } = await supabase
    .from('lessons')
    .select('*')
    .eq('subject', 'math')
    .order('order_index');

  if (error) {
    console.error('❌ Error:', error);
    return;
  }

  console.log(`Found ${lessons.length} math lessons\\n`);

  let successCount = 0;

  for (let i = 0; i < lessons.length; i++) {
    const lesson = lessons[i];
    console.log(`[${i + 1}/${lessons.length}] ${lesson.title} (${lesson.lesson_key})`);

    try {
      const improved = improveLesson(lesson.lesson_key, lesson.content);

      const { error: updateError } = await supabase
        .from('lessons')
        .update({
          content: improved,
          updated_at: new Date().toISOString()
        })
        .eq('id', lesson.id);

      if (updateError) {
        console.log(`  ❌ Error:`, updateError.message);
      } else {
        console.log(`  ✅ Improved`);
        successCount++;
      }
    } catch (err) {
      console.log(`  ❌ Error:`, err.message);
    }
  }

  console.log('\\n' + '='.repeat(60));
  console.log(`✅ Successfully improved: ${successCount}/${lessons.length} lessons`);
  console.log('='.repeat(60));
}

// Test first - let's just validate the improved lessons
console.log('Testing improved lesson files...\\n');

Object.keys(improvedLessons).forEach(key => {
  console.log(`✓ ${key}: ${improvedLessons[key].length} characters`);

  // Validate SVG syntax
  const svgCount = (improvedLessons[key].match(/<svg/g) || []).length;
  const svgCloseCount = (improvedLessons[key].match(/<\/svg>/g) || []).length;

  if (svgCount !== svgCloseCount) {
    console.log(`  ⚠️  Warning: SVG tag mismatch (${svgCount} open, ${svgCloseCount} close)`);
  } else if (svgCount > 0) {
    console.log(`  ✓ ${svgCount} SVG visual(s) validated`);
  }
});

console.log('\\n' + '='.repeat(60));
console.log('Applying improvements to all math lessons...');
console.log('='.repeat(60));

// Run the update:
updateAllLessons();
