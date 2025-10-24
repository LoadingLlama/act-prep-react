#!/usr/bin/env node

/**
 * ANSWER CHOICE PATTERN ANALYZER
 * Ultra-deep analysis of answer choice structures and distractor generation patterns
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

console.log('🎯 ANSWER CHOICE PATTERN ANALYZER');
console.log('='.repeat(70));
console.log('🧬 Deep analysis of answer choices and distractor patterns\n');

const choiceAnalysis = {
  distractorPatterns: {},
  correctAnswerPatterns: {},
  choiceStructures: {},
  linguisticMarkers: {},
  mathematicalChoicePatterns: {},
  positionBiases: {},
  lengthPatterns: {},
  semanticPatterns: {}
};

// Advanced choice analysis functions
function analyzeChoiceStructure(choices, correctAnswer) {
  const choiceData = choices.map((choice, index) => {
    const letter = String.fromCharCode(65 + index); // A, B, C, D, E
    const isCorrect = letter === correctAnswer;

    return {
      letter,
      text: choice || '',
      isCorrect,
      length: (choice || '').length,
      wordCount: (choice || '').split(/\s+/).filter(w => w.length > 0).length,
      hasNumbers: /\d/.test(choice || ''),
      hasNegation: /\b(not|no|never|neither|none|nothing)\b/i.test(choice || ''),
      hasComparative: /\b(more|less|greater|smaller|larger|higher|lower|better|worse)\b/i.test(choice || ''),
      hasSuperlative: /\b(most|least|greatest|smallest|largest|highest|lowest|best|worst)\b/i.test(choice || ''),
      hasQuantifier: /\b(all|some|many|few|several|most|each|every)\b/i.test(choice || ''),
      hasModal: /\b(can|could|would|should|may|might|must|will)\b/i.test(choice || ''),
      startsWithCapital: /^[A-Z]/.test(choice || ''),
      endsWithPeriod: /\.$/.test(choice || ''),
      hasParentheses: /\([^)]*\)/.test(choice || ''),
      hasMathSymbols: /[+\-*/=<>≤≥≠∑∏√∫°]/.test(choice || ''),
      hasUnits: /\b(feet|inches|meters|pounds|gallons|degrees|percent|miles|hours|minutes|seconds|kg|cm|mm)\b/i.test(choice || ''),
      hasVariable: /\b[a-z]\b(?![a-z])/.test(choice || ''),
      hasFraction: /\b\d+\/\d+\b/.test(choice || ''),
      hasDecimal: /\b\d+\.\d+\b/.test(choice || ''),
      hasPercent: /\b\d+(\.\d+)?%\b/.test(choice || ''),
      isFormula: /^[a-zA-Z0-9+\-*/()=\s]+$/.test(choice || '') && /[+\-*/=]/.test(choice || ''),
      complexity: calculateChoiceComplexity(choice || '')
    };
  });

  return choiceData;
}

function calculateChoiceComplexity(choice) {
  let score = 0;
  score += choice.length * 0.01; // Length factor
  score += (choice.match(/\d/g) || []).length * 0.1; // Numbers
  score += (choice.match(/[+\-*/=<>]/g) || []).length * 0.3; // Math operators
  score += (choice.match(/\b[a-z]\b/g) || []).length * 0.2; // Variables
  score += (choice.match(/\([^)]*\)/g) || []).length * 0.4; // Parentheses groups
  score += (choice.split(/\s+/).length - 1) * 0.05; // Word count
  return Math.round(score * 100) / 100;
}

function analyzeDistractorPatterns(choiceData, section, questionType) {
  const correct = choiceData.find(c => c.isCorrect);
  const distractors = choiceData.filter(c => !c.isCorrect);

  const patterns = {
    lengthRelationship: {
      correctIsLongest: correct && correct.length === Math.max(...choiceData.map(c => c.length)),
      correctIsShortest: correct && correct.length === Math.min(...choiceData.map(c => c.length)),
      correctIsAverage: correct && Math.abs(correct.length - (choiceData.reduce((sum, c) => sum + c.length, 0) / choiceData.length)) < 10
    },

    complexityRelationship: {
      correctIsSimple: correct && correct.complexity < distractors.reduce((sum, d) => sum + d.complexity, 0) / distractors.length,
      correctIsComplex: correct && correct.complexity > distractors.reduce((sum, d) => sum + d.complexity, 0) / distractors.length
    },

    structuralPatterns: {
      correctHasNumbers: correct?.hasNumbers || false,
      distractorsWithNumbers: distractors.filter(d => d.hasNumbers).length,
      correctHasMath: correct?.hasMathSymbols || false,
      distractorsWithMath: distractors.filter(d => d.hasMathSymbols).length,
      correctHasNegation: correct?.hasNegation || false,
      distractorsWithNegation: distractors.filter(d => d.hasNegation).length
    },

    semanticPatterns: {
      hasOpposites: analyzeOppositeChoices(choiceData),
      hasNumericalProgression: analyzeNumericalProgression(choiceData),
      hasCommonDistractions: analyzeCommonDistractions(choiceData, section, questionType)
    },

    positionAnalysis: {
      correctPosition: correct?.letter || 'X',
      isFirstChoice: correct?.letter === 'A',
      isLastChoice: correct?.letter === choiceData[choiceData.length - 1]?.letter,
      isMiddleChoice: correct && !['A', choiceData[choiceData.length - 1]?.letter].includes(correct.letter)
    }
  };

  return patterns;
}

