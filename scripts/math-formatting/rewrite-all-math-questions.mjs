import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const sb = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

console.log('📝 REWRITING ALL 60 MATH QUESTIONS TO ACT FORMAT\n');
console.log('='.repeat(80));
console.log('\nGenerating comprehensive ACT-style word problems with proper lingo...\n');

// Comprehensive ACT-style Math questions (60 questions)
const actStyleQuestions = [
  // Pre-Algebra & Elementary Algebra (Questions 1-15)
  {
    num: 1,
    text: "Maria purchased 3 notebooks at $2.50 each and 4 pens at $1.75 each. If she paid with a $20 bill, how much change did she receive?",
    choices: { A: "$5.50", B: "$6.00", C: "$8.50", D: "$11.50", E: "$14.00" },
    correct: "C"
  },
  {
    num: 2,
    text: "In a science class, the ratio of boys to girls is 3:5. If there are 15 boys in the class, how many girls are there?",
    choices: { A: "9", B: "18", C: "20", D: "25", E: "30" },
    correct: "D"
  },
  {
    num: 3,
    text: "The temperature at midnight was −8°F. By noon the next day, the temperature had risen 23°F. What was the temperature at noon?",
    choices: { A: "−31°F", B: "−15°F", C: "15°F", D: "23°F", E: "31°F" },
    correct: "C"
  },
  {
    num: 4,
    text: "A rectangular garden has a length of 24 feet and a width of 15 feet. If a fence is to be built around the entire perimeter of the garden, how many feet of fencing will be needed?",
    choices: { A: "39 feet", B: "54 feet", C: "78 feet", D: "156 feet", E: "360 feet" },
    correct: "C"
  },
  {
    num: 5,
    text: "Carlos scores 85, 92, and 88 on his first three math tests. What score must he earn on his fourth test to have an average of exactly 90?",
    choices: { A: "90", B: "92", C: "93", D: "95", E: "97" },
    correct: "D"
  },
  {
    num: 6,
    text: "If 3x + 7 = 28, what is the value of x?",
    choices: { A: "5", B: "7", C: "11", D: "21", E: "35" },
    correct: "B"
  },
  {
    num: 7,
    text: "At a bookstore, hardcover books cost $28 each and paperback books cost $12 each. Jennifer bought 2 hardcover books and 5 paperback books. What was the total cost of her purchase before tax?",
    choices: { A: "$40", B: "$80", C: "$96", D: "$116", E: "$140" },
    correct: "D"
  },
  {
    num: 8,
    text: "What is 18% of 250?",
    choices: { A: "13.9", B: "32", C: "45", D: "68", E: "232" },
    correct: "C"
  },
  {
    num: 9,
    text: "A car rental company charges a flat fee of $45 plus $0.35 for each mile driven. If Ahmed rents a car and drives it 180 miles, what will be the total rental cost?",
    choices: { A: "$63.00", B: "$80.00", C: "$90.00", D: "$108.00", E: "$225.00" },
    correct: "D"
  },
  {
    num: 10,
    text: "In a survey of 200 students, 35% said they prefer soccer, 25% said they prefer basketball, and the rest said they prefer baseball. How many students prefer baseball?",
    choices: { A: "40", B: "50", C: "70", D: "80", E: "110" },
    correct: "D"
  },
  {
    num: 11,
    text: "If 5(2x − 3) = 25, what is the value of x?",
    choices: { A: "2", B: "4", C: "5", D: "7", E: "8" },
    correct: "B"
  },
  {
    num: 12,
    text: "A recipe calls for 2/3 cup of sugar to make 12 cookies. How many cups of sugar are needed to make 30 cookies?",
    choices: { A: "1 cup", B: "1 1/3 cups", C: "1 2/3 cups", D: "2 cups", E: "2 1/3 cups" },
    correct: "C"
  },
  {
    num: 13,
    text: "The expression 4(x + 5) − 2(3x − 1) is equivalent to which of the following?",
    choices: { A: "−2x + 18", B: "−2x + 22", C: "2x + 18", D: "10x + 18", E: "10x + 22" },
    correct: "B"
  },
  {
    num: 14,
    text: "A movie theater has 18 rows of seats with 22 seats in each row. If 75% of the seats are occupied during a showing, how many seats are occupied?",
    choices: { A: "297", B: "300", C: "330", D: "360", E: "396" },
    correct: "A"
  },
  {
    num: 15,
    text: "If x² = 64 and x < 0, what is the value of x?",
    choices: { A: "−32", B: "−16", C: "−8", D: "8", E: "32" },
    correct: "C"
  },

  // Intermediate Algebra & Coordinate Geometry (Questions 16-35)
  {
    num: 16,
    text: "In the standard (x,y) coordinate plane, what is the distance between the points (−3,4) and (5,−2)?",
    choices: { A: "6", B: "8", C: "10", D: "12", E: "14" },
    correct: "C"
  },
  {
    num: 17,
    text: "The slope of a line in the standard (x,y) coordinate plane is −3/4. If the line passes through the point (8,2), what is the y-intercept of the line?",
    choices: { A: "−4", B: "−2", C: "2", D: "6", E: "8" },
    correct: "E"
  },
  {
    num: 18,
    text: "Which of the following is a factor of the expression x² − 7x + 12?",
    choices: { A: "(x − 2)", B: "(x − 6)", C: "(x + 3)", D: "(x + 4)", E: "(x + 6)" },
    correct: "D"
  },
  {
    num: 19,
    text: "In the standard (x,y) coordinate plane, the graph of the equation 2x + 3y = 12 intersects the y-axis at what point?",
    choices: { A: "(0,2)", B: "(0,4)", C: "(0,6)", D: "(2,0)", E: "(6,0)" },
    correct: "B"
  },
  {
    num: 20,
    text: "For all x > 0, which of the following expressions is equivalent to (3x²)³?",
    choices: { A: "9x⁵", B: "9x⁶", C: "27x⁵", D: "27x⁶", E: "81x⁶" },
    correct: "D"
  },
  {
    num: 21,
    text: "A parabola in the standard (x,y) coordinate plane has vertex (−2,5) and passes through the point (0,1). Which of the following could be the equation of the parabola?",
    choices: { A: "y = −(x + 2)² + 5", B: "y = −(x − 2)² + 5", C: "y = (x + 2)² + 5", D: "y = (x − 2)² + 5", E: "y = −x² + 5" },
    correct: "A"
  },
  {
    num: 22,
    text: "If f(x) = 2x² − 5x + 3, what is the value of f(−2)?",
    choices: { A: "−5", B: "1", C: "13", D: "21", E: "25" },
    correct: "D"
  },
  {
    num: 23,
    text: "The solution to the inequality 5x − 8 > 2x + 7 is:",
    choices: { A: "x < −1", B: "x < 5", C: "x > −1", D: "x > 3", E: "x > 5" },
    correct: "E"
  },
  {
    num: 24,
    text: "For what value of k will the system of equations 2x + 3y = 12 and 4x + ky = 8 have no solution?",
    choices: { A: "−6", B: "−3", C: "3", D: "6", E: "12" },
    correct: "D"
  },
  {
    num: 25,
    text: "In the standard (x,y) coordinate plane, what is the midpoint of the line segment with endpoints (−6,9) and (4,−3)?",
    choices: { A: "(−5,3)", B: "(−1,3)", C: "(−1,6)", D: "(1,3)", E: "(5,6)" },
    correct: "B"
  },
  {
    num: 26,
    text: "Which of the following is equivalent to the expression (2x + 3)(x − 5)?",
    choices: { A: "2x² − 7x − 15", B: "2x² − 15", C: "2x² + 13x − 15", D: "2x² − 7x + 15", E: "3x² − 2x − 15" },
    correct: "A"
  },
  {
    num: 27,
    text: "If log₂(x) = 5, what is the value of x?",
    choices: { A: "10", B: "16", C: "25", D: "32", E: "64" },
    correct: "D"
  },
  {
    num: 28,
    text: "In the standard (x,y) coordinate plane, a circle has center (3,−2) and radius 5 units. Which of the following is an equation of the circle?",
    choices: { A: "(x − 3)² + (y + 2)² = 5", B: "(x + 3)² + (y − 2)² = 5", C: "(x − 3)² + (y + 2)² = 25", D: "(x + 3)² + (y − 2)² = 25", E: "x² + y² = 25" },
    correct: "C"
  },
  {
    num: 29,
    text: "For all positive values of a and b, which of the following expressions is equivalent to √(16a⁴b⁶)?",
    choices: { A: "4a²b³", B: "4ab³", C: "8a²b³", D: "16a²b³", E: "16ab³" },
    correct: "A"
  },
  {
    num: 30,
    text: "If 3ˣ = 81, what is the value of x?",
    choices: { A: "3", B: "4", C: "9", D: "27", E: "243" },
    correct: "B"
  },
  {
    num: 31,
    text: "The graph of y = |x − 4| + 2 in the standard (x,y) coordinate plane has its vertex at which of the following points?",
    choices: { A: "(−4,2)", B: "(−4,−2)", C: "(2,4)", D: "(4,2)", E: "(4,−2)" },
    correct: "D"
  },
  {
    num: 32,
    text: "For all nonzero values of x and y, the expression (x³y⁵)²/(x²y³)³ is equivalent to:",
    choices: { A: "1", B: "y", C: "1/x³", D: "y/x³", E: "xy²" },
    correct: "A"
  },
  {
    num: 33,
    text: "What is the sum of the solutions to the equation x² − 8x + 12 = 0?",
    choices: { A: "−8", B: "−4", C: "4", D: "8", E: "12" },
    correct: "D"
  },
  {
    num: 34,
    text: "In the standard (x,y) coordinate plane, the line passing through (−2,5) and (4,k) has a slope of 2. What is the value of k?",
    choices: { A: "9", B: "11", C: "13", D: "15", E: "17" },
    correct: "E"
  },
  {
    num: 35,
    text: "If f(x) = 3x − 7 and g(x) = x² + 2, what is the value of g(f(2))?",
    choices: { A: "−3", B: "1", C: "3", D: "11", E: "23" },
    correct: "C"
  },

  // Plane Geometry & Trigonometry (Questions 36-50)
  {
    num: 36,
    text: "A triangle has side lengths of 5 cm, 12 cm, and 13 cm. What is the area of the triangle in square centimeters?",
    choices: { A: "30", B: "60", C: "65", D: "78", E: "156" },
    correct: "A"
  },
  {
    num: 37,
    text: "In a circle with radius 8 inches, a central angle measures 45°. What is the length of the arc intercepted by this angle, in inches?",
    choices: { A: "π", B: "2π", C: "4π", D: "8π", E: "16π" },
    correct: "B"
  },
  {
    num: 38,
    text: "A rectangular prism has dimensions of 6 cm by 8 cm by 10 cm. What is the volume of the prism in cubic centimeters?",
    choices: { A: "24", B: "48", C: "240", D: "480", E: "960" },
    correct: "D"
  },
  {
    num: 39,
    text: "In the right triangle shown, if one leg has length 9 and the hypotenuse has length 15, what is the length of the other leg?",
    choices: { A: "6", B: "8", C: "10", D: "12", E: "24" },
    correct: "D"
  },
  {
    num: 40,
    text: "A square has a diagonal of length 10√2 meters. What is the perimeter of the square in meters?",
    choices: { A: "10", B: "20", C: "40", D: "80", E: "100" },
    correct: "C"
  },
  {
    num: 41,
    text: "In right triangle ABC, angle C is the right angle. If sin A = 3/5, what is the value of cos B?",
    choices: { A: "3/5", B: "4/5", C: "3/4", D: "4/3", E: "5/3" },
    correct: "A"
  },
  {
    num: 42,
    text: "A cylinder has a radius of 5 cm and a height of 12 cm. What is the volume of the cylinder in cubic centimeters? (Use V = πr²h)",
    choices: { A: "60π", B: "120π", C: "300π", D: "600π", E: "720π" },
    correct: "C"
  },
  {
    num: 43,
    text: "Two parallel lines are cut by a transversal. If one of the alternate interior angles measures 68°, what is the measure of the other alternate interior angle?",
    choices: { A: "22°", B: "68°", C: "90°", D: "112°", E: "136°" },
    correct: "B"
  },
  {
    num: 44,
    text: "A regular hexagon has a perimeter of 42 inches. What is the length of one side of the hexagon in inches?",
    choices: { A: "6", B: "7", C: "8", D: "9", E: "10.5" },
    correct: "B"
  },
  {
    num: 45,
    text: "In a right triangle, if tan θ = 5/12, what is the value of sin θ?",
    choices: { A: "5/12", B: "5/13", C: "12/13", D: "12/5", E: "13/5" },
    correct: "B"
  },
  {
    num: 46,
    text: "A cone has a radius of 6 cm and a height of 8 cm. What is the volume of the cone in cubic centimeters? (Use V = (1/3)πr²h)",
    choices: { A: "48π", B: "96π", C: "144π", D: "288π", E: "384π" },
    correct: "B"
  },
  {
    num: 47,
    text: "In the standard (x,y) coordinate plane, what is the area of the triangle with vertices at (0,0), (6,0), and (6,8)?",
    choices: { A: "14", B: "24", C: "28", D: "48", E: "96" },
    correct: "B"
  },
  {
    num: 48,
    text: "A sphere has a radius of 9 cm. What is the surface area of the sphere in square centimeters? (Use A = 4πr²)",
    choices: { A: "81π", B: "162π", C: "243π", D: "324π", E: "972π" },
    correct: "D"
  },
  {
    num: 49,
    text: "In a circle, a chord is 16 cm long and is 6 cm from the center of the circle. What is the radius of the circle in centimeters?",
    choices: { A: "8", B: "10", C: "12", D: "14", E: "18" },
    correct: "B"
  },
  {
    num: 50,
    text: "If cos θ = 0.8 and θ is an acute angle, what is the value of sin θ?",
    choices: { A: "0.2", B: "0.4", C: "0.6", D: "0.8", E: "1.0" },
    correct: "C"
  },

  // Advanced Topics (Questions 51-60)
  {
    num: 51,
    text: "A sequence is defined by aₙ = 3n − 5. What is the value of a₁₀?",
    choices: { A: "25", B: "30", C: "35", D: "40", E: "45" },
    correct: "A"
  },
  {
    num: 52,
    text: "In how many different ways can a committee of 3 people be selected from a group of 8 people?",
    choices: { A: "24", B: "56", C: "168", D: "336", E: "512" },
    correct: "B"
  },
  {
    num: 53,
    text: "A bag contains 5 red marbles, 3 blue marbles, and 2 green marbles. If one marble is selected at random, what is the probability that it will be either red or blue?",
    choices: { A: "1/5", B: "3/10", C: "1/2", D: "3/5", E: "4/5" },
    correct: "E"
  },
  {
    num: 54,
    text: "The first term of a geometric sequence is 4 and the common ratio is 3. What is the 5th term of the sequence?",
    choices: { A: "108", B: "162", C: "243", D: "324", E: "972" },
    correct: "D"
  },
  {
    num: 55,
    text: "A fair six-sided die is rolled twice. What is the probability that the sum of the two rolls is 7?",
    choices: { A: "1/12", B: "1/9", C: "1/6", D: "1/5", E: "1/4" },
    correct: "C"
  },
  {
    num: 56,
    text: "The arithmetic mean of 5 numbers is 24. If one of the numbers is 18, what is the sum of the other 4 numbers?",
    choices: { A: "96", B: "102", C: "114", D: "120", E: "138" },
    correct: "B"
  },
  {
    num: 57,
    text: "Matrix A has dimensions 2×3 and matrix B has dimensions 3×4. What are the dimensions of the product matrix AB?",
    choices: { A: "2×3", B: "2×4", C: "3×3", D: "3×4", E: "4×3" },
    correct: "B"
  },
  {
    num: 58,
    text: "In a normal distribution, approximately what percentage of the data falls within 2 standard deviations of the mean?",
    choices: { A: "68%", B: "75%", C: "90%", D: "95%", E: "99%" },
    correct: "D"
  },
  {
    num: 59,
    text: "If i = √(−1), what is the value of i⁴?",
    choices: { A: "−1", B: "0", C: "1", D: "i", E: "−i" },
    correct: "C"
  },
  {
    num: 60,
    text: "A data set has the following values: 12, 15, 18, 18, 20, 22, 25. What is the median of this data set?",
    choices: { A: "15", B: "18", C: "19", D: "20", E: "22" },
    correct: "B"
  }
];

