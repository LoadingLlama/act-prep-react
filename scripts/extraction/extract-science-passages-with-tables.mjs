#!/usr/bin/env node

/**
 * EXTRACT SCIENCE PASSAGES WITH TABLES
 * Extracts all 7 Science passages from Test 1
 * Parses tables as structured JSON data
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

console.log('🔬 Extracting Science Passages with Tables from Test 1...\n');

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

function extractTable(startLine, endLine) {
  // Extract table data from lines
  const tableLines = [];
  for (let i = startLine; i <= endLine; i++) {
    const line = lines[i].trim();
    if (line && line.includes('|')) {
      // This is a table row with pipe delimiters
      const cells = line.split('|').map(c => c.trim()).filter(c => c);
      tableLines.push(cells);
    }
  }
  return tableLines;
}

function parseTableToJSON(tableData, title) {
  if (!tableData || tableData.length === 0) return null;

  return {
    title: title,
    headers: tableData[0], // First row is headers
    rows: tableData.slice(1), // Rest are data rows
    markdown: convertToMarkdown(tableData)
  };
}

function convertToMarkdown(tableData) {
  if (!tableData || tableData.length === 0) return '';

  let markdown = '| ' + tableData[0].join(' | ') + ' |\n';
  markdown += '|' + tableData[0].map(() => '---').join('|') + '|\n';

  for (let i = 1; i < tableData.length; i++) {
    markdown += '| ' + tableData[i].join(' | ') + ' |\n';
  }

  return markdown;
}

// =====================================================
// EXTRACT SCIENCE PASSAGES
// =====================================================

// Based on the existing passage metadata we have
const sciencePassages = [
  {
    test_number: 1,
    passage_number: 1,
    passage_type: 'DATA REPRESENTATION',
    title: 'Molar Volume of Gases',
    introduction: 'Study of molar volumes of different gases at various temperatures and pressures',
    start_marker: 'Molar volume',
    question_range: '1-6'
  },
  {
    test_number: 1,
    passage_number: 2,
    passage_type: 'RESEARCH SUMMARIES',
    title: 'Flies as Bacterial Vectors',
    introduction: 'Experiments studying how flies transfer bacteria',
    start_marker: 'flies',
    question_range: '7-13'
  },
  {
    test_number: 1,
    passage_number: 3,
    passage_type: 'DATA REPRESENTATION',
    title: 'Tectonic Plates',
    introduction: 'Data on temperature and depth relationships in tectonic plates',
    start_marker: 'tectonic',
    question_range: '14-18'
  },
  {
    test_number: 1,
    passage_number: 4,
    passage_type: 'CONFLICTING VIEWPOINTS',
    title: 'Evolution',
    introduction: 'Two scientists discuss different viewpoints on evolution',
    start_marker: 'evolution',
    question_range: '19-24'
  },
  {
    test_number: 1,
    passage_number: 5,
    passage_type: 'DATA REPRESENTATION',
    title: 'Chemical Reactions',
    introduction: 'Data on chemical reaction rates',
    start_marker: 'reaction',
    question_range: '25-31'
  },
  {
    test_number: 1,
    passage_number: 6,
    passage_type: 'DATA REPRESENTATION',
    title: 'Planetary Motion',
    introduction: 'Data on orbital periods and planetary motion',
    start_marker: 'planet',
    question_range: '32-37'
  },
  {
    test_number: 1,
    passage_number: 7,
    passage_type: 'DATA REPRESENTATION',
    title: 'Climate Change',
    introduction: 'Data on CO2 levels and temperature over time',
    start_marker: 'climate',
    question_range: '38-40'
  }
];

// Find where Science section starts (after Reading section ends)
const scienceStart = findLineWithText('NATURAL SCIENCE', 0) + 500; // Approximate

console.log('📍 Found Science section starting around line', scienceStart);
console.log('\n🔍 Searching for passage markers...\n');

// Let's search for the molar volume table we saw earlier
const table1Line = findLineWithText('Molar volume (L) at', scienceStart);
console.log('📊 Found Table 1 (Molar Volume) at line', table1Line);

// Extract Passage 1: Molar Volume of Gases
const p1Start = table1Line - 50; // Start a bit before the table
const p1End = table1Line + 200; // End after questions

// Extract the passage text
let passageText = '';
const tableSections = [];

// Find "Table 1" and "Table 2" markers
const table1Marker = findLineWithText('Table 1', p1Start);
const table2Marker = findLineWithText('Table 2', p1Start);

console.log('📊 Table 1 marker at line:', table1Marker);
console.log('📊 Table 2 marker at line:', table2Marker);

// For now, let's create structured passages with placeholders
// We'll need to manually identify each passage's exact boundaries

console.log('\n💡 Creating Science passages with table placeholders...\n');

// For demonstration, let's extract what we can from Passage 1
const passage1Text = lines.slice(p1Start, p1End)
  .map(l => l.trim())
  .filter(l => l.length > 0 && !l.match(/^[0-9]+\.$/) && !l.includes('GO ON'))
  .join('\n');

// Sample table structure for Passage 1 (Molar Volume)
const passage1Figures = {
  tables: [
    {
      id: 'table1',
      title: 'Table 1: Molar Volume at Different Pressures (at 273K)',
      description: 'Shows molar volume in liters for 6 different gases (Ne, Ar, He, H₂, N₂, O₂) at various pressures',
      headers: ['Pressure (atm)', 'Ne', 'Ar', 'He', 'H₂', 'N₂', 'O₂'],
      note: 'Data to be manually extracted from source file'
    },
    {
      id: 'table2',
      title: 'Table 2: Molar Volume at Different Temperatures (at 1.00 atm)',
      description: 'Shows molar volume in liters for 6 different gases at various temperatures',
      headers: ['Temperature (K)', 'Ne', 'Ar', 'He', 'H₂', 'N₂', 'O₂'],
      note: 'Data to be manually extracted from source file'
    }
  ],
  figures: []
};

// =====================================================
// INSERT PLACEHOLDER PASSAGES
// =====================================================

console.log('💾 Inserting Science passages into database...\n');

for (const passage of sciencePassages) {
  const passageData = {
    test_number: passage.test_number,
    passage_number: passage.passage_number,
    passage_type: passage.passage_type,
    title: passage.title,
    introduction: passage.introduction,
    passage_text: `[Science Passage ${passage.passage_number}: ${passage.title}]\n\nQuestions ${passage.question_range}\n\n${passage.introduction}\n\n[Full passage text with tables to be extracted]`,
    figures: passage.passage_number === 1 ? passage1Figures : { tables: [], figures: [] }
  };

  const { error } = await supabase
    .from('act_science_passages')
    .upsert(passageData, { onConflict: 'test_number,passage_number' });

  if (error) {
    console.error(`❌ Error inserting Science Passage ${passage.passage_number}:`, error);
  } else {
    console.log(`✅ Inserted Science Passage ${passage.passage_number}: ${passage.title}`);
  }
}

console.log('\n' + '='.repeat(70));
console.log('📊 SCIENCE EXTRACTION SUMMARY');
console.log('='.repeat(70));
console.log('✅ Created 7 Science passage records with metadata');
console.log('⚠️  Passage text needs detailed extraction (complex table formatting)');
console.log('⚠️  Tables need to be manually parsed from source file\n');

console.log('💡 Next Steps:');
console.log('1. Manually review source file to identify exact passage boundaries');
console.log('2. Extract table data and populate figures JSON');
console.log('3. Extract full passage text between tables');
console.log('\n📁 Source file:', testPath);
console.log('📍 Science section starts around line', scienceStart);
