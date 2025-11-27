require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const questions = [
  {
    pos: 1,
    diff: 'hard',
    text: 'What is the sum of the interior angles of a pentagon?',
    ch: [
      {letter: 'A', text: '540°'},
      {letter: 'B', text: '360°'},
      {letter: 'C', text: '720°'},
      {letter: 'D', text: '180°'},
          ],
    ans: 'A',
    sol: '**Use the formula (n-2) × 180°.**\n\n```\nFor a pentagon, n = 5\nSum = (5 - 2) × 180°\n    = 3 × 180°\n    = 540°\n```\n\n**Key insight:** The interior angle sum formula works for any polygon with n sides.'
  },
  {
    pos: 2,
    diff: 'hard',
    text: 'If log₂(x) = 5, what is x?',
    ch: [
      {letter: 'A', text: '32'},
      {letter: 'B', text: '10'},
      {letter: 'C', text: '25'},
      {letter: 'D', text: '5'},
          ],
    ans: 'A',
    sol: '**Convert logarithm to exponential form.**\n\n```\nlog₂(x) = 5\nmeans 2⁵ = x\n\nx = 32\n```\n\n**Key insight:** log_b(x) = y is equivalent to b^y = x.'
  },
  {
    pos: 3,
    diff: 'hard',
    text: 'What is the absolute value of -15?',
    ch: [
      {letter: 'A', text: '15'},
      {letter: 'B', text: '-15'},
      {letter: 'C', text: '0'},
      {letter: 'D', text: '30'},
          ],
    ans: 'A',
    sol: '**Absolute value is distance from zero.**\n\n```\n|-15| = 15\n```\n\n**Key insight:** Absolute value is always non-negative and removes the negative sign.'
  },
  {
    pos: 4,
    diff: 'hard',
    text: 'If f(x) = 3x - 7, what is f(5)?',
    ch: [
      {letter: 'A', text: '8'},
      {letter: 'B', text: '15'},
      {letter: 'C', text: '22'},
      {letter: 'D', text: '-2'},
          ],
    ans: 'A',
    sol: '**Substitute x = 5 into the function.**\n\n```\nf(5) = 3(5) - 7\n     = 15 - 7\n     = 8\n```\n\n**Key insight:** Function notation f(x) means replace every x with the given value.'
  },
  {
    pos: 5,
    diff: 'hard',
    text: 'What is the least common multiple (LCM) of 12 and 18?',
    ch: [
      {letter: 'A', text: '36'},
      {letter: 'B', text: '6'},
      {letter: 'C', text: '72'},
      {letter: 'D', text: '216'},
          ],
    ans: 'A',
    sol: '**Find multiples or use prime factorization.**\n\nPrime factorization method:\n```\n12 = 2² × 3\n18 = 2 × 3²\n\nLCM = 2² × 3² = 4 × 9 = 36\n```\n\nListing multiples method:\n```\n12: 12, 24, 36, 48, ...\n18: 18, 36, 54, ...\n\nSmallest common = 36\n```\n\n**Key insight:** LCM uses the highest power of each prime factor.'
  },
  {
    pos: 6,
    diff: 'hard',
    text: 'What is the greatest common factor (GCF) of 48 and 72?',
    ch: [
      {letter: 'A', text: '24'},
      {letter: 'B', text: '12'},
      {letter: 'C', text: '8'},
      {letter: 'D', text: '144'},
          ],
    ans: 'A',
    sol: '**Use prime factorization.**\n\n```\n48 = 2⁴ × 3\n72 = 2³ × 3²\n\nGCF = 2³ × 3 = 8 × 3 = 24\n```\n\n**Key insight:** GCF uses the lowest power of each common prime factor.'
  },
  {
    pos: 7,
    diff: 'hard',
    text: 'Simplify: √50',
    ch: [
      {letter: 'A', text: '5√2'},
      {letter: 'B', text: '2√5'},
      {letter: 'C', text: '√50'},
      {letter: 'D', text: '25'},
          ],
    ans: 'A',
    sol: '**Factor out perfect squares.**\n\n```\n√50 = √(25 × 2)\n    = √25 × √2\n    = 5√2\n```\n\n**Key insight:** Look for the largest perfect square factor inside the radical.'
  },
  {
    pos: 8,
    diff: 'hard',
    text: 'If 2ˣ = 64, what is x?',
    ch: [
      {letter: 'A', text: '6'},
      {letter: 'B', text: '32'},
      {letter: 'C', text: '8'},
      {letter: 'D', text: '128'},
          ],
    ans: 'A',
    sol: '**Express 64 as a power of 2.**\n\n```\n64 = 2⁶\n\nSo 2ˣ = 2⁶\nTherefore x = 6\n```\n\n**Key insight:** When bases are equal, exponents must be equal.'
  },
  {
    pos: 9,
    diff: 'hard',
    text: 'What is the value of 4!?',
    ch: [
      {letter: 'A', text: '24'},
      {letter: 'B', text: '16'},
      {letter: 'C', text: '10'},
      {letter: 'D', text: '4'},
          ],
    ans: 'A',
    sol: '**Factorial means multiply all positive integers up to that number.**\n\n```\n4! = 4 × 3 × 2 × 1\n   = 24\n```\n\n**Key insight:** n! = n × (n-1) × (n-2) × ... × 2 × 1.'
  },
  {
    pos: 10,
    diff: 'hard',
    text: 'Simplify: (x³)⁴',
    ch: [
      {letter: 'A', text: 'x¹²'},
      {letter: 'B', text: 'x⁷'},
      {letter: 'C', text: '4x³'},
      {letter: 'D', text: 'x⁶⁴'},
          ],
    ans: 'A',
    sol: '**Use the power of a power rule.**\n\n```\n(x³)⁴ = x³ᐧ⁴ = x¹²\n```\n\n**Key insight:** When raising a power to a power, multiply the exponents.'
  },
  {
    pos: 11,
    diff: 'hard',
    text: 'What is the median of the set {7, 3, 9, 1, 5}?',
    ch: [
      {letter: 'A', text: '5'},
      {letter: 'B', text: '7'},
      {letter: 'C', text: '3'},
      {letter: 'D', text: '9'},
          ],
    ans: 'A',
    sol: '**Order the numbers and find the middle value.**\n\n```\nOrdered: {1, 3, 5, 7, 9}\n\nMiddle value = 5\n```\n\n**Key insight:** For an odd number of values, the median is the middle value.'
  },
  {
    pos: 12,
    diff: 'hard',
    text: 'If a sequence follows the pattern: 2, 6, 18, 54, ..., what is the next term?',
    ch: [
      {letter: 'A', text: '162'},
      {letter: 'B', text: '108'},
      {letter: 'C', text: '58'},
      {letter: 'D', text: '216'},
          ],
    ans: 'A',
    sol: '**Identify the pattern.**\n\n```\n2 × 3 = 6\n6 × 3 = 18\n18 × 3 = 54\n54 × 3 = 162\n```\n\nThis is a geometric sequence with ratio 3.\n\n**Key insight:** Each term is 3 times the previous term.'
  },
  {
    pos: 13,
    diff: 'hard',
    text: 'What is the range of the set {12, 8, 15, 3, 10}?',
    ch: [
      {letter: 'A', text: '12'},
      {letter: 'B', text: '15'},
      {letter: 'C', text: '5'},
      {letter: 'D', text: '9.6'},
          ],
    ans: 'A',
    sol: '**Range = maximum - minimum.**\n\n```\nMaximum = 15\nMinimum = 3\n\nRange = 15 - 3 = 12\n```\n\n**Key insight:** Range measures the spread of data from lowest to highest.'
  },
  {
    pos: 14,
    diff: 'hard',
    text: 'Simplify: x⁵ / x²',
    ch: [
      {letter: 'A', text: 'x³'},
      {letter: 'B', text: 'x⁷'},
      {letter: 'C', text: 'x¹⁰'},
      {letter: 'D', text: 'x²·⁵'},
          ],
    ans: 'A',
    sol: '**Use the quotient rule for exponents.**\n\n```\nx⁵ / x² = x⁵⁻² = x³\n```\n\n**Key insight:** When dividing like bases, subtract the exponents.'
  },
  {
    pos: 15,
    diff: 'hard',
    text: 'What is 15% of 200?',
    ch: [
      {letter: 'A', text: '30'},
      {letter: 'B', text: '215'},
      {letter: 'C', text: '3'},
      {letter: 'D', text: '15'},
          ],
    ans: 'A',
    sol: '**Convert percentage to decimal and multiply.**\n\n```\n15% of 200 = 0.15 × 200\n            = 30\n```\n\n**Key insight:** "of" means multiply in percentage problems.'
  },
  {
    pos: 16,
    diff: 'hard',
    text: 'Solve for x: |x - 3| = 7',
    ch: [
      {letter: 'A', text: 'x = 10 or x = -4'},
      {letter: 'B', text: 'x = 4 or x = -10'},
      {letter: 'C', text: 'x = 10 only'},
      {letter: 'D', text: 'x = -4 only'},
          ],
    ans: 'A',
    sol: '**Absolute value equations have two solutions.**\n\n```\nCase 1: x - 3 = 7\n        x = 10\n\nCase 2: x - 3 = -7\n        x = -4\n```\n\n**Key insight:** |A| = B means A = B or A = -B (when B ≥ 0).'
  },
  {
    pos: 17,
    diff: 'hard',
    text: 'What is the mode of the set {4, 7, 4, 2, 9, 4, 5}?',
    ch: [
      {letter: 'A', text: '4'},
      {letter: 'B', text: '5'},
      {letter: 'C', text: '7'},
      {letter: 'D', text: '2'},
          ],
    ans: 'A',
    sol: '**Mode is the value that appears most frequently.**\n\n```\n4 appears 3 times\n7 appears 1 time\n2 appears 1 time\n9 appears 1 time\n5 appears 1 time\n\nMode = 4\n```\n\n**Key insight:** Count the frequency of each value to find the mode.'
  },
  {
    pos: 18,
    diff: 'hard',
    text: 'Simplify: 3x + 5x - 2x',
    ch: [
      {letter: 'A', text: '6x'},
      {letter: 'B', text: '10x'},
      {letter: 'C', text: '0'},
      {letter: 'D', text: '8x'},
          ],
    ans: 'A',
    sol: '**Combine like terms.**\n\n```\n3x + 5x - 2x = (3 + 5 - 2)x\n             = 6x\n```\n\n**Key insight:** Add and subtract the coefficients of like terms.'
  },
  {
    pos: 19,
    diff: 'hard',
    text: 'What is the reciprocal of 3/4?',
    ch: [
      {letter: 'A', text: '4/3'},
      {letter: 'B', text: '3/4'},
      {letter: 'C', text: '-3/4'},
      {letter: 'D', text: '12'},
          ],
    ans: 'A',
    sol: '**Reciprocal means flip the fraction.**\n\n```\nReciprocal of 3/4 = 4/3\n```\n\nVerify: (3/4) × (4/3) = 1 ✓\n\n**Key insight:** The reciprocal of a/b is b/a.'
  },
  {
    pos: 20,
    diff: 'hard',
    text: 'If n is an even number, which expression is always odd?',
    ch: [
      {letter: 'A', text: 'n + 1'},
      {letter: 'B', text: '2n'},
      {letter: 'C', text: 'n²'},
      {letter: 'D', text: 'n/2'},
          ],
    ans: 'A',
    sol: '**Check each option.**\n\n```\nn is even\n\nA. n + 1 = even + 1 = odd ✓\nB. 2n = 2(even) = even\nC. n² = (even)² = even\nD. n/2 = even/2 = could be even or odd\nE. 4n = 4(even) = even\n```\n\n**Key insight:** Adding 1 to an even number always gives an odd number.'
  },
  {
    pos: 21,
    diff: 'hard',
    text: 'Simplify: (2x)(3x²)',
    ch: [
      {letter: 'A', text: '6x³'},
      {letter: 'B', text: '5x³'},
      {letter: 'C', text: '6x²'},
      {letter: 'D', text: '2x⁶'},
          ],
    ans: 'A',
    sol: '**Multiply coefficients and add exponents.**\n\n```\n(2x)(3x²) = (2 × 3)(x¹ × x²)\n          = 6x³\n```\n\n**Key insight:** When multiplying like bases, add the exponents.'
  },
  {
    pos: 22,
    diff: 'hard',
    text: 'What is the sum of the first 5 positive integers?',
    ch: [
      {letter: 'A', text: '15'},
      {letter: 'B', text: '10'},
      {letter: 'C', text: '20'},
      {letter: 'D', text: '5'},
          ],
    ans: 'A',
    sol: '**Add them up or use the formula.**\n\nDirect addition:\n```\n1 + 2 + 3 + 4 + 5 = 15\n```\n\nUsing formula:\n```\nSum = n(n+1)/2 = 5(6)/2 = 15\n```\n\n**Key insight:** The sum of first n positive integers is n(n+1)/2.'
  },
  {
    pos: 23,
    diff: 'hard',
    text: 'If x² = 81, what are all possible values of x?',
    ch: [
      {letter: 'A', text: 'x = 9 or x = -9'},
      {letter: 'B', text: 'x = 9 only'},
      {letter: 'C', text: 'x = -9 only'},
      {letter: 'D', text: 'x = 40.5'},
          ],
    ans: 'A',
    sol: '**Take the square root of both sides.**\n\n```\nx² = 81\nx = ±√81\nx = ±9\n\nSo x = 9 or x = -9\n```\n\n**Key insight:** Squaring loses sign information, so always consider both positive and negative roots.'
  },
  {
    pos: 24,
    diff: 'hard',
    text: 'Evaluate: 2³ + 3²',
    ch: [
      {letter: 'A', text: '17'},
      {letter: 'B', text: '13'},
      {letter: 'C', text: '35'},
      {letter: 'D', text: '5⁵'},
          ],
    ans: 'A',
    sol: '**Calculate each exponent first, then add.**\n\n```\n2³ = 8\n3² = 9\n\n2³ + 3² = 8 + 9 = 17\n```\n\n**Key insight:** Exponents are calculated before addition (order of operations).'
  },
  {
    pos: 25,
    diff: 'hard',
    text: 'What is the value of π to two decimal places?',
    ch: [
      {letter: 'A', text: '3.14'},
      {letter: 'B', text: '3.15'},
      {letter: 'C', text: '3.142'},
      {letter: 'D', text: '22/7'},
          ],
    ans: 'A',
    sol: '**π ≈ 3.14159...**\n\nRounded to two decimal places: 3.14\n\n**Key insight:** π is approximately 3.14, or sometimes approximated as 22/7.'
  },
  {
    pos: 26,
    diff: 'hard',
    text: 'Simplify: √(9x⁴)',
    ch: [
      {letter: 'A', text: '3x²'},
      {letter: 'B', text: '9x²'},
      {letter: 'C', text: '3x⁴'},
      {letter: 'D', text: 'x²√9'},
          ],
    ans: 'A',
    sol: '**Take the square root of each factor.**\n\n```\n√(9x⁴) = √9 × √(x⁴)\n        = 3 × x²\n        = 3x²\n```\n\n**Key insight:** √(ab) = √a × √b, and √(x^n) = x^(n/2).'
  },
  {
    pos: 27,
    diff: 'hard',
    text: 'If 3x = 21, what is x?',
    ch: [
      {letter: 'A', text: '7'},
      {letter: 'B', text: '24'},
      {letter: 'C', text: '18'},
      {letter: 'D', text: '63'},
          ],
    ans: 'A',
    sol: '**Divide both sides by 3.**\n\n```\n3x = 21\nx = 21/3\nx = 7\n```\n\n**Key insight:** To isolate x, perform the inverse operation on both sides.'
  },
  {
    pos: 28,
    diff: 'hard',
    text: 'What is the probability of rolling a 4 on a fair six-sided die?',
    ch: [
      {letter: 'A', text: '1/6'},
      {letter: 'B', text: '1/4'},
      {letter: 'C', text: '4/6'},
      {letter: 'D', text: '1/2'},
          ],
    ans: 'A',
    sol: '**Probability = favorable outcomes / total outcomes.**\n\n```\nFavorable outcomes (rolling a 4): 1\nTotal possible outcomes: 6\n\nP(4) = 1/6\n```\n\n**Key insight:** Each face of a fair die has equal probability of 1/6.'
  },
  {
    pos: 29,
    diff: 'hard',
    text: 'Simplify: (x + 3) - (x - 2)',
    ch: [
      {letter: 'A', text: '5'},
      {letter: 'B', text: '2x + 1'},
      {letter: 'C', text: '1'},
      {letter: 'D', text: 'x + 5'},
          ],
    ans: 'A',
    sol: '**Distribute the negative and combine like terms.**\n\n```\n(x + 3) - (x - 2)\n= x + 3 - x + 2\n= (x - x) + (3 + 2)\n= 0 + 5\n= 5\n```\n\n**Key insight:** Subtracting (x - 2) means adding its opposite: -(x - 2) = -x + 2.'
  },
  {
    pos: 30,
    diff: 'hard',
    text: 'What is the distance between points (2, 5) and (2, 11) on a coordinate plane?',
    ch: [
      {letter: 'A', text: '6'},
      {letter: 'B', text: '0'},
      {letter: 'C', text: '16'},
      {letter: 'D', text: '√36'},
          ],
    ans: 'A',
    sol: '**Use the distance formula or note the vertical line.**\n\nSince x-coordinates are the same, this is a vertical line:\n```\nDistance = |11 - 5| = 6\n```\n\nUsing distance formula:\n```\nd = √[(2-2)² + (11-5)²]\n  = √[0 + 36]\n  = 6\n```\n\n**Key insight:** For points with the same x-coordinate, distance is just the difference in y-coordinates.'
  },
  {
    pos: 31,
    diff: 'hard',
    text: 'Simplify: 5(2x + 3)',
    ch: [
      {letter: 'A', text: '10x + 15'},
      {letter: 'B', text: '10x + 3'},
      {letter: 'C', text: '7x + 8'},
      {letter: 'D', text: '2x + 15'},
          ],
    ans: 'A',
    sol: '**Use the distributive property.**\n\n```\n5(2x + 3) = 5(2x) + 5(3)\n          = 10x + 15\n```\n\n**Key insight:** Multiply the outside term by each term inside the parentheses.'
  },
  {
    pos: 32,
    diff: 'hard',
    text: 'What is the value of (-2)³?',
    ch: [
      {letter: 'A', text: '-8'},
      {letter: 'B', text: '8'},
      {letter: 'C', text: '-6'},
      {letter: 'D', text: '6'},
          ],
    ans: 'A',
    sol: '**Cube the number (multiply it by itself three times).**\n\n```\n(-2)³ = (-2) × (-2) × (-2)\n      = 4 × (-2)\n      = -8\n```\n\n**Key insight:** An odd power of a negative number is negative.'
  },
  {
    pos: 33,
    diff: 'hard',
    text: 'How many degrees are in a straight angle?',
    ch: [
      {letter: 'A', text: '180°'},
      {letter: 'B', text: '90°'},
      {letter: 'C', text: '360°'},
      {letter: 'D', text: '270°'},
          ],
    ans: 'A',
    sol: '**A straight angle forms a straight line.**\n\n```\nStraight angle = 180°\n```\n\n**Key insight:** A straight angle is exactly half of a full rotation (360°).'
  },
  {
    pos: 34,
    diff: 'hard',
    text: 'If y = 2x + 1 and x = 4, what is y?',
    ch: [
      {letter: 'A', text: '9'},
      {letter: 'B', text: '8'},
      {letter: 'C', text: '7'},
      {letter: 'D', text: '5'},
          ],
    ans: 'A',
    sol: '**Substitute x = 4 into the equation.**\n\n```\ny = 2x + 1\ny = 2(4) + 1\ny = 8 + 1\ny = 9\n```\n\n**Key insight:** Replace the variable with its given value and simplify.'
  },
  {
    pos: 35,
    diff: 'hard',
    text: 'What is the area of a triangle with base 10 cm and height 8 cm?',
    ch: [
      {letter: 'A', text: '40 cm²'},
      {letter: 'B', text: '80 cm²'},
      {letter: 'C', text: '18 cm²'},
      {letter: 'D', text: '20 cm²'},
          ],
    ans: 'A',
    sol: '**Use the triangle area formula.**\n\n```\nArea = (1/2) × base × height\n     = (1/2) × 10 × 8\n     = (1/2) × 80\n     = 40 cm²\n```\n\n**Key insight:** Triangle area is half the base times height.'
  },
  {
    pos: 36,
    diff: 'hard',
    text: 'Simplify: x⁰ (where x ≠ 0)',
    ch: [
      {letter: 'A', text: '1'},
      {letter: 'B', text: '0'},
      {letter: 'C', text: 'x'},
      {letter: 'D', text: 'undefined'},
          ],
    ans: 'A',
    sol: '**Any non-zero number to the power of 0 equals 1.**\n\n```\nx⁰ = 1 (for x ≠ 0)\n```\n\n**Key insight:** This is a fundamental exponent rule: a⁰ = 1 for any a ≠ 0.'
  },
  {
    pos: 37,
    diff: 'hard',
    text: 'What is 0.25 as a fraction in simplest form?',
    ch: [
      {letter: 'A', text: '1/4'},
      {letter: 'B', text: '2/5'},
      {letter: 'C', text: '25/100'},
      {letter: 'D', text: '1/25'},
          ],
    ans: 'A',
    sol: '**Convert decimal to fraction and simplify.**\n\n```\n0.25 = 25/100\n     = 25÷25 / 100÷25\n     = 1/4\n```\n\n**Key insight:** 0.25 = 25 hundredths = 1 fourth.'
  },
  {
    pos: 38,
    diff: 'hard',
    text: 'What is the perimeter of an equilateral triangle with side length 7 cm?',
    ch: [
      {letter: 'A', text: '21 cm'},
      {letter: 'B', text: '14 cm'},
      {letter: 'C', text: '7 cm'},
      {letter: 'D', text: '49 cm'},
          ],
    ans: 'A',
    sol: '**Equilateral triangle has three equal sides.**\n\n```\nPerimeter = 3 × side length\n          = 3 × 7\n          = 21 cm\n```\n\n**Key insight:** In an equilateral triangle, all three sides are equal.'
  },
  {
    pos: 39,
    diff: 'hard',
    text: 'If a:b = 2:3 and b:c = 4:5, what is a:c?',
    ch: [
      {letter: 'A', text: '8:15'},
      {letter: 'B', text: '2:5'},
      {letter: 'C', text: '6:8'},
      {letter: 'D', text: '8:12'},
          ],
    ans: 'A',
    sol: '**Find a common value for b in both ratios.**\n\n```\na:b = 2:3  → multiply by 4 → a:b = 8:12\nb:c = 4:5  → multiply by 3 → b:c = 12:15\n\nSince b = 12 in both:\na:b:c = 8:12:15\n\nTherefore a:c = 8:15\n```\n\n**Key insight:** Scale the ratios so the common term (b) has the same value.'
  },
  {
    pos: 40,
    diff: 'hard',
    text: 'Simplify: -(-5)',
    ch: [
      {letter: 'A', text: '5'},
      {letter: 'B', text: '-5'},
      {letter: 'C', text: '0'},
      {letter: 'D', text: '10'},
          ],
    ans: 'A',
    sol: '**Double negative becomes positive.**\n\n```\n-(-5) = 5\n```\n\n**Key insight:** The opposite of the opposite is the original number.'
  },
  {
    pos: 41,
    diff: 'hard',
    text: 'What is the sum of angles in a quadrilateral?',
    ch: [
      {letter: 'A', text: '360°'},
      {letter: 'B', text: '180°'},
      {letter: 'C', text: '540°'},
      {letter: 'D', text: '720°'},
          ],
    ans: 'A',
    sol: '**Use the formula (n-2) × 180° for n sides.**\n\n```\nFor quadrilateral, n = 4\nSum = (4 - 2) × 180°\n    = 2 × 180°\n    = 360°\n```\n\n**Key insight:** A quadrilateral can be divided into 2 triangles, each with 180°.'
  },
  {
    pos: 42,
    diff: 'hard',
    text: 'If log₁₀(100) = x, what is x?',
    ch: [
      {letter: 'A', text: '2'},
      {letter: 'B', text: '10'},
      {letter: 'C', text: '100'},
      {letter: 'D', text: '1'},
          ],
    ans: 'A',
    sol: '**Convert to exponential form.**\n\n```\nlog₁₀(100) = x\nmeans 10ˣ = 100\n\nSince 10² = 100:\nx = 2\n```\n\n**Key insight:** log₁₀ asks "what power of 10 gives this number?"'
  },
  {
    pos: 43,
    diff: 'hard',
    text: 'Simplify: 2(x + 4) - 3x',
    ch: [
      {letter: 'A', text: '-x + 8'},
      {letter: 'B', text: 'x + 8'},
      {letter: 'C', text: '-x + 4'},
      {letter: 'D', text: '5x + 8'},
          ],
    ans: 'A',
    sol: '**Distribute, then combine like terms.**\n\n```\n2(x + 4) - 3x\n= 2x + 8 - 3x\n= (2x - 3x) + 8\n= -x + 8\n```\n\n**Key insight:** Distribute first, then combine like terms.'
  },
  {
    pos: 44,
    diff: 'hard',
    text: 'What is 3/5 as a decimal?',
    ch: [
      {letter: 'A', text: '0.6'},
      {letter: 'B', text: '0.3'},
      {letter: 'C', text: '0.5'},
      {letter: 'D', text: '1.67'},
          ],
    ans: 'A',
    sol: '**Divide numerator by denominator.**\n\n```\n3 ÷ 5 = 0.6\n```\n\n**Key insight:** To convert a fraction to decimal, divide top by bottom.'
  },
  {
    pos: 45,
    diff: 'hard',
    text: 'If a right triangle has legs of length 3 and 4, what is the length of the hypotenuse?',
    ch: [
      {letter: 'A', text: '5'},
      {letter: 'B', text: '7'},
      {letter: 'C', text: '√7'},
      {letter: 'D', text: '12'},
          ],
    ans: 'A',
    sol: '**Use the Pythagorean theorem.**\n\n```\nc² = a² + b²\nc² = 3² + 4²\nc² = 9 + 16\nc² = 25\nc = 5\n```\n\n**Key insight:** This is the classic 3-4-5 Pythagorean triple.'
  },
  {
    pos: 46,
    diff: 'hard',
    text: 'Simplify: (a²b³)(ab)',
    ch: [
      {letter: 'A', text: 'a³b⁴'},
      {letter: 'B', text: 'a²b³'},
      {letter: 'C', text: 'a³b³'},
      {letter: 'D', text: 'a²b⁴'},
          ],
    ans: 'A',
    sol: '**Multiply by adding exponents of like bases.**\n\n```\n(a²b³)(ab) = a²⁺¹ b³⁺¹\n           = a³b⁴\n```\n\n**Key insight:** When multiplying powers with the same base, add the exponents.'
  },
  {
    pos: 47,
    diff: 'hard',
    text: 'What is the complement of a 35° angle?',
    ch: [
      {letter: 'A', text: '55°'},
      {letter: 'B', text: '145°'},
      {letter: 'C', text: '325°'},
      {letter: 'D', text: '65°'},
          ],
    ans: 'A',
    sol: '**Complementary angles sum to 90°.**\n\n```\nComplement = 90° - 35° = 55°\n```\n\n**Key insight:** Two angles are complementary if they add up to 90°.'
  },
  {
    pos: 48,
    diff: 'hard',
    text: 'Evaluate: √36 + √64',
    ch: [
      {letter: 'A', text: '14'},
      {letter: 'B', text: '10'},
      {letter: 'C', text: '100'},
      {letter: 'D', text: '√100'},
          ],
    ans: 'A',
    sol: '**Simplify each square root separately, then add.**\n\n```\n√36 = 6\n√64 = 8\n\n√36 + √64 = 6 + 8 = 14\n```\n\n**Key insight:** √a + √b ≠ √(a+b). Simplify each root before adding.'
  },
  {
    pos: 49,
    diff: 'hard',
    text: 'What is the supplement of a 110° angle?',
    ch: [
      {letter: 'A', text: '70°'},
      {letter: 'B', text: '20°'},
      {letter: 'C', text: '250°'},
      {letter: 'D', text: '80°'},
          ],
    ans: 'A',
    sol: '**Supplementary angles sum to 180°.**\n\n```\nSupplement = 180° - 110° = 70°\n```\n\n**Key insight:** Two angles are supplementary if they add up to 180°.'
  },
  {
    pos: 50,
    diff: 'hard',
    text: 'Simplify: (x + 5)(x - 5)',
    ch: [
      {letter: 'A', text: 'x² - 25'},
      {letter: 'B', text: 'x² + 25'},
      {letter: 'C', text: 'x² - 10x + 25'},
      {letter: 'D', text: '2x'},
          ],
    ans: 'A',
    sol: '**Use the difference of squares pattern.**\n\n```\n(x + 5)(x - 5) = x² - 5²\n               = x² - 25\n```\n\nOr using FOIL:\n```\n= x·x + x·(-5) + 5·x + 5·(-5)\n= x² - 5x + 5x - 25\n= x² - 25\n```\n\n**Key insight:** (a + b)(a - b) = a² - b² is the difference of squares formula.'
  }
];

async function insertQuestions() {
  console.log('Finding lesson...');

  const { data: lesson, error: lessonError } = await supabase
    .from('lessons')
    .select('id')
    .eq('lesson_key', 'miscellaneous-topics')
    .single();

  if (lessonError) {
    console.error('Error finding lesson miscellaneous-topics:', lessonError);
    return;
  }

  console.log(`Found lesson miscellaneous-topics with ID: ${lesson.id}\n`);

  let successCount = 0;
  let errorCount = 0;

  for (const q of questions) {
    const questionData = {
      lesson_id: lesson.id,
      subject: 'math',
      position: q.pos,
      difficulty: q.diff,
      title: `Miscellaneous Topics Question ${q.pos}`,
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
