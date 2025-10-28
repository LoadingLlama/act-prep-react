#!/usr/bin/env node
import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '../../.env') });
const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
const TEST_NUMBER = 4;
const answerKeys = JSON.parse(fs.readFileSync(join(__dirname, '../../data/test4-answer-keys.json'), 'utf8'));

// PASSAGE 2: Primary Amines (Q7-12)
const P2_TEXT = `Primary amines (PAs) are compounds containing an amino (NH₂) group bound to a hydrocarbon chain (a group made up of C and H atoms). Table 1 lists, for each of 5 PAs, the chemical formula, molecular mass (mass of 1 molecule) in atomic mass units (amu), melting point (MP), and boiling point (BP).

[Table 1 shows: 1-propanamine (59 amu, MP -85°C, BP 47°C), 1-butanamine (73 amu, MP -49°C, BP 77°C), 1-pentanamine (87 amu, MP -55°C, BP 104°C), 1-hexanamine (101 amu, MP -23°C, BP 131°C), 1-heptanamine (115 amu, MP -18°C, BP 156°C)]

Table 2 lists, for each of the 5 PAs, the flash point (the lowest temperature at which a flammable mixture is formed in the air above a liquid) and the temperature at which the vapor pressure (the pressure exerted by a vapor in equilibrium with its liquid state) equals 0.1 kPa, 1 kPa, 10 kPa, and 100 kPa.

[Table 2 shows flash points and vapor pressure temperatures for all 5 PAs]

Tables adapted from W. M. Haynes, ed., CRC Handbook of Chemistry and Physics on CD-ROM, Version 2011. ©2011 by CRC Press, LLC.`;

const P2_Q = [
  {n:7,s:"According to Table 1, among the 5 PAs, as the molecular mass increases, the BP at 101.3 kPa:",a:"decreases only.",b:"increases only.",c:"decreases, then increases.",d:"varies, but with no general trend.",ans:answerKeys.science[7],t:"data-interpretation",c:"IOD"},
  {n:8,s:"According to Tables 1 and 2, the PA that has a flash point of -1°C at 101.3 kPa has a molecular mass of:",a:"59 amu.",b:"73 amu.",c:"87 amu.",d:"101 amu.",ans:answerKeys.science[8],t:"data-interpretation",c:"IOD"},
  {n:9,s:"Based on Table 2, the vapor pressure of 1-pentanamine at 11°C would most likely be:",a:"less than 0.1 kPa.",b:"between 0.1 kPa and 1 kPa.",c:"between 1 kPa and 10 kPa.",d:"greater than 10 kPa.",ans:answerKeys.science[9],t:"data-interpretation",c:"IOD"},
  {n:10,s:"Consider the PA ethanamine, CH₃CH₂NH₂. Based on Table 1, the molecular mass of ethanamine is closest to which of the following?",a:"31 amu",b:"45 amu",c:"59 amu",d:"73 amu",ans:answerKeys.science[10],t:"data-interpretation",c:"IOD"},
  {n:11,s:"Consider the PA l-octanamine, CH₃(CH₂)₆NH₂. Based on Tables 1 and 2, the temperature at which the vapor pressure of l-octanamine equals 100 kPa would most likely be:",a:"less than 102°C.",b:"between 102°C and 131°C.",c:"between 131°C and 154°C.",d:"greater than 154°C.",ans:answerKeys.science[11],t:"data-interpretation",c:"IOD"},
  {n:12,s:"Which of the PAs listed in Table 1 would exist in the liquid state at -65°C and 101.3 kPa?",a:"1-propanamine only",b:"1-pentanamine only",c:"1-propanamine and 1-butanamine only",d:"1-pentanamine and 1-butanamine only",ans:answerKeys.science[12],t:"data-interpretation",c:"IOD"}
];

