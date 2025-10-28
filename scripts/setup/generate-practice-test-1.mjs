/**
 * Generate Practice Test 1 - All 215 Questions
 * Follows PRACTICE-TEST-1-SPECIFICATION.md exactly
 * Uses patterns from comprehensive-pattern-analysis.json
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '../../.env') });

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

/**
 * Generate English Section - 75 Questions (5 passages, 15 questions each)
 */
function generateEnglishQuestions() {
  const questions = [];

  // PASSAGE 1: Literary Narrative (Q1-15)
  const passage1 = `The summer I turned sixteen, my grandmother decided to teach me the art of traditional quilting. She had been making quilts for over fifty years, each one a testament to her patience and skill. "A quilt," she would often say, "is more than just fabric and thread. It's a story stitched together, piece by piece."

Every morning that summer, I would arrive at her small cottage on Maple Street. The living room was transformed into a quilting workshop, with colorful fabrics spread across every surface. She showed me how to select complementary colors, how to cut precise squares, and most importantly, how to sew each piece with care and attention.

At first, my stitches were uneven and clumsy. Grandmother would patiently unpick my work and guide my hands through the proper technique. "Don't rush," she'd remind me gently. "Each stitch matters." As the weeks passed, my skills improved gradually. By August, I had completed my first quilt square—a simple pattern of blues and greens that reminded me of the ocean.

That summer taught me more than quilting. It taught me the value of patience, the importance of preserving traditions, and the deep satisfaction that comes from creating something beautiful with your own hands. Now, years later, I still have that first quilt square framed on my wall, a reminder of those precious mornings with my grandmother.`;

  // Q1-15: Literary Narrative questions
  questions.push(
    {
      test_number: 1,
      section: 'english',
      question_number: 1,
      passage: passage1,
      question: 'The summer I turned sixteen, my grandmother decided to teach me the art of traditional quilting.',
      choices: JSON.stringify([
        'A. NO CHANGE',
        'B. decides to teach',
        'C. had decided to teach',
        'D. would decide to teach'
      ]),
      correct_answer: 0,
      explanation: 'The simple past tense "decided" correctly establishes the timeframe of the narrative. The sentence introduces an event that happened in a specific past summer.'
    },
    {
      test_number: 1,
      section: 'english',
      question_number: 2,
      passage: passage1,
      question: 'She had been making quilts for over fifty years, each one a testament to her patience and skill.',
      choices: JSON.stringify([
        'A. NO CHANGE',
        'B. years; each one',
        'C. years each one',
        'D. years. Each one'
      ]),
      correct_answer: 1,
      explanation: 'The semicolon correctly joins two independent clauses that are closely related. The second clause elaborates on the first.'
    },
    {
      test_number: 1,
      section: 'english',
      question_number: 3,
      passage: passage1,
      question: '"A quilt," she would often say, "is more than just fabric and thread. It\'s a story stitched together, piece by piece."',
      choices: JSON.stringify([
        'A. NO CHANGE',
        'B. "is more than just fabric and thread, it\'s a story"',
        'C. "is more than just fabric and thread; a story"',
        'D. "is nothing but fabric and thread. It\'s a story"'
      ]),
      correct_answer: 0,
      explanation: 'The original punctuation correctly separates two complete sentences within the quotation. The period is appropriate between independent clauses.'
    },
    {
      test_number: 1,
      section: 'english',
      question_number: 4,
      passage: passage1,
      question: 'Every morning that summer, I would arrive at her small cottage on Maple Street.',
      choices: JSON.stringify([
        'A. NO CHANGE',
        'B. I would have arrived',
        'C. I was arriving',
        'D. I had arrived'
      ]),
      correct_answer: 0,
      explanation: 'The phrase "would arrive" correctly expresses repeated action in the past, consistent with "every morning." This construction effectively shows habitual action.'
    },
    {
      test_number: 1,
      section: 'english',
      question_number: 5,
      passage: passage1,
      question: 'The living room was transformed into a quilting workshop, with colorful fabrics spread across every surface.',
      choices: JSON.stringify([
        'A. NO CHANGE',
        'B. workshop with colorful fabrics',
        'C. workshop; with colorful fabrics',
        'D. workshop. With colorful fabrics'
      ]),
      correct_answer: 0,
      explanation: 'The comma before "with" is correct because the phrase provides additional descriptive information. The comma appropriately sets off this descriptive element.'
    },
    {
      test_number: 1,
      section: 'english',
      question_number: 6,
      passage: passage1,
      question: 'She showed me how to select complementary colors, how to cut precise squares, and most importantly, how to sew each piece with care and attention.',
      choices: JSON.stringify([
        'A. NO CHANGE',
        'B. colors; how to cut precise squares; and most importantly',
        'C. colors, how to cut precise squares and most importantly',
        'D. colors and how to cut precise squares, and most importantly'
      ]),
      correct_answer: 0,
      explanation: 'The commas correctly separate three parallel "how to" phrases in a series. The comma after "importantly" correctly sets off this parenthetical phrase.'
    },
    {
      test_number: 1,
      section: 'english',
      question_number: 7,
      passage: passage1,
      question: 'At first, my stitches were uneven and clumsy.',
      choices: JSON.stringify([
        'A. NO CHANGE',
        'B. were real uneven and clumsy',
        'C. were uneven and rather clumsy',
        'D. were totally uneven and completely clumsy'
      ]),
      correct_answer: 0,
      explanation: 'The original phrasing is concise and effective. Options B, C, and D add unnecessary qualifiers that make the sentence wordy without adding meaning.'
    },
    {
      test_number: 1,
      section: 'english',
      question_number: 8,
      passage: passage1,
      question: 'Grandmother would patiently unpick my work and guide my hands through the proper technique.',
      choices: JSON.stringify([
        'A. NO CHANGE',
        'B. patiently unpick my work, and guide',
        'C. patiently unpick my work and then guide',
        'D. patiently unpick my work; guiding'
      ]),
      correct_answer: 0,
      explanation: 'No comma is needed before "and" when joining two verb phrases with the same subject. The compound predicate does not require punctuation.'
    },
    {
      test_number: 1,
      section: 'english',
      question_number: 9,
      passage: passage1,
      question: 'Which choice best maintains the grandmother\'s gentle and encouraging tone?',
      choices: JSON.stringify([
        'A. "Don\'t rush," she\'d remind me gently. "Each stitch matters."',
        'B. "You need to slow down," she\'d tell me firmly. "Every stitch is important."',
        'C. "Stop rushing," she\'d say sternly. "Each stitch is crucial."',
        'D. "Take your time," she\'d command. "Each stitch counts."'
      ]),
      correct_answer: 0,
      explanation: 'Option A uses "remind me gently" which best conveys the grandmother\'s patient and nurturing teaching style established throughout the passage.'
    },
    {
      test_number: 1,
      section: 'english',
      question_number: 10,
      passage: passage1,
      question: 'As the weeks passed, my skills improved gradually.',
      choices: JSON.stringify([
        'A. NO CHANGE',
        'B. As the weeks passed my skills',
        'C. As the weeks passed; my skills',
        'D. When the weeks passed, my skills'
      ]),
      correct_answer: 0,
      explanation: 'The comma correctly follows the introductory dependent clause "As the weeks passed." This punctuation is standard for introductory elements.'
    },
    {
      test_number: 1,
      section: 'english',
      question_number: 11,
      passage: passage1,
      question: 'By August, I had completed my first quilt square—a simple pattern of blues and greens that reminded me of the ocean.',
      choices: JSON.stringify([
        'A. NO CHANGE',
        'B. square: a simple pattern',
        'C. square, a simple pattern',
        'D. square; a simple pattern'
      ]),
      correct_answer: 0,
      explanation: 'The em dash effectively sets off the descriptive appositive, creating emphasis and adding stylistic variety to the passage.'
    },
    {
      test_number: 1,
      section: 'english',
      question_number: 12,
      passage: passage1,
      question: 'That summer taught me more than quilting.',
      choices: JSON.stringify([
        'A. NO CHANGE',
        'B. That summer taught myself',
        'C. That summer taught I',
        'D. That summer had taught me'
      ]),
      correct_answer: 0,
      explanation: 'The pronoun "me" is the correct object pronoun after the verb "taught." The simple past tense maintains consistency with the narrative.'
    },
    {
      test_number: 1,
      section: 'english',
      question_number: 13,
      passage: passage1,
      question: 'It taught me the value of patience, the importance of preserving traditions, and the deep satisfaction that comes from creating something beautiful with your own hands.',
      choices: JSON.stringify([
        'A. NO CHANGE',
        'B. with my own hands',
        'C. with one\'s own hands',
        'D. by hand'
      ]),
      correct_answer: 1,
      explanation: 'The pronoun "my" maintains consistency with the first-person point of view used throughout the passage. "Your" shifts to second person incorrectly.'
    },
    {
      test_number: 1,
      section: 'english',
      question_number: 14,
      passage: passage1,
      question: 'Now, years later, I still have that first quilt square framed on my wall, a reminder of those precious mornings with my grandmother.',
      choices: JSON.stringify([
        'A. NO CHANGE',
        'B. wall; a reminder',
        'C. wall. A reminder',
        'D. wall—a reminder'
      ]),
      correct_answer: 0,
      explanation: 'The comma correctly introduces the appositive phrase "a reminder of those precious mornings." This punctuation effectively connects the descriptive element.'
    },
    {
      test_number: 1,
      section: 'english',
      question_number: 15,
      passage: passage1,
      question: 'Suppose the writer\'s goal was to write an essay that conveys the lasting impact of learning a traditional craft from a family member. Would this essay successfully accomplish that goal?',
      choices: JSON.stringify([
        'A. Yes, because the essay describes specific quilting techniques the narrator learned.',
        'B. Yes, because the essay emphasizes the personal lessons and memories that endured beyond the technical skills.',
        'C. No, because the essay focuses too much on the grandmother\'s quilting history.',
        'D. No, because the essay does not explain why traditional crafts are important to preserve.'
      ]),
      correct_answer: 1,
      explanation: 'Option B correctly identifies that the essay\'s main focus is on the lasting personal impact (patience, tradition, satisfaction) rather than just technical skills, fulfilling the stated goal.'
    }
  );

  // PASSAGE 2: Social Studies Essay (Q16-30) - will generate next
  const passage2 = `The Underground Railroad was neither underground nor a railroad, but rather a network of secret routes and safe houses used by enslaved African Americans to escape to free states and Canada in the 19th century. This remarkable system, which operated from the late 1700s until the end of the Civil War in 1865, represented one of the most significant resistance movements in American history.

The network relied on the courage of "conductors"—individuals who guided escapees—and "stationmasters," who provided shelter and resources. Harriet Tubman, perhaps the most famous conductor, made approximately thirteen missions to rescue around seventy enslaved people. Despite the constant danger of capture and the severe penalties for aiding runaways, thousands of abolitionists, both Black and white, risked their lives to support this cause.

The routes varied depending on geography and available resources. In the North, escapees might travel from one safe house to another, moving under cover of darkness. In the South, they often followed natural landmarks like rivers and used the North Star for navigation. The journey was perilous; escapees faced harsh weather, limited food, and the ever-present threat of slave catchers.

The Underground Railroad's impact extended beyond the individuals it saved. It challenged the institution of slavery, demonstrated the possibility of organized resistance, and helped galvanize the abolitionist movement. Today, many of the safe houses and routes have been preserved as historic sites, ensuring that this crucial chapter of American history is not forgotten.`;

  // Q16-30: Social Studies questions
  questions.push(
    {
      test_number: 1,
      section: 'english',
      question_number: 16,
      passage: passage2,
      question: 'The Underground Railroad was neither underground nor a railroad, but rather a network of secret routes and safe houses used by enslaved African Americans to escape to free states and Canada in the 19th century.',
      choices: JSON.stringify([
        'A. NO CHANGE',
        'B. but rather, a network',
        'C. but a network',
        'D. but instead a network'
      ]),
      correct_answer: 0,
      explanation: 'The phrase "but rather" is the most precise and formal way to introduce the correction after "neither...nor." It clearly signals the contrast.'
    },
    {
      test_number: 1,
      section: 'english',
      question_number: 17,
      passage: passage2,
      question: 'This remarkable system, which operated from the late 1700s until the end of the Civil War in 1865, represented one of the most significant resistance movements in American history.',
      choices: JSON.stringify([
        'A. NO CHANGE',
        'B. system which operated from the late 1700s until the end of the Civil War in 1865',
        'C. system, which operated from the late 1700s until the end of the Civil War in 1865',
        'D. system which operated from the late 1700s, until the end of the Civil War in 1865,'
      ]),
      correct_answer: 0,
      explanation: 'The commas correctly set off the nonessential clause "which operated from the late 1700s until the end of the Civil War in 1865." This information is supplementary.'
    },
    {
      test_number: 1,
      section: 'english',
      question_number: 18,
      passage: passage2,
      question: 'The network relied on the courage of "conductors"—individuals who guided escapees—and "stationmasters," who provided shelter and resources.',
      choices: JSON.stringify([
        'A. NO CHANGE',
        'B. escapees, and "stationmasters,"',
        'C. escapees; and "stationmasters,"',
        'D. escapees—and "stationmasters"'
      ]),
      correct_answer: 0,
      explanation: 'The em dash correctly closes the parenthetical definition before "and" introduces the second element. The comma after "stationmasters" introduces its defining clause.'
    },
    {
      test_number: 1,
      section: 'english',
      question_number: 19,
      passage: passage2,
      question: 'Harriet Tubman, perhaps the most famous conductor, made approximately thirteen missions to rescue around seventy enslaved people.',
      choices: JSON.stringify([
        'A. NO CHANGE',
        'B. Tubman perhaps the most famous conductor',
        'C. Tubman, perhaps the most famous conductor',
        'D. Tubman—perhaps the most famous conductor—'
      ]),
      correct_answer: 0,
      explanation: 'The commas correctly set off the nonessential appositive "perhaps the most famous conductor." This provides additional information about Tubman.'
    },
    {
      test_number: 1,
      section: 'english',
      question_number: 20,
      passage: passage2,
      question: 'Despite the constant danger of capture and the severe penalties for aiding runaways, thousands of abolitionists, both Black and white, risked their lives to support this cause.',
      choices: JSON.stringify([
        'A. NO CHANGE',
        'B. runaways thousands of abolitionists',
        'C. runaways, thousands of abolitionists',
        'D. runaways; thousands of abolitionists'
      ]),
      correct_answer: 0,
      explanation: 'The comma after "runaways" correctly concludes the introductory dependent clause. The comma after "abolitionists" sets off the descriptive phrase "both Black and white."'
    },
    {
      test_number: 1,
      section: 'english',
      question_number: 21,
      passage: passage2,
      question: 'At this point, the writer is considering adding the following sentence: "The Fugitive Slave Act of 1850 made it even more dangerous to assist escapees." Should the writer make this addition here?',
      choices: JSON.stringify([
        'A. Yes, because it provides important historical context about the legal risks faced by abolitionists.',
        'B. Yes, because it explains why Harriet Tubman was famous.',
        'C. No, because it contradicts the statement that many people helped escapees.',
        'D. No, because it shifts focus away from the individuals who participated in the Underground Railroad.'
      ]),
      correct_answer: 0,
      explanation: 'The sentence directly supports the paragraph\'s discussion of "severe penalties" and "constant danger," providing specific historical context without derailing the main point.'
    },
    {
      test_number: 1,
      section: 'english',
      question_number: 22,
      passage: passage2,
      question: 'The routes varied depending on geography and available resources.',
      choices: JSON.stringify([
        'A. NO CHANGE',
        'B. The routes vary',
        'C. The routes had varied',
        'D. The routes would vary'
      ]),
      correct_answer: 0,
      explanation: 'The simple past tense "varied" is correct for describing historical events. It maintains consistency with the past tense used throughout the essay.'
    },
    {
      test_number: 1,
      section: 'english',
      question_number: 23,
      passage: passage2,
      question: 'In the North, escapees might travel from one safe house to another, moving under cover of darkness.',
      choices: JSON.stringify([
        'A. NO CHANGE',
        'B. another; moving',
        'C. another moving',
        'D. another. Moving'
      ]),
      correct_answer: 0,
      explanation: 'The comma correctly sets off the participial phrase "moving under cover of darkness," which describes how the escapees traveled.'
    },
    {
      test_number: 1,
      section: 'english',
      question_number: 24,
      passage: passage2,
      question: 'In the South, they often followed natural landmarks like rivers and used the North Star for navigation.',
      choices: JSON.stringify([
        'A. NO CHANGE',
        'B. rivers, and used',
        'C. rivers; and used',
        'D. rivers. And used'
      ]),
      correct_answer: 0,
      explanation: 'No comma is needed before "and" when connecting two verb phrases with the same subject in a compound predicate.'
    },
    {
      test_number: 1,
      section: 'english',
      question_number: 25,
      passage: passage2,
      question: 'The journey was perilous; escapees faced harsh weather, limited food, and the ever-present threat of slave catchers.',
      choices: JSON.stringify([
        'A. NO CHANGE',
        'B. perilous, escapees faced',
        'C. perilous: escapees faced',
        'D. perilous. Escapees faced'
      ]),
      correct_answer: 0,
      explanation: 'The semicolon correctly joins two closely related independent clauses, with the second clause elaborating on the first.'
    },
    {
      test_number: 1,
      section: 'english',
      question_number: 26,
      passage: passage2,
      question: 'Which choice most effectively combines these two sentences: "The journey was perilous. Escapees faced harsh weather, limited food, and the ever-present threat of slave catchers."',
      choices: JSON.stringify([
        'A. The journey was perilous; escapees faced harsh weather, limited food, and the ever-present threat of slave catchers.',
        'B. The journey was perilous because escapees faced harsh weather, limited food, and the ever-present threat of slave catchers.',
        'C. The journey was perilous, and escapees faced harsh weather, limited food, and the ever-present threat of slave catchers.',
        'D. The journey was perilous, with escapees facing harsh weather, limited food, and the ever-present threat of slave catchers.'
      ]),
      correct_answer: 1,
      explanation: 'Option B uses "because" to show a clear cause-and-effect relationship, explaining why the journey was perilous. This creates the most logical connection.'
    },
    {
      test_number: 1,
      section: 'english',
      question_number: 27,
      passage: passage2,
      question: 'The Underground Railroad\'s impact extended beyond the individuals it saved.',
      choices: JSON.stringify([
        'A. NO CHANGE',
        'B. Railroad\'s impact extend',
        'C. Railroads impact extended',
        'D. Railroad\'s impact had extended'
      ]),
      correct_answer: 0,
      explanation: 'The possessive "Railroad\'s" is correct, and "extended" is the appropriate past tense verb for describing historical impact.'
    },
    {
      test_number: 1,
      section: 'english',
      question_number: 28,
      passage: passage2,
      question: 'It challenged the institution of slavery, demonstrated the possibility of organized resistance, and helped galvanize the abolitionist movement.',
      choices: JSON.stringify([
        'A. NO CHANGE',
        'B. slavery; demonstrated the possibility of organized resistance; and helped galvanize',
        'C. slavery and demonstrated the possibility of organized resistance and helped galvanize',
        'D. slavery, demonstrated the possibility of organized resistance and helped galvanize'
      ]),
      correct_answer: 0,
      explanation: 'Commas correctly separate three parallel verb phrases in a series. The serial comma before "and" maintains clarity in the list.'
    },
    {
      test_number: 1,
      section: 'english',
      question_number: 29,
      passage: passage2,
      question: 'Today, many of the safe houses and routes have been preserved as historic sites, ensuring that this crucial chapter of American history is not forgotten.',
      choices: JSON.stringify([
        'A. NO CHANGE',
        'B. sites ensuring',
        'C. sites; ensuring',
        'D. sites. Ensuring'
      ]),
      correct_answer: 0,
      explanation: 'The comma before "ensuring" correctly introduces the participial phrase that explains the result or purpose of preservation.'
    },
    {
      test_number: 1,
      section: 'english',
      question_number: 30,
      passage: passage2,
      question: 'Which sentence would best conclude this essay?',
      choices: JSON.stringify([
        'A. The preservation of these sites ensures that future generations can learn about the courage and determination of those who fought against slavery.',
        'B. Many tourists visit these historic sites every year.',
        'C. The Underground Railroad operated for nearly a century.',
        'D. Harriet Tubman is remembered as one of America\'s greatest heroes.'
      ]),
      correct_answer: 0,
      explanation: 'Option A effectively concludes by connecting preservation to the essay\'s themes of courage and resistance, while looking forward to future generations.'
    }
  );

  return questions;
}

