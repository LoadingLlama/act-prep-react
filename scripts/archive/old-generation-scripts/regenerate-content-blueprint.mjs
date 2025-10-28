#!/usr/bin/env node

/**
 * CONTENT-FOCUSED ACT Blueprint
 *
 * Deep analysis of:
 * - Content patterns and themes
 * - Difficulty construction methods
 * - Linguistic complexity patterns
 * - Question type distributions and how they're built
 * - Passage structure and replication guides
 * - Exact formulas for recreating ACT tests
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

console.log('🔬 Deep Content & Difficulty Analysis...\n');

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

  console.log(`📥 ${englishQuestions?.length} English, ${mathQuestions?.length} Math, ${readingQuestions?.length} Reading, ${scienceQuestions?.length} Science\n`);

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
 * Analyze linguistic complexity
 */
function analyzeLinguisticComplexity(text) {
  if (!text) return null;

  const words = text.split(/\s+/).filter(w => w.length > 0);
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);

  // Calculate Flesch Reading Ease (approximate)
  const avgWordLength = words.reduce((sum, w) => sum + w.length, 0) / words.length;
  const avgSentenceLength = words.length / sentences.length;
  const syllableEstimate = words.reduce((sum, w) => sum + Math.max(1, Math.floor(w.length / 3)), 0);
  const avgSyllablesPerWord = syllableEstimate / words.length;

  const fleschScore = 206.835 - (1.015 * avgSentenceLength) - (84.6 * avgSyllablesPerWord);

  // Vocabulary complexity
  const uniqueWords = new Set(words.map(w => w.toLowerCase().replace(/[^a-z]/g, '')));
  const vocabularyRichness = (uniqueWords.size / words.length) * 100;

  // Long words (7+ chars)
  const longWords = words.filter(w => w.length >= 7).length;
  const longWordPercentage = (longWords / words.length) * 100;

  // Complex punctuation
  const semicolons = (text.match(/;/g) || []).length;
  const colons = (text.match(/:/g) || []).length;
  const dashes = (text.match(/—|--/g) || []).length;
  const complexPunctuation = semicolons + colons + dashes;

  return {
    wordCount: words.length,
    sentenceCount: sentences.length,
    avgWordLength: avgWordLength.toFixed(1),
    avgSentenceLength: avgSentenceLength.toFixed(1),
    fleschReadingEase: fleschScore.toFixed(1),
    vocabularyRichness: vocabularyRichness.toFixed(1),
    longWordPercentage: longWordPercentage.toFixed(1),
    complexPunctuation,
    readabilityLevel: fleschScore > 60 ? 'Standard' : fleschScore > 30 ? 'Difficult' : 'Very Difficult'
  };
}

/**
 * Analyze English content patterns
 */