// PASSAGE 3: Oil Spill Sorbents (Q13-19)
const P3_TEXT = `Oil spills in the ocean are cleaned up by using a sorbent to soak up the oil floating on the water's surface. Two studies examined the effectiveness of 4 sorbents: 3 natural (milkweed, cotton, and kenaf) and 1 synthetic (polypropylene).

Before the studies, the following procedures were performed for each sorbent: A 1 g sample of the sorbent was completely dried and then placed in a beaker containing 500 mL of seawater. Ten minutes later, the sample was removed from the beaker and its mass was measured. The mass of seawater the sample had soaked up, mw, was calculated. The sample was discarded.

Study 1: The following procedures were performed for each sorbent: A 500 mL volume of seawater was poured into each of 5 identical 1 L beakers. A different mass of heavy crude oil—10 g, 20 g, 30 g, 40 g, or 50 g—was added to each beaker. A 1 g sample of completely dried sorbent was added to each beaker. The beakers were gently shaken for 10 min. Immediately after the beakers were shaken, each sample was removed from its beaker, and its final mass, mf, was measured. The mass of oil that had been soaked up by the sample, mo, was calculated as follows: mo = mf - mw - 1g. The results, given in grams of oil soaked up per gram of sorbent, are shown in Figure 1.

Study 2: The procedures of Study 1 were repeated except that each sorbent was placed in light crude oil and seawater instead of heavy crude oil and seawater. The results are shown in Figure 2.

Figures adapted from Hyung-Min Choi and Rinn M. Cloud, "Natural Sorbents in Oil Spill Cleanup." ©1992 by the American Chemical Society.`;

const P3_Q = [
  {n:13,s:"Based on the results of the studies, which of the sorbents would be most effective in cleaning up an ocean spill of heavy crude oil, and which of the sorbents would be most effective in cleaning up an ocean spill of light crude oil?",a:"heavy crude oil: milkweed; light crude oil: milkweed",b:"heavy crude oil: cotton; light crude oil: kenaf",c:"heavy crude oil: kenaf; light crude oil: polypropylene",d:"heavy crude oil: polypropylene; light crude oil: polypropylene",ans:answerKeys.science[13],t:"research-summaries",c:"IOD"},
  {n:14,s:"Which procedure was most likely intended to simulate the effect of waves in the ocean?",a:"Pouring seawater into a beaker",b:"Adding oil to a beaker of seawater",c:"Shaking a beaker of seawater for 10 min",d:"Removing a sample of sorbent from a beaker of seawater",ans:answerKeys.science[14],t:"research-summaries",c:"SIN"},
  {n:15,s:"Consider the results of both studies for an oil mass of 30 g. Which of the sorbents soaked up a greater mass of light crude oil than of heavy crude oil at that oil mass?",a:"Cotton only",b:"Milkweed and kenaf only",c:"Cotton and polypropylene only",d:"All 4 sorbents",ans:answerKeys.science[15],t:"research-summaries",c:"IOD"},
  {n:16,s:"In each study, after heavy crude oil or light crude oil was added to a beaker of seawater, the oil floated on the surface of the seawater. This information is consistent with which of the following statements comparing the density of seawater with the density of heavy crude oil and with the density of light crude oil? Seawater is:",a:"less dense than heavy crude oil and less dense than light crude oil.",b:"more dense than heavy crude oil and more dense than light crude oil.",c:"less dense than heavy crude oil but more dense than light crude oil.",d:"more dense than heavy crude oil but less dense than light crude oil.",ans:answerKeys.science[16],t:"research-summaries",c:"SIN"},
  {n:17,s:"According to the results of Study 2, in the beakers containing 20 g or more of light crude oil in seawater, did 1 g of any of the natural sorbents soak up more oil than did 1 g of synthetic sorbent?",a:"Yes; 1 g of milkweed and 1 g of cotton each soaked up more oil than did 1 g of kenaf.",b:"Yes; 1 g of milkweed and 1 g of cotton each soaked up more oil than did 1 g of polypropylene.",c:"No; 1 g of milkweed and 1 g of cotton each soaked up less oil than did 1 g of kenaf.",d:"No; 1 g of milkweed and 1 g of cotton each soaked up less oil than did 1 g of polypropylene.",ans:answerKeys.science[17],t:"research-summaries",c:"IOD"},
  {n:18,s:"Consider the statement \"As the mass of oil added to 500 mL of seawater increased, the mass of oil soaked up by 1 g of sorbent always increased.\" This statement is consistent with the results of Study 1 for which of the sorbents?",a:"Milkweed only",b:"Polypropylene only",c:"Milkweed and cotton only",d:"Kenaf and polypropylene only",ans:answerKeys.science[18],t:"research-summaries",c:"IOD"},
  {n:19,s:"Suppose that, in Study 1, 0.5 g of dry cotton and 0.5 g of dry polypropylene had been thoroughly mixed and then added to a 1 L beaker containing 500 mL of seawater and 50 g of heavy crude oil. The number of grams of oil soaked up by the 1 g sorbent mixture would most likely have been:",a:"less than 8.",b:"between 8 and 16.",c:"between 16 and 26.",d:"greater than 26.",ans:answerKeys.science[19],t:"research-summaries",c:"SIN"}
];

