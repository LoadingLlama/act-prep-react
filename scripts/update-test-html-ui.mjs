#!/usr/bin/env node
/**
 * UPDATE TEST HTML UI
 * Updates all test HTML files with new header structure and SVG icons
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const testsDir = path.join(__dirname, '..', 'public', 'tests');
const files = [
  'math-test.html',
  'reading-test.html',
  'science-test.html',
  'practice-test.html',
  'diagnostic-test.html'
];

const newHeader = `            <div class="header-content">
                <a href="/" class="logo">actcourse.org</a>
                <div class="header-center"></div>
                <div class="header-right">
                    <span class="question-counter">
                        <span class="question-counter-label">Answered</span>
                        <span class="question-counter-value" id="questionCounter">0 of 75</span>
                    </span>
                    <div class="timer-container">
                        <span class="timer-label">Total Time Left</span>
                        <div class="timer" id="timer">45:00</div>
                    </div>
                    <button class="end-section-link" onclick="endSection()">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                        </svg>
                        End Section
                    </button>
                </div>
            </div>`;

const newFlagButton = `                    <button class="flag-button" id="flagBtn" onclick="toggleFlag()">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path>
                            <line x1="4" y1="22" x2="4" y2="15"></line>
                        </svg>
                        Flag
                    </button>`;

const newNavigation = `                <button class="nav-button" id="prevBtn" onclick="previousQuestion()">PREV</button>
                <button class="nav-button primary" id="nextBtn" onclick="nextQuestion()">NEXT</button>`;

console.log('🔧 UPDATING TEST HTML FILES\n');
console.log('='.repeat(80) + '\n');

for (const file of files) {
  const filePath = path.join(testsDir, file);

  if (!fs.existsSync(filePath)) {
    console.log(`⚠️  ${file}: Not found, skipping`);
    continue;
  }

  let content = fs.readFileSync(filePath, 'utf8');
  let updated = false;

  // Update header
  const headerRegex = /<div class="header-content">[\s\S]*?<\/div>\s*<\/div>\s*<\/div>\s*<div class="test-main">/;
  if (headerRegex.test(content)) {
    content = content.replace(headerRegex, (match) => {
      return newHeader + '\n        </div>\n\n        <div class="test-main">';
    });
    updated = true;
  }

  // Update flag button
  const flagRegex = /<button class="flag-button"[^>]*>🏳️ Flag<\/button>/;
  if (flagRegex.test(content)) {
    content = content.replace(flagRegex, newFlagButton);
    updated = true;
  }

  // Update navigation buttons
  const navRegex = /<button class="nav-button" id="prevBtn"[^>]*>← Previous<\/button>\s*<button class="nav-button primary" id="nextBtn"[^>]*>Next →<\/button>/;
  if (navRegex.test(content)) {
    content = content.replace(navRegex, newNavigation);
    updated = true;
  }

  if (updated) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ ${file}: Updated successfully`);
  } else {
    console.log(`ℹ️  ${file}: No changes needed`);
  }
}

console.log('\n' + '='.repeat(80));
console.log('\n✅ ALL TEST HTML FILES UPDATED!\n');