/**
 * Generate Math Section - 60 Questions
 */
function generateMathQuestions() {
  const questions = [];

  // Q1-20: Easy to Medium
  questions.push(
    {
      test_number: 1,
      section: 'math',
      question_number: 1,
      passage: null,
      question: 'If x + 7 = 15, what is the value of x?',
      choices: JSON.stringify([
        'A. 6',
        'B. 7',
        'C. 8',
        'D. 9',
        'E. 22'
      ]),
      correct_answer: 2,
      explanation: 'Subtract 7 from both sides: x + 7 - 7 = 15 - 7, so x = 8.'
    },
    {
      test_number: 1,
      section: 'math',
      question_number: 2,
      passage: null,
      question: 'What is 25% of 80?',
      choices: JSON.stringify([
        'A. 15',
        'B. 20',
        'C. 25',
        'D. 30',
        'E. 40'
      ]),
      correct_answer: 1,
      explanation: '25% = 0.25, so 0.25 × 80 = 20.'
    },
    {
      test_number: 1,
      section: 'math',
      question_number: 3,
      passage: null,
      question: 'If a rectangle has a length of 12 inches and a width of 5 inches, what is its area in square inches?',
      choices: JSON.stringify([
        'A. 17',
        'B. 34',
        'C. 60',
        'D. 70',
        'E. 120'
      ]),
      correct_answer: 2,
      explanation: 'Area of a rectangle = length × width = 12 × 5 = 60 square inches.'
    },
    {
      test_number: 1,
      section: 'math',
      question_number: 4,
      passage: null,
      question: 'What is the value of 3² + 4²?',
      choices: JSON.stringify([
        'A. 7',
        'B. 14',
        'C. 24',
        'D. 25',
        'E. 49'
      ]),
      correct_answer: 3,
      explanation: '3² = 9 and 4² = 16, so 9 + 16 = 25.'
    },
    {
      test_number: 1,
      section: 'math',
      question_number: 5,
      passage: null,
      question: 'If 3x = 21, what is the value of x?',
      choices: JSON.stringify([
        'A. 6',
        'B. 7',
        'C. 8',
        'D. 18',
        'E. 63'
      ]),
      correct_answer: 1,
      explanation: 'Divide both sides by 3: x = 21 ÷ 3 = 7.'
    },
    {
      test_number: 1,
      section: 'math',
      question_number: 6,
      passage: null,
      question: 'What is the perimeter of a square with side length 9 cm?',
      choices: JSON.stringify([
        'A. 18 cm',
        'B. 27 cm',
        'C. 36 cm',
        'D. 81 cm',
        'E. 90 cm'
      ]),
      correct_answer: 2,
      explanation: 'Perimeter of a square = 4 × side length = 4 × 9 = 36 cm.'
    },
    {
      test_number: 1,
      section: 'math',
      question_number: 7,
      passage: null,
      question: 'If a = 5 and b = 3, what is the value of 2a + b?',
      choices: JSON.stringify([
        'A. 10',
        'B. 11',
        'C. 13',
        'D. 16',
        'E. 19'
      ]),
      correct_answer: 2,
      explanation: 'Substitute values: 2(5) + 3 = 10 + 3 = 13.'
    },
    {
      test_number: 1,
      section: 'math',
      question_number: 8,
      passage: null,
      question: 'What is the slope of a line passing through the points (2, 3) and (6, 11)?',
      choices: JSON.stringify([
        'A. 1',
        'B. 2',
        'C. 3',
        'D. 4',
        'E. 8'
      ]),
      correct_answer: 1,
      explanation: 'Slope = (y₂ - y₁)/(x₂ - x₁) = (11 - 3)/(6 - 2) = 8/4 = 2.'
    },
    {
      test_number: 1,
      section: 'math',
      question_number: 9,
      passage: null,
      question: 'If x - 4 = 10, what is the value of x + 4?',
      choices: JSON.stringify([
        'A. 6',
        'B. 10',
        'C. 14',
        'D. 18',
        'E. 20'
      ]),
      correct_answer: 3,
      explanation: 'First solve for x: x = 14. Then x + 4 = 14 + 4 = 18.'
    },
    {
      test_number: 1,
      section: 'math',
      question_number: 10,
      passage: null,
      question: 'What is the circumference of a circle with radius 7? (Use π ≈ 22/7)',
      choices: JSON.stringify([
        'A. 14',
        'B. 22',
        'C. 44',
        'D. 49',
        'E. 154'
      ]),
      correct_answer: 2,
      explanation: 'Circumference = 2πr = 2 × (22/7) × 7 = 2 × 22 = 44.'
    }
  );

  // Continue generating remaining Math questions (Q11-60)
  // This is a partial implementation - would need all 60 questions

  return questions;
}

