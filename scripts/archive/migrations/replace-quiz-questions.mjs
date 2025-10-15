/**
 * Replace quiz questions with text-only versions (no diagrams)
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

console.log('╔══════════════════════════════════════════════════════════╗');
console.log('║     REPLACING QUIZ QUESTIONS - TEXT ONLY                ║');
console.log('╚══════════════════════════════════════════════════════════╝\n');

// Get geometry-angles lesson
const { data: lessonData } = await supabase
  .from('lessons')
  .select('id, lesson_key')
  .eq('lesson_key', 'geometry-angles')
  .single();

console.log('Lesson:', lessonData.lesson_key);

// Get the quiz
const { data: quizzes } = await supabase
  .from('quizzes')
  .select('*')
  .eq('lesson_id', lessonData.id);

if (quizzes.length === 0) {
  console.log('No quiz found!');
  process.exit(0);
}

const quiz = quizzes[0];
console.log('Quiz:', quiz.title);
console.log('Quiz ID:', quiz.id);

// Get existing questions
const { data: existingQuestions } = await supabase
  .from('quiz_questions')
  .select('*')
  .eq('quiz_id', quiz.id)
  .order('order_index');

console.log('\nExisting questions:', existingQuestions ? existingQuestions.length : 0);

// Delete existing questions
await supabase
  .from('quiz_questions')
  .delete()
  .eq('quiz_id', quiz.id);

console.log('✅ Deleted old questions\n');

// New text-only questions (no diagrams needed)
const newQuestions = [
  {
    quiz_id: quiz.id,
    question_text: 'Two angles are complementary. If one angle measures 35°, what is the measure of the other angle?',
    options: [
      { text: '35°', is_correct: false, explanation: 'This is the same as the given angle. Complementary angles add up to 90°.' },
      { text: '45°', is_correct: false, explanation: 'Close, but remember: complementary angles add to 90°, so 90° - 35° = 55°.' },
      { text: '55°', is_correct: true, explanation: 'Correct! Complementary angles add up to 90°. Since one angle is 35°, the other must be 90° - 35° = 55°.' },
      { text: '145°', is_correct: false, explanation: 'This would be the supplement (180° - 35°), not the complement.' },
      { text: '90°', is_correct: false, explanation: 'This is the total that complementary angles add to, not the missing angle.' }
    ],
    order_index: 0
  },
  {
    quiz_id: quiz.id,
    question_text: 'An angle measures 110°. What type of angle is it?',
    options: [
      { text: 'Acute angle', is_correct: false, explanation: 'Acute angles are less than 90°. This angle is greater than 90°.' },
      { text: 'Right angle', is_correct: false, explanation: 'Right angles measure exactly 90°. This angle is 110°.' },
      { text: 'Obtuse angle', is_correct: true, explanation: 'Correct! Obtuse angles measure between 90° and 180°. Since 110° is in this range, it\'s obtuse.' },
      { text: 'Straight angle', is_correct: false, explanation: 'Straight angles measure exactly 180°. This angle is only 110°.' },
      { text: 'Reflex angle', is_correct: false, explanation: 'Reflex angles are greater than 180°. This angle is 110°.' }
    ],
    order_index: 1
  },
  {
    quiz_id: quiz.id,
    question_text: 'Two angles are supplementary. If one angle measures 73°, what is the measure of the other angle?',
    options: [
      { text: '17°', is_correct: false, explanation: 'This would be the complement (90° - 73°), not the supplement.' },
      { text: '73°', is_correct: false, explanation: 'The other angle doesn\'t have to be the same measure.' },
      { text: '90°', is_correct: false, explanation: 'This is not correct. Supplementary angles add to 180°, not 90°.' },
      { text: '107°', is_correct: true, explanation: 'Correct! Supplementary angles add up to 180°. Since one angle is 73°, the other must be 180° - 73° = 107°.' },
      { text: '180°', is_correct: false, explanation: 'This is the total that supplementary angles add to, not the missing angle.' }
    ],
    order_index: 2
  },
  {
    quiz_id: quiz.id,
    question_text: 'Two lines intersect, forming four angles. If one of the angles measures 65°, what is the measure of the angle directly across from it (its vertical angle)?',
    options: [
      { text: '25°', is_correct: false, explanation: 'Vertical angles are equal to each other, not supplementary.' },
      { text: '65°', is_correct: true, explanation: 'Correct! Vertical angles (angles across from each other when two lines intersect) are always equal. So the vertical angle is also 65°.' },
      { text: '90°', is_correct: false, explanation: 'The angles aren\'t necessarily right angles. Vertical angles are equal to each other.' },
      { text: '115°', is_correct: false, explanation: 'This would be a supplementary angle (adjacent to the 65° angle), not the vertical angle.' },
      { text: '180°', is_correct: false, explanation: 'This is not possible for a single angle formed by intersecting lines.' }
    ],
    order_index: 3
  },
  {
    quiz_id: quiz.id,
    question_text: 'Two parallel lines are cut by a transversal. One of the angles formed measures 120°. What is the measure of its corresponding angle on the other parallel line?',
    options: [
      { text: '60°', is_correct: false, explanation: 'This would be the supplement (180° - 120°), not the corresponding angle.' },
      { text: '90°', is_correct: false, explanation: 'Corresponding angles are equal when lines are parallel, not necessarily 90°.' },
      { text: '120°', is_correct: true, explanation: 'Correct! When parallel lines are cut by a transversal, corresponding angles are equal. So the corresponding angle is also 120°.' },
      { text: '30°', is_correct: false, explanation: 'This is not correct. Corresponding angles are equal when lines are parallel.' },
      { text: '180°', is_correct: false, explanation: 'This would be a straight angle, which is not formed by the transversal.' }
    ],
    order_index: 4
  },
  {
    quiz_id: quiz.id,
    question_text: 'Two lines intersect at a point. If one angle measures 42°, what is the measure of the adjacent angle (next to it)?',
    options: [
      { text: '42°', is_correct: false, explanation: 'Adjacent angles (on a straight line) are supplementary, not equal.' },
      { text: '48°', is_correct: false, explanation: 'This would be the complement (90° - 42°), but adjacent angles on a line are supplementary.' },
      { text: '90°', is_correct: false, explanation: 'This is not correct. The angles must add to 180° (not equal 90°).' },
      { text: '138°', is_correct: true, explanation: 'Correct! Adjacent angles on a straight line are supplementary (add to 180°). So the adjacent angle is 180° - 42° = 138°.' },
      { text: '180°', is_correct: false, explanation: 'This is the total they add to, not the measure of the adjacent angle.' }
    ],
    order_index: 5
  }
];

// Insert new questions
for (const question of newQuestions) {
  await supabase
    .from('quiz_questions')
    .insert(question);
}

console.log('✅ Added', newQuestions.length, 'new text-only questions\n');

console.log('New questions:');
newQuestions.forEach((q, idx) => {
  console.log(`${idx + 1}. ${q.question_text.substring(0, 80)}...`);
});

console.log('\n✅ Quiz now has all text-only questions!');
console.log('   No diagrams needed - students visualize themselves');
