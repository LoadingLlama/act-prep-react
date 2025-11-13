/**
 * Split large SQL file into smaller chunks for Supabase execution
 * Usage: node split_sql.js
 */

const fs = require('fs');
const path = require('path');

const INPUT_FILE = './RESTORE_FULL_CONTENT.sql';
const OUTPUT_DIR = './chunks';
const MAX_SIZE_MB = 0.5; // 500KB chunks for safety
const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024;

console.log('🔧 Starting SQL file splitter...\n');

// Read the input file
const sqlContent = fs.readFileSync(INPUT_FILE, 'utf8');
const lines = sqlContent.split('\n');

console.log(`📄 Input file: ${INPUT_FILE}`);
console.log(`📊 Total lines: ${lines.length}`);
console.log(`💾 Total size: ${(fs.statSync(INPUT_FILE).size / 1024 / 1024).toFixed(2)} MB\n`);

// Create output directory if it doesn't exist
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Split logic
let chunkNumber = 1;
let currentChunk = [];
let currentSize = 0;
let insertCount = 0;

// Extract header comments (first 8 lines)
const header = lines.slice(0, 8).join('\n') + '\n\n';

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  const lineSize = Buffer.byteLength(line + '\n', 'utf8');

  // Check if we need to start a new chunk
  if (currentSize + lineSize > MAX_SIZE_BYTES && currentChunk.length > 0) {
    // Write current chunk
    const filename = `RESTORE_FULL_CONTENT_part_${chunkNumber.toString().padStart(2, '0')}.sql`;
    const filepath = path.join(OUTPUT_DIR, filename);
    fs.writeFileSync(filepath, header + currentChunk.join('\n'));

    const chunkSizeMB = (fs.statSync(filepath).size / 1024 / 1024).toFixed(2);
    console.log(`✅ Created ${filename} (${chunkSizeMB} MB, ${insertCount} inserts)`);

    // Reset for next chunk
    chunkNumber++;
    currentChunk = [];
    currentSize = 0;
    insertCount = 0;
  }

  // Add line to current chunk
  currentChunk.push(line);
  currentSize += lineSize;

  // Count INSERT statements
  if (line.trim().startsWith('INSERT INTO lessons')) {
    insertCount++;
  }
}

// Write final chunk if there's any remaining content
if (currentChunk.length > 0) {
  const filename = `RESTORE_FULL_CONTENT_part_${chunkNumber.toString().padStart(2, '0')}.sql`;
  const filepath = path.join(OUTPUT_DIR, filename);
  fs.writeFileSync(filepath, header + currentChunk.join('\n'));

  const chunkSizeMB = (fs.statSync(filepath).size / 1024 / 1024).toFixed(2);
  console.log(`✅ Created ${filename} (${chunkSizeMB} MB, ${insertCount} inserts)`);
}

console.log(`\n🎉 Successfully split into ${chunkNumber} files!`);
console.log(`📁 Output directory: ${OUTPUT_DIR}/`);
console.log('\n📋 Next steps:');
console.log('   1. Open Supabase SQL Editor');
console.log('   2. Run each file in order (part_01, part_02, etc.)');
console.log('   3. Wait for each to complete before running the next\n');
