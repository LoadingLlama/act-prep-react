#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Get all lesson files to process
const workDir = path.join(__dirname, '../restructuring-work');
const subjects = ['math', 'science', 'english', 'reading'];

const allLessons = [];

for (const subject of subjects) {
  const subjectDir = path.join(workDir, subject);
  const files = fs.readdirSync(subjectDir);

  for (const file of files) {
    if (file.endsWith('.html')) {
      allLessons.push({
        subject,
        filename: file,
        lessonKey: file.replace('.html', ''),
        inputPath: path.join(subjectDir, file),
        outputPath: path.join(workDir, 'restructured', `${subject}-${file}`)
      });
    }
  }
}

console.log(`\n╔═══════════════════════════════════════════════════╗`);
console.log(`║    Batch Processing Plan - All 116 Lessons       ║`);
console.log(`╚═══════════════════════════════════════════════════╝\n`);

console.log(`Total lessons to process: ${allLessons.length}\n`);

// Group by subject
const bySubject = {};
allLessons.forEach(l => {
  if (!bySubject[l.subject]) bySubject[l.subject] = [];
  bySubject[l.subject].push(l);
});

Object.entries(bySubject).forEach(([subject, lessons]) => {
  console.log(`${subject}: ${lessons.length} lessons`);
});

// Save lesson list for Task agents
const batchList = allLessons.map(l =>
  `${l.subject}|${l.lessonKey}|${l.inputPath}|${l.outputPath}`
).join('\n');

fs.writeFileSync(
  path.join(workDir, 'BATCH_LIST.txt'),
  batchList
);

console.log(`\n✅ Batch list saved to: restructuring-work/BATCH_LIST.txt`);
console.log(`\n📋 Ready to launch Task agents!`);
console.log(`   Recommend processing in batches of 20-30 lessons\n`);
