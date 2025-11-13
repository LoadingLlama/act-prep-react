/**
 * Update Test #1 questions with question_type and chapter data
 * This script will manually cross-match and update each question
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

/**
 * Question type and chapter data for Test #1
 * Format: {
 *   section: {
 *     question_number: { question_type: 'type', chapter: number }
 *   }
 * }
 */
const TEST_1_DATA = {
  english: {
    1: { question_type: 'Sentence Structure', chapter: '1' },
    2: { question_type: 'Sentence Structure', chapter: '1' },
    3: { question_type: 'Punctuation', chapter: '2, 3' },
    4: { question_type: 'Punctuation', chapter: '2, 3' },
    5: { question_type: 'Adding/Deleting Information', chapter: '14' },
    6: { question_type: 'Subject Verb Agreement', chapter: '4' },
    7: { question_type: 'Punctuation', chapter: '2, 3' },
    8: { question_type: 'Logical Placement', chapter: '15' },
    9: { question_type: 'Which Choice', chapter: '13' },
    10: { question_type: 'Subject Verb Agreement', chapter: '4' },
    11: { question_type: 'Wordiness/Redundancy', chapter: '10' },
    12: { question_type: 'Prepositional Idiom', chapter: '8' },
    13: { question_type: 'Miscellaneous', chapter: null },
    14: { question_type: 'Which Choice', chapter: '13' },
    15: { question_type: 'Purpose', chapter: null },
    16: { question_type: 'Sentence Structure/Punctuation', chapter: '1, 2' },
    17: { question_type: 'Punctuation', chapter: '2, 3' },
    18: { question_type: 'Misplaced Modifier', chapter: '6' },
    19: { question_type: 'Wordiness/Redundancy', chapter: '10' },
    20: { question_type: 'Which Choice', chapter: '13' },
    21: { question_type: 'Verb Tense', chapter: '4' },
    22: { question_type: 'Wordiness/Redundancy', chapter: '10' },
    23: { question_type: 'Punctuation', chapter: '2' },
    24: { question_type: 'Transitions', chapter: '12' },
    25: { question_type: 'Verb Tense', chapter: '4' },
    26: { question_type: 'Which Choice', chapter: '13' },
    27: { question_type: 'Parallel Structure', chapter: '7' },
    28: { question_type: 'Which Choice', chapter: '13' },
    29: { question_type: 'Sentence Structure', chapter: '1' },
    30: { question_type: 'Purpose', chapter: null },
    31: { question_type: 'Misplaced Modifiers', chapter: '6' },
    32: { question_type: 'Punctuation', chapter: '3' },
    33: { question_type: 'Which Choice', chapter: '13' },
    34: { question_type: 'Wordiness/Redundancy', chapter: '10' },
    35: { question_type: 'Which Choice', chapter: '13' },
    36: { question_type: 'Subject Verb Agreement', chapter: '4' },
    37: { question_type: 'Wordiness/Redundancy', chapter: '10' },
    38: { question_type: 'Which Choice', chapter: '13' },
    39: { question_type: 'Subject Verb Agreement', chapter: '4' },
    40: { question_type: 'Punctuation', chapter: '2' },
    41: { question_type: 'Sentence Structure', chapter: '1' },
    42: { question_type: 'Miscellaneous', chapter: null },
    43: { question_type: 'Sentence Structure', chapter: '1' },
    44: { question_type: 'Which Choice', chapter: '13' },
    45: { question_type: 'Purpose', chapter: null },
    46: { question_type: 'Misplaced Modifier', chapter: '6' },
    47: { question_type: 'Which Choice', chapter: '13' },
    48: { question_type: 'Punctuation', chapter: '2, 3' },
    49: { question_type: 'Wordiness/Redundancy', chapter: '10' },
    50: { question_type: 'Wordiness/Redundancy', chapter: '10' },
    51: { question_type: 'Prepositional Idiom', chapter: '8' },
    52: { question_type: 'Ambiguous Pronoun', chapter: '5' },
    53: { question_type: 'Adding/Deleting Information', chapter: '14' },
    54: { question_type: 'Sentence Structure/Punctuation', chapter: '1, 2, 3' },
    55: { question_type: 'Sentence Structure', chapter: '1' },
    56: { question_type: 'Wordiness/Redundancy', chapter: '10' },
    57: { question_type: 'Which Choice', chapter: '13' },
    58: { question_type: 'Which Choice', chapter: '13' },
    59: { question_type: 'Which Choice', chapter: '13' },
    60: { question_type: 'Logical Placement', chapter: '15' },
    61: { question_type: 'Punctuation', chapter: '2' },
    62: { question_type: 'Subject Verb Agreement', chapter: '4' },
    63: { question_type: 'Wordiness/Redundancy', chapter: '10' },
    64: { question_type: 'Punctuation', chapter: '3' },
    65: { question_type: 'Adding/Deleting Information', chapter: '14' },
    66: { question_type: 'Misplaced Modifier', chapter: '6' },
    67: { question_type: 'Transitions', chapter: '12' },
    68: { question_type: 'Punctuation', chapter: '2' },
    69: { question_type: 'Sentence Structure', chapter: '1' },
    70: { question_type: 'Which Choice', chapter: '13' },
    71: { question_type: 'Word Choice', chapter: '11' },
    72: { question_type: 'Sentence Structure/Word Choice', chapter: '1, 11' },
    73: { question_type: 'Transitions', chapter: '12' },
    74: { question_type: 'Punctuation/Word Choice', chapter: '3, 11' },
    75: { question_type: 'Which Choice', chapter: '13' }
  },
  math: {
    1: { question_type: 'Functions', chapter: '11' },
    2: { question_type: 'Geometry Part 1 - Angles', chapter: '3' },
    3: { question_type: 'Exponents', chapter: '13' },
    4: { question_type: 'Word Problems', chapter: '26' },
    5: { question_type: 'Algebra Skills', chapter: '7' },
    6: { question_type: 'Word Problems', chapter: '26' },
    7: { question_type: 'Probability', chapter: '22' },
    8: { question_type: 'Word Problems', chapter: '26' },
    9: { question_type: 'Word Problems', chapter: '26' },
    10: { question_type: 'Lines', chapter: '5' },
    11: { question_type: 'Probability', chapter: '22' },
    12: { question_type: 'Inequalities', chapter: '27' },
    13: { question_type: 'Algebra Skills', chapter: '7' },
    14: { question_type: 'Percentages, Scientific Notation', chapter: '9, 30' },
    15: { question_type: 'Fractions', chapter: '6' },
    16: { question_type: 'Shifting and Transforming Functions', chapter: '33' },
    17: { question_type: 'Lines', chapter: '5' },
    18: { question_type: 'Algebra Skills', chapter: '7' },
    19: { question_type: 'Mean', chapter: '12' },
    20: { question_type: 'Systems of Equations', chapter: '15' },
    21: { question_type: 'Percentages', chapter: '9' },
    22: { question_type: 'Geometry Part 2 - Area', chapter: '4' },
    23: { question_type: 'Geometry Part 1 - Angles', chapter: '3' },
    24: { question_type: 'Shifting and Transforming Functions', chapter: '33' },
    25: { question_type: 'Exponents', chapter: '13' },
    26: { question_type: 'Trigonometry', chapter: '17' },
    27: { question_type: 'Geometry Part 2 - Area', chapter: '4' },
    28: { question_type: 'Exponents, Scientific Notation', chapter: '13, 30' },
    29: { question_type: 'Inequalities', chapter: '27' },
    30: { question_type: 'Geometry Part 2 - Volume', chapter: '4' },
    31: { question_type: 'Geometry Part 2 – Pythagorean Theorem', chapter: '4' },
    32: { question_type: 'Visual Spatial', chapter: '35' },
    33: { question_type: 'Quadratics – Vertex Form', chapter: '16' },
    34: { question_type: 'Geometry Part 2 - Area', chapter: '4' },
    35: { question_type: 'Mean', chapter: '12' },
    36: { question_type: 'Logarithms', chapter: '14' },
    37: { question_type: 'Quadratics - Factoring', chapter: '16' },
    38: { question_type: 'Unit Conversion', chapter: '29' },
    39: { question_type: 'Number Theory', chapter: '8' },
    40: { question_type: 'Repeating Patterns', chapter: '20' },
    41: { question_type: 'Percentages, Weighted Average', chapter: '9, 12' },
    42: { question_type: 'Percentages', chapter: '9' },
    43: { question_type: 'Matrices', chapter: '19' },
    44: { question_type: 'Exponential Growth and Decay', chapter: '28' },
    45: { question_type: 'Word Problems', chapter: '26' },
    46: { question_type: 'Fractions', chapter: '6' },
    47: { question_type: 'Geometry Part 2 – Area and Unit Conversion', chapter: '4' },
    48: { question_type: 'Puzzle Question', chapter: '35' },
    49: { question_type: 'Sequences', chapter: '24' },
    50: { question_type: 'Probability', chapter: '22' },
    51: { question_type: 'Weighed Average', chapter: '12' },
    52: { question_type: 'Trigonometry', chapter: '17' },
    53: { question_type: 'Hyperbolas', chapter: '21' },
    54: { question_type: 'Trigonometry – Law of Cosines', chapter: '17' },
    55: { question_type: 'Absolute Value', chapter: '18' },
    56: { question_type: 'Organized Counting', chapter: '23' },
    57: { question_type: 'Repeating Patterns', chapter: '20' },
    58: { question_type: 'Geometry Part 2 - Area', chapter: '4' },
    59: { question_type: 'Complex Numbers', chapter: '25' },
    60: { question_type: 'Geometry Part 2 - Volume', chapter: '4' }
  },
  reading: {
    1: { question_type: 'Main Idea', chapter: null },
    2: { question_type: 'Clear Evidence', chapter: null },
    3: { question_type: 'Chronological Order', chapter: null },
    4: { question_type: 'Clear Evidence', chapter: null },
    5: { question_type: 'Clear Evidence', chapter: null },
    6: { question_type: 'Inference', chapter: null },
    7: { question_type: 'Clear Evidence', chapter: null },
    8: { question_type: 'Clear Evidence', chapter: null },
    9: { question_type: 'Inference', chapter: null },
    10: { question_type: 'Words In Context', chapter: null },
    11: { question_type: 'Main Idea', chapter: null },
    12: { question_type: 'Clear Evidence', chapter: null },
    13: { question_type: 'Inference', chapter: null },
    14: { question_type: 'Clear Evidence', chapter: null },
    15: { question_type: 'Purpose', chapter: null },
    16: { question_type: 'Clear Evidence', chapter: null },
    17: { question_type: 'Words In Context', chapter: null },
    18: { question_type: 'Comparing Passages', chapter: null },
    19: { question_type: 'Comparing Passages', chapter: null },
    20: { question_type: 'Comparing Passages', chapter: null },
    21: { question_type: 'Broad Passage', chapter: null },
    22: { question_type: 'Broad Passage', chapter: null },
    23: { question_type: 'Miscellaneous - Tone', chapter: null },
    24: { question_type: 'Main Idea', chapter: null },
    25: { question_type: 'Clear Evidence', chapter: null },
    26: { question_type: 'Inference', chapter: null },
    27: { question_type: 'Clear Evidence', chapter: null },
    28: { question_type: 'Purpose', chapter: null },
    29: { question_type: 'Purpose', chapter: null },
    30: { question_type: 'Words In Context', chapter: null },
    31: { question_type: 'Purpose', chapter: null },
    32: { question_type: 'Inference', chapter: null },
    33: { question_type: 'Clear Evidence', chapter: null },
    34: { question_type: 'Clear Evidence', chapter: null },
    35: { question_type: 'Clear Evidence', chapter: null },
    36: { question_type: 'Clear Evidence', chapter: null },
    37: { question_type: 'Words In Context', chapter: null },
    38: { question_type: 'Clear Evidence', chapter: null },
    39: { question_type: 'Clear Evidence', chapter: null },
    40: { question_type: 'Clear Evidence', chapter: null }
  },
  science: {
    1: { question_type: 'Reading Charts, Graphs, and Tables', chapter: null },
    2: { question_type: 'Reading Charts, Graphs, and Tables', chapter: null },
    3: { question_type: 'Reading Charts, Graphs, and Tables', chapter: null },
    4: { question_type: 'Reading Charts, Graphs, and Tables', chapter: null },
    5: { question_type: 'Reading Charts, Graphs, and Tables', chapter: null },
    6: { question_type: 'Two-Part Answers', chapter: null },
    7: { question_type: 'Trends', chapter: null },
    8: { question_type: 'Reading Charts, Graphs, and Tables', chapter: null },
    9: { question_type: 'Two-Part Answers', chapter: null },
    10: { question_type: 'Scientific Thinking', chapter: null },
    11: { question_type: 'Scientific Thinking', chapter: null },
    12: { question_type: 'Scientific Thinking', chapter: null },
    13: { question_type: 'Two-Part Answers', chapter: null },
    14: { question_type: 'Reading Charts, Graphs, and Tables', chapter: null },
    15: { question_type: 'Reading Charts, Graphs, and Tables', chapter: null },
    16: { question_type: 'Reading Charts, Graphs, and Tables', chapter: null },
    17: { question_type: 'Reading Charts, Graphs, and Tables', chapter: null },
    18: { question_type: 'Reading Charts, Graphs, and Tables', chapter: null },
    19: { question_type: 'Conflicting Viewpoints', chapter: null },
    20: { question_type: 'Finding Information in Text', chapter: null },
    21: { question_type: 'Finding Information in Text', chapter: null },
    22: { question_type: 'Finding Information in Text', chapter: null },
    23: { question_type: 'Conflicting Viewpoints', chapter: null },
    24: { question_type: 'Assessing New Information', chapter: null },
    25: { question_type: 'Finding Information in Text', chapter: null },
    26: { question_type: 'Conflicting Viewpoints', chapter: null },
    27: { question_type: 'Reading Charts, Graphs, and Tables', chapter: null },
    28: { question_type: 'Two-Part Answers', chapter: null },
    29: { question_type: 'Reading Charts, Graphs, and Tables', chapter: null },
    30: { question_type: 'Reading Charts, Graphs, and Tables', chapter: null },
    31: { question_type: 'Two-Part Answers', chapter: null },
    32: { question_type: 'Reading Charts, Graphs, and Tables', chapter: null },
    33: { question_type: 'Two-Part Answers', chapter: null },
    34: { question_type: 'Reading Charts, Graphs, and Tables', chapter: null },
    35: { question_type: 'Reading Charts, Graphs, and Tables', chapter: null },
    36: { question_type: 'Reading Charts, Graphs, and Tables', chapter: null },
    37: { question_type: 'Reading Charts, Graphs, and Tables', chapter: null },
    38: { question_type: 'Reading Charts, Graphs, and Tables', chapter: null },
    39: { question_type: 'Approximation', chapter: null },
    40: { question_type: 'Trends', chapter: null }
  }
};

