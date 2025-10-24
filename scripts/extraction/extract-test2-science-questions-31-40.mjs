#!/usr/bin/env node

/**
 * EXTRACT TEST 2 SCIENCE QUESTIONS 31-40
 * Extract final Science questions from magma and planetary motion passages
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

console.log('🔧 EXTRACTING TEST 2 SCIENCE QUESTIONS 31-40\n');
console.log('='.repeat(70));

// Science questions 31-40 from magma and planetary motion passages
const questions = [
  {
    number: 31,
    stem: "According to Figure 1, at 1,150°C, the solubility of CO₂ in basanite magma and the solubility of CO₂ in tholeiitic basalt magma are closest in value at which of the following pairs of pressures?",
    choices: {
      A: "basanite magma: 50 MPa; tholeiitic basalt magma: 50 MPa",
      B: "basanite magma: 125 MPa; tholeiitic basalt magma: 125 MPa",
      C: "basanite magma: 250 MPa; tholeiitic basalt magma: 200 MPa",
      D: "basanite magma: 380 MPa; tholeiitic basalt magma: 300 MPa"
    }
  },
  {
    number: 32,
    stem: "According to Figure 2, increasing the temperature from 650°C to 1,150°C has the lesser effect on the solubility of CO₂ in rhyolite magma at which pressure, 100 MPa or 300 MPa?",
    choices: {
      F: "100 MPa; the solubility of CO₂ decreases by about 400 ppmw.",
      G: "100 MPa; the solubility of CO₂ decreases by about 1,300 ppmw.",
      H: "300 MPa; the solubility of CO₂ decreases by about 400 ppmw.",
      J: "300 MPa; the solubility of CO₂ decreases by about 1,300 ppmw."
    }
  },
  {
    number: 33,
    stem: "Consider the solubility of CO₂ in rhyolite magma at 750°C and 200 MPa, as shown in Figure 2. According to Figure 3, this rhyolite magma has a weight percent of H₂O closest to which of the following?",
    choices: {
      A: "0.0%",
      B: "2.0%",
      C: "4.0%",
      D: "6.0%"
    }
  },
  {
    number: 34,
    stem: "Based on Figure 1, at 1,150°C and 150 MPa, the solubility of CO₂ in leucitite magma is approximately how much greater or less than the solubility of CO₂ in tholeiitic basalt magma?",
    choices: {
      F: "1,750 ppmw greater",
      G: "2,300 ppmw greater",
      H: "1,750 ppmw less",
      J: "2,300 ppmw less"
    }
  },
  {
    number: 35,
    stem: "Based on Figure 1, as viewed from Earth, for approximately how many days between July 2005 and February 2006 did Mars move retrograde?",
    choices: {
      A: "30",
      B: "70",
      C: "150",
      D: "220"
    }
  },
  {
    number: 36,
    stem: "Which of the following statements best describes the primary difference between the two hypotheses?",
    choices: {
      F: "Hypothesis 1 claims that all planets follow looped orbits around Earth, whereas Hypothesis 2 claims that all planets follow elliptical orbits around the Sun.",
      G: "Hypothesis 1 claims that all planets follow elliptical orbits around Earth, whereas Hypothesis 2 claims that all planets follow looped orbits around the Sun.",
      H: "Hypothesis 1 claims that all planets follow clockwise orbits around the central body in the solar system, whereas Hypothesis 2 claims that all planets follow counterclockwise orbits around the Sun.",
      J: "Hypothesis 1 claims that all planets follow elliptical orbits around the Sun, whereas Hypothesis 2 claims that all planets follow looped orbits around Earth."
    }
  },
  {
    number: 37,
    stem: "A supporter of Hypothesis 1 and a supporter of Hypothesis 2 would both be likely to agree with which of the following statements? When viewed from Earth, if a planet appears to be moving prograde, that planet is actually moving:",
    choices: {
      A: "clockwise around Earth.",
      B: "clockwise around the Sun.",
      C: "counterclockwise around Earth.",
      D: "counterclockwise around the central body in the solar system."
    }
  },
  {
    number: 38,
    stem: "Assume that Figures 2 and 3 are drawn to scale. Which of the figures, if either, implies that the distance between Earth and Mars varies with time?",
    choices: {
      F: "Figure 2 only",
      G: "Figure 3 only",
      H: "Both Figure 2 and Figure 3",
      J: "Neither Figure 2 nor Figure 3"
    }
  },
  {
    number: 39,
    stem: "Consider both the interval of time represented in Figures 1 and 3 and the reason that, according to Hypothesis 2, the line of sight from Earth to Mars drifts over time. Is the top portion of Figure 3 consistent with that reason?",
    choices: {
      A: "Yes; Earth is shown as having the smaller orbit and as having completed a greater percentage of its revolution around the Sun than is Mars.",
      B: "Yes; Earth is shown as having the larger orbit and as having completed a greater percentage of its revolution around the Sun than is Mars.",
      C: "No; Earth is shown as having the smaller orbit and as having completed a greater percentage of its revolution around the Sun than is Mars.",
      D: "No; Earth is shown as having the larger orbit and as having completed a greater percentage of its revolution around the Sun than is Mars."
    }
  },
  {
    number: 40,
    stem: "Can Hypothesis 2 explain why Venus occasionally appears to move retrograde?",
    choices: {
      F: "No; Hypothesis 2 does not account for the motion of planets that are closer to the Sun than Earth is.",
      G: "No; Hypothesis 2 does not account for the motion of planets that are farther from the Sun than Earth is.",
      H: "Yes; Hypothesis 2 accounts for the motion of planets that are closer to the Sun than Earth is.",
      J: "Yes; Hypothesis 2 accounts for the motion of planets that are farther from the Sun than Earth is."
    }
  }
];

console.log('\n📝 Extracting Science questions 31-40:');

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
console.log('✅ Science questions 31-40 now have real content!');
console.log('\n🎊 ALL 40 SCIENCE QUESTIONS NOW COMPLETE! 🎊');
console.log('\n📋 SUMMARY:');
console.log('    ✅ Termite/Bacteria passage (Q1-10): Complete');
console.log('    ✅ Bacteria/Buoyancy passage (Q11-20): Complete');
console.log('    ✅ Chemistry/Magma passage (Q21-30): Complete');
console.log('    ✅ Magma/Planetary motion passage (Q31-40): Complete');
console.log('\n📋 NEXT: Continue with Math test questions (11-60)\n');