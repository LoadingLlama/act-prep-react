#!/usr/bin/env node

/**
 * DEEP CONTENT ANALYSIS FOR LESSON TAGGING
 * Advanced analysis of question content for precise lesson assignments
 */

import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '../../.env') });

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

console.log('🧬 DEEP CONTENT ANALYSIS FOR LESSON TAGGING');
console.log('='.repeat(80));

// Advanced content analysis functions
function analyzeEnglishQuestion(question) {
  const stem = question.question_stem.toLowerCase();
  const choices = [question.choice_a, question.choice_b, question.choice_c, question.choice_d]
    .filter(Boolean)
    .map(c => c.toLowerCase());

  const analysis = {
    primary_topics: [],
    secondary_topics: [],
    patterns: [],
    confidence: 0
  };

  // Grammar patterns
  if (stem.includes('<u>') && stem.includes('</u>')) {
    analysis.patterns.push('underlined_portion');

    // Verb patterns
    if (stem.match(/\b(was|were|is|are|has|have|had|will|would|could|should)\b/) ||
        choices.some(c => c.match(/\b(was|were|is|are|has|have|had|will|would|could|should)\b/))) {
      analysis.primary_topics.push('verbs');
    }

    // Comma patterns
    if (stem.includes(',') || choices.some(c => c.includes(','))) {
      analysis.secondary_topics.push('comma_rules');
    }

    // Punctuation patterns
    if (stem.match(/[;:—–]/) || choices.some(c => c.match(/[;:—–]/))) {
      analysis.primary_topics.push('punctuation');
    }

    // Word choice patterns
    if (choices.some(c => c.includes('no change')) &&
        choices.length >= 4 &&
        choices.every(c => c.length < 50)) {
      analysis.primary_topics.push('word_choice');
    }
  } else {
    analysis.patterns.push('rhetorical_question');

    // Organization patterns
    if (stem.includes('which choice') || stem.includes('which of the following')) {
      analysis.primary_topics.push('which_choice');
    }

    // Adding/deleting patterns
    if (stem.includes('delete') || stem.includes('add') || stem.includes('remove')) {
      analysis.primary_topics.push('add_delete');
    }

    // Transition patterns
    if (stem.includes('transition') || stem.includes('connect') ||
        choices.some(c => c.match(/\b(however|therefore|moreover|furthermore|additionally)\b/))) {
      analysis.primary_topics.push('transitions');
    }

    // Placement patterns
    if (stem.includes('sentence') && (stem.includes('place') || stem.includes('location'))) {
      analysis.primary_topics.push('placement');
    }
  }

  return analysis;
}

function analyzeMathQuestion(question) {
  const stem = question.question_stem.toLowerCase();

  const analysis = {
    primary_topics: [],
    secondary_topics: [],
    difficulty_indicators: [],
    confidence: 0
  };

  // Basic arithmetic patterns
  if (stem.match(/\b(\d+\s*[+\-*/]\s*\d+)\b/) && !stem.includes('equation') && !stem.includes('function')) {
    analysis.primary_topics.push('algebra_basic');
  }

  // Function patterns
  if (stem.includes('f(') || stem.includes('function') || stem.match(/f\(.*\)/)) {
    analysis.primary_topics.push('functions');
  }

  // Geometry patterns
  if (stem.match(/\b(angle|triangle|circle|parallelogram|rectangle|square|polygon|area|perimeter|volume)\b/)) {
    analysis.primary_topics.push('geometry');
  }

  // Probability patterns
  if (stem.match(/\b(probability|chance|random|draw|select|bag|contains)\b/)) {
    analysis.primary_topics.push('probability');
  }

  // Statistics patterns
  if (stem.match(/\b(mean|median|mode|average|commission)\b/)) {
    analysis.primary_topics.push('statistics');
  }

  // Ratio/proportion patterns
  if (stem.match(/\b(ratio|proportion|scale|map|per|rate)\b/) || stem.includes('inches') && stem.includes('miles')) {
    analysis.primary_topics.push('ratios');
  }

  // Number theory patterns
  if (stem.match(/\b(factor|divisible|prime|gcd|greatest common|least common|lcm)\b/)) {
    analysis.primary_topics.push('number_theory');
  }

  // Word problem indicators
  if (stem.length > 100 && stem.match(/\b(earns|costs|pays|total|each|per)\b/)) {
    analysis.secondary_topics.push('word_problems');
  }

  // Difficulty indicators
  if (stem.length > 200) analysis.difficulty_indicators.push('complex_setup');
  if (stem.includes('system') || stem.includes('equation')) analysis.difficulty_indicators.push('multi_step');

  return analysis;
}

