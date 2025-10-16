import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const lessons = [
  { file: 'LESSON_5_1_NUMBER_THEORY.html', takeaways: [
    'Number classifications: Natural numbers (1, 2, 3, ...), whole numbers (0, 1, 2, ...), integers (..., −1, 0, 1, ...), rational (can be fraction), irrational (cannot be fraction)',
    'Prime numbers have exactly two factors: 1 and themselves. 2 is the only even prime. 1 is neither prime nor composite',
    'GCD uses lowest powers, LCM uses highest powers: In prime factorization, GCD takes minimum exponents, LCM takes maximum exponents',
    'GCD × LCM = a × b: This relationship helps find missing values quickly when three of the four values are known',
    'Divisibility rules save time: Memorize rules for 2, 3, 4, 5, 6, 9, and 10 to quickly check divisibility without division',
    'Even/odd properties: Even + Even = Even, Odd + Odd = Even, Even × Anything = Even, Odd × Odd = Odd'
  ]},
  { file: 'LESSON_5_2_PERCENTAGES.html', takeaways: [
    'Percent means "per hundred": 25% = 25/100 = 0.25. Converting between forms is essential',
    'Percent change formula: ((New − Old) / Old) × 100%. Positive for increase, negative for decrease',
    'Successive changes multiply, they don\'t add: A 20% increase then 20% decrease ≠ 0% change',
    'When calculating percent of a number, convert to decimal first: 15% of 80 = 0.15 × 80 = 12',
    'Watch for the base: "20% more than 50" and "20% of 50" give different answers (60 vs 10)',
    'Percent problems can often be solved by setting up proportions: part/whole = percent/100'
  ]},
  { file: 'LESSON_5_3_RATIOS_PROPORTIONS.html', takeaways: [
    'Ratios compare quantities: 3:4 means for every 3 of first, there are 4 of second',
    'Cross-multiply to solve proportions: If a/b = c/d, then ad = bc',
    'Direct variation: y = kx (as x increases, y increases). Inverse: y = k/x (as x increases, y decreases)',
    'Similar figures have proportional sides: Set up ratio of corresponding sides to find missing lengths',
    'Mixture problems use weighted averages: Total = (amount₁ × concentration₁) + (amount₂ × concentration₂)',
    'Rate problems: Distance = Rate × Time. Set up table with three columns for organized solving'
  ]},
  { file: 'LESSON_5_4_UNIT_CONVERSION.html', takeaways: [
    'Conversion factors are fractions that equal 1: 12 inches/1 foot = 1, so multiplying doesn\'t change value',
    'Set up conversions so units cancel: Multiply by fractions with desired unit on top, unwanted unit on bottom',
    'Common US conversions: 12 in = 1 ft, 3 ft = 1 yd, 5280 ft = 1 mile, 16 oz = 1 lb, 2000 lb = 1 ton',
    'Common metric conversions: 1000 m = 1 km, 100 cm = 1 m, 1000 mg = 1 g, 1000 g = 1 kg',
    'For area/volume conversions, conversion factor is squared/cubed: 1 ft² = 144 in², 1 ft³ = 1728 in³',
    'Dimensional analysis: Write out all units and cancel step-by-step to avoid errors'
  ]},
  { file: 'LESSON_5_5_SCIENTIFIC_NOTATION.html', takeaways: [
    'Scientific notation: a × 10ⁿ where 1 ≤ |a| < 10 and n is an integer',
    'Move decimal right for negative exponents, left for positive: 3.5 × 10⁻² = 0.035',
    'To multiply: multiply coefficients, add exponents. (2 × 10³)(3 × 10⁴) = 6 × 10⁷',
    'To divide: divide coefficients, subtract exponents. (6 × 10⁸) ÷ (2 × 10³) = 3 × 10⁵',
    'Adjust coefficient if result isn\'t between 1 and 10: 15 × 10⁴ = 1.5 × 10⁵',
    'Scientific notation makes very large and very small numbers easier to work with'
  ]},
  { file: 'LESSON_5_6_REPEATING_PATTERNS.html', takeaways: [
    'Identify cycle length: Count how many terms until pattern repeats',
    'Use modular arithmetic: Position mod cycle_length tells where in pattern',
    'If remainder is 0, you\'re at the last position of the cycle',
    'Powers cycle predictably: Units digits of powers often repeat in cycles of 4 or less',
    'Remainders when dividing by small numbers follow patterns you can exploit',
    'Day-of-week problems: 7-day cycle, use remainder when dividing by 7'
  ]},
  { file: 'LESSON_6_1_MEAN_MEDIAN_MODE.html', takeaways: [
    'Mean = sum of all values ÷ number of values. Affected by outliers',
    'Median = middle value when data is ordered. Not affected by outliers',
    'Mode = most frequent value. A dataset can have no mode, one mode, or multiple modes',
    'If dataset has even number of values, median is average of two middle values',
    'Weighted average: Each value contributes proportionally to its weight',
    'To find missing value when mean is given: Set up equation using sum formula'
  ]},
  { file: 'LESSON_6_2_ADVANCED_STATISTICS.html', takeaways: [
    'Range = maximum − minimum. Simple measure of spread',
    'Quartiles divide ordered data into four equal parts: Q1 (25th percentile), Q2 (median, 50th), Q3 (75th)',
    'IQR = Q3 − Q1. Measures spread of middle 50% of data, resistant to outliers',
    'Outliers are values more than 1.5 × IQR below Q1 or above Q3',
    'Standard deviation measures average distance from mean. Larger SD = more spread out',
    'Box plots show five-number summary: minimum, Q1, median, Q3, maximum'
  ]},
  { file: 'LESSON_6_3_PROBABILITY.html', takeaways: [
    'Probability = (number of favorable outcomes) / (total number of outcomes). Always between 0 and 1',
    'Independent events: Outcome of one doesn\'t affect the other. Multiply probabilities',
    'Dependent events: Outcome of one affects the other. Adjust denominator for second event',
    'Addition rule for mutually exclusive events: P(A or B) = P(A) + P(B)',
    'Multiplication rule: P(A and B) = P(A) × P(B|A) for dependent events',
    'Conditional probability P(A|B) = P(A and B) / P(B). Probability of A given B occurred'
  ]},
  { file: 'LESSON_6_4_PERMUTATIONS_COMBINATIONS.html', takeaways: [
    'Fundamental Counting Principle: If task 1 has m ways and task 2 has n ways, total = m × n',
    'Permutations: Order matters. P(n,r) = n!/(n−r)!. Arranging r items from n items',
    'Combinations: Order doesn\'t matter. C(n,r) = n!/[r!(n−r)!]. Selecting r items from n items',
    'Factorial: n! = n × (n−1) × (n−2) × ... × 1. Note: 0! = 1',
    'If problem asks "arrange" or "order", use permutations. If "select" or "choose", use combinations',
    'For problems with restrictions, calculate unrestricted then subtract forbidden cases'
  ]}
];

