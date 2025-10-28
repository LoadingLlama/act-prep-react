#!/usr/bin/env node

/**
 * PREMIUM ACT BLUEPRINT GENERATOR
 * Ultra-modern UI with comprehensive molecular-level analysis
 */

import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '../../.env') });

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

console.log('🎨 GENERATING PREMIUM ACT BLUEPRINT - MODERN UI\n');

async function fetchAllData() {
  console.log('📊 Fetching comprehensive data...\n');

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
    supabase.from('practice_test_english_questions').select('*').in('test_number', [1,2,3,4,5,6,7]).order('test_number').order('question_number'),
    supabase.from('practice_test_english_passages').select('*').in('test_number', [1,2,3,4,5,6,7]).order('test_number').order('passage_number'),
    supabase.from('practice_test_math_questions').select('*').in('test_number', [1,2,3,4,5,6,7]).order('test_number').order('question_number'),
    supabase.from('practice_test_reading_questions').select('*').in('test_number', [1,2,3,4,5,6,7]).order('test_number').order('question_number'),
    supabase.from('practice_test_reading_passages').select('*').in('test_number', [1,2,3,4,5,6,7]).order('test_number').order('passage_number'),
    supabase.from('practice_test_science_questions').select('*').in('test_number', [1,2,3,4,5,6,7]).order('test_number').order('question_number'),
    supabase.from('practice_test_science_passages').select('*').in('test_number', [1,2,3,4,5,6,7]).order('test_number').order('passage_number'),
    supabase.from('lessons').select('*').order('subject').order('lesson_key')
  ]);

  return {
    english: { questions: englishQuestions || [], passages: englishPassages || [] },
    math: { questions: mathQuestions || [] },
    reading: { questions: readingQuestions || [], passages: readingPassages || [] },
    science: { questions: scienceQuestions || [], passages: sciencePassages || [] },
    lessons: lessons || []
  };
}

function analyzeData(data) {
  // Comprehensive analysis
  const english = analyzeEnglish(data.english.questions, data.english.passages);
  const math = analyzeMath(data.math.questions);
  const reading = analyzeReading(data.reading.questions, data.reading.passages);
  const science = analyzeScience(data.science.questions, data.science.passages);

  return { english, math, reading, science, lessons: data.lessons };
}

function analyzeEnglish(questions, passages) {
  const analysis = {
    totalQuestions: questions.length,
    totalPassages: passages.length,
    byTest: {},
    answerDist: { A: 0, B: 0, C: 0, D: 0 },
    passageTypes: {},
    questionTypes: {},
    passageLengths: [],
    noChangeCount: 0
  };

  for (let i = 1; i <= 7; i++) {
    const testQ = questions.filter(q => q.test_number === i);
    const testP = passages.filter(p => p.test_number === i);

    analysis.byTest[i] = { questions: testQ.length, passages: testP.length, answers: {} };

    testQ.forEach(q => {
      analysis.answerDist[q.correct_answer]++;
      analysis.byTest[i].answers[q.correct_answer] = (analysis.byTest[i].answers[q.correct_answer] || 0) + 1;
      if (q.correct_answer === 'A') analysis.noChangeCount++;
      if (q.question_type) analysis.questionTypes[q.question_type] = (analysis.questionTypes[q.question_type] || 0) + 1;
    });

    testP.forEach(p => {
      analysis.passageTypes[p.passage_type] = (analysis.passageTypes[p.passage_type] || 0) + 1;
      if (p.passage_text) analysis.passageLengths.push(p.passage_text.split(/\s+/).length);
    });
  }

  analysis.avgPassageLength = Math.round(analysis.passageLengths.reduce((a, b) => a + b, 0) / analysis.passageLengths.length);
  analysis.noChangePercent = ((analysis.noChangeCount / questions.length) * 100).toFixed(1);

  return analysis;
}

