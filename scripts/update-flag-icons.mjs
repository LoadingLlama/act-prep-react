#!/usr/bin/env node
/**
 * Update flag icons in all test HTML files
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const testsDir = path.join(__dirname, '..', 'public', 'tests');

const testFiles = [
  'english-test.html',
  'math-test.html',
  'reading-test.html',
  'science-test.html',
  'practice-test.html'
];

const oldFlagSVG = /<svg width="14" height="14" viewBox="0 0 24 24"[^>]*>\s*<path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"><\/path>\s*<line x1="4" y1="22" x2="4" y2="15"><\/line>\s*<\/svg>/g;

const newFlagSVG = `<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="none">
                            <path d="M14.4 6L14 4H5v17h2v-7h5.6l.4 2h7V6z"></path>
                        </svg>`;

console.log('🚩 UPDATING FLAG ICONS\n');
console.log('='.repeat(80) + '\n');

for (const file of testFiles) {
  const filePath = path.join(testsDir, file);

  if (!fs.existsSync(filePath)) {
    console.log(`⚠️  ${file}: Not found, skipping`);
    continue;
  }

  let content = fs.readFileSync(filePath, 'utf8');
  const originalContent = content;

  // Replace old flag SVG with new one
  content = content.replace(oldFlagSVG, newFlagSVG);

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ ${file}: Updated flag icon`);
  } else {
    console.log(`ℹ️  ${file}: No changes needed (already updated or different format)`);
  }
}

console.log('\n' + '='.repeat(80));
console.log('\n✅ FLAG ICONS UPDATE COMPLETE!\n');
