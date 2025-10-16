import { readFileSync, writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const lessons = [
  { key: '3.4', file: 'LESSON_3_4_LOGARITHMS.html' },
  { key: '3.5', file: 'LESSON_3_5_INEQUALITIES.html' },
  { key: '3.6', file: 'LESSON_3_6_ABSOLUTE_VALUE.html' }
];

console.log('\n🔧 FIXING HTML FORMATTING');
console.log('='.repeat(80));

for (const lesson of lessons) {
  const filePath = resolve(__dirname, '../docs', lesson.file);
  const html = readFileSync(filePath, 'utf8');

  console.log(`\n${lesson.key}: ${lesson.file}`);
  console.log(`  Original length: ${html.length} chars`);

  // Extract only the content inside the main div
  // Find the opening div tag
  const divStart = html.indexOf('<div style="font-family');
  const divEnd = html.lastIndexOf('</div>');

  if (divStart === -1 || divEnd === -1) {
    console.error(`  ✗ Could not find main div tags`);
    continue;
  }

  // Get content between div tags (excluding the div itself)
  const divOpenEnd = html.indexOf('>', divStart) + 1;
  const content = html.substring(divOpenEnd, divEnd).trim();

  console.log(`  Extracted content: ${content.length} chars`);
  console.log(`  First 80 chars: ${content.substring(0, 80)}`);

  // Check structure
  const hasH2 = content.includes('<h2');
  const hasH3 = content.includes('<h3');
  const hasExample = content.includes('Example 1');
  const hasKeyTakeaways = content.includes('Key Takeaways');

  console.log(`  Structure check:`);
  console.log(`    H2 title: ${hasH2 ? '✓' : '✗'}`);
  console.log(`    H3 sections: ${hasH3 ? '✓' : '✗'}`);
  console.log(`    Examples: ${hasExample ? '✓' : '✗'}`);
  console.log(`    Key Takeaways: ${hasKeyTakeaways ? '✓' : '✗'}`);

  // Write fixed content
  writeFileSync(filePath, content, 'utf8');
  console.log(`  ✅ Saved fixed HTML`);
}

console.log('\n' + '='.repeat(80));
console.log('✓ All files fixed\n');