function analyzeEnglishContent(questions, passages) {
  console.log('📝 Analyzing English content patterns...');

  // Question type breakdown with examples
  const questionTypePatterns = {
    'Grammar - Subject-Verb Agreement': { count: 0, indicators: ['subject', 'verb', 'agree', 'singular', 'plural'] },
    'Grammar - Pronoun Usage': { count: 0, indicators: ['pronoun', 'their', 'its', "it's", 'who', 'whom'] },
    'Grammar - Verb Tense': { count: 0, indicators: ['tense', 'had', 'have', 'will', 'would'] },
    'Grammar - Modifier Placement': { count: 0, indicators: ['modifier', 'misplaced', 'dangling'] },
    'Punctuation - Commas': { count: 0, indicators: [','] },
    'Punctuation - Semicolons/Colons': { count: 0, indicators: [';', ':'] },
    'Punctuation - Apostrophes': { count: 0, indicators: ["'"] },
    'Style - Word Choice': { count: 0, indicators: ['most', 'best', 'precise', 'appropriate'] },
    'Style - Redundancy': { count: 0, indicators: ['redundant', 'wordy', 'concise'] },
    'Organization - Transitions': { count: 0, indicators: ['transition', 'however', 'therefore', 'moreover'] },
    'Organization - Placement': { count: 0, indicators: ['placed', 'sentence', 'paragraph', 'order'] },
    'Rhetoric - Main Idea': { count: 0, indicators: ['main idea', 'purpose', 'accomplish'] },
    'Rhetoric - Add/Delete': { count: 0, indicators: ['add', 'delete', 'relevant'] }
  };

  questions.forEach(q => {
    const qText = (q.question_text || '').toLowerCase();
    const choices = Object.values(q.choices || {}).join(' ').toLowerCase();
    const combined = qText + ' ' + choices;

    // NO CHANGE questions
    if (choices.includes('no change')) {
      // This is typically grammar/style
    }

    // Categorize by indicators
    for (const [type, info] of Object.entries(questionTypePatterns)) {
      if (info.indicators.some(ind => combined.includes(ind))) {
        info.count++;
      }
    }
  });

  // Passage content analysis
  const passageContentBreakdown = passages.map(p => {
    const ling = analyzeLinguisticComplexity(p.passage_text);

    // Extract themes/topics from passage
    const text = p.passage_text || '';
    const themes = [];

    // Common ACT English passage themes
    if (text.match(/\b(family|mother|father|childhood|grew up)\b/i)) themes.push('Personal/Family');
    if (text.match(/\b(history|historical|century|era|period)\b/i)) themes.push('Historical');
    if (text.match(/\b(science|research|study|experiment|discover)\b/i)) themes.push('Scientific');
    if (text.match(/\b(art|music|paint|compose|creative)\b/i)) themes.push('Arts/Culture');
    if (text.match(/\b(nature|environment|species|ecosystem)\b/i)) themes.push('Nature/Environment');

    return {
      testNumber: p.test_number,
      passageNumber: p.passage_number,
      type: p.passage_type,
      themes: themes.length > 0 ? themes : ['General'],
      ...ling
    };
  });

  // Difficulty construction pattern
  const difficultyPattern = {
    q1_15: { easy: 0, medium: 0, hard: 0 },
    q16_30: { easy: 0, medium: 0, hard: 0 },
    q31_45: { easy: 0, medium: 0, hard: 0 },
    q46_60: { easy: 0, medium: 0, hard: 0 },
    q61_75: { easy: 0, medium: 0, hard: 0 }
  };

  questions.forEach(q => {
    const qNum = q.question_number;
    const diff = q.difficulty_level || 'medium';

    if (qNum <= 15) difficultyPattern.q1_15[diff]++;
    else if (qNum <= 30) difficultyPattern.q16_30[diff]++;
    else if (qNum <= 45) difficultyPattern.q31_45[diff]++;
    else if (qNum <= 60) difficultyPattern.q46_60[diff]++;
    else difficultyPattern.q61_75[diff]++;
  });

  return {
    totalQuestions: questions.length,
    questionTypePatterns,
    passageContentBreakdown,
    difficultyPattern
  };
}

/**
 * Analyze Math content patterns
 */
