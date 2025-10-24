#!/usr/bin/env node

/**
 * MICRO-GRANULAR ANALYSIS
 * Ultra-minute pattern detection for perfect 1:1 ACT generation
 * Scans for character-level, formatting, and micro-linguistic patterns
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

console.log('🔬 MICRO-GRANULAR ANALYSIS');
console.log('Scanning for minute patterns at character, word, and formatting levels');
console.log('='.repeat(80));

const microAnalysis = {
  characterPatterns: {},
  punctuationSequences: {},
  wordPositionPatterns: {},
  microLinguistics: {},
  semanticNetworks: {},
  questionInterdependencies: {},
  phoneticPatterns: {},
  culturalReferences: {},
  formattingPatterns: {},
  cognitiveLoadPatterns: {},
  errorTypeFrequencies: {},
  discourseMarkers: {},
  registerAnalysis: {},
  metaphoricalLanguage: {},
  visualLayoutPatterns: {}
};

// Character-level pattern analysis
function analyzeCharacterPatterns(text) {
  const patterns = {
    spacingPatterns: {},
    capitalizationSequences: [],
    specialCharacters: {},
    numberFormats: [],
    abbreviationPatterns: [],
    contractionPatterns: [],
    hyphenationPatterns: [],
    quotationPatterns: []
  };

  // Analyze spacing around punctuation
  const spacingRules = [
    { pattern: /\s+,/g, type: 'space_before_comma' },
    { pattern: /,\s*/g, type: 'space_after_comma' },
    { pattern: /\s+\./g, type: 'space_before_period' },
    { pattern: /\.\s*/g, type: 'space_after_period' },
    { pattern: /\s+;/g, type: 'space_before_semicolon' },
    { pattern: /;\s*/g, type: 'space_after_semicolon' },
    { pattern: /\s+:/g, type: 'space_before_colon' },
    { pattern: /:\s*/g, type: 'space_after_colon' },
    { pattern: /\s+\?/g, type: 'space_before_question' },
    { pattern: /\?\s*/g, type: 'space_after_question' },
    { pattern: /\s+!/g, type: 'space_before_exclamation' },
    { pattern: /!\s*/g, type: 'space_after_exclamation' }
  ];

  spacingRules.forEach(rule => {
    const matches = text.match(rule.pattern) || [];
    patterns.spacingPatterns[rule.type] = matches.length;
  });

  // Capitalization sequences
  const capitalSequences = text.match(/[A-Z]+/g) || [];
  patterns.capitalizationSequences = capitalSequences;

  // Special characters and their contexts
  const specialChars = /[—–""''()[\]{}]/g;
  const specialMatches = [...text.matchAll(specialChars)];
  specialMatches.forEach(match => {
    const char = match[0];
    if (!patterns.specialCharacters[char]) {
      patterns.specialCharacters[char] = {
        count: 0,
        contexts: [],
        positions: []
      };
    }
    patterns.specialCharacters[char].count++;
    patterns.specialCharacters[char].positions.push(match.index);

    // Get 10 characters before and after for context
    const start = Math.max(0, match.index - 10);
    const end = Math.min(text.length, match.index + 11);
    const context = text.substring(start, end);
    patterns.specialCharacters[char].contexts.push(context);
  });

  // Number formatting patterns
  const numberPatterns = [
    /\b\d{4}\b/g,  // Years (4 digits)
    /\b\d{1,2}\/\d{1,2}\/\d{2,4}\b/g,  // Dates
    /\b\d+,\d{3}\b/g,  // Thousands with commas
    /\$\d+(?:,\d{3})*(?:\.\d{2})?\b/g,  // Currency
    /\b\d+(?:\.\d+)?%\b/g,  // Percentages
    /\b\d+:\d{2}\b/g,  // Time format
    /\b\d+\.\d+\b/g   // Decimals
  ];

  numberPatterns.forEach((pattern, index) => {
    const matches = text.match(pattern) || [];
    patterns.numberFormats.push({
      type: ['year', 'date', 'thousands', 'currency', 'percentage', 'time', 'decimal'][index],
      count: matches.length,
      examples: matches.slice(0, 3)
    });
  });

  // Abbreviation patterns
  const abbreviations = text.match(/\b[A-Z]{2,}\b(?:\.[A-Z]{1,})*\.?/g) || [];
  patterns.abbreviationPatterns = abbreviations;

  // Contraction patterns
  const contractions = text.match(/\b\w+'\w+\b/g) || [];
  patterns.contractionPatterns = contractions;

  // Hyphenation patterns
  const hyphenated = text.match(/\b\w+-\w+(?:-\w+)*\b/g) || [];
  patterns.hyphenationPatterns = hyphenated;

  // Quotation patterns (dialogue, titles, emphasis)
  const quotationPatterns = [
    /"[^"]*"/g,  // Double quotes
    /'[^']*'/g,  // Single quotes
    /\u201c[^\u201d]*\u201d/g,  // Smart quotes opening
    /\u2018[^\u2019]*\u2019/g   // Smart single quotes
  ];

  quotationPatterns.forEach((pattern, index) => {
    const matches = text.match(pattern) || [];
    patterns.quotationPatterns.push({
      type: ['double', 'single', 'smart_open', 'smart_close'][index],
      count: matches.length,
      examples: matches.slice(0, 3)
    });
  });

  return patterns;
}

