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
  {pos:1,diff:'hard',text:'What is i² where i is the imaginary unit?',ch:[{letter:'A',text:'-1'},{letter:'B',text:'1'},{letter:'C',text:'0'},{letter:'D',text:'i'}],ans:'A',sol:'**Recall the fundamental definition of i.**\n\n```\ni is defined such that i² = -1\n```\n**Key insight:** The imaginary unit i satisfies i² = -1 by definition.'},

  {pos:2,diff:'hard',text:'Simplify: (3 + 2i) + (1 + 4i)',ch:[{letter:'A',text:'4 + 6i'},{letter:'B',text:'4 - 6i'},{letter:'C',text:'2 + 6i'},{letter:'D',text:'4 + 2i'}],ans:'A',sol:'**Add real and imaginary parts separately.**\n\n```\n(3 + 2i) + (1 + 4i) = (3+1) + (2i+4i)\n                    = 4 + 6i\n```\n**Key insight:** When adding complex numbers, add real parts together and imaginary parts together.'},

  {pos:3,diff:'hard',text:'What is i³?',ch:[{letter:'A',text:'i'},{letter:'B',text:'-i'},{letter:'C',text:'1'},{letter:'D',text:'-1'}],ans:'B',sol:'**Use i² = -1 to simplify.**\n\n```\ni³ = i² · i\n   = (-1) · i\n   = -i\n```\n**Key insight:** i³ = i² × i = -1 × i = -i.'},

  {pos:4,diff:'hard',text:'Multiply: (2 + i)(3 + 2i)',ch:[{letter:'A',text:'6 + 7i'},{letter:'B',text:'4 + 7i'},{letter:'C',text:'5 + 7i'},{letter:'D',text:'6 + 5i'}],ans:'B',sol:'**Use FOIL method.**\n\n```\n(2+i)(3+2i) = 2·3 + 2·2i + i·3 + i·2i\n            = 6 + 4i + 3i + 2i²\n            = 6 + 7i + 2(-1)\n            = 6 + 7i - 2\n            = 4 + 7i\n```\n**Key insight:** Remember that i² = -1 when simplifying. Result = 4 + 7i.'},

  {pos:5,diff:'hard',text:'What is the complex conjugate of 5 - 3i?',ch:[{letter:'A',text:'5 + 3i'},{letter:'B',text:'-5 + 3i'},{letter:'C',text:'-5 - 3i'},{letter:'D',text:'5 - 3i'}],ans:'A',sol:'**Change the sign of the imaginary part.**\n\n```\nComplex conjugate of (a + bi) is (a - bi)\n\nComplex conjugate of (5 - 3i) = 5 - (-3i) = 5 + 3i\n```\n**Key insight:** The complex conjugate flips the sign of the imaginary part. Conjugate of 5-3i is 5+3i.'},

  {pos:6,diff:'hard',text:'What is i⁴?',ch:[{letter:'A',text:'1'},{letter:'B',text:'-1'},{letter:'C',text:'i'},{letter:'D',text:'-i'}],ans:'A',sol:'**Use the pattern of powers of i.**\n\n```\ni⁴ = (i²)²\n   = (-1)²\n   = 1\n```\n**Key insight:** i⁴ = 1, which starts the cycle over. Powers of i cycle: i, -1, -i, 1, i, -1, ...'},

  {pos:7,diff:'hard',text:'Subtract: (7 + 2i) - (3 - 4i)',ch:[{letter:'A',text:'4 + 6i'},{letter:'B',text:'4 - 6i'},{letter:'C',text:'10 + 6i'},{letter:'D',text:'4 - 2i'}],ans:'A',sol:'**Distribute the negative and combine like terms.**\n\n```\n(7 + 2i) - (3 - 4i) = 7 + 2i - 3 + 4i\n                    = (7-3) + (2i+4i)\n                    = 4 + 6i\n```\n**Key insight:** When subtracting, distribute the negative to both parts of the second complex number.'},

  {pos:8,diff:'hard',text:'What is the absolute value (modulus) of 3 + 4i?',ch:[{letter:'A',text:'5'},{letter:'B',text:'7'},{letter:'C',text:'25'},{letter:'D',text:'√7'}],ans:'A',sol:'**Use the formula |a + bi| = √(a² + b²).**\n\n```\n|3 + 4i| = √(3² + 4²)\n        = √(9 + 16)\n        = √25\n        = 5\n```\n**Key insight:** The modulus of a complex number is the distance from the origin in the complex plane. Here, |3+4i| = 5.'},

  {pos:9,diff:'hard',text:'Simplify i⁵',ch:[{letter:'A',text:'i'},{letter:'B',text:'-i'},{letter:'C',text:'1'},{letter:'D',text:'-1'}],ans:'A',sol:'**Use the 4-cycle pattern of powers of i.**\n\n```\ni⁵ = i⁴ · i\n   = 1 · i\n   = i\n\nOr: 5 mod 4 = 1, so i⁵ = i¹ = i\n```\n**Key insight:** Powers of i repeat every 4. Since 5 = 4×1 + 1, i⁵ = i.'},

  {pos:10,diff:'hard',text:'What is i⁰?',ch:[{letter:'A',text:'0'},{letter:'B',text:'1'},{letter:'C',text:'i'},{letter:'D',text:'Undefined'}],ans:'B',sol:'**Apply the exponent rule a⁰ = 1.**\n\n```\ni⁰ = 1\n\nThis follows the general rule that any non-zero number to the power 0 equals 1.\n```\n**Key insight:** i⁰ = 1, just like any non-zero number raised to the 0 power.'},

  {pos:11,diff:'hard',text:'Multiply (1 + i) by its complex conjugate.',ch:[{letter:'A',text:'2'},{letter:'B',text:'1 + i²'},{letter:'C',text:'0'},{letter:'D',text:'1 - i²'}],ans:'A',sol:'**Multiply (1+i)(1-i).**\n\n```\n(1+i)(1-i) = 1·1 + 1·(-i) + i·1 + i·(-i)\n           = 1 - i + i - i²\n           = 1 - i²\n           = 1 - (-1)\n           = 2\n```\n**Key insight:** A complex number times its conjugate always gives a real number: (a+bi)(a-bi) = a² + b².'},

  {pos:12,diff:'hard',text:'Express √(-16) using i.',ch:[{letter:'A',text:'4i'},{letter:'B',text:'-4i'},{letter:'C',text:'16i'},{letter:'D',text:'-4'}],ans:'A',sol:'**Factor out -1 and use i = √(-1).**\n\n```\n√(-16) = √(16 × (-1))\n       = √16 × √(-1)\n       = 4 × i\n       = 4i\n```\n**Key insight:** √(-n) = i√n for positive n. Here, √(-16) = 4i.'},

  {pos:13,diff:'hard',text:'What is (3i)(2i)?',ch:[{letter:'A',text:'6i'},{letter:'B',text:'-6'},{letter:'C',text:'6'},{letter:'D',text:'6i²'}],ans:'B',sol:'**Multiply and simplify using i² = -1.**\n\n```\n(3i)(2i) = 6i²\n         = 6(-1)\n         = -6\n```\n**Key insight:** When multiplying imaginary numbers, remember i² = -1. Result is real: -6.'},

  {pos:14,diff:'hard',text:'Simplify: i¹⁰⁰',ch:[{letter:'A',text:'1'},{letter:'B',text:'-1'},{letter:'C',text:'i'},{letter:'D',text:'-i'}],ans:'A',sol:'**Use the 4-cycle pattern.**\n\n```\n100 mod 4 = 0\n\nSo i¹⁰⁰ = i⁰ = 1\n\nOr: i¹⁰⁰ = (i⁴)²⁵ = 1²⁵ = 1\n```\n**Key insight:** Since powers of i repeat every 4, and 100 is divisible by 4, i¹⁰⁰ = 1.'},

  {pos:15,diff:'hard',text:'What is the real part of (4 - 5i)?',ch:[{letter:'A',text:'4'},{letter:'B',text:'-5'},{letter:'C',text:'5'},{letter:'D',text:'-4'}],ans:'A',sol:'**Identify the real part.**\n\n```\nFor a complex number a + bi:\n- Real part = a\n- Imaginary part = b\n\nFor 4 - 5i:\nReal part = 4\n```\n**Key insight:** The real part is the term without i. Here, real part = 4.'},

  {pos:16,diff:'hard',text:'What is the imaginary part (coefficient of i) of (2 + 7i)?',ch:[{letter:'A',text:'2'},{letter:'B',text:'7'},{letter:'C',text:'7i'},{letter:'D',text:'9'}],ans:'B',sol:'**Identify the coefficient of i.**\n\n```\nFor a complex number a + bi:\nImaginary part = b (the coefficient, not bi)\n\nFor 2 + 7i:\nImaginary part = 7\n```\n**Key insight:** The imaginary part is the coefficient of i, which is 7 (not 7i).'},

  {pos:17,diff:'hard',text:'Divide: (6 + 8i) / 2',ch:[{letter:'A',text:'3 + 4i'},{letter:'B',text:'6 + 4i'},{letter:'C',text:'3 + 8i'},{letter:'D',text:'4 + 4i'}],ans:'A',sol:'**Divide both parts by 2.**\n\n```\n(6 + 8i) / 2 = 6/2 + 8i/2\n             = 3 + 4i\n```\n**Key insight:** When dividing by a real number, divide both real and imaginary parts separately.'},

  {pos:18,diff:'hard',text:'What is i + i²?',ch:[{letter:'A',text:'i - 1'},{letter:'B',text:'0'},{letter:'C',text:'2i'},{letter:'D',text:'i + 1'}],ans:'A',sol:'**Substitute i² = -1.**\n\n```\ni + i² = i + (-1)\n       = i - 1\n       or -1 + i\n```\n**Key insight:** Replace i² with -1 to get i - 1.'},

  {pos:19,diff:'hard',text:'Simplify: (5 + 2i) - (5 + 2i)',ch:[{letter:'A',text:'0'},{letter:'B',text:'10 + 4i'},{letter:'C',text:'4i'},{letter:'D',text:'10'}],ans:'A',sol:'**Subtract the complex number from itself.**\n\n```\n(5 + 2i) - (5 + 2i) = 0 + 0i = 0\n```\n**Key insight:** Any number minus itself equals zero, including complex numbers.'},

  {pos:20,diff:'hard',text:'What is 2i × 3?',ch:[{letter:'A',text:'6i'},{letter:'B',text:'6'},{letter:'C',text:'5i'},{letter:'D',text:'-6i'}],ans:'A',sol:'**Multiply the coefficient.**\n\n```\n2i × 3 = (2 × 3)i\n       = 6i\n```\n**Key insight:** When multiplying by a real number, multiply the coefficient of i.'},

  {pos:21,diff:'hard',text:'What is the modulus of -5i?',ch:[{letter:'A',text:'5'},{letter:'B',text:'-5'},{letter:'C',text:'0'},{letter:'D',text:'√5'}],ans:'A',sol:'**Use the modulus formula |a + bi| = √(a² + b²).**\n\n```\n-5i = 0 + (-5)i\n\n|0 + (-5)i| = √(0² + (-5)²)\n            = √25\n            = 5\n```\n**Key insight:** The modulus is always non-negative. |-5i| = 5.'},

  {pos:22,diff:'hard',text:'Simplify: i² + i⁴',ch:[{letter:'A',text:'0'},{letter:'B',text:'2'},{letter:'C',text:'-2'},{letter:'D',text:'2i'}],ans:'A',sol:'**Evaluate each power separately.**\n\n```\ni² = -1\ni⁴ = 1\n\ni² + i⁴ = -1 + 1 = 0\n```\n**Key insight:** i² = -1 and i⁴ = 1, so their sum is 0.'},

  {pos:23,diff:'hard',text:'What is (i)(-i)?',ch:[{letter:'A',text:'1'},{letter:'B',text:'-1'},{letter:'C',text:'-i²'},{letter:'D',text:'0'}],ans:'A',sol:'**Multiply and simplify.**\n\n```\n(i)(-i) = -i²\n        = -(-1)\n        = 1\n```\n**Key insight:** i × (-i) = -i² = -(-1) = 1.'},

  {pos:24,diff:'hard',text:'Express √(-25) + √(-9) using i.',ch:[{letter:'A',text:'8i'},{letter:'B',text:'√34i'},{letter:'C',text:'34i'},{letter:'D',text:'5i + 3i'}],ans:'A',sol:'**Convert each square root.**\n\n```\n√(-25) = √25 × √(-1) = 5i\n√(-9) = √9 × √(-1) = 3i\n\n√(-25) + √(-9) = 5i + 3i = 8i\n```\n**Key insight:** √(-a) = i√a, so √(-25) + √(-9) = 5i + 3i = 8i.'},

  {pos:25,diff:'hard',text:'What is the reciprocal of i?',ch:[{letter:'A',text:'-i'},{letter:'B',text:'i'},{letter:'C',text:'1'},{letter:'D',text:'-1'}],ans:'A',sol:'**Find 1/i.**\n\n```\n1/i = 1/i × i/i\n    = i/i²\n    = i/(-1)\n    = -i\n```\n**Key insight:** To find 1/i, multiply by i/i to get -i.'},

  {pos:26,diff:'hard',text:'Simplify: (1 - i)²',ch:[{letter:'A',text:'-2i'},{letter:'B',text:'2i'},{letter:'C',text:'0'},{letter:'D',text:'1 - 2i'}],ans:'A',sol:'**Expand using (a-b)² = a² - 2ab + b².**\n\n```\n(1-i)² = 1² - 2(1)(i) + (i)²\n       = 1 - 2i + i²\n       = 1 - 2i + (-1)\n       = -2i\n```\n**Key insight:** Expand and remember i² = -1. Result = -2i.'},

  {pos:27,diff:'hard',text:'What is 3(2 + i)?',ch:[{letter:'A',text:'6 + i'},{letter:'B',text:'6 + 3i'},{letter:'C',text:'5 + 3i'},{letter:'D',text:'6 + 2i'}],ans:'B',sol:'**Distribute 3.**\n\n```\n3(2 + i) = 3·2 + 3·i\n         = 6 + 3i\n```\n**Key insight:** Distribute the real number to both terms of the complex number.'},

  {pos:28,diff:'hard',text:'What is i¹⁷?',ch:[{letter:'A',text:'i'},{letter:'B',text:'-i'},{letter:'C',text:'1'},{letter:'D',text:'-1'}],ans:'A',sol:'**Use the 4-cycle pattern.**\n\n```\n17 mod 4 = 1\n\nSo i¹⁷ = i¹ = i\n```\n**Key insight:** Powers of i cycle every 4. Since 17 = 4×4 + 1, i¹⁷ = i.'},

  {pos:29,diff:'hard',text:'If z = 2 + 3i, what is z + z̄ (where z̄ is the complex conjugate of z)?',ch:[{letter:'A',text:'4'},{letter:'B',text:'6i'},{letter:'C',text:'4 + 6i'},{letter:'D',text:'0'}],ans:'A',sol:'**Add the number and its conjugate.**\n\n```\nz = 2 + 3i\nz̄ = 2 - 3i\n\nz + z̄ = (2+3i) + (2-3i)\n      = 4 + 0i\n      = 4\n```\n**Key insight:** A complex number plus its conjugate always gives twice the real part: 2Re(z).'},

  {pos:30,diff:'hard',text:'What is (2i)²?',ch:[{letter:'A',text:'-4'},{letter:'B',text:'4'},{letter:'C',text:'4i'},{letter:'D',text:'-4i'}],ans:'A',sol:'**Square the term.**\n\n```\n(2i)² = 2² × i²\n      = 4 × (-1)\n      = -4\n```\n**Key insight:** (2i)² = 4i² = 4(-1) = -4.'},

  {pos:31,diff:'hard',text:'Simplify: i³ + i⁵',ch:[{letter:'A',text:'0'},{letter:'B',text:'2i'},{letter:'C',text:'-2i'},{letter:'D',text:'i'}],ans:'A',sol:'**Evaluate each power.**\n\n```\ni³ = -i\ni⁵ = i\n\ni³ + i⁵ = -i + i = 0\n```\n**Key insight:** i³ = -i and i⁵ = i, so they cancel out to give 0.'},

  {pos:32,diff:'hard',text:'What is |2 - 2i|?',ch:[{letter:'A',text:'2'},{letter:'B',text:'2√2'},{letter:'C',text:'4'},{letter:'D',text:'0'}],ans:'B',sol:'**Use the modulus formula.**\n\n```\n|2 - 2i| = √(2² + (-2)²)\n         = √(4 + 4)\n         = √8\n         = 2√2\n```\n**Key insight:** |a + bi| = √(a² + b²). Here, |2-2i| = 2√2.'},

  {pos:33,diff:'hard',text:'What is i × i × i × i?',ch:[{letter:'A',text:'1'},{letter:'B',text:'-1'},{letter:'C',text:'i'},{letter:'D',text:'-i'}],ans:'A',sol:'**Multiply four i\'s together.**\n\n```\ni × i × i × i = i⁴ = 1\n```\n**Key insight:** Four factors of i give i⁴ = 1.'},

  {pos:34,diff:'hard',text:'Divide: (4 + 2i) / (1 - i)',ch:[{letter:'A',text:'1 + 3i'},{letter:'B',text:'2 + 3i'},{letter:'C',text:'3 + i'},{letter:'D',text:'2 + i'}],ans:'A',sol:'**Multiply by the conjugate of the denominator.**\n\n```\n(4+2i)/(1-i) × (1+i)/(1+i)\n= (4+2i)(1+i) / (1-i)(1+i)\n\nNumerator:\n(4+2i)(1+i) = 4 + 4i + 2i + 2i²\n            = 4 + 6i - 2\n            = 2 + 6i\n\nDenominator:\n(1-i)(1+i) = 1 - i² = 1 - (-1) = 2\n\nResult = (2+6i)/2 = 1 + 3i\n```\n**Key insight:** To divide complex numbers, multiply by conjugate of denominator. Result = 1 + 3i.'},

  {pos:35,diff:'hard',text:'What is the complex conjugate of i?',ch:[{letter:'A',text:'-i'},{letter:'B',text:'i'},{letter:'C',text:'1'},{letter:'D',text:'-1'}],ans:'A',sol:'**Change the sign of the imaginary part.**\n\n```\ni = 0 + i\n\nConjugate = 0 - i = -i\n```\n**Key insight:** The conjugate of i is -i.'},

  {pos:36,diff:'hard',text:'Simplify: (3i)(-2i)',ch:[{letter:'A',text:'6'},{letter:'B',text:'-6'},{letter:'C',text:'6i'},{letter:'D',text:'-6i²'}],ans:'A',sol:'**Multiply and simplify.**\n\n```\n(3i)(-2i) = -6i²\n          = -6(-1)\n          = 6\n```\n**Key insight:** (3i)(-2i) = -6i² = 6 (real number).'},

  {pos:37,diff:'hard',text:'What is 0 + 5i in simplified form?',ch:[{letter:'A',text:'5i'},{letter:'B',text:'5'},{letter:'C',text:'0'},{letter:'D',text:'i'}],ans:'A',sol:'**Write without the zero.**\n\n```\n0 + 5i = 5i\n```\n**Key insight:** 0 + 5i simplifies to just 5i (purely imaginary).'},

  {pos:38,diff:'hard',text:'What is i⁻¹ (the inverse of i)?',ch:[{letter:'A',text:'i'},{letter:'B',text:'-i'},{letter:'C',text:'1'},{letter:'D',text:'-1'}],ans:'B',sol:'**Find 1/i.**\n\n```\ni⁻¹ = 1/i\n    = 1/i × i/i\n    = i/i²\n    = i/(-1)\n    = -i\n```\n**Key insight:** The multiplicative inverse of i is -i.'},

  {pos:39,diff:'hard',text:'Multiply: i(2 - i)',ch:[{letter:'A',text:'1 + 2i'},{letter:'B',text:'2i - i²'},{letter:'C',text:'2i + 1'},{letter:'D',text:'2 - i'}],ans:'A',sol:'**Distribute i.**\n\n```\ni(2-i) = 2i - i²\n       = 2i - (-1)\n       = 2i + 1\n       = 1 + 2i\n```\n**Key insight:** Distribute and simplify using i² = -1. Result = 1 + 2i.'},

  {pos:40,diff:'hard',text:'What is Re((3 + 4i)(1 - i))? (Re means real part)',ch:[{letter:'A',text:'7'},{letter:'B',text:'-1'},{letter:'C',text:'3'},{letter:'D',text:'1'}],ans:'A',sol:'**Multiply and extract real part.**\n\n```\n(3+4i)(1-i) = 3 - 3i + 4i - 4i²\n            = 3 + i - 4(-1)\n            = 3 + i + 4\n            = 7 + i\n\nRe(7 + i) = 7\n```\n**Key insight:** Multiply using FOIL, simplify, then take the real part. Answer = 7.'},

  {pos:41,diff:'hard',text:'What is Im((2 + 5i) + (3 - 2i))? (Im means imaginary part)',ch:[{letter:'A',text:'3'},{letter:'B',text:'5'},{letter:'C',text:'7'},{letter:'D',text:'-2'}],ans:'A',sol:'**Add and extract imaginary part.**\n\n```\n(2+5i) + (3-2i) = 5 + 3i\n\nIm(5 + 3i) = 3\n```\n**Key insight:** Add the complex numbers to get 5 + 3i. The imaginary part (coefficient of i) is 3.'},

  {pos:42,diff:'hard',text:'Simplify: (i - 1)(i + 1)',ch:[{letter:'A',text:'-2'},{letter:'B',text:'0'},{letter:'C',text:'2i'},{letter:'D',text:'i² - 1'}],ans:'A',sol:'**Use difference of squares formula.**\n\n```\n(i-1)(i+1) = i² - 1²\n           = -1 - 1\n           = -2\n```\n**Key insight:** This is (a-b)(a+b) = a² - b². Here, i² - 1 = -1 - 1 = -2.'},

  {pos:43,diff:'hard',text:'What is |i|?',ch:[{letter:'A',text:'0'},{letter:'B',text:'1'},{letter:'C',text:'-1'},{letter:'D',text:'i'}],ans:'B',sol:'**Find modulus of i = 0 + 1i.**\n\n```\n|i| = |0 + 1i|\n    = √(0² + 1²)\n    = √1\n    = 1\n```\n**Key insight:** The modulus of i is 1 (distance from origin to point (0,1) in complex plane).'},

  {pos:44,diff:'hard',text:'Simplify: 2(3 - i) - (4 + 2i)',ch:[{letter:'A',text:'2 - 4i'},{letter:'B',text:'2 + 4i'},{letter:'C',text:'6 - 4i'},{letter:'D',text:'10 - 4i'}],ans:'A',sol:'**Distribute and combine.**\n\n```\n2(3-i) - (4+2i) = 6 - 2i - 4 - 2i\n                = 2 - 4i\n```\n**Key insight:** Distribute 2, then subtract the second complex number. Result = 2 - 4i.'},

  {pos:45,diff:'hard',text:'What is i⁻²?',ch:[{letter:'A',text:'-1'},{letter:'B',text:'1'},{letter:'C',text:'i'},{letter:'D',text:'-i'}],ans:'A',sol:'**Use i⁻¹ = -i.**\n\n```\ni⁻² = (i⁻¹)²\n    = (-i)²\n    = (-1)² × i²\n    = 1 × (-1)\n    = -1\n\nOr: i⁻² = 1/i² = 1/(-1) = -1\n```\n**Key insight:** i⁻² = 1/i² = 1/(-1) = -1.'},

  {pos:46,diff:'hard',text:'If z₁ = 1 + i and z₂ = 1 - i, what is z₁ × z₂?',ch:[{letter:'A',text:'2'},{letter:'B',text:'0'},{letter:'C',text:'2i'},{letter:'D',text:'1 + i'}],ans:'A',sol:'**Multiply conjugate pairs.**\n\n```\nz₁ × z₂ = (1+i)(1-i)\n        = 1² - i²\n        = 1 - (-1)\n        = 2\n```\n**Key insight:** Conjugates multiply to give |z|² (a real number). Here, result = 2.'},

  {pos:47,diff:'hard',text:'What is (3i)³?',ch:[{letter:'A',text:'27i'},{letter:'B',text:'-27i'},{letter:'C',text:'27'},{letter:'D',text:'-27'}],ans:'B',sol:'**Cube the term.**\n\n```\n(3i)³ = 3³ × i³\n      = 27 × (-i)\n      = -27i\n```\n**Key insight:** (3i)³ = 27i³ = 27(-i) = -27i.'},

  {pos:48,diff:'hard',text:'Simplify: √(-4) × √(-9)',ch:[{letter:'A',text:'6i'},{letter:'B',text:'-6'},{letter:'C',text:'6'},{letter:'D',text:'-6i²'}],ans:'B',sol:'**Convert to i form and multiply.**\n\n```\n√(-4) × √(-9) = 2i × 3i\n              = 6i²\n              = 6(-1)\n              = -6\n```\n**Key insight:** √(-4) = 2i and √(-9) = 3i, so their product is 6i² = -6.'},

  {pos:49,diff:'hard',text:'What is the argument (angle) of i in radians?',ch:[{letter:'A',text:'0'},{letter:'B',text:'π/2'},{letter:'C',text:'π'},{letter:'D',text:'3π/2'}],ans:'B',sol:'**Identify position on complex plane.**\n\n```\ni = 0 + 1i corresponds to point (0, 1)\n\nThis is on the positive imaginary axis\nAngle from positive real axis = π/2 radians (90°)\n```\n**Key insight:** The argument of i is π/2 radians, as it points straight up on the complex plane.'},

  {pos:50,diff:'hard',text:'What is |3 + 0i|?',ch:[{letter:'A',text:'0'},{letter:'B',text:'3'},{letter:'C',text:'-3'},{letter:'D',text:'√3'}],ans:'B',sol:'**Find modulus of real number.**\n\n```\n|3 + 0i| = √(3² + 0²)\n         = √9\n         = 3\n```\n**Key insight:** The modulus of a real number is its absolute value. |3| = 3.'},
];

async function insertQuestions() {
  // Get lesson_id for Complex Numbers
  const { data: lesson, error: lessonError } = await supabase
    .from('lessons')
    .select('id')
    .eq('lesson_key', 'complex-numbers')
    .single();

  if (lessonError || !lesson) {
    console.error('Error finding lesson complex-numbers:', lessonError);
    return;
  }

  const lessonId = lesson.id;
  console.log(`Found lesson complex-numbers with ID: ${lessonId}\n`);

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
        title: `Complex Numbers Q${q.pos}`,
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
