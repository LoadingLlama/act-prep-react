#!/usr/bin/env node
/**
 * UPDATE SIDEBAR UI - Add permanent right sidebar with hamburger icon
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
  'practice-test.html'
];

const newSidebar = `                <!-- Question Sidebar -->
                <div class="question-sidebar">
                    <div class="sidebar-icon" onclick="toggleSidebar()">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <line x1="3" y1="6" x2="21" y2="6"></line>
                            <line x1="3" y1="12" x2="21" y2="12"></line>
                            <line x1="3" y1="18" x2="21" y2="18"></line>
                        </svg>
                    </div>
                    <div class="sidebar-text">Index</div>
                    <div class="sidebar-divider"></div>
                    <div class="sidebar-questions" id="sidebarQuestions"></div>
                </div>`;

const generateSidebarFunction = `
        function generateSidebarQuestions() {
            const sidebar = document.getElementById('sidebarQuestions');
            sidebar.innerHTML = '';

            for (let i = 1; i <= totalQuestions; i++) {
                const item = document.createElement('div');
                item.className = 'sidebar-question-item';
                item.textContent = i;
                item.onclick = () => goToQuestion(i);

                if (i === currentQuestion) {
                    item.classList.add('current');
                } else if (answers[\`q\${i}\`]) {
                    item.classList.add('answered');
                } else if (flaggedQuestions.has(i)) {
                    item.classList.add('flagged');
                }

                sidebar.appendChild(item);
            }
        }

        function toggleSidebar() {
            // Sidebar is always visible now, this could be used for future expand/collapse
            showQuestionModal();
        }`;

console.log('🔧 UPDATING SIDEBAR UI IN TEST FILES\n');
console.log('='.repeat(80) + '\n');

for (const file of files) {
  const filePath = path.join(testsDir, file);

  if (!fs.existsSync(filePath)) {
    console.log(`⚠️  ${file}: Not found, skipping`);
    continue;
  }

  let content = fs.readFileSync(filePath, 'utf8');
  let updated = false;

  // Update sidebar HTML
  const sidebarRegex = /<!-- Question Sidebar -->[\s\S]*?<div class="question-sidebar">[\s\S]*?<div class="sidebar-icon"[^>]*>.*?<\/div>[\s\S]*?<div class="sidebar-text">.*?<\/div>[\s\S]*?<\/div>/;
  if (sidebarRegex.test(content)) {
    content = content.replace(sidebarRegex, newSidebar);
    updated = true;
  }

  // Add generateSidebarQuestions function after generateQuestionGrid
  const functionRegex = /(function generateQuestionGrid\(\) \{[\s\S]*?\n        \})/;
  if (functionRegex.test(content) && !content.includes('function generateSidebarQuestions')) {
    content = content.replace(functionRegex, `$1${generateSidebarFunction}`);
    updated = true;
  }

  // Update updateQuestionGrid to call generateSidebarQuestions
  const updateGridRegex = /(function updateQuestionGrid\(\) \{)\s*(if \(document\.getElementById)/;
  if (updateGridRegex.test(content) && !content.includes('generateSidebarQuestions();\n            if (document.getElementById')) {
    content = content.replace(updateGridRegex, '$1\n            generateSidebarQuestions();\n            $2');
    updated = true;
  }

  // Add generateSidebarQuestions() call after updateDisplay() in initial load
  const loadRegex = /(updateDisplay\(\);)\s*(startTimer\(\);)/;
  if (loadRegex.test(content) && !content.includes('generateSidebarQuestions();\n                startTimer')) {
    content = content.replace(loadRegex, '$1\n                generateSidebarQuestions();\n                $2');
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
console.log('\n✅ SIDEBAR UI UPDATE COMPLETE!\n');