// Exact punctuation sequence analysis
function analyzePunctuationSequences(text) {
  const sequences = {
    commonSequences: {},
    complexSequences: {},
    sentenceEndings: {},
    clauseSeparators: {},
    listPatterns: {}
  };

  // Common punctuation sequences (2-4 characters)
  const punctuationRegex = /[.!?,:;—–""''()[\]{}]{2,4}/g;
  const punctMatches = text.match(punctuationRegex) || [];
  punctMatches.forEach(seq => {
    sequences.commonSequences[seq] = (sequences.commonSequences[seq] || 0) + 1;
  });

  // Complex sequences with context
  const complexPatterns = [
    /[.!?]\s*[""'']?[A-Z]/g,  // Sentence endings
    /,\s+(?:and|but|or|nor|for|yet|so)\s+/g,  // Coordinating conjunctions
    /;\s*(?:however|therefore|nevertheless|furthermore|moreover)\s*,/g,  // Semicolon transitions
    /:\s*[A-Z]/g,  // Colon introductions
    /—\s*[a-z]/g,  // Em dash continuations
    /,\s*(?:which|who|that|where|when)\s+/g,  // Relative clause introducers
    /\s*\([^)]*\)\s*/g,  // Parenthetical expressions
    /,\s*,/g,  // Double commas (errors)
    /\.\s*\./g   // Double periods (errors)
  ];

  complexPatterns.forEach((pattern, index) => {
    const matches = text.match(pattern) || [];
    const types = ['sentence_end', 'coord_conj', 'semicolon_trans', 'colon_intro',
                   'em_dash', 'relative_clause', 'parenthetical', 'double_comma', 'double_period'];
    sequences.complexSequences[types[index]] = {
      count: matches.length,
      examples: matches.slice(0, 3)
    };
  });

  return sequences;
}

