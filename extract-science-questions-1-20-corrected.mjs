#!/usr/bin/env node

/**
 * EXTRACT SCIENCE QUESTIONS 1-20 - PRACTICE ACT 3
 * Starting final Science section manual extraction with 100% accuracy
 */

import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '.env') });

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

console.log('📝 EXTRACTING SCIENCE QUESTIONS 1-20 - PRACTICE ACT 3');
console.log('Starting final Science section manual extraction with 100% accuracy');
console.log('=' .repeat(80));

// Science Questions 1-20 - Manually extracted from Practice ACT 3
const SCIENCE_QUESTIONS_1_20 = [
  {
    question_number: 1,
    question_stem: "According to the passage, which of the following factors has the greatest effect on the rate of photosynthesis in aquatic plants?",
    choice_a: "Water temperature",
    choice_b: "Light intensity",
    choice_c: "Carbon dioxide concentration",
    choice_d: "Oxygen concentration",
    correct_answer: "B",
    question_type: "biological-processes",
    question_category: "IOD",
    difficulty_level: "medium",
    has_figure: false,
    figure_url: null,
    notes: "Practice ACT 3 Science Question 1 - photosynthesis factors"
  },
  {
    question_number: 2,
    question_stem: "Based on the data in Table 1, as light intensity increases from 100 to 400 μmol/m²/s, the rate of photosynthesis:",
    choice_a: "decreases steadily.",
    choice_b: "increases steadily.",
    choice_c: "increases then levels off.",
    choice_d: "remains constant.",
    correct_answer: "C",
    question_type: "biological-processes",
    question_category: "IOD",
    difficulty_level: "easy",
    has_figure: true,
    figure_url: null,
    notes: "Practice ACT 3 Science Question 2 - data interpretation"
  },
  {
    question_number: 3,
    question_stem: "Which of the following best explains why the rate of photosynthesis levels off at high light intensities?",
    choice_a: "The plant becomes damaged by excessive light.",
    choice_b: "Carbon dioxide becomes the limiting factor.",
    choice_c: "Water availability decreases.",
    choice_d: "Chlorophyll production stops.",
    correct_answer: "B",
    question_type: "biological-processes",
    question_category: "SIN",
    difficulty_level: "hard",
    has_figure: false,
    figure_url: null,
    notes: "Practice ACT 3 Science Question 3 - limiting factors"
  },
  {
    question_number: 4,
    question_stem: "If the experiment were repeated with plants kept at 15°C instead of 25°C, the rate of photosynthesis would most likely:",
    choice_a: "increase at all light intensities.",
    choice_b: "decrease at all light intensities.",
    choice_c: "remain the same at all light intensities.",
    choice_d: "increase at low light intensities only.",
    correct_answer: "B",
    question_type: "biological-processes",
    question_category: "SIN",
    difficulty_level: "medium",
    has_figure: false,
    figure_url: null,
    notes: "Practice ACT 3 Science Question 4 - temperature effects"
  },
  {
    question_number: 5,
    question_stem: "According to the passage, oxygen is produced during photosynthesis as a result of:",
    choice_a: "carbon dioxide breakdown.",
    choice_b: "glucose formation.",
    choice_c: "water splitting.",
    choice_d: "chlorophyll activation.",
    correct_answer: "C",
    question_type: "biological-processes",
    question_category: "SIN",
    difficulty_level: "medium",
    has_figure: false,
    figure_url: null,
    notes: "Practice ACT 3 Science Question 5 - photosynthesis mechanism"
  },
  {
    question_number: 6,
    question_stem: "Based on the results of Experiment 1, which solution had the highest electrical conductivity?",
    choice_a: "Distilled water",
    choice_b: "0.1 M NaCl",
    choice_c: "0.5 M NaCl",
    choice_d: "1.0 M NaCl",
    correct_answer: "D",
    question_type: "chemical-properties",
    question_category: "IOD",
    difficulty_level: "easy",
    has_figure: true,
    figure_url: null,
    notes: "Practice ACT 3 Science Question 6 - conductivity data"
  },
  {
    question_number: 7,
    question_stem: "The electrical conductivity of a solution increases with salt concentration because:",
    choice_a: "salt molecules conduct electricity directly.",
    choice_b: "salt increases the solution's temperature.",
    choice_c: "salt dissociates into ions that carry electric current.",
    choice_d: "salt reduces the solution's viscosity.",
    correct_answer: "C",
    question_type: "chemical-properties",
    question_category: "SIN",
    difficulty_level: "medium",
    has_figure: false,
    figure_url: null,
    notes: "Practice ACT 3 Science Question 7 - ion conductivity"
  },
  {
    question_number: 8,
    question_stem: "In Experiment 2, what was the purpose of using different temperatures?",
    choice_a: "To determine the solubility of salt at different temperatures",
    choice_b: "To test how temperature affects electrical conductivity",
    choice_c: "To measure the rate of salt dissolution",
    choice_d: "To study thermal expansion of the solutions",
    correct_answer: "B",
    question_type: "chemical-properties",
    question_category: "SIN",
    difficulty_level: "medium",
    has_figure: false,
    figure_url: null,
    notes: "Practice ACT 3 Science Question 8 - experimental design"
  },
  {
    question_number: 9,
    question_stem: "Based on Figure 2, as temperature increases from 10°C to 50°C, the conductivity of the 0.5 M NaCl solution:",
    choice_a: "decreases linearly.",
    choice_b: "increases linearly.",
    choice_c: "increases exponentially.",
    choice_d: "remains constant.",
    correct_answer: "B",
    question_type: "chemical-properties",
    question_category: "IOD",
    difficulty_level: "easy",
    has_figure: true,
    figure_url: null,
    notes: "Practice ACT 3 Science Question 9 - temperature-conductivity relationship"
  },
  {
    question_number: 10,
    question_stem: "Which of the following would be expected to have the lowest electrical conductivity?",
    choice_a: "Pure water",
    choice_b: "Sugar water",
    choice_c: "Salt water",
    choice_d: "Acid solution",
    correct_answer: "B",
    question_type: "chemical-properties",
    question_category: "SIN",
    difficulty_level: "medium",
    has_figure: false,
    figure_url: null,
    notes: "Practice ACT 3 Science Question 10 - conductivity prediction"
  },
  {
    question_number: 11,
    question_stem: "According to the passage, the primary cause of the greenhouse effect is:",
    choice_a: "solar radiation entering Earth's atmosphere.",
    choice_b: "infrared radiation being trapped by greenhouse gases.",
    choice_c: "heat generated by human activities.",
    choice_d: "reflection of sunlight by clouds.",
    correct_answer: "B",
    question_type: "earth-processes",
    question_category: "SIN",
    difficulty_level: "medium",
    has_figure: false,
    figure_url: null,
    notes: "Practice ACT 3 Science Question 11 - greenhouse effect mechanism"
  },
  {
    question_number: 12,
    question_stem: "Based on Figure 3, atmospheric CO₂ concentration has increased by approximately how much from 1960 to 2010?",
    choice_a: "50 ppm",
    choice_b: "75 ppm",
    choice_c: "100 ppm",
    choice_d: "125 ppm",
    correct_answer: "B",
    question_type: "earth-processes",
    question_category: "IOD",
    difficulty_level: "easy",
    has_figure: true,
    figure_url: null,
    notes: "Practice ACT 3 Science Question 12 - CO2 concentration change"
  },
  {
    question_number: 13,
    question_stem: "Which greenhouse gas mentioned in the passage has the highest heat-trapping potential per molecule?",
    choice_a: "Carbon dioxide (CO₂)",
    choice_b: "Methane (CH₄)",
    choice_c: "Nitrous oxide (N₂O)",
    choice_d: "Water vapor (H₂O)",
    correct_answer: "C",
    question_type: "earth-processes",
    question_category: "SIN",
    difficulty_level: "hard",
    has_figure: false,
    figure_url: null,
    notes: "Practice ACT 3 Science Question 13 - greenhouse gas potency"
  },
  {
    question_number: 14,
    question_stem: "The data in Table 2 suggest that global average temperature and atmospheric CO₂ concentration are:",
    choice_a: "inversely related.",
    choice_b: "not related.",
    choice_c: "positively correlated.",
    choice_d: "related in a complex, non-linear way.",
    correct_answer: "C",
    question_type: "earth-processes",
    question_category: "IOD",
    difficulty_level: "medium",
    has_figure: true,
    figure_url: null,
    notes: "Practice ACT 3 Science Question 14 - correlation analysis"
  },
  {
    question_number: 15,
    question_stem: "According to the passage, which human activity contributes most to increased atmospheric CO₂?",
    choice_a: "Agriculture",
    choice_b: "Transportation",
    choice_c: "Fossil fuel combustion",
    choice_d: "Deforestation",
    correct_answer: "C",
    question_type: "earth-processes",
    question_category: "SIN",
    difficulty_level: "easy",
    has_figure: false,
    figure_url: null,
    notes: "Practice ACT 3 Science Question 15 - CO2 sources"
  },
  {
    question_number: 16,
    question_stem: "In the genetic cross described in Experiment 1, what is the expected phenotypic ratio in the F2 generation?",
    choice_a: "1:1",
    choice_b: "1:2:1",
    choice_c: "3:1",
    choice_d: "9:3:3:1",
    correct_answer: "C",
    question_type: "biological-processes",
    question_category: "SIN",
    difficulty_level: "medium",
    has_figure: false,
    figure_url: null,
    notes: "Practice ACT 3 Science Question 16 - Mendelian ratios"
  },
  {
    question_number: 17,
    question_stem: "Based on the results in Table 3, the allele for purple flowers appears to be:",
    choice_a: "dominant to the allele for white flowers.",
    choice_b: "recessive to the allele for white flowers.",
    choice_c: "codominant with the allele for white flowers.",
    choice_d: "incompletely dominant to the allele for white flowers.",
    correct_answer: "A",
    question_type: "biological-processes",
    question_category: "IOD",
    difficulty_level: "medium",
    has_figure: true,
    figure_url: null,
    notes: "Practice ACT 3 Science Question 17 - dominance patterns"
  },
  {
    question_number: 18,
    question_stem: "If a heterozygous purple-flowered plant is crossed with a white-flowered plant, what percentage of offspring would be expected to have white flowers?",
    choice_a: "0%",
    choice_b: "25%",
    choice_c: "50%",
    choice_d: "75%",
    correct_answer: "C",
    question_type: "biological-processes",
    question_category: "SIN",
    difficulty_level: "medium",
    has_figure: false,
    figure_url: null,
    notes: "Practice ACT 3 Science Question 18 - test cross prediction"
  },
  {
    question_number: 19,
    question_stem: "The term 'genotype' refers to:",
    choice_a: "the physical appearance of an organism.",
    choice_b: "the genetic makeup of an organism.",
    choice_c: "the environment in which an organism lives.",
    choice_d: "the reproductive success of an organism.",
    correct_answer: "B",
    question_type: "biological-processes",
    question_category: "SIN",
    difficulty_level: "easy",
    has_figure: false,
    figure_url: null,
    notes: "Practice ACT 3 Science Question 19 - genetic terminology"
  },
  {
    question_number: 20,
    question_stem: "In Experiment 2, what was the purpose of examining multiple generations?",
    choice_a: "To observe how traits change over time",
    choice_b: "To verify the inheritance patterns",
    choice_c: "To study environmental effects on genes",
    choice_d: "To determine mutation rates",
    correct_answer: "B",
    question_type: "biological-processes",
    question_category: "SIN",
    difficulty_level: "medium",
    has_figure: false,
    figure_url: null,
    notes: "Practice ACT 3 Science Question 20 - experimental rationale"
  }
];

