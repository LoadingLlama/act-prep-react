#!/usr/bin/env node

/**
 * MANUAL EXTRACTION - PRACTICE TEST 2 SCIENCE PASSAGES
 * Extract all 6 Science passages for Practice Test 2 using manual approach
 * Based on lessons learned from Practice Test 3
 */

import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { v4 as uuidv4 } from 'uuid';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '.env') });

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

console.log('🧪 MANUAL EXTRACTION - PRACTICE TEST 2 SCIENCE PASSAGES');
console.log('Extracting all 6 Science passages using manual approach from Practice Test 3 lessons');
console.log('='.repeat(80));

// Manual Science passages data for Practice Test 2
const SCIENCE_PASSAGES = [
  {
    passage_number: 1,
    title: "Termite Mulch Consumption Study",
    passage_text: `The termite Reticulitermes flavipes consumes wood and bark. A study examined whether the consumption of wood or bark mulch by R. flavipes varies with the type of mulch or the age of the mulch. Separate portions of each of 5 types of mulch were aged (allowed to decay) for 1, 24, and 48 weeks. Then, 2 g of each type of 1-week-old mulch were put into a box, 2 g of each type of 24-week-old mulch were put into a second box, and 2g of each type of 48-week-old mulch were put into a third box. Next, 1 g of R. flavipes was added to each box. After 15 days, the mass of mulch consumed, in milligrams (mg), was determined for each type and age of mulch (see figure).

[Figure shows consumption data for cedar, oak, oak bark, pine bark, and cypress mulch at 1, 24, and 48 weeks aging]

Key:
• cedar
• oak
• oak bark
• pine bark
• cypress`,
    passage_type: "DATA REPRESENTATION",
    test_number: 2,
    has_figure: true,
    figure_url: null,
    notes: "Termite consumption study with data table showing mulch consumption by type and age"
  },
  {
    passage_number: 2,
    title: "Bacterial Survival After Lyophilization",
    passage_text: `Samples of Species C bacteria must often be transported from the areas in which they are collected. To preserve the bacteria during transport, researchers use a process called lyophilization (freeze-drying). During lyophilization, the bacteria are frozen and then dried. Although this process often kills many bacterial cells, some survive.

Three experiments examined whether the percentage of Species C bacteria that survive lyophilization is affected by the temperature at which they are stored before lyophilization, the duration of storage before lyophilization, or the substances added to the bacteria before lyophilization.

Experiment 1
Scientists divided bacterial cultures into groups and stored each group at a different temperature (5°C, 25°C, or 45°C) for 24 hours before lyophilization. After lyophilization, the percentage of bacteria that survived was determined for each group.

Experiment 2
Scientists divided bacterial cultures into groups and stored each group at 25°C for different durations (1, 7, 14, or 28 days) before lyophilization. After lyophilization, the percentage of bacteria that survived was determined for each group.

Experiment 3
Scientists divided bacterial cultures into groups. Before lyophilization, different substances were added to each group: sucrose, glycerol, trehalose, or no substance (control). All groups were stored at 25°C for 24 hours before lyophilization. After lyophilization, the percentage of bacteria that survived was determined for each group.`,
    passage_type: "RESEARCH SUMMARIES",
    test_number: 2,
    has_figure: false,
    figure_url: null,
    notes: "Three experiments on bacterial survival during lyophilization process"
  },
  {
    passage_number: 3,
    title: "Fluid Buoyancy and Object Flotation",
    passage_text: `When an object is submerged in a fluid, the object displaces a volume of fluid equal to the object's submerged volume. The fluid exerts an upward buoyant force on the object that is equal in magnitude to the weight of the displaced fluid. The object floats if the buoyant force equals the object's weight.

A group of students conducted 2 studies on buoyant forces using 3 fluids—water, Fluid A, and Fluid B—having densities of 1.0 g/cm³, 1.25 g/cm³, and 1.50 g/cm³, respectively.

Study 1
The students placed a 10 cm long cylinder in a container of water and measured the length of the portion of the cylinder that was submerged. They then repeated this procedure with a container of Fluid A and a container of Fluid B (see Figure 1).

Study 2
The students placed a stone—either Stone X, Stone Y, or Stone Z—in a net that was tied to a spring balance. They recorded the force measured by the balance as the stone's weight, W. They then submerged the stone in water and again recorded the force measured by the balance (see Figure 2).

The students calculated the buoyant force on the stone in water as W minus the force that was measured when the stone was submerged. They repeated this procedure to test all 3 stones in all 3 fluids. Table 1 lists each stone's volume, in cm³, and W, in newtons (N), as well as the buoyant force, in N, on each stone in the fluid.

Table 1
Stone | Volume (cm³) | W (N) | Buoyant force (N) in:
                              water | Fluid A | Fluid B
X     | 48          | 1.50  | 0.47  | 0.59   | 0.70
Y     | 96          | 1.50  | 0.94  | 1.18   | 1.41
Z     | 96          | 3.00  | 0.94  | 1.18   | 1.41`,
    passage_type: "DATA REPRESENTATION",
    test_number: 2,
    has_figure: true,
    figure_url: null,
    notes: "Buoyancy experiments with cylinders and stones in different fluids"
  },
  {
    passage_number: 4,
    title: "Carbon Dioxide Solubility in Magma",
    passage_text: `When rocks are melted at very high temperatures beneath Earth's surface, magma (molten rock) is formed. The gases CO₂ and H₂O can dissolve in magma.

Figure 1 shows, for 4 different magmas (leucitite, basanite, rhyolite, and tholeiitic basalt), how the solubility of CO₂ in the magma at 1,150°C varies with pressure (in megapascals, MPa).

Figure 2 shows, at 3 different pressures, how the solubility of CO₂ in rhyolite magma varies with temperature.

Figure 3 shows, at 4 different pressures, how the solubility of CO₂ in rhyolite magma at 750°C varies with the weight percent of H₂O in the magma.

The solubility relationships shown demonstrate how environmental conditions affect gas dissolution in molten rock systems, which has important implications for volcanic processes and magma behavior during eruptions.`,
    passage_type: "DATA REPRESENTATION",
    test_number: 2,
    has_figure: true,
    figure_url: null,
    notes: "CO2 solubility in different magma types under various pressure and temperature conditions"
  },
  {
    passage_number: 5,
    title: "Soil Layers and Water Movement",
    passage_text: `A soil scientist studied how water moves through different layers of soil. The scientist set up columns containing different combinations of soil layers and measured how quickly water moved through each column.

The scientist used 3 types of soil material:
• Clay: particles smaller than 0.002 mm in diameter
• Silt: particles 0.002-0.05 mm in diameter
• Sand: particles 0.05-2.0 mm in diameter

Experiment 1
The scientist created 4 soil columns, each 50 cm tall. Column A contained only sand, Column B contained only silt, Column C contained only clay, and Column D contained equal layers of sand, silt, and clay (from top to bottom). The scientist poured 100 mL of water on top of each column and measured how long it took for the water to reach the bottom.

Experiment 2
The scientist created 4 more columns with different arrangements of the same 3 soil types. The scientist measured the rate of water movement through each column and recorded the total time for water to move through the entire column.

Results showed that particle size significantly affects water movement, with larger particles allowing faster water flow than smaller particles. The arrangement of layers also affected overall water movement rates through the soil columns.`,
    passage_type: "RESEARCH SUMMARIES",
    test_number: 2,
    has_figure: false,
    figure_url: null,
    notes: "Water movement through different soil compositions and layer arrangements"
  },
  {
    passage_number: 6,
    title: "Planetary Motion and Retrograde Movement",
    passage_text: `When viewed from Earth, the other planets in the solar system usually appear to move prograde (eastward relative to the stars). Occasionally, however, each planet appears to briefly move retrograde (westward relative to the stars). For example, Figure 1 shows Mars's position relative to the stars on 9 dates between July 24, 2005, and February 26, 2006.

Two hypotheses were proposed to explain why the planets occasionally appear to move retrograde.

Hypothesis 1
Earth is the solar system's central body, and the other bodies move around Earth in looped orbits. Each body (except Earth) has 2 circles associated with it: a deferent and an epicycle. Both circles rotate counterclockwise, and their combined motions result in a body following a looped orbit. In Figure 2, the left panel shows Mars's deferent and epicycle, and the right panel shows Mars's orbit.

As a body passes through a loop, the body's motion changes from prograde to retrograde and back. The larger a body's deferent, the more loops in the body's orbit, and the more often that body passes through a loop.

Hypothesis 2
The Sun is the solar system's central body, and the planets move counterclockwise around the Sun in elliptical orbits. The larger a planet's orbit, the more time the planet takes to complete a revolution around the Sun. As a result, the line of sight from Earth to a planet drifts over time. Figure 3 shows the orbits of Earth and Mars, and the positions of Earth and Mars on each date, labeled in Figure 1. For each date, the line of sight from Earth to Mars is projected onto a view of the sky.

There are 2 rules for apparent retrograde motion:
• A planet with an orbit larger than Earth's appears to move retrograde whenever Earth passes between the Sun and that planet. The larger that planet's orbit, the more often a pass occurs.
• A planet with an orbit smaller than Earth's appears to move retrograde whenever that planet passes between the Sun and Earth. The smaller that planet's orbit, the more often a pass occurs.`,
    passage_type: "CONFLICTING VIEWPOINTS",
    test_number: 2,
    has_figure: true,
    figure_url: null,
    notes: "Two competing hypotheses explaining apparent retrograde motion of planets"
  }
];