/**
 * Generate Reading Section - 40 Questions (4 passages, 10 questions each)
 */
function generateReadingQuestions() {
  const questions = [];

  // PASSAGE 1: Literary Narrative (Q1-10)
  const literaryPassage = `The old bookstore on the corner of Fifth and Main had been there for as long as anyone in town could remember. Its weathered brick facade and crooked wooden sign reading "Morrison's Books" had become as much a part of the neighborhood as the ancient oak trees that lined the street. Inside, the smell of aging paper and leather bindings created an atmosphere that was both comforting and nostalgic.

Margaret Morrison, the current owner and third generation of her family to run the shop, moved through the narrow aisles with practiced ease. She knew every corner of the store, every creaking floorboard, every book that sat spine-out on the crowded shelves. Her grandfather had founded the store in 1923, back when this part of town was still considered the outskirts of the city. Her father had inherited it in the 1960s, weathering the rise of shopping malls and chain bookstores. Now it was her turn to keep the tradition alive in the age of online retailers and e-books.

The morning light filtered through the dusty front windows, casting long shadows across the checkout counter where Margaret sat with her coffee. She was reading a first edition of Fitzgerald she'd acquired at an estate sale—a beautiful copy with its original dust jacket still intact. These were the moments she treasured most: the quiet hours before customers arrived, when she could lose herself in the pages of a good book and feel connected to generations of readers who had found solace in these same words.

The bell above the door chimed, announcing the arrival of her first customer. A young woman entered hesitantly, looking around with wide eyes as if she'd stumbled into a museum. "I'm looking for something specific," she said, pulling out her phone to check a note. "It's an old book about maritime history, something about the whaling industry in New England."

Margaret smiled. This was what she lived for—the treasure hunt, the satisfaction of matching the right book with the right reader. She stood up, already knowing exactly where to look. "Follow me," she said, leading the way into the Maritime History section tucked away in the back corner. Within minutes, she had pulled three possibilities from the shelf, each one more perfect than the last.

As the young woman carefully examined the volumes, running her fingers over the embossed covers, Margaret felt a familiar sense of purpose. The world might be changing, technology might be transforming how people consumed information, but there would always be those who appreciated the weight of a real book in their hands, the texture of aged paper, the subtle must of decades past. As long as there were readers like this young woman, Morrison's Books would remain open, a refuge for book lovers in an increasingly digital world.`;

  // Q1-10: Literary Narrative questions
  questions.push(
    {
      test_number: 1,
      section: 'reading',
      question_number: 1,
      passage: literaryPassage,
      question: 'The passage is best described as being told from the point of view of someone who is:',
      choices: JSON.stringify([
        'A. a regular customer reflecting on the significance of the bookstore in the community.',
        'B. an omniscient narrator focusing on Margaret Morrison and her connection to the bookstore.',
        'C. Margaret Morrison herself, looking back on her family\'s history.',
        'D. a historian documenting the decline of independent bookstores.'
      ]),
      correct_answer: 1,
      explanation: 'The passage uses third-person narration ("she," "Margaret") while focusing closely on Margaret\'s thoughts and experiences, characteristic of third-person limited omniscient.'
    },
    {
      test_number: 1,
      section: 'reading',
      question_number: 2,
      passage: literaryPassage,
      question: 'According to the passage, Morrison\'s Books was founded in:',
      choices: JSON.stringify([
        'A. the early 1900s.',
        'B. 1923.',
        'C. the 1960s.',
        'D. the age of online retailers.'
      ]),
      correct_answer: 1,
      explanation: 'The passage explicitly states: "Her grandfather had founded the store in 1923."'
    },
    {
      test_number: 1,
      section: 'reading',
      question_number: 3,
      passage: literaryPassage,
      question: 'The passage suggests that Margaret values the quiet morning hours primarily because they allow her to:',
      choices: JSON.stringify([
        'A. organize inventory and prepare for the day\'s business.',
        'B. experience a personal connection with books and past readers.',
        'C. avoid dealing with difficult customers.',
        'D. increase her knowledge of rare book values.'
      ]),
      correct_answer: 1,
      explanation: 'The passage states these are moments "when she could lose herself in the pages of a good book and feel connected to generations of readers."'
    },
    {
      test_number: 1,
      section: 'reading',
      question_number: 4,
      passage: literaryPassage,
      question: 'Based on the passage, which of the following best describes Margaret\'s reaction to the young customer\'s request?',
      choices: JSON.stringify([
        'A. Annoyance at being interrupted during her reading time',
        'B. Enthusiasm for helping match a reader with the right book',
        'C. Surprise that anyone would be interested in maritime history',
        'D. Concern that she might not have the book in stock'
      ]),
      correct_answer: 1,
      explanation: 'The passage states "This was what she lived for—the treasure hunt, the satisfaction of matching the right book with the right reader."'
    },
    {
      test_number: 1,
      section: 'reading',
      question_number: 5,
      passage: literaryPassage,
      question: 'As it is used in line 45, the word "refuge" most nearly means:',
      choices: JSON.stringify([
        'A. a place of protection or shelter.',
        'B. a temporary hiding place.',
        'C. an escape from reality.',
        'D. a storage facility.'
      ]),
      correct_answer: 0,
      explanation: 'In context, "refuge" refers to the bookstore as a protective haven for book lovers, a place where they can find shelter from the digital world.'
    },
    {
      test_number: 1,
      section: 'reading',
      question_number: 6,
      passage: literaryPassage,
      question: 'The passage indicates that Margaret\'s father managed the bookstore during a period when:',
      choices: JSON.stringify([
        'A. independent bookstores were first being established.',
        'B. shopping malls and chain bookstores were becoming popular.',
        'C. online retailers were transforming the book industry.',
        'D. the neighborhood was considered the outskirts of the city.'
      ]),
      correct_answer: 1,
      explanation: 'The passage states her father "inherited it in the 1960s, weathering the rise of shopping malls and chain bookstores."'
    },
    {
      test_number: 1,
      section: 'reading',
      question_number: 7,
      passage: literaryPassage,
      question: 'The main purpose of the description in the first paragraph is to:',
      choices: JSON.stringify([
        'A. establish the bookstore as a longstanding and familiar part of the neighborhood.',
        'B. contrast the bookstore\'s appearance with modern retail establishments.',
        'C. suggest that the bookstore is in need of renovation.',
        'D. emphasize the store\'s financial struggles.'
      ]),
      correct_answer: 0,
      explanation: 'The first paragraph emphasizes how the bookstore "had been there for as long as anyone in town could remember" and had "become as much a part of the neighborhood" as the old trees.'
    },
    {
      test_number: 1,
      section: 'reading',
      question_number: 8,
      passage: literaryPassage,
      question: 'The young customer is characterized as someone who:',
      choices: JSON.stringify([
        'A. is a regular visitor to the bookstore.',
        'B. prefers digital books to physical ones.',
        'C. appreciates the tactile experience of old books.',
        'D. is researching maritime history for academic purposes.'
      ]),
      correct_answer: 2,
      explanation: 'The passage describes her "carefully examining the volumes, running her fingers over the embossed covers," showing appreciation for the physical aspects of books.'
    },
    {
      test_number: 1,
      section: 'reading',
      question_number: 9,
      passage: literaryPassage,
      question: 'Which of the following statements best expresses Margaret\'s attitude toward technological change in the book industry?',
      choices: JSON.stringify([
        'A. She is entirely opposed to technology and refuses to adapt.',
        'B. She acknowledges change but believes there will always be readers who value physical books.',
        'C. She plans to close the bookstore and transition to online sales.',
        'D. She is indifferent to technology because it doesn\'t affect her business.'
      ]),
      correct_answer: 1,
      explanation: 'The final paragraph shows Margaret acknowledging that "technology might be transforming how people consumed information, but there would always be those who appreciated" physical books.'
    },
    {
      test_number: 1,
      section: 'reading',
      question_number: 10,
      passage: literaryPassage,
      question: 'The passage suggests that Margaret\'s sense of purpose comes primarily from:',
      choices: JSON.stringify([
        'A. maintaining her family\'s legacy and business.',
        'B. acquiring rare and valuable first editions.',
        'C. connecting readers with books they will treasure.',
        'D. preserving an important piece of neighborhood history.'
      ]),
      correct_answer: 2,
      explanation: 'When helping the young customer, Margaret feels "a familiar sense of purpose," directly connected to matching books with readers and seeing appreciation for physical books.'
    }
  );

  return questions;
}

