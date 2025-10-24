#!/usr/bin/env node

/**
 * COMPREHENSIVE ACT REVERSE ENGINEERING ANALYSIS
 * Deep analysis of Test 1 & Test 2 to extract patterns for test generation
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

console.log('🔬 COMPREHENSIVE ACT REVERSE ENGINEERING ANALYSIS');
console.log('='.repeat(80));
console.log('🎯 Extracting patterns from Test 1 & Test 2 for 1:1 accurate test generation\n');

const analysisResults = {
  metadata: {
    timestamp: new Date().toISOString(),
    testsAnalyzed: [1, 2],
    totalQuestions: 0,
    analysisVersion: '1.0.0'
  },
  english: {},
  math: {},
  reading: {},
  science: {},
  crossSection: {},
  generation: {}
};

// Helper function to calculate statistics
function calculateStats(values) {
  const sorted = values.sort((a, b) => a - b);
  return {
    count: values.length,
    min: Math.min(...values),
    max: Math.max(...values),
    mean: values.reduce((sum, val) => sum + val, 0) / values.length,
    median: sorted[Math.floor(sorted.length / 2)],
    standardDeviation: Math.sqrt(values.reduce((sum, val) => sum + Math.pow(val - (values.reduce((s, v) => s + v, 0) / values.length), 2), 0) / values.length)
  };
}

// 1. ENGLISH SECTION ANALYSIS
console.log('📝 ANALYZING ENGLISH SECTION...');
console.log('='.repeat(50));

const { data: allEnglishQuestions } = await supabase
  .from('act_english_questions')
  .select('*')
  .in('test_number', [1, 2])
  .order('test_number, question_number');

const { data: allEnglishPassages } = await supabase
  .from('act_english_passages')
  .select('*')
  .in('test_number', [1, 2])
  .order('test_number, passage_number');

if (allEnglishQuestions && allEnglishPassages) {
  console.log(`📊 Analyzing ${allEnglishQuestions.length} English questions across ${allEnglishPassages.length} passages`);

  // Question type distribution
  const questionTypes = {};
  const difficultyByPosition = {};
  const passageQuestionCounts = {};

  allEnglishQuestions.forEach(q => {
    const type = q.question_type || 'unknown';
    questionTypes[type] = (questionTypes[type] || 0) + 1;

    const position = q.question_number;
    difficultyByPosition[position] = difficultyByPosition[position] || [];
    difficultyByPosition[position].push(q.difficulty_level);

    const passage = q.passage_number || Math.ceil(q.question_number / 15);
    passageQuestionCounts[passage] = (passageQuestionCounts[passage] || 0) + 1;
  });

  // Passage analysis
  const passageLengths = allEnglishPassages.map(p => p.passage_text?.length || 0);
  const passageComplexity = allEnglishPassages.map(p => {
    const text = p.passage_text || '';
    const sentences = text.split(/[.!?]+/).length;
    const words = text.split(/\s+/).length;
    return {
      sentences,
      words,
      avgWordsPerSentence: words / sentences,
      readabilityScore: Math.max(0, 206.835 - (1.015 * (words / sentences)) - (84.6 * (text.match(/[aeiouAEIOU]/g)?.length || 0) / words))
    };
  });

  analysisResults.english = {
    questionTypes,
    totalQuestions: allEnglishQuestions.length,
    passagesPerTest: allEnglishPassages.length / 2,
    questionsPerPassage: passageQuestionCounts,
    difficultyProgression: difficultyByPosition,
    passageStats: {
      lengths: calculateStats(passageLengths),
      complexity: {
        sentences: calculateStats(passageComplexity.map(p => p.sentences)),
        words: calculateStats(passageComplexity.map(p => p.words)),
        avgWordsPerSentence: calculateStats(passageComplexity.map(p => p.avgWordsPerSentence)),
        readability: calculateStats(passageComplexity.map(p => p.readabilityScore))
      }
    }
  };

  console.log(`✅ English analysis complete: ${Object.keys(questionTypes).length} question types identified`);
}

// 2. MATH SECTION ANALYSIS
console.log('\n🔢 ANALYZING MATH SECTION...');
console.log('='.repeat(50));

const { data: allMathQuestions } = await supabase
  .from('act_math_questions')
  .select('*')
  .in('test_number', [1, 2])
  .order('test_number, question_number');

if (allMathQuestions) {
  console.log(`📊 Analyzing ${allMathQuestions.length} Math questions`);

  const mathTopics = {};
  const difficultyProgression = {};
  const questionLengths = [];
  const choicePatterns = {};

  allMathQuestions.forEach(q => {
    const topic = q.question_type || 'unknown';
    mathTopics[topic] = (mathTopics[topic] || 0) + 1;

    const position = q.question_number;
    difficultyProgression[position] = difficultyProgression[position] || [];
    difficultyProgression[position].push(q.difficulty_level);

    const stemLength = q.question_stem?.length || 0;
    questionLengths.push(stemLength);

    // Analyze choice patterns
    const choices = [q.choice_a, q.choice_b, q.choice_c, q.choice_d, q.choice_e].filter(Boolean);
    const choiceCount = choices.length;
    choicePatterns[choiceCount] = (choicePatterns[choiceCount] || 0) + 1;
  });

  analysisResults.math = {
    topics: mathTopics,
    totalQuestions: allMathQuestions.length,
    difficultyProgression,
    questionComplexity: {
      stemLengths: calculateStats(questionLengths)
    },
    choicePatterns,
    topicsByDifficulty: {}
  };

  // Analyze topic difficulty distribution
  ['easy', 'medium', 'hard'].forEach(difficulty => {
    const topicsAtDifficulty = {};
    allMathQuestions
      .filter(q => q.difficulty_level === difficulty)
      .forEach(q => {
        const topic = q.question_type || 'unknown';
        topicsAtDifficulty[topic] = (topicsAtDifficulty[topic] || 0) + 1;
      });
    analysisResults.math.topicsByDifficulty[difficulty] = topicsAtDifficulty;
  });

  console.log(`✅ Math analysis complete: ${Object.keys(mathTopics).length} topics identified`);
}

// 3. READING SECTION ANALYSIS
console.log('\n📖 ANALYZING READING SECTION...');
console.log('='.repeat(50));

const { data: allReadingQuestions } = await supabase
  .from('act_reading_questions')
  .select('*')
  .in('test_number', [1, 2])
  .order('test_number, question_number');

const { data: allReadingPassages } = await supabase
  .from('act_reading_passages')
  .select('*')
  .in('test_number', [1, 2])
  .order('test_number, passage_number');

if (allReadingQuestions && allReadingPassages) {
  console.log(`📊 Analyzing ${allReadingQuestions.length} Reading questions across ${allReadingPassages.length} passages`);

  const questionTypes = {};
  const passageTypes = {};
  const questionsByPassage = {};

  allReadingQuestions.forEach(q => {
    const type = q.question_type || 'unknown';
    questionTypes[type] = (questionTypes[type] || 0) + 1;

    const passageId = q.passage_id || `passage_${Math.ceil(q.question_number / 10)}`;
    questionsByPassage[passageId] = (questionsByPassage[passageId] || 0) + 1;
  });

  // Analyze passage characteristics
  const passageLengths = allReadingPassages.map(p => p.passage_text?.length || 0);
  const passageComplexity = allReadingPassages.map(p => {
    const text = p.passage_text || '';
    const sentences = text.split(/[.!?]+/).length;
    const words = text.split(/\s+/).length;
    const paragraphs = text.split(/\n\s*\n/).length;
    return {
      sentences,
      words,
      paragraphs,
      avgWordsPerSentence: words / sentences,
      avgSentencesPerParagraph: sentences / paragraphs
    };
  });

  allReadingPassages.forEach(p => {
    // Classify passage type based on title and content
    const title = p.title?.toLowerCase() || '';
    const content = p.passage_text?.toLowerCase() || '';

    let type = 'prose-fiction';
    if (title.includes('social') || content.includes('society') || content.includes('politics')) {
      type = 'social-science';
    } else if (title.includes('natural') || content.includes('scientific') || content.includes('research')) {
      type = 'natural-science';
    } else if (title.includes('humanities') || content.includes('art') || content.includes('literature')) {
      type = 'humanities';
    }

    passageTypes[type] = (passageTypes[type] || 0) + 1;
  });

  analysisResults.reading = {
    questionTypes,
    passageTypes,
    totalQuestions: allReadingQuestions.length,
    passagesPerTest: allReadingPassages.length / 2,
    questionsPerPassage: Object.values(questionsByPassage),
    passageStats: {
      lengths: calculateStats(passageLengths),
      complexity: {
        sentences: calculateStats(passageComplexity.map(p => p.sentences)),
        words: calculateStats(passageComplexity.map(p => p.words)),
        paragraphs: calculateStats(passageComplexity.map(p => p.paragraphs)),
        avgWordsPerSentence: calculateStats(passageComplexity.map(p => p.avgWordsPerSentence))
      }
    }
  };

  console.log(`✅ Reading analysis complete: ${Object.keys(questionTypes).length} question types, ${Object.keys(passageTypes).length} passage types`);
}

// 4. SCIENCE SECTION ANALYSIS
console.log('\n🔬 ANALYZING SCIENCE SECTION...');
console.log('='.repeat(50));

const { data: allScienceQuestions } = await supabase
  .from('act_science_questions')
  .select('*')
  .in('test_number', [1, 2])
  .order('test_number, question_number');

if (allScienceQuestions) {
  console.log(`📊 Analyzing ${allScienceQuestions.length} Science questions`);

  const questionTypes = {};
  const difficultyProgression = {};
  const stemComplexity = [];

  allScienceQuestions.forEach(q => {
    const type = q.question_type || 'unknown';
    questionTypes[type] = (questionTypes[type] || 0) + 1;

    const position = q.question_number;
    difficultyProgression[position] = difficultyProgression[position] || [];
    difficultyProgression[position].push(q.difficulty_level);

    const stemLength = q.question_stem?.length || 0;
    stemComplexity.push(stemLength);
  });

  analysisResults.science = {
    questionTypes,
    totalQuestions: allScienceQuestions.length,
    difficultyProgression,
    questionComplexity: {
      stemLengths: calculateStats(stemComplexity)
    }
  };

  console.log(`✅ Science analysis complete: ${Object.keys(questionTypes).length} question types identified`);
}

// 5. CROSS-SECTION ANALYSIS
console.log('\n⚡ CROSS-SECTION ANALYSIS...');
console.log('='.repeat(50));

const allQuestions = [
  ...(allEnglishQuestions || []).map(q => ({ ...q, section: 'english' })),
  ...(allMathQuestions || []).map(q => ({ ...q, section: 'math' })),
  ...(allReadingQuestions || []).map(q => ({ ...q, section: 'reading' })),
  ...(allScienceQuestions || []).map(q => ({ ...q, section: 'science' }))
];

const difficultyDistribution = {};
const sectionDifficulties = {};

allQuestions.forEach(q => {
  const difficulty = q.difficulty_level || 'unknown';
  difficultyDistribution[difficulty] = (difficultyDistribution[difficulty] || 0) + 1;

  if (!sectionDifficulties[q.section]) {
    sectionDifficulties[q.section] = {};
  }
  sectionDifficulties[q.section][difficulty] = (sectionDifficulties[q.section][difficulty] || 0) + 1;
});

analysisResults.crossSection = {
  totalQuestions: allQuestions.length,
  difficultyDistribution,
  sectionDifficulties,
  sectionSizes: {
    english: allEnglishQuestions?.length || 0,
    math: allMathQuestions?.length || 0,
    reading: allReadingQuestions?.length || 0,
    science: allScienceQuestions?.length || 0
  }
};

analysisResults.metadata.totalQuestions = allQuestions.length;

console.log(`✅ Cross-section analysis complete: ${allQuestions.length} total questions analyzed`);

// 6. SAVE ANALYSIS RESULTS
console.log('\n💾 SAVING ANALYSIS RESULTS...');
console.log('='.repeat(50));

const analysisDir = join(__dirname, '../../analysis-results');
if (!fs.existsSync(analysisDir)) {
  fs.mkdirSync(analysisDir, { recursive: true });
}

// Save detailed JSON
fs.writeFileSync(
  join(analysisDir, 'comprehensive-act-analysis.json'),
  JSON.stringify(analysisResults, null, 2)
);

console.log('✅ Analysis results saved to analysis-results/comprehensive-act-analysis.json');

// 7. DISPLAY SUMMARY
console.log('\n📊 ANALYSIS SUMMARY');
console.log('='.repeat(80));
console.log(`🎯 Tests Analyzed: ${analysisResults.metadata.testsAnalyzed.join(', ')}`);
console.log(`📈 Total Questions: ${analysisResults.metadata.totalQuestions}`);
console.log(`📝 English: ${analysisResults.english.totalQuestions || 0} questions, ${analysisResults.english.passagesPerTest || 0} passages per test`);
console.log(`🔢 Math: ${analysisResults.math.totalQuestions || 0} questions, ${Object.keys(analysisResults.math.topics || {}).length} topics`);
console.log(`📖 Reading: ${analysisResults.reading.totalQuestions || 0} questions, ${analysisResults.reading.passagesPerTest || 0} passages per test`);
console.log(`🔬 Science: ${analysisResults.science.totalQuestions || 0} questions, ${Object.keys(analysisResults.science.questionTypes || {}).length} question types`);

console.log('\n🎉 COMPREHENSIVE ANALYSIS COMPLETE!');
console.log('📋 Ready for test generation framework development');
console.log('📊 HTML report will be generated with all statistics and insights\n');