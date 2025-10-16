import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: resolve(__dirname, '../.env') });

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

const allQuizzes = {
  '5.1': {
    title: '🔒 Mastery Quiz: Number Theory',
    questions: [
      {
        question_text: 'Which of the following is a prime number?',
        correct_answer: 'C',
        explanation: '23 is prime because it has exactly two factors: 1 and 23. The others are composite: 15 = 3 × 5, 21 = 3 × 7, 27 = 3³, 35 = 5 × 7.',
        options: [
          { letter: 'A', text: '15' },
          { letter: 'B', text: '21' },
          { letter: 'C', text: '23' },
          { letter: 'D', text: '27' },
          { letter: 'E', text: '35' }
        ]
      },
      {
        question_text: 'What is the prime factorization of 72?',
        correct_answer: 'B',
        explanation: '72 = 8 × 9 = 2³ × 3². Breaking down: 72 ÷ 2 = 36, 36 ÷ 2 = 18, 18 ÷ 2 = 9, 9 ÷ 3 = 3, 3 is prime.',
        options: [
          { letter: 'A', text: '2² × 3³' },
          { letter: 'B', text: '2³ × 3²' },
          { letter: 'C', text: '2⁴ × 3' },
          { letter: 'D', text: '2 × 3⁴' },
          { letter: 'E', text: '2² × 18' }
        ]
      },
      {
        question_text: 'What is the GCD (Greatest Common Divisor) of 48 and 60?',
        correct_answer: 'D',
        explanation: '48 = 2⁴ × 3, 60 = 2² × 3 × 5. GCD uses lowest powers of common primes: 2² × 3 = 4 × 3 = 12.',
        options: [
          { letter: 'A', text: '4' },
          { letter: 'B', text: '6' },
          { letter: 'C', text: '8' },
          { letter: 'D', text: '12' },
          { letter: 'E', text: '24' }
        ]
      },
      {
        question_text: 'What is the LCM (Least Common Multiple) of 12 and 18?',
        correct_answer: 'E',
        explanation: '12 = 2² × 3, 18 = 2 × 3². LCM uses highest powers of all primes: 2² × 3² = 4 × 9 = 36.',
        options: [
          { letter: 'A', text: '6' },
          { letter: 'B', text: '12' },
          { letter: 'C', text: '18' },
          { letter: 'D', text: '24' },
          { letter: 'E', text: '36' }
        ]
      },
      {
        question_text: 'Which of the following numbers is divisible by 9?',
        correct_answer: 'C',
        explanation: 'A number is divisible by 9 if the sum of its digits is divisible by 9. For 234: 2 + 3 + 4 = 9, which is divisible by 9.',
        options: [
          { letter: 'A', text: '123' },
          { letter: 'B', text: '156' },
          { letter: 'C', text: '234' },
          { letter: 'D', text: '345' },
          { letter: 'E', text: '456' }
        ]
      },
      {
        question_text: 'If GCD(a, b) = 8 and LCM(a, b) = 240, and a = 48, what is b?',
        correct_answer: 'B',
        explanation: 'Use the relationship: GCD × LCM = a × b. So 8 × 240 = 48 × b. 1920 = 48b, therefore b = 40.',
        options: [
          { letter: 'A', text: '24' },
          { letter: 'B', text: '40' },
          { letter: 'C', text: '60' },
          { letter: 'D', text: '80' },
          { letter: 'E', text: '120' }
        ]
      }
    ]
  },
  '5.2': {
    title: '🔒 Mastery Quiz: Percentages',
    questions: [
      {
        question_text: 'What is 15% of 80?',
        correct_answer: 'B',
        explanation: 'Convert to decimal: 15% = 0.15. Multiply: 0.15 × 80 = 12.',
        options: [
          { letter: 'A', text: '10' },
          { letter: 'B', text: '12' },
          { letter: 'C', text: '14' },
          { letter: 'D', text: '15' },
          { letter: 'E', text: '16' }
        ]
      },
      {
        question_text: 'A shirt originally costs $40. After a 25% discount, what is the new price?',
        correct_answer: 'D',
        explanation: 'Discount amount: 25% of $40 = 0.25 × 40 = $10. New price: $40 − $10 = $30.',
        options: [
          { letter: 'A', text: '$25' },
          { letter: 'B', text: '$28' },
          { letter: 'C', text: '$29' },
          { letter: 'D', text: '$30' },
          { letter: 'E', text: '$35' }
        ]
      },
      {
        question_text: 'A population increases from 500 to 625. What is the percent increase?',
        correct_answer: 'C',
        explanation: 'Percent change = ((New − Old) / Old) × 100% = ((625 − 500) / 500) × 100% = (125/500) × 100% = 25%.',
        options: [
          { letter: 'A', text: '15%' },
          { letter: 'B', text: '20%' },
          { letter: 'C', text: '25%' },
          { letter: 'D', text: '30%' },
          { letter: 'E', text: '40%' }
        ]
      },
      {
        question_text: 'If a price increases by 20% and then decreases by 20%, what is the net change?',
        correct_answer: 'B',
        explanation: 'Start with 100. After 20% increase: 120. After 20% decrease of 120: 120 × 0.80 = 96. Net change: 96 − 100 = −4, so 4% decrease.',
        options: [
          { letter: 'A', text: '0% (no change)' },
          { letter: 'B', text: '4% decrease' },
          { letter: 'C', text: '2% decrease' },
          { letter: 'D', text: '2% increase' },
          { letter: 'E', text: '4% increase' }
        ]
      },
      {
        question_text: '30 is what percent of 120?',
        correct_answer: 'A',
        explanation: 'Set up proportion: 30/120 = x/100. Cross-multiply: 3000 = 120x, so x = 25%.',
        options: [
          { letter: 'A', text: '25%' },
          { letter: 'B', text: '30%' },
          { letter: 'C', text: '33%' },
          { letter: 'D', text: '40%' },
          { letter: 'E', text: '50%' }
        ]
      },
      {
        question_text: 'A store increases prices by 50%, then offers a 50% discount. If an item originally cost $100, what is the final price?',
        correct_answer: 'C',
        explanation: 'After 50% increase: $100 × 1.50 = $150. After 50% discount: $150 × 0.50 = $75. NOT back to original!',
        options: [
          { letter: 'A', text: '$50' },
          { letter: 'B', text: '$65' },
          { letter: 'C', text: '$75' },
          { letter: 'D', text: '$90' },
          { letter: 'E', text: '$100' }
        ]
      }
    ]
  },
  '5.3': {
    title: '🔒 Mastery Quiz: Ratios and Proportions',
    questions: [
      {
        question_text: 'If the ratio of boys to girls in a class is 3:5 and there are 15 boys, how many girls are there?',
        correct_answer: 'C',
        explanation: 'Set up proportion: 3/5 = 15/x. Cross-multiply: 3x = 75, so x = 25 girls.',
        options: [
          { letter: 'A', text: '18' },
          { letter: 'B', text: '20' },
          { letter: 'C', text: '25' },
          { letter: 'D', text: '30' },
          { letter: 'E', text: '45' }
        ]
      },
      {
        question_text: 'If y varies directly with x, and y = 12 when x = 4, what is y when x = 7?',
        correct_answer: 'B',
        explanation: 'Direct variation: y = kx. Find k: 12 = k(4), so k = 3. Then y = 3(7) = 21.',
        options: [
          { letter: 'A', text: '18' },
          { letter: 'B', text: '21' },
          { letter: 'C', text: '24' },
          { letter: 'D', text: '27' },
          { letter: 'E', text: '28' }
        ]
      },
      {
        question_text: 'If y varies inversely with x, and y = 6 when x = 5, what is y when x = 10?',
        correct_answer: 'A',
        explanation: 'Inverse variation: y = k/x. Find k: 6 = k/5, so k = 30. Then y = 30/10 = 3.',
        options: [
          { letter: 'A', text: '3' },
          { letter: 'B', text: '4' },
          { letter: 'C', text: '5' },
          { letter: 'D', text: '12' },
          { letter: 'E', text: '15' }
        ]
      },
      {
        question_text: 'A recipe calls for ingredients in the ratio 2:3:5 (flour:sugar:milk). If 6 cups of flour are used, how many cups of milk are needed?',
        correct_answer: 'E',
        explanation: 'Flour ratio is 2, actual is 6, so multiplier is 3. Milk ratio is 5, so actual = 5 × 3 = 15 cups.',
        options: [
          { letter: 'A', text: '9' },
          { letter: 'B', text: '10' },
          { letter: 'C', text: '12' },
          { letter: 'D', text: '14' },
          { letter: 'E', text: '15' }
        ]
      },
      {
        question_text: 'A car travels 240 miles in 4 hours. At this rate, how long will it take to travel 360 miles?',
        correct_answer: 'D',
        explanation: 'Rate = 240 ÷ 4 = 60 mph. Time = Distance ÷ Rate = 360 ÷ 60 = 6 hours.',
        options: [
          { letter: 'A', text: '4.5 hours' },
          { letter: 'B', text: '5 hours' },
          { letter: 'C', text: '5.5 hours' },
          { letter: 'D', text: '6 hours' },
          { letter: 'E', text: '7 hours' }
        ]
      },
      {
        question_text: 'Two similar triangles have corresponding sides of 6 and 9. If the smaller triangle has an area of 24 square units, what is the area of the larger triangle?',
        correct_answer: 'C',
        explanation: 'Scale factor for sides: 9/6 = 1.5. Area scales by square of scale factor: 1.5² = 2.25. Area = 24 × 2.25 = 54.',
        options: [
          { letter: 'A', text: '36' },
          { letter: 'B', text: '48' },
          { letter: 'C', text: '54' },
          { letter: 'D', text: '60' },
          { letter: 'E', text: '72' }
        ]
      }
    ]
  },
  '5.4': {
    title: '🔒 Mastery Quiz: Unit Conversion',
    questions: [
      {
        question_text: 'How many inches are in 3.5 feet?',
        correct_answer: 'C',
        explanation: '1 foot = 12 inches. 3.5 feet × 12 inches/foot = 42 inches.',
        options: [
          { letter: 'A', text: '36 inches' },
          { letter: 'B', text: '40 inches' },
          { letter: 'C', text: '42 inches' },
          { letter: 'D', text: '44 inches' },
          { letter: 'E', text: '48 inches' }
        ]
      },
      {
        question_text: 'Convert 5 kilometers to meters.',
        correct_answer: 'E',
        explanation: '1 kilometer = 1000 meters. 5 km × 1000 m/km = 5000 meters.',
        options: [
          { letter: 'A', text: '50 meters' },
          { letter: 'B', text: '500 meters' },
          { letter: 'C', text: '5000 centimeters' },
          { letter: 'D', text: '50000 centimeters' },
          { letter: 'E', text: '5000 meters' }
        ]
      },
      {
        question_text: 'A rectangle measures 2 feet by 3 feet. What is its area in square inches?',
        correct_answer: 'D',
        explanation: 'Convert to inches first: 2 ft = 24 in, 3 ft = 36 in. Area = 24 × 36 = 864 sq in. (Or: 6 sq ft × 144 sq in/sq ft = 864).',
        options: [
          { letter: 'A', text: '72 sq in' },
          { letter: 'B', text: '144 sq in' },
          { letter: 'C', text: '288 sq in' },
          { letter: 'D', text: '864 sq in' },
          { letter: 'E', text: '1728 sq in' }
        ]
      },
      {
        question_text: 'Convert 2.5 hours to minutes.',
        correct_answer: 'A',
        explanation: '1 hour = 60 minutes. 2.5 hours × 60 min/hour = 150 minutes.',
        options: [
          { letter: 'A', text: '150 minutes' },
          { letter: 'B', text: '125 minutes' },
          { letter: 'C', text: '100 minutes' },
          { letter: 'D', text: '90 minutes' },
          { letter: 'E', text: '75 minutes' }
        ]
      },
      {
        question_text: 'How many yards are in 1 mile?',
        correct_answer: 'B',
        explanation: '1 mile = 5280 feet. 1 yard = 3 feet. 5280 ÷ 3 = 1760 yards.',
        options: [
          { letter: 'A', text: '1000' },
          { letter: 'B', text: '1760' },
          { letter: 'C', text: '2640' },
          { letter: 'D', text: '5280' },
          { letter: 'E', text: '10560' }
        ]
      },
      {
        question_text: 'Convert 3000 grams to kilograms.',
        correct_answer: 'A',
        explanation: '1 kilogram = 1000 grams. 3000 g ÷ 1000 g/kg = 3 kg.',
        options: [
          { letter: 'A', text: '3 kg' },
          { letter: 'B', text: '30 kg' },
          { letter: 'C', text: '300 kg' },
          { letter: 'D', text: '3000000 mg' },
          { letter: 'E', text: '0.3 kg' }
        ]
      }
    ]
  },
  '5.5': {
    title: '🔒 Mastery Quiz: Scientific Notation',
    questions: [
      {
        question_text: 'Write 0.0045 in scientific notation.',
        correct_answer: 'B',
        explanation: 'Move decimal 3 places right to get 4.5, so exponent is -3: 4.5 × 10⁻³.',
        options: [
          { letter: 'A', text: '45 × 10⁻⁴' },
          { letter: 'B', text: '4.5 × 10⁻³' },
          { letter: 'C', text: '4.5 × 10³' },
          { letter: 'D', text: '0.45 × 10⁻²' },
          { letter: 'E', text: '45 × 10⁻²' }
        ]
      },
      {
        question_text: 'Simplify: (3 × 10⁴)(2 × 10⁵)',
        correct_answer: 'D',
        explanation: 'Multiply coefficients: 3 × 2 = 6. Add exponents: 4 + 5 = 9. Result: 6 × 10⁹.',
        options: [
          { letter: 'A', text: '5 × 10⁹' },
          { letter: 'B', text: '6 × 10⁸' },
          { letter: 'C', text: '5 × 10²⁰' },
          { letter: 'D', text: '6 × 10⁹' },
          { letter: 'E', text: '6 × 10²⁰' }
        ]
      },
      {
        question_text: 'Simplify: (8 × 10⁷) ÷ (2 × 10³)',
        correct_answer: 'C',
        explanation: 'Divide coefficients: 8 ÷ 2 = 4. Subtract exponents: 7 − 3 = 4. Result: 4 × 10⁴.',
        options: [
          { letter: 'A', text: '4 × 10²' },
          { letter: 'B', text: '4 × 10³' },
          { letter: 'C', text: '4 × 10⁴' },
          { letter: 'D', text: '6 × 10⁴' },
          { letter: 'E', text: '16 × 10⁴' }
        ]
      },
      {
        question_text: 'Convert 5.2 × 10⁻⁴ to standard form.',
        correct_answer: 'A',
        explanation: 'Negative exponent means move decimal left 4 places: 0.00052.',
        options: [
          { letter: 'A', text: '0.00052' },
          { letter: 'B', text: '0.0052' },
          { letter: 'C', text: '52000' },
          { letter: 'D', text: '5200' },
          { letter: 'E', text: '0.52' }
        ]
      },
      {
        question_text: 'Which is largest: 3 × 10⁶, 5 × 10⁵, or 2 × 10⁷?',
        correct_answer: 'E',
        explanation: 'Compare exponents first. 10⁷ is largest power, so 2 × 10⁷ = 20,000,000 is largest.',
        options: [
          { letter: 'A', text: '3 × 10⁶' },
          { letter: 'B', text: '5 × 10⁵' },
          { letter: 'C', text: 'They are equal' },
          { letter: 'D', text: 'Cannot determine' },
          { letter: 'E', text: '2 × 10⁷' }
        ]
      },
      {
        question_text: 'Simplify: (1.5 × 10³) + (2.5 × 10³)',
        correct_answer: 'C',
        explanation: 'Same exponent, so add coefficients: 1.5 + 2.5 = 4. Keep exponent: 4 × 10³.',
        options: [
          { letter: 'A', text: '3 × 10³' },
          { letter: 'B', text: '4 × 10⁶' },
          { letter: 'C', text: '4 × 10³' },
          { letter: 'D', text: '1.5 × 10⁶' },
          { letter: 'E', text: '2.5 × 10⁶' }
        ]
      }
    ]
  },
  '5.6': {
    title: '🔒 Mastery Quiz: Repeating Patterns',
    questions: [
      {
        question_text: 'The sequence 2, 5, 8, 2, 5, 8, ... repeats. What is the 25th term?',
        correct_answer: 'A',
        explanation: 'Cycle length is 3. 25 ÷ 3 = 8 remainder 1. Remainder 1 means 1st position: 2.',
        options: [
          { letter: 'A', text: '2' },
          { letter: 'B', text: '5' },
          { letter: 'C', text: '8' },
          { letter: 'D', text: '11' },
          { letter: 'E', text: '14' }
        ]
      },
      {
        question_text: 'What is the units digit of 7²⁵?',
        correct_answer: 'C',
        explanation: 'Units digits of powers of 7 cycle: 7, 9, 3, 1, 7, 9, 3, 1... (cycle of 4). 25 ÷ 4 = 6 remainder 1. Position 1 is 7.',
        options: [
          { letter: 'A', text: '1' },
          { letter: 'B', text: '3' },
          { letter: 'C', text: '7' },
          { letter: 'D', text: '9' },
          { letter: 'E', text: '5' }
        ]
      },
      {
        question_text: 'Today is Monday. What day will it be 100 days from now?',
        correct_answer: 'B',
        explanation: '100 ÷ 7 = 14 remainder 2. Starting Monday, 2 days forward is Wednesday.',
        options: [
          { letter: 'A', text: 'Monday' },
          { letter: 'B', text: 'Wednesday' },
          { letter: 'C', text: 'Friday' },
          { letter: 'D', text: 'Saturday' },
          { letter: 'E', text: 'Tuesday' }
        ]
      },
      {
        question_text: 'The pattern A, B, C, D, A, B, C, D, ... repeats. What is the 50th letter?',
        correct_answer: 'D',
        explanation: 'Cycle length is 4. 50 ÷ 4 = 12 remainder 2. Position 2 is B.',
        options: [
          { letter: 'A', text: 'A' },
          { letter: 'B', text: 'B' },
          { letter: 'C', text: 'C' },
          { letter: 'D', text: 'D' },
          { letter: 'E', text: 'Cannot determine' }
        ]
      },
      {
        question_text: 'What is the remainder when 100 is divided by 7?',
        correct_answer: 'B',
        explanation: '100 ÷ 7 = 14 with remainder. 7 × 14 = 98, so 100 − 98 = 2.',
        options: [
          { letter: 'A', text: '0' },
          { letter: 'B', text: '2' },
          { letter: 'C', text: '3' },
          { letter: 'D', text: '5' },
          { letter: 'E', text: '6' }
        ]
      },
      {
        question_text: 'What is the units digit of 3⁵⁰?',
        correct_answer: 'A',
        explanation: 'Units digits of powers of 3 cycle: 3, 9, 7, 1, 3, 9, 7, 1... (cycle of 4). 50 ÷ 4 = 12 remainder 2. Position 2 is 9.',
        options: [
          { letter: 'A', text: '9' },
          { letter: 'B', text: '3' },
          { letter: 'C', text: '7' },
          { letter: 'D', text: '1' },
          { letter: 'E', text: '0' }
        ]
      }
    ]
  },
  '6.1': {
    title: '🔒 Mastery Quiz: Mean, Median, Mode',
    questions: [
      {
        question_text: 'Find the mean of: 4, 7, 10, 13, 16',
        correct_answer: 'C',
        explanation: 'Mean = sum ÷ count = (4 + 7 + 10 + 13 + 16) ÷ 5 = 50 ÷ 5 = 10.',
        options: [
          { letter: 'A', text: '8' },
          { letter: 'B', text: '9' },
          { letter: 'C', text: '10' },
          { letter: 'D', text: '11' },
          { letter: 'E', text: '12' }
        ]
      },
      {
        question_text: 'Find the median of: 3, 8, 5, 12, 7',
        correct_answer: 'D',
        explanation: 'Order: 3, 5, 7, 8, 12. Middle (3rd) value is 7.',
        options: [
          { letter: 'A', text: '5' },
          { letter: 'B', text: '6' },
          { letter: 'C', text: '6.5' },
          { letter: 'D', text: '7' },
          { letter: 'E', text: '8' }
        ]
      },
      {
        question_text: 'Find the mode of: 2, 5, 5, 7, 9, 5, 12',
        correct_answer: 'B',
        explanation: '5 appears three times, more than any other value, so mode = 5.',
        options: [
          { letter: 'A', text: '2' },
          { letter: 'B', text: '5' },
          { letter: 'C', text: '7' },
          { letter: 'D', text: '9' },
          { letter: 'E', text: 'No mode' }
        ]
      },
      {
        question_text: 'The mean of 5 numbers is 12. If four of the numbers are 10, 11, 13, 14, what is the fifth number?',
        correct_answer: 'C',
        explanation: 'Total sum = 12 × 5 = 60. Sum of four numbers = 10 + 11 + 13 + 14 = 48. Fifth number = 60 − 48 = 12.',
        options: [
          { letter: 'A', text: '10' },
          { letter: 'B', text: '11' },
          { letter: 'C', text: '12' },
          { letter: 'D', text: '13' },
          { letter: 'E', text: '15' }
        ]
      },
      {
        question_text: 'Find the median of: 2, 4, 6, 8, 10, 12',
        correct_answer: 'E',
        explanation: 'Even number of values. Median = average of middle two: (6 + 8) ÷ 2 = 7.',
        options: [
          { letter: 'A', text: '6' },
          { letter: 'B', text: '6.5' },
          { letter: 'C', text: '6.75' },
          { letter: 'D', text: '7.5' },
          { letter: 'E', text: '7' }
        ]
      },
      {
        question_text: 'A student scores 85, 90, and 78 on three tests. What score is needed on a fourth test to have a mean of 85?',
        correct_answer: 'D',
        explanation: 'Total needed = 85 × 4 = 340. Current total = 85 + 90 + 78 = 253. Fourth test = 340 − 253 = 87.',
        options: [
          { letter: 'A', text: '82' },
          { letter: 'B', text: '84' },
          { letter: 'C', text: '85' },
          { letter: 'D', text: '87' },
          { letter: 'E', text: '90' }
        ]
      }
    ]
  },
  '6.2': {
    title: '🔒 Mastery Quiz: Advanced Statistics',
    questions: [
      {
        question_text: 'Find the range of: 3, 7, 12, 15, 20',
        correct_answer: 'C',
        explanation: 'Range = maximum − minimum = 20 − 3 = 17.',
        options: [
          { letter: 'A', text: '12' },
          { letter: 'B', text: '15' },
          { letter: 'C', text: '17' },
          { letter: 'D', text: '20' },
          { letter: 'E', text: '23' }
        ]
      },
      {
        question_text: 'For the data: 2, 4, 6, 8, 10, 12, 14, what is Q1 (first quartile)?',
        correct_answer: 'A',
        explanation: 'Q1 is median of lower half: 2, 4, 6. Median of these is 4.',
        options: [
          { letter: 'A', text: '4' },
          { letter: 'B', text: '5' },
          { letter: 'C', text: '6' },
          { letter: 'D', text: '7' },
          { letter: 'E', text: '8' }
        ]
      },
      {
        question_text: 'For the data: 5, 10, 15, 20, 25, 30, 35, what is Q3 (third quartile)?',
        correct_answer: 'D',
        explanation: 'Q3 is median of upper half: 25, 30, 35. Median is 30.',
        options: [
          { letter: 'A', text: '20' },
          { letter: 'B', text: '22.5' },
          { letter: 'C', text: '25' },
          { letter: 'D', text: '30' },
          { letter: 'E', text: '32.5' }
        ]
      },
      {
        question_text: 'If Q1 = 10 and Q3 = 30, what is the IQR (interquartile range)?',
        correct_answer: 'B',
        explanation: 'IQR = Q3 − Q1 = 30 − 10 = 20.',
        options: [
          { letter: 'A', text: '10' },
          { letter: 'B', text: '20' },
          { letter: 'C', text: '30' },
          { letter: 'D', text: '40' },
          { letter: 'E', text: '300' }
        ]
      },
      {
        question_text: 'Which measure of center is most resistant to outliers?',
        correct_answer: 'B',
        explanation: 'Median is not affected by extreme values (outliers), while mean is significantly affected.',
        options: [
          { letter: 'A', text: 'Mean' },
          { letter: 'B', text: 'Median' },
          { letter: 'C', text: 'Mode' },
          { letter: 'D', text: 'Range' },
          { letter: 'E', text: 'All equally resistant' }
        ]
      },
      {
        question_text: 'For Q1 = 12, Q3 = 28, IQR = 16, a value is an outlier if it is above which value?',
        correct_answer: 'C',
        explanation: 'Upper boundary = Q3 + 1.5 × IQR = 28 + 1.5(16) = 28 + 24 = 52.',
        options: [
          { letter: 'A', text: '28' },
          { letter: 'B', text: '40' },
          { letter: 'C', text: '52' },
          { letter: 'D', text: '44' },
          { letter: 'E', text: '48' }
        ]
      }
    ]
  },
  '6.3': {
    title: '🔒 Mastery Quiz: Probability',
    questions: [
      {
        question_text: 'A bag contains 3 red, 4 blue, and 5 green marbles. What is the probability of drawing a blue marble?',
        correct_answer: 'B',
        explanation: 'P(blue) = (number of blue) / (total) = 4 / (3 + 4 + 5) = 4/12 = 1/3.',
        options: [
          { letter: 'A', text: '1/4' },
          { letter: 'B', text: '1/3' },
          { letter: 'C', text: '1/2' },
          { letter: 'D', text: '2/3' },
          { letter: 'E', text: '3/4' }
        ]
      },
      {
        question_text: 'A fair coin is flipped twice. What is the probability of getting two heads?',
        correct_answer: 'A',
        explanation: 'Independent events. P(H and H) = P(H) × P(H) = 1/2 × 1/2 = 1/4.',
        options: [
          { letter: 'A', text: '1/4' },
          { letter: 'B', text: '1/3' },
          { letter: 'C', text: '1/2' },
          { letter: 'D', text: '2/3' },
          { letter: 'E', text: '3/4' }
        ]
      },
      {
        question_text: 'A bag has 5 red and 3 blue marbles. Two marbles are drawn without replacement. What is P(both red)?',
        correct_answer: 'C',
        explanation: 'Dependent events. P(1st red) = 5/8, P(2nd red | 1st red) = 4/7. P(both) = (5/8)(4/7) = 20/56 = 5/14.',
        options: [
          { letter: 'A', text: '1/4' },
          { letter: 'B', text: '1/3' },
          { letter: 'C', text: '5/14' },
          { letter: 'D', text: '1/2' },
          { letter: 'E', text: '3/8' }
        ]
      },
      {
        question_text: 'A die is rolled. What is the probability of rolling a 3 OR a 5?',
        correct_answer: 'B',
        explanation: 'Mutually exclusive events. P(3 or 5) = P(3) + P(5) = 1/6 + 1/6 = 2/6 = 1/3.',
        options: [
          { letter: 'A', text: '1/6' },
          { letter: 'B', text: '1/3' },
          { letter: 'C', text: '1/2' },
          { letter: 'D', text: '2/3' },
          { letter: 'E', text: '5/6' }
        ]
      },
      {
        question_text: 'In a class, 60% are girls. 40% of girls play sports. What is P(girl AND plays sports)?',
        correct_answer: 'C',
        explanation: 'P(girl and sports) = P(girl) × P(sports|girl) = 0.60 × 0.40 = 0.24 = 24%.',
        options: [
          { letter: 'A', text: '20%' },
          { letter: 'B', text: '22%' },
          { letter: 'C', text: '24%' },
          { letter: 'D', text: '40%' },
          { letter: 'E', text: '100%' }
        ]
      },
      {
        question_text: 'P(A) = 0.5, P(B) = 0.3, P(A and B) = 0.1. What is P(A or B)?',
        correct_answer: 'E',
        explanation: 'Addition rule: P(A or B) = P(A) + P(B) − P(A and B) = 0.5 + 0.3 − 0.1 = 0.7.',
        options: [
          { letter: 'A', text: '0.4' },
          { letter: 'B', text: '0.5' },
          { letter: 'C', text: '0.6' },
          { letter: 'D', text: '0.65' },
          { letter: 'E', text: '0.7' }
        ]
      }
    ]
  },
  '6.4': {
    title: '🔒 Mastery Quiz: Permutations and Combinations',
    questions: [
      {
        question_text: 'How many ways can 5 people be arranged in a line?',
        correct_answer: 'D',
        explanation: 'Order matters. Number of permutations = 5! = 5 × 4 × 3 × 2 × 1 = 120.',
        options: [
          { letter: 'A', text: '20' },
          { letter: 'B', text: '25' },
          { letter: 'C', text: '60' },
          { letter: 'D', text: '120' },
          { letter: 'E', text: '720' }
        ]
      },
      {
        question_text: 'How many ways can you choose 3 books from a shelf of 8 books?',
        correct_answer: 'B',
        explanation: 'Order doesn\'t matter. C(8,3) = 8!/(3!5!) = (8×7×6)/(3×2×1) = 336/6 = 56.',
        options: [
          { letter: 'A', text: '24' },
          { letter: 'B', text: '56' },
          { letter: 'C', text: '120' },
          { letter: 'D', text: '336' },
          { letter: 'E', text: '512' }
        ]
      },
      {
        question_text: 'A restaurant has 3 appetizers, 5 entrees, and 2 desserts. How many different meal combinations are possible?',
        correct_answer: 'D',
        explanation: 'Fundamental counting principle: multiply choices. 3 × 5 × 2 = 30.',
        options: [
          { letter: 'A', text: '10' },
          { letter: 'B', text: '15' },
          { letter: 'C', text: '20' },
          { letter: 'D', text: '30' },
          { letter: 'E', text: '60' }
        ]
      },
      {
        question_text: 'Calculate P(6,2) - the number of permutations of 2 items from 6.',
        correct_answer: 'D',
        explanation: 'P(6,2) = 6!/(6-2)! = 6!/4! = 6 × 5 = 30.',
        options: [
          { letter: 'A', text: '12' },
          { letter: 'B', text: '15' },
          { letter: 'C', text: '20' },
          { letter: 'D', text: '30' },
          { letter: 'E', text: '36' }
        ]
      },
      {
        question_text: 'Calculate C(7,3) - the number of combinations of 3 items from 7.',
        correct_answer: 'E',
        explanation: 'C(7,3) = 7!/(3!4!) = (7×6×5)/(3×2×1) = 210/6 = 35.',
        options: [
          { letter: 'A', text: '21' },
          { letter: 'B', text: '28' },
          { letter: 'C', text: '30' },
          { letter: 'D', text: '42' },
          { letter: 'E', text: '35' }
        ]
      },
      {
        question_text: 'A password requires 4 different digits. How many passwords are possible?',
        correct_answer: 'C',
        explanation: 'Order matters, no repeats. P(10,4) = 10 × 9 × 8 × 7 = 5040.',
        options: [
          { letter: 'A', text: '1000' },
          { letter: 'B', text: '2520' },
          { letter: 'C', text: '5040' },
          { letter: 'D', text: '10000' },
          { letter: 'E', text: '40320' }
        ]
      }
    ]
  }
};

