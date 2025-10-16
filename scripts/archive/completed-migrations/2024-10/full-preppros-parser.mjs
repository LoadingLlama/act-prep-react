#!/usr/bin/env node

/**
 * Full PrepPros Parser and Formatter
 * Extracts all 16 English lessons with complete formatting
 */

import fs from 'fs';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

console.log('📚 Full PrepPros English Lesson Parser\n');
console.log('=' .repeat(60) + '\n');

// Chapter boundaries from analysis
const CHAPTERS = {
  'introduction': { start: 157, end: 301, lessonKey: 'getting-started', title: 'Introduction to the English Test' },
  'chapter-1': { start: 302, end: 866, lessonKey: 'sentence-structure', title: 'Chapter 1: Sentence Structure' },
  'chapter-2': { start: 1127, end: 1936, lessonKey: 'commas', title: 'Chapter 2: Commas - 4 Types of Commas' },
  'chapter-3': { start: 2475, end: 3033, lessonKey: 'punctuation', title: 'Chapter 3: Semicolons, Colons, Dashes, Apostrophes, and Quotation Marks' },
  'chapter-4': { start: 4026, end: 4449, lessonKey: 'verbs', title: 'Chapter 4: Verbs' },
  'chapter-5': { start: 4848, end: 5362, lessonKey: 'pronouns', title: 'Chapter 5: Pronouns' },
  'chapter-6': { start: 5734, end: 6105, lessonKey: 'modifiers', title: 'Chapter 6: Misplaced Modifiers' },
  'chapter-7': { start: 6552, end: 6799, lessonKey: 'parallel-structure', title: 'Chapter 7: Parallel Structure' },
  'chapter-8': { start: 7149, end: 7688, lessonKey: 'misc-topics', title: 'Chapter 8: Other Miscellaneous Topics' },
  'chapter-9': { start: 7911, end: 7912, lessonKey: 'grammar-review', title: 'Chapter 9: Grammar Review' },
  'chapter-10': { start: 8738, end: 8882, lessonKey: 'redundancy', title: 'Chapter 10: Redundancy, Wordiness, and Irrelevance' },
  'chapter-11': { start: 9132, end: 9167, lessonKey: 'word-choice', title: 'Chapter 11: Word Choice' },
  'chapter-12': { start: 9356, end: 9693, lessonKey: 'transitions', title: 'Chapter 12: Transitions' },
  'chapter-13': { start: 9926, end: 10144, lessonKey: 'which-choice', title: 'Chapter 13: Which Choice' },
  'chapter-14': { start: 10837, end: 11226, lessonKey: 'adding-deleting', title: 'Chapter 14: Adding or Deleting Information' },
  'chapter-15': { start: 11655, end: 11675, lessonKey: 'logical-placement', title: 'Chapter 15: Logical Placement' }
};

// Key terms to highlight
const KEY_TERMS = [
  'independent clause', 'dependent clause', 'phrase', 'subject', 'verb',
  'subordinating conjunction', 'FANBOYS', 'comma splice', 'sentence fragment',
  'compound sentence', 'coordinating conjunction', 'semicolon', 'colon',
  'dash', 'apostrophe', 'quotation marks', 'subject-verb agreement',
  'verb tense', 'pronoun', 'antecedent', 'misplaced modifier',
  'parallel structure', 'redundancy', 'wordiness', 'transition',
  'pronoun case', 'active voice', 'passive voice'
];

function highlightKeyTerms(text) {
  let result = text;

  KEY_TERMS.forEach(term => {
    const regex = new RegExp(`\\b${term}(s)?\\b`, 'gi');
    result = result.replace(regex, (match) => {
      return `<strong style="color: #2563eb; text-decoration: underline;">${match}</strong>`;
    });
  });

  return result;
}

