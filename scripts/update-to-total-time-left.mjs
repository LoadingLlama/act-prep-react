#!/usr/bin/env node
/**
 * UPDATE TO "TOTAL TIME LEFT" - Change section timers to say "Total Time Left"
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const testsDir = path.join(__dirname, '..', 'public', 'tests');
const files = [
  'english-test.html',
  'math-test.html',
  'reading-test.html',
  'science-test.html'
];

console.log('🔧 UPDATING TIMER LABELS TO "TOTAL TIME LEFT"\n');
console.log('='.repeat(80) + '\n');

for (const file of files) {
  const filePath = path.join(testsDir, file);

  if (!fs.existsSync(filePath)) {
    console.log(`⚠️  ${file}: Not found, skipping`);
    continue;
  }

  let content = fs.readFileSync(filePath, 'utf8');
  let updated = false;

  // Change "Time Left" to "Total Time Left"
  const labelRegex = /<span class="timer-label">Time Left<\/span>/g;
  if (labelRegex.test(content)) {
    content = content.replace(labelRegex, '<span class="timer-label">Total Time Left</span>');
    updated = true;
  }

  if (updated) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ ${file}: Updated to "Total Time Left"`);
  } else {
    console.log(`ℹ️  ${file}: No changes needed`);
  }
}

console.log('\n' + '='.repeat(80));
console.log('\n✅ TIMER LABELS UPDATED TO "TOTAL TIME LEFT"!\n');