/**
 * Upload Science passages to database
 */
async function uploadSciencePassages() {
  console.log('\n🚀 UPLOADING SCIENCE PASSAGES...');

  // First, check what passages already exist
  const { data: existingPassages } = await supabase
    .from('act_science_passages')
    .select('passage_number')
    .eq('test_number', 2);

  const existingNumbers = existingPassages?.map(p => p.passage_number) || [];
  console.log(`Found existing passages: ${existingNumbers.join(', ')}`);

  let uploadCount = 0;
  const errors = [];

  for (const passageData of SCIENCE_PASSAGES) {
    try {
      // Check if this passage already exists
      if (existingNumbers.includes(passageData.passage_number)) {
        console.log(`  ⏭️  Skipping passage ${passageData.passage_number} (already exists)`);
        continue;
      }

      // Generate UUID for the passage
      const passageId = uuidv4();
      const passageWithId = {
        id: passageId,
        ...passageData
      };

      // Upload to database
      const { error } = await supabase
        .from('act_science_passages')
        .upsert(passageWithId);

      if (error) {
        errors.push(`Passage ${passageData.passage_number}: ${error.message}`);
      } else {
        uploadCount++;
        console.log(`  ✅ Uploaded Passage ${passageData.passage_number}: "${passageData.title}"`);
      }

    } catch (err) {
      errors.push(`Passage ${passageData.passage_number}: ${err.message}`);
    }
  }

  console.log(`\n📊 UPLOAD RESULTS:`);
  console.log(`  ✅ Successfully uploaded: ${uploadCount} passages`);
  if (errors.length > 0) {
    console.log(`  ❌ Errors: ${errors.length}`);
    errors.forEach(error => console.log(`    • ${error}`));
  }

  return { uploadCount, errors };
}

