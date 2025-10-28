#!/usr/bin/env node

/**
 * EXTRACT TEST 5 MATH SECTION FROM PDF
 * Extract the raw Math section text from Practice ACT 5 PDF
 */

const fs = require('fs');
const pdfParse = require('pdf-parse');

const PDF_PATH = '/Users/cadenchiang/Desktop/actprep copy/actclass.org/practice acts/ocr_Practice ACT 5.pdf';
const OUTPUT_PATH = '/Users/cadenchiang/Desktop/act-prep-react/scripts/extraction/test5-math-raw.txt';

console.log('📄 EXTRACTING MATH SECTION FROM PRACTICE ACT 5 PDF\n');
console.log('='.repeat(70));

async function extractMathSection() {
  try {
    console.log('\n📖 Reading PDF file...');
    const dataBuffer = fs.readFileSync(PDF_PATH);

    console.log('🔍 Parsing PDF content...');
    const pdfData = await pdfParse(dataBuffer);

    const fullText = pdfData.text;
    console.log(`✅ PDF parsed. Total characters: ${fullText.length}`);

    // Find Math section boundaries
    const mathStart = fullText.indexOf('MATHEMATICS TEST');
    const mathEnd = fullText.indexOf('END OF TEST', mathStart);

    if (mathStart === -1 || mathEnd === -1) {
      console.error('❌ Could not find Math section boundaries');
      return;
    }

    const mathSection = fullText.substring(mathStart, mathEnd + 50);

    console.log(`\n📊 Math section extracted:`);
    console.log(`   Start position: ${mathStart}`);
    console.log(`   End position: ${mathEnd}`);
    console.log(`   Section length: ${mathSection.length} characters`);

    // Save to file
    fs.writeFileSync(OUTPUT_PATH, mathSection);
    console.log(`\n💾 Math section saved to: ${OUTPUT_PATH}`);

    // Show first 1000 characters as preview
    console.log('\n📝 Preview (first 1000 chars):');
    console.log('='.repeat(70));
    console.log(mathSection.substring(0, 1000));
    console.log('='.repeat(70));

    // Show last 500 characters as preview
    console.log('\n📝 Preview (last 500 chars):');
    console.log('='.repeat(70));
    console.log(mathSection.substring(mathSection.length - 500));
    console.log('='.repeat(70));

    console.log('\n✅ Extraction complete! Now manually parse questions from the raw text file.\n');

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

extractMathSection();
