import { readFileSync, writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const lessons = [
  { key: '2.2', file: 'LESSON_2_2_AREAS_VOLUMES_TRIANGLES.html' },
  { key: '2.3', file: 'LESSON_2_3_LINES.html' },
  { key: '2.4', file: 'LESSON_2_4_ARCS_SECTORS.html' },
  { key: '2.5', file: 'LESSON_2_5_CIRCLES_ELLIPSES_HYPERBOLAS.html' },
  { key: '3.1', file: 'LESSON_3_1_ALGEBRA_SKILLS.html' },
  { key: '3.2', file: 'LESSON_3_2_FRACTIONS.html' },
  { key: '3.3', file: 'LESSON_3_3_EXPONENTS_ROOTS.html' }
];

function removeMasteryCheckSection(content) {
  // Find the Mastery Check section and remove everything from there to the end
  // The Mastery Check section starts with <h3...>Mastery Check</h3>
  const masteryCheckRegex = /<h3[^>]*>Mastery Check<\/h3>[\s\S]*$/;

  const beforeMastery = content.replace(masteryCheckRegex, '');

  return beforeMastery.trim();
}

for (const lesson of lessons) {
  const filePath = resolve(__dirname, '../docs', lesson.file);

  console.log(`\nProcessing ${lesson.key}: ${lesson.file}...`);

  try {
    const content = readFileSync(filePath, 'utf8');
    const originalLength = content.length;

    const updatedContent = removeMasteryCheckSection(content);
    const newLength = updatedContent.length;

    writeFileSync(filePath, updatedContent, 'utf8');

    console.log(`✓ Removed Mastery Check section from lesson ${lesson.key}`);
    console.log(`  Original: ${originalLength} chars → New: ${newLength} chars (removed ${originalLength - newLength} chars)`);
  } catch (error) {
    console.error(`✗ Error processing ${lesson.key}:`, error.message);
  }
}

console.log('\n✅ All Mastery Check sections removed!');
