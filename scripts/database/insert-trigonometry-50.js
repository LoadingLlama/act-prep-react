require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceRoleKey) {
  console.error('Missing Supabase credentials');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

const questions = [
  {pos:1,diff:'hard',text:'In a right triangle with hypotenuse 10 and one leg 6, what is sin(θ) where θ is the angle opposite the leg of length 6?',ch:[{letter:'A',text:'0.6'},{letter:'B',text:'0.8'},{letter:'C',text:'0.75'},{letter:'D',text:'3/5'}],ans:'D',sol:'**Use SOH: sin(θ) = opposite/hypotenuse.**\n\n```\nOpposite side = 6\nHypotenuse = 10\n\nsin(θ) = 6/10 = 3/5 = 0.6\n```\n**Key insight:** sin(θ) is the ratio of opposite side to hypotenuse. Here, sin(θ) = 3/5 = 0.6.'},

  {pos:2,diff:'hard',text:'If cos(θ) = 4/5 and θ is in the first quadrant, what is sin(θ)?',ch:[{letter:'A',text:'3/5'},{letter:'B',text:'4/5'},{letter:'C',text:'1'},{letter:'D',text:'5/4'}],ans:'A',sol:'**Use Pythagorean identity: sin²(θ) + cos²(θ) = 1.**\n\n```\nsin²(θ) + (4/5)² = 1\nsin²(θ) + 16/25 = 1\nsin²(θ) = 9/25\nsin(θ) = ±3/5\n\nSince θ is in first quadrant (all positive):\nsin(θ) = 3/5\n```\n**Key insight:** Use the Pythagorean identity and quadrant information. In quadrant I, sin(θ) = 3/5.'},

  {pos:3,diff:'hard',text:'What is tan(45°)?',ch:[{letter:'A',text:'0'},{letter:'B',text:'1'},{letter:'C',text:'√2'},{letter:'D',text:'√3'}],ans:'B',sol:'**Recall special angle value.**\n\n```\nIn a 45-45-90 triangle:\nOpposite = Adjacent\n\ntan(45°) = opposite/adjacent = 1\n```\n**Key insight:** tan(45°) = 1 because in a 45-45-90 triangle, the legs are equal.'},

  {pos:4,diff:'hard',text:'Convert 3π/4 radians to degrees.',ch:[{letter:'A',text:'135°'},{letter:'B',text:'120°'},{letter:'C',text:'150°'},{letter:'D',text:'90°'}],ans:'A',sol:'**Use conversion: degrees = radians × (180/π).**\n\n```\nDegrees = (3π/4) × (180/π)\n        = 3 × 180 / 4\n        = 540 / 4\n        = 135°\n```\n**Key insight:** Multiply radians by 180/π to convert to degrees. 3π/4 rad = 135°.'},

  {pos:5,diff:'hard',text:'In a right triangle, if sin(A) = 5/13, what is cos(A)?',ch:[{letter:'A',text:'12/13'},{letter:'B',text:'5/12'},{letter:'C',text:'13/12'},{letter:'D',text:'8/13'}],ans:'A',sol:'**Use Pythagorean identity.**\n\n```\nsin²(A) + cos²(A) = 1\n(5/13)² + cos²(A) = 1\n25/169 + cos²(A) = 1\ncos²(A) = 144/169\ncos(A) = 12/13 (positive in right triangle)\n```\n**Key insight:** In a right triangle, if sin(A) = 5/13, then the triangle has sides 5, 12, 13 (Pythagorean triple). cos(A) = 12/13.'},

  {pos:6,diff:'hard',text:'What is sin(30°)?',ch:[{letter:'A',text:'1/2'},{letter:'B',text:'√3/2'},{letter:'C',text:'1'},{letter:'D',text:'√2/2'}],ans:'A',sol:'**Recall special angle value from 30-60-90 triangle.**\n\n```\nIn a 30-60-90 triangle:\nSides are in ratio 1 : √3 : 2\n\nsin(30°) = opposite/hypotenuse = 1/2\n```\n**Key insight:** sin(30°) = 1/2 from the 30-60-90 triangle special ratios.'},

  {pos:7,diff:'hard',text:'If tan(θ) = 3/4, what is the value of sin(θ) + cos(θ)? (assume θ in first quadrant)',ch:[{letter:'A',text:'1.4'},{letter:'B',text:'7/5'},{letter:'C',text:'1'},{letter:'D',text:'5/4'}],ans:'B',sol:'**Find sin and cos from tan, then add.**\n\n```\ntan(θ) = 3/4 means opposite = 3, adjacent = 4\nHypotenuse = √(3² + 4²) = √25 = 5\n\nsin(θ) = 3/5\ncos(θ) = 4/5\n\nsin(θ) + cos(θ) = 3/5 + 4/5 = 7/5\n```\n**Key insight:** From tan(θ) = 3/4, construct a 3-4-5 right triangle. Then sin(θ) + cos(θ) = 7/5.'},

  {pos:8,diff:'hard',text:'What is cos(60°)?',ch:[{letter:'A',text:'1/2'},{letter:'B',text:'√3/2'},{letter:'C',text:'1'},{letter:'D',text:'0'}],ans:'A',sol:'**Recall special angle value.**\n\n```\nIn a 30-60-90 triangle:\ncos(60°) = adjacent/hypotenuse = 1/2\n```\n**Key insight:** cos(60°) = 1/2 from the 30-60-90 triangle.'},

  {pos:9,diff:'hard',text:'Convert 120° to radians.',ch:[{letter:'A',text:'2π/3'},{letter:'B',text:'π/3'},{letter:'C',text:'3π/4'},{letter:'D',text:'π/6'}],ans:'A',sol:'**Use conversion: radians = degrees × (π/180).**\n\n```\nRadians = 120 × (π/180)\n        = 120π/180\n        = 2π/3\n```\n**Key insight:** Multiply degrees by π/180 to convert to radians. 120° = 2π/3 rad.'},

  {pos:10,diff:'hard',text:'In a right triangle with legs 5 and 12, what is tan(θ) where θ is opposite the leg of length 5?',ch:[{letter:'A',text:'5/12'},{letter:'B',text:'12/5'},{letter:'C',text:'5/13'},{letter:'D',text:'12/13'}],ans:'A',sol:'**Use TOA: tan(θ) = opposite/adjacent.**\n\n```\nOpposite = 5\nAdjacent = 12\n\ntan(θ) = 5/12\n```\n**Key insight:** tan(θ) is the ratio of opposite to adjacent sides. Here, tan(θ) = 5/12.'},

  {pos:11,diff:'hard',text:'What is the value of sin²(θ) + cos²(θ) for any angle θ?',ch:[{letter:'A',text:'0'},{letter:'B',text:'1'},{letter:'C',text:'2'},{letter:'D',text:'Varies with θ'}],ans:'B',sol:'**Apply the Pythagorean identity.**\n\n```\nsin²(θ) + cos²(θ) = 1\n\nThis is true for all angles θ.\n```\n**Key insight:** The Pythagorean identity sin²(θ) + cos²(θ) = 1 holds for any angle.'},

  {pos:12,diff:'hard',text:'If sin(θ) = 0.8 and θ is acute, what is cos(θ)?',ch:[{letter:'A',text:'0.6'},{letter:'B',text:'0.4'},{letter:'C',text:'0.2'},{letter:'D',text:'0.8'}],ans:'A',sol:'**Use Pythagorean identity.**\n\n```\nsin²(θ) + cos²(θ) = 1\n(0.8)² + cos²(θ) = 1\n0.64 + cos²(θ) = 1\ncos²(θ) = 0.36\ncos(θ) = 0.6 (positive since acute)\n```\n**Key insight:** sin(0.8) = 4/5, so this is a 3-4-5 triangle scaled by 1/5. cos(θ) = 0.6 = 3/5.'},

  {pos:13,diff:'hard',text:'In which quadrant is sin(θ) > 0 and cos(θ) < 0?',ch:[{letter:'A',text:'Quadrant I'},{letter:'B',text:'Quadrant II'},{letter:'C',text:'Quadrant III'},{letter:'D',text:'Quadrant IV'}],ans:'B',sol:'**Recall sign conventions by quadrant.**\n\n```\nQuadrant I: sin > 0, cos > 0\nQuadrant II: sin > 0, cos < 0 ✓\nQuadrant III: sin < 0, cos < 0\nQuadrant IV: sin < 0, cos > 0\n```\n**Key insight:** In Quadrant II, sine is positive and cosine is negative. Mnemonic: "All Students Take Calculus" (ASTC for signs in quadrants I-IV).'},

  {pos:14,diff:'hard',text:'What is tan(θ) if sin(θ) = 3/5 and cos(θ) = 4/5?',ch:[{letter:'A',text:'3/4'},{letter:'B',text:'4/3'},{letter:'C',text:'3/5'},{letter:'D',text:'5/4'}],ans:'A',sol:'**Use identity: tan(θ) = sin(θ)/cos(θ).**\n\n```\ntan(θ) = sin(θ) / cos(θ)\n       = (3/5) / (4/5)\n       = 3/5 × 5/4\n       = 3/4\n```\n**Key insight:** tan(θ) = sin(θ)/cos(θ). Here, tan(θ) = 3/4.'},

  {pos:15,diff:'hard',text:'A ladder 10 feet long leans against a wall, making a 60° angle with the ground. How high up the wall does it reach?',ch:[{letter:'A',text:'5 feet'},{letter:'B',text:'5√3 feet'},{letter:'C',text:'10 feet'},{letter:'D',text:'8.66 feet'}],ans:'B',sol:'**Use sine function: opposite = hypotenuse × sin(angle).**\n\n```\nHeight = 10 × sin(60°)\n       = 10 × (√3/2)\n       = 5√3 feet\n       ≈ 8.66 feet\n```\n**Key insight:** The height is the opposite side. Using sin(60°) = √3/2, height = 5√3 ≈ 8.66 feet.'},

  {pos:16,diff:'hard',text:'What is sin(90°)?',ch:[{letter:'A',text:'0'},{letter:'B',text:'1'},{letter:'C',text:'√2/2'},{letter:'D',text:'Undefined'}],ans:'B',sol:'**Recall unit circle value.**\n\n```\nAt 90°, the point on unit circle is (0, 1)\n\nsin(90°) = y-coordinate = 1\n```\n**Key insight:** sin(90°) = 1 because the terminal side is pointing straight up on the unit circle.'},

  {pos:17,diff:'hard',text:'If cos(θ) = 0, what are the possible values of sin(θ)?',ch:[{letter:'A',text:'0'},{letter:'B',text:'±1'},{letter:'C',text:'1'},{letter:'D',text:'Undefined'}],ans:'B',sol:'**Use Pythagorean identity when cos(θ) = 0.**\n\n```\nsin²(θ) + cos²(θ) = 1\nsin²(θ) + 0 = 1\nsin²(θ) = 1\nsin(θ) = ±1\n```\n**Key insight:** When cos(θ) = 0 (at 90° or 270°), sin(θ) = ±1.'},

  {pos:18,diff:'hard',text:'What is the period of y = sin(x)?',ch:[{letter:'A',text:'π'},{letter:'B',text:'2π'},{letter:'C',text:'π/2'},{letter:'D',text:'4π'}],ans:'B',sol:'**Recall the period of sine function.**\n\n```\nThe sine function repeats every 2π radians (360°)\n\nPeriod = 2π\n```\n**Key insight:** sin(x) completes one full cycle every 2π radians.'},

  {pos:19,diff:'hard',text:'In a 30-60-90 triangle, if the shorter leg is 4, what is the hypotenuse?',ch:[{letter:'A',text:'8'},{letter:'B',text:'4√3'},{letter:'C',text:'4√2'},{letter:'D',text:'6'}],ans:'A',sol:'**Use 30-60-90 triangle ratios: 1 : √3 : 2.**\n\n```\nShorter leg (opposite 30°) = 4\nRatio 1 : 2 means:\nHypotenuse = 2 × (shorter leg)\n           = 2 × 4\n           = 8\n```\n**Key insight:** In a 30-60-90 triangle, the hypotenuse is twice the shorter leg. Hypotenuse = 8.'},

  {pos:20,diff:'hard',text:'What is cos(0°)?',ch:[{letter:'A',text:'0'},{letter:'B',text:'1'},{letter:'C',text:'-1'},{letter:'D',text:'Undefined'}],ans:'B',sol:'**Recall unit circle value.**\n\n```\nAt 0°, the point on unit circle is (1, 0)\n\ncos(0°) = x-coordinate = 1\n```\n**Key insight:** cos(0°) = 1 because the terminal side points along the positive x-axis.'},

  {pos:21,diff:'hard',text:'If tan(θ) = 1, what is θ in the first quadrant?',ch:[{letter:'A',text:'30°'},{letter:'B',text:'45°'},{letter:'C',text:'60°'},{letter:'D',text:'90°'}],ans:'B',sol:'**Solve for the angle where tan(θ) = 1.**\n\n```\ntan(θ) = sin(θ)/cos(θ) = 1\n\nThis means sin(θ) = cos(θ)\nIn first quadrant: θ = 45°\n```\n**Key insight:** tan(45°) = 1 because in a 45-45-90 triangle, opposite = adjacent.'},

  {pos:22,diff:'hard',text:'What is the amplitude of y = 3sin(x)?',ch:[{letter:'A',text:'1'},{letter:'B',text:'3'},{letter:'C',text:'6'},{letter:'D',text:'π'}],ans:'B',sol:'**Identify the amplitude from the coefficient.**\n\n```\nFor y = A·sin(x):\nAmplitude = |A|\n\nFor y = 3sin(x):\nAmplitude = 3\n```\n**Key insight:** The amplitude is the coefficient of the sine function. Here, amplitude = 3.'},

  {pos:23,diff:'hard',text:'In a 45-45-90 triangle, if one leg is 5, what is the hypotenuse?',ch:[{letter:'A',text:'5'},{letter:'B',text:'5√2'},{letter:'C',text:'10'},{letter:'D',text:'5√3'}],ans:'B',sol:'**Use 45-45-90 triangle ratios: 1 : 1 : √2.**\n\n```\nLeg = 5\nHypotenuse = leg × √2\n           = 5√2\n```\n**Key insight:** In a 45-45-90 triangle, the hypotenuse is leg × √2. Hypotenuse = 5√2.'},

  {pos:24,diff:'hard',text:'What is sin(180°)?',ch:[{letter:'A',text:'0'},{letter:'B',text:'1'},{letter:'C',text:'-1'},{letter:'D',text:'Undefined'}],ans:'A',sol:'**Recall unit circle value.**\n\n```\nAt 180°, the point on unit circle is (-1, 0)\n\nsin(180°) = y-coordinate = 0\n```\n**Key insight:** sin(180°) = 0 because the terminal side is along the negative x-axis.'},

  {pos:25,diff:'hard',text:'If sin(A) = sin(B), what is the relationship between A and B? (general solution)',ch:[{letter:'A',text:'A = B'},{letter:'B',text:'A = B or A = 180° - B'},{letter:'C',text:'A = -B'},{letter:'D',text:'A + B = 90°'}],ans:'B',sol:'**Use sine function symmetry.**\n\n```\nsin(A) = sin(B) when:\n1. A = B (same angle)\n2. A = 180° - B (supplementary angles)\n\nExample: sin(30°) = sin(150°)\n```\n**Key insight:** Sine has the same value at an angle and its supplement. A = B or A = 180° - B.'},

  {pos:26,diff:'hard',text:'What is cos(90°)?',ch:[{letter:'A',text:'0'},{letter:'B',text:'1'},{letter:'C',text:'-1'},{letter:'D',text:'Undefined'}],ans:'A',sol:'**Recall unit circle value.**\n\n```\nAt 90°, the point on unit circle is (0, 1)\n\ncos(90°) = x-coordinate = 0\n```\n**Key insight:** cos(90°) = 0 because the terminal side points straight up.'},

  {pos:27,diff:'hard',text:'A right triangle has hypotenuse 13 and one leg 5. What is cos(θ) where θ is opposite the leg of length 5?',ch:[{letter:'A',text:'5/13'},{letter:'B',text:'12/13'},{letter:'C',text:'5/12'},{letter:'D',text:'13/12'}],ans:'B',sol:'**Find the other leg, then use CAH.**\n\n```\nOther leg = √(13² - 5²) = √(169 - 25) = √144 = 12\n\nFor θ opposite the 5:\nAdjacent = 12\nHypotenuse = 13\n\ncos(θ) = adjacent/hypotenuse = 12/13\n```\n**Key insight:** This is a 5-12-13 Pythagorean triple. cos(θ) = 12/13.'},

  {pos:28,diff:'hard',text:'What is tan(60°)?',ch:[{letter:'A',text:'1'},{letter:'B',text:'√3'},{letter:'C',text:'1/√3'},{letter:'D',text:'√2'}],ans:'B',sol:'**Recall special angle value from 30-60-90 triangle.**\n\n```\nIn a 30-60-90 triangle with sides 1 : √3 : 2:\ntan(60°) = opposite/adjacent = √3/1 = √3\n```\n**Key insight:** tan(60°) = √3 from the 30-60-90 triangle ratios.'},

  {pos:29,diff:'hard',text:'Convert π/6 radians to degrees.',ch:[{letter:'A',text:'30°'},{letter:'B',text:'60°'},{letter:'C',text:'45°'},{letter:'D',text:'90°'}],ans:'A',sol:'**Use conversion formula.**\n\n```\nDegrees = (π/6) × (180/π)\n        = 180/6\n        = 30°\n```\n**Key insight:** π/6 radians = 30°.'},

  {pos:30,diff:'hard',text:'If sin(θ) = 1/2, what is θ in the first quadrant?',ch:[{letter:'A',text:'30°'},{letter:'B',text:'45°'},{letter:'C',text:'60°'},{letter:'D',text:'90°'}],ans:'A',sol:'**Recognize special angle value.**\n\n```\nsin(30°) = 1/2\n\nThis comes from the 30-60-90 triangle.\n```\n**Key insight:** sin(30°) = 1/2 is a fundamental special angle value. θ = 30°.'},

  {pos:31,diff:'hard',text:'What is the range of y = sin(x)?',ch:[{letter:'A',text:'[0, 1]'},{letter:'B',text:'[-1, 1]'},{letter:'C',text:'All real numbers'},{letter:'D',text:'[0, 2π]'}],ans:'B',sol:'**Recall sine function properties.**\n\n```\nThe sine function oscillates between -1 and 1:\n\nRange of sin(x) = [-1, 1]\n```\n**Key insight:** The sine function is bounded: -1 ≤ sin(x) ≤ 1 for all x.'},

  {pos:32,diff:'hard',text:'In a right triangle, if one acute angle is 35°, what is the other acute angle?',ch:[{letter:'A',text:'55°'},{letter:'B',text:'65°'},{letter:'C',text:'145°'},{letter:'D',text:'45°'}],ans:'A',sol:'**Use the fact that acute angles in a right triangle are complementary.**\n\n```\nIn a right triangle:\nOne angle = 90°\nOther two angles sum to 90°\n\n35° + θ = 90°\nθ = 55°\n```\n**Key insight:** The two acute angles in a right triangle are complementary (sum to 90°). Other angle = 55°.'},

  {pos:33,diff:'hard',text:'What is cos(180°)?',ch:[{letter:'A',text:'0'},{letter:'B',text:'1'},{letter:'C',text:'-1'},{letter:'D',text:'Undefined'}],ans:'C',sol:'**Recall unit circle value.**\n\n```\nAt 180°, the point on unit circle is (-1, 0)\n\ncos(180°) = x-coordinate = -1\n```\n**Key insight:** cos(180°) = -1 because the terminal side points along the negative x-axis.'},

  {pos:34,diff:'hard',text:'If cos(θ) = √3/2, what is θ in the first quadrant?',ch:[{letter:'A',text:'30°'},{letter:'B',text:'45°'},{letter:'C',text:'60°'},{letter:'D',text:'90°'}],ans:'A',sol:'**Recognize special angle value.**\n\n```\ncos(30°) = √3/2\n\nThis comes from the 30-60-90 triangle.\n```\n**Key insight:** cos(30°) = √3/2 is a fundamental special angle value. θ = 30°.'},

  {pos:35,diff:'hard',text:'What is 1 radian equal to in degrees?',ch:[{letter:'A',text:'45°'},{letter:'B',text:'57.3°'},{letter:'C',text:'60°'},{letter:'D',text:'90°'}],ans:'B',sol:'**Use conversion: 1 rad = 180/π degrees.**\n\n```\n1 radian = 180/π degrees\n         ≈ 57.3°\n```\n**Key insight:** 1 radian ≈ 57.3°, or more precisely 180/π degrees.'},

  {pos:36,diff:'hard',text:'In a right triangle, if sin(A) = cos(B), what is the relationship between A and B?',ch:[{letter:'A',text:'A = B'},{letter:'B',text:'A + B = 90°'},{letter:'C',text:'A + B = 180°'},{letter:'D',text:'A = 2B'}],ans:'B',sol:'**Use cofunction identity.**\n\n```\nsin(A) = cos(90° - A)\n\nIf sin(A) = cos(B), then:\nB = 90° - A\nA + B = 90°\n```\n**Key insight:** In a right triangle, if sin(A) = cos(B), the angles are complementary: A + B = 90°.'},

  {pos:37,diff:'hard',text:'What is sin(-30°)?',ch:[{letter:'A',text:'1/2'},{letter:'B',text:'-1/2'},{letter:'C',text:'√3/2'},{letter:'D',text:'-√3/2'}],ans:'B',sol:'**Use odd function property: sin(-θ) = -sin(θ).**\n\n```\nsin(-30°) = -sin(30°)\n          = -1/2\n```\n**Key insight:** Sine is an odd function, so sin(-θ) = -sin(θ). sin(-30°) = -1/2.'},

  {pos:38,diff:'hard',text:'A person 6 feet tall casts a shadow 8 feet long. What is the angle of elevation of the sun?',ch:[{letter:'A',text:'tan⁻¹(3/4)'},{letter:'B',text:'tan⁻¹(4/3)'},{letter:'C',text:'sin⁻¹(3/5)'},{letter:'D',text:'cos⁻¹(4/5)'}],ans:'A',sol:'**Use tangent function for angle of elevation.**\n\n```\ntan(angle) = opposite/adjacent\n           = height/shadow\n           = 6/8\n           = 3/4\n\nAngle = tan⁻¹(3/4)\n```\n**Key insight:** Angle of elevation uses tangent = rise/run. Angle = tan⁻¹(3/4) ≈ 36.87°.'},

  {pos:39,diff:'hard',text:'What is the period of y = cos(2x)?',ch:[{letter:'A',text:'π'},{letter:'B',text:'2π'},{letter:'C',text:'π/2'},{letter:'D',text:'4π'}],ans:'A',sol:'**Use period formula for y = cos(Bx): period = 2π/B.**\n\n```\nFor y = cos(2x):\nB = 2\n\nPeriod = 2π/2 = π\n```\n**Key insight:** Coefficient B in cos(Bx) changes the period to 2π/B. Here, period = π.'},

  {pos:40,diff:'hard',text:'If tan(θ) is undefined, what are possible values of θ?',ch:[{letter:'A',text:'0°, 180°'},{letter:'B',text:'90°, 270°'},{letter:'C',text:'45°, 135°'},{letter:'D',text:'30°, 60°'}],ans:'B',sol:'**Identify where tan(θ) = sin(θ)/cos(θ) is undefined.**\n\n```\ntan(θ) = sin(θ)/cos(θ)\n\nUndefined when cos(θ) = 0\ncos(θ) = 0 at θ = 90°, 270°, ...\n```\n**Key insight:** Tangent is undefined when cosine equals zero, which occurs at 90° and 270°.'},

  {pos:41,diff:'hard',text:'What is sin(π/2) in radians?',ch:[{letter:'A',text:'0'},{letter:'B',text:'1'},{letter:'C',text:'-1'},{letter:'D',text:'√2/2'}],ans:'B',sol:'**Recall that π/2 radians = 90°.**\n\n```\nπ/2 radians = 90°\n\nsin(90°) = 1\n```\n**Key insight:** π/2 radians corresponds to 90°, where sin(π/2) = 1.'},

  {pos:42,diff:'hard',text:'In which quadrant is both sin(θ) and cos(θ) negative?',ch:[{letter:'A',text:'Quadrant I'},{letter:'B',text:'Quadrant II'},{letter:'C',text:'Quadrant III'},{letter:'D',text:'Quadrant IV'}],ans:'C',sol:'**Recall sign conventions by quadrant.**\n\n```\nQuadrant I: sin > 0, cos > 0\nQuadrant II: sin > 0, cos < 0\nQuadrant III: sin < 0, cos < 0 ✓\nQuadrant IV: sin < 0, cos > 0\n```\n**Key insight:** In Quadrant III, both sine and cosine are negative.'},

  {pos:43,diff:'hard',text:'What is cos(-60°)?',ch:[{letter:'A',text:'1/2'},{letter:'B',text:'-1/2'},{letter:'C',text:'√3/2'},{letter:'D',text:'-√3/2'}],ans:'A',sol:'**Use even function property: cos(-θ) = cos(θ).**\n\n```\ncos(-60°) = cos(60°)\n          = 1/2\n```\n**Key insight:** Cosine is an even function, so cos(-θ) = cos(θ). cos(-60°) = 1/2.'},

  {pos:44,diff:'hard',text:'A 20-foot ladder reaches 16 feet up a wall. What angle does the ladder make with the ground?',ch:[{letter:'A',text:'sin⁻¹(4/5)'},{letter:'B',text:'cos⁻¹(4/5)'},{letter:'C',text:'tan⁻¹(4/3)'},{letter:'D',text:'tan⁻¹(3/4)'}],ans:'A',sol:'**Use sine function: sin(angle) = opposite/hypotenuse.**\n\n```\nsin(angle) = height/ladder\n           = 16/20\n           = 4/5\n\nAngle = sin⁻¹(4/5)\n```\n**Key insight:** With height and hypotenuse given, use sine. Angle = sin⁻¹(4/5) ≈ 53.13°.'},

  {pos:45,diff:'hard',text:'What is the value of sin(45°) + cos(45°)?',ch:[{letter:'A',text:'1'},{letter:'B',text:'√2'},{letter:'C',text:'2'},{letter:'D',text:'0'}],ans:'B',sol:'**Calculate using special angle values.**\n\n```\nsin(45°) = √2/2\ncos(45°) = √2/2\n\nsin(45°) + cos(45°) = √2/2 + √2/2\n                    = 2(√2/2)\n                    = √2\n```\n**Key insight:** Since sin(45°) = cos(45°) = √2/2, their sum is √2.'},

  {pos:46,diff:'hard',text:'In a 30-60-90 triangle, if the hypotenuse is 10, what is the longer leg?',ch:[{letter:'A',text:'5'},{letter:'B',text:'5√3'},{letter:'C',text:'10√3'},{letter:'D',text:'5√2'}],ans:'B',sol:'**Use 30-60-90 triangle ratios: 1 : √3 : 2.**\n\n```\nHypotenuse = 10\nRatio: shorter : longer : hypotenuse = 1 : √3 : 2\n\nShorter leg = 10/2 = 5\nLonger leg = 5√3\n```\n**Key insight:** In a 30-60-90 triangle, if hypotenuse is 10, the longer leg is 5√3.'},

  {pos:47,diff:'hard',text:'What is tan(0°)?',ch:[{letter:'A',text:'0'},{letter:'B',text:'1'},{letter:'C',text:'Undefined'},{letter:'D',text:'∞'}],ans:'A',sol:'**Evaluate using tan(θ) = sin(θ)/cos(θ).**\n\n```\ntan(0°) = sin(0°)/cos(0°)\n        = 0/1\n        = 0\n```\n**Key insight:** tan(0°) = 0 because sin(0°) = 0 and cos(0°) = 1.'},

  {pos:48,diff:'hard',text:'What is the reciprocal of sin(θ)?',ch:[{letter:'A',text:'cos(θ)'},{letter:'B',text:'csc(θ)'},{letter:'C',text:'sec(θ)'},{letter:'D',text:'cot(θ)'}],ans:'B',sol:'**Recall reciprocal trig functions.**\n\n```\ncsc(θ) = 1/sin(θ) (cosecant)\nsec(θ) = 1/cos(θ) (secant)\ncot(θ) = 1/tan(θ) (cotangent)\n```\n**Key insight:** The reciprocal of sine is cosecant: csc(θ) = 1/sin(θ).'},

  {pos:49,diff:'hard',text:'If sin(θ) = √3/2, what is θ in the first quadrant?',ch:[{letter:'A',text:'30°'},{letter:'B',text:'45°'},{letter:'C',text:'60°'},{letter:'D',text:'90°'}],ans:'C',sol:'**Recognize special angle value.**\n\n```\nsin(60°) = √3/2\n\nThis comes from the 30-60-90 triangle.\n```\n**Key insight:** sin(60°) = √3/2 is a fundamental special angle value. θ = 60°.'},

  {pos:50,diff:'hard',text:'What is cos(π) in radians?',ch:[{letter:'A',text:'0'},{letter:'B',text:'1'},{letter:'C',text:'-1'},{letter:'D',text:'√2/2'}],ans:'C',sol:'**Recall that π radians = 180°.**\n\n```\nπ radians = 180°\n\ncos(180°) = -1\n```\n**Key insight:** π radians corresponds to 180°, where cos(π) = -1.'},
];

async function insertQuestions() {
  // Get lesson_id for Trigonometry
  const { data: lesson, error: lessonError } = await supabase
    .from('lessons')
    .select('id')
    .eq('lesson_key', 'trigonometry')
    .single();

  if (lessonError || !lesson) {
    console.error('Error finding lesson trigonometry:', lessonError);
    return;
  }

  const lessonId = lesson.id;
  console.log(`Found lesson trigonometry with ID: ${lessonId}\n`);

  let successCount = 0;
  let errorCount = 0;

  for (const q of questions) {
    const { error } = await supabase
      .from('practice_questions')
      .insert({
        lesson_id: lessonId,
        subject: 'math',
        position: q.pos,
        difficulty: q.diff,
        title: `Trigonometry Q${q.pos}`,
        problem_text: q.text,
        choices: q.ch,
        correct_answer: q.ans,
        answer_explanation: q.sol
      });

    if (error) {
      console.error(`Error inserting Q${q.pos}:`, error.message);
      errorCount++;
    } else {
      successCount++;
    }
  }

  console.log(`\n=== COMPLETE: ${successCount}/${questions.length} success, ${errorCount}/${questions.length} errors ===\n`);
}

insertQuestions();
