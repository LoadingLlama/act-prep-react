#!/usr/bin/env node
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

console.log('🔬 DEEP ANALYSIS - FIGURES, LESSONS, WRONG ANSWERS\n');

// Load the complete data
const completeData = JSON.parse(fs.readFileSync('reports/complete-act-data.json', 'utf8'));

const { english, math, reading, science, lessons } = completeData;

let report = '';

// ============================================================================
// SECTION 1: FIGURE ANALYSIS
// ============================================================================
report += '='.repeat(100) + '\n';
report += 'SECTION 1: FIGURE & DIAGRAM ANALYSIS\n';
report += '='.repeat(100) + '\n\n';

// Math figures
const mathWithFigures = math.questions.filter(q => q.has_figure);
report += `MATH: ${mathWithFigures.length}/${math.questions.length} questions have figures (${(mathWithFigures.length/math.questions.length*100).toFixed(1)}%)\n\n`;

report += '--- MATH FIGURE EXAMPLES (First 10) ---\n\n';
mathWithFigures.slice(0, 10).forEach(q => {
  report += `Q${q.question_number} [Test ${q.test_number}] - ${q.question_type || 'N/A'}\n`;
  report += `Stem: ${q.question_stem.substring(0, 150)}...\n`;
  if (q.figure_data) {
    report += `Figure Data: ${JSON.stringify(q.figure_data, null, 2)}\n`;
  }
  report += '\n';
});

// Science figures
const sciWithFigures = science.questions.filter(q => q.has_figure);
report += `\nSCIENCE: ${sciWithFigures.length}/${science.questions.length} questions have figures (${(sciWithFigures.length/science.questions.length*100).toFixed(1)}%)\n\n`;

report += '--- SCIENCE FIGURE EXAMPLES (First 10) ---\n\n';
sciWithFigures.slice(0, 10).forEach(q => {
  report += `Q${q.question_number} [Test ${q.test_number}] - ${q.question_type || 'N/A'}\n`;
  report += `Stem: ${q.question_stem.substring(0, 150)}...\n`;
  if (q.figure_data) {
    report += `Figure Data: ${JSON.stringify(q.figure_data, null, 2)}\n`;
  }
  report += '\n';
});

// Science passage figures
const sciPassagesWithFigures = science.passages.filter(p => p.figures && p.figures.length > 0);
report += `\nSCIENCE PASSAGES: ${sciPassagesWithFigures.length}/${science.passages.length} passages contain figures\n\n`;

report += '--- SCIENCE PASSAGE FIGURES (First 5) ---\n\n';
sciPassagesWithFigures.slice(0, 5).forEach(p => {
  report += `Passage ${p.passage_number} [Test ${p.test_number}] - ${p.passage_type}\n`;
  report += `Title: ${p.title || 'N/A'}\n`;
  if (p.figures) {
    report += `Figures: ${JSON.stringify(p.figures, null, 2)}\n`;
  }
  report += '\n';
});

// ============================================================================
// SECTION 2: LESSON MAPPING
// ============================================================================
report += '\n\n' + '='.repeat(100) + '\n';
report += 'SECTION 2: LESSON MAPPING & CONTENT\n';
report += '='.repeat(100) + '\n\n';

report += `TOTAL LESSONS: ${lessons.length}\n\n`;

// Group by subject
const lessonsBySubject = {};
lessons.forEach(lesson => {
  if (!lessonsBySubject[lesson.subject]) {
    lessonsBySubject[lesson.subject] = [];
  }
  lessonsBySubject[lesson.subject].push(lesson);
});

Object.keys(lessonsBySubject).sort().forEach(subject => {
  report += `\n--- ${subject.toUpperCase()} LESSONS (${lessonsBySubject[subject].length}) ---\n\n`;
  lessonsBySubject[subject].forEach(lesson => {
    report += `ID: ${lesson.id} | Key: ${lesson.lesson_key}\n`;
    report += `Title: ${lesson.title}\n`;
    if (lesson.description) {
      report += `Description: ${lesson.description}\n`;
    }

    // Count questions using this lesson
    const engCount = english.questions.filter(q => q.lesson_id === lesson.id).length;
    const mathCount = math.questions.filter(q => q.lesson_id === lesson.id).length;
    const readCount = reading.questions.filter(q => q.lesson_id === lesson.id).length;
    const sciCount = science.questions.filter(q => q.lesson_id === lesson.id).length;
    const total = engCount + mathCount + readCount + sciCount;

    report += `Questions using this lesson: ${total} (Eng:${engCount} Math:${mathCount} Read:${readCount} Sci:${sciCount})\n`;
    report += '\n';
  });
});

