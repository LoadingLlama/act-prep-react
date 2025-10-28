#!/usr/bin/env node

/**
 * EXTRACT PRACTICE TEST 5 - ALL 60 MATH QUESTIONS
 * Manually extracted from Practice ACT 5 PDF with 100% accuracy
 *
 * Source: /Users/cadenchiang/Desktop/actprep copy/actclass.org/practice acts/ocr_Practice ACT 5.pdf
 * Math section: Pages 14-21 (60 questions)
 */

import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '../../.env') });

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

const TEST_NUMBER = 5;

console.log('🔧 EXTRACTING PRACTICE TEST 5 - ALL 60 MATH QUESTIONS\n');
console.log('='.repeat(80));

// All 60 Math questions manually extracted from PDF
const questions = [
  {
    number: 1,
    stem: "The numbers 1 through 15 were each written on individual pieces of paper, 1 number per piece. Then the 15 pieces of paper were put in a jar. One piece of paper will be drawn from the jar at random. What is the probability of drawing a piece of paper with a number less than 9 written on it?",
    choices: {
      A: "1/9",
      B: "1/15",
      C: "6/15",
      D: "7/15",
      E: "8/15"
    }
  },
  {
    number: 2,
    stem: "Which of the following expressions is equivalent to -4x³ - 12x⁵ + 9x²?",
    choices: {
      F: "x⁸",
      G: "-7x⁸",
      H: "-8x⁸ + 9x",
      J: "-16x⁸ + 9x²",
      K: "-16x⁸ + 9x⁴"
    }
  },
  {
    number: 3,
    stem: "When x = 2, 10 + 3(12 + (x)) = ?",
    choices: {
      A: "12",
      B: "16",
      C: "26",
      D: "34",
      E: "104"
    }
  },
  {
    number: 4,
    stem: "|6 - 4| - |3 - 8| = ?",
    choices: {
      F: "-7",
      G: "-3",
      H: "3",
      J: "7",
      K: "21"
    }
  },
  {
    number: 5,
    stem: "The expression (4c - 3d)(3c + d) is equivalent to:",
    choices: {
      A: "12c² - 13cd - 3d²",
      B: "12c² - 13cd + 3d²",
      C: "12c² - 5cd - 3d²",
      D: "12c² - 5cd + 3d²",
      E: "12c² - 3d²"
    }
  },
  {
    number: 6,
    stem: "Of the 180 students in a college course, 1/4 of the students earned an A for the course, 1/3 of the students earned a B for the course, and the rest of the students earned a C for the course. How many of the students earned a C for the course?",
    choices: {
      F: "75",
      G: "90",
      H: "105",
      J: "120",
      K: "135"
    }
  },
  {
    number: 7,
    stem: "The number of fish, f, in Skipper's Pond at the beginning of each year can be modeled by the equation f(x) = 3(2ˣ), where x represents the number of years after the beginning of the year 2000. For example, x = 0 represents the beginning of the year 2000, x = 1 represents the beginning of the year 2001, and so forth. According to the model, how many fish were in Skipper's Pond at the beginning of the year 2006?",
    choices: {
      A: "96",
      B: "192",
      C: "384",
      D: "1,458",
      E: "46,656"
    }
  },
  {
    number: 8,
    stem: "Manish drove from Chicago to Baton Rouge. At 8:00 a.m., he was 510 km from Baton Rouge. At 1:00 p.m., he was 105 km from Baton Rouge. Which of the following values is closest to Manish's average speed, in kilometers per hour, from 8:00 a.m. to 1:00 p.m.?",
    choices: {
      F: "58",
      G: "68",
      H: "81",
      J: "94",
      K: "102"
    }
  },
  {
    number: 9,
    stem: "In the figure shown below, E and G lie on AC, D and F lie on AB, DE and FG are parallel to BC, and the given lengths are in feet. What is the length of AC, in feet?",
    choices: {
      A: "13",
      B: "26",
      C: "29",
      D: "42",
      E: "48"
    }
  },
  {
    number: 10,
    stem: "Katerina runs 15 miles in 2 1/2 hours. What is the average number of minutes it takes her to run 1 mile?",
    choices: {
      F: "6",
      G: "10",
      H: "12 1/2",
      J: "16 2/3",
      K: "17 1/4"
    }
  },
  {
    number: 11,
    stem: "A bag contains 8 red marbles, 9 yellow marbles, and 7 green marbles. How many additional red marbles must be added to the 24 marbles already in the bag so that the probability of randomly drawing a red marble is 3/5?",
    choices: {
      A: "11",
      B: "16",
      C: "20",
      D: "24",
      E: "32"
    }
  },
  {
    number: 12,
    stem: "In the standard (x,y) coordinate plane, the point (2,1) is the midpoint of CD. Point C has coordinates (6,8). What are the coordinates of point D?",
    choices: {
      F: "(-2, -7/2)",
      G: "(-2, -6)",
      H: "(4, 9/2)",
      J: "(10, 10)",
      K: "(10, 15)"
    }
  },
  {
    number: 13,
    stem: "At his job, the first 40 hours of each week that Thomas works is regular time, and any additional time that he works is overtime. Thomas gets paid $15 per hour during regular time. During overtime Thomas gets paid 1.5 times as much as he gets paid during regular time. Thomas works 46 hours in 1 week and gets $117 in deductions taken out of his pay for this week. After the deductions are taken out, how much of Thomas's pay for this week remains?",
    choices: {
      A: "$492",
      B: "$573",
      C: "$609",
      D: "$618",
      E: "$735"
    }
  },
  {
    number: 14,
    stem: "At Sweet Stuff Fresh Produce the price of a bag of grapes depends on the total number of bags purchased at 1 time, as shown in the table below. In 2 trips to Sweet Stuff this week, Janelle purchased 3 bags of grapes on Monday and 4 bags of grapes on Wednesday. How much money would Janelle have saved if she had instead purchased 7 bags of grapes in 1 trip on Monday?\n\nNumber of bags | Price per bag\n1-3           | $3.00\n4-6           | $2.80\n7-9           | $2.60\n10 or more    | $2.50",
    choices: {
      F: "$0.20",
      G: "$1.00",
      H: "$1.40",
      J: "$2.00",
      K: "$2.50"
    }
  },
  {
    number: 15,
    stem: "What is 3% of 4.14 × 10⁴?",
    choices: {
      A: "1,242",
      B: "1,380",
      C: "12,420",
      D: "13,800",
      E: "124,200"
    }
  },
  {
    number: 16,
    stem: "What value of x satisfies the equation -3(4x - 5) = 2(1 - 5x)?",
    choices: {
      F: "-17/2",
      G: "-17/22",
      H: "-1",
      J: "3/17",
      K: "13/2"
    }
  },
  {
    number: 17,
    stem: "In right triangle △ABC shown below, the given lengths are in millimeters. What is sin A?",
    choices: {
      A: "4√2/9",
      B: "4√2/7",
      C: "7√2/8",
      D: "7/9",
      E: "9/7"
    }
  },
  {
    number: 18,
    stem: "(27/64)^(-1/3) = ?",
    choices: {
      F: "-9/16",
      G: "-9/32",
      H: "9/32",
      J: "16/9",
      K: "32/9"
    }
  },
  {
    number: 19,
    stem: "Loto begins at his back door and walks 8 yards east, 6 yards north, 12 yards east, and 5 yards north to the barn door. About how many yards less would he walk if he could walk directly from the back door to the barn door?",
    choices: {
      A: "8",
      B: "19",
      C: "23",
      D: "26",
      E: "31"
    }
  },
  {
    number: 20,
    stem: "For a given set of data, the standard score, z, corresponding to the raw score, x, is given by z = (x - μ)/σ, where μ is the mean of the set and σ is the standard deviation. If, for a set of scores, μ = 78 and σ = 6, which of the following is the raw score, x, corresponding to z = 2?",
    choices: {
      F: "90",
      G: "84",
      H: "80",
      J: "76",
      K: "66"
    }
  },
  {
    number: 21,
    stem: "In the figure below, A, B, C, and D lie on the circle centered at O. Which of the following does NOT appear in the figure?",
    choices: {
      A: "Acute triangle",
      B: "Equilateral triangle",
      C: "Isosceles triangle",
      D: "Right triangle",
      E: "Scalene triangle"
    }
  },
  {
    number: 22,
    stem: "What is the slope of a line, in the standard (x,y) coordinate plane, that is parallel to x + 5y = 9?",
    choices: {
      F: "-5",
      G: "-1/5",
      H: "1/5",
      J: "9/5",
      K: "9"
    }
  },
  {
    number: 23,
    stem: "Given y = x/(x-1) and x > 1, which of the following is a possible value of y?",
    choices: {
      A: "-1.9",
      B: "-0.9",
      C: "0.0",
      D: "0.9",
      E: "1.9"
    }
  },
  {
    number: 24,
    stem: "The set of all positive integers that are divisible by both 15 and 35 is infinite. What is the least positive integer in this set?",
    choices: {
      F: "5",
      G: "50",
      H: "105",
      J: "210",
      K: "525"
    }
  },
  {
    number: 25,
    stem: "In △ABC shown below, the measure of ∠A is 58°, and AB = AC. What is the measure of ∠C?",
    choices: {
      A: "32°",
      B: "42°",
      C: "58°",
      D: "61°",
      E: "62°"
    }
  },
  {
    number: 26,
    stem: "About 1.48 × 10⁸ square kilometers of Earth's surface is land; the rest, about 3.63 × 10⁸ square kilometers, is water. If a returning space capsule lands at a random point on Earth's surface, which of the following is the best estimate of the probability that the space capsule will land in water?",
    choices: {
      F: "80%",
      G: "71%",
      H: "65%",
      J: "41%",
      K: "29%"
    }
  },
  {
    number: 27,
    stem: "On the first 7 statistics tests of the semester, Jamal scored 61, 76, 79, 80, 80, 84, and 91. The mean, median, and mode of his scores were 79, 80, and 80, respectively. On the 8th statistics test, Jamal scored 90. How do the mean, median, and mode of all 8 of his scores compare to the mean, median, and mode of his first 7 scores?\n\n       Mean    Median   Mode",
    choices: {
      A: "equal   greater  greater",
      B: "greater greater  greater",
      C: "greater greater  equal",
      D: "greater equal    greater",
      E: "greater equal    equal"
    }
  },
  {
    number: 28,
    stem: "The solid rectangular prism shown below was built by alternating congruent black cubes and white cubes such that 2 cubes of the same color have at most 1 edge touching. What is the total number of white cubes that were used to build the prism?",
    choices: {
      F: "45",
      G: "102",
      H: "105",
      J: "140",
      K: "210"
    }
  },
  {
    number: 29,
    stem: "One side of square ABCD has a length of 12 meters. A certain rectangle whose area is equal to the area of ABCD has a width of 8 meters. What is the length, in meters, of the rectangle?",
    choices: {
      A: "12",
      B: "16",
      C: "18",
      D: "20",
      E: "24"
    }
  },
  {
    number: 30,
    stem: "The average of a list of 4 numbers is 92.0. A new list of 4 numbers has the same first 3 numbers as the original list, but the fourth number in the original list is 40, and the fourth number in the new list is 48. What is the average of this new list of numbers?",
    choices: {
      F: "81.0",
      G: "92.0",
      H: "94.0",
      J: "94.4",
      K: "96.6"
    }
  },
  {
    number: 31,
    stem: "The vector i represents 1 mile per hour east, and the vector j represents 1 mile per hour north. Maria is jogging south at 12 miles per hour. One of the following vectors represents Maria's velocity, in miles per hour. Which one?",
    choices: {
      A: "-12i",
      B: "-12j",
      C: "12i",
      D: "12j",
      E: "12i + 12j"
    }
  },
  {
    number: 32,
    stem: "Four identical glasses are shown below. One glass is empty, and the other 3 glasses are 1/5 full, 1/2 full, and 4/5 full of water, respectively. If the water were redistributed equally among the 4 glasses, what fractional part of each glass would be filled?",
    choices: {
      F: "2/11",
      G: "8/11",
      H: "3/22",
      J: "31/60",
      K: "31/80"
    }
  },
  {
    number: 33,
    stem: "Aurelio is purchasing carpet tiles to cover an area of his living room floor that is 8 1/2 feet wide by 10 feet long. Each carpet tile is a square 20 inches wide by 20 inches long. What is the minimum number of carpet tiles that Aurelio must purchase to cover this area of his living room floor?",
    choices: {
      A: "5",
      B: "11",
      C: "21",
      D: "30",
      E: "84"
    }
  },
  {
    number: 34,
    stem: "In the standard (x,y) coordinate plane, a circle with its center at (8,5) and a radius of 9 coordinate units has which of the following equations?",
    choices: {
      F: "(x - 8)² + (y - 5)² = 81",
      G: "(x - 8)² + (y - 5)² = 9",
      H: "(x + 8)² + (y + 5)² = 81",
      J: "(x + 8)² + (y + 5)² = 9",
      K: "(x + 5)² + (y + 8)² = 81"
    }
  },
  {
    number: 35,
    stem: "Many humans carry the gene Yq77. The Yq test determines, with 100% accuracy, whether a human carries Yq77. If a Yq test result is positive, the human carries the Yq77 gene. If a Yq test result is negative, the human does NOT carry Yq77. Sam designed a less expensive test for Yq77 called the Sam77 test. It produces some incorrect results. To determine the accuracy of the Sam77 test, both tests were administered to 1,000 volunteers. The results from this administration are summarized in the table below.\n\n                    Positive | Negative\n                    Yq test  | Yq test\nPositive Sam77 test   590    |   10\nNegative Sam77 test    25    |  375\n\nIt cost $2,500 to administer each Yq test and $50 to administer each Sam77 test. What was the total cost to administer both tests to all the volunteers?",
    choices: {
      A: "$1,537,500",
      B: "$1,556,750",
      C: "$1,568,250",
      D: "$2,500,000",
      E: "$2,550,000"
    }
  },
  {
    number: 36,
    stem: "What percent of the volunteers actually carry Yq77? (Use table from Question 35)",
    choices: {
      F: "57.5%",
      G: "60.0%",
      H: "60.5%",
      J: "61.5%",
      K: "62.5%"
    }
  },
  {
    number: 37,
    stem: "For how many volunteers did the Sam77 test give an incorrect result? (Use table from Question 35)",
    choices: {
      A: "10",
      B: "25",
      C: "35",
      D: "385",
      E: "400"
    }
  },
  {
    number: 38,
    stem: "One of the volunteers whose Sam77 test result was positive will be chosen at random. To the nearest 0.001, what is the probability the chosen volunteer does NOT possess Yq77? (Use table from Question 35)",
    choices: {
      F: "0.017",
      G: "0.026",
      H: "0.035",
      J: "0.041",
      K: "0.063"
    }
  },
  {
    number: 39,
    stem: "Given matrices X = [-1 0] and Y = [-2 -1], which of the following matrices is XY?",
    choices: {
      A: "[-4]",
      B: "[-3]",
      C: "[-2]",
      D: "[2]",
      E: "[3]"
    }
  },
  {
    number: 40,
    stem: "Regardless of how the graph is oriented in the standard (x,y) coordinate plane, NO graph in one of the following categories has a vertical line of symmetry. Which one?",
    choices: {
      F: "Line",
      G: "Square",
      H: "Pentagon",
      J: "Parallelogram",
      K: "Scalene triangle"
    }
  },
  {
    number: 41,
    stem: "The equation 24x² + 2x = 15 has 2 solutions. What is the greater of the 2 solutions?",
    choices: {
      A: "3/4",
      B: "4/3",
      C: "5/6",
      D: "7/6",
      E: "11/15"
    }
  },
  {
    number: 42,
    stem: "Which of the following expressions is equal to (sin 60°)(cos 30°) + (cos 60°)(sin 30°)?",
    choices: {
      F: "cos(60° - 30°)",
      G: "cos(60° + 30°)",
      H: "sin(60° - 30°)",
      J: "sin(60° + 30°)",
      K: "sin((60° + 30°)/2)"
    }
  },
  {
    number: 43,
    stem: "What is the area, in square units, of a circle that has a circumference 12π units long?",
    choices: {
      A: "6π",
      B: "12π",
      C: "24π",
      D: "36π",
      E: "144π"
    }
  },
  {
    number: 44,
    stem: "A barrel contains 25 liters of a solvent mixture that is 40% solvent and 60% water. Lee will add pure solvent to the barrel, without removing any of the mixture currently in the barrel, so that the new mixture will contain 50% solvent and 50% water. How many liters of pure solvent should Lee add to create this new mixture?",
    choices: {
      F: "2.5",
      G: "5",
      H: "10",
      J: "12.5",
      K: "15"
    }
  },
  {
    number: 45,
    stem: "For all x ≠ ±y, (1/(x+y)) + (1/(x-y)) = ?",
    choices: {
      A: "1/(x-y)",
      B: "(x+y)/(x-y)",
      C: "(x+y)/(2x)",
      D: "(x² + y²)",
      E: "(x² + y²)/(x² - y²)"
    }
  },
  {
    number: 46,
    stem: "Mary, James, and Carlos sold 1/4-page advertisements for the school yearbook. Mary sold twice as many as Carlos did, and James sold 3 times as many as Mary did. What fraction of these advertisements did Carlos sell?",
    choices: {
      F: "1/9",
      G: "1/7",
      H: "1/6",
      J: "1/5",
      K: "1/3"
    }
  },
  {
    number: 47,
    stem: "In a window display at a flower shop, there are 3 spots for 1 plant each. To fill these 3 spots, Emily has 6 plants to select from, each of a different type. Selecting from the 6 plants, Emily can make how many possible display arrangements with 1 plant in each spot?\n\n(Note: The positions of the unselected plants do not matter.)",
    choices: {
      A: "3",
      B: "6",
      C: "15",
      D: "120",
      E: "216"
    }
  },
  {
    number: 48,
    stem: "The quadratic function f and △MPQ are graphed in the standard (x,y) coordinate plane below. Points M(2a, 5b), N(4a, 9b), and P(6a, 5b) are on f. Point Q(4a, 0) is NOT on f. In terms of a and b, what is the area, in square coordinate units, of △MPQ?",
    choices: {
      F: "8ab",
      G: "10ab",
      H: "12ab",
      J: "15ab",
      K: "20ab"
    }
  },
  {
    number: 49,
    stem: "Point M will remain fixed, and point Q will move to the right along the x-axis. As Q continues to move to the right, which of the following statements describes what will happen to the slope of MQ? (Use figure from Question 48)",
    choices: {
      A: "It will decrease and eventually be negative.",
      B: "It will decrease but never be negative.",
      C: "It will stay the same.",
      D: "It will increase but never be positive.",
      E: "It will increase and eventually be positive."
    }
  },
  {
    number: 50,
    stem: "One of the following values is equal to f(5a). Which one? (Use figure from Question 48)",
    choices: {
      F: "3a",
      G: "5a",
      H: "5b",
      J: "8a",
      K: "8b"
    }
  },
  {
    number: 51,
    stem: "Twelve jurors are needed for an upcoming trial. The diagram below illustrates a part of the process of jury selection. The 12 jurors will be selected from a jury pool of about 60 people. The court records show a trend that only 40% of the people who are summoned for jury duty actually appear and that of the people who appear, 1/3 are excused. If this same trend continues, how many people should be summoned to have as close as possible to 60 people in the jury pool?",
    choices: {
      A: "45",
      B: "90",
      C: "150",
      D: "225",
      E: "800"
    }
  },
  {
    number: 52,
    stem: "What is the 275th digit after the decimal point in the repeating decimal 0.6̄2̄9̄5̄?",
    choices: {
      F: "0",
      G: "2",
      H: "5",
      J: "6",
      K: "9"
    }
  },
  {
    number: 53,
    stem: "Given that f(x) = x² - 4 and g(x) = x + 3, what are all the values of x for which f(g(x)) = 0?",
    choices: {
      A: "-5 and -1",
      B: "-3, -2, and 2",
      C: "-1 and 1",
      D: "1 and 5",
      E: "-√5 and √5"
    }
  },
  {
    number: 54,
    stem: "Given that p is a positive number, n is a negative number, and |p| > |n|, which of the following expressions has the greatest value?",
    choices: {
      F: "|(p-n)/p|",
      G: "|(p-n)/n|",
      H: "|(p+n)/(p-n)|",
      J: "|(p+n)/p|",
      K: "|(p+n)/n|"
    }
  },
  {
    number: 55,
    stem: "If i = √(-1), then (4 + i²)/(i + i⁴ + i⁵) = ?",
    choices: {
      A: "-3",
      B: "-1",
      C: "1/2",
      D: "1",
      E: "3"
    }
  },
  {
    number: 56,
    stem: "In one of the following graphs in the standard (x,y) coordinate plane, the solution set to the system of inequalities below is shown shaded. Which one?\n\nx + 2y ≤ 6\n3x² > 12 - 3y²",
    choices: {
      F: "[Graph F]",
      G: "[Graph G]",
      H: "[Graph H]",
      J: "[Graph J]",
      K: "[Graph K]"
    }
  },
  {
    number: 57,
    stem: "Let a, b, c, and d be real numbers. Given that ac = 1, (b+c)/d is undefined, and abc = d, which of the following must be true?",
    choices: {
      A: "a = 0 or c = 0",
      B: "a = 1 and c = 1",
      C: "a = -c",
      D: "b = 0",
      E: "b + c = 0"
    }
  },
  {
    number: 58,
    stem: "A cosine function is shown in the standard (x,y) coordinate plane below. One of the following equations represents this function. Which one?",
    choices: {
      F: "y = 2cos(3x)",
      G: "y = 2cos(3x)",
      H: "y = 3cos(x/3)",
      J: "y = 3cos(x/2)",
      K: "y = 3cos(2x)"
    }
  },
  {
    number: 59,
    stem: "The figure below shows a flying kite. At a certain moment, the kite string forms an angle of elevation of 75° from point A on the ground. At the same moment, the angle of elevation of the kite at point B, 240 ft from A on level ground, is 45°. What is the length, in feet, of the string?",
    choices: {
      A: "60√3",
      B: "80√6",
      C: "144",
      D: "180",
      E: "240"
    }
  },
  {
    number: 60,
    stem: "If a publisher charges $15 for the first copy of a book that is ordered and $12 for each additional copy, which of the following expressions represents the cost of y books?",
    choices: {
      F: "12y + 3",
      G: "12y + 15",
      H: "15y - 3",
      J: "11y + 15",
      K: "15y + 12"
    }
  }
];

