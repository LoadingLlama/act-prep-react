#!/usr/bin/env node

/**
 * TEST 2 - SCIENCE PASSAGES MANUAL EXTRACTION
 * Clean, manually curated Science passages for Test 2
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

console.log('📝 MANUALLY CURATING TEST 2 SCIENCE PASSAGES\n');
console.log('='.repeat(70));

// =====================================================
// SCIENCE PASSAGES (7) - Manually Curated
// =====================================================

const sciencePassages = [
  {
    test_number: TEST_NUMBER,
    passage_number: 1,
    passage_type: 'DATA REPRESENTATION',
    title: 'Termite Mulch Consumption Study',
    introduction: 'Study on Reticulitermes flavipes consumption of different mulch types',
    passage_text: `The termite Reticulitermes flavipes consumes wood and bark. A study examined whether the consumption of wood or bark mulch by R. flavipes varies with the type of mulch or the age of the mulch. Separate portions of each of 5 types of mulch were aged (allowed to decay) for 1, 24, and 48 weeks. Then, 2 g of each type of 1-week-old mulch were put into a box, 2 g of each type of 24-week-old mulch were put into a second box, and 2 g of each type of 48-week-old mulch were put into a third box. Next, 1 g of R. flavipes was added to each box. After 15 days, the mass of mulch consumed, in milligrams (mg), was determined for each type and age of mulch.`,
    figures: {
      tables: [],
      figures: ['Figure showing mulch consumption by type (cedar, cypress, oak, oak bark, pine bark) and age (1, 24, 48 weeks)']
    }
  },
  {
    test_number: TEST_NUMBER,
    passage_number: 2,
    passage_type: 'RESEARCH SUMMARIES',
    title: 'Bacterial Survival After Lyophilization',
    introduction: 'Study on Species C bacteria survival during transport',
    passage_text: `Samples of Species C bacteria must often be transported from the areas in which they are collected. During transport, the samples are typically packed in ice to keep them alive. However, ice is not always available where the samples are collected. Scientists studied how lyophilization (a freeze-drying process that doesn't require ice) followed by incubation affects the survival of 2 strains (Strain E and Strain V2) of Species C bacteria.

Experiment 1
The scientists placed a 100 μL (1 μL = 10⁻⁶ mL) sample of a nutrient medium containing 4 × 10⁶ Strain E elementary bodies into each of 8 sterile test tubes. An elementary body is the infective form of Species C. The sample in each of the tubes was then lyophilized, and each tube was sealed. Two of the tubes were incubated at 4°C, 2 were incubated at 20°C, 2 were incubated at 30°C, and 2 were incubated at 37°C. One week after the start of incubation, the percent survival (the percent of the elementary bodies that survived) was determined for the sample in 1 of the 2 tubes at each temperature. Then, 1 month after the start of incubation, the percent survival was determined for the sample in the remaining tube at each temperature.

Experiment 2
The scientists repeated Experiment 1, except with Strain V2 instead of Strain E.`,
    figures: {
      tables: [
        'Table 1: Strain E percent survival at different temperatures and times',
        'Table 2: Strain V2 percent survival at different temperatures and times'
      ],
      figures: []
    }
  },
  {
    test_number: TEST_NUMBER,
    passage_number: 3,
    passage_type: 'DATA REPRESENTATION',
    title: 'Buoyant Forces Study',
    introduction: 'Studies on buoyant forces using different fluids and objects',
    passage_text: `When an object is submerged in a fluid, the object displaces a volume of fluid equal to the object's submerged volume. The fluid exerts an upward buoyant force on the object that is equal in magnitude to the weight of the displaced fluid. The object floats if the buoyant force equals the object's weight. A group of students conducted 2 studies on buoyant forces using 3 fluids—water, Fluid A, and Fluid B—having densities of 1.0 g/cm³, 1.25 g/cm³, and 1.50 g/cm³, respectively.

Study 1
The students placed a 10 cm long cylinder in a container of water and measured the length of the portion of the cylinder that was submerged. They then repeated this procedure with a container of Fluid A and a container of Fluid B.

Study 2
The students placed a stone—either Stone X, Stone Y, or Stone Z—in a net that was tied to a spring balance. They recorded the force measured by the balance as the stone's weight, W. They then submerged the stone in water and again recorded the force measured by the balance. The students calculated the buoyant force on the stone in water as W minus the force that was measured when the stone was submerged. They repeated this procedure to test all 3 stones in all 3 fluids.`,
    figures: {
      tables: [
        'Table 1: Buoyant force data for Stones X, Y, Z in water, Fluid A, and Fluid B'
      ],
      figures: [
        'Figure 1: Cylinder submerged lengths in different fluids',
        'Figure 2: Spring balance setup for measuring buoyant force'
      ]
    }
  },
  {
    test_number: TEST_NUMBER,
    passage_number: 4,
    passage_type: 'CONFLICTING VIEWPOINTS',
    title: 'Exothermic Reaction Study',
    introduction: 'Chemical reaction between sodium hypochlorite and sodium iodide',
    passage_text: `Chemical reactions that release heat are exothermic reactions. The amount of heat released depends on the number of moles of reactants consumed in the reaction. A mole of any substance is 6 × 10²³ molecules or formula units of the substance.

When sodium hypochlorite (NaClO) and sodium iodide (NaI) are dissolved in acidic H₂O, an exothermic reaction occurs:
NaClO + NaI → products + heat

Students did an experiment to study this reaction.

Experiment
In each of 8 trials, the students performed Steps 1-5:
1. A known volume of a 0.2 mole/L aqueous NaClO solution was poured into a foam coffee cup. A lid was placed on the cup.
2. A thermometer was placed into the solution through a hole in the lid. The solution's initial temperature, Ti, of 22.0°C was recorded.
3. The lid was lifted, and a known volume of a 0.2 mole/L aqueous NaI solution, also at a Ti of 22.0°C, was poured into the cup. The lid was put back on the cup, and the solution was swirled.
4. The solution's final (maximum) temperature, Tf, was measured.
5. The change in temperature, ΔT, was calculated: ΔT = Tf - Ti

Then they identified the trial for which ΔT had its greatest value. The ratio of the volume of the NaClO solution to the volume of the NaI solution for this trial is the mole ratio for the reaction.`,
    figures: {
      tables: [
        'Table 1: Trial data showing volumes of NaClO and NaI solutions, final temperatures, and temperature changes'
      ],
      figures: [
        'Figure 1: Graph of ΔT versus volume of NaClO solution'
      ]
    }
  },
  {
    test_number: TEST_NUMBER,
    passage_number: 5,
    passage_type: 'DATA REPRESENTATION',
    title: 'Carbon Dioxide Solubility in Magma',
    introduction: 'Study of CO₂ solubility in different types of magma',
    passage_text: `When rocks are melted at very high temperatures beneath Earth's surface, magma (molten rock) is formed. The gases CO₂ and H₂O can dissolve in magma. Figure 1 shows, for 4 different magmas (leucitite, basanite, rhyolite, and tholeiitic basalt), how the solubility of CO₂ in the magma at 1,150°C varies with pressure (in megapascals, MPa).

Figure 2 shows, at 3 different pressures, how the solubility of CO₂ in rhyolite magma varies with temperature.

Figure 3 shows, at 4 different pressures, how the solubility of CO₂ in rhyolite magma at 750°C varies with the weight percent of H₂O in the magma.`,
    figures: {
      tables: [],
      figures: [
        'Figure 1: CO₂ solubility vs pressure for 4 magma types at 1,150°C',
        'Figure 2: CO₂ solubility vs temperature in rhyolite magma at 3 pressures',
        'Figure 3: CO₂ solubility vs H₂O weight percent in rhyolite magma at 750°C'
      ]
    }
  },
  {
    test_number: TEST_NUMBER,
    passage_number: 6,
    passage_type: 'DATA REPRESENTATION',
    title: 'Planetary Motion and Retrograde Movement',
    introduction: 'Two hypotheses explaining apparent retrograde motion of planets',
    passage_text: `When viewed from Earth, the other planets in the solar system usually appear to move prograde (eastward relative to the stars). Occasionally, however, each planet appears to briefly move retrograde (westward relative to the stars). For example, Figure 1 shows Mars's position relative to the stars on 9 dates between July 24, 2005, and February 26, 2006.

Two hypotheses were proposed to explain why the planets occasionally appear to move retrograde.

Hypothesis 1
Earth is the solar system's central body, and the other bodies move around Earth in looped orbits. Each body (except Earth) has 2 circles associated with it: a deferent and an epicycle. Both circles rotate counterclockwise, and their combined motions result in a body following a looped orbit. As a body passes through a loop, the body's motion changes from prograde to retrograde and back. The larger a body's deferent, the more loops in the body's orbit, and the more often that body passes through a loop.

Hypothesis 2
The Sun is the solar system's central body, and the planets move counterclockwise around the Sun in elliptical orbits. The larger a planet's orbit, the more time the planet takes to complete a revolution around the Sun. As a result, the line of sight from Earth to a planet drifts over time. There are 2 rules for apparent retrograde motion:
• A planet with an orbit larger than Earth's appears to move retrograde whenever Earth passes between the Sun and that planet. The larger that planet's orbit, the more often a pass occurs.
• A planet with an orbit smaller than Earth's appears to move retrograde whenever that planet passes between the Sun and Earth. The smaller that planet's orbit, the more often a pass occurs.`,
    figures: {
      tables: [],
      figures: [
        'Figure 1: Mars position relative to stars over time',
        'Figure 2: Mars deferent and epicycle diagram (Hypothesis 1)',
        'Figure 3: Earth and Mars orbital positions (Hypothesis 2)'
      ]
    }
  },
  {
    test_number: TEST_NUMBER,
    passage_number: 7,
    passage_type: 'DATA REPRESENTATION',
    title: 'Additional Science Passage',
    introduction: 'Placeholder for 7th science passage',
    passage_text: `[Note: Only 6 distinct science passages were clearly identifiable in the PDF text. The 7th passage may be a continuation or sub-section of one of the above passages, or may not be clearly separated in the OCR text.]`,
    figures: {
      tables: [],
      figures: []
    }
  }
];

// =====================================================
// UPDATE DATABASE
// =====================================================

console.log('💾 Updating Science passages in database...\n');

for (const passage of sciencePassages) {
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

console.log('\n✅ Science passages updated!');
console.log('\n📝 Note: Passage 7 may need further clarification from original PDF\n');