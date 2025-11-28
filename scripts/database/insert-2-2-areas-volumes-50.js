require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const questions = [
  {
    pos: 1,
    diff: 'hard',
    text: 'A rectangle has length 12 cm and width 7 cm. What is its area?',
    ch: [
      {letter: 'A', text: '84 cm²'},
      {letter: 'B', text: '38 cm²'},
      {letter: 'C', text: '19 cm²'},
      {letter: 'D', text: '168 cm²'}
    ],
    ans: 'A',
    sol: '**Area of rectangle = length × width.**\n\n```\nArea = 12 × 7 = 84 cm²\n```\n\n**Key insight:** Multiply the two dimensions to get area.'
  },
  {
    pos: 2,
    diff: 'hard',
    text: 'A cube has edge length 5 inches. What is its volume?',
    ch: [
      {letter: 'A', text: '125 in³'},
      {letter: 'B', text: '25 in³'},
      {letter: 'C', text: '150 in³'},
      {letter: 'D', text: '75 in³'}
    ],
    ans: 'A',
    sol: '**Volume of cube = edge³.**\n\n```\nVolume = 5³ = 125 in³\n```\n\n**Key insight:** A cube has all edges equal, so volume is edge length cubed.'
  },
  {
    pos: 3,
    diff: 'hard',
    text: 'What is the area of a triangle with base 10 ft and height 6 ft?',
    ch: [
      {letter: 'A', text: '30 ft²'},
      {letter: 'B', text: '60 ft²'},
      {letter: 'C', text: '16 ft²'},
      {letter: 'D', text: '15 ft²'}
    ],
    ans: 'A',
    sol: '**Area of triangle = (1/2) × base × height.**\n\n```\nArea = (1/2) × 10 × 6\n     = (1/2) × 60\n     = 30 ft²\n```\n\n**Key insight:** Triangle area is half of base times height.'
  },
  {
    pos: 4,
    diff: 'hard',
    text: 'A rectangular prism has dimensions 8 cm × 5 cm × 3 cm. What is its volume?',
    ch: [
      {letter: 'A', text: '120 cm³'},
      {letter: 'B', text: '16 cm³'},
      {letter: 'C', text: '40 cm³'},
      {letter: 'D', text: '24 cm³'}
    ],
    ans: 'A',
    sol: '**Volume of rectangular prism = length × width × height.**\n\n```\nVolume = 8 × 5 × 3\n       = 120 cm³\n```\n\n**Key insight:** Multiply all three dimensions together.'
  },
  {
    pos: 5,
    diff: 'hard',
    text: 'A square has side length 9 meters. What is its area?',
    ch: [
      {letter: 'A', text: '81 m²'},
      {letter: 'B', text: '36 m²'},
      {letter: 'C', text: '18 m²'},
      {letter: 'D', text: '72 m²'}
    ],
    ans: 'A',
    sol: '**Area of square = side².**\n\n```\nArea = 9² = 81 m²\n```\n\n**Key insight:** Since all sides are equal, area is side squared.'
  },
  {
    pos: 6,
    diff: 'hard',
    text: 'A triangle has sides of length 8 cm, 15 cm, and 17 cm. What is its area? (Hint: It\'s a right triangle)',
    ch: [
      {letter: 'A', text: '60 cm²'},
      {letter: 'B', text: '120 cm²'},
      {letter: 'C', text: '68 cm²'},
      {letter: 'D', text: '102 cm²'}
    ],
    ans: 'A',
    sol: '**For a right triangle, area = (1/2) × leg₁ × leg₂.**\n\nSince 8² + 15² = 64 + 225 = 289 = 17², this is a right triangle with legs 8 and 15.\n\n```\nArea = (1/2) × 8 × 15\n     = (1/2) × 120\n     = 60 cm²\n```\n\n**Key insight:** In a right triangle, the two legs are the base and height.'
  },
  {
    pos: 7,
    diff: 'hard',
    text: 'A parallelogram has base 14 inches and height 9 inches. What is its area?',
    ch: [
      {letter: 'A', text: '126 in²'},
      {letter: 'B', text: '63 in²'},
      {letter: 'C', text: '46 in²'},
      {letter: 'D', text: '23 in²'}
    ],
    ans: 'A',
    sol: '**Area of parallelogram = base × height.**\n\n```\nArea = 14 × 9 = 126 in²\n```\n\n**Key insight:** Like a rectangle, parallelogram area is base times perpendicular height.'
  },
  {
    pos: 8,
    diff: 'hard',
    text: 'A trapezoid has bases of 10 cm and 16 cm, with height 8 cm. What is its area?',
    ch: [
      {letter: 'A', text: '104 cm²'},
      {letter: 'B', text: '128 cm²'},
      {letter: 'C', text: '80 cm²'},
      {letter: 'D', text: '208 cm²'}
    ],
    ans: 'A',
    sol: '**Area of trapezoid = (1/2) × (base₁ + base₂) × height.**\n\n```\nArea = (1/2) × (10 + 16) × 8\n     = (1/2) × 26 × 8\n     = (1/2) × 208\n     = 104 cm²\n```\n\n**Key insight:** Trapezoid area uses the average of the two bases times height.'
  },
  {
    pos: 9,
    diff: 'hard',
    text: 'A cylinder has radius 4 cm and height 10 cm. What is its volume? (Use π ≈ 3.14)',
    ch: [
      {letter: 'A', text: '502.4 cm³'},
      {letter: 'B', text: '125.6 cm³'},
      {letter: 'C', text: '251.2 cm³'},
      {letter: 'D', text: '40 cm³'}
    ],
    ans: 'A',
    sol: '**Volume of cylinder = πr²h.**\n\n```\nVolume = 3.14 × 4² × 10\n       = 3.14 × 16 × 10\n       = 3.14 × 160\n       = 502.4 cm³\n```\n\n**Key insight:** Cylinder volume is the base area (πr²) times height.'
  },
  {
    pos: 10,
    diff: 'hard',
    text: 'An equilateral triangle has side length 10 cm. If its height is 5√3 cm, what is its area?',
    ch: [
      {letter: 'A', text: '25√3 cm²'},
      {letter: 'B', text: '50√3 cm²'},
      {letter: 'C', text: '100 cm²'},
      {letter: 'D', text: '50 cm²'}
    ],
    ans: 'A',
    sol: '**Area = (1/2) × base × height.**\n\n```\nArea = (1/2) × 10 × 5√3\n     = 5 × 5√3\n     = 25√3 cm²\n```\n\n**Key insight:** The formula works for any triangle, including equilateral.'
  },
  {
    pos: 11,
    diff: 'hard',
    text: 'A sphere has radius 3 inches. What is its volume? (Use π ≈ 3.14 and V = (4/3)πr³)',
    ch: [
      {letter: 'A', text: '113.04 in³'},
      {letter: 'B', text: '28.26 in³'},
      {letter: 'C', text: '37.68 in³'},
      {letter: 'D', text: '84.78 in³'}
    ],
    ans: 'A',
    sol: '**Volume of sphere = (4/3)πr³.**\n\n```\nVolume = (4/3) × 3.14 × 3³\n       = (4/3) × 3.14 × 27\n       = (4/3) × 84.78\n       = 113.04 in³\n```\n\n**Key insight:** Cube the radius, multiply by π, then by 4/3.'
  },
  {
    pos: 12,
    diff: 'hard',
    text: 'A rhombus has diagonals of 12 cm and 16 cm. What is its area?',
    ch: [
      {letter: 'A', text: '96 cm²'},
      {letter: 'B', text: '192 cm²'},
      {letter: 'C', text: '48 cm²'},
      {letter: 'D', text: '28 cm²'}
    ],
    ans: 'A',
    sol: '**Area of rhombus = (1/2) × d₁ × d₂.**\n\n```\nArea = (1/2) × 12 × 16\n     = (1/2) × 192\n     = 96 cm²\n```\n\n**Key insight:** Rhombus area is half the product of its diagonals.'
  },
  {
    pos: 13,
    diff: 'hard',
    text: 'A cone has radius 6 cm and height 8 cm. What is its volume? (Use π ≈ 3.14 and V = (1/3)πr²h)',
    ch: [
      {letter: 'A', text: '301.44 cm³'},
      {letter: 'B', text: '904.32 cm³'},
      {letter: 'C', text: '150.72 cm³'},
      {letter: 'D', text: '452.16 cm³'}
    ],
    ans: 'A',
    sol: '**Volume of cone = (1/3)πr²h.**\n\n```\nVolume = (1/3) × 3.14 × 6² × 8\n       = (1/3) × 3.14 × 36 × 8\n       = (1/3) × 3.14 × 288\n       = (1/3) × 904.32\n       = 301.44 cm³\n```\n\n**Key insight:** Cone volume is 1/3 of cylinder volume with same base and height.'
  },
  {
    pos: 14,
    diff: 'hard',
    text: 'A right triangle has legs of 5 cm and 12 cm. What is its area?',
    ch: [
      {letter: 'A', text: '30 cm²'},
      {letter: 'B', text: '60 cm²'},
      {letter: 'C', text: '17 cm²'},
      {letter: 'D', text: '78 cm²'}
    ],
    ans: 'A',
    sol: '**Area = (1/2) × leg₁ × leg₂.**\n\n```\nArea = (1/2) × 5 × 12\n     = (1/2) × 60\n     = 30 cm²\n```\n\n**Key insight:** The legs of a right triangle are perpendicular, so they serve as base and height.'
  },
  {
    pos: 15,
    diff: 'hard',
    text: 'A rectangular garden is twice as long as it is wide. If the width is 8 feet, what is the area?',
    ch: [
      {letter: 'A', text: '128 ft²'},
      {letter: 'B', text: '64 ft²'},
      {letter: 'C', text: '48 ft²'},
      {letter: 'D', text: '96 ft²'}
    ],
    ans: 'A',
    sol: '**Find length, then calculate area.**\n\n```\nWidth = 8 ft\nLength = 2 × 8 = 16 ft\n\nArea = 8 × 16 = 128 ft²\n```\n\n**Key insight:** Use the relationship between dimensions to find the missing dimension.'
  },
  {
    pos: 16,
    diff: 'hard',
    text: 'A triangular prism has a triangular base with base 6 cm and height 4 cm. If the prism height is 10 cm, what is its volume?',
    ch: [
      {letter: 'A', text: '120 cm³'},
      {letter: 'B', text: '240 cm³'},
      {letter: 'C', text: '60 cm³'},
      {letter: 'D', text: '24 cm³'}
    ],
    ans: 'A',
    sol: '**Volume of prism = base area × height.**\n\n```\nBase area = (1/2) × 6 × 4 = 12 cm²\n\nVolume = 12 × 10 = 120 cm³\n```\n\n**Key insight:** For any prism, multiply the base area by the prism height.'
  },
  {
    pos: 17,
    diff: 'hard',
    text: 'A square pyramid has a base with side 8 m and height 12 m. What is its volume? (V = (1/3)Bh where B is base area)',
    ch: [
      {letter: 'A', text: '256 m³'},
      {letter: 'B', text: '768 m³'},
      {letter: 'C', text: '192 m³'},
      {letter: 'D', text: '128 m³'}
    ],
    ans: 'A',
    sol: '**Volume of pyramid = (1/3) × base area × height.**\n\n```\nBase area = 8² = 64 m²\n\nVolume = (1/3) × 64 × 12\n       = (1/3) × 768\n       = 256 m³\n```\n\n**Key insight:** Pyramid volume is 1/3 of a prism with the same base and height.'
  },
  {
    pos: 18,
    diff: 'hard',
    text: 'A circle has area 78.5 cm². What is its radius? (Use π ≈ 3.14)',
    ch: [
      {letter: 'A', text: '5 cm'},
      {letter: 'B', text: '25 cm'},
      {letter: 'C', text: '10 cm'},
      {letter: 'D', text: '2.5 cm'}
    ],
    ans: 'A',
    sol: '**Use the formula A = πr² and solve for r.**\n\n```\n78.5 = 3.14 × r²\nr² = 78.5 / 3.14\nr² = 25\nr = 5 cm\n```\n\n**Key insight:** Divide area by π, then take the square root.'
  },
  {
    pos: 19,
    diff: 'hard',
    text: 'An isosceles triangle has base 10 cm and equal sides of 13 cm each. If the height is 12 cm, what is its area?',
    ch: [
      {letter: 'A', text: '60 cm²'},
      {letter: 'B', text: '120 cm²'},
      {letter: 'C', text: '156 cm²'},
      {letter: 'D', text: '130 cm²'}
    ],
    ans: 'A',
    sol: '**Area = (1/2) × base × height.**\n\n```\nArea = (1/2) × 10 × 12\n     = (1/2) × 120\n     = 60 cm²\n```\n\n**Key insight:** The area formula works regardless of whether the triangle is isosceles.'
  },
  {
    pos: 20,
    diff: 'hard',
    text: 'A rectangular box has dimensions 10 in × 6 in × 4 in. What is its surface area?',
    ch: [
      {letter: 'A', text: '248 in²'},
      {letter: 'B', text: '124 in²'},
      {letter: 'C', text: '240 in²'},
      {letter: 'D', text: '200 in²'}
    ],
    ans: 'A',
    sol: '**Surface area = 2(lw + lh + wh).**\n\n```\nSA = 2(10×6 + 10×4 + 6×4)\n   = 2(60 + 40 + 24)\n   = 2(124)\n   = 248 in²\n```\n\n**Key insight:** Add the areas of all six rectangular faces.'
  },
  {
    pos: 21,
    diff: 'hard',
    text: 'A triangle has base 14 cm. If its area is 84 cm², what is its height?',
    ch: [
      {letter: 'A', text: '12 cm'},
      {letter: 'B', text: '6 cm'},
      {letter: 'C', text: '7 cm'},
      {letter: 'D', text: '24 cm'}
    ],
    ans: 'A',
    sol: '**Use A = (1/2)bh and solve for h.**\n\n```\n84 = (1/2) × 14 × h\n84 = 7h\nh = 12 cm\n```\n\n**Key insight:** Rearrange the area formula to solve for the unknown dimension.'
  },
  {
    pos: 22,
    diff: 'hard',
    text: 'A cube has surface area 150 cm². What is the length of each edge?',
    ch: [
      {letter: 'A', text: '5 cm'},
      {letter: 'B', text: '25 cm'},
      {letter: 'C', text: '10 cm'},
      {letter: 'D', text: '15 cm'}
    ],
    ans: 'A',
    sol: '**Surface area of cube = 6s².**\n\n```\n6s² = 150\ns² = 25\ns = 5 cm\n```\n\n**Key insight:** A cube has 6 faces, each with area s².'
  },
  {
    pos: 23,
    diff: 'hard',
    text: 'A kite has diagonals of 18 inches and 10 inches. What is its area?',
    ch: [
      {letter: 'A', text: '90 in²'},
      {letter: 'B', text: '180 in²'},
      {letter: 'C', text: '45 in²'},
      {letter: 'D', text: '28 in²'}
    ],
    ans: 'A',
    sol: '**Area of kite = (1/2) × d₁ × d₂.**\n\n```\nArea = (1/2) × 18 × 10\n     = (1/2) × 180\n     = 90 in²\n```\n\n**Key insight:** A kite, like a rhombus, has area equal to half the product of its diagonals.'
  },
  {
    pos: 24,
    diff: 'hard',
    text: 'A semicircle has diameter 14 cm. What is its area? (Use π ≈ 3.14)',
    ch: [
      {letter: 'A', text: '76.93 cm²'},
      {letter: 'B', text: '153.86 cm²'},
      {letter: 'C', text: '38.465 cm²'},
      {letter: 'D', text: '307.72 cm²'}
    ],
    ans: 'A',
    sol: '**Area of semicircle = (1/2)πr².**\n\n```\nRadius = 14/2 = 7 cm\n\nArea = (1/2) × 3.14 × 7²\n     = (1/2) × 3.14 × 49\n     = (1/2) × 153.86\n     = 76.93 cm²\n```\n\n**Key insight:** A semicircle is half a circle.'
  },
  {
    pos: 25,
    diff: 'hard',
    text: 'A rectangular field is 40 m long and 25 m wide. If a square section with side 10 m is removed, what is the remaining area?',
    ch: [
      {letter: 'A', text: '900 m²'},
      {letter: 'B', text: '1000 m²'},
      {letter: 'C', text: '100 m²'},
      {letter: 'D', text: '800 m²'}
    ],
    ans: 'A',
    sol: '**Remaining area = rectangle area - square area.**\n\n```\nRectangle area = 40 × 25 = 1000 m²\nSquare area = 10² = 100 m²\n\nRemaining = 1000 - 100 = 900 m²\n```\n\n**Key insight:** Subtract the removed area from the original area.'
  },
  {
    pos: 26,
    diff: 'hard',
    text: 'A triangle has vertices at (0,0), (8,0), and (0,6) on a coordinate plane. What is its area?',
    ch: [
      {letter: 'A', text: '24 square units'},
      {letter: 'B', text: '48 square units'},
      {letter: 'C', text: '14 square units'},
      {letter: 'D', text: '12 square units'}
    ],
    ans: 'A',
    sol: '**Use the base and height from the coordinates.**\n\n```\nBase = 8 (along x-axis)\nHeight = 6 (along y-axis)\n\nArea = (1/2) × 8 × 6 = 24 square units\n```\n\n**Key insight:** The triangle is a right triangle with legs along the axes.'
  },
  {
    pos: 27,
    diff: 'hard',
    text: 'A cylindrical tank has diameter 10 feet and height 15 feet. What is its volume? (Use π ≈ 3.14)',
    ch: [
      {letter: 'A', text: '1177.5 ft³'},
      {letter: 'B', text: '471 ft³'},
      {letter: 'C', text: '4710 ft³'},
      {letter: 'D', text: '150 ft³'}
    ],
    ans: 'A',
    sol: '**Volume = πr²h.**\n\n```\nRadius = 10/2 = 5 ft\n\nVolume = 3.14 × 5² × 15\n       = 3.14 × 25 × 15\n       = 3.14 × 375\n       = 1177.5 ft³\n```\n\n**Key insight:** Don\'t forget to divide diameter by 2 to get radius.'
  },
  {
    pos: 28,
    diff: 'hard',
    text: 'An equilateral triangle has area 16√3 cm². What is the length of each side?',
    ch: [
      {letter: 'A', text: '8 cm'},
      {letter: 'B', text: '4 cm'},
      {letter: 'C', text: '16 cm'},
      {letter: 'D', text: '4√3 cm'}
    ],
    ans: 'A',
    sol: '**Area of equilateral triangle = (s²√3)/4.**\n\n```\n16√3 = (s²√3)/4\n64√3 = s²√3\n64 = s²\ns = 8 cm\n```\n\n**Key insight:** For equilateral triangles, use the special formula involving √3.'
  },
  {
    pos: 29,
    diff: 'hard',
    text: 'A sphere has volume 288π cm³. What is its radius? (Use V = (4/3)πr³)',
    ch: [
      {letter: 'A', text: '6 cm'},
      {letter: 'B', text: '12 cm'},
      {letter: 'C', text: '216 cm'},
      {letter: 'D', text: '3 cm'}
    ],
    ans: 'A',
    sol: '**Solve for r using V = (4/3)πr³.**\n\n```\n288π = (4/3)πr³\n288 = (4/3)r³\n864 = 4r³\n216 = r³\nr = 6 cm\n```\n\n**Key insight:** Divide both sides by π first to simplify.'
  },
  {
    pos: 30,
    diff: 'hard',
    text: 'A trapezoid has area 60 cm² and height 8 cm. If one base is 5 cm, what is the other base?',
    ch: [
      {letter: 'A', text: '10 cm'},
      {letter: 'B', text: '15 cm'},
      {letter: 'C', text: '7.5 cm'},
      {letter: 'D', text: '12 cm'}
    ],
    ans: 'A',
    sol: '**Use A = (1/2)(b₁ + b₂)h and solve for b₂.**\n\n```\n60 = (1/2)(5 + b₂) × 8\n60 = 4(5 + b₂)\n15 = 5 + b₂\nb₂ = 10 cm\n```\n\n**Key insight:** Rearrange the trapezoid area formula to find the unknown base.'
  },
  {
    pos: 31,
    diff: 'hard',
    text: 'A regular hexagon has perimeter 48 cm. If it can be divided into 6 equilateral triangles, what is the total area? (Use area of each triangle = (s²√3)/4)',
    ch: [
      {letter: 'A', text: '96√3 cm²'},
      {letter: 'B', text: '192√3 cm²'},
      {letter: 'C', text: '48√3 cm²'},
      {letter: 'D', text: '64√3 cm²'}
    ],
    ans: 'A',
    sol: '**Find side length, then calculate total area.**\n\n```\nSide length = 48/6 = 8 cm\n\nArea of one triangle = (8²√3)/4\n                     = (64√3)/4\n                     = 16√3 cm²\n\nTotal area = 6 × 16√3 = 96√3 cm²\n```\n\n**Key insight:** A regular hexagon can be divided into 6 equilateral triangles.'
  },
  {
    pos: 32,
    diff: 'hard',
    text: 'A cone and a cylinder have the same radius and height. If the cylinder volume is 600 cm³, what is the cone volume?',
    ch: [
      {letter: 'A', text: '200 cm³'},
      {letter: 'B', text: '300 cm³'},
      {letter: 'C', text: '1800 cm³'},
      {letter: 'D', text: '600 cm³'}
    ],
    ans: 'A',
    sol: '**Cone volume is 1/3 of cylinder volume.**\n\n```\nCone volume = (1/3) × 600\n            = 200 cm³\n```\n\n**Key insight:** V_cone = (1/3)πr²h and V_cylinder = πr²h, so cone is 1/3 of cylinder.'
  },
  {
    pos: 33,
    diff: 'hard',
    text: 'A square has diagonal 10√2 cm. What is its area?',
    ch: [
      {letter: 'A', text: '100 cm²'},
      {letter: 'B', text: '200 cm²'},
      {letter: 'C', text: '50 cm²'},
      {letter: 'D', text: '100√2 cm²'}
    ],
    ans: 'A',
    sol: '**For a square, diagonal = s√2.**\n\n```\ns√2 = 10√2\ns = 10 cm\n\nArea = s² = 100 cm²\n```\n\n**Key insight:** In a square, the diagonal is √2 times the side length.'
  },
  {
    pos: 34,
    diff: 'hard',
    text: 'A right triangle has hypotenuse 13 cm and one leg 5 cm. What is its area?',
    ch: [
      {letter: 'A', text: '30 cm²'},
      {letter: 'B', text: '65 cm²'},
      {letter: 'C', text: '32.5 cm²'},
      {letter: 'D', text: '78 cm²'}
    ],
    ans: 'A',
    sol: '**Find the other leg using Pythagorean theorem.**\n\n```\n5² + b² = 13²\n25 + b² = 169\nb² = 144\nb = 12 cm\n\nArea = (1/2) × 5 × 12 = 30 cm²\n```\n\n**Key insight:** This is the 5-12-13 Pythagorean triple.'
  },
  {
    pos: 35,
    diff: 'hard',
    text: 'A parallelogram has sides 10 cm and 15 cm, with the perpendicular distance between the 15 cm sides being 8 cm. What is its area?',
    ch: [
      {letter: 'A', text: '120 cm²'},
      {letter: 'B', text: '80 cm²'},
      {letter: 'C', text: '150 cm²'},
      {letter: 'D', text: '240 cm²'}
    ],
    ans: 'A',
    sol: '**Area = base × height.**\n\nThe base is 15 cm and the perpendicular height is 8 cm.\n\n```\nArea = 15 × 8 = 120 cm²\n```\n\n**Key insight:** Use the base corresponding to the given height.'
  },
  {
    pos: 36,
    diff: 'hard',
    text: 'A cube has volume 343 cm³. What is its surface area?',
    ch: [
      {letter: 'A', text: '294 cm²'},
      {letter: 'B', text: '343 cm²'},
      {letter: 'C', text: '147 cm²'},
      {letter: 'D', text: '49 cm²'}
    ],
    ans: 'A',
    sol: '**Find edge length from volume, then calculate surface area.**\n\n```\nVolume = s³\n343 = s³\ns = 7 cm\n\nSurface area = 6s²\n             = 6 × 7²\n             = 6 × 49\n             = 294 cm²\n```\n\n**Key insight:** Cube root of 343 is 7.'
  },
  {
    pos: 37,
    diff: 'hard',
    text: 'A circular ring (annulus) has outer radius 10 cm and inner radius 6 cm. What is its area? (Use π ≈ 3.14)',
    ch: [
      {letter: 'A', text: '200.96 cm²'},
      {letter: 'B', text: '314 cm²'},
      {letter: 'C', text: '113.04 cm²'},
      {letter: 'D', text: '100.48 cm²'}
    ],
    ans: 'A',
    sol: '**Area = area of outer circle - area of inner circle.**\n\n```\nOuter area = π × 10² = 3.14 × 100 = 314 cm²\nInner area = π × 6² = 3.14 × 36 = 113.04 cm²\n\nRing area = 314 - 113.04 = 200.96 cm²\n```\n\n**Key insight:** Subtract the smaller circle\'s area from the larger circle\'s area.'
  },
  {
    pos: 38,
    diff: 'hard',
    text: 'A triangle has sides 7 cm, 24 cm, and 25 cm. What is its area?',
    ch: [
      {letter: 'A', text: '84 cm²'},
      {letter: 'B', text: '168 cm²'},
      {letter: 'C', text: '175 cm²'},
      {letter: 'D', text: '56 cm²'}
    ],
    ans: 'A',
    sol: '**Check if it\'s a right triangle first.**\n\n```\n7² + 24² = 49 + 576 = 625 = 25²\n```\n\nIt\'s a right triangle with legs 7 and 24.\n\n```\nArea = (1/2) × 7 × 24\n     = (1/2) × 168\n     = 84 cm²\n```\n\n**Key insight:** This is the 7-24-25 Pythagorean triple.'
  },
  {
    pos: 39,
    diff: 'hard',
    text: 'A rectangular swimming pool is 25 m long, 10 m wide, and 2 m deep. How many cubic meters of water does it hold when full?',
    ch: [
      {letter: 'A', text: '500 m³'},
      {letter: 'B', text: '250 m³'},
      {letter: 'C', text: '70 m³'},
      {letter: 'D', text: '1000 m³'}
    ],
    ans: 'A',
    sol: '**Volume = length × width × depth.**\n\n```\nVolume = 25 × 10 × 2\n       = 500 m³\n```\n\n**Key insight:** The pool is a rectangular prism.'
  },
  {
    pos: 40,
    diff: 'hard',
    text: 'A triangle has area 50 cm² and height 10 cm. What is its base?',
    ch: [
      {letter: 'A', text: '10 cm'},
      {letter: 'B', text: '5 cm'},
      {letter: 'C', text: '100 cm'},
      {letter: 'D', text: '20 cm'}
    ],
    ans: 'A',
    sol: '**Use A = (1/2)bh and solve for b.**\n\n```\n50 = (1/2) × b × 10\n50 = 5b\nb = 10 cm\n```\n\n**Key insight:** Multiply area by 2, then divide by height.'
  },
  {
    pos: 41,
    diff: 'hard',
    text: 'A hemisphere has radius 9 cm. What is its volume? (Use π ≈ 3.14 and V_sphere = (4/3)πr³)',
    ch: [
      {letter: 'A', text: '1526.04 cm³'},
      {letter: 'B', text: '3052.08 cm³'},
      {letter: 'C', text: '763.02 cm³'},
      {letter: 'D', text: '381.51 cm³'}
    ],
    ans: 'A',
    sol: '**Hemisphere volume = (1/2) × sphere volume.**\n\n```\nSphere volume = (4/3) × 3.14 × 9³\n              = (4/3) × 3.14 × 729\n              = (4/3) × 2289.06\n              = 3052.08 cm³\n\nHemisphere = 3052.08 / 2 = 1526.04 cm³\n```\n\n**Key insight:** A hemisphere is half a sphere.'
  },
  {
    pos: 42,
    diff: 'hard',
    text: 'A square has perimeter 36 cm. What is its area?',
    ch: [
      {letter: 'A', text: '81 cm²'},
      {letter: 'B', text: '36 cm²'},
      {letter: 'C', text: '144 cm²'},
      {letter: 'D', text: '9 cm²'}
    ],
    ans: 'A',
    sol: '**Find side length from perimeter.**\n\n```\nPerimeter = 4s\n36 = 4s\ns = 9 cm\n\nArea = s² = 81 cm²\n```\n\n**Key insight:** Divide perimeter by 4 to get side length.'
  },
  {
    pos: 43,
    diff: 'hard',
    text: 'An isosceles right triangle has legs of length 8 cm each. What is its area?',
    ch: [
      {letter: 'A', text: '32 cm²'},
      {letter: 'B', text: '64 cm²'},
      {letter: 'C', text: '16 cm²'},
      {letter: 'D', text: '8√2 cm²'}
    ],
    ans: 'A',
    sol: '**Area = (1/2) × leg₁ × leg₂.**\n\n```\nArea = (1/2) × 8 × 8\n     = (1/2) × 64\n     = 32 cm²\n```\n\n**Key insight:** In an isosceles right triangle (45-45-90), the two legs are equal.'
  },
  {
    pos: 44,
    diff: 'hard',
    text: 'A rectangular prism has volume 180 cm³, length 6 cm, and width 5 cm. What is its height?',
    ch: [
      {letter: 'A', text: '6 cm'},
      {letter: 'B', text: '30 cm'},
      {letter: 'C', text: '3 cm'},
      {letter: 'D', text: '36 cm'}
    ],
    ans: 'A',
    sol: '**Use V = lwh and solve for h.**\n\n```\n180 = 6 × 5 × h\n180 = 30h\nh = 6 cm\n```\n\n**Key insight:** Divide volume by the product of length and width.'
  },
  {
    pos: 45,
    diff: 'hard',
    text: 'A circle has circumference 31.4 cm. What is its area? (Use π ≈ 3.14)',
    ch: [
      {letter: 'A', text: '78.5 cm²'},
      {letter: 'B', text: '31.4 cm²'},
      {letter: 'C', text: '314 cm²'},
      {letter: 'D', text: '15.7 cm²'}
    ],
    ans: 'A',
    sol: '**Find radius from circumference, then calculate area.**\n\n```\nC = 2πr\n31.4 = 2 × 3.14 × r\n31.4 = 6.28r\nr = 5 cm\n\nArea = πr²\n     = 3.14 × 5²\n     = 3.14 × 25\n     = 78.5 cm²\n```\n\n**Key insight:** First find radius, then use it to find area.'
  },
  {
    pos: 46,
    diff: 'hard',
    text: 'A trapezoid has parallel sides of 8 m and 12 m. If its area is 70 m², what is its height?',
    ch: [
      {letter: 'A', text: '7 m'},
      {letter: 'B', text: '10 m'},
      {letter: 'C', text: '14 m'},
      {letter: 'D', text: '5 m'}
    ],
    ans: 'A',
    sol: '**Use A = (1/2)(b₁ + b₂)h and solve for h.**\n\n```\n70 = (1/2)(8 + 12) × h\n70 = (1/2)(20) × h\n70 = 10h\nh = 7 m\n```\n\n**Key insight:** Divide twice the area by the sum of the bases.'
  },
  {
    pos: 47,
    diff: 'hard',
    text: 'A right triangle has area 96 cm² and one leg measuring 16 cm. What is the other leg?',
    ch: [
      {letter: 'A', text: '12 cm'},
      {letter: 'B', text: '6 cm'},
      {letter: 'C', text: '24 cm'},
      {letter: 'D', text: '8 cm'}
    ],
    ans: 'A',
    sol: '**Use A = (1/2) × leg₁ × leg₂.**\n\n```\n96 = (1/2) × 16 × leg₂\n96 = 8 × leg₂\nleg₂ = 12 cm\n```\n\n**Key insight:** Divide twice the area by the known leg.'
  },
  {
    pos: 48,
    diff: 'hard',
    text: 'A cylinder has volume 1256 cm³ and height 10 cm. What is its radius? (Use π ≈ 3.14)',
    ch: [
      {letter: 'A', text: '√40 cm ≈ 6.32 cm'},
      {letter: 'B', text: '40 cm'},
      {letter: 'C', text: '20 cm'},
      {letter: 'D', text: '10 cm'}
    ],
    ans: 'A',
    sol: '**Use V = πr²h and solve for r.**\n\n```\n1256 = 3.14 × r² × 10\n1256 = 31.4r²\nr² = 40\nr = √40 ≈ 6.32 cm\n```\n\n**Key insight:** Divide volume by πh, then take the square root.'
  },
  {
    pos: 49,
    diff: 'hard',
    text: 'A rhombus has side 13 cm and one diagonal 24 cm. If the area is 120 cm², what is the other diagonal?',
    ch: [
      {letter: 'A', text: '10 cm'},
      {letter: 'B', text: '5 cm'},
      {letter: 'C', text: '20 cm'},
      {letter: 'D', text: '15 cm'}
    ],
    ans: 'A',
    sol: '**Use A = (1/2) × d₁ × d₂.**\n\n```\n120 = (1/2) × 24 × d₂\n120 = 12 × d₂\nd₂ = 10 cm\n```\n\n**Key insight:** Divide twice the area by the known diagonal.'
  },
  {
    pos: 50,
    diff: 'hard',
    text: 'A square pyramid has base edge 6 m and slant height 5 m. What is the lateral surface area (area of the 4 triangular faces)?',
    ch: [
      {letter: 'A', text: '60 m²'},
      {letter: 'B', text: '120 m²'},
      {letter: 'C', text: '30 m²'},
      {letter: 'D', text: '36 m²'}
    ],
    ans: 'A',
    sol: '**Lateral area = (1/2) × perimeter × slant height.**\n\n```\nPerimeter of base = 4 × 6 = 24 m\n\nLateral area = (1/2) × 24 × 5\n             = 12 × 5\n             = 60 m²\n```\n\n**Key insight:** Each triangular face has base 6 m and height (slant height) 5 m.'
  }
];

async function insertQuestions() {
  console.log('Finding lesson...');

  const { data: lesson, error: lessonError } = await supabase
    .from('lessons')
    .select('id')
    .eq('lesson_key', '2.2')
    .single();

  if (lessonError) {
    console.error('Error finding lesson 2.2:', lessonError);
    return;
  }

  console.log(`Found lesson 2.2 with ID: ${lesson.id}\n`);

  let successCount = 0;
  let errorCount = 0;

  for (const q of questions) {
    const questionData = {
      lesson_id: lesson.id,
      subject: 'math',
      position: q.pos,
      difficulty: q.diff,
      title: `Areas, Volumes & Triangles Question ${q.pos}`,
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
