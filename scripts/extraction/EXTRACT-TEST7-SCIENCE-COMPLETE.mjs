#!/usr/bin/env node
import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { randomUUID } from 'crypto';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '../../.env') });

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

const TEST_NUMBER = 7;

const answerKey = ['C','A','D','B','A','C','D','A','A','B','D','A','C','D','C','B','D','C','A','B','D','A','C','C','B','A','D','C','A','D','C','A','B','D','B','C','A','B','D','D'];

// Create UUIDs for passages
const passage1Id = randomUUID();
const passage2Id = randomUUID();
const passage3Id = randomUUID();
const passage4Id = randomUUID();
const passage5Id = randomUUID();
const passage6Id = randomUUID();

const passages = [
  {
    id: passage1Id,
    test_number: TEST_NUMBER,
    passage_number: 1,
    passage_type: 'RESEARCH_SUMMARY',
    title: 'Amoeba limax Activity Experiments',
    passage_text: `Two experiments examined how pH and temperature affect the activity of Amoeba limax (a single-celled eukaryote).

Experiment 1
Twenty identical glass slides were equally divided into 5 groups (Groups 1–5). Each slide was then prepared as follows: First, a drop of water containing a single 1-day-old A. limax was placed on the slide. Next, the water (but not the A. limax) was removed and replaced with a drop of an aqueous solution having a pH of 8.2. Then, a glass cover slip was placed over the drop, and paraffin (a type of wax) was used to seal the edges of the cover slip.

Each of the Group 1 slides was incubated at a temperature of 0°C. During incubation, the movement of the A. limax on each slide was observed for 30 min, and the total distance traveled (TDT) by the A. limax over the 30 min was recorded. The average TDT for Group 1 was then determined.

The procedure for Group 1 was repeated for each of Groups 2–5, except that each group was kept at a different incubation temperature.

The results are shown in Table 1.

Table 1
Group | Incubation temperature (°C) | Average TDT (mm)
1     | 0                           | 0.4
2     | 5                           | 2.0
3     | 10                          | 3.9
4     | 15                          | 5.6
5     | 20                          | 6.1

Experiment 2
Twenty more of the slides were equally divided into 5 groups (Groups 6–10). Each slide was prepared as in Experiment 1, except that for each group, the aqueous solution had a different pH (see Table 2).

Each of the Group 6 slides was incubated at a temperature of 10°C. During incubation, the movement of the A. limax on each slide was observed for 30 min, and the TDT by the A. limax over the 30 min was recorded. The average TDT for Group 6 was then determined.

The procedure for Group 6 was repeated for each of Groups 7-10.

The results are shown in Table 2.

Table 2
Group | pH  | Average TDT (mm)
6     | 6.6 | 3.9
7     | 7.0 | 6.2
8     | 7.5 | 7.0
9     | 8.7 | 5.0
10    | 9.3 | 3.1`
  },
  {
    id: passage2Id,
    test_number: TEST_NUMBER,
    passage_number: 2,
    passage_type: 'CONFLICTING_VIEWPOINTS',
    title: 'Amino Acid Production on Earth',
    passage_text: `The amino acid molecules necessary for life are thought to have been produced on Earth before organisms were present. Amino acids can be produced through chemical reactions among ammonia (NH₃), methane (CH₄), hydrogen (H₂), and water (H₂O). Four hypotheses have been proposed to describe the conditions that were responsible for the production of amino acids on Earth.

Hypothesis 1
Amino acids were introduced to Earth by meteors containing NH₃, CH₄, H₂, and H₂O. If the reactions among these 4 substances are provided enough energy, amino acids can be produced. As meteors containing these substances entered Earth's atmosphere, the substances were rapidly heated by friction, and this heat resulted in immediate amino acid production on the surface of the meteors.

Hypothesis 2
Hypothesis 1 is correct that meteors brought NH₃, CH₄, H₂, and H₂O to Earth; however, amino acid production did not occur on the meteors. Once a meteor containing these substances entered Earth's atmosphere, the substances were released into the atmosphere. Meteors continued to enter the atmosphere over hundreds of millions of years. The concentration of these substances in the atmosphere eventually became high enough for the reactions that produce amino acids to occur. The energy provided to these reactions was UV light energy from the sun.

Hypothesis 3
Meteors had nothing to do with the production of amino acids. Thermal vents (cracks in the floors of Earth's oceans) allowed magma from Earth's crust to seep into the ocean. The magma caused some of the ocean water to boil. Since ocean water contains dissolved NH₃, CH₄, and H₂, these substances were released into the atmosphere (along with H₂O) upon boiling. Then, UV light from the sun provided the energy for these substances to react to produce amino acids.

Hypothesis 4
Magma from thermal vents did not provide enough energy to cause ocean water to boil; however, the magma did provide enough energy to cause the NH₃, CH₄, and H₂ dissolved in ocean water to react with the ocean water, producing amino acids. These reactions occurred near the thermal vents.`
  },
  {
    id: passage3Id,
    test_number: TEST_NUMBER,
    passage_number: 3,
    passage_type: 'RESEARCH_SUMMARY',
    title: 'Physics Motion Experiments',
    passage_text: `A class of physics students performed 3 experiments on the topic of motion using the apparatus shown in Figure 1.

In each trial, the following occurred: First, the students placed a platform with a ramp at a height Δy above a sandbox. Then, they released either a 10 g solid sphere or a 10 g hollow sphere from a height h above the platform. The sphere rolled down the ramp and through a photogate (a device that emitted 2 beams of light, spaced 1.5 cm apart, and calculated the speed, v, of a sphere passing through both beams). Next, the students started a timer when the sphere rolled off the platform, and they stopped the timer when the sphere landed in the sandbox. They recorded this time interval as the sphere's time of flight, Δt. Last, they measured the horizontal distance traveled by the sphere while it was in flight, Δx.

Experiment 1
In Trials 1-5, the students set Δy to 95 cm and released the solid sphere from various h (measured in cm). They recorded v in centimeters per second (cm/sec), Δt in sec, and Δx in cm (see Table 1).

Table 1
Trial | h (cm) | v (cm/sec) | Δt (sec) | Δx (cm)
1     | 5      | 84         | 0.44     | 37
2     | 15     | 145        | 0.44     | 64
3     | 25     | 187        | 0.44     | 82
4     | 35     | 221        | 0.44     | 98
5     | 45     | 251        | 0.44     | 111

Experiment 2
In Trials 6-10, the students set Δy to 95 cm and released the hollow sphere from various h (see Table 2).

Table 2
Trial | h (cm) | v (cm/sec) | Δt (sec) | Δx (cm)
6     | 5      | 77         | 0.44     | 34
7     | 15     | 133        | 0.44     | 59
8     | 25     | 171        | 0.44     | 76
9     | 35     | 203        | 0.44     | 89
10    | 45     | 230        | 0.44     | 101

Experiment 3
In Trials 11-15, the students set Δy to various values and released the solid sphere from h = 25 cm (see Table 3).

Table 3
Trial | Δy (cm) | v (cm/sec) | Δt (sec) | Δx (cm)
11    | 95      | 187        | 0.44     | 82
12    | 145     | 187        | 0.54     | 102
13    | 195     | 187        | 0.63     | 118
14    | 245     | 187        | 0.71     | 132
15    | 295     | 187        | 0.78     | 145`
  },
  {
    id: passage4Id,
    test_number: TEST_NUMBER,
    passage_number: 4,
    passage_type: 'DATA_REPRESENTATION',
    title: 'Soil Compressive Strength',
    passage_text: `The soil beneath a heavy structure can fail (crack or flow). Adding wires to a soil produces a mixture with a greater compressive strength than that of the soil alone. (Compressive strength is the minimum downward pressure that will cause a material to fail.)

Mixtures of Soil X and 1 mm diameter steel wires were tested for compressive strength. All the wires in a mixture had the same length (1 cm, 2 cm, or 3 cm) and the same angle (90°, 120°, 150°, or 180°, as shown below).

[Diagram of wire angles: 90°, 120°, 150°, 180°]

Figures 1, 2, and 3 show how the compressive strength of the mixtures with 1 cm, 2 cm, and 3 cm wires, respectively, varied with wire angle and with the percent by mass of the wires.

Figure 1: Shows compressive strength (kPa) vs wire angle (°) for 1 cm wires at different percentages by mass (0.5%, 0.75%, 1.0%)
Figure 2: Shows compressive strength (kPa) vs wire angle (°) for 2 cm wires at different percentages by mass (0.5%, 0.75%, 1.0%)
Figure 3: Shows compressive strength (kPa) vs wire angle (°) for 3 cm wires at different percentages by mass (0.5%, 0.75%, 1.0%)`
  },
  {
    id: passage5Id,
    test_number: TEST_NUMBER,
    passage_number: 5,
    passage_type: 'RESEARCH_SUMMARY',
    title: 'Sunscreen UV Light Absorbance',
    passage_text: `Ultraviolet (UV) light is harmful to skin. A sunscreen applied to the skin lessens the skin's exposure to the harmful light, such as through absorption of the light. A sunscreen's sun protection factor (SPF) is a measure of its ability to lessen exposure.

Students did 2 experiments to measure the absorbance of UV light by various solutions at 25°C, each solution containing a single sunscreen. To make their measurements, the students used a spectrophotometer (see diagram).

In each trial of the experiments, Steps 1-4 were performed:
1. A solution having a particular sunscreen concentration was prepared.
2. Four mL of the solution was poured into a clear plastic vial, and the vial was placed in the spectrophotometer.
3. A beam of UV light was directed through the solution.
4. The absorbance was measured as the wavelength of the UV light was varied from 290 nanometers (nm; 1 nm = 10⁻⁹ m) through 400 nm. (Note: UVB light has wavelengths from 290 nm to 320 nm; UVA light has wavelengths from 320 nm to 400 nm.)

Experiment 1
Five sunscreens were tested. Each sunscreen had a different SPF, but the concentration of each sunscreen in solution was the same (0.10 g/L). The results are shown in Figure 1.

Figure 1: Graph showing absorbance vs wavelength (nm) for different SPF values

Experiment 2
Three sunscreens—the SPF 8 sunscreen, the SPF 15 sunscreen, and the SPF 50 sunscreen—were tested, each at 3 different concentrations in solution (0.025 g/L, 0.050 g/L, and 0.20 g/L). Table 1 shows the maximum absorbance by each solution.

Table 1
Maximum absorbance at a sunscreen concentration of:
SPF | 0.025 g/L | 0.050 g/L | 0.20 g/L
8   | 0.20      | 0.28      | 1.17
15  | 0.22      | 0.46      | 1.74
50  | 0.31      | 0.55      | 2.25`
  },
  {
    id: passage6Id,
    test_number: TEST_NUMBER,
    passage_number: 6,
    passage_type: 'DATA_REPRESENTATION',
    title: 'Gas Exchange in the Human Body',
    passage_text: `In the human body, O₂ and CO₂ are exchanged between the lungs and the blood and between the blood and the tissues as indicated in Figure 1. These exchanges occur by the diffusion of each gas from a region where its partial pressure (the pressure contributed by a single gas) is higher to a region where its partial pressure is lower. The figure gives the partial pressures Po₂ and Pco₂ in the lung alveoli (sacs), in the tissue cells, and in the blood of a healthy resting person at sea level.

Figure 1:
Atmosphere: Po₂ = 152 mm Hg, Pco₂ = 0.3 mm Hg
Lung alveoli: Po₂ = 104 mm Hg, Pco₂ = 40 mm Hg
Lung capillaries (leaving): Po₂ = 100 mm Hg, Pco₂ = 40 mm Hg
Right side of heart: Po₂ = 40 mm Hg, Pco₂ = 46 mm Hg
Left side of heart: Po₂ = 100 mm Hg, Pco₂ = 40 mm Hg
Tissue capillaries: Po₂ = 40 mm Hg, Pco₂ = 46 mm Hg
Tissue cells: Po₂ < 40 mm Hg, Pco₂ > 46 mm Hg

Figure 2 shows how alveolar Po₂ and Pco₂ vary with alveolar ventilation (volume of air per unit time available to the alveoli for gas exchange).

Figure 2: Graph showing alveolar Po₂ and Pco₂ (mm Hg) vs alveolar ventilation (L/min)`
  }
];

