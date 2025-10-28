#!/usr/bin/env node
/**
 * UPDATE QUESTION COUNTER - Remove "Question" text
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const testsDir = path.join(__dirname, '..', 'public', 'tests');
const files = [
  'math-test.html',
  'reading-test.html',
  'science-test.html',
  'practice-test.html'
];

console.log('🔧 UPDATING QUESTION COUNTER FORMAT\n');
console.log('='.repeat(80) + '\n');

for (const file of files) {
  const filePath = path.join(testsDir, file);

  if (!fs.existsSync(filePath)) {
    console.log(`⚠️  ${file}: Not found, skipping`);
    continue;
  }

  let content = fs.readFileSync(filePath, 'utf8');
  let updated = false;

  // Update questionCounter.textContent to remove "Question " prefix
  const counterRegex = /getElementById\('questionCounter'\)\.textContent = `Question \$\{currentQuestion\} of \$\{totalQuestions\}`/g;
  if (counterRegex.test(content)) {
    content = content.replace(counterRegex, "getElementById('questionCounter').textContent = `${currentQuestion} of ${totalQuestions}`");
    updated = true;
  }

  if (updated) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ ${file}: Updated successfully`);
  } else {
    console.log(`ℹ️  ${file}: No changes needed`);
  }
}

console.log('\n' + '='.repeat(80));
console.log('\n✅ QUESTION COUNTER UPDATE COMPLETE!\n');