function analyzeOppositeChoices(choiceData) {
  const opposites = [
    ['increase', 'decrease'], ['higher', 'lower'], ['more', 'less'],
    ['positive', 'negative'], ['up', 'down'], ['left', 'right'],
    ['true', 'false'], ['yes', 'no'], ['all', 'none'],
    ['maximum', 'minimum'], ['greatest', 'least']
  ];

  const foundOpposites = [];
  for (const [word1, word2] of opposites) {
    const choices1 = choiceData.filter(c => new RegExp(`\\b${word1}\\b`, 'i').test(c.text));
    const choices2 = choiceData.filter(c => new RegExp(`\\b${word2}\\b`, 'i').test(c.text));
    if (choices1.length > 0 && choices2.length > 0) {
      foundOpposites.push({ word1, word2, choices1: choices1.map(c => c.letter), choices2: choices2.map(c => c.letter) });
    }
  }

  return foundOpposites;
}

function analyzeNumericalProgression(choiceData) {
  const numbers = choiceData.map(c => {
    const match = c.text.match(/^[A-Z]?\s*([+-]?\d+(?:\.\d+)?)/);
    return match ? parseFloat(match[1]) : null;
  }).filter(n => n !== null);

  if (numbers.length >= 3) {
    const sorted = [...numbers].sort((a, b) => a - b);
    const isArithmetic = sorted.length >= 3 &&
      Math.abs((sorted[1] - sorted[0]) - (sorted[2] - sorted[1])) < 0.001;
    const isGeometric = sorted.length >= 3 && sorted[0] > 0 && sorted[1] > 0 && sorted[2] > 0 &&
      Math.abs((sorted[1] / sorted[0]) - (sorted[2] / sorted[1])) < 0.001;

    return {
      hasProgression: true,
      numbers: sorted,
      isArithmetic,
      isGeometric,
      range: Math.max(...numbers) - Math.min(...numbers)
    };
  }

  return { hasProgression: false };
}

function analyzeCommonDistractions(choiceData, section, questionType) {
  const distractors = choiceData.filter(c => !c.isCorrect);
  const common = {
    offByFactor: false,
    offByConstant: false,
    hasUnitErrors: false,
    hasSignErrors: false,
    hasCalculationErrors: false
  };

  // Analyze if distractors are multiples/fractions of correct answer
  const correct = choiceData.find(c => c.isCorrect);
  if (correct && correct.hasNumbers) {
    const correctNum = parseFloat(correct.text.match(/[+-]?\d+(?:\.\d+)?/)?.[0] || '0');
    if (correctNum !== 0) {
      distractors.forEach(d => {
        if (d.hasNumbers) {
          const distNum = parseFloat(d.text.match(/[+-]?\d+(?:\.\d+)?/)?.[0] || '0');
          if (Math.abs(distNum / correctNum - 2) < 0.1 || Math.abs(distNum / correctNum - 0.5) < 0.1) {
            common.offByFactor = true;
          }
          if (Math.abs(distNum - correctNum - 1) < 0.1 || Math.abs(distNum - correctNum + 1) < 0.1) {
            common.offByConstant = true;
          }
        }
      });
    }
  }

  return common;
}

// Get all questions for choice analysis
console.log('🔄 Fetching questions for answer choice analysis...');

const [englishData, mathData, readingData, scienceData] = await Promise.all([
  supabase.from('act_english_questions').select('*').in('test_number', [1, 2]),
  supabase.from('act_math_questions').select('*').in('test_number', [1, 2]),
  supabase.from('act_reading_questions').select('*').in('test_number', [1, 2]),
  supabase.from('act_science_questions').select('*').in('test_number', [1, 2])
]);

const sections = [
  { name: 'english', data: englishData.data || [], choiceCount: 4 },
  { name: 'math', data: mathData.data || [], choiceCount: 5 },
  { name: 'reading', data: readingData.data || [], choiceCount: 4 },
  { name: 'science', data: scienceData.data || [], choiceCount: 4 }
];

console.log('🎯 Analyzing answer choice patterns...');