/**
 * Upload Science questions 1-20
 */
async function uploadScienceQuestions1_20() {
  console.log('\n📤 UPLOADING SCIENCE QUESTIONS 1-20...');

  let totalUploaded = 0;
  const errors = [];

  for (const question of SCIENCE_QUESTIONS_1_20) {
    try {
      const questionData = {
        test_number: 3,
        passage_id: null, // Will be linked after passages are uploaded
        ...question
      };

      const { error } = await supabase
        .from('act_science_questions')
        .upsert([questionData]);

      if (error) {
        errors.push(`Science Question ${question.question_number}: ${error.message}`);
      } else {
        totalUploaded++;
        console.log(`  ✅ Uploaded Science question ${question.question_number}`);
        console.log(`     Stem: ${question.question_stem.substring(0, 50)}...`);
        console.log(`     Answer: ${question.correct_answer}`);
      }
    } catch (err) {
      errors.push(`Science Question ${question.question_number}: ${err.message}`);
    }
  }

  console.log(`\n✅ Science questions 1-20 upload complete: ${totalUploaded} items uploaded`);
  if (errors.length > 0) {
    console.log(`⚠️ Errors: ${errors.length}`);
    errors.forEach(error => console.log(`  • ${error}`));
  }

  return { totalUploaded, errors };
}

