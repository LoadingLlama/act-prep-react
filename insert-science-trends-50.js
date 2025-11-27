require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const questions = [
  {
    pos: 1,
    diff: 'easy',
    text: 'A study examined how plant height changed over time. The results are shown below.<br><br><strong>Table 1</strong>\n\n<table style="border-collapse: collapse; margin: 1rem 0; width: 100%;">\n<tr style="border-bottom: 2px solid #333;"><th style="padding: 0.5rem; text-align: left;">Day</th><th style="padding: 0.5rem; text-align: right;">Height (cm)</th></tr>\n<tr><td style="padding: 0.5rem;">0</td><td style="padding: 0.5rem; text-align: right;">5</td></tr>\n<tr><td style="padding: 0.5rem;">7</td><td style="padding: 0.5rem; text-align: right;">12</td></tr>\n<tr><td style="padding: 0.5rem;">14</td><td style="padding: 0.5rem; text-align: right;">19</td></tr>\n<tr><td style="padding: 0.5rem;">21</td><td style="padding: 0.5rem; text-align: right;">25</td></tr>\n<tr><td style="padding: 0.5rem;">28</td><td style="padding: 0.5rem; text-align: right;">31</td></tr>\n</table>\n\nBased on Table 1, as the number of days increased, plant height:',
    ch: [
      {letter: 'A', text: 'increased only.'},
      {letter: 'B', text: 'decreased only.'},
      {letter: 'C', text: 'increased, then decreased.'},
      {letter: 'D', text: 'remained constant.'}
    ],
    ans: 'A',
    sol: '**Identify the trend by comparing successive values.**\n\nDay 0: 5 cm\nDay 7: 12 cm (increased)\nDay 14: 19 cm (increased)\nDay 21: 25 cm (increased)\nDay 28: 31 cm (increased)\n\nEvery measurement shows an increase from the previous one, so plant height increased only.'
  },
  {
    pos: 2,
    diff: 'easy',
    text: 'Scientists measured water temperature at different depths in a lake. The results are shown below.<br><br><strong>Table 1</strong>\n\n<table style="border-collapse: collapse; margin: 1rem 0; width: 100%;">\n<tr style="border-bottom: 2px solid #333;"><th style="padding: 0.5rem; text-align: left;">Depth (m)</th><th style="padding: 0.5rem; text-align: right;">Temperature (°C)</th></tr>\n<tr><td style="padding: 0.5rem;">0</td><td style="padding: 0.5rem; text-align: right;">24</td></tr>\n<tr><td style="padding: 0.5rem;">5</td><td style="padding: 0.5rem; text-align: right;">21</td></tr>\n<tr><td style="padding: 0.5rem;">10</td><td style="padding: 0.5rem; text-align: right;">18</td></tr>\n<tr><td style="padding: 0.5rem;">15</td><td style="padding: 0.5rem; text-align: right;">15</td></tr>\n<tr><td style="padding: 0.5rem;">20</td><td style="padding: 0.5rem; text-align: right;">12</td></tr>\n</table>\n\nAccording to Table 1, as depth increased, water temperature:',
    ch: [
      {letter: 'A', text: 'increased only.'},
      {letter: 'B', text: 'decreased only.'},
      {letter: 'C', text: 'increased, then decreased.'},
      {letter: 'D', text: 'remained constant.'}
    ],
    ans: 'B',
    sol: '**Check if temperature goes up or down as depth increases.**\n\nDepth 0m: 24°C\nDepth 5m: 21°C (decreased)\nDepth 10m: 18°C (decreased)\nDepth 15m: 15°C (decreased)\nDepth 20m: 12°C (decreased)\n\nTemperature consistently decreases as depth increases.'
  },
  {
    pos: 3,
    diff: 'easy',
    text: 'An experiment measured enzyme activity at different pH levels. The results are shown below.<br><br><strong>Table 1</strong>\n\n<table style="border-collapse: collapse; margin: 1rem 0; width: 100%;">\n<tr style="border-bottom: 2px solid #333;"><th style="padding: 0.5rem; text-align: left;">pH</th><th style="padding: 0.5rem; text-align: right;">Activity (%)</th></tr>\n<tr><td style="padding: 0.5rem;">4</td><td style="padding: 0.5rem; text-align: right;">15</td></tr>\n<tr><td style="padding: 0.5rem;">5</td><td style="padding: 0.5rem; text-align: right;">45</td></tr>\n<tr><td style="padding: 0.5rem;">6</td><td style="padding: 0.5rem; text-align: right;">85</td></tr>\n<tr><td style="padding: 0.5rem;">7</td><td style="padding: 0.5rem; text-align: right;">100</td></tr>\n<tr><td style="padding: 0.5rem;">8</td><td style="padding: 0.5rem; text-align: right;">70</td></tr>\n<tr><td style="padding: 0.5rem;">9</td><td style="padding: 0.5rem; text-align: right;">30</td></tr>\n</table>\n\nBased on Table 1, as pH increased from 4 to 7, enzyme activity:',
    ch: [
      {letter: 'A', text: 'increased only.'},
      {letter: 'B', text: 'decreased only.'},
      {letter: 'C', text: 'increased, then decreased.'},
      {letter: 'D', text: 'remained constant.'}
    ],
    ans: 'A',
    sol: '**Focus on the specified range: pH 4 to 7 only.**\n\npH 4: 15%\npH 5: 45% (increased)\npH 6: 85% (increased)\npH 7: 100% (increased)\n\nIn this range, activity increased only. (Note: Activity does decrease after pH 7, but the question asks specifically about pH 4 to 7.)'
  },
  {
    pos: 4,
    diff: 'medium',
    text: 'Researchers measured atmospheric pressure at different altitudes. The results are shown below.<br><br><strong>Table 1</strong>\n\n<table style="border-collapse: collapse; margin: 1rem 0; width: 100%;">\n<tr style="border-bottom: 2px solid #333;"><th style="padding: 0.5rem; text-align: left;">Altitude (km)</th><th style="padding: 0.5rem; text-align: right;">Pressure (kPa)</th></tr>\n<tr><td style="padding: 0.5rem;">0</td><td style="padding: 0.5rem; text-align: right;">101</td></tr>\n<tr><td style="padding: 0.5rem;">2</td><td style="padding: 0.5rem; text-align: right;">79</td></tr>\n<tr><td style="padding: 0.5rem;">4</td><td style="padding: 0.5rem; text-align: right;">62</td></tr>\n<tr><td style="padding: 0.5rem;">6</td><td style="padding: 0.5rem; text-align: right;">47</td></tr>\n<tr><td style="padding: 0.5rem;">8</td><td style="padding: 0.5rem; text-align: right;">36</td></tr>\n</table>\n\nBased on Table 1, the relationship between altitude and atmospheric pressure is best described as:',
    ch: [
      {letter: 'A', text: 'direct; as altitude increased, pressure increased.'},
      {letter: 'B', text: 'direct; as altitude increased, pressure decreased.'},
      {letter: 'C', text: 'inverse; as altitude increased, pressure decreased.'},
      {letter: 'D', text: 'inverse; as altitude increased, pressure increased.'}
    ],
    ans: 'C',
    sol: '**Determine if the relationship is direct or inverse.**\n\nA direct relationship means both variables change in the same direction (both increase or both decrease).\n\nAn inverse relationship means the variables change in opposite directions (one increases while the other decreases).\n\nHere, altitude increases (0→8 km) while pressure decreases (101→36 kPa), so this is an inverse relationship.'
  },
  {
    pos: 5,
    diff: 'medium',
    text: 'A study examined bacterial growth over time at room temperature. The results are shown below.<br><br><strong>Table 1</strong>\n\n<table style="border-collapse: collapse; margin: 1rem 0; width: 100%;">\n<tr style="border-bottom: 2px solid #333;"><th style="padding: 0.5rem; text-align: left;">Time (hours)</th><th style="padding: 0.5rem; text-align: right;">Population (×10⁶)</th></tr>\n<tr><td style="padding: 0.5rem;">0</td><td style="padding: 0.5rem; text-align: right;">0.5</td></tr>\n<tr><td style="padding: 0.5rem;">3</td><td style="padding: 0.5rem; text-align: right;">2.0</td></tr>\n<tr><td style="padding: 0.5rem;">6</td><td style="padding: 0.5rem; text-align: right;">8.0</td></tr>\n<tr><td style="padding: 0.5rem;">9</td><td style="padding: 0.5rem; text-align: right;">32.0</td></tr>\n<tr><td style="padding: 0.5rem;">12</td><td style="padding: 0.5rem; text-align: right;">128.0</td></tr>\n</table>\n\nBased on Table 1, bacterial population growth is best described as:',
    ch: [
      {letter: 'A', text: 'linear.'},
      {letter: 'B', text: 'exponential.'},
      {letter: 'C', text: 'constant.'},
      {letter: 'D', text: 'decreasing.'}
    ],
    ans: 'B',
    sol: '**Check if the rate of increase is constant (linear) or accelerating (exponential).**\n\nChange 0→3h: 0.5→2.0 (×4)\nChange 3→6h: 2.0→8.0 (×4)\nChange 6→9h: 8.0→32.0 (×4)\nChange 9→12h: 32.0→128.0 (×4)\n\nThe population multiplies by the same factor each period - this is exponential growth, not linear.'
  },
  {
    pos: 6,
    diff: 'medium',
    text: 'Scientists measured soil moisture content over a 24-hour period. The results are shown below.<br><br><strong>Table 1</strong>\n\n<table style="border-collapse: collapse; margin: 1rem 0; width: 100%;">\n<tr style="border-bottom: 2px solid #333;"><th style="padding: 0.5rem; text-align: left;">Time</th><th style="padding: 0.5rem; text-align: right;">Moisture (%)</th></tr>\n<tr><td style="padding: 0.5rem;">6:00 AM</td><td style="padding: 0.5rem; text-align: right;">35</td></tr>\n<tr><td style="padding: 0.5rem;">10:00 AM</td><td style="padding: 0.5rem; text-align: right;">28</td></tr>\n<tr><td style="padding: 0.5rem;">2:00 PM</td><td style="padding: 0.5rem; text-align: right;">22</td></tr>\n<tr><td style="padding: 0.5rem;">6:00 PM</td><td style="padding: 0.5rem; text-align: right;">20</td></tr>\n<tr><td style="padding: 0.5rem;">10:00 PM</td><td style="padding: 0.5rem; text-align: right;">19</td></tr>\n</table>\n\nBased on Table 1, as time progressed from 6:00 AM to 10:00 PM, soil moisture:',
    ch: [
      {letter: 'A', text: 'decreased at a constant rate throughout the day.'},
      {letter: 'B', text: 'decreased at a decreasing rate throughout the day.'},
      {letter: 'C', text: 'increased at a constant rate throughout the day.'},
      {letter: 'D', text: 'remained constant throughout the day.'}
    ],
    ans: 'B',
    sol: '**Check the rate of decrease over each time period.**\n\n6AM→10AM: 35→28 = -7% in 4 hours (-1.75%/hr)\n10AM→2PM: 28→22 = -6% in 4 hours (-1.5%/hr)\n2PM→6PM: 22→20 = -2% in 4 hours (-0.5%/hr)\n6PM→10PM: 20→19 = -1% in 4 hours (-0.25%/hr)\n\nMoisture decreased, but the rate of decrease slowed down over time.'
  },
  {
    pos: 7,
    diff: 'easy',
    text: 'A study measured heart rate during exercise. The results are shown below.<br><br><strong>Table 1</strong>\n\n<table style="border-collapse: collapse; margin: 1rem 0; width: 100%;">\n<tr style="border-bottom: 2px solid #333;"><th style="padding: 0.5rem; text-align: left;">Exercise Time (min)</th><th style="padding: 0.5rem; text-align: right;">Heart Rate (bpm)</th></tr>\n<tr><td style="padding: 0.5rem;">0</td><td style="padding: 0.5rem; text-align: right;">72</td></tr>\n<tr><td style="padding: 0.5rem;">5</td><td style="padding: 0.5rem; text-align: right;">110</td></tr>\n<tr><td style="padding: 0.5rem;">10</td><td style="padding: 0.5rem; text-align: right;">145</td></tr>\n<tr><td style="padding: 0.5rem;">15</td><td style="padding: 0.5rem; text-align: right;">148</td></tr>\n<tr><td style="padding: 0.5rem;">20</td><td style="padding: 0.5rem; text-align: right;">150</td></tr>\n</table>\n\nBased on Table 1, between 10 and 20 minutes, heart rate:',
    ch: [
      {letter: 'A', text: 'increased rapidly.'},
      {letter: 'B', text: 'increased slowly.'},
      {letter: 'C', text: 'decreased rapidly.'},
      {letter: 'D', text: 'decreased slowly.'}
    ],
    ans: 'B',
    sol: '**Compare the rate of change in different time periods.**\n\n0→5 min: 72→110 (+38 bpm)\n5→10 min: 110→145 (+35 bpm)\n10→15 min: 145→148 (+3 bpm)\n15→20 min: 148→150 (+2 bpm)\n\nBetween 10 and 20 minutes, heart rate still increased but much more slowly than in earlier periods.'
  },
  {
    pos: 8,
    diff: 'easy',
    text: 'Chemists measured the concentration of a reactant during a chemical reaction. The results are shown below.<br><br><strong>Table 1</strong>\n\n<table style="border-collapse: collapse; margin: 1rem 0; width: 100%;">\n<tr style="border-bottom: 2px solid #333;"><th style="padding: 0.5rem; text-align: left;">Time (min)</th><th style="padding: 0.5rem; text-align: right;">Concentration (M)</th></tr>\n<tr><td style="padding: 0.5rem;">0</td><td style="padding: 0.5rem; text-align: right;">2.0</td></tr>\n<tr><td style="padding: 0.5rem;">10</td><td style="padding: 0.5rem; text-align: right;">1.5</td></tr>\n<tr><td style="padding: 0.5rem;">20</td><td style="padding: 0.5rem; text-align: right;">1.1</td></tr>\n<tr><td style="padding: 0.5rem;">30</td><td style="padding: 0.5rem; text-align: right;">0.8</td></tr>\n<tr><td style="padding: 0.5rem;">40</td><td style="padding: 0.5rem; text-align: right;">0.6</td></tr>\n</table>\n\nAccording to Table 1, as time increased, reactant concentration:',
    ch: [
      {letter: 'A', text: 'increased only.'},
      {letter: 'B', text: 'decreased only.'},
      {letter: 'C', text: 'increased, then decreased.'},
      {letter: 'D', text: 'remained constant.'}
    ],
    ans: 'B',
    sol: '**Track concentration values over time.**\n\nTime 0: 2.0 M\nTime 10: 1.5 M (decreased)\nTime 20: 1.1 M (decreased)\nTime 30: 0.8 M (decreased)\nTime 40: 0.6 M (decreased)\n\nConcentration consistently decreased as the reactant was consumed in the reaction.'
  },
  {
    pos: 9,
    diff: 'medium',
    text: 'Researchers studied the effect of temperature on gas solubility in water. The results are shown below.<br><br><strong>Table 1</strong>\n\n<table style="border-collapse: collapse; margin: 1rem 0; width: 100%;">\n<tr style="border-bottom: 2px solid #333;"><th style="padding: 0.5rem; text-align: left;">Temperature (°C)</th><th style="padding: 0.5rem; text-align: right;">Oxygen Solubility (mg/L)</th><th style="padding: 0.5rem; text-align: right;">CO₂ Solubility (mg/L)</th></tr>\n<tr><td style="padding: 0.5rem;">0</td><td style="padding: 0.5rem; text-align: right;">14.6</td><td style="padding: 0.5rem; text-align: right;">3.3</td></tr>\n<tr><td style="padding: 0.5rem;">10</td><td style="padding: 0.5rem; text-align: right;">11.3</td><td style="padding: 0.5rem; text-align: right;">2.3</td></tr>\n<tr><td style="padding: 0.5rem;">20</td><td style="padding: 0.5rem; text-align: right;">9.1</td><td style="padding: 0.5rem; text-align: right;">1.7</td></tr>\n<tr><td style="padding: 0.5rem;">30</td><td style="padding: 0.5rem; text-align: right;">7.5</td><td style="padding: 0.5rem; text-align: right;">1.3</td></tr>\n</table>\n\nBased on Table 1, as temperature increased:',
    ch: [
      {letter: 'A', text: 'both O₂ and CO₂ solubility increased.'},
      {letter: 'B', text: 'both O₂ and CO₂ solubility decreased.'},
      {letter: 'C', text: 'O₂ solubility increased while CO₂ solubility decreased.'},
      {letter: 'D', text: 'O₂ solubility decreased while CO₂ solubility increased.'}
    ],
    ans: 'B',
    sol: '**Check the trend for each gas separately.**\n\nOxygen: 14.6 → 11.3 → 9.1 → 7.5 (decreased)\nCO₂: 3.3 → 2.3 → 1.7 → 1.3 (decreased)\n\nBoth gases show the same trend: as temperature increased, solubility decreased.'
  },
  {
    pos: 10,
    diff: 'hard',
    text: 'Scientists measured velocity and kinetic energy of a moving object. The results are shown below.<br><br><strong>Table 1</strong>\n\n<table style="border-collapse: collapse; margin: 1rem 0; width: 100%;">\n<tr style="border-bottom: 2px solid #333;"><th style="padding: 0.5rem; text-align: left;">Velocity (m/s)</th><th style="padding: 0.5rem; text-align: right;">Kinetic Energy (J)</th></tr>\n<tr><td style="padding: 0.5rem;">2</td><td style="padding: 0.5rem; text-align: right;">4</td></tr>\n<tr><td style="padding: 0.5rem;">4</td><td style="padding: 0.5rem; text-align: right;">16</td></tr>\n<tr><td style="padding: 0.5rem;">6</td><td style="padding: 0.5rem; text-align: right;">36</td></tr>\n<tr><td style="padding: 0.5rem;">8</td><td style="padding: 0.5rem; text-align: right;">64</td></tr>\n</table>\n\nBased on Table 1, the relationship between velocity and kinetic energy is best described as:',
    ch: [
      {letter: 'A', text: 'linear; kinetic energy is directly proportional to velocity.'},
      {letter: 'B', text: 'quadratic; kinetic energy is proportional to the square of velocity.'},
      {letter: 'C', text: 'inverse; as velocity increases, kinetic energy decreases.'},
      {letter: 'D', text: 'exponential; kinetic energy doubles as velocity doubles.'}
    ],
    ans: 'B',
    sol: '**Check if energy increases proportionally to v or v².**\n\nv=2: KE=4 (note: 2²=4)\nv=4: KE=16 (note: 4²=16)\nv=6: KE=36 (note: 6²=36)\nv=8: KE=64 (note: 8²=64)\n\nKinetic energy equals velocity squared, which is a quadratic relationship (KE ∝ v²).'
  },
  {
    pos: 11,
    diff: 'easy',
    text: 'A botanist measured tree diameter over several years. The results are shown below.<br><br><strong>Table 1</strong>\n\n<table style="border-collapse: collapse; margin: 1rem 0; width: 100%;">\n<tr style="border-bottom: 2px solid #333;"><th style="padding: 0.5rem; text-align: left;">Year</th><th style="padding: 0.5rem; text-align: right;">Diameter (cm)</th></tr>\n<tr><td style="padding: 0.5rem;">2015</td><td style="padding: 0.5rem; text-align: right;">18</td></tr>\n<tr><td style="padding: 0.5rem;">2017</td><td style="padding: 0.5rem; text-align: right;">22</td></tr>\n<tr><td style="padding: 0.5rem;">2019</td><td style="padding: 0.5rem; text-align: right;">26</td></tr>\n<tr><td style="padding: 0.5rem;">2021</td><td style="padding: 0.5rem; text-align: right;">30</td></tr>\n</table>\n\nBased on Table 1, from 2015 to 2021, tree diameter:',
    ch: [
      {letter: 'A', text: 'increased only.'},
      {letter: 'B', text: 'decreased only.'},
      {letter: 'C', text: 'increased, then decreased.'},
      {letter: 'D', text: 'remained constant.'}
    ],
    ans: 'A',
    sol: 'Tree diameter: 18 → 22 → 26 → 30 cm. Consistently increased over time.'
  },
  {
    pos: 12,
    diff: 'medium',
    text: 'Scientists measured air pressure in a sealed container as temperature changed. The results are shown below.<br><br><strong>Table 1</strong>\n\n<table style="border-collapse: collapse; margin: 1rem 0; width: 100%;">\n<tr style="border-bottom: 2px solid #333;"><th style="padding: 0.5rem; text-align: left;">Temperature (K)</th><th style="padding: 0.5rem; text-align: right;">Pressure (atm)</th></tr>\n<tr><td style="padding: 0.5rem;">200</td><td style="padding: 0.5rem; text-align: right;">1.2</td></tr>\n<tr><td style="padding: 0.5rem;">250</td><td style="padding: 0.5rem; text-align: right;">1.5</td></tr>\n<tr><td style="padding: 0.5rem;">300</td><td style="padding: 0.5rem; text-align: right;">1.8</td></tr>\n<tr><td style="padding: 0.5rem;">350</td><td style="padding: 0.5rem; text-align: right;">2.1</td></tr>\n</table>\n\nBased on Table 1, the relationship between temperature and pressure is:',
    ch: [
      {letter: 'A', text: 'direct; both increased together.'},
      {letter: 'B', text: 'inverse; as one increased, the other decreased.'},
      {letter: 'C', text: 'no relationship; they changed independently.'},
      {letter: 'D', text: 'indirect; pressure decreased as temperature increased.'}
    ],
    ans: 'A',
    sol: 'Temperature increased (200→350 K) and pressure also increased (1.2→2.1 atm). This is a direct relationship.'
  },
  {
    pos: 13,
    diff: 'easy',
    text: 'Ecologists counted bird populations in a forest over 5 years. The results are shown below.<br><br><strong>Table 1</strong>\n\n<table style="border-collapse: collapse; margin: 1rem 0; width: 100%;">\n<tr style="border-bottom: 2px solid #333;"><th style="padding: 0.5rem; text-align: left;">Year</th><th style="padding: 0.5rem; text-align: right;">Population</th></tr>\n<tr><td style="padding: 0.5rem;">1</td><td style="padding: 0.5rem; text-align: right;">420</td></tr>\n<tr><td style="padding: 0.5rem;">2</td><td style="padding: 0.5rem; text-align: right;">385</td></tr>\n<tr><td style="padding: 0.5rem;">3</td><td style="padding: 0.5rem; text-align: right;">350</td></tr>\n<tr><td style="padding: 0.5rem;">4</td><td style="padding: 0.5rem; text-align: right;">315</td></tr>\n<tr><td style="padding: 0.5rem;">5</td><td style="padding: 0.5rem; text-align: right;">280</td></tr>\n</table>\n\nAccording to Table 1, as years progressed, bird population:',
    ch: [
      {letter: 'A', text: 'increased only.'},
      {letter: 'B', text: 'decreased only.'},
      {letter: 'C', text: 'increased, then decreased.'},
      {letter: 'D', text: 'remained constant.'}
    ],
    ans: 'B',
    sol: 'Population: 420 → 385 → 350 → 315 → 280. Consistently decreased each year.'
  },
  {
    pos: 14,
    diff: 'hard',
    text: 'A study measured photosynthesis rate at different light intensities. The results are shown below.<br><br><strong>Table 1</strong>\n\n<table style="border-collapse: collapse; margin: 1rem 0; width: 100%;">\n<tr style="border-bottom: 2px solid #333;"><th style="padding: 0.5rem; text-align: left;">Light Intensity (%)</th><th style="padding: 0.5rem; text-align: right;">Photosynthesis Rate (μmol/min)</th></tr>\n<tr><td style="padding: 0.5rem;">0</td><td style="padding: 0.5rem; text-align: right;">0</td></tr>\n<tr><td style="padding: 0.5rem;">25</td><td style="padding: 0.5rem; text-align: right;">15</td></tr>\n<tr><td style="padding: 0.5rem;">50</td><td style="padding: 0.5rem; text-align: right;">28</td></tr>\n<tr><td style="padding: 0.5rem;">75</td><td style="padding: 0.5rem; text-align: right;">35</td></tr>\n<tr><td style="padding: 0.5rem;">100</td><td style="padding: 0.5rem; text-align: right;">37</td></tr>\n</table>\n\nBased on Table 1, as light intensity increased from 0% to 100%, photosynthesis rate:',
    ch: [
      {letter: 'A', text: 'increased at a constant rate throughout.'},
      {letter: 'B', text: 'increased at a decreasing rate throughout.'},
      {letter: 'C', text: 'decreased at a constant rate throughout.'},
      {letter: 'D', text: 'remained constant throughout.'}
    ],
    ans: 'B',
    sol: '0→25%: +15 μmol/min\n25→50%: +13 μmol/min\n50→75%: +7 μmol/min\n75→100%: +2 μmol/min\n\nRate still increased but the increments got smaller, showing increasing rate that slows down (levels off).'
  },
  {
    pos: 15,
    diff: 'medium',
    text: 'Researchers measured ice thickness on a pond during winter. The results are shown below.<br><br><strong>Table 1</strong>\n\n<table style="border-collapse: collapse; margin: 1rem 0; width: 100%;">\n<tr style="border-bottom: 2px solid #333;"><th style="padding: 0.5rem; text-align: left;">Date</th><th style="padding: 0.5rem; text-align: right;">Ice Thickness (cm)</th></tr>\n<tr><td style="padding: 0.5rem;">Dec 1</td><td style="padding: 0.5rem; text-align: right;">8</td></tr>\n<tr><td style="padding: 0.5rem;">Jan 1</td><td style="padding: 0.5rem; text-align: right;">25</td></tr>\n<tr><td style="padding: 0.5rem;">Feb 1</td><td style="padding: 0.5rem; text-align: right;">38</td></tr>\n<tr><td style="padding: 0.5rem;">Mar 1</td><td style="padding: 0.5rem; text-align: right;">35</td></tr>\n<tr><td style="padding: 0.5rem;">Apr 1</td><td style="padding: 0.5rem; text-align: right;">12</td></tr>\n</table>\n\nBased on Table 1, ice thickness:',
    ch: [
      {letter: 'A', text: 'increased only.'},
      {letter: 'B', text: 'decreased only.'},
      {letter: 'C', text: 'increased, then decreased.'},
      {letter: 'D', text: 'decreased, then increased.'}
    ],
    ans: 'C',
    sol: 'Dec→Jan→Feb: 8→25→38 (increased)\nFeb→Mar→Apr: 38→35→12 (decreased)\n\nIce grew thicker in winter, then melted in spring.'
  },
  {
    pos: 16,
    diff: 'easy',
    text: 'A chemist measured pH of a solution as acid was added. The results are shown below.<br><br><strong>Table 1</strong>\n\n<table style="border-collapse: collapse; margin: 1rem 0; width: 100%;">\n<tr style="border-bottom: 2px solid #333;"><th style="padding: 0.5rem; text-align: left;">Acid Added (mL)</th><th style="padding: 0.5rem; text-align: right;">pH</th></tr>\n<tr><td style="padding: 0.5rem;">0</td><td style="padding: 0.5rem; text-align: right;">9.0</td></tr>\n<tr><td style="padding: 0.5rem;">10</td><td style="padding: 0.5rem; text-align: right;">7.5</td></tr>\n<tr><td style="padding: 0.5rem;">20</td><td style="padding: 0.5rem; text-align: right;">6.0</td></tr>\n<tr><td style="padding: 0.5rem;">30</td><td style="padding: 0.5rem; text-align: right;">4.5</td></tr>\n</table>\n\nAccording to Table 1, as more acid was added, pH:',
    ch: [
      {letter: 'A', text: 'increased only.'},
      {letter: 'B', text: 'decreased only.'},
      {letter: 'C', text: 'increased, then decreased.'},
      {letter: 'D', text: 'remained constant.'}
    ],
    ans: 'B',
    sol: 'pH: 9.0 → 7.5 → 6.0 → 4.5. Consistently decreased as acid was added.'
  },
  {
    pos: 17,
    diff: 'medium',
    text: 'Scientists studied predator and prey populations over time. The results are shown below.<br><br><strong>Table 1</strong>\n\n<table style="border-collapse: collapse; margin: 1rem 0; width: 100%;">\n<tr style="border-bottom: 2px solid #333;"><th style="padding: 0.5rem; text-align: left;">Year</th><th style="padding: 0.5rem; text-align: right;">Prey</th><th style="padding: 0.5rem; text-align: right;">Predator</th></tr>\n<tr><td style="padding: 0.5rem;">1</td><td style="padding: 0.5rem; text-align: right;">800</td><td style="padding: 0.5rem; text-align: right;">30</td></tr>\n<tr><td style="padding: 0.5rem;">2</td><td style="padding: 0.5rem; text-align: right;">600</td><td style="padding: 0.5rem; text-align: right;">45</td></tr>\n<tr><td style="padding: 0.5rem;">3</td><td style="padding: 0.5rem; text-align: right;">400</td><td style="padding: 0.5rem; text-align: right;">60</td></tr>\n<tr><td style="padding: 0.5rem;">4</td><td style="padding: 0.5rem; text-align: right;">350</td><td style="padding: 0.5rem; text-align: right;">50</td></tr>\n</table>\n\nBased on Table 1, as prey population decreased from Year 1 to Year 3:',
    ch: [
      {letter: 'A', text: 'predator population also decreased.'},
      {letter: 'B', text: 'predator population increased.'},
      {letter: 'C', text: 'predator population remained constant.'},
      {letter: 'D', text: 'predator population fluctuated randomly.'}
    ],
    ans: 'B',
    sol: 'Year 1→3: Prey decreased (800→400) while Predator increased (30→60). Inverse relationship in this period.'
  },
  {
    pos: 18,
    diff: 'easy',
    text: 'An experiment measured current in a circuit at different voltages. The results are shown below.<br><br><strong>Table 1</strong>\n\n<table style="border-collapse: collapse; margin: 1rem 0; width: 100%;">\n<tr style="border-bottom: 2px solid #333;"><th style="padding: 0.5rem; text-align: left;">Voltage (V)</th><th style="padding: 0.5rem; text-align: right;">Current (A)</th></tr>\n<tr><td style="padding: 0.5rem;">2</td><td style="padding: 0.5rem; text-align: right;">0.4</td></tr>\n<tr><td style="padding: 0.5rem;">4</td><td style="padding: 0.5rem; text-align: right;">0.8</td></tr>\n<tr><td style="padding: 0.5rem;">6</td><td style="padding: 0.5rem; text-align: right;">1.2</td></tr>\n<tr><td style="padding: 0.5rem;">8</td><td style="padding: 0.5rem; text-align: right;">1.6</td></tr>\n</table>\n\nAccording to Table 1, as voltage increased, current:',
    ch: [
      {letter: 'A', text: 'increased only.'},
      {letter: 'B', text: 'decreased only.'},
      {letter: 'C', text: 'increased, then decreased.'},
      {letter: 'D', text: 'remained constant.'}
    ],
    ans: 'A',
    sol: 'Current: 0.4 → 0.8 → 1.2 → 1.6 A. Consistently increased with voltage (Ohm\'s Law).'
  },
  {
    pos: 19,
    diff: 'hard',
    text: 'Researchers measured radioactive decay over time. The results are shown below.<br><br><strong>Table 1</strong>\n\n<table style="border-collapse: collapse; margin: 1rem 0; width: 100%;">\n<tr style="border-bottom: 2px solid #333;"><th style="padding: 0.5rem; text-align: left;">Time (years)</th><th style="padding: 0.5rem; text-align: right;">Remaining Material (g)</th></tr>\n<tr><td style="padding: 0.5rem;">0</td><td style="padding: 0.5rem; text-align: right;">800</td></tr>\n<tr><td style="padding: 0.5rem;">5730</td><td style="padding: 0.5rem; text-align: right;">400</td></tr>\n<tr><td style="padding: 0.5rem;">11460</td><td style="padding: 0.5rem; text-align: right;">200</td></tr>\n<tr><td style="padding: 0.5rem;">17190</td><td style="padding: 0.5rem; text-align: right;">100</td></tr>\n</table>\n\nBased on Table 1, radioactive decay is best described as:',
    ch: [
      {letter: 'A', text: 'linear decay; constant amount lost per period.'},
      {letter: 'B', text: 'exponential decay; constant fraction lost per period.'},
      {letter: 'C', text: 'quadratic decay; amount squared each period.'},
      {letter: 'D', text: 'no decay; amount remains constant.'}
    ],
    ans: 'B',
    sol: 'Material halves every 5730 years: 800→400→200→100. This is exponential decay (half-life pattern).'
  },
  {
    pos: 20,
    diff: 'medium',
    text: 'Scientists measured wind speed at different heights above ground. The results are shown below.<br><br><strong>Table 1</strong>\n\n<table style="border-collapse: collapse; margin: 1rem 0; width: 100%;">\n<tr style="border-bottom: 2px solid #333;"><th style="padding: 0.5rem; text-align: left;">Height (m)</th><th style="padding: 0.5rem; text-align: right;">Wind Speed (m/s)</th></tr>\n<tr><td style="padding: 0.5rem;">1</td><td style="padding: 0.5rem; text-align: right;">3.2</td></tr>\n<tr><td style="padding: 0.5rem;">5</td><td style="padding: 0.5rem; text-align: right;">6.8</td></tr>\n<tr><td style="padding: 0.5rem;">10</td><td style="padding: 0.5rem; text-align: right;">9.1</td></tr>\n<tr><td style="padding: 0.5rem;">20</td><td style="padding: 0.5rem; text-align: right;">11.5</td></tr>\n</table>\n\nBased on Table 1, the relationship between height and wind speed is:',
    ch: [
      {letter: 'A', text: 'direct; both increased together.'},
      {letter: 'B', text: 'inverse; as height increased, wind speed decreased.'},
      {letter: 'C', text: 'no relationship.'},
      {letter: 'D', text: 'constant; wind speed did not change.'}
    ],
    ans: 'A',
    sol: 'Height increased (1→20 m) and wind speed also increased (3.2→11.5 m/s). Direct relationship.'
  },
  {
    pos: 21,
    diff: 'easy',
    text: 'A study measured sugar concentration during fermentation. The results are shown below.<br><br><strong>Table 1</strong>\n\n<table style="border-collapse: collapse; margin: 1rem 0; width: 100%;">\n<tr style="border-bottom: 2px solid #333;"><th style="padding: 0.5rem; text-align: left;">Time (hours)</th><th style="padding: 0.5rem; text-align: right;">Sugar (g/L)</th></tr>\n<tr><td style="padding: 0.5rem;">0</td><td style="padding: 0.5rem; text-align: right;">150</td></tr>\n<tr><td style="padding: 0.5rem;">12</td><td style="padding: 0.5rem; text-align: right;">120</td></tr>\n<tr><td style="padding: 0.5rem;">24</td><td style="padding: 0.5rem; text-align: right;">90</td></tr>\n<tr><td style="padding: 0.5rem;">36</td><td style="padding: 0.5rem; text-align: right;">60</td></tr>\n</table>\n\nAccording to Table 1, as fermentation time increased, sugar concentration:',
    ch: [
      {letter: 'A', text: 'increased only.'},
      {letter: 'B', text: 'decreased only.'},
      {letter: 'C', text: 'increased, then decreased.'},
      {letter: 'D', text: 'remained constant.'}
    ],
    ans: 'B',
    sol: 'Sugar: 150 → 120 → 90 → 60 g/L. Consistently decreased as yeast consumed sugar.'
  },
  {
    pos: 22,
    diff: 'medium',
    text: 'Researchers measured membrane permeability at different temperatures. The results are shown below.<br><br><strong>Table 1</strong>\n\n<table style="border-collapse: collapse; margin: 1rem 0; width: 100%;">\n<tr style="border-bottom: 2px solid #333;"><th style="padding: 0.5rem; text-align: left;">Temperature (°C)</th><th style="padding: 0.5rem; text-align: right;">Permeability (×10⁻⁶ cm/s)</th></tr>\n<tr><td style="padding: 0.5rem;">10</td><td style="padding: 0.5rem; text-align: right;">2.5</td></tr>\n<tr><td style="padding: 0.5rem;">20</td><td style="padding: 0.5rem; text-align: right;">5.0</td></tr>\n<tr><td style="padding: 0.5rem;">30</td><td style="padding: 0.5rem; text-align: right;">10.0</td></tr>\n<tr><td style="padding: 0.5rem;">40</td><td style="padding: 0.5rem; text-align: right;">20.0</td></tr>\n</table>\n\nBased on Table 1, membrane permeability:',
    ch: [
      {letter: 'A', text: 'increased linearly with temperature.'},
      {letter: 'B', text: 'doubled with each 10°C increase.'},
      {letter: 'C', text: 'decreased with temperature.'},
      {letter: 'D', text: 'remained constant.'}
    ],
    ans: 'B',
    sol: '10→20°C: 2.5→5.0 (×2)\n20→30°C: 5.0→10.0 (×2)\n30→40°C: 10.0→20.0 (×2)\n\nPermeability doubled with each 10°C increase - exponential growth.'
  },
  {
    pos: 23,
    diff: 'easy',
    text: 'Scientists measured light intensity at different water depths. The results are shown below.<br><br><strong>Table 1</strong>\n\n<table style="border-collapse: collapse; margin: 1rem 0; width: 100%;">\n<tr style="border-bottom: 2px solid #333;"><th style="padding: 0.5rem; text-align: left;">Depth (m)</th><th style="padding: 0.5rem; text-align: right;">Light Intensity (%)</th></tr>\n<tr><td style="padding: 0.5rem;">0</td><td style="padding: 0.5rem; text-align: right;">100</td></tr>\n<tr><td style="padding: 0.5rem;">10</td><td style="padding: 0.5rem; text-align: right;">65</td></tr>\n<tr><td style="padding: 0.5rem;">20</td><td style="padding: 0.5rem; text-align: right;">42</td></tr>\n<tr><td style="padding: 0.5rem;">30</td><td style="padding: 0.5rem; text-align: right;">27</td></tr>\n</table>\n\nBased on Table 1, as depth increased, light intensity:',
    ch: [
      {letter: 'A', text: 'increased only.'},
      {letter: 'B', text: 'decreased only.'},
      {letter: 'C', text: 'increased, then decreased.'},
      {letter: 'D', text: 'remained constant.'}
    ],
    ans: 'B',
    sol: 'Light intensity: 100% → 65% → 42% → 27%. Decreased as depth increased due to absorption.'
  },
  {
    pos: 24,
    diff: 'hard',
    text: 'An experiment measured reaction rate at different substrate concentrations. The results are shown below.<br><br><strong>Table 1</strong>\n\n<table style="border-collapse: collapse; margin: 1rem 0; width: 100%;">\n<tr style="border-bottom: 2px solid #333;"><th style="padding: 0.5rem; text-align: left;">Substrate (mM)</th><th style="padding: 0.5rem; text-align: right;">Rate (μmol/min)</th></tr>\n<tr><td style="padding: 0.5rem;">1</td><td style="padding: 0.5rem; text-align: right;">20</td></tr>\n<tr><td style="padding: 0.5rem;">2</td><td style="padding: 0.5rem; text-align: right;">33</td></tr>\n<tr><td style="padding: 0.5rem;">5</td><td style="padding: 0.5rem; text-align: right;">50</td></tr>\n<tr><td style="padding: 0.5rem;">10</td><td style="padding: 0.5rem; text-align: right;">57</td></tr>\n<tr><td style="padding: 0.5rem;">20</td><td style="padding: 0.5rem; text-align: right;">60</td></tr>\n</table>\n\nBased on Table 1, as substrate concentration increased:',
    ch: [
      {letter: 'A', text: 'rate increased linearly throughout.'},
      {letter: 'B', text: 'rate increased rapidly at first, then leveled off.'},
      {letter: 'C', text: 'rate decreased throughout.'},
      {letter: 'D', text: 'rate remained constant.'}
    ],
    ans: 'B',
    sol: '1→2 mM: +13 μmol/min\n2→5 mM: +17 μmol/min\n5→10 mM: +7 μmol/min\n10→20 mM: +3 μmol/min\n\nRate increased but increments got smaller - approaching enzyme saturation.'
  },
  {
    pos: 25,
    diff: 'medium',
    text: 'A study measured evaporation rate at different humidity levels. The results are shown below.<br><br><strong>Table 1</strong>\n\n<table style="border-collapse: collapse; margin: 1rem 0; width: 100%;">\n<tr style="border-bottom: 2px solid #333;"><th style="padding: 0.5rem; text-align: left;">Humidity (%)</th><th style="padding: 0.5rem; text-align: right;">Evaporation (mL/hr)</th></tr>\n<tr><td style="padding: 0.5rem;">20</td><td style="padding: 0.5rem; text-align: right;">8.5</td></tr>\n<tr><td style="padding: 0.5rem;">40</td><td style="padding: 0.5rem; text-align: right;">6.2</td></tr>\n<tr><td style="padding: 0.5rem;">60</td><td style="padding: 0.5rem; text-align: right;">4.0</td></tr>\n<tr><td style="padding: 0.5rem;">80</td><td style="padding: 0.5rem; text-align: right;">1.8</td></tr>\n</table>\n\nBased on Table 1, the relationship between humidity and evaporation is:',
    ch: [
      {letter: 'A', text: 'direct; both increased together.'},
      {letter: 'B', text: 'inverse; as humidity increased, evaporation decreased.'},
      {letter: 'C', text: 'no relationship.'},
      {letter: 'D', text: 'quadratic; evaporation squared as humidity increased.'}
    ],
    ans: 'B',
    sol: 'Humidity increased (20→80%) while evaporation decreased (8.5→1.8 mL/hr). Inverse relationship.'
  },
  {
    pos: 26,
    diff: 'easy',
    text: 'Scientists measured carbon dioxide production during cellular respiration. The results are shown below.<br><br><strong>Table 1</strong>\n\n<table style="border-collapse: collapse; margin: 1rem 0; width: 100%;">\n<tr style="border-bottom: 2px solid #333;"><th style="padding: 0.5rem; text-align: left;">Time (min)</th><th style="padding: 0.5rem; text-align: right;">CO₂ (mL)</th></tr>\n<tr><td style="padding: 0.5rem;">0</td><td style="padding: 0.5rem; text-align: right;">0</td></tr>\n<tr><td style="padding: 0.5rem;">15</td><td style="padding: 0.5rem; text-align: right;">12</td></tr>\n<tr><td style="padding: 0.5rem;">30</td><td style="padding: 0.5rem; text-align: right;">24</td></tr>\n<tr><td style="padding: 0.5rem;">45</td><td style="padding: 0.5rem; text-align: right;">36</td></tr>\n</table>\n\nAccording to Table 1, as time increased, CO₂ production:',
    ch: [
      {letter: 'A', text: 'increased only.'},
      {letter: 'B', text: 'decreased only.'},
      {letter: 'C', text: 'increased, then decreased.'},
      {letter: 'D', text: 'remained constant.'}
    ],
    ans: 'A',
    sol: 'CO₂: 0 → 12 → 24 → 36 mL. Increased steadily over time.'
  },
  {
    pos: 27,
    diff: 'medium',
    text: 'Researchers measured sound intensity at different distances from a speaker. The results are shown below.<br><br><strong>Table 1</strong>\n\n<table style="border-collapse: collapse; margin: 1rem 0; width: 100%;">\n<tr style="border-bottom: 2px solid #333;"><th style="padding: 0.5rem; text-align: left;">Distance (m)</th><th style="padding: 0.5rem; text-align: right;">Intensity (dB)</th></tr>\n<tr><td style="padding: 0.5rem;">1</td><td style="padding: 0.5rem; text-align: right;">90</td></tr>\n<tr><td style="padding: 0.5rem;">2</td><td style="padding: 0.5rem; text-align: right;">84</td></tr>\n<tr><td style="padding: 0.5rem;">4</td><td style="padding: 0.5rem; text-align: right;">78</td></tr>\n<tr><td style="padding: 0.5rem;">8</td><td style="padding: 0.5rem; text-align: right;">72</td></tr>\n</table>\n\nBased on Table 1, as distance from the speaker doubled:',
    ch: [
      {letter: 'A', text: 'intensity increased by 6 dB.'},
      {letter: 'B', text: 'intensity decreased by 6 dB.'},
      {letter: 'C', text: 'intensity remained constant.'},
      {letter: 'D', text: 'intensity doubled.'}
    ],
    ans: 'B',
    sol: '1→2 m: 90→84 dB (-6 dB)\n2→4 m: 84→78 dB (-6 dB)\n4→8 m: 78→72 dB (-6 dB)\n\nEach doubling of distance decreased intensity by 6 dB.'
  },
  {
    pos: 28,
    diff: 'easy',
    text: 'A botanist measured leaf count on a plant over several weeks. The results are shown below.<br><br><strong>Table 1</strong>\n\n<table style="border-collapse: collapse; margin: 1rem 0; width: 100%;">\n<tr style="border-bottom: 2px solid #333;"><th style="padding: 0.5rem; text-align: left;">Week</th><th style="padding: 0.5rem; text-align: right;">Leaf Count</th></tr>\n<tr><td style="padding: 0.5rem;">1</td><td style="padding: 0.5rem; text-align: right;">8</td></tr>\n<tr><td style="padding: 0.5rem;">2</td><td style="padding: 0.5rem; text-align: right;">14</td></tr>\n<tr><td style="padding: 0.5rem;">3</td><td style="padding: 0.5rem; text-align: right;">20</td></tr>\n<tr><td style="padding: 0.5rem;">4</td><td style="padding: 0.5rem; text-align: right;">26</td></tr>\n</table>\n\nBased on Table 1, from Week 1 to Week 4, leaf count:',
    ch: [
      {letter: 'A', text: 'increased only.'},
      {letter: 'B', text: 'decreased only.'},
      {letter: 'C', text: 'increased, then decreased.'},
      {letter: 'D', text: 'remained constant.'}
    ],
    ans: 'A',
    sol: 'Leaf count: 8 → 14 → 20 → 26. Consistently increased each week.'
  },
  {
    pos: 29,
    diff: 'hard',
    text: 'Scientists measured the half-life of a medication in the bloodstream. The results are shown below.<br><br><strong>Table 1</strong>\n\n<table style="border-collapse: collapse; margin: 1rem 0; width: 100%;">\n<tr style="border-bottom: 2px solid #333;"><th style="padding: 0.5rem; text-align: left;">Time (hours)</th><th style="padding: 0.5rem; text-align: right;">Concentration (mg/L)</th></tr>\n<tr><td style="padding: 0.5rem;">0</td><td style="padding: 0.5rem; text-align: right;">400</td></tr>\n<tr><td style="padding: 0.5rem;">4</td><td style="padding: 0.5rem; text-align: right;">200</td></tr>\n<tr><td style="padding: 0.5rem;">8</td><td style="padding: 0.5rem; text-align: right;">100</td></tr>\n<tr><td style="padding: 0.5rem;">12</td><td style="padding: 0.5rem; text-align: right;">50</td></tr>\n</table>\n\nBased on Table 1, the medication concentration:',
    ch: [
      {letter: 'A', text: 'decreased linearly by 100 mg/L every 4 hours.'},
      {letter: 'B', text: 'halved every 4 hours.'},
      {letter: 'C', text: 'increased exponentially.'},
      {letter: 'D', text: 'remained constant.'}
    ],
    ans: 'B',
    sol: 'Every 4 hours: 400→200→100→50 (halved each time). Exponential decay with 4-hour half-life.'
  },
  {
    pos: 30,
    diff: 'medium',
    text: 'Researchers measured stream flow rate at different slopes. The results are shown below.<br><br><strong>Table 1</strong>\n\n<table style="border-collapse: collapse; margin: 1rem 0; width: 100%;">\n<tr style="border-bottom: 2px solid #333;"><th style="padding: 0.5rem; text-align: left;">Slope (degrees)</th><th style="padding: 0.5rem; text-align: right;">Flow Rate (L/s)</th></tr>\n<tr><td style="padding: 0.5rem;">5</td><td style="padding: 0.5rem; text-align: right;">12</td></tr>\n<tr><td style="padding: 0.5rem;">10</td><td style="padding: 0.5rem; text-align: right;">28</td></tr>\n<tr><td style="padding: 0.5rem;">15</td><td style="padding: 0.5rem; text-align: right;">45</td></tr>\n<tr><td style="padding: 0.5rem;">20</td><td style="padding: 0.5rem; text-align: right;">61</td></tr>\n</table>\n\nBased on Table 1, as slope increased, flow rate:',
    ch: [
      {letter: 'A', text: 'increased at a constant rate.'},
      {letter: 'B', text: 'increased at an increasing rate.'},
      {letter: 'C', text: 'decreased.'},
      {letter: 'D', text: 'remained constant.'}
    ],
    ans: 'B',
    sol: '5→10°: +16 L/s\n10→15°: +17 L/s\n15→20°: +16 L/s\n\nFlow rate increased and the rate of increase accelerated slightly.'
  },
  {
    pos: 31,
    diff: 'easy',
    text: 'A study measured ozone concentration at different times of day. The results are shown below.<br><br><strong>Table 1</strong>\n\n<table style="border-collapse: collapse; margin: 1rem 0; width: 100%;">\n<tr style="border-bottom: 2px solid #333;"><th style="padding: 0.5rem; text-align: left;">Time</th><th style="padding: 0.5rem; text-align: right;">Ozone (ppb)</th></tr>\n<tr><td style="padding: 0.5rem;">6 AM</td><td style="padding: 0.5rem; text-align: right;">25</td></tr>\n<tr><td style="padding: 0.5rem;">10 AM</td><td style="padding: 0.5rem; text-align: right;">42</td></tr>\n<tr><td style="padding: 0.5rem;">2 PM</td><td style="padding: 0.5rem; text-align: right;">68</td></tr>\n<tr><td style="padding: 0.5rem;">6 PM</td><td style="padding: 0.5rem; text-align: right;">51</td></tr>\n</table>\n\nBased on Table 1, ozone concentration:',
    ch: [
      {letter: 'A', text: 'increased only.'},
      {letter: 'B', text: 'decreased only.'},
      {letter: 'C', text: 'increased, then decreased.'},
      {letter: 'D', text: 'remained constant.'}
    ],
    ans: 'C',
    sol: '6 AM→2 PM: 25→42→68 (increased)\n2 PM→6 PM: 68→51 (decreased)\n\nOzone peaked in afternoon, then decreased.'
  },
  {
    pos: 32,
    diff: 'medium',
    text: 'Scientists measured spring constant by applying different forces. The results are shown below.<br><br><strong>Table 1</strong>\n\n<table style="border-collapse: collapse; margin: 1rem 0; width: 100%;">\n<tr style="border-bottom: 2px solid #333;"><th style="padding: 0.5rem; text-align: left;">Force (N)</th><th style="padding: 0.5rem; text-align: right;">Extension (cm)</th></tr>\n<tr><td style="padding: 0.5rem;">10</td><td style="padding: 0.5rem; text-align: right;">2</td></tr>\n<tr><td style="padding: 0.5rem;">20</td><td style="padding: 0.5rem; text-align: right;">4</td></tr>\n<tr><td style="padding: 0.5rem;">30</td><td style="padding: 0.5rem; text-align: right;">6</td></tr>\n<tr><td style="padding: 0.5rem;">40</td><td style="padding: 0.5rem; text-align: right;">8</td></tr>\n</table>\n\nBased on Table 1, the relationship between force and extension is:',
    ch: [
      {letter: 'A', text: 'direct and linear.'},
      {letter: 'B', text: 'direct and exponential.'},
      {letter: 'C', text: 'inverse.'},
      {letter: 'D', text: 'no relationship.'}
    ],
    ans: 'A',
    sol: 'Force and extension both increase proportionally (F/x = 5 throughout). Direct linear relationship (Hooke\'s Law).'
  },
  {
    pos: 33,
    diff: 'easy',
    text: 'Ecologists measured deer population in a protected area. The results are shown below.<br><br><strong>Table 1</strong>\n\n<table style="border-collapse: collapse; margin: 1rem 0; width: 100%;">\n<tr style="border-bottom: 2px solid #333;"><th style="padding: 0.5rem; text-align: left;">Year</th><th style="padding: 0.5rem; text-align: right;">Population</th></tr>\n<tr><td style="padding: 0.5rem;">2018</td><td style="padding: 0.5rem; text-align: right;">120</td></tr>\n<tr><td style="padding: 0.5rem;">2019</td><td style="padding: 0.5rem; text-align: right;">145</td></tr>\n<tr><td style="padding: 0.5rem;">2020</td><td style="padding: 0.5rem; text-align: right;">170</td></tr>\n<tr><td style="padding: 0.5rem;">2021</td><td style="padding: 0.5rem; text-align: right;">195</td></tr>\n</table>\n\nAccording to Table 1, from 2018 to 2021, deer population:',
    ch: [
      {letter: 'A', text: 'increased only.'},
      {letter: 'B', text: 'decreased only.'},
      {letter: 'C', text: 'increased, then decreased.'},
      {letter: 'D', text: 'remained constant.'}
    ],
    ans: 'A',
    sol: 'Population: 120 → 145 → 170 → 195. Consistently increased each year.'
  },
  {
    pos: 34,
    diff: 'hard',
    text: 'Researchers measured enzyme inhibition at different inhibitor concentrations. The results are shown below.<br><br><strong>Table 1</strong>\n\n<table style="border-collapse: collapse; margin: 1rem 0; width: 100%;">\n<tr style="border-bottom: 2px solid #333;"><th style="padding: 0.5rem; text-align: left;">Inhibitor (μM)</th><th style="padding: 0.5rem; text-align: right;">Activity (%)</th></tr>\n<tr><td style="padding: 0.5rem;">0</td><td style="padding: 0.5rem; text-align: right;">100</td></tr>\n<tr><td style="padding: 0.5rem;">10</td><td style="padding: 0.5rem; text-align: right;">50</td></tr>\n<tr><td style="padding: 0.5rem;">20</td><td style="padding: 0.5rem; text-align: right;">33</td></tr>\n<tr><td style="padding: 0.5rem;">50</td><td style="padding: 0.5rem; text-align: right;">17</td></tr>\n</table>\n\nBased on Table 1, as inhibitor concentration increased:',
    ch: [
      {letter: 'A', text: 'activity decreased linearly.'},
      {letter: 'B', text: 'activity decreased at a decreasing rate.'},
      {letter: 'C', text: 'activity increased.'},
      {letter: 'D', text: 'activity remained constant.'}
    ],
    ans: 'B',
    sol: '0→10 μM: -50%\n10→20 μM: -17%\n20→50 μM: -16%\n\nActivity decreased but the rate of decrease slowed - approaching complete inhibition asymptotically.'
  },
  {
    pos: 35,
    diff: 'medium',
    text: 'A study measured dissolved nitrogen at different ocean depths. The results are shown below.<br><br><strong>Table 1</strong>\n\n<table style="border-collapse: collapse; margin: 1rem 0; width: 100%;">\n<tr style="border-bottom: 2px solid #333;"><th style="padding: 0.5rem; text-align: left;">Depth (m)</th><th style="padding: 0.5rem; text-align: right;">Nitrogen (mg/L)</th></tr>\n<tr><td style="padding: 0.5rem;">0</td><td style="padding: 0.5rem; text-align: right;">0.8</td></tr>\n<tr><td style="padding: 0.5rem;">100</td><td style="padding: 0.5rem; text-align: right;">1.2</td></tr>\n<tr><td style="padding: 0.5rem;">200</td><td style="padding: 0.5rem; text-align: right;">1.6</td></tr>\n<tr><td style="padding: 0.5rem;">300</td><td style="padding: 0.5rem; text-align: right;">2.0</td></tr>\n</table>\n\nBased on Table 1, the relationship between depth and nitrogen is:',
    ch: [
      {letter: 'A', text: 'direct; both increased together.'},
      {letter: 'B', text: 'inverse; as depth increased, nitrogen decreased.'},
      {letter: 'C', text: 'no relationship.'},
      {letter: 'D', text: 'constant; nitrogen did not change.'}
    ],
    ans: 'A',
    sol: 'Depth increased (0→300 m) and nitrogen also increased (0.8→2.0 mg/L). Direct relationship.'
  },
  {
    pos: 36,
    diff: 'easy',
    text: 'Scientists measured water loss from leaves over time. The results are shown below.<br><br><strong>Table 1</strong>\n\n<table style="border-collapse: collapse; margin: 1rem 0; width: 100%;">\n<tr style="border-bottom: 2px solid #333;"><th style="padding: 0.5rem; text-align: left;">Time (hours)</th><th style="padding: 0.5rem; text-align: right;">Water Loss (mL)</th></tr>\n<tr><td style="padding: 0.5rem;">1</td><td style="padding: 0.5rem; text-align: right;">3.2</td></tr>\n<tr><td style="padding: 0.5rem;">2</td><td style="padding: 0.5rem; text-align: right;">6.4</td></tr>\n<tr><td style="padding: 0.5rem;">3</td><td style="padding: 0.5rem; text-align: right;">9.6</td></tr>\n<tr><td style="padding: 0.5rem;">4</td><td style="padding: 0.5rem; text-align: right;">12.8</td></tr>\n</table>\n\nAccording to Table 1, as time increased, water loss:',
    ch: [
      {letter: 'A', text: 'increased only.'},
      {letter: 'B', text: 'decreased only.'},
      {letter: 'C', text: 'increased, then decreased.'},
      {letter: 'D', text: 'remained constant.'}
    ],
    ans: 'A',
    sol: 'Water loss: 3.2 → 6.4 → 9.6 → 12.8 mL. Increased steadily (3.2 mL/hr rate).'
  },
  {
    pos: 37,
    diff: 'medium',
    text: 'Researchers measured electrical resistance at different wire lengths. The results are shown below.<br><br><strong>Table 1</strong>\n\n<table style="border-collapse: collapse; margin: 1rem 0; width: 100%;">\n<tr style="border-bottom: 2px solid #333;"><th style="padding: 0.5rem; text-align: left;">Length (m)</th><th style="padding: 0.5rem; text-align: right;">Resistance (Ω)</th></tr>\n<tr><td style="padding: 0.5rem;">1</td><td style="padding: 0.5rem; text-align: right;">0.5</td></tr>\n<tr><td style="padding: 0.5rem;">2</td><td style="padding: 0.5rem; text-align: right;">1.0</td></tr>\n<tr><td style="padding: 0.5rem;">3</td><td style="padding: 0.5rem; text-align: right;">1.5</td></tr>\n<tr><td style="padding: 0.5rem;">4</td><td style="padding: 0.5rem; text-align: right;">2.0</td></tr>\n</table>\n\nBased on Table 1, resistance is:',
    ch: [
      {letter: 'A', text: 'directly proportional to length.'},
      {letter: 'B', text: 'inversely proportional to length.'},
      {letter: 'C', text: 'unrelated to length.'},
      {letter: 'D', text: 'proportional to length squared.'}
    ],
    ans: 'A',
    sol: 'Resistance/Length = 0.5 throughout. Linear relationship: R = 0.5L (directly proportional).'
  },
  {
    pos: 38,
    diff: 'easy',
    text: 'A study measured nitrogen fixation by bacteria at different temperatures. The results are shown below.<br><br><strong>Table 1</strong>\n\n<table style="border-collapse: collapse; margin: 1rem 0; width: 100%;">\n<tr style="border-bottom: 2px solid #333;"><th style="padding: 0.5rem; text-align: left;">Temperature (°C)</th><th style="padding: 0.5rem; text-align: right;">Fixation Rate (mg/day)</th></tr>\n<tr><td style="padding: 0.5rem;">15</td><td style="padding: 0.5rem; text-align: right;">8</td></tr>\n<tr><td style="padding: 0.5rem;">20</td><td style="padding: 0.5rem; text-align: right;">15</td></tr>\n<tr><td style="padding: 0.5rem;">25</td><td style="padding: 0.5rem; text-align: right;">22</td></tr>\n<tr><td style="padding: 0.5rem;">30</td><td style="padding: 0.5rem; text-align: right;">19</td></tr>\n<tr><td style="padding: 0.5rem;">35</td><td style="padding: 0.5rem; text-align: right;">10</td></tr>\n</table>\n\nBased on Table 1, fixation rate:',
    ch: [
      {letter: 'A', text: 'increased only.'},
      {letter: 'B', text: 'decreased only.'},
      {letter: 'C', text: 'increased, then decreased.'},
      {letter: 'D', text: 'remained constant.'}
    ],
    ans: 'C',
    sol: '15→25°C: 8→15→22 (increased)\n25→35°C: 22→19→10 (decreased)\n\nOptimum around 25°C, then decreased at higher temperatures.'
  },
  {
    pos: 39,
    diff: 'hard',
    text: 'Scientists measured surface area to volume ratio for different sphere sizes. The results are shown below.<br><br><strong>Table 1</strong>\n\n<table style="border-collapse: collapse; margin: 1rem 0; width: 100%;">\n<tr style="border-bottom: 2px solid #333;"><th style="padding: 0.5rem; text-align: left;">Radius (cm)</th><th style="padding: 0.5rem; text-align: right;">SA:V Ratio</th></tr>\n<tr><td style="padding: 0.5rem;">1</td><td style="padding: 0.5rem; text-align: right;">3.0</td></tr>\n<tr><td style="padding: 0.5rem;">2</td><td style="padding: 0.5rem; text-align: right;">1.5</td></tr>\n<tr><td style="padding: 0.5rem;">4</td><td style="padding: 0.5rem; text-align: right;">0.75</td></tr>\n<tr><td style="padding: 0.5rem;">8</td><td style="padding: 0.5rem; text-align: right;">0.375</td></tr>\n</table>\n\nBased on Table 1, as radius doubled:',
    ch: [
      {letter: 'A', text: 'SA:V ratio doubled.'},
      {letter: 'B', text: 'SA:V ratio halved.'},
      {letter: 'C', text: 'SA:V ratio remained constant.'},
      {letter: 'D', text: 'SA:V ratio quadrupled.'}
    ],
    ans: 'B',
    sol: '1→2 cm: 3.0→1.5 (halved)\n2→4 cm: 1.5→0.75 (halved)\n4→8 cm: 0.75→0.375 (halved)\n\nSA:V ratio halved each time radius doubled (inverse relationship).'
  },
  {
    pos: 40,
    diff: 'medium',
    text: 'Researchers measured protein denaturation at different pH levels. The results are shown below.<br><br><strong>Table 1</strong>\n\n<table style="border-collapse: collapse; margin: 1rem 0; width: 100%;">\n<tr style="border-bottom: 2px solid #333;"><th style="padding: 0.5rem; text-align: left;">pH</th><th style="padding: 0.5rem; text-align: right;">Native Protein (%)</th></tr>\n<tr><td style="padding: 0.5rem;">2</td><td style="padding: 0.5rem; text-align: right;">15</td></tr>\n<tr><td style="padding: 0.5rem;">4</td><td style="padding: 0.5rem; text-align: right;">45</td></tr>\n<tr><td style="padding: 0.5rem;">7</td><td style="padding: 0.5rem; text-align: right;">95</td></tr>\n<tr><td style="padding: 0.5rem;">10</td><td style="padding: 0.5rem; text-align: right;">40</td></tr>\n<tr><td style="padding: 0.5rem;">12</td><td style="padding: 0.5rem; text-align: right;">10</td></tr>\n</table>\n\nBased on Table 1, native protein percentage:',
    ch: [
      {letter: 'A', text: 'increased only as pH increased.'},
      {letter: 'B', text: 'decreased only as pH increased.'},
      {letter: 'C', text: 'increased then decreased as pH increased.'},
      {letter: 'D', text: 'remained constant.'}
    ],
    ans: 'C',
    sol: 'pH 2→7: 15→45→95 (increased)\npH 7→12: 95→40→10 (decreased)\n\nOptimum at pH 7 (neutral), denatured at extremes.'
  },
  {
    pos: 41,
    diff: 'easy',
    text: 'A study measured chlorophyll content in leaves at different nitrogen levels. The results are shown below.<br><br><strong>Table 1</strong>\n\n<table style="border-collapse: collapse; margin: 1rem 0; width: 100%;">\n<tr style="border-bottom: 2px solid #333;"><th style="padding: 0.5rem; text-align: left;">Nitrogen (mg/L)</th><th style="padding: 0.5rem; text-align: right;">Chlorophyll (mg/g)</th></tr>\n<tr><td style="padding: 0.5rem;">10</td><td style="padding: 0.5rem; text-align: right;">1.2</td></tr>\n<tr><td style="padding: 0.5rem;">20</td><td style="padding: 0.5rem; text-align: right;">2.8</td></tr>\n<tr><td style="padding: 0.5rem;">30</td><td style="padding: 0.5rem; text-align: right;">4.4</td></tr>\n<tr><td style="padding: 0.5rem;">40</td><td style="padding: 0.5rem; text-align: right;">6.0</td></tr>\n</table>\n\nAccording to Table 1, as nitrogen increased, chlorophyll:',
    ch: [
      {letter: 'A', text: 'increased only.'},
      {letter: 'B', text: 'decreased only.'},
      {letter: 'C', text: 'increased, then decreased.'},
      {letter: 'D', text: 'remained constant.'}
    ],
    ans: 'A',
    sol: 'Chlorophyll: 1.2 → 2.8 → 4.4 → 6.0 mg/g. Consistently increased with nitrogen availability.'
  },
  {
    pos: 42,
    diff: 'medium',
    text: 'Scientists measured algae growth rate at different phosphate concentrations. The results are shown below.<br><br><strong>Table 1</strong>\n\n<table style="border-collapse: collapse; margin: 1rem 0; width: 100%;">\n<tr style="border-bottom: 2px solid #333;"><th style="padding: 0.5rem; text-align: left;">Phosphate (μM)</th><th style="padding: 0.5rem; text-align: right;">Growth Rate (cells/mL/day)</th></tr>\n<tr><td style="padding: 0.5rem;">0</td><td style="padding: 0.5rem; text-align: right;">50</td></tr>\n<tr><td style="padding: 0.5rem;">5</td><td style="padding: 0.5rem; text-align: right;">250</td></tr>\n<tr><td style="padding: 0.5rem;">10</td><td style="padding: 0.5rem; text-align: right;">450</td></tr>\n<tr><td style="padding: 0.5rem;">20</td><td style="padding: 0.5rem; text-align: right;">500</td></tr>\n<tr><td style="padding: 0.5rem;">40</td><td style="padding: 0.5rem; text-align: right;">520</td></tr>\n</table>\n\nBased on Table 1, as phosphate increased:',
    ch: [
      {letter: 'A', text: 'growth rate increased linearly.'},
      {letter: 'B', text: 'growth rate increased rapidly at first, then leveled off.'},
      {letter: 'C', text: 'growth rate decreased.'},
      {letter: 'D', text: 'growth rate remained constant.'}
    ],
    ans: 'B',
    sol: '0→5 μM: +200\n5→10 μM: +200\n10→20 μM: +50\n20→40 μM: +20\n\nGrowth increased dramatically at low concentrations, then plateaued at high concentrations.'
  },
  {
    pos: 43,
    diff: 'easy',
    text: 'Researchers measured rainfall during a storm. The results are shown below.<br><br><strong>Table 1</strong>\n\n<table style="border-collapse: collapse; margin: 1rem 0; width: 100%;">\n<tr style="border-bottom: 2px solid #333;"><th style="padding: 0.5rem; text-align: left;">Time (hours)</th><th style="padding: 0.5rem; text-align: right;">Cumulative Rain (mm)</th></tr>\n<tr><td style="padding: 0.5rem;">1</td><td style="padding: 0.5rem; text-align: right;">12</td></tr>\n<tr><td style="padding: 0.5rem;">2</td><td style="padding: 0.5rem; text-align: right;">28</td></tr>\n<tr><td style="padding: 0.5rem;">3</td><td style="padding: 0.5rem; text-align: right;">44</td></tr>\n<tr><td style="padding: 0.5rem;">4</td><td style="padding: 0.5rem; text-align: right;">60</td></tr>\n</table>\n\nBased on Table 1, as time increased, cumulative rainfall:',
    ch: [
      {letter: 'A', text: 'increased only.'},
      {letter: 'B', text: 'decreased only.'},
      {letter: 'C', text: 'increased, then decreased.'},
      {letter: 'D', text: 'remained constant.'}
    ],
    ans: 'A',
    sol: 'Cumulative rain: 12 → 28 → 44 → 60 mm. Increased steadily as storm continued.'
  },
  {
    pos: 44,
    diff: 'hard',
    text: 'Scientists measured light absorption by chlorophyll at different wavelengths. The results are shown below.<br><br><strong>Table 1</strong>\n\n<table style="border-collapse: collapse; margin: 1rem 0; width: 100%;">\n<tr style="border-bottom: 2px solid #333;"><th style="padding: 0.5rem; text-align: left;">Wavelength (nm)</th><th style="padding: 0.5rem; text-align: right;">Absorption (%)</th></tr>\n<tr><td style="padding: 0.5rem;">400</td><td style="padding: 0.5rem; text-align: right;">35</td></tr>\n<tr><td style="padding: 0.5rem;">450</td><td style="padding: 0.5rem; text-align: right;">80</td></tr>\n<tr><td style="padding: 0.5rem;">550</td><td style="padding: 0.5rem; text-align: right;">15</td></tr>\n<tr><td style="padding: 0.5rem;">650</td><td style="padding: 0.5rem; text-align: right;">75</td></tr>\n<tr><td style="padding: 0.5rem;">700</td><td style="padding: 0.5rem; text-align: right;">20</td></tr>\n</table>\n\nBased on Table 1, absorption:',
    ch: [
      {letter: 'A', text: 'increased steadily as wavelength increased.'},
      {letter: 'B', text: 'decreased steadily as wavelength increased.'},
      {letter: 'C', text: 'showed peaks at certain wavelengths and valleys at others.'},
      {letter: 'D', text: 'remained constant across all wavelengths.'}
    ],
    ans: 'C',
    sol: 'Absorption varied: high at 450nm (blue) and 650nm (red), low at 550nm (green). Shows characteristic chlorophyll absorption spectrum with peaks and valleys.'
  },
  {
    pos: 45,
    diff: 'medium',
    text: 'A study measured bone density at different ages. The results are shown below.<br><br><strong>Table 1</strong>\n\n<table style="border-collapse: collapse; margin: 1rem 0; width: 100%;">\n<tr style="border-bottom: 2px solid #333;"><th style="padding: 0.5rem; text-align: left;">Age (years)</th><th style="padding: 0.5rem; text-align: right;">Bone Density (g/cm³)</th></tr>\n<tr><td style="padding: 0.5rem;">20</td><td style="padding: 0.5rem; text-align: right;">1.15</td></tr>\n<tr><td style="padding: 0.5rem;">30</td><td style="padding: 0.5rem; text-align: right;">1.20</td></tr>\n<tr><td style="padding: 0.5rem;">40</td><td style="padding: 0.5rem; text-align: right;">1.18</td></tr>\n<tr><td style="padding: 0.5rem;">50</td><td style="padding: 0.5rem; text-align: right;">1.10</td></tr>\n<tr><td style="padding: 0.5rem;">60</td><td style="padding: 0.5rem; text-align: right;">0.95</td></tr>\n</table>\n\nBased on Table 1, bone density:',
    ch: [
      {letter: 'A', text: 'increased only.'},
      {letter: 'B', text: 'decreased only.'},
      {letter: 'C', text: 'increased, then decreased.'},
      {letter: 'D', text: 'remained constant.'}
    ],
    ans: 'C',
    sol: 'Age 20→30: 1.15→1.20 (increased)\nAge 30→60: 1.20→1.18→1.10→0.95 (decreased)\n\nPeaked around age 30, then decreased with aging.'
  },
  {
    pos: 46,
    diff: 'easy',
    text: 'Researchers measured seed germination rate at different soil moisture levels. The results are shown below.<br><br><strong>Table 1</strong>\n\n<table style="border-collapse: collapse; margin: 1rem 0; width: 100%;">\n<tr style="border-bottom: 2px solid #333;"><th style="padding: 0.5rem; text-align: left;">Soil Moisture (%)</th><th style="padding: 0.5rem; text-align: right;">Germination (%)</th></tr>\n<tr><td style="padding: 0.5rem;">10</td><td style="padding: 0.5rem; text-align: right;">5</td></tr>\n<tr><td style="padding: 0.5rem;">20</td><td style="padding: 0.5rem; text-align: right;">35</td></tr>\n<tr><td style="padding: 0.5rem;">30</td><td style="padding: 0.5rem; text-align: right;">75</td></tr>\n<tr><td style="padding: 0.5rem;">40</td><td style="padding: 0.5rem; text-align: right;">85</td></tr>\n</table>\n\nAccording to Table 1, as soil moisture increased, germination rate:',
    ch: [
      {letter: 'A', text: 'increased only.'},
      {letter: 'B', text: 'decreased only.'},
      {letter: 'C', text: 'increased, then decreased.'},
      {letter: 'D', text: 'remained constant.'}
    ],
    ans: 'A',
    sol: 'Germination: 5% → 35% → 75% → 85%. Consistently increased with more moisture.'
  },
  {
    pos: 47,
    diff: 'medium',
    text: 'Scientists measured coral reef diversity at different distances from shore. The results are shown below.<br><br><strong>Table 1</strong>\n\n<table style="border-collapse: collapse; margin: 1rem 0; width: 100%;">\n<tr style="border-bottom: 2px solid #333;"><th style="padding: 0.5rem; text-align: left;">Distance (km)</th><th style="padding: 0.5rem; text-align: right;">Species Count</th></tr>\n<tr><td style="padding: 0.5rem;">0.5</td><td style="padding: 0.5rem; text-align: right;">18</td></tr>\n<tr><td style="padding: 0.5rem;">1.0</td><td style="padding: 0.5rem; text-align: right;">32</td></tr>\n<tr><td style="padding: 0.5rem;">2.0</td><td style="padding: 0.5rem; text-align: right;">45</td></tr>\n<tr><td style="padding: 0.5rem;">4.0</td><td style="padding: 0.5rem; text-align: right;">52</td></tr>\n</table>\n\nBased on Table 1, as distance from shore increased:',
    ch: [
      {letter: 'A', text: 'species count increased at a constant rate.'},
      {letter: 'B', text: 'species count increased at a decreasing rate.'},
      {letter: 'C', text: 'species count decreased.'},
      {letter: 'D', text: 'species count remained constant.'}
    ],
    ans: 'B',
    sol: '0.5→1.0 km: +14 species\n1.0→2.0 km: +13 species\n2.0→4.0 km: +7 species\n\nDiversity increased but the rate slowed as distance increased.'
  },
  {
    pos: 48,
    diff: 'easy',
    text: 'An experiment measured crystal size at different cooling rates. The results are shown below.<br><br><strong>Table 1</strong>\n\n<table style="border-collapse: collapse; margin: 1rem 0; width: 100%;">\n<tr style="border-bottom: 2px solid #333;"><th style="padding: 0.5rem; text-align: left;">Cooling Rate (°C/min)</th><th style="padding: 0.5rem; text-align: right;">Crystal Size (mm)</th></tr>\n<tr><td style="padding: 0.5rem;">1</td><td style="padding: 0.5rem; text-align: right;">8.5</td></tr>\n<tr><td style="padding: 0.5rem;">2</td><td style="padding: 0.5rem; text-align: right;">6.2</td></tr>\n<tr><td style="padding: 0.5rem;">5</td><td style="padding: 0.5rem; text-align: right;">3.1</td></tr>\n<tr><td style="padding: 0.5rem;">10</td><td style="padding: 0.5rem; text-align: right;">1.5</td></tr>\n</table>\n\nBased on Table 1, as cooling rate increased, crystal size:',
    ch: [
      {letter: 'A', text: 'increased only.'},
      {letter: 'B', text: 'decreased only.'},
      {letter: 'C', text: 'increased, then decreased.'},
      {letter: 'D', text: 'remained constant.'}
    ],
    ans: 'B',
    sol: 'Crystal size: 8.5 → 6.2 → 3.1 → 1.5 mm. Decreased with faster cooling (less time to grow).'
  },
  {
    pos: 49,
    diff: 'hard',
    text: 'Researchers studied the relationship between prey density and predator hunting success. The results are shown below.<br><br><strong>Table 1</strong>\n\n<table style="border-collapse: collapse; margin: 1rem 0; width: 100%;">\n<tr style="border-bottom: 2px solid #333;"><th style="padding: 0.5rem; text-align: left;">Prey Density (per hectare)</th><th style="padding: 0.5rem; text-align: right;">Hunting Success (%)</th></tr>\n<tr><td style="padding: 0.5rem;">10</td><td style="padding: 0.5rem; text-align: right;">5</td></tr>\n<tr><td style="padding: 0.5rem;">50</td><td style="padding: 0.5rem; text-align: right;">20</td></tr>\n<tr><td style="padding: 0.5rem;">100</td><td style="padding: 0.5rem; text-align: right;">35</td></tr>\n<tr><td style="padding: 0.5rem;">200</td><td style="padding: 0.5rem; text-align: right;">42</td></tr>\n<tr><td style="padding: 0.5rem;">400</td><td style="padding: 0.5rem; text-align: right;">45</td></tr>\n</table>\n\nBased on Table 1, as prey density increased:',
    ch: [
      {letter: 'A', text: 'hunting success increased linearly.'},
      {letter: 'B', text: 'hunting success increased at a decreasing rate.'},
      {letter: 'C', text: 'hunting success decreased.'},
      {letter: 'D', text: 'hunting success remained constant.'}
    ],
    ans: 'B',
    sol: '10→50: +15%\n50→100: +15%\n100→200: +7%\n200→400: +3%\n\nSuccess increased but leveled off at high prey density (saturation effect).'
  },
  {
    pos: 50,
    diff: 'medium',
    text: 'A study measured traffic speed at different times during rush hour. The results are shown below.<br><br><strong>Table 1</strong>\n\n<table style="border-collapse: collapse; margin: 1rem 0; width: 100%;">\n<tr style="border-bottom: 2px solid #333;"><th style="padding: 0.5rem; text-align: left;">Time</th><th style="padding: 0.5rem; text-align: right;">Average Speed (km/h)</th></tr>\n<tr><td style="padding: 0.5rem;">7:00 AM</td><td style="padding: 0.5rem; text-align: right;">65</td></tr>\n<tr><td style="padding: 0.5rem;">7:30 AM</td><td style="padding: 0.5rem; text-align: right;">45</td></tr>\n<tr><td style="padding: 0.5rem;">8:00 AM</td><td style="padding: 0.5rem; text-align: right;">28</td></tr>\n<tr><td style="padding: 0.5rem;">8:30 AM</td><td style="padding: 0.5rem; text-align: right;">35</td></tr>\n<tr><td style="padding: 0.5rem;">9:00 AM</td><td style="padding: 0.5rem; text-align: right;">52</td></tr>\n</table>\n\nBased on Table 1, traffic speed:',
    ch: [
      {letter: 'A', text: 'increased only.'},
      {letter: 'B', text: 'decreased only.'},
      {letter: 'C', text: 'decreased, then increased.'},
      {letter: 'D', text: 'remained constant.'}
    ],
    ans: 'C',
    sol: '7:00→8:00: 65→45→28 (decreased)\n8:00→9:00: 28→35→52 (increased)\n\nSlowest at peak rush hour (8:00), then recovered as traffic cleared.'
  }
];