const questions = [
  // Passage 1 (Q1-7)
  {
    number: 1,
    passage_id: passage1Id,
    stem: "According to the results of Experiment 1, as the incubation temperature increased, the average TDT:",
    choices: {
      A: "increased only.",
      B: "decreased only.",
      C: "increased, then decreased.",
      D: "decreased, then increased."
    }
  },
  {
    number: 2,
    passage_id: passage1Id,
    stem: 'Consider the claim "On average, the activity of A. limax always increases with increasing pH." Are the results of Experiment 2 from pH 6.6 through pH 9.3 consistent with this claim?',
    choices: {
      A: "Yes; as the pH increased from 6.6 through 9.3, the average TDT increased only.",
      B: "Yes; as the pH increased from 6.6 through 9.3, the average TDT decreased only.",
      C: "No; as the pH increased from 6.6 through 9.3, the average TDT initially increased and then decreased.",
      D: "No; as the pH increased from 6.6 through 9.3, the average TDT initially decreased and then increased."
    }
  },
  {
    number: 3,
    passage_id: passage1Id,
    stem: "In Experiments 1 and 2 combined, for how many of Groups 1-10 was the average TDT less than 1 centimeter?",
    choices: {
      A: "0",
      B: "2",
      C: "5",
      D: "10"
    }
  },
  {
    number: 4,
    passage_id: passage1Id,
    stem: "In Experiments 1 and 2 combined, the incubation temperature was either at or below the freezing point of water for how many of the groups tested, if any?",
    choices: {
      A: "0",
      B: "1",
      C: "2",
      D: "4"
    }
  },
  {
    number: 5,
    passage_id: passage1Id,
    stem: "Assume that for A. limax, the greater the activity level, the greater the frequency of cell division. Under the conditions of Experiment 1, an A. limax would most likely undergo the fewest cell divisions at which of the incubation temperatures tested?",
    choices: {
      A: "0°C",
      B: "5°C",
      C: "15°C",
      D: "20°C"
    }
  },
  {
    number: 6,
    passage_id: passage1Id,
    stem: "Which, if either, of the paraffin and the cover slip likely functioned to slow the rate of evaporation from each slide?",
    choices: {
      A: "The paraffin only",
      B: "The cover slip only",
      C: "Both the paraffin and the cover slip",
      D: "Neither the paraffin nor the cover slip"
    }
  },
  {
    number: 7,
    passage_id: passage1Id,
    stem: "Was the solution placed on the Group 10 slides acidic or basic?",
    choices: {
      A: "Acidic, because its pH was less than 7.",
      B: "Acidic, because its pH was greater than 7.",
      C: "Basic, because its pH was less than 7.",
      D: "Basic, because its pH was greater than 7."
    }
  },
  // Passage 2 (Q8-14)
  {
    number: 8,
    passage_id: passage2Id,
    stem: "Suppose that a scientist determined that UV light does not provide enough energy to cause any chemical reactions to occur. This finding would weaken which hypotheses?",
    choices: {
      A: "Hypotheses 1 and 2 only",
      B: "Hypotheses 1 and 4 only",
      C: "Hypotheses 2 and 3 only",
      D: "Hypotheses 1, 2, and 3 only"
    }
  },
  {
    number: 9,
    passage_id: passage2Id,
    stem: "Hypothesis 3 and Hypothesis 4 agree on which of the aspects of amino acid production listed below?\nI. The source of the substances needed for amino acid production\nII. The location of amino acid production\nIII. The source of the energy needed for amino acid production",
    choices: {
      A: "I only",
      B: "II only",
      C: "I and II only",
      D: "I, II, and III"
    }
  },
  {
    number: 10,
    passage_id: passage2Id,
    stem: "Which of Hypotheses 1 and 2, if either, state(s) or suggest(s) that amino acid production occurred on the surface of a meteor?",
    choices: {
      A: "Hypothesis 1 only",
      B: "Hypothesis 2 only",
      C: "Both Hypothesis 1 and Hypothesis 2",
      D: "Neither Hypothesis 1 nor Hypothesis 2"
    }
  },
  {
    number: 11,
    passage_id: passage2Id,
    stem: "Which hypothesis suggests that the reactions among the 4 substances that form amino acids occurred in an aqueous solution?",
    choices: {
      A: "Hypothesis 1",
      B: "Hypothesis 2",
      C: "Hypothesis 3",
      D: "Hypothesis 4"
    }
  },
  {
    number: 12,
    passage_id: passage2Id,
    stem: "The chemical formula for the amino acid glycine is C₂H₅O₂N. Based on the information in the passage, how many molecules of methane would be needed to provide the correct number of carbon atoms in 1 molecule of glycine?",
    choices: {
      A: "2",
      B: "3",
      C: "4",
      D: "5"
    }
  },
  {
    number: 13,
    passage_id: passage2Id,
    stem: "The diagram below best illustrates which hypothesis? (Diagram shows thermal vent in ocean floor)",
    choices: {
      A: "Hypothesis 1",
      B: "Hypothesis 2",
      C: "Hypothesis 3",
      D: "Hypothesis 4"
    }
  },
  {
    number: 14,
    passage_id: passage2Id,
    stem: "Which hypotheses, if any, claim that amino acid production occurred within thermal vents?",
    choices: {
      A: "Hypotheses 1 and 2 only",
      B: "Hypotheses 2 and 3 only",
      C: "Hypotheses 3 and 4 only",
      D: "None of the hypotheses"
    }
  },
  // Passage 3 (Q15-21)
  {
    number: 15,
    passage_id: passage3Id,
    stem: "Based on the results of Experiment 1, as h increased, did v decrease or increase?",
    choices: {
      A: "Decrease, because the farther a sphere rolls down a ramp, the slower the sphere will be moving at the bottom of the ramp.",
      B: "Decrease, because the farther a sphere rolls down a ramp, the faster the sphere will be moving at the bottom of the ramp.",
      C: "Increase, because the farther a sphere rolls down a ramp, the slower the sphere will be moving at the bottom of the ramp.",
      D: "Increase, because the farther a sphere rolls down a ramp, the faster the sphere will be moving at the bottom of the ramp."
    }
  },
  {
    number: 16,
    passage_id: passage3Id,
    stem: "Based on Figure 1, in any trial, Δy was:",
    choices: {
      A: "half the total vertical distance traveled by the sphere.",
      B: "the total vertical distance traveled by the sphere.",
      C: "half the vertical distance between the top of the ramp and the top of the sandbox.",
      D: "the vertical distance between the top of the platform and the top of the sandbox."
    }
  },
  {
    number: 17,
    passage_id: passage3Id,
    stem: "A controlled variable is a variable that is held at a constant value throughout an experiment. In which of the experiments, if any, was Δy a controlled variable?",
    choices: {
      A: "Experiment 1 only",
      B: "Experiment 3 only",
      C: "Experiments 1 and 2 only",
      D: "None of the experiments"
    }
  },
  {
    number: 18,
    passage_id: passage3Id,
    stem: "Based on the results of Experiment 2, which of the following values of v and Δx, respectively, would most likely have been measured for the hollow sphere if it had been released from h = 10 cm?",
    choices: {
      A: "v = 105 cm/sec, Δx = 47 cm",
      B: "v = 105 cm/sec, Δx = 68 cm",
      C: "v = 152 cm/sec, Δx = 47 cm",
      D: "v = 152 cm/sec, Δx = 68 cm"
    }
  },
  {
    number: 19,
    passage_id: passage3Id,
    stem: "Consider a landing point to be a point in the sandbox where a sphere landed. Based on the values of Δx in Trials 1-15, at the conclusion of the experiments, what was the greatest distance between 2 landing points in the sandbox? (Note: The sandbox was not moved throughout the experiments.)",
    choices: {
      A: "34 cm",
      B: "111 cm",
      C: "179 cm",
      D: "290 cm"
    }
  },
  {
    number: 20,
    passage_id: passage3Id,
    stem: "Consider the value of v for the hollow sphere in Trial 9. An object moving in a straight horizontal line with this speed would travel approximately what distance during a 2 sec period?",
    choices: {
      A: "0.4 cm",
      B: "4 cm",
      C: "40 cm",
      D: "400 cm"
    }
  },
  {
    number: 21,
    passage_id: passage3Id,
    stem: "Suppose that in Trial 13 the speed v had been 171 cm/sec. Based on the results of Experiments 2 and 3, which of the following errors could have accounted for this result?",
    choices: {
      A: "The hollow sphere was accidentally tested instead of the solid sphere.",
      B: "The solid sphere was accidentally tested instead of the hollow sphere.",
      C: "The height h was accidentally set to 195 cm instead of 25 cm.",
      D: "The height Δy was accidentally set to 25 cm instead of 195 cm."
    }
  },
  // Passage 4 (Q22-27)
  {
    number: 22,
    passage_id: passage4Id,
    stem: "In Figures 1-3, consider the compressive strengths of the mixtures containing 0.75 percent by mass of wires. For which of the wire lengths was the compressive strength greater for a wire angle of 120° than it was for a wire angle of 90°?",
    choices: {
      A: "3 cm only",
      B: "1 cm and 2 cm only",
      C: "1 cm and 3 cm only",
      D: "1 cm, 2 cm, and 3 cm"
    }
  },
  {
    number: 23,
    passage_id: passage4Id,
    stem: "According to Figures 1-3, for mixtures containing 1.0 percent by mass of wires bent at an angle of 90°, as wire length increased, the compressive strength:",
    choices: {
      A: "increased only.",
      B: "decreased only.",
      C: "increased, then decreased.",
      D: "decreased, then increased."
    }
  },
  {
    number: 24,
    passage_id: passage4Id,
    stem: "According to Figures 1-3, the greatest compressive strength was recorded for the mixture with which wire length, wire angle, and percent by mass of wires?",
    choices: {
      A: "length = 1 cm, angle = 90°, percent by mass = 0.5%",
      B: "length = 2 cm, angle = 90°, percent by mass = 1.0%",
      C: "length = 2 cm, angle = 120°, percent by mass = 0.75%",
      D: "length = 3 cm, angle = 120°, percent by mass = 1.0%"
    }
  },
  {
    number: 25,
    passage_id: passage4Id,
    stem: "In Figure 1, consider the compressive strength of the mixture containing 0.75 percent by mass of 1 cm wires with an angle of 180°. Would a downward pressure of 160 kPa cause this mixture to fail?",
    choices: {
      A: "No; that pressure would be less than the compressive strength of the mixture.",
      B: "No; that pressure would be greater than the compressive strength of the mixture.",
      C: "Yes; that pressure would be less than the compressive strength of the mixture.",
      D: "Yes; that pressure would be greater than the compressive strength of the mixture."
    }
  },
  {
    number: 26,
    passage_id: passage4Id,
    stem: "According to Figure 3, increasing the percent by mass of 3 cm wires resulted in the least variation in compressive strength for which wire angle?",
    choices: {
      A: "90°",
      B: "120°",
      C: "150°",
      D: "180°"
    }
  },
  {
    number: 27,
    passage_id: passage4Id,
    stem: "Based on the information provided, the compressive strength of Soil X alone was most likely:",
    choices: {
      A: "less than 129 kPa.",
      B: "between 129 kPa and 139 kPa.",
      C: "between 139 kPa and 149 kPa.",
      D: "greater than 149 kPa."
    }
  },
  // Passage 5 (Q28-33)
  {
    number: 28,
    passage_id: passage5Id,
    stem: "According to the results of Experiment 1, the maximum absorbance by each of the sunscreen solutions was obtained at a wavelength closest to which of the following?",
    choices: {
      A: "300 nm",
      B: "310 nm",
      C: "320 nm",
      D: "330 nm"
    }
  },
  {
    number: 29,
    passage_id: passage5Id,
    stem: "In Experiment 2, at a given sunscreen concentration, as SPF increased, the maximum absorbance:",
    choices: {
      A: "decreased only.",
      B: "increased only.",
      C: "decreased, then increased.",
      D: "increased, then decreased."
    }
  },
  {
    number: 30,
    passage_id: passage5Id,
    stem: "In Experiment 1, which type of UV light was more effectively absorbed by each sunscreen solution?",
    choices: {
      A: "UVA; the absorbance of light between 290 nm and 320 nm was greater than the absorbance of light between 320 nm and 400 nm.",
      B: "UVA; the absorbance of light between 320 nm and 400 nm was greater than the absorbance of light between 290 nm and 320 nm.",
      C: "UVB; the absorbance of light between 290 nm and 320 nm was greater than the absorbance of light between 320 nm and 400 nm.",
      D: "UVB; the absorbance of light between 320 nm and 400 nm was greater than the absorbance of light between 290 nm and 320 nm."
    }
  },
  {
    number: 31,
    passage_id: passage5Id,
    stem: "Which of the following conditions differed between Experiments 1 and 2?",
    choices: {
      A: "Temperature of solution",
      B: "Concentration of sunscreen in solution",
      C: "Volume of solution in vial",
      D: "Wavelengths of light passed through solution"
    }
  },
  {
    number: 32,
    passage_id: passage5Id,
    stem: "Suppose that a sunscreen with an SPF of 20 had been tested in Experiment 1. The maximum absorbance by the solution of this sunscreen would most likely have been closest to which of the following?",
    choices: {
      A: "0.50",
      B: "0.75",
      C: "1.00",
      D: "1.25"
    }
  },
  {
    number: 33,
    passage_id: passage5Id,
    stem: "PABA is a common sunscreen ingredient that has its maximum absorbance in the UVB light range. Which of the following wavelengths is a possible wavelength at which PABA has its maximum absorbance?",
    choices: {
      A: "306 nm",
      B: "321 nm",
      C: "343 nm",
      D: "368 nm"
    }
  },
  {
    number: 34,
    passage_id: passage5Id,
    stem: "Assume that in Step 4, absorbance measurements were made in 5 nm increments. Based on this information, each sunscreen solution was exposed to how many different wavelengths of UV light?",
    choices: {
      A: "5",
      B: "8",
      C: "14",
      D: "23"
    }
  },
  // Passage 6 (Q35-40)
  {
    number: 35,
    passage_id: passage6Id,
    stem: "According to Figure 1, for a healthy resting person at sea level, as blood passes through the left side of the heart, which is greater, the Po₂ or the Pco₂?",
    choices: {
      A: "The Po₂; its value is 100 mm Hg through the left side of the heart.",
      B: "The Po₂; its value is 40 mm Hg through the left side of the heart.",
      C: "The Pco₂; its value is 100 mm Hg through the left side of the heart.",
      D: "The Pco₂; its value is 46 mm Hg through the left side of the heart."
    }
  },
  {
    number: 36,
    passage_id: passage6Id,
    stem: "The Pco₂ in the lung capillaries that enter the lung alveoli differs from the Pco₂ in the lung capillaries that leave the lung alveoli. Based on Figure 1, for a healthy resting person at sea level, what is the range of the Pco₂ in the lung capillaries?",
    choices: {
      A: "From 0.3 mm Hg to 40 mm Hg",
      B: "From 40 mm Hg to 46 mm Hg",
      C: "From 46 mm Hg to 100 mm Hg",
      D: "From 100 mm Hg to 152 mm Hg"
    }
  },
  {
    number: 37,
    passage_id: passage6Id,
    stem: "Based on Figure 2, if a person's alveolar ventilation decreases from a value of 6.3 L/min, how do the person's alveolar Po₂ and alveolar Pco₂, respectively, change?",
    choices: {
      A: "Po₂ decreases, Pco₂ increases",
      B: "Po₂ increases, Pco₂ decreases",
      C: "Po₂ decreases, Pco₂ decreases",
      D: "Po₂ increases, Pco₂ increases"
    }
  },
  {
    number: 38,
    passage_id: passage6Id,
    stem: "Based on Figure 1, for a healthy resting person at sea level, does O₂ in the air that enters the lung alveoli diffuse into the lung capillaries?",
    choices: {
      A: "Yes, because the Po₂ in the lung alveoli is greater than the Po₂ in the lung capillaries.",
      B: "Yes, because the Po₂ in the lung capillaries is greater than the Po₂ in the lung alveoli.",
      C: "No, because the Po₂ in the lung alveoli is greater than the Po₂ in the lung capillaries.",
      D: "No, because the Po₂ in the lung capillaries is greater than the Po₂ in the lung alveoli."
    }
  },
  {
    number: 39,
    passage_id: passage6Id,
    stem: "Consider the values of Po₂ and Pco₂ that are given in Figure 1 for the lung alveoli. According to Figure 2, to maintain those values, alveolar ventilation must be closest to which of the following?",
    choices: {
      A: "2.1 L/min",
      B: "4.2 L/min",
      C: "6.3 L/min",
      D: "8.4 L/min"
    }
  },
  {
    number: 40,
    passage_id: passage6Id,
    stem: "Consider the combinations of Pco₂ values for tissue cells and tissue capillaries listed in the table below. For how many of the combinations would CO₂ diffuse from the tissue cells into the tissue capillaries?\n\nPco₂ in tissue cells | Pco₂ in tissue capillaries\n52 mm Hg | 50 mm Hg\n52 mm Hg | 60 mm Hg\n46 mm Hg | 50 mm Hg\n46 mm Hg | 60 mm Hg",
    choices: {
      A: "1",
      B: "2",
      C: "3",
      D: "4"
    }
  }
];

console.log('Inserting Test 7 Science passages...');

for (const p of passages) {
  const { error } = await supabase.from('act_science_passages').insert([p]);
  if (error) {
    console.error(`Error inserting Passage ${p.passage_number}:`, error);
  } else {
    console.log(`✓ Passage ${p.passage_number} inserted`);
  }
}

console.log('\nInserting Test 7 Science questions...');

for (const q of questions) {
  const insertData = {
    test_number: TEST_NUMBER,
    question_number: q.number,
    passage_id: q.passage_id,
    question_stem: q.stem,
    choice_a: q.choices.A,
    choice_b: q.choices.B,
    choice_c: q.choices.C,
    choice_d: q.choices.D,
    correct_answer: answerKey[q.number - 1],
    question_type: 'data-interpretation',
    question_category: 'IOD',
    lesson_id: null
  };

  const { error } = await supabase.from('act_science_questions').insert([insertData]);
  if (error) {
    console.error(`Error inserting Q${q.number}:`, error);
  } else {
    console.log(`✓ Q${q.number} inserted`);
  }
}

console.log('\nDone! Extracted:', questions.length, 'questions out of 40 total');
console.log('Passages extracted:', passages.length, 'out of 6 total');
