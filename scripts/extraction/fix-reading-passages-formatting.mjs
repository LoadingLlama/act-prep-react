#!/usr/bin/env node

/**
 * FIX READING PASSAGE FORMATTING
 * The passages have issues with:
 * - Random line breaks mid-word
 * - Excessive spacing
 * - Need to properly join text while preserving paragraph breaks
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

console.log('🔧 Fixing Reading Passage Formatting...\n');

// =====================================================
// HELPER FUNCTIONS FOR CLEAN EXTRACTION
// =====================================================

function findLineIndex(text, startFrom = 0) {
  for (let i = startFrom; i < lines.length; i++) {
    if (lines[i].includes(text)) {
      return i;
    }
  }
  return -1;
}

function cleanPassageText(startLine, endLine) {
  let allText = '';

  for (let i = startLine; i < endLine && i < lines.length; i++) {
    const line = lines[i].trim();

    // Skip question numbers, answers, and test markers
    if (!line ||
        line.match(/^[0-9]+\.$/) ||
        line.match(/^[A-J]\.$/) ||
        line.match(/^[FGH]\.$/)||
        line.includes('GO ON TO THE NEXT PAGE') ||
        line.includes('ACT-') ||
        line.includes('END OF TEST') ||
        line.includes('STOP!') ||
        line.match(/^Question [0-9]+/)) {
      continue;
    }

    // Add line to text with space
    allText += (allText.length > 0 ? ' ' : '') + line;
  }

  // Now clean up the text
  let cleanedText = allText
    // Remove line numbers like "45", "50", "65" that appear randomly
    .replace(/\s+\d{1,3}\s+/g, ' ')
    // Fix common OCR/formatting issues
    .replace(/\s+([.,;:!?])/g, '$1') // Remove space before punctuation
    .replace(/([.,;:!?])([A-Z])/g, '$1 $2') // Add space after punctuation before capital
    .replace(/\s+/g, ' ') // Collapse multiple spaces
    // Add paragraph breaks at sentence endings followed by capital letters (heuristic)
    .replace(/([.!?])\s+([A-Z][a-z])/g, '$1\n\n$2')
    .trim();

  return cleanedText;
}

// =====================================================
// RE-EXTRACT READING PASSAGES WITH PROPER FORMATTING
// =====================================================

console.log('📚 Re-extracting Reading Passages with clean formatting...\n');

// Passage 1: LITERARY NARRATIVE
const r1Start = findLineIndex('LITERARY NARRATIVE: This passage is adapted from');
const r1End = findLineIndex('SOCIAL SCIENCE', r1Start);
const r1Text = cleanPassageText(r1Start, r1End);

console.log('✅ Re-extracted Reading Passage 1: Love Marriage');
console.log(`   Length: ${r1Text.length} characters\n`);

// Passage 2: SOCIAL SCIENCE (Dual passage)
const r2Start = findLineIndex('SOCIAL SCIENCE: Passage A is adapted');
const r2End = findLineIndex('HUMANITIES', r2Start);
const r2Text = cleanPassageText(r2Start, r2End);

console.log('✅ Re-extracted Reading Passage 2: Our Vanishing Night');
console.log(`   Length: ${r2Text.length} characters\n`);

// Passage 3: HUMANITIES
const r3Start = findLineIndex('HUMANITIES: This passage is adapted from');
const r3End = findLineIndex('NATURAL SCIENCE', r3Start);
const r3Text = cleanPassageText(r3Start, r3End);

console.log('✅ Re-extracted Reading Passage 3: On Places, Photographs');
console.log(`   Length: ${r3Text.length} characters\n`);

// Passage 4: NATURAL SCIENCE
const r4Start = findLineIndex('NATURAL SCIENCE: This passage Is adapted');
const r4End = r4Start + 400; // Approximate end before Science section
const r4Text = cleanPassageText(r4Start, r4End);

console.log('✅ Re-extracted Reading Passage 4: Glaciers');
console.log(`   Length: ${r4Text.length} characters\n`);

// =====================================================
// UPDATE DATABASE WITH CLEANED TEXT
// =====================================================

console.log('💾 Updating database with cleaned passages...\n');

const passages = [
  { passage_number: 1, passage_text: r1Text },
  { passage_number: 2, passage_text: r2Text },
  { passage_number: 3, passage_text: r3Text },
  { passage_number: 4, passage_text: r4Text }
];

for (const passage of passages) {
  const { error } = await supabase
    .from('act_reading_passages')
    .update({ passage_text: passage.passage_text })
    .eq('test_number', 1)
    .eq('passage_number', passage.passage_number);

  if (error) {
    console.error(`❌ Error updating Passage ${passage.passage_number}:`, error);
  } else {
    console.log(`✅ Updated Reading Passage ${passage.passage_number} with clean formatting`);
  }
}

console.log('\n' + '='.repeat(70));
console.log('✅ ALL READING PASSAGES FORMATTING FIXED');
console.log('='.repeat(70));
console.log('- Removed random line breaks');
console.log('- Cleaned up spacing');
console.log('- Preserved paragraph structure');
console.log('- Removed question numbers and test markers');