function analyzeMath(questions) {
  const analysis = {
    totalQuestions: questions.length,
    answerDist: {},
    questionTypes: {},
    difficulty: { easy: 0, medium: 0, hard: 0 },
    byRange: {
      '1-20': { easy: 0, medium: 0, hard: 0 },
      '21-40': { easy: 0, medium: 0, hard: 0 },
      '41-60': { easy: 0, medium: 0, hard: 0 }
    }
  };

  questions.forEach(q => {
    analysis.answerDist[q.correct_answer] = (analysis.answerDist[q.correct_answer] || 0) + 1;
    if (q.question_type) analysis.questionTypes[q.question_type] = (analysis.questionTypes[q.question_type] || 0) + 1;
    if (q.difficulty) {
      analysis.difficulty[q.difficulty]++;
      const range = q.question_number <= 20 ? '1-20' : q.question_number <= 40 ? '21-40' : '41-60';
      analysis.byRange[range][q.difficulty]++;
    }
  });

  return analysis;
}

function analyzeReading(questions, passages) {
  const analysis = {
    totalQuestions: questions.length,
    totalPassages: passages.length,
    answerDist: { F: 0, G: 0, H: 0, J: 0 },
    passageTypes: {},
    questionTypes: {},
    passageLengths: [],
    lineRefCount: 0
  };

  questions.forEach(q => {
    analysis.answerDist[q.correct_answer]++;
    if (q.question_type) analysis.questionTypes[q.question_type] = (analysis.questionTypes[q.question_type] || 0) + 1;
    if (q.line_reference) analysis.lineRefCount++;
  });

  passages.forEach(p => {
    analysis.passageTypes[p.passage_type] = (analysis.passageTypes[p.passage_type] || 0) + 1;
    if (p.passage_text) analysis.passageLengths.push(p.passage_text.split(/\s+/).length);
  });

  analysis.avgPassageLength = Math.round(analysis.passageLengths.reduce((a, b) => a + b, 0) / analysis.passageLengths.length);
  analysis.lineRefPercent = ((analysis.lineRefCount / questions.length) * 100).toFixed(1);

  return analysis;
}

function analyzeScience(questions, passages) {
  const analysis = {
    totalQuestions: questions.length,
    totalPassages: passages.length,
    answerDist: {},
    passageTypes: {},
    questionTypes: {},
    avgPerTest: (passages.length / 7).toFixed(1)
  };

  questions.forEach(q => {
    analysis.answerDist[q.correct_answer] = (analysis.answerDist[q.correct_answer] || 0) + 1;
    if (q.question_type) analysis.questionTypes[q.question_type] = (analysis.questionTypes[q.question_type] || 0) + 1;
  });

  passages.forEach(p => {
    analysis.passageTypes[p.passage_type] = (analysis.passageTypes[p.passage_type] || 0) + 1;
  });

  return analysis;
}

async function generatePremiumBlueprint() {
  const data = await fetchAllData();

  console.log('✅ Data fetched');
  console.log('🔬 Analyzing...\n');

  const analysis = analyzeData(data);
  const html = generatePremiumHTML(analysis);

  const outputPath = '/Users/cadenchiang/Desktop/act-prep-react/reports/molecular-analysis-2025.html';
  fs.writeFileSync(outputPath, html);

  console.log(`✅ Premium Blueprint Generated\n`);

  const { exec } = await import('child_process');
  exec(`open "${outputPath}"`);
}

