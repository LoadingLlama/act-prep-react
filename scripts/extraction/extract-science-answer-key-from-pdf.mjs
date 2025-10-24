#!/usr/bin/env node

import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.mjs';
import { readFileSync } from 'fs';

const pdfPath = '/Users/cadenchiang/Desktop/actprep copy/actclass.org/practice acts/ocr_Practice ACT 1.pdf';
const data = new Uint8Array(readFileSync(pdfPath));

const loadingTask = pdfjsLib.getDocument({data});
const pdf = await loadingTask.promise;

console.log(`PDF loaded, ${pdf.numPages} pages\n`);

// The answer key is typically at the end - try last 5 pages
for (let pageNum = Math.max(1, pdf.numPages - 10); pageNum <= pdf.numPages; pageNum++) {
  const page = await pdf.getPage(pageNum);
  const textContent = await page.getTextContent();
  const pageText = textContent.items.map(item => item.str).join(' ');

  if (pageText.includes('Science') && pageText.includes('Scoring') || pageText.includes('Test 4')) {
    console.log(`\n=== Page ${pageNum} ===`);
    console.log(pageText.substring(0, 2000));
  }
}