// PASSAGE 4: Acid Solutions (Q20-26)
const P4_TEXT = `Three experiments were performed to study the surface tension and pH of colorless aqueous solutions of 4 different acids: nitric acid, formic acid, chloroacetic acid, and acetic acid. A liquid's surface tension in millijoules per square meter (mJ/m²) is equal to the energy in millijoules required to increase the surface area of the liquid by 1 m².

Experiment 1: Twenty 250 g aqueous solutions—5 of nitric acid, 5 of formic acid, 5 of chloroacetic acid, and 5 of acetic acid—were prepared. Each of the 5 solutions of a given acid had a different percent by mass of acid (10%, 20%, 30%, 40%, or 50%). The surface tension of each solution and of distilled H₂O was measured at 25°C (see Figure 1).

Experiment 2: One gram of each of the 50% by mass acid solutions prepared in Experiment 1 was diluted with distilled H₂O to a total mass of 10 g, forming four 5% by mass acid solutions. Six drops of methyl violet, a pH indicator, were added to each of these solutions. (A pH indicator is a compound whose color is determined by the pH of the solution in which the compound is dissolved.) The color of each resulting solution at 25°C was recorded (see Table 1).

Experiment 3: One gram of each of the 20 solutions prepared in Experiment 1 was diluted with distilled H₂O to a total mass of 10 g. The pH of each resulting solution was measured at 25°C (see Figure 2).

Table 1 adapted from Kenneth E. Kolb and Doris Kolb, "Illustrating the Inductive Effect on Acid Strength of Carboxylic Acids." ©1989 by Division of Chemical Education, Inc., American Chemical Society.`;