function analyzeMathContent(questions) {
  console.log('🔢 Analyzing Math content patterns...');

  // Detailed topic categorization
  const topicBreakdown = {};
  const conceptPatterns = {
    'Algebra - Linear Equations': 0,
    'Algebra - Systems of Equations': 0,
    'Algebra - Quadratics': 0,
    'Algebra - Polynomials': 0,
    'Algebra - Inequalities': 0,
    'Geometry - Triangles': 0,
    'Geometry - Circles': 0,
    'Geometry - Coordinate Geometry': 0,
    'Geometry - 3D Shapes': 0,
    'Trigonometry - Basic Ratios': 0,
    'Trigonometry - Unit Circle': 0,
    'Trigonometry - Identities': 0,
    'Functions - Linear Functions': 0,
    'Functions - Quadratic Functions': 0,
    'Functions - Exponential': 0,
    'Statistics - Mean/Median': 0,
    'Statistics - Probability': 0,
    'Number Theory - Factors/Primes': 0,
    'Number Theory - Sequences': 0
  };

  questions.forEach(q => {
    const topic = q.topic || q.category || 'Unknown';
    topicBreakdown[topic] = (topicBreakdown[topic] || 0) + 1;

    // Analyze question text for concept patterns
    const qText = (q.question_text || '').toLowerCase();

    if (qText.match(/triangle|angle|perpendicular/)) conceptPatterns['Geometry - Triangles']++;
    if (qText.match(/circle|radius|circumference|arc/)) conceptPatterns['Geometry - Circles']++;
    if (qText.match(/coordinate|graph|slope|y-intercept/)) conceptPatterns['Geometry - Coordinate Geometry']++;
    if (qText.match(/volume|surface area|cube|cylinder|sphere/)) conceptPatterns['Geometry - 3D Shapes']++;
    if (qText.match(/sin|cos|tan|sine|cosine|tangent/)) conceptPatterns['Trigonometry - Basic Ratios']++;
    if (qText.match(/mean|median|mode|average/)) conceptPatterns['Statistics - Mean/Median']++;
    if (qText.match(/probability|chance|likely/)) conceptPatterns['Statistics - Probability']++;
    if (qText.match(/\bx\s*=|solve.*for|equation/) && !qText.match(/quadratic/)) conceptPatterns['Algebra - Linear Equations']++;
    if (qText.match(/quadratic|x\^2|parabola/)) conceptPatterns['Algebra - Quadratics']++;
    if (qText.match(/system|two equations|simultaneous/)) conceptPatterns['Algebra - Systems of Equations']++;
  });

  // Difficulty progression analysis
  const difficultyProgression = {
    q1_20: { concepts: [], avgComplexity: 0 },
    q21_40: { concepts: [], avgComplexity: 0 },
    q41_60: { concepts: [], avgComplexity: 0 }
  };

  questions.forEach(q => {
    const qNum = q.question_number;
    const complexity = q.question_text ? q.question_text.length : 0; // Longer questions = more complex

    if (qNum <= 20) {
      difficultyProgression.q1_20.concepts.push(q.topic || 'Unknown');
      difficultyProgression.q1_20.avgComplexity += complexity;
    } else if (qNum <= 40) {
      difficultyProgression.q21_40.concepts.push(q.topic || 'Unknown');
      difficultyProgression.q21_40.avgComplexity += complexity;
    } else {
      difficultyProgression.q41_60.concepts.push(q.topic || 'Unknown');
      difficultyProgression.q41_60.avgComplexity += complexity;
    }
  });

  // Calculate averages
  Object.values(difficultyProgression).forEach(range => {
    range.avgComplexity = Math.round(range.avgComplexity / range.concepts.length);
  });

  return {
    totalQuestions: questions.length,
    topicBreakdown,
    conceptPatterns,
    difficultyProgression
  };
}

/**
 * Analyze Reading content patterns
 */
function analyzeReadingContent(questions, passages) {
  console.log('📖 Analyzing Reading content patterns...');

  // Question type breakdown
  const questionTypes = {
    'Detail/Explicit': { count: 0, keywords: ['according to', 'states that', 'mentions', 'in line'] },
    'Inference/Implicit': { count: 0, keywords: ['infer', 'suggest', 'imply', 'most likely'] },
    'Main Idea/Theme': { count: 0, keywords: ['main', 'primary purpose', 'central', 'overall'] },
    'Vocabulary in Context': { count: 0, keywords: ['most nearly means', 'refers to', 'used to mean'] },
    'Function/Purpose': { count: 0, keywords: ['function', 'purpose', 'serves to', 'effect'] },
    'Comparison': { count: 0, keywords: ['compare', 'contrast', 'similar', 'differ'] },
    'Author Technique': { count: 0, keywords: ['technique', 'method', 'approach', 'style'] }
  };

  questions.forEach(q => {
    const qText = (q.question_text || '').toLowerCase();

    for (const [type, info] of Object.entries(questionTypes)) {
      if (info.keywords.some(kw => qText.includes(kw))) {
        info.count++;
        break; // Count each question once
      }
    }
  });

  // Passage content analysis
  const passageContentAnalysis = passages.map(p => {
    const ling = analyzeLinguisticComplexity(p.passage_text);

    // Determine genre/subject matter
    const text = p.passage_text || '';
    let genreDetail = p.genre || 'Unknown';
    const subjectMatter = [];

    // Literary Fiction patterns
    if (text.match(/\b(thought|felt|realized|wondered|remembered)\b/i)) subjectMatter.push('Character introspection');
    if (text.match(/\b(".*?"|said|replied|asked)\b/g)?.length > 3) subjectMatter.push('Dialogue-heavy');

    // Social Science patterns
    if (text.match(/\b(study|research|survey|data|researchers|scientists)\b/i)) subjectMatter.push('Research-based');
    if (text.match(/\b(society|culture|social|community|people)\b/i)) subjectMatter.push('Social/Cultural');

    // Natural Science patterns
    if (text.match(/\b(species|organism|ecosystem|evolution|biology)\b/i)) subjectMatter.push('Biology/Ecology');
    if (text.match(/\b(atom|molecule|chemical|element|reaction)\b/i)) subjectMatter.push('Chemistry');
    if (text.match(/\b(planet|star|space|galaxy|universe)\b/i)) subjectMatter.push('Astronomy');

    // Humanities patterns
    if (text.match(/\b(history|historical|century|era|period|ancient)\b/i)) subjectMatter.push('Historical');
    if (text.match(/\b(art|artist|paint|sculpture|museum)\b/i)) subjectMatter.push('Art');
    if (text.match(/\b(music|composer|symphony|instrument)\b/i)) subjectMatter.push('Music');

    // Narrative structure
    const narrativeElements = {
      hasDialogue: (text.match(/[""].*?[""]|".*?"/g) || []).length > 0,
      hasTimeTransitions: text.match(/\b(then|later|before|after|meanwhile|eventually)\b/i) !== null,
      hasDescriptiveLanguage: text.match(/\b(beautiful|dark|bright|quiet|loud|vast|tiny)\b/i) !== null,
      firstPerson: text.match(/\b(I|me|my|we|our)\b/) !== null,
      thirdPerson: text.match(/\b(he|she|they|him|her|them)\b/) !== null
    };

    return {
      testNumber: p.test_number,
      passageNumber: p.passage_number,
      genre: genreDetail,
      subjectMatter: subjectMatter.length > 0 ? subjectMatter : ['General'],
      narrativeElements,
      ...ling
    };
  });

  return {
    totalQuestions: questions.length,
    questionTypes,
    passageContentAnalysis
  };
}