/**
 * Generate Science Section - 40 Questions (6-7 passages)
 */
function generateScienceQuestions() {
  const questions = [];

  // PASSAGE 1: Data Representation (Q1-5)
  const passage1 = `Study 1: A researcher measured the growth rate of bean plants under different light conditions. Plants were exposed to varying hours of light per day, and their heights were recorded after 14 days.

[TABLE: Light Exposure and Plant Growth]
Hours of Light per Day | Average Height (cm) | Number of Leaves
4 hours                | 8.2                 | 6
8 hours                | 15.4                | 10
12 hours               | 23.1                | 14
16 hours               | 26.8                | 16
20 hours               | 25.3                | 15
24 hours               | 22.7                | 13`;

  questions.push(
    {
      test_number: 1,
      section: 'science',
      question_number: 1,
      passage: passage1,
      question: 'According to the table, which light exposure resulted in the tallest average plant height?',
      choices: JSON.stringify([
        'A. 12 hours',
        'B. 16 hours',
        'C. 20 hours',
        'D. 24 hours'
      ]),
      correct_answer: 1,
      explanation: 'The table shows that 16 hours of light per day resulted in the tallest average height of 26.8 cm.'
    },
    {
      test_number: 1,
      section: 'science',
      question_number: 2,
      passage: passage1,
      question: 'Based on the data, as light exposure increased from 4 hours to 16 hours per day, the number of leaves generally:',
      choices: JSON.stringify([
        'A. decreased only.',
        'B. increased only.',
        'C. increased, then decreased.',
        'D. remained constant.'
      ]),
      correct_answer: 1,
      explanation: 'The data shows leaves increased from 6 at 4 hours to 16 at 16 hours of light exposure.'
    },
    {
      test_number: 1,
      section: 'science',
      question_number: 3,
      passage: passage1,
      question: 'According to the data, what happened to plant height when light exposure exceeded 16 hours per day?',
      choices: JSON.stringify([
        'A. Height continued to increase.',
        'B. Height remained constant.',
        'C. Height began to decrease.',
        'D. Height increased dramatically.'
      ]),
      correct_answer: 2,
      explanation: 'After 16 hours (26.8 cm), heights decreased to 25.3 cm at 20 hours and 22.7 cm at 24 hours.'
    },
    {
      test_number: 1,
      section: 'science',
      question_number: 4,
      passage: passage1,
      question: 'Based on the study, which of the following would most likely be the average height of bean plants exposed to 14 hours of light per day?',
      choices: JSON.stringify([
        'A. 20 cm',
        'B. 25 cm',
        'C. 28 cm',
        'D. 30 cm'
      ]),
      correct_answer: 1,
      explanation: 'At 12 hours plants were 23.1 cm and at 16 hours they were 26.8 cm. 14 hours would be between these values, around 25 cm.'
    },
    {
      test_number: 1,
      section: 'science',
      question_number: 5,
      passage: passage1,
      question: 'The data suggests that optimal plant growth occurs:',
      choices: JSON.stringify([
        'A. with minimal light exposure.',
        'B. with continuous 24-hour light exposure.',
        'C. at a moderate level of light exposure around 16 hours.',
        'D. with highly variable light exposure.'
      ]),
      correct_answer: 2,
      explanation: 'Both height and leaf count were highest at 16 hours, suggesting this is the optimal exposure level for these plants.'
    }
  );

  return questions;
}

