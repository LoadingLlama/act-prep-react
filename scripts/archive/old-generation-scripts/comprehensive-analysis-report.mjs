#!/usr/bin/env node

/**
 * Generate Comprehensive HTML Analysis Report of Practice Tests 1-7
 * Shows exact distributions, patterns, and cross-references for authentic test generation
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

async function generateComprehensiveReport() {
  console.log('📊 Generating Comprehensive Analysis Report...\n');

  // Fetch all data
  const { data: englishQuestions } = await supabase
    .from('practice_test_english_questions')
    .select('*')
    .in('test_number', [1, 2, 3, 4, 5, 6, 7]);

  const { data: englishPassages } = await supabase
    .from('practice_test_english_passages')
    .select('*')
    .in('test_number', [1, 2, 3, 4, 5, 6, 7]);

  const { data: mathQuestions } = await supabase
    .from('practice_test_math_questions')
    .select('*')
    .in('test_number', [1, 2, 3, 4, 5, 6, 7]);

  const { data: readingQuestions } = await supabase
    .from('practice_test_reading_questions')
    .select('*')
    .in('test_number', [1, 2, 3, 4, 5, 6, 7]);

  const { data: readingPassages } = await supabase
    .from('practice_test_reading_passages')
    .select('*')
    .in('test_number', [1, 2, 3, 4, 5, 6, 7]);

  const { data: scienceQuestions } = await supabase
    .from('practice_test_science_questions')
    .select('*')
    .in('test_number', [1, 2, 3, 4, 5, 6, 7]);

  const { data: sciencePassages } = await supabase
    .from('practice_test_science_passages')
    .select('*')
    .in('test_number', [1, 2, 3, 4, 5, 6, 7]);

  const { data: lessons } = await supabase
    .from('lessons')
    .select('*')
    .order('subject', { ascending: true })
    .order('lesson_key', { ascending: true });

  // Analyze distributions
  const analysis = {
    english: analyzeEnglish(englishQuestions, englishPassages),
    math: analyzeMath(mathQuestions),
    reading: analyzeReading(readingQuestions, readingPassages),
    science: analyzeScience(scienceQuestions, sciencePassages),
    lessons: lessons || []
  };

  // Generate HTML
  const html = generateHTML(analysis);

  // Write to file
  const outputPath = join(__dirname, '../../public/comprehensive-analysis.html');
  fs.writeFileSync(outputPath, html);

  console.log(`✅ Report generated: ${outputPath}`);
  console.log('🌐 Opening in browser...\n');

  // Open in browser
  const { exec } = await import('child_process');
  exec(`open http://localhost:3000/comprehensive-analysis.html`);
}

function analyzeEnglish(questions, passages) {
  const byTest = {};
  const answerDistribution = { A: 0, B: 0, C: 0, D: 0 };
  const questionTypes = {};
  const passageTypes = {};

  questions?.forEach(q => {
    if (!byTest[q.test_number]) byTest[q.test_number] = [];
    byTest[q.test_number].push(q);

    if (q.correct_answer) answerDistribution[q.correct_answer]++;
    if (q.question_type) {
      questionTypes[q.question_type] = (questionTypes[q.question_type] || 0) + 1;
    }
  });

  passages?.forEach(p => {
    passageTypes[p.passage_type] = (passageTypes[p.passage_type] || 0) + 1;
  });

  return {
    totalQuestions: questions?.length || 0,
    totalPassages: passages?.length || 0,
    byTest,
    answerDistribution,
    questionTypes,
    passageTypes,
    avgQuestionsPerTest: Math.round((questions?.length || 0) / 7)
  };
}

function analyzeMath(questions) {
  const answerDistribution = { A: 0, B: 0, C: 0, D: 0, E: 0, F: 0, G: 0, H: 0, J: 0, K: 0 };
  const questionTypes = {};
  const difficultyLevels = { easy: 0, medium: 0, hard: 0 };

  questions?.forEach(q => {
    if (q.correct_answer) answerDistribution[q.correct_answer]++;
    if (q.question_type) {
      questionTypes[q.question_type] = (questionTypes[q.question_type] || 0) + 1;
    }
    if (q.difficulty) {
      difficultyLevels[q.difficulty] = (difficultyLevels[q.difficulty] || 0) + 1;
    }
  });

  return {
    totalQuestions: questions?.length || 0,
    answerDistribution,
    questionTypes,
    difficultyLevels,
    avgQuestionsPerTest: Math.round((questions?.length || 0) / 7)
  };
}

function analyzeReading(questions, passages) {
  const answerDistribution = { F: 0, G: 0, H: 0, J: 0 };
  const questionTypes = {};
  const passageTypes = {};
  const withLineReferences = questions?.filter(q => q.line_reference).length || 0;

  questions?.forEach(q => {
    if (q.correct_answer) answerDistribution[q.correct_answer]++;
    if (q.question_type) {
      questionTypes[q.question_type] = (questionTypes[q.question_type] || 0) + 1;
    }
  });

  passages?.forEach(p => {
    passageTypes[p.passage_type] = (passageTypes[p.passage_type] || 0) + 1;
  });

  return {
    totalQuestions: questions?.length || 0,
    totalPassages: passages?.length || 0,
    answerDistribution,
    questionTypes,
    passageTypes,
    withLineReferences,
    lineReferencePercentage: ((withLineReferences / (questions?.length || 1)) * 100).toFixed(1)
  };
}

function analyzeScience(questions, passages) {
  const answerDistribution = { A: 0, B: 0, C: 0, D: 0, F: 0, G: 0, H: 0, J: 0 };
  const questionTypes = {};
  const passageTypes = {};
  const passageQuestionCounts = {};

  questions?.forEach(q => {
    if (q.correct_answer) answerDistribution[q.correct_answer]++;
    if (q.question_type) {
      questionTypes[q.question_type] = (questionTypes[q.question_type] || 0) + 1;
    }
  });

  passages?.forEach(p => {
    passageTypes[p.passage_type] = (passageTypes[p.passage_type] || 0) + 1;

    const questionsForPassage = questions?.filter(q => q.passage_id === p.id).length || 0;
    const key = `${p.passage_type}_${questionsForPassage}q`;
    passageQuestionCounts[key] = (passageQuestionCounts[key] || 0) + 1;
  });

  return {
    totalQuestions: questions?.length || 0,
    totalPassages: passages?.length || 0,
    answerDistribution,
    questionTypes,
    passageTypes,
    passageQuestionCounts,
    avgPassagesPerTest: ((passages?.length || 0) / 7).toFixed(1)
  };
}

function generateHTML(analysis) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ACT Practice Tests 1-7: Comprehensive Analysis</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            background: #0f172a;
            color: #e2e8f0;
            padding: 2rem;
            line-height: 1.6;
        }

        .container {
            max-width: 1400px;
            margin: 0 auto;
        }

        h1 {
            font-size: 2.5rem;
            margin-bottom: 0.5rem;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }

        .subtitle {
            color: #94a3b8;
            margin-bottom: 3rem;
            font-size: 1.1rem;
        }

        .section {
            background: #1e293b;
            border-radius: 12px;
            padding: 2rem;
            margin-bottom: 2rem;
            border: 1px solid #334155;
        }

        .section-header {
            display: flex;
            align-items: center;
            margin-bottom: 1.5rem;
            padding-bottom: 1rem;
            border-bottom: 2px solid #334155;
        }

        .section-icon {
            font-size: 2rem;
            margin-right: 1rem;
        }

        .section-title {
            font-size: 1.8rem;
            font-weight: 600;
        }

        .stats-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 1.5rem;
            margin-bottom: 2rem;
        }

        .stat-card {
            background: #0f172a;
            padding: 1.5rem;
            border-radius: 8px;
            border: 1px solid #334155;
        }

        .stat-label {
            color: #94a3b8;
            font-size: 0.9rem;
            margin-bottom: 0.5rem;
        }

        .stat-value {
            font-size: 2rem;
            font-weight: 700;
            color: #60a5fa;
        }

        .distribution-table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 1rem;
        }

        .distribution-table th {
            background: #0f172a;
            padding: 1rem;
            text-align: left;
            font-weight: 600;
            color: #60a5fa;
            border-bottom: 2px solid #334155;
        }

        .distribution-table td {
            padding: 0.75rem 1rem;
            border-bottom: 1px solid #334155;
        }

        .distribution-table tr:hover {
            background: #0f172a;
        }

        .bar-chart {
            display: flex;
            align-items: flex-end;
            height: 200px;
            gap: 0.5rem;
            margin: 1rem 0;
        }

        .bar {
            flex: 1;
            background: linear-gradient(180deg, #667eea 0%, #764ba2 100%);
            border-radius: 4px 4px 0 0;
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
            align-items: center;
            padding: 0.5rem;
            min-height: 30px;
            position: relative;
        }

        .bar-label {
            position: absolute;
            bottom: -25px;
            font-size: 0.9rem;
            color: #94a3b8;
        }

        .bar-value {
            color: white;
            font-weight: 600;
            font-size: 0.9rem;
        }

        .highlight {
            color: #60a5fa;
            font-weight: 600;
        }

        .badge {
            display: inline-block;
            padding: 0.25rem 0.75rem;
            border-radius: 12px;
            font-size: 0.85rem;
            font-weight: 500;
            margin: 0.25rem;
        }

        .badge-blue { background: #1e40af; color: #bfdbfe; }
        .badge-green { background: #166534; color: #bbf7d0; }
        .badge-purple { background: #6b21a8; color: #e9d5ff; }
        .badge-orange { background: #9a3412; color: #fed7aa; }

        .warning {
            background: #422006;
            border-left: 4px solid #f59e0b;
            padding: 1rem;
            border-radius: 4px;
            margin: 1rem 0;
            color: #fef3c7;
        }

        .success {
            background: #064e3b;
            border-left: 4px solid #10b981;
            padding: 1rem;
            border-radius: 4px;
            margin: 1rem 0;
            color: #d1fae5;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>📊 ACT Practice Tests 1-7: Comprehensive Analysis</h1>
        <p class="subtitle">Complete distribution analysis and authentic patterns for test generation</p>

        <!-- ENGLISH SECTION -->
        <div class="section">
            <div class="section-header">
                <span class="section-icon">📝</span>
                <h2 class="section-title">English Section Analysis</h2>
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
                    <div class="stat-label">Avg Questions/Test</div>
                    <div class="stat-value">${analysis.english.avgQuestionsPerTest}</div>
                </div>
                <div class="stat-card">
                    <div class="stat-label">Tests Analyzed</div>
                    <div class="stat-value">7</div>
                </div>
            </div>

            <h3 style="margin-top: 2rem; margin-bottom: 1rem;">Answer Distribution (A/B/C/D)</h3>
            <div class="bar-chart">
                ${Object.entries(analysis.english.answerDistribution).map(([key, val]) => {
                    const maxVal = Math.max(...Object.values(analysis.english.answerDistribution));
                    const height = (val / maxVal) * 100;
                    return `<div class="bar" style="height: ${height}%">
                        <span class="bar-value">${val}</span>
                        <span class="bar-label">${key}</span>
                    </div>`;
                }).join('')}
            </div>

            <h3 style="margin-top: 3rem; margin-bottom: 1rem;">Passage Type Distribution</h3>
            <table class="distribution-table">
                <thead>
                    <tr>
                        <th>Passage Type</th>
                        <th>Count</th>
                        <th>Per Test</th>
                    </tr>
                </thead>
                <tbody>
                    ${Object.entries(analysis.english.passageTypes).map(([type, count]) => `
                        <tr>
                            <td><span class="highlight">${type.replace('_', ' ').toUpperCase()}</span></td>
                            <td>${count}</td>
                            <td>${(count / 7).toFixed(1)}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>

            <div class="success" style="margin-top: 2rem;">
                <strong>✅ Target for Test Generation:</strong> 75 questions, 5 passages (Literary Narrative, Social Studies, Humanities, Natural Science, Personal Essay)
            </div>
        </div>

        <!-- MATH SECTION -->
        <div class="section">
            <div class="section-header">
                <span class="section-icon">🔢</span>
                <h2 class="section-title">Math Section Analysis</h2>
            </div>

            <div class="stats-grid">
                <div class="stat-card">
                    <div class="stat-label">Total Questions</div>
                    <div class="stat-value">${analysis.math.totalQuestions}</div>
                </div>
                <div class="stat-card">
                    <div class="stat-label">Avg Questions/Test</div>
                    <div class="stat-value">${analysis.math.avgQuestionsPerTest}</div>
                </div>
                <div class="stat-card">
                    <div class="stat-label">Answer Choices</div>
                    <div class="stat-value">5</div>
                </div>
                <div class="stat-card">
                    <div class="stat-label">Tests Analyzed</div>
                    <div class="stat-value">7</div>
                </div>
            </div>

            <h3 style="margin-top: 2rem; margin-bottom: 1rem;">Answer Distribution (A-E / F-K)</h3>
            <div class="bar-chart">
                ${Object.entries(analysis.math.answerDistribution).map(([key, val]) => {
                    const maxVal = Math.max(...Object.values(analysis.math.answerDistribution));
                    const height = val > 0 ? (val / maxVal) * 100 : 5;
                    return `<div class="bar" style="height: ${height}%">
                        <span class="bar-value">${val}</span>
                        <span class="bar-label">${key}</span>
                    </div>`;
                }).join('')}
            </div>

            <h3 style="margin-top: 3rem; margin-bottom: 1rem;">Question Type Distribution</h3>
            <table class="distribution-table">
                <thead>
                    <tr>
                        <th>Question Type</th>
                        <th>Count</th>
                        <th>Percentage</th>
                    </tr>
                </thead>
                <tbody>
                    ${Object.entries(analysis.math.questionTypes).slice(0, 15).map(([type, count]) => `
                        <tr>
                            <td><span class="highlight">${type}</span></td>
                            <td>${count}</td>
                            <td>${((count / analysis.math.totalQuestions) * 100).toFixed(1)}%</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>

            <div class="success" style="margin-top: 2rem;">
                <strong>✅ Target for Test Generation:</strong> 60 questions with 5 choices each (Pre-Algebra: 14, Elementary Algebra: 10, Intermediate Algebra: 9, Coordinate Geometry: 9, Plane Geometry: 14, Trigonometry: 4)
            </div>
        </div>

        <!-- READING SECTION -->
        <div class="section">
            <div class="section-header">
                <span class="section-icon">📖</span>
                <h2 class="section-title">Reading Section Analysis</h2>
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
                    <div class="stat-label">With Line References</div>
                    <div class="stat-value">${analysis.reading.withLineReferences}</div>
                </div>
                <div class="stat-card">
                    <div class="stat-label">Line Ref %</div>
                    <div class="stat-value">${analysis.reading.lineReferencePercentage}%</div>
                </div>
            </div>

            <h3 style="margin-top: 2rem; margin-bottom: 1rem;">Answer Distribution (F/G/H/J)</h3>
            <div class="bar-chart">
                ${Object.entries(analysis.reading.answerDistribution).map(([key, val]) => {
                    const maxVal = Math.max(...Object.values(analysis.reading.answerDistribution));
                    const height = (val / maxVal) * 100;
                    return `<div class="bar" style="height: ${height}%">
                        <span class="bar-value">${val}</span>
                        <span class="bar-label">${key}</span>
                    </div>`;
                }).join('')}
            </div>

            <h3 style="margin-top: 3rem; margin-bottom: 1rem;">Passage Type Distribution</h3>
            <table class="distribution-table">
                <thead>
                    <tr>
                        <th>Passage Type</th>
                        <th>Count</th>
                        <th>Per Test</th>
                    </tr>
                </thead>
                <tbody>
                    ${Object.entries(analysis.reading.passageTypes).map(([type, count]) => `
                        <tr>
                            <td><span class="highlight">${type.replace('_', ' ').toUpperCase()}</span></td>
                            <td>${count}</td>
                            <td>${(count / 7).toFixed(1)}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>

            <div class="success" style="margin-top: 2rem;">
                <strong>✅ Target for Test Generation:</strong> 40 questions, 4 passages (Literary Narrative, Social Science, Humanities, Natural Science), 30-40% with line references
            </div>
        </div>

        <!-- SCIENCE SECTION -->
        <div class="section">
            <div class="section-header">
                <span class="section-icon">🔬</span>
                <h2 class="section-title">Science Section Analysis</h2>
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
                    <div class="stat-label">Avg Passages/Test</div>
                    <div class="stat-value">${analysis.science.avgPassagesPerTest}</div>
                </div>
                <div class="stat-card">
                    <div class="stat-label">Tests Analyzed</div>
                    <div class="stat-value">7</div>
                </div>
            </div>

            <h3 style="margin-top: 2rem; margin-bottom: 1rem;">Passage Type Distribution</h3>
            <table class="distribution-table">
                <thead>
                    <tr>
                        <th>Passage Type</th>
                        <th>Total Count</th>
                        <th>Per Test</th>
                    </tr>
                </thead>
                <tbody>
                    ${Object.entries(analysis.science.passageTypes).map(([type, count]) => `
                        <tr>
                            <td><span class="highlight">${type.replace('_', ' ').toUpperCase()}</span></td>
                            <td>${count}</td>
                            <td>${(count / 7).toFixed(1)}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>

            <h3 style="margin-top: 2rem; margin-bottom: 1rem;">Passage-Question Distribution</h3>
            <table class="distribution-table">
                <thead>
                    <tr>
                        <th>Passage Type + Questions</th>
                        <th>Count</th>
                    </tr>
                </thead>
                <tbody>
                    ${Object.entries(analysis.science.passageQuestionCounts).map(([type, count]) => `
                        <tr>
                            <td><span class="highlight">${type}</span></td>
                            <td>${count}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>

            <div class="warning" style="margin-top: 2rem;">
                <strong>⚠️ IMPORTANT UPDATE:</strong> Science section should have <strong>6 passages total per test</strong>, not 6-7. Standard format: 3 Data Representation (5q each = 15q), 2 Research Summaries (6-7q each = 13-14q), 1 Conflicting Viewpoints (7q) = 40 questions total.
            </div>

            <div class="success">
                <strong>✅ Target for Test Generation:</strong> 40 questions across 6 passages: 3 Data Representation (5q each), 2 Research Summaries (6-7q each), 1 Conflicting Viewpoints (7q)
            </div>
        </div>

        <!-- LESSONS SECTION -->
        <div class="section">
            <div class="section-header">
                <span class="section-icon">📚</span>
                <h2 class="section-title">Lesson Mapping (${analysis.lessons.length} Total Lessons)</h2>
            </div>

            ${['English', 'Math', 'Reading', 'Science'].map(subject => {
                const subjectLessons = analysis.lessons.filter(l => l.subject === subject);
                return `
                    <h3 style="margin-top: 2rem; margin-bottom: 1rem;">${subject} Lessons (${subjectLessons.length})</h3>
                    <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
                        ${subjectLessons.map(lesson => `
                            <span class="badge badge-blue" title="${lesson.title}">
                                ${lesson.lesson_key}
                            </span>
                        `).join('')}
                    </div>
                `;
            }).join('')}
        </div>

        <div class="section" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white;">
            <h2 style="font-size: 1.5rem; margin-bottom: 1rem;">🎯 Generation Requirements Summary</h2>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem;">
                <div>
                    <h3>📝 English</h3>
                    <p>75 questions, 5 passages</p>
                    <p>~25% NO CHANGE (A)</p>
                    <p>Q75: Whole-essay (F/G/H/J)</p>
                </div>
                <div>
                    <h3>🔢 Math</h3>
                    <p>60 questions, 5 choices</p>
                    <p>Easy → Medium → Hard</p>
                    <p>Equal distribution A-E/F-K</p>
                </div>
                <div>
                    <h3>📖 Reading</h3>
                    <p>40 questions, 4 passages</p>
                    <p>30-40% line references</p>
                    <p>750-900 words/passage</p>
                </div>
                <div>
                    <h3>🔬 Science</h3>
                    <p>40 questions, 6 passages</p>
                    <p>3 Data Rep (5q each)</p>
                    <p>2 Research (6-7q each)</p>
                    <p>1 Conflicting (7q)</p>
                </div>
            </div>
        </div>
    </div>
</body>
</html>`;
}

generateComprehensiveReport().catch(console.error);
