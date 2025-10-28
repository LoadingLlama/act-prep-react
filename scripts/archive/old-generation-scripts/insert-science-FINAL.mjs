#!/usr/bin/env node
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

console.log('🎯 INSERTING SCIENCE SECTION - FINAL\n');

function answerToIndex(letter) {
  return { 'A': 0, 'B': 1, 'C': 2, 'D': 3 }[letter];
}

async function insertScience() {
  try {
    // 6 SCIENCE PASSAGES with experimental data
    const sciencePassages = [
      {
        num: 1,
        title: "Effect of Temperature on Enzyme Activity",
        type: "data_representation",
        text: `Experiment: Students investigated how temperature affects the activity of the enzyme catalase, which breaks down hydrogen peroxide (H₂O₂) into water and oxygen. They measured the rate of oxygen production at different temperatures.

Procedure:
1. Prepared 5 identical solutions of catalase enzyme
2. Heated each solution to a different temperature (10°C, 25°C, 40°C, 55°C, 70°C)
3. Added equal amounts of H₂O₂ to each solution
4. Measured oxygen gas produced over 60 seconds

Results:
Temperature (°C) | Oxygen Produced (mL)
10              | 12
25              | 35
40              | 58
55              | 42
70              | 8

Figure 1 shows enzyme activity peaks at 40°C (optimum temperature). Below this temperature, molecular motion is slower, reducing reaction rates. Above 40°C, the enzyme begins to denature (lose its shape), reducing activity. At 70°C, the enzyme is almost completely denatured.`
      },
      {
        num: 2,
        title: "pH and Plant Growth",
        type: "data_representation",
        text: `Experiment: Researchers studied how soil pH affects the growth of tomato plants over 8 weeks.

Procedure:
1. Planted identical tomato seedlings in 6 pots
2. Adjusted soil pH in each pot to different levels (pH 4, 5, 6, 7, 8, 9)
3. Provided identical light, water, and nutrients
4. Measured plant height after 8 weeks

Results:
Soil pH | Final Height (cm)
4.0     | 18
5.0     | 32
6.0     | 48
7.0     | 52
8.0     | 35
9.0     | 15

Additional observations: Plants grown in pH 6-7 showed dark green leaves and abundant fruit. Plants at pH 4 and pH 9 showed yellowing leaves and stunted growth. This occurs because extreme pH levels interfere with nutrient absorption from soil.`
      },
      {
        num: 3,
        title: "Planetary Atmosphere Composition",
        type: "data_representation",
        text: `Study: Scientists analyzed the atmospheric composition of inner solar system planets using spectroscopy.

Table 1: Atmospheric Composition (% by volume)

Gas        | Mercury | Venus | Earth | Mars
N₂         | 0       | 3.5   | 78.0  | 2.7
O₂         | 0       | 0     | 21.0  | 0.13
CO₂        | 0       | 96.5  | 0.04  | 95.3
Other      | 0       | 0     | 0.96  | 1.87

Table 2: Physical Properties

Planet  | Atmospheric Pressure (Earth = 1.0) | Average Surface Temp (°C)
Mercury | 0 (essentially none)               | 167
Venus   | 92                                 | 464
Earth   | 1.0                                | 15
Mars    | 0.01                               | -63

Venus has a thick CO₂ atmosphere creating extreme greenhouse effect. Earth's O₂ results from photosynthesis by plants and algae. Mars has thin atmosphere providing little insulation.`
      },
      {
        num: 4,
        title: "Chemical Reaction Rates",
        type: "research_summary",
        text: `Experiment: Students investigated factors affecting the rate of reaction between magnesium ribbon and hydrochloric acid (HCl).

Experiment 1 - Effect of Acid Concentration:
Used 5cm magnesium ribbon with different HCl concentrations at 25°C.

HCl Concentration (M) | Time to Complete (seconds)
0.5                   | 180
1.0                   | 90
1.5                   | 60
2.0                   | 45
2.5                   | 36

Conclusion: Higher acid concentration increases reaction rate (decreases time).

Experiment 2 - Effect of Temperature:
Used 5cm magnesium ribbon with 1.0 M HCl at different temperatures.

Temperature (°C) | Time to Complete (seconds)
10              | 150
20              | 105
30              | 75
40              | 52
50              | 38

Conclusion: Higher temperature increases reaction rate.

Experiment 3 - Effect of Surface Area:
Used 1.0 M HCl at 25°C with different magnesium forms.

Magnesium Form    | Time to Complete (seconds)
Single ribbon 5cm | 90
Ribbon cut in 2   | 68
Ribbon cut in 4   | 52
Powder            | 12

Conclusion: Increased surface area dramatically increases reaction rate.`
      },
      {
        num: 5,
        title: "Inheritance of Flower Color in Peas",
        type: "research_summary",
        text: `Study: Researchers crossed pea plants with different flower colors to understand inheritance patterns.

Experiment 1 - Pure Lines:
Crossed purebred purple-flowered plants (PP) with purebred white-flowered plants (pp).

P Generation:  Purple (PP) × White (pp)
F₁ Generation: 100% Purple (Pp)
Observation: All offspring had purple flowers.

Experiment 2 - F₁ Cross:
Crossed F₁ purple plants (Pp) with each other.

F₁ Cross:     Purple (Pp) × Purple (Pp)
F₂ Results:   705 Purple : 224 White
Ratio:        3.15:1 (approximately 3:1)

Genotype breakdown (predicted):
25% PP (Purple)
50% Pp (Purple)
25% pp (White)

Experiment 3 - Test Cross:
Crossed F₁ purple plants (Pp) with white plants (pp) to determine genotype.

Test Cross:   Purple (Pp) × White (pp)
Results:      152 Purple (Pp) : 148 White (pp)
Ratio:        Approximately 1:1

Conclusion: Purple is dominant over white. Results support Mendel's law of segregation.`
      },
      {
        num: 6,
        title: "Continental Drift Evidence",
        type: "conflicting_viewpoints",
        text: `Scientific Debate: Two scientists present different views on continental drift theory.

Scientist 1 (Supports Continental Drift):
Continental drift theory proposes that Earth's continents were once joined in a supercontinent called Pangaea and have since moved apart. Evidence includes:

1. Fossil Evidence: Identical fossils of Mesosaurus (freshwater reptile) found in South America and Africa. This species couldn't have crossed the Atlantic Ocean, suggesting continents were connected.

2. Rock Formation Matching: Mountain ranges in eastern North America align with similar formations in western Europe. Rock layers match in age and composition.

3. Glacial Evidence: Ancient glacial deposits and scratches found in now-tropical regions like India and Africa indicate these areas were once near the poles.

4. Coastline Fit: South America and Africa fit together like puzzle pieces, especially when continental shelves are considered.

The mechanism involves convection currents in Earth's mantle pushing tectonic plates, causing continents to move approximately 2-5 cm per year.

Scientist 2 (Questions Continental Drift):
While some evidence seems compelling, continental drift theory has problems:

1. No Adequate Mechanism: The proposed convection currents in the mantle lack sufficient force to move massive continental plates through solid oceanic crust.

2. Fossil Distribution Alternative: Similar fossils could be explained by ancient land bridges that have since submerged, not continental movement.

3. Geological Coincidence: Matching rock formations might result from similar formation conditions rather than once being connected.

4. Coastline Fit Problems: Many coastlines don't fit well. The apparent fit is selective and forced.

5. Time Scale Issues: The theory doesn't adequately explain why continents would remain stable for billions of years then suddenly start moving.

A more conservative explanation involves vertical movements of Earth's crust (subsidence and uplift) rather than lateral continental drift.`
      }
    ];

    console.log('🔬 Creating Science passages and questions...\n');

    // Insert passages
    const passageInserts = sciencePassages.map(p => ({
      test_number: 1,
      passage_number: p.num,
      passage_type: p.type,
      passage_title: p.title,
      passage_text: p.text,
      passage_data: null
    }));

    const { data: insertedSci, error: spErr } = await supabase
      .from('practice_test_science_passages')
      .insert(passageInserts)
      .select('id, passage_number');

    if (spErr) throw spErr;

    const sciPassageMap = {};
    insertedSci.forEach(p => { sciPassageMap[p.passage_number] = p.id; });

    console.log(`✅ Inserted 6 passages\n`);

    // CREATE 40 QUESTIONS (6-7 per passage)
    const scienceQs = [
      // Passage 1 - Enzyme Activity (Q1-7)
      { pNum: 1, qNum: 1, stem: "At what temperature did the enzyme show maximum activity?", a: "25°C", b: "40°C", c: "55°C", d: "70°C", correct: "B", exp: "58 mL oxygen at 40°C, highest value" },
      { pNum: 1, qNum: 2, stem: "How much oxygen was produced at 10°C?", a: "8 mL", b: "12 mL", c: "35 mL", d: "42 mL", correct: "B", exp: "Table shows 12 mL at 10°C" },
      { pNum: 1, qNum: 3, stem: "What happens to the enzyme above 40°C?", a: "It becomes more active", b: "It multiplies", c: "It denatures", d: "It produces hydrogen peroxide", correct: "C", exp: "Text states 'enzyme begins to denature' above 40°C" },
      { pNum: 1, qNum: 4, stem: "The enzyme activity at 70°C compared to 10°C is:", a: "higher", b: "lower", c: "the same", d: "double", correct: "B", exp: "70°C: 8 mL vs 10°C: 12 mL - activity is lower" },
      { pNum: 1, qNum: 5, stem: "Based on the data, what would likely happen at 85°C?", a: "Maximum activity", b: "Moderate activity", c: "Very low or no activity", d: "Increased oxygen production", correct: "C", exp: "Trend shows decreasing activity at higher temps; 85°C would likely denature enzyme" },
      { pNum: 1, qNum: 6, stem: "Why does enzyme activity decrease below 40°C?", a: "Enzyme denatures", b: "Molecular motion is slower", c: "Too much oxygen is produced", d: "Hydrogen peroxide evaporates", correct: "B", exp: "Text: 'molecular motion is slower, reducing reaction rates'" },
      { pNum: 1, qNum: 7, stem: "What is the dependent variable in this experiment?", a: "Temperature", b: "Amount of catalase", c: "Oxygen produced", d: "Time", correct: "C", exp: "Oxygen produced is measured in response to temperature changes" },

      // Passage 2 - pH Plant Growth (Q8-13)
      { pNum: 2, qNum: 8, stem: "At which pH did plants grow tallest?", a: "pH 5", b: "pH 6", c: "pH 7", d: "pH 8", correct: "C", exp: "52 cm at pH 7, highest value" },
      { pNum: 2, qNum: 9, stem: "Plants at pH 4 grew to what height?", a: "15 cm", b: "18 cm", c: "32 cm", d: "48 cm", correct: "B", exp: "Table shows 18 cm at pH 4" },
      { pNum: 2, qNum: 10, stem: "What visual symptom occurred at extreme pH levels?", a: "Extra fruit production", b: "Taller stems", c: "Yellowing leaves", d: "Purple flowers", correct: "C", exp: "'yellowing leaves and stunted growth' at pH 4 and 9" },
      { pNum: 2, qNum: 11, stem: "The optimal pH range for tomato growth appears to be:", a: "4-5", b: "5-6", c: "6-7", d: "8-9", correct: "C", exp: "Best growth at pH 6-7; 'dark green leaves and abundant fruit'" },
      { pNum: 2, qNum: 12, stem: "Why do extreme pH levels harm plants?", a: "They kill beneficial insects", b: "They interfere with nutrient absorption", c: "They cause too much water uptake", d: "They prevent photosynthesis", correct: "B", exp: "Text states extreme pH 'interfere with nutrient absorption'" },
      { pNum: 2, qNum: 13, stem: "Which variable was kept constant in this experiment?", a: "Soil pH", b: "Plant height", c: "Light and water", d: "Time of measurement", correct: "C", exp: "'identical light, water, and nutrients' - these were controlled" },

      // Passage 3 - Planetary Atmospheres (Q14-20)
      { pNum: 3, qNum: 14, stem: "Which planet has the highest percentage of CO₂?", a: "Mercury", b: "Venus", c: "Earth", d: "Mars", correct: "B", exp: "Venus: 96.5% CO₂, highest value" },
      { pNum: 3, qNum: 15, stem: "What percentage of Earth's atmosphere is nitrogen?", a: "21%", b: "78%", c: "96.5%", d: "0.04%", correct: "B", exp: "Table shows Earth N₂: 78.0%" },
      { pNum: 3, qNum: 16, stem: "Which planet has essentially no atmosphere?", a: "Mercury", b: "Venus", c: "Earth", d: "Mars", correct: "A", exp: "Mercury pressure: 0 (essentially none)" },
      { pNum: 3, qNum: 17, stem: "Venus has the highest surface temperature due to:", a: "being closest to the Sun", b: "greenhouse effect from CO₂", c: "lack of atmosphere", d: "high oxygen content", correct: "B", exp: "'thick CO₂ atmosphere creating extreme greenhouse effect'" },
      { pNum: 3, qNum: 18, stem: "What is the atmospheric pressure on Mars relative to Earth?", a: "0.01", b: "1.0", c: "92", d: "464", correct: "A", exp: "Table shows Mars: 0.01" },
      { pNum: 3, qNum: 19, stem: "Which gas on Earth results from photosynthesis?", a: "N₂", b: "O₂", c: "CO₂", d: "Other", correct: "B", exp: "'Earth's O₂ results from photosynthesis'" },
      { pNum: 3, qNum: 20, stem: "Mars has a cold surface temperature primarily because:", a: "it's far from the Sun", b: "it has no CO₂", c: "thin atmosphere provides little insulation", d: "it has too much nitrogen", correct: "C", exp: "Text: 'thin atmosphere providing little insulation'" },

      // Passage 4 - Reaction Rates (Q21-27)
      { pNum: 4, qNum: 21, stem: "In Experiment 1, increasing HCl concentration from 1.0M to 2.0M changed reaction time from:", a: "180s to 90s", b: "90s to 45s", c: "60s to 36s", d: "45s to 36s", correct: "B", exp: "Table: 1.0M=90s, 2.0M=45s" },
      { pNum: 4, qNum: 22, stem: "What is the relationship between acid concentration and reaction rate?", a: "Higher concentration decreases rate", b: "Higher concentration increases rate", c: "No relationship", d: "Concentration doesn't affect rate", correct: "B", exp: "Conclusion: 'Higher acid concentration increases reaction rate'" },
      { pNum: 4, qNum: 23, stem: "At what temperature did the reaction take 75 seconds?", a: "10°C", b: "20°C", c: "30°C", d: "40°C", correct: "C", exp: "Experiment 2 table: 30°C = 75 seconds" },
      { pNum: 4, qNum: 24, stem: "Which form of magnesium reacted fastest?", a: "Single ribbon", b: "Ribbon cut in 2", c: "Ribbon cut in 4", d: "Powder", correct: "D", exp: "Powder: 12 seconds, fastest time" },
      { pNum: 4, qNum: 25, stem: "Cutting the ribbon into 4 pieces instead of 2 pieces:", a: "increased reaction time", b: "decreased reaction time", c: "had no effect", d: "stopped the reaction", correct: "B", exp: "Cut in 2: 68s, cut in 4: 52s - time decreased" },
      { pNum: 4, qNum: 26, stem: "Why does powder react faster than a ribbon?", a: "It's heavier", b: "It has more surface area", c: "It has different chemical composition", d: "It's at higher temperature", correct: "B", exp: "Conclusion: 'Increased surface area...increases reaction rate'" },
      { pNum: 4, qNum: 27, stem: "Which variable was manipulated in Experiment 2?", a: "HCl concentration", b: "Magnesium form", c: "Temperature", d: "Ribbon length", correct: "C", exp: "Experiment 2 tested 'Effect of Temperature'" },

      // Passage 5 - Genetics (Q28-34)
      { pNum: 5, qNum: 28, stem: "In Experiment 1, all F₁ offspring were:", a: "white", b: "purple", c: "pink", d: "mixed colors", correct: "B", exp: "'100% Purple (Pp)' in F₁" },
      { pNum: 5, qNum: 29, stem: "The F₂ generation showed approximately what ratio?", a: "1:1", b: "2:1", c: "3:1", d: "4:1", correct: "C", exp: "'3.15:1 (approximately 3:1)'" },
      { pNum: 5, qNum: 30, stem: "How many white-flowered plants were in the F₂ generation?", a: "152", b: "224", c: "705", d: "929", correct: "B", exp: "Table: 224 White in F₂" },
      { pNum: 5, qNum: 31, stem: "Which allele is dominant?", a: "White", b: "Purple", c: "Both equally", d: "Neither", correct: "B", exp: "Conclusion: 'Purple is dominant over white'" },
      { pNum: 5, qNum: 32, stem: "In the test cross, the ratio of purple to white was:", a: "3:1", b: "1:1", c: "100% purple", d: "100% white", correct: "B", exp: "'152 Purple : 148 White...Approximately 1:1'" },
      { pNum: 5, qNum: 33, stem: "What genotype is pp?", a: "Purple", b: "White", c: "Pink", d: "Cannot determine", correct: "B", exp: "Table shows 'pp (White)'" },
      { pNum: 5, qNum: 34, stem: "The test cross was used to:", a: "create purple flowers", b: "determine the genotype of purple plants", c: "prove white is dominant", d: "create a 3:1 ratio", correct: "B", exp: "'crossed...to determine genotype'" },

      // Passage 6 - Continental Drift (Q35-40)
      { pNum: 6, qNum: 35, stem: "Scientist 1 supports continental drift based on:", a: "mathematical calculations only", b: "fossil, rock, and glacial evidence", c: "religious texts", d: "computer simulations", correct: "B", exp: "Lists fossil, rock formation, glacial, and coastline evidence" },
      { pNum: 6, qNum: 36, stem: "Mesosaurus fossils are found in:", a: "Europe and Asia", b: "North America only", c: "South America and Africa", d: "Australia and Antarctica", correct: "C", exp: "'South America and Africa'" },
      { pNum: 6, qNum: 37, stem: "Scientist 2's main criticism is:", a: "fossils are fake", b: "no adequate mechanism for movement", c: "coastlines fit perfectly", d: "mountains don't exist", correct: "B", exp: "'No Adequate Mechanism' is first criticism" },
      { pNum: 6, qNum: 38, stem: "How fast do continents move according to Scientist 1?", a: "2-5 mm per year", b: "2-5 cm per year", c: "2-5 m per year", d: "Continents don't move", correct: "B", exp: "'approximately 2-5 cm per year'" },
      { pNum: 6, qNum: 39, stem: "Scientist 2 suggests similar fossils could be explained by:", a: "continental drift", b: "ancient land bridges", c: "ocean currents", d: "volcanic activity", correct: "B", exp: "'ancient land bridges that have since submerged'" },
      { pNum: 6, qNum: 40, stem: "The scientists disagree most about:", a: "whether fossils exist", b: "the age of Earth", c: "the mechanism causing continent movement", d: "whether mountains exist", correct: "C", exp: "Main disagreement is whether mechanism is adequate for drift" }
    ];

    const questionInserts = scienceQs.map(q => ({
      test_number: 1,
      question_number: q.qNum,
      passage_id: sciPassageMap[q.pNum],
      question_text: q.stem,
      choices: JSON.stringify([
        `A. ${q.a}`,
        `B. ${q.b}`,
        `C. ${q.c}`,
        `D. ${q.d}`
      ]),
      correct_answer: answerToIndex(q.correct),
      explanation: q.exp,
      question_type: "general",
      difficulty: q.qNum % 7 <= 2 ? "easy" : (q.qNum % 7 <= 5 ? "medium" : "hard")
    }));

    const { error: sqErr } = await supabase
      .from('practice_test_science_questions')
      .insert(questionInserts);

    if (sqErr) throw sqErr;

    console.log('✅ Inserted 40 questions (6-7 per passage)\n');

    console.log('═══════════════════════════════════════════════');
    console.log('✅ SCIENCE SECTION COMPLETE');
    console.log('═══════════════════════════════════════════════');
    console.log('   • 6 passages with experimental data');
    console.log('   • 40 questions\n');

    console.log('🎉 PRACTICE TEST 1 - 100% COMPLETE!');
    console.log('═══════════════════════════════════════════════');
    console.log('✅ English: 5 passages (303-334 words), 75 questions');
    console.log('✅ Math: 60 questions (real problems)');
    console.log('✅ Reading: 4 passages (545-677 words), 40 questions');
    console.log('✅ Science: 6 passages (with data), 40 questions');
    console.log('═══════════════════════════════════════════════');
    console.log('📊 TOTAL: 215 questions, 15 passages - ALL REAL CONTENT\n');

  } catch (error) {
    console.error('❌ ERROR:', error.message);
    process.exit(1);
  }
}

insertScience();
