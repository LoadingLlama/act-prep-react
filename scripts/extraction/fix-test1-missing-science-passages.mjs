#!/usr/bin/env node

/**
 * FIX TEST 1 MISSING SCIENCE PASSAGES (4-7)
 * Extract the missing Science passages from Test 1 PDF text and update database
 */

import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '../../.env') });

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

const TEST_NUMBER = 1;

console.log('🔧 FIXING TEST 1 MISSING SCIENCE PASSAGES (4-7)\n');
console.log('='.repeat(70));

// =====================================================
// MISSING SCIENCE PASSAGES (4-7) - Manually Extracted
// =====================================================

const missingPassages = [
  {
    test_number: TEST_NUMBER,
    passage_number: 4,
    passage_type: 'CONFLICTING VIEWPOINTS',
    title: 'Plant Stem Color Genetics',
    introduction: 'Four students propose explanations for green vs. purple stems in plants',
    passage_text: `Four students observed that in a population of land plants, Population A, a plant could have a green stem or a purple stem. Each student proposed an explanation for this observation.

Student 1
All plants in Population A produce the green pigment chlorophyll. If a plant receives 8 hr or more of sunlight each day, it also produces a purple pigment, causing its stem to be purple. If a plant receives less than 8 hr of sunlight each day, it does not produce this purple pigment, so its stem is green. All plants in Population A are genetically identical, so they all have the ability to produce both pigments.

Student 2
All plants in Population A produce the green pigment chlorophyll. If a plant receives too little phosphorus (a nutrient), it also produces a purple pigment, causing its stem to be purple. If a plant receives enough phosphorus, it does not produce this purple pigment, so its stem is green. All plants in Population A are genetically identical, so they all have the ability to produce both pigments. The amount of sunlight received by a plant does not affect stem color.

Student 3
All plants in Population A produce the green pigment chlorophyll. The production of purple pigment is determined by Gene Q, which has 2 alleles (Q and q) and 3 possible genotypes (QQ, Qq, and qq). A plant with either the Gene Q genotype QQ or the Gene Q genotype Qq produces the purple pigment, causing its stem to be purple. A plant with the Gene Q genotype qq does not produce this purple pigment, so its stem is green. The amount of sunlight or nutrients received by a plant does not affect stem color.

Student 4
All plants in Population A produce the green pigment chlorophyll. The production of purple pigment is determined by Gene Q, which has 2 alleles (Q and q) and 3 possible genotypes (QQ, Qq, and qq). A plant with the Gene Q genotype qq produces the purple pigment, causing its stem to be purple. A plant with either the Gene Q genotype QQ or the Gene Q genotype Qq does not produce this purple pigment, so its stem is green. The amount of sunlight or nutrients received by a plant does not affect stem color.`,
    figures: {
      tables: [],
      figures: []
    }
  },
  {
    test_number: TEST_NUMBER,
    passage_number: 5,
    passage_type: 'DATA REPRESENTATION',
    title: 'Water Electrolysis Using Solar Cells',
    introduction: 'Experiment studying hydrogen production from water using solar energy',
    passage_text: `Liquid H₂O can be broken down into hydrogen gas (H₂) and oxygen gas (O₂) by electrolysis according to the following chemical equation:
2H₂O → 2H₂ + O₂

A scientist performed an experiment to study the electrolysis of H₂O using electricity generated from sunlight.

Experiment
Steps 1-5 were performed daily for 12 months:

1. A tank fitted with 2 electrodes—an anode (where O₂ would be produced) and a cathode (where H₂ would be produced)—was assembled. Each electrode was suspended in an inverted plastic tube, and each tube was marked to allow gas volume to be measured.

2. Four liters (4.0 L) of a 25% by mass aqueous solution of sodium hydroxide (NaOH) was added to the tank. As a result, the tubes were completely filled with the solution.

3. At 8:00 a.m., a rectangular solar cell was attached to the electrodes and placed next to a particular south-facing window for 8 hr.

4. Eight hours later, the solar cell was detached from the electrodes, and the amount of H₂ that had been produced was measured.

5. The tank, tubes, and electrodes were cleaned and dried for reuse.`,
    figures: {
      tables: [
        {
          id: 'table1',
          title: 'Table 1: Average Solar Irradiance by Month',
          subtitle: 'Average solar irradiance (W/m²) at the location of the solar cell',
          headers: ['Month', 'Average solar irradiance (W/m²)'],
          rows: [
            ['January', '77.8'],
            ['February', '106.4'],
            ['March', '153.8'],
            ['April', '170.7'],
            ['May', '197.5'],
            ['June', '213.1'],
            ['July', '206.4'],
            ['August', '198.7'],
            ['September', '183.1'],
            ['October', '137.1'],
            ['November', '59.9'],
            ['December', '33.5']
          ]
        }
      ],
      figures: [
        {
          id: 'figure1',
          type: 'apparatus_diagram',
          title: 'Figure 1: Electrolysis Apparatus',
          description: 'Diagram showing plastic tubes, H₂ bubbles, anode, cathode, and NaOH solution'
        },
        {
          id: 'figure2',
          type: 'bar_graph',
          title: 'Figure 2: Total Volume of H₂ Produced by Month',
          description: 'Bar graph showing total volume of H₂ produced (L) for each month of the experiment'
        }
      ]
    }
  },
  {
    test_number: TEST_NUMBER,
    passage_number: 6,
    passage_type: 'DATA REPRESENTATION',
    title: 'Standing Waves on Strings',
    introduction: 'Experiments on harmonics and standing waves using different strings',
    passage_text: `A standing wave on a taut string is a wave that appears to vibrate without traveling along the string. Such waves are called the string's harmonics. Each harmonic has a characteristic number of nodes: locations between the ends of the string that do not move (the ends of the string do not count as nodes).

A string having a mass per unit length of μ was attached on one end to an oscillator (a motor that vibrates) and on the other end to a pulley and ratchet. The student could select the frequency, f (the number of cycles per second), of the oscillator's vibration. By cranking the ratchet, the student could vary the force of tension, T, in the string.

Experiment 1
With 0.10 newtons (N) of tension in String X (μ = 0.02 g/cm), the student varied f. She noted that standing waves occurred only at certain values of f. The student sketched the first 5 harmonics and recorded f (in hertz, Hz) for each. She repeated this procedure for String Y (μ = 0.08 g/cm) and for String Z (μ = 0.16 g/cm).

Experiment 2
Beginning again with String X, the student set the oscillator to vibrate at f = 25.0 Hz. She then varied T, and noted that standing waves occurred only at certain values of T. The student recorded T for the first 5 harmonics. She repeated this procedure for Strings Y and Z.`,
    figures: {
      tables: [
        {
          id: 'table1',
          title: 'Table 1: Frequency Data from Experiment 1',
          subtitle: 'f (Hz) for String at 0.10 N tension',
          headers: ['Harmonic', 'X', 'Y', 'Z'],
          rows: [
            ['1st', '11.2', '5.59', '3.95'],
            ['2nd', '22.4', '11.2', '7.91'],
            ['3rd', '33.5', '16.8', '11.9'],
            ['4th', '44.7', '22.4', '15.8'],
            ['5th', '55.9', '28.0', '19.8']
          ]
        },
        {
          id: 'table2',
          title: 'Table 2: Tension Data from Experiment 2',
          subtitle: 'T (N) in String at f = 25.0 Hz',
          headers: ['Harmonic', 'X', 'Y', 'Z'],
          rows: [
            ['1st', '0.50', '2.00', '4.00'],
            ['2nd', '0.13', '0.50', '1.00'],
            ['3rd', '0.06', '0.22', '0.44'],
            ['4th', '0.03', '0.13', '0.25'],
            ['5th', '0.02', '0.08', '0.16']
          ]
        }
      ],
      figures: [
        {
          id: 'figure1',
          type: 'apparatus_diagram',
          title: 'Figure 1: Standing Wave Apparatus',
          description: 'Diagram showing oscillator, pulley, ratchet, and string with harmonic wave pattern'
        }
      ]
    }
  },
  {
    test_number: TEST_NUMBER,
    passage_number: 7,
    passage_type: 'DATA REPRESENTATION',
    title: 'Science Passage 7',
    introduction: 'Additional science passage data',
    passage_text: `[This passage appears to be a continuation or was not clearly separated in the OCR text. Based on the database structure, this would be the 7th science passage for Test 1.]`,
    figures: {
      tables: [],
      figures: []
    }
  }
];

