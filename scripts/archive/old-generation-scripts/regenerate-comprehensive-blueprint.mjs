#!/usr/bin/env node

/**
 * COMPREHENSIVE ACT Blueprint Generator
 *
 * Deep molecular analysis with:
 * - Linguistic patterns (word freq, sentence structure, readability)
 * - Passage-level breakdown (every word, every passage)
 * - Question type categorization
 * - Answer pattern analysis
 * - Difficulty distribution
 * - Tabbed interface for easy navigation
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

console.log('🔬 Starting COMPREHENSIVE molecular analysis...\n');

/**
 * Fetch all data
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

  console.log(`📥 Fetched: ${englishQuestions?.length} English Q, ${mathQuestions?.length} Math Q, ${readingQuestions?.length} Reading Q, ${scienceQuestions?.length} Science Q\n`);

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
 * Linguistic analysis helper
 */
function analyzeLinguistics(text) {
  if (!text) return null;

  const words = text.split(/\s+/).filter(w => w.length > 0);
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
  const avgWordLength = words.reduce((sum, w) => sum + w.length, 0) / words.length || 0;
  const avgSentenceLength = words.length / sentences.length || 0;

  // Word frequency
  const wordFreq = {};
  words.forEach(w => {
    const clean = w.toLowerCase().replace(/[^a-z]/g, '');
    if (clean.length > 3) {
      wordFreq[clean] = (wordFreq[clean] || 0) + 1;
    }
  });

  const topWords = Object.entries(wordFreq)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 20);

  return {
    wordCount: words.length,
    sentenceCount: sentences.length,
    avgWordLength: avgWordLength.toFixed(1),
    avgSentenceLength: avgSentenceLength.toFixed(1),
    topWords
  };
}

/**
 * Comprehensive English analysis
 */
function analyzeEnglishComprehensive(questions, passages) {
  console.log('🔬 Deep English analysis...');

  const tests = new Set(questions.map(q => q.test_number));
  const answerDist = { A: 0, B: 0, C: 0, D: 0 };
  let noChangeCount = 0;

  // Question type categorization
  const questionTypes = {
    grammar: 0,
    punctuation: 0,
    style: 0,
    organization: 0,
    rhetoric: 0
  };

  questions.forEach(q => {
    if (q.correct_answer) answerDist[q.correct_answer]++;

    const qText = q.question_text?.toLowerCase() || '';
    const choices = Object.values(q.choices || {}).join(' ').toLowerCase();

    if (choices.includes('no change')) noChangeCount++;

    // Categorize
    if (qText.includes('best') || qText.includes('most effective')) questionTypes.rhetoric++;
    else if (qText.includes('placed') || qText.includes('order')) questionTypes.organization++;
    else if (qText.includes('style') || qText.includes('tone')) questionTypes.style++;
    else if (choices.match(/[,;:.!?]/)) questionTypes.punctuation++;
    else questionTypes.grammar++;
  });

  // Passage analysis
  const passageAnalysis = passages.map(p => {
    const ling = analyzeLinguistics(p.passage_text);
    return {
      testNumber: p.test_number,
      passageNumber: p.passage_number,
      type: p.passage_type,
      ...ling
    };
  });

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
    totalQuestions: questions.length,
    testsCount: tests.size,
    answerDist,
    noChangePercentage: ((noChangeCount / questions.length) * 100).toFixed(1),
    questionTypes,
    passageAnalysis,
    perTest
  };
}

/**
 * Comprehensive Math analysis
 */
function analyzeMathComprehensive(questions) {
  console.log('🔬 Deep Math analysis...');

  const tests = new Set(questions.map(q => q.test_number));
  const answerDist = { A: 0, B: 0, C: 0, D: 0, E: 0, F: 0, G: 0, H: 0, J: 0, K: 0 };

  const topicDist = {};
  const difficultyByRange = {
    '1-20': { easy: 0, medium: 0, hard: 0 },
    '21-40': { easy: 0, medium: 0, hard: 0 },
    '41-60': { easy: 0, medium: 0, hard: 0 }
  };

  questions.forEach(q => {
    if (q.correct_answer) answerDist[q.correct_answer]++;

    const qNum = q.question_number;
    const diff = q.difficulty_level || 'medium';

    if (qNum <= 20) difficultyByRange['1-20'][diff]++;
    else if (qNum <= 40) difficultyByRange['21-40'][diff]++;
    else if (qNum <= 60) difficultyByRange['41-60'][diff]++;

    // Topic categorization
    const topic = q.topic || q.category || 'General';
    topicDist[topic] = (topicDist[topic] || 0) + 1;
  });

  const perTest = {};
  questions.forEach(q => {
    if (!perTest[q.test_number]) {
      perTest[q.test_number] = { total: 0, answers: {} };
      Object.keys(answerDist).forEach(k => perTest[q.test_number].answers[k] = 0);
    }
    perTest[q.test_number].total++;
    if (q.correct_answer) perTest[q.test_number].answers[q.correct_answer]++;
  });

  return {
    totalQuestions: questions.length,
    testsCount: tests.size,
    answerDist,
    topicDist,
    difficultyByRange,
    perTest
  };
}

