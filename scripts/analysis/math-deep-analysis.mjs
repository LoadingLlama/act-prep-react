#!/usr/bin/env node

/**
 * MATH SECTION DEEP ANALYSIS
 * Reverse engineer Math section patterns for test generation
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

console.log('🔢 MATH SECTION DEEP ANALYSIS');
console.log('='.repeat(60));

// Get all Math data
const { data: questions } = await supabase
  .from('act_math_questions')
  .select('*')
  .in('test_number', [1, 2])
  .order('test_number, question_number');

const mathAnalysis = {
  topicProgression: {},
  difficultyDistribution: {},
  questionComplexity: {},
  conceptMap: {},
  generationFramework: {}
};

console.log(`📊 Analyzing ${questions.length} Math questions...`);

// 1. TOPIC PROGRESSION ANALYSIS
console.log('🔍 Analyzing topic progression...');

const topicsByPosition = {};
const topicFrequency = {};
const difficultyByTopic = {};

questions.forEach(q => {
  const position = q.question_number;
  const topic = q.question_type || 'unknown';
  const difficulty = q.difficulty_level || 'medium';

  // Track topic frequency
  topicFrequency[topic] = (topicFrequency[topic] || 0) + 1;

  // Track difficulty by topic
  if (!difficultyByTopic[topic]) {
    difficultyByTopic[topic] = { easy: 0, medium: 0, hard: 0 };
  }
  difficultyByTopic[topic][difficulty]++;

  // Track position patterns
  if (!topicsByPosition[position]) {
    topicsByPosition[position] = [];
  }
  topicsByPosition[position].push({
    topic,
    difficulty,
    test: q.test_number
  });
});

// Calculate topic progression pattern
const topicProgression = [];
for (let i = 1; i <= 60; i++) {
  const questionsAtPosition = topicsByPosition[i] || [];
  const topicCounts = {};
  const difficultyCounts = { easy: 0, medium: 0, hard: 0 };

  questionsAtPosition.forEach(q => {
    topicCounts[q.topic] = (topicCounts[q.topic] || 0) + 1;
    difficultyCounts[q.difficulty]++;
  });

  const mostCommonTopic = Object.entries(topicCounts).reduce((a, b) =>
    topicCounts[a[0]] > topicCounts[b[0]] ? a : b, ['unknown', 0])[0];

  const mostCommonDifficulty = Object.entries(difficultyCounts).reduce((a, b) =>
    difficultyCounts[a[0]] > difficultyCounts[b[0]] ? a : b, ['medium', 0])[0];

  topicProgression.push({
    position: i,
    section: i <= 20 ? 'foundation' : i <= 40 ? 'intermediate' : 'advanced',
    mostCommonTopic,
    mostCommonDifficulty,
    topicVariety: Object.keys(topicCounts).length
  });
}

mathAnalysis.topicProgression = {
  byPosition: topicProgression,
  frequency: topicFrequency,
  difficultyByTopic
};

// 2. QUESTION COMPLEXITY ANALYSIS
console.log('📏 Analyzing question complexity...');

const complexityMetrics = [];
const keywordPatterns = {};
const formulaPatterns = {};

questions.forEach(q => {
  const stem = q.question_stem || '';
  const choices = [q.choice_a, q.choice_b, q.choice_c, q.choice_d, q.choice_e].filter(Boolean);

  // Basic complexity metrics
  const wordCount = stem.split(/\s+/).length;
  const charCount = stem.length;
  const numberCount = (stem.match(/\d+/g) || []).length;
  const equationCount = (stem.match(/[=<>]/g) || []).length;
  const fractionCount = (stem.match(/\/|\bfrac\b/g) || []).length;
  const variableCount = (stem.match(/[a-zA-Z]/g) || []).filter(c =>
    !['the', 'and', 'of', 'to', 'in', 'for', 'is', 'are', 'was', 'were'].includes(c.toLowerCase())
  ).length;

  const complexity = {
    position: q.question_number,
    topic: q.question_type,
    difficulty: q.difficulty_level,
    wordCount,
    charCount,
    numberCount,
    equationCount,
    fractionCount,
    variableCount,
    choiceCount: choices.length,
    complexityScore: wordCount * 0.1 + numberCount * 0.3 + equationCount * 0.5 + fractionCount * 0.4 + variableCount * 0.2
  };

  complexityMetrics.push(complexity);

  // Extract keywords and patterns
  const keywords = stem.toLowerCase().match(/\b(area|perimeter|volume|angle|triangle|circle|function|equation|probability|percent|ratio|factor|multiple|slope|coordinate|matrix|logarithm|exponential|quadratic|linear|polynomial|derivative|integral)\b/g) || [];
  keywords.forEach(keyword => {
    keywordPatterns[keyword] = (keywordPatterns[keyword] || 0) + 1;
  });

  // Extract formula patterns
  const formulas = stem.match(/[a-zA-Z]\s*=\s*[^,]+/g) || [];
  formulas.forEach(formula => {
    const normalized = formula.replace(/\s+/g, ' ').trim();
    formulaPatterns[normalized] = (formulaPatterns[normalized] || 0) + 1;
  });
});

mathAnalysis.questionComplexity = {
  metrics: complexityMetrics,
  keywords: keywordPatterns,
  formulas: formulaPatterns,
  averages: {
    wordCount: Math.round(complexityMetrics.reduce((sum, c) => sum + c.wordCount, 0) / complexityMetrics.length),
    numberCount: Math.round(complexityMetrics.reduce((sum, c) => sum + c.numberCount, 0) / complexityMetrics.length * 10) / 10,
    complexityScore: Math.round(complexityMetrics.reduce((sum, c) => sum + c.complexityScore, 0) / complexityMetrics.length * 10) / 10
  }
};

// 3. CONCEPT MAPPING
console.log('🗺️ Creating concept map...');

const conceptMap = {};
const prerequisiteMap = {
  'arithmetic': [],
  'algebra': ['arithmetic'],
  'functions': ['algebra'],
  'geometry': ['arithmetic'],
  'trigonometry': ['geometry', 'algebra'],
  'statistics-probability': ['arithmetic'],
  'complex-numbers': ['algebra'],
  'matrices': ['algebra'],
  'number-theory': ['arithmetic'],
  'sequences': ['algebra'],
  'counting': ['arithmetic'],
  'word-problem': ['arithmetic'],
  'math-problem-solving': ['arithmetic'],
  'vectors': ['trigonometry', 'geometry']
};

// Build concept difficulty progression
Object.entries(topicFrequency).forEach(([topic, frequency]) => {
  const topicQuestions = questions.filter(q => q.question_type === topic);
  const avgDifficulty = topicQuestions.reduce((sum, q) => {
    const difficultyScore = q.difficulty_level === 'easy' ? 1 : q.difficulty_level === 'medium' ? 2 : 3;
    return sum + difficultyScore;
  }, 0) / topicQuestions.length;

  const avgPosition = topicQuestions.reduce((sum, q) => sum + q.question_number, 0) / topicQuestions.length;

  conceptMap[topic] = {
    frequency,
    avgDifficulty: Math.round(avgDifficulty * 10) / 10,
    avgPosition: Math.round(avgPosition),
    prerequisites: prerequisiteMap[topic] || [],
    difficultyDistribution: difficultyByTopic[topic] || { easy: 0, medium: 0, hard: 0 }
  };
});

mathAnalysis.conceptMap = conceptMap;

// 4. GENERATION FRAMEWORK
console.log('🏗️ Building generation framework...');

const generationFramework = {
  questionDistribution: {
    foundation: topicProgression.filter(p => p.section === 'foundation').reduce((acc, p) => {
      acc[p.mostCommonTopic] = (acc[p.mostCommonTopic] || 0) + 1;
      return acc;
    }, {}),
    intermediate: topicProgression.filter(p => p.section === 'intermediate').reduce((acc, p) => {
      acc[p.mostCommonTopic] = (acc[p.mostCommonTopic] || 0) + 1;
      return acc;
    }, {}),
    advanced: topicProgression.filter(p => p.section === 'advanced').reduce((acc, p) => {
      acc[p.mostCommonTopic] = (acc[p.mostCommonTopic] || 0) + 1;
      return acc;
    }, {})
  },
  difficultyProgression: {
    positions1to20: 'easy-medium bias',
    positions21to40: 'medium bias',
    positions41to60: 'medium-hard bias'
  },
  complexityTargets: {
    wordCount: mathAnalysis.questionComplexity.averages.wordCount,
    numberDensity: mathAnalysis.questionComplexity.averages.numberCount,
    complexityScore: mathAnalysis.questionComplexity.averages.complexityScore
  },
  topicSequencing: Object.entries(conceptMap)
    .sort((a, b) => a[1].avgPosition - b[1].avgPosition)
    .map(([topic, data]) => ({
      topic,
      recommendedPosition: data.avgPosition,
      prerequisites: data.prerequisites
    }))
};

mathAnalysis.generationFramework = generationFramework;

// 5. SAVE RESULTS
const analysisDir = join(__dirname, '../../analysis-results');
if (!fs.existsSync(analysisDir)) {
  fs.mkdirSync(analysisDir, { recursive: true });
}

fs.writeFileSync(
  join(analysisDir, 'math-deep-analysis.json'),
  JSON.stringify(mathAnalysis, null, 2)
);

console.log('\n📊 MATH ANALYSIS SUMMARY');
console.log('='.repeat(50));
console.log(`📝 Questions analyzed: ${questions.length}`);
console.log(`🎯 Topics identified: ${Object.keys(topicFrequency).length}`);
console.log(`📈 Avg question complexity: ${mathAnalysis.questionComplexity.averages.complexityScore}`);
console.log(`📐 Most common keywords: ${Object.entries(keywordPatterns).sort((a,b) => b[1] - a[1]).slice(0,3).map(([k,v]) => `${k}(${v})`).join(', ')}`);
console.log(`🔄 Foundation topics: ${Object.keys(generationFramework.questionDistribution.foundation).length}`);
console.log(`⚡ Advanced topics: ${Object.keys(generationFramework.questionDistribution.advanced).length}`);
console.log(`✅ Math deep analysis complete!`);

export { mathAnalysis };