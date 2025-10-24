#!/usr/bin/env node

/**
 * EXTRACT ALL 7 SCIENCE PASSAGES FROM TEST 1
 * With tables and figures as structured data
 */

import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '../../.env') });

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

console.log('🔬 Extracting All 7 Science Passages from Test 1...\n');

// =====================================================
// ALL 7 SCIENCE PASSAGES WITH STRUCTURED DATA
// =====================================================

const sciencePassages = [
  // PASSAGE 1 - Already extracted above
  {
    test_number: 1,
    passage_number: 1,
    passage_type: 'DATA REPRESENTATION',
    title: 'Molar Volume of Gases',
    introduction: 'Study of molar volumes of different gases at various temperatures and pressures',
    passage_text: `The molar volume of a gas is the volume occupied by 1 mole (mol; 6 × 10²³ atoms or molecules) of that gas at a given pressure and temperature.

Table 1 shows how the molar volume, in L, of each of 6 gases—helium (He), neon (Ne), argon (Ar), hydrogen (H₂), nitrogen (N₂), and oxygen (O₂)—varies with pressure, in atmospheres (atm), at a temperature of 273 kelvins (K).

Table 2 shows how the molar volume of each of the 6 gases varies with temperature at a pressure of 1.00 atm.`,
    figures: {
      tables: [
        {
          id: 'table1',
          title: 'Table 1: Molar Volume at Different Pressures',
          subtitle: 'Molar volume (L) at 273 K',
          headers: ['Pressure (atm)', 'He', 'Ne', 'Ar', 'H₂', 'N₂', 'O₂'],
          rows: [
            ['0.500', '44.825', '44.810', '44.774', '44.818', '44.781', '44.807'],
            ['1.00', '22.424', '22.409', '22.374', '22.417', '22.380', '22.401'],
            ['5.00', '4.503', '4.488', '4.453', '4.496', '4.459', '4.477'],
            ['10.0', '2.262', '2.248', '2.213', '2.256', '2.219', '2.239'],
            ['50.0', '0.471', '0.456', '0.421', '0.465', '0.430', '0.449'],
            ['100.0', '0.247', '0.233', '0.200', '0.242', '0.210', '0.226']
          ]
        },
        {
          id: 'table2',
          title: 'Table 2: Molar Volume at Different Temperatures',
          subtitle: 'Molar volume (L) at 1.00 atm',
          headers: ['Temperature (K)', 'He', 'Ne', 'Ar', 'H₂', 'N₂', 'O₂'],
          rows: [
            ['223', '18.321', '18.304', '18.257', '18.263', '18.248', '18.267'],
            ['323', '26.504', '26.513', '26.486', '26.492', '26.478', '26.493'],
            ['373', '30.670', '30.617', '30.595', '30.601', '30.588', '30.603'],
            ['573', '47.041', '47.031', '47.022', '47.028', '47.019', '47.029'],
            ['773', '63.453', '63.443', '63.440', '63.452', '63.446', '63.440']
          ]
        }
      ],
      figures: []
    }
  },

  // PASSAGE 2 - Flies as Bacterial Vectors
  {
    test_number: 1,
    passage_number: 2,
    passage_type: 'RESEARCH SUMMARIES',
    title: 'Flies as Bacterial Vectors',
    introduction: 'Experiments studying the transfer of bacteria by flies',
    passage_text: `Scientists conducted 3 experiments to study the transfer of bacteria from one surface to another by 2 species of flies: Musca domestica and Sarcophaga carnaria.

**Experiment 1**
A group of 10 M. domestica was tested using this procedure:
1. Each fly was placed in a separate enclosure containing Escherichia coli (a type of bacteria) and allowed to walk on the E. coli for 5 min.
2. Each fly was then immediately placed in a separate petri dish containing sterile nutrient agar. Five minutes later, the flies were removed from the dishes.
3. The dishes were incubated at 37°C for 24 hr so that each E. coli cell on the dish divided to form a separate colony, and then the number of E. coli colonies on each dish was counted. The results are shown in Figure 1.

**Experiment 2**
The procedure from Experiment 1 was repeated with each of 3 groups of 10 S. carnaria except that the flies in each group were allowed to walk on the E. coli for a different period of time—5 min, 30 min, or 60 min—before each fly was placed in a separate petri dish containing nutrient agar. The results are shown in Figure 2.

**Experiment 3**
The procedure from Experiment 1 was repeated with each of 3 groups of 10 S. carnaria except that, after Step 1, the flies in each group were allowed a different period of time—0 min, 30 min, or 60 min—to clean themselves before each fly was placed in a separate petri dish containing sterile nutrient agar. The results are shown in Figure 3.`,
    figures: {
      tables: [],
      figures: [
        {
          id: 'figure1',
          type: 'bar_graph',
          description: 'Figure 1: Average number of E. coli colonies per dish for M. domestica after 5 minutes walking on E. coli'
        },
        {
          id: 'figure2',
          type: 'line_graph',
          description: 'Figure 2: Average number of colonies per dish vs. time spent walking on E. coli (5, 30, 60 min) for S. carnaria'
        },
        {
          id: 'figure3',
          type: 'line_graph',
          description: 'Figure 3: Average number of colonies per dish vs. cleaning time (0, 30, 60 min) for S. carnaria'
        }
      ]
    }
  },

  // PASSAGES 3-7 - Placeholders with metadata
  {
    test_number: 1,
    passage_number: 3,
    passage_type: 'DATA REPRESENTATION',
    title: 'Tectonic Plates',
    introduction: 'Data on temperature and depth relationships in tectonic plates',
    passage_text: '[Passage text to be extracted - contains data about temperature vs depth]',
    figures: {
      tables: [],
      figures: [
        {
          id: 'figure1',
          type: 'graph',
          description: 'Temperature vs depth relationship'
        }
      ]
    }
  },

  {
    test_number: 1,
    passage_number: 4,
    passage_type: 'CONFLICTING VIEWPOINTS',
    title: 'Evolution',
    introduction: 'Two scientists discuss different viewpoints on evolution',
    passage_text: '[Passage text to be extracted - Scientist 1 and Scientist 2 viewpoints]',
    figures: {
      tables: [],
      figures: []
    }
  },

  {
    test_number: 1,
    passage_number: 5,
    passage_type: 'DATA REPRESENTATION',
    title: 'Chemical Reactions',
    introduction: 'Data on chemical reaction rates',
    passage_text: '[Passage text to be extracted - contains reaction rate data]',
    figures: {
      tables: [],
      figures: []
    }
  },

  {
    test_number: 1,
    passage_number: 6,
    passage_type: 'DATA REPRESENTATION',
    title: 'Planetary Motion',
    introduction: 'Data on orbital periods and planetary motion',
    passage_text: '[Passage text to be extracted - contains planetary data]',
    figures: {
      tables: [],
      figures: []
    }
  },

  {
    test_number: 1,
    passage_number: 7,
    passage_type: 'DATA REPRESENTATION',
    title: 'Climate Change',
    introduction: 'Data on CO2 levels and temperature over time',
    passage_text: '[Passage text to be extracted - contains climate data]',
    figures: {
      tables: [],
      figures: []
    }
  }
];

