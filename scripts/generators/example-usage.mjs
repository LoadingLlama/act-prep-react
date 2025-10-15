/**
 * EXAMPLE: How to use generators in database scripts
 *
 * This file shows how to import and use the parallel lines generator
 * to create problems for your Supabase database.
 */

import { generateACTParallelLinesProblem, QUESTION_TYPES } from './parallel-lines-generator.mjs';

// ============================================================================
// EXAMPLE 1: Generate a single problem
// ============================================================================

console.log('📝 Example 1: Single Problem\n');

const singleProblem = generateACTParallelLinesProblem({
  acuteAngle: 45,
  questionType: 'supplementary',
  flipTransversal: false
});

console.log('Question:', singleProblem.question);
console.log('Answer:', singleProblem.answer);
console.log('Explanation:', singleProblem.explanation);
console.log('');

// ============================================================================
// EXAMPLE 2: Generate multiple problems with variety
// ============================================================================

console.log('📝 Example 2: Generate 10 Varied Problems\n');

const problems = [];

// Strategy: Create problems with different angles and question types
const angles = [30, 35, 40, 45, 50, 55, 60, 65, 70, 75];
const questionTypes = Object.values(QUESTION_TYPES);

for (let i = 0; i < 10; i++) {
  const problem = generateACTParallelLinesProblem({
    acuteAngle: angles[i],
    questionType: questionTypes[i % questionTypes.length],
    flipTransversal: i % 3 === 0, // Every 3rd problem flipped
    problemNumber: i + 1
  });

  problems.push(problem);
  console.log(`Problem ${i + 1}: ${problem.questionType} | ${problem.acuteAngle}° | Answer: ${problem.answer}`);
}

console.log('\n✅ Generated', problems.length, 'problems');

// ============================================================================
// EXAMPLE 3: Generate problems for specific difficulty levels
// ============================================================================

console.log('\n📝 Example 3: Problems by Difficulty\n');

// Easy: Simple supplementary angles with common angles
const easyProblems = [30, 45, 60].map((angle, i) =>
  generateACTParallelLinesProblem({
    acuteAngle: angle,
    questionType: 'supplementary',
    problemNumber: i + 1
  })
);

console.log('Easy:', easyProblems.length, 'problems (supplementary, common angles)');

// Medium: Corresponding and alternate interior
const mediumProblems = [35, 55, 70].map((angle, i) =>
  generateACTParallelLinesProblem({
    acuteAngle: angle,
    questionType: i % 2 === 0 ? 'corresponding' : 'alternate_interior',
    problemNumber: i + 1
  })
);

console.log('Medium:', mediumProblems.length, 'problems (corresponding/alternate interior)');

// Hard: Combined reasoning with uncommon angles
const hardProblems = [33, 47, 68].map((angle, i) =>
  generateACTParallelLinesProblem({
    acuteAngle: angle,
    questionType: 'combined',
    flipTransversal: true,
    problemNumber: i + 1
  })
);

console.log('Hard:', hardProblems.length, 'problems (combined, flipped, uncommon angles)');

// ============================================================================
// EXAMPLE 4: Format for database insertion
// ============================================================================

console.log('\n📝 Example 4: Database Format\n');

const dbProblem = generateACTParallelLinesProblem({
  acuteAngle: 60,
  questionType: 'supplementary'
});

// Example database row structure
const databaseRow = {
  lesson_id: '2.1',
  topic: 'Parallel Lines and Transversals',
  question_type: dbProblem.questionType,
  difficulty: 'medium',
  question_text: dbProblem.question,
  diagram_svg: dbProblem.svg,
  correct_answer: dbProblem.answer,
  explanation: dbProblem.explanation,
  metadata: {
    acuteAngle: dbProblem.acuteAngle,
    obtuseAngle: dbProblem.obtuseAngle,
    flipTransversal: dbProblem.flipTransversal
  }
};

console.log('Database row structure:');
console.log(JSON.stringify(databaseRow, null, 2).substring(0, 300) + '...\n');

// ============================================================================
// EXAMPLE 5: Batch generation for practice sets
// ============================================================================

console.log('📝 Example 5: Practice Set Generation\n');

function generatePracticeSet(setName, count, config) {
  console.log(`\nGenerating "${setName}" (${count} problems)...`);

  const set = Array.from({ length: count }, (_, i) => {
    const angle = 30 + Math.floor(Math.random() * 50); // 30-79°
    return generateACTParallelLinesProblem({
      ...config,
      acuteAngle: angle,
      problemNumber: i + 1
    });
  });

  console.log(`✓ Created ${set.length} problems`);
  return set;
}

const practiceSetA = generatePracticeSet('Basic Practice', 5, {
  questionType: 'supplementary'
});

const practiceSetB = generatePracticeSet('Advanced Practice', 5, {
  questionType: 'combined',
  flipTransversal: true
});

console.log('\n✅ All examples complete!');
console.log('\n💡 Next steps:');
console.log('   1. Import this generator in your database update script');
console.log('   2. Generate problems with desired configuration');
console.log('   3. Insert into Supabase with proper metadata');
console.log('   4. Test problems in your React app\n');
