#!/usr/bin/env node

import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.mjs';
import { readFileSync } from 'fs';

const pdfPath = '/Users/cadenchiang/Desktop/actprep copy/actclass.org/practice acts/ocr_Practice ACT 1.pdf';
const data = new Uint8Array(readFileSync(pdfPath));

const loadingTask = pdfjsLib.getDocument({data});
const pdf = await loadingTask.promise;

const page = await pdf.getPage(51);
const textContent = await page.getTextContent();
const pageText = textContent.items.map(item => item.str).join(' ');

// Find section with Q51-75
const startIdx = pageText.indexOf('51.');
const endIdx = pageText.indexOf('Test   2:');

if (startIdx > 0 && endIdx > 0) {
  const section = pageText.substring(startIdx, endIdx);
  console.log('Q51-75 Section from PDF:\n');
  console.log(section.substring(0, 800));
}