const P4_Q = [
  {n:20,s:"Based on the results of Experiment 2, if 6 drops of methyl violet are added to a 5% by mass nitric acid solution, what will be the color of the resulting solution at 25°C?",a:"Blue",b:"Blue-violet",c:"Violet",d:"Yellow-green",ans:answerKeys.science[20],t:"research-summaries",c:"IOD"},
  {n:21,s:"Based on the results of Experiment 1, for each of the 4 acids, as acid concentration increased from 10% by mass through 50% by mass, the surface tension at 25°C:",a:"increased only.",b:"decreased only.",c:"increased, then decreased.",d:"decreased, then increased.",ans:answerKeys.science[21],t:"research-summaries",c:"IOD"},
  {n:22,s:"A student predicted that, if a formic acid solution and an acetic acid solution have the same acid concentration by mass and are both at 25°C, the formic acid solution has a greater surface tension than does the acetic acid solution. The results of which experiment better support or refute this prediction?",a:"Experiment 1's results better support this prediction.",b:"Experiment 1's results better refute this prediction.",c:"Experiment 2's results better support this prediction.",d:"Experiment 2's results better refute this prediction.",ans:answerKeys.science[22],t:"research-summaries",c:"SIN"},
  {n:23,s:"Based on the results of Experiment 3, the pH of a 2.5% by mass formic acid solution at 25°C would most likely have been closest to which of the following?",a:"1.8",b:"2.2",c:"2.4",d:"2.8",ans:answerKeys.science[23],t:"research-summaries",c:"IOD"},
  {n:24,s:"Suppose that 6 drops of methyl violet are added to an aqueous solution of an acid with a pH of 2.5 at 25°C. Based on the results of Experiments 2 and 3, the color of the resulting solution at 25°C will most likely be:",a:"blue.",b:"blue-violet.",c:"violet.",d:"yellow-green.",ans:answerKeys.science[24],t:"research-summaries",c:"SIN"},
  {n:25,s:"Which of the following factors was kept the same for all the acid solutions in Experiment 2 but was NOT kept the same for all the acid solutions in Experiment 1 and in Experiment 3?",a:"Acid concentration",b:"pH",c:"Surface tension",d:"Temperature",ans:answerKeys.science[25],t:"research-summaries",c:"SIN"},
  {n:26,s:"Based on the results of Experiment 3, which is the stronger acid, nitric acid or acetic acid?",a:"Nitric acid, because at each concentration the nitric acid solution had the lower pH.",b:"Nitric acid, because at each concentration the nitric acid solution had the higher pH.",c:"Acetic acid, because at each concentration the acetic acid solution had the lower pH.",d:"Acetic acid, because at each concentration the acetic acid solution had the higher pH.",ans:answerKeys.science[26],t:"research-summaries",c:"SIN"}
];

// PASSAGE 5: Structural Beam Deflection (Q27-33)
const P5_TEXT = `A structural beam, such as one used in construction, will deflect (bend) when a sufficiently large force is applied perpendicular to the beam's length. Three studies of 12 trials each were performed on the deflection of 2 straight structural beams—a concrete beam and a steel beam—that had identical dimensions.

In each trial, 2 supports were separated by a distance L, measured in centimeters (cm), and a beam was centered on top of the supports. A force, F, measured in kilonewtons (kN), was then applied to the center of the beam, and the maximum deflection of the beam, d, was measured in millimeters (mm). The beam was oriented in either the H configuration or the I configuration.

Study 1: Twelve trials were performed in which L was varied and F was 1 kN. In the first 6 trials, the concrete beam was tested in the H configuration. In the last 6 trials, the concrete beam was tested in the I configuration. Figure 1 shows the results of these trials.

Study 2: In 12 trials, the procedures of Study 1 were repeated, except that the steel beam was tested. Figure 2 shows the results of these trials.

Study 3: Twelve trials were performed in which L was 100 cm and F was varied. In the first 6 trials, the concrete beam was tested in the I configuration. In the last 6 trials, the steel beam was tested in the I configuration. Figure 3 shows the results of these trials.`;

