/**
 * PROPER SVG VALIDATION - Check if SVGs are actually well-formed
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const realErrors = [];

function validateSVGStructure(svgString, lessonKey, index) {
  const errors = [];

  // Check 1: Must start with <svg and end with </svg>
  if (!svgString.trim().startsWith('<svg')) {
    errors.push(`SVG #${index + 1}: Doesn't start with <svg`);
  }
  if (!svgString.trim().endsWith('</svg>')) {
    errors.push(`SVG #${index + 1}: Doesn't end with </svg>`);
  }

  // Check 2: Look for NaN or undefined
  if (svgString.includes('NaN') || svgString.includes('undefined')) {
    errors.push(`SVG #${index + 1}: Contains NaN or undefined`);
  }

  // Check 3: Check for unclosed <defs>, <g>, <text> tags (these MUST be closed)
  const mustCloseTags = ['defs', 'g', 'text', 'pattern', 'clipPath', 'mask'];
  mustCloseTags.forEach(tag => {
    const openRegex = new RegExp(`<${tag}[\\s>]`, 'g');
    const closeRegex = new RegExp(`</${tag}>`, 'g');
    const opens = (svgString.match(openRegex) || []).length;
    const closes = (svgString.match(closeRegex) || []).length;

    if (opens !== closes) {
      errors.push(`SVG #${index + 1}: Unclosed <${tag}> (open: ${opens}, close: ${closes})`);
    }
  });

  // Check 4: Validate path commands (use \s or ^ to ensure we match the 'd' attribute specifically)
  const pathMatches = svgString.match(/\sd="([^"]*)"/g) || [];
  pathMatches.forEach((pathAttr, i) => {
    const match = pathAttr.match(/\sd="([^"]*)"/);
    if (!match) return;
    const d = match[1];

    // Check for invalid path commands
    if (d.includes('NaN') || d.includes('undefined') || d.includes('null')) {
      errors.push(`SVG #${index + 1}: Invalid path data (contains NaN/undefined/null)`);
    }
    // Check path starts with a valid command
    if (d && !d.trim().match(/^[MLHVCSQTAZ]/i)) {
      errors.push(`SVG #${index + 1}: Path #${i + 1} starts with invalid command: "${d.trim().substring(0, 20)}"`);
    }
  });

  // Check 5: Validate coordinate attributes aren't NaN
  const coordAttrs = ['x1', 'y1', 'x2', 'y2', 'x', 'y', 'cx', 'cy', 'width', 'height', 'r', 'rx', 'ry'];
  coordAttrs.forEach(attr => {
    const regex = new RegExp(`${attr}="([^"]*)"`, 'g');
    let match;
    while ((match = regex.exec(svgString)) !== null) {
      const value = match[1];
      if (value === 'NaN' || value === 'undefined' || value === 'null') {
        errors.push(`SVG #${index + 1}: Attribute ${attr} has invalid value: ${value}`);
      }
    }
  });

  // Check 6: ViewBox for responsiveness
  if (!svgString.includes('viewBox')) {
    errors.push(`SVG #${index + 1}: Missing viewBox attribute (needed for responsiveness)`);
  }

  return errors;
}

async function validateLesson(lessonKey) {
  const { data: lesson } = await supabase
    .from('lessons')
    .select('content')
    .eq('lesson_key', lessonKey)
    .single();

  if (!lesson) return [];

  const svgs = lesson.content.match(/<svg[\s\S]*?<\/svg>/g) || [];
  const lessonErrors = [];

  svgs.forEach((svg, index) => {
    const errors = validateSVGStructure(svg, lessonKey, index);
    errors.forEach(error => {
      lessonErrors.push(`[${lessonKey}] ${error}`);
      realErrors.push({ lesson: lessonKey, error });
    });
  });

  return lessonErrors;
}

async function run() {
  console.log('╔══════════════════════════════════════════════════════════╗');
  console.log('║          PROPER SVG VALIDATION                           ║');
  console.log('╚══════════════════════════════════════════════════════════╝\n');

  const lessons = ['geometry-angles', 'geometry-shapes', 'lines', 'arcs-sectors', 'circles-ellipses'];

  for (const lessonKey of lessons) {
    console.log(`\nChecking ${lessonKey}...`);
    const errors = await validateLesson(lessonKey);
    if (errors.length === 0) {
      console.log(`  ✅ All SVGs are valid`);
    } else {
      errors.forEach(e => console.log(`  ❌ ${e}`));
    }
  }

  console.log('\n\n╔══════════════════════════════════════════════════════════╗');
  console.log('║                  SUMMARY                                 ║');
  console.log('╚══════════════════════════════════════════════════════════╝\n');

  if (realErrors.length === 0) {
    console.log('✅ ALL SVGs ARE VALID!');
  } else {
    console.log(`❌ Found ${realErrors.length} SVG errors:\n`);
    realErrors.forEach(({ lesson, error }, i) => {
      console.log(`${i + 1}. [${lesson}] ${error}`);
    });
  }
}

run().catch(console.error);
