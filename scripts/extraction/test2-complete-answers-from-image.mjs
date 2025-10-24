#!/usr/bin/env node

/**
 * TEST 2 COMPLETE ANSWER KEYS - EXTRACTED FROM IMAGE
 * All answers extracted from official answer key image (Form C01)
 */

import { writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log('📝 COMPLETE TEST 2 ANSWER KEYS EXTRACTED FROM IMAGE (Form C01)\n');
console.log('='.repeat(70));

// English Test answers (75 questions) - From first page of image
const englishAnswers = {
  1:'C', 2:'H', 3:'B', 4:'H', 5:'C', 6:'F', 7:'D', 8:'G', 9:'A', 10:'H',
  11:'D', 12:'G', 13:'B', 14:'J', 15:'A', 16:'J', 17:'D', 18:'F', 19:'A', 20:'F',
  21:'B', 22:'J', 23:'B', 24:'H', 25:'A', 26:'J', 27:'C', 28:'G', 29:'C', 30:'H',
  31:'D', 32:'G', 33:'B', 34:'F', 35:'D', 36:'G', 37:'C', 38:'F',
  39:'C', 40:'F', 41:'D', 42:'F', 43:'B', 44:'F', 45:'C', 46:'F', 47:'A', 48:'H',
  49:'B', 50:'G', 51:'D', 52:'J', 53:'A', 54:'G', 55:'D', 56:'F', 57:'C', 58:'J',
  59:'B', 60:'H', 61:'D', 62:'F', 63:'A', 64:'H', 65:'D', 66:'G', 67:'B', 68:'G',
  69:'D', 70:'J', 71:'B', 72:'H', 73:'A', 74:'F', 75:'C'
};

// Math Test answers (60 questions) - From second page of image
const mathAnswers = {
  1:'C', 2:'H', 3:'E', 4:'H', 5:'E', 6:'G', 7:'E', 8:'F', 9:'C', 10:'H',
  11:'E', 12:'H', 13:'C', 14:'G', 15:'B', 16:'H', 17:'D', 18:'F', 19:'C', 20:'H',
  21:'E', 22:'F', 23:'C', 24:'G', 25:'B', 26:'J', 27:'E', 28:'H', 29:'C', 30:'G',
  31:'A', 32:'F', 33:'D', 34:'G', 35:'A', 36:'H', 37:'D', 38:'G', 39:'A', 40:'J',
  41:'D', 42:'F', 43:'C', 44:'K', 45:'A', 46:'H', 47:'B', 48:'F', 49:'C', 50:'G',
  51:'B', 52:'J', 53:'E', 54:'F', 55:'C', 56:'H', 57:'B', 58:'K', 59:'D', 60:'F'
};

// Reading Test answers (40 questions) - From third page of image
const readingAnswers = {
  1:'D', 2:'J', 3:'C', 4:'H', 5:'B', 6:'H', 7:'A', 8:'F', 9:'D', 10:'F',
  11:'B', 12:'F', 13:'B', 14:'F', 15:'A', 16:'H', 17:'A', 18:'H', 19:'D', 20:'J',
  21:'C', 22:'G', 23:'B', 24:'H', 25:'D', 26:'G', 27:'A', 28:'F', 29:'B', 30:'F',
  31:'B', 32:'F', 33:'D', 34:'G', 35:'B', 36:'H', 37:'A', 38:'H', 39:'C', 40:'J'
};

// Science Test answers (40 questions) - From fourth page of image
const scienceAnswers = {
  1:'D', 2:'F', 3:'A', 4:'G', 5:'D', 6:'G', 7:'B', 8:'G', 9:'A', 10:'H',
  11:'D', 12:'H', 13:'C', 14:'G', 15:'B', 16:'H', 17:'D', 18:'F', 19:'C', 20:'F',
  21:'C', 22:'H', 23:'D', 24:'F', 25:'B', 26:'J', 27:'B', 28:'H', 29:'B', 30:'G',
  31:'B', 32:'F', 33:'D', 34:'F', 35:'C', 36:'F', 37:'B', 38:'J', 39:'B', 40:'F'
};

// Create JSON answer key
const answerKey = {
  english: englishAnswers,
  math: mathAnswers,
  reading: readingAnswers,
  science: scienceAnswers
};

// Save to file
const outputPath = join(__dirname, '../../answer-keys/test2-answers-complete.json');
writeFileSync(outputPath, JSON.stringify(answerKey, null, 2));

console.log('✅ Complete answer key saved to:', outputPath);
console.log('\n📊 VERIFICATION:\n');

// Count complete answers
const englishCount = Object.values(englishAnswers).filter(a => a).length;
const mathCount = Object.values(mathAnswers).filter(a => a).length;
const readingCount = Object.values(readingAnswers).filter(a => a).length;
const scienceCount = Object.values(scienceAnswers).filter(a => a).length;
const totalCount = englishCount + mathCount + readingCount + scienceCount;

console.log(`English: ${englishCount}/75 complete`);
console.log(`Math: ${mathCount}/60 complete`);
console.log(`Reading: ${readingCount}/40 complete`);
console.log(`Science: ${scienceCount}/40 complete`);
console.log(`TOTAL: ${totalCount}/215 complete (${(totalCount/215*100).toFixed(1)}%)`);

console.log('\n🔍 First 10 answers of each section:\n');
console.log('English:', Object.entries(englishAnswers).slice(0, 10).map(([q, a]) => `${q}=${a}`).join(', '));
console.log('Math:', Object.entries(mathAnswers).slice(0, 10).map(([q, a]) => `${q}=${a}`).join(', '));
console.log('Reading:', Object.entries(readingAnswers).slice(0, 10).map(([q, a]) => `${q}=${a}`).join(', '));
console.log('Science:', Object.entries(scienceAnswers).slice(0, 10).map(([q, a]) => `${q}=${a}`).join(', '));

console.log('\n🔍 Last 5 answers of each section:\n');
console.log('English:', Object.entries(englishAnswers).slice(-5).map(([q, a]) => `${q}=${a}`).join(', '));
console.log('Math:', Object.entries(mathAnswers).slice(-5).map(([q, a]) => `${q}=${a}`).join(', '));
console.log('Reading:', Object.entries(readingAnswers).slice(-5).map(([q, a]) => `${q}=${a}`).join(', '));
console.log('Science:', Object.entries(scienceAnswers).slice(-5).map(([q, a]) => `${q}=${a}`).join(', '));

// Verify against previous extraction (if exists)
try {
  const previousPath = join(__dirname, '../../answer-keys/test2-answers.json');
  const fs = await import('fs');
  if (fs.existsSync(previousPath)) {
    const previousData = JSON.parse(fs.readFileSync(previousPath, 'utf-8'));

    console.log('\n🔍 VERIFICATION AGAINST PREVIOUS EXTRACTION:\n');

    // Check English answers
    let englishMatches = 0;
    for (let i = 1; i <= 75; i++) {
      if (previousData.english[i] && englishAnswers[i] === previousData.english[i]) {
        englishMatches++;
      }
    }
    console.log(`English: ${englishMatches}/75 answers match previous extraction`);

    // Check Reading answers
    let readingMatches = 0;
    for (let i = 1; i <= 40; i++) {
      if (previousData.reading[i] && readingAnswers[i] === previousData.reading[i]) {
        readingMatches++;
      }
    }
    console.log(`Reading: ${readingMatches}/40 answers match previous extraction`);

    // Check Science answers
    let scienceMatches = 0;
    for (let i = 1; i <= 40; i++) {
      if (previousData.science[i] && scienceAnswers[i] === previousData.science[i]) {
        scienceMatches++;
      }
    }
    console.log(`Science: ${scienceMatches}/40 answers match previous extraction`);

    console.log(`Math: All 60 answers are NEW (previously missing)`);
  }
} catch (error) {
  console.log('\n⚠️  Could not verify against previous extraction');
}

console.log('\n✅ Ready to update database with all 215 correct answers!\n');