// =====================================================
// INSERT ALL PASSAGES
// =====================================================

console.log('💾 Inserting all Science passages into database...\n');

let completedCount = 0;
let placeholderCount = 0;

for (const passage of sciencePassages) {
  const { error } = await supabase
    .from('act_science_passages')
    .upsert(passage, { onConflict: 'test_number,passage_number' });

  if (error) {
    console.error(`❌ Error inserting Science Passage ${passage.passage_number}:`, error);
  } else {
    const isComplete = !passage.passage_text.includes('[Passage text to be extracted');
    if (isComplete) {
      console.log(`✅ Inserted Science Passage ${passage.passage_number}: ${passage.title} [COMPLETE]`);
      completedCount++;
    } else {
      console.log(`⚠️  Inserted Science Passage ${passage.passage_number}: ${passage.title} [PLACEHOLDER]`);
      placeholderCount++;
    }
  }
}

console.log('\n' + '='.repeat(70));
console.log('📊 SCIENCE EXTRACTION SUMMARY');
console.log('='.repeat(70));
console.log(`✅ Complete Passages: ${completedCount}/7`);
console.log(`   - Passage 1: Molar Volume (2 tables)`);
console.log(`   - Passage 2: Flies as Vectors (3 figures)`);
console.log(`⚠️  Placeholder Passages: ${placeholderCount}/7`);
console.log(`   - Passages 3-7 need detailed extraction from source file`);
console.log('\n💡 Next Steps:');
console.log('1. Extract remaining 5 Science passages from text file');
console.log('2. Parse any additional tables/figures');
console.log('3. All passages now have proper structure with figures JSONB');
