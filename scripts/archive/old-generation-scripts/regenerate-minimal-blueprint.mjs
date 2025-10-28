#!/usr/bin/env node

/**
 * Ultra-Minimalist ACT Blueprint Analysis Generator
 *
 * Generates a clean, minimal HTML report with comprehensive ACT test data
 * from Practice Tests 1-7 for 1:1 accurate test generation.
 *
 * Design: Maximum clarity, minimal styling, intuitive hierarchy
 */

import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase credentials');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

console.log('🔍 Fetching comprehensive data from all ACT practice tests...\n');

/**
 * Fetch all data from database
 */
async function fetchAllData() {
  const [
    { data: englishQuestions },
    { data: englishPassages },
    { data: mathQuestions },
    { data: readingQuestions },
    { data: readingPassages },
    { data: scienceQuestions },
    { data: sciencePassages },
    { data: lessons }
  ] = await Promise.all([
    supabase.from('act_english_questions').select('*'),
    supabase.from('act_english_passages').select('*'),
    supabase.from('act_math_questions').select('*'),
    supabase.from('act_reading_questions').select('*'),
    supabase.from('act_reading_passages').select('*'),
    supabase.from('act_science_questions').select('*'),
    supabase.from('act_science_passages').select('*'),
    supabase.from('lessons').select('*')
  ]);

  console.log(`📥 Fetched: ${englishQuestions?.length || 0} English Q, ${mathQuestions?.length || 0} Math Q, ${readingQuestions?.length || 0} Reading Q, ${scienceQuestions?.length || 0} Science Q`);

  return {
    englishQuestions: englishQuestions || [],
    englishPassages: englishPassages || [],
    mathQuestions: mathQuestions || [],
    readingQuestions: readingQuestions || [],
    readingPassages: readingPassages || [],
    scienceQuestions: scienceQuestions || [],
    sciencePassages: sciencePassages || [],
    lessons: lessons || []
  };
}

/**
 * Analyze English section data
 */
function analyzeEnglishMolecular(questions, passages) {
  const totalQuestions = questions.length;
  const testsCount = new Set(questions.map(q => q.test_number)).size;

  // Answer distribution
  const answerCounts = { A: 0, B: 0, C: 0, D: 0 };
  let noChangeCount = 0;

  questions.forEach(q => {
    if (q.correct_answer) answerCounts[q.correct_answer]++;
    if (q.choices?.D?.toLowerCase().includes('no change')) noChangeCount++;
  });

  // Passage analysis
  const passageTypes = {};
  const passageWordCounts = [];

  passages.forEach(p => {
    const type = p.passage_type || 'Unknown';
    passageTypes[type] = (passageTypes[type] || 0) + 1;
    if (p.passage_text) {
      const wordCount = p.passage_text.split(/\s+/).length;
      passageWordCounts.push(wordCount);
    }
  });

  const avgWords = passageWordCounts.length > 0
    ? Math.round(passageWordCounts.reduce((a,b) => a+b, 0) / passageWordCounts.length)
    : 0;

  // Per-test breakdown
  const perTest = {};
  questions.forEach(q => {
    if (!perTest[q.test_number]) {
      perTest[q.test_number] = { total: 0, answers: { A: 0, B: 0, C: 0, D: 0 } };
    }
    perTest[q.test_number].total++;
    if (q.correct_answer) perTest[q.test_number].answers[q.correct_answer]++;
  });

  return {
    totalQuestions,
    testsCount,
    questionsPerTest: Math.round(totalQuestions / testsCount),
    answerDistribution: answerCounts,
    noChangePercentage: ((noChangeCount / totalQuestions) * 100).toFixed(1),
    passageTypes,
    avgPassageWords: avgWords,
    perTest
  };
}

/**
 * Analyze Math section data
 */
