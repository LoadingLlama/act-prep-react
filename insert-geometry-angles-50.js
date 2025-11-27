require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const questions = [
  {
    pos: 1,
    diff: 'hard',
    text: 'Two parallel lines are cut by a transversal. If one angle measures 115°, what is the measure of its corresponding angle?',
    ch: [
      {letter: 'A', text: '115°'},
      {letter: 'B', text: '65°'},
      {letter: 'C', text: '180°'},
      {letter: 'D', text: '90°'},
          ],
    ans: 'A',
    sol: '**Corresponding angles are equal when lines are parallel.**\n\n```\nCorresponding angle = 115°\n```\n\n**Key insight:** When a transversal crosses parallel lines, corresponding angles (same position on each line) are congruent.'
  },
  {
    pos: 2,
    diff: 'hard',
    text: 'In a triangle, if two angles measure 45° and 65°, what is the measure of the third angle?',
    ch: [
      {letter: 'A', text: '70°'},
      {letter: 'B', text: '110°'},
      {letter: 'C', text: '55°'},
      {letter: 'D', text: '180°'},
          ],
    ans: 'A',
    sol: '**The sum of angles in a triangle is 180°.**\n\n```\n45° + 65° + x = 180°\n110° + x = 180°\nx = 70°\n```\n\n**Key insight:** Always use the triangle angle sum property: all three angles add to 180°.'
  },
  {
    pos: 3,
    diff: 'hard',
    text: 'What is the measure of each interior angle of a regular hexagon?',
    ch: [
      {letter: 'A', text: '120°'},
      {letter: 'B', text: '108°'},
      {letter: 'C', text: '135°'},
      {letter: 'D', text: '60°'},
          ],
    ans: 'A',
    sol: '**Use the formula: (n-2) × 180° / n for a regular n-gon.**\n\n```\nFor hexagon, n = 6\nEach angle = (6-2) × 180° / 6\n           = 4 × 180° / 6\n           = 720° / 6\n           = 120°\n```\n\n**Key insight:** In a regular polygon, all interior angles are equal.'
  },
  {
    pos: 4,
    diff: 'hard',
    text: 'Two angles are supplementary. If one angle is 3 times the other, what is the measure of the smaller angle?',
    ch: [
      {letter: 'A', text: '45°'},
      {letter: 'B', text: '60°'},
      {letter: 'C', text: '135°'},
      {letter: 'D', text: '30°'},
          ],
    ans: 'A',
    sol: '**Supplementary angles sum to 180°.**\n\nLet x = smaller angle, then 3x = larger angle.\n\n```\nx + 3x = 180°\n4x = 180°\nx = 45°\n```\n\n**Key insight:** Set up an equation using the definition of supplementary angles.'
  },
  {
    pos: 5,
    diff: 'hard',
    text: 'Vertical angles are formed by two intersecting lines. If one vertical angle measures 72°, what is the measure of the other vertical angle?',
    ch: [
      {letter: 'A', text: '72°'},
      {letter: 'B', text: '108°'},
      {letter: 'C', text: '36°'},
      {letter: 'D', text: '18°'},
          ],
    ans: 'A',
    sol: '**Vertical angles are always equal.**\n\n```\nOther vertical angle = 72°\n```\n\n**Key insight:** Vertical angles (opposite angles formed by intersecting lines) are congruent.'
  },
  {
    pos: 6,
    diff: 'hard',
    text: 'An exterior angle of a triangle measures 130°. If one remote interior angle is 75°, what is the other remote interior angle?',
    ch: [
      {letter: 'A', text: '55°'},
      {letter: 'B', text: '50°'},
      {letter: 'C', text: '205°'},
      {letter: 'D', text: '105°'},
          ],
    ans: 'A',
    sol: '**Exterior angle equals sum of remote interior angles.**\n\n```\nExterior angle = remote angle 1 + remote angle 2\n130° = 75° + x\nx = 55°\n```\n\n**Key insight:** The exterior angle theorem states that an exterior angle equals the sum of the two non-adjacent interior angles.'
  },
  {
    pos: 7,
    diff: 'hard',
    text: 'Two parallel lines are cut by a transversal. If one angle is 58°, what is its alternate interior angle?',
    ch: [
      {letter: 'A', text: '58°'},
      {letter: 'B', text: '122°'},
      {letter: 'C', text: '32°'},
      {letter: 'D', text: '148°'},
          ],
    ans: 'A',
    sol: '**Alternate interior angles are equal when lines are parallel.**\n\n```\nAlternate interior angle = 58°\n```\n\n**Key insight:** Alternate interior angles are on opposite sides of the transversal and between the parallel lines, and they\'re congruent.'
  },
  {
    pos: 8,
    diff: 'hard',
    text: 'What is the sum of the exterior angles of any polygon (one at each vertex)?',
    ch: [
      {letter: 'A', text: '360°'},
      {letter: 'B', text: '180°'},
      {letter: 'C', text: '540°'},
      {letter: 'D', text: 'Depends on the number of sides'},
          ],
    ans: 'A',
    sol: '**The sum of exterior angles is always 360° for any polygon.**\n\n```\nSum of exterior angles = 360°\n```\n\n**Key insight:** This is true regardless of the number of sides - the exterior angles always sum to one complete rotation.'
  },
  {
    pos: 9,
    diff: 'hard',
    text: 'In an isosceles triangle, the vertex angle is 80°. What is the measure of each base angle?',
    ch: [
      {letter: 'A', text: '50°'},
      {letter: 'B', text: '40°'},
      {letter: 'C', text: '100°'},
      {letter: 'D', text: '80°'},
          ],
    ans: 'A',
    sol: '**In an isosceles triangle, base angles are equal.**\n\nLet x = each base angle.\n\n```\n80° + x + x = 180°\n80° + 2x = 180°\n2x = 100°\nx = 50°\n```\n\n**Key insight:** The two angles opposite the equal sides in an isosceles triangle are congruent.'
  },
  {
    pos: 10,
    diff: 'hard',
    text: 'Two angles are complementary. If one angle is twice the other, what is the measure of the larger angle?',
    ch: [
      {letter: 'A', text: '60°'},
      {letter: 'B', text: '30°'},
      {letter: 'C', text: '45°'},
      {letter: 'D', text: '90°'},
          ],
    ans: 'A',
    sol: '**Complementary angles sum to 90°.**\n\nLet x = smaller angle, then 2x = larger angle.\n\n```\nx + 2x = 90°\n3x = 90°\nx = 30°\n\nLarger angle = 2x = 60°\n```\n\n**Key insight:** Set up an equation using the complementary angle relationship.'
  },
  {
    pos: 11,
    diff: 'hard',
    text: 'The angles of a quadrilateral are in the ratio 2:3:4:6. What is the measure of the largest angle?',
    ch: [
      {letter: 'A', text: '144°'},
      {letter: 'B', text: '72°'},
      {letter: 'C', text: '96°'},
      {letter: 'D', text: '120°'},
          ],
    ans: 'A',
    sol: '**The sum of angles in a quadrilateral is 360°.**\n\n```\nRatio parts: 2 + 3 + 4 + 6 = 15 parts\nEach part = 360° / 15 = 24°\n\nLargest angle = 6 × 24° = 144°\n```\n\n**Key insight:** Use ratio parts to divide the total angle sum.'
  },
  {
    pos: 12,
    diff: 'hard',
    text: 'Two parallel lines are cut by a transversal. If one interior angle on the same side of the transversal is 110°, what is the other interior angle on the same side?',
    ch: [
      {letter: 'A', text: '70°'},
      {letter: 'B', text: '110°'},
      {letter: 'C', text: '90°'},
      {letter: 'D', text: '180°'},
          ],
    ans: 'A',
    sol: '**Same-side interior angles are supplementary when lines are parallel.**\n\n```\n110° + x = 180°\nx = 70°\n```\n\n**Key insight:** Co-interior angles (same-side interior angles) add up to 180° when the lines are parallel.'
  },
  {
    pos: 13,
    diff: 'hard',
    text: 'In a right triangle, one acute angle measures 35°. What is the measure of the other acute angle?',
    ch: [
      {letter: 'A', text: '55°'},
      {letter: 'B', text: '145°'},
      {letter: 'C', text: '90°'},
      {letter: 'D', text: '35°'},
          ],
    ans: 'A',
    sol: '**The two acute angles in a right triangle are complementary.**\n\n```\n90° + 35° + x = 180°\n125° + x = 180°\nx = 55°\n```\n\nAlternatively:\n```\n35° + x = 90°\nx = 55°\n```\n\n**Key insight:** In a right triangle, the two acute angles add to 90°.'
  },
  {
    pos: 14,
    diff: 'hard',
    text: 'What is the measure of each exterior angle of a regular pentagon?',
    ch: [
      {letter: 'A', text: '72°'},
      {letter: 'B', text: '108°'},
      {letter: 'C', text: '60°'},
      {letter: 'D', text: '120°'},
          ],
    ans: 'A',
    sol: '**Each exterior angle = 360° / n for a regular n-gon.**\n\n```\nFor pentagon, n = 5\nEach exterior angle = 360° / 5 = 72°\n```\n\n**Key insight:** The sum of all exterior angles is 360°, so divide by the number of sides.'
  },
  {
    pos: 15,
    diff: 'hard',
    text: 'An angle and its complement are in the ratio 1:2. What is the measure of the angle?',
    ch: [
      {letter: 'A', text: '30°'},
      {letter: 'B', text: '60°'},
      {letter: 'C', text: '45°'},
      {letter: 'D', text: '15°'},
          ],
    ans: 'A',
    sol: '**Use the ratio and complementary relationship.**\n\n```\nRatio parts: 1 + 2 = 3 parts\nTotal = 90° (complementary)\n\nEach part = 90° / 3 = 30°\n\nThe angle = 1 × 30° = 30°\n```\n\n**Key insight:** The angle is the smaller value in the 1:2 ratio.'
  },
  {
    pos: 16,
    diff: 'hard',
    text: 'Two lines intersect forming four angles. If one angle is 40°, what are the measures of the other three angles?',
    ch: [
      {letter: 'A', text: '40°, 140°, 140°'},
      {letter: 'B', text: '40°, 40°, 40°'},
      {letter: 'C', text: '140°, 140°, 140°'},
      {letter: 'D', text: '50°, 50°, 50°'},
          ],
    ans: 'A',
    sol: '**Vertical angles are equal, adjacent angles are supplementary.**\n\n```\nVertical angle to 40° = 40°\nAdjacent angles = 180° - 40° = 140° each\n\nFour angles: 40°, 140°, 40°, 140°\nOther three: 40°, 140°, 140°\n```\n\n**Key insight:** Intersecting lines create two pairs of vertical angles.'
  },
  {
    pos: 17,
    diff: 'hard',
    text: 'In a triangle, one angle is 3 times another, and the third angle is 20° more than the smallest. What is the measure of the largest angle?',
    ch: [
      {letter: 'A', text: '96°'},
      {letter: 'B', text: '32°'},
      {letter: 'C', text: '52°'},
      {letter: 'D', text: '64°'},
          ],
    ans: 'A',
    sol: '**Set up equations using angle sum = 180°.**\n\nLet x = smallest angle.\n```\nAngle 1 = x\nAngle 2 = 3x (largest)\nAngle 3 = x + 20°\n\nx + 3x + (x + 20°) = 180°\n5x + 20° = 180°\n5x = 160°\nx = 32°\n\nLargest = 3x = 96°\n```\n\n**Key insight:** Express all angles in terms of one variable, then solve.'
  },
  {
    pos: 18,
    diff: 'hard',
    text: 'What is the measure of each interior angle of a regular octagon?',
    ch: [
      {letter: 'A', text: '135°'},
      {letter: 'B', text: '120°'},
      {letter: 'C', text: '108°'},
      {letter: 'D', text: '140°'},
          ],
    ans: 'A',
    sol: '**Use the formula: (n-2) × 180° / n.**\n\n```\nFor octagon, n = 8\nEach angle = (8-2) × 180° / 8\n           = 6 × 180° / 8\n           = 1080° / 8\n           = 135°\n```\n\n**Key insight:** An octagon has 8 sides, so n = 8.'
  },
  {
    pos: 19,
    diff: 'hard',
    text: 'Two angles of a triangle are equal, each measuring 55°. What type of triangle is this?',
    ch: [
      {letter: 'A', text: 'Isosceles'},
      {letter: 'B', text: 'Equilateral'},
      {letter: 'C', text: 'Right'},
      {letter: 'D', text: 'Scalene'},
          ],
    ans: 'A',
    sol: '**A triangle with two equal angles is isosceles.**\n\nThe third angle:\n```\n55° + 55° + x = 180°\nx = 70°\n```\n\nSince two angles are equal, the triangle has two equal sides (opposite those angles), making it isosceles.\n\n**Key insight:** If two angles are equal, their opposite sides are also equal (isosceles triangle).'
  },
  {
    pos: 20,
    diff: 'hard',
    text: 'An angle is 15° less than twice its supplement. What is the measure of the angle?',
    ch: [
      {letter: 'A', text: '115°'},
      {letter: 'B', text: '65°'},
      {letter: 'C', text: '125°'},
      {letter: 'D', text: '55°'},
          ],
    ans: 'A',
    sol: '**Set up an equation.**\n\nLet x = the angle, then (180° - x) = its supplement.\n\n```\nx = 2(180° - x) - 15°\nx = 360° - 2x - 15°\nx = 345° - 2x\n3x = 345°\nx = 115°\n```\n\n**Key insight:** Translate the words into algebra carefully.'
  },
  {
    pos: 21,
    diff: 'hard',
    text: 'In a parallelogram, one angle measures 65°. What is the measure of the adjacent angle?',
    ch: [
      {letter: 'A', text: '115°'},
      {letter: 'B', text: '65°'},
      {letter: 'C', text: '180°'},
      {letter: 'D', text: '25°'},
          ],
    ans: 'A',
    sol: '**Consecutive angles in a parallelogram are supplementary.**\n\n```\n65° + x = 180°\nx = 115°\n```\n\n**Key insight:** Adjacent angles in a parallelogram add to 180°.'
  },
  {
    pos: 22,
    diff: 'hard',
    text: 'The acute angles of a right triangle are in the ratio 2:3. What is the measure of the smaller acute angle?',
    ch: [
      {letter: 'A', text: '36°'},
      {letter: 'B', text: '54°'},
      {letter: 'C', text: '30°'},
      {letter: 'D', text: '45°'},
          ],
    ans: 'A',
    sol: '**The acute angles sum to 90° in a right triangle.**\n\n```\nRatio parts: 2 + 3 = 5 parts\nTotal = 90°\n\nEach part = 90° / 5 = 18°\n\nSmaller angle = 2 × 18° = 36°\n```\n\n**Key insight:** Use the ratio to divide 90° (sum of acute angles in right triangle).'
  },
  {
    pos: 23,
    diff: 'hard',
    text: 'An equilateral triangle has all angles equal. What is the measure of each angle?',
    ch: [
      {letter: 'A', text: '60°'},
      {letter: 'B', text: '90°'},
      {letter: 'C', text: '120°'},
      {letter: 'D', text: '45°'},
          ],
    ans: 'A',
    sol: '**Divide 180° by 3 equal angles.**\n\n```\nEach angle = 180° / 3 = 60°\n```\n\n**Key insight:** In an equilateral triangle, all three angles are equal to 60°.'
  },
  {
    pos: 24,
    diff: 'hard',
    text: 'Two parallel lines are cut by a transversal. One acute angle formed is 42°. What is the measure of an obtuse angle formed?',
    ch: [
      {letter: 'A', text: '138°'},
      {letter: 'B', text: '42°'},
      {letter: 'C', text: '90°'},
      {letter: 'D', text: '84°'},
          ],
    ans: 'A',
    sol: '**Acute and obtuse angles are supplementary on a line.**\n\n```\n42° + obtuse angle = 180°\nobtuse angle = 138°\n```\n\n**Key insight:** Adjacent angles on a straight line are supplementary.'
  },
  {
    pos: 25,
    diff: 'hard',
    text: 'The angles of a triangle are in arithmetic progression with a common difference of 10°. What is the middle angle?',
    ch: [
      {letter: 'A', text: '60°'},
      {letter: 'B', text: '50°'},
      {letter: 'C', text: '70°'},
      {letter: 'D', text: '55°'},
          ],
    ans: 'A',
    sol: '**Set up angles as (x - 10°), x, (x + 10°).**\n\n```\n(x - 10°) + x + (x + 10°) = 180°\n3x = 180°\nx = 60°\n```\n\nThe three angles are 50°, 60°, 70°.\n\n**Key insight:** In arithmetic progression with common difference d, use (a-d), a, (a+d).'
  },
  {
    pos: 26,
    diff: 'hard',
    text: 'A straight angle is divided into two angles in the ratio 5:4. What is the measure of the larger angle?',
    ch: [
      {letter: 'A', text: '100°'},
      {letter: 'B', text: '80°'},
      {letter: 'C', text: '90°'},
      {letter: 'D', text: '108°'},
          ],
    ans: 'A',
    sol: '**A straight angle measures 180°.**\n\n```\nRatio parts: 5 + 4 = 9 parts\nEach part = 180° / 9 = 20°\n\nLarger angle = 5 × 20° = 100°\n```\n\n**Key insight:** Divide the 180° according to the ratio.'
  },
  {
    pos: 27,
    diff: 'hard',
    text: 'In triangle ABC, angle A = 50° and angle B = 60°. What is angle C?',
    ch: [
      {letter: 'A', text: '70°'},
      {letter: 'B', text: '110°'},
      {letter: 'C', text: '180°'},
      {letter: 'D', text: '80°'},
          ],
    ans: 'A',
    sol: '**Sum of angles in a triangle = 180°.**\n\n```\n50° + 60° + C = 180°\n110° + C = 180°\nC = 70°\n```\n\n**Key insight:** Add the known angles and subtract from 180°.'
  },
  {
    pos: 28,
    diff: 'hard',
    text: 'What is the sum of the interior angles of a heptagon (7-sided polygon)?',
    ch: [
      {letter: 'A', text: '900°'},
      {letter: 'B', text: '1080°'},
      {letter: 'C', text: '720°'},
      {letter: 'D', text: '540°'},
          ],
    ans: 'A',
    sol: '**Use the formula (n-2) × 180°.**\n\n```\nFor heptagon, n = 7\nSum = (7 - 2) × 180°\n    = 5 × 180°\n    = 900°\n```\n\n**Key insight:** A heptagon can be divided into 5 triangles.'
  },
  {
    pos: 29,
    diff: 'hard',
    text: 'If two angles are supplementary and one is 4 times the other, what is the smaller angle?',
    ch: [
      {letter: 'A', text: '36°'},
      {letter: 'B', text: '144°'},
      {letter: 'C', text: '45°'},
      {letter: 'D', text: '60°'},
          ],
    ans: 'A',
    sol: '**Supplementary angles sum to 180°.**\n\nLet x = smaller angle, then 4x = larger angle.\n\n```\nx + 4x = 180°\n5x = 180°\nx = 36°\n```\n\n**Key insight:** Express both angles in terms of one variable.'
  },
  {
    pos: 30,
    diff: 'hard',
    text: 'In a rhombus, one angle measures 110°. What is the measure of the angle adjacent to it?',
    ch: [
      {letter: 'A', text: '70°'},
      {letter: 'B', text: '110°'},
      {letter: 'C', text: '55°'},
      {letter: 'D', text: '180°'},
          ],
    ans: 'A',
    sol: '**Consecutive angles in a rhombus are supplementary.**\n\n```\n110° + x = 180°\nx = 70°\n```\n\n**Key insight:** A rhombus is a parallelogram, so consecutive angles add to 180°.'
  },
  {
    pos: 31,
    diff: 'hard',
    text: 'Two angles form a linear pair. If one angle is 5x and the other is 3x, what is the value of x?',
    ch: [
      {letter: 'A', text: '22.5'},
      {letter: 'B', text: '30'},
      {letter: 'C', text: '45'},
      {letter: 'D', text: '60'},
          ],
    ans: 'A',
    sol: '**Linear pair angles sum to 180°.**\n\n```\n5x + 3x = 180°\n8x = 180°\nx = 22.5°\n```\n\n**Key insight:** A linear pair consists of two adjacent angles on a straight line.'
  },
  {
    pos: 32,
    diff: 'hard',
    text: 'What is the measure of each interior angle of a regular 12-sided polygon?',
    ch: [
      {letter: 'A', text: '150°'},
      {letter: 'B', text: '135°'},
      {letter: 'C', text: '144°'},
      {letter: 'D', text: '156°'},
          ],
    ans: 'A',
    sol: '**Use the formula: (n-2) × 180° / n.**\n\n```\nFor 12-gon, n = 12\nEach angle = (12-2) × 180° / 12\n           = 10 × 180° / 12\n           = 1800° / 12\n           = 150°\n```\n\n**Key insight:** A 12-sided polygon is called a dodecagon.'
  },
  {
    pos: 33,
    diff: 'hard',
    text: 'In triangle XYZ, if angle X = 2(angle Y) and angle Y = angle Z, what is angle Z?',
    ch: [
      {letter: 'A', text: '45°'},
      {letter: 'B', text: '90°'},
      {letter: 'C', text: '60°'},
      {letter: 'D', text: '30°'},
          ],
    ans: 'A',
    sol: '**Express all angles in terms of one variable.**\n\nLet angle Y = angle Z = x, then angle X = 2x.\n\n```\n2x + x + x = 180°\n4x = 180°\nx = 45°\n\nTherefore, angle Z = 45°\n```\n\n**Key insight:** Use the relationship between angles to set up one equation.'
  },
  {
    pos: 34,
    diff: 'hard',
    text: 'An angle is twice its complement. What is the measure of the angle?',
    ch: [
      {letter: 'A', text: '60°'},
      {letter: 'B', text: '30°'},
      {letter: 'C', text: '45°'},
      {letter: 'D', text: '120°'},
          ],
    ans: 'A',
    sol: '**Set up an equation.**\n\nLet x = the angle, then (90° - x) = its complement.\n\n```\nx = 2(90° - x)\nx = 180° - 2x\n3x = 180°\nx = 60°\n```\n\n**Key insight:** The angle is twice as large as its complement.'
  },
  {
    pos: 35,
    diff: 'hard',
    text: 'Two parallel lines are cut by a transversal. If alternate exterior angles are represented by (3x + 20)° and (5x - 10)°, what is x?',
    ch: [
      {letter: 'A', text: '15'},
      {letter: 'B', text: '10'},
      {letter: 'C', text: '25'},
      {letter: 'D', text: '30'},
          ],
    ans: 'A',
    sol: '**Alternate exterior angles are equal when lines are parallel.**\n\n```\n3x + 20 = 5x - 10\n20 + 10 = 5x - 3x\n30 = 2x\nx = 15\n```\n\n**Key insight:** Set the angle expressions equal and solve for x.'
  },
  {
    pos: 36,
    diff: 'hard',
    text: 'The exterior angle of a regular polygon is 40°. How many sides does the polygon have?',
    ch: [
      {letter: 'A', text: '9'},
      {letter: 'B', text: '8'},
      {letter: 'C', text: '10'},
      {letter: 'D', text: '7'},
          ],
    ans: 'A',
    sol: '**Use the formula: exterior angle = 360° / n.**\n\n```\n40° = 360° / n\n40n = 360\nn = 9\n```\n\n**Key insight:** The sum of all exterior angles is always 360°.'
  },
  {
    pos: 37,
    diff: 'hard',
    text: 'In a trapezoid, the two base angles on one leg are 75° and 105°. What is the sum of the two base angles on the other leg?',
    ch: [
      {letter: 'A', text: '180°'},
      {letter: 'B', text: '360°'},
      {letter: 'C', text: '90°'},
      {letter: 'D', text: '270°'},
          ],
    ans: 'A',
    sol: '**The sum of all angles in a quadrilateral is 360°.**\n\n```\n75° + 105° + (sum of other two) = 360°\n180° + (sum of other two) = 360°\nSum of other two = 180°\n```\n\n**Key insight:** In a trapezoid, co-interior angles on each leg are supplementary if the bases are parallel.'
  },
  {
    pos: 38,
    diff: 'hard',
    text: 'An obtuse angle is 30° more than twice a right angle. What is the obtuse angle?',
    ch: [
      {letter: 'A', text: 'Not possible'},
      {letter: 'B', text: '210°'},
      {letter: 'C', text: '120°'},
      {letter: 'D', text: '150°'},
          ],
    ans: 'A',
    sol: '**Check if the result is valid.**\n\n```\nObtuse angle = 2(90°) + 30°\n             = 180° + 30°\n             = 210°\n```\n\nBut an angle of 210° is a reflex angle, not an obtuse angle (which must be between 90° and 180°).\n\n**Key insight:** An obtuse angle must be less than 180°, so this problem has no valid solution.'
  },
  {
    pos: 39,
    diff: 'hard',
    text: 'Two angles are complementary. If one angle is increased by 15° and the other is decreased by 15°, what is the new sum of the angles?',
    ch: [
      {letter: 'A', text: '90°'},
      {letter: 'B', text: '105°'},
      {letter: 'C', text: '75°'},
      {letter: 'D', text: '120°'},
          ],
    ans: 'A',
    sol: '**The changes cancel out.**\n\nLet angles be a and b, where a + b = 90°.\n\n```\nNew sum = (a + 15°) + (b - 15°)\n        = a + b + 15° - 15°\n        = a + b\n        = 90°\n```\n\n**Key insight:** Increasing one angle and decreasing the other by the same amount doesn\'t change the sum.'
  },
  {
    pos: 40,
    diff: 'hard',
    text: 'In a parallelogram ABCD, if angle A = 70°, what is angle C?',
    ch: [
      {letter: 'A', text: '70°'},
      {letter: 'B', text: '110°'},
      {letter: 'C', text: '35°'},
      {letter: 'D', text: '140°'},
          ],
    ans: 'A',
    sol: '**Opposite angles in a parallelogram are equal.**\n\n```\nAngle C = Angle A = 70°\n```\n\n**Key insight:** In a parallelogram, opposite angles are congruent.'
  },
  {
    pos: 41,
    diff: 'hard',
    text: 'The angles of a triangle are (x - 10)°, (2x)°, and (x + 20)°. What is the value of x?',
    ch: [
      {letter: 'A', text: '42.5'},
      {letter: 'B', text: '45'},
      {letter: 'C', text: '40'},
      {letter: 'D', text: '50'},
          ],
    ans: 'A',
    sol: '**Sum of angles in a triangle = 180°.**\n\n```\n(x - 10) + 2x + (x + 20) = 180\n4x + 10 = 180\n4x = 170\nx = 42.5\n```\n\n**Key insight:** Combine like terms and solve for x.'
  },
  {
    pos: 42,
    diff: 'hard',
    text: 'What is the measure of each central angle in a regular decagon (10-sided polygon)?',
    ch: [
      {letter: 'A', text: '36°'},
      {letter: 'B', text: '144°'},
      {letter: 'C', text: '30°'},
      {letter: 'D', text: '45°'},
          ],
    ans: 'A',
    sol: '**Central angles divide 360° equally.**\n\n```\nEach central angle = 360° / 10 = 36°\n```\n\n**Key insight:** Central angles from the center to consecutive vertices divide the full 360°.'
  },
  {
    pos: 43,
    diff: 'hard',
    text: 'An angle is 3 times its supplement. What is the angle?',
    ch: [
      {letter: 'A', text: '135°'},
      {letter: 'B', text: '45°'},
      {letter: 'C', text: '120°'},
      {letter: 'D', text: '60°'},
          ],
    ans: 'A',
    sol: '**Set up an equation.**\n\nLet x = the angle, then (180° - x) = its supplement.\n\n```\nx = 3(180° - x)\nx = 540° - 3x\n4x = 540°\nx = 135°\n```\n\n**Key insight:** The angle is three times as large as its supplement.'
  },
  {
    pos: 44,
    diff: 'hard',
    text: 'In triangle PQR, angle P = 3x, angle Q = 4x, and angle R = 5x. What is angle Q?',
    ch: [
      {letter: 'A', text: '60°'},
      {letter: 'B', text: '45°'},
      {letter: 'C', text: '75°'},
      {letter: 'D', text: '50°'},
          ],
    ans: 'A',
    sol: '**Sum of angles = 180°.**\n\n```\n3x + 4x + 5x = 180°\n12x = 180°\nx = 15°\n\nAngle Q = 4x = 4(15°) = 60°\n```\n\n**Key insight:** Find x first, then calculate the specific angle.'
  },
  {
    pos: 45,
    diff: 'hard',
    text: 'Two parallel lines are cut by a transversal. If same-side interior angles are (4x + 10)° and (2x + 50)°, what is x?',
    ch: [
      {letter: 'A', text: '20'},
      {letter: 'B', text: '30'},
      {letter: 'C', text: '15'},
      {letter: 'D', text: '25'},
          ],
    ans: 'A',
    sol: '**Same-side interior angles are supplementary.**\n\n```\n(4x + 10) + (2x + 50) = 180\n6x + 60 = 180\n6x = 120\nx = 20\n```\n\n**Key insight:** Co-interior angles add to 180° when lines are parallel.'
  },
  {
    pos: 46,
    diff: 'hard',
    text: 'An isosceles triangle has a vertex angle of 100°. What type of triangle is it based on its angles?',
    ch: [
      {letter: 'A', text: 'Obtuse'},
      {letter: 'B', text: 'Acute'},
      {letter: 'C', text: 'Right'},
      {letter: 'D', text: 'Equiangular'},
          ],
    ans: 'A',
    sol: '**Check if any angle is greater than 90°.**\n\nSince the vertex angle is 100° > 90°, the triangle is obtuse.\n\n```\nBase angles = (180° - 100°) / 2 = 40° each\nAngles: 100°, 40°, 40°\n```\n\n**Key insight:** A triangle with one angle > 90° is an obtuse triangle.'
  },
  {
    pos: 47,
    diff: 'hard',
    text: 'What is the sum of one interior angle and one exterior angle at the same vertex of any polygon?',
    ch: [
      {letter: 'A', text: '180°'},
      {letter: 'B', text: '360°'},
      {letter: 'C', text: '90°'},
      {letter: 'D', text: 'Depends on the polygon'},
          ],
    ans: 'A',
    sol: '**Interior and exterior angles at the same vertex form a linear pair.**\n\n```\nInterior angle + Exterior angle = 180°\n```\n\n**Key insight:** This is true for any polygon because they form a straight line.'
  },
  {
    pos: 48,
    diff: 'hard',
    text: 'In a rectangle, all angles are right angles. What is the sum of all four angles?',
    ch: [
      {letter: 'A', text: '360°'},
      {letter: 'B', text: '90°'},
      {letter: 'C', text: '180°'},
      {letter: 'D', text: '270°'},
          ],
    ans: 'A',
    sol: '**Sum = 4 × 90°.**\n\n```\nSum = 4 × 90° = 360°\n```\n\nThis confirms the quadrilateral angle sum.\n\n**Key insight:** A rectangle is a quadrilateral, so its angles sum to 360°.'
  },
  {
    pos: 49,
    diff: 'hard',
    text: 'Two angles form a linear pair. One angle is 4 times the other. What is the smaller angle?',
    ch: [
      {letter: 'A', text: '36°'},
      {letter: 'B', text: '144°'},
      {letter: 'C', text: '45°'},
      {letter: 'D', text: '30°'},
          ],
    ans: 'A',
    sol: '**Linear pair angles sum to 180°.**\n\nLet x = smaller angle, then 4x = larger angle.\n\n```\nx + 4x = 180°\n5x = 180°\nx = 36°\n```\n\n**Key insight:** Express both angles in terms of x and use the linear pair property.'
  },
  {
    pos: 50,
    diff: 'hard',
    text: 'In a triangle, the ratio of the angles is 1:2:3. What is the measure of the largest angle?',
    ch: [
      {letter: 'A', text: '90°'},
      {letter: 'B', text: '60°'},
      {letter: 'C', text: '120°'},
      {letter: 'D', text: '30°'},
          ],
    ans: 'A',
    sol: '**Use the ratio to divide 180°.**\n\n```\nRatio parts: 1 + 2 + 3 = 6 parts\nEach part = 180° / 6 = 30°\n\nLargest angle = 3 × 30° = 90°\n```\n\nThe triangle is a right triangle with angles 30°, 60°, 90°.\n\n**Key insight:** This is the famous 30-60-90 triangle.'
  }
];

async function insertQuestions() {
  console.log('Finding lesson...');

  const { data: lesson, error: lessonError } = await supabase
    .from('lessons')
    .select('id')
    .eq('lesson_key', 'geometry-angles')
    .single();

  if (lessonError) {
    console.error('Error finding lesson geometry-angles:', lessonError);
    return;
  }

  console.log(`Found lesson geometry-angles with ID: ${lesson.id}\n`);

  let successCount = 0;
  let errorCount = 0;

  for (const q of questions) {
    const questionData = {
      lesson_id: lesson.id,
      subject: 'math',
      position: q.pos,
      difficulty: q.diff,
      title: `Geometry: Angles Question ${q.pos}`,
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