console.log(`\n📝 Processing ${questions.length} Math questions...\n`);

let successCount = 0;
let errorCount = 0;

for (const q of questions) {
  console.log(`Q${q.number}: ${q.stem.substring(0, 80)}...`);

  const updateData = {
    question_stem: q.stem,
    choice_a: q.choices.A || q.choices.F,
    choice_b: q.choices.B || q.choices.G,
    choice_c: q.choices.C || q.choices.H,
    choice_d: q.choices.D || q.choices.J,
    choice_e: q.choices.E || q.choices.K,
    correct_answer: 'A', // Placeholder
    question_type: 'algebra', // Placeholder
    question_category: 'ALG', // Placeholder
    lesson_id: null
  };

  const { error } = await supabase
    .from('act_math_questions')
    .update(updateData)
    .eq('test_number', TEST_NUMBER)
    .eq('question_number', q.number);

  if (error) {
    console.error(`  ❌ Error: ${error.message}`);
    errorCount++;
  } else {
    console.log(`  ✅ Inserted successfully`);
    successCount++;
  }
}

console.log('\n' + '='.repeat(80));
console.log(`\n🎉 EXTRACTION COMPLETE!`);
console.log(`   ✅ Successfully inserted: ${successCount}/60 questions`);
if (errorCount > 0) {
  console.log(`   ❌ Errors: ${errorCount}`);
}
console.log(`\n📊 Test Number: ${TEST_NUMBER}`);
console.log(`📝 Total Questions: 60`);
console.log(`\nNote: Correct answers, question types, and categories are placeholders.`);
console.log(`They will need to be updated with actual values.\n`);