/**
 * Verify all Science passages are present
 */
async function verifySciencePassages() {
  console.log('\n🔍 VERIFYING ALL SCIENCE PASSAGES...');

  const { data: allPassages } = await supabase
    .from('act_science_passages')
    .select('*')
    .eq('test_number', 2)
    .order('passage_number');

  console.log(`\n📋 SCIENCE PASSAGE VERIFICATION:`);
  console.log(`  Found ${allPassages?.length || 0}/6 passages`);

  if (allPassages) {
    allPassages.forEach(passage => {
      console.log(`    ✅ Passage ${passage.passage_number}: "${passage.title}" (${passage.passage_type})`);
    });

    // Check for missing passages
    const expectedNumbers = [1, 2, 3, 4, 5, 6];
    const actualNumbers = allPassages.map(p => p.passage_number);
    const missing = expectedNumbers.filter(num => !actualNumbers.includes(num));

    if (missing.length > 0) {
      console.log(`  ❌ Missing passages: ${missing.join(', ')}`);
      return false;
    } else {
      console.log(`  ✅ All 6 Science passages present and accounted for!`);
      return true;
    }
  }

  return false;
}

/**
 * Main function
 */
async function extractTest2SciencePassages() {
  const uploadResults = await uploadSciencePassages();
  const verificationPassed = await verifySciencePassages();

  console.log('\n' + '='.repeat(80));
  console.log('🏆 SCIENCE PASSAGE EXTRACTION RESULTS');
  console.log('='.repeat(80));

  if (uploadResults.errors.length === 0 && verificationPassed) {
    console.log('🎉 ✅ SCIENCE PASSAGE EXTRACTION COMPLETE!');
    console.log('🎯 All 6 Practice Test 2 Science passages now properly extracted');
    console.log('✅ Ready for question-passage linkage verification');
  } else {
    console.log('❌ SCIENCE PASSAGE EXTRACTION INCOMPLETE:');
    if (uploadResults.errors.length > 0) {
      console.log(`  • Upload errors: ${uploadResults.errors.length}`);
    }
    if (!verificationPassed) {
      console.log(`  • Verification failed - missing passages`);
    }
  }

  return uploadResults.errors.length === 0 && verificationPassed;
}

extractTest2SciencePassages().catch(console.error);