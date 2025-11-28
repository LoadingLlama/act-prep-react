require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const questions = [
  {
    pos: 1,
    diff: 'hard',
    text: 'A scientist recorded the temperature at different times of day:\n\n<table style="border-collapse: collapse; margin: 1rem 0;">\n<tr style="border-bottom: 2px solid #333;"><th style="padding: 0.5rem; text-align: left;">Time</th><th style="padding: 0.5rem; text-align: right;">Temperature (°F)</th></tr>\n<tr><td style="padding: 0.5rem;">6:00 AM</td><td style="padding: 0.5rem; text-align: right;">52</td></tr>\n<tr><td style="padding: 0.5rem;">9:00 AM</td><td style="padding: 0.5rem; text-align: right;">61</td></tr>\n<tr><td style="padding: 0.5rem;">12:00 PM</td><td style="padding: 0.5rem; text-align: right;">73</td></tr>\n<tr><td style="padding: 0.5rem;">3:00 PM</td><td style="padding: 0.5rem; text-align: right;">78</td></tr>\n<tr><td style="padding: 0.5rem;">6:00 PM</td><td style="padding: 0.5rem; text-align: right;">68</td></tr>\n</table>\n\nWhat was the temperature at 12:00 PM?',
    ch: [
      {letter: 'A', text: '73°F'},
      {letter: 'B', text: '78°F'},
      {letter: 'C', text: '68°F'},
      {letter: 'D', text: '61°F'}
    ],
    ans: 'A',
    sol: '**Find the exact value in the table.**\n\n```\nLook at the row for 12:00 PM:\nTime: 12:00 PM → Temperature: 73°F\n```\n\n**Key insight:** For specific data point questions, locate the exact row and column intersection. The temperature at 12:00 PM is directly stated as 73°F in the table.'
  },
  {
    pos: 2,
    diff: 'hard',
    text: 'Students measured the growth of a plant over 5 weeks:\n\n<table style="border-collapse: collapse; margin: 1rem 0;">\n<tr style="border-bottom: 2px solid #333;"><th style="padding: 0.5rem; text-align: left;">Week</th><th style="padding: 0.5rem; text-align: right;">Height (cm)</th></tr>\n<tr><td style="padding: 0.5rem;">1</td><td style="padding: 0.5rem; text-align: right;">3.2</td></tr>\n<tr><td style="padding: 0.5rem;">2</td><td style="padding: 0.5rem; text-align: right;">5.8</td></tr>\n<tr><td style="padding: 0.5rem;">3</td><td style="padding: 0.5rem; text-align: right;">9.1</td></tr>\n<tr><td style="padding: 0.5rem;">4</td><td style="padding: 0.5rem; text-align: right;">12.4</td></tr>\n<tr><td style="padding: 0.5rem;">5</td><td style="padding: 0.5rem; text-align: right;">15.7</td></tr>\n</table>\n\nHow tall was the plant at the end of Week 3?',
    ch: [
      {letter: 'A', text: '9.1 cm'},
      {letter: 'B', text: '12.4 cm'},
      {letter: 'C', text: '5.8 cm'},
      {letter: 'D', text: '15.7 cm'}
    ],
    ans: 'A',
    sol: '**Locate Week 3 in the table.**\n\n```\nWeek 3 → Height: 9.1 cm\n```\n\n**Key insight:** Read carefully to distinguish between different weeks. Week 3 shows a height of 9.1 cm, not to be confused with Week 4 (12.4 cm) or Week 5 (15.7 cm).'
  },
  {
    pos: 3,
    diff: 'hard',
    text: 'An experiment measured pH levels at different depths in a lake:\n\n<table style="border-collapse: collapse; margin: 1rem 0;">\n<tr style="border-bottom: 2px solid #333;"><th style="padding: 0.5rem; text-align: left;">Depth (m)</th><th style="padding: 0.5rem; text-align: right;">pH</th></tr>\n<tr><td style="padding: 0.5rem;">0</td><td style="padding: 0.5rem; text-align: right;">7.8</td></tr>\n<tr><td style="padding: 0.5rem;">5</td><td style="padding: 0.5rem; text-align: right;">7.4</td></tr>\n<tr><td style="padding: 0.5rem;">10</td><td style="padding: 0.5rem; text-align: right;">7.0</td></tr>\n<tr><td style="padding: 0.5rem;">15</td><td style="padding: 0.5rem; text-align: right;">6.6</td></tr>\n<tr><td style="padding: 0.5rem;">20</td><td style="padding: 0.5rem; text-align: right;">6.2</td></tr>\n</table>\n\nWhat was the pH at a depth of 10 meters?',
    ch: [
      {letter: 'A', text: '7.0'},
      {letter: 'B', text: '7.4'},
      {letter: 'C', text: '6.6'},
      {letter: 'D', text: '7.8'}
    ],
    ans: 'A',
    sol: '**Find the depth of 10 m in the table.**\n\n```\nDepth = 10 m → pH = 7.0\n```\n\n**Key insight:** Match the exact depth value requested (10 m) with its corresponding pH value. The pH decreases as depth increases, but for this question we only need the specific value at 10 m, which is 7.0.'
  },
  {
    pos: 4,
    diff: 'hard',
    text: 'Scientists tested the solubility of a salt at various temperatures:\n\n<table style="border-collapse: collapse; margin: 1rem 0;">\n<tr style="border-bottom: 2px solid #333;"><th style="padding: 0.5rem; text-align: left;">Temperature (°C)</th><th style="padding: 0.5rem; text-align: right;">Solubility (g/100mL)</th></tr>\n<tr><td style="padding: 0.5rem;">20</td><td style="padding: 0.5rem; text-align: right;">35.7</td></tr>\n<tr><td style="padding: 0.5rem;">30</td><td style="padding: 0.5rem; text-align: right;">40.0</td></tr>\n<tr><td style="padding: 0.5rem;">40</td><td style="padding: 0.5rem; text-align: right;">45.5</td></tr>\n<tr><td style="padding: 0.5rem;">50</td><td style="padding: 0.5rem; text-align: right;">52.3</td></tr>\n<tr><td style="padding: 0.5rem;">60</td><td style="padding: 0.5rem; text-align: right;">60.8</td></tr>\n</table>\n\nWhat is the solubility at 40°C?',
    ch: [
      {letter: 'A', text: '45.5 g/100mL'},
      {letter: 'B', text: '40.0 g/100mL'},
      {letter: 'C', text: '52.3 g/100mL'},
      {letter: 'D', text: '35.7 g/100mL'}
    ],
    ans: 'A',
    sol: '**Locate 40°C in the temperature column.**\n\n```\nTemperature = 40°C → Solubility = 45.5 g/100mL\n```\n\n**Key insight:** Read across from the temperature value to find the corresponding solubility. At 40°C, the solubility is 45.5 g/100mL. Don\'t confuse this with the solubility at 30°C (40.0) or 50°C (52.3).'
  },
  {
    pos: 5,
    diff: 'hard',
    text: 'A researcher measured atmospheric pressure at different altitudes:\n\n<table style="border-collapse: collapse; margin: 1rem 0;">\n<tr style="border-bottom: 2px solid #333;"><th style="padding: 0.5rem; text-align: left;">Altitude (km)</th><th style="padding: 0.5rem; text-align: right;">Pressure (kPa)</th></tr>\n<tr><td style="padding: 0.5rem;">0</td><td style="padding: 0.5rem; text-align: right;">101.3</td></tr>\n<tr><td style="padding: 0.5rem;">2</td><td style="padding: 0.5rem; text-align: right;">79.5</td></tr>\n<tr><td style="padding: 0.5rem;">4</td><td style="padding: 0.5rem; text-align: right;">61.6</td></tr>\n<tr><td style="padding: 0.5rem;">6</td><td style="padding: 0.5rem; text-align: right;">47.2</td></tr>\n<tr><td style="padding: 0.5rem;">8</td><td style="padding: 0.5rem; text-align: right;">35.6</td></tr>\n</table>\n\nAt sea level (0 km altitude), what was the atmospheric pressure?',
    ch: [
      {letter: 'A', text: '101.3 kPa'},
      {letter: 'B', text: '79.5 kPa'},
      {letter: 'C', text: '61.6 kPa'},
      {letter: 'D', text: '47.2 kPa'}
    ],
    ans: 'A',
    sol: '**Sea level corresponds to 0 km altitude.**\n\n```\nAltitude = 0 km → Pressure = 101.3 kPa\n```\n\n**Key insight:** "Sea level" is another way of saying 0 km altitude. The pressure at this altitude is 101.3 kPa, which is the standard atmospheric pressure at sea level.'
  },
  {
    pos: 6,
    diff: 'hard',
    text: 'Students recorded heart rate during exercise:\n\n<table style="border-collapse: collapse; margin: 1rem 0;">\n<tr style="border-bottom: 2px solid #333;"><th style="padding: 0.5rem; text-align: left;">Time (min)</th><th style="padding: 0.5rem; text-align: right;">Heart Rate (bpm)</th></tr>\n<tr><td style="padding: 0.5rem;">0</td><td style="padding: 0.5rem; text-align: right;">72</td></tr>\n<tr><td style="padding: 0.5rem;">2</td><td style="padding: 0.5rem; text-align: right;">95</td></tr>\n<tr><td style="padding: 0.5rem;">4</td><td style="padding: 0.5rem; text-align: right;">118</td></tr>\n<tr><td style="padding: 0.5rem;">6</td><td style="padding: 0.5rem; text-align: right;">132</td></tr>\n<tr><td style="padding: 0.5rem;">8</td><td style="padding: 0.5rem; text-align: right;">128</td></tr>\n</table>\n\nWhat was the heart rate at 6 minutes?',
    ch: [
      {letter: 'A', text: '132 bpm'},
      {letter: 'B', text: '118 bpm'},
      {letter: 'C', text: '128 bpm'},
      {letter: 'D', text: '95 bpm'}
    ],
    ans: 'A',
    sol: '**Find 6 minutes in the time column.**\n\n```\nTime = 6 min → Heart Rate = 132 bpm\n```\n\n**Key insight:** At 6 minutes, the heart rate reached its maximum of 132 bpm before slightly decreasing to 128 bpm at 8 minutes. Make sure to read the exact time point requested.'
  },
  {
    pos: 7,
    diff: 'hard',
    text: 'Enzyme activity was measured at different substrate concentrations:\n\n<table style="border-collapse: collapse; margin: 1rem 0;">\n<tr style="border-bottom: 2px solid #333;"><th style="padding: 0.5rem; text-align: left;">Substrate (mM)</th><th style="padding: 0.5rem; text-align: right;">Activity (μmol/min)</th></tr>\n<tr><td style="padding: 0.5rem;">0.5</td><td style="padding: 0.5rem; text-align: right;">12</td></tr>\n<tr><td style="padding: 0.5rem;">1.0</td><td style="padding: 0.5rem; text-align: right;">22</td></tr>\n<tr><td style="padding: 0.5rem;">2.0</td><td style="padding: 0.5rem; text-align: right;">38</td></tr>\n<tr><td style="padding: 0.5rem;">4.0</td><td style="padding: 0.5rem; text-align: right;">54</td></tr>\n<tr><td style="padding: 0.5rem;">8.0</td><td style="padding: 0.5rem; text-align: right;">60</td></tr>\n</table>\n\nAt a substrate concentration of 2.0 mM, what was the enzyme activity?',
    ch: [
      {letter: 'A', text: '38 μmol/min'},
      {letter: 'B', text: '22 μmol/min'},
      {letter: 'C', text: '54 μmol/min'},
      {letter: 'D', text: '60 μmol/min'}
    ],
    ans: 'A',
    sol: '**Match the substrate concentration to its activity.**\n\n```\nSubstrate = 2.0 mM → Activity = 38 μmol/min\n```\n\n**Key insight:** The enzyme activity increases with substrate concentration. At 2.0 mM, the activity is 38 μmol/min, which is between the values at 1.0 mM (22) and 4.0 mM (54).'
  },
  {
    pos: 8,
    diff: 'hard',
    text: 'Light intensity was measured at different water depths:\n\n<table style="border-collapse: collapse; margin: 1rem 0;">\n<tr style="border-bottom: 2px solid #333;"><th style="padding: 0.5rem; text-align: left;">Depth (m)</th><th style="padding: 0.5rem; text-align: right;">Light Intensity (%)</th></tr>\n<tr><td style="padding: 0.5rem;">0</td><td style="padding: 0.5rem; text-align: right;">100</td></tr>\n<tr><td style="padding: 0.5rem;">10</td><td style="padding: 0.5rem; text-align: right;">45</td></tr>\n<tr><td style="padding: 0.5rem;">20</td><td style="padding: 0.5rem; text-align: right;">20</td></tr>\n<tr><td style="padding: 0.5rem;">30</td><td style="padding: 0.5rem; text-align: right;">9</td></tr>\n<tr><td style="padding: 0.5rem;">40</td><td style="padding: 0.5rem; text-align: right;">4</td></tr>\n</table>\n\nWhat percentage of light reaches a depth of 20 meters?',
    ch: [
      {letter: 'A', text: '20%'},
      {letter: 'B', text: '45%'},
      {letter: 'C', text: '9%'},
      {letter: 'D', text: '100%'}
    ],
    ans: 'A',
    sol: '**Find 20 m in the depth column.**\n\n```\nDepth = 20 m → Light Intensity = 20%\n```\n\n**Key insight:** Light intensity decreases exponentially with depth. At 20 meters, only 20% of surface light remains. This is less than half of what reaches 10 m (45%) but significantly more than at 30 m (9%).'
  },
  {
    pos: 9,
    diff: 'hard',
    text: 'Battery voltage was measured over time during discharge:\n\n<table style="border-collapse: collapse; margin: 1rem 0;">\n<tr style="border-bottom: 2px solid #333;"><th style="padding: 0.5rem; text-align: left;">Time (hours)</th><th style="padding: 0.5rem; text-align: right;">Voltage (V)</th></tr>\n<tr><td style="padding: 0.5rem;">0</td><td style="padding: 0.5rem; text-align: right;">12.6</td></tr>\n<tr><td style="padding: 0.5rem;">3</td><td style="padding: 0.5rem; text-align: right;">12.2</td></tr>\n<tr><td style="padding: 0.5rem;">6</td><td style="padding: 0.5rem; text-align: right;">11.7</td></tr>\n<tr><td style="padding: 0.5rem;">9</td><td style="padding: 0.5rem; text-align: right;">11.0</td></tr>\n<tr><td style="padding: 0.5rem;">12</td><td style="padding: 0.5rem; text-align: right;">10.2</td></tr>\n</table>\n\nAfter 9 hours of discharge, what was the battery voltage?',
    ch: [
      {letter: 'A', text: '11.0 V'},
      {letter: 'B', text: '11.7 V'},
      {letter: 'C', text: '10.2 V'},
      {letter: 'D', text: '12.2 V'}
    ],
    ans: 'A',
    sol: '**Locate 9 hours in the table.**\n\n```\nTime = 9 hours → Voltage = 11.0 V\n```\n\n**Key insight:** The battery voltage steadily decreases over time. At 9 hours, it has dropped to 11.0 V from the initial 12.6 V. Don\'t confuse this with the voltage at 6 hours (11.7 V) or 12 hours (10.2 V).'
  },
  {
    pos: 10,
    diff: 'hard',
    text: 'Carbon dioxide concentration was measured during photosynthesis:\n\n<table style="border-collapse: collapse; margin: 1rem 0;">\n<tr style="border-bottom: 2px solid #333;"><th style="padding: 0.5rem; text-align: left;">Time (min)</th><th style="padding: 0.5rem; text-align: right;">CO₂ (ppm)</th></tr>\n<tr><td style="padding: 0.5rem;">0</td><td style="padding: 0.5rem; text-align: right;">400</td></tr>\n<tr><td style="padding: 0.5rem;">5</td><td style="padding: 0.5rem; text-align: right;">385</td></tr>\n<tr><td style="padding: 0.5rem;">10</td><td style="padding: 0.5rem; text-align: right;">368</td></tr>\n<tr><td style="padding: 0.5rem;">15</td><td style="padding: 0.5rem; text-align: right;">350</td></tr>\n<tr><td style="padding: 0.5rem;">20</td><td style="padding: 0.5rem; text-align: right;">335</td></tr>\n</table>\n\nWhat was the CO₂ concentration at 10 minutes?',
    ch: [
      {letter: 'A', text: '368 ppm'},
      {letter: 'B', text: '385 ppm'},
      {letter: 'C', text: '350 ppm'},
      {letter: 'D', text: '400 ppm'}
    ],
    ans: 'A',
    sol: '**Find 10 minutes in the time column.**\n\n```\nTime = 10 min → CO₂ = 368 ppm\n```\n\n**Key insight:** During photosynthesis, plants consume CO₂, so the concentration decreases over time. At 10 minutes, the concentration is 368 ppm, showing it has decreased from the initial 400 ppm but hasn\'t reached the 15-minute value of 350 ppm yet.'
  },
  {
    pos: 11,
    diff: 'hard',
    text: 'Reaction rate was measured at different catalyst amounts:\n\n<table style="border-collapse: collapse; margin: 1rem 0;">\n<tr style="border-bottom: 2px solid #333;"><th style="padding: 0.5rem; text-align: left;">Catalyst (mg)</th><th style="padding: 0.5rem; text-align: right;">Rate (mol/L·s)</th></tr>\n<tr><td style="padding: 0.5rem;">0</td><td style="padding: 0.5rem; text-align: right;">0.08</td></tr>\n<tr><td style="padding: 0.5rem;">10</td><td style="padding: 0.5rem; text-align: right;">0.24</td></tr>\n<tr><td style="padding: 0.5rem;">20</td><td style="padding: 0.5rem; text-align: right;">0.45</td></tr>\n<tr><td style="padding: 0.5rem;">30</td><td style="padding: 0.5rem; text-align: right;">0.68</td></tr>\n<tr><td style="padding: 0.5rem;">40</td><td style="padding: 0.5rem; text-align: right;">0.72</td></tr>\n</table>\n\nWith no catalyst present, what was the reaction rate?',
    ch: [
      {letter: 'A', text: '0.08 mol/L·s'},
      {letter: 'B', text: '0.24 mol/L·s'},
      {letter: 'C', text: '0.45 mol/L·s'},
      {letter: 'D', text: '0.68 mol/L·s'}
    ],
    ans: 'A',
    sol: '**"No catalyst" means 0 mg of catalyst.**\n\n```\nCatalyst = 0 mg → Rate = 0.08 mol/L·s\n```\n\n**Key insight:** Without any catalyst, the reaction proceeds very slowly at 0.08 mol/L·s. Adding even 10 mg of catalyst triples the rate to 0.24 mol/L·s, demonstrating the catalytic effect.'
  },
  {
    pos: 12,
    diff: 'hard',
    text: 'Wind speed was recorded at different heights above ground:\n\n<table style="border-collapse: collapse; margin: 1rem 0;">\n<tr style="border-bottom: 2px solid #333;"><th style="padding: 0.5rem; text-align: left;">Height (m)</th><th style="padding: 0.5rem; text-align: right;">Wind Speed (m/s)</th></tr>\n<tr><td style="padding: 0.5rem;">2</td><td style="padding: 0.5rem; text-align: right;">3.2</td></tr>\n<tr><td style="padding: 0.5rem;">10</td><td style="padding: 0.5rem; text-align: right;">6.8</td></tr>\n<tr><td style="padding: 0.5rem;">50</td><td style="padding: 0.5rem; text-align: right;">11.5</td></tr>\n<tr><td style="padding: 0.5rem;">100</td><td style="padding: 0.5rem; text-align: right;">14.3</td></tr>\n<tr><td style="padding: 0.5rem;">200</td><td style="padding: 0.5rem; text-align: right;">16.9</td></tr>\n</table>\n\nAt 50 meters above ground, what was the wind speed?',
    ch: [
      {letter: 'A', text: '11.5 m/s'},
      {letter: 'B', text: '6.8 m/s'},
      {letter: 'C', text: '14.3 m/s'},
      {letter: 'D', text: '3.2 m/s'}
    ],
    ans: 'A',
    sol: '**Find 50 m in the height column.**\n\n```\nHeight = 50 m → Wind Speed = 11.5 m/s\n```\n\n**Key insight:** Wind speed increases with height above ground due to reduced friction. At 50 meters, the wind speed is 11.5 m/s, which is considerably higher than at 10 m (6.8 m/s) but lower than at 100 m (14.3 m/s).'
  },
  {
    pos: 13,
    diff: 'hard',
    text: 'Bacterial growth was monitored in a culture:\n\n<table style="border-collapse: collapse; margin: 1rem 0;">\n<tr style="border-bottom: 2px solid #333;"><th style="padding: 0.5rem; text-align: left;">Hour</th><th style="padding: 0.5rem; text-align: right;">Population (×10⁶)</th></tr>\n<tr><td style="padding: 0.5rem;">0</td><td style="padding: 0.5rem; text-align: right;">1.2</td></tr>\n<tr><td style="padding: 0.5rem;">3</td><td style="padding: 0.5rem; text-align: right;">2.4</td></tr>\n<tr><td style="padding: 0.5rem;">6</td><td style="padding: 0.5rem; text-align: right;">4.8</td></tr>\n<tr><td style="padding: 0.5rem;">9</td><td style="padding: 0.5rem; text-align: right;">9.6</td></tr>\n<tr><td style="padding: 0.5rem;">12</td><td style="padding: 0.5rem; text-align: right;">19.2</td></tr>\n</table>\n\nWhat was the bacterial population at hour 6?',
    ch: [
      {letter: 'A', text: '4.8 × 10⁶'},
      {letter: 'B', text: '2.4 × 10⁶'},
      {letter: 'C', text: '9.6 × 10⁶'},
      {letter: 'D', text: '1.2 × 10⁶'}
    ],
    ans: 'A',
    sol: '**Locate hour 6 in the table.**\n\n```\nHour = 6 → Population = 4.8 × 10⁶\n```\n\n**Key insight:** The bacterial population doubles every 3 hours (exponential growth). At hour 6, the population is 4.8 × 10⁶, which is double the hour 3 value (2.4 × 10⁶) and will double again by hour 9 (9.6 × 10⁶).'
  },
  {
    pos: 14,
    diff: 'hard',
    text: 'Oxygen levels were measured at different ocean depths:\n\n<table style="border-collapse: collapse; margin: 1rem 0;">\n<tr style="border-bottom: 2px solid #333;"><th style="padding: 0.5rem; text-align: left;">Depth (m)</th><th style="padding: 0.5rem; text-align: right;">O₂ (mg/L)</th></tr>\n<tr><td style="padding: 0.5rem;">0</td><td style="padding: 0.5rem; text-align: right;">8.2</td></tr>\n<tr><td style="padding: 0.5rem;">50</td><td style="padding: 0.5rem; text-align: right;">6.5</td></tr>\n<tr><td style="padding: 0.5rem;">100</td><td style="padding: 0.5rem; text-align: right;">4.8</td></tr>\n<tr><td style="padding: 0.5rem;">150</td><td style="padding: 0.5rem; text-align: right;">3.1</td></tr>\n<tr><td style="padding: 0.5rem;">200</td><td style="padding: 0.5rem; text-align: right;">1.9</td></tr>\n</table>\n\nAt 100 meters depth, what was the oxygen concentration?',
    ch: [
      {letter: 'A', text: '4.8 mg/L'},
      {letter: 'B', text: '6.5 mg/L'},
      {letter: 'C', text: '3.1 mg/L'},
      {letter: 'D', text: '8.2 mg/L'}
    ],
    ans: 'A',
    sol: '**Find 100 m in the depth column.**\n\n```\nDepth = 100 m → O₂ = 4.8 mg/L\n```\n\n**Key insight:** Oxygen concentration decreases with depth as photosynthesis decreases and respiration continues. At 100 meters, the O₂ level is 4.8 mg/L, which is roughly halfway between surface levels (8.2 mg/L) and 200 m depth (1.9 mg/L).'
  },
  {
    pos: 15,
    diff: 'hard',
    text: 'Sound intensity was measured at different distances from a speaker:\n\n<table style="border-collapse: collapse; margin: 1rem 0;">\n<tr style="border-bottom: 2px solid #333;"><th style="padding: 0.5rem; text-align: left;">Distance (m)</th><th style="padding: 0.5rem; text-align: right;">Intensity (dB)</th></tr>\n<tr><td style="padding: 0.5rem;">1</td><td style="padding: 0.5rem; text-align: right;">90</td></tr>\n<tr><td style="padding: 0.5rem;">2</td><td style="padding: 0.5rem; text-align: right;">84</td></tr>\n<tr><td style="padding: 0.5rem;">4</td><td style="padding: 0.5rem; text-align: right;">78</td></tr>\n<tr><td style="padding: 0.5rem;">8</td><td style="padding: 0.5rem; text-align: right;">72</td></tr>\n<tr><td style="padding: 0.5rem;">16</td><td style="padding: 0.5rem; text-align: right;">66</td></tr>\n</table>\n\nAt a distance of 4 meters, what was the sound intensity?',
    ch: [
      {letter: 'A', text: '78 dB'},
      {letter: 'B', text: '84 dB'},
      {letter: 'C', text: '72 dB'},
      {letter: 'D', text: '90 dB'}
    ],
    ans: 'A',
    sol: '**Locate 4 m in the distance column.**\n\n```\nDistance = 4 m → Intensity = 78 dB\n```\n\n**Key insight:** Sound intensity decreases with distance following the inverse square law. Every doubling of distance reduces intensity by 6 dB. At 4 meters, the intensity is 78 dB, which is 6 dB less than at 2 m (84 dB).'
  },
  {
    pos: 16,
    diff: 'hard',
    text: 'Glucose concentration in blood was measured over time:\n\n<table style="border-collapse: collapse; margin: 1rem 0;">\n<tr style="border-bottom: 2px solid #333;"><th style="padding: 0.5rem; text-align: left;">Time (min)</th><th style="padding: 0.5rem; text-align: right;">Glucose (mg/dL)</th></tr>\n<tr><td style="padding: 0.5rem;">0</td><td style="padding: 0.5rem; text-align: right;">85</td></tr>\n<tr><td style="padding: 0.5rem;">30</td><td style="padding: 0.5rem; text-align: right;">142</td></tr>\n<tr><td style="padding: 0.5rem;">60</td><td style="padding: 0.5rem; text-align: right;">128</td></tr>\n<tr><td style="padding: 0.5rem;">90</td><td style="padding: 0.5rem; text-align: right;">106</td></tr>\n<tr><td style="padding: 0.5rem;">120</td><td style="padding: 0.5rem; text-align: right;">92</td></tr>\n</table>\n\nWhat was the glucose level at 30 minutes after eating?',
    ch: [
      {letter: 'A', text: '142 mg/dL'},
      {letter: 'B', text: '128 mg/dL'},
      {letter: 'C', text: '85 mg/dL'},
      {letter: 'D', text: '106 mg/dL'}
    ],
    ans: 'A',
    sol: '**Find 30 minutes in the table.**\n\n```\nTime = 30 min → Glucose = 142 mg/dL\n```\n\n**Key insight:** Blood glucose peaks 30 minutes after eating at 142 mg/dL, then gradually decreases as insulin helps cells absorb the glucose. This is the highest value in the entire table, representing the post-meal spike.'
  },
  {
    pos: 17,
    diff: 'hard',
    text: 'Electrical resistance was measured at different wire lengths:\n\n<table style="border-collapse: collapse; margin: 1rem 0;">\n<tr style="border-bottom: 2px solid #333;"><th style="padding: 0.5rem; text-align: left;">Length (m)</th><th style="padding: 0.5rem; text-align: right;">Resistance (Ω)</th></tr>\n<tr><td style="padding: 0.5rem;">1</td><td style="padding: 0.5rem; text-align: right;">2.4</td></tr>\n<tr><td style="padding: 0.5rem;">2</td><td style="padding: 0.5rem; text-align: right;">4.8</td></tr>\n<tr><td style="padding: 0.5rem;">3</td><td style="padding: 0.5rem; text-align: right;">7.2</td></tr>\n<tr><td style="padding: 0.5rem;">4</td><td style="padding: 0.5rem; text-align: right;">9.6</td></tr>\n<tr><td style="padding: 0.5rem;">5</td><td style="padding: 0.5rem; text-align: right;">12.0</td></tr>\n</table>\n\nWhat is the resistance of a 3-meter wire?',
    ch: [
      {letter: 'A', text: '7.2 Ω'},
      {letter: 'B', text: '4.8 Ω'},
      {letter: 'C', text: '9.6 Ω'},
      {letter: 'D', text: '2.4 Ω'}
    ],
    ans: 'A',
    sol: '**Find 3 meters in the length column.**\n\n```\nLength = 3 m → Resistance = 7.2 Ω\n```\n\n**Key insight:** Resistance is directly proportional to wire length. Each additional meter adds 2.4 Ω of resistance. A 3-meter wire has a resistance of 7.2 Ω (3 × 2.4 Ω).'
  },
  {
    pos: 18,
    diff: 'hard',
    text: 'Water vapor pressure was recorded at different temperatures:\n\n<table style="border-collapse: collapse; margin: 1rem 0;">\n<tr style="border-bottom: 2px solid #333;"><th style="padding: 0.5rem; text-align: left;">Temperature (°C)</th><th style="padding: 0.5rem; text-align: right;">Vapor Pressure (kPa)</th></tr>\n<tr><td style="padding: 0.5rem;">10</td><td style="padding: 0.5rem; text-align: right;">1.23</td></tr>\n<tr><td style="padding: 0.5rem;">20</td><td style="padding: 0.5rem; text-align: right;">2.34</td></tr>\n<tr><td style="padding: 0.5rem;">30</td><td style="padding: 0.5rem; text-align: right;">4.24</td></tr>\n<tr><td style="padding: 0.5rem;">40</td><td style="padding: 0.5rem; text-align: right;">7.38</td></tr>\n<tr><td style="padding: 0.5rem;">50</td><td style="padding: 0.5rem; text-align: right;">12.33</td></tr>\n</table>\n\nAt 30°C, what was the vapor pressure of water?',
    ch: [
      {letter: 'A', text: '4.24 kPa'},
      {letter: 'B', text: '2.34 kPa'},
      {letter: 'C', text: '7.38 kPa'},
      {letter: 'D', text: '1.23 kPa'}
    ],
    ans: 'A',
    sol: '**Locate 30°C in the temperature column.**\n\n```\nTemperature = 30°C → Vapor Pressure = 4.24 kPa\n```\n\n**Key insight:** Vapor pressure increases exponentially with temperature. At 30°C, the vapor pressure is 4.24 kPa, which is nearly double the value at 20°C (2.34 kPa) but less than at 40°C (7.38 kPa).'
  },
  {
    pos: 19,
    diff: 'hard',
    text: 'Soil nitrogen content was measured at different depths:\n\n<table style="border-collapse: collapse; margin: 1rem 0;">\n<tr style="border-bottom: 2px solid #333;"><th style="padding: 0.5rem; text-align: left;">Depth (cm)</th><th style="padding: 0.5rem; text-align: right;">Nitrogen (ppm)</th></tr>\n<tr><td style="padding: 0.5rem;">0-10</td><td style="padding: 0.5rem; text-align: right;">85</td></tr>\n<tr><td style="padding: 0.5rem;">10-20</td><td style="padding: 0.5rem; text-align: right;">62</td></tr>\n<tr><td style="padding: 0.5rem;">20-30</td><td style="padding: 0.5rem; text-align: right;">44</td></tr>\n<tr><td style="padding: 0.5rem;">30-40</td><td style="padding: 0.5rem; text-align: right;">31</td></tr>\n<tr><td style="padding: 0.5rem;">40-50</td><td style="padding: 0.5rem; text-align: right;">22</td></tr>\n</table>\n\nWhat was the nitrogen content in the 20-30 cm depth layer?',
    ch: [
      {letter: 'A', text: '44 ppm'},
      {letter: 'B', text: '62 ppm'},
      {letter: 'C', text: '31 ppm'},
      {letter: 'D', text: '85 ppm'}
    ],
    ans: 'A',
    sol: '**Find the 20-30 cm depth range.**\n\n```\nDepth = 20-30 cm → Nitrogen = 44 ppm\n```\n\n**Key insight:** Nitrogen content decreases with soil depth. The 20-30 cm layer contains 44 ppm, which is less than the shallower 10-20 cm layer (62 ppm) but more than the deeper 30-40 cm layer (31 ppm).'
  },
  {
    pos: 20,
    diff: 'hard',
    text: 'Melting points were determined for different alloy compositions:\n\n<table style="border-collapse: collapse; margin: 1rem 0;">\n<tr style="border-bottom: 2px solid #333;"><th style="padding: 0.5rem; text-align: left;">% Copper</th><th style="padding: 0.5rem; text-align: right;">Melting Point (°C)</th></tr>\n<tr><td style="padding: 0.5rem;">100</td><td style="padding: 0.5rem; text-align: right;">1085</td></tr>\n<tr><td style="padding: 0.5rem;">80</td><td style="padding: 0.5rem; text-align: right;">1015</td></tr>\n<tr><td style="padding: 0.5rem;">60</td><td style="padding: 0.5rem; text-align: right;">950</td></tr>\n<tr><td style="padding: 0.5rem;">40</td><td style="padding: 0.5rem; text-align: right;">895</td></tr>\n<tr><td style="padding: 0.5rem;">20</td><td style="padding: 0.5rem; text-align: right;">850</td></tr>\n</table>\n\nWhat is the melting point of an alloy containing 60% copper?',
    ch: [
      {letter: 'A', text: '950°C'},
      {letter: 'B', text: '1015°C'},
      {letter: 'C', text: '895°C'},
      {letter: 'D', text: '1085°C'}
    ],
    ans: 'A',
    sol: '**Locate 60% copper in the table.**\n\n```\n% Copper = 60 → Melting Point = 950°C\n```\n\n**Key insight:** As copper percentage decreases, the melting point decreases. Pure copper (100%) melts at 1085°C, while a 60% copper alloy melts at the lower temperature of 950°C.'
  },
  {
    pos: 21,
    diff: 'hard',
    text: 'Rainfall amounts were recorded during a storm:\n\n<table style="border-collapse: collapse; margin: 1rem 0;">\n<tr style="border-bottom: 2px solid #333;"><th style="padding: 0.5rem; text-align: left;">Time Period</th><th style="padding: 0.5rem; text-align: right;">Rainfall (inches)</th></tr>\n<tr><td style="padding: 0.5rem;">8-9 AM</td><td style="padding: 0.5rem; text-align: right;">0.3</td></tr>\n<tr><td style="padding: 0.5rem;">9-10 AM</td><td style="padding: 0.5rem; text-align: right;">0.8</td></tr>\n<tr><td style="padding: 0.5rem;">10-11 AM</td><td style="padding: 0.5rem; text-align: right;">1.4</td></tr>\n<tr><td style="padding: 0.5rem;">11 AM-12 PM</td><td style="padding: 0.5rem; text-align: right;">0.9</td></tr>\n<tr><td style="padding: 0.5rem;">12-1 PM</td><td style="padding: 0.5rem; text-align: right;">0.5</td></tr>\n</table>\n\nDuring which time period did the most rain fall?',
    ch: [
      {letter: 'A', text: '10-11 AM'},
      {letter: 'B', text: '9-10 AM'},
      {letter: 'C', text: '11 AM-12 PM'},
      {letter: 'D', text: '8-9 AM'}
    ],
    ans: 'A',
    sol: '**Compare all rainfall values to find the maximum.**\n\n```\n8-9 AM: 0.3 inches\n9-10 AM: 0.8 inches\n10-11 AM: 1.4 inches ← MAXIMUM\n11 AM-12 PM: 0.9 inches\n12-1 PM: 0.5 inches\n```\n\n**Key insight:** The peak rainfall occurred during 10-11 AM with 1.4 inches. This represents the most intense period of the storm, which then began to taper off.'
  },
  {
    pos: 22,
    diff: 'hard',
    text: 'Boiling point elevation was measured for different salt concentrations:\n\n<table style="border-collapse: collapse; margin: 1rem 0;">\n<tr style="border-bottom: 2px solid #333;"><th style="padding: 0.5rem; text-align: left;">Salt (mol/kg)</th><th style="padding: 0.5rem; text-align: right;">Boiling Point (°C)</th></tr>\n<tr><td style="padding: 0.5rem;">0.0</td><td style="padding: 0.5rem; text-align: right;">100.0</td></tr>\n<tr><td style="padding: 0.5rem;">0.5</td><td style="padding: 0.5rem; text-align: right;">100.26</td></tr>\n<tr><td style="padding: 0.5rem;">1.0</td><td style="padding: 0.5rem; text-align: right;">100.52</td></tr>\n<tr><td style="padding: 0.5rem;">1.5</td><td style="padding: 0.5rem; text-align: right;">100.78</td></tr>\n<tr><td style="padding: 0.5rem;">2.0</td><td style="padding: 0.5rem; text-align: right;">101.04</td></tr>\n</table>\n\nWhat is the boiling point of pure water (0.0 mol/kg salt)?',
    ch: [
      {letter: 'A', text: '100.0°C'},
      {letter: 'B', text: '100.26°C'},
      {letter: 'C', text: '100.52°C'},
      {letter: 'D', text: '101.04°C'}
    ],
    ans: 'A',
    sol: '**Pure water has 0.0 mol/kg salt concentration.**\n\n```\nSalt = 0.0 mol/kg → Boiling Point = 100.0°C\n```\n\n**Key insight:** Pure water boils at exactly 100.0°C at standard pressure. Adding salt raises the boiling point (colligative property). Each 0.5 mol/kg increases the boiling point by 0.26°C.'
  },
  {
    pos: 23,
    diff: 'hard',
    text: 'Stream velocity was measured at different cross-sections:\n\n<table style="border-collapse: collapse; margin: 1rem 0;">\n<tr style="border-bottom: 2px solid #333;"><th style="padding: 0.5rem; text-align: left;">Cross-Section</th><th style="padding: 0.5rem; text-align: right;">Velocity (m/s)</th></tr>\n<tr><td style="padding: 0.5rem;">A</td><td style="padding: 0.5rem; text-align: right;">1.2</td></tr>\n<tr><td style="padding: 0.5rem;">B</td><td style="padding: 0.5rem; text-align: right;">2.8</td></tr>\n<tr><td style="padding: 0.5rem;">C</td><td style="padding: 0.5rem; text-align: right;">0.9</td></tr>\n<tr><td style="padding: 0.5rem;">D</td><td style="padding: 0.5rem; text-align: right;">3.5</td></tr>\n<tr><td style="padding: 0.5rem;">E</td><td style="padding: 0.5rem; text-align: right;">1.7</td></tr>\n</table>\n\nAt cross-section D, what was the stream velocity?',
    ch: [
      {letter: 'A', text: '3.5 m/s'},
      {letter: 'B', text: '2.8 m/s'},
      {letter: 'C', text: '1.7 m/s'},
      {letter: 'D', text: '0.9 m/s'}
    ],
    ans: 'A',
    sol: '**Find cross-section D in the table.**\n\n```\nCross-Section = D → Velocity = 3.5 m/s\n```\n\n**Key insight:** Cross-section D has the highest velocity at 3.5 m/s, likely indicating a narrow channel where water flows faster. Cross-section C has the slowest flow at 0.9 m/s, probably a wider, shallower area.'
  },
  {
    pos: 24,
    diff: 'hard',
    text: 'Photosynthesis rate was measured at different light wavelengths:\n\n<table style="border-collapse: collapse; margin: 1rem 0;">\n<tr style="border-bottom: 2px solid #333;"><th style="padding: 0.5rem; text-align: left;">Wavelength (nm)</th><th style="padding: 0.5rem; text-align: right;">Rate (μmol O₂/hr)</th></tr>\n<tr><td style="padding: 0.5rem;">400 (violet)</td><td style="padding: 0.5rem; text-align: right;">28</td></tr>\n<tr><td style="padding: 0.5rem;">500 (green)</td><td style="padding: 0.5rem; text-align: right;">12</td></tr>\n<tr><td style="padding: 0.5rem;">600 (orange)</td><td style="padding: 0.5rem; text-align: right;">35</td></tr>\n<tr><td style="padding: 0.5rem;">650 (red)</td><td style="padding: 0.5rem; text-align: right;">42</td></tr>\n<tr><td style="padding: 0.5rem;">700 (far red)</td><td style="padding: 0.5rem; text-align: right;">18</td></tr>\n</table>\n\nWhat was the photosynthesis rate under green light (500 nm)?',
    ch: [
      {letter: 'A', text: '12 μmol O₂/hr'},
      {letter: 'B', text: '28 μmol O₂/hr'},
      {letter: 'C', text: '35 μmol O₂/hr'},
      {letter: 'D', text: '42 μmol O₂/hr'}
    ],
    ans: 'A',
    sol: '**Find 500 nm (green light) in the table.**\n\n```\nWavelength = 500 nm (green) → Rate = 12 μmol O₂/hr\n```\n\n**Key insight:** Green light produces the lowest photosynthesis rate (12 μmol O₂/hr) because chlorophyll reflects green light rather than absorbing it. Red light (650 nm) produces the highest rate at 42 μmol O₂/hr.'
  },
  {
    pos: 25,
    diff: 'hard',
    text: 'Friction coefficient was measured for different surface materials:\n\n<table style="border-collapse: collapse; margin: 1rem 0;">\n<tr style="border-bottom: 2px solid #333;"><th style="padding: 0.5rem; text-align: left;">Surface Material</th><th style="padding: 0.5rem; text-align: right;">Coefficient (μ)</th></tr>\n<tr><td style="padding: 0.5rem;">Ice</td><td style="padding: 0.5rem; text-align: right;">0.05</td></tr>\n<tr><td style="padding: 0.5rem;">Wet asphalt</td><td style="padding: 0.5rem; text-align: right;">0.45</td></tr>\n<tr><td style="padding: 0.5rem;">Dry asphalt</td><td style="padding: 0.5rem; text-align: right;">0.72</td></tr>\n<tr><td style="padding: 0.5rem;">Concrete</td><td style="padding: 0.5rem; text-align: right;">0.88</td></tr>\n<tr><td style="padding: 0.5rem;">Rubber</td><td style="padding: 0.5rem; text-align: right;">1.15</td></tr>\n</table>\n\nWhich surface has the lowest coefficient of friction?',
    ch: [
      {letter: 'A', text: 'Ice'},
      {letter: 'B', text: 'Wet asphalt'},
      {letter: 'C', text: 'Dry asphalt'},
      {letter: 'D', text: 'Rubber'}
    ],
    ans: 'A',
    sol: '**Compare all friction coefficients to find the minimum.**\n\n```\nIce: 0.05 ← LOWEST\nWet asphalt: 0.45\nDry asphalt: 0.72\nConcrete: 0.88\nRubber: 1.15\n```\n\n**Key insight:** Ice has by far the lowest friction coefficient at 0.05, which explains why it\'s so slippery. Rubber has the highest at 1.15, providing the best grip.'
  },
  {
    pos: 26,
    diff: 'hard',
    text: 'Electric current was measured at different voltages:\n\n<table style="border-collapse: collapse; margin: 1rem 0;">\n<tr style="border-bottom: 2px solid #333;"><th style="padding: 0.5rem; text-align: left;">Voltage (V)</th><th style="padding: 0.5rem; text-align: right;">Current (A)</th></tr>\n<tr><td style="padding: 0.5rem;">2</td><td style="padding: 0.5rem; text-align: right;">0.4</td></tr>\n<tr><td style="padding: 0.5rem;">4</td><td style="padding: 0.5rem; text-align: right;">0.8</td></tr>\n<tr><td style="padding: 0.5rem;">6</td><td style="padding: 0.5rem; text-align: right;">1.2</td></tr>\n<tr><td style="padding: 0.5rem;">8</td><td style="padding: 0.5rem; text-align: right;">1.6</td></tr>\n<tr><td style="padding: 0.5rem;">10</td><td style="padding: 0.5rem; text-align: right;">2.0</td></tr>\n</table>\n\nAt 6 volts, what current flows through the circuit?',
    ch: [
      {letter: 'A', text: '1.2 A'},
      {letter: 'B', text: '0.8 A'},
      {letter: 'C', text: '1.6 A'},
      {letter: 'D', text: '0.4 A'}
    ],
    ans: 'A',
    sol: '**Find 6 V in the voltage column.**\n\n```\nVoltage = 6 V → Current = 1.2 A\n```\n\n**Key insight:** This demonstrates Ohm\'s Law (V = IR). The relationship is linear with a resistance of R = V/I = 6/1.2 = 5 Ω. Each 2 V increase produces a 0.4 A increase in current.'
  },
  {
    pos: 27,
    diff: 'hard',
    text: 'Osmotic pressure was measured for different sugar concentrations:\n\n<table style="border-collapse: collapse; margin: 1rem 0;">\n<tr style="border-bottom: 2px solid #333;"><th style="padding: 0.5rem; text-align: left;">Concentration (M)</th><th style="padding: 0.5rem; text-align: right;">Osmotic Pressure (atm)</th></tr>\n<tr><td style="padding: 0.5rem;">0.1</td><td style="padding: 0.5rem; text-align: right;">2.4</td></tr>\n<tr><td style="padding: 0.5rem;">0.2</td><td style="padding: 0.5rem; text-align: right;">4.9</td></tr>\n<tr><td style="padding: 0.5rem;">0.3</td><td style="padding: 0.5rem; text-align: right;">7.3</td></tr>\n<tr><td style="padding: 0.5rem;">0.4</td><td style="padding: 0.5rem; text-align: right;">9.8</td></tr>\n<tr><td style="padding: 0.5rem;">0.5</td><td style="padding: 0.5rem; text-align: right;">12.2</td></tr>\n</table>\n\nWhat is the osmotic pressure at 0.3 M concentration?',
    ch: [
      {letter: 'A', text: '7.3 atm'},
      {letter: 'B', text: '4.9 atm'},
      {letter: 'C', text: '9.8 atm'},
      {letter: 'D', text: '2.4 atm'}
    ],
    ans: 'A',
    sol: '**Locate 0.3 M in the concentration column.**\n\n```\nConcentration = 0.3 M → Osmotic Pressure = 7.3 atm\n```\n\n**Key insight:** Osmotic pressure is directly proportional to concentration (π = MRT). At 0.3 M, the osmotic pressure is 7.3 atm, which is approximately 3 times the pressure at 0.1 M (2.4 atm).'
  },
  {
    pos: 28,
    diff: 'hard',
    text: 'Sediment particle size distribution was analyzed:\n\n<table style="border-collapse: collapse; margin: 1rem 0;">\n<tr style="border-bottom: 2px solid #333;"><th style="padding: 0.5rem; text-align: left;">Particle Size</th><th style="padding: 0.5rem; text-align: right;">Percentage (%)</th></tr>\n<tr><td style="padding: 0.5rem;">Clay (&lt;0.002 mm)</td><td style="padding: 0.5rem; text-align: right;">15</td></tr>\n<tr><td style="padding: 0.5rem;">Silt (0.002-0.05 mm)</td><td style="padding: 0.5rem; text-align: right;">32</td></tr>\n<tr><td style="padding: 0.5rem;">Sand (0.05-2 mm)</td><td style="padding: 0.5rem; text-align: right;">48</td></tr>\n<tr><td style="padding: 0.5rem;">Gravel (&gt;2 mm)</td><td style="padding: 0.5rem; text-align: right;">5</td></tr>\n</table>\n\nWhat percentage of the sediment consists of sand particles?',
    ch: [
      {letter: 'A', text: '48%'},
      {letter: 'B', text: '32%'},
      {letter: 'C', text: '15%'},
      {letter: 'D', text: '5%'}
    ],
    ans: 'A',
    sol: '**Find sand (0.05-2 mm) in the table.**\n\n```\nParticle Size = Sand (0.05-2 mm) → Percentage = 48%\n```\n\n**Key insight:** Sand makes up nearly half the sediment at 48%, making it the dominant particle size. Silt is the second most abundant at 32%, while gravel is least common at 5%.'
  },
  {
    pos: 29,
    diff: 'hard',
    text: 'Absorbance was measured at different wavelengths for a solution:\n\n<table style="border-collapse: collapse; margin: 1rem 0;">\n<tr style="border-bottom: 2px solid #333;"><th style="padding: 0.5rem; text-align: left;">Wavelength (nm)</th><th style="padding: 0.5rem; text-align: right;">Absorbance</th></tr>\n<tr><td style="padding: 0.5rem;">400</td><td style="padding: 0.5rem; text-align: right;">0.15</td></tr>\n<tr><td style="padding: 0.5rem;">450</td><td style="padding: 0.5rem; text-align: right;">0.38</td></tr>\n<tr><td style="padding: 0.5rem;">500</td><td style="padding: 0.5rem; text-align: right;">0.62</td></tr>\n<tr><td style="padding: 0.5rem;">550</td><td style="padding: 0.5rem; text-align: right;">0.44</td></tr>\n<tr><td style="padding: 0.5rem;">600</td><td style="padding: 0.5rem; text-align: right;">0.21</td></tr>\n</table>\n\nAt which wavelength does the solution show maximum absorbance?',
    ch: [
      {letter: 'A', text: '500 nm'},
      {letter: 'B', text: '450 nm'},
      {letter: 'C', text: '550 nm'},
      {letter: 'D', text: '400 nm'}
    ],
    ans: 'A',
    sol: '**Compare all absorbance values to find the maximum.**\n\n```\n400 nm: 0.15\n450 nm: 0.38\n500 nm: 0.62 ← MAXIMUM\n550 nm: 0.44\n600 nm: 0.21\n```\n\n**Key insight:** The solution absorbs most strongly at 500 nm (0.62), which is in the green-blue region. This peak absorbance wavelength is characteristic of the compound and used for concentration measurements.'
  },
  {
    pos: 30,
    diff: 'hard',
    text: 'Radioactive decay was monitored over time:\n\n<table style="border-collapse: collapse; margin: 1rem 0;">\n<tr style="border-bottom: 2px solid #333;"><th style="padding: 0.5rem; text-align: left;">Time (days)</th><th style="padding: 0.5rem; text-align: right;">Activity (Bq)</th></tr>\n<tr><td style="padding: 0.5rem;">0</td><td style="padding: 0.5rem; text-align: right;">1000</td></tr>\n<tr><td style="padding: 0.5rem;">10</td><td style="padding: 0.5rem; text-align: right;">500</td></tr>\n<tr><td style="padding: 0.5rem;">20</td><td style="padding: 0.5rem; text-align: right;">250</td></tr>\n<tr><td style="padding: 0.5rem;">30</td><td style="padding: 0.5rem; text-align: right;">125</td></tr>\n<tr><td style="padding: 0.5rem;">40</td><td style="padding: 0.5rem; text-align: right;">62.5</td></tr>\n</table>\n\nWhat was the initial radioactivity at day 0?',
    ch: [
      {letter: 'A', text: '1000 Bq'},
      {letter: 'B', text: '500 Bq'},
      {letter: 'C', text: '250 Bq'},
      {letter: 'D', text: '125 Bq'}
    ],
    ans: 'A',
    sol: '**Day 0 represents the initial measurement.**\n\n```\nTime = 0 days → Activity = 1000 Bq\n```\n\n**Key insight:** The sample starts with 1000 Bq and undergoes radioactive decay. The half-life is 10 days, as activity halves from 1000 to 500 Bq in that period, and continues halving every 10 days.'
  },
  {
    pos: 31,
    diff: 'hard',
    text: 'Spring constant was determined for different spring compressions:\n\n<table style="border-collapse: collapse; margin: 1rem 0;">\n<tr style="border-bottom: 2px solid #333;"><th style="padding: 0.5rem; text-align: left;">Compression (cm)</th><th style="padding: 0.5rem; text-align: right;">Force (N)</th></tr>\n<tr><td style="padding: 0.5rem;">2</td><td style="padding: 0.5rem; text-align: right;">10</td></tr>\n<tr><td style="padding: 0.5rem;">4</td><td style="padding: 0.5rem; text-align: right;">20</td></tr>\n<tr><td style="padding: 0.5rem;">6</td><td style="padding: 0.5rem; text-align: right;">30</td></tr>\n<tr><td style="padding: 0.5rem;">8</td><td style="padding: 0.5rem; text-align: right;">40</td></tr>\n<tr><td style="padding: 0.5rem;">10</td><td style="padding: 0.5rem; text-align: right;">50</td></tr>\n</table>\n\nWhat force is required to compress the spring 6 cm?',
    ch: [
      {letter: 'A', text: '30 N'},
      {letter: 'B', text: '20 N'},
      {letter: 'C', text: '40 N'},
      {letter: 'D', text: '10 N'}
    ],
    ans: 'A',
    sol: '**Find 6 cm compression in the table.**\n\n```\nCompression = 6 cm → Force = 30 N\n```\n\n**Key insight:** This demonstrates Hooke\'s Law (F = kx). The spring constant is k = F/x = 30/6 = 5 N/cm. The force increases linearly with compression, with each additional cm requiring 5 N more force.'
  },
  {
    pos: 32,
    diff: 'hard',
    text: 'Photon energy was calculated for different wavelengths:\n\n<table style="border-collapse: collapse; margin: 1rem 0;">\n<tr style="border-bottom: 2px solid #333;"><th style="padding: 0.5rem; text-align: left;">Wavelength (nm)</th><th style="padding: 0.5rem; text-align: right;">Energy (eV)</th></tr>\n<tr><td style="padding: 0.5rem;">200</td><td style="padding: 0.5rem; text-align: right;">6.2</td></tr>\n<tr><td style="padding: 0.5rem;">400</td><td style="padding: 0.5rem; text-align: right;">3.1</td></tr>\n<tr><td style="padding: 0.5rem;">600</td><td style="padding: 0.5rem; text-align: right;">2.1</td></tr>\n<tr><td style="padding: 0.5rem;">800</td><td style="padding: 0.5rem; text-align: right;">1.5</td></tr>\n<tr><td style="padding: 0.5rem;">1000</td><td style="padding: 0.5rem; text-align: right;">1.2</td></tr>\n</table>\n\nWhat is the photon energy for 400 nm light?',
    ch: [
      {letter: 'A', text: '3.1 eV'},
      {letter: 'B', text: '6.2 eV'},
      {letter: 'C', text: '2.1 eV'},
      {letter: 'D', text: '1.5 eV'}
    ],
    ans: 'A',
    sol: '**Locate 400 nm in the wavelength column.**\n\n```\nWavelength = 400 nm → Energy = 3.1 eV\n```\n\n**Key insight:** Photon energy is inversely proportional to wavelength (E = hc/λ). Shorter wavelengths have higher energy: 200 nm has 6.2 eV while 400 nm has half that at 3.1 eV.'
  },
  {
    pos: 33,
    diff: 'hard',
    text: 'Evaporation rate was measured at different humidity levels:\n\n<table style="border-collapse: collapse; margin: 1rem 0;">\n<tr style="border-bottom: 2px solid #333;"><th style="padding: 0.5rem; text-align: left;">Humidity (%)</th><th style="padding: 0.5rem; text-align: right;">Evaporation (mL/hr)</th></tr>\n<tr><td style="padding: 0.5rem;">20</td><td style="padding: 0.5rem; text-align: right;">12.5</td></tr>\n<tr><td style="padding: 0.5rem;">40</td><td style="padding: 0.5rem; text-align: right;">9.8</td></tr>\n<tr><td style="padding: 0.5rem;">60</td><td style="padding: 0.5rem; text-align: right;">6.2</td></tr>\n<tr><td style="padding: 0.5rem;">80</td><td style="padding: 0.5rem; text-align: right;">3.1</td></tr>\n<tr><td style="padding: 0.5rem;">100</td><td style="padding: 0.5rem; text-align: right;">0.0</td></tr>\n</table>\n\nAt 60% humidity, what was the evaporation rate?',
    ch: [
      {letter: 'A', text: '6.2 mL/hr'},
      {letter: 'B', text: '9.8 mL/hr'},
      {letter: 'C', text: '3.1 mL/hr'},
      {letter: 'D', text: '12.5 mL/hr'}
    ],
    ans: 'A',
    sol: '**Find 60% humidity in the table.**\n\n```\nHumidity = 60% → Evaporation = 6.2 mL/hr\n```\n\n**Key insight:** Evaporation decreases as humidity increases because the air is already saturated with water vapor. At 100% humidity, evaporation stops completely (0.0 mL/hr). At 60%, the rate is 6.2 mL/hr.'
  },
  {
    pos: 34,
    diff: 'hard',
    text: 'Pendulum period was measured for different lengths:\n\n<table style="border-collapse: collapse; margin: 1rem 0;">\n<tr style="border-bottom: 2px solid #333;"><th style="padding: 0.5rem; text-align: left;">Length (cm)</th><th style="padding: 0.5rem; text-align: right;">Period (s)</th></tr>\n<tr><td style="padding: 0.5rem;">25</td><td style="padding: 0.5rem; text-align: right;">1.0</td></tr>\n<tr><td style="padding: 0.5rem;">100</td><td style="padding: 0.5rem; text-align: right;">2.0</td></tr>\n<tr><td style="padding: 0.5rem;">225</td><td style="padding: 0.5rem; text-align: right;">3.0</td></tr>\n<tr><td style="padding: 0.5rem;">400</td><td style="padding: 0.5rem; text-align: right;">4.0</td></tr>\n<tr><td style="padding: 0.5rem;">625</td><td style="padding: 0.5rem; text-align: right;">5.0</td></tr>\n</table>\n\nWhat is the period of a 100 cm pendulum?',
    ch: [
      {letter: 'A', text: '2.0 s'},
      {letter: 'B', text: '1.0 s'},
      {letter: 'C', text: '3.0 s'},
      {letter: 'D', text: '4.0 s'}
    ],
    ans: 'A',
    sol: '**Locate 100 cm in the length column.**\n\n```\nLength = 100 cm → Period = 2.0 s\n```\n\n**Key insight:** The period is proportional to the square root of length (T = 2π√(L/g)). Quadrupling the length from 25 cm to 100 cm doubles the period from 1.0 s to 2.0 s.'
  },
  {
    pos: 35,
    diff: 'hard',
    text: 'Specific heat capacity was measured for different metals:\n\n<table style="border-collapse: collapse; margin: 1rem 0;">\n<tr style="border-bottom: 2px solid #333;"><th style="padding: 0.5rem; text-align: left;">Metal</th><th style="padding: 0.5rem; text-align: right;">Specific Heat (J/g°C)</th></tr>\n<tr><td style="padding: 0.5rem;">Aluminum</td><td style="padding: 0.5rem; text-align: right;">0.90</td></tr>\n<tr><td style="padding: 0.5rem;">Copper</td><td style="padding: 0.5rem; text-align: right;">0.39</td></tr>\n<tr><td style="padding: 0.5rem;">Iron</td><td style="padding: 0.5rem; text-align: right;">0.45</td></tr>\n<tr><td style="padding: 0.5rem;">Lead</td><td style="padding: 0.5rem; text-align: right;">0.13</td></tr>\n<tr><td style="padding: 0.5rem;">Silver</td><td style="padding: 0.5rem; text-align: right;">0.24</td></tr>\n</table>\n\nWhich metal has the highest specific heat capacity?',
    ch: [
      {letter: 'A', text: 'Aluminum'},
      {letter: 'B', text: 'Copper'},
      {letter: 'C', text: 'Iron'},
      {letter: 'D', text: 'Lead'}
    ],
    ans: 'A',
    sol: '**Compare all specific heat values to find the maximum.**\n\n```\nAluminum: 0.90 J/g°C ← HIGHEST\nCopper: 0.39 J/g°C\nIron: 0.45 J/g°C\nLead: 0.13 J/g°C\nSilver: 0.24 J/g°C\n```\n\n**Key insight:** Aluminum has the highest specific heat at 0.90 J/g°C, meaning it requires more energy to heat up and retains heat longer. Lead has the lowest at 0.13 J/g°C, heating and cooling quickly.'
  },
  {
    pos: 36,
    diff: 'hard',
    text: 'Transpiration rate was measured at different wind speeds:\n\n<table style="border-collapse: collapse; margin: 1rem 0;">\n<tr style="border-bottom: 2px solid #333;"><th style="padding: 0.5rem; text-align: left;">Wind Speed (m/s)</th><th style="padding: 0.5rem; text-align: right;">Transpiration (g/hr)</th></tr>\n<tr><td style="padding: 0.5rem;">0</td><td style="padding: 0.5rem; text-align: right;">2.8</td></tr>\n<tr><td style="padding: 0.5rem;">2</td><td style="padding: 0.5rem; text-align: right;">4.5</td></tr>\n<tr><td style="padding: 0.5rem;">4</td><td style="padding: 0.5rem; text-align: right;">6.7</td></tr>\n<tr><td style="padding: 0.5rem;">6</td><td style="padding: 0.5rem; text-align: right;">8.2</td></tr>\n<tr><td style="padding: 0.5rem;">8</td><td style="padding: 0.5rem; text-align: right;">9.1</td></tr>\n</table>\n\nWith no wind (0 m/s), what was the transpiration rate?',
    ch: [
      {letter: 'A', text: '2.8 g/hr'},
      {letter: 'B', text: '4.5 g/hr'},
      {letter: 'C', text: '6.7 g/hr'},
      {letter: 'D', text: '8.2 g/hr'}
    ],
    ans: 'A',
    sol: '**No wind corresponds to 0 m/s wind speed.**\n\n```\nWind Speed = 0 m/s → Transpiration = 2.8 g/hr\n```\n\n**Key insight:** Wind increases transpiration by removing water vapor from around leaves. With no wind, transpiration is slowest at 2.8 g/hr. At 8 m/s wind, it more than triples to 9.1 g/hr.'
  },
  {
    pos: 37,
    diff: 'hard',
    text: 'Gas volume was measured at different pressures (constant temperature):\n\n<table style="border-collapse: collapse; margin: 1rem 0;">\n<tr style="border-bottom: 2px solid #333;"><th style="padding: 0.5rem; text-align: left;">Pressure (atm)</th><th style="padding: 0.5rem; text-align: right;">Volume (L)</th></tr>\n<tr><td style="padding: 0.5rem;">1.0</td><td style="padding: 0.5rem; text-align: right;">24.0</td></tr>\n<tr><td style="padding: 0.5rem;">2.0</td><td style="padding: 0.5rem; text-align: right;">12.0</td></tr>\n<tr><td style="padding: 0.5rem;">3.0</td><td style="padding: 0.5rem; text-align: right;">8.0</td></tr>\n<tr><td style="padding: 0.5rem;">4.0</td><td style="padding: 0.5rem; text-align: right;">6.0</td></tr>\n<tr><td style="padding: 0.5rem;">6.0</td><td style="padding: 0.5rem; text-align: right;">4.0</td></tr>\n</table>\n\nAt 3.0 atm pressure, what was the gas volume?',
    ch: [
      {letter: 'A', text: '8.0 L'},
      {letter: 'B', text: '12.0 L'},
      {letter: 'C', text: '6.0 L'},
      {letter: 'D', text: '24.0 L'}
    ],
    ans: 'A',
    sol: '**Find 3.0 atm in the pressure column.**\n\n```\nPressure = 3.0 atm → Volume = 8.0 L\n```\n\n**Key insight:** This demonstrates Boyle\'s Law (P₁V₁ = P₂V₂). Pressure and volume are inversely related. Tripling the pressure from 1.0 to 3.0 atm reduces the volume by a factor of 3, from 24.0 L to 8.0 L.'
  },
  {
    pos: 38,
    diff: 'hard',
    text: 'Insect population density was counted at different temperatures:\n\n<table style="border-collapse: collapse; margin: 1rem 0;">\n<tr style="border-bottom: 2px solid #333;"><th style="padding: 0.5rem; text-align: left;">Temperature (°C)</th><th style="padding: 0.5rem; text-align: right;">Density (per m²)</th></tr>\n<tr><td style="padding: 0.5rem;">15</td><td style="padding: 0.5rem; text-align: right;">32</td></tr>\n<tr><td style="padding: 0.5rem;">20</td><td style="padding: 0.5rem; text-align: right;">58</td></tr>\n<tr><td style="padding: 0.5rem;">25</td><td style="padding: 0.5rem; text-align: right;">95</td></tr>\n<tr><td style="padding: 0.5rem;">30</td><td style="padding: 0.5rem; text-align: right;">142</td></tr>\n<tr><td style="padding: 0.5rem;">35</td><td style="padding: 0.5rem; text-align: right;">168</td></tr>\n</table>\n\nAt 25°C, what was the insect population density?',
    ch: [
      {letter: 'A', text: '95 per m²'},
      {letter: 'B', text: '58 per m²'},
      {letter: 'C', text: '142 per m²'},
      {letter: 'D', text: '32 per m²'}
    ],
    ans: 'A',
    sol: '**Locate 25°C in the temperature column.**\n\n```\nTemperature = 25°C → Density = 95 per m²\n```\n\n**Key insight:** Insect population increases with temperature as warmer conditions support faster reproduction and activity. At 25°C, density is 95 per m², which is between the cooler 20°C (58) and warmer 30°C (142) values.'
  },
  {
    pos: 39,
    diff: 'hard',
    text: 'Viscosity was measured for a liquid at different temperatures:\n\n<table style="border-collapse: collapse; margin: 1rem 0;">\n<tr style="border-bottom: 2px solid #333;"><th style="padding: 0.5rem; text-align: left;">Temperature (°C)</th><th style="padding: 0.5rem; text-align: right;">Viscosity (cP)</th></tr>\n<tr><td style="padding: 0.5rem;">10</td><td style="padding: 0.5rem; text-align: right;">28.5</td></tr>\n<tr><td style="padding: 0.5rem;">20</td><td style="padding: 0.5rem; text-align: right;">18.2</td></tr>\n<tr><td style="padding: 0.5rem;">30</td><td style="padding: 0.5rem; text-align: right;">12.1</td></tr>\n<tr><td style="padding: 0.5rem;">40</td><td style="padding: 0.5rem; text-align: right;">8.3</td></tr>\n<tr><td style="padding: 0.5rem;">50</td><td style="padding: 0.5rem; text-align: right;">5.9</td></tr>\n</table>\n\nWhat was the viscosity at 30°C?',
    ch: [
      {letter: 'A', text: '12.1 cP'},
      {letter: 'B', text: '18.2 cP'},
      {letter: 'C', text: '8.3 cP'},
      {letter: 'D', text: '28.5 cP'}
    ],
    ans: 'A',
    sol: '**Find 30°C in the temperature column.**\n\n```\nTemperature = 30°C → Viscosity = 12.1 cP\n```\n\n**Key insight:** Viscosity (resistance to flow) decreases as temperature increases because molecules move faster and slide past each other more easily. At 30°C, viscosity is 12.1 cP, down from 28.5 cP at 10°C.'
  },
  {
    pos: 40,
    diff: 'hard',
    text: 'Refractive index was measured for different wavelengths of light:\n\n<table style="border-collapse: collapse; margin: 1rem 0;">\n<tr style="border-bottom: 2px solid #333;"><th style="padding: 0.5rem; text-align: left;">Wavelength (nm)</th><th style="padding: 0.5rem; text-align: right;">Refractive Index</th></tr>\n<tr><td style="padding: 0.5rem;">400</td><td style="padding: 0.5rem; text-align: right;">1.528</td></tr>\n<tr><td style="padding: 0.5rem;">500</td><td style="padding: 0.5rem; text-align: right;">1.521</td></tr>\n<tr><td style="padding: 0.5rem;">600</td><td style="padding: 0.5rem; text-align: right;">1.517</td></tr>\n<tr><td style="padding: 0.5rem;">700</td><td style="padding: 0.5rem; text-align: right;">1.514</td></tr>\n<tr><td style="padding: 0.5rem;">800</td><td style="padding: 0.5rem; text-align: right;">1.512</td></tr>\n</table>\n\nWhat is the refractive index for 600 nm light?',
    ch: [
      {letter: 'A', text: '1.517'},
      {letter: 'B', text: '1.521'},
      {letter: 'C', text: '1.514'},
      {letter: 'D', text: '1.528'}
    ],
    ans: 'A',
    sol: '**Locate 600 nm in the wavelength column.**\n\n```\nWavelength = 600 nm → Refractive Index = 1.517\n```\n\n**Key insight:** Refractive index decreases slightly with increasing wavelength (dispersion). Shorter wavelengths like 400 nm (violet) have higher refractive indices (1.528) and bend more than longer wavelengths like 600 nm (orange, 1.517).'
  },
  {
    pos: 41,
    diff: 'hard',
    text: 'Chlorophyll concentration was measured in leaf extracts:\n\n<table style="border-collapse: collapse; margin: 1rem 0;">\n<tr style="border-bottom: 2px solid #333;"><th style="padding: 0.5rem; text-align: left;">Sample</th><th style="padding: 0.5rem; text-align: right;">Chlorophyll (mg/g)</th></tr>\n<tr><td style="padding: 0.5rem;">Shade leaves</td><td style="padding: 0.5rem; text-align: right;">3.2</td></tr>\n<tr><td style="padding: 0.5rem;">Part sun leaves</td><td style="padding: 0.5rem; text-align: right;">2.8</td></tr>\n<tr><td style="padding: 0.5rem;">Full sun leaves</td><td style="padding: 0.5rem; text-align: right;">2.1</td></tr>\n<tr><td style="padding: 0.5rem;">Etiolated leaves</td><td style="padding: 0.5rem; text-align: right;">0.4</td></tr>\n</table>\n\nWhat was the chlorophyll concentration in full sun leaves?',
    ch: [
      {letter: 'A', text: '2.1 mg/g'},
      {letter: 'B', text: '2.8 mg/g'},
      {letter: 'C', text: '3.2 mg/g'},
      {letter: 'D', text: '0.4 mg/g'}
    ],
    ans: 'A',
    sol: '**Find "Full sun leaves" in the sample column.**\n\n```\nSample = Full sun leaves → Chlorophyll = 2.1 mg/g\n```\n\n**Key insight:** Full sun leaves have less chlorophyll (2.1 mg/g) than shade leaves (3.2 mg/g). Shade leaves compensate for lower light by producing more chlorophyll. Etiolated (light-deprived) leaves have minimal chlorophyll at 0.4 mg/g.'
  },
  {
    pos: 42,
    diff: 'hard',
    text: 'Magnetic field strength was measured at different distances from a magnet:\n\n<table style="border-collapse: collapse; margin: 1rem 0;">\n<tr style="border-bottom: 2px solid #333;"><th style="padding: 0.5rem; text-align: left;">Distance (cm)</th><th style="padding: 0.5rem; text-align: right;">Field Strength (mT)</th></tr>\n<tr><td style="padding: 0.5rem;">1</td><td style="padding: 0.5rem; text-align: right;">80.0</td></tr>\n<tr><td style="padding: 0.5rem;">2</td><td style="padding: 0.5rem; text-align: right;">20.0</td></tr>\n<tr><td style="padding: 0.5rem;">3</td><td style="padding: 0.5rem; text-align: right;">8.9</td></tr>\n<tr><td style="padding: 0.5rem;">4</td><td style="padding: 0.5rem; text-align: right;">5.0</td></tr>\n<tr><td style="padding: 0.5rem;">5</td><td style="padding: 0.5rem; text-align: right;">3.2</td></tr>\n</table>\n\nAt 2 cm from the magnet, what was the magnetic field strength?',
    ch: [
      {letter: 'A', text: '20.0 mT'},
      {letter: 'B', text: '80.0 mT'},
      {letter: 'C', text: '8.9 mT'},
      {letter: 'D', text: '5.0 mT'}
    ],
    ans: 'A',
    sol: '**Locate 2 cm in the distance column.**\n\n```\nDistance = 2 cm → Field Strength = 20.0 mT\n```\n\n**Key insight:** Magnetic field strength decreases rapidly with distance following an inverse cube relationship. Doubling the distance from 1 to 2 cm reduces field strength from 80.0 to 20.0 mT, a factor of 4.'
  },
  {
    pos: 43,
    diff: 'hard',
    text: 'Soil moisture content was measured at different depths after rainfall:\n\n<table style="border-collapse: collapse; margin: 1rem 0;">\n<tr style="border-bottom: 2px solid #333;"><th style="padding: 0.5rem; text-align: left;">Depth (cm)</th><th style="padding: 0.5rem; text-align: right;">Moisture (%)</th></tr>\n<tr><td style="padding: 0.5rem;">5</td><td style="padding: 0.5rem; text-align: right;">42</td></tr>\n<tr><td style="padding: 0.5rem;">15</td><td style="padding: 0.5rem; text-align: right;">38</td></tr>\n<tr><td style="padding: 0.5rem;">25</td><td style="padding: 0.5rem; text-align: right;">31</td></tr>\n<tr><td style="padding: 0.5rem;">35</td><td style="padding: 0.5rem; text-align: right;">28</td></tr>\n<tr><td style="padding: 0.5rem;">45</td><td style="padding: 0.5rem; text-align: right;">25</td></tr>\n</table>\n\nWhat was the soil moisture at 15 cm depth?',
    ch: [
      {letter: 'A', text: '38%'},
      {letter: 'B', text: '42%'},
      {letter: 'C', text: '31%'},
      {letter: 'D', text: '28%'}
    ],
    ans: 'A',
    sol: '**Find 15 cm in the depth column.**\n\n```\nDepth = 15 cm → Moisture = 38%\n```\n\n**Key insight:** Soil moisture is highest near the surface (42% at 5 cm) and decreases with depth as water percolates down. At 15 cm, moisture is 38%, which is between the surface value and deeper levels.'
  },
  {
    pos: 44,
    diff: 'hard',
    text: 'Ion concentration was measured in different solutions:\n\n<table style="border-collapse: collapse; margin: 1rem 0;">\n<tr style="border-bottom: 2px solid #333;"><th style="padding: 0.5rem; text-align: left;">Solution</th><th style="padding: 0.5rem; text-align: right;">Na⁺ (mM)</th><th style="padding: 0.5rem; text-align: right;">Cl⁻ (mM)</th></tr>\n<tr><td style="padding: 0.5rem;">A</td><td style="padding: 0.5rem; text-align: right;">145</td><td style="padding: 0.5rem; text-align: right;">110</td></tr>\n<tr><td style="padding: 0.5rem;">B</td><td style="padding: 0.5rem; text-align: right;">12</td><td style="padding: 0.5rem; text-align: right;">4</td></tr>\n<tr><td style="padding: 0.5rem;">C</td><td style="padding: 0.5rem; text-align: right;">142</td><td style="padding: 0.5rem; text-align: right;">103</td></tr>\n<tr><td style="padding: 0.5rem;">D</td><td style="padding: 0.5rem; text-align: right;">5</td><td style="padding: 0.5rem; text-align: right;">116</td></tr>\n</table>\n\nIn Solution B, what was the sodium ion concentration?',
    ch: [
      {letter: 'A', text: '12 mM'},
      {letter: 'B', text: '145 mM'},
      {letter: 'C', text: '142 mM'},
      {letter: 'D', text: '5 mM'}
    ],
    ans: 'A',
    sol: '**Find Solution B in the table.**\n\n```\nSolution = B → Na⁺ = 12 mM\n```\n\n**Key insight:** Solution B has relatively low sodium concentration at 12 mM compared to solutions A and C (145 and 142 mM). This table has multiple columns, so make sure to read the correct column (Na⁺, not Cl⁻).'
  },
  {
    pos: 45,
    diff: 'hard',
    text: 'Earthquake magnitude and energy release were recorded:\n\n<table style="border-collapse: collapse; margin: 1rem 0;">\n<tr style="border-bottom: 2px solid #333;"><th style="padding: 0.5rem; text-align: left;">Magnitude</th><th style="padding: 0.5rem; text-align: right;">Energy (Joules)</th></tr>\n<tr><td style="padding: 0.5rem;">3.0</td><td style="padding: 0.5rem; text-align: right;">2.0 × 10⁹</td></tr>\n<tr><td style="padding: 0.5rem;">4.0</td><td style="padding: 0.5rem; text-align: right;">6.3 × 10¹⁰</td></tr>\n<tr><td style="padding: 0.5rem;">5.0</td><td style="padding: 0.5rem; text-align: right;">2.0 × 10¹²</td></tr>\n<tr><td style="padding: 0.5rem;">6.0</td><td style="padding: 0.5rem; text-align: right;">6.3 × 10¹³</td></tr>\n<tr><td style="padding: 0.5rem;">7.0</td><td style="padding: 0.5rem; text-align: right;">2.0 × 10¹⁵</td></tr>\n</table>\n\nHow much energy is released by a magnitude 5.0 earthquake?',
    ch: [
      {letter: 'A', text: '2.0 × 10¹² Joules'},
      {letter: 'B', text: '6.3 × 10¹⁰ Joules'},
      {letter: 'C', text: '6.3 × 10¹³ Joules'},
      {letter: 'D', text: '2.0 × 10⁹ Joules'}
    ],
    ans: 'A',
    sol: '**Locate magnitude 5.0 in the table.**\n\n```\nMagnitude = 5.0 → Energy = 2.0 × 10¹² Joules\n```\n\n**Key insight:** Earthquake energy increases exponentially with magnitude. Each magnitude unit represents about 32 times more energy. A magnitude 5.0 releases 2.0 × 10¹² Joules, which is about 32 times the energy of a magnitude 4.0 earthquake.'
  },
  {
    pos: 46,
    diff: 'hard',
    text: 'Root growth was measured in different soil types:\n\n<table style="border-collapse: collapse; margin: 1rem 0;">\n<tr style="border-bottom: 2px solid #333;"><th style="padding: 0.5rem; text-align: left;">Soil Type</th><th style="padding: 0.5rem; text-align: right;">Root Length (cm)</th></tr>\n<tr><td style="padding: 0.5rem;">Clay</td><td style="padding: 0.5rem; text-align: right;">8.5</td></tr>\n<tr><td style="padding: 0.5rem;">Silt</td><td style="padding: 0.5rem; text-align: right;">12.3</td></tr>\n<tr><td style="padding: 0.5rem;">Sand</td><td style="padding: 0.5rem; text-align: right;">15.8</td></tr>\n<tr><td style="padding: 0.5rem;">Loam</td><td style="padding: 0.5rem; text-align: right;">18.2</td></tr>\n<tr><td style="padding: 0.5rem;">Gravel</td><td style="padding: 0.5rem; text-align: right;">6.1</td></tr>\n</table>\n\nIn which soil type was root growth greatest?',
    ch: [
      {letter: 'A', text: 'Loam'},
      {letter: 'B', text: 'Sand'},
      {letter: 'C', text: 'Silt'},
      {letter: 'D', text: 'Clay'}
    ],
    ans: 'A',
    sol: '**Compare all root length values to find the maximum.**\n\n```\nClay: 8.5 cm\nSilt: 12.3 cm\nSand: 15.8 cm\nLoam: 18.2 cm ← GREATEST\nGravel: 6.1 cm\n```\n\n**Key insight:** Loam soil produced the greatest root growth at 18.2 cm. Loam is ideal for plant growth as it balances drainage, aeration, and nutrient retention. Gravel produced the least growth at 6.1 cm due to poor water and nutrient retention.'
  },
  {
    pos: 47,
    diff: 'hard',
    text: 'Star brightness was measured at different distances:\n\n<table style="border-collapse: collapse; margin: 1rem 0;">\n<tr style="border-bottom: 2px solid #333;"><th style="padding: 0.5rem; text-align: left;">Distance (parsecs)</th><th style="padding: 0.5rem; text-align: right;">Apparent Magnitude</th></tr>\n<tr><td style="padding: 0.5rem;">10</td><td style="padding: 0.5rem; text-align: right;">5.0</td></tr>\n<tr><td style="padding: 0.5rem;">20</td><td style="padding: 0.5rem; text-align: right;">6.5</td></tr>\n<tr><td style="padding: 0.5rem;">40</td><td style="padding: 0.5rem; text-align: right;">8.0</td></tr>\n<tr><td style="padding: 0.5rem;">80</td><td style="padding: 0.5rem; text-align: right;">9.5</td></tr>\n<tr><td style="padding: 0.5rem;">160</td><td style="padding: 0.5rem; text-align: right;">11.0</td></tr>\n</table>\n\nAt 40 parsecs distance, what is the star\'s apparent magnitude?',
    ch: [
      {letter: 'A', text: '8.0'},
      {letter: 'B', text: '6.5'},
      {letter: 'C', text: '9.5'},
      {letter: 'D', text: '5.0'}
    ],
    ans: 'A',
    sol: '**Find 40 parsecs in the distance column.**\n\n```\nDistance = 40 parsecs → Apparent Magnitude = 8.0\n```\n\n**Key insight:** Apparent magnitude increases (gets dimmer) with distance. Every doubling of distance adds 1.5 to the magnitude. At 40 parsecs, the star appears at magnitude 8.0, dimmer than at 20 parsecs (6.5) but brighter than at 80 parsecs (9.5).'
  },
  {
    pos: 48,
    diff: 'hard',
    text: 'Water density was measured at different temperatures:\n\n<table style="border-collapse: collapse; margin: 1rem 0;">\n<tr style="border-bottom: 2px solid #333;"><th style="padding: 0.5rem; text-align: left;">Temperature (°C)</th><th style="padding: 0.5rem; text-align: right;">Density (g/cm³)</th></tr>\n<tr><td style="padding: 0.5rem;">0</td><td style="padding: 0.5rem; text-align: right;">0.9998</td></tr>\n<tr><td style="padding: 0.5rem;">4</td><td style="padding: 0.5rem; text-align: right;">1.0000</td></tr>\n<tr><td style="padding: 0.5rem;">10</td><td style="padding: 0.5rem; text-align: right;">0.9997</td></tr>\n<tr><td style="padding: 0.5rem;">20</td><td style="padding: 0.5rem; text-align: right;">0.9982</td></tr>\n<tr><td style="padding: 0.5rem;">30</td><td style="padding: 0.5rem; text-align: right;">0.9957</td></tr>\n</table>\n\nAt what temperature does water reach its maximum density?',
    ch: [
      {letter: 'A', text: '4°C'},
      {letter: 'B', text: '0°C'},
      {letter: 'C', text: '10°C'},
      {letter: 'D', text: '20°C'}
    ],
    ans: 'A',
    sol: '**Compare all density values to find the maximum.**\n\n```\n0°C: 0.9998 g/cm³\n4°C: 1.0000 g/cm³ ← MAXIMUM\n10°C: 0.9997 g/cm³\n20°C: 0.9982 g/cm³\n30°C: 0.9957 g/cm³\n```\n\n**Key insight:** Water reaches maximum density at 4°C (1.0000 g/cm³). This unusual property causes ice to float and lakes to stratify, with 4°C water sinking to the bottom while colder water and ice remain at the surface.'
  },
  {
    pos: 49,
    diff: 'hard',
    text: 'Antigen concentration was measured using ELISA:\n\n<table style="border-collapse: collapse; margin: 1rem 0;">\n<tr style="border-bottom: 2px solid #333;"><th style="padding: 0.5rem; text-align: left;">Sample</th><th style="padding: 0.5rem; text-align: right;">Absorbance (450nm)</th><th style="padding: 0.5rem; text-align: right;">Concentration (ng/mL)</th></tr>\n<tr><td style="padding: 0.5rem;">Standard 1</td><td style="padding: 0.5rem; text-align: right;">0.15</td><td style="padding: 0.5rem; text-align: right;">10</td></tr>\n<tr><td style="padding: 0.5rem;">Standard 2</td><td style="padding: 0.5rem; text-align: right;">0.28</td><td style="padding: 0.5rem; text-align: right;">20</td></tr>\n<tr><td style="padding: 0.5rem;">Standard 3</td><td style="padding: 0.5rem; text-align: right;">0.54</td><td style="padding: 0.5rem; text-align: right;">40</td></tr>\n<tr><td style="padding: 0.5rem;">Unknown X</td><td style="padding: 0.5rem; text-align: right;">0.42</td><td style="padding: 0.5rem; text-align: right;">?</td></tr>\n</table>\n\nWhat was the absorbance reading for Standard 2?',
    ch: [
      {letter: 'A', text: '0.28'},
      {letter: 'B', text: '0.15'},
      {letter: 'C', text: '0.54'},
      {letter: 'D', text: '0.42'}
    ],
    ans: 'A',
    sol: '**Find Standard 2 in the sample column.**\n\n```\nSample = Standard 2 → Absorbance = 0.28\n```\n\n**Key insight:** Standard 2 has an absorbance of 0.28 at a concentration of 20 ng/mL. This table has multiple data columns, so carefully read the correct column. The unknown sample X has absorbance 0.42, which falls between Standards 2 and 3.'
  },
  {
    pos: 50,
    diff: 'hard',
    text: 'Glacier retreat was measured over time:\n\n<table style="border-collapse: collapse; margin: 1rem 0;">\n<tr style="border-bottom: 2px solid #333;"><th style="padding: 0.5rem; text-align: left;">Year</th><th style="padding: 0.5rem; text-align: right;">Distance from marker (m)</th></tr>\n<tr><td style="padding: 0.5rem;">2000</td><td style="padding: 0.5rem; text-align: right;">0</td></tr>\n<tr><td style="padding: 0.5rem;">2005</td><td style="padding: 0.5rem; text-align: right;">45</td></tr>\n<tr><td style="padding: 0.5rem;">2010</td><td style="padding: 0.5rem; text-align: right;">108</td></tr>\n<tr><td style="padding: 0.5rem;">2015</td><td style="padding: 0.5rem; text-align: right;">185</td></tr>\n<tr><td style="padding: 0.5rem;">2020</td><td style="padding: 0.5rem; text-align: right;">275</td></tr>\n</table>\n\nIn 2010, how far had the glacier retreated from the marker?',
    ch: [
      {letter: 'A', text: '108 m'},
      {letter: 'B', text: '45 m'},
      {letter: 'C', text: '185 m'},
      {letter: 'D', text: '0 m'}
    ],
    ans: 'A',
    sol: '**Find year 2010 in the table.**\n\n```\nYear = 2010 → Distance = 108 m\n```\n\n**Key insight:** The glacier has retreated 108 meters by 2010 from its 2000 position (0 m). The retreat is accelerating: 45 m in the first 5 years (2000-2005) but 63 m in the second 5 years (2005-2010), indicating increasing melting rates.'
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
