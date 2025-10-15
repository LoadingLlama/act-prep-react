/**
 * Insert quiz questions with proper format
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

console.log('╔══════════════════════════════════════════════════════════╗');
console.log('║     INSERTING QUIZ QUESTIONS                            ║');
console.log('╚══════════════════════════════════════════════════════════╝\n');

// Get geometry-angles lesson
const { data: lessonData } = await supabase
  .from('lessons')
  .select('id')
  .eq('lesson_key', 'geometry-angles')
  .single();

// Get the quiz
const { data: quizzes } = await supabase
  .from('quizzes')
  .select('*')
  .eq('lesson_id', lessonData.id);

const quiz = quizzes[0];
console.log('Quiz ID:', quiz.id);

// New text-only questions (exactly 5 answer choices each)
const newQuestions = [
  {
    quiz_id: quiz.id,
    question_text: 'Two angles are complementary. If one angle measures 35°, what is the measure of the other angle?',
    options: [
      { text: '35°', isCorrect: false, explanation: 'This is the same as the given angle. Complementary angles add up to 90°.' },
      { text: '45°', isCorrect: false, explanation: 'Close, but remember: complementary angles add to 90°, so 90° - 35° = 55°.' },
      { text: '55°', isCorrect: true, explanation: 'Correct! Complementary angles add up to 90°. Since one angle is 35°, the other must be 90° - 35° = 55°.' },
      { text: '145°', isCorrect: false, explanation: 'This would be the supplement (180° - 35°), not the complement.' },
      { text: '90°', isCorrect: false, explanation: 'This is the total that complementary angles add to, not the missing angle.' }
    ],
    order_index: 0
  },
  {
    quiz_id: quiz.id,
    question_text: 'An angle measures 110°. What type of angle is it?',
    options: [
      { text: 'Acute angle', isCorrect: false, explanation: 'Acute angles are less than 90°. This angle is greater than 90°.' },
      { text: 'Right angle', isCorrect: false, explanation: 'Right angles measure exactly 90°. This angle is 110°.' },
      { text: 'Obtuse angle', isCorrect: true, explanation: 'Correct! Obtuse angles measure between 90° and 180°. Since 110° is in this range, it\'s obtuse.' },
      { text: 'Straight angle', isCorrect: false, explanation: 'Straight angles measure exactly 180°. This angle is only 110°.' },
      { text: 'Reflex angle', isCorrect: false, explanation: 'Reflex angles are greater than 180°. This angle is 110°.' }
    ],
    order_index: 1
  },
  {
    quiz_id: quiz.id,
    question_text: 'Two angles are supplementary. If one angle measures 73°, what is the measure of the other angle?',
    options: [
      { text: '17°', isCorrect: false, explanation: 'This would be the complement (90° - 73°), not the supplement.' },
      { text: '73°', isCorrect: false, explanation: 'The other angle doesn\'t have to be the same measure.' },
      { text: '90°', isCorrect: false, explanation: 'This is not correct. Supplementary angles add to 180°, not 90°.' },
      { text: '107°', isCorrect: true, explanation: 'Correct! Supplementary angles add up to 180°. Since one angle is 73°, the other must be 180° - 73° = 107°.' },
      { text: '180°', isCorrect: false, explanation: 'This is the total that supplementary angles add to, not the missing angle.' }
    ],
    order_index: 2
  },
  {
    quiz_id: quiz.id,
    question_text: 'Two lines intersect, forming four angles. If one of the angles measures 65°, what is the measure of the angle directly across from it (its vertical angle)?',
    options: [
      { text: '25°', isCorrect: false, explanation: 'Vertical angles are equal to each other, not supplementary.' },
      { text: '65°', isCorrect: true, explanation: 'Correct! Vertical angles (angles across from each other when two lines intersect) are always equal. So the vertical angle is also 65°.' },
      { text: '90°', isCorrect: false, explanation: 'The angles aren\'t necessarily right angles. Vertical angles are equal to each other.' },
      { text: '115°', isCorrect: false, explanation: 'This would be a supplementary angle (adjacent to the 65° angle), not the vertical angle.' },
      { text: '180°', isCorrect: false, explanation: 'This is not possible for a single angle formed by intersecting lines.' }
    ],
    order_index: 3
  },
  {
    quiz_id: quiz.id,
    question_text: 'Two parallel lines are cut by a transversal. One of the angles formed measures 120°. What is the measure of its corresponding angle on the other parallel line?',
    options: [
      { text: '60°', isCorrect: false, explanation: 'This would be the supplement (180° - 120°), not the corresponding angle.' },
      { text: '90°', isCorrect: false, explanation: 'Corresponding angles are equal when lines are parallel, not necessarily 90°.' },
      { text: '120°', isCorrect: true, explanation: 'Correct! When parallel lines are cut by a transversal, corresponding angles are equal. So the corresponding angle is also 120°.' },
      { text: '30°', isCorrect: false, explanation: 'This is not correct. Corresponding angles are equal when lines are parallel.' },
      { text: '180°', isCorrect: false, explanation: 'This would be a straight angle, which is not formed by the transversal.' }
    ],
    order_index: 4
  },
  {
    quiz_id: quiz.id,
    question_text: 'Two lines intersect at a point. If one angle measures 42°, what is the measure of the adjacent angle (next to it)?',
    options: [
      { text: '42°', isCorrect: false, explanation: 'Adjacent angles (on a straight line) are supplementary, not equal.' },
      { text: '48°', isCorrect: false, explanation: 'This would be the complement (90° - 42°), but adjacent angles on a line are supplementary.' },
      { text: '90°', isCorrect: false, explanation: 'This is not correct. The angles must add to 180° (not equal 90°).' },
      { text: '138°', isCorrect: true, explanation: 'Correct! Adjacent angles on a straight line are supplementary (add to 180°). So the adjacent angle is 180° - 42° = 138°.' },
      { text: '180°', isCorrect: false, explanation: 'This is the total they add to, not the measure of the adjacent angle.' }
    ],
    order_index: 5
  }
];

console.log('Inserting', newQuestions.length, 'questions...\n');

// Insert questions one by one
for (const question of newQuestions) {
  const { data, error } = await supabase
    .from('quiz_questions')
    .insert(question)
    .select();

  if (error) {
    console.error(`❌ Error inserting question ${question.order_index + 1}:`, error.message);
  } else {
    console.log(`✅ Inserted question ${question.order_index + 1}`);
  }
}

// Verify
const { data: finalCheck } = await supabase
  .from('quiz_questions')
  .select('*')
  .eq('quiz_id', quiz.id)
  .order('order_index');

console.log('\n✅ Final count:', finalCheck ? finalCheck.length : 0, 'questions');

if (finalCheck && finalCheck.length > 0) {
  console.log('\nQuestions inserted:');
  finalCheck.forEach((q, idx) => {
    console.log(`${idx + 1}. ${q.question_text.substring(0, 60)}... (${q.options.length} choices)`);
  });
}
