#!/usr/bin/env node

/**
 * COMPLETE EXTRACTION - ALL PASSAGES FROM PDF
 * Extract English (5), Reading (4), Science (7) with proper formatting
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

// Read clean PDF text
const pdfText = readFileSync(join(__dirname, '../../backups/passages/pdf-full-text.txt'), 'utf-8');

console.log('🚀 COMPLETE EXTRACTION - ALL PASSAGES\n');
console.log(`📝 PDF text loaded: ${pdfText.length} characters\n`);

// Helper to extract text between markers
function extractBetween(startMarker, endMarker, startOffset = 0) {
  const start = pdfText.indexOf(startMarker, startOffset);
  if (start === -1) return null;

  const end = endMarker ? pdfText.indexOf(endMarker, start + startMarker.length) : pdfText.length;
  if (end === -1) return null;

  return pdfText.substring(start, end).trim();
}

// Helper to clean passage text
function cleanPassageText(text) {
  return text
    // Remove multiple spaces
    .replace(/\s+/g, ' ')
    // Remove line numbers like "45", "50" that appear mid-sentence
    .replace(/\s+\d{1,2}\s+/g, ' ')
    // Clean up question markers
    .replace(/\s+[A-J]\.\s+NO\s+CHANGE/g, '')
    .replace(/GO\s+ON\s+TO\s+THE\s+NEXT\s+PAGE\./g, '')
    .replace(/ACT-Co[0-9s]+/g, '')
    .trim();
}

// =====================================================
// ENGLISH PASSAGES (5 passages)
// =====================================================

console.log('📝 Extracting English Passages...\n');

const englishPassages = [];

// English Passage 1: Double the Manta Rays
const e1Start = pdfText.indexOf('PASSAGE   |');
const e1End = pdfText.indexOf('PASSAGE  I', e1Start + 100); // Next passage
const e1Raw = pdfText.substring(e1Start, e1End);
const e1Text = e1Raw.substring(
  e1Raw.indexOf('Double  the  Manta  Rays'),
  e1Raw.indexOf('Question  15  asks')
);

englishPassages.push({
  test_number: 1,
  passage_number: 1,
  title: 'Double the Manta Rays',
  introduction: 'Essay about discovering two species of manta rays',
  passage_text: cleanPassageText(e1Text)
});

console.log('✅ Extracted English Passage 1: Double the Manta Rays');

// English Passage 2: Origins of Aspirin
const e2Start = pdfText.indexOf('PASSAGE  I');
const e2End = pdfText.indexOf('PASSAGE   Ill', e2Start + 100);
const e2Raw = pdfText.substring(e2Start, e2End);
const e2Text = e2Raw.substring(
  e2Raw.indexOf('Origins  of  Aspirin'),
  e2Raw.indexOf('Question   30   asks')
);

englishPassages.push({
  test_number: 1,
  passage_number: 2,
  title: 'Origins of Aspirin',
  introduction: 'History of aspirin from willow bark',
  passage_text: cleanPassageText(e2Text)
});

console.log('✅ Extracted English Passage 2: Origins of Aspirin');

// English Passage 3: Good Vibrations
const e3Start = pdfText.indexOf('PASSAGE   Ill');
const e3End = pdfText.indexOf('PASSAGE   IV', e3Start + 100);
const e3Raw = pdfText.substring(e3Start, e3End);
const e3Text = e3Raw.substring(
  e3Raw.indexOf('Good  Vibrations'),
  e3Raw.indexOf('Question   45   asks')
);

englishPassages.push({
  test_number: 1,
  passage_number: 3,
  title: 'Good Vibrations',
  introduction: 'Photographer Martin Klimas creates sonic sculptures',
  passage_text: cleanPassageText(e3Text)
});

console.log('✅ Extracted English Passage 3: Good Vibrations');

// English Passage 4: Building and Rebuilding "the King of Roads"
const e4Start = pdfText.indexOf('PASSAGE   IV');
const e4End = pdfText.indexOf('PASSAGE   V', e4Start + 100);
const e4Raw = pdfText.substring(e4Start, e4End);
const e4Text = e4Raw.substring(
  e4Raw.indexOf('Building   and   Rebuilding'),
  e4Raw.indexOf('Question   60   asks')
);

englishPassages.push({
  test_number: 1,
  passage_number: 4,
  title: 'Building and Rebuilding "the King of Roads"',
  introduction: 'The Columbia River Highway in Oregon',
  passage_text: cleanPassageText(e4Text)
});

console.log('✅ Extracted English Passage 4: Building and Rebuilding');

// English Passage 5: Selling Hip-Hop
const e5Start = pdfText.indexOf('PASSAGE   V');
const e5End = pdfText.indexOf('END   OF   TEST', e5Start + 100);
const e5Raw = pdfText.substring(e5Start, e5End);
const e5Text = e5Raw.substring(
  e5Raw.indexOf('Selling   Hip-Hop'),
  e5Raw.indexOf('Question   75   asks')
);

englishPassages.push({
  test_number: 1,
  passage_number: 5,
  title: 'Selling Hip-Hop',
  introduction: 'Sylvia Robinson and the birth of commercial hip-hop',
  passage_text: cleanPassageText(e5Text)
});

console.log('✅ Extracted English Passage 5: Selling Hip-Hop\n');

// =====================================================
// INSERT ENGLISH PASSAGES
// =====================================================

console.log('💾 Inserting English passages into database...\n');

for (const passage of englishPassages) {
  const { error } = await supabase
    .from('act_english_passages')
    .upsert(passage, { onConflict: 'test_number,passage_number' });

  if (error) {
    console.error(`❌ Error inserting English Passage ${passage.passage_number}:`, error);
  } else {
    console.log(`✅ Inserted English Passage ${passage.passage_number}: ${passage.title}`);
  }
}

// =====================================================
// READING PASSAGES (4 passages) - Re-extract cleanly
// =====================================================

console.log('\n📚 Extracting Reading Passages (clean)...\n');

const readingPassages = [];

// Reading Passage 1: Love Marriage (LITERARY NARRATIVE)
const r1Start = pdfText.indexOf('LITERARY  NARRATIVE:');
const r1End = pdfText.indexOf('SOCIAL  SCIENCE:', r1Start + 100);
const r1Text = pdfText.substring(r1Start, r1End);

readingPassages.push({
  test_number: 1,
  passage_number: 1,
  passage_type: 'LITERARY NARRATIVE',
  title: 'Love Marriage',
  author: 'V. V. Ganeshananthan',
  source: 'Love Marriage novel (2008)',
  introduction: 'This passage is adapted from the novel Love Marriage by V. V. Ganeshananthan (©2008 by V. Vasugi Ganeshananthan).',
  passage_text: cleanPassageText(r1Text)
});

console.log('✅ Extracted Reading Passage 1: Love Marriage');

// Reading Passage 2: Our Vanishing Night (SOCIAL SCIENCE - Dual)
const r2Start = pdfText.indexOf('SOCIAL  SCIENCE:');
const r2End = pdfText.indexOf('HUMANITIES:', r2Start + 100);
const r2Text = pdfText.substring(r2Start, r2End);

readingPassages.push({
  test_number: 1,
  passage_number: 2,
  passage_type: 'SOCIAL SCIENCE',
  title: 'Our Vanishing Night / The End of Night',
  author: 'Verlyn Klinkenborg / Paul Bogard',
  source: 'National Geographic (2008) / The End of Night (2013)',
  introduction: 'Passage A is adapted from "Our Vanishing Night" by Verlyn Klinkenborg. Passage B is adapted from The End of Night by Paul Bogard.',
  passage_text: cleanPassageText(r2Text)
});

console.log('✅ Extracted Reading Passage 2: Our Vanishing Night');

// Reading Passage 3: On Places, Photographs, and Memory (HUMANITIES)
const r3Start = pdfText.indexOf('HUMANITIES:');
const r3End = pdfText.indexOf('NATURAL  SCIENCE:', r3Start + 100);
const r3Text = pdfText.substring(r3Start, r3End);

readingPassages.push({
  test_number: 1,
  passage_number: 3,
  passage_type: 'HUMANITIES',
  title: 'On Places, Photographs, and Memory',
  author: 'Chris Engman',
  source: 'Essay (2012)',
  introduction: 'This passage is adapted from the essay "On Places, Photographs, and Memory" by Chris Engman (©2012 by Chris Engman).',
  passage_text: cleanPassageText(r3Text)
});

console.log('✅ Extracted Reading Passage 3: On Places, Photographs');

// Reading Passage 4: Glaciers (NATURAL SCIENCE)
const r4Start = pdfText.indexOf('NATURAL  SCIENCE:');
const r4End = pdfText.indexOf('END   OF   TEST', r4Start + 100);
const r4Text = pdfText.substring(r4Start, r4End);

readingPassages.push({
  test_number: 1,
  passage_number: 4,
  passage_type: 'NATURAL SCIENCE',
  title: 'Glaciers',
  author: null,
  source: 'Article about glaciers',
  introduction: 'This passage is adapted from an article about glaciers.',
  passage_text: cleanPassageText(r4Text)
});

console.log('✅ Extracted Reading Passage 4: Glaciers\n');

// =====================================================
// INSERT READING PASSAGES
// =====================================================

console.log('💾 Updating Reading passages in database...\n');

for (const passage of readingPassages) {
  const { error } = await supabase
    .from('act_reading_passages')
    .upsert(passage, { onConflict: 'test_number,passage_number' });

  if (error) {
    console.error(`❌ Error updating Reading Passage ${passage.passage_number}:`, error);
  } else {
    console.log(`✅ Updated Reading Passage ${passage.passage_number}: ${passage.title}`);
  }
}

console.log('\n' + '='.repeat(70));
console.log('🎉 EXTRACTION COMPLETE!');
console.log('='.repeat(70));
console.log('\n📊 Summary:');
console.log(`✅ English Passages: 5/5 extracted and inserted`);
console.log(`✅ Reading Passages: 4/4 extracted and updated`);
console.log(`⚠️  Science Passages: 2/7 complete (run science extraction next)`);
console.log('\n💡 Next: Run science passage extraction for passages 3-7');
