#!/usr/bin/env node
/**
 * FIX CORRECT ACT TIMES
 * English: 45 minutes
 * Math: 60 minutes
 * Reading: 35 minutes
 * Science: 35 minutes
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const testsDir = path.join(__dirname, '..', 'public', 'tests');

const correctTimes = {
  'reading-test.html': { minutes: 35, display: '35:00' },
  'science-test.html': { minutes: 35, display: '35:00' }
};

console.log('🔧 FIXING ACT SECTION TIMES\n');
console.log('='.repeat(80) + '\n');

for (const [file, time] of Object.entries(correctTimes)) {
  const filePath = path.join(testsDir, file);

  if (!fs.existsSync(filePath)) {
    console.log(`⚠️  ${file}: Not found, skipping`);
    continue;
  }

  let content = fs.readFileSync(filePath, 'utf8');
  let updated = false;

  // Update HTML timer display
  const timerRegex = /<div class="timer" id="timer">\d+:\d+<\/div>/g;
  if (timerRegex.test(content)) {
    content = content.replace(timerRegex, `<div class="timer" id="timer">${time.display}</div>`);
    updated = true;
  }

  // Update JavaScript timeLeft variable
  const timeLeftRegex = /let timeLeft = \d+ \* 60;/g;
  if (timeLeftRegex.test(content)) {
    content = content.replace(timeLeftRegex, `let timeLeft = ${time.minutes} * 60;`);
    updated = true;
  }

  if (updated) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ ${file}: Updated to ${time.minutes} minutes (${time.display})`);
  } else {
    console.log(`ℹ️  ${file}: No changes needed`);
  }
}

console.log('\n' + '='.repeat(80));
console.log('\n✅ ACT SECTION TIMES CORRECTED!\n');
console.log('English: 45 minutes');
console.log('Math: 60 minutes');
console.log('Reading: 35 minutes');
console.log('Science: 35 minutes');
console.log('Total: 175 minutes\n');
