#!/usr/bin/env node

import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.mjs';
import { readFileSync } from 'fs';

const pdfPath = '/Users/cadenchiang/Desktop/actprep copy/actclass.org/practice acts/ocr_Practice ACT 1.pdf';
const data = new Uint8Array(readFileSync(pdfPath));

const loadingTask = pdfjsLib.getDocument({data});
const pdf = await loadingTask.promise;

console.log('EXTRACTING ALL ANSWER KEYS FROM PDF (Pages 51-52)\n');

// Page 51 has English and Math
const page51 = await pdf.getPage(51);
const text51 = await page51.getTextContent();
const page51Text = text51.items.map(item => item.str).join(' ');

// Page 52 has Reading and Science
const page52 = await pdf.getPage(52);
const text52 = await page52.getTextContent();
const page52Text = text52.items.map(item => item.str).join(' ');

console.log('=== ENGLISH ANSWER KEY (from PDF Page 51) ===\n');
const engStart = page51Text.indexOf('Test   1:   English');
const engEnd = page51Text.indexOf('Test   2:');
const engSection = page51Text.substring(engStart, engEnd);

// Extract English answers - format is messy, let's find all number-letter pairs
const engMatches = engSection.matchAll(/(\d+)\.\s*([A-D])/g);
const engAnswers = {};
for (const match of engMatches) {
  const num = parseInt(match[1]);
  const ans = match[2];
  if (num >= 1 && num <= 75) {
    engAnswers[num] = ans;
  }
}

console.log('English Q1-20:');
for (let i = 1; i <= 20; i++) {
  if (engAnswers[i]) console.log(`${i}:${engAnswers[i]}`, '');
}
console.log('\n\nEnglish Q51-75:');
for (let i = 51; i <= 75; i++) {
  if (engAnswers[i]) console.log(`${i}:${engAnswers[i]}`, '');
}

console.log('\n\n=== MATH ANSWER KEY (from PDF Page 51) ===\n');
const mathStart = page51Text.indexOf('Test   2:   Mathematics');
const mathEnd = page51Text.indexOf('Test   3:');
const mathSection = page51Text.substring(mathStart, mathEnd);

const mathMatches = mathSection.matchAll(/(\d+)\.\s*([A-K])/g);
const mathAnswers = {};
for (const match of mathMatches) {
  const num = parseInt(match[1]);
  const ans = match[2];
  if (num >= 1 && num <= 60) {
    mathAnswers[num] = ans;
  }
}

console.log('Math Q1-20:');
for (let i = 1; i <= 20; i++) {
  if (mathAnswers[i]) console.log(`${i}:${mathAnswers[i]}`, '');
}

console.log('\n\n=== READING ANSWER KEY (from PDF Page 52) ===\n');
const readStart = page52Text.indexOf('Test   3:   Reading');
const readEnd = page52Text.indexOf('Test   4:');
const readSection = page52Text.substring(readStart, readEnd);

const readMatches = readSection.matchAll(/(\d+)\.\s*([A-J])/g);
const readAnswers = {};
for (const match of readMatches) {
  const num = parseInt(match[1]);
  const ans = match[2];
  if (num >= 1 && num <= 40) {
    readAnswers[num] = ans;
  }
}

console.log('Reading Q1-40:');
for (let i = 1; i <= 40; i++) {
  if (readAnswers[i]) console.log(`${i}:${readAnswers[i]}`, '');
}

console.log('\n\n=== SCIENCE ANSWER KEY (from PDF Page 52) ===\n');
const sciStart = page52Text.indexOf('Test   4:   Science');
const sciSection = page52Text.substring(sciStart, sciStart + 2000);

const sciMatches = sciSection.matchAll(/(\d+)\.\s*([A-J])/g);
const sciAnswers = {};
for (const match of sciMatches) {
  const num = parseInt(match[1]);
  const ans = match[2];
  if (num >= 1 && num <= 40) {
    sciAnswers[num] = ans;
  }
}

console.log('Science Q1-40:');
for (let i = 1; i <= 40; i++) {
  if (sciAnswers[i]) console.log(`${i}:${sciAnswers[i]}`, '');
}

console.log('\n\nSUMMARY:');
console.log(`English: ${Object.keys(engAnswers).length}/75 answers extracted`);
console.log(`Math: ${Object.keys(mathAnswers).length}/60 answers extracted`);
console.log(`Reading: ${Object.keys(readAnswers).length}/40 answers extracted`);
console.log(`Science: ${Object.keys(sciAnswers).length}/40 answers extracted`);
