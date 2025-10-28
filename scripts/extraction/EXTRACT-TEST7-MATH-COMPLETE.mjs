#!/usr/bin/env node
import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '../../.env') });

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

const TEST_NUMBER = 7;

const answerKey = ['A','B','D','C','B','E','B','C','A','B','D','D','C','A','E','B','D','E','B','C','B','A','D','D','B','C','A','B','A','D','B','E','A','C','C','E','A','B','E','C','D','C','A','B','A','D','C','B','E','D','D','B','E','D','E','A','C','B','D','A'];

const questions = [
  {
    number: 1,
    stem: "Carnell is paid a regular hourly wage of $13.50 per hour for working up to and including 40 hours in 1 week. For each additional hour he works in a week, Carnell is paid twice his regular hourly wage. Carnell worked 48 hours this week. What is his pay for this week? (Note: Amounts are before taxes and benefits are deducted.)",
    choices: {
      A: "$594.00",
      B: "$648.00",
      C: "$756.00",
      D: "$864.00",
      E: "$1,296.00"
    },
    type: "arithmetic",
    category: "ALG"
  },
  {
    number: 2,
    stem: "In the standard (x,y) coordinate plane, what is the slope of the line with the equation y - 2 = 1/3(x + 3)?",
    choices: {
      A: "-2",
      B: "1/3",
      C: "1",
      D: "2",
      E: "3"
    },
    type: "linear_equations",
    category: "ALG"
  },
  {
    number: 3,
    stem: "Sofia earned scores of 85, 86, 87, and 82 points on 4 math tests. What score must Sofia earn on the 5th math test for the average of the 5 tests to be exactly 3 points higher than the average of the first 4 tests?",
    choices: {
      A: "70",
      B: "82",
      C: "85",
      D: "88",
      E: "100"
    },
    type: "statistics",
    category: "ALG"
  },
  {
    number: 4,
    stem: "The parallelogram below has consecutive angles with measures x° and 28°. What is the value of x?",
    choices: {
      A: "28",
      B: "62",
      C: "152",
      D: "180",
      E: "208"
    },
    type: "plane_geometry",
    category: "GEO"
  },
  {
    number: 5,
    stem: "Two side lengths of the right triangle shown below are given in inches. How many inches long is the hypotenuse? (The two sides are 3 and 8)",
    choices: {
      A: "√22",
      B: "√55",
      C: "√73",
      D: "11",
      E: "73"
    },
    type: "plane_geometry",
    category: "GEO"
  },
  {
    number: 6,
    stem: "Using only Step 1 followed by Step 2 below, Amir correctly solved a linear equation. Step 1: Subtract 16 from both sides of the equation. Step 2: Multiply both sides of the resulting equation by 5. One of the following equations is the equation that Amir solved. Which one?",
    choices: {
      A: "(4n - 16)/5 = 14",
      B: "(n/5) + 16 = 14",
      C: "(2n + 16)/5 = 14",
      D: "5n - 16 = -14",
      E: "5n + 14 = 16"
    },
    type: "linear_equations",
    category: "ALG"
  },
  {
    number: 7,
    stem: "All the kindergarten students at Cannon Elementary School are in exactly 1 of 3 classes. The 1st class has 10 boys and 15 girls, the 2nd class has 9 boys and 17 girls, and the 3rd class has 11 boys and 12 girls. All the kindergarten students at Cannon Elementary School are gathered in the gym for an assembly where 1 kindergarten student is randomly selected to win a prize. What is the probability that the selected student will be a boy?",
    choices: {
      A: "5/37",
      B: "5/12",
      C: "10/37",
      D: "30/74",
      E: "37/74"
    },
    type: "probability",
    category: "ALG"
  },
  {
    number: 8,
    stem: "Jamal purchased a car that had a purchase price of $6,400, which included all other costs and tax. He paid $1,500 as a down payment and got a loan for the rest of the purchase price. Jamal paid off the loan by making 36 payments of $200 each. The total of all his payments, including the down payment, was how much more than the car's purchase price?",
    choices: {
      A: "$800",
      B: "$2,300",
      C: "$4,900",
      D: "$7,200",
      E: "$8,700"
    },
    type: "arithmetic",
    category: "ALG"
  },
  {
    number: 9,
    stem: "What is the solution of the equation 8(x + 2) = 4x - 2(x - 3)?",
    choices: {
      A: "-5/6",
      B: "0",
      C: "5/6",
      D: "11/6",
      E: "22/3"
    },
    type: "linear_equations",
    category: "ALG"
  },
  {
    number: 10,
    stem: "The expression (2x)³(3x)² is equivalent to:",
    choices: {
      A: "5x⁵",
      B: "36x⁵",
      C: "36x⁶",
      D: "72x⁵",
      E: "72x⁶"
    },
    type: "exponents",
    category: "ALG"
  },
  {
    number: 11,
    stem: "3a - 4(2b - 5a) + 7(3a + 2b) is equivalent to:",
    choices: {
      A: "4a + 3b",
      B: "4a + 6b",
      C: "4a + 7b",
      D: "44a - b",
      E: "44a + 6b"
    },
    type: "expressions",
    category: "ALG"
  },
  {
    number: 12,
    stem: "A square and a rectangle have the same area. The length of the rectangle is 45 centimeters, and the width of the rectangle is 5 centimeters. What is the length, in centimeters, of a side of the square?",
    choices: {
      A: "5",
      B: "10",
      C: "25",
      D: "15",
      E: "225"
    },
    type: "plane_geometry",
    category: "GEO"
  },
  {
    number: 13,
    stem: "Square ABEF and parallelogram ACDG are shown in the figure below. Points E and F are on DG, B is on AC, and the lengths given are in inches. What is the ratio of the area of ABEF to the area of ACDG?",
    choices: {
      A: "1:8",
      B: "1:16",
      C: "3:8",
      D: "8:1",
      E: "8:3"
    },
    type: "plane_geometry",
    category: "GEO"
  },
  {
    number: 14,
    stem: "A 2-liter bottle of Fizzo contains approximately 67.6 ounces of soda. An 8-ounce serving of Fizzo has 110 calories. Which of the following is closest to the number of calories in a 2-liter bottle of Fizzo?",
    choices: {
      A: "220",
      B: "880",
      C: "930",
      D: "1,760",
      E: "7,440"
    },
    type: "arithmetic",
    category: "ALG"
  },
  {
    number: 15,
    stem: "What is the smallest integer greater than √77?",
    choices: {
      A: "6",
      B: "7",
      C: "8",
      D: "9",
      E: "39"
    },
    type: "number_properties",
    category: "ALG"
  },
  {
    number: 16,
    stem: "A wheelchair ramp will be constructed for a public library. The ramp will extend 20 inches horizontally for every 1 inch of rise vertically. The rise of the ramp will be 30 inches. Which of the following values is closest to the length, in feet, the ramp will extend horizontally?",
    choices: {
      A: "2",
      B: "50",
      C: "36",
      D: "18",
      E: "10"
    },
    type: "arithmetic",
    category: "ALG"
  },
  {
    number: 17,
    stem: "Padma's teacher asked her to subtract 3 from a certain number and then divide the result by 9. Instead, Padma subtracted 9 and divided the result by 3, getting an answer of 43. What would her answer have been had she worked the problem as her teacher asked?",
    choices: {
      A: "15",
      B: "34",
      C: "138/40",
      D: "40/3",
      E: "43"
    },
    type: "arithmetic",
    category: "ALG"
  },
  {
    number: 18,
    stem: "On the local car dealer's lot, there are only 26 cars with a sunroof and only 18 cars with cruise control. The number of cars on the lot with both a sunroof and cruise control must be:",
    choices: {
      A: "exactly 44",
      B: "exactly 8",
      C: "at least 8",
      D: "no more than 8",
      E: "no more than 18"
    },
    type: "logic",
    category: "ALG"
  },
  {
    number: 19,
    stem: "On her algebra exam, Hannah had to solve the equation x² + 3x - 8 = 0 for x. Confident that the quadratic formula was the correct method to solve this equation, she started her solution with the equation below. What error, if any, did Hannah make in setting up the equation? x = (-3 ± √(3² - 4(1)(8))) / (2(1))",
    choices: {
      A: "Hannah should have used -8 instead of 8 in the term -4(1)(8) under the radical.",
      B: "Hannah should have used -3 instead of 3² under the radical.",
      C: "Hannah should have used -2 instead of 2 in the denominator.",
      D: "Hannah should have used 3 instead of -3 in the numerator.",
      E: "Hannah did not make an error."
    },
    type: "quadratics",
    category: "ALG"
  },
  {
    number: 20,
    stem: "Every 10 minutes, Channel 7 begins a 60-second-long commercial. Every 12 minutes, Channel 5 begins a 60-second-long commercial. Each channel began a 60-second-long commercial at the same instant. How many minutes will elapse before both channels next begin a 60-second-long commercial at the same instant?",
    choices: {
      A: "2",
      B: "11",
      C: "60",
      D: "22",
      E: "24"
    },
    type: "number_properties",
    category: "ALG"
  },
  {
    number: 21,
    stem: "When Professor Soto began his trip to a mathematics conference, he noticed that the 2 digits of the recorded temperature, in degrees Fahrenheit, had a sum of 8. Later, he noticed that the 2 digits were reversed and that the temperature had warmed 18°F. What was the temperature, in degrees Fahrenheit, at the beginning of his trip?",
    choices: {
      A: "17°F",
      B: "35°F",
      C: "53°F",
      D: "62°F",
      E: "26°F"
    },
    type: "number_properties",
    category: "ALG"
  },
  {
    number: 22,
    stem: "Given functions f(x) = 4x + 1 and g(x) = x² - 2, what is the value of f(g(-3))?",
    choices: {
      A: "-123",
      B: "-43",
      C: "-31",
      D: "29",
      E: "119"
    },
    type: "functions",
    category: "ALG"
  },
  {
    number: 23,
    stem: "In the standard (x,y) coordinate plane, A is located at (4,9). What is the location of the image of A that results from reflecting A over the y-axis?",
    choices: {
      A: "(-9, 4)",
      B: "(-4, -9)",
      C: "(-4, 9)",
      D: "(4, -9)",
      E: "(9, -4)"
    },
    type: "coordinate_geometry",
    category: "GEO"
  },
  {
    number: 24,
    stem: "For every odd integer x, the expression x² + x results in:",
    choices: {
      A: "an even integer",
      B: "an odd integer",
      C: "a positive integer",
      D: "a negative integer",
      E: "a prime number"
    },
    type: "number_properties",
    category: "ALG"
  },
  {
    number: 25,
    stem: "What is the least positive number that has a remainder of 5 when divided by 7 and a remainder of 3 when divided by 5?",
    choices: {
      A: "8",
      B: "33",
      C: "35",
      D: "50",
      E: "27"
    },
    type: "number_properties",
    category: "ALG"
  },
  {
    number: 26,
    stem: "Naomi is going to install baseboard around the perimeter of her room's rectangular floor, shown below. The floor has dimensions 15 feet by 20 feet. The 2 doorways in her room are each 3 feet wide and do not require baseboard. Assuming an average cost of $0.30 per linear foot requiring baseboard, how much will it cost Naomi to purchase baseboard for her room?",
    choices: {
      A: "$10.50",
      B: "$19.20",
      C: "$21.00",
      D: "$88.20",
      E: "$90.00"
    },
    type: "plane_geometry",
    category: "GEO"
  },
  {
    number: 27,
    stem: "Chou flies directly from New York City to San Francisco. New York City's time is 3 hours later than San Francisco's time. Chou left New York City at 7:30 a.m. local time and landed in San Francisco at 11:12 a.m. local time. How long was the trip?",
    choices: {
      A: "3 hours 42 minutes",
      B: "4 hours 18 minutes",
      C: "6 hours 18 minutes",
      D: "6 hours 42 minutes",
      E: "7 hours 18 minutes"
    },
    type: "arithmetic",
    category: "ALG"
  },
  {
    number: 28,
    stem: "Petsnacks is going to test its catnip ball on 200 domestic cats. Catnip causes a reaction in 80% of all domestic cats. Which of the following values is equal to the expected number of cats that will NOT have a reaction to the catnip in the toy?",
    choices: {
      A: "20",
      B: "40",
      C: "80",
      D: "120",
      E: "160"
    },
    type: "probability",
    category: "ALG"
  },
  {
    number: 29,
    stem: "Petsnacks sold 1,500 catnip balls in its 7th month of operation and 1,550 catnip balls in its 8th month. Given that its sales of these toys have followed an arithmetic sequence since the operation began, how much profit, in dollars, did Petsnacks make on the catnip balls in its 3rd month of operation? (Petsnacks makes a profit of $7.50 on each catnip ball it sells.)",
    choices: {
      A: "$9,375",
      B: "$9,750",
      C: "$10,125",
      D: "$11,250",
      E: "$11,625"
    },
    type: "sequences",
    category: "ALG"
  },
  {
    number: 30,
    stem: "Next month at a pet-food trade show, Petsnacks will exhibit 1 box of each flavor of its entire line of pet treats in a row on a shelf. Petsnacks currently produces 3 different flavored treats for cats and 4 different flavored treats for dogs. By that time, the company will have added 3 different flavors of gerbil treats to its line of pet treats. Which of the following computations gives the number of additional orders in which Petsnacks will be able to arrange its treats on the shelf with the new line of gerbil treats than without the gerbil treats?",
    choices: {
      A: "10! - 3!",
      B: "10 - 3",
      C: "(10 - 3)!",
      D: "10! - 7!",
      E: "(10!/3!) - (7!/4!)"
    },
    type: "combinatorics",
    category: "ALG"
  },
  {
    number: 31,
    stem: "A tree farmer has exactly 3 kinds of trees on his farm: apple, cherry, and evergreen. Of these trees, 1/5 are apple, 3/8 are cherry, and 120 trees are evergreen. The farmer has how many trees on his farm?",
    choices: {
      A: "203",
      B: "210",
      C: "220",
      D: "400",
      E: "720"
    },
    type: "arithmetic",
    category: "ALG"
  },
  {
    number: 32,
    stem: "What is the median of the list of 10 numbers below? 87, 85, 78, 94, 67, 97, 55, 81, 87, 99",
    choices: {
      A: "78",
      B: "81",
      C: "82",
      D: "85",
      E: "87"
    },
    type: "statistics",
    category: "ALG"
  },
  {
    number: 33,
    stem: "A board 12 inches by 32 inches is 64 feet long. You want to cut as many pieces as possible from the board so that each piece is 12 inches by 32 inches and 6 inches long. Each saw cut wastes 1/8 inch of the board. How many 6-inch-long pieces will you be able to cut?",
    choices: {
      A: "13",
      B: "12",
      C: "11",
      D: "10",
      E: "9"
    },
    type: "arithmetic",
    category: "ALG"
  },
  {
    number: 34,
    stem: "The probability that Event A will occur is 1/2. The probability that Event B will occur is 1/3. Given that Events A and B are mutually exclusive, what is the probability that Event A or Event B will occur?",
    choices: {
      A: "1/6",
      B: "1/5",
      C: "5/6",
      D: "2/3",
      E: "3/2"
    },
    type: "probability",
    category: "ALG"
  },
  {
    number: 35,
    stem: "What is the measure, in degrees, of an angle with a measure of 7π/9 radians?",
    choices: {
      A: "63°",
      B: "70°",
      C: "140°",
      D: "280°",
      E: "90°"
    },
    type: "trigonometry",
    category: "GEO"
  },
  {
    number: 36,
    stem: "As shown below, D is on side CE of rectangle ABCE such that the measure of ∠ADB is 90°. Which of the following angles must be congruent to ∠1?",
    choices: {
      A: "∠2 only",
      B: "∠4 only",
      C: "∠5 only",
      D: "∠2 and ∠4",
      E: "∠3 and ∠6"
    },
    type: "plane_geometry",
    category: "GEO"
  },
  {
    number: 37,
    stem: "The area of a circle is 64π square inches. What is the circumference, in inches, of the circle?",
    choices: {
      A: "8π",
      B: "16π",
      C: "24π",
      D: "32π",
      E: "64π"
    },
    type: "plane_geometry",
    category: "GEO"
  },
  {
    number: 38,
    stem: "In the standard (x,y) coordinate plane, points A(2,3), B(4,0), and C(7,b) lie on the same line. What is b?",
    choices: {
      A: "-21/2",
      B: "-9/2",
      C: "-3",
      D: "6",
      E: "19/3"
    },
    type: "coordinate_geometry",
    category: "GEO"
  },
  {
    number: 39,
    stem: "When a ≠ 0, which of the following is equivalent to (12a² - 3a³) / a³?",
    choices: {
      A: "-3 + 12/a",
      B: "12/a - 3",
      C: "9/a³",
      D: "9a²",
      E: "12a² - 3"
    },
    type: "expressions",
    category: "ALG"
  },
  {
    number: 40,
    stem: "A jar contains 2 green mints and 3 white mints. If Renée randomly takes 2 mints out of the jar to eat, what is the probability that both of these mints are green?",
    choices: {
      A: "1/25",
      B: "2/25",
      C: "1/10",
      D: "2/5",
      E: "4/5"
    },
    type: "probability",
    category: "ALG"
  },
  {
    number: 41,
    stem: "The number of decibels, d, produced by an audio source can be modeled by the equation d = 10 log(I/10⁻¹²), where I is the sound intensity, in watts per square meter, of the audio source. What is the sound intensity, in watts per square meter, for an audio source that produces 100 decibels?",
    choices: {
      A: "10⁻¹⁰",
      B: "10⁻⁷",
      C: "10⁻⁵",
      D: "10⁻²",
      E: "140"
    },
    type: "logarithms",
    category: "ALG"
  },
  {
    number: 42,
    stem: "The diagram below shows the location of Manuel's boat, which is on a lake and anchored to a stationary buoy at point B. On the shore, Manuel's house is at point H and his nearest neighbor's house is at point N, which is 150 meters from H. The measures of 2 angles are given. Which of the following expressions represents the straight-line distance, in meters, from B to N? (Note: For a triangle with sides of length a, b, and c that are opposite angles ∠A, ∠B, and ∠C, respectively, sin∠A/a = sin∠B/b = sin∠C/c)",
    choices: {
      A: "(150 sin 50°) / sin 60°",
      B: "(150 sin 50°) / sin 70°",
      C: "(150 sin 60°) / sin 50°",
      D: "(150 sin 60°) / sin 70°",
      E: "(150 sin 70°) / sin 50°"
    },
    type: "trigonometry",
    category: "GEO"
  },
  {
    number: 43,
    stem: "Packmore Box Company manufactures a standard rectangular box a feet by b feet by c feet. A customer ordered a new box with double the volume of the standard box. Which of the following expressions represents the volume, in cubic feet, of the new box?",
    choices: {
      A: "2abc",
      B: "a²b²c²",
      C: "8abc",
      D: "2a + b + c",
      E: "2a + 2b + 2c"
    },
    type: "solid_geometry",
    category: "GEO"
  },
  {
    number: 44,
    stem: "For her mathematics class, Ms. Wilkerson is preparing a probability experiment using only dried kidney beans, dried pinto beans, and an empty jar. First, she puts 4 kidney beans into the empty jar. How many pinto beans must be added to the jar in order to make the probability of drawing a kidney bean exactly 1/5 when randomly drawing 1 bean from the jar?",
    choices: {
      A: "20",
      B: "16",
      C: "5",
      D: "4",
      E: "1"
    },
    type: "probability",
    category: "ALG"
  },
  {
    number: 45,
    stem: "A car rental agency has 20 cars. Of those cars, 4 are luxury sedans and all the other cars are midsize sedans. Each luxury sedan rents at a daily rate 50% greater than the daily rate for the midsize sedans. If the luxury sedans rent for $45 per day, what is the average daily rental fee, to the nearest dollar, of all 20 cars at this agency?",
    choices: {
      A: "$27",
      B: "$33",
      C: "$38",
      D: "$42",
      E: "$56"
    },
    type: "statistics",
    category: "ALG"
  },
  {
    number: 46,
    stem: "A portion of a regular polygon (all sides of equal length and all interior angles of equal measure) with n sides is shown below. The midpoint of BC is M. The distance, in centimeters, from the polygon's center, R, to the midpoint of a side is the same for all sides. Which of the following is an expression for the area, in square centimeters, of the polygon?",
    choices: {
      A: "(n/2)(BC)(MR)",
      B: "n(CM)(MR)",
      C: "n(BC)",
      D: "n(BC + BR + CR)",
      E: "√((CM)² + (MR)²)"
    },
    type: "plane_geometry",
    category: "GEO"
  },
  {
    number: 47,
    stem: "Let a, b, and c be the respective side lengths, in feet, of a triangle. Given that a is 5 and b is 7, which of the following inequalities gives all and only the possible values of c?",
    choices: {
      A: "c > 2",
      B: "c < 12",
      C: "0 < c < 12",
      D: "2 < c < 12",
      E: "5 < c < 7"
    },
    type: "plane_geometry",
    category: "GEO"
  },
  {
    number: 48,
    stem: "For the complex number i, which of the following expressions is equivalent to (x + i)(x - i)?",
    choices: {
      A: "x² + 1",
      B: "x² - 1",
      C: "x² + 2ix + 1",
      D: "x² - 2ix + 1",
      E: "x² - 2ix - 1"
    },
    type: "complex_numbers",
    category: "ALG"
  },
  {
    number: 49,
    stem: "The center of the circle shown below is at B, and the length of diameter AD is 12 cm. The measure of arc DE is 60°, and the measure of arc AC is 70°. What is the measure of major arc ACE?",
    choices: {
      A: "70°",
      B: "130°",
      C: "230°",
      D: "240°",
      E: "260°"
    },
    type: "plane_geometry",
    category: "GEO"
  },
  {
    number: 50,
    stem: "The center of the circle is at B, and the length of diameter AD is 12 cm. Triangle ACD is a right triangle. Which of the following expressions represents the length, in centimeters, of AC?",
    choices: {
      A: "6 sin 35°",
      B: "6 sin 55°",
      C: "6 sin 70°",
      D: "12 sin 35°",
      E: "12 sin 70°"
    },
    type: "trigonometry",
    category: "GEO"
  },
  {
    number: 51,
    stem: "On the circle, if all points remain fixed in their current positions except E, which moves along the circle counterclockwise until it reaches A, the length of CE during this movement will:",
    choices: {
      A: "remain unchanged",
      B: "decrease, then increase",
      C: "decrease only",
      D: "increase only",
      E: "increase, then decrease"
    },
    type: "plane_geometry",
    category: "GEO"
  },
  {
    number: 52,
    stem: "The function f(x) = x⁵ is defined for all real numbers x. Which of the following expressions represents f⁻¹(x)?",
    choices: {
      A: "-x⁵",
      B: "1/x⁵",
      C: "x⁻⁵",
      D: "⁵√x",
      E: "-⁵√x"
    },
    type: "functions",
    category: "ALG"
  },
  {
    number: 53,
    stem: "Given positive integers a and b such that b < a < 14, what is the largest value of a + b that has a factor of 3?",
    choices: {
      A: "21",
      B: "24",
      C: "25",
      D: "26",
      E: "27"
    },
    type: "number_properties",
    category: "ALG"
  },
  {
    number: 54,
    stem: "At an end-of-school-year party for juniors and seniors only, there are 20 more juniors than seniors. Of the 52 students at the party, 25% have summer jobs. Which of the following is closest to the maximum possible percent of the seniors at the party who have summer jobs?",
    choices: {
      A: "25%",
      B: "36%",
      C: "44%",
      D: "81%",
      E: "97%"
    },
    type: "arithmetic",
    category: "ALG"
  },
  {
    number: 55,
    stem: "What is the minimum value of 2x - 3y given that x and y satisfy the system of inequalities below? x ≥ -2, y ≤ 3, x - y ≤ 5",
    choices: {
      A: "-25",
      B: "-13",
      C: "7",
      D: "17",
      E: "25"
    },
    type: "linear_inequalities",
    category: "ALG"
  },
  {
    number: 56,
    stem: "The ratio of a to b is 5 to 1, and the ratio of b to c is 9 to 1. What is the value of (4b + 3c) / (2a + 3c)?",
    choices: {
      A: "4/9",
      B: "21/5",
      C: "3/2",
      D: "15/2",
      E: "4"
    },
    type: "ratios",
    category: "ALG"
  },
  {
    number: 57,
    stem: "If t is any real number, which of the following statements must be true?",
    choices: {
      A: "-t < 0",
      B: "-t < t",
      C: "(-t)² = t²",
      D: "-|t| < |-t|",
      E: "-t = t"
    },
    type: "number_properties",
    category: "ALG"
  },
  {
    number: 58,
    stem: "Let a and b be positive real numbers such that log(a) = 3 and log(b) = 2. What is the value of log(a²b)?",
    choices: {
      A: "7",
      B: "8",
      C: "11",
      D: "12",
      E: "18"
    },
    type: "logarithms",
    category: "ALG"
  },
  {
    number: 59,
    stem: "For real numbers a and b on the number line below, where a < b, which of the following values is a possible value for b/a? (Given that a is between -2 and 0, √a is at 3, and b is between √a and 9/4)",
    choices: {
      A: "-2",
      B: "-1",
      C: "0",
      D: "1",
      E: "9/4"
    },
    type: "number_properties",
    category: "ALG"
  },
  {
    number: 60,
    stem: "For all positive values of x, which of the following expressions is equivalent to 2√(2x) - √x?",
    choices: {
      A: "√(12x)",
      B: "√(3x)",
      C: "2√x",
      D: "3√x",
      E: "√(24x)"
    },
    type: "radicals",
    category: "ALG"
  }
];

console.log('Inserting Test 7 Math questions...');

for (const q of questions) {
  const insertData = {
    test_number: TEST_NUMBER,
    question_number: q.number,
    question_stem: q.stem,
    choice_a: q.choices.A,
    choice_b: q.choices.B,
    choice_c: q.choices.C,
    choice_d: q.choices.D,
    choice_e: q.choices.E,
    correct_answer: answerKey[q.number - 1],
    question_type: q.type,
    question_category: q.category,
    lesson_id: null
  };

  const { error } = await supabase
    .from('act_math_questions')
    .insert([insertData]);

  if (error) {
    console.error(`Error inserting Q${q.number}:`, error);
  } else {
    console.log(`✓ Q${q.number} inserted`);
  }
}

console.log('Done!');