function analyzeMathMolecular(questions) {
  const totalQuestions = questions.length;
  const testsCount = new Set(questions.map(q => q.test_number)).size;

  // Answer distribution
  const answerCounts = { A: 0, B: 0, C: 0, D: 0, E: 0, F: 0, G: 0, H: 0, J: 0, K: 0 };

  questions.forEach(q => {
    if (q.correct_answer) answerCounts[q.correct_answer]++;
  });

  // Difficulty progression by question range
  const ranges = {
    '1-20': { easy: 0, medium: 0, hard: 0 },
    '21-40': { easy: 0, medium: 0, hard: 0 },
    '41-60': { easy: 0, medium: 0, hard: 0 }
  };

  questions.forEach(q => {
    const qNum = q.question_number;
    const diff = q.difficulty_level || 'medium';

    if (qNum <= 20) ranges['1-20'][diff]++;
    else if (qNum <= 40) ranges['21-40'][diff]++;
    else if (qNum <= 60) ranges['41-60'][diff]++;
  });

  // Per-test breakdown
  const perTest = {};
  questions.forEach(q => {
    if (!perTest[q.test_number]) {
      perTest[q.test_number] = { total: 0, answers: { ...answerCounts } };
      Object.keys(perTest[q.test_number].answers).forEach(k => perTest[q.test_number].answers[k] = 0);
    }
    perTest[q.test_number].total++;
    if (q.correct_answer) perTest[q.test_number].answers[q.correct_answer]++;
  });

  return {
    totalQuestions,
    testsCount,
    questionsPerTest: Math.round(totalQuestions / testsCount),
    answerDistribution: answerCounts,
    difficultyByRange: ranges,
    perTest
  };
}

/**
 * Analyze Reading section data
 */
function analyzeReadingMolecular(questions, passages) {
  const totalQuestions = questions.length;
  const testsCount = new Set(questions.map(q => q.test_number)).size;

  // Answer distribution
  const answerCounts = { A: 0, B: 0, C: 0, D: 0, F: 0, G: 0, H: 0, J: 0 };

  questions.forEach(q => {
    if (q.correct_answer) answerCounts[q.correct_answer]++;
  });

  // Line reference analysis
  let lineRefCount = 0;
  questions.forEach(q => {
    if (q.question_text && /line[s]?\s+\d+/i.test(q.question_text)) {
      lineRefCount++;
    }
  });

  // Passage types and lengths
  const passageTypes = {};
  const passageLengths = [];

  passages.forEach(p => {
    const type = p.passage_type || 'Unknown';
    passageTypes[type] = (passageTypes[type] || 0) + 1;

    if (p.passage_text) {
      const wordCount = p.passage_text.split(/\s+/).length;
      passageLengths.push(wordCount);
    }
  });

  const avgPassageWords = passageLengths.length > 0
    ? Math.round(passageLengths.reduce((a,b) => a+b, 0) / passageLengths.length)
    : 0;

  // Per-test breakdown
  const perTest = {};
  questions.forEach(q => {
    if (!perTest[q.test_number]) {
      perTest[q.test_number] = { total: 0, answers: { A: 0, B: 0, C: 0, D: 0, F: 0, G: 0, H: 0, J: 0 } };
    }
    perTest[q.test_number].total++;
    if (q.correct_answer) perTest[q.test_number].answers[q.correct_answer]++;
  });

  return {
    totalQuestions,
    testsCount,
    questionsPerTest: Math.round(totalQuestions / testsCount),
    answerDistribution: answerCounts,
    lineReferencePercentage: ((lineRefCount / totalQuestions) * 100).toFixed(1),
    passageTypes,
    avgPassageWords,
    perTest
  };
}

/**
 * Analyze Science section data
 */
function analyzeScienceMolecular(questions, passages) {
  const totalQuestions = questions.length;
  const testsCount = new Set(questions.map(q => q.test_number)).size;

  // Answer distribution
  const answerCounts = { A: 0, B: 0, C: 0, D: 0, F: 0, G: 0, H: 0, J: 0 };

  questions.forEach(q => {
    if (q.correct_answer) answerCounts[q.correct_answer]++;
  });

  // Passage type analysis
  const passageTypes = {};
  const questionsPerPassageType = {};

  passages.forEach(p => {
    const type = p.passage_type || 'Unknown';
    passageTypes[type] = (passageTypes[type] || 0) + 1;

    // Count questions for this passage
    const passageQuestions = questions.filter(q =>
      q.test_number === p.test_number && q.passage_id === p.id
    );

    if (!questionsPerPassageType[type]) {
      questionsPerPassageType[type] = [];
    }
    questionsPerPassageType[type].push(passageQuestions.length);
  });

  // Per-test breakdown
  const perTest = {};
  questions.forEach(q => {
    if (!perTest[q.test_number]) {
      perTest[q.test_number] = { total: 0, answers: { A: 0, B: 0, C: 0, D: 0, F: 0, G: 0, H: 0, J: 0 } };
    }
    perTest[q.test_number].total++;
    if (q.correct_answer) perTest[q.test_number].answers[q.correct_answer]++;
  });

  return {
    totalQuestions,
    testsCount,
    questionsPerTest: Math.round(totalQuestions / testsCount),
    answerDistribution: answerCounts,
    passageTypes,
    questionsPerPassageType,
    perTest
  };
}

