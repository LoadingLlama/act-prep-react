#!/usr/bin/env node

/**
 * Extract and Format PrepPros English Lessons
 * Maps PrepPros textbook chapters to database lessons
 */

import fs from 'fs';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

console.log('📚 Analyzing PrepPros English Textbook...\n');

// Mapping of PrepPros chapters to existing database lessons
const CHAPTER_MAPPING = {
  // Introduction
  'Introduction to the English Test': 'getting-started',

  // Part 1: Grammar Questions
  'Chapter 1: Sentence Structure': 'sentence-structure',
  'Chapter 2: Commas — 4 Types of Commas': 'commas',
  'Chapter 3: Semicolons, Colons, Dashes, Apostrophes, and Quotation': 'punctuation',
  'Chapter 4: Verbs': 'verbs',
  'Chapter 5: Pronouns': 'pronouns',
  'Chapter 6: Misplaced Modifiers': 'modifiers',
  'Chapter 7: Parallel Structure': 'parallel-structure',
  'Chapter 8: Other Miscellaneous Topics': 'misc-topics',
  'Chapter 9: Grammar Review': 'grammar-review',

  // Part 2: Style Questions
  'Chapter 10: Redundancy, Wordiness, and Irrelevance': 'redundancy',
  'Chapter 11: Word Choice': 'word-choice',
  'Chapter 12: Transitions': 'transitions',

  // Part 3: Paragraph Modification Questions
  'Chapter 13: Which Choice': 'which-choice',
  'Chapter 14: Adding or Deleting Information': 'adding-deleting',
  'Chapter 15: Logical Placement': 'logical-placement'
};

async function analyzeTextbook() {
  const textbookPath = '/Users/cadenchiang/Desktop/actprep copy/actclass.org/packets/PrepPros ACT English Book (For New Enhanced ACT).txt';
  const content = fs.readFileSync(textbookPath, 'utf-8');

  const lines = content.split('\n');
  console.log(`📖 Total lines in textbook: ${lines.length}\n`);

  // Find chapter boundaries
  const chapters = [];
  let currentChapter = null;
  let startLine = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    // Detect chapter starts
    if (line.startsWith('Chapter ') && line.includes(':')) {
      if (currentChapter) {
        currentChapter.endLine = i - 1;
        currentChapter.lineCount = currentChapter.endLine - currentChapter.startLine;
        chapters.push(currentChapter);
      }

      currentChapter = {
        title: line,
        startLine: i,
        chapterNumber: line.match(/Chapter (\d+)/)?.[1] || 'intro'
      };
    } else if (line === 'Introduction to the English Test') {
      if (currentChapter) {
        currentChapter.endLine = i - 1;
        currentChapter.lineCount = currentChapter.endLine - currentChapter.startLine;
        chapters.push(currentChapter);
      }

      currentChapter = {
        title: line,
        startLine: i,
        chapterNumber: 'intro'
      };
    }
  }

  // Close last chapter
  if (currentChapter) {
    currentChapter.endLine = lines.length - 1;
    currentChapter.lineCount = currentChapter.endLine - currentChapter.startLine;
    chapters.push(currentChapter);
  }

  console.log(`📚 Found ${chapters.length} chapters:\n`);

  chapters.forEach((chapter, i) => {
    console.log(`${i + 1}. ${chapter.title}`);
    console.log(`   Lines ${chapter.startLine}-${chapter.endLine} (${chapter.lineCount} lines)\n`);
  });

  // Check against existing database lessons
  console.log('🔍 Checking database lessons...\n');

  const { data: dbLessons } = await supabase
    .from('lesson_metadata')
    .select('lesson_key, title')
    .eq('subject', 'english')
    .order('order_index', { ascending: true });

  console.log(`✅ Database has ${dbLessons.length} English lessons\n`);

  // Create mapping report
  const mappingReport = [];

  for (const [prepprosChapter, lessonKey] of Object.entries(CHAPTER_MAPPING)) {
    const dbLesson = dbLessons.find(l => l.lesson_key === lessonKey);
    const textbookChapter = chapters.find(c => c.title.includes(prepprosChapter.split(':')[0]));

    mappingReport.push({
      prepprosChapter,
      lessonKey,
      hasInDB: !!dbLesson,
      dbTitle: dbLesson?.title || 'NOT FOUND',
      hasInTextbook: !!textbookChapter,
      textbookLines: textbookChapter?.lineCount || 0
    });
  }

  console.log('📊 Mapping Report:\n');
  console.log('PrepPros Chapter → Database Lesson\n');

  mappingReport.forEach(m => {
    const dbIcon = m.hasInDB ? '✅' : '❌';
    const txtIcon = m.hasInTextbook ? '📖' : '❓';
    console.log(`${dbIcon} ${txtIcon} ${m.prepprosChapter}`);
    console.log(`   → [${m.lessonKey}] ${m.dbTitle}`);
    console.log(`   Textbook: ${m.textbookLines} lines\n`);
  });

  // Save analysis
  const analysis = {
    totalChapters: chapters.length,
    totalDBLessons: dbLessons.length,
    chapters,
    mappingReport,
    timestamp: new Date().toISOString()
  };

  fs.writeFileSync(
    '/Users/cadenchiang/Desktop/act-prep-react/docs/PREPPROS_ANALYSIS.json',
    JSON.stringify(analysis, null, 2)
  );

  console.log('✅ Saved analysis to docs/PREPPROS_ANALYSIS.json');

  return analysis;
}

analyzeTextbook().catch(err => console.error('❌ Error:', err.message));
