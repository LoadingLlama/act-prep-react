#!/usr/bin/env node

/**
 * SIMPLE PDF TEXT EXTRACTION
 * Extract all text from PDF and save to file
 */

const fs = require('fs');
const path = require('path');
const pdfjs = require('pdfjs-dist/legacy/build/pdf.js');

const pdfPath = '/Users/cadenchiang/Desktop/actprep copy/actclass.org/practice acts/ocr_Practice ACT 1.pdf';

console.log('📄 Extracting text from OCR PDF...\n');

async function extractPDF() {
  const data = new Uint8Array(fs.readFileSync(pdfPath));
  const pdf = await pdfjs.getDocument({ data }).promise;

  console.log(`📊 Total pages: ${pdf.numPages}\n`);

  let fullText = '';

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const textContent = await page.getTextContent();
    const pageText = textContent.items.map(item => item.str).join(' ');
    fullText += pageText + '\n\n';

    if (i % 10 === 0) {
      console.log(`✓ Extracted ${i}/${pdf.numPages} pages...`);
    }
  }

  console.log(`\n✅ Extraction complete!\n`);

  // Save to file
  const outputPath = path.join(__dirname, '../../backups/passages/pdf-full-text.txt');
  fs.writeFileSync(outputPath, fullText);
  console.log(`💾 Saved to: ${outputPath}`);
  console.log(`📝 Total text length: ${fullText.length} characters\n`);

  // Show preview
  console.log('=== FIRST 1000 CHARACTERS ===\n');
  console.log(fullText.substring(0, 1000));
  console.log('\n... [text continues]');
}

extractPDF().catch(err => {
  console.error('❌ Error:', err);
  process.exit(1);
});