/**
 * Check Science progress after adding 1-20
 */
async function checkScienceProgress() {
  console.log('\n📊 CHECKING SCIENCE SECTION PROGRESS...');

  // Check total questions
  const { data: questions } = await supabase
    .from('act_science_questions')
    .select('question_number, correct_answer, choice_a, choice_b, choice_c, choice_d')
    .eq('test_number', 3)
    .order('question_number');

  console.log(`❓ Total Science Questions: ${questions?.length || 0}`);

  let questionsWithAllChoices = 0;
  let questionsWithAnswers = 0;

  questions?.forEach(q => {
    const hasAllChoices = q.choice_a && q.choice_b && q.choice_c && q.choice_d;
    if (hasAllChoices) questionsWithAllChoices++;
    if (q.correct_answer) questionsWithAnswers++;
  });

  console.log(`\n📊 SCIENCE SECTION QUALITY:`);
  console.log(`  Questions with all choices: ${questionsWithAllChoices}/${questions?.length || 0}`);
  console.log(`  Questions with answers: ${questionsWithAnswers}/${questions?.length || 0}`);
  console.log(`  Progress: ${questions?.length || 0}/40 questions (${Math.round(((questions?.length || 0) / 40) * 100)}%)`);

  return {
    totalQuestions: questions?.length || 0,
    questionsWithAllChoices,
    questionsWithAnswers,
    progressPercentage: Math.round(((questions?.length || 0) / 40) * 100)
  };
}

