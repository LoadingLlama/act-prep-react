#!/usr/bin/env node

/**
 * EXTRACT TEST 2 SCIENCE QUESTIONS 21-30
 * Extract questions from chemistry and magma passages
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

console.log('🔧 EXTRACTING TEST 2 SCIENCE QUESTIONS 21-30\n');
console.log('='.repeat(70));

// Science questions 21-30 from chemistry and magma passages
const questions = [
  {
    number: 21,
    stem: "If a trial had been performed with 60 mL of NaClO solution and 40 mL of NaI solution, T₁ would most likely have been:",
    choices: {
      A: "less than 25.5°C.",
      B: "between 25.5°C and 29.0°C.",
      C: "between 29.0°C and 31.7°C.",
      D: "greater than 31.7°C."
    }
  },
  {
    number: 22,
    stem: "Before the experiment, a student predicted that ΔT for Trial 2 would be greater than ΔT for Trial 6. Do the results shown in Table 1 support this prediction?",
    choices: {
      F: "Yes; ΔT for Trial 2 was 5.1°C less than ΔT for Trial 6.",
      G: "Yes; ΔT for Trial 2 was 5.1°C greater than ΔT for Trial 6.",
      H: "No; ΔT for Trial 2 was 8.6°C less than ΔT for Trial 6.",
      J: "No; ΔT for Trial 2 was 8.6°C greater than ΔT for Trial 6."
    }
  },
  {
    number: 23,
    stem: "Which of the following statements best explains why ΔT was 0.0°C for Trial 8? The volume of solution added was 0 mL for one of the:",
    choices: {
      A: "products, NaClO, so no reaction had occurred.",
      B: "products, NaI, so no reaction had occurred.",
      C: "reactants, NaClO, so no reaction had occurred.",
      D: "reactants, NaI, so no reaction had occurred."
    }
  },
  {
    number: 24,
    stem: "Consider the trial for which the volume of NaClO was 4 times as great as the volume of NaI. For this trial, T₁ was:",
    choices: {
      F: "25.5°C.",
      G: "26.2°C.",
      H: "30.6°C.",
      J: "32.5°C."
    }
  },
  {
    number: 25,
    stem: "Suppose a trial had been performed with 20 mL of NaClO solution and 80 mL of NaI solution. Based on Figure 1, ΔT for this new trial would most likely have been closest to which of the following?",
    choices: {
      A: "25 mL.",
      B: "50 mL.",
      C: "75 mL.",
      D: "100 mL."
    }
  },
  {
    number: 26,
    stem: "In each trial, the total volume of solution poured into the cup was:",
    choices: {
      F: "25 mL.",
      G: "50 mL.",
      H: "75 mL.",
      J: "100 mL."
    }
  },
  {
    number: 27,
    stem: "Suppose that the reaction studied had been endothermic. As the endothermic reaction progressed, would the solution temperature more likely have decreased or increased?",
    choices: {
      A: "Decreased, because the reaction would have released heat.",
      B: "Decreased, because the reaction would have absorbed heat.",
      C: "Increased, because the reaction would have released heat.",
      D: "Increased, because the reaction would have absorbed heat."
    }
  },
  {
    number: 28,
    stem: "According to Figure 2, at 300 MPa, the solubility of CO₂ in rhyolite magma is closest to 2,000 ppmw at which of the following temperatures?",
    choices: {
      F: "700°C",
      G: "750°C",
      H: "800°C",
      J: "850°C"
    }
  },
  {
    number: 29,
    stem: "Based on Figure 3, at 750°C and 350 MPa, rhyolite magma having a solubility of CO₂ equal to 1,250 ppmw would most likely have a weight percent of H₂O that is:",
    choices: {
      A: "less than 2.0%.",
      B: "between 2.0% and 4.0%.",
      C: "between 4.0% and 6.0%.",
      D: "greater than 6.0%."
    }
  },
  {
    number: 30,
    stem: "According to Figure 1, at 1,150°C, the solubility of CO₂ in basanite magma and the solubility of CO₂ in tholeiitic basalt magma are closest in value at which of the following pairs of pressures?",
    choices: {
      F: "basanite magma: 50 MPa; tholeiitic basalt magma: 50 MPa",
      G: "basanite magma: 125 MPa; tholeiitic basalt magma: 125 MPa",
      H: "basanite magma: 250 MPa; tholeiitic basalt magma: 200 MPa",
      J: "basanite magma: 380 MPa; tholeiitic basalt magma: 300 MPa"
    }
  }
];

console.log('\n📝 Extracting Science questions 21-30:');

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
console.log('✅ Science questions 21-30 now have real content!');
console.log('\n📋 PROGRESS: 30/40 Science questions complete');
console.log('    Continue with final Science passage (questions 31-40)\n');