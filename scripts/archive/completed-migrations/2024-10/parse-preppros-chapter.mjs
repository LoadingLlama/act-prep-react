#!/usr/bin/env node

/**
 * Parse PrepPros Chapter and Format to HTML
 * Extracts Chapter 1 (Sentence Structure) as a proof of concept
 */

import fs from 'fs';

console.log('📖 Parsing PrepPros Chapter 1: Sentence Structure...\n');

const textbookPath = '/Users/cadenchiang/Desktop/actprep copy/actclass.org/packets/PrepPros ACT English Book (For New Enhanced ACT).txt';
const content = fs.readFileSync(textbookPath, 'utf-8');
const lines = content.split('\n');

// Extract Chapter 1 content (lines 302-866 based on analysis)
const chapter1Start = 302;
const chapter1End = 866;
const chapter1Lines = lines.slice(chapter1Start, chapter1End);

console.log(`Extracting lines ${chapter1Start}-${chapter1End} (${chapter1Lines.length} lines)\n`);

// Parse chapter structure
function parseChapter(chapterLines) {
  const sections = [];
  let currentSection = null;
  let contentBuffer = [];

  for (let i = 0; i < chapterLines.length; i++) {
    const line = chapterLines[i].trim();

    // Detect section headers
    if (line.startsWith('TIP -') || line.startsWith('TIP:')) {
      // Save previous section
      if (currentSection) {
        currentSection.content = contentBuffer.join('\n').trim();
        sections.push(currentSection);
      }

      currentSection = {
        type: 'tip',
        title: line.replace(/^TIP -/, '').replace(/^TIP:/, '').trim(),
        content: ''
      };
      contentBuffer = [];
    } else if (line.match(/^[A-Z][a-z]+ and [A-Z][a-z]+$/) ||
               line.match(/^[A-Z][a-z]+ [A-Z][a-z]+$/) ||
               line.match(/^[A-Za-z ]+ Practice:$/)) {
      // Section header like "Clauses and Phrases" or "Sentence Fragments"
      if (currentSection) {
        currentSection.content = contentBuffer.join('\n').trim();
        sections.push(currentSection);
      }

      currentSection = {
        type: 'section',
        title: line,
        content: ''
      };
      contentBuffer = [];
    } else if (line.match(/^\d+ Types of/)) {
      // "5 Types of Compound Sentences"
      if (currentSection) {
        currentSection.content = contentBuffer.join('\n').trim();
        sections.push(currentSection);
      }

      currentSection = {
        type: 'section',
        title: line,
        content: ''
      };
      contentBuffer = [];
    } else if (line.startsWith('Comma Splices') || line.startsWith('Sentence Fragments')) {
      // Special subsections
      if (currentSection) {
        currentSection.content = contentBuffer.join('\n').trim();
        sections.push(currentSection);
      }

      currentSection = {
        type: 'subsection',
        title: line,
        content: ''
      };
      contentBuffer = [];
    } else if (line.startsWith('© PrepPros') || line.match(/^-\d+-$/)) {
      // Skip copyright and page numbers
      continue;
    } else if (line.startsWith('PrepPros ACT English Course')) {
      // Skip headers
      continue;
    } else {
      // Add to content buffer
      contentBuffer.push(line);
    }
  }

  // Save last section
  if (currentSection) {
    currentSection.content = contentBuffer.join('\n').trim();
    sections.push(currentSection);
  }

  return sections;
}

const parsedSections = parseChapter(chapter1Lines);

console.log(`📚 Parsed ${parsedSections.length} sections:\n`);
parsedSections.forEach((section, i) => {
  console.log(`${i + 1}. [${section.type}] ${section.title}`);
  console.log(`   Content: ${section.content.length} characters\n`);
});

// Format sections to HTML
function formatSectionToHTML(section) {
  let html = '';

  if (section.type === 'tip') {
    // TIP box with blue background
    html += `<div style="background-color: #eff6ff; border-left: 4px solid #2563eb; padding: 1rem 1.5rem; margin: 1.5rem 0; border-radius: 4px;">\n`;
    html += `  <h4 style="color: #2563eb; font-weight: 700; margin: 0 0 0.75rem 0; font-size: 1.1rem;">💡 TIP: ${section.title}</h4>\n`;

    // Format content paragraphs
    const paragraphs = section.content.split('\n\n').filter(p => p.trim());
    paragraphs.forEach(para => {
      if (para.trim()) {
        html += `  <p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0; color: #1e3a8a;">${para.trim()}</p>\n`;
      }
    });

    html += `</div>\n`;
  } else if (section.type === 'section') {
    // Main section with h3 header
    html += `<h3 style="margin-top: 2rem; margin-bottom: 0.75rem; font-weight: 700;">${section.title}</h3>\n`;

    // Parse content for different elements
    const contentLines = section.content.split('\n');
    let inList = false;
    let inExample = false;

    for (let line of contentLines) {
      line = line.trim();

      if (!line) {
        if (inList) {
          html += `</ul>\n`;
          inList = false;
        }
        continue;
      }

      // Detect lists (lines that are short and look like examples)
      if (line.length < 80 && !line.endsWith('.') && !line.endsWith(':')) {
        if (!inList) {
          html += `<ul style="margin: 0.3rem 0 0.5rem 0; padding-left: 1.5rem; line-height: 1.5;">\n`;
          inList = true;
        }
        html += `  <li style="margin: 0.15rem 0;">${line}</li>\n`;
      } else {
        if (inList) {
          html += `</ul>\n`;
          inList = false;
        }

        // Regular paragraph with key terms bolded and colored
        let formattedLine = line;

        // Bold and color key terms
        const keyTerms = [
          'independent clause', 'dependent clause', 'phrase', 'subject', 'verb',
          'subordinating conjunction', 'FANBOYS', 'comma splice', 'sentence fragment',
          'compound sentence'
        ];

        keyTerms.forEach(term => {
          const regex = new RegExp(`\\b${term}(s)?\\b`, 'gi');
          formattedLine = formattedLine.replace(regex, (match) => {
            return `<strong style="color: #2563eb; text-decoration: underline;">${match}</strong>`;
          });
        });

        html += `<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">${formattedLine}</p>\n`;
      }
    }

    if (inList) {
      html += `</ul>\n`;
    }
  }

  return html;
}

// Generate HTML for first few sections
console.log('📝 Generating HTML for first 3 sections...\n');

let fullHTML = '';
parsedSections.slice(0, 3).forEach(section => {
  fullHTML += formatSectionToHTML(section);
  fullHTML += '\n';
});

// Save sample HTML
const outputPath = '/Users/cadenchiang/Desktop/act-prep-react/docs/CHAPTER_1_SAMPLE.html';
fs.writeFileSync(outputPath, fullHTML);

console.log(`✅ Saved sample HTML to: ${outputPath}`);
console.log(`📊 Generated ${fullHTML.length} characters of HTML\n`);

// Show first 500 characters as preview
console.log('Preview:');
console.log(fullHTML.substring(0, 500) + '...\n');