function generatePremiumHTML(analysis) {
  const lessonsBySubject = {};
  analysis.lessons.forEach(l => {
    if (!lessonsBySubject[l.subject]) lessonsBySubject[l.subject] = [];
    lessonsBySubject[l.subject].push(l);
  });

  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ACT Blueprint • Molecular Analysis</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
    <style>
        :root {
            --bg: #fafafa;
            --surface: #ffffff;
            --text: #0a0a0a;
            --text-secondary: #666666;
            --border: #e5e5e5;
            --accent: #0066ff;
            --accent-light: #e6f0ff;
            --success: #00c853;
            --warning: #ff9100;
            --shadow: 0 1px 3px rgba(0,0,0,0.05);
            --shadow-lg: 0 10px 40px rgba(0,0,0,0.08);
        }

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
            background: var(--bg);
            color: var(--text);
            line-height: 1.6;
            font-size: 15px;
            -webkit-font-smoothing: antialiased;
        }

        .nav {
            position: sticky;
            top: 0;
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
            border-bottom: 1px solid var(--border);
            padding: 1.5rem 2rem;
            z-index: 1000;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .nav-title {
            font-size: 1.25rem;
            font-weight: 700;
            letter-spacing: -0.02em;
        }

        .nav-links {
            display: flex;
            gap: 2rem;
        }

        .nav-link {
            color: var(--text-secondary);
            text-decoration: none;
            font-weight: 500;
            font-size: 0.9375rem;
            transition: color 0.2s;
        }

        .nav-link:hover {
            color: var(--accent);
        }

        .container {
            max-width: 1400px;
            margin: 0 auto;
            padding: 4rem 2rem;
        }

        .hero {
            text-align: center;
            margin-bottom: 5rem;
        }

        .hero h1 {
            font-size: 4rem;
            font-weight: 800;
            letter-spacing: -0.03em;
            margin-bottom: 1rem;
            background: linear-gradient(135deg, #000 0%, #666 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }

        .hero p {
            font-size: 1.25rem;
            color: var(--text-secondary);
            font-weight: 400;
        }

        .section {
            background: var(--surface);
            border-radius: 16px;
            padding: 3rem;
            margin-bottom: 2rem;
            border: 1px solid var(--border);
            box-shadow: var(--shadow);
        }

        .section-header {
            margin-bottom: 2.5rem;
        }

        .section-title {
            font-size: 2rem;
            font-weight: 700;
            letter-spacing: -0.02em;
            margin-bottom: 0.5rem;
        }

        .section-subtitle {
            color: var(--text-secondary);
            font-size: 1rem;
        }

        .stats-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
            gap: 1.5rem;
            margin: 2rem 0;
        }

        .stat-card {
            background: linear-gradient(135deg, var(--accent-light) 0%, #f0f4ff 100%);
            padding: 2rem;
            border-radius: 12px;
            transition: transform 0.2s, box-shadow 0.2s;
        }

        .stat-card:hover {
            transform: translateY(-2px);
            box-shadow: var(--shadow-lg);
        }

        .stat-label {
            font-size: 0.8125rem;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            color: var(--text-secondary);
            margin-bottom: 0.75rem;
        }

        .stat-value {
            font-size: 2.5rem;
            font-weight: 800;
            letter-spacing: -0.02em;
            color: var(--accent);
        }

        .stat-unit {
            font-size: 1rem;
            font-weight: 600;
            color: var(--text-secondary);
            margin-left: 0.25rem;
        }

        .chart {
            margin: 2.5rem 0;
        }

        .chart-title {
            font-size: 1.125rem;
            font-weight: 600;
            margin-bottom: 1.5rem;
        }

        .bar-chart {
            display: flex;
            align-items: flex-end;
            height: 240px;
            gap: 1rem;
            padding: 2rem;
            background: var(--bg);
            border-radius: 12px;
        }

        .bar {
            flex: 1;
            background: linear-gradient(180deg, var(--accent) 0%, #0052cc 100%);
            border-radius: 8px 8px 0 0;
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
            align-items: center;
            padding: 1rem 0.5rem;
            position: relative;
            min-height: 40px;
            transition: all 0.3s;
        }

        .bar:hover {
            transform: scale(1.05);
            filter: brightness(1.1);
        }

        .bar-value {
            color: white;
            font-weight: 700;
            font-size: 1.125rem;
            margin-bottom: 0.5rem;
        }

        .bar-label {
            position: absolute;
            bottom: -30px;
            font-size: 0.875rem;
            font-weight: 600;
            color: var(--text);
        }

        table {
            width: 100%;
            border-collapse: separate;
            border-spacing: 0;
            margin: 2rem 0;
        }

        th {
            background: var(--bg);
            padding: 1rem;
            text-align: left;
            font-weight: 600;
            font-size: 0.8125rem;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            color: var(--text-secondary);
            border-bottom: 2px solid var(--border);
        }

        td {
            padding: 1rem;
            border-bottom: 1px solid var(--border);
        }

        tr:hover {
            background: var(--bg);
        }

        .highlight {
            font-weight: 600;
            color: var(--text);
        }

        .badge {
            display: inline-block;
            padding: 0.375rem 0.75rem;
            border-radius: 6px;
            font-size: 0.8125rem;
            font-weight: 600;
            background: var(--accent-light);
            color: var(--accent);
        }

        .generation-box {
            background: linear-gradient(135deg, #000 0%, #1a1a1a 100%);
            color: white;
            padding: 3rem;
            border-radius: 16px;
            margin: 3rem 0;
        }

        .generation-box h3 {
            font-size: 1.5rem;
            font-weight: 700;
            margin-bottom: 1.5rem;
        }

        .generation-item {
            margin: 1rem 0;
            padding-left: 2rem;
            position: relative;
            font-size: 1.0625rem;
            line-height: 1.8;
        }

        .generation-item:before {
            content: "→";
            position: absolute;
            left: 0;
            color: var(--accent);
            font-weight: 700;
        }

        .alert {
            padding: 1.5rem;
            border-radius: 12px;
            margin: 2rem 0;
            border-left: 4px solid;
        }

        .alert-success {
            background: #e8f5e9;
            border-color: var(--success);
            color: #1b5e20;
        }

        .alert-warning {
            background: #fff3e0;
            border-color: var(--warning);
            color: #e65100;
        }

        .tabs {
            display: flex;
            gap: 0.5rem;
            margin-bottom: 2rem;
            border-bottom: 2px solid var(--border);
        }

        .tab {
            padding: 1rem 1.5rem;
            font-weight: 600;
            cursor: pointer;
            border-bottom: 3px solid transparent;
            transition: all 0.2s;
            margin-bottom: -2px;
        }

        .tab:hover {
            color: var(--accent);
        }

        .tab.active {
            color: var(--accent);
            border-bottom-color: var(--accent);
        }

        .tab-content {
            display: none;
        }

        .tab-content.active {
            display: block;
        }

        @media (max-width: 768px) {
            .hero h1 {
                font-size: 2.5rem;
            }
            .stats-grid {
                grid-template-columns: 1fr;
            }
            .nav-links {
                display: none;
            }
        }

        /* Smooth scroll */
        html {
            scroll-behavior: smooth;
        }

        /* Selection */
        ::selection {
            background: var(--accent);
            color: white;
        }
    </style>
</head>
<body>
    <nav class="nav">
        <div class="nav-title">ACT Blueprint</div>
        <div class="nav-links">
            <a href="#english" class="nav-link">English</a>
            <a href="#math" class="nav-link">Math</a>
            <a href="#reading" class="nav-link">Reading</a>
            <a href="#science" class="nav-link">Science</a>
            <a href="#generation" class="nav-link">Generation</a>
        </div>
    </nav>

    <div class="container">
        <div class="hero">
            <h1>Molecular Analysis</h1>
            <p>Complete blueprint from Practice Tests 1-7 for authentic test generation</p>
        </div>

        <!-- ENGLISH SECTION -->
        <div class="section" id="english">
            <div class="section-header">
                <h2 class="section-title">📝 English Section</h2>
                <p class="section-subtitle">Complete analysis of ${analysis.english.totalQuestions} questions across 7 tests</p>
            </div>

            <div class="stats-grid">
                <div class="stat-card">
                    <div class="stat-label">Total Questions</div>
                    <div class="stat-value">${analysis.english.totalQuestions}</div>
                </div>
                <div class="stat-card">
                    <div class="stat-label">Total Passages</div>
                    <div class="stat-value">${analysis.english.totalPassages}</div>
                </div>
                <div class="stat-card">
                    <div class="stat-label">Avg Passage Length</div>
                    <div class="stat-value">${analysis.english.avgPassageLength}<span class="stat-unit">words</span></div>
                </div>
                <div class="stat-card">
                    <div class="stat-label">NO CHANGE Rate</div>
                    <div class="stat-value">${analysis.english.noChangePercent}<span class="stat-unit">%</span></div>
                </div>
            </div>

            <div class="chart">
                <h3 class="chart-title">Answer Distribution</h3>
                <div class="bar-chart">
                    ${Object.entries(analysis.english.answerDist).map(([key, val]) => {
                        const max = Math.max(...Object.values(analysis.english.answerDist));
                        const height = (val / max) * 100;
                        return `<div class="bar" style="height: ${height}%">
                            <span class="bar-value">${val}</span>
                            <span class="bar-label">${key}</span>
                        </div>`;
                    }).join('')}
                </div>
            </div>

            <div class="generation-box">
                <h3>🎯 Generation Requirements</h3>
                <div class="generation-item">75 questions per test, 5 passages</div>
                <div class="generation-item">${analysis.english.avgPassageLength} words average (300-450 range)</div>
                <div class="generation-item">${analysis.english.noChangePercent}% NO CHANGE (A) = ~${Math.round(75 * parseFloat(analysis.english.noChangePercent) / 100)} questions</div>
                <div class="generation-item">Question 75 must be whole-essay (F/G/H/J format)</div>
            </div>
        </div>

        <!-- MATH SECTION -->
        <div class="section" id="math">
            <div class="section-header">
                <h2 class="section-title">🔢 Math Section</h2>
                <p class="section-subtitle">${analysis.math.totalQuestions} questions with progressive difficulty</p>
            </div>

            <div class="stats-grid">
                <div class="stat-card">
                    <div class="stat-label">Total Questions</div>
                    <div class="stat-value">${analysis.math.totalQuestions}</div>
                </div>
                <div class="stat-card">
                    <div class="stat-label">Easy Level</div>
                    <div class="stat-value">${analysis.math.difficulty.easy}</div>
                </div>
                <div class="stat-card">
                    <div class="stat-label">Medium Level</div>
                    <div class="stat-value">${analysis.math.difficulty.medium}</div>
                </div>
                <div class="stat-card">
                    <div class="stat-label">Hard Level</div>
                    <div class="stat-value">${analysis.math.difficulty.hard}</div>
                </div>
            </div>

            <div class="chart">
                <h3 class="chart-title">Difficulty Distribution by Range</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Range</th>
                            <th>Easy</th>
                            <th>Medium</th>
                            <th>Hard</th>
                            <th>Pattern</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${Object.entries(analysis.math.byRange).map(([range, dist]) => `
                            <tr>
                                <td><span class="highlight">Q${range}</span></td>
                                <td>${dist.easy}</td>
                                <td>${dist.medium}</td>
                                <td>${dist.hard}</td>
                                <td><span class="badge">${dist.easy > dist.hard ? 'Easy Focus' : 'Hard Focus'}</span></td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>

            <div class="generation-box">
                <h3>🎯 Generation Requirements</h3>
                <div class="generation-item">60 questions, 5 choices each (A-E/F-K)</div>
                <div class="generation-item">Progressive difficulty: Q1-20 easy, Q21-40 medium, Q41-60 hard</div>
                <div class="generation-item">Content: Pre-Alg (14), Elem Alg (10), Int Alg (9), Coord Geo (9), Plane Geo (14), Trig (4)</div>
            </div>
        </div>

        <!-- READING SECTION -->
        <div class="section" id="reading">
            <div class="section-header">
                <h2 class="section-title">📖 Reading Section</h2>
                <p class="section-subtitle">${analysis.reading.totalQuestions} questions across ${analysis.reading.totalPassages} passages</p>
            </div>

            <div class="stats-grid">
                <div class="stat-card">
                    <div class="stat-label">Total Questions</div>
                    <div class="stat-value">${analysis.reading.totalQuestions}</div>
                </div>
                <div class="stat-card">
                    <div class="stat-label">Total Passages</div>
                    <div class="stat-value">${analysis.reading.totalPassages}</div>
                </div>
                <div class="stat-card">
                    <div class="stat-label">Avg Passage Length</div>
                    <div class="stat-value">${analysis.reading.avgPassageLength}<span class="stat-unit">words</span></div>
                </div>
                <div class="stat-card">
                    <div class="stat-label">Line Reference Rate</div>
                    <div class="stat-value">${analysis.reading.lineRefPercent}<span class="stat-unit">%</span></div>
                </div>
            </div>

            <div class="chart">
                <h3 class="chart-title">Answer Distribution</h3>
                <div class="bar-chart">
                    ${Object.entries(analysis.reading.answerDist).map(([key, val]) => {
                        const max = Math.max(...Object.values(analysis.reading.answerDist));
                        const height = (val / max) * 100;
                        return `<div class="bar" style="height: ${height}%">
                            <span class="bar-value">${val}</span>
                            <span class="bar-label">${key}</span>
                        </div>`;
                    }).join('')}
                </div>
            </div>

            <div class="generation-box">
                <h3>🎯 Generation Requirements</h3>
                <div class="generation-item">40 questions, 4 passages (10 each)</div>
                <div class="generation-item">${analysis.reading.avgPassageLength} words average (750-900 range)</div>
                <div class="generation-item">${analysis.reading.lineRefPercent}% line references = 12-16 questions</div>
                <div class="generation-item">Attribution required for all passages</div>
            </div>
        </div>

        <!-- SCIENCE SECTION -->
        <div class="section" id="science">
            <div class="section-header">
                <h2 class="section-title">🔬 Science Section</h2>
                <p class="section-subtitle">${analysis.science.totalQuestions} questions across ${analysis.science.totalPassages} passages (all tests)</p>
            </div>

            <div class="stats-grid">
                <div class="stat-card">
                    <div class="stat-label">Total Questions</div>
                    <div class="stat-value">${analysis.science.totalQuestions}</div>
                </div>
                <div class="stat-card">
                    <div class="stat-label">Total Passages</div>
                    <div class="stat-value">${analysis.science.totalPassages}</div>
                </div>
                <div class="stat-card">
                    <div class="stat-label">Avg Per Test</div>
                    <div class="stat-value">${analysis.science.avgPerTest}</div>
                </div>
                <div class="stat-card">
                    <div class="stat-label">Passage Types</div>
                    <div class="stat-value">${Object.keys(analysis.science.passageTypes).length}</div>
                </div>
            </div>

            <div class="alert alert-warning">
                <strong>⚠️ Corrected Structure:</strong> Science section should have exactly <strong>6 passages</strong> per test: 3 Data Rep (5q each), 2 Research (6-7q each), 1 Conflicting (11-13q) = 40 questions total.
            </div>

            <div class="generation-box">
                <h3>🎯 Generation Requirements</h3>
                <div class="generation-item">40 questions, exactly 6 passages per test</div>
                <div class="generation-item">3 Data Representation (5q each = 15 total)</div>
                <div class="generation-item">2 Research Summaries (6-7q each = 12-14 total)</div>
                <div class="generation-item">1 Conflicting Viewpoints (11-13q, flexible to reach 40)</div>
            </div>
        </div>

        <!-- GENERATION GUIDE -->
        <div class="section" id="generation">
            <div class="section-header">
                <h2 class="section-title">🚀 Complete Generation Guide</h2>
                <p class="section-subtitle">Everything you need to create 1:1 authentic ACT tests</p>
            </div>

            <div class="alert alert-success">
                <strong>✅ Total Lessons Available:</strong> ${analysis.lessons.length} lessons mapped across all subjects for precise question tagging
            </div>

            <div class="stats-grid">
                ${Object.entries(lessonsBySubject).map(([subject, lessons]) => `
                    <div class="stat-card">
                        <div class="stat-label">${subject} Lessons</div>
                        <div class="stat-value">${lessons.length}</div>
                    </div>
                `).join('')}
            </div>

            <div style="margin-top: 3rem; padding: 3rem; background: linear-gradient(135deg, var(--accent) 0%, #0052cc 100%); border-radius: 16px; color: white;">
                <h3 style="font-size: 2rem; font-weight: 700; margin-bottom: 2rem;">Quick Reference</h3>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 2rem;">
                    <div>
                        <div style="font-weight: 700; font-size: 1.125rem; margin-bottom: 0.75rem;">📝 English</div>
                        <div style="opacity: 0.95;">75 questions • 5 passages<br>${analysis.english.noChangePercent}% NO CHANGE<br>Q75: F/G/H/J format</div>
                    </div>
                    <div>
                        <div style="font-weight: 700; font-size: 1.125rem; margin-bottom: 0.75rem;">🔢 Math</div>
                        <div style="opacity: 0.95;">60 questions • 5 choices<br>Easy → Medium → Hard<br>Equal distribution</div>
                    </div>
                    <div>
                        <div style="font-weight: 700; font-size: 1.125rem; margin-bottom: 0.75rem;">📖 Reading</div>
                        <div style="opacity: 0.95;">40 questions • 4 passages<br>${analysis.reading.lineRefPercent}% line refs<br>${analysis.reading.avgPassageLength}w average</div>
                    </div>
                    <div>
                        <div style="font-weight: 700; font-size: 1.125rem; margin-bottom: 0.75rem;">🔬 Science</div>
                        <div style="opacity: 0.95;">40 questions • 6 passages<br>3 Data + 2 Research<br>+ 1 Conflicting</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</body>
</html>`;
}

generatePremiumBlueprint().catch(console.error);
