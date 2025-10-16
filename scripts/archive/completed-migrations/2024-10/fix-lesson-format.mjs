import { readFileSync, writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const lessons = [
  '2.5',
  '3.1',
  '3.2',
  '3.3'
];

const lessonFiles = {
  '2.5': 'LESSON_2_5_CIRCLES_ELLIPSES_HYPERBOLAS.html',
  '3.1': 'LESSON_3_1_ALGEBRA_SKILLS.html',
  '3.2': 'LESSON_3_2_FRACTIONS.html',
  '3.3': 'LESSON_3_3_EXPONENTS_ROOTS.html'
};

function fixLesson(content) {
  // Step 1: Fix example headers - make them consistent with the red border format
  content = content.replace(
    /<h4 style="margin: 2rem 0 1rem 0; padding-left: 0\.75rem; border-left: 4px solid #b91c1c; color: #000000; font-weight: 700;">Example (\d+):/g,
    '<h4 style="margin: 0 0 1rem 0; padding-left: 0.75rem; border-left: 4px solid #b91c1c; color: #000000; font-weight: 700;">Example $1:'
  );

  // Step 2: Convert collapsible example solutions to visible format
  // Match the entire details block for examples
  content = content.replace(
    /<details style="[^"]*">[\s\S]*?<summary[^>]*>Show Solution<\/summary>[\s\S]*?<div[^>]*>([\s\S]*?)<\/div>[\s\S]*?<\/details>/g,
    (match, innerContent) => {
      return innerContent.trim();
    }
  );

  // Step 3: Fix Mastery Check section - wrap in red box
  // First, find the Mastery Check section
  const masteryCheckStart = content.indexOf('<h3 style="margin-top: 5rem; margin-bottom: 1rem; font-weight: 700;">Mastery Check</h3>');

  if (masteryCheckStart === -1) return content; // No Mastery Check found

  const beforeMastery = content.substring(0, masteryCheckStart);
  let afterMasteryStart = content.substring(masteryCheckStart);

  // Replace the Mastery Check header and intro
  afterMasteryStart = afterMasteryStart.replace(
    /(<h3 style="margin-top: 5rem; margin-bottom: 1rem; font-weight: 700;">Mastery Check<\/h3>\s*<p[^>]*>Test your understanding[^<]*<\/p>)/,
    '<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">Mastery Check</h3>\n\n<div style="border: 3px solid #b91c1c; border-radius: 8px; padding: 2rem; margin: 2rem 0; background-color: #fff;">\n\n<p style="font-size: 16px; line-height: 1.7; margin: 0 0 2rem 0;">Test your understanding with these ACT-style questions. Try them without looking back first!</p>'
  );

  // Step 4: Convert individual question boxes to simple headers
  afterMasteryStart = afterMasteryStart.replace(
    /<div style="background-color: #f9fafb; padding: 1\.5rem; margin: 1\.5rem 0; border-left: 4px solid #3b82f6; border-radius: 4px;">\s*<p style="font-weight: 600; margin: 0 0 0\.75rem 0; color: #1f2937;">Question (\d+)<\/p>/g,
    '<h4 style="margin: 2rem 0 1rem 0; color: #000000; font-weight: 700; font-size: 18px;">Question $1</h4>'
  );

  // Step 5: Convert answer details to simple collapsible format matching lesson 2.2
  afterMasteryStart = afterMasteryStart.replace(
    /<details style="margin-top: 1rem;">\s*<summary style="cursor: pointer; color: #3b82f6; font-weight: 600;">Show Answer<\/summary>\s*<p style="margin-top: 0\.5rem; color: #2e7d32; font-weight: 600;">Answer: ([A-E])<\/p>\s*<p style="margin-top: 0\.5rem; line-height: 1\.6;">([\s\S]*?)<\/p>\s*<\/details>\s*<\/div>/g,
    (match, answer, explanation) => {
      return `<details style="margin: 1rem 0 2rem 0;">
<summary style="cursor: pointer; color: #3b82f6; font-weight: bold;">Show Solution</summary>
<div style="margin-top: 10px; padding: 10px; background-color: #f0f9ff; border-radius: 5px;">
<p><strong>Answer: ${answer}</strong></p>
<p>${explanation.trim()}</p>
</div>
</details>`;
    }
  );

  // Step 6: Find the last </details> in the Mastery Check and add closing </div>
  const lastDetailsIndex = afterMasteryStart.lastIndexOf('</details>');
  if (lastDetailsIndex !== -1) {
    // Update the last details margin
    const beforeLastDetails = afterMasteryStart.substring(0, lastDetailsIndex);
    const lastDetailsStart = beforeLastDetails.lastIndexOf('<details');

    if (lastDetailsStart !== -1) {
      const detailsBlock = afterMasteryStart.substring(lastDetailsStart, lastDetailsIndex + '</details>'.length);
      const updatedDetails = detailsBlock.replace('margin: 1rem 0 2rem 0;', 'margin: 1rem 0 1rem 0;');

      afterMasteryStart = afterMasteryStart.substring(0, lastDetailsStart) +
                          updatedDetails +
                          '\n\n</div>' +
                          afterMasteryStart.substring(lastDetailsIndex + '</details>'.length);
    }
  }

  return beforeMastery + afterMasteryStart;
}

for (const key of lessons) {
  const fileName = lessonFiles[key];
  const filePath = resolve(__dirname, '../docs', fileName);

  console.log(`\nProcessing Lesson ${key}: ${fileName}...`);

  try {
    const content = readFileSync(filePath, 'utf8');
    const fixedContent = fixLesson(content);
    writeFileSync(filePath, fixedContent, 'utf8');
    console.log(`✓ Fixed format for lesson ${key}`);
  } catch (error) {
    console.error(`✗ Error processing ${key}:`, error.message);
  }
}

console.log('\n✅ All lessons processed!');