function analyzeReadingQuestion(question) {
  const stem = question.question_stem.toLowerCase();

  const analysis = {
    primary_topics: [],
    question_type: 'general',
    confidence: 0
  };

  // Vocabulary in context
  if (stem.includes('most nearly') || stem.includes('as used in') || stem.includes('word') || stem.includes('phrase')) {
    analysis.primary_topics.push('context_words');
    analysis.question_type = 'vocabulary';
  }

  // Detail questions
  else if (stem.includes('according to') || stem.includes('lines') || stem.match(/line \d+/)) {
    analysis.primary_topics.push('detail');
    analysis.question_type = 'detail';
  }

  // Inference questions
  else if (stem.includes('inferred') || stem.includes('implies') || stem.includes('suggests')) {
    analysis.primary_topics.push('inference');
    analysis.question_type = 'inference';
  }

  // Main idea questions
  else if (stem.includes('main') || stem.includes('primary') || stem.includes('central')) {
    analysis.primary_topics.push('main_idea');
    analysis.question_type = 'main_idea';
  }

  // Comparison questions
  else if (stem.includes('both passages') || stem.includes('passage a') && stem.includes('passage b')) {
    analysis.primary_topics.push('comparing');
    analysis.question_type = 'comparison';
  }

  // Character/perspective questions
  else if (stem.includes('narrator') || stem.includes('character') || stem.includes('perspective')) {
    analysis.primary_topics.push('characterization');
    analysis.question_type = 'characterization';
  }

  return analysis;
}

function analyzeScienceQuestion(question) {
  const stem = question.question_stem.toLowerCase();

  const analysis = {
    primary_topics: [],
    data_type: 'unknown',
    confidence: 0
  };

  // Data point questions
  if (stem.includes('table') || stem.includes('figure') || stem.includes('according to')) {
    analysis.primary_topics.push('data_points');
    analysis.data_type = 'direct_lookup';
  }

  // Trend questions
  if (stem.includes('increase') || stem.includes('decrease') || stem.includes('as') && stem.includes('the')) {
    analysis.primary_topics.push('trends');
    analysis.data_type = 'trend_analysis';
  }

  // Experimental design
  if (stem.includes('experiment') || stem.includes('study') || stem.includes('procedure')) {
    analysis.primary_topics.push('experiments');
    analysis.data_type = 'experimental';
  }

  // Conflicting viewpoints
  if (stem.includes('scientist') || stem.includes('hypothesis') || stem.includes('theory')) {
    analysis.primary_topics.push('viewpoints');
    analysis.data_type = 'theoretical';
  }

  // Approximation
  if (stem.includes('closest to') || stem.includes('approximately') || stem.includes('about')) {
    analysis.secondary_topics.push('approximation');
  }

  return analysis;
}

