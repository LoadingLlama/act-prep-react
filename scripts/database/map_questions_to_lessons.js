/**
 * Map Practice Test Questions to Lessons
 * Automatically populates lesson_id based on question_type
 */

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Question type to lesson_key mappings (based on analysis)
const QUESTION_TYPE_TO_LESSON = {
  // READING
  'Words In Context': 'words-in-context',
  'Clear Evidence': 'finding-correct-answer',  // Close match
  'Inference': 'finding-correct-answer',
  'Purpose': 'question-types',
  'Main Idea': 'question-types',
  'Comparing Passages': 'comparing-passages',
  'Broad Passage': 'question-types',
  'Chronological Order': 'question-types',
  'Miscellaneous - Tone': 'question-types',

  // SCIENCE
  'Reading Charts, Graphs, and Tables': 'specific-data-point',
  'Two-Part Answers': 'two-part-answers',
  'Finding Information in Text': 'figures-text',
  'Scientific Thinking': 'question-diagnosis',
  'Conflicting Viewpoints': 'conflicting-viewpoints',
  'Trends': 'trends',
  'Assessing New Information': 'experimental-setup',
  'Approximation': 'approximation',

  // MATH
  'Word Problems': 'word-problems',
  'Geometry Part 2 - Area': '2.2',  // Areas, Volumes & Triangles
  'Geometry Part 2 – Area and Unit Conversion': '2.2',
  'Algebra Skills': '3.1',
  'Probability': '6.3',
  'Geometry Part 1 - Angles': 'geometry-angles',
  'Exponents': '3.3',  // Exponents and Roots
  'Lines': '2.3',
  'Inequalities': '3.5',
  'Fractions': '3.2',
  'Shifting and Transforming Functions': 'transforming-functions',
  'Mean': '6.1',  // Mean, Median, and Mode
  'Percentages': '5.2',
  'Percentages, Scientific Notation': '5.2',
  'Percentages, Weighted Average': '5.2',
  'Trigonometry': 'trigonometry',
  'Trigonometry – Law of Cosines': 'trigonometry',
  'Geometry Part 2 - Volume': '2.2',
  'Repeating Patterns': '5.6',
  'Functions': 'functions',
  'Systems of Equations': 'systems-equations',
  'Exponents, Scientific Notation': '3.3',
  'Geometry Part 2 – Pythagorean Theorem': '2.2',
  'Visual Spatial': 'miscellaneous-topics',
  'Quadratics – Vertex Form': 'quadratics',
  'Logarithms': '3.4',
  'Quadratics - Factoring': 'quadratics',
  'Unit Conversion': '5.4',
  'Number Theory': '5.1',
  'Matrices': 'matrices',
  'Exponential Growth and Decay': 'exponential-growth',
  'Puzzle Question': 'miscellaneous-topics',
  'Sequences': 'sequences',
  'Weighed Average': '5.3',  // Ratios and Proportions
  'Hyperbolas': '2.5',  // Circles, Ellipses, and Hyperbolas
  'Absolute Value': '3.6',
  'Organized Counting': '6.4',  // Permutations and Combinations
  'Complex Numbers': 'complex-numbers',

  // ENGLISH - Use chapter-based mapping for now
  // Will map based on chapter numbers instead
};

async function mapQuestionsToLessons() {
  console.log('🔗 Mapping practice test questions to lessons...\n');

  try {
    // First, get all lessons with their IDs
    const { data: lessons, error: lessonsError } = await supabase
      .from('lessons')
      .select('id, lesson_key, title, subject');

    if (lessonsError) {
      console.error('❌ Error fetching lessons:', lessonsError.message);
      return;
    }

    const lessonMap = {};
    lessons.forEach(lesson => {
      lessonMap[lesson.lesson_key] = lesson;
    });

    console.log(`✅ Loaded ${lessons.length} lessons\n`);

    // Map each section
    const sections = [
      { name: 'reading', table: 'practice_test_reading_questions' },
      { name: 'science', table: 'practice_test_science_questions' },
      { name: 'math', table: 'practice_test_math_questions' },
    ];

    let totalMapped = 0;
    let totalUnmapped = 0;

    for (const section of sections) {
      console.log(`\n${'='.repeat(60)}`);
      console.log(`${section.name.toUpperCase()} SECTION`);
      console.log('='.repeat(60));

      // Get all diagnostic questions
      const { data: questions, error } = await supabase
        .from(section.table)
        .select('id, question_number, question_type')
        .eq('test_number', 1);

      if (error) {
        console.error(`❌ Error: ${error.message}`);
        continue;
      }

      let sectionMapped = 0;
      let sectionUnmapped = 0;

      for (const question of questions) {
        const lessonKey = QUESTION_TYPE_TO_LESSON[question.question_type];

        if (lessonKey && lessonMap[lessonKey]) {
          const lesson = lessonMap[lessonKey];

          // Update the question with lesson_id
          const { error: updateError } = await supabase
            .from(section.table)
            .update({ lesson_id: lesson.id })
            .eq('id', question.id);

          if (updateError) {
            console.error(`  ❌ Q${question.question_number}: Failed to update - ${updateError.message}`);
          } else {
            sectionMapped++;
            console.log(`  ✅ Q${question.question_number}: ${question.question_type} → ${lesson.title}`);
          }
        } else {
          sectionUnmapped++;
          console.log(`  ⚠️ Q${question.question_number}: No mapping for "${question.question_type}"`);
        }
      }

      console.log(`\n📊 ${section.name}: ${sectionMapped} mapped, ${sectionUnmapped} unmapped`);
      totalMapped += sectionMapped;
      totalUnmapped += sectionUnmapped;
    }

    console.log(`\n\n${'='.repeat(60)}`);
    console.log('SUMMARY');
    console.log('='.repeat(60));
    console.log(`✅ Total mapped: ${totalMapped}`);
    console.log(`⚠️ Total unmapped: ${totalUnmapped}`);
    console.log(`📊 Coverage: ${((totalMapped / (totalMapped + totalUnmapped)) * 100).toFixed(1)}%`);

    if (totalUnmapped > 0) {
      console.log(`\n⚠️ Note: ${totalUnmapped} questions still need mapping`);
      console.log('English questions will need manual mapping based on their content.');
    }

  } catch (err) {
    console.error('❌ Unexpected error:', err);
  }
}

mapQuestionsToLessons();
