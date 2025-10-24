#!/usr/bin/env node

/**
 * EXTRACT TEST 2 SCIENCE QUESTIONS 11-20
 * Continue extracting Science questions from bacteria/buoyancy passages
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

console.log('🔧 EXTRACTING TEST 2 SCIENCE QUESTIONS 11-20\n');
console.log('='.repeat(70));

// Science questions 11-20 from the PDF (continuing bacteria and buoyancy passages)
const questions = [
  {
    number: 11,
    stem: "Suppose that in Experiment 2 the scientists had determined the percent survival for a sample incubated at 25°C for 1 week. The percent survival of the Strain V2 elementary bodies in the sample would most likely have been:",
    choices: {
      F: "0%.",
      G: "between 2% and 29%.",
      H: "between 29% and 59%.",
      J: "greater than 59%."
    }
  },
  {
    number: 12,
    stem: "At which 2 temperatures was the percent survival of Strain V2 elementary bodies less for the longer incubation time than for the shorter incubation time?",
    choices: {
      A: "4°C and 20°C",
      B: "4°C and 37°C",
      C: "20°C and 30°C",
      D: "20°C and 37°C"
    }
  },
  {
    number: 13,
    stem: "Which of the following questions was NOT addressed by the experiments?",
    choices: {
      F: "Does incubation time affect the percent survival of Strain E and Strain V2 elementary bodies after lyophilization?",
      G: "Does temperature affect the percent survival of Strain E and Strain V2 elementary bodies after lyophilization?",
      H: "Does the number of Strain E or Strain V2 elementary bodies present in a sample before lyophilization affect their percent survival?",
      J: "Do Strain E elementary bodies have a greater percent survival than Strain V2 elementary bodies after lyophilization and incubation?"
    }
  },
  {
    number: 14,
    stem: "Based on the results of Study 2, as the density of the fluid in which Stone X was submerged increased, the buoyant force on Stone X:",
    choices: {
      F: "decreased only.",
      G: "increased only.",
      H: "decreased and then increased.",
      J: "varied with no general trend."
    }
  },
  {
    number: 15,
    stem: "Based on the results of Study 2, for Stone Y, what was the difference between the buoyant force in Fluid A and the buoyant force in Fluid B?",
    choices: {
      A: "0.11 N",
      B: "0.23 N",
      C: "0.47 N",
      D: "0.71 N"
    }
  },
  {
    number: 16,
    stem: "Suppose the students decide to study whether a cylinder's volume determines the submerged length of the cylinder in a given fluid. Which of the following procedural changes should the students make to Study 1? The students should test:",
    choices: {
      F: "a single cylinder with multiple fluids; the fluids should each have the same density as the cylinder.",
      G: "a single cylinder with multiple fluids; the fluids should have different densities.",
      H: "multiple cylinders with a single fluid; the cylinders should have different volumes but the same density.",
      J: "multiple cylinders with a single fluid; the cylinders should have different weights but the same volume."
    }
  },
  {
    number: 17,
    stem: "In Study 1, did the cylinder displace a greater volume of water or a greater volume of Fluid A?",
    choices: {
      A: "Water, because the cylinder's submerged length was greater in water than in Fluid A.",
      B: "Water, because the cylinder's submerged length was greater in Fluid A than in water.",
      C: "Fluid A, because the cylinder's submerged length was greater in water than in Fluid A.",
      D: "Fluid A, because the cylinder's submerged length was greater in Fluid A than in water."
    }
  },
  {
    number: 18,
    stem: "Suppose that in Study 1 the students had placed the cylinder in a container of fluid having a density of 1.60 g/cm³. The submerged length of the cylinder would most likely have been:",
    choices: {
      F: "less than 4.9 cm.",
      G: "between 4.9 cm and 5.9 cm.",
      H: "between 5.9 cm and 7.4 cm.",
      J: "greater than 7.4 cm."
    }
  },
  {
    number: 19,
    stem: "Suppose that in Study 2 the students had tested a stone having the same weight as Stone Z but a larger volume than Stone Z. Which of the following statements about the buoyant force on this submerged stone would be correct? The buoyant force on this stone in:",
    choices: {
      A: "water would have been less than 0.94 N.",
      B: "Fluid A would have been less than 1.18 N.",
      C: "Fluid B would have been greater than 1.41 N.",
      D: "water would have been greater than the buoyant force on this stone in Fluid A."
    }
  },
  {
    number: 20,
    stem: "Assume that Atlantic Ocean water has a density of 1.01 g/cm³ and that Pacific Ocean water has a density of 1.03 g/cm³. Based on the results of Study 1, in which ocean would a given iceberg more likely have the greater submerged volume?",
    choices: {
      F: "The Atlantic Ocean, because the results of Study 1 indicate that submerged volume increases as fluid density decreases.",
      G: "The Atlantic Ocean, because the results of Study 1 indicate that submerged volume decreases as fluid density decreases.",
      H: "The Pacific Ocean, because the results of Study 1 indicate that submerged volume increases as fluid density decreases.",
      J: "The Pacific Ocean, because the results of Study 1 indicate that submerged volume decreases as fluid density decreases."
    }
  }
];

console.log('\n📝 Extracting Science questions 11-20:');

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
console.log('✅ Science questions 11-20 now have real content!');
console.log('\n📋 PROGRESS: 20/40 Science questions complete');
console.log('    Continue with remaining Science passages\n');