// ============================================================================
// SECTION 3: WRONG ANSWER ANALYSIS
// ============================================================================
report += '\n\n' + '='.repeat(100) + '\n';
report += 'SECTION 3: WRONG ANSWER CONSTRUCTION PATTERNS\n';
report += '='.repeat(100) + '\n\n';

// Analyze English wrong answers
report += '--- ENGLISH WRONG ANSWER PATTERNS ---\n\n';

const engCorrectLengths = [];
const engWrongLengths = [];
let engNoChangeCorrect = 0;
let engNoChangeTotal = 0;

english.questions.forEach(q => {
  const correct = q.correct_answer;
  const correctText = q[`choice_${correct.toLowerCase()}`] || '';

  if (correctText) {
    engCorrectLengths.push(correctText.length);
  }

  ['A', 'B', 'C', 'D'].forEach(choice => {
    const text = q[`choice_${choice.toLowerCase()}`] || '';
    if (text.toUpperCase() === 'NO CHANGE') {
      engNoChangeTotal++;
      if (choice === correct) engNoChangeCorrect++;
    }
    if (choice !== correct && text) {
      engWrongLengths.push(text.length);
    }
  });
});

const avgEngCorrect = engCorrectLengths.reduce((a,b) => a+b, 0) / engCorrectLengths.length;
const avgEngWrong = engWrongLengths.reduce((a,b) => a+b, 0) / engWrongLengths.length;

report += `Average CORRECT answer length: ${avgEngCorrect.toFixed(1)} characters\n`;
report += `Average WRONG answer length: ${avgEngWrong.toFixed(1)} characters\n`;
report += `"NO CHANGE" appears ${engNoChangeTotal} times, correct ${engNoChangeCorrect} times (${(engNoChangeCorrect/engNoChangeTotal*100).toFixed(1)}%)\n\n`;

// Analyze Math wrong answers
report += '--- MATH WRONG ANSWER PATTERNS ---\n\n';

const mathCorrectLengths = [];
const mathWrongLengths = [];

math.questions.forEach(q => {
  const correct = q.correct_answer;
  const correctText = q[`choice_${correct.toLowerCase()}`] || '';

  if (correctText) {
    mathCorrectLengths.push(correctText.length);
  }

  ['A', 'B', 'C', 'D', 'E'].forEach(choice => {
    const text = q[`choice_${choice.toLowerCase()}`] || '';
    if (choice !== correct && text) {
      mathWrongLengths.push(text.length);
    }
  });
});

const avgMathCorrect = mathCorrectLengths.reduce((a,b) => a+b, 0) / mathCorrectLengths.length;
const avgMathWrong = mathWrongLengths.reduce((a,b) => a+b, 0) / mathWrongLengths.length;

report += `Average CORRECT answer length: ${avgMathCorrect.toFixed(1)} characters\n`;
report += `Average WRONG answer length: ${avgMathWrong.toFixed(1)} characters\n\n`;

// Show examples of wrong answer patterns
report += '--- ENGLISH WRONG ANSWER EXAMPLES ---\n\n';
english.questions.slice(0, 10).forEach(q => {
  report += `Q${q.question_number} [${q.question_type}] - CORRECT: ${q.correct_answer}\n`;
  report += `Stem: ${q.question_stem ? q.question_stem.substring(0, 100) : 'N/A'}...\n`;
  ['A', 'B', 'C', 'D'].forEach(choice => {
    const text = q[`choice_${choice.toLowerCase()}`] || '';
    const marker = choice === q.correct_answer ? '✓ CORRECT' : '✗ WRONG';
    report += `  ${choice}: ${text} ${marker}\n`;
  });
  if (q.notes) {
    report += `  Notes: ${q.notes}\n`;
  }
  report += '\n';
});

