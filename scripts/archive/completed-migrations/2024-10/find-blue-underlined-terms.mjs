import { readFileSync } from 'fs';
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

const allTerms = {};

for (const lesson of lessons) {
  const filePath = resolve(__dirname, '../docs', lesson.file);
  const content = readFileSync(filePath, 'utf8');

  // Match blue underlined strong tags
  const regex = /<strong style="[^"]*color:\s*#2563eb[^"]*text-decoration:\s*underline[^"]*">([^<]+)<\/strong>/gi;
  let match;

  const lessonTerms = new Set();

  while ((match = regex.exec(content)) !== null) {
    const term = match[1].trim();
    lessonTerms.add(term);
  }

  if (lessonTerms.size > 0) {
    allTerms[lesson.key] = Array.from(lessonTerms).sort();
    console.log(`\n${lesson.key} (${lessonTerms.size} terms):`);
    allTerms[lesson.key].forEach(term => console.log(`  - ${term}`));
  }
}

console.log(`\n\nTotal unique terms across all lessons: ${Object.values(allTerms).flat().filter((v, i, arr) => arr.indexOf(v) === i).length}`);

// Create a sorted list of all unique terms
const uniqueTerms = [...new Set(Object.values(allTerms).flat())].sort();
console.log(`\nUnique terms (sorted):`);
uniqueTerms.forEach(term => console.log(`  - ${term}`));