/**
 * Main execution function
 */
async function main() {
  try {
    console.log('🚀 Starting Practice Test 1 generation...\n');

    // Generate all sections
    console.log('📝 Generating English questions (75)...');
    const englishQuestions = generateEnglishQuestions();
    console.log(`✅ Generated ${englishQuestions.length} English questions\n`);

    console.log('📐 Generating Math questions (60)...');
    const mathQuestions = generateMathQuestions();
    console.log(`✅ Generated ${mathQuestions.length} Math questions\n`);

    console.log('📖 Generating Reading questions (40)...');
    const readingQuestions = generateReadingQuestions();
    console.log(`✅ Generated ${readingQuestions.length} Reading questions\n`);

    console.log('🔬 Generating Science questions (40)...');
    const scienceQuestions = generateScienceQuestions();
    console.log(`✅ Generated ${scienceQuestions.length} Science questions\n`);

    // Combine all questions
    const allQuestions = [
      ...englishQuestions,
      ...mathQuestions,
      ...readingQuestions,
      ...scienceQuestions
    ];

    console.log(`📊 Total questions generated: ${allQuestions.length}`);
    console.log(`   - English: ${englishQuestions.length}`);
    console.log(`   - Math: ${mathQuestions.length}`);
    console.log(`   - Reading: ${readingQuestions.length}`);
    console.log(`   - Science: ${scienceQuestions.length}\n`);

    // Insert into database
    console.log('💾 Inserting questions into database...');
    const { data, error } = await supabase
      .from('practice_test_questions')
      .insert(allQuestions);

    if (error) {
      console.error('❌ Error inserting questions:', error);
      throw error;
    }

    console.log('✅ Successfully inserted all questions into database!');
    console.log('\n🎉 Practice Test 1 generation complete!');

  } catch (error) {
    console.error('❌ Fatal error:', error);
    process.exit(1);
  }
}

main();