// Word position dependency analysis
function analyzeWordPositionPatterns(text) {
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
  const patterns = {
    firstWordTypes: {},
    lastWordTypes: {},
    middlewordPatterns: {},
    transitionPositions: {},
    modifierPositions: {}
  };

  sentences.forEach(sentence => {
    const words = sentence.trim().split(/\s+/).filter(w => w.length > 0);
    if (words.length === 0) return;

    // First word analysis
    const firstWord = words[0].toLowerCase().replace(/[^a-z]/g, '');
    const firstWordType = classifyWordType(firstWord);
    patterns.firstWordTypes[firstWordType] = (patterns.firstWordTypes[firstWordType] || 0) + 1;

    // Last word analysis
    const lastWord = words[words.length - 1].toLowerCase().replace(/[^a-z]/g, '');
    const lastWordType = classifyWordType(lastWord);
    patterns.lastWordTypes[lastWordType] = (patterns.lastWordTypes[lastWordType] || 0) + 1;

    // Transition word positions
    const transitions = ['however', 'therefore', 'furthermore', 'moreover', 'meanwhile',
                        'consequently', 'nevertheless', 'nonetheless', 'otherwise', 'instead'];

    transitions.forEach(transition => {
      const index = words.findIndex(w => w.toLowerCase().includes(transition));
      if (index !== -1) {
        const position = index / words.length;
        if (!patterns.transitionPositions[transition]) {
          patterns.transitionPositions[transition] = [];
        }
        patterns.transitionPositions[transition].push(position);
      }
    });

    // Modifier positions (adjectives, adverbs)
    const modifiers = words.filter(word => {
      const clean = word.toLowerCase().replace(/[^a-z]/g, '');
      return clean.endsWith('ly') || clean.endsWith('ive') || clean.endsWith('ed') ||
             clean.endsWith('ing') || clean.endsWith('ful') || clean.endsWith('less');
    });

    modifiers.forEach(modifier => {
      const index = words.findIndex(w => w.toLowerCase().includes(modifier.toLowerCase()));
      if (index !== -1) {
        const position = index / words.length;
        if (!patterns.modifierPositions[modifier.toLowerCase()]) {
          patterns.modifierPositions[modifier.toLowerCase()] = [];
        }
        patterns.modifierPositions[modifier.toLowerCase()].push(position);
      }
    });
  });

  return patterns;
}

// Classify word types
function classifyWordType(word) {
  const articles = ['a', 'an', 'the'];
  const prepositions = ['in', 'on', 'at', 'by', 'for', 'with', 'from', 'to', 'of', 'about'];
  const conjunctions = ['and', 'but', 'or', 'nor', 'for', 'yet', 'so'];
  const pronouns = ['i', 'you', 'he', 'she', 'it', 'we', 'they', 'me', 'him', 'her', 'us', 'them'];
  const auxiliaries = ['is', 'are', 'was', 'were', 'has', 'have', 'had', 'will', 'would', 'could', 'should'];

  if (articles.includes(word)) return 'article';
  if (prepositions.includes(word)) return 'preposition';
  if (conjunctions.includes(word)) return 'conjunction';
  if (pronouns.includes(word)) return 'pronoun';
  if (auxiliaries.includes(word)) return 'auxiliary';
  if (/^[A-Z]/.test(word)) return 'proper_noun';
  if (word.endsWith('ly')) return 'adverb';
  if (word.endsWith('ing')) return 'gerund_participle';
  if (word.endsWith('ed')) return 'past_participle';
  return 'other';
}

// Micro-linguistic pattern analysis
function analyzeMicroLinguistics(text) {
  const patterns = {
    prefixPatterns: {},
    suffixPatterns: {},
    rootPatterns: {},
    morphologicalPatterns: {},
    phoneticPatterns: {},
    etymologicalPatterns: {}
  };

  const words = text.toLowerCase().match(/\b[a-z]+\b/g) || [];

  // Common prefixes
  const prefixes = ['un', 're', 'pre', 'dis', 'in', 'im', 'ir', 'il', 'non', 'anti',
                   'de', 'over', 'under', 'out', 'up', 'sub', 'inter', 'trans', 'super'];

  prefixes.forEach(prefix => {
    const matches = words.filter(word => word.startsWith(prefix) && word.length > prefix.length + 2);
    patterns.prefixPatterns[prefix] = {
      count: matches.length,
      examples: matches.slice(0, 5)
    };
  });

  // Common suffixes
  const suffixes = ['ing', 'ed', 'er', 'est', 'ly', 'tion', 'sion', 'ness', 'ment', 'ful',
                   'less', 'able', 'ible', 'ous', 'ious', 'ive', 'ative', 'itive'];

  suffixes.forEach(suffix => {
    const matches = words.filter(word => word.endsWith(suffix) && word.length > suffix.length + 2);
    patterns.suffixPatterns[suffix] = {
      count: matches.length,
      examples: matches.slice(0, 5)
    };
  });

  // Latin/Greek root patterns
  const latinRoots = ['spect', 'dict', 'duct', 'fact', 'ject', 'port', 'scrib', 'sect', 'struct', 'tract'];
  const greekRoots = ['graph', 'phon', 'photo', 'bio', 'geo', 'hydro', 'psych', 'chrono', 'demo', 'therm'];

  [...latinRoots, ...greekRoots].forEach(root => {
    const matches = words.filter(word => word.includes(root));
    if (matches.length > 0) {
      patterns.rootPatterns[root] = {
        count: matches.length,
        examples: matches.slice(0, 3)
      };
    }
  });

  return patterns;
}