async function insertQuestions() {
  console.log('Finding lesson...');
  const { data: lesson, error: lessonError } = await supabase
    .from('lessons')
    .select('id')
    .eq('lesson_key', 'trends')
    .single();

  if (lessonError || !lesson) {
    console.error('Error finding lesson:', lessonError);
    return;
  }

  console.log(`Found lesson trends with ID: ${lesson.id}\n`);

  // Delete existing questions first
  console.log('Deleting existing questions...');
  const { error: deleteError } = await supabase
    .from('practice_questions')
    .delete()
    .eq('lesson_id', lesson.id);

  if (deleteError) {
    console.error('Error deleting questions:', deleteError);
  } else {
    console.log('Existing questions deleted successfully\n');
  }

  let successCount = 0;
  let errorCount = 0;

  for (const q of questions) {
    const { error } = await supabase
      .from('practice_questions')
      .insert({
        lesson_id: lesson.id,
        subject: 'science',
        position: q.pos,
        difficulty: q.diff,
        title: `Trends Question ${q.pos}`,
        problem_text: q.text,
        choices: q.ch,
        correct_answer: q.ans,
        answer_explanation: q.sol,
        solution_steps: null,
        diagram_svg: null
      });

    if (error) {
      console.error(`Error inserting question ${q.pos}:`, error);
      errorCount++;
    } else {
      successCount++;
      if (successCount % 10 === 0) {
        console.log(`Inserted ${successCount} questions...`);
      }
    }
  }

  console.log(`\n=== COMPLETE: ${successCount}/${questions.length} success, ${errorCount}/${questions.length} errors ===`);
}

insertQuestions();