function generateKeyTakeawaysHTML(takeaways) {
  const items = takeaways.map(takeaway =>
    `  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>${takeaway}
  </li>`
  ).join('\n');

  return `<h3 style="color: #2e7d32; font-size: 1.4rem; font-weight: 700; margin: 3rem 0 1.5rem 0;">Key Takeaways</h3>

<ul style="list-style: none; padding: 0; margin: 0;">
${items}
</ul>`;
}

for (const lesson of lessons) {
  const filePath = path.join(__dirname, '..', 'docs', lesson.file);
  console.log(`Processing ${lesson.file}...`);

  let content = fs.readFileSync(filePath, 'utf8');

  // Find and replace the Key Takeaways section
  // Pattern: From the blue gradient div opening to its closing div
  const keyTakeawaysPattern = /<div style="background: linear-gradient\(135deg, #dbeafe[\s\S]*?<h2 style[^>]*>[\s\S]*?Key Takeaways[\s\S]*?<\/h2>[\s\S]*?<\/div>[\s\S]*?<\/div>[\s\S]*?<\/div>[\s\S]*?<\/div>[\s\S]*?<\/div>[\s\S]*?<\/div>[\s\S]*?<\/div>/;

  // Alternative pattern: Try to match the entire Key Takeaways section more carefully
  const startPattern = /<div style="background: linear-gradient\(135deg, #dbeafe 0%, #bfdbfe 100%\)/;
  const startMatch = content.search(startPattern);

  if (startMatch !== -1) {
    // Find the matching closing div
    let depth = 0;
    let i = startMatch;
    let inTag = false;
    let tagContent = '';

    while (i < content.length) {
      const char = content[i];

      if (char === '<') {
        inTag = true;
        tagContent = '<';
      } else if (char === '>' && inTag) {
        inTag = false;
        tagContent += '>';

        if (tagContent.startsWith('<div')) {
          depth++;
        } else if (tagContent === '</div>') {
          depth--;
          if (depth === 0) {
            // Found the closing div
            const endIndex = i + 1;
            const oldSection = content.substring(startMatch, endIndex);
            const newSection = generateKeyTakeawaysHTML(lesson.takeaways);

            content = content.substring(0, startMatch) + newSection + content.substring(endIndex);
            console.log(`  ✓ Replaced Key Takeaways section`);
            break;
          }
        }

        tagContent = '';
      } else if (inTag) {
        tagContent += char;
      }

      i++;
    }
  } else {
    console.log(`  ✗ Could not find Key Takeaways section`);
  }

  // Write the updated content
  fs.writeFileSync(filePath, content, 'utf8');
}

console.log('\n✓ All Key Takeaways sections have been updated!');
