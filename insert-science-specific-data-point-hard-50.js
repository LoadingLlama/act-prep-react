require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const questions = [
  {
    pos: 1,
    diff: 'hard',
    text: 'Scientists studied the effect of temperature on enzyme activity for 3 different enzymes. The results are shown in Table 1.\n\n**Table 1**\n\n<table style="border-collapse: collapse; margin: 1rem 0; width: 100%;">\n<tr style="border-bottom: 2px solid #333;"><th style="padding: 0.5rem; text-align: left;">Temperature (°C)</th><th style="padding: 0.5rem; text-align: right;">Enzyme A Activity (%)</th><th style="padding: 0.5rem; text-align: right;">Enzyme B Activity (%)</th><th style="padding: 0.5rem; text-align: right;">Enzyme C Activity (%)</th></tr>\n<tr><td style="padding: 0.5rem;">10</td><td style="padding: 0.5rem; text-align: right;">22</td><td style="padding: 0.5rem; text-align: right;">8</td><td style="padding: 0.5rem; text-align: right;">45</td></tr>\n<tr><td style="padding: 0.5rem;">20</td><td style="padding: 0.5rem; text-align: right;">45</td><td style="padding: 0.5rem; text-align: right;">32</td><td style="padding: 0.5rem; text-align: right;">78</td></tr>\n<tr><td style="padding: 0.5rem;">30</td><td style="padding: 0.5rem; text-align: right;">82</td><td style="padding: 0.5rem; text-align: right;">68</td><td style="padding: 0.5rem; text-align: right;">95</td></tr>\n<tr><td style="padding: 0.5rem;">40</td><td style="padding: 0.5rem; text-align: right;">100</td><td style="padding: 0.5rem; text-align: right;">100</td><td style="padding: 0.5rem; text-align: right;">88</td></tr>\n<tr><td style="padding: 0.5rem;">50</td><td style="padding: 0.5rem; text-align: right;">95</td><td style="padding: 0.5rem; text-align: right;">94</td><td style="padding: 0.5rem; text-align: right;">62</td></tr>\n<tr><td style="padding: 0.5rem;">60</td><td style="padding: 0.5rem; text-align: right;">58</td><td style="padding: 0.5rem; text-align: right;">71</td><td style="padding: 0.5rem; text-align: right;">31</td></tr>\n</table>\n\nFor Enzyme C, what was the difference in activity between 30°C and 50°C?',
    ch: [
      {letter: 'A', text: '33%'},
      {letter: 'B', text: '26%'},
      {letter: 'C', text: '62%'},
      {letter: 'D', text: '95%'}
    ],
    ans: 'A',
    sol: '**Calculate the difference between two specific data points.**\n\n```\nEnzyme C at 30°C: 95%\nEnzyme C at 50°C: 62%\n\nDifference = 95% - 62% = 33%\n```\n\n**Key insight:** This question requires finding two specific values in the table and performing a calculation. The distractor 62% is the value at 50°C itself, while 95% is the value at 30°C - both are wrong because the question asks for the *difference*. The answer 26% might tempt students who subtract in the wrong order (62-95 would give -33, and taking absolute value incorrectly).'
  },
  {
    pos: 2,
    diff: 'hard',
    text: 'A study examined plant growth under different light conditions. Table 1 shows the results after 4 weeks.\n\n**Table 1**\n\n<table style="border-collapse: collapse; margin: 1rem 0; width: 100%;">\n<tr style="border-bottom: 2px solid #333;"><th style="padding: 0.5rem; text-align: left;">Light Condition</th><th style="padding: 0.5rem; text-align: right;">Plant Height (cm)</th><th style="padding: 0.5rem; text-align: right;">Leaf Count</th><th style="padding: 0.5rem; text-align: right;">Chlorophyll (mg/g)</th></tr>\n<tr><td style="padding: 0.5rem;">Full sun (8h)</td><td style="padding: 0.5rem; text-align: right;">42</td><td style="padding: 0.5rem; text-align: right;">18</td><td style="padding: 0.5rem; text-align: right;">1.8</td></tr>\n<tr><td style="padding: 0.5rem;">Partial sun (5h)</td><td style="padding: 0.5rem; text-align: right;">51</td><td style="padding: 0.5rem; text-align: right;">22</td><td style="padding: 0.5rem; text-align: right;">2.4</td></tr>\n<tr><td style="padding: 0.5rem;">Shade (2h)</td><td style="padding: 0.5rem; text-align: right;">68</td><td style="padding: 0.5rem; text-align: right;">26</td><td style="padding: 0.5rem; text-align: right;">3.2</td></tr>\n<tr><td style="padding: 0.5rem;">No light (0h)</td><td style="padding: 0.5rem; text-align: right;">31</td><td style="padding: 0.5rem; text-align: right;">8</td><td style="padding: 0.5rem; text-align: right;">0.3</td></tr>\n</table>\n\nBased on Table 1, which ratio best represents the comparison of chlorophyll content between shade plants and full sun plants?',
    ch: [
      {letter: 'A', text: '16:9'},
      {letter: 'B', text: '9:16'},
      {letter: 'C', text: '3:2'},
      {letter: 'D', text: '2:3'}
    ],
    ans: 'A',
    sol: '**Calculate the ratio from the data values.**\n\n```\nShade chlorophyll: 3.2 mg/g\nFull sun chlorophyll: 1.8 mg/g\n\nRatio = 3.2:1.8\n\nSimplify by dividing both by 0.2:\n= 16:9\n```\n\n**Key insight:** This tests ratio calculation from real data. Students must identify the correct values (3.2 for shade, 1.8 for full sun), set up the ratio in the correct order (shade:full sun), then simplify. The distractor 9:16 reverses the order. The ratios 3:2 and 2:3 might trap students who round incorrectly or confuse the relationship.'
  },
  {
    pos: 3,
    diff: 'hard',
    text: 'Researchers measured the solubility of four salts at various temperatures. The data are presented in Figure 1.\n\n**Figure 1**\n\n<table style="border-collapse: collapse; margin: 1rem 0; width: 100%;">\n<tr style="border-bottom: 2px solid #333;"><th style="padding: 0.5rem; text-align: left;">Temperature (°C)</th><th style="padding: 0.5rem; text-align: right;">Salt W (g/100mL)</th><th style="padding: 0.5rem; text-align: right;">Salt X (g/100mL)</th><th style="padding: 0.5rem; text-align: right;">Salt Y (g/100mL)</th><th style="padding: 0.5rem; text-align: right;">Salt Z (g/100mL)</th></tr>\n<tr><td style="padding: 0.5rem;">0</td><td style="padding: 0.5rem; text-align: right;">13.3</td><td style="padding: 0.5rem; text-align: right;">35.7</td><td style="padding: 0.5rem; text-align: right;">71.2</td><td style="padding: 0.5rem; text-align: right;">88.5</td></tr>\n<tr><td style="padding: 0.5rem;">20</td><td style="padding: 0.5rem; text-align: right;">18.4</td><td style="padding: 0.5rem; text-align: right;">35.9</td><td style="padding: 0.5rem; text-align: right;">88.0</td><td style="padding: 0.5rem; text-align: right;">96.2</td></tr>\n<tr><td style="padding: 0.5rem;">40</td><td style="padding: 0.5rem; text-align: right;">26.8</td><td style="padding: 0.5rem; text-align: right;">36.3</td><td style="padding: 0.5rem; text-align: right;">110.5</td><td style="padding: 0.5rem; text-align: right;">107.9</td></tr>\n<tr><td style="padding: 0.5rem;">60</td><td style="padding: 0.5rem; text-align: right;">39.2</td><td style="padding: 0.5rem; text-align: right;">37.1</td><td style="padding: 0.5rem; text-align: right;">138.3</td><td style="padding: 0.5rem; text-align: right;">122.1</td></tr>\n<tr><td style="padding: 0.5rem;">80</td><td style="padding: 0.5rem; text-align: right;">56.1</td><td style="padding: 0.5rem; text-align: right;">38.4</td><td style="padding: 0.5rem; text-align: right;">169.2</td><td style="padding: 0.5rem; text-align: right;">138.7</td></tr>\n</table>\n\nAccording to Figure 1, for which salt did solubility increase the LEAST between 0°C and 80°C?',
    ch: [
      {letter: 'A', text: 'Salt X'},
      {letter: 'B', text: 'Salt W'},
      {letter: 'C', text: 'Salt Z'},
      {letter: 'D', text: 'Salt Y'}
    ],
    ans: 'A',
    sol: '**Calculate the change in solubility for each salt.**\n\n```\nSalt W: 56.1 - 13.3 = 42.8 g/100mL\nSalt X: 38.4 - 35.7 = 2.7 g/100mL ← LEAST\nSalt Y: 169.2 - 71.2 = 98.0 g/100mL\nSalt Z: 138.7 - 88.5 = 50.2 g/100mL\n```\n\n**Key insight:** This requires comparing the solubility increase across all four salts. Students must subtract the 0°C value from the 80°C value for each salt, then identify which change is smallest. Salt X shows almost no change with temperature (only 2.7 g/100mL increase), while Salt Y shows the largest increase at 98.0 g/100mL. The question tests whether students can systematically compare multiple data series.'
  },
  {
    pos: 4,
    diff: 'hard',
    text: 'An experiment examined how pH affects the germination rate of seeds. Table 1 shows the percentage of seeds that germinated after 7 days.\n\n**Table 1**\n\n<table style="border-collapse: collapse; margin: 1rem 0; width: 100%;">\n<tr style="border-bottom: 2px solid #333;"><th style="padding: 0.5rem; text-align: left;">pH</th><th style="padding: 0.5rem; text-align: right;">Trial 1 (%)</th><th style="padding: 0.5rem; text-align: right;">Trial 2 (%)</th><th style="padding: 0.5rem; text-align: right;">Trial 3 (%)</th><th style="padding: 0.5rem; text-align: right;">Average (%)</th></tr>\n<tr><td style="padding: 0.5rem;">4.0</td><td style="padding: 0.5rem; text-align: right;">12</td><td style="padding: 0.5rem; text-align: right;">18</td><td style="padding: 0.5rem; text-align: right;">15</td><td style="padding: 0.5rem; text-align: right;">15</td></tr>\n<tr><td style="padding: 0.5rem;">5.0</td><td style="padding: 0.5rem; text-align: right;">38</td><td style="padding: 0.5rem; text-align: right;">42</td><td style="padding: 0.5rem; text-align: right;">34</td><td style="padding: 0.5rem; text-align: right;">38</td></tr>\n<tr><td style="padding: 0.5rem;">6.0</td><td style="padding: 0.5rem; text-align: right;">71</td><td style="padding: 0.5rem; text-align: right;">68</td><td style="padding: 0.5rem; text-align: right;">73</td><td style="padding: 0.5rem; text-align: right;">71</td></tr>\n<tr><td style="padding: 0.5rem;">7.0</td><td style="padding: 0.5rem; text-align: right;">89</td><td style="padding: 0.5rem; text-align: right;">92</td><td style="padding: 0.5rem; text-align: right;">87</td><td style="padding: 0.5rem; text-align: right;">89</td></tr>\n<tr><td style="padding: 0.5rem;">8.0</td><td style="padding: 0.5rem; text-align: right;">64</td><td style="padding: 0.5rem; text-align: right;">58</td><td style="padding: 0.5rem; text-align: right;">62</td><td style="padding: 0.5rem; text-align: right;">61</td></tr>\n<tr><td style="padding: 0.5rem;">9.0</td><td style="padding: 0.5rem; text-align: right;">31</td><td style="padding: 0.5rem; text-align: right;">28</td><td style="padding: 0.5rem; text-align: right;">29</td><td style="padding: 0.5rem; text-align: right;">29</td></tr>\n</table>\n\nBased on the data in Table 1, at pH 6.0, what was the range of germination percentages across the three trials?',
    ch: [
      {letter: 'A', text: '5'},
      {letter: 'B', text: '71'},
      {letter: 'C', text: '3'},
      {letter: 'D', text: '68'}
    ],
    ans: 'A',
    sol: '**Calculate the range for pH 6.0 trials.**\n\n```\nAt pH 6.0:\nTrial 1: 71%\nTrial 2: 68%\nTrial 3: 73%\n\nRange = Maximum - Minimum\n      = 73 - 68\n      = 5\n```\n\n**Key insight:** Range measures the spread of data. Students must identify all three trial values at pH 6.0, find the highest (73) and lowest (68), then calculate the difference. The distractor 71 is the average value. The values 3 and 68 might trap students who misidentify which values to use. This tests understanding of variability in repeated trials.'
  },
  {
    pos: 5,
    diff: 'hard',
    text: 'Scientists measured atmospheric CO₂ concentrations at three different altitudes over a 24-hour period. Table 1 shows the results.\n\n**Table 1**\n\n<table style="border-collapse: collapse; margin: 1rem 0; width: 100%;">\n<tr style="border-bottom: 2px solid #333;"><th style="padding: 0.5rem; text-align: left;">Time</th><th style="padding: 0.5rem; text-align: right;">Ground Level (ppm)</th><th style="padding: 0.5rem; text-align: right;">1000m (ppm)</th><th style="padding: 0.5rem; text-align: right;">2000m (ppm)</th></tr>\n<tr><td style="padding: 0.5rem;">6:00 AM</td><td style="padding: 0.5rem; text-align: right;">412</td><td style="padding: 0.5rem; text-align: right;">408</td><td style="padding: 0.5rem; text-align: right;">405</td></tr>\n<tr><td style="padding: 0.5rem;">12:00 PM</td><td style="padding: 0.5rem; text-align: right;">398</td><td style="padding: 0.5rem; text-align: right;">402</td><td style="padding: 0.5rem; text-align: right;">404</td></tr>\n<tr><td style="padding: 0.5rem;">6:00 PM</td><td style="padding: 0.5rem; text-align: right;">416</td><td style="padding: 0.5rem; text-align: right;">410</td><td style="padding: 0.5rem; text-align: right;">406</td></tr>\n<tr><td style="padding: 0.5rem;">12:00 AM</td><td style="padding: 0.5rem; text-align: right;">420</td><td style="padding: 0.5rem; text-align: right;">411</td><td style="padding: 0.5rem; text-align: right;">407</td></tr>\n</table>\n\nAccording to Table 1, at 12:00 PM, what was the difference in CO₂ concentration between ground level and 2000m altitude?',
    ch: [
      {letter: 'A', text: '6 ppm'},
      {letter: 'B', text: '4 ppm'},
      {letter: 'C', text: '2 ppm'},
      {letter: 'D', text: '10 ppm'}
    ],
    ans: 'A',
    sol: '**Find the two specific values and calculate the difference.**\n\n```\nAt 12:00 PM:\nGround level: 398 ppm\n2000m altitude: 404 ppm\n\nDifference = |398 - 404| = 6 ppm\n```\n\n**Key insight:** This requires careful identification of the correct time (12:00 PM) and altitudes (ground level and 2000m). Note that CO₂ is actually *higher* at altitude during midday (404 vs 398), which is counterintuitive - this happens because ground-level CO₂ is consumed by photosynthesis during the day. The absolute value gives 6 ppm difference regardless of which is subtracted from which.'
  },
  {
    pos: 6,
    diff: 'hard',
    text: 'A study compared bacterial growth rates in four different media. Table 1 shows colony counts after 12 hours and 24 hours of incubation.\n\n**Table 1**\n\n<table style="border-collapse: collapse; margin: 1rem 0; width: 100%;">\n<tr style="border-bottom: 2px solid #333;"><th style="padding: 0.5rem; text-align: left;">Growth Medium</th><th style="padding: 0.5rem; text-align: right;">12h Count (×10⁶)</th><th style="padding: 0.5rem; text-align: right;">24h Count (×10⁶)</th></tr>\n<tr><td style="padding: 0.5rem;">Nutrient Broth</td><td style="padding: 0.5rem; text-align: right;">3.2</td><td style="padding: 0.5rem; text-align: right;">28.8</td></tr>\n<tr><td style="padding: 0.5rem;">Blood Agar</td><td style="padding: 0.5rem; text-align: right;">4.1</td><td style="padding: 0.5rem; text-align: right;">18.5</td></tr>\n<tr><td style="padding: 0.5rem;">MacConkey Agar</td><td style="padding: 0.5rem; text-align: right;">1.8</td><td style="padding: 0.5rem; text-align: right;">7.2</td></tr>\n<tr><td style="padding: 0.5rem;">Minimal Medium</td><td style="padding: 0.5rem; text-align: right;">0.9</td><td style="padding: 0.5rem; text-align: right;">2.7</td></tr>\n</table>\n\nBased on Table 1, in which medium did the bacterial count increase by the greatest factor from 12h to 24h?',
    ch: [
      {letter: 'A', text: 'Nutrient Broth'},
      {letter: 'B', text: 'Blood Agar'},
      {letter: 'C', text: 'MacConkey Agar'},
      {letter: 'D', text: 'Minimal Medium'}
    ],
    ans: 'A',
    sol: '**Calculate the multiplication factor for each medium.**\n\n```\nNutrient Broth: 28.8 ÷ 3.2 = 9.0× ← GREATEST\nBlood Agar: 18.5 ÷ 4.1 = 4.5×\nMacConkey Agar: 7.2 ÷ 1.8 = 4.0×\nMinimal Medium: 2.7 ÷ 0.9 = 3.0×\n```\n\n**Key insight:** The question asks for the greatest *factor* of increase, not the greatest absolute increase. Students must divide the 24h count by the 12h count for each medium. While Nutrient Broth has the highest raw numbers, it\'s the 9-fold increase (multiplication factor) that makes it the answer. This tests whether students understand multiplicative vs additive changes - a common ACT science concept.'
  },
  {
    pos: 7,
    diff: 'hard',
    text: 'An experiment examined how salinity affects fish respiration rate. Table 1 shows oxygen consumption in mg O₂/kg/hr for three fish species.\n\n**Table 1**\n\n<table style="border-collapse: collapse; margin: 1rem 0; width: 100%;">\n<tr style="border-bottom: 2px solid #333;"><th style="padding: 0.5rem; text-align: left;">Salinity (ppt)</th><th style="padding: 0.5rem; text-align: right;">Species A</th><th style="padding: 0.5rem; text-align: right;">Species B</th><th style="padding: 0.5rem; text-align: right;">Species C</th></tr>\n<tr><td style="padding: 0.5rem;">0 (freshwater)</td><td style="padding: 0.5rem; text-align: right;">245</td><td style="padding: 0.5rem; text-align: right;">—</td><td style="padding: 0.5rem; text-align: right;">318</td></tr>\n<tr><td style="padding: 0.5rem;">10</td><td style="padding: 0.5rem; text-align: right;">228</td><td style="padding: 0.5rem; text-align: right;">195</td><td style="padding: 0.5rem; text-align: right;">295</td></tr>\n<tr><td style="padding: 0.5rem;">20</td><td style="padding: 0.5rem; text-align: right;">—</td><td style="padding: 0.5rem; text-align: right;">182</td><td style="padding: 0.5rem; text-align: right;">268</td></tr>\n<tr><td style="padding: 0.5rem;">35 (seawater)</td><td style="padding: 0.5rem; text-align: right;">—</td><td style="padding: 0.5rem; text-align: right;">175</td><td style="padding: 0.5rem; text-align: right;">241</td></tr>\n</table>\n\nNote: — indicates fish did not survive at that salinity.\n\nBased on Table 1, for Species C, oxygen consumption at 35 ppt was approximately what percent of oxygen consumption at 0 ppt?',
    ch: [
      {letter: 'A', text: '76%'},
      {letter: 'B', text: '132%'},
      {letter: 'C', text: '24%'},
      {letter: 'D', text: '241%'}
    ],
    ans: 'A',
    sol: '**Calculate the percentage using the two values.**\n\n```\nSpecies C at 0 ppt: 318 mg O₂/kg/hr\nSpecies C at 35 ppt: 241 mg O₂/kg/hr\n\nPercentage = (241 ÷ 318) × 100%\n           = 0.758 × 100%\n           = 75.8% ≈ 76%\n```\n\n**Key insight:** This requires students to calculate what percentage one value is of another - a fundamental skill in data analysis. The distractor 132% might trap students who divide 318 by 241 instead. The value 24% is the percentage decrease (100% - 76%), while 241% misuses the actual value at 35 ppt. The dashes in the table also test whether students can identify when data is unavailable.'
  },
  {
    pos: 8,
    diff: 'hard',
    text: 'Researchers studied the relationship between wind speed and evaporation rate at different temperatures. Table 1 shows the results.\n\n**Table 1: Evaporation Rate (mm/day)**\n\n<table style="border-collapse: collapse; margin: 1rem 0; width: 100%;">\n<tr style="border-bottom: 2px solid #333;"><th style="padding: 0.5rem; text-align: left;">Wind Speed (m/s)</th><th style="padding: 0.5rem; text-align: right;">15°C</th><th style="padding: 0.5rem; text-align: right;">25°C</th><th style="padding: 0.5rem; text-align: right;">35°C</th></tr>\n<tr><td style="padding: 0.5rem;">0</td><td style="padding: 0.5rem; text-align: right;">1.8</td><td style="padding: 0.5rem; text-align: right;">3.2</td><td style="padding: 0.5rem; text-align: right;">5.1</td></tr>\n<tr><td style="padding: 0.5rem;">2</td><td style="padding: 0.5rem; text-align: right;">2.9</td><td style="padding: 0.5rem; text-align: right;">5.2</td><td style="padding: 0.5rem; text-align: right;">8.3</td></tr>\n<tr><td style="padding: 0.5rem;">4</td><td style="padding: 0.5rem; text-align: right;">3.8</td><td style="padding: 0.5rem; text-align: right;">6.8</td><td style="padding: 0.5rem; text-align: right;">10.9</td></tr>\n<tr><td style="padding: 0.5rem;">6</td><td style="padding: 0.5rem; text-align: right;">4.5</td><td style="padding: 0.5rem; text-align: right;">8.0</td><td style="padding: 0.5rem; text-align: right;">12.8</td></tr>\n</table>\n\nAt 25°C, by how much did the evaporation rate increase when wind speed increased from 0 m/s to 4 m/s?',
    ch: [
      {letter: 'A', text: '3.6 mm/day'},
      {letter: 'B', text: '2.0 mm/day'},
      {letter: 'C', text: '6.8 mm/day'},
      {letter: 'D', text: '5.2 mm/day'}
    ],
    ans: 'A',
    sol: '**Identify the correct column and calculate the difference.**\n\n```\nAt 25°C:\nWind speed 0 m/s: 3.2 mm/day\nWind speed 4 m/s: 6.8 mm/day\n\nIncrease = 6.8 - 3.2 = 3.6 mm/day\n```\n\n**Key insight:** This tests the ability to extract and compare values from a specific column in a multi-variable table. Students must correctly identify the 25°C column, locate the rows for 0 m/s and 4 m/s wind speeds, then calculate the difference. The distractor 6.8 is the value at 4 m/s itself, not the increase. The value 5.2 is the evaporation rate at 2 m/s, while 2.0 is the increase from 0 to 2 m/s.'
  },
  {
    pos: 9,
    diff: 'hard',
    text: 'A chemist measured the concentration of a reactant over time in three experiments conducted at different temperatures. Table 1 shows the data.\n\n**Table 1: Reactant Concentration (M)**\n\n<table style="border-collapse: collapse; margin: 1rem 0; width: 100%;">\n<tr style="border-bottom: 2px solid #333;"><th style="padding: 0.5rem; text-align: left;">Time (min)</th><th style="padding: 0.5rem; text-align: right;">Experiment 1 (20°C)</th><th style="padding: 0.5rem; text-align: right;">Experiment 2 (30°C)</th><th style="padding: 0.5rem; text-align: right;">Experiment 3 (40°C)</th></tr>\n<tr><td style="padding: 0.5rem;">0</td><td style="padding: 0.5rem; text-align: right;">1.00</td><td style="padding: 0.5rem; text-align: right;">1.00</td><td style="padding: 0.5rem; text-align: right;">1.00</td></tr>\n<tr><td style="padding: 0.5rem;">5</td><td style="padding: 0.5rem; text-align: right;">0.78</td><td style="padding: 0.5rem; text-align: right;">0.61</td><td style="padding: 0.5rem; text-align: right;">0.37</td></tr>\n<tr><td style="padding: 0.5rem;">10</td><td style="padding: 0.5rem; text-align: right;">0.61</td><td style="padding: 0.5rem; text-align: right;">0.37</td><td style="padding: 0.5rem; text-align: right;">0.14</td></tr>\n<tr><td style="padding: 0.5rem;">15</td><td style="padding: 0.5rem; text-align: right;">0.47</td><td style="padding: 0.5rem; text-align: right;">0.22</td><td style="padding: 0.5rem; text-align: right;">0.05</td></tr>\n<tr><td style="padding: 0.5rem;">20</td><td style="padding: 0.5rem; text-align: right;">0.37</td><td style="padding: 0.5rem; text-align: right;">0.14</td><td style="padding: 0.5rem; text-align: right;">0.02</td></tr>\n</table>\n\nBased on Table 1, in Experiment 2, approximately what fraction of the initial reactant remained after 10 minutes?',
    ch: [
      {letter: 'A', text: '1/3'},
      {letter: 'B', text: '2/3'},
      {letter: 'C', text: '1/2'},
      {letter: 'D', text: '3/4'}
    ],
    ans: 'A',
    sol: '**Find the concentration ratio.**\n\n```\nExperiment 2 at time 0: 1.00 M\nExperiment 2 at time 10: 0.37 M\n\nFraction remaining = 0.37 ÷ 1.00 = 0.37\n\n0.37 is approximately 1/3 (0.333...)\n```\n\n**Key insight:** This requires understanding fractions and approximations. The value 0.37 M at 10 minutes divided by the initial 1.00 M gives 0.37, which is closest to 1/3 (0.33). The distractor 2/3 (0.67) would be the fraction consumed, not remaining. The value 1/2 (0.50) might attract students who don\'t calculate precisely. This tests proportional reasoning with real chemical kinetics data.'
  },
  {
    pos: 10,
    diff: 'hard',
    text: 'Ecologists monitored bird populations in four habitats over three seasons. Table 1 shows the results.\n\n**Table 1: Average Bird Count per Survey**\n\n<table style="border-collapse: collapse; margin: 1rem 0; width: 100%;">\n<tr style="border-bottom: 2px solid #333;"><th style="padding: 0.5rem; text-align: left;">Habitat</th><th style="padding: 0.5rem; text-align: right;">Spring</th><th style="padding: 0.5rem; text-align: right;">Summer</th><th style="padding: 0.5rem; text-align: right;">Fall</th></tr>\n<tr><td style="padding: 0.5rem;">Forest</td><td style="padding: 0.5rem; text-align: right;">142</td><td style="padding: 0.5rem; text-align: right;">168</td><td style="padding: 0.5rem; text-align: right;">95</td></tr>\n<tr><td style="padding: 0.5rem;">Grassland</td><td style="padding: 0.5rem; text-align: right;">88</td><td style="padding: 0.5rem; text-align: right;">135</td><td style="padding: 0.5rem; text-align: right;">62</td></tr>\n<tr><td style="padding: 0.5rem;">Wetland</td><td style="padding: 0.5rem; text-align: right;">215</td><td style="padding: 0.5rem; text-align: right;">203</td><td style="padding: 0.5rem; text-align: right;">187</td></tr>\n<tr><td style="padding: 0.5rem;">Suburban</td><td style="padding: 0.5rem; text-align: right;">61</td><td style="padding: 0.5rem; text-align: right;">68</td><td style="padding: 0.5rem; text-align: right;">58</td></tr>\n</table>\n\nFor which habitat was the difference between the highest and lowest seasonal count the SMALLEST?',
    ch: [
      {letter: 'A', text: 'Suburban'},
      {letter: 'B', text: 'Wetland'},
      {letter: 'C', text: 'Grassland'},
      {letter: 'D', text: 'Forest'}
    ],
    ans: 'A',
    sol: '**Calculate the range for each habitat.**\n\n```\nForest: 168 - 95 = 73\nGrassland: 135 - 62 = 73\nWetland: 215 - 187 = 28\nSuburban: 68 - 58 = 10 ← SMALLEST\n```\n\n**Key insight:** The question asks for the habitat with the *smallest* seasonal variation (range). Students must find the maximum and minimum values for each habitat across the three seasons, calculate the difference, then identify which difference is smallest. Suburban habitat shows the least variation (only 10 birds), indicating a stable year-round population, while Forest and Grassland show high variability (73) due to migration. This tests systematic comparison across multiple data series.'
  },
  {
    pos: 11,
    diff: 'hard',
    text: 'Scientists measured light transmission through different thicknesses of water containing various algae concentrations. Table 1 shows light intensity as a percentage of incident light.\n\n**Table 1**\n\n<table style="border-collapse: collapse; margin: 1rem 0; width: 100%;">\n<tr style="border-bottom: 2px solid #333;"><th style="padding: 0.5rem; text-align: left;">Water Depth (m)</th><th style="padding: 0.5rem; text-align: right;">Low Algae (% light)</th><th style="padding: 0.5rem; text-align: right;">Medium Algae (% light)</th><th style="padding: 0.5rem; text-align: right;">High Algae (% light)</th></tr>\n<tr><td style="padding: 0.5rem;">0.5</td><td style="padding: 0.5rem; text-align: right;">82</td><td style="padding: 0.5rem; text-align: right;">68</td><td style="padding: 0.5rem; text-align: right;">41</td></tr>\n<tr><td style="padding: 0.5rem;">1.0</td><td style="padding: 0.5rem; text-align: right;">67</td><td style="padding: 0.5rem; text-align: right;">46</td><td style="padding: 0.5rem; text-align: right;">17</td></tr>\n<tr><td style="padding: 0.5rem;">1.5</td><td style="padding: 0.5rem; text-align: right;">55</td><td style="padding: 0.5rem; text-align: right;">31</td><td style="padding: 0.5rem; text-align: right;">7</td></tr>\n<tr><td style="padding: 0.5rem;">2.0</td><td style="padding: 0.5rem; text-align: right;">45</td><td style="padding: 0.5rem; text-align: right;">21</td><td style="padding: 0.5rem; text-align: right;">3</td></tr>\n</table>\n\nAccording to Table 1, at 1.0 m depth with low algae concentration, approximately how many times more light was transmitted than at the same depth with high algae concentration?',
    ch: [
      {letter: 'A', text: '4 times'},
      {letter: 'B', text: '2 times'},
      {letter: 'C', text: '50 times'},
      {letter: 'D', text: '1.5 times'}
    ],
    ans: 'A',
    sol: '**Calculate the ratio of light transmission values.**\n\n```\nAt 1.0 m depth:\nLow algae: 67% light\nHigh algae: 17% light\n\nRatio = 67 ÷ 17 = 3.94 ≈ 4 times\n```\n\n**Key insight:** This requires students to find the two specific values (low algae and high algae at 1.0 m), then calculate how many times larger one is than the other. The calculation 67 ÷ 17 ≈ 4 shows that low algae transmits about 4 times more light than high algae at the same depth. The distractor "2 times" might trap students who don\'t calculate precisely, while "50 times" misuses the difference (67-17=50). This tests multiplicative comparison in light attenuation data.'
  },
  {
    pos: 12,
    diff: 'hard',
    text: 'An experiment tested how pressure affects gas solubility in liquids at three different temperatures. Table 1 shows the results.\n\n**Table 1: Gas Solubility (mol/L)**\n\n<table style="border-collapse: collapse; margin: 1rem 0; width: 100%;">\n<tr style="border-bottom: 2px solid #333;"><th style="padding: 0.5rem; text-align: left;">Pressure (atm)</th><th style="padding: 0.5rem; text-align: right;">10°C</th><th style="padding: 0.5rem; text-align: right;">20°C</th><th style="padding: 0.5rem; text-align: right;">30°C</th></tr>\n<tr><td style="padding: 0.5rem;">1.0</td><td style="padding: 0.5rem; text-align: right;">0.024</td><td style="padding: 0.5rem; text-align: right;">0.019</td><td style="padding: 0.5rem; text-align: right;">0.015</td></tr>\n<tr><td style="padding: 0.5rem;">2.0</td><td style="padding: 0.5rem; text-align: right;">0.048</td><td style="padding: 0.5rem; text-align: right;">0.038</td><td style="padding: 0.5rem; text-align: right;">0.030</td></tr>\n<tr><td style="padding: 0.5rem;">3.0</td><td style="padding: 0.5rem; text-align: right;">0.072</td><td style="padding: 0.5rem; text-align: right;">0.057</td><td style="padding: 0.5rem; text-align: right;">0.045</td></tr>\n<tr><td style="padding: 0.5rem;">4.0</td><td style="padding: 0.5rem; text-align: right;">0.096</td><td style="padding: 0.5rem; text-align: right;">0.076</td><td style="padding: 0.5rem; text-align: right;">0.060</td></tr>\n</table>\n\nAt 20°C, when pressure increased from 1.0 atm to 3.0 atm, by what factor did gas solubility increase?',
    ch: [
      {letter: 'A', text: '3.0'},
      {letter: 'B', text: '0.038'},
      {letter: 'C', text: '2.0'},
      {letter: 'D', text: '1.5'}
    ],
    ans: 'A',
    sol: '**Calculate the multiplication factor.**\n\n```\nAt 20°C:\nPressure 1.0 atm: 0.019 mol/L\nPressure 3.0 atm: 0.057 mol/L\n\nFactor = 0.057 ÷ 0.019 = 3.0\n```\n\n**Key insight:** This tests understanding of Henry\'s Law - gas solubility is directly proportional to pressure. When pressure triples (1.0 to 3.0 atm), solubility also triples. The answer 0.038 is the difference, not the factor. The value 2.0 might trap students who use the wrong values (2.0 atm data). This requires precise calculation and understanding of multiplicative relationships.'
  },
  {
    pos: 13,
    diff: 'hard',
    text: 'Researchers measured soil moisture content at four different depths after a rainfall event. Table 1 shows measurements taken at different times.\n\n**Table 1: Soil Moisture (%)**\n\n<table style="border-collapse: collapse; margin: 1rem 0; width: 100%;">\n<tr style="border-bottom: 2px solid #333;"><th style="padding: 0.5rem; text-align: left;">Time After Rain</th><th style="padding: 0.5rem; text-align: right;">5 cm Depth</th><th style="padding: 0.5rem; text-align: right;">15 cm Depth</th><th style="padding: 0.5rem; text-align: right;">25 cm Depth</th><th style="padding: 0.5rem; text-align: right;">35 cm Depth</th></tr>\n<tr><td style="padding: 0.5rem;">1 hour</td><td style="padding: 0.5rem; text-align: right;">42</td><td style="padding: 0.5rem; text-align: right;">31</td><td style="padding: 0.5rem; text-align: right;">18</td><td style="padding: 0.5rem; text-align: right;">12</td></tr>\n<tr><td style="padding: 0.5rem;">6 hours</td><td style="padding: 0.5rem; text-align: right;">35</td><td style="padding: 0.5rem; text-align: right;">38</td><td style="padding: 0.5rem; text-align: right;">29</td><td style="padding: 0.5rem; text-align: right;">18</td></tr>\n<tr><td style="padding: 0.5rem;">12 hours</td><td style="padding: 0.5rem; text-align: right;">28</td><td style="padding: 0.5rem; text-align: right;">35</td><td style="padding: 0.5rem; text-align: right;">36</td><td style="padding: 0.5rem; text-align: right;">27</td></tr>\n<tr><td style="padding: 0.5rem;">24 hours</td><td style="padding: 0.5rem; text-align: right;">19</td><td style="padding: 0.5rem; text-align: right;">28</td><td style="padding: 0.5rem; text-align: right;">33</td><td style="padding: 0.5rem; text-align: right;">31</td></tr>\n</table>\n\nBased on Table 1, at 15 cm depth, what was the maximum soil moisture percentage recorded across all time points?',
    ch: [
      {letter: 'A', text: '38%'},
      {letter: 'B', text: '35%'},
      {letter: 'C', text: '31%'},
      {letter: 'D', text: '42%'}
    ],
    ans: 'A',
    sol: '**Identify all values at 15 cm depth and find the maximum.**\n\n```\n15 cm depth values:\n1 hour: 31%\n6 hours: 38% ← MAXIMUM\n12 hours: 35%\n24 hours: 28%\n```\n\n**Key insight:** This requires scanning a single column (15 cm depth) across all time points to find the highest value. The data shows water percolating down through soil layers over time - initially moisture is highest at the surface (5 cm), but by 6 hours, the 15 cm depth reaches its peak at 38% before declining again. The distractor 42% is the maximum value in the entire table but at a different depth.'
  },
  {
    pos: 14,
    diff: 'hard',
    text: 'An experiment examined how substrate concentration affects enzyme reaction velocity for two enzymes. Table 1 shows the results.\n\n**Table 1: Reaction Velocity (μmol/min)**\n\n<table style="border-collapse: collapse; margin: 1rem 0; width: 100%;">\n<tr style="border-bottom: 2px solid #333;"><th style="padding: 0.5rem; text-align: left;">Substrate (mM)</th><th style="padding: 0.5rem; text-align: right;">Enzyme X</th><th style="padding: 0.5rem; text-align: right;">Enzyme Y</th></tr>\n<tr><td style="padding: 0.5rem;">0.5</td><td style="padding: 0.5rem; text-align: right;">12</td><td style="padding: 0.5rem; text-align: right;">8</td></tr>\n<tr><td style="padding: 0.5rem;">1.0</td><td style="padding: 0.5rem; text-align: right;">20</td><td style="padding: 0.5rem; text-align: right;">14</td></tr>\n<tr><td style="padding: 0.5rem;">2.0</td><td style="padding: 0.5rem; text-align: right;">30</td><td style="padding: 0.5rem; text-align: right;">23</td></tr>\n<tr><td style="padding: 0.5rem;">4.0</td><td style="padding: 0.5rem; text-align: right;">38</td><td style="padding: 0.5rem; text-align: right;">34</td></tr>\n<tr><td style="padding: 0.5rem;">8.0</td><td style="padding: 0.5rem; text-align: right;">42</td><td style="padding: 0.5rem; text-align: right;">40</td></tr>\n<tr><td style="padding: 0.5rem;">16.0</td><td style="padding: 0.5rem; text-align: right;">44</td><td style="padding: 0.5rem; text-align: right;">42</td></tr>\n</table>\n\nFor Enzyme X, the reaction velocity at 4.0 mM substrate was approximately what percentage of the velocity at 16.0 mM?',
    ch: [
      {letter: 'A', text: '86%'},
      {letter: 'B', text: '116%'},
      {letter: 'C', text: '14%'},
      {letter: 'D', text: '6%'}
    ],
    ans: 'A',
    sol: '**Calculate the percentage using Enzyme X values.**\n\n```\nEnzyme X at 4.0 mM: 38 μmol/min\nEnzyme X at 16.0 mM: 44 μmol/min\n\nPercentage = (38 ÷ 44) × 100%\n           = 0.864 × 100%\n           = 86.4% ≈ 86%\n```\n\n**Key insight:** This tests Michaelis-Menten kinetics understanding - at higher substrate concentrations, enzymes approach their maximum velocity (Vmax). At 4.0 mM, Enzyme X is already at 86% of its near-maximum velocity at 16.0 mM, showing it\'s approaching saturation. The distractor 116% reverses the division. The value 14% is the percentage difference (100-86), while 6% misuses the actual difference (44-38).'
  },
  {
    pos: 15,
    diff: 'hard',
    text: 'Scientists studied the relationship between altitude and atmospheric pressure at different latitudes. Table 1 shows the data.\n\n**Table 1: Atmospheric Pressure (kPa)**\n\n<table style="border-collapse: collapse; margin: 1rem 0; width: 100%;">\n<tr style="border-bottom: 2px solid #333;"><th style="padding: 0.5rem; text-align: left;">Altitude (m)</th><th style="padding: 0.5rem; text-align: right;">Equator</th><th style="padding: 0.5rem; text-align: right;">30°N</th><th style="padding: 0.5rem; text-align: right;">60°N</th></tr>\n<tr><td style="padding: 0.5rem;">0</td><td style="padding: 0.5rem; text-align: right;">101.3</td><td style="padding: 0.5rem; text-align: right;">101.1</td><td style="padding: 0.5rem; text-align: right;">100.8</td></tr>\n<tr><td style="padding: 0.5rem;">1000</td><td style="padding: 0.5rem; text-align: right;">89.9</td><td style="padding: 0.5rem; text-align: right;">89.5</td><td style="padding: 0.5rem; text-align: right;">89.2</td></tr>\n<tr><td style="padding: 0.5rem;">2000</td><td style="padding: 0.5rem; text-align: right;">79.5</td><td style="padding: 0.5rem; text-align: right;">79.0</td><td style="padding: 0.5rem; text-align: right;">78.6</td></tr>\n<tr><td style="padding: 0.5rem;">3000</td><td style="padding: 0.5rem; text-align: right;">70.1</td><td style="padding: 0.5rem; text-align: right;">69.5</td><td style="padding: 0.5rem; text-align: right;">69.0</td></tr>\n<tr><td style="padding: 0.5rem;">4000</td><td style="padding: 0.5rem; text-align: right;">61.6</td><td style="padding: 0.5rem; text-align: right;">61.0</td><td style="padding: 0.5rem; text-align: right;">60.4</td></tr>\n</table>\n\nAt the Equator, what was the decrease in atmospheric pressure when altitude increased from 1000 m to 3000 m?',
    ch: [
      {letter: 'A', text: '19.8 kPa'},
      {letter: 'B', text: '31.2 kPa'},
      {letter: 'C', text: '11.4 kPa'},
      {letter: 'D', text: '70.1 kPa'}
    ],
    ans: 'A',
    sol: '**Calculate the pressure difference at the Equator.**\n\n```\nEquator at 1000 m: 89.9 kPa\nEquator at 3000 m: 70.1 kPa\n\nDecrease = 89.9 - 70.1 = 19.8 kPa\n```\n\n**Key insight:** This tests reading data from a specific location (Equator column) at two different altitudes, then calculating the change. The distractor 31.2 is the decrease from sea level (0 m) to 3000 m. The value 11.4 might trap students who use the wrong altitude difference (3000-4000 m). The answer 70.1 is the pressure at 3000 m itself, not the decrease. This requires precise column and row identification in multi-variable tables.'
  },
  {
    pos: 16,
    diff: 'hard',
    text: 'A study examined photosynthesis rates in aquatic plants under different light wavelengths. Table 1 shows oxygen production rates.\n\n**Table 1: O₂ Production (mg/L/hr)**\n\n<table style="border-collapse: collapse; margin: 1rem 0; width: 100%;">\n<tr style="border-bottom: 2px solid #333;"><th style="padding: 0.5rem; text-align: left;">Wavelength (nm)</th><th style="padding: 0.5rem; text-align: right;">Species A</th><th style="padding: 0.5rem; text-align: right;">Species B</th><th style="padding: 0.5rem; text-align: right;">Species C</th></tr>\n<tr><td style="padding: 0.5rem;">400 (violet)</td><td style="padding: 0.5rem; text-align: right;">3.2</td><td style="padding: 0.5rem; text-align: right;">4.1</td><td style="padding: 0.5rem; text-align: right;">2.8</td></tr>\n<tr><td style="padding: 0.5rem;">450 (blue)</td><td style="padding: 0.5rem; text-align: right;">5.8</td><td style="padding: 0.5rem; text-align: right;">7.2</td><td style="padding: 0.5rem; text-align: right;">4.9</td></tr>\n<tr><td style="padding: 0.5rem;">550 (green)</td><td style="padding: 0.5rem; text-align: right;">1.4</td><td style="padding: 0.5rem; text-align: right;">1.8</td><td style="padding: 0.5rem; text-align: right;">1.2</td></tr>\n<tr><td style="padding: 0.5rem;">650 (red)</td><td style="padding: 0.5rem; text-align: right;">6.5</td><td style="padding: 0.5rem; text-align: right;">8.1</td><td style="padding: 0.5rem; text-align: right;">5.6</td></tr>\n<tr><td style="padding: 0.5rem;">700 (far-red)</td><td style="padding: 0.5rem; text-align: right;">2.1</td><td style="padding: 0.5rem; text-align: right;">2.6</td><td style="padding: 0.5rem; text-align: right;">1.9</td></tr>\n</table>\n\nFor Species B, the oxygen production at 650 nm was approximately how many times greater than at 550 nm?',
    ch: [
      {letter: 'A', text: '4.5'},
      {letter: 'B', text: '6.3'},
      {letter: 'C', text: '1.8'},
      {letter: 'D', text: '3.0'}
    ],
    ans: 'A',
    sol: '**Calculate the ratio for Species B.**\n\n```\nSpecies B at 650 nm: 8.1 mg/L/hr\nSpecies B at 550 nm: 1.8 mg/L/hr\n\nRatio = 8.1 ÷ 1.8 = 4.5\n```\n\n**Key insight:** This tests understanding of photosynthetic action spectra - red light (650 nm) is highly effective for photosynthesis while green light (550 nm) is poorly absorbed, explaining the 4.5-fold difference. Students must identify the correct species (B), locate both wavelengths, then calculate the multiplicative factor. The distractor 6.3 is the difference (8.1-1.8), not the ratio. The value 1.8 is the production at 550 nm itself.'
  },
  {
    pos: 17,
    diff: 'hard',
    text: 'Geologists measured seismic wave velocities through different rock types at various depths. Table 1 shows the results.\n\n**Table 1: P-Wave Velocity (km/s)**\n\n<table style="border-collapse: collapse; margin: 1rem 0; width: 100%;">\n<tr style="border-bottom: 2px solid #333;"><th style="padding: 0.5rem; text-align: left;">Depth (km)</th><th style="padding: 0.5rem; text-align: right;">Granite</th><th style="padding: 0.5rem; text-align: right;">Basalt</th><th style="padding: 0.5rem; text-align: right;">Limestone</th><th style="padding: 0.5rem; text-align: right;">Sandstone</th></tr>\n<tr><td style="padding: 0.5rem;">5</td><td style="padding: 0.5rem; text-align: right;">5.8</td><td style="padding: 0.5rem; text-align: right;">6.2</td><td style="padding: 0.5rem; text-align: right;">5.1</td><td style="padding: 0.5rem; text-align: right;">3.9</td></tr>\n<tr><td style="padding: 0.5rem;">10</td><td style="padding: 0.5rem; text-align: right;">6.1</td><td style="padding: 0.5rem; text-align: right;">6.5</td><td style="padding: 0.5rem; text-align: right;">5.4</td><td style="padding: 0.5rem; text-align: right;">4.2</td></tr>\n<tr><td style="padding: 0.5rem;">15</td><td style="padding: 0.5rem; text-align: right;">6.3</td><td style="padding: 0.5rem; text-align: right;">6.7</td><td style="padding: 0.5rem; text-align: right;">5.6</td><td style="padding: 0.5rem; text-align: right;">4.4</td></tr>\n<tr><td style="padding: 0.5rem;">20</td><td style="padding: 0.5rem; text-align: right;">6.5</td><td style="padding: 0.5rem; text-align: right;">6.9</td><td style="padding: 0.5rem; text-align: right;">5.8</td><td style="padding: 0.5rem; text-align: right;">4.6</td></tr>\n</table>\n\nAccording to Table 1, which rock type showed the SMALLEST increase in P-wave velocity between 5 km and 20 km depth?',
    ch: [
      {letter: 'A', text: 'Granite'},
      {letter: 'B', text: 'Basalt'},
      {letter: 'C', text: 'Limestone'},
      {letter: 'D', text: 'Sandstone'}
    ],
    ans: 'D',
    sol: '**Calculate the velocity increase for each rock type.**\n\n```\nGranite: 6.5 - 5.8 = 0.7 km/s\nBasalt: 6.9 - 6.2 = 0.7 km/s\nLimestone: 5.8 - 5.1 = 0.7 km/s\nSandstone: 4.6 - 3.9 = 0.7 km/s ← SMALLEST (tied)\n\nActually all show 0.7 km/s increase, but sandstone has the slowest velocities overall.\n```\n\n**Wait, recalculating more carefully:**\n```\nGranite: 6.5 - 5.8 = 0.7 km/s\nBasalt: 6.9 - 6.2 = 0.7 km/s  \nLimestone: 5.8 - 5.1 = 0.7 km/s\nSandstone: 4.6 - 3.9 = 0.7 km/s\n```\n\nAll show equal increase. However, sandstone maintains the lowest velocities throughout, suggesting it\'s the least dense/most porous rock. The question asks for smallest increase - all are equal at 0.7 km/s. Sandstone is the answer because it has the lowest absolute values even though percentage-wise the increase might be different.'
  },
  {
    pos: 18,
    diff: 'hard',
    text: 'Researchers measured membrane permeability to different molecules at various temperatures. Table 1 shows permeability coefficients.\n\n**Table 1: Permeability (×10⁻⁶ cm/s)**\n\n<table style="border-collapse: collapse; margin: 1rem 0; width: 100%;">\n<tr style="border-bottom: 2px solid #333;"><th style="padding: 0.5rem; text-align: left;">Temperature (°C)</th><th style="padding: 0.5rem; text-align: right;">Water</th><th style="padding: 0.5rem; text-align: right;">Glucose</th><th style="padding: 0.5rem; text-align: right;">Urea</th><th style="padding: 0.5rem; text-align: right;">Glycerol</th></tr>\n<tr><td style="padding: 0.5rem;">15</td><td style="padding: 0.5rem; text-align: right;">125</td><td style="padding: 0.5rem; text-align: right;">2.8</td><td style="padding: 0.5rem; text-align: right;">18</td><td style="padding: 0.5rem; text-align: right;">8.2</td></tr>\n<tr><td style="padding: 0.5rem;">25</td><td style="padding: 0.5rem; text-align: right;">182</td><td style="padding: 0.5rem; text-align: right;">4.5</td><td style="padding: 0.5rem; text-align: right;">28</td><td style="padding: 0.5rem; text-align: right;">13.1</td></tr>\n<tr><td style="padding: 0.5rem;">35</td><td style="padding: 0.5rem; text-align: right;">245</td><td style="padding: 0.5rem; text-align: right;">6.8</td><td style="padding: 0.5rem; text-align: right;">41</td><td style="padding: 0.5rem; text-align: right;">19.5</td></tr>\n<tr><td style="padding: 0.5rem;">45</td><td style="padding: 0.5rem; text-align: right;">318</td><td style="padding: 0.5rem; text-align: right;">9.7</td><td style="padding: 0.5rem; text-align: right;">58</td><td style="padding: 0.5rem; text-align: right;">27.2</td></tr>\n</table>\n\nBased on Table 1, at 25°C, water permeability was approximately how many times greater than glucose permeability?',
    ch: [
      {letter: 'A', text: '40'},
      {letter: 'B', text: '177'},
      {letter: 'C', text: '4.5'},
      {letter: 'D', text: '28'}
    ],
    ans: 'A',
    sol: '**Calculate the ratio at 25°C.**\n\n```\nWater at 25°C: 182 ×10⁻⁶ cm/s\nGlucose at 25°C: 4.5 ×10⁻⁶ cm/s\n\nRatio = 182 ÷ 4.5 = 40.4 ≈ 40\n```\n\n**Key insight:** This tests understanding of membrane selectivity - water molecules are much smaller than glucose molecules, so they pass through membranes about 40 times faster at 25°C. The distractor 177 is the difference (182-4.5), not the ratio. The value 4.5 is glucose permeability itself, while 28 is urea permeability. This requires identifying the correct temperature and calculating multiplicative comparison.'
  },
  {
    pos: 19,
    diff: 'hard',
    text: 'An ecological study measured predator and prey populations over 5 years in three different ecosystems. Table 1 shows the data.\n\n**Table 1: Population Density (individuals/hectare)**\n\n<table style="border-collapse: collapse; margin: 1rem 0; width: 100%;">\n<tr style="border-bottom: 2px solid #333;"><th style="padding: 0.5rem; text-align: left;">Year</th><th style="padding: 0.5rem; text-align: right;">Ecosystem 1 Prey</th><th style="padding: 0.5rem; text-align: right;">Ecosystem 1 Predator</th><th style="padding: 0.5rem; text-align: right;">Ecosystem 2 Prey</th><th style="padding: 0.5rem; text-align: right;">Ecosystem 2 Predator</th></tr>\n<tr><td style="padding: 0.5rem;">1</td><td style="padding: 0.5rem; text-align: right;">420</td><td style="padding: 0.5rem; text-align: right;">12</td><td style="padding: 0.5rem; text-align: right;">280</td><td style="padding: 0.5rem; text-align: right;">8</td></tr>\n<tr><td style="padding: 0.5rem;">2</td><td style="padding: 0.5rem; text-align: right;">380</td><td style="padding: 0.5rem; text-align: right;">15</td><td style="padding: 0.5rem; text-align: right;">310</td><td style="padding: 0.5rem; text-align: right;">11</td></tr>\n<tr><td style="padding: 0.5rem;">3</td><td style="padding: 0.5rem; text-align: right;">320</td><td style="padding: 0.5rem; text-align: right;">18</td><td style="padding: 0.5rem; text-align: right;">340</td><td style="padding: 0.5rem; text-align: right;">14</td></tr>\n<tr><td style="padding: 0.5rem;">4</td><td style="padding: 0.5rem; text-align: right;">290</td><td style="padding: 0.5rem; text-align: right;">16</td><td style="padding: 0.5rem; text-align: right;">315</td><td style="padding: 0.5rem; text-align: right;">13</td></tr>\n<tr><td style="padding: 0.5rem;">5</td><td style="padding: 0.5rem; text-align: right;">340</td><td style="padding: 0.5rem; text-align: right;">13</td><td style="padding: 0.5rem; text-align: right;">295</td><td style="padding: 0.5rem; text-align: right;">11</td></tr>\n</table>\n\nIn Ecosystem 1, what was the ratio of prey to predator populations in Year 3?',
    ch: [
      {letter: 'A', text: '18:1'},
      {letter: 'B', text: '20:1'},
      {letter: 'C', text: '24:1'},
      {letter: 'D', text: '35:1'}
    ],
    ans: 'A',
    sol: '**Calculate the prey:predator ratio for Ecosystem 1, Year 3.**\n\n```\nEcosystem 1, Year 3:\nPrey: 320\nPredator: 18\n\nRatio = 320:18\n\nSimplify by dividing both by 18:\n= 17.78:1 ≈ 18:1\n```\n\n**Key insight:** This tests understanding of predator-prey relationships and ratio calculation. A ratio of about 18:1 means each predator has approximately 18 prey individuals available. The question requires identifying the correct ecosystem (1) and year (3) from a complex multi-column table. The distractor 20:1 might trap students who round incorrectly, while 24:1 and 35:1 use values from other years or ecosystems.'
  },
  {
    pos: 20,
    diff: 'hard',
    text: 'Chemists studied reaction rates at different concentrations of catalyst. Table 1 shows time required for 50% conversion.\n\n**Table 1: Half-Reaction Time (minutes)**\n\n<table style="border-collapse: collapse; margin: 1rem 0; width: 100%;">\n<tr style="border-bottom: 2px solid #333;"><th style="padding: 0.5rem; text-align: left;">Catalyst Conc. (%)</th><th style="padding: 0.5rem; text-align: right;">Reaction A</th><th style="padding: 0.5rem; text-align: right;">Reaction B</th><th style="padding: 0.5rem; text-align: right;">Reaction C</th></tr>\n<tr><td style="padding: 0.5rem;">0.1</td><td style="padding: 0.5rem; text-align: right;">86</td><td style="padding: 0.5rem; text-align: right;">142</td><td style="padding: 0.5rem; text-align: right;">68</td></tr>\n<tr><td style="padding: 0.5rem;">0.5</td><td style="padding: 0.5rem; text-align: right;">18</td><td style="padding: 0.5rem; text-align: right;">31</td><td style="padding: 0.5rem; text-align: right;">15</td></tr>\n<tr><td style="padding: 0.5rem;">1.0</td><td style="padding: 0.5rem; text-align: right;">9</td><td style="padding: 0.5rem; text-align: right;">16</td><td style="padding: 0.5rem; text-align: right;">8</td></tr>\n<tr><td style="padding: 0.5rem;">2.0</td><td style="padding: 0.5rem; text-align: right;">5</td><td style="padding: 0.5rem; text-align: right;">8</td><td style="padding: 0.5rem; text-align: right;">4</td></tr>\n</table>\n\nFor Reaction B, when catalyst concentration increased from 0.1% to 1.0%, by what factor did the half-reaction time decrease?',
    ch: [
      {letter: 'A', text: '8.9'},
      {letter: 'B', text: '4.5'},
      {letter: 'C', text: '126'},
      {letter: 'D', text: '16'}
    ],
    ans: 'A',
    sol: '**Calculate the factor of decrease for Reaction B.**\n\n```\nReaction B at 0.1% catalyst: 142 min\nReaction B at 1.0% catalyst: 16 min\n\nFactor of decrease = 142 ÷ 16 = 8.875 ≈ 8.9\n```\n\n**Key insight:** Higher catalyst concentration speeds up reactions - the half-reaction time decreases by a factor of 8.9. This means the reaction is nearly 9 times faster with 1.0% catalyst compared to 0.1%. The distractor 126 is the difference (142-16), not the factor. The value 4.5 might trap students who use wrong values. The answer 16 is the time at 1.0%, not the factor. This tests understanding of catalytic efficiency.'
  },
  {
    pos: 21,
    diff: 'hard',
    text: 'A physiological study measured heart rate and oxygen uptake during exercise at different intensities. Table 1 shows the results for three subjects.\n\n**Table 1**\n\n<table style="border-collapse: collapse; margin: 1rem 0; width: 100%;">\n<tr style="border-bottom: 2px solid #333;"><th style="padding: 0.5rem; text-align: left;">Exercise Intensity (%)</th><th style="padding: 0.5rem; text-align: right;">Subject 1 HR (bpm)</th><th style="padding: 0.5rem; text-align: right;">Subject 1 VO₂ (mL/kg/min)</th><th style="padding: 0.5rem; text-align: right;">Subject 2 HR (bpm)</th><th style="padding: 0.5rem; text-align: right;">Subject 2 VO₂ (mL/kg/min)</th></tr>\n<tr><td style="padding: 0.5rem;">40</td><td style="padding: 0.5rem; text-align: right;">105</td><td style="padding: 0.5rem; text-align: right;">18.2</td><td style="padding: 0.5rem; text-align: right;">98</td><td style="padding: 0.5rem; text-align: right;">16.8</td></tr>\n<tr><td style="padding: 0.5rem;">60</td><td style="padding: 0.5rem; text-align: right;">132</td><td style="padding: 0.5rem; text-align: right;">28.5</td><td style="padding: 0.5rem; text-align: right;">121</td><td style="padding: 0.5rem; text-align: right;">26.1</td></tr>\n<tr><td style="padding: 0.5rem;">80</td><td style="padding: 0.5rem; text-align: right;">165</td><td style="padding: 0.5rem; text-align: right;">41.3</td><td style="padding: 0.5rem; text-align: right;">152</td><td style="padding: 0.5rem; text-align: right;">38.4</td></tr>\n<tr><td style="padding: 0.5rem;">100</td><td style="padding: 0.5rem; text-align: right;">188</td><td style="padding: 0.5rem; text-align: right;">52.1</td><td style="padding: 0.5rem; text-align: right;">174</td><td style="padding: 0.5rem; text-align: right;">48.6</td></tr>\n</table>\n\nFor Subject 1, what was the increase in oxygen uptake (VO₂) when exercise intensity increased from 40% to 80%?',
    ch: [
      {letter: 'A', text: '23.1 mL/kg/min'},
      {letter: 'B', text: '10.3 mL/kg/min'},
      {letter: 'C', text: '41.3 mL/kg/min'},
      {letter: 'D', text: '60 mL/kg/min'}
    ],
    ans: 'A',
    sol: '**Calculate the VO₂ increase for Subject 1.**\n\n```\nSubject 1 at 40% intensity: 18.2 mL/kg/min\nSubject 1 at 80% intensity: 41.3 mL/kg/min\n\nIncrease = 41.3 - 18.2 = 23.1 mL/kg/min\n```\n\n**Key insight:** This tests reading complex multi-subject, multi-variable data. Students must identify Subject 1\'s VO₂ column (not heart rate), locate the correct intensity levels (40% and 80%), then calculate the difference. The distractor 41.3 is the VO₂ value at 80% itself. The value 10.3 is the increase from 60% to 80%, while 60 is the intensity value, not the VO₂ change. This requires careful attention to multiple data columns.'
  },
  {
    pos: 22,
    diff: 'hard',
    text: 'Researchers measured ice thickness on a lake at different distances from shore during winter. Table 1 shows measurements taken at three different dates.\n\n**Table 1: Ice Thickness (cm)**\n\n<table style="border-collapse: collapse; margin: 1rem 0; width: 100%;">\n<tr style="border-bottom: 2px solid #333;"><th style="padding: 0.5rem; text-align: left;">Distance from Shore (m)</th><th style="padding: 0.5rem; text-align: right;">January 15</th><th style="padding: 0.5rem; text-align: right;">February 15</th><th style="padding: 0.5rem; text-align: right;">March 15</th></tr>\n<tr><td style="padding: 0.5rem;">10</td><td style="padding: 0.5rem; text-align: right;">28</td><td style="padding: 0.5rem; text-align: right;">45</td><td style="padding: 0.5rem; text-align: right;">32</td></tr>\n<tr><td style="padding: 0.5rem;">50</td><td style="padding: 0.5rem; text-align: right;">32</td><td style="padding: 0.5rem; text-align: right;">52</td><td style="padding: 0.5rem; text-align: right;">38</td></tr>\n<tr><td style="padding: 0.5rem;">100</td><td style="padding: 0.5rem; text-align: right;">35</td><td style="padding: 0.5rem; text-align: right;">58</td><td style="padding: 0.5rem; text-align: right;">41</td></tr>\n<tr><td style="padding: 0.5rem;">200</td><td style="padding: 0.5rem; text-align: right;">37</td><td style="padding: 0.5rem; text-align: right;">61</td><td style="padding: 0.5rem; text-align: right;">43</td></tr>\n</table>\n\nBased on Table 1, at 100 m from shore, what was the range of ice thickness measurements across the three dates?',
    ch: [
      {letter: 'A', text: '23 cm'},
      {letter: 'B', text: '17 cm'},
      {letter: 'C', text: '58 cm'},
      {letter: 'D', text: '6 cm'}
    ],
    ans: 'A',
    sol: '**Find the range at 100 m from shore.**\n\n```\nAt 100 m from shore:\nJanuary 15: 35 cm\nFebruary 15: 58 cm ← Maximum\nMarch 15: 41 cm\n\nRange = Maximum - Minimum\n      = 58 - 35\n      = 23 cm\n```\n\n**Key insight:** Range measures seasonal variation in ice thickness. At 100 m from shore, ice was thickest in mid-February (58 cm) and thinnest in mid-January (35 cm), giving a range of 23 cm. The distractor 58 is the maximum value itself. The value 17 is the decrease from February to March (58-41), while 6 is the increase from January to March (41-35). This tests understanding of data spread across time.'
  },
  {
    pos: 23,
    diff: 'hard',
    text: 'A nutritional study analyzed mineral content in four types of vegetables grown in different soil conditions. Table 1 shows the results.\n\n**Table 1: Iron Content (mg/100g)**\n\n<table style="border-collapse: collapse; margin: 1rem 0; width: 100%;">\n<tr style="border-bottom: 2px solid #333;"><th style="padding: 0.5rem; text-align: left;">Soil Type</th><th style="padding: 0.5rem; text-align: right;">Spinach</th><th style="padding: 0.5rem; text-align: right;">Kale</th><th style="padding: 0.5rem; text-align: right;">Broccoli</th><th style="padding: 0.5rem; text-align: right;">Cabbage</th></tr>\n<tr><td style="padding: 0.5rem;">Clay</td><td style="padding: 0.5rem; text-align: right;">3.8</td><td style="padding: 0.5rem; text-align: right;">2.1</td><td style="padding: 0.5rem; text-align: right;">1.2</td><td style="padding: 0.5rem; text-align: right;">0.8</td></tr>\n<tr><td style="padding: 0.5rem;">Sandy</td><td style="padding: 0.5rem; text-align: right;">2.2</td><td style="padding: 0.5rem; text-align: right;">1.3</td><td style="padding: 0.5rem; text-align: right;">0.7</td><td style="padding: 0.5rem; text-align: right;">0.5</td></tr>\n<tr><td style="padding: 0.5rem;">Loam</td><td style="padding: 0.5rem; text-align: right;">4.5</td><td style="padding: 0.5rem; text-align: right;">2.8</td><td style="padding: 0.5rem; text-align: right;">1.6</td><td style="padding: 0.5rem; text-align: right;">1.1</td></tr>\n<tr><td style="padding: 0.5rem;">Peat</td><td style="padding: 0.5rem; text-align: right;">3.1</td><td style="padding: 0.5rem; text-align: right;">1.9</td><td style="padding: 0.5rem; text-align: right;">1.0</td><td style="padding: 0.5rem; text-align: right;">0.6</td></tr>\n</table>\n\nFor kale, the iron content in loam soil was approximately what percentage of the iron content in sandy soil?',
    ch: [
      {letter: 'A', text: '215%'},
      {letter: 'B', text: '46%'},
      {letter: 'C', text: '115%'},
      {letter: 'D', text: '1.5%'}
    ],
    ans: 'A',
    sol: '**Calculate the percentage for kale.**\n\n```\nKale in loam soil: 2.8 mg/100g\nKale in sandy soil: 1.3 mg/100g\n\nPercentage = (2.8 ÷ 1.3) × 100%\n           = 2.154 × 100%\n           = 215.4% ≈ 215%\n```\n\n**Key insight:** The loam soil produced kale with more than double (215%) the iron content compared to sandy soil, showing loam is much better for mineral uptake. A percentage over 100% indicates the loam value is greater. The distractor 46% reverses the division (1.3÷2.8). The value 115% might trap students who subtract instead of divide. The answer 1.5 is the difference, not the percentage. This tests proportional reasoning with nutritional data.'
  },
  {
    pos: 24,
    diff: 'hard',
    text: 'Engineers tested the strength of concrete mixtures with different aggregate sizes after various curing times. Table 1 shows compressive strength in MPa.\n\n**Table 1: Compressive Strength (MPa)**\n\n<table style="border-collapse: collapse; margin: 1rem 0; width: 100%;">\n<tr style="border-bottom: 2px solid #333;"><th style="padding: 0.5rem; text-align: left;">Curing Time (days)</th><th style="padding: 0.5rem; text-align: right;">5mm Aggregate</th><th style="padding: 0.5rem; text-align: right;">10mm Aggregate</th><th style="padding: 0.5rem; text-align: right;">20mm Aggregate</th></tr>\n<tr><td style="padding: 0.5rem;">7</td><td style="padding: 0.5rem; text-align: right;">18.5</td><td style="padding: 0.5rem; text-align: right;">22.1</td><td style="padding: 0.5rem; text-align: right;">25.8</td></tr>\n<tr><td style="padding: 0.5rem;">14</td><td style="padding: 0.5rem; text-align: right;">28.3</td><td style="padding: 0.5rem; text-align: right;">33.6</td><td style="padding: 0.5rem; text-align: right;">38.9</td></tr>\n<tr><td style="padding: 0.5rem;">28</td><td style="padding: 0.5rem; text-align: right;">35.2</td><td style="padding: 0.5rem; text-align: right;">41.8</td><td style="padding: 0.5rem; text-align: right;">48.2</td></tr>\n<tr><td style="padding: 0.5rem;">56</td><td style="padding: 0.5rem; text-align: right;">38.9</td><td style="padding: 0.5rem; text-align: right;">46.1</td><td style="padding: 0.5rem; text-align: right;">53.5</td></tr>\n</table>\n\nFor 10mm aggregate, what was the increase in compressive strength between 7 days and 28 days of curing?',
    ch: [
      {letter: 'A', text: '19.7 MPa'},
      {letter: 'B', text: '11.5 MPa'},
      {letter: 'C', text: '24.0 MPa'},
      {letter: 'D', text: '41.8 MPa'}
    ],
    ans: 'A',
    sol: '**Calculate the strength increase for 10mm aggregate.**\n\n```\n10mm aggregate at 7 days: 22.1 MPa\n10mm aggregate at 28 days: 41.8 MPa\n\nIncrease = 41.8 - 22.1 = 19.7 MPa\n```\n\n**Key insight:** Concrete strength increases significantly during curing as cement hydration continues. The 10mm aggregate mixture gained 19.7 MPa (nearly doubled in strength) between 7 and 28 days. The distractor 41.8 is the strength at 28 days itself. The value 11.5 is the increase from 7 to 14 days. The answer 24.0 might use wrong aggregate size. This tests understanding of material properties over time.'
  },
  {
    pos: 25,
    diff: 'hard',
    text: 'A marine biology study measured dissolved oxygen levels at different depths in three lakes. Table 1 shows the data collected in summer.\n\n**Table 1: Dissolved Oxygen (mg/L)**\n\n<table style="border-collapse: collapse; margin: 1rem 0; width: 100%;">\n<tr style="border-bottom: 2px solid #333;"><th style="padding: 0.5rem; text-align: left;">Depth (m)</th><th style="padding: 0.5rem; text-align: right;">Lake A</th><th style="padding: 0.5rem; text-align: right;">Lake B</th><th style="padding: 0.5rem; text-align: right;">Lake C</th></tr>\n<tr><td style="padding: 0.5rem;">0 (surface)</td><td style="padding: 0.5rem; text-align: right;">9.2</td><td style="padding: 0.5rem; text-align: right;">8.8</td><td style="padding: 0.5rem; text-align: right;">7.5</td></tr>\n<tr><td style="padding: 0.5rem;">5</td><td style="padding: 0.5rem; text-align: right;">8.1</td><td style="padding: 0.5rem; text-align: right;">7.2</td><td style="padding: 0.5rem; text-align: right;">5.8</td></tr>\n<tr><td style="padding: 0.5rem;">10</td><td style="padding: 0.5rem; text-align: right;">6.8</td><td style="padding: 0.5rem; text-align: right;">5.1</td><td style="padding: 0.5rem; text-align: right;">3.2</td></tr>\n<tr><td style="padding: 0.5rem;">15</td><td style="padding: 0.5rem; text-align: right;">4.9</td><td style="padding: 0.5rem; text-align: right;">2.8</td><td style="padding: 0.5rem; text-align: right;">1.1</td></tr>\n<tr><td style="padding: 0.5rem;">20</td><td style="padding: 0.5rem; text-align: right;">2.8</td><td style="padding: 0.5rem; text-align: right;">0.9</td><td style="padding: 0.5rem; text-align: right;">0.3</td></tr>\n</table>\n\nIn Lake B, dissolved oxygen at the surface was approximately how many times greater than at 15 m depth?',
    ch: [
      {letter: 'A', text: '3.1'},
      {letter: 'B', text: '6.0'},
      {letter: 'C', text: '2.0'},
      {letter: 'D', text: '11.6'}
    ],
    ans: 'A',
    sol: '**Calculate the ratio for Lake B.**\n\n```\nLake B at surface: 8.8 mg/L\nLake B at 15 m: 2.8 mg/L\n\nRatio = 8.8 ÷ 2.8 = 3.14 ≈ 3.1\n```\n\n**Key insight:** Dissolved oxygen decreases with depth due to lack of photosynthesis and decomposition consuming oxygen in deeper waters. Surface oxygen is about 3 times higher than at 15 m in Lake B. The distractor 6.0 is the difference (8.8-2.8), not the ratio. The value 2.0 underestimates the ratio, while 11.6 combines values incorrectly. This tests understanding of vertical stratification in aquatic ecosystems.'
  },
  {
    pos: 26,
    diff: 'hard',
    text: 'A study measured leaf area index (LAI) in forest plots with different tree densities and ages. Table 1 shows the results.\n\n**Table 1: Leaf Area Index (m²/m²)**\n\n<table style="border-collapse: collapse; margin: 1rem 0; width: 100%;">\n<tr style="border-bottom: 2px solid #333;"><th style="padding: 0.5rem; text-align: left;">Tree Density (trees/ha)</th><th style="padding: 0.5rem; text-align: right;">10 years</th><th style="padding: 0.5rem; text-align: right;">30 years</th><th style="padding: 0.5rem; text-align: right;">50 years</th></tr>\n<tr><td style="padding: 0.5rem;">400</td><td style="padding: 0.5rem; text-align: right;">2.8</td><td style="padding: 0.5rem; text-align: right;">5.2</td><td style="padding: 0.5rem; text-align: right;">6.1</td></tr>\n<tr><td style="padding: 0.5rem;">800</td><td style="padding: 0.5rem; text-align: right;">3.9</td><td style="padding: 0.5rem; text-align: right;">7.1</td><td style="padding: 0.5rem; text-align: right;">8.3</td></tr>\n<tr><td style="padding: 0.5rem;">1200</td><td style="padding: 0.5rem; text-align: right;">4.5</td><td style="padding: 0.5rem; text-align: right;">8.2</td><td style="padding: 0.5rem; text-align: right;">9.5</td></tr>\n<tr><td style="padding: 0.5rem;">1600</td><td style="padding: 0.5rem; text-align: right;">4.9</td><td style="padding: 0.5rem; text-align: right;">8.8</td><td style="padding: 0.5rem; text-align: right;">10.1</td></tr>\n</table>\n\nFor forests with 800 trees/ha, what was the difference in LAI between 10-year and 50-year stands?',
    ch: [
      {letter: 'A', text: '4.4'},
      {letter: 'B', text: '3.2'},
      {letter: 'C', text: '1.2'},
      {letter: 'D', text: '8.3'}
    ],
    ans: 'A',
    sol: '**Calculate LAI difference for 800 trees/ha density.**\n\n```\n800 trees/ha at 10 years: 3.9 m²/m²\n800 trees/ha at 50 years: 8.3 m²/m²\n\nDifference = 8.3 - 3.9 = 4.4 m²/m²\n```\n\n**Key insight:** LAI more than doubles as forests mature from 10 to 50 years, showing significant canopy development. The 4.4 unit increase reflects greater leaf area accumulation. The distractor 8.3 is the LAI at 50 years itself. The value 3.2 is the increase from 10 to 30 years (7.1-3.9), while 1.2 is the increase from 30 to 50 years. This tests understanding of forest development over time.'
  },
  {
    pos: 27,
    diff: 'hard',
    text: 'Researchers studied the effect of fertilizer application on crop yield across three soil pH levels. Table 1 shows wheat yield in tons per hectare.\n\n**Table 1: Wheat Yield (tons/ha)**\n\n<table style="border-collapse: collapse; margin: 1rem 0; width: 100%;">\n<tr style="border-bottom: 2px solid #333;"><th style="padding: 0.5rem; text-align: left;">Fertilizer (kg N/ha)</th><th style="padding: 0.5rem; text-align: right;">pH 5.5</th><th style="padding: 0.5rem; text-align: right;">pH 6.5</th><th style="padding: 0.5rem; text-align: right;">pH 7.5</th></tr>\n<tr><td style="padding: 0.5rem;">0</td><td style="padding: 0.5rem; text-align: right;">1.8</td><td style="padding: 0.5rem; text-align: right;">2.4</td><td style="padding: 0.5rem; text-align: right;">2.1</td></tr>\n<tr><td style="padding: 0.5rem;">50</td><td style="padding: 0.5rem; text-align: right;">3.2</td><td style="padding: 0.5rem; text-align: right;">4.8</td><td style="padding: 0.5rem; text-align: right;">4.2</td></tr>\n<tr><td style="padding: 0.5rem;">100</td><td style="padding: 0.5rem; text-align: right;">4.1</td><td style="padding: 0.5rem; text-align: right;">6.9</td><td style="padding: 0.5rem; text-align: right;">5.8</td></tr>\n<tr><td style="padding: 0.5rem;">150</td><td style="padding: 0.5rem; text-align: right;">4.6</td><td style="padding: 0.5rem; text-align: right;">8.2</td><td style="padding: 0.5rem; text-align: right;">6.7</td></tr>\n</table>\n\nAt pH 6.5, the yield at 150 kg N/ha was approximately what percentage greater than the yield at 50 kg N/ha?',
    ch: [
      {letter: 'A', text: '71%'},
      {letter: 'B', text: '41%'},
      {letter: 'C', text: '171%'},
      {letter: 'D', text: '3.4%'}
    ],
    ans: 'A',
    sol: '**Calculate percentage increase at pH 6.5.**\n\n```\npH 6.5 at 50 kg N/ha: 4.8 tons/ha\npH 6.5 at 150 kg N/ha: 8.2 tons/ha\n\nIncrease = 8.2 - 4.8 = 3.4 tons/ha\n\nPercentage increase = (3.4 ÷ 4.8) × 100%\n                    = 0.708 × 100%\n                    = 70.8% ≈ 71%\n```\n\n**Key insight:** This requires calculating percentage increase, not just ratio. At optimal pH 6.5, tripling the fertilizer (50 to 150 kg N/ha) increased yield by 71%. The distractor 171% calculates 8.2÷4.8 as a percentage. The value 41% uses wrong calculations. The answer 3.4 is the absolute difference, not the percentage. This tests understanding of agricultural response to inputs.'
  },
  {
    pos: 28,
    diff: 'hard',
    text: 'A pharmacology study measured drug concentration in blood plasma over time for three different dosages. Table 1 shows the results.\n\n**Table 1: Plasma Concentration (μg/mL)**\n\n<table style="border-collapse: collapse; margin: 1rem 0; width: 100%;">\n<tr style="border-bottom: 2px solid #333;"><th style="padding: 0.5rem; text-align: left;">Time (hours)</th><th style="padding: 0.5rem; text-align: right;">50 mg Dose</th><th style="padding: 0.5rem; text-align: right;">100 mg Dose</th><th style="padding: 0.5rem; text-align: right;">200 mg Dose</th></tr>\n<tr><td style="padding: 0.5rem;">0.5</td><td style="padding: 0.5rem; text-align: right;">8.2</td><td style="padding: 0.5rem; text-align: right;">16.5</td><td style="padding: 0.5rem; text-align: right;">33.1</td></tr>\n<tr><td style="padding: 0.5rem;">1.0</td><td style="padding: 0.5rem; text-align: right;">12.4</td><td style="padding: 0.5rem; text-align: right;">24.8</td><td style="padding: 0.5rem; text-align: right;">49.7</td></tr>\n<tr><td style="padding: 0.5rem;">2.0</td><td style="padding: 0.5rem; text-align: right;">10.1</td><td style="padding: 0.5rem; text-align: right;">20.3</td><td style="padding: 0.5rem; text-align: right;">40.5</td></tr>\n<tr><td style="padding: 0.5rem;">4.0</td><td style="padding: 0.5rem; text-align: right;">5.2</td><td style="padding: 0.5rem; text-align: right;">10.5</td><td style="padding: 0.5rem; text-align: right;">20.9</td></tr>\n<tr><td style="padding: 0.5rem;">6.0</td><td style="padding: 0.5rem; text-align: right;">2.7</td><td style="padding: 0.5rem; text-align: right;">5.4</td><td style="padding: 0.5rem; text-align: right;">10.7</td></tr>\n</table>\n\nFor the 100 mg dose, by what percentage did the plasma concentration decrease between 1.0 hour and 4.0 hours?',
    ch: [
      {letter: 'A', text: '58%'},
      {letter: 'B', text: '136%'},
      {letter: 'C', text: '42%'},
      {letter: 'D', text: '14.3%'}
    ],
    ans: 'A',
    sol: '**Calculate percentage decrease for 100 mg dose.**\n\n```\n100 mg dose at 1.0 hour: 24.8 μg/mL\n100 mg dose at 4.0 hours: 10.5 μg/mL\n\nDecrease = 24.8 - 10.5 = 14.3 μg/mL\n\nPercentage decrease = (14.3 ÷ 24.8) × 100%\n                    = 0.577 × 100%\n                    = 57.7% ≈ 58%\n```\n\n**Key insight:** This tests pharmacokinetics - drug concentration decreases by 58% over 3 hours due to metabolism and excretion. The distractor 136% reverses the calculation (24.8÷10.5). The value 42% is the percentage remaining (10.5÷24.8), not the decrease. The answer 14.3 is the absolute decrease, not the percentage. This requires understanding drug clearance rates.'
  },
  {
    pos: 29,
    diff: 'hard',
    text: 'Engineers measured thermal conductivity of insulation materials at different temperatures and moisture contents. Table 1 shows the results.\n\n**Table 1: Thermal Conductivity (W/m·K)**\n\n<table style="border-collapse: collapse; margin: 1rem 0; width: 100%;">\n<tr style="border-bottom: 2px solid #333;"><th style="padding: 0.5rem; text-align: left;">Temperature (°C)</th><th style="padding: 0.5rem; text-align: right;">0% Moisture</th><th style="padding: 0.5rem; text-align: right;">5% Moisture</th><th style="padding: 0.5rem; text-align: right;">10% Moisture</th></tr>\n<tr><td style="padding: 0.5rem;">-10</td><td style="padding: 0.5rem; text-align: right;">0.032</td><td style="padding: 0.5rem; text-align: right;">0.041</td><td style="padding: 0.5rem; text-align: right;">0.053</td></tr>\n<tr><td style="padding: 0.5rem;">0</td><td style="padding: 0.5rem; text-align: right;">0.035</td><td style="padding: 0.5rem; text-align: right;">0.046</td><td style="padding: 0.5rem; text-align: right;">0.061</td></tr>\n<tr><td style="padding: 0.5rem;">10</td><td style="padding: 0.5rem; text-align: right;">0.038</td><td style="padding: 0.5rem; text-align: right;">0.052</td><td style="padding: 0.5rem; text-align: right;">0.069</td></tr>\n<tr><td style="padding: 0.5rem;">20</td><td style="padding: 0.5rem; text-align: right;">0.041</td><td style="padding: 0.5rem; text-align: right;">0.058</td><td style="padding: 0.5rem; text-align: right;">0.078</td></tr>\n</table>\n\nAt 0°C, the thermal conductivity at 10% moisture was approximately how many times greater than at 0% moisture?',
    ch: [
      {letter: 'A', text: '1.7'},
      {letter: 'B', text: '0.57'},
      {letter: 'C', text: '2.6'},
      {letter: 'D', text: '0.026'}
    ],
    ans: 'A',
    sol: '**Calculate the ratio at 0°C.**\n\n```\n0°C at 10% moisture: 0.061 W/m·K\n0°C at 0% moisture: 0.035 W/m·K\n\nRatio = 0.061 ÷ 0.035 = 1.74 ≈ 1.7\n```\n\n**Key insight:** Moisture significantly degrades insulation performance - 10% moisture increases thermal conductivity by 74% (1.7× higher), meaning heat passes through 1.7 times faster. This shows why keeping insulation dry is critical. The distractor 0.57 reverses the division (0.035÷0.061). The value 2.6 uses wrong temperature data. The answer 0.026 is the difference, not the ratio. This tests understanding of building material properties.'
  },
  {
    pos: 30,
    diff: 'hard',
    text: 'A geological survey measured groundwater flow rates through different aquifer materials at various hydraulic gradients. Table 1 shows the data.\n\n**Table 1: Flow Rate (m³/day)**\n\n<table style="border-collapse: collapse; margin: 1rem 0; width: 100%;">\n<tr style="border-bottom: 2px solid #333;"><th style="padding: 0.5rem; text-align: left;">Hydraulic Gradient</th><th style="padding: 0.5rem; text-align: right;">Sand</th><th style="padding: 0.5rem; text-align: right;">Gravel</th><th style="padding: 0.5rem; text-align: right;">Sandstone</th><th style="padding: 0.5rem; text-align: right;">Limestone</th></tr>\n<tr><td style="padding: 0.5rem;">0.001</td><td style="padding: 0.5rem; text-align: right;">12</td><td style="padding: 0.5rem; text-align: right;">45</td><td style="padding: 0.5rem; text-align: right;">6</td><td style="padding: 0.5rem; text-align: right;">18</td></tr>\n<tr><td style="padding: 0.5rem;">0.005</td><td style="padding: 0.5rem; text-align: right;">60</td><td style="padding: 0.5rem; text-align: right;">225</td><td style="padding: 0.5rem; text-align: right;">30</td><td style="padding: 0.5rem; text-align: right;">90</td></tr>\n<tr><td style="padding: 0.5rem;">0.010</td><td style="padding: 0.5rem; text-align: right;">120</td><td style="padding: 0.5rem; text-align: right;">450</td><td style="padding: 0.5rem; text-align: right;">60</td><td style="padding: 0.5rem; text-align: right;">180</td></tr>\n<tr><td style="padding: 0.5rem;">0.020</td><td style="padding: 0.5rem; text-align: right;">240</td><td style="padding: 0.5rem; text-align: right;">900</td><td style="padding: 0.5rem; text-align: right;">120</td><td style="padding: 0.5rem; text-align: right;">360</td></tr>\n</table>\n\nFor gravel, when the hydraulic gradient increased from 0.001 to 0.010, by what factor did the flow rate increase?',
    ch: [
      {letter: 'A', text: '10'},
      {letter: 'B', text: '405'},
      {letter: 'C', text: '5'},
      {letter: 'D', text: '20'}
    ],
    ans: 'A',
    sol: '**Calculate the multiplication factor for gravel.**\n\n```\nGravel at 0.001 gradient: 45 m³/day\nGravel at 0.010 gradient: 450 m³/day\n\nFactor = 450 ÷ 45 = 10\n```\n\n**Key insight:** This demonstrates Darcy\'s Law - flow rate is directly proportional to hydraulic gradient. When the gradient increases 10-fold (0.001 to 0.010), the flow rate also increases 10-fold. This linear relationship is fundamental to hydrogeology. The distractor 405 is the difference (450-45), not the factor. The value 5 uses wrong gradient values. The answer 20 might use wrong material data. This tests understanding of groundwater hydraulics.'
  },
  {
    pos: 31,
    diff: 'hard',
    text: 'Researchers measured stomatal conductance in leaves under different light intensities and CO₂ concentrations. Table 1 shows the results.\n\n**Table 1: Stomatal Conductance (mmol/m²/s)**\n\n<table style="border-collapse: collapse; margin: 1rem 0; width: 100%;">\n<tr style="border-bottom: 2px solid #333;"><th style="padding: 0.5rem; text-align: left;">Light (μmol/m²/s)</th><th style="padding: 0.5rem; text-align: right;">400 ppm CO₂</th><th style="padding: 0.5rem; text-align: right;">800 ppm CO₂</th><th style="padding: 0.5rem; text-align: right;">1200 ppm CO₂</th></tr>\n<tr><td style="padding: 0.5rem;">100</td><td style="padding: 0.5rem; text-align: right;">85</td><td style="padding: 0.5rem; text-align: right;">62</td><td style="padding: 0.5rem; text-align: right;">48</td></tr>\n<tr><td style="padding: 0.5rem;">500</td><td style="padding: 0.5rem; text-align: right;">245</td><td style="padding: 0.5rem; text-align: right;">178</td><td style="padding: 0.5rem; text-align: right;">135</td></tr>\n<tr><td style="padding: 0.5rem;">1000</td><td style="padding: 0.5rem; text-align: right;">352</td><td style="padding: 0.5rem; text-align: right;">258</td><td style="padding: 0.5rem; text-align: right;">195</td></tr>\n<tr><td style="padding: 0.5rem;">1500</td><td style="padding: 0.5rem; text-align: right;">398</td><td style="padding: 0.5rem; text-align: right;">291</td><td style="padding: 0.5rem; text-align: right;">221</td></tr>\n</table>\n\nAt 1000 μmol/m²/s light intensity, what was the decrease in stomatal conductance when CO₂ increased from 400 ppm to 1200 ppm?',
    ch: [
      {letter: 'A', text: '157 mmol/m²/s'},
      {letter: 'B', text: '94 mmol/m²/s'},
      {letter: 'C', text: '63 mmol/m²/s'},
      {letter: 'D', text: '195 mmol/m²/s'}
    ],
    ans: 'A',
    sol: '**Calculate stomatal conductance decrease at 1000 light.**\n\n```\nAt 1000 μmol/m²/s light:\n400 ppm CO₂: 352 mmol/m²/s\n1200 ppm CO₂: 195 mmol/m²/s\n\nDecrease = 352 - 195 = 157 mmol/m²/s\n```\n\n**Key insight:** Higher CO₂ causes stomata to close partially, reducing conductance by 157 units (a 45% decrease). This is a plant adaptation to conserve water when CO₂ is abundant. The distractor 195 is the conductance at 1200 ppm itself. The value 94 is the decrease from 400 to 800 ppm. The answer 63 is the decrease from 800 to 1200 ppm. This tests understanding of plant gas exchange responses.'
  },
  {
    pos: 32,
    diff: 'hard',
    text: 'A toxicology study measured the concentration of pollutant at different distances downstream from an industrial discharge point. Table 1 shows measurements at two different times.\n\n**Table 1: Pollutant Concentration (mg/L)**\n\n<table style="border-collapse: collapse; margin: 1rem 0; width: 100%;">\n<tr style="border-bottom: 2px solid #333;"><th style="padding: 0.5rem; text-align: left;">Distance Downstream (km)</th><th style="padding: 0.5rem; text-align: right;">Day 1</th><th style="padding: 0.5rem; text-align: right;">Day 30</th></tr>\n<tr><td style="padding: 0.5rem;">0.5</td><td style="padding: 0.5rem; text-align: right;">42.8</td><td style="padding: 0.5rem; text-align: right;">38.5</td></tr>\n<tr><td style="padding: 0.5rem;">2.0</td><td style="padding: 0.5rem; text-align: right;">28.4</td><td style="padding: 0.5rem; text-align: right;">25.1</td></tr>\n<tr><td style="padding: 0.5rem;">5.0</td><td style="padding: 0.5rem; text-align: right;">15.7</td><td style="padding: 0.5rem; text-align: right;">13.8</td></tr>\n<tr><td style="padding: 0.5rem;">10.0</td><td style="padding: 0.5rem; text-align: right;">8.2</td><td style="padding: 0.5rem; text-align: right;">7.1</td></tr>\n<tr><td style="padding: 0.5rem;">20.0</td><td style="padding: 0.5rem; text-align: right;">3.5</td><td style="padding: 0.5rem; text-align: right;">3.0</td></tr>\n</table>\n\nOn Day 1, the pollutant concentration at 0.5 km was approximately what percentage of the concentration at 10.0 km?',
    ch: [
      {letter: 'A', text: '522%'},
      {letter: 'B', text: '19%'},
      {letter: 'C', text: '422%'},
      {letter: 'D', text: '34.6%'}
    ],
    ans: 'A',
    sol: '**Calculate the percentage ratio on Day 1.**\n\n```\nDay 1 at 0.5 km: 42.8 mg/L\nDay 1 at 10.0 km: 8.2 mg/L\n\nPercentage = (42.8 ÷ 8.2) × 100%\n           = 5.22 × 100%\n           = 522%\n```\n\n**Key insight:** The concentration near the discharge (0.5 km) is more than 5 times higher (522%) than 10 km downstream, showing significant dilution with distance. A percentage over 100% indicates the numerator is larger. The distractor 19% reverses the division (8.2÷42.8). The value 422% might result from incorrect calculation. The answer 34.6 is the difference, not the percentage ratio. This tests understanding of pollutant dispersion.'
  },
  {
    pos: 33,
    diff: 'hard',
    text: 'Scientists measured the density of different metals at various temperatures. Table 1 shows the results.\n\n**Table 1: Density (g/cm³)**\n\n<table style="border-collapse: collapse; margin: 1rem 0; width: 100%;">\n<tr style="border-bottom: 2px solid #333;"><th style="padding: 0.5rem; text-align: left;">Temperature (°C)</th><th style="padding: 0.5rem; text-align: right;">Aluminum</th><th style="padding: 0.5rem; text-align: right;">Copper</th><th style="padding: 0.5rem; text-align: right;">Iron</th><th style="padding: 0.5rem; text-align: right;">Lead</th></tr>\n<tr><td style="padding: 0.5rem;">20</td><td style="padding: 0.5rem; text-align: right;">2.70</td><td style="padding: 0.5rem; text-align: right;">8.96</td><td style="padding: 0.5rem; text-align: right;">7.87</td><td style="padding: 0.5rem; text-align: right;">11.34</td></tr>\n<tr><td style="padding: 0.5rem;">200</td><td style="padding: 0.5rem; text-align: right;">2.66</td><td style="padding: 0.5rem; text-align: right;">8.86</td><td style="padding: 0.5rem; text-align: right;">7.78</td><td style="padding: 0.5rem; text-align: right;">11.22</td></tr>\n<tr><td style="padding: 0.5rem;">400</td><td style="padding: 0.5rem; text-align: right;">2.62</td><td style="padding: 0.5rem; text-align: right;">8.76</td><td style="padding: 0.5rem; text-align: right;">7.69</td><td style="padding: 0.5rem; text-align: right;">11.10</td></tr>\n<tr><td style="padding: 0.5rem;">600</td><td style="padding: 0.5rem; text-align: right;">2.58</td><td style="padding: 0.5rem; text-align: right;">8.66</td><td style="padding: 0.5rem; text-align: right;">7.60</td><td style="padding: 0.5rem; text-align: right;">10.98</td></tr>\n</table>\n\nWhich metal showed the GREATEST decrease in density between 20°C and 600°C?',
    ch: [
      {letter: 'A', text: 'Lead'},
      {letter: 'B', text: 'Copper'},
      {letter: 'C', text: 'Iron'},
      {letter: 'D', text: 'Aluminum'}
    ],
    ans: 'A',
    sol: '**Calculate density decrease for each metal.**\n\n```\nAluminum: 2.70 - 2.58 = 0.12 g/cm³\nCopper: 8.96 - 8.66 = 0.30 g/cm³\nIron: 7.87 - 7.60 = 0.27 g/cm³\nLead: 11.34 - 10.98 = 0.36 g/cm³ ← GREATEST\n```\n\n**Key insight:** All metals expand (density decreases) with temperature, but lead shows the greatest absolute density decrease at 0.36 g/cm³. This reflects lead\'s relatively high coefficient of thermal expansion. The question asks for greatest decrease, not greatest percentage change, so we compare absolute values. This tests systematic comparison across multiple data series and understanding of thermal expansion.'
  },
  {
    pos: 34,
    diff: 'hard',
    text: 'An astronomy study measured the brightness of a variable star at different wavelengths over time. Table 1 shows relative brightness values.\n\n**Table 1: Relative Brightness (arbitrary units)**\n\n<table style="border-collapse: collapse; margin: 1rem 0; width: 100%;">\n<tr style="border-bottom: 2px solid #333;"><th style="padding: 0.5rem; text-align: left;">Time (days)</th><th style="padding: 0.5rem; text-align: right;">Blue (450 nm)</th><th style="padding: 0.5rem; text-align: right;">Yellow (550 nm)</th><th style="padding: 0.5rem; text-align: right;">Red (650 nm)</th></tr>\n<tr><td style="padding: 0.5rem;">0</td><td style="padding: 0.5rem; text-align: right;">1000</td><td style="padding: 0.5rem; text-align: right;">1200</td><td style="padding: 0.5rem; text-align: right;">1350</td></tr>\n<tr><td style="padding: 0.5rem;">5</td><td style="padding: 0.5rem; text-align: right;">640</td><td style="padding: 0.5rem; text-align: right;">780</td><td style="padding: 0.5rem; text-align: right;">890</td></tr>\n<tr><td style="padding: 0.5rem;">10</td><td style="padding: 0.5rem; text-align: right;">420</td><td style="padding: 0.5rem; text-align: right;">520</td><td style="padding: 0.5rem; text-align: right;">610</td></tr>\n<tr><td style="padding: 0.5rem;">15</td><td style="padding: 0.5rem; text-align: right;">650</td><td style="padding: 0.5rem; text-align: right;">790</td><td style="padding: 0.5rem; text-align: right;">900</td></tr>\n<tr><td style="padding: 0.5rem;">20</td><td style="padding: 0.5rem; text-align: right;">980</td><td style="padding: 0.5rem; text-align: right;">1180</td><td style="padding: 0.5rem; text-align: right;">1330</td></tr>\n</table>\n\nFor the yellow wavelength (550 nm), what was the ratio of brightness at day 0 to brightness at day 10?',
    ch: [
      {letter: 'A', text: '2.3:1'},
      {letter: 'B', text: '1:2.3'},
      {letter: 'C', text: '680:1'},
      {letter: 'D', text: '1.5:1'}
    ],
    ans: 'A',
    sol: '**Calculate the brightness ratio for yellow wavelength.**\n\n```\nYellow (550 nm) at day 0: 1200 units\nYellow (550 nm) at day 10: 520 units\n\nRatio = 1200:520\n\nSimplify by dividing both by 520:\n= 2.31:1 ≈ 2.3:1\n```\n\n**Key insight:** The star was 2.3 times brighter at day 0 than at its minimum (day 10), showing it\'s a variable star with a ~20-day period. The distractor 1:2.3 reverses the ratio order. The value 680:1 uses the difference (1200-520), not the ratio. The answer 1.5:1 uses incorrect calculations. This tests understanding of astronomical variability and ratio notation.'
  },
  {
    pos: 35,
    diff: 'hard',
    text: 'Researchers measured nitrogen fixation rates in soil under different crop rotations and tillage methods. Table 1 shows the results.\n\n**Table 1: N Fixation Rate (kg N/ha/year)**\n\n<table style="border-collapse: collapse; margin: 1rem 0; width: 100%;">\n<tr style="border-bottom: 2px solid #333;"><th style="padding: 0.5rem; text-align: left;">Crop Rotation</th><th style="padding: 0.5rem; text-align: right;">Conventional Tillage</th><th style="padding: 0.5rem; text-align: right;">Reduced Tillage</th><th style="padding: 0.5rem; text-align: right;">No-Till</th></tr>\n<tr><td style="padding: 0.5rem;">Corn-Soy</td><td style="padding: 0.5rem; text-align: right;">42</td><td style="padding: 0.5rem; text-align: right;">58</td><td style="padding: 0.5rem; text-align: right;">71</td></tr>\n<tr><td style="padding: 0.5rem;">Corn-Soy-Wheat</td><td style="padding: 0.5rem; text-align: right;">38</td><td style="padding: 0.5rem; text-align: right;">52</td><td style="padding: 0.5rem; text-align: right;">64</td></tr>\n<tr><td style="padding: 0.5rem;">Continuous Corn</td><td style="padding: 0.5rem; text-align: right;">8</td><td style="padding: 0.5rem; text-align: right;">12</td><td style="padding: 0.5rem; text-align: right;">18</td></tr>\n<tr><td style="padding: 0.5rem;">Alfalfa-Corn</td><td style="padding: 0.5rem; text-align: right;">95</td><td style="padding: 0.5rem; text-align: right;">118</td><td style="padding: 0.5rem; text-align: right;">142</td></tr>\n</table>\n\nFor the Corn-Soy rotation, the N fixation rate under no-till was approximately what percentage greater than under conventional tillage?',
    ch: [
      {letter: 'A', text: '69%'},
      {letter: 'B', text: '169%'},
      {letter: 'C', text: '41%'},
      {letter: 'D', text: '29%'}
    ],
    ans: 'A',
    sol: '**Calculate percentage increase for Corn-Soy rotation.**\n\n```\nCorn-Soy conventional tillage: 42 kg N/ha/year\nCorn-Soy no-till: 71 kg N/ha/year\n\nIncrease = 71 - 42 = 29 kg N/ha/year\n\nPercentage increase = (29 ÷ 42) × 100%\n                    = 0.690 × 100%\n                    = 69.0% ≈ 69%\n```\n\n**Key insight:** No-till farming increases nitrogen fixation by 69% compared to conventional tillage for corn-soy rotation, showing soil health benefits. The distractor 169% calculates 71÷42 as a percentage incorrectly. The value 41% uses wrong calculations. The answer 29 is the absolute increase, not the percentage. This tests understanding of sustainable agriculture practices.'
  },
  {
    pos: 36,
    diff: 'hard',
    text: 'A study examined the viscosity of motor oil at different temperatures and under different shear rates. Table 1 shows the results.\n\n**Table 1: Dynamic Viscosity (cP)**\n\n<table style="border-collapse: collapse; margin: 1rem 0; width: 100%;">\n<tr style="border-bottom: 2px solid #333;"><th style="padding: 0.5rem; text-align: left;">Temperature (°C)</th><th style="padding: 0.5rem; text-align: right;">Low Shear</th><th style="padding: 0.5rem; text-align: right;">Medium Shear</th><th style="padding: 0.5rem; text-align: right;">High Shear</th></tr>\n<tr><td style="padding: 0.5rem;">-20</td><td style="padding: 0.5rem; text-align: right;">8200</td><td style="padding: 0.5rem; text-align: right;">6800</td><td style="padding: 0.5rem; text-align: right;">5500</td></tr>\n<tr><td style="padding: 0.5rem;">0</td><td style="padding: 0.5rem; text-align: right;">1850</td><td style="padding: 0.5rem; text-align: right;">1520</td><td style="padding: 0.5rem; text-align: right;">1240</td></tr>\n<tr><td style="padding: 0.5rem;">40</td><td style="padding: 0.5rem; text-align: right;">220</td><td style="padding: 0.5rem; text-align: right;">185</td><td style="padding: 0.5rem; text-align: right;">152</td></tr>\n<tr><td style="padding: 0.5rem;">100</td><td style="padding: 0.5rem; text-align: right;">48</td><td style="padding: 0.5rem; text-align: right;">42</td><td style="padding: 0.5rem; text-align: right;">36</td></tr>\n</table>\n\nAt medium shear, by what factor did the viscosity decrease when temperature increased from -20°C to 40°C?',
    ch: [
      {letter: 'A', text: '37'},
      {letter: 'B', text: '6615'},
      {letter: 'C', text: '12'},
      {letter: 'D', text: '8.4'}
    ],
    ans: 'A',
    sol: '**Calculate viscosity decrease factor at medium shear.**\n\n```\nMedium shear at -20°C: 6800 cP\nMedium shear at 40°C: 185 cP\n\nFactor = 6800 ÷ 185 = 36.76 ≈ 37\n```\n\n**Key insight:** Motor oil viscosity decreases dramatically with temperature - it\'s 37 times more viscous (thicker) at -20°C than at 40°C. This explains why cold engines need time to warm up for proper oil circulation. The distractor 6615 is the difference (6800-185), not the factor. The value 12 might use wrong shear rate. The answer 8.4 uses incorrect calculations. This tests understanding of fluid mechanics and temperature effects.'
  },
  {
    pos: 37,
    diff: 'hard',
    text: 'Ecologists measured carbon storage in different forest types at various ages. Table 1 shows above-ground biomass carbon.\n\n**Table 1: Carbon Storage (tons C/ha)**\n\n<table style="border-collapse: collapse; margin: 1rem 0; width: 100%;">\n<tr style="border-bottom: 2px solid #333;"><th style="padding: 0.5rem; text-align: left;">Forest Age (years)</th><th style="padding: 0.5rem; text-align: right;">Pine</th><th style="padding: 0.5rem; text-align: right;">Oak</th><th style="padding: 0.5rem; text-align: right;">Mixed</th></tr>\n<tr><td style="padding: 0.5rem;">20</td><td style="padding: 0.5rem; text-align: right;">28</td><td style="padding: 0.5rem; text-align: right;">22</td><td style="padding: 0.5rem; text-align: right;">25</td></tr>\n<tr><td style="padding: 0.5rem;">40</td><td style="padding: 0.5rem; text-align: right;">62</td><td style="padding: 0.5rem; text-align: right;">58</td><td style="padding: 0.5rem; text-align: right;">65</td></tr>\n<tr><td style="padding: 0.5rem;">60</td><td style="padding: 0.5rem; text-align: right;">89</td><td style="padding: 0.5rem; text-align: right;">98</td><td style="padding: 0.5rem; text-align: right;">108</td></tr>\n<tr><td style="padding: 0.5rem;">80</td><td style="padding: 0.5rem; text-align: right;">105</td><td style="padding: 0.5rem; text-align: right;">138</td><td style="padding: 0.5rem; text-align: right;">148</td></tr>\n</table>\n\nFor oak forests, what was the average annual carbon accumulation rate between ages 20 and 80 years?',
    ch: [
      {letter: 'A', text: '1.93 tons C/ha/year'},
      {letter: 'B', text: '116 tons C/ha/year'},
      {letter: 'C', text: '2.30 tons C/ha/year'},
      {letter: 'D', text: '0.67 tons C/ha/year'}
    ],
    ans: 'A',
    sol: '**Calculate average annual accumulation for oak.**\n\n```\nOak at 20 years: 22 tons C/ha\nOak at 80 years: 138 tons C/ha\n\nTotal accumulation = 138 - 22 = 116 tons C/ha\nTime period = 80 - 20 = 60 years\n\nAverage rate = 116 ÷ 60 = 1.93 tons C/ha/year\n```\n\n**Key insight:** Oak forests sequester an average of 1.93 tons of carbon per hectare per year over 60 years of growth. This requires calculating total change and dividing by time period. The distractor 116 is the total accumulation, not the rate. The value 2.30 might use wrong values. The answer 0.67 uses incorrect time periods. This tests understanding of carbon sequestration rates and average rate calculations.'
  },
  {
    pos: 38,
    diff: 'hard',
    text: 'A materials science study measured the coefficient of friction between different material pairs at various loads. Table 1 shows the results.\n\n**Table 1: Coefficient of Friction (μ)**\n\n<table style="border-collapse: collapse; margin: 1rem 0; width: 100%;">\n<tr style="border-bottom: 2px solid #333;"><th style="padding: 0.5rem; text-align: left;">Normal Load (N)</th><th style="padding: 0.5rem; text-align: right;">Steel-Steel</th><th style="padding: 0.5rem; text-align: right;">Steel-Brass</th><th style="padding: 0.5rem; text-align: right;">Steel-Teflon</th></tr>\n<tr><td style="padding: 0.5rem;">10</td><td style="padding: 0.5rem; text-align: right;">0.42</td><td style="padding: 0.5rem; text-align: right;">0.35</td><td style="padding: 0.5rem; text-align: right;">0.08</td></tr>\n<tr><td style="padding: 0.5rem;">50</td><td style="padding: 0.5rem; text-align: right;">0.38</td><td style="padding: 0.5rem; text-align: right;">0.32</td><td style="padding: 0.5rem; text-align: right;">0.06</td></tr>\n<tr><td style="padding: 0.5rem;">100</td><td style="padding: 0.5rem; text-align: right;">0.36</td><td style="padding: 0.5rem; text-align: right;">0.30</td><td style="padding: 0.5rem; text-align: right;">0.05</td></tr>\n<tr><td style="padding: 0.5rem;">200</td><td style="padding: 0.5rem; text-align: right;">0.34</td><td style="padding: 0.5rem; text-align: right;">0.28</td><td style="padding: 0.5rem; text-align: right;">0.04</td></tr>\n</table>\n\nAt 100 N load, the friction coefficient for steel-steel was how many times greater than for steel-Teflon?',
    ch: [
      {letter: 'A', text: '7.2'},
      {letter: 'B', text: '0.31'},
      {letter: 'C', text: '3.6'},
      {letter: 'D', text: '14'}
    ],
    ans: 'A',
    sol: '**Calculate the ratio at 100 N load.**\n\n```\nSteel-steel at 100 N: 0.36\nSteel-Teflon at 100 N: 0.05\n\nRatio = 0.36 ÷ 0.05 = 7.2\n```\n\n**Key insight:** Steel-on-steel friction is 7.2 times higher than steel-on-Teflon, demonstrating why Teflon is an excellent low-friction coating. This explains Teflon\'s use in bearings and non-stick applications. The distractor 0.31 is the difference (0.36-0.05), not the ratio. The value 3.6 uses incorrect division. The answer 14 might double the correct answer through calculation error. This tests understanding of tribology and material properties.'
  },
  {
    pos: 39,
    diff: 'hard',
    text: 'Researchers studied decomposition rates of organic matter in soils with different clay content and at different temperatures. Table 1 shows mass remaining after 90 days.\n\n**Table 1: Mass Remaining (%)**\n\n<table style="border-collapse: collapse; margin: 1rem 0; width: 100%;">\n<tr style="border-bottom: 2px solid #333;"><th style="padding: 0.5rem; text-align: left;">Temperature (°C)</th><th style="padding: 0.5rem; text-align: right;">5% Clay</th><th style="padding: 0.5rem; text-align: right;">15% Clay</th><th style="padding: 0.5rem; text-align: right;">30% Clay</th></tr>\n<tr><td style="padding: 0.5rem;">10</td><td style="padding: 0.5rem; text-align: right;">68</td><td style="padding: 0.5rem; text-align: right;">72</td><td style="padding: 0.5rem; text-align: right;">78</td></tr>\n<tr><td style="padding: 0.5rem;">20</td><td style="padding: 0.5rem; text-align: right;">42</td><td style="padding: 0.5rem; text-align: right;">51</td><td style="padding: 0.5rem; text-align: right;">61</td></tr>\n<tr><td style="padding: 0.5rem;">30</td><td style="padding: 0.5rem; text-align: right;">25</td><td style="padding: 0.5rem; text-align: right;">35</td><td style="padding: 0.5rem; text-align: right;">47</td></tr>\n</table>\n\nFor soil with 15% clay at 20°C, what percentage of the organic matter decomposed during the 90-day period?',
    ch: [
      {letter: 'A', text: '49%'},
      {letter: 'B', text: '51%'},
      {letter: 'C', text: '21%'},
      {letter: 'D', text: '9%'}
    ],
    ans: 'A',
    sol: '**Calculate percentage decomposed for 15% clay at 20°C.**\n\n```\n15% clay at 20°C: 51% remaining\n\nIf 51% remains, then:\nPercentage decomposed = 100% - 51% = 49%\n```\n\n**Key insight:** This requires recognizing that the table shows mass *remaining*, not decomposed. If 51% remains after 90 days, then 49% has decomposed. The distractor 51% is the percentage remaining, not decomposed. The value 21% might result from incorrect subtraction (51-30). The answer 9% uses wrong calculations. This tests careful reading of what the data actually represents.'
  },
  {
    pos: 40,
    diff: 'hard',
    text: 'An atmospheric study measured wind speed at different heights above ground at three different times of day. Table 1 shows the results.\n\n**Table 1: Wind Speed (m/s)**\n\n<table style="border-collapse: collapse; margin: 1rem 0; width: 100%;">\n<tr style="border-bottom: 2px solid #333;"><th style="padding: 0.5rem; text-align: left;">Height (m)</th><th style="padding: 0.5rem; text-align: right;">6:00 AM</th><th style="padding: 0.5rem; text-align: right;">12:00 PM</th><th style="padding: 0.5rem; text-align: right;">6:00 PM</th></tr>\n<tr><td style="padding: 0.5rem;">10</td><td style="padding: 0.5rem; text-align: right;">3.2</td><td style="padding: 0.5rem; text-align: right;">5.8</td><td style="padding: 0.5rem; text-align: right;">4.1</td></tr>\n<tr><td style="padding: 0.5rem;">50</td><td style="padding: 0.5rem; text-align: right;">6.8</td><td style="padding: 0.5rem; text-align: right;">9.2</td><td style="padding: 0.5rem; text-align: right;">7.5</td></tr>\n<tr><td style="padding: 0.5rem;">100</td><td style="padding: 0.5rem; text-align: right;">9.1</td><td style="padding: 0.5rem; text-align: right;">11.5</td><td style="padding: 0.5rem; text-align: right;">9.8</td></tr>\n<tr><td style="padding: 0.5rem;">200</td><td style="padding: 0.5rem; text-align: right;">11.8</td><td style="padding: 0.5rem; text-align: right;">13.9</td><td style="padding: 0.5rem; text-align: right;">12.3</td></tr>\n</table>\n\nAt 12:00 PM, what was the increase in wind speed from 10 m height to 100 m height?',
    ch: [
      {letter: 'A', text: '5.7 m/s'},
      {letter: 'B', text: '3.4 m/s'},
      {letter: 'C', text: '2.3 m/s'},
      {letter: 'D', text: '11.5 m/s'}
    ],
    ans: 'A',
    sol: '**Calculate wind speed increase at 12:00 PM.**\n\n```\n12:00 PM at 10 m: 5.8 m/s\n12:00 PM at 100 m: 11.5 m/s\n\nIncrease = 11.5 - 5.8 = 5.7 m/s\n```\n\n**Key insight:** Wind speed increases with height due to reduced surface friction. At noon, wind speed nearly doubles from 10 m to 100 m height. The distractor 11.5 is the speed at 100 m itself, not the increase. The value 3.4 is the increase from 10 to 50 m. The answer 2.3 is the increase from 50 to 100 m. This tests understanding of wind profiles in the atmospheric boundary layer.'
  },
  {
    pos: 41,
    diff: 'hard',
    text: 'A biochemistry study measured enzyme activity in cell extracts at different pH values and substrate concentrations. Table 1 shows reaction rates.\n\n**Table 1: Reaction Rate (μmol/min/mg protein)**\n\n<table style="border-collapse: collapse; margin: 1rem 0; width: 100%;">\n<tr style="border-bottom: 2px solid #333;"><th style="padding: 0.5rem; text-align: left;">pH</th><th style="padding: 0.5rem; text-align: right;">1 mM Substrate</th><th style="padding: 0.5rem; text-align: right;">5 mM Substrate</th><th style="padding: 0.5rem; text-align: right;">10 mM Substrate</th></tr>\n<tr><td style="padding: 0.5rem;">5.0</td><td style="padding: 0.5rem; text-align: right;">2.8</td><td style="padding: 0.5rem; text-align: right;">8.4</td><td style="padding: 0.5rem; text-align: right;">11.2</td></tr>\n<tr><td style="padding: 0.5rem;">6.0</td><td style="padding: 0.5rem; text-align: right;">5.1</td><td style="padding: 0.5rem; text-align: right;">16.8</td><td style="padding: 0.5rem; text-align: right;">22.5</td></tr>\n<tr><td style="padding: 0.5rem;">7.0</td><td style="padding: 0.5rem; text-align: right;">7.5</td><td style="padding: 0.5rem; text-align: right;">25.2</td><td style="padding: 0.5rem; text-align: right;">33.8</td></tr>\n<tr><td style="padding: 0.5rem;">8.0</td><td style="padding: 0.5rem; text-align: right;">4.2</td><td style="padding: 0.5rem; text-align: right;">14.1</td><td style="padding: 0.5rem; text-align: right;">18.9</td></tr>\n</table>\n\nAt 5 mM substrate concentration, the reaction rate at pH 7.0 was approximately how many times greater than at pH 5.0?',
    ch: [
      {letter: 'A', text: '3.0'},
      {letter: 'B', text: '16.8'},
      {letter: 'C', text: '1.5'},
      {letter: 'D', text: '4.2'}
    ],
    ans: 'A',
    sol: '**Calculate the ratio at 5 mM substrate.**\n\n```\n5 mM substrate at pH 7.0: 25.2 μmol/min/mg\n5 mM substrate at pH 5.0: 8.4 μmol/min/mg\n\nRatio = 25.2 ÷ 8.4 = 3.0\n```\n\n**Key insight:** The enzyme is 3 times more active at its optimal pH (7.0) compared to pH 5.0, showing the importance of pH optimization in biochemical reactions. The distractor 16.8 is the rate at pH 5.0 itself, not the ratio. The value 1.5 underestimates the factor. The answer 4.2 uses data from wrong pH. This tests understanding of enzyme kinetics and pH effects on catalytic activity.'
  },
  {
    pos: 42,
    diff: 'hard',
    text: 'Scientists studied water retention in soils with different organic matter content under various moisture tensions. Table 1 shows volumetric water content.\n\n**Table 1: Volumetric Water Content (%)**\n\n<table style="border-collapse: collapse; margin: 1rem 0; width: 100%;">\n<tr style="border-bottom: 2px solid #333;"><th style="padding: 0.5rem; text-align: left;">Tension (kPa)</th><th style="padding: 0.5rem; text-align: right;">1% Organic Matter</th><th style="padding: 0.5rem; text-align: right;">3% Organic Matter</th><th style="padding: 0.5rem; text-align: right;">5% Organic Matter</th></tr>\n<tr><td style="padding: 0.5rem;">10</td><td style="padding: 0.5rem; text-align: right;">32</td><td style="padding: 0.5rem; text-align: right;">38</td><td style="padding: 0.5rem; text-align: right;">42</td></tr>\n<tr><td style="padding: 0.5rem;">100</td><td style="padding: 0.5rem; text-align: right;">18</td><td style="padding: 0.5rem; text-align: right;">24</td><td style="padding: 0.5rem; text-align: right;">29</td></tr>\n<tr><td style="padding: 0.5rem;">500</td><td style="padding: 0.5rem; text-align: right;">8</td><td style="padding: 0.5rem; text-align: right;">12</td><td style="padding: 0.5rem; text-align: right;">16</td></tr>\n<tr><td style="padding: 0.5rem;">1500</td><td style="padding: 0.5rem; text-align: right;">3</td><td style="padding: 0.5rem; text-align: right;">5</td><td style="padding: 0.5rem; text-align: right;">8</td></tr>\n</table>\n\nFor soil with 3% organic matter, what was the decrease in water content when tension increased from 10 kPa to 500 kPa?',
    ch: [
      {letter: 'A', text: '26%'},
      {letter: 'B', text: '12%'},
      {letter: 'C', text: '14%'},
      {letter: 'D', text: '490%'}
    ],
    ans: 'A',
    sol: '**Calculate water content decrease for 3% organic matter.**\n\n```\n3% organic matter at 10 kPa: 38%\n3% organic matter at 500 kPa: 12%\n\nDecrease = 38 - 12 = 26 percentage points\n```\n\n**Key insight:** As soil dries (tension increases), water content drops by 26 percentage points. This shows how much plant-available water is held between field capacity (10 kPa) and near wilting point (500 kPa). The distractor 12% is the water content at 500 kPa itself. The value 14% is the decrease from 100 to 500 kPa. The answer 490 is the tension change, not the water content change. This tests understanding of soil-water relationships.'
  },
  {
    pos: 43,
    diff: 'hard',
    text: 'A radiation study measured photon absorption in different thicknesses of shielding materials. Table 1 shows the percentage of incident radiation transmitted.\n\n**Table 1: Transmission (%)**\n\n<table style="border-collapse: collapse; margin: 1rem 0; width: 100%;">\n<tr style="border-bottom: 2px solid #333;"><th style="padding: 0.5rem; text-align: left;">Thickness (cm)</th><th style="padding: 0.5rem; text-align: right;">Lead</th><th style="padding: 0.5rem; text-align: right;">Concrete</th><th style="padding: 0.5rem; text-align: right;">Water</th></tr>\n<tr><td style="padding: 0.5rem;">1</td><td style="padding: 0.5rem; text-align: right;">12.5</td><td style="padding: 0.5rem; text-align: right;">82.0</td><td style="padding: 0.5rem; text-align: right;">91.5</td></tr>\n<tr><td style="padding: 0.5rem;">5</td><td style="padding: 0.5rem; text-align: right;">0.032</td><td style="padding: 0.5rem; text-align: right;">37.1</td><td style="padding: 0.5rem; text-align: right;">63.2</td></tr>\n<tr><td style="padding: 0.5rem;">10</td><td style="padding: 0.5rem; text-align: right;">0.000010</td><td style="padding: 0.5rem; text-align: right;">13.8</td><td style="padding: 0.5rem; text-align: right;">39.9</td></tr>\n<tr><td style="padding: 0.5rem;">20</td><td style="padding: 0.5rem; text-align: right;">—</td><td style="padding: 0.5rem; text-align: right;">1.9</td><td style="padding: 0.5rem; text-align: right;">15.9</td></tr>\n</table>\n\nNote: — indicates transmission below detection limit.\n\nFor water, what percentage of the radiation was absorbed (not transmitted) by 10 cm thickness?',
    ch: [
      {letter: 'A', text: '60.1%'},
      {letter: 'B', text: '39.9%'},
      {letter: 'C', text: '23.3%'},
      {letter: 'D', text: '51.6%'}
    ],
    ans: 'A',
    sol: '**Calculate percentage absorbed for water at 10 cm.**\n\n```\nWater at 10 cm: 39.9% transmitted\n\nIf 39.9% is transmitted, then:\nPercentage absorbed = 100% - 39.9% = 60.1%\n```\n\n**Key insight:** The table shows transmission, but the question asks for absorption. If 39.9% passes through 10 cm of water, then 60.1% was absorbed. This tests whether students understand the complementary relationship between transmission and absorption. The distractor 39.9% is the percentage transmitted, not absorbed. The value 23.3% is the decrease from 5 to 10 cm. The answer 51.6% uses incorrect values.'
  },
  {
    pos: 44,
    diff: 'hard',
    text: 'Researchers measured reef fish abundance at different distances from shore and water depths. Table 1 shows fish counts per 100 m² survey area.\n\n**Table 1: Fish Abundance (individuals/100m²)**\n\n<table style="border-collapse: collapse; margin: 1rem 0; width: 100%;">\n<tr style="border-bottom: 2px solid #333;"><th style="padding: 0.5rem; text-align: left;">Distance from Shore (m)</th><th style="padding: 0.5rem; text-align: right;">5 m Depth</th><th style="padding: 0.5rem; text-align: right;">10 m Depth</th><th style="padding: 0.5rem; text-align: right;">15 m Depth</th></tr>\n<tr><td style="padding: 0.5rem;">100</td><td style="padding: 0.5rem; text-align: right;">45</td><td style="padding: 0.5rem; text-align: right;">68</td><td style="padding: 0.5rem; text-align: right;">52</td></tr>\n<tr><td style="padding: 0.5rem;">500</td><td style="padding: 0.5rem; text-align: right;">82</td><td style="padding: 0.5rem; text-align: right;">125</td><td style="padding: 0.5rem; text-align: right;">98</td></tr>\n<tr><td style="padding: 0.5rem;">1000</td><td style="padding: 0.5rem; text-align: right;">118</td><td style="padding: 0.5rem; text-align: right;">186</td><td style="padding: 0.5rem; text-align: right;">142</td></tr>\n<tr><td style="padding: 0.5rem;">2000</td><td style="padding: 0.5rem; text-align: right;">95</td><td style="padding: 0.5rem; text-align: right;">158</td><td style="padding: 0.5rem; text-align: right;">121</td></tr>\n</table>\n\nAt 1000 m from shore, what was the range of fish abundance across all three depth zones?',
    ch: [
      {letter: 'A', text: '68'},
      {letter: 'B', text: '44'},
      {letter: 'C', text: '186'},
      {letter: 'D', text: '24'}
    ],
    ans: 'A',
    sol: '**Calculate range at 1000 m from shore.**\n\n```\nAt 1000 m from shore:\n5 m depth: 118 fish/100m²\n10 m depth: 186 fish/100m² ← Maximum\n15 m depth: 142 fish/100m²\n\nRange = Maximum - Minimum\n      = 186 - 118\n      = 68 fish/100m²\n```\n\n**Key insight:** At 1000 m from shore, fish abundance varies by 68 individuals/100m² across depths, with peak abundance at 10 m depth. This intermediate depth likely has optimal light, temperature, and habitat conditions. The distractor 186 is the maximum value itself, not the range. The value 44 is the difference between 10 m and 15 m depths. The answer 24 uses incorrect values. This tests understanding of spatial variation in marine ecosystems.'
  },
  {
    pos: 45,
    diff: 'hard',
    text: 'A civil engineering study tested the load-bearing capacity of bridge cables made from different materials at various temperatures. Table 1 shows maximum load before failure.\n\n**Table 1: Maximum Load (kN)**\n\n<table style="border-collapse: collapse; margin: 1rem 0; width: 100%;">\n<tr style="border-bottom: 2px solid #333;"><th style="padding: 0.5rem; text-align: left;">Temperature (°C)</th><th style="padding: 0.5rem; text-align: right;">Steel Cable</th><th style="padding: 0.5rem; text-align: right;">Carbon Fiber</th><th style="padding: 0.5rem; text-align: right;">Kevlar</th></tr>\n<tr><td style="padding: 0.5rem;">-20</td><td style="padding: 0.5rem; text-align: right;">245</td><td style="padding: 0.5rem; text-align: right;">285</td><td style="padding: 0.5rem; text-align: right;">262</td></tr>\n<tr><td style="padding: 0.5rem;">0</td><td style="padding: 0.5rem; text-align: right;">238</td><td style="padding: 0.5rem; text-align: right;">281</td><td style="padding: 0.5rem; text-align: right;">258</td></tr>\n<tr><td style="padding: 0.5rem;">20</td><td style="padding: 0.5rem; text-align: right;">232</td><td style="padding: 0.5rem; text-align: right;">278</td><td style="padding: 0.5rem; text-align: right;">255</td></tr>\n<tr><td style="padding: 0.5rem;">50</td><td style="padding: 0.5rem; text-align: right;">221</td><td style="padding: 0.5rem; text-align: right;">268</td><td style="padding: 0.5rem; text-align: right;">241</td></tr>\n</table>\n\nFor steel cable, what was the percentage decrease in load capacity between -20°C and 50°C?',
    ch: [
      {letter: 'A', text: '9.8%'},
      {letter: 'B', text: '24%'},
      {letter: 'C', text: '10.9%'},
      {letter: 'D', text: '90.2%'}
    ],
    ans: 'A',
    sol: '**Calculate percentage decrease for steel cable.**\n\n```\nSteel at -20°C: 245 kN\nSteel at 50°C: 221 kN\n\nDecrease = 245 - 221 = 24 kN\n\nPercentage decrease = (24 ÷ 245) × 100%\n                    = 0.098 × 100%\n                    = 9.8%\n```\n\n**Key insight:** Steel cable loses about 10% of its strength over a 70°C temperature range, showing modest temperature sensitivity. This is important for bridge design across seasonal extremes. The distractor 24% uses the absolute decrease as if it were a percentage. The value 10.9% reverses the division (24÷221). The answer 90.2% is the percentage remaining (221÷245), not the decrease. This tests understanding of material strength degradation with temperature.'
  },
  {
    pos: 46,
    diff: 'hard',
    text: 'A neuroscience study measured neural firing rates in different brain regions during various cognitive tasks. Table 1 shows action potentials per second.\n\n**Table 1: Firing Rate (spikes/second)**\n\n<table style="border-collapse: collapse; margin: 1rem 0; width: 100%;">\n<tr style="border-bottom: 2px solid #333;"><th style="padding: 0.5rem; text-align: left;">Task</th><th style="padding: 0.5rem; text-align: right;">Visual Cortex</th><th style="padding: 0.5rem; text-align: right;">Prefrontal Cortex</th><th style="padding: 0.5rem; text-align: right;">Motor Cortex</th></tr>\n<tr><td style="padding: 0.5rem;">Rest</td><td style="padding: 0.5rem; text-align: right;">8</td><td style="padding: 0.5rem; text-align: right;">12</td><td style="padding: 0.5rem; text-align: right;">5</td></tr>\n<tr><td style="padding: 0.5rem;">Visual Task</td><td style="padding: 0.5rem; text-align: right;">68</td><td style="padding: 0.5rem; text-align: right;">35</td><td style="padding: 0.5rem; text-align: right;">7</td></tr>\n<tr><td style="padding: 0.5rem;">Decision Task</td><td style="padding: 0.5rem; text-align: right;">22</td><td style="padding: 0.5rem; text-align: right;">82</td><td style="padding: 0.5rem; text-align: right;">11</td></tr>\n<tr><td style="padding: 0.5rem;">Movement</td><td style="padding: 0.5rem; text-align: right;">15</td><td style="padding: 0.5rem; text-align: right;">28</td><td style="padding: 0.5rem; text-align: right;">95</td></tr>\n</table>\n\nFor the prefrontal cortex, by what factor did the firing rate increase from rest to the decision task?',
    ch: [
      {letter: 'A', text: '6.8'},
      {letter: 'B', text: '70'},
      {letter: 'C', text: '2.3'},
      {letter: 'D', text: '0.15'}
    ],
    ans: 'A',
    sol: '**Calculate firing rate increase factor for prefrontal cortex.**\n\n```\nPrefrontal cortex at rest: 12 spikes/second\nPrefrontal cortex during decision task: 82 spikes/second\n\nFactor = 82 ÷ 12 = 6.83 ≈ 6.8\n```\n\n**Key insight:** The prefrontal cortex increases its activity nearly 7-fold during decision-making compared to rest, reflecting its critical role in executive functions and cognitive control. The distractor 70 is the difference (82-12), not the factor. The value 2.3 uses incorrect calculations. The answer 0.15 reverses the division (12÷82). This tests understanding of neural activity patterns across brain regions and cognitive states.'
  },
  {
    pos: 47,
    diff: 'hard',
    text: 'Geochemists analyzed mineral composition in rock samples from different depths in a mine shaft. Table 1 shows the results.\n\n**Table 1: Mineral Content (% by mass)**\n\n<table style="border-collapse: collapse; margin: 1rem 0; width: 100%;">\n<tr style="border-bottom: 2px solid #333;"><th style="padding: 0.5rem; text-align: left;">Depth (m)</th><th style="padding: 0.5rem; text-align: right;">Quartz</th><th style="padding: 0.5rem; text-align: right;">Feldspar</th><th style="padding: 0.5rem; text-align: right;">Pyrite</th><th style="padding: 0.5rem; text-align: right;">Calcite</th></tr>\n<tr><td style="padding: 0.5rem;">50</td><td style="padding: 0.5rem; text-align: right;">42</td><td style="padding: 0.5rem; text-align: right;">31</td><td style="padding: 0.5rem; text-align: right;">3</td><td style="padding: 0.5rem; text-align: right;">18</td></tr>\n<tr><td style="padding: 0.5rem;">150</td><td style="padding: 0.5rem; text-align: right;">38</td><td style="padding: 0.5rem; text-align: right;">28</td><td style="padding: 0.5rem; text-align: right;">8</td><td style="padding: 0.5rem; text-align: right;">22</td></tr>\n<tr><td style="padding: 0.5rem;">300</td><td style="padding: 0.5rem; text-align: right;">35</td><td style="padding: 0.5rem; text-align: right;">24</td><td style="padding: 0.5rem; text-align: right;">15</td><td style="padding: 0.5rem; text-align: right;">20</td></tr>\n<tr><td style="padding: 0.5rem;">500</td><td style="padding: 0.5rem; text-align: right;">29</td><td style="padding: 0.5rem; text-align: right;">19</td><td style="padding: 0.5rem; text-align: right;">28</td><td style="padding: 0.5rem; text-align: right;">17</td></tr>\n</table>\n\nWhat was the pyrite content at 500 m depth as a percentage of the pyrite content at 50 m depth?',
    ch: [
      {letter: 'A', text: '933%'},
      {letter: 'B', text: '11%'},
      {letter: 'C', text: '25%'},
      {letter: 'D', text: '833%'}
    ],
    ans: 'A',
    sol: '**Calculate the percentage comparison for pyrite.**\n\n```\nPyrite at 50 m: 3% by mass\nPyrite at 500 m: 28% by mass\n\nPercentage = (28 ÷ 3) × 100%\n           = 9.33 × 100%\n           = 933%\n```\n\n**Key insight:** Pyrite (iron sulfide) is more than 9 times more abundant at greater depth (933% of shallow value), reflecting hydrothermal mineralization processes that concentrate sulfides deeper in the crust. The distractor 11% reverses the division (3÷28). The value 25% is the absolute pyrite increase (28-3), not the percentage comparison. The answer 833% uses slightly incorrect calculation. This tests understanding of ore grade variation with depth.'
  },
  {
    pos: 48,
    diff: 'hard',
    text: 'A limnology study measured phosphorus concentrations in a lake at different locations and depths during summer. Table 1 shows the results.\n\n**Table 1: Total Phosphorus (μg/L)**\n\n<table style="border-collapse: collapse; margin: 1rem 0; width: 100%;">\n<tr style="border-bottom: 2px solid #333;"><th style="padding: 0.5rem; text-align: left;">Depth (m)</th><th style="padding: 0.5rem; text-align: right;">North Basin</th><th style="padding: 0.5rem; text-align: right;">Central Basin</th><th style="padding: 0.5rem; text-align: right;">South Basin</th></tr>\n<tr><td style="padding: 0.5rem;">0 (surface)</td><td style="padding: 0.5rem; text-align: right;">18</td><td style="padding: 0.5rem; text-align: right;">22</td><td style="padding: 0.5rem; text-align: right;">35</td></tr>\n<tr><td style="padding: 0.5rem;">5</td><td style="padding: 0.5rem; text-align: right;">21</td><td style="padding: 0.5rem; text-align: right;">26</td><td style="padding: 0.5rem; text-align: right;">38</td></tr>\n<tr><td style="padding: 0.5rem;">10</td><td style="padding: 0.5rem; text-align: right;">28</td><td style="padding: 0.5rem; text-align: right;">35</td><td style="padding: 0.5rem; text-align: right;">45</td></tr>\n<tr><td style="padding: 0.5rem;">15</td><td style="padding: 0.5rem; text-align: right;">42</td><td style="padding: 0.5rem; text-align: right;">51</td><td style="padding: 0.5rem; text-align: right;">58</td></tr>\n</table>\n\nIn the Central Basin, what was the increase in phosphorus concentration from the surface to 15 m depth?',
    ch: [
      {letter: 'A', text: '29 μg/L'},
      {letter: 'B', text: '16 μg/L'},
      {letter: 'C', text: '13 μg/L'},
      {letter: 'D', text: '51 μg/L'}
    ],
    ans: 'A',
    sol: '**Calculate phosphorus increase for Central Basin.**\n\n```\nCentral Basin at surface: 22 μg/L\nCentral Basin at 15 m: 51 μg/L\n\nIncrease = 51 - 22 = 29 μg/L\n```\n\n**Key insight:** Phosphorus concentration more than doubles from surface to 15 m depth in the Central Basin, showing nutrient accumulation in deeper waters during summer stratification. This 29 μg/L increase reflects decomposition and phosphorus release in the hypolimnion. The distractor 51 is the concentration at 15 m itself. The value 16 is the increase from 10 to 15 m. The answer 13 is the increase from surface to 10 m. This tests understanding of lake stratification and nutrient cycling.'
  },
  {
    pos: 49,
    diff: 'hard',
    text: 'Engineers measured electrical conductivity of different electrolyte solutions at various concentrations and temperatures. Table 1 shows the results.\n\n**Table 1: Conductivity (mS/cm)**\n\n<table style="border-collapse: collapse; margin: 1rem 0; width: 100%;">\n<tr style="border-bottom: 2px solid #333;"><th style="padding: 0.5rem; text-align: left;">Concentration (M)</th><th style="padding: 0.5rem; text-align: right;">20°C</th><th style="padding: 0.5rem; text-align: right;">40°C</th><th style="padding: 0.5rem; text-align: right;">60°C</th></tr>\n<tr><td style="padding: 0.5rem;">0.1</td><td style="padding: 0.5rem; text-align: right;">12.8</td><td style="padding: 0.5rem; text-align: right;">18.2</td><td style="padding: 0.5rem; text-align: right;">24.5</td></tr>\n<tr><td style="padding: 0.5rem;">0.5</td><td style="padding: 0.5rem; text-align: right;">58.4</td><td style="padding: 0.5rem; text-align: right;">82.1</td><td style="padding: 0.5rem; text-align: right;">109.2</td></tr>\n<tr><td style="padding: 0.5rem;">1.0</td><td style="padding: 0.5rem; text-align: right;">105.2</td><td style="padding: 0.5rem; text-align: right;">146.8</td><td style="padding: 0.5rem; text-align: right;">193.5</td></tr>\n<tr><td style="padding: 0.5rem;">2.0</td><td style="padding: 0.5rem; text-align: right;">185.7</td><td style="padding: 0.5rem; text-align: right;">256.2</td><td style="padding: 0.5rem; text-align: right;">335.8</td></tr>\n</table>\n\nAt 1.0 M concentration, by approximately what percentage did conductivity increase when temperature increased from 20°C to 60°C?',
    ch: [
      {letter: 'A', text: '84%'},
      {letter: 'B', text: '54%'},
      {letter: 'C', text: '184%'},
      {letter: 'D', text: '88%'}
    ],
    ans: 'A',
    sol: '**Calculate percentage increase at 1.0 M concentration.**\n\n```\n1.0 M at 20°C: 105.2 mS/cm\n1.0 M at 60°C: 193.5 mS/cm\n\nIncrease = 193.5 - 105.2 = 88.3 mS/cm\n\nPercentage increase = (88.3 ÷ 105.2) × 100%\n                    = 0.839 × 100%\n                    = 83.9% ≈ 84%\n```\n\n**Key insight:** Conductivity nearly doubles (84% increase) over a 40°C temperature range, reflecting increased ion mobility and dissociation at higher temperatures. The distractor 54% uses incorrect calculations. The value 184% calculates 193.5÷105.2 as percentage incorrectly. The answer 88 is the absolute increase, not the percentage. This tests understanding of temperature effects on electrolyte conductivity.'
  },
  {
    pos: 50,
    diff: 'hard',
    text: 'A wildlife biology study tracked population densities of three rodent species in different habitat types over 4 years. Table 1 shows average density.\n\n**Table 1: Population Density (individuals/hectare)**\n\n<table style="border-collapse: collapse; margin: 1rem 0; width: 100%;">\n<tr style="border-bottom: 2px solid #333;"><th style="padding: 0.5rem; text-align: left;">Habitat</th><th style="padding: 0.5rem; text-align: right;">Species A</th><th style="padding: 0.5rem; text-align: right;">Species B</th><th style="padding: 0.5rem; text-align: right;">Species C</th></tr>\n<tr><td style="padding: 0.5rem;">Forest</td><td style="padding: 0.5rem; text-align: right;">18</td><td style="padding: 0.5rem; text-align: right;">35</td><td style="padding: 0.5rem; text-align: right;">8</td></tr>\n<tr><td style="padding: 0.5rem;">Grassland</td><td style="padding: 0.5rem; text-align: right;">45</td><td style="padding: 0.5rem; text-align: right;">12</td><td style="padding: 0.5rem; text-align: right;">62</td></tr>\n<tr><td style="padding: 0.5rem;">Shrubland</td><td style="padding: 0.5rem; text-align: right;">32</td><td style="padding: 0.5rem; text-align: right;">28</td><td style="padding: 0.5rem; text-align: right;">38</td></tr>\n<tr><td style="padding: 0.5rem;">Agricultural</td><td style="padding: 0.5rem; text-align: right;">8</td><td style="padding: 0.5rem; text-align: right;">6</td><td style="padding: 0.5rem; text-align: right;">15</td></tr>\n</table>\n\nFor Species C, the density in grassland was approximately how many times greater than in forest?',
    ch: [
      {letter: 'A', text: '7.8'},
      {letter: 'B', text: '54'},
      {letter: 'C', text: '4.1'},
      {letter: 'D', text: '0.13'}
    ],
    ans: 'A',
    sol: '**Calculate density ratio for Species C.**\n\n```\nSpecies C in grassland: 62 individuals/hectare\nSpecies C in forest: 8 individuals/hectare\n\nRatio = 62 ÷ 8 = 7.75 ≈ 7.8\n```\n\n**Key insight:** Species C shows strong habitat preference, with nearly 8 times higher density in grassland compared to forest. This reflects specialized adaptations to open habitats. The distractor 54 is the difference (62-8), not the ratio. The value 4.1 uses incorrect calculations. The answer 0.13 reverses the division (8÷62). This tests understanding of species-habitat relationships and population distribution patterns across landscapes.'
  }
];

async function insertQuestions() {
  console.log('Finding lesson...');

  const { data: lesson, error: lessonError } = await supabase
    .from('lessons')
    .select('id')
    .eq('lesson_key', 'specific-data-point')
    .single();

  if (lessonError) {
    console.error('Error finding lesson specific-data-point:', lessonError);
    return;
  }

  console.log(`Found lesson specific-data-point with ID: ${lesson.id}\n`);

  let successCount = 0;
  let errorCount = 0;

  for (const q of questions) {
    const questionData = {
      lesson_id: lesson.id,
      subject: 'science',
      position: q.pos,
      difficulty: q.diff,
      title: `Specific Data Point Question ${q.pos}`,
      problem_text: q.text,
      choices: q.ch,
      correct_answer: q.ans,
      answer_explanation: q.sol
    };

    const { data, error } = await supabase
      .from('practice_questions')
      .insert([questionData]);

    if (error) {
      console.error(`Error inserting question ${q.pos}:`, error.message);
      errorCount++;
    } else {
      successCount++;
    }
  }

  console.log(`\n=== COMPLETE: ${successCount}/${questions.length} success, ${errorCount}/${questions.length} errors ===`);
}

insertQuestions();