function formatTipBox(title, content) {
  let html = '<div style="background-color: #eff6ff; border-left: 4px solid #2563eb; padding: 1rem 1.5rem; margin: 1.5rem 0; border-radius: 4px;">\n';
  html += `  <h4 style="color: #2563eb; font-weight: 700; margin: 0 0 0.75rem 0; font-size: 1.1rem;">💡 TIP: ${title}</h4>\n`;

  const paragraphs = content.split('\n\n').filter(p => p.trim());
  paragraphs.forEach(para => {
    if (para.trim()) {
      const formatted = highlightKeyTerms(para.trim());
      html += `  <p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0; color: #1e3a8a;">${formatted}</p>\n`;
    }
  });

  html += '</div>\n\n';
  return html;
}

function formatExampleBox(label, content, isCorrect) {
  const color = isCorrect ? '#065f46' : '#991b1b';
  const bgColor = isCorrect ? '#d1fae5' : '#fee2e2';
  const borderColor = isCorrect ? '#10b981' : '#ef4444';

  let html = `<div style="background-color: ${bgColor}; border-left: 4px solid ${borderColor}; padding: 1rem 1.5rem; margin: 1rem 0; border-radius: 4px;">\n`;
  html += `  <p style="font-weight: 700; color: ${color}; margin: 0 0 0.5rem 0;">${label}</p>\n`;
  html += `  <p style="font-size: 16px; line-height: 1.7; margin: 0; color: ${color};">${content}</p>\n`;
  html += '</div>\n\n';
  return html;
}

function formatPracticeQuestion(questionText, choices) {
  let html = '<div style="margin: 1.5rem 0; padding: 1rem; background-color: #f9fafb; border-radius: 4px;">\n';
  html += `  <p style="font-size: 16px; line-height: 1.7; margin: 0 0 0.75rem 0;">${questionText}</p>\n`;
  html += '  <p style="margin: 0.5rem 0;">\n';

  choices.forEach(choice => {
    html += `    <span style="font-family: 'Times New Roman', Times, Georgia, serif;">${choice}</span><br>\n`;
  });

  html += '  </p>\n';
  html += '</div>\n\n';
  return html;
}

function parseChapterContent(lines) {
  let html = '';
  let currentSection = null;
  let buffer = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    // Skip page markers and copyright
    if (line.startsWith('© PrepPros') ||
        line.match(/^-\d+-$/) ||
        line === 'PrepPros ACT English Course' ||
        line === '') {
      continue;
    }

    // Detect TIP boxes
    if (line.startsWith('TIP -') || line.startsWith('TIP:')) {
      const tipTitle = line.replace(/^TIP -/, '').replace(/^TIP:/, '').trim();
      const tipContent = [];

      i++;
      while (i < lines.length && !lines[i].trim().startsWith('TIP') &&
             !lines[i].trim().match(/^Chapter \d+:/) &&
             !lines[i].trim().match(/^[A-Z][a-z]+ and [A-Z][a-z]+$/)) {
        if (lines[i].trim() &&
            !lines[i].trim().startsWith('© PrepPros') &&
            !lines[i].trim().match(/^-\d+-$/)) {
          tipContent.push(lines[i].trim());
        }
        i++;
      }
      i--; // Step back one

      html += formatTipBox(tipTitle, tipContent.join(' '));
      continue;
    }

    // Detect section headers
    if (line.match(/^[A-Z][a-z]+ (and|vs\.|—|Rules|Usage|Practice)/) ||
        line.match(/^\d+ Types of/) ||
        line.match(/^[A-Z][a-z]+ [A-Z][a-z]+$/)) {
      html += `<h3 style="margin-top: 2rem; margin-bottom: 0.75rem; font-weight: 700;">${line}</h3>\n\n`;
      continue;
    }

    // Detect Correct/Incorrect examples
    if (line.startsWith('Correct:')) {
      const content = line.replace('Correct:', '').trim();
      html += formatExampleBox('✓ Correct', content, true);
      continue;
    }

    if (line.startsWith('Incorrect:')) {
      const content = line.replace('Incorrect:', '').trim();
      html += formatExampleBox('✗ Incorrect', content, false);
      continue;
    }

    // Regular paragraph
    if (line.length > 0) {
      const formatted = highlightKeyTerms(line);
      html += `<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">${formatted}</p>\n\n`;
    }
  }

  return html;
}

