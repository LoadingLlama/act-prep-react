#!/usr/bin/env node

import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.mjs';
import { readFileSync } from 'fs';

const pdfPath = '/Users/cadenchiang/Desktop/actprep copy/actclass.org/practice acts/ocr_Practice ACT 1.pdf';
const data = new Uint8Array(readFileSync(pdfPath));

const loadingTask = pdfjsLib.getDocument({data});
const pdf = await loadingTask.promise;

console.log('Checking English Answer Key from PDF (Page 51)...\n');

const page = await pdf.getPage(51);
const textContent = await page.getTextContent();
const pageText = textContent.items.map(item => item.str).join(' ');

// Find the English answer key section
const englishSection = pageText.substring(pageText.indexOf('Test   1:   English'), pageText.indexOf('Test   2:'));

console.log('Looking for Q51-61 answers...\n');

// Parse answers - the format is messy but we can extract
// Looking for patterns around these question numbers
const questionRange = [51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61];

// Show raw text around Q55
const q55idx = englishSection.indexOf('55');
if (q55idx > 0) {
  console.log('Raw text around Q55-60:');
  console.log(englishSection.substring(Math.max(0, q55idx - 50), q55idx + 200));
  console.log('\n');
}

// Also check what the official PDF shows
console.log('Full answer key for 51-75 from PDF extraction:');
console.log('(Note: Answer key formatting may be corrupted in OCR)');