async function createAllQuizzes() {
  console.log('\n🎯 CREATING ALL MASTERY QUIZZES FOR CHAPTERS 5 & 6');
  console.log('='.repeat(80));

  for (const [lessonKey, quizData] of Object.entries(allQuizzes)) {
    console.log(`\n📝 Creating quiz for lesson ${lessonKey}: ${quizData.title}`);
    console.log('-'.repeat(80));

    // Get lesson ID
    const { data: lesson, error: lessonError } = await supabase
      .from('lesson_metadata')
      .select('id')
      .eq('lesson_key', lessonKey)
      .single();

    if (lessonError) {
      console.error(`  ❌ Lesson ${lessonKey} not found:`, lessonError.message);
      continue;
    }

    console.log(`  ✓ Lesson ID: ${lesson.id}`);

    // Check if quiz already exists
    const { data: existingQuiz } = await supabase
      .from('quizzes')
      .select('id')
      .eq('lesson_id', lesson.id)
      .eq('position', 11)
      .single();

    if (existingQuiz) {
      console.log(`  ⚠ Quiz already exists, skipping...`);
      continue;
    }

    // Create quiz
    const { data: quiz, error: quizError } = await supabase
      .from('quizzes')
      .insert({
        title: quizData.title,
        lesson_id: lesson.id,
        position: 11
      })
      .select('id')
      .single();

    if (quizError) {
      console.error(`  ❌ Error creating quiz:`, quizError.message);
      continue;
    }

    console.log(`  ✓ Quiz created with ID: ${quiz.id}`);

    // Add questions
    console.log(`  ✓ Adding ${quizData.questions.length} questions...`);
    for (let i = 0; i < quizData.questions.length; i++) {
      const q = quizData.questions[i];

      // Insert question
      const { data: question, error: questionError } = await supabase
        .from('quiz_questions')
        .insert({
          quiz_id: quiz.id,
          question_text: q.question_text,
          question_order: i
        })
        .select('id')
        .single();

      if (questionError) {
        console.error(`    ✗ Error adding question ${i + 1}:`, questionError.message);
        continue;
      }

      // Add options
      for (let j = 0; j < q.options.length; j++) {
        const opt = q.options[j];
        const isCorrect = opt.letter === q.correct_answer;

        await supabase
          .from('quiz_options')
          .insert({
            question_id: question.id,
            option_text: opt.text,
            is_correct: isCorrect,
            explanation: isCorrect ? q.explanation : null,
            option_order: j
          });
      }
    }

    console.log(`  ✅ Quiz completed with ${quizData.questions.length} questions`);
  }

  console.log('\n' + '='.repeat(80));
  console.log('✅ ALL QUIZZES CREATED SUCCESSFULLY!\n');
}

createAllQuizzes();
