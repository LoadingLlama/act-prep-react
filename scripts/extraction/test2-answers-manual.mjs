#!/usr/bin/env node

/**
 * TEST 2 ANSWER KEYS - MANUALLY EXTRACTED
 * Answers extracted manually from answer key PDF (Form C01)
 */

import { writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log('📝 MANUALLY EXTRACTED TEST 2 ANSWER KEYS (Form C01)\n');
console.log('='.repeat(70));

// English Test answers (75 questions)
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

// Math Test answers (60 questions) - Need to extract from PDF page 51
const mathAnswers = {
  // Placeholder - need manual extraction
  1:null, 2:null, 3:null, 4:null, 5:null, 6:null, 7:null, 8:null, 9:null, 10:null,
  11:null, 12:null, 13:null, 14:null, 15:null, 16:null, 17:null, 18:null, 19:null, 20:null,
  21:null, 22:null, 23:null, 24:null, 25:null, 26:null, 27:null, 28:null, 29:null, 30:null,
  31:null, 32:null, 33:null, 34:null, 35:null, 36:null, 37:null, 38:null, 39:null, 40:null,
  41:null, 42:null, 43:null, 44:null, 45:null, 46:null, 47:null, 48:null, 49:null, 50:null,
  51:null, 52:null, 53:null, 54:null, 55:null, 56:null, 57:null, 58:null, 59:null, 60:null
};

// Reading Test answers (40 questions)
const readingAnswers = {
  1:'D', 2:'J', 3:'C', 4:'H', 5:'B', 6:'H', 7:'A', 8:'F', 9:'D', 10:'F',
  11:'B', 12:'F', 13:'B', 14:'F', 15:'A', 16:'H', 17:'A', 18:'H', 19:'D', 20:'J',
  21:'C', 22:'G', 23:'B', 24:'H', 25:'D', 26:'G', 27:'A', 28:'F', 29:'B', 30:'F',
  31:'B', 32:'F', 33:'D', 34:'G', 35:'B', 36:'H', 37:'A', 38:'H', 39:'C', 40:'J'
};

// Science Test answers (40 questions)
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
const outputPath = join(__dirname, '../../answer-keys/test2-answers.json');
writeFileSync(outputPath, JSON.stringify(answerKey, null, 2));

console.log('✅ Answer key saved to:', outputPath);
console.log('\n📊 VERIFICATION:\n');
console.log(`English: ${Object.values(englishAnswers).filter(a => a).length}/75 complete`);
console.log(`Math: ${Object.values(mathAnswers).filter(a => a).length}/60 complete`);
console.log(`Reading: ${Object.values(readingAnswers).filter(a => a).length}/40 complete`);
console.log(`Science: ${Object.values(scienceAnswers).filter(a => a).length}/40 complete`);

console.log('\n🔍 First 10 answers of each section:\n');
console.log('English:', Object.entries(englishAnswers).slice(0, 10).map(([q, a]) => `${q}=${a}`).join(', '));
console.log('Math:', Object.entries(mathAnswers).slice(0, 10).map(([q, a]) => `${q}=${a}`).join(', '));
console.log('Reading:', Object.entries(readingAnswers).slice(0, 10).map(([q, a]) => `${q}=${a}`).join(', '));
console.log('Science:', Object.entries(scienceAnswers).slice(0, 10).map(([q, a]) => `${q}=${a}`).join(', '));

console.log('\n⚠️  Note: Math answers need manual extraction from PDF');
console.log('📝 Next: Extract Math answers, then update database\n');
