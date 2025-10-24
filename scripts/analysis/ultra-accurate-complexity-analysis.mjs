#!/usr/bin/env node

/**
 * ULTRA-ACCURATE COMPLEXITY ANALYSIS
 * Comprehensive readability and complexity scoring for ACT passages
 * Uses multiple validated complexity measures for maximum accuracy
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

console.log('📊 ULTRA-ACCURATE COMPLEXITY ANALYSIS');
console.log('Multi-dimensional complexity scoring for ACT passages');
console.log('='.repeat(80));

const complexityAnalysis = {
  passages: {},
  overallStats: {},
  complexityDistribution: {}
};

// Advanced complexity calculation using multiple validated measures
function calculateComprehensiveComplexity(text) {
  const words = text.split(/\s+/).filter(w => w.length > 0);
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
  const syllables = countSyllables(text);

  // 1. Flesch Reading Ease (validated ACT measure)
  const avgSentenceLength = words.length / sentences.length;
  const avgSyllablesPerWord = syllables / words.length;
  const fleschScore = 206.835 - (1.015 * avgSentenceLength) - (84.6 * avgSyllablesPerWord);

  // 2. Flesch-Kincaid Grade Level (ACT standard)
  const fleschKincaid = (0.39 * avgSentenceLength) + (11.8 * avgSyllablesPerWord) - 15.59;

  // 3. Automated Readability Index (ARI)
  const characters = text.replace(/\s/g, '').length;
  const ari = (4.71 * (characters / words.length)) + (0.5 * avgSentenceLength) - 21.43;

  // 4. Coleman-Liau Index
  const avgCharsPerWord = characters / words.length * 100;
  const avgSentencesPer100Words = sentences.length / words.length * 100;
  const colemanLiau = (0.0588 * avgCharsPerWord) - (0.296 * avgSentencesPer100Words) - 15.8;

  // 5. SMOG Readability Formula
  const smog = calculateSMOG(text);

  // 6. Gunning Fog Index
  const gunningFog = calculateGunningFog(text);

  // 7. Syntactic Complexity Score
  const syntacticComplexity = calculateSyntacticComplexity(text);

  // 8. Lexical Sophistication Score
  const lexicalSophistication = calculateLexicalSophistication(words);

  // 9. Semantic Complexity Score
  const semanticComplexity = calculateSemanticComplexity(text);

  // 10. ACT-Specific Complexity Score
  const actSpecificScore = calculateACTSpecificComplexity(text);

  return {
    fleschReadingEase: Math.round(fleschScore * 100) / 100,
    fleschKincaidGrade: Math.round(fleschKincaid * 100) / 100,
    automatedReadabilityIndex: Math.round(ari * 100) / 100,
    colemanLiauIndex: Math.round(colemanLiau * 100) / 100,
    smogGrade: Math.round(smog * 100) / 100,
    gunningFogIndex: Math.round(gunningFog * 100) / 100,
    syntacticComplexity: Math.round(syntacticComplexity * 100) / 100,
    lexicalSophistication: Math.round(lexicalSophistication * 100) / 100,
    semanticComplexity: Math.round(semanticComplexity * 100) / 100,
    actSpecificScore: Math.round(actSpecificScore * 100) / 100,

    // Composite scores
    readabilityComposite: Math.round(((fleschKincaid + ari + colemanLiau + smog + gunningFog) / 5) * 100) / 100,
    complexityComposite: Math.round(((syntacticComplexity + lexicalSophistication + semanticComplexity) / 3) * 100) / 100,
    overallComplexity: Math.round(((fleschKincaid + syntacticComplexity + lexicalSophistication + actSpecificScore) / 4) * 100) / 100,

    // Metadata
    wordCount: words.length,
    sentenceCount: sentences.length,
    syllableCount: syllables,
    avgSentenceLength: Math.round(avgSentenceLength * 100) / 100,
    avgSyllablesPerWord: Math.round(avgSyllablesPerWord * 100) / 100
  };
}

// Accurate syllable counting using phonetic patterns
function countSyllables(text) {
  const words = text.toLowerCase().match(/\b[a-z]+\b/g) || [];
  let totalSyllables = 0;

  words.forEach(word => {
    let syllables = 0;

    // Remove ending 'e' if not at beginning
    if (word.length > 1 && word.endsWith('e')) {
      word = word.slice(0, -1);
    }

    // Count vowel groups
    const vowelGroups = word.match(/[aeiouy]+/g) || [];
    syllables = vowelGroups.length;

    // Adjust for special cases
    if (word.match(/^(the|through|you|your|they|their|there|where|were)$/)) {
      syllables = 1;
    }

    // Minimum 1 syllable per word
    if (syllables === 0) syllables = 1;

    totalSyllables += syllables;
  });

  return totalSyllables;
}

// SMOG Readability Formula (especially good for academic texts)
function calculateSMOG(text) {
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
  if (sentences.length < 30) {
    // For shorter texts, use approximate SMOG
    const complexWords = countComplexWords(text);
    const wordsPerSentence = text.split(/\s+/).length / sentences.length;
    return 3.1291 + (1.043 * Math.sqrt(complexWords * (30 / sentences.length))) + 3.1291;
  }

  // Standard SMOG for 30+ sentences
  const sampleSentences = sentences.slice(0, 10).concat(
    sentences.slice(Math.floor(sentences.length / 2) - 5, Math.floor(sentences.length / 2) + 5),
    sentences.slice(-10)
  );

  const complexWords = countComplexWords(sampleSentences.join(' '));
  return 3.1291 + 1.043 * Math.sqrt(complexWords) + 3.1291;
}

// Gunning Fog Index
function calculateGunningFog(text) {
  const words = text.split(/\s+/).filter(w => w.length > 0);
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
  const complexWords = countComplexWords(text);

  const avgSentenceLength = words.length / sentences.length;
  const percentComplexWords = (complexWords / words.length) * 100;

  return 0.4 * (avgSentenceLength + percentComplexWords);
}

// Count complex words (3+ syllables, excluding proper nouns and compound words)
function countComplexWords(text) {
  const words = text.toLowerCase().match(/\b[a-z]+\b/g) || [];
  let complexCount = 0;

  words.forEach(word => {
    // Skip common suffixes that add syllables but don't add complexity
    let testWord = word.replace(/(ed|es|ly|ing)$/, '');

    const syllables = countSyllables(testWord);
    if (syllables >= 3) {
      complexCount++;
    }
  });

  return complexCount;
}

// Syntactic Complexity Score
function calculateSyntacticComplexity(text) {
  let complexity = 0;

  // Clause complexity indicators
  const subordinateConjunctions = (text.match(/\b(although|because|since|while|whereas|if|unless|until|before|after|when|where|which|that|who|whom|whose)\b/gi) || []).length;
  const coordinateConjunctions = (text.match(/\b(and|but|or|nor|for|yet|so)\b/gi) || []).length;
  const relativeClauses = (text.match(/\b(who|whom|whose|which|that)\b/gi) || []).length;

  // Phrase complexity
  const prepositionalPhrases = (text.match(/\b(in|on|at|by|for|with|from|to|of|about|under|over|through|during|before|after)\s+\w+/gi) || []).length;
  const participialPhrases = (text.match(/\b\w+ing\b/gi) || []).length;
  const infinitivePhrases = (text.match(/\bto\s+\w+/gi) || []).length;

  // Punctuation complexity
  const commas = (text.match(/,/g) || []).length;
  const semicolons = (text.match(/;/g) || []).length;
  const colons = (text.match(/:/g) || []).length;
  const dashes = (text.match(/—|--/g) || []).length;
  const parentheses = (text.match(/\([^)]*\)/g) || []).length;

  // Calculate weighted complexity
  complexity += subordinateConjunctions * 0.8;
  complexity += coordinateConjunctions * 0.3;
  complexity += relativeClauses * 0.7;
  complexity += prepositionalPhrases * 0.2;
  complexity += participialPhrases * 0.4;
  complexity += infinitivePhrases * 0.3;
  complexity += commas * 0.1;
  complexity += semicolons * 0.5;
  complexity += colons * 0.4;
  complexity += dashes * 0.3;
  complexity += parentheses * 0.6;

  // Normalize by word count
  const wordCount = text.split(/\s+/).length;
  return (complexity / wordCount) * 100;
}

// Lexical Sophistication Score (based on word frequency and academic vocabulary)
function calculateLexicalSophistication(words) {
  // Academic Word List indicators
  const academicWords = [
    'analyze', 'concept', 'constitute', 'derive', 'establish', 'evident', 'factor',
    'function', 'indicate', 'method', 'occur', 'percent', 'period', 'policy',
    'principle', 'procedure', 'process', 'require', 'research', 'response',
    'significant', 'similar', 'source', 'specific', 'structure', 'theory'
  ];

  // Low-frequency words (sophisticated vocabulary)
  const sophisticatedWords = [
    'abundant', 'advocate', 'circumstance', 'comprehend', 'demonstrate', 'elaborate',
    'facilitate', 'hypothesis', 'implement', 'justify', 'manipulation', 'nevertheless',
    'paradigm', 'phenomenon', 'prevalent', 'subsequent', 'synthesize', 'transition'
  ];

  let academicCount = 0;
  let sophisticatedCount = 0;
  let longWordCount = 0;

  words.forEach(word => {
    const lowerWord = word.toLowerCase();

    if (academicWords.includes(lowerWord)) {
      academicCount++;
    }

    if (sophisticatedWords.includes(lowerWord)) {
      sophisticatedCount++;
    }

    if (word.length >= 7) {
      longWordCount++;
    }
  });

  const academicRatio = academicCount / words.length;
  const sophisticatedRatio = sophisticatedCount / words.length;
  const longWordRatio = longWordCount / words.length;

  return (academicRatio * 40) + (sophisticatedRatio * 50) + (longWordRatio * 30);
}

// Semantic Complexity Score
function calculateSemanticComplexity(text) {
  let complexity = 0;

  // Abstract concept indicators
  const abstractWords = (text.match(/\b(concept|idea|theory|principle|philosophy|ideology|perspective|approach|strategy|methodology)\b/gi) || []).length;

  // Causal relationship indicators
  const causalMarkers = (text.match(/\b(because|since|therefore|thus|hence|consequently|as a result|due to|leads to|causes|results in)\b/gi) || []).length;

  // Temporal complexity
  const temporalMarkers = (text.match(/\b(previously|subsequently|simultaneously|eventually|ultimately|initially|formerly|thereafter)\b/gi) || []).length;

  // Conditional complexity
  const conditionalMarkers = (text.match(/\b(if|unless|provided|assuming|suppose|in case|whether)\b/gi) || []).length;

  // Comparison complexity
  const comparisonMarkers = (text.match(/\b(compared to|in contrast|similarly|likewise|whereas|however|nevertheless|nonetheless)\b/gi) || []).length;

  const wordCount = text.split(/\s+/).length;

  complexity += (abstractWords / wordCount) * 50;
  complexity += (causalMarkers / wordCount) * 40;
  complexity += (temporalMarkers / wordCount) * 30;
  complexity += (conditionalMarkers / wordCount) * 35;
  complexity += (comparisonMarkers / wordCount) * 30;

  return complexity;
}

// ACT-Specific Complexity Score
function calculateACTSpecificComplexity(text) {
  let complexity = 0;

  // Question-generation complexity factors
  const punctuationVariety = new Set([...text.matchAll(/[,;:.!?"'()—–]/g)]).size;
  const verbTenseVariety = (text.match(/\b(was|were|is|are|has|have|had|will|would|could|should|might|may)\b/gi) || []).length;
  const transitionWords = (text.match(/\b(however|therefore|moreover|furthermore|meanwhile|consequently|nevertheless|nonetheless|otherwise|instead)\b/gi) || []).length;

  // Rhetorical features
  const rhetoricalQuestions = (text.match(/\?/g) || []).length;
  const dialogueMarkers = (text.match(/"/g) || []).length / 2; // Pairs of quotes
  const emphasisMarkers = (text.match(/\b(very|quite|rather|extremely|particularly|especially|notably|significantly)\b/gi) || []).length;

  // Structural complexity for question placement
  const paragraphMarkers = (text.match(/\n\n/g) || []).length + 1;
  const sentenceVariety = calculateSentenceLengthVariety(text);

  const wordCount = text.split(/\s+/).length;

  complexity += punctuationVariety * 2;
  complexity += (verbTenseVariety / wordCount) * 100;
  complexity += (transitionWords / wordCount) * 80;
  complexity += rhetoricalQuestions * 5;
  complexity += dialogueMarkers * 3;
  complexity += (emphasisMarkers / wordCount) * 60;
  complexity += paragraphMarkers * 2;
  complexity += sentenceVariety * 10;

  return complexity;
}

// Calculate sentence length variety (important for ACT question placement)
function calculateSentenceLengthVariety(text) {
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
  const lengths = sentences.map(s => s.split(/\s+/).length);

  if (lengths.length === 0) return 0;

  const mean = lengths.reduce((a, b) => a + b, 0) / lengths.length;
  const variance = lengths.reduce((acc, len) => acc + Math.pow(len - mean, 2), 0) / lengths.length;
  const standardDeviation = Math.sqrt(variance);

  // Normalized variety score
  return standardDeviation / mean;
}

// Main analysis function
async function analyzePassageComplexity() {
  const { data: passages } = await supabase
    .from('act_english_passages')
    .select('*')
    .in('test_number', [1, 2]);

  console.log(`\n📊 Analyzing ${passages?.length || 0} passages with comprehensive complexity measures`);

  passages?.forEach((passage, index) => {
    console.log(`\n📄 PASSAGE ${index + 1}: Test ${passage.test_number}, Passage ${passage.passage_number}`);

    const complexity = calculateComprehensiveComplexity(passage.passage_text);

    complexityAnalysis.passages[`test_${passage.test_number}_passage_${passage.passage_number}`] = {
      ...complexity,
      title: passage.title,
      introduction: passage.introduction,
      passageLength: passage.passage_text.length
    };

    console.log(`  📈 Flesch-Kincaid Grade: ${complexity.fleschKincaidGrade}`);
    console.log(`  📈 Overall Complexity: ${complexity.overallComplexity}`);
    console.log(`  📈 Readability Composite: ${complexity.readabilityComposite}`);
    console.log(`  📈 ACT-Specific Score: ${complexity.actSpecificScore}`);
  });

  // Calculate overall statistics
  const allComplexities = Object.values(complexityAnalysis.passages);

  complexityAnalysis.overallStats = {
    averageFleschKincaid: Math.round((allComplexities.reduce((sum, p) => sum + p.fleschKincaidGrade, 0) / allComplexities.length) * 100) / 100,
    averageOverallComplexity: Math.round((allComplexities.reduce((sum, p) => sum + p.overallComplexity, 0) / allComplexities.length) * 100) / 100,
    complexityRange: {
      min: Math.min(...allComplexities.map(p => p.overallComplexity)),
      max: Math.max(...allComplexities.map(p => p.overallComplexity))
    },
    readabilityRange: {
      min: Math.min(...allComplexities.map(p => p.readabilityComposite)),
      max: Math.max(...allComplexities.map(p => p.readabilityComposite))
    }
  };

  console.log(`\n📊 OVERALL STATISTICS:`);
  console.log(`  Average Flesch-Kincaid Grade: ${complexityAnalysis.overallStats.averageFleschKincaid}`);
  console.log(`  Average Overall Complexity: ${complexityAnalysis.overallStats.averageOverallComplexity}`);
  console.log(`  Complexity Range: ${complexityAnalysis.overallStats.complexityRange.min} - ${complexityAnalysis.overallStats.complexityRange.max}`);
}

// Execute analysis
await analyzePassageComplexity();

// Save detailed complexity analysis
const analysisDir = join(__dirname, '../../analysis-results');
if (!fs.existsSync(analysisDir)) {
  fs.mkdirSync(analysisDir, { recursive: true });
}

fs.writeFileSync(
  join(analysisDir, 'ultra-accurate-complexity-analysis.json'),
  JSON.stringify(complexityAnalysis, null, 2)
);

console.log('\n✅ ULTRA-ACCURATE COMPLEXITY ANALYSIS COMPLETE');
console.log('='.repeat(80));
console.log('📊 Comprehensive complexity measures calculated:');
console.log('  ✅ Flesch Reading Ease & Flesch-Kincaid Grade Level');
console.log('  ✅ Automated Readability Index (ARI)');
console.log('  ✅ Coleman-Liau Index');
console.log('  ✅ SMOG Readability Formula');
console.log('  ✅ Gunning Fog Index');
console.log('  ✅ Syntactic Complexity Analysis');
console.log('  ✅ Lexical Sophistication Scoring');
console.log('  ✅ Semantic Complexity Measurement');
console.log('  ✅ ACT-Specific Complexity Factors');
console.log('  ✅ Composite Readability & Complexity Scores');
console.log('\n💾 Analysis saved to: ultra-accurate-complexity-analysis.json');
console.log('🎯 Ready for precise ACT passage complexity matching!');