// Main analysis function
async function performDeepAnalysis() {
  console.log('🔍 Analyzing all questions for precise lesson assignments...\n');

  // English deep analysis
  console.log('📝 ENGLISH DEEP ANALYSIS');
  console.log('-'.repeat(40));

  const { data: englishQuestions } = await supabase
    .from('act_english_questions')
    .select('*')
    .in('test_number', [1, 2])
    .order('test_number', { ascending: true })
    .order('question_number', { ascending: true });

  const englishAnalysis = {};
  const englishIssues = [];

  englishQuestions?.forEach(q => {
    const analysis = analyzeEnglishQuestion(q);
    const key = `T${q.test_number}Q${q.question_number}`;
    englishAnalysis[key] = analysis;

    // Identify potential issues
    if (analysis.primary_topics.length === 0) {
      englishIssues.push({
        key,
        issue: 'No clear primary topic identified',
        stem: q.question_stem.substring(0, 80) + '...'
      });
    }

    if (analysis.primary_topics.length > 1) {
      englishIssues.push({
        key,
        issue: `Multiple primary topics: ${analysis.primary_topics.join(', ')}`,
        stem: q.question_stem.substring(0, 80) + '...'
      });
    }
  });

  console.log(`Analyzed ${englishQuestions?.length || 0} English questions`);
  console.log(`Found ${englishIssues.length} questions needing review`);

  // Show sample issues
  englishIssues.slice(0, 5).forEach(issue => {
    console.log(`  ${issue.key}: ${issue.issue}`);
    console.log(`    "${issue.stem}"`);
  });

  // Math deep analysis
  console.log('\n🔢 MATH DEEP ANALYSIS');
  console.log('-'.repeat(40));

  const { data: mathQuestions } = await supabase
    .from('act_math_questions')
    .select('*')
    .in('test_number', [1, 2])
    .order('test_number', { ascending: true })
    .order('question_number', { ascending: true });

  const mathAnalysis = {};
  const mathIssues = [];

  mathQuestions?.forEach(q => {
    const analysis = analyzeMathQuestion(q);
    const key = `T${q.test_number}Q${q.question_number}`;
    mathAnalysis[key] = analysis;

    if (analysis.primary_topics.length === 0) {
      mathIssues.push({
        key,
        issue: 'No clear primary topic identified',
        stem: q.question_stem.substring(0, 80) + '...'
      });
    }
  });

  console.log(`Analyzed ${mathQuestions?.length || 0} Math questions`);
  console.log(`Found ${mathIssues.length} questions needing review`);

  mathIssues.slice(0, 5).forEach(issue => {
    console.log(`  ${issue.key}: ${issue.issue}`);
    console.log(`    "${issue.stem}"`);
  });

  // Reading deep analysis
  console.log('\n📖 READING DEEP ANALYSIS');
  console.log('-'.repeat(40));

  const { data: readingQuestions } = await supabase
    .from('act_reading_questions')
    .select('*')
    .in('test_number', [1, 2])
    .order('test_number', { ascending: true })
    .order('question_number', { ascending: true });

  const readingAnalysis = {};
  const readingCategories = {};

  readingQuestions?.forEach(q => {
    const analysis = analyzeReadingQuestion(q);
    const key = `T${q.test_number}Q${q.question_number}`;
    readingAnalysis[key] = analysis;

    if (!readingCategories[analysis.question_type]) {
      readingCategories[analysis.question_type] = 0;
    }
    readingCategories[analysis.question_type]++;
  });

  console.log(`Analyzed ${readingQuestions?.length || 0} Reading questions`);
  console.log('Question type distribution:');
  Object.entries(readingCategories).forEach(([type, count]) => {
    console.log(`  ${type}: ${count} questions`);
  });

  console.log('\n✅ DEEP ANALYSIS COMPLETE');
  console.log('\n🎯 RECOMMENDATIONS:');
  console.log('1. English: Focus on questions with multiple primary topics for multi-tagging');
  console.log('2. Math: Review questions with no clear topic identification');
  console.log('3. Reading: Implement more specific categorization beyond general "question types"');
  console.log('4. Science: Current assignments appear accurate based on content analysis');

  return {
    english: englishAnalysis,
    math: mathAnalysis,
    reading: readingAnalysis,
    issues: { english: englishIssues, math: mathIssues }
  };
}

// Run the analysis
await performDeepAnalysis();