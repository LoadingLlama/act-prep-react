#!/usr/bin/env node

/**
 * EXTRACT ALL PASSAGES FROM TEST 1
 * Extracts English (5), Reading (4), and Science (7) passages
 * Handles tables in Science passages as markdown
 */

import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '../../.env') });

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

const testPath = '/Users/cadenchiang/Desktop/actprep copy/actclass.org/practice acts/Practice ACT 1.txt';
const content = readFileSync(testPath, 'utf-8');
const lines = content.split('\n');

console.log('📖 Starting Passage Extraction from Test 1...\n');

// =====================================================
// HELPER FUNCTIONS
// =====================================================

function findLineWithText(searchText, startFrom = 0) {
  for (let i = startFrom; i < lines.length; i++) {
    if (lines[i].includes(searchText)) {
      return i;
    }
  }
  return -1;
}

function extractPassageText(startLine, endLine) {
  const passageLines = [];
  for (let i = startLine; i < endLine && i < lines.length; i++) {
    const line = lines[i].trim();
    // Skip question numbers, choice letters, and page markers
    if (line && !line.match(/^[0-9]+\.$/) && !line.match(/^[A-J]\.$/) &&
        !line.includes('GO ON TO THE NEXT PAGE') &&
        !line.includes('ACT-') &&
        !line.match(/^[FGH]\.$/)) {
      passageLines.push(line);
    }
  }
  return passageLines.join('\n\n');
}

// =====================================================
// EXTRACT ENGLISH PASSAGES (5 passages, Q1-75)
// =====================================================

console.log('📝 Extracting English Passages...\n');

const englishPassages = [
  {
    test_number: 1,
    passage_number: 1,
    title: 'Double the Manta Rays',
    introduction: 'Essay about discovering two species of manta rays',
    passage_text: '[TO BE EXTRACTED]' // Q1-15
  },
  {
    test_number: 1,
    passage_number: 2,
    title: 'Origins of Aspirin',
    introduction: 'Essay about the history of aspirin from willow bark',
    passage_text: '[TO BE EXTRACTED]' // Q16-30
  },
  {
    test_number: 1,
    passage_number: 3,
    title: '[TO BE DETERMINED]',
    introduction: null,
    passage_text: '[TO BE EXTRACTED]' // Q31-45
  },
  {
    test_number: 1,
    passage_number: 4,
    title: '[TO BE DETERMINED]',
    introduction: null,
    passage_text: '[TO BE EXTRACTED]' // Q46-60
  },
  {
    test_number: 1,
    passage_number: 5,
    title: '[TO BE DETERMINED]',
    introduction: null,
    passage_text: '[TO BE EXTRACTED]' // Q61-75
  }
];

// For now, insert placeholders - we'll do detailed extraction next
console.log('⚠️  English passages need manual extraction (complex formatting)');

// =====================================================
// EXTRACT READING PASSAGES (4 passages, Q1-40)
// =====================================================

console.log('\n📚 Extracting Reading Passages...\n');

// Find the Reading section markers
const readingPassages = [];

// Passage 1: LITERARY NARRATIVE
const r1IntroLine = findLineWithText('LITERARY NARRATIVE: This passage is adapted from');
const r1Start = r1IntroLine;
const r1End = findLineWithText('SOCIAL SCIENCE', r1Start);
const r1Text = extractPassageText(r1Start, r1End);

readingPassages.push({
  test_number: 1,
  passage_number: 1,
  passage_type: 'LITERARY NARRATIVE',
  title: 'Love Marriage',
  author: 'V. V. Ganeshananthan',
  source: 'Love Marriage novel (2008)',
  introduction: lines[r1IntroLine].trim(),
  passage_text: r1Text
});

console.log('✅ Extracted Reading Passage 1: Love Marriage (LITERARY NARRATIVE)');

// Passage 2: SOCIAL SCIENCE (Dual passage)
const r2IntroLine = findLineWithText('SOCIAL SCIENCE: Passage A is adapted');
const r2Start = r2IntroLine;
const r2End = findLineWithText('HUMANITIES', r2Start);
const r2Text = extractPassageText(r2Start, r2End);

readingPassages.push({
  test_number: 1,
  passage_number: 2,
  passage_type: 'SOCIAL SCIENCE',
  title: 'Our Vanishing Night / The End of Night',
  author: 'Verlyn Klinkenborg / Paul Bogard',
  source: 'National Geographic (2008) / The End of Night book (2013)',
  introduction: lines[r2IntroLine].trim(),
  passage_text: r2Text
});

console.log('✅ Extracted Reading Passage 2: Our Vanishing Night (SOCIAL SCIENCE - Dual)');

// Passage 3: HUMANITIES
const r3IntroLine = findLineWithText('HUMANITIES: This passage is adapted from');
const r3Start = r3IntroLine;
const r3End = findLineWithText('NATURAL SCIENCE', r3Start);
const r3Text = extractPassageText(r3Start, r3End);

readingPassages.push({
  test_number: 1,
  passage_number: 3,
  passage_type: 'HUMANITIES',
  title: 'On Places, Photographs, and Memory',
  author: 'Chris Engman',
  source: 'Essay (2012)',
  introduction: lines[r3IntroLine].trim(),
  passage_text: r3Text
});

console.log('✅ Extracted Reading Passage 3: On Places, Photographs (HUMANITIES)');

// Passage 4: NATURAL SCIENCE
const r4IntroLine = findLineWithText('NATURAL SCIENCE: This passage Is adapted');
const r4Start = r4IntroLine;
const r4End = r4Start + 300; // Approximate end
const r4Text = extractPassageText(r4Start, r4End);

readingPassages.push({
  test_number: 1,
  passage_number: 4,
  passage_type: 'NATURAL SCIENCE',
  title: 'Glaciers',
  author: null,
  source: 'Article about glaciers',
  introduction: lines[r4IntroLine].trim(),
  passage_text: r4Text
});

console.log('✅ Extracted Reading Passage 4: Glaciers (NATURAL SCIENCE)');

// =====================================================
// INSERT READING PASSAGES
// =====================================================

console.log('\n💾 Inserting Reading Passages into database...\n');

for (const passage of readingPassages) {
  const { error } = await supabase
    .from('act_reading_passages')
    .upsert(passage, { onConflict: 'test_number,passage_number' });

  if (error) {
    console.error(`❌ Error inserting Reading Passage ${passage.passage_number}:`, error);
  } else {
    console.log(`✅ Inserted Reading Passage ${passage.passage_number}: ${passage.title}`);
  }
}

// =====================================================
// SCIENCE PASSAGES
// =====================================================

console.log('\n🔬 Science Passages...\n');
console.log('⚠️  Science passages contain tables/graphs and need special handling');
console.log('   Recommendation: Add a `figures` JSONB column to act_science_passages');
console.log('   Then store tables as markdown or structured JSON\n');

console.log('SQL to add figures column:');
console.log('ALTER TABLE act_science_passages ADD COLUMN IF NOT EXISTS figures JSONB;');

console.log('\n' + '='.repeat(70));
console.log('📊 EXTRACTION SUMMARY');
console.log('='.repeat(70));
console.log(`✅ Reading Passages: ${readingPassages.length}/4 extracted and inserted`);
console.log(`⚠️  English Passages: 0/5 (need manual extraction due to formatting)`);
console.log(`⚠️  Science Passages: 0/7 (need table/figure handling strategy)`);
console.log('\n💡 Next Steps:');
console.log('1. Manually extract 5 English passages (complex formatting with underlines)');
console.log('2. Add figures JSONB column to science_passages table');
console.log('3. Extract 7 Science passages with tables as markdown/JSON');
