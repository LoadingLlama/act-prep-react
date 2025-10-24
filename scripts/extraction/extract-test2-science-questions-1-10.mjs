#!/usr/bin/env node

/**
 * EXTRACT TEST 2 SCIENCE QUESTIONS 1-10
 * Extract first 10 Science questions from termite/bacteria passages
 */

import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '../../.env') });

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

const TEST_NUMBER = 2;

console.log('🔧 EXTRACTING TEST 2 SCIENCE QUESTIONS 1-10\n');
console.log('='.repeat(70));

// Science questions 1-10 from the PDF (first two passages)
const questions = [
  {
    number: 1,
    stem: "Of the following combinations of type of mulch and mulch age, which combination resulted in the greatest mass of mulch consumed by R. flavipes?",
    choices: {
      A: "oak, 24 weeks",
      B: "pine bark, 24 weeks",
      C: "oak, 48 weeks",
      D: "pine bark, 48 weeks"
    }
  },
  {
    number: 2,
    stem: "Which of the following statements about the effect of mulch age on the consumption of mulch by R. flavipes is consistent with the figure? As mulch age increased from 1 week through 48 weeks, the mass of mulch consumed by R. flavipes:",
    choices: {
      F: "decreased for all 5 types of mulch.",
      G: "increased for all 5 types of mulch.",
      H: "initially decreased for all 5 types of mulch, but then increased for some of the 5 types of mulch.",
      J: "initially increased for all 5 types of mulch, but then decreased for some of the 5 types of mulch."
    }
  },
  {
    number: 3,
    stem: "Based on the passage, would R. flavipes be classified as an autotroph or as a detritivore, and why?",
    choices: {
      A: "Autotroph, because R. flavipes produces its own energy without consuming organic material.",
      B: "Autotroph, because R. flavipes obtains its energy by consuming decaying organic material.",
      C: "Detritivore, because R. flavipes produces its own energy without consuming organic material.",
      D: "Detritivore, because R. flavipes obtains its energy by consuming decaying organic material."
    }
  },
  {
    number: 4,
    stem: "Based on the passage, is the primary food source of R. flavipes more likely cellulose or cholesterol?",
    choices: {
      F: "Cellulose; R. flavipes consumes the cell membranes of animal cells, and the cell membranes of animal cells contain cellulose.",
      G: "Cellulose; R. flavipes consumes the cell walls of plant cells, and the cell walls of plant cells consist primarily of cellulose.",
      H: "Cholesterol; R. flavipes consumes the cell membranes of animal cells, and the cell membranes of animal cells contain cholesterol.",
      J: "Cholesterol; R. flavipes consumes the cell walls of plant cells, and the cell walls of plant cells consist primarily of cholesterol."
    }
  },
  {
    number: 5,
    stem: "Which of the following statements comparing the consumption by R. flavipes of 1-week-old oak mulch, 24-week-old oak mulch, and 48-week-old oak mulch is supported by the figure?",
    choices: {
      A: "More 1-week-old mulch was consumed than 24-week-old mulch, and more 24-week-old mulch was consumed than 48-week-old mulch.",
      B: "Less 1-week-old mulch was consumed than 24-week-old mulch, and less 24-week-old mulch was consumed than 48-week-old mulch.",
      C: "More 1-week-old mulch was consumed than 24-week-old mulch, and less 24-week-old mulch was consumed than 48-week-old mulch.",
      D: "Less 1-week-old mulch was consumed than 24-week-old mulch, and more 24-week-old mulch was consumed than 48-week-old mulch."
    }
  },
  {
    number: 6,
    stem: "What mass, in grams (NOT milligrams), of the 48-week-old oak bark mulch was consumed by R. flavipes?",
    choices: {
      F: "0.06",
      G: "0.14",
      H: "0.6",
      J: "14"
    }
  },
  {
    number: 7,
    stem: "According to Table 1, what was the percent survival of Strain E at 1 week when incubated at 20°C?",
    choices: {
      A: "42%",
      B: "52%",
      C: "69%",
      D: "81%"
    }
  },
  {
    number: 8,
    stem: "Based on the results of Experiments 1 and 2, as incubation temperature increased from 4°C to 37°C, the percent survival at 1 week:",
    choices: {
      F: "increased for both Strain E and Strain V2.",
      G: "decreased for both Strain E and Strain V2.",
      H: "increased for Strain E but decreased for Strain V2.",
      J: "decreased for Strain E but increased for Strain V2."
    }
  },
  {
    number: 9,
    stem: "Based on the results of Experiments 1 and 2, which strain had higher percent survival at 1 month when incubated at 4°C?",
    choices: {
      A: "Strain E; the percent survival was 51%.",
      B: "Strain E; the percent survival was 81%.",
      C: "Strain V2; the percent survival was 5%.",
      D: "Strain V2; the percent survival was 39%."
    }
  },
  {
    number: 10,
    stem: "Which of the following best describes the general trend shown for both Strain E and Strain V2 when comparing percent survival at 1 week vs. 1 month?",
    choices: {
      F: "Percent survival was higher at 1 month than at 1 week.",
      G: "Percent survival was lower at 1 month than at 1 week.",
      H: "Percent survival was the same at 1 month and at 1 week.",
      J: "The relationship between percent survival at 1 week and 1 month varied with temperature."
    }
  }
];

console.log('\n📝 Extracting Science questions 1-10:');

let successCount = 0;

for (const q of questions) {
  console.log(`\nQ${q.number}: ${q.stem.substring(0, 80)}...`);
  console.log(`Choices: ${Object.keys(q.choices).join(', ')}`);

  // Update in database
  const updateData = {
    question_stem: q.stem,
    choice_a: q.choices.A || q.choices.F,
    choice_b: q.choices.B || q.choices.G,
    choice_c: q.choices.C || q.choices.H,
    choice_d: q.choices.D || q.choices.J
  };

  const { error } = await supabase
    .from('act_science_questions')
    .update(updateData)
    .eq('test_number', TEST_NUMBER)
    .eq('question_number', q.number);

  if (error) {
    console.error(`❌ Error updating Science Q${q.number}:`, error.message);
  } else {
    successCount++;
    console.log(`✅ Updated Science Q${q.number} in database`);
  }
}

console.log(`\n🎉 Successfully extracted and updated ${successCount}/10 Science questions!`);
console.log('✅ Science questions 1-10 now have real content!');
console.log('\n📋 PROGRESS: 10/40 Science questions complete');
console.log('    Continue with remaining Science passages\n');