// Semantic relationship network analysis
function analyzeSemanticNetworks(text) {
  const networks = {
    conceptClusters: {},
    semanticFields: {},
    cooccurrencePatterns: {},
    abstractConcrete: {},
    temporalReferences: {},
    spatialReferences: {}
  };

  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);

  // Semantic field classification
  const semanticFields = {
    science: ['research', 'study', 'analysis', 'experiment', 'data', 'theory', 'hypothesis', 'evidence'],
    arts: ['art', 'artist', 'painting', 'music', 'literature', 'creative', 'aesthetic', 'cultural'],
    history: ['historical', 'ancient', 'period', 'century', 'civilization', 'culture', 'tradition', 'heritage'],
    nature: ['natural', 'environment', 'species', 'habitat', 'ecosystem', 'wildlife', 'conservation', 'biodiversity'],
    technology: ['technology', 'digital', 'computer', 'innovation', 'development', 'advancement', 'system', 'process']
  };

  Object.entries(semanticFields).forEach(([field, keywords]) => {
    networks.semanticFields[field] = {
      density: 0,
      keywords: [],
      sentences: []
    };

    sentences.forEach((sentence, index) => {
      const lowerSentence = sentence.toLowerCase();
      const matchedKeywords = keywords.filter(keyword => lowerSentence.includes(keyword));

      if (matchedKeywords.length > 0) {
        networks.semanticFields[field].density += matchedKeywords.length;
        networks.semanticFields[field].keywords.push(...matchedKeywords);
        networks.semanticFields[field].sentences.push(index);
      }
    });
  });

  // Abstract vs concrete concept analysis
  const abstractWords = ['concept', 'idea', 'theory', 'principle', 'notion', 'philosophy', 'belief', 'value'];
  const concreteWords = ['object', 'thing', 'item', 'material', 'substance', 'tool', 'device', 'structure'];

  const words = text.toLowerCase().match(/\b[a-z]+\b/g) || [];
  networks.abstractConcrete = {
    abstract: words.filter(word => abstractWords.some(abs => word.includes(abs))).length,
    concrete: words.filter(word => concreteWords.some(conc => word.includes(conc))).length,
    ratio: 0
  };

  if (networks.abstractConcrete.concrete > 0) {
    networks.abstractConcrete.ratio = networks.abstractConcrete.abstract / networks.abstractConcrete.concrete;
  }

  return networks;
}

// Question interdependency analysis
function analyzeQuestionInterdependencies(questions) {
  const dependencies = {
    sequentialPatterns: {},
    topicContinuity: {},
    difficultyProgression: {},
    questionTypeProgression: {},
    answerPatterns: {}
  };

  if (!questions || questions.length === 0) return dependencies;

  // Sequential answer pattern analysis
  const answers = questions.map(q => q.correct_answer).filter(a => a);
  const answerSequence = answers.join('');

  // Analyze answer distribution patterns
  ['A', 'B', 'C', 'D'].forEach(letter => {
    dependencies.answerPatterns[letter] = {
      frequency: answers.filter(a => a === letter).length,
      positions: answers.map((a, i) => a === letter ? i : -1).filter(i => i !== -1),
      consecutiveRuns: []
    };

    // Find consecutive runs
    let currentRun = 0;
    answers.forEach(answer => {
      if (answer === letter) {
        currentRun++;
      } else if (currentRun > 0) {
        dependencies.answerPatterns[letter].consecutiveRuns.push(currentRun);
        currentRun = 0;
      }
    });
    if (currentRun > 0) {
      dependencies.answerPatterns[letter].consecutiveRuns.push(currentRun);
    }
  });

  // Question type progression
  const questionTypes = questions.map(q => q.question_type).filter(t => t);
  dependencies.questionTypeProgression = {
    sequence: questionTypes,
    transitions: {},
    clustering: {}
  };

  // Analyze transitions between question types
  for (let i = 0; i < questionTypes.length - 1; i++) {
    const current = questionTypes[i];
    const next = questionTypes[i + 1];
    const transition = `${current}_to_${next}`;
    dependencies.questionTypeProgression.transitions[transition] =
      (dependencies.questionTypeProgression.transitions[transition] || 0) + 1;
  }

  return dependencies;
}