const P5_Q = [
  {n:27,s:"Based on the apparatus diagram, Figure 1, and Figure 2, each of the 2 beams tested must have been longer than:",a:"200 cm.",b:"250 cm.",c:"300 cm.",d:"350 cm.",ans:answerKeys.science[27],t:"research-summaries",c:"SIN"},
  {n:28,s:"Consider the difference between d for a beam in the H configuration and d for that beam in the I configuration. As L was increased, the absolute value of this difference:",a:"increased for the concrete beam but decreased for the steel beam.",b:"decreased for the concrete beam but increased for the steel beam.",c:"increased for both beams.",d:"decreased for both beams.",ans:answerKeys.science[28],t:"research-summaries",c:"IOD"},
  {n:29,s:"For the studies to be performed as described, which of the following criteria must have been satisfied during any given trial?",a:"The beam must have been perfectly rigid.",b:"The supports must have been fixed in position.",c:"The applied force must have been less than the weight of the beam.",d:"The maximum deflection must have been measured prior to applying the force.",ans:answerKeys.science[29],t:"research-summaries",c:"SIN"},
  {n:30,s:"In how many studies was the concrete beam tested, and in how many studies, if any, was only the concrete beam tested?",a:"concrete tested: 1; only concrete tested: 0",b:"concrete tested: 2; only concrete tested: 1",c:"concrete tested: 2; only concrete tested: 2",d:"concrete tested: 3; only concrete tested: 2",ans:answerKeys.science[30],t:"research-summaries",c:"SIN"},
  {n:31,s:"Suppose that in Study 3 the 2 beams had been tested in the H configuration. How would the results most likely have compared with the data shown in Figure 3? For each beam, the graph of d versus F would have been a straight line whose slope was:",a:"negative, and the line would have been steeper than the corresponding line graphed in Figure 3.",b:"negative, and the line would have been less steep than the corresponding line graphed in Figure 3.",c:"positive, and the line would have been steeper than the corresponding line graphed in Figure 3.",d:"positive, and the line would have been less steep than the corresponding line graphed in Figure 3.",ans:answerKeys.science[31],t:"research-summaries",c:"SIN"},
  {n:32,s:"Can it be determined on the basis of Study 2 whether the maximum deflection of the steel beam depended on the strength of the applied force?",a:"Yes, because F was held constant in Study 2.",b:"Yes, because F was varied in Study 2.",c:"No, because F was held constant in Study 2.",d:"No, because F was varied in Study 2.",ans:answerKeys.science[32],t:"research-summaries",c:"SIN"},
  {n:33,s:"Suppose that a doorway is to be supported by one of the two beams tested in the studies. The doorway is 150 cm wide, and the beam must be able to support a force of at least 1 kN. However, d for the beam must never exceed 0.5 mm. Which beam, when oriented in which configuration, CANNOT be used to support this doorway?",a:"The concrete beam in the H configuration",b:"The concrete beam in the I configuration",c:"The steel beam in the H configuration",d:"The steel beam in the I configuration",ans:answerKeys.science[33],t:"research-summaries",c:"SIN"}
];

// PASSAGE 6: Spring Oscillation (Q34-40)
const P6_TEXT = `A spring with a spring constant k (which indicates the spring's stiffness) is attached to a cube of mass M and then to a wall. The cube initially rests at Point Q on a frictionless horizontal surface. The cube is pulled from Point Q to Point P, stretching the spring. Once released, the cube oscillates between Points P and R, each a distance A (the amplitude) from Point Q.

The frequency, f, is the number of times per second the cube completes a cycle (travels from P to R, then back to P); v is the average speed of the cube during 1 cycle.

The teacher asks each of 3 students to predict which combination of the independent variables k, M, and A would produce the highest f.

Student 1: As k increases, v decreases, because a stiffer spring moves less freely. Therefore, f decreases because it takes more time for the cube to complete each cycle. As M increases, v decreases, and so f also decreases. As A increases, v increases, because the distance the cube travels during a complete cycle increases. Therefore, f also increases. The highest f would be produced when each of k and M has its least value and A has its greatest value.

Student 2: As k increases, v increases, because the force exerted on the cube by the spring also increases, giving the cube a greater average acceleration and, therefore, a greater v. When v increases, f increases. As M increases, v and f increase, because during the spring's oscillations, the momentum of the cube keeps its average speed from decreasing. As A increases, the force exerted on the cube by the spring increases, so v, f, and average acceleration increase. The highest f would be produced when each of k, M, and A has its greatest value.

Student 3: As k increases, the potential energy stored in the spring just before its release increases, so both v and f also increase. As M increases, the cube's average acceleration decreases, and so both v and f decrease. As A increases, both the cube's average acceleration and v increase, but so does the total distance through which the cube must travel. Consequently, f remains the same. The highest f would be produced when k has its greatest value and M has its least value.`;