for (const section of sections) {
  console.log(`\n📊 Analyzing ${section.name.toUpperCase()} choices (${section.data.length} questions)...`);

  const sectionChoiceAnalysis = {
    choiceStructures: [],
    distractorPatterns: [],
    positionBiases: { A: 0, B: 0, C: 0, D: 0, E: 0 },
    lengthPatterns: { correct: [], distractors: [] },
    complexityPatterns: { correct: [], distractors: [] },
    structuralMarkers: {}
  };

  section.data.forEach((question, index) => {
    const choices = [
      question.choice_a,
      question.choice_b,
      question.choice_c,
      question.choice_d,
      section.choiceCount === 5 ? question.choice_e : null
    ].filter(Boolean);

    if (choices.length >= section.choiceCount) {
      const choiceStructure = analyzeChoiceStructure(choices, question.correct_answer);
      const distractorPattern = analyzeDistractorPatterns(
        choiceStructure,
        section.name,
        question.question_type
      );

      sectionChoiceAnalysis.choiceStructures.push({
        question_number: question.question_number,
        test_number: question.test_number,
        structure: choiceStructure,
        difficulty: question.difficulty_level
      });

      sectionChoiceAnalysis.distractorPatterns.push({
        question_number: question.question_number,
        patterns: distractorPattern
      });

      // Track position bias
      const correctChoice = choiceStructure.find(c => c.isCorrect);
      if (correctChoice) {
        sectionChoiceAnalysis.positionBiases[correctChoice.letter]++;
      }

      // Track length and complexity patterns
      const correct = choiceStructure.find(c => c.isCorrect);
      const distractors = choiceStructure.filter(c => !c.isCorrect);

      if (correct) {
        sectionChoiceAnalysis.lengthPatterns.correct.push(correct.length);
        sectionChoiceAnalysis.complexityPatterns.correct.push(correct.complexity);
      }

      distractors.forEach(d => {
        sectionChoiceAnalysis.lengthPatterns.distractors.push(d.length);
        sectionChoiceAnalysis.complexityPatterns.distractors.push(d.complexity);
      });
    }

    if (index % 30 === 0) {
      console.log(`  🔍 Processed ${index + 1}/${section.data.length} questions...`);
    }
  });

  // Calculate summary statistics
  const totalQuestions = Object.values(sectionChoiceAnalysis.positionBiases).reduce((sum, count) => sum + count, 0);
  const positionPercentages = Object.fromEntries(
    Object.entries(sectionChoiceAnalysis.positionBiases).map(([letter, count]) => [
      letter,
      Math.round((count / totalQuestions) * 100 * 10) / 10
    ])
  );

  const avgCorrectLength = sectionChoiceAnalysis.lengthPatterns.correct.reduce((sum, len) => sum + len, 0) /
    sectionChoiceAnalysis.lengthPatterns.correct.length;
  const avgDistractorLength = sectionChoiceAnalysis.lengthPatterns.distractors.reduce((sum, len) => sum + len, 0) /
    sectionChoiceAnalysis.lengthPatterns.distractors.length;

  sectionChoiceAnalysis.summary = {
    totalQuestions,
    positionPercentages,
    avgCorrectLength: Math.round(avgCorrectLength * 10) / 10,
    avgDistractorLength: Math.round(avgDistractorLength * 10) / 10,
    lengthRatio: Math.round((avgCorrectLength / avgDistractorLength) * 100) / 100
  };

  choiceAnalysis[section.name] = sectionChoiceAnalysis;

  console.log(`  ✅ Position distribution: ${Object.entries(positionPercentages).map(([k,v]) => `${k}:${v}%`).join(', ')}`);
  console.log(`  📏 Avg correct length: ${avgCorrectLength.toFixed(1)} vs distractors: ${avgDistractorLength.toFixed(1)}`);
}

// Save choice analysis
const analysisDir = join(__dirname, '../../analysis-results');
if (!fs.existsSync(analysisDir)) {
  fs.mkdirSync(analysisDir, { recursive: true });
}

fs.writeFileSync(
  join(analysisDir, 'answer-choice-patterns.json'),
  JSON.stringify(choiceAnalysis, null, 2)
);

console.log('\n🎉 ANSWER CHOICE ANALYSIS COMPLETE!');
console.log('='.repeat(70));
console.log('📊 Key findings:');

sections.forEach(section => {
  if (choiceAnalysis[section.name]) {
    const analysis = choiceAnalysis[section.name];
    console.log(`\n${section.name.toUpperCase()}:`);
    console.log(`  🎯 Position bias: ${Object.entries(analysis.summary.positionPercentages).sort((a,b) => b[1] - a[1])[0][0]} most common (${Object.entries(analysis.summary.positionPercentages).sort((a,b) => b[1] - a[1])[0][1]}%)`);
    console.log(`  📏 Length ratio (correct/distractor): ${analysis.summary.lengthRatio}`);
    console.log(`  📊 Total patterns analyzed: ${analysis.distractorPatterns.length}`);
  }
});

console.log('\n💾 Results saved to analysis-results/answer-choice-patterns.json');
console.log('🚀 Ready for distractor generation algorithms!');