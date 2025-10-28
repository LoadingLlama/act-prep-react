#!/usr/bin/env node
/**
 * UPDATE LOGO TEXT - Change from actcourse.org to Nomi Academy
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
  'science-test.html',
  'practice-test.html'
];

console.log('🔧 UPDATING LOGO TEXT TO "Nomi Academy"\n');
console.log('='.repeat(80) + '\n');

for (const file of files) {
  const filePath = path.join(testsDir, file);

  if (!fs.existsSync(filePath)) {
    console.log(`⚠️  ${file}: Not found, skipping`);
    continue;
  }

  let content = fs.readFileSync(filePath, 'utf8');
  let updated = false;

  // Update logo text
  const logoRegex = /<a href="\/" class="logo">actcourse\.org<\/a>/g;
  if (logoRegex.test(content)) {
    content = content.replace(logoRegex, '<a href="/" class="logo">Nomi Academy</a>');
    updated = true;
  }

  if (updated) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ ${file}: Updated logo to "Nomi Academy"`);
  } else {
    console.log(`ℹ️  ${file}: No changes needed`);
  }
}

console.log('\n' + '='.repeat(80));
console.log('\n✅ LOGO TEXT UPDATE COMPLETE!\n');