function addKeyTakeaways() {
  return `
<h3 style="color: #2e7d32; font-size: 1.4rem; font-weight: 700; margin: 3rem 0 1.5rem 0;">Key Takeaways</h3>

<ul style="list-style: none; padding: 0; margin: 0;">
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Master these grammar rules for ACT success
  </li>
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Practice identifying errors in context
  </li>
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Apply these strategies on test day
  </li>
</ul>
`;
}

async function processAllChapters() {
  console.log('📖 Loading PrepPros textbook...\n');

  const textbookPath = '/Users/cadenchiang/Desktop/actprep copy/actclass.org/packets/PrepPros ACT English Book (For New Enhanced ACT).txt';
  const content = fs.readFileSync(textbookPath, 'utf-8');
  const lines = content.split('\n');

  const results = [];

  for (const [chapterId, info] of Object.entries(CHAPTERS)) {
    console.log(`\n${'='.repeat(60)}`);
    console.log(`Processing: ${info.title}`);
    console.log(`Lesson Key: ${info.lessonKey}`);
    console.log(`Lines: ${info.start}-${info.end} (${info.end - info.start} lines)`);
    console.log('='.repeat(60));

    const chapterLines = lines.slice(info.start, info.end);
    const html = parseChapterContent(chapterLines);
    const htmlWithTakeaways = html + addKeyTakeaways();

    console.log(`✅ Generated ${htmlWithTakeaways.length} characters of HTML`);

    // Check for existing lesson
    const { data: lesson } = await supabase
      .from('lesson_metadata')
      .select('id, title')
      .eq('lesson_key', info.lessonKey)
      .single();

    if (lesson) {
      console.log(`✓ Found in database: "${lesson.title}"`);
      results.push({
        chapterId,
        lessonKey: info.lessonKey,
        lessonId: lesson.id,
        title: info.title,
        html: htmlWithTakeaways,
        status: 'ready_to_update'
      });
    } else {
      console.log(`⚠ NOT FOUND in database`);
      results.push({
        chapterId,
        lessonKey: info.lessonKey,
        title: info.title,
        html: htmlWithTakeaways,
        status: 'needs_creation'
      });
    }
  }

  return results;
}

const results = await processAllChapters();

// Save results
const outputDir = '/Users/cadenchiang/Desktop/act-prep-react/docs/preppros-lessons';
fs.mkdirSync(outputDir, { recursive: true });

console.log(`\n\n${'='.repeat(60)}`);
console.log('SAVING RESULTS');
console.log('='.repeat(60) + '\n');

results.forEach(result => {
  const filename = `${outputDir}/${result.lessonKey}.html`;
  fs.writeFileSync(filename, result.html);
  console.log(`✅ Saved: ${result.lessonKey}.html (${result.html.length} chars)`);
});

// Save summary
const summary = {
  totalLessons: results.length,
  readyToUpdate: results.filter(r => r.status === 'ready_to_update').length,
  needsCreation: results.filter(r => r.status === 'needs_creation').length,
  results: results.map(r => ({
    lessonKey: r.lessonKey,
    title: r.title,
    htmlLength: r.html.length,
    status: r.status,
    lessonId: r.lessonId
  })),
  timestamp: new Date().toISOString()
};

fs.writeFileSync(
  `${outputDir}/SUMMARY.json`,
  JSON.stringify(summary, null, 2)
);

console.log(`\n✅ Saved SUMMARY.json`);
console.log(`\n${'='.repeat(60)}`);
console.log('COMPLETE');
console.log('='.repeat(60));
console.log(`\n📊 Processed ${results.length} lessons`);
console.log(`   ✓ Ready to update: ${summary.readyToUpdate}`);
console.log(`   ⚠ Needs creation: ${summary.needsCreation}`);
console.log(`\n📁 Output saved to: ${outputDir}/\n`);