const P6_Q = [
  {n:34,s:"Based on Student 3's predictions, which of the variables listed below does NOT affect f?",a:"I only",b:"III only",c:"I and II only",d:"I and III only",ans:answerKeys.science[34],t:"conflicting-viewpoints",c:"SIN"},
  {n:35,s:"According to the predictions of Student 1 and Student 2, respectively, as cube mass increases, does the cube's average speed during a cycle increase or decrease?",a:"Student 1: increase; Student 2: increase",b:"Student 1: increase; Student 2: decrease",c:"Student 1: decrease; Student 2: increase",d:"Student 1: decrease; Student 2: decrease",ans:answerKeys.science[35],t:"conflicting-viewpoints",c:"IOD"},
  {n:36,s:"Based on Student 2's predictions, which of the changes listed below would cause f to decrease?",a:"I only",b:"II only",c:"I and III only",d:"II and III only",ans:answerKeys.science[36],t:"conflicting-viewpoints",c:"SIN"},
  {n:37,s:"Based on Student 1's predictions, as k increases, the cube's average kinetic energy will:",a:"increase, because v will increase.",b:"increase, because v will decrease.",c:"decrease, because v will increase.",d:"decrease, because v will decrease.",ans:answerKeys.science[37],t:"conflicting-viewpoints",c:"SIN"},
  {n:38,s:"Suppose that M = 1 kg for Cube R and that M = 2 kg for Cube S. Based on Student 3's predictions, for given values of k and A, the average acceleration will be greater for which cube?",a:"R, because average acceleration increases as cube mass increases.",b:"R, because average acceleration increases as cube mass decreases.",c:"S, because average acceleration increases as cube mass increases.",d:"S, because average acceleration increases as cube mass decreases.",ans:answerKeys.science[38],t:"conflicting-viewpoints",c:"SIN"},
  {n:39,s:"Consider 2 springs, Spring X and Spring Y. Spring X has a smaller k than does Spring Y. Student 1 would probably agree that the cube will take a longer time to complete a cycle if it is attached to which spring?",a:"Spring X, because it is the stiffer spring.",b:"Spring X, because it is the less stiff spring.",c:"Spring Y, because it is the stiffer spring.",d:"Spring Y, because it is the less stiff spring.",ans:answerKeys.science[39],t:"conflicting-viewpoints",c:"SIN"},
  {n:40,s:"Based on the information given, what total distance will the cube travel during 1 complete cycle?",a:"1A",b:"2A",c:"3A",d:"4A",ans:answerKeys.science[40],t:"conflicting-viewpoints",c:"SIN"}
];

console.log('🔬 EXTRACTING SCIENCE P2-P6 (Q7-40)...');

// P2
const {data: p2, error: e2} = await supabase.from('act_science_passages').upsert({test_number: TEST_NUMBER, passage_number: 2, passage_type: "Data Representation", title: "Primary Amines Chemistry", passage_text: P2_TEXT}, {onConflict: 'test_number,passage_number'}).select().single();
if (e2) {console.error('P2 error:', e2); process.exit(1);}
let c2 = 0;
for (const q of P2_Q) {
  const {error} = await supabase.from('act_science_questions').upsert({test_number: TEST_NUMBER, question_number: q.n, passage_id: p2.id, question_stem: q.s, choice_a: q.a, choice_b: q.b, choice_c: q.c, choice_d: q.d, correct_answer: q.ans, question_type: q.t, question_category: q.c}, {onConflict: 'test_number,question_number'});
  if (!error) {c2++; console.log(`✅ Q${q.n} → ${q.ans}`);}
}
console.log(`✅ P2 Complete: ${c2}/6\n`);

