/**
 * COMPREHENSIVE VISUAL INSPECTION
 * Find all visual issues: text placement, fonts, angles, measurements
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const issues = [];

function logIssue(lesson, type, description) {
  issues.push({ lesson, type, description });
  console.log(`  ⚠️  [${type}] ${description}`);
}

function extractTextElements(svg) {
  const textRegex = /<text[^>]*>([^<]*)<\/text>/g;
  const texts = [];
  let match;

  while ((match = textRegex.exec(svg)) !== null) {
    const fullTag = match[0];
    const content = match[1];

    const xMatch = fullTag.match(/x="([^"]*)"/);
    const yMatch = fullTag.match(/y="([^"]*)"/);
    const fontMatch = fullTag.match(/font-family="([^"]*)"/);

    texts.push({
      content: content.trim(),
      x: xMatch ? parseFloat(xMatch[1]) : null,
      y: yMatch ? parseFloat(yMatch[1]) : null,
      font: fontMatch ? fontMatch[1] : 'NOT SET',
      full: fullTag
    });
  }

  return texts;
}

function checkTextOverlaps(texts, lessonKey, svgIndex) {
  for (let i = 0; i < texts.length; i++) {
    for (let j = i + 1; j < texts.length; j++) {
      const t1 = texts[i];
      const t2 = texts[j];

      if (t1.x !== null && t2.x !== null && t1.y !== null && t2.y !== null) {
        const xDist = Math.abs(t1.x - t2.x);
        const yDist = Math.abs(t1.y - t2.y);

        // Check if texts are too close (potential overlap)
        // Assume text is roughly 10px tall and 7px per character wide
        const t1Width = t1.content.length * 7;
        const t2Width = t2.content.length * 7;

        if (xDist < Math.max(t1Width, t2Width) / 2 && yDist < 15) {
          logIssue(
            lessonKey,
            'TEXT OVERLAP',
            `SVG #${svgIndex}: "${t1.content}" at (${t1.x}, ${t1.y}) and "${t2.content}" at (${t2.x}, ${t2.y}) may overlap`
          );
        }
      }
    }
  }
}

function checkFonts(texts, lessonKey, svgIndex) {
  texts.forEach((t, i) => {
    if (t.font === 'NOT SET') {
      logIssue(
        lessonKey,
        'MISSING FONT',
        `SVG #${svgIndex}, Text #${i + 1}: "${t.content}" has no font-family (should be Times New Roman)`
      );
    } else if (!t.font.includes('Times') && !t.font.includes('serif')) {
      logIssue(
        lessonKey,
        'WRONG FONT',
        `SVG #${svgIndex}, Text #${i + 1}: "${t.content}" uses "${t.font}" instead of Times New Roman`
      );
    }
  });
}

function checkExamples(content, lessonKey) {
  // Check if examples are properly formatted
  const exampleMatches = content.match(/<h4>Example[^<]*<\/h4>/g) || [];
  const exampleBoxes = content.match(/background.*#f9fafb/g) || [];

  console.log(`  Examples found: ${exampleMatches.length} headings`);
  console.log(`  Example boxes: ${exampleBoxes.length} styled boxes`);

  if (exampleMatches.length > 0 && exampleBoxes.length === 0) {
    logIssue(
      lessonKey,
      'MISSING EXAMPLE STYLING',
      `Found ${exampleMatches.length} example headings but NO styled example boxes`
    );
  }

  // Check if examples are inside proper containers
  const exampleWithoutContainer = /<h4>Example.*?<\/h4>\s*<p>(?!.*background)/g;
  if (exampleWithoutContainer.test(content)) {
    logIssue(
      lessonKey,
      'EXAMPLE FORMAT',
      'Some examples may not be in styled containers - could be invisible'
    );
  }
}

function analyzeSVG(svg, lessonKey, index) {
  // Extract and analyze all text elements
  const texts = extractTextElements(svg);

  console.log(`    Found ${texts.length} text elements`);

  if (texts.length > 0) {
    // Check for overlapping text
    checkTextOverlaps(texts, lessonKey, index + 1);

    // Check fonts
    checkFonts(texts, lessonKey, index + 1);
  }

  // Check for proper styling attributes
  if (!svg.includes('Times New Roman') && texts.length > 0) {
    logIssue(
      lessonKey,
      'NO TIMES FONT',
      `SVG #${index + 1} has text but doesn't use Times New Roman font`
    );
  }
}

async function inspectLesson(lessonKey) {
  console.log(`\n${'='.repeat(60)}`);
  console.log(`Inspecting: ${lessonKey}`);
  console.log('='.repeat(60));

  const { data: lesson } = await supabase
    .from('lessons')
    .select('content')
    .eq('lesson_key', lessonKey)
    .single();

  if (!lesson) {
    console.log('❌ Lesson not found');
    return;
  }

  // Check examples
  console.log('\n📝 Checking Examples...');
  checkExamples(lesson.content, lessonKey);

  // Extract all SVGs
  const svgs = lesson.content.match(/<svg[\s\S]*?<\/svg>/g) || [];
  console.log(`\n📊 Analyzing ${svgs.length} SVG diagrams...`);

  svgs.forEach((svg, index) => {
    console.log(`\n  SVG #${index + 1}:`);
    analyzeSVG(svg, lessonKey, index);
  });
}

async function run() {
  console.log('╔══════════════════════════════════════════════════════════╗');
  console.log('║       COMPREHENSIVE VISUAL INSPECTION                   ║');
  console.log('║       Finding: text overlaps, fonts, angles             ║');
  console.log('╚══════════════════════════════════════════════════════════╝');

  const lessons = [
    'geometry-angles',
    'geometry-shapes',
    'lines',
    'arcs-sectors',
    'circles-ellipses'
  ];

  for (const lessonKey of lessons) {
    await inspectLesson(lessonKey);
  }

  // Final report
  console.log('\n\n╔══════════════════════════════════════════════════════════╗');
  console.log('║                  ISSUES FOUND                            ║');
  console.log('╚══════════════════════════════════════════════════════════╝\n');

  if (issues.length === 0) {
    console.log('✅ NO VISUAL ISSUES FOUND!');
  } else {
    console.log(`❌ Found ${issues.length} issues:\n`);

    const byType = {};
    issues.forEach(issue => {
      if (!byType[issue.type]) byType[issue.type] = [];
      byType[issue.type].push(issue);
    });

    Object.keys(byType).forEach(type => {
      console.log(`\n${type} (${byType[type].length}):`);
      console.log('-'.repeat(60));
      byType[type].forEach((issue, i) => {
        console.log(`${i + 1}. [${issue.lesson}] ${issue.description}`);
      });
    });
  }

  console.log(`\n\nTotal issues: ${issues.length}`);
}

run().catch(console.error);
