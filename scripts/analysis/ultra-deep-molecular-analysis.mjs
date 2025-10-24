#!/usr/bin/env node

/**
 * ULTRA-DEEP MOLECULAR ACT ANALYSIS
 * DNA-level analysis of passage construction, question placement, linguistic patterns
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

console.log('🧬 ULTRA-DEEP MOLECULAR ACT ANALYSIS');
console.log('DNA-level reverse engineering for 1:1 perfect generation');
console.log('='.repeat(80));

const molecularAnalysis = {
  passageConstruction: {},
  questionPlacement: {},
  linguisticTriggers: {},
  underlinedPatterns: {},
  sentenceStructures: {},
  distractorConstruction: {},
  keywordAnalysis: {},
  positioningRules: {}
};

// Deep passage analysis
async function analyzePassageConstruction() {
  console.log('🔬 ANALYZING PASSAGE CONSTRUCTION AT MOLECULAR LEVEL');
  console.log('-'.repeat(60));

  const { data: passages } = await supabase
    .from('act_english_passages')
    .select('*')
    .in('test_number', [1, 2]);

  const { data: questions } = await supabase
    .from('act_english_questions')
    .select('*')
    .in('test_number', [1, 2])
    .order('passage_id', { ascending: true })
    .order('question_number', { ascending: true });

  console.log(`\n📖 Analyzing ${passages?.length || 0} passages with ${questions?.length || 0} questions`);

  passages?.forEach((passage, pIndex) => {
    const passageQuestions = questions?.filter(q =>
      q.test_number === passage.test_number &&
      q.passage_number === passage.passage_number
    ) || [];

    console.log(`\n📄 PASSAGE ${pIndex + 1} ANALYSIS:`);
    console.log(`Test ${passage.test_number}, Passage ${passage.passage_number}`);
    console.log(`Length: ${passage.passage_text.length} characters`);

    // Sentence-by-sentence analysis
    const sentences = passage.passage_text.split(/[.!?]+/).filter(s => s.trim().length > 10);
    console.log(`Sentences: ${sentences.length}`);

    // Analyze sentence structure patterns
    const sentencePatterns = {
      openingTypes: [],
      complexityProgression: [],
      transitionWords: [],
      punctuationPatterns: [],
      lengthProgression: []
    };

    sentences.forEach((sentence, sIndex) => {
      const trimmed = sentence.trim();
      if (trimmed.length === 0) return;

      // Opening word analysis
      const firstWord = trimmed.split(' ')[0].toLowerCase();
      sentencePatterns.openingTypes.push(firstWord);

      // Complexity scoring
      const complexity = calculateSentenceComplexity(trimmed);
      sentencePatterns.complexityProgression.push(complexity);

      // Length tracking
      sentencePatterns.lengthProgression.push(trimmed.length);

      // Transition word detection
      const transitions = detectTransitions(trimmed);
      sentencePatterns.transitionWords.push(...transitions);

      if (sIndex < 5) {
        console.log(`  Sentence ${sIndex + 1}: ${trimmed.substring(0, 80)}... (${trimmed.length} chars, complexity: ${complexity})`);
      }
    });

    // Question placement analysis within passage
    console.log(`\n❓ QUESTION PLACEMENT ANALYSIS:`);
    passageQuestions.forEach(q => {
      const questionPosition = analyzeQuestionPosition(q, passage.passage_text);
      console.log(`  Q${q.question_number}: ${questionPosition.type} at ${questionPosition.percentage}% through passage`);

      if (q.question_stem.includes('<u>') && q.question_stem.includes('</u>')) {
        const underlinedText = extractUnderlinedText(q.question_stem);
        const positionInSentence = analyzeUnderlinedPosition(underlinedText, passage.passage_text);
        console.log(`    Underlined: "${underlinedText}" - ${positionInSentence}`);
      }
    });

    molecularAnalysis.passageConstruction[`test_${passage.test_number}_passage_${passage.passage_number}`] = {
      sentencePatterns,
      questionPlacements: passageQuestions.map(q => analyzeQuestionPosition(q, passage.passage_text)),
      structuralElements: analyzeStructuralElements(passage.passage_text),
      questionCount: passageQuestions.length,
      passageLength: passage.passage_text.length
    };
  });
}

// Sentence complexity calculation
function calculateSentenceComplexity(sentence) {
  let score = 0;

  // Length factor
  score += sentence.length * 0.01;

  // Comma count (indicates clause complexity)
  score += (sentence.match(/,/g) || []).length * 0.3;

  // Semicolon/colon (advanced punctuation)
  score += (sentence.match(/[;:]/g) || []).length * 0.5;

  // Subordinating conjunctions
  const subordinating = /\b(although|because|since|while|whereas|if|unless|until|before|after)\b/gi;
  score += (sentence.match(subordinating) || []).length * 0.4;

  // Relative pronouns
  const relatives = /\b(who|whom|whose|which|that)\b/gi;
  score += (sentence.match(relatives) || []).length * 0.3;

  // Parenthetical elements
  score += (sentence.match(/\([^)]*\)/g) || []).length * 0.4;

  return Math.round(score * 100) / 100;
}

// Transition word detection
function detectTransitions(sentence) {
  const transitionWords = [
    'however', 'therefore', 'moreover', 'furthermore', 'additionally', 'meanwhile',
    'consequently', 'nevertheless', 'nonetheless', 'otherwise', 'instead',
    'for example', 'for instance', 'in contrast', 'on the other hand',
    'first', 'second', 'third', 'finally', 'in conclusion'
  ];

  const found = [];
  transitionWords.forEach(word => {
    if (sentence.toLowerCase().includes(word)) {
      found.push(word);
    }
  });

  return found;
}

// Question position analysis
function analyzeQuestionPosition(question, passageContent) {
  // Try to find where in the passage this question refers to
  let targetText = '';
  let percentage = 0;
  let type = 'unknown';

  if (question.question_stem.includes('<u>') && question.question_stem.includes('</u>')) {
    // Underlined question - find the underlined text in passage
    targetText = extractUnderlinedText(question.question_stem);
    type = 'underlined';
  } else {
    // Rhetorical question - analyze references
    if (question.question_stem.includes('sentence') && question.question_stem.includes('paragraph')) {
      type = 'paragraph_reference';
    } else if (question.question_stem.includes('add') || question.question_stem.includes('delete')) {
      type = 'add_delete';
    } else {
      type = 'rhetorical';
    }
  }

  if (targetText) {
    const position = passageContent.indexOf(targetText);
    if (position !== -1) {
      percentage = Math.round((position / passageContent.length) * 100);
    }
  }

  return { type, percentage, targetText };
}

// Extract underlined text
function extractUnderlinedText(questionStem) {
  const match = questionStem.match(/<u>(.*?)<\/u>/);
  return match ? match[1] : '';
}

// Analyze underlined position within sentence
function analyzeUnderlinedPosition(underlinedText, passageContent) {
  if (!underlinedText) return 'not_found';

  const sentences = passageContent.split(/[.!?]+/);

  for (const sentence of sentences) {
    if (sentence.includes(underlinedText)) {
      const words = sentence.trim().split(/\s+/);
      const underlinedWords = underlinedText.split(/\s+/);

      for (let i = 0; i <= words.length - underlinedWords.length; i++) {
        const candidatePhrase = words.slice(i, i + underlinedWords.length).join(' ');
        if (candidatePhrase.includes(underlinedText)) {
          const position = i / words.length;
          if (position < 0.3) return 'beginning_of_sentence';
          if (position > 0.7) return 'end_of_sentence';
          return 'middle_of_sentence';
        }
      }
    }
  }

  return 'not_found';
}

// Structural elements analysis
function analyzeStructuralElements(passageContent) {
  return {
    paragraphCount: passageContent.split('\n\n').filter(p => p.trim().length > 0).length,
    hasDialogue: passageContent.includes('"'),
    hasParenthetical: /\([^)]+\)/.test(passageContent),
    hasSpecialPunctuation: /[—–;:]/.test(passageContent),
    hasNumbers: /\d/.test(passageContent),
    hasQuestions: /\?/.test(passageContent)
  };
}

// Deep linguistic trigger analysis
async function analyzeLinguisticTriggers() {
  console.log('\n🔤 ANALYZING LINGUISTIC TRIGGERS');
  console.log('-'.repeat(60));

  const { data: questions } = await supabase
    .from('act_english_questions')
    .select('*')
    .in('test_number', [1, 2]);

  const triggerPatterns = {
    underlinedTriggers: {},
    rhetoricalTriggers: {},
    grammarPatterns: {},
    punctuationTriggers: {}
  };

  questions?.forEach(q => {
    if (q.question_stem.includes('<u>') && q.question_stem.includes('</u>')) {
      // Analyze underlined triggers
      const underlined = extractUnderlinedText(q.question_stem);
      const triggerType = classifyUnderlinedTrigger(underlined, q);

      if (!triggerPatterns.underlinedTriggers[triggerType]) {
        triggerPatterns.underlinedTriggers[triggerType] = [];
      }
      triggerPatterns.underlinedTriggers[triggerType].push({
        text: underlined,
        type: q.question_type,
        choices: [q.choice_a, q.choice_b, q.choice_c, q.choice_d].filter(Boolean)
      });
    } else {
      // Analyze rhetorical triggers
      const triggerWords = extractRhetoricalTriggers(q.question_stem);
      triggerWords.forEach(trigger => {
        if (!triggerPatterns.rhetoricalTriggers[trigger]) {
          triggerPatterns.rhetoricalTriggers[trigger] = [];
        }
        triggerPatterns.rhetoricalTriggers[trigger].push({
          stem: q.question_stem.substring(0, 100),
          type: q.question_type
        });
      });
    }
  });

  console.log('\n📊 UNDERLINED TRIGGER PATTERNS:');
  Object.entries(triggerPatterns.underlinedTriggers).forEach(([trigger, examples]) => {
    console.log(`\n${trigger.toUpperCase()} (${examples.length} examples):`);
    examples.slice(0, 3).forEach(ex => {
      console.log(`  "${ex.text}" → ${ex.type}`);
    });
  });

  console.log('\n📊 RHETORICAL TRIGGER PATTERNS:');
  Object.entries(triggerPatterns.rhetoricalTriggers).forEach(([trigger, examples]) => {
    console.log(`\n${trigger} (${examples.length} examples):`);
    examples.slice(0, 2).forEach(ex => {
      console.log(`  ${ex.stem}...`);
    });
  });

  molecularAnalysis.linguisticTriggers = triggerPatterns;
}

// Classify underlined triggers
function classifyUnderlinedTrigger(underlinedText, question) {
  const text = underlinedText.toLowerCase();

  // Verb triggers
  if (/\b(was|were|is|are|has|have|had|will|would|could|should)\b/.test(text)) {
    return 'verb_trigger';
  }

  // Punctuation triggers
  if (/[,;:—]/.test(underlinedText)) {
    return 'punctuation_trigger';
  }

  // Word choice triggers
  if (text.split(' ').length === 1 && !(/[,;:—]/.test(underlinedText))) {
    return 'word_choice_trigger';
  }

  // Phrase structure triggers
  if (text.split(' ').length > 3) {
    return 'phrase_structure_trigger';
  }

  return 'other_trigger';
}

// Extract rhetorical triggers
function extractRhetoricalTriggers(questionStem) {
  const triggers = [];

  const patterns = [
    'which choice',
    'which of the following',
    'delete',
    'add',
    'place',
    'sentence',
    'paragraph',
    'transition',
    'accomplish',
    'best',
    'most effectively',
    'clearest',
    'most logical'
  ];

  patterns.forEach(pattern => {
    if (questionStem.toLowerCase().includes(pattern)) {
      triggers.push(pattern);
    }
  });

  return triggers;
}

// Distractor construction analysis
async function analyzeDistractorConstruction() {
  console.log('\n⚙️ ANALYZING DISTRACTOR CONSTRUCTION PATTERNS');
  console.log('-'.repeat(60));

  const { data: questions } = await supabase
    .from('act_english_questions')
    .select('*')
    .in('test_number', [1, 2])
    .limit(20);

  questions?.forEach(q => {
    const choices = [
      { letter: 'A', text: q.choice_a },
      { letter: 'B', text: q.choice_b },
      { letter: 'C', text: q.choice_c },
      { letter: 'D', text: q.choice_d }
    ].filter(c => c.text);

    const correct = choices.find(c => c.letter === q.correct_answer);
    const distractors = choices.filter(c => c.letter !== q.correct_answer);

    if (correct && distractors.length > 0) {
      console.log(`\nQ${q.question_number}: ${q.question_type}`);
      console.log(`Correct (${correct.letter}): "${correct.text}"`);

      distractors.forEach(d => {
        const relationship = analyzeDistractorRelationship(correct.text, d.text);
        console.log(`Distractor (${d.letter}): "${d.text}" → ${relationship}`);
      });
    }
  });
}

// Analyze relationship between correct answer and distractor
function analyzeDistractorRelationship(correct, distractor) {
  if (!correct || !distractor) return 'unknown';

  const correctLower = correct.toLowerCase();
  const distractorLower = distractor.toLowerCase();

  // NO CHANGE analysis
  if (correctLower.includes('no change') || distractorLower.includes('no change')) {
    return 'no_change_option';
  }

  // Length comparison
  const lengthRatio = distractor.length / correct.length;
  if (lengthRatio > 1.5) return 'longer_verbose';
  if (lengthRatio < 0.5) return 'shorter_incomplete';

  // Punctuation differences
  const correctPunct = (correct.match(/[,;:.!?]/g) || []).length;
  const distractorPunct = (distractor.match(/[,;:.!?]/g) || []).length;
  if (Math.abs(correctPunct - distractorPunct) > 1) return 'punctuation_difference';

  // Word substitution
  const correctWords = correctLower.split(/\s+/);
  const distractorWords = distractorLower.split(/\s+/);
  if (correctWords.length === distractorWords.length) {
    let differences = 0;
    for (let i = 0; i < correctWords.length; i++) {
      if (correctWords[i] !== distractorWords[i]) differences++;
    }
    if (differences === 1) return 'single_word_substitution';
    if (differences <= 2) return 'minor_word_changes';
  }

  return 'major_structural_difference';
}

// Main execution
console.log('🚀 Starting ultra-deep molecular analysis...\n');

await analyzePassageConstruction();
await analyzeLinguisticTriggers();
await analyzeDistractorConstruction();

// Save molecular analysis
const analysisDir = join(__dirname, '../../analysis-results');
if (!fs.existsSync(analysisDir)) {
  fs.mkdirSync(analysisDir, { recursive: true });
}

fs.writeFileSync(
  join(analysisDir, 'molecular-level-analysis.json'),
  JSON.stringify(molecularAnalysis, null, 2)
);

console.log('\n✅ ULTRA-DEEP MOLECULAR ANALYSIS COMPLETE');
console.log('='.repeat(80));
console.log('🧬 Molecular-level patterns identified for:');
console.log('  ✅ Sentence-by-sentence passage construction');
console.log('  ✅ Question placement positioning algorithms');
console.log('  ✅ Linguistic trigger word patterns');
console.log('  ✅ Underlined portion placement rules');
console.log('  ✅ Distractor construction relationships');
console.log('  ✅ Structural element requirements');
console.log('\n💾 Molecular analysis saved to: molecular-level-analysis.json');
console.log('🚀 Ready for DNA-level ACT generation!');