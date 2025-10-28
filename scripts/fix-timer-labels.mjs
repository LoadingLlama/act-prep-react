#!/usr/bin/env node
/**
 * FIX TIMER LABELS AND INITIAL TIMES
 * Changes "Total Time Left" to "Time Left" and sets correct initial timer displays
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const testsDir = path.join(__dirname, '..', 'public', 'tests');

// Section-specific times (in minutes)
const sectionTimes = {
  'math-test.html': 60,
  'reading-test.html': 40,
  'science-test.html': 40,
  'practice-test.html': 175  // Keep "Total Time Left" for practice test
};

console.log('🔧 FIXING TIMER LABELS AND INITIAL TIMES\n');
console.log('='.repeat(80) + '\n');

for (const [file, minutes] of Object.entries(sectionTimes)) {
  const filePath = path.join(testsDir, file);

  if (!fs.existsSync(filePath)) {
    console.log(`⚠️  ${file}: Not found, skipping`);
    continue;
  }

  let content = fs.readFileSync(filePath, 'utf8');
  let updated = false;

  // For individual section tests, change "Total Time Left" to "Time Left"
  if (file !== 'practice-test.html') {
    const labelRegex = /<span class="timer-label">Total Time Left<\/span>/g;
    if (labelRegex.test(content)) {
      content = content.replace(labelRegex, '<span class="timer-label">Time Left</span>');
      updated = true;
    }
  }

  // Update initial timer display to match the section time
  const initialTime = `${minutes}:00`;
  const timerRegex = /<div class="timer" id="timer">\d+:\d+<\/div>/g;
  if (timerRegex.test(content)) {
    content = content.replace(timerRegex, `<div class="timer" id="timer">${initialTime}</div>`);
    updated = true;
  }

  if (updated) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ ${file}: Updated to "${file === 'practice-test.html' ? 'Total ' : ''}Time Left" with ${initialTime} initial time`);
  } else {
    console.log(`ℹ️  ${file}: No changes needed`);
  }
}

console.log('\n' + '='.repeat(80));
console.log('\n✅ TIMER LABELS AND TIMES FIXED!\n');
