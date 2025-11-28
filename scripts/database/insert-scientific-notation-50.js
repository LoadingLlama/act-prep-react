require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceRoleKey) {
  console.error('Missing Supabase credentials');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

const LESSON_KEY = '5.5';

const questions = [
  {pos:1,diff:'hard',text:'Express 0.00000456 in scientific notation.',ch:[{letter:'A',text:'4.56 × 10⁻⁶'},{letter:'B',text:'4.56 × 10⁶'},{letter:'C',text:'45.6 × 10⁻⁷'},{letter:'D',text:'0.456 × 10⁻⁵'}],ans:'A',sol:'**Convert to scientific notation by moving the decimal point.**\n\nTo convert 0.00000456 to scientific notation, move the decimal point to the right until you have a number between 1 and 10:\n```\n0.00000456 → 4.56\n```\nCount how many places you moved: 6 places to the right. Since we moved right (making the number larger), the exponent is negative:\n```\n4.56 × 10⁻⁶\n```\n**Key rule:** When the original number is less than 1, the exponent is negative. Each place you move the decimal right adds -1 to the exponent.'},

  {pos:2,diff:'hard',text:'Express 3,400,000 in scientific notation.',ch:[{letter:'A',text:'3.4 × 10⁶'},{letter:'B',text:'3.4 × 10⁷'},{letter:'C',text:'34 × 10⁵'},{letter:'D',text:'0.34 × 10⁷'}],ans:'A',sol:'**Move the decimal point left to get a number between 1 and 10.**\n\nStarting with 3,400,000, move the decimal point left:\n```\n3,400,000 → 3.4\n```\nCount the places moved: 6 places to the left. Since we moved left (making the number smaller), the exponent is positive:\n```\n3.4 × 10⁶\n```\n**Key rule:** When the original number is greater than 10, the exponent is positive. Each place you move the decimal left adds +1 to the exponent.'},

  {pos:3,diff:'hard',text:'What is (2 × 10³) × (3 × 10⁴)?',ch:[{letter:'A',text:'6 × 10⁷'},{letter:'B',text:'5 × 10⁷'},{letter:'C',text:'6 × 10¹²'},{letter:'D',text:'2.3 × 10⁷'}],ans:'A',sol:'**Multiply coefficients and add exponents.**\n\nWhen multiplying numbers in scientific notation:\n```\n(2 × 10³) × (3 × 10⁴)\n= (2 × 3) × (10³ × 10⁴)\n= 6 × 10³⁺⁴\n= 6 × 10⁷\n```\n**Exponent rule:** When multiplying powers of 10, add the exponents: 10ᵃ × 10ᵇ = 10ᵃ⁺ᵇ. This is because 10³ × 10⁴ = (10×10×10) × (10×10×10×10) = 10⁷.'},

  {pos:4,diff:'hard',text:'What is (8 × 10⁶) ÷ (2 × 10²)?',ch:[{letter:'A',text:'4 × 10⁴'},{letter:'B',text:'4 × 10³'},{letter:'C',text:'6 × 10⁴'},{letter:'D',text:'16 × 10³'}],ans:'A',sol:'**Divide coefficients and subtract exponents.**\n\nWhen dividing numbers in scientific notation:\n```\n(8 × 10⁶) ÷ (2 × 10²)\n= (8 ÷ 2) × (10⁶ ÷ 10²)\n= 4 × 10⁶⁻²\n= 4 × 10⁴\n```\n**Exponent rule:** When dividing powers of 10, subtract the exponents: 10ᵃ ÷ 10ᵇ = 10ᵃ⁻ᵇ. This is because 10⁶/10² = (10×10×10×10×10×10)/(10×10) = 10⁴.'},

  {pos:5,diff:'hard',text:'Express 5.67 × 10⁻⁴ as a standard decimal number.',ch:[{letter:'A',text:'0.000567'},{letter:'B',text:'0.00567'},{letter:'C',text:'56,700'},{letter:'D',text:'5670'}],ans:'A',sol:'**Move decimal point left for negative exponents.**\n\nThe exponent -4 tells us to move the decimal point 4 places to the left:\n```\nStart: 5.67\nMove left 4 places: 0.000567\n```\n**Key insight:** Negative exponents mean the number is small (less than 1). Moving the decimal left makes the number smaller. Starting from 5.67, we add zeros as placeholders: 0.567 → 0.0567 → 0.00567 → 0.000567.'},

  {pos:6,diff:'hard',text:'Express 2.5 × 10⁵ as a standard decimal number.',ch:[{letter:'A',text:'250,000'},{letter:'B',text:'25,000'},{letter:'C',text:'2,500,000'},{letter:'D',text:'0.000025'}],ans:'A',sol:'**Move decimal point right for positive exponents.**\n\nThe exponent 5 tells us to move the decimal point 5 places to the right:\n```\nStart: 2.5\nMove right 5 places: 250,000\n```\n**Process:** 2.5 → 25 → 250 → 2,500 → 25,000 → 250,000. We add zeros as needed when moving right. Positive exponents make numbers larger.'},

  {pos:7,diff:'hard',text:'Which is larger: 3.2 × 10⁶ or 5.1 × 10⁵?',ch:[{letter:'A',text:'3.2 × 10⁶'},{letter:'B',text:'5.1 × 10⁵'},{letter:'C',text:'They are equal'},{letter:'D',text:'Cannot be determined'}],ans:'A',sol:'**Compare exponents first, then coefficients.**\n\nWhen comparing scientific notation:\n```\n3.2 × 10⁶ = 3,200,000\n5.1 × 10⁵ = 510,000\n```\nSince 10⁶ > 10⁵, and both coefficients are positive, 3.2 × 10⁶ is larger.\n\n**Quick rule:** If exponents differ, the number with the larger exponent is bigger (assuming positive coefficients). We don\'t even need to check coefficients when exponents differ by more than 1.'},

  {pos:8,diff:'hard',text:'What is (4.5 × 10³) + (2.3 × 10³)?',ch:[{letter:'A',text:'6.8 × 10³'},{letter:'B',text:'6.8 × 10⁶'},{letter:'C',text:'6.8 × 10⁹'},{letter:'D',text:'10.35 × 10³'}],ans:'A',sol:'**When exponents are the same, add coefficients.**\n\nSince both numbers have 10³, we can factor it out:\n```\n(4.5 × 10³) + (2.3 × 10³)\n= (4.5 + 2.3) × 10³\n= 6.8 × 10³\n```\n**This works like:** 4.5 thousands + 2.3 thousands = 6.8 thousands. When exponents match, simply add the coefficients and keep the same power of 10.'},

  {pos:9,diff:'hard',text:'What is (7.2 × 10⁴) - (3.1 × 10⁴)?',ch:[{letter:'A',text:'4.1 × 10⁴'},{letter:'B',text:'4.1 × 10⁸'},{letter:'C',text:'10.3 × 10⁴'},{letter:'D',text:'4.1'}],ans:'A',sol:'**Subtract coefficients when exponents match.**\n\nBoth numbers have 10⁴, so:\n```\n(7.2 × 10⁴) - (3.1 × 10⁴)\n= (7.2 - 3.1) × 10⁴\n= 4.1 × 10⁴\n```\n**Like subtraction:** 7.2 ten-thousands minus 3.1 ten-thousands equals 4.1 ten-thousands. The power of 10 doesn\'t change during addition or subtraction when exponents are equal.'},

  {pos:10,diff:'hard',text:'Express 0.082 in scientific notation.',ch:[{letter:'A',text:'8.2 × 10⁻²'},{letter:'B',text:'8.2 × 10²'},{letter:'C',text:'82 × 10⁻³'},{letter:'D',text:'0.82 × 10⁻¹'}],ans:'A',sol:'**Move decimal right to get a number between 1 and 10.**\n\nStarting with 0.082:\n```\n0.082 → 8.2\n```\nWe moved the decimal 2 places to the right, so the exponent is -2:\n```\n8.2 × 10⁻²\n```\n**Verification:** 8.2 × 10⁻² = 8.2 × 0.01 = 0.082 ✓'},

  {pos:11,diff:'hard',text:'What is (9 × 10⁵) × (4 × 10⁻³)?',ch:[{letter:'A',text:'3.6 × 10³'},{letter:'B',text:'3.6 × 10²'},{letter:'C',text:'36 × 10²'},{letter:'D',text:'13 × 10²'}],ans:'A',sol:'**Multiply coefficients, add exponents (including negatives).**\n\n```\n(9 × 10⁵) × (4 × 10⁻³)\n= (9 × 4) × (10⁵ × 10⁻³)\n= 36 × 10⁵⁺⁽⁻³⁾\n= 36 × 10²\n```\nBut 36 is not between 1 and 10, so adjust:\n```\n36 × 10² = 3.6 × 10³\n```\n**Important:** When the coefficient exceeds 10, move the decimal left one place and add 1 to the exponent to maintain proper scientific notation.'},

  {pos:12,diff:'hard',text:'What is (6 × 10⁻⁴) ÷ (3 × 10⁻⁷)?',ch:[{letter:'A',text:'2 × 10³'},{letter:'B',text:'2 × 10⁻¹¹'},{letter:'C',text:'2 × 10⁻³'},{letter:'D',text:'9 × 10³'}],ans:'A',sol:'**Divide coefficients, subtract exponents.**\n\n```\n(6 × 10⁻⁴) ÷ (3 × 10⁻⁷)\n= (6 ÷ 3) × (10⁻⁴ ÷ 10⁻⁷)\n= 2 × 10⁻⁴⁻⁽⁻⁷⁾\n= 2 × 10⁻⁴⁺⁷\n= 2 × 10³\n```\n**Key point:** Subtracting a negative is the same as adding: -4 - (-7) = -4 + 7 = 3.'},

  {pos:13,diff:'hard',text:'Express 789,000,000 in scientific notation.',ch:[{letter:'A',text:'7.89 × 10⁸'},{letter:'B',text:'7.89 × 10⁹'},{letter:'C',text:'78.9 × 10⁷'},{letter:'D',text:'789 × 10⁶'}],ans:'A',sol:'**Move decimal left to create a number between 1 and 10.**\n\n```\n789,000,000 → 7.89\n```\nDecimal moved 8 places left, so exponent is +8:\n```\n7.89 × 10⁸\n```\n**Count carefully:** 789,000,000 = 789 million. Moving from 789000000. to 7.89 is 8 places.'},

  {pos:14,diff:'hard',text:'What is (1.5 × 10⁴) + (3 × 10³)?',ch:[{letter:'A',text:'1.8 × 10⁴'},{letter:'B',text:'4.5 × 10⁷'},{letter:'C',text:'4.5 × 10⁴'},{letter:'D',text:'3.15 × 10⁴'}],ans:'A',sol:'**Convert to same exponent before adding.**\n\nSince exponents differ, rewrite with same power of 10:\n```\n1.5 × 10⁴ = 15 × 10³\n3 × 10³ = 3 × 10³\n```\nNow add:\n```\n15 × 10³ + 3 × 10³ = 18 × 10³\n```\nConvert to proper form:\n```\n18 × 10³ = 1.8 × 10⁴\n```\n**Alternative:** 1.5 × 10⁴ = 15,000 and 3 × 10³ = 3,000, so 15,000 + 3,000 = 18,000 = 1.8 × 10⁴.'},

  {pos:15,diff:'hard',text:'Express 0.000000099 in scientific notation.',ch:[{letter:'A',text:'9.9 × 10⁻⁸'},{letter:'B',text:'9.9 × 10⁻⁷'},{letter:'C',text:'99 × 10⁻⁹'},{letter:'D',text:'0.99 × 10⁻⁷'}],ans:'A',sol:'**Move decimal right, count carefully.**\n\n```\n0.000000099 → 9.9\n```\nMoved 8 places right, so exponent is -8:\n```\n9.9 × 10⁻⁸\n```\n**Counting:** 0.0₁0₂0₃0₄0₅0₆0₇9₈9 - that\'s 8 places until we reach 9.9.'},

  {pos:16,diff:'hard',text:'What is (5 × 10²)²?',ch:[{letter:'A',text:'2.5 × 10⁵'},{letter:'B',text:'25 × 10⁴'},{letter:'C',text:'5 × 10⁴'},{letter:'D',text:'10 × 10⁴'}],ans:'A',sol:'**Square both coefficient and power of 10 separately.**\n\n```\n(5 × 10²)²\n= 5² × (10²)²\n= 25 × 10⁴\n```\nConvert to proper form:\n```\n25 × 10⁴ = 2.5 × 10⁵\n```\n**Power rule:** (10²)² = 10²ˣ² = 10⁴. When raising a power to a power, multiply the exponents.'},

  {pos:17,diff:'hard',text:'Which is smallest: 2.3 × 10⁻⁴, 5.1 × 10⁻⁵, or 7.8 × 10⁻⁴?',ch:[{letter:'A',text:'5.1 × 10⁻⁵'},{letter:'B',text:'2.3 × 10⁻⁴'},{letter:'C',text:'7.8 × 10⁻⁴'},{letter:'D',text:'They are equal'}],ans:'A',sol:'**For negative exponents, more negative = smaller.**\n\nCompare the exponents:\n```\n-5 < -4 < -4\n```\nSince 10⁻⁵ < 10⁻⁴, and 5.1 × 10⁻⁵ has the most negative exponent, it\'s the smallest.\n\n**In decimals:** 5.1 × 10⁻⁵ = 0.000051, while 2.3 × 10⁻⁴ = 0.00023. Clearly 0.000051 < 0.00023.'},

  {pos:18,diff:'hard',text:'What is (8.4 × 10⁶) ÷ (2.1 × 10⁴)?',ch:[{letter:'A',text:'4 × 10²'},{letter:'B',text:'4 × 10³'},{letter:'C',text:'6.3 × 10²'},{letter:'D',text:'10.5 × 10²'}],ans:'A',sol:'**Divide coefficients and subtract exponents.**\n\n```\n(8.4 × 10⁶) ÷ (2.1 × 10⁴)\n= (8.4 ÷ 2.1) × (10⁶ ÷ 10⁴)\n= 4 × 10⁶⁻⁴\n= 4 × 10²\n```\n**Verification:** 8.4 ÷ 2.1 = 4, and 10⁶/10⁴ = 10² = 100.'},

  {pos:19,diff:'hard',text:'Express 12,340,000 in scientific notation.',ch:[{letter:'A',text:'1.234 × 10⁷'},{letter:'B',text:'1.234 × 10⁸'},{letter:'C',text:'12.34 × 10⁶'},{letter:'D',text:'123.4 × 10⁵'}],ans:'A',sol:'**Move decimal to get number between 1 and 10.**\n\n```\n12,340,000 → 1.234\n```\nMoved 7 places left:\n```\n1.234 × 10⁷\n```\n**Counting:** 1₇2₆3₅4₄0₃0₂0₁0 - seven places from the decimal point.'},

  {pos:20,diff:'hard',text:'What is (3 × 10⁸) × (2 × 10⁻⁵)?',ch:[{letter:'A',text:'6 × 10³'},{letter:'B',text:'6 × 10¹³'},{letter:'C',text:'5 × 10³'},{letter:'D',text:'6 × 10⁻⁴⁰'}],ans:'A',sol:'**Multiply coefficients, add exponents (including negative).**\n\n```\n(3 × 10⁸) × (2 × 10⁻⁵)\n= (3 × 2) × (10⁸ × 10⁻⁵)\n= 6 × 10⁸⁺⁽⁻⁵⁾\n= 6 × 10³\n```\n**Remember:** 8 + (-5) = 8 - 5 = 3.'},

  {pos:21,diff:'hard',text:'Express 0.0056 in scientific notation.',ch:[{letter:'A',text:'5.6 × 10⁻³'},{letter:'B',text:'5.6 × 10³'},{letter:'C',text:'56 × 10⁻⁴'},{letter:'D',text:'0.56 × 10⁻²'}],ans:'A',sol:'**Move decimal right to get 5.6.**\n\n```\n0.0056 → 5.6\n```\nMoved 3 places right, so exponent is -3:\n```\n5.6 × 10⁻³\n```\n**Check:** 5.6 × 10⁻³ = 5.6 × 0.001 = 0.0056 ✓'},

  {pos:22,diff:'hard',text:'What is (7 × 10⁴) - (2 × 10⁴)?',ch:[{letter:'A',text:'5 × 10⁴'},{letter:'B',text:'5 × 10⁸'},{letter:'C',text:'9 × 10⁴'},{letter:'D',text:'5'}],ans:'A',sol:'**Subtract coefficients when exponents are equal.**\n\n```\n(7 × 10⁴) - (2 × 10⁴)\n= (7 - 2) × 10⁴\n= 5 × 10⁴\n```\n**Simple:** Both are in units of 10⁴, so just subtract the coefficients.'},

  {pos:23,diff:'hard',text:'Express 4.5 × 10⁴ as a standard number.',ch:[{letter:'A',text:'45,000'},{letter:'B',text:'4,500'},{letter:'C',text:'450,000'},{letter:'D',text:'0.00045'}],ans:'A',sol:'**Move decimal 4 places right.**\n\n```\n4.5 × 10⁴\n```\nExponent is 4, so move right 4 places:\n```\n4.5 → 45 → 450 → 4,500 → 45,000\n```'},

  {pos:24,diff:'hard',text:'What is (1.2 × 10³) × (5 × 10²)?',ch:[{letter:'A',text:'6 × 10⁵'},{letter:'B',text:'6.2 × 10⁵'},{letter:'C',text:'6 × 10⁶'},{letter:'D',text:'12.5 × 10⁵'}],ans:'A',sol:'**Multiply coefficients and add exponents.**\n\n```\n(1.2 × 10³) × (5 × 10²)\n= (1.2 × 5) × (10³ × 10²)\n= 6 × 10⁵\n```\n**Calculation:** 1.2 × 5 = 6, and 10³ × 10² = 10⁵.'},

  {pos:25,diff:'hard',text:'Express 0.000234 in scientific notation.',ch:[{letter:'A',text:'2.34 × 10⁻⁴'},{letter:'B',text:'2.34 × 10⁴'},{letter:'C',text:'23.4 × 10⁻⁵'},{letter:'D',text:'234 × 10⁻⁶'}],ans:'A',sol:'**Move decimal right to 2.34.**\n\n```\n0.000234 → 2.34\n```\nMoved 4 places right, exponent is -4:\n```\n2.34 × 10⁻⁴\n```'},

  {pos:26,diff:'hard',text:'What is (9 × 10⁷) ÷ (3 × 10³)?',ch:[{letter:'A',text:'3 × 10⁴'},{letter:'B',text:'3 × 10¹⁰'},{letter:'C',text:'6 × 10⁴'},{letter:'D',text:'12 × 10⁴'}],ans:'A',sol:'**Divide coefficients and subtract exponents.**\n\n```\n(9 × 10⁷) ÷ (3 × 10³)\n= (9 ÷ 3) × (10⁷ ÷ 10³)\n= 3 × 10⁷⁻³\n= 3 × 10⁴\n```'},

  {pos:27,diff:'hard',text:'Express 56,000 in scientific notation.',ch:[{letter:'A',text:'5.6 × 10⁴'},{letter:'B',text:'5.6 × 10⁵'},{letter:'C',text:'56 × 10³'},{letter:'D',text:'0.56 × 10⁵'}],ans:'A',sol:'**Move decimal left to get 5.6.**\n\n```\n56,000 → 5.6\n```\nMoved 4 places left, exponent is 4:\n```\n5.6 × 10⁴\n```'},

  {pos:28,diff:'hard',text:'What is (4.8 × 10⁵) + (1.2 × 10⁵)?',ch:[{letter:'A',text:'6 × 10⁵'},{letter:'B',text:'6 × 10¹⁰'},{letter:'C',text:'6'},

{letter:'D',text:'3.6 × 10⁵'}],ans:'A',sol:'**Add coefficients when exponents match.**\n\n```\n(4.8 × 10⁵) + (1.2 × 10⁵)\n= (4.8 + 1.2) × 10⁵\n= 6 × 10⁵\n```'},

  {pos:29,diff:'hard',text:'Express 7.2 × 10⁻⁵ as a decimal.',ch:[{letter:'A',text:'0.000072'},{letter:'B',text:'0.00072'},{letter:'C',text:'72,000'},{letter:'D',text:'0.0072'}],ans:'A',sol:'**Move decimal left 5 places.**\n\nExponent is -5, so move left:\n```\n7.2 → 0.72 → 0.072 → 0.0072 → 0.00072 → 0.000072\n```'},

  {pos:30,diff:'hard',text:'What is (5 × 10⁴)³?',ch:[{letter:'A',text:'1.25 × 10¹⁴'},{letter:'B',text:'125 × 10¹²'},{letter:'C',text:'15 × 10¹²'},{letter:'D',text:'5 × 10¹²'}],ans:'A',sol:'**Cube coefficient and multiply exponent by 3.**\n\n```\n(5 × 10⁴)³\n= 5³ × (10⁴)³\n= 125 × 10¹²\n```\nConvert to proper form:\n```\n125 × 10¹² = 1.25 × 10¹⁴\n```\n**Power rule:** (10⁴)³ = 10⁴ˣ³ = 10¹².'},

  {pos:31,diff:'hard',text:'Which is larger: 6.7 × 10⁸ or 9.2 × 10⁷?',ch:[{letter:'A',text:'6.7 × 10⁸'},{letter:'B',text:'9.2 × 10⁷'},{letter:'C',text:'Equal'},{letter:'D',text:'Cannot determine'}],ans:'A',sol:'**Compare exponents first.**\n\nSince 8 > 7:\n```\n10⁸ > 10⁷\n```\nTherefore 6.7 × 10⁸ > 9.2 × 10⁷, even though 6.7 < 9.2.\n\n**In numbers:** 6.7 × 10⁸ = 670,000,000 while 9.2 × 10⁷ = 92,000,000.'},

  {pos:32,diff:'hard',text:'Express 0.78 in scientific notation.',ch:[{letter:'A',text:'7.8 × 10⁻¹'},{letter:'B',text:'7.8 × 10¹'},{letter:'C',text:'78 × 10⁻²'},{letter:'D',text:'0.78 × 10⁰'}],ans:'A',sol:'**Move decimal one place right.**\n\n```\n0.78 → 7.8\n```\nMoved 1 place right, exponent is -1:\n```\n7.8 × 10⁻¹\n```\n**Check:** 7.8 × 10⁻¹ = 7.8 × 0.1 = 0.78 ✓'},

  {pos:33,diff:'hard',text:'What is (6 × 10⁻²) × (4 × 10⁵)?',ch:[{letter:'A',text:'2.4 × 10⁴'},{letter:'B',text:'24 × 10³'},{letter:'C',text:'10 × 10³'},{letter:'D',text:'2.4 × 10⁻¹⁰'}],ans:'A',sol:'**Multiply coefficients and add exponents.**\n\n```\n(6 × 10⁻²) × (4 × 10⁵)\n= (6 × 4) × (10⁻² × 10⁵)\n= 24 × 10³\n```\nConvert to proper form:\n```\n24 × 10³ = 2.4 × 10⁴\n```\n**Exponent math:** -2 + 5 = 3.'},

  {pos:34,diff:'hard',text:'Express 3,200 in scientific notation.',ch:[{letter:'A',text:'3.2 × 10³'},{letter:'B',text:'3.2 × 10⁴'},{letter:'C',text:'32 × 10²'},{letter:'D',text:'0.32 × 10⁴'}],ans:'A',sol:'**Move decimal 3 places left.**\n\n```\n3,200 → 3.2\n```\nMoved 3 places, exponent is 3:\n```\n3.2 × 10³\n```'},

  {pos:35,diff:'hard',text:'What is (8 × 10³) ÷ (4 × 10⁻²)?',ch:[{letter:'A',text:'2 × 10⁵'},{letter:'B',text:'2 × 10¹'},{letter:'C',text:'12 × 10¹'},{letter:'D',text:'2 × 10⁻⁶'}],ans:'A',sol:'**Divide coefficients and subtract exponents.**\n\n```\n(8 × 10³) ÷ (4 × 10⁻²)\n= (8 ÷ 4) × (10³ ÷ 10⁻²)\n= 2 × 10³⁻⁽⁻²⁾\n= 2 × 10³⁺²\n= 2 × 10⁵\n```\n**Key:** Subtracting -2 is adding 2.'},

  {pos:36,diff:'hard',text:'Express 0.00000003 in scientific notation.',ch:[{letter:'A',text:'3 × 10⁻⁸'},{letter:'B',text:'3 × 10⁸'},{letter:'C',text:'3 × 10⁻⁷'},{letter:'D',text:'30 × 10⁻⁹'}],ans:'A',sol:'**Move decimal right to get 3.**\n\n```\n0.00000003 → 3\n```\nMoved 8 places right, exponent is -8:\n```\n3 × 10⁻⁸\n```'},

  {pos:37,diff:'hard',text:'What is (2.5 × 10⁶) - (5 × 10⁵)?',ch:[{letter:'A',text:'2 × 10⁶'},{letter:'B',text:'2.45 × 10⁶'},{letter:'C',text:'3 × 10⁶'},{letter:'D',text:'-2.5 × 10⁵'}],ans:'A',sol:'**Convert to same exponent, then subtract.**\n\nRewrite with same power:\n```\n2.5 × 10⁶ = 25 × 10⁵\n```\nNow subtract:\n```\n25 × 10⁵ - 5 × 10⁵ = 20 × 10⁵\n```\nConvert to proper form:\n```\n20 × 10⁵ = 2 × 10⁶\n```'},

  {pos:38,diff:'hard',text:'Express 1.5 × 10⁶ as a standard number.',ch:[{letter:'A',text:'1,500,000'},{letter:'B',text:'15,000'},{letter:'C',text:'150,000'},{letter:'D',text:'15,000,000'}],ans:'A',sol:'**Move decimal 6 places right.**\n\n```\n1.5 → 15 → 150 → 1,500 → 15,000 → 150,000 → 1,500,000\n```'},

  {pos:39,diff:'hard',text:'What is (3.6 × 10⁴) ÷ (1.2 × 10²)?',ch:[{letter:'A',text:'3 × 10²'},{letter:'B',text:'3 × 10⁶'},{letter:'C',text:'2.4 × 10²'},{letter:'D',text:'4.8 × 10²'}],ans:'A',sol:'**Divide both parts.**\n\n```\n(3.6 × 10⁴) ÷ (1.2 × 10²)\n= (3.6 ÷ 1.2) × (10⁴ ÷ 10²)\n= 3 × 10²\n```'},

  {pos:40,diff:'hard',text:'Express 450,000,000 in scientific notation.',ch:[{letter:'A',text:'4.5 × 10⁸'},{letter:'B',text:'4.5 × 10⁹'},{letter:'C',text:'45 × 10⁷'},{letter:'D',text:'450 × 10⁶'}],ans:'A',sol:'**Move decimal to get 4.5.**\n\n```\n450,000,000 → 4.5\n```\nMoved 8 places left:\n```\n4.5 × 10⁸\n```'},

  {pos:41,diff:'hard',text:'What is (7 × 10⁻³) + (3 × 10⁻³)?',ch:[{letter:'A',text:'1 × 10⁻²'},{letter:'B',text:'10 × 10⁻³'},{letter:'C',text:'10 × 10⁻⁶'},{letter:'D',text:'21 × 10⁻⁹'}],ans:'A',sol:'**Add coefficients.**\n\n```\n(7 × 10⁻³) + (3 × 10⁻³)\n= 10 × 10⁻³\n```\nConvert to proper form:\n```\n10 × 10⁻³ = 1 × 10⁻²\n```'},

  {pos:42,diff:'hard',text:'Express 0.0091 in scientific notation.',ch:[{letter:'A',text:'9.1 × 10⁻³'},{letter:'B',text:'9.1 × 10³'},{letter:'C',text:'91 × 10⁻⁴'},{letter:'D',text:'0.91 × 10⁻²'}],ans:'A',sol:'**Move decimal to 9.1.**\n\n```\n0.0091 → 9.1\n```\nMoved 3 places right, exponent is -3:\n```\n9.1 × 10⁻³\n```'},

  {pos:43,diff:'hard',text:'What is (5 × 10⁹) ÷ (2.5 × 10⁶)?',ch:[{letter:'A',text:'2 × 10³'},{letter:'B',text:'2 × 10¹⁵'},{letter:'C',text:'7.5 × 10³'},{letter:'D',text:'2.5 × 10³'}],ans:'A',sol:'**Divide coefficients and subtract exponents.**\n\n```\n(5 × 10⁹) ÷ (2.5 × 10⁶)\n= (5 ÷ 2.5) × (10⁹ ÷ 10⁶)\n= 2 × 10³\n```'},

  {pos:44,diff:'hard',text:'Express 6.4 × 10⁻² as a decimal.',ch:[{letter:'A',text:'0.064'},{letter:'B',text:'0.64'},{letter:'C',text:'64'},{letter:'D',text:'6.4'}],ans:'A',sol:'**Move decimal 2 places left.**\n\n```\n6.4 × 10⁻²\n```\nMove left 2 places:\n```\n6.4 → 0.64 → 0.064\n```'},

  {pos:45,diff:'hard',text:'What is (1.5 × 10⁷) × (2 × 10³)?',ch:[{letter:'A',text:'3 × 10¹⁰'},{letter:'B',text:'3 × 10²¹'},{letter:'C',text:'3.5 × 10¹⁰'},{letter:'D',text:'30 × 10⁹'}],ans:'A',sol:'**Multiply coefficients and add exponents.**\n\n```\n(1.5 × 10⁷) × (2 × 10³)\n= (1.5 × 2) × (10⁷ × 10³)\n= 3 × 10¹⁰\n```'},

  {pos:46,diff:'hard',text:'Express 0.000105 in scientific notation.',ch:[{letter:'A',text:'1.05 × 10⁻⁴'},{letter:'B',text:'1.05 × 10⁴'},{letter:'C',text:'10.5 × 10⁻⁵'},{letter:'D',text:'105 × 10⁻⁶'}],ans:'A',sol:'**Move decimal to 1.05.**\n\n```\n0.000105 → 1.05\n```\nMoved 4 places right, exponent is -4:\n```\n1.05 × 10⁻⁴\n```'},

  {pos:47,diff:'hard',text:'What is (9 × 10⁶) - (3 × 10⁵)?',ch:[{letter:'A',text:'8.7 × 10⁶'},{letter:'B',text:'6 × 10¹'},{letter:'C',text:'6 × 10⁶'},{letter:'D',text:'8.97 × 10⁶'}],ans:'A',sol:'**Convert to same exponent.**\n\nRewrite:\n```\n9 × 10⁶ = 90 × 10⁵\n```\nSubtract:\n```\n90 × 10⁵ - 3 × 10⁵ = 87 × 10⁵\n```\nConvert:\n```\n87 × 10⁵ = 8.7 × 10⁶\n```'},

  {pos:48,diff:'hard',text:'Express 8.1 × 10³ as a standard number.',ch:[{letter:'A',text:'8,100'},{letter:'B',text:'810'},{letter:'C',text:'81,000'},{letter:'D',text:'0.0081'}],ans:'A',sol:'**Move decimal 3 places right.**\n\n```\n8.1 → 81 → 810 → 8,100\n```'},

  {pos:49,diff:'hard',text:'What is (4 × 10⁻⁶) × (3 × 10⁸)?',ch:[{letter:'A',text:'1.2 × 10³'},{letter:'B',text:'12 × 10²'},{letter:'C',text:'7 × 10²'},{letter:'D',text:'1.2 × 10⁻⁴⁸'}],ans:'A',sol:'**Multiply coefficients and add exponents.**\n\n```\n(4 × 10⁻⁶) × (3 × 10⁸)\n= (4 × 3) × (10⁻⁶ × 10⁸)\n= 12 × 10²\n```\nConvert:\n```\n12 × 10² = 1.2 × 10³\n```\n**Exponents:** -6 + 8 = 2.'},

  {pos:50,diff:'hard',text:'Express 0.00456 in scientific notation.',ch:[{letter:'A',text:'4.56 × 10⁻³'},{letter:'B',text:'4.56 × 10³'},{letter:'C',text:'45.6 × 10⁻⁴'},{letter:'D',text:'456 × 10⁻⁵'}],ans:'A',sol:'**Move decimal to 4.56.**\n\n```\n0.00456 → 4.56\n```\nMoved 3 places right, exponent is -3:\n```\n4.56 × 10⁻³\n```'}
];

async function run() {
  try {
    const { data: lesson, error: lessonError } = await supabase
      .from('lessons')
      .select('id')
      .eq('lesson_key', LESSON_KEY)
      .single();

    if (lessonError || !lesson) {
      console.error('Lesson not found:', LESSON_KEY);
      process.exit(1);
    }

    const lessonId = lesson.id;
    let successCount = 0;
    let errorCount = 0;

    for (const q of questions) {
      const { error } = await supabase.from('practice_questions').insert({
        lesson_id: lessonId,
        subject: 'math',
        position: q.pos,
        difficulty: q.diff,
        title: `Scientific Notation ${q.pos}`,
        problem_text: q.text,
        choices: q.ch,
        correct_answer: q.ans,
        answer_explanation: q.sol
      });

      if (error) {
        console.error(`Error inserting question ${q.pos}:`, error.message);
        errorCount++;
      } else {
        successCount++;
      }
    }

    console.log(`\n=== COMPLETE: ${successCount}/${questions.length} success, ${errorCount}/${questions.length} errors ===`);
  } catch (err) {
    console.error('Fatal error:', err);
    process.exit(1);
  }
}

run();