/**
 * Analyze Science content patterns
 */
function analyzeScienceContent(questions, passages) {
  console.log('🔬 Analyzing Science content patterns...');

  // Passage type distribution with content analysis
  const passageTypeAnalysis = {};

  passages.forEach(p => {
    const type = p.passage_type || 'Unknown';

    if (!passageTypeAnalysis[type]) {
      passageTypeAnalysis[type] = {
        count: 0,
        avgQuestions: 0,
        topics: [],
        dataTypes: []
      };
    }

    passageTypeAnalysis[type].count++;

    // Analyze content
    const text = p.passage_text || '';

    // Identify scientific domain
    if (text.match(/\b(DNA|gene|cell|organism|species|protein)\b/i)) passageTypeAnalysis[type].topics.push('Biology');
    if (text.match(/\b(reaction|chemical|element|compound|molecule)\b/i)) passageTypeAnalysis[type].topics.push('Chemistry');
    if (text.match(/\b(force|velocity|mass|energy|motion)\b/i)) passageTypeAnalysis[type].topics.push('Physics');
    if (text.match(/\b(planet|Earth|atmosphere|geology|rock)\b/i)) passageTypeAnalysis[type].topics.push('Earth Science');

    // Identify data presentation types
    if (text.match(/table|figure|data/i)) passageTypeAnalysis[type].dataTypes.push('Tables');
    if (text.match(/graph|plot|chart/i)) passageTypeAnalysis[type].dataTypes.push('Graphs');
    if (text.match(/diagram|illustration/i)) passageTypeAnalysis[type].dataTypes.push('Diagrams');
  });

  // Question type patterns for science
  const questionPatterns = {
    'Data Interpretation': 0,
    'Experimental Design': 0,
    'Hypothesis/Prediction': 0,
    'Comparison Across Studies': 0,
    'Variable Identification': 0,
    'Conclusion Drawing': 0
  };

  questions.forEach(q => {
    const qText = (q.question_text || '').toLowerCase();

    if (qText.match(/according to.*figure|table|graph/)) questionPatterns['Data Interpretation']++;
    if (qText.match(/experiment|study.*design|method|procedure/)) questionPatterns['Experimental Design']++;
    if (qText.match(/hypothesis|predict|expect|would.*likely/)) questionPatterns['Hypothesis/Prediction']++;
    if (qText.match(/compare|differ|similar.*study|experiment/)) questionPatterns['Comparison Across Studies']++;
    if (qText.match(/variable|factor|increase|decrease/)) questionPatterns['Variable Identification']++;
    if (qText.match(/conclude|support|consistent with/)) questionPatterns['Conclusion Drawing']++;
  });

  return {
    totalQuestions: questions.length,
    passageTypeAnalysis,
    questionPatterns
  };
}

/**
 * Generate comprehensive HTML
 */