/**
 * Analyze lesson distribution
 */
function analyzeLessons(lessons) {
  const bySubject = {};

  lessons.forEach(l => {
    const subject = l.subject || 'Unknown';
    bySubject[subject] = (bySubject[subject] || 0) + 1;
  });

  return {
    total: lessons.length,
    bySubject
  };
}

/**
 * Generate minimal HTML report
 */
function generateMinimalHTML(data) {
  const {
    english,
    math,
    reading,
    science,
    lessonData,
    testNumbers
  } = data;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ACT Blueprint Analysis</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }

    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      line-height: 1.5;
      color: #111;
      background: #fafafa;
      padding: 24px;
      max-width: 1100px;
      margin: 0 auto;
    }

    h1 {
      font-size: 28px;
      font-weight: 700;
      margin-bottom: 4px;
    }

    .subtitle {
      font-size: 13px;
      color: #666;
      margin-bottom: 24px;
    }

    h2 {
      font-size: 14px;
      font-weight: 700;
      margin-top: 32px;
      margin-bottom: 12px;
      text-transform: uppercase;
      letter-spacing: 1px;
      padding: 8px 12px;
      color: #fff;
      display: inline-block;
    }

    h2.english { background: #7c3aed; }
    h2.math { background: #059669; }
    h2.reading { background: #dc2626; }
    h2.science { background: #2563eb; }
    h2.lessons { background: #ea580c; }
    h2.generation { background: #6366f1; }

    h3 {
      font-size: 12px;
      font-weight: 600;
      margin-top: 20px;
      margin-bottom: 8px;
      text-transform: uppercase;
      color: #666;
      letter-spacing: 0.5px;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      margin: 8px 0 20px 0;
      font-size: 13px;
      background: #fff;
    }

    th {
      text-align: left;
      font-weight: 600;
      padding: 6px 10px;
      background: #f5f5f5;
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 0.3px;
      color: #666;
    }

    td {
      padding: 6px 10px;
      border-bottom: 1px solid #f0f0f0;
    }

    tr:last-child td { border-bottom: none; }
    tr:hover { background: #fafafa; }

    .metrics {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
      gap: 8px;
      margin: 8px 0 20px 0;
    }

    .metric {
      background: #fff;
      padding: 12px;
      text-align: center;
    }

    .metric-label {
      font-size: 10px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      color: #999;
      margin-bottom: 4px;
    }

    .metric-value {
      font-size: 20px;
      font-weight: 700;
      color: #111;
    }

    .note {
      background: #fff;
      padding: 12px;
      margin: 12px 0;
      border-left: 3px solid #111;
      font-size: 13px;
    }

    .note strong {
      display: block;
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 6px;
      color: #666;
    }

    ul {
      margin: 6px 0 6px 18px;
      font-size: 13px;
    }

    li { margin: 3px 0; }

    .section {
      background: #fff;
      padding: 20px;
      margin-bottom: 16px;
    }

    @media print {
      body { padding: 12px; background: #fff; }
      .section { page-break-inside: avoid; }
    }
  </style>
</head>
<body>
  <h1>ACT Blueprint Analysis</h1>
  <div class="subtitle">Molecular analysis of Practice Test${testNumbers.length > 1 ? 's' : ''} ${testNumbers.join(', ')} for 1:1 accurate test generation</div>

  <div class="note">
    <strong>Purpose</strong>
    This blueprint provides comprehensive data distributions from ${testNumbers.length} official ACT practice test${testNumbers.length > 1 ? 's' : ''} to generate new tests that match the exact structure, difficulty, and format of real ACT exams.
  </div>

  <!-- ENGLISH SECTION -->
  <div class="section">
    <h2 class="english">English</h2>

    <div class="metrics">
      <div class="metric">
        <div class="metric-label">Questions</div>
        <div class="metric-value">75</div>
      </div>
      <div class="metric">
        <div class="metric-label">Passages</div>
        <div class="metric-value">5</div>
      </div>
      <div class="metric">
        <div class="metric-label">Q/Passage</div>
        <div class="metric-value">15</div>
      </div>
      <div class="metric">
        <div class="metric-label">NO CHANGE %</div>
        <div class="metric-value">${english.noChangePercentage}%</div>
      </div>
      <div class="metric">
        <div class="metric-label">Avg Words</div>
        <div class="metric-value">${english.avgPassageWords}</div>
      </div>
    </div>

    <h3>Answer Distribution</h3>
    <table>
      <thead>
        <tr>
          <th>Answer</th>
          <th>Count</th>
          <th>%</th>
        </tr>
      </thead>
      <tbody>
        ${Object.entries(english.answerDistribution).map(([answer, count]) => `
        <tr>
          <td>${answer}</td>
          <td>${count}</td>
          <td>${((count / english.totalQuestions) * 100).toFixed(1)}%</td>
        </tr>
        `).join('')}
      </tbody>
    </table>

    <h3>Per-Test Breakdown</h3>
    <table>
      <thead>
        <tr>
          <th>Test</th>
          <th>Q</th>
          <th>A</th>
          <th>B</th>
          <th>C</th>
          <th>D</th>
        </tr>
      </thead>
      <tbody>
        ${Object.entries(english.perTest).sort(([a], [b]) => a - b).map(([test, data]) => `
        <tr>
          <td>Test ${test}</td>
          <td>${data.total}</td>
          <td>${data.answers.A}</td>
          <td>${data.answers.B}</td>
          <td>${data.answers.C}</td>
          <td>${data.answers.D}</td>
        </tr>
        `).join('')}
      </tbody>
    </table>
  </div>

  <!-- MATH SECTION -->
  <div class="section">
    <h2 class="math">Math</h2>

    <div class="metrics">
      <div class="metric">
        <div class="metric-label">Questions</div>
        <div class="metric-value">60</div>
      </div>
      <div class="metric">
        <div class="metric-label">Choices</div>
        <div class="metric-value">5</div>
      </div>
      <div class="metric">
        <div class="metric-label">Format</div>
        <div class="metric-value" style="font-size: 14px;">A-E/F-K</div>
      </div>
    </div>

    <h3>Answer Distribution</h3>
    <table>
      <thead>
        <tr>
          <th>Answer</th>
          <th>Count</th>
          <th>%</th>
        </tr>
      </thead>
      <tbody>
        ${Object.entries(math.answerDistribution)
          .filter(([_, count]) => count > 0)
          .map(([answer, count]) => `
        <tr>
          <td>${answer}</td>
          <td>${count}</td>
          <td>${((count / math.totalQuestions) * 100).toFixed(1)}%</td>
        </tr>
        `).join('')}
      </tbody>
    </table>

    <h3>Difficulty Progression</h3>
    <table>
      <thead>
        <tr>
          <th>Range</th>
          <th>Easy</th>
          <th>Medium</th>
          <th>Hard</th>
        </tr>
      </thead>
      <tbody>
        ${Object.entries(math.difficultyByRange).map(([range, counts]) => `
        <tr>
          <td>Q ${range}</td>
          <td>${counts.easy}</td>
          <td>${counts.medium}</td>
          <td>${counts.hard}</td>
        </tr>
        `).join('')}
      </tbody>
    </table>

    <h3>Per-Test Breakdown</h3>
    <table>
      <thead>
        <tr>
          <th>Test</th>
          <th>Q</th>
          <th>A/F</th>
          <th>B/G</th>
          <th>C/H</th>
          <th>D/J</th>
          <th>E/K</th>
        </tr>
      </thead>
      <tbody>
        ${Object.entries(math.perTest).sort(([a], [b]) => a - b).map(([test, data]) => `
        <tr>
          <td>Test ${test}</td>
          <td>${data.total}</td>
          <td>${data.answers.A + data.answers.F}</td>
          <td>${data.answers.B + data.answers.G}</td>
          <td>${data.answers.C + data.answers.H}</td>
          <td>${data.answers.D + data.answers.J}</td>
          <td>${data.answers.E + data.answers.K}</td>
        </tr>
        `).join('')}
      </tbody>
    </table>
  </div>

  <!-- READING SECTION -->
  <div class="section">
    <h2 class="reading">Reading</h2>

    <div class="metrics">
      <div class="metric">
        <div class="metric-label">Questions</div>
        <div class="metric-value">40</div>
      </div>
      <div class="metric">
        <div class="metric-label">Passages</div>
        <div class="metric-value">4</div>
      </div>
      <div class="metric">
        <div class="metric-label">Q/Passage</div>
        <div class="metric-value">10</div>
      </div>
      <div class="metric">
        <div class="metric-label">Line Ref %</div>
        <div class="metric-value">${reading.lineReferencePercentage}%</div>
      </div>
      <div class="metric">
        <div class="metric-label">Avg Words</div>
        <div class="metric-value">${reading.avgPassageWords}</div>
      </div>
    </div>

    <h3>Answer Distribution</h3>
    <table>
      <thead>
        <tr>
          <th>Answer</th>
          <th>Count</th>
          <th>%</th>
        </tr>
      </thead>
      <tbody>
        ${Object.entries(reading.answerDistribution)
          .filter(([_, count]) => count > 0)
          .map(([answer, count]) => `
        <tr>
          <td>${answer}</td>
          <td>${count}</td>
          <td>${((count / reading.totalQuestions) * 100).toFixed(1)}%</td>
        </tr>
        `).join('')}
      </tbody>
    </table>

    <h3>Per-Test Breakdown</h3>
    <table>
      <thead>
        <tr>
          <th>Test</th>
          <th>Q</th>
          <th>A/F</th>
          <th>B/G</th>
          <th>C/H</th>
          <th>D/J</th>
        </tr>
      </thead>
      <tbody>
        ${Object.entries(reading.perTest).sort(([a], [b]) => a - b).map(([test, data]) => `
        <tr>
          <td>Test ${test}</td>
          <td>${data.total}</td>
          <td>${data.answers.A + data.answers.F}</td>
          <td>${data.answers.B + data.answers.G}</td>
          <td>${data.answers.C + data.answers.H}</td>
          <td>${data.answers.D + data.answers.J}</td>
        </tr>
        `).join('')}
      </tbody>
    </table>
  </div>

  <!-- SCIENCE SECTION -->
  <div class="section">
    <h2 class="science">Science</h2>

    <div class="metrics">
      <div class="metric">
        <div class="metric-label">Questions</div>
        <div class="metric-value">40</div>
      </div>
      <div class="metric">
        <div class="metric-label">Passages</div>
        <div class="metric-value">6</div>
      </div>
    </div>

    <div class="note">
      <strong>Required Distribution</strong>
      <ul>
        <li>3 Data Representation (5q each = 15 total)</li>
        <li>2 Research Summaries (6-7q each = 12-14 total)</li>
        <li>1 Conflicting Viewpoints (11-13q)</li>
      </ul>
    </div>

    <h3>Answer Distribution</h3>
    <table>
      <thead>
        <tr>
          <th>Answer</th>
          <th>Count</th>
          <th>%</th>
        </tr>
      </thead>
      <tbody>
        ${Object.entries(science.answerDistribution)
          .filter(([_, count]) => count > 0)
          .map(([answer, count]) => `
        <tr>
          <td>${answer}</td>
          <td>${count}</td>
          <td>${((count / science.totalQuestions) * 100).toFixed(1)}%</td>
        </tr>
        `).join('')}
      </tbody>
    </table>

    <h3>Passage Types</h3>
    <table>
      <thead>
        <tr>
          <th>Type</th>
          <th>Count</th>
          <th>Avg Q</th>
        </tr>
      </thead>
      <tbody>
        ${Object.entries(science.passageTypes).map(([type, count]) => {
          const qCounts = science.questionsPerPassageType[type] || [];
          const avg = qCounts.length > 0
            ? (qCounts.reduce((a,b) => a+b, 0) / qCounts.length).toFixed(1)
            : 'N/A';
          return `
        <tr>
          <td>${type}</td>
          <td>${count}</td>
          <td>${avg}</td>
        </tr>
        `;
        }).join('')}
      </tbody>
    </table>

    <h3>Per-Test Breakdown</h3>
    <table>
      <thead>
        <tr>
          <th>Test</th>
          <th>Q</th>
          <th>A/F</th>
          <th>B/G</th>
          <th>C/H</th>
          <th>D/J</th>
        </tr>
      </thead>
      <tbody>
        ${Object.entries(science.perTest).sort(([a], [b]) => a - b).map(([test, data]) => `
        <tr>
          <td>Test ${test}</td>
          <td>${data.total}</td>
          <td>${data.answers.A + data.answers.F}</td>
          <td>${data.answers.B + data.answers.G}</td>
          <td>${data.answers.C + data.answers.H}</td>
          <td>${data.answers.D + data.answers.J}</td>
        </tr>
        `).join('')}
      </tbody>
    </table>
  </div>

  <!-- LESSON MAPPING -->
  <div class="section">
    <h2 class="lessons">Lessons</h2>

    <div class="metrics">
      <div class="metric">
        <div class="metric-label">Total</div>
        <div class="metric-value">${lessonData.total}</div>
      </div>
    </div>

    <table>
      <thead>
        <tr>
          <th>Subject</th>
          <th>Count</th>
        </tr>
      </thead>
      <tbody>
        ${Object.entries(lessonData.bySubject).map(([subject, count]) => `
        <tr>
          <td>${subject}</td>
          <td>${count}</td>
        </tr>
        `).join('')}
      </tbody>
    </table>
  </div>

  <!-- GENERATION REQUIREMENTS -->
  <div class="section">
    <h2 class="generation">Generation Requirements</h2>

    <div class="note">
      <strong>Test Structure</strong>
      <ul>
        <li>English: 75q, 5 passages (15q each), ~25% "NO CHANGE"</li>
        <li>Math: 60q, progressive difficulty (easy → medium → hard)</li>
        <li>Reading: 40q, 4 passages (10q each), include line refs</li>
        <li>Science: 40q, 6 passages (3 Data + 2 Research + 1 Conflicting)</li>
      </ul>
    </div>

    <div class="note">
      <strong>Quality Guidelines</strong>
      <ul>
        <li>Balanced answer distribution (20-28% per choice)</li>
        <li>Max 2-3 consecutive identical answers</li>
        <li>Match difficulty progression from official tests</li>
        <li>Ensure lesson coverage across all topics</li>
      </ul>
    </div>
  </div>

  <div style="margin-top: 32px; padding-top: 16px; border-top: 1px solid #e0e0e0; font-size: 11px; color: #999; text-align: center;">
    Generated from Practice Test${testNumbers.length > 1 ? 's' : ''} ${testNumbers.join(', ')} | ${new Date().toLocaleDateString()}
  </div>

</body>
</html>`;
}

/**
 * Main execution
 */
async function main() {
  try {
    const rawData = await fetchAllData();

    // Get unique test numbers
    const allTestNumbers = [
      ...rawData.englishQuestions.map(q => q.test_number),
      ...rawData.mathQuestions.map(q => q.test_number),
      ...rawData.readingQuestions.map(q => q.test_number),
      ...rawData.scienceQuestions.map(q => q.test_number)
    ];
    const testNumbers = [...new Set(allTestNumbers)].sort((a, b) => a - b);

    console.log('📊 Analyzing English section...');
    const english = analyzeEnglishMolecular(rawData.englishQuestions, rawData.englishPassages);

    console.log('📊 Analyzing Math section...');
    const math = analyzeMathMolecular(rawData.mathQuestions);

    console.log('📊 Analyzing Reading section...');
    const reading = analyzeReadingMolecular(rawData.readingQuestions, rawData.readingPassages);

    console.log('📊 Analyzing Science section...');
    const science = analyzeScienceMolecular(rawData.scienceQuestions, rawData.sciencePassages);

    console.log('📊 Analyzing Lesson distribution...');
    const lessonData = analyzeLessons(rawData.lessons);

    console.log('🎨 Generating minimal HTML report...\n');
    const html = generateMinimalHTML({
      english,
      math,
      reading,
      science,
      lessonData,
      testNumbers
    });

    const outputPath = path.join(__dirname, '../../reports/molecular-analysis-2025.html');
    fs.writeFileSync(outputPath, html);

    console.log('✅ Report generated successfully!');
    console.log(`📄 Output: ${outputPath}\n`);

    console.log('📈 Summary:');
    console.log(`   English: ${english.totalQuestions} questions from ${english.testsCount} tests`);
    console.log(`   Math: ${math.totalQuestions} questions from ${math.testsCount} tests`);
    console.log(`   Reading: ${reading.totalQuestions} questions from ${reading.testsCount} tests`);
    console.log(`   Science: ${science.totalQuestions} questions from ${science.testsCount} tests`);
    console.log(`   Lessons: ${lessonData.total} total (${Object.values(lessonData.bySubject).join(', ')} by subject)`);

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

main();
