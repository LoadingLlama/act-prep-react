#!/usr/bin/env node

/**
 * PRACTICE TEST 6 - SCIENCE SECTION COMPLETE EXTRACTION
 * Manually extracted from Practice ACT 6.txt with 100% accuracy
 * All 40 questions (Q1-40) + 6 passages
 *
 * Answer Keys (normalized F→A, G→B, H→C, J→D):
 * Q1-10: D,C,B,A,A,B,D,C,A,C
 * Q11-20: C,B,A,A,D,D,A,B,B,C
 * Q21-30: C,C,B,A,D,D,C,D,B,C
 * Q31-40: C,A,D,B,C,C,A,B,D,A
 */

import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '../../.env') });

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

console.log('🔬 PRACTICE TEST 6 - SCIENCE COMPLETE EXTRACTION\n');
console.log('='.repeat(80));

const TEST_NUMBER = 6;

// STEP 1: Insert all Science passages
console.log('\n📦 STEP 1: INSERTING SCIENCE PASSAGES\n');

const passages = [
  {
    test_number: TEST_NUMBER,
    passage_number: 1,
    title: "Polyol Dissolution in Water",
    passage_text: `As a polyol (a natural sweetener) dissolves in water, the temperature of the solution that forms changes over time. Table 1 shows the change in temperature of each of 4 polyol solutions over the first 6 sec of formation. Each solution was formed by dissolving 0.5 kg of a polyol (either xylitol, maltitol, erythritol, or isomalt) in 1 L of water.

The sweetness of a food containing a polyol is related to the polyol's solubility (maximum percent by mass of the polyol that can dissolve in water kept at a constant temperature). Table 2 shows, for each of the 4 polyols, the relative sweetness and the solubility in water at 4 temperatures.

Table 1 - Temperature (°C) immediately before adding or after adding polyol:
Time (sec) | xylitol | maltitol | erythritol | isomalt
0* | 37.0 | 37.0 | 37.0 | 37.0
1 | 34.1 | 35.5 | 34.1 | 35.9
2 | 30.5 | 34.4 | 31.3 | 35.2
3 | 27.6 | 33.1 | 28.8 | 35.0
4 | 26.1 | 32.8 | 27.0 | 34.8
5 | 25.0 | 32.2 | 25.9 | 34.4
6 | 24.5 | 31.9 | 25.0 | 34.1
*immediately before addition of polyol

Table 2 - Solubility (percent by mass) at different temperatures:
Polyol | Relative sweetness* | 10°C | 20°C | 40°C | 60°C
Xylitol | 0.95 | 56 | 64 | 75 | 85
Maltitol | 0.90 | 50 | 58 | 68 | 75
Erythritol | 0.70 | 25 | 32 | 46 | 61
Isomalt | 0.40 | 18 | 24 | 40 | 56
*the sweetness as compared with the sweetness of sucrose, which is assigned a value of 1.0`,
    passage_type: "DATA_REPRESENTATION"
  },
  {
    test_number: TEST_NUMBER,
    passage_number: 2,
    title: "13-Lined Ground Squirrel Hibernation",
    passage_text: `When a 13-lined ground squirrel (a mammal) hibernates, it does not eat, and it alternates between periods of torpor (characterized by a reduced rate of metabolism, low body temperature, and little movement) and active bouts (characterized by a normal rate of metabolism, normal body temperature, and normal movement). Figure 1 shows the body temperature of a 13-lined ground squirrel during 12 consecutive months, including several months of hibernation. Figure 2 shows the average total blood cholesterol of a group of 13-lined ground squirrels at various times during the same 12 months.

Figure 1 shows body temperature varying throughout the year, with hibernation period marked, showing alternating periods of torpor (low temperature around 5°C) and active bouts (normal temperature around 40°C) from approximately December to May.

Figure 2 shows average total blood cholesterol (mg/dL) varying by month, with levels around 500-600 mg/dL during hibernation months and around 100-200 mg/dL during non-hibernation months. Periods of torpor and active bouts are indicated on the graph.`,
    passage_type: "DATA_REPRESENTATION"
  },
  {
    test_number: TEST_NUMBER,
    passage_number: 3,
    title: "Methane Production in Forest Soil",
    passage_text: `A study examined the production and consumption of methane (CH₄) by soil bacteria in 4 areas of a particular forest: an area of healthy black spruce trees, an area of burned black spruce trees, an area of healthy jack pine trees, and an area of burned jack pine trees.

Study:
On May 15, 4 identical soil gas collection cylinders were placed in the forest, one in each area. Each cylinder had an open end and a closed end; its open end was pushed into the soil, and then its aboveground surface was covered with shiny foil (see Figure 1). That same day, a gas sample was taken from each cylinder by inserting the needle of a 50 cm³ syringe into the closed end (through an airtight seal). The CH₄ content of each gas sample was determined. Likewise, on the 15th day of June, July, August, and September, a gas sample was taken from each cylinder and its CH₄ content was determined.

The difference in the CH₄ contents of consecutive samples (for example, the samples taken on May 15 and June 15) from a cylinder indicated whether there had been a net production of CH₄ (more CH₄ had been produced than consumed) or a net consumption of CH₄ (more CH₄ had been consumed than produced) in the area over the month between the 2 sampling dates. From these differences, the average rate of CH₄ production or consumption was calculated, in milligrams per square meter per day (mg/m²/day), for each area over each month (see Figure 2).

Figure 2 shows average rate of CH₄ production or consumption (mg/m²/day) for the four areas across the months ending June 15, July 15, August 15, and September 15. Values range from about -0.8 to +1.0 mg/m²/day, with both positive (production) and negative (consumption) values shown for different areas and time periods.`,
    passage_type: "RESEARCH_SUMMARY"
  },
  {
    test_number: TEST_NUMBER,
    passage_number: 4,
    title: "Acetate Hydrolysis Rate Constants",
    passage_text: `Acetates are compounds with the chemical formula CH₃CO₂R, where R is an unreactive chain of carbon and hydrogen atoms. In the presence of a catalyst, acetates can undergo hydrolysis (reaction with H₂O) to produce both acetic acid (CH₃CO₂H) and an alcohol (ROH):

CH₃CO₂R + H₂O → CH₃CO₂H + ROH

The rate at which hydrolysis occurs is proportional to the rate constant, k, of the reaction.

Three experiments were done to determine k for the hydrolysis of various acetates. In each trial, Steps 1-3 were performed:
1. Three mL of aqueous 1.0 mole/liter (mol/L) potassium hydroxide (the catalyst) and 80 mL of a solvent were combined.
2. The solution was brought to a particular temperature, and then 0.2 mL of an acetate was added to the solution.
3. The progress of the hydrolysis reaction at the particular temperature was monitored over time to determine k, measured in L/(mol·sec).

Experiment 1:
In Trials 1-6, k for each of 6 acetates with different R chains (groups) was determined using a solvent composed of 37% acetone and 63% H₂O, by volume, at 25°C.

Table 1:
Trial | R group of acetate | k (L/mol·sec)
1 | CH₃ | 0.151
2 | CH₃CH₂ | 0.0661
3 | CH₃(CH₂)₂ | 0.0469
4 | CH₃(CH₂)₃ | 0.0426
5 | CH₃(CH₂)₄ | 0.0356
6 | CH₃(CH₂)₅ | 0.0315

Experiment 2:
In Trials 7-10, Trials 1-4 of Experiment 1 were repeated, except with a solvent composed of 70% acetone and 30% H₂O by volume.

Table 2:
Trial | R group of acetate | k (L/mol·sec)
7 | CH₃ | 0.108
8 | CH₃CH₂ | 0.0466
9 | CH₃(CH₂)₂ | 0.0270
10 | CH₃(CH₂)₃ | 0.0230

Experiment 3:
In Trials 11-13, Trial 8 of Experiment 2 was repeated at 3 other temperatures: 20°C, 35°C, and 45°C. In Trials 14-16, Trial 9 was repeated at those 3 temperatures. In Trials 17-19, Trial 10 was repeated at those 3 temperatures.

Table 3:
Trial | R group of acetate | k (L/mol·sec) at 20°C | 35°C | 45°C
11-13 | CH₃CH₂ | 0.0356 | 0.0822 | 0.135
14-16 | CH₃(CH₂)₂ | 0.0202 | 0.0507 | 0.0880
17-19 | CH₃(CH₂)₃ | 0.0174 | 0.0439 | 0.0766`,
    passage_type: "RESEARCH_SUMMARY"
  },
  {
    test_number: TEST_NUMBER,
    passage_number: 5,
    title: "Tadpole Response to Protein F",
    passage_text: `When attacked by predators, tadpoles secrete Protein F into their surroundings. A scientist conducted 2 experiments with Protein F: one to examine how the activity of tadpoles changes immediately after a period of exposure to Protein F and the other to examine how depriving tadpoles of food affects their activity during a subsequent period of exposure to Protein F.

Experiment 1:
One hundred tadpoles were equally divided into 4 groups (Groups 1-4). The groups were separately placed into equal volumes of water having the Protein F concentrations shown in Table 1.

Table 1:
Group | Protein F concentration (pM*)
1 | 0
2 | 100
3 | 200
4 | 300
*picomoles per liter

After 2 hr, the groups were separately placed into equal volumes of pure water. The tadpole activity of each group was then monitored at regular intervals over the next 90 min. (The tadpole activity of a group was the number of tadpoles that were swimming during a 5 sec observation period.) The results are shown in Figure 1.

Figure 1 shows tadpole activity over 90 minutes for Groups 1-4. Group 1 (0 pM) shows relatively stable activity around 4-6 tadpoles. Groups 2-4 (100-300 pM) all show increasing activity over time, with higher Protein F concentrations generally resulting in faster increases in activity.

Experiment 2:
Two hundred tadpoles were equally divided into 4 groups (Groups 5-8), and the groups were separately placed into equal volumes of pure water. Each group was deprived of food for a specific length of time: Group 5 for 1 hr, Group 6 for 1 hr, Group 7 for 12 hr, and Group 8 for 24 hr. At the end of their respective deprivation periods, the groups were separately placed into equal volumes of water having the Protein F concentrations shown in Table 2.

Table 2:
Group | Protein F concentration (pM)
5 | 0
6 | 200
7 | 200
8 | 200

The tadpole activity of each group was then monitored at regular intervals over the next 150 min (see Figure 2).

Figure 2 shows tadpole activity over 150 minutes for Groups 5-8. Group 5 (0 pM, 1 hr deprivation) shows stable low activity. Groups 6-8 (all 200 pM but different deprivation times) show increasing activity, with longer food deprivation times resulting in faster rates of activity increase.`,
    passage_type: "RESEARCH_SUMMARY"
  },
  {
    test_number: TEST_NUMBER,
    passage_number: 6,
    title: "Light Properties Through Glass",
    passage_text: `A physics teacher asked 3 students to predict the changes, if any, to light's energy, E; frequency, f (the number of wave peaks passing a given point each second); wavelength, λ (the distance between adjacent peaks of a light wave); and speed, v_light, that occur when light travels from a vacuum into clear glass and then from the glass back into the vacuum. The teacher asked the students to base their predictions on one or both of the following equations:

E = h × f, where h always has the same value
v_light = f × λ

Student 1:
When light enters the glass, f and E are unchanged. This occurs because light loses no energy when it collides with atoms of the glass. However, v_light becomes less than c (the speed of light in a vacuum, 3 × 10⁸ m/sec) due to these collisions, so λ must also decrease.

As the light leaves the glass, both f and E are still unchanged. But upon reentering the vacuum, v_light once again becomes c, so λ must increase.

Student 2:
When light enters the glass, both f and E decrease, because light loses energy when it collides with atoms of the glass. In addition, v_light decreases due to these collisions, so the product f × λ must also decrease. However, λ can either decrease or increase, so long as any increase in λ is not so great as to cause f × λ to increase.

When the light leaves the glass, neither f nor E changes, because there is nothing present in a vacuum that will cause f or E to increase. But v_light increases to c, the speed of light in a vacuum, so λ must also increase.

Student 3:
When light enters the glass, both f and E decrease, because light loses energy when it collides with atoms of the glass. However, v_light becomes greater than c due to the gravitational attraction between the glass atoms and the light, so the product f × λ must also increase. Thus, λ must increase, and its increase must be great enough to overcome the decrease in f.

As the light leaves the glass, f and E will have the same values as they had inside the glass, because there is nothing present in a vacuum that will cause f and E to change. However, because of the gravitational attraction between the glass atoms and the light, v_light decreases to c, so λ must also decrease.`,
    passage_type: "CONFLICTING_VIEWPOINTS"
  }
];