// P3
const {data: p3, error: e3} = await supabase.from('act_science_passages').upsert({test_number: TEST_NUMBER, passage_number: 3, passage_type: "Research Summaries", title: "Oil Spill Cleanup Sorbents", passage_text: P3_TEXT}, {onConflict: 'test_number,passage_number'}).select().single();
if (e3) {console.error('P3 error:', e3); process.exit(1);}
let c3 = 0;
for (const q of P3_Q) {
  const {error} = await supabase.from('act_science_questions').upsert({test_number: TEST_NUMBER, question_number: q.n, passage_id: p3.id, question_stem: q.s, choice_a: q.a, choice_b: q.b, choice_c: q.c, choice_d: q.d, correct_answer: q.ans, question_type: q.t, question_category: q.c}, {onConflict: 'test_number,question_number'});
  if (!error) {c3++; console.log(`✅ Q${q.n} → ${q.ans}`);}
}
console.log(`✅ P3 Complete: ${c3}/7\n`);

// P4
const {data: p4, error: e4} = await supabase.from('act_science_passages').upsert({test_number: TEST_NUMBER, passage_number: 4, passage_type: "Research Summaries", title: "Acid Solutions: Surface Tension and pH", passage_text: P4_TEXT}, {onConflict: 'test_number,passage_number'}).select().single();
if (e4) {console.error('P4 error:', e4); process.exit(1);}
let c4 = 0;
for (const q of P4_Q) {
  const {error} = await supabase.from('act_science_questions').upsert({test_number: TEST_NUMBER, question_number: q.n, passage_id: p4.id, question_stem: q.s, choice_a: q.a, choice_b: q.b, choice_c: q.c, choice_d: q.d, correct_answer: q.ans, question_type: q.t, question_category: q.c}, {onConflict: 'test_number,question_number'});
  if (!error) {c4++; console.log(`✅ Q${q.n} → ${q.ans}`);}
}
console.log(`✅ P4 Complete: ${c4}/7\n`);

// P5
const {data: p5, error: e5} = await supabase.from('act_science_passages').upsert({test_number: TEST_NUMBER, passage_number: 5, passage_type: "Research Summaries", title: "Structural Beam Deflection", passage_text: P5_TEXT}, {onConflict: 'test_number,passage_number'}).select().single();
if (e5) {console.error('P5 error:', e5); process.exit(1);}
let c5 = 0;
for (const q of P5_Q) {
  const {error} = await supabase.from('act_science_questions').upsert({test_number: TEST_NUMBER, question_number: q.n, passage_id: p5.id, question_stem: q.s, choice_a: q.a, choice_b: q.b, choice_c: q.c, choice_d: q.d, correct_answer: q.ans, question_type: q.t, question_category: q.c}, {onConflict: 'test_number,question_number'});
  if (!error) {c5++; console.log(`✅ Q${q.n} → ${q.ans}`);}
}
console.log(`✅ P5 Complete: ${c5}/7\n`);

// P6
const {data: p6, error: e6} = await supabase.from('act_science_passages').upsert({test_number: TEST_NUMBER, passage_number: 6, passage_type: "Conflicting Viewpoints", title: "Spring Oscillation Student Viewpoints", passage_text: P6_TEXT}, {onConflict: 'test_number,passage_number'}).select().single();
if (e6) {console.error('P6 error:', e6); process.exit(1);}
let c6 = 0;
for (const q of P6_Q) {
  const {error} = await supabase.from('act_science_questions').upsert({test_number: TEST_NUMBER, question_number: q.n, passage_id: p6.id, question_stem: q.s, choice_a: q.a, choice_b: q.b, choice_c: q.c, choice_d: q.d, correct_answer: q.ans, question_type: q.t, question_category: q.c}, {onConflict: 'test_number,question_number'});
  if (!error) {c6++; console.log(`✅ Q${q.n} → ${q.ans}`);}
}
console.log(`✅ P6 Complete: ${c6}/7\n`);

const total = c2 + c3 + c4 + c5 + c6;
console.log(`\n📊 SCIENCE P2-P6 COMPLETE: ${total}/34 questions`);
console.log(`🎉 TOTAL SCIENCE: ${6 + total}/40 questions\n`);
