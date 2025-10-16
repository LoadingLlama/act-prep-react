import { readFileSync, writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const lessons = [
  { key: '2.3', file: 'LESSON_2_3_LINES.html' },
  { key: '2.4', file: 'LESSON_2_4_ARCS_SECTORS.html' },
  { key: '2.5', file: 'LESSON_2_5_CIRCLES_ELLIPSES_HYPERBOLAS.html' },
  { key: '3.1', file: 'LESSON_3_1_ALGEBRA_SKILLS.html' },
  { key: '3.2', file: 'LESSON_3_2_FRACTIONS.html' },
  { key: '3.3', file: 'LESSON_3_3_EXPONENTS_ROOTS.html' }
];

function fixMasteryCheckFormat(content) {
  // Step 1: Add opening div after Mastery Check heading and intro
  content = content.replace(
    /(<h3 style="margin-top: 5rem; margin-bottom: 0\.75rem; font-weight: 700;">Mastery Check<\/h3>\s*<p style="font-size: 16px; line-height: 1\.7; margin: 0\.5rem 0 1rem 0;">Test your understanding[^<]+<\/p>)/,
    '$1\n\n<div style="border: 3px solid #b91c1c; border-radius: 8px; padding: 2rem; margin: 2rem 0; background-color: #fff;">'
  );

  // Step 2: Update intro paragraph margin
  content = content.replace(
    /(<h3 style="margin-top: 5rem; margin-bottom: 0\.75rem; font-weight: 700;">Mastery Check<\/h3>[^<]*<div[^>]+>\s*)<p style="font-size: 16px; line-height: 1\.7; margin: 0\.5rem 0 1rem 0;">/,
    '$1<p style="font-size: 16px; line-height: 1.7; margin: 0 0 2rem 0;">'
  );

  // Step 3: Replace all Question headers - remove blue border styling
  content = content.replace(
    /<h4 style="margin: 0 0 1rem 0; padding-left: 0\.75rem; border-left: 4px solid #3b82f6; color: #000000; font-weight: 700;">Question (\d+)<\/h4>/g,
    '<h4 style="margin: 2rem 0 1rem 0; color: #000000; font-weight: 700; font-size: 18px;">Question $1</h4>'
  );

  // Step 4: Update details margins (all but the last one)
  content = content.replace(
    /<details style="margin-top: 15px;">/g,
    '<details style="margin: 1rem 0 2rem 0;">'
  );

  // Step 5: Find the last details tag and add closing div after it
  // First, let's find all details blocks
  const detailsRegex = /<details[^>]*>[\s\S]*?<\/details>/g;
  const matches = [...content.matchAll(detailsRegex)];

  if (matches.length > 0) {
    const lastDetails = matches[matches.length - 1][0];
    const lastDetailsIndex = content.lastIndexOf(lastDetails);
    const afterLastDetails = lastDetailsIndex + lastDetails.length;

    // Update the last details margin
    const updatedLastDetails = lastDetails.replace(
      /style="margin: 1rem 0 2rem 0;"/,
      'style="margin: 1rem 0 1rem 0;"'
    );

    content = content.substring(0, lastDetailsIndex) +
              updatedLastDetails +
              '\n\n</div>' +
              content.substring(afterLastDetails);
  }

  return content;
}

for (const lesson of lessons) {
  const filePath = resolve(__dirname, '../docs', lesson.file);

  console.log(`\nProcessing ${lesson.key}: ${lesson.file}...`);

  try {
    const content = readFileSync(filePath, 'utf8');
    const updatedContent = fixMasteryCheckFormat(content);
    writeFileSync(filePath, updatedContent, 'utf8');
    console.log(`✓ Fixed Mastery Check format for lesson ${lesson.key}`);
  } catch (error) {
    console.error(`✗ Error processing ${lesson.key}:`, error.message);
  }
}

console.log('\n✅ All lessons processed!');