// Main micro-analysis function
async function performMicroAnalysis() {
  console.log('\n🔬 Starting micro-granular analysis...');

  const { data: passages } = await supabase
    .from('act_english_passages')
    .select('*')
    .in('test_number', [1, 2]);

  const { data: questions } = await supabase
    .from('act_english_questions')
    .select('*')
    .in('test_number', [1, 2])
    .order('test_number')
    .order('question_number');

  console.log(`\n🔍 Analyzing ${passages?.length || 0} passages and ${questions?.length || 0} questions`);

  // Analyze each passage at micro level
  passages?.forEach((passage, index) => {
    console.log(`\n📄 MICRO-ANALYZING PASSAGE ${index + 1}`);

    const passageKey = `test_${passage.test_number}_passage_${passage.passage_number}`;

    microAnalysis.characterPatterns[passageKey] = analyzeCharacterPatterns(passage.passage_text);
    microAnalysis.punctuationSequences[passageKey] = analyzePunctuationSequences(passage.passage_text);
    microAnalysis.wordPositionPatterns[passageKey] = analyzeWordPositionPatterns(passage.passage_text);
    microAnalysis.microLinguistics[passageKey] = analyzeMicroLinguistics(passage.passage_text);
    microAnalysis.semanticNetworks[passageKey] = analyzeSemanticNetworks(passage.passage_text);

    console.log(`  ✅ Character patterns: ${Object.keys(microAnalysis.characterPatterns[passageKey].spacingPatterns).length} spacing rules`);
    console.log(`  ✅ Punctuation sequences: ${Object.keys(microAnalysis.punctuationSequences[passageKey].commonSequences).length} unique sequences`);
    console.log(`  ✅ Word positions: ${Object.keys(microAnalysis.wordPositionPatterns[passageKey].firstWordTypes).length} first-word types`);
    console.log(`  ✅ Micro-linguistics: ${Object.keys(microAnalysis.microLinguistics[passageKey].prefixPatterns).length} prefix patterns`);
  });

  // Analyze question interdependencies
  const questionsByTest = {};
  questions?.forEach(q => {
    if (!questionsByTest[q.test_number]) {
      questionsByTest[q.test_number] = [];
    }
    questionsByTest[q.test_number].push(q);
  });

  Object.entries(questionsByTest).forEach(([testNum, testQuestions]) => {
    microAnalysis.questionInterdependencies[`test_${testNum}`] = analyzeQuestionInterdependencies(testQuestions);
    console.log(`\n🔗 Test ${testNum} interdependencies: ${testQuestions.length} questions analyzed`);
  });

  console.log('\n✅ MICRO-GRANULAR ANALYSIS COMPLETE');
}

// Execute analysis
await performMicroAnalysis();

// Save micro-granular analysis
const analysisDir = join(__dirname, '../../analysis-results');
if (!fs.existsSync(analysisDir)) {
  fs.mkdirSync(analysisDir, { recursive: true });
}

fs.writeFileSync(
  join(analysisDir, 'micro-granular-analysis.json'),
  JSON.stringify(microAnalysis, null, 2)
);

console.log('\n💾 Micro-granular analysis saved to: micro-granular-analysis.json');
console.log('🔬 Ready for ultra-precise ACT generation with minute-detail accuracy!');