async function updateTest1Questions() {
  console.log('=== UPDATING TEST #1 QUESTIONS ===\n');

  const sections = ['english', 'math', 'reading', 'science'];
  let totalUpdated = 0;
  let totalErrors = 0;

  for (const section of sections) {
    const tableName = `practice_test_${section}_questions`;
    const sectionData = TEST_1_DATA[section];

    if (!sectionData || Object.keys(sectionData).length === 0) {
      console.log(`Skipping ${section} - no data provided\n`);
      continue;
    }

    console.log(`Processing ${section.toUpperCase()}...`);

    // Get all questions for this section
    const { data: questions, error: fetchError } = await supabase
      .from(tableName)
      .select('id, question_number, question_text')
      .eq('test_number', 1)
      .order('question_number');

    if (fetchError) {
      console.error(`  Error fetching questions:`, fetchError.message);
      continue;
    }

    console.log(`  Found ${questions.length} questions`);

    // Update each question
    for (const question of questions) {
      const updateData = sectionData[question.question_number];

      if (!updateData) {
        console.log(`  ⚠️  No data for question ${question.question_number}`);
        continue;
      }

      // Update the question
      const { error: updateError } = await supabase
        .from(tableName)
        .update({
          question_type: updateData.question_type,
          chapter: updateData.chapter
        })
        .eq('id', question.id);

      if (updateError) {
        console.error(`  ❌ Error updating Q${question.question_number}:`, updateError.message);
        totalErrors++;
      } else {
        console.log(`  ✓ Updated Q${question.question_number}: ${updateData.question_type}, Ch ${updateData.chapter}`);
        totalUpdated++;
      }
    }

    console.log();
  }

  console.log('=== SUMMARY ===');
  console.log(`Total updated: ${totalUpdated}`);
  console.log(`Total errors: ${totalErrors}`);
}

// Run the update
updateTest1Questions().then(() => process.exit(0));
