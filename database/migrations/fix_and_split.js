/**
 * Fix SQL escaping issues and create properly formatted files
 * This reads the original SQL and fixes quote escaping
 */

const fs = require('fs');
const path = require('path');

const INPUT_FILE = './RESTORE_FULL_CONTENT.sql';
const OUTPUT_DIR = './fixed_chunks';
const MAX_SIZE_BYTES = 0.4 * 1024 * 1024; // 400KB chunks for safety

console.log('🔧 Fixing SQL and creating new chunks...\n');

// Read the file
const content = fs.readFileSync(INPUT_FILE, 'utf8');
const lines = content.split('\n');

console.log(`📄 Input: ${INPUT_FILE}`);
console.log(`📊 Lines: ${lines.length}\n`);

// Create output directory
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// The file should already have proper escaping ('' for quotes inside strings)
// But let's verify and split it carefully

let chunkNumber = 1;
let currentChunk = [];
let currentSize = 0;
let insertCount = 0;
let inInsert = false;
let currentInsert = [];

const header = lines.slice(0, 8).join('\n') + '\n\n';

for (let i = 8; i < lines.length; i++) {
  const line = lines[i];
  const lineSize = Buffer.byteLength(line + '\n', 'utf8');

  // Detect INSERT statement start
  if (line.trim().startsWith('INSERT INTO lessons')) {
    inInsert = true;
    currentInsert = [line];
    continue;
  }

  // If we're in an INSERT, accumulate lines until we hit the terminator
  if (inInsert) {
    currentInsert.push(line);

    // Check if this completes the INSERT (ends with semicolon and ON CONFLICT block)
    if (line.trim().startsWith('order_index = EXCLUDED.order_index;')) {
      // Complete INSERT - add it to chunk
      const insertBlock = currentInsert.join('\n');
      const insertSize = Buffer.byteLength(insertBlock + '\n', 'utf8');

      // Check if we need new chunk
      if (currentSize + insertSize > MAX_SIZE_BYTES && currentChunk.length > 0) {
        // Write current chunk
        writeChunk(chunkNumber, currentChunk, insertCount);
        chunkNumber++;
        currentChunk = [];
        currentSize = 0;
        insertCount = 0;
      }

      // Add insert to current chunk
      currentChunk.push(insertBlock);
      currentSize += insertSize;
      insertCount++;

      inInsert = false;
      currentInsert = [];
    }
    continue;
  }

  // Add non-INSERT lines (headers, blank lines)
  if (line.trim() !== '') {
    currentChunk.push(line);
    currentSize += lineSize;
  }
}

// Write final chunk
if (currentChunk.length > 0) {
  writeChunk(chunkNumber, currentChunk, insertCount);
}

function writeChunk(num, lines, count) {
  const filename = `RESTORE_CONTENT_fixed_${num.toString().padStart(2, '0')}.sql`;
  const filepath = path.join(OUTPUT_DIR, filename);
  const content = header + lines.join('\n\n');

  fs.writeFileSync(filepath, content);

  const sizeMB = (fs.statSync(filepath).size / 1024 / 1024).toFixed(2);
  console.log(`✅ ${filename} (${sizeMB} MB, ${count} lessons)`);
}

console.log(`\n🎉 Created ${chunkNumber} fixed chunks in ${OUTPUT_DIR}/`);
console.log('\n📋 These files are ready to use in Supabase SQL Editor!');