/**
 * Comprehensive Reading analysis
 */
function analyzeReadingComprehensive(questions, passages) {
  console.log('🔬 Deep Reading analysis...');

  const tests = new Set(questions.map(q => q.test_number));
  const answerDist = { A: 0, B: 0, C: 0, D: 0, F: 0, G: 0, H: 0, J: 0 };

  let lineRefCount = 0;
  const questionTypes = {
    detail: 0,
    inference: 0,
    mainIdea: 0,
    vocabulary: 0,
    purpose: 0
  };

  questions.forEach(q => {
    if (q.correct_answer) answerDist[q.correct_answer]++;

    const qText = q.question_text?.toLowerCase() || '';
    if (/line[s]?\s+\d+/.test(qText)) lineRefCount++;

    // Categorize
    if (qText.includes('infer') || qText.includes('suggest') || qText.includes('imply')) questionTypes.inference++;
    else if (qText.includes('main') || qText.includes('primary')) questionTypes.mainIdea++;
    else if (qText.includes('mean') || qText.includes('refers to')) questionTypes.vocabulary++;
    else if (qText.includes('purpose') || qText.includes('function')) questionTypes.purpose++;
    else questionTypes.detail++;
  });

  // Passage analysis
  const passageAnalysis = passages.map(p => {
    const ling = analyzeLinguistics(p.passage_text);
    return {
      testNumber: p.test_number,
      passageNumber: p.passage_number,
      type: p.passage_type,
      genre: p.genre,
      ...ling
    };
  });

  const perTest = {};
  questions.forEach(q => {
    if (!perTest[q.test_number]) {
      perTest[q.test_number] = { total: 0, answers: { A: 0, B: 0, C: 0, D: 0, F: 0, G: 0, H: 0, J: 0 } };
    }
    perTest[q.test_number].total++;
    if (q.correct_answer) perTest[q.test_number].answers[q.correct_answer]++;
  });

  return {
    totalQuestions: questions.length,
    testsCount: tests.size,
    answerDist,
    lineRefPercentage: ((lineRefCount / questions.length) * 100).toFixed(1),
    questionTypes,
    passageAnalysis,
    perTest
  };
}

/**
 * Comprehensive Science analysis
 */
function analyzeScienceComprehensive(questions, passages) {
  console.log('🔬 Deep Science analysis...');

  const tests = new Set(questions.map(q => q.test_number));
  const answerDist = { A: 0, B: 0, C: 0, D: 0, F: 0, G: 0, H: 0, J: 0 };

  const passageTypeDist = {};
  const questionsPerPassageType = {};

  passages.forEach(p => {
    const type = p.passage_type || 'Unknown';
    passageTypeDist[type] = (passageTypeDist[type] || 0) + 1;

    const passageQs = questions.filter(q =>
      q.test_number === p.test_number && q.passage_id === p.id
    );

    if (!questionsPerPassageType[type]) questionsPerPassageType[type] = [];
    questionsPerPassageType[type].push(passageQs.length);
  });

  questions.forEach(q => {
    if (q.correct_answer) answerDist[q.correct_answer]++;
  });

  const perTest = {};
  questions.forEach(q => {
    if (!perTest[q.test_number]) {
      perTest[q.test_number] = { total: 0, answers: { A: 0, B: 0, C: 0, D: 0, F: 0, G: 0, H: 0, J: 0 } };
    }
    perTest[q.test_number].total++;
    if (q.correct_answer) perTest[q.test_number].answers[q.correct_answer]++;
  });

  return {
    totalQuestions: questions.length,
    testsCount: tests.size,
    answerDist,
    passageTypeDist,
    questionsPerPassageType,
    perTest
  };
}

/**
 * Generate comprehensive HTML with tabs
 */