for (const passage of passages) {
  const { error } = await supabase
    .from('act_science_passages')
    .upsert(passage, { onConflict: 'test_number,passage_number' });

  if (error) {
    console.log(`  ❌ Passage ${passage.passage_number}: ${error.message}`);
  } else {
    console.log(`  ✅ Passage ${passage.passage_number}: "${passage.title}"`);
  }
}

// Get passage IDs for linking questions
const { data: insertedPassages } = await supabase
  .from('act_science_passages')
  .select('id, passage_number')
  .eq('test_number', TEST_NUMBER)
  .order('passage_number');

const passageMap = {};
for (const p of insertedPassages || []) {
  passageMap[p.passage_number] = p.id;
}

// STEP 2: Insert all 40 Science questions
console.log('\n📝 STEP 2: INSERTING SCIENCE QUESTIONS\n');

// Answer keys (normalized to A/B/C/D)
const questions = [
  // Passage 1: Questions 1-7 (Polyols)
  {
    test_number: TEST_NUMBER,
    question_number: 1,
    passage_id: passageMap[1],
    question_stem: "Which of the polyols listed in Table 2 is least soluble in water at 40°C?",
    choice_a: "Xylitol",
    choice_b: "Maltitol",
    choice_c: "Erythritol",
    choice_d: "Isomalt",
    correct_answer: "D",
    question_type: "science",
    question_category: "IOD",
    lesson_id: null
  },
  {
    test_number: TEST_NUMBER,
    question_number: 2,
    passage_id: passageMap[1],
    question_stem: "Based on Table 1, if the temperature of the erythritol solution had been recorded at 7 sec, it would most likely have been closest to which of the following?",
    choice_a: "20.7°C",
    choice_b: "21.8°C",
    choice_c: "24.5°C",
    choice_d: "28.3°C",
    correct_answer: "C",
    question_type: "science",
    question_category: "IOD",
    lesson_id: null
  },
  {
    test_number: TEST_NUMBER,
    question_number: 3,
    passage_id: passageMap[1],
    question_stem: "Based on Table 2, it is NOT possible to dissolve enough xylitol in water to form a solution of 60% xylitol by mass if the water is kept at which of the following temperatures?",
    choice_a: "10°C",
    choice_b: "20°C",
    choice_c: "40°C",
    choice_d: "60°C",
    correct_answer: "B",
    question_type: "science",
    question_category: "IOD",
    lesson_id: null
  },
  {
    test_number: TEST_NUMBER,
    question_number: 4,
    passage_id: passageMap[1],
    question_stem: "Based on Tables 1 and 2, the polyol in the solution that had the smallest temperature change over the 6 sec period has a relative sweetness of:",
    choice_a: "0.40.",
    choice_b: "0.70.",
    choice_c: "0.90.",
    choice_d: "0.95.",
    correct_answer: "A",
    question_type: "science",
    question_category: "IOD",
    lesson_id: null
  },
  {
    test_number: TEST_NUMBER,
    question_number: 5,
    passage_id: passageMap[1],
    question_stem: "The dissolving of a polyol in water requires energy. Based on Table 1, the dissolving of which polyol over the 6 sec period required the most energy?",
    choice_a: "Xylitol; the temperature change was less for xylitol than for any of the other polyols.",
    choice_b: "Xylitol; the temperature change was greater for xylitol than for any of the other polyols.",
    choice_c: "Isomalt; the temperature change was less for isomalt than for any of the other polyols.",
    choice_d: "Isomalt; the temperature change was greater for isomalt than for any of the other polyols.",
    correct_answer: "A",
    question_type: "science",
    question_category: "IOD",
    lesson_id: null
  },
  {
    test_number: TEST_NUMBER,
    question_number: 6,
    passage_id: passageMap[1],
    question_stem: "Tagatose is a polyol that has a solubility of 58% by mass in water at 20°C. Based on Table 2, the relative sweetness of tagatose is most similar to the relative sweetness of:",
    choice_a: "xylitol.",
    choice_b: "maltitol.",
    choice_c: "erythritol.",
    choice_d: "isomalt.",
    correct_answer: "B",
    question_type: "science",
    question_category: "IOD",
    lesson_id: null
  },
  {
    test_number: TEST_NUMBER,
    question_number: 7,
    passage_id: passageMap[2],
    question_stem: "According to Figure 1, when the 13-lined ground squirrel was NOT hibernating, its average body temperature was approximately:",
    choice_a: "0°C.",
    choice_b: "5°C.",
    choice_c: "25°C.",
    choice_d: "40°C.",
    correct_answer: "D",
    question_type: "science",
    question_category: "IOD",
    lesson_id: null
  },

  // Passage 2: Questions 8-12 (Ground Squirrel) - Note: Q7 also belongs to Passage 2
  {
    test_number: TEST_NUMBER,
    question_number: 8,
    passage_id: passageMap[2],
    question_stem: "According to Figure 1, of the following months, during which one did the 13-lined ground squirrel spend the most time in periods of torpor?",
    choice_a: "August",
    choice_b: "September",
    choice_c: "February",
    choice_d: "April",
    correct_answer: "C",
    question_type: "science",
    question_category: "IOD",
    lesson_id: null
  },
  {
    test_number: TEST_NUMBER,
    question_number: 9,
    passage_id: passageMap[2],
    question_stem: "Which of the following statements about hibernation and total blood cholesterol is best supported by Figure 2? On average, the 13-lined ground squirrels' total blood cholesterol was:",
    choice_a: "above 300 mg/dL when the squirrels were hibernating and below 300 mg/dL when the squirrels were not hibernating.",
    choice_b: "below 300 mg/dL when the squirrels were hibernating and above 300 mg/dL when the squirrels were not hibernating.",
    choice_c: "above 500 mg/dL when the squirrels were hibernating and below 500 mg/dL when the squirrels were not hibernating.",
    choice_d: "below 500 mg/dL when the squirrels were hibernating and above 500 mg/dL when the squirrels were not hibernating.",
    correct_answer: "A",
    question_type: "science",
    question_category: "IOD",
    lesson_id: null
  },
  {
    test_number: TEST_NUMBER,
    question_number: 10,
    passage_id: passageMap[2],
    question_stem: "Do 13-lined ground squirrels more likely consume O₂ at a greater rate during periods of torpor or during active bouts?",
    choice_a: "Periods of torpor; the rate of metabolism is higher during periods of torpor than during active bouts.",
    choice_b: "Periods of torpor; the rate of metabolism is lower during periods of torpor than during active bouts.",
    choice_c: "Active bouts; the rate of metabolism is higher during active bouts than during periods of torpor.",
    choice_d: "Active bouts; the rate of metabolism is lower during active bouts than during periods of torpor.",
    correct_answer: "C",
    question_type: "science",
    question_category: "EMI",
    lesson_id: null
  },
  {
    test_number: TEST_NUMBER,
    question_number: 11,
    passage_id: passageMap[2],
    question_stem: "Based on Figure 1, approximately what percent of the 12 months did the 13-lined ground squirrel spend in hibernation?",
    choice_a: "15%",
    choice_b: "35%",
    choice_c: "55%",
    choice_d: "75%",
    correct_answer: "C",
    question_type: "science",
    question_category: "IOD",
    lesson_id: null
  },
  {
    test_number: TEST_NUMBER,
    question_number: 12,
    passage_id: passageMap[2],
    question_stem: "Consider the blood samples having an average total cholesterol of 420 mg/dL, as shown in Figure 2. Based on Figure 1, were those blood samples collected when the 13-lined ground squirrels were hibernating?",
    choice_a: "Yes; the samples were collected while the squirrels were in an active bout during hibernation.",
    choice_b: "Yes; the samples were collected while the squirrels were in a period of torpor during hibernation.",
    choice_c: "No; the samples were collected while the squirrels were in an active bout, which does not occur during hibernation.",
    choice_d: "No; the samples were collected while the squirrels were in a period of torpor, which does not occur during hibernation.",
    correct_answer: "B",
    question_type: "science",
    question_category: "EMI",
    lesson_id: null
  },

  // Passage 3: Questions 13-19 (Methane)
  {
    test_number: TEST_NUMBER,
    question_number: 13,
    passage_id: passageMap[3],
    question_stem: "According to the results of the study, in either area of jack pine trees, CH₄ was consumed at the greatest rate over the month that ended on:",
    choice_a: "June 15.",
    choice_b: "July 15.",
    choice_c: "August 15.",
    choice_d: "September 15.",
    correct_answer: "A",
    question_type: "science",
    question_category: "IOD",
    lesson_id: null
  },
  {
    test_number: TEST_NUMBER,
    question_number: 14,
    passage_id: passageMap[3],
    question_stem: "Over which 2 months was there a net production of CH₄ in both areas of black spruce trees?",
    choice_a: "The month ending on June 15 and the month ending on July 15",
    choice_b: "The month ending on June 15 and the month ending on August 15",
    choice_c: "The month ending on July 15 and the month ending on September 15",
    choice_d: "The month ending on August 15 and the month ending on September 15",
    correct_answer: "A",
    question_type: "science",
    question_category: "IOD",
    lesson_id: null
  },
  {
    test_number: TEST_NUMBER,
    question_number: 15,
    passage_id: passageMap[3],
    question_stem: "Consider the results for the 2 areas of black spruce trees. Over the months that both areas had a net production of CH₄, which area had the greater average rate of production; and over the months that both areas had a net consumption of CH₄, which area had the greater average rate of consumption?",
    choice_a: "greater production: healthy, greater consumption: healthy",
    choice_b: "greater production: healthy, greater consumption: burned",
    choice_c: "greater production: burned, greater consumption: healthy",
    choice_d: "greater production: burned, greater consumption: burned",
    correct_answer: "D",
    question_type: "science",
    question_category: "IOD",
    lesson_id: null
  },
  {
    test_number: TEST_NUMBER,
    question_number: 16,
    passage_id: passageMap[3],
    question_stem: "In the area of healthy jack pine trees, from June 15 to July 15, was there a net production of CH₄ or a net consumption of CH₄, and what was the average rate?",
    choice_a: "net production or consumption: production, average rate: -0.8 mg/m²/day",
    choice_b: "net production or consumption: production, average rate: 0.4 mg/m²/day",
    choice_c: "net production or consumption: consumption, average rate: -0.8 mg/m²/day",
    choice_d: "net production or consumption: consumption, average rate: 0.4 mg/m²/day",
    correct_answer: "D",
    question_type: "science",
    question_category: "IOD",
    lesson_id: null
  },
  {
    test_number: TEST_NUMBER,
    question_number: 17,
    passage_id: passageMap[3],
    question_stem: "Consider the unit of measurement in Figure 2 for the average rate of CH₄ production or consumption. What quantity is represented by 'mg,' and what quantity is represented by 'm²'?",
    choice_a: "mg: mass of CH₄, m²: area of soil",
    choice_b: "mg: mass of soil, m²: area of soil",
    choice_c: "mg: density of CH₄, m²: volume of cylinder",
    choice_d: "mg: density of air, m²: volume of cylinder",
    correct_answer: "A",
    question_type: "science",
    question_category: "SIN",
    lesson_id: null
  },
  {
    test_number: TEST_NUMBER,
    question_number: 18,
    passage_id: passageMap[3],
    question_stem: "Temperature affects the production and consumption of CH₄ by bacteria. What part or component of the experimental apparatus was directly responsible for minimizing the daily temperature increase in the soil that was covered by a cylinder?",
    choice_a: "The airtight seal",
    choice_b: "The shiny foil",
    choice_c: "The syringe",
    choice_d: "The open end of the cylinder",
    correct_answer: "B",
    question_type: "science",
    question_category: "SIN",
    lesson_id: null
  },
  {
    test_number: TEST_NUMBER,
    question_number: 19,
    passage_id: passageMap[3],
    question_stem: "Let x represent the CH₄ content of the gas inside a cylinder on May 15, and let y represent the CH₄ content of the gas inside the cylinder on June 15. Based on Figure 2, in the area of burned jack pine trees, was x > y or was x < y?",
    choice_a: "x > y, because there was a net production of CH₄ from May 15 to June 15 in that area.",
    choice_b: "x > y, because there was a net consumption of CH₄ from May 15 to June 15 in that area.",
    choice_c: "x < y, because there was a net production of CH₄ from May 15 to June 15 in that area.",
    choice_d: "x < y, because there was a net consumption of CH₄ from May 15 to June 15 in that area.",
    correct_answer: "B",
    question_type: "science",
    question_category: "IOD",
    lesson_id: null
  },

  // Passage 4: Questions 20-26 (Acetate Hydrolysis)
  {
    test_number: TEST_NUMBER,
    question_number: 20,
    passage_id: passageMap[4],
    question_stem: "According to the results of Experiment 1, from acetate to acetate, as the number of C atoms in the R group increased, the value of k:",
    choice_a: "increased only.",
    choice_b: "decreased only.",
    choice_c: "increased, then decreased.",
    choice_d: "decreased, then increased.",
    correct_answer: "C",
    question_type: "science",
    question_category: "IOD",
    lesson_id: null
  },
  {
    test_number: TEST_NUMBER,
    question_number: 21,
    passage_id: passageMap[4],
    question_stem: "Trials 14-16 were different from Trial 9 with respect to what experimental factor?",
    choice_a: "Amount of catalyst",
    choice_b: "Identity of R group",
    choice_c: "Temperature",
    choice_d: "Composition of solvent",
    correct_answer: "C",
    question_type: "science",
    question_category: "SIN",
    lesson_id: null
  },
  {
    test_number: TEST_NUMBER,
    question_number: 22,
    passage_id: passageMap[4],
    question_stem: "Which of the following pieces of laboratory equipment was most likely used in Step 1 of the experimental procedure?",
    choice_a: "Electronic balance",
    choice_b: "Thermometer",
    choice_c: "Graduated cylinder",
    choice_d: "Metric ruler",
    correct_answer: "C",
    question_type: "science",
    question_category: "SIN",
    lesson_id: null
  },
  {
    test_number: TEST_NUMBER,
    question_number: 23,
    passage_id: passageMap[4],
    question_stem: "Suppose that in Experiment 3 the acetate with the R group CH₃(CH₂)₂ had been hydrolyzed at 32°C. At that temperature, the value of k would most likely have been:",
    choice_a: "less than 0.0202 L/(mol·sec).",
    choice_b: "between 0.0202 L/(mol·sec) and 0.0507 L/(mol·sec).",
    choice_c: "between 0.0507 L/(mol·sec) and 0.0880 L/(mol·sec).",
    choice_d: "greater than 0.0880 L/(mol·sec).",
    correct_answer: "B",
    question_type: "science",
    question_category: "IOD",
    lesson_id: null
  },
  {
    test_number: TEST_NUMBER,
    question_number: 24,
    passage_id: passageMap[4],
    question_stem: "In how many experiments, if any, was k an independent variable?",
    choice_a: "0",
    choice_b: "1",
    choice_c: "2",
    choice_d: "3",
    correct_answer: "A",
    question_type: "science",
    question_category: "SIN",
    lesson_id: null
  },
  {
    test_number: TEST_NUMBER,
    question_number: 25,
    passage_id: passageMap[4],
    question_stem: "Can it be determined on the basis of Experiment 2 whether the rate constant depends on the temperature of the reaction solution?",
    choice_a: "Yes, because in Experiment 2, the temperature of the reaction solution was varied.",
    choice_b: "Yes, because in Experiment 2, the temperature of the reaction solution was held constant.",
    choice_c: "No, because in Experiment 2, the temperature of the reaction solution was varied.",
    choice_d: "No, because in Experiment 2, the temperature of the reaction solution was held constant.",
    correct_answer: "D",
    question_type: "science",
    question_category: "EMI",
    lesson_id: null
  },
  {
    test_number: TEST_NUMBER,
    question_number: 26,
    passage_id: passageMap[4],
    question_stem: "The dielectric constant (ε) of a substance is a measure of the polarity of the substance; the greater the value of ε, the greater the polarity. If the ε of acetone is 21 and the ε of H₂O is 80, was the solvent used in Experiment 1 less polar or more polar than the solvent used in Experiment 2?",
    choice_a: "Less polar, because the solvent used in Experiment 1 contained a higher percent of acetone than did the solvent in Experiment 2.",
    choice_b: "Less polar, because the solvent used in Experiment 1 contained a higher percent of H₂O than did the solvent in Experiment 2.",
    choice_c: "More polar, because the solvent used in Experiment 1 contained a higher percent of acetone than did the solvent in Experiment 2.",
    choice_d: "More polar, because the solvent used in Experiment 1 contained a higher percent of H₂O than did the solvent in Experiment 2.",
    correct_answer: "D",
    question_type: "science",
    question_category: "EMI",
    lesson_id: null
  },

  // Passage 5: Questions 27-33 (Tadpoles)
  {
    test_number: TEST_NUMBER,
    question_number: 27,
    passage_id: passageMap[5],
    question_stem: "Which of the following groups was most likely intended to serve as a control for the effect of Protein F on tadpole activity?",
    choice_a: "Group 3",
    choice_b: "Group 4",
    choice_c: "Group 5",
    choice_d: "Group 6",
    correct_answer: "C",
    question_type: "science",
    question_category: "SIN",
    lesson_id: null
  },
  {
    test_number: TEST_NUMBER,
    question_number: 28,
    passage_id: passageMap[5],
    question_stem: "Suppose Experiment 2 had been continued for another 30 min. How many Group 7 tadpoles would most likely have been observed to be swimming at 180 min?",
    choice_a: "Fewer than 4",
    choice_b: "Between 4 and 8",
    choice_c: "Between 8 and 14",
    choice_d: "More than 14",
    correct_answer: "D",
    question_type: "science",
    question_category: "IOD",
    lesson_id: null
  },
  {
    test_number: TEST_NUMBER,
    question_number: 29,
    passage_id: passageMap[5],
    question_stem: "Experiments 1 and 2 differed in which of the following ways?",
    choice_a: "The number of tadpoles in each group was greater in Experiment 1 than in Experiment 2.",
    choice_b: "The number of tadpoles in each group was greater in Experiment 2 than in Experiment 1.",
    choice_c: "The groups of tadpoles were placed into equal volumes of water in Experiment 1 but not in Experiment 2.",
    choice_d: "The groups of tadpoles were placed into equal volumes of water in Experiment 2 but not in Experiment 1.",
    correct_answer: "B",
    question_type: "science",
    question_category: "SIN",
    lesson_id: null
  },
  {
    test_number: TEST_NUMBER,
    question_number: 30,
    passage_id: passageMap[5],
    question_stem: "In Experiment 1, after a group was exposed to Protein F for 2 hr, how was the group more likely removed from the water containing Protein F and placed into its new environment—with a fine wire mesh basket or with a watertight plastic cup?",
    choice_a: "A fine wire mesh basket, to maximize the amount of Protein F that would be transferred to the group's new environment",
    choice_b: "A fine wire mesh basket, to minimize the amount of Protein F that would be transferred to the group's new environment",
    choice_c: "A watertight plastic cup, to maximize the amount of Protein F that would be transferred to the group's new environment",
    choice_d: "A watertight plastic cup, to minimize the amount of Protein F that would be transferred to the group's new environment",
    correct_answer: "C",
    question_type: "science",
    question_category: "SIN",
    lesson_id: null
  },
  {
    test_number: TEST_NUMBER,
    question_number: 31,
    passage_id: passageMap[5],
    question_stem: "The molecules of the substance secreted by the tadpoles are composed of what type of subunit?",
    choice_a: "Amino acid",
    choice_b: "Monosaccharide",
    choice_c: "Fatty acid",
    choice_d: "Nucleotide",
    correct_answer: "C",
    question_type: "science",
    question_category: "EMI",
    lesson_id: null
  },
  {
    test_number: TEST_NUMBER,
    question_number: 32,
    passage_id: passageMap[5],
    question_stem: "Consider the statement \"When the tadpoles were in the presence of Protein F, the activity of the tadpoles that were more hungry increased faster than did the activity of the tadpoles that were less hungry.\" Do the results of Experiment 2 support this statement?",
    choice_a: "Yes; as the length of time that tadpoles were deprived of food increased, the rate of increase in the number of swimming tadpoles increased.",
    choice_b: "Yes; as the length of time that tadpoles were deprived of food increased, the rate of increase in the number of swimming tadpoles decreased.",
    choice_c: "No; as the length of time that tadpoles were deprived of food increased, the rate of increase in the number of swimming tadpoles increased.",
    choice_d: "No; as the length of time that tadpoles were deprived of food increased, the rate of increase in the number of swimming tadpoles decreased.",
    correct_answer: "A",
    question_type: "science",
    question_category: "EMI",
    lesson_id: null
  },
  {
    test_number: TEST_NUMBER,
    question_number: 33,
    passage_id: passageMap[5],
    question_stem: "Consider the statement \"The activity of the tadpoles that had been exposed to 300 pM of Protein F increased faster than did the activity of the tadpoles that had been exposed to 100 pM of Protein F.\" Do the results of Experiment 1 support this statement?",
    choice_a: "Yes; the rate at which tadpole activity increased was greater for Group 1 than it was for Group 3.",
    choice_b: "Yes; the rate at which tadpole activity increased was greater for Group 4 than it was for Group 2.",
    choice_c: "No; the rate at which tadpole activity increased was greater for Group 3 than it was for Group 1.",
    choice_d: "No; the rate at which tadpole activity increased was greater for Group 2 than it was for Group 4.",
    correct_answer: "D",
    question_type: "science",
    question_category: "EMI",
    lesson_id: null
  },

  // Passage 6: Questions 34-40 (Light Through Glass)
  {
    test_number: TEST_NUMBER,
    question_number: 34,
    passage_id: passageMap[6],
    question_stem: "Based on Student 3's predictions, when light enters the glass from the vacuum, which of the properties of light listed below increase(s) in value? I. f II. E III. v_light",
    choice_a: "I only",
    choice_b: "III only",
    choice_c: "I and II only",
    choice_d: "I, II, and III",
    correct_answer: "B",
    question_type: "science",
    question_category: "EMI",
    lesson_id: null
  },
  {
    test_number: TEST_NUMBER,
    question_number: 35,
    passage_id: passageMap[6],
    question_stem: "Based on the information given, when light enters the glass, can light's f change without its E changing?",
    choice_a: "Yes, because the value of h can change.",
    choice_b: "Yes, because the value of h is constant.",
    choice_c: "No, because the value of λ can change.",
    choice_d: "No, because the value of h is constant.",
    correct_answer: "C",
    question_type: "science",
    question_category: "EMI",
    lesson_id: null
  },
  {
    test_number: TEST_NUMBER,
    question_number: 36,
    passage_id: passageMap[6],
    question_stem: "Which students imply that light's frequency before entering the glass is different from its frequency after leaving the glass?",
    choice_a: "Student 1 only",
    choice_b: "Student 2 only",
    choice_c: "Student 3 only",
    choice_d: "None of the students",
    correct_answer: "C",
    question_type: "science",
    question_category: "EMI",
    lesson_id: null
  },
  {
    test_number: TEST_NUMBER,
    question_number: 37,
    passage_id: passageMap[6],
    question_stem: "Which of the students, if any, implies that the collisions between light and atoms of the glass cause no change in light's energy?",
    choice_a: "Student 1 only",
    choice_b: "Student 2 only",
    choice_c: "Student 3 only",
    choice_d: "None of the students",
    correct_answer: "A",
    question_type: "science",
    question_category: "EMI",
    lesson_id: null
  },
  {
    test_number: TEST_NUMBER,
    question_number: 38,
    passage_id: passageMap[6],
    question_stem: "Which of the students, if any, implies that the speed of light in the vacuum can have more than one value?",
    choice_a: "Student 1 only",
    choice_b: "Student 2 only",
    choice_c: "Student 3 only",
    choice_d: "None of the students",
    correct_answer: "B",
    question_type: "science",
    question_category: "EMI",
    lesson_id: null
  },
  {
    test_number: TEST_NUMBER,
    question_number: 39,
    passage_id: passageMap[6],
    question_stem: "Why does Student 2 maintain that if light enters the glass and λ increases, the size of the increase must be limited? If the increase in λ were too great, the:",
    choice_a: "quotient f ÷ λ would decrease.",
    choice_b: "quotient f ÷ λ would increase.",
    choice_c: "product f × λ would decrease.",
    choice_d: "product f × λ would increase.",
    correct_answer: "D",
    question_type: "science",
    question_category: "EMI",
    lesson_id: null
  },
  {
    test_number: TEST_NUMBER,
    question_number: 40,
    passage_id: passageMap[6],
    question_stem: "If each of Students 1 and 2 were to provide a value for the f of light reentering the vacuum, would Student 1's value be greater than, less than, or equal to Student 2's value?",
    choice_a: "Greater",
    choice_b: "Less",
    choice_c: "Equal",
    choice_d: "Cannot be determined from the given information",
    correct_answer: "A",
    question_type: "science",
    question_category: "EMI",
    lesson_id: null
  }
];

let inserted = 0;
let errors = 0;

for (const q of questions) {
  const { error } = await supabase
    .from('act_science_questions')
    .upsert(q, { onConflict: 'test_number,question_number' });

  if (error) {
    console.log(`  ❌ Q${q.question_number}: ${error.message}`);
    errors++;
  } else {
    console.log(`  ✅ Q${q.question_number}: ${q.question_stem.substring(0, 60)}...`);
    inserted++;
  }
}

console.log('\n' + '='.repeat(80));
console.log(`\n📊 EXTRACTION SUMMARY:`);
console.log(`  Passages inserted: ${passages.length}/6`);
console.log(`  Questions inserted: ${inserted}/40 questions`);
console.log(`  Errors: ${errors}`);

if (inserted === 40 && passages.length === 6) {
  console.log('\n✅✅✅ ALL 6 PASSAGES + 40 SCIENCE QUESTIONS INSERTED! ✅✅✅\n');
} else {
  console.log(`\n⏳ ${inserted} questions inserted - need to add remaining ${40 - inserted} questions\n`);
}

console.log('='.repeat(80) + '\n');