report += '\n--- MATH WRONG ANSWER EXAMPLES ---\n\n';
math.questions.slice(0, 10).forEach(q => {
  report += `Q${q.question_number} [${q.question_type || 'N/A'}] - CORRECT: ${q.correct_answer}\n`;
  report += `Stem: ${q.question_stem.substring(0, 100)}...\n`;
  ['A', 'B', 'C', 'D', 'E'].forEach(choice => {
    const text = q[`choice_${choice.toLowerCase()}`] || '';
    const marker = choice === q.correct_answer ? '✓ CORRECT' : '✗ WRONG';
    report += `  ${choice}: ${text} ${marker}\n`;
  });
  if (q.notes) {
    report += `  Notes: ${q.notes}\n`;
  }
  report += '\n';
});

// ============================================================================
// SECTION 4: QUESTION WORDING TEMPLATES
// ============================================================================
report += '\n\n' + '='.repeat(100) + '\n';
report += 'SECTION 4: QUESTION WORDING TEMPLATES\n';
report += '='.repeat(100) + '\n\n';

// Extract common reading question patterns
const readingStems = reading.questions.map(q => q.question_stem);
const readingPatterns = {
  'according_to': readingStems.filter(s => s.toLowerCase().includes('according to')).length,
  'which_following': readingStems.filter(s => s.toLowerCase().includes('which of the following')).length,
  'passage_suggests': readingStems.filter(s => s.toLowerCase().includes('suggests')).length,
  'best_describes': readingStems.filter(s => s.toLowerCase().includes('best describes')).length,
  'main_purpose': readingStems.filter(s => s.toLowerCase().includes('main purpose') || s.toLowerCase().includes('primary purpose')).length,
  'primarily_serves': readingStems.filter(s => s.toLowerCase().includes('primarily serves')).length,
};

report += '--- READING QUESTION WORDING PATTERNS ---\n\n';
Object.entries(readingPatterns).forEach(([pattern, count]) => {
  report += `"${pattern.replace(/_/g, ' ')}": ${count} questions (${(count/reading.questions.length*100).toFixed(1)}%)\n`;
});

report += '\n--- READING WORDING EXAMPLES ---\n\n';
reading.questions.slice(0, 20).forEach(q => {
  report += `Q${q.question_number}: ${q.question_stem}\n\n`;
});

// Extract common science question patterns
const scienceStems = science.questions.map(q => q.question_stem);
const sciencePatterns = {
  'according_to': scienceStems.filter(s => s.toLowerCase().includes('according to')).length,
  'based_on': scienceStems.filter(s => s.toLowerCase().includes('based on')).length,
  'which_following': scienceStems.filter(s => s.toLowerCase().includes('which of the following')).length,
  'table_shows': scienceStems.filter(s => s.toLowerCase().includes('table') || s.toLowerCase().includes('figure')).length,
};

report += '\n--- SCIENCE QUESTION WORDING PATTERNS ---\n\n';
Object.entries(sciencePatterns).forEach(([pattern, count]) => {
  report += `"${pattern.replace(/_/g, ' ')}": ${count} questions (${(count/science.questions.length*100).toFixed(1)}%)\n`;
});

report += '\n--- SCIENCE WORDING EXAMPLES ---\n\n';
science.questions.slice(0, 20).forEach(q => {
  report += `Q${q.question_number}: ${q.question_stem}\n\n`;
});

// ============================================================================
// SAVE REPORT
// ============================================================================
fs.writeFileSync('reports/comprehensive-analysis.txt', report);
console.log('✅ Generated: reports/comprehensive-analysis.txt');
console.log(`📊 Size: ${(fs.statSync('reports/comprehensive-analysis.txt').size / 1024).toFixed(1)} KB`);
console.log('\nAnalysis includes:');
console.log('  - Figure/diagram breakdown');
console.log('  - Complete lesson mapping');
console.log('  - Wrong answer construction patterns');
console.log('  - Question wording templates');