function generateHTML(data) {
  const { english, math, reading, science, lessonData, testNumbers } = data;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Comprehensive ACT Blueprint</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }

    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      line-height: 1.4;
      color: #111;
      background: #f5f5f5;
    }

    .header {
      background: #fff;
      padding: 20px 24px;
      border-bottom: 1px solid #e0e0e0;
      position: sticky;
      top: 0;
      z-index: 100;
    }

    h1 {
      font-size: 24px;
      font-weight: 700;
      margin-bottom: 4px;
    }

    .subtitle {
      font-size: 12px;
      color: #666;
    }

    .tabs {
      background: #fff;
      border-bottom: 1px solid #e0e0e0;
      display: flex;
      gap: 0;
      position: sticky;
      top: 73px;
      z-index: 99;
    }

    .tab {
      padding: 12px 20px;
      border: none;
      background: none;
      cursor: pointer;
      font-size: 13px;
      font-weight: 600;
      color: #666;
      border-bottom: 3px solid transparent;
      transition: all 0.2s;
    }

    .tab:hover {
      background: #fafafa;
      color: #111;
    }

    .tab.active {
      color: #111;
      border-bottom-color: #0066ff;
    }

    .tab-content {
      display: none;
      padding: 24px;
      max-width: 1400px;
      margin: 0 auto;
    }

    .tab-content.active {
      display: block;
    }

    .section {
      background: #fff;
      padding: 20px;
      margin-bottom: 16px;
      border-radius: 4px;
    }

    h2 {
      font-size: 16px;
      font-weight: 700;
      margin-bottom: 16px;
      padding-bottom: 8px;
      border-bottom: 2px solid #f0f0f0;
    }

    h3 {
      font-size: 12px;
      font-weight: 600;
      margin: 16px 0 8px 0;
      text-transform: uppercase;
      color: #666;
      letter-spacing: 0.5px;
    }

    .metrics {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
      gap: 12px;
      margin: 16px 0;
    }

    .metric {
      background: #fafafa;
      padding: 12px;
      border-radius: 4px;
      text-align: center;
    }

    .metric-label {
      font-size: 10px;
      text-transform: uppercase;
      color: #999;
      margin-bottom: 4px;
      letter-spacing: 0.5px;
    }

    .metric-value {
      font-size: 20px;
      font-weight: 700;
      color: #111;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      font-size: 13px;
      margin: 8px 0 16px 0;
    }

    th {
      text-align: left;
      font-weight: 600;
      padding: 8px 10px;
      background: #fafafa;
      font-size: 11px;
      text-transform: uppercase;
      color: #666;
      letter-spacing: 0.3px;
    }

    td {
      padding: 8px 10px;
      border-bottom: 1px solid #f5f5f5;
    }

    tr:hover {
      background: #fafafa;
    }

    .grid-2 {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
    }

    @media (max-width: 768px) {
      .grid-2 { grid-template-columns: 1fr; }
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>Comprehensive ACT Blueprint</h1>
    <div class="subtitle">Deep molecular analysis • Tests ${testNumbers.join(', ')} • For 1:1 accurate generation</div>
  </div>

  <div class="tabs">
    <button class="tab active" onclick="showTab('overview')">Overview</button>
    <button class="tab" onclick="showTab('english')">English</button>
    <button class="tab" onclick="showTab('math')">Math</button>
    <button class="tab" onclick="showTab('reading')">Reading</button>
    <button class="tab" onclick="showTab('science')">Science</button>
    <button class="tab" onclick="showTab('generation')">Generation</button>
  </div>

  <!-- OVERVIEW TAB -->
  <div id="overview" class="tab-content active">
    <div class="section">
      <h2>Test Structure Overview</h2>
      <div class="metrics">
        <div class="metric">
          <div class="metric-label">Tests Analyzed</div>
          <div class="metric-value">${testNumbers.length}</div>
        </div>
        <div class="metric">
          <div class="metric-label">Total Questions</div>
          <div class="metric-value">${english.totalQuestions + math.totalQuestions + reading.totalQuestions + science.totalQuestions}</div>
        </div>
        <div class="metric">
          <div class="metric-label">Passages</div>
          <div class="metric-value">${english.passageAnalysis.length + reading.passageAnalysis.length}</div>
        </div>
        <div class="metric">
          <div class="metric-label">Lessons</div>
          <div class="metric-value">${lessonData.total}</div>
        </div>
      </div>
    </div>

    <div class="grid-2">
      <div class="section">
        <h2>Section Breakdown</h2>
        <table>
          <thead>
            <tr>
              <th>Section</th>
              <th>Questions</th>
              <th>Per Test</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>English</td>
              <td>${english.totalQuestions}</td>
              <td>75</td>
            </tr>
            <tr>
              <td>Math</td>
              <td>${math.totalQuestions}</td>
              <td>60</td>
            </tr>
            <tr>
              <td>Reading</td>
              <td>${reading.totalQuestions}</td>
              <td>40</td>
            </tr>
            <tr>
              <td>Science</td>
              <td>${science.totalQuestions}</td>
              <td>40</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="section">
        <h2>Lesson Distribution</h2>
        <table>
          <thead>
            <tr>
              <th>Subject</th>
              <th>Lessons</th>
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
    </div>
  </div>

  <!-- ENGLISH TAB -->
  <div id="english" class="tab-content">
    <div class="section">
      <h2>English Section Analysis</h2>
      <div class="metrics">
        <div class="metric">
          <div class="metric-label">Total Questions</div>
          <div class="metric-value">${english.totalQuestions}</div>
        </div>
        <div class="metric">
          <div class="metric-label">NO CHANGE %</div>
          <div class="metric-value">${english.noChangePercentage}%</div>
        </div>
        <div class="metric">
          <div class="metric-label">Passages</div>
          <div class="metric-value">${english.passageAnalysis.length}</div>
        </div>
      </div>
    </div>

    <div class="grid-2">
      <div class="section">
        <h2>Answer Distribution</h2>
        <table>
          <thead>
            <tr>
              <th>Answer</th>
              <th>Count</th>
              <th>%</th>
            </tr>
          </thead>
          <tbody>
            ${Object.entries(english.answerDist).map(([ans, count]) => `
            <tr>
              <td>${ans}</td>
              <td>${count}</td>
              <td>${((count / english.totalQuestions) * 100).toFixed(1)}%</td>
            </tr>
            `).join('')}
          </tbody>
        </table>
      </div>

      <div class="section">
        <h2>Question Types</h2>
        <table>
          <thead>
            <tr>
              <th>Type</th>
              <th>Count</th>
              <th>%</th>
            </tr>
          </thead>
          <tbody>
            ${Object.entries(english.questionTypes).map(([type, count]) => `
            <tr>
              <td style="text-transform: capitalize;">${type}</td>
              <td>${count}</td>
              <td>${((count / english.totalQuestions) * 100).toFixed(1)}%</td>
            </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>

    <div class="section">
      <h2>Passage Analysis</h2>
      <table>
        <thead>
          <tr>
            <th>Test</th>
            <th>Passage</th>
            <th>Type</th>
            <th>Words</th>
            <th>Sentences</th>
            <th>Avg Word Len</th>
            <th>Avg Sent Len</th>
          </tr>
        </thead>
        <tbody>
          ${english.passageAnalysis.map(p => `
          <tr>
            <td>${p.testNumber}</td>
            <td>${p.passageNumber}</td>
            <td>${p.type || 'N/A'}</td>
            <td>${p.wordCount || 'N/A'}</td>
            <td>${p.sentenceCount || 'N/A'}</td>
            <td>${p.avgWordLength || 'N/A'}</td>
            <td>${p.avgSentenceLength || 'N/A'}</td>
          </tr>
          `).join('')}
        </tbody>
      </table>
    </div>

    <div class="section">
      <h2>Per-Test Breakdown</h2>
      <table>
        <thead>
          <tr>
            <th>Test</th>
            <th>Questions</th>
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
  </div>

  <!-- MATH TAB -->
  <div id="math" class="tab-content">
    <div class="section">
      <h2>Math Section Analysis</h2>
      <div class="metrics">
        <div class="metric">
          <div class="metric-label">Total Questions</div>
          <div class="metric-value">${math.totalQuestions}</div>
        </div>
        <div class="metric">
          <div class="metric-label">Topics</div>
          <div class="metric-value">${Object.keys(math.topicDist).length}</div>
        </div>
      </div>
    </div>

    <div class="grid-2">
      <div class="section">
        <h2>Answer Distribution</h2>
        <table>
          <thead>
            <tr>
              <th>Answer</th>
              <th>Count</th>
              <th>%</th>
            </tr>
          </thead>
          <tbody>
            ${Object.entries(math.answerDist).filter(([_, c]) => c > 0).map(([ans, count]) => `
            <tr>
              <td>${ans}</td>
              <td>${count}</td>
              <td>${((count / math.totalQuestions) * 100).toFixed(1)}%</td>
            </tr>
            `).join('')}
          </tbody>
        </table>
      </div>

      <div class="section">
        <h2>Difficulty Progression</h2>
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
      </div>
    </div>

    <div class="section">
      <h2>Topic Distribution</h2>
      <table>
        <thead>
          <tr>
            <th>Topic</th>
            <th>Count</th>
            <th>%</th>
          </tr>
        </thead>
        <tbody>
          ${Object.entries(math.topicDist).sort((a, b) => b[1] - a[1]).map(([topic, count]) => `
          <tr>
            <td>${topic}</td>
            <td>${count}</td>
            <td>${((count / math.totalQuestions) * 100).toFixed(1)}%</td>
          </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  </div>

  <!-- READING TAB -->
  <div id="reading" class="tab-content">
    <div class="section">
      <h2>Reading Section Analysis</h2>
      <div class="metrics">
        <div class="metric">
          <div class="metric-label">Total Questions</div>
          <div class="metric-value">${reading.totalQuestions}</div>
        </div>
        <div class="metric">
          <div class="metric-label">Line Ref %</div>
          <div class="metric-value">${reading.lineRefPercentage}%</div>
        </div>
        <div class="metric">
          <div class="metric-label">Passages</div>
          <div class="metric-value">${reading.passageAnalysis.length}</div>
        </div>
      </div>
    </div>

    <div class="grid-2">
      <div class="section">
        <h2>Answer Distribution</h2>
        <table>
          <thead>
            <tr>
              <th>Answer</th>
              <th>Count</th>
              <th>%</th>
            </tr>
          </thead>
          <tbody>
            ${Object.entries(reading.answerDist).filter(([_, c]) => c > 0).map(([ans, count]) => `
            <tr>
              <td>${ans}</td>
              <td>${count}</td>
              <td>${((count / reading.totalQuestions) * 100).toFixed(1)}%</td>
            </tr>
            `).join('')}
          </tbody>
        </table>
      </div>

      <div class="section">
        <h2>Question Types</h2>
        <table>
          <thead>
            <tr>
              <th>Type</th>
              <th>Count</th>
              <th>%</th>
            </tr>
          </thead>
          <tbody>
            ${Object.entries(reading.questionTypes).map(([type, count]) => `
            <tr>
              <td style="text-transform: capitalize;">${type}</td>
              <td>${count}</td>
              <td>${((count / reading.totalQuestions) * 100).toFixed(1)}%</td>
            </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>

    <div class="section">
      <h2>Passage Analysis</h2>
      <table>
        <thead>
          <tr>
            <th>Test</th>
            <th>Passage</th>
            <th>Type</th>
            <th>Genre</th>
            <th>Words</th>
            <th>Sentences</th>
            <th>Avg Word Len</th>
            <th>Avg Sent Len</th>
          </tr>
        </thead>
        <tbody>
          ${reading.passageAnalysis.map(p => `
          <tr>
            <td>${p.testNumber}</td>
            <td>${p.passageNumber}</td>
            <td>${p.type || 'N/A'}</td>
            <td>${p.genre || 'N/A'}</td>
            <td>${p.wordCount || 'N/A'}</td>
            <td>${p.sentenceCount || 'N/A'}</td>
            <td>${p.avgWordLength || 'N/A'}</td>
            <td>${p.avgSentenceLength || 'N/A'}</td>
          </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  </div>

  <!-- SCIENCE TAB -->
  <div id="science" class="tab-content">
    <div class="section">
      <h2>Science Section Analysis</h2>
      <div class="metrics">
        <div class="metric">
          <div class="metric-label">Total Questions</div>
          <div class="metric-value">${science.totalQuestions}</div>
        </div>
        <div class="metric">
          <div class="metric-label">Passages</div>
          <div class="metric-value">${Object.values(science.passageTypeDist).reduce((a, b) => a + b, 0)}</div>
        </div>
      </div>
    </div>

    <div class="grid-2">
      <div class="section">
        <h2>Answer Distribution</h2>
        <table>
          <thead>
            <tr>
              <th>Answer</th>
              <th>Count</th>
              <th>%</th>
            </tr>
          </thead>
          <tbody>
            ${Object.entries(science.answerDist).filter(([_, c]) => c > 0).map(([ans, count]) => `
            <tr>
              <td>${ans}</td>
              <td>${count}</td>
              <td>${((count / science.totalQuestions) * 100).toFixed(1)}%</td>
            </tr>
            `).join('')}
          </tbody>
        </table>
      </div>

      <div class="section">
        <h2>Passage Types</h2>
        <table>
          <thead>
            <tr>
              <th>Type</th>
              <th>Count</th>
              <th>Avg Q</th>
            </tr>
          </thead>
          <tbody>
            ${Object.entries(science.passageTypeDist).map(([type, count]) => {
              const qCounts = science.questionsPerPassageType[type] || [];
              const avg = qCounts.length > 0
                ? (qCounts.reduce((a, b) => a + b, 0) / qCounts.length).toFixed(1)
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
      </div>
    </div>
  </div>

  <!-- GENERATION TAB -->
  <div id="generation" class="tab-content">
    <div class="section">
      <h2>Test Generation Requirements</h2>
      <p style="margin-bottom: 16px; color: #666;">Use this data to generate 1:1 accurate ACT tests</p>

      <h3>Test Structure</h3>
      <table>
        <thead>
          <tr>
            <th>Section</th>
            <th>Questions</th>
            <th>Passages</th>
            <th>Key Requirements</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>English</td>
            <td>75</td>
            <td>5 (15q each)</td>
            <td>~${english.noChangePercentage}% "NO CHANGE"</td>
          </tr>
          <tr>
            <td>Math</td>
            <td>60</td>
            <td>-</td>
            <td>Progressive difficulty (easy → hard)</td>
          </tr>
          <tr>
            <td>Reading</td>
            <td>40</td>
            <td>4 (10q each)</td>
            <td>~${reading.lineRefPercentage}% with line references</td>
          </tr>
          <tr>
            <td>Science</td>
            <td>40</td>
            <td>6</td>
            <td>3 Data Rep + 2 Research + 1 Conflicting</td>
          </tr>
        </tbody>
      </table>

      <h3>Quality Guidelines</h3>
      <ul style="margin: 16px 0; padding-left: 20px; line-height: 1.8;">
        <li>Maintain balanced answer distributions (20-28% per choice)</li>
        <li>Avoid consecutive identical answers (max 2-3)</li>
        <li>Match difficulty progression patterns</li>
        <li>Ensure comprehensive lesson coverage</li>
        <li>Match linguistic patterns from passages</li>
        <li>Follow question type distributions</li>
      </ul>
    </div>
  </div>

  <script>
    function showTab(tabName) {
      // Hide all tabs
      document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));

      // Show selected tab
      document.getElementById(tabName).classList.add('active');
      event.target.classList.add('active');
    }
  </script>
</body>
</html>`;
}

/**
 * Analyze lessons
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
 * Main
 */
async function main() {
  try {
    const rawData = await fetchAllData();

    const allTestNumbers = [
      ...rawData.englishQuestions.map(q => q.test_number),
      ...rawData.mathQuestions.map(q => q.test_number),
      ...rawData.readingQuestions.map(q => q.test_number),
      ...rawData.scienceQuestions.map(q => q.test_number)
    ];
    const testNumbers = [...new Set(allTestNumbers)].sort((a, b) => a - b);

    const english = analyzeEnglishComprehensive(rawData.englishQuestions, rawData.englishPassages);
    const math = analyzeMathComprehensive(rawData.mathQuestions);
    const reading = analyzeReadingComprehensive(rawData.readingQuestions, rawData.readingPassages);
    const science = analyzeScienceComprehensive(rawData.scienceQuestions, rawData.sciencePassages);
    const lessonData = analyzeLessons(rawData.lessons);

    console.log('🎨 Generating comprehensive HTML...\n');
    const html = generateHTML({
      english,
      math,
      reading,
      science,
      lessonData,
      testNumbers
    });

    const outputPath = path.join(__dirname, '../../reports/comprehensive-act-blueprint.html');
    fs.writeFileSync(outputPath, html);

    console.log('✅ Comprehensive blueprint generated!');
    console.log(`📄 Output: ${outputPath}\n`);
    console.log('📊 Analysis Complete:');
    console.log(`   • ${testNumbers.length} tests analyzed`);
    console.log(`   • ${english.totalQuestions} English questions`);
    console.log(`   • ${math.totalQuestions} Math questions`);
    console.log(`   • ${reading.totalQuestions} Reading questions`);
    console.log(`   • ${science.totalQuestions} Science questions`);
    console.log(`   • ${lessonData.total} lessons mapped`);

  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

main();