console.log(`✅ Generated ${actStyleQuestions.length} comprehensive ACT-style questions\n`);
console.log('='.repeat(80));
console.log('\n📊 SAMPLE QUESTIONS:\n');

// Show first 5 as examples
actStyleQuestions.slice(0, 5).forEach(q => {
  console.log(`Q${q.num} (${q.text.length} chars):`);
  console.log(q.text);
  console.log(`Choices: ${Object.keys(q.choices).join(', ')} | Correct: ${q.correct}`);
  console.log('');
});

console.log('='.repeat(80));
console.log('\n💾 UPDATING DATABASE...\n');

// Update each question in the database
let successCount = 0;
let errorCount = 0;

for (const q of actStyleQuestions) {
  // Convert choices object to JSON string array format
  const choicesArray = [
    `A. ${q.choices.A}`,
    `B. ${q.choices.B}`,
    `C. ${q.choices.C}`,
    `D. ${q.choices.D}`,
    `E. ${q.choices.E}`
  ];

  // Convert letter answer to number (A=1, B=2, C=3, D=4, E=5)
  const answerMap = { A: 1, B: 2, C: 3, D: 4, E: 5 };
  const correctAnswer = answerMap[q.correct];

  const { error } = await sb
    .from('practice_test_math_questions')
    .update({
      question_text: q.text,
      choices: JSON.stringify(choicesArray),
      correct_answer: correctAnswer
    })
    .eq('test_number', 1)
    .eq('question_number', q.num);

  if (error) {
    console.log(`  ❌ Error updating Q${q.num}: ${error.message}`);
    errorCount++;
  } else {
    successCount++;
    if (q.num % 10 === 0) {
      console.log(`  ✓ Updated questions 1-${q.num}...`);
    }
  }
}

console.log('\n' + '='.repeat(80));
console.log(`\n✅ UPDATE COMPLETE!`);
console.log(`   Successfully updated: ${successCount} questions`);
console.log(`   Errors: ${errorCount} questions`);
console.log('\n' + '='.repeat(80));

// Calculate new average length
const avgLength = actStyleQuestions.reduce((sum, q) => sum + q.text.length, 0) / actStyleQuestions.length;
console.log(`\n📏 NEW AVERAGE QUESTION LENGTH: ${avgLength.toFixed(0)} chars`);
console.log(`   Previous average: 37 chars`);
console.log(`   Improvement: ${((avgLength / 37) * 100).toFixed(0)}% increase`);
console.log('\n' + '='.repeat(80));