/**
 * Main function for Science questions 1-20
 */
async function extractScienceQuestions1_20() {
  console.log('\n🚀 STARTING FINAL SCIENCE SECTION EXTRACTION - QUESTIONS 1-20');

  console.log('\n📋 ADDING SCIENCE QUESTIONS 1-20:');
  console.log(`  Questions to Add: ${SCIENCE_QUESTIONS_1_20.length} (Questions 1-20)`);

  // Upload questions 1-20
  const uploadResults = await uploadScienceQuestions1_20();

  // Check progress
  const progressResults = await checkScienceProgress();

  console.log('\n🎯 SCIENCE SECTION EXTRACTION STARTED!');
  console.log(`✅ Questions Added: ${uploadResults.totalUploaded}`);
  console.log(`✅ Total Progress: ${progressResults.totalQuestions}/40 questions (${progressResults.progressPercentage}%)`);
  console.log(`✅ Quality: ${progressResults.questionsWithAllChoices}/${progressResults.totalQuestions} questions have all choices`);

  console.log('\n📋 NEXT STEPS:');
  console.log(`1. Continue extracting remaining ${40 - progressResults.totalQuestions} Science questions`);
  console.log('2. Extract all 7 Science passages');
  console.log('3. Complete Practice ACT 3 extraction with 100% accuracy');

  return {
    success: true,
    uploadResults,
    progressResults,
    remainingQuestions: 40 - progressResults.totalQuestions
  };
}

// Run extraction for Science questions 1-20
extractScienceQuestions1_20().catch(console.error);