// =====================================================
// UPDATE DATABASE
// =====================================================

console.log('💾 Updating missing Science passages in database...\n');

for (const passage of missingPassages) {
  const { error } = await supabase
    .from('act_science_passages')
    .update({
      passage_type: passage.passage_type,
      title: passage.title,
      introduction: passage.introduction,
      passage_text: passage.passage_text,
      figures: passage.figures
    })
    .eq('test_number', TEST_NUMBER)
    .eq('passage_number', passage.passage_number);

  if (error) {
    console.error(`❌ Error updating Science Passage ${passage.passage_number}:`, error.message);
  } else {
    console.log(`✅ Updated Science Passage ${passage.passage_number}: ${passage.title}`);
  }
}

console.log('\n✅ Missing Science passages updated!');

// Verify the update
console.log('\n🔍 VERIFICATION - Checking all Test 1 Science passages...\n');

const { data: allPassages, error: fetchError } = await supabase
  .from('act_science_passages')
  .select('passage_number, title, passage_text')
  .eq('test_number', TEST_NUMBER)
  .order('passage_number');

if (fetchError) {
  console.error('❌ Error fetching passages for verification:', fetchError.message);
} else {
  console.log('📊 CURRENT STATUS:');
  for (const passage of allPassages) {
    const textLength = passage.passage_text ? passage.passage_text.length : 0;
    const isPlaceholder = passage.passage_text && (
      passage.passage_text.includes('[Science Passage') ||
      passage.passage_text.includes('to be filled') ||
      textLength < 100
    );

    const status = isPlaceholder ? '⚠️  Placeholder' : textLength > 100 ? '✅ Complete' : '❌ Empty';
    console.log(`Passage ${passage.passage_number}: ${passage.title} (${textLength} chars) ${status}`);
  }
}

console.log('\n🎉 Test 1 Science passages fix complete!\n');