function generateHTML(data) {
  const { english, math, reading, science, testNumbers } = data;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ACT Content & Difficulty Blueprint</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      line-height: 1.5;
      color: #111;
      background: #f8f9fa;
    }
    .header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: #fff;
      padding: 32px 24px;
      text-align: center;
    }
    h1 {
      font-size: 32px;
      font-weight: 700;
      margin-bottom: 8px;
    }
    .subtitle {
      font-size: 14px;
      opacity: 0.9;
    }
    .tabs {
      background: #fff;
      border-bottom: 2px solid #e9ecef;
      display: flex;
      justify-content: center;
      gap: 0;
      position: sticky;
      top: 0;
      z-index: 100;
      box-shadow: 0 2px 8px rgba(0,0,0,0.05);
    }
    .tab {
      padding: 16px 32px;
      border: none;
      background: none;
      cursor: pointer;
      font-size: 14px;
      font-weight: 600;
      color: #6c757d;
      border-bottom: 3px solid transparent;
      transition: all 0.2s;
    }
    .tab:hover { background: #f8f9fa; color: #495057; }
    .tab.active { color: #667eea; border-bottom-color: #667eea; }
    .tab-content {
      display: none;
      padding: 32px 24px;
      max-width: 1400px;
      margin: 0 auto;
    }
    .tab-content.active { display: block; }
    .section {
      background: #fff;
      padding: 24px;
      margin-bottom: 24px;
      border-radius: 8px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.05);
    }
    h2 {
      font-size: 20px;
      font-weight: 700;
      margin-bottom: 16px;
      color: #212529;
      padding-bottom: 12px;
      border-bottom: 2px solid #f8f9fa;
    }
    h3 {
      font-size: 14px;
      font-weight: 600;
      margin: 24px 0 12px 0;
      text-transform: uppercase;
      color: #6c757d;
      letter-spacing: 0.5px;
    }
    .key-insight {
      background: #e7f3ff;
      border-left: 4px solid #0066ff;
      padding: 16px;
      margin: 16px 0;
      border-radius: 4px;
    }
    .key-insight strong {
      display: block;
      color: #0056d6;
      margin-bottom: 8px;
      font-size: 12px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      font-size: 13px;
      margin: 12px 0;
    }
    th {
      text-align: left;
      font-weight: 600;
      padding: 10px 12px;
      background: #f8f9fa;
      font-size: 11px;
      text-transform: uppercase;
      color: #6c757d;
      letter-spacing: 0.5px;
    }
    td {
      padding: 10px 12px;
      border-bottom: 1px solid #f8f9fa;
    }
    tr:hover { background: #f8f9fa; }
    .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 24px; }
    ul { margin: 12px 0; padding-left: 24px; line-height: 1.8; }
    li { margin: 6px 0; }
    .badge {
      display: inline-block;
      padding: 4px 8px;
      background: #e9ecef;
      border-radius: 4px;
      font-size: 11px;
      font-weight: 600;
      margin: 2px 4px 2px 0;
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>ACT Content & Difficulty Blueprint</h1>
    <div class="subtitle">Deep content analysis from ${testNumbers.length} tests • Focus on replication patterns</div>
  </div>

  <div class="tabs">
    <button class="tab active" onclick="showTab('english')">English</button>
    <button class="tab" onclick="showTab('math')">Math</button>
    <button class="tab" onclick="showTab('reading')">Reading</button>
    <button class="tab" onclick="showTab('science')">Science</button>
  </div>

  <!-- ENGLISH TAB -->
  <div id="english" class="tab-content active">
    <div class="section">
      <h2>English Section Content Patterns</h2>
      <div class="key-insight">
        <strong>Replication Strategy</strong>
        Create 5 passages (15 questions each) covering diverse themes with progressive difficulty. Mix question types across grammar, punctuation, style, organization, and rhetoric.
      </div>
    </div>

    <div class="section">
      <h2>Question Type Distribution</h2>
      <table>
        <thead>
          <tr>
            <th>Question Type</th>
            <th>Count</th>
            <th>% of Total</th>
            <th>How to Replicate</th>
          </tr>
        </thead>
        <tbody>
          ${Object.entries(english.questionTypePatterns).map(([type, info]) => `
          <tr>
            <td>${type}</td>
            <td>${info.count}</td>
            <td>${((info.count / english.totalQuestions) * 100).toFixed(1)}%</td>
            <td style="font-size: 11px; color: #6c757d;">
              ${type.includes('Grammar') ? 'Test specific grammar rules' :
                type.includes('Punctuation') ? 'Focus on punctuation placement/usage' :
                type.includes('Style') ? 'Evaluate word choice and conciseness' :
                type.includes('Organization') ? 'Test logical flow and structure' :
                'Assess rhetorical effectiveness'}
            </td>
          </tr>
          `).join('')}
        </tbody>
      </table>
    </div>

    <div class="section">
      <h2>Passage Content Breakdown</h2>
      <table>
        <thead>
          <tr>
            <th>Test</th>
            <th>Passage</th>
            <th>Themes</th>
            <th>Words</th>
            <th>Readability</th>
            <th>Avg Word Len</th>
            <th>Avg Sent Len</th>
            <th>Complex Punct</th>
          </tr>
        </thead>
        <tbody>
          ${english.passageContentBreakdown.map(p => `
          <tr>
            <td>${p.testNumber}</td>
            <td>${p.passageNumber}</td>
            <td>${(p.themes || []).map(t => `<span class="badge">${t}</span>`).join('')}</td>
            <td>${p.wordCount || 'N/A'}</td>
            <td>${p.readabilityLevel || 'N/A'}</td>
            <td>${p.avgWordLength || 'N/A'}</td>
            <td>${p.avgSentenceLength || 'N/A'}</td>
            <td>${p.complexPunctuation || 0}</td>
          </tr>
          `).join('')}
        </tbody>
      </table>
      <div class="key-insight">
        <strong>Content Patterns</strong>
        Mix personal narratives, historical accounts, scientific explanations, and cultural discussions. Maintain 350-450 words per passage with moderate readability (Flesch 30-60).
      </div>
    </div>

    <div class="section">
      <h2>Difficulty Progression Pattern</h2>
      <table>
        <thead>
          <tr>
            <th>Question Range</th>
            <th>Easy</th>
            <th>Medium</th>
            <th>Hard</th>
            <th>Strategy</th>
          </tr>
        </thead>
        <tbody>
          ${Object.entries(english.difficultyPattern).map(([range, counts]) => `
          <tr>
            <td>Q ${range.replace('q', '').replace('_', '-')}</td>
            <td>${counts.easy}</td>
            <td>${counts.medium}</td>
            <td>${counts.hard}</td>
            <td style="font-size: 11px; color: #6c757d;">
              ${range === 'q1_15' ? 'Start with straightforward grammar/punctuation' :
                range === 'q16_30' ? 'Mix in style and organization questions' :
                range === 'q31_45' ? 'Increase complexity with rhetoric' :
                range === 'q46_60' ? 'Focus on nuanced style decisions' :
                'Most challenging rhetoric and organization'}
            </td>
          </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  </div>

  <!-- MATH TAB -->
  <div id="math" class="tab-content">
    <div class="section">
      <h2>Math Section Content Patterns</h2>
      <div class="key-insight">
        <strong>Replication Strategy</strong>
        Build 60 questions with clear difficulty progression. Start with basic arithmetic/algebra (Q1-20), transition to geometry/intermediate algebra (Q21-40), finish with advanced topics (Q41-60).
      </div>
    </div>

    <div class="section">
      <h2>Concept Distribution</h2>
      <table>
        <thead>
          <tr>
            <th>Concept Area</th>
            <th>Count</th>
            <th>% of Total</th>
            <th>Typical Placement</th>
          </tr>
        </thead>
        <tbody>
          ${Object.entries(math.conceptPatterns)
            .filter(([_, count]) => count > 0)
            .sort((a, b) => b[1] - a[1])
            .map(([concept, count]) => `
          <tr>
            <td>${concept}</td>
            <td>${count}</td>
            <td>${((count / math.totalQuestions) * 100).toFixed(1)}%</td>
            <td style="font-size: 11px; color: #6c757d;">
              ${concept.includes('Linear') || concept.includes('Mean') ? 'Q1-30' :
                concept.includes('Geometry') && !concept.includes('3D') ? 'Q10-45' :
                concept.includes('Trigonometry') || concept.includes('3D') ? 'Q35-60' :
                'Q20-50'}
            </td>
          </tr>
          `).join('')}
        </tbody>
      </table>
    </div>

    <div class="section">
      <h2>Difficulty Progression by Range</h2>
      <table>
        <thead>
          <tr>
            <th>Range</th>
            <th>Primary Topics</th>
            <th>Avg Complexity</th>
            <th>Content Strategy</th>
          </tr>
        </thead>
        <tbody>
          ${Object.entries(math.difficultyProgression).map(([range, data]) => {
            const topTopics = [...new Set(data.concepts)].slice(0, 5).join(', ');
            return `
          <tr>
            <td>Q ${range.replace('q', '').replace('_', '-')}</td>
            <td style="font-size: 11px;">${topTopics}</td>
            <td>${data.avgComplexity} chars</td>
            <td style="font-size: 11px; color: #6c757d;">
              ${range === 'q1_20' ? 'Simple, direct questions with minimal setup' :
                range === 'q21_40' ? 'Multi-step problems, more context' :
                'Complex scenarios, abstract reasoning'}
            </td>
          </tr>
          `;
          }).join('')}
        </tbody>
      </table>
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
          ${Object.entries(math.topicBreakdown)
            .sort((a, b) => b[1] - a[1])
            .map(([topic, count]) => `
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
      <h2>Reading Section Content Patterns</h2>
      <div class="key-insight">
        <strong>Replication Strategy</strong>
        Create 4 passages (10 questions each): Literary Fiction, Social Science, Humanities, Natural Science. Each ~700-900 words with varied question types.
      </div>
    </div>

    <div class="section">
      <h2>Question Type Distribution</h2>
      <table>
        <thead>
          <tr>
            <th>Question Type</th>
            <th>Count</th>
            <th>% of Total</th>
            <th>How to Construct</th>
          </tr>
        </thead>
        <tbody>
          ${Object.entries(reading.questionTypes).map(([type, info]) => `
          <tr>
            <td>${type}</td>
            <td>${info.count}</td>
            <td>${((info.count / reading.totalQuestions) * 100).toFixed(1)}%</td>
            <td style="font-size: 11px; color: #6c757d;">
              ${type.includes('Detail') ? 'Ask about explicitly stated facts' :
                type.includes('Inference') ? 'Require reading between the lines' :
                type.includes('Main') ? 'Test overall comprehension' :
                type.includes('Vocabulary') ? 'Context-dependent word meaning' :
                type.includes('Function') ? 'Why author included specific elements' :
                type.includes('Comparison') ? 'Relationships between passage parts' :
                'Analyze author\'s techniques and choices'}
            </td>
          </tr>
          `).join('')}
        </tbody>
      </table>
    </div>

    <div class="section">
      <h2>Passage Content Analysis</h2>
      <table>
        <thead>
          <tr>
            <th>Test</th>
            <th>P</th>
            <th>Genre</th>
            <th>Subject Matter</th>
            <th>Words</th>
            <th>Readability</th>
            <th>Narrative Elements</th>
          </tr>
        </thead>
        <tbody>
          ${reading.passageContentAnalysis.map(p => `
          <tr>
            <td>${p.testNumber}</td>
            <td>${p.passageNumber}</td>
            <td>${p.genre}</td>
            <td style="font-size: 11px;">${(p.subjectMatter || []).map(s => `<span class="badge">${s}</span>`).join('')}</td>
            <td>${p.wordCount || 'N/A'}</td>
            <td>${p.readabilityLevel || 'N/A'}</td>
            <td style="font-size: 10px;">
              ${p.narrativeElements?.hasDialogue ? '💬' : ''}
              ${p.narrativeElements?.firstPerson ? '1st' : ''}
              ${p.narrativeElements?.thirdPerson ? '3rd' : ''}
            </td>
          </tr>
          `).join('')}
        </tbody>
      </table>
      <div class="key-insight">
        <strong>Content Guidelines</strong>
        <ul>
          <li><strong>Literary Fiction:</strong> Character development, narrative structure, emotional depth. Use dialogue and introspection.</li>
          <li><strong>Social Science:</strong> Research findings, cultural phenomena, societal trends. Data-driven with analytical tone.</li>
          <li><strong>Humanities:</strong> Historical context, artistic movements, philosophical ideas. Rich descriptive language.</li>
          <li><strong>Natural Science:</strong> Scientific processes, discoveries, natural phenomena. Technical but accessible.</li>
        </ul>
      </div>
    </div>
  </div>

  <!-- SCIENCE TAB -->
  <div id="science" class="tab-content">
    <div class="section">
      <h2>Science Section Content Patterns</h2>
      <div class="key-insight">
        <strong>Replication Strategy</strong>
        Create 6 passages: 3 Data Representation (5q each), 2 Research Summaries (6-7q each), 1 Conflicting Viewpoints (11-13q). Include tables, graphs, and scientific diagrams.
      </div>
    </div>

    <div class="section">
      <h2>Passage Type Analysis</h2>
      <table>
        <thead>
          <tr>
            <th>Passage Type</th>
            <th>Count</th>
            <th>Scientific Domains</th>
            <th>Data Presentation</th>
            <th>Content Focus</th>
          </tr>
        </thead>
        <tbody>
          ${Object.entries(science.passageTypeAnalysis).map(([type, info]) => `
          <tr>
            <td style="font-weight: 600;">${type}</td>
            <td>${info.count}</td>
            <td style="font-size: 11px;">${[...new Set(info.topics)].map(t => `<span class="badge">${t}</span>`).join('')}</td>
            <td style="font-size: 11px;">${[...new Set(info.dataTypes)].map(t => `<span class="badge">${t}</span>`).join('')}</td>
            <td style="font-size: 11px; color: #6c757d;">
              ${type.includes('Data') ? 'Reading and interpreting graphs/tables' :
                type.includes('Research') ? 'Understanding experimental methods and results' :
                'Comparing contrasting viewpoints on scientific topics'}
            </td>
          </tr>
          `).join('')}
        </tbody>
      </table>
    </div>

    <div class="section">
      <h2>Question Pattern Analysis</h2>
      <table>
        <thead>
          <tr>
            <th>Question Pattern</th>
            <th>Count</th>
            <th>% of Total</th>
            <th>Construction Method</th>
          </tr>
        </thead>
        <tbody>
          ${Object.entries(science.questionPatterns).map(([pattern, count]) => `
          <tr>
            <td>${pattern}</td>
            <td>${count}</td>
            <td>${((count / science.totalQuestions) * 100).toFixed(1)}%</td>
            <td style="font-size: 11px; color: #6c757d;">
              ${pattern.includes('Data') ? 'Direct questions from figures/tables' :
                pattern.includes('Design') ? 'Test understanding of methodology' :
                pattern.includes('Hypothesis') ? 'Predict outcomes based on data' :
                pattern.includes('Comparison') ? 'Compare across multiple experiments' :
                pattern.includes('Variable') ? 'Identify independent/dependent variables' :
                'Draw conclusions from presented evidence'}
            </td>
          </tr>
          `).join('')}
        </tbody>
      </table>
    </div>

    <div class="section">
      <h2>Content Replication Guide</h2>
      <div class="key-insight">
        <strong>Data Representation (5 questions per passage)</strong>
        <ul>
          <li>Include 2-3 figures (graphs, tables, or diagrams)</li>
          <li>Focus on a single experiment or dataset</li>
          <li>Questions test basic data reading and trend identification</li>
          <li>Common domains: Chemistry, Biology, Physics, Earth Science</li>
        </ul>
      </div>
      <div class="key-insight">
        <strong>Research Summaries (6-7 questions per passage)</strong>
        <ul>
          <li>Describe 2-3 related experiments</li>
          <li>Include methods, results, and data presentation</li>
          <li>Questions test experimental design understanding and comparison</li>
          <li>Build progressive complexity across experiments</li>
        </ul>
      </div>
      <div class="key-insight">
        <strong>Conflicting Viewpoints (11-13 questions)</strong>
        <ul>
          <li>Present 2-3 different perspectives on a scientific topic</li>
          <li>Each viewpoint should be 150-200 words</li>
          <li>Questions compare viewpoints and test comprehension</li>
          <li>Use current scientific debates (evolution, climate, etc.)</li>
        </ul>
      </div>
    </div>
  </div>

  <script>
    function showTab(tabName) {
      document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
      document.getElementById(tabName).classList.add('active');
      event.target.classList.add('active');
    }
  </script>
</body>
</html>`;
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

    const english = analyzeEnglishContent(rawData.englishQuestions, rawData.englishPassages);
    const math = analyzeMathContent(rawData.mathQuestions);
    const reading = analyzeReadingContent(rawData.readingQuestions, rawData.readingPassages);
    const science = analyzeScienceContent(rawData.scienceQuestions, rawData.sciencePassages);

    console.log('\n🎨 Generating content-focused blueprint...\n');
    const html = generateHTML({
      english,
      math,
      reading,
      science,
      testNumbers
    });

    const outputPath = path.join(__dirname, '../../reports/act-content-blueprint.html');
    fs.writeFileSync(outputPath, html);

    console.log('✅ Content blueprint generated!');
    console.log(`📄 ${outputPath}\n`);

  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

main();
