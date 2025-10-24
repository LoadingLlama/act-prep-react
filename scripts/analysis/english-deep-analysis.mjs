#!/usr/bin/env node

/**
 * ENGLISH SECTION DEEP ANALYSIS
 * Reverse engineer English section patterns for test generation
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

console.log('📝 ENGLISH SECTION DEEP ANALYSIS');
console.log('='.repeat(60));

// Get all English data
const { data: questions } = await supabase
  .from('act_english_questions')
  .select('*')
  .in('test_number', [1, 2])
  .order('test_number, question_number');

const { data: passages } = await supabase
  .from('act_english_passages')
  .select('*')
  .in('test_number', [1, 2])
  .order('test_number, passage_number');

const englishAnalysis = {
  questionPatterns: {},
  passagePatterns: {},
  difficultyProgression: {},
  grammarRules: {},
  rhetoricPatterns: {},
  generationTemplates: {}
};

// 1. QUESTION TYPE ANALYSIS
console.log('🔍 Analyzing question types and patterns...');

const questionTypesByPosition = {};
const grammarCategories = {
  'punctuation': ['comma', 'semicolon', 'apostrophe', 'colon', 'dash'],
  'verb-tense': ['tense', 'verb', 'past', 'present', 'future'],
  'agreement': ['subject-verb', 'pronoun', 'plural', 'singular'],
  'word-choice': ['word-choice', 'vocabulary', 'diction'],
  'sentence-structure': ['fragment', 'run-on', 'coordination', 'subordination'],
  'rhetoric': ['transition', 'organization', 'style', 'audience'],
  'strategy': ['add', 'delete', 'revise', 'purpose']
};

questions.forEach(q => {
  const position = q.question_number;
  const passageNum = q.passage_number || Math.ceil(position / 15);
  const positionInPassage = position - ((passageNum - 1) * 15);

  // Determine if it's underlined or rhetorical question
  const isRhetorical = !q.underlined_text || q.question_stem.toLowerCase().includes('given that all') ||
                      q.question_stem.toLowerCase().includes('if the writer') ||
                      q.question_stem.toLowerCase().includes('suppose the writer');

  const questionType = isRhetorical ? 'rhetorical' : 'underlined';

  if (!questionTypesByPosition[passageNum]) {
    questionTypesByPosition[passageNum] = {};
  }

  questionTypesByPosition[passageNum][positionInPassage] = {
    type: questionType,
    difficulty: q.difficulty_level,
    category: q.question_type || 'unknown',
    choices: [q.choice_a, q.choice_b, q.choice_c, q.choice_d].filter(Boolean).length
  };

  // Categorize grammar rules
  const stem = q.question_stem.toLowerCase();
  const underlined = (q.underlined_text || '').toLowerCase();

  for (const [category, keywords] of Object.entries(grammarCategories)) {
    if (keywords.some(keyword => stem.includes(keyword) || underlined.includes(keyword))) {
      if (!englishAnalysis.grammarRules[category]) {
        englishAnalysis.grammarRules[category] = [];
      }
      englishAnalysis.grammarRules[category].push({
        question_number: position,
        underlined_text: q.underlined_text,
        correct_answer: q.correct_answer,
        difficulty: q.difficulty_level
      });
    }
  }
});

englishAnalysis.questionPatterns.byPosition = questionTypesByPosition;

// 2. PASSAGE ANALYSIS
console.log('📚 Analyzing passage patterns...');

const passageTypes = {};
const complexityMetrics = [];

passages.forEach(p => {
  const text = p.passage_text || '';
  const title = p.title || '';

  // Calculate readability metrics
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0).length;
  const words = text.split(/\s+/).filter(w => w.length > 0).length;
  const characters = text.length;
  const paragraphs = text.split(/\n\s*\n/).filter(p => p.trim().length > 0).length;

  // Flesch Reading Ease Score
  const avgSentenceLength = words / sentences;
  const avgSyllables = text.match(/[aeiouAEIOU]/g)?.length || 0;
  const avgSyllablesPerWord = avgSyllables / words;
  const fleschScore = 206.835 - (1.015 * avgSentenceLength) - (84.6 * avgSyllablesPerWord);

  const complexity = {
    characters,
    words,
    sentences,
    paragraphs,
    avgWordsPerSentence: avgSentenceLength,
    avgSyllablesPerWord,
    fleschReadingEase: fleschScore,
    gradeLevel: Math.max(1, Math.min(12, Math.round((0.39 * avgSentenceLength) + (11.8 * avgSyllablesPerWord) - 15.59)))
  };

  complexityMetrics.push(complexity);

  // Determine passage type
  let type = 'narrative';
  if (title.toLowerCase().includes('art') || title.toLowerCase().includes('music') ||
      title.toLowerCase().includes('culture') || text.includes('artist') || text.includes('painting')) {
    type = 'arts-culture';
  } else if (title.toLowerCase().includes('science') || text.includes('research') ||
             text.includes('study') || text.includes('experiment')) {
    type = 'science-nature';
  } else if (text.includes('history') || text.includes('political') || text.includes('society')) {
    type = 'social-studies';
  } else if (text.includes('technology') || text.includes('computer') || text.includes('digital')) {
    type = 'technology';
  }

  if (!passageTypes[type]) {
    passageTypes[type] = [];
  }
  passageTypes[type].push({
    test_number: p.test_number,
    passage_number: p.passage_number,
    title: p.title,
    complexity
  });
});

englishAnalysis.passagePatterns = {
  types: passageTypes,
  complexity: {
    avgCharacters: Math.round(complexityMetrics.reduce((sum, c) => sum + c.characters, 0) / complexityMetrics.length),
    avgWords: Math.round(complexityMetrics.reduce((sum, c) => sum + c.words, 0) / complexityMetrics.length),
    avgSentences: Math.round(complexityMetrics.reduce((sum, c) => sum + c.sentences, 0) / complexityMetrics.length),
    avgGradeLevel: Math.round(complexityMetrics.reduce((sum, c) => sum + c.gradeLevel, 0) / complexityMetrics.length * 10) / 10,
    avgReadingEase: Math.round(complexityMetrics.reduce((sum, c) => sum + c.fleschReadingEase, 0) / complexityMetrics.length * 10) / 10
  }
};

// 3. DIFFICULTY PROGRESSION ANALYSIS
console.log('📈 Analyzing difficulty progression...');

const difficultyByPosition = {};
questions.forEach(q => {
  const position = q.question_number;
  if (!difficultyByPosition[position]) {
    difficultyByPosition[position] = [];
  }
  difficultyByPosition[position].push(q.difficulty_level);
});

// Calculate difficulty progression pattern
const difficultyProgression = [];
for (let i = 1; i <= 75; i++) {
  const difficulties = difficultyByPosition[i] || [];
  const easyCount = difficulties.filter(d => d === 'easy').length;
  const mediumCount = difficulties.filter(d => d === 'medium').length;
  const hardCount = difficulties.filter(d => d === 'hard').length;
  const total = difficulties.length;

  difficultyProgression.push({
    position: i,
    passageSection: Math.ceil(i / 15),
    positionInPassage: ((i - 1) % 15) + 1,
    easyPercent: total > 0 ? (easyCount / total) * 100 : 0,
    mediumPercent: total > 0 ? (mediumCount / total) * 100 : 0,
    hardPercent: total > 0 ? (hardCount / total) * 100 : 0,
    predominantDifficulty: easyCount >= mediumCount && easyCount >= hardCount ? 'easy' :
                          mediumCount >= hardCount ? 'medium' : 'hard'
  });
}

englishAnalysis.difficultyProgression = difficultyProgression;

// 4. GENERATION TEMPLATES
console.log('🛠️ Creating generation templates...');

// Grammar rule templates
const grammarTemplates = {};
for (const [category, examples] of Object.entries(englishAnalysis.grammarRules)) {
  grammarTemplates[category] = {
    frequency: examples.length,
    difficultyDistribution: {
      easy: examples.filter(e => e.difficulty === 'easy').length,
      medium: examples.filter(e => e.difficulty === 'medium').length,
      hard: examples.filter(e => e.difficulty === 'hard').length
    },
    commonPatterns: examples.slice(0, 3).map(e => ({
      underlined: e.underlined_text,
      correct: e.correct_answer
    }))
  };
}

// Passage templates
const passageTemplate = {
  targetLength: englishAnalysis.passagePatterns.complexity.avgCharacters,
  targetWords: englishAnalysis.passagePatterns.complexity.avgWords,
  targetGradeLevel: englishAnalysis.passagePatterns.complexity.avgGradeLevel,
  targetReadingEase: englishAnalysis.passagePatterns.complexity.avgReadingEase,
  typeDistribution: Object.fromEntries(
    Object.entries(passageTypes).map(([type, passages]) => [type, passages.length])
  )
};

englishAnalysis.generationTemplates = {
  grammar: grammarTemplates,
  passages: passageTemplate,
  questionSequence: {
    questionsPerPassage: 15,
    passagesPerTest: 5,
    rhetoricalQuestionPositions: [6, 9, 18, 30, 34, 37, 45, 54, 57, 60, 75], // Common positions
    difficultyProgression: difficultyProgression.map(d => ({
      position: d.position,
      recommendedDifficulty: d.predominantDifficulty
    }))
  }
};

// 5. SAVE RESULTS
const analysisDir = join(__dirname, '../../analysis-results');
if (!fs.existsSync(analysisDir)) {
  fs.mkdirSync(analysisDir, { recursive: true });
}

fs.writeFileSync(
  join(analysisDir, 'english-deep-analysis.json'),
  JSON.stringify(englishAnalysis, null, 2)
);

console.log('\n📊 ENGLISH ANALYSIS SUMMARY');
console.log('='.repeat(50));
console.log(`📝 Questions analyzed: ${questions.length}`);
console.log(`📚 Passages analyzed: ${passages.length}`);
console.log(`🎯 Grammar categories: ${Object.keys(englishAnalysis.grammarRules).length}`);
console.log(`📖 Passage types: ${Object.keys(passageTypes).length}`);
console.log(`📈 Avg passage length: ${englishAnalysis.passagePatterns.complexity.avgCharacters} characters`);
console.log(`🎓 Avg grade level: ${englishAnalysis.passagePatterns.complexity.avgGradeLevel}`);
console.log(`✅ English deep analysis complete!`);

export { englishAnalysis };