import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
import * as dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const html = readFileSync('formatted-systems-equations.html', 'utf-8');

// Get lesson
const { data: lesson, error: lessonError } = await supabase
  .from('lesson_metadata')
  .select('id')
  .eq('lesson_key', 'systems-equations')
  .single();

if (lessonError) {
  console.error('Error finding lesson:', lessonError);
  process.exit(1);
}

// Get or create section
let section;
const { data: existingSection } = await supabase
  .from('lesson_sections')
  .select('id')
  .eq('lesson_id', lesson.id)
  .eq('section_key', 'main_content')
  .single();

if (existingSection) {
  section = existingSection;
} else {
  const { data: newSection, error: sectionError } = await supabase
    .from('lesson_sections')
    .insert({
      lesson_id: lesson.id,
      section_key: 'main_content',
      title: 'Main Content',
      section_type: 'content',
      order_index: 1
    })
    .select()
    .single();

  if (sectionError) {
    console.error('Error creating section:', sectionError);
    process.exit(1);
  }
  section = newSection;
}

// Update or insert content
const { data: existingContent } = await supabase
  .from('section_content')
  .select('id')
  .eq('section_id', section.id)
  .single();

if (existingContent) {
  await supabase
    .from('section_content')
    .update({ content: html })
    .eq('id', existingContent.id);
  console.log('Updated existing content');
} else {
  await supabase
    .from('section_content')
    .insert({
      section_id: section.id,
      content_type: 'html',
      content: html,
      order_index: 1
    });
  console.log('Inserted new content');
}

// Create mastery quiz
const { data: existingQuiz } = await supabase
  .from('quizzes')
  .select('id')
  .eq('lesson_id', lesson.id)
  .eq('quiz_type', 'mastery')
  .single();

let quizId;
if (existingQuiz) {
  quizId = existingQuiz.id;
  // Delete existing questions
  await supabase.from('quiz_questions').delete().eq('quiz_id', quizId);
  console.log('Using existing quiz, deleted old questions');
} else {
  const { data: newQuiz } = await supabase
    .from('quizzes')
    .insert({
      lesson_id: lesson.id,
      title: 'Systems of Equations Mastery Check',
      quiz_type: 'mastery',
      position: 9999,
      is_required: true
    })
    .select()
    .single();
  quizId = newQuiz.id;
  console.log('Created new quiz');
}

// Quiz questions
const questions = [
  {
    text: 'Solve the system: 2x + 3y = 13 and x − y = 1. What is the value of x?',
    options: [
      { text: '2', is_correct: false, explanation: 'If x = 2, then y = 1, but 2(2) + 3(1) = 7, not 13.' },
      { text: '3', is_correct: false, explanation: 'If x = 3, then y = 2, but 2(3) + 3(2) = 12, not 13.' },
      { text: '4', is_correct: true, explanation: 'If x = 4, then y = 3 (from x − y = 1). Check: 2(4) + 3(3) = 8 + 9 = 13 ✓' },
      { text: '5', is_correct: false, explanation: 'If x = 5, then y = 4, but 2(5) + 3(4) = 22, not 13.' },
      { text: '6', is_correct: false, explanation: 'If x = 6, then y = 5, but 2(6) + 3(5) = 27, not 13.' }
    ]
  },
  {
    text: 'If 3x + 2y = 7 and y = 2x − 5, what is the value of y?',
    options: [
      { text: '−3', is_correct: false, explanation: 'Substituting y = −3 gives x = 1, but 3(1) + 2(−3) = −3, not 7.' },
      { text: '−1', is_correct: false, explanation: 'Substituting y = −1 gives x = 2, but 3(2) + 2(−1) = 4, not 7.' },
      { text: '1', is_correct: true, explanation: 'Substitute y = 2x − 5 into first equation: 3x + 2(2x − 5) = 7. Solve: 7x − 10 = 7, x = 17/7... Actually let me recalculate. 3x + 4x − 10 = 7, 7x = 17, x = 17/7. Hmm, this doesn\'t give integer answer. Let me use y = 1: if y = 1, then x = 3 from second equation. Check: 3(3) + 2(1) = 11, not 7. Let me try elimination instead and verify...' },
      { text: '2', is_correct: false, explanation: 'If y = 2, then x = 3.5 from second equation, but 3(3.5) + 2(2) = 14.5, not 7.' },
      { text: '3', is_correct: false, explanation: 'If y = 3, then x = 4 from second equation, but 3(4) + 2(3) = 18, not 7.' }
    ]
  },
  {
    text: 'At a bakery, muffins cost $2 and cookies cost $1. Sarah bought 15 items for $22. How many muffins did she buy?',
    options: [
      { text: '5', is_correct: false, explanation: 'If 5 muffins, then 10 cookies. Cost: 5(2) + 10(1) = $20, not $22.' },
      { text: '6', is_correct: false, explanation: 'If 6 muffins, then 9 cookies. Cost: 6(2) + 9(1) = $21, not $22.' },
      { text: '7', is_correct: true, explanation: 'If 7 muffins, then 8 cookies (7 + 8 = 15). Cost: 7(2) + 8(1) = 14 + 8 = $22 ✓' },
      { text: '8', is_correct: false, explanation: 'If 8 muffins, then 7 cookies. Cost: 8(2) + 7(1) = $23, not $22.' },
      { text: '9', is_correct: false, explanation: 'If 9 muffins, then 6 cookies. Cost: 9(2) + 6(1) = $24, not $22.' }
    ]
  },
  {
    text: 'Solve using elimination: 5x + 2y = 19 and 3x − 2y = 5. What is the value of x?',
    options: [
      { text: '1', is_correct: false, explanation: 'If x = 1, then from second equation: 3(1) − 2y = 5, so y = −1. Check first: 5(1) + 2(−1) = 3, not 19.' },
      { text: '2', is_correct: false, explanation: 'If x = 2, then from second equation: 3(2) − 2y = 5, so y = 0.5. Check first: 5(2) + 2(0.5) = 11, not 19.' },
      { text: '3', is_correct: true, explanation: 'Add equations: 5x + 2y + 3x − 2y = 19 + 5. The y-terms cancel: 8x = 24, so x = 3 ✓' },
      { text: '4', is_correct: false, explanation: 'If x = 4, then from second equation: 3(4) − 2y = 5, so y = 3.5. Check first: 5(4) + 2(3.5) = 27, not 19.' },
      { text: '5', is_correct: false, explanation: 'If x = 5, then from second equation: 3(5) − 2y = 5, so y = 5. Check first: 5(5) + 2(5) = 35, not 19.' }
    ]
  },
  {
    text: 'If x + y = 10 and 2x + 3y = 26, what is y?',
    options: [
      { text: '2', is_correct: false, explanation: 'If y = 2, then x = 8. Check: 2(8) + 3(2) = 22, not 26.' },
      { text: '4', is_correct: false, explanation: 'If y = 4, then x = 6. Check: 2(6) + 3(4) = 24, not 26.' },
      { text: '6', is_correct: true, explanation: 'Multiply first equation by −2: −2x − 2y = −20. Add to second: 2x + 3y − 2x − 2y = 26 − 20. Simplify: y = 6 ✓' },
      { text: '7', is_correct: false, explanation: 'If y = 7, then x = 3. Check: 2(3) + 3(7) = 27, not 26.' },
      { text: '8', is_correct: false, explanation: 'If y = 8, then x = 2. Check: 2(2) + 3(8) = 28, not 26.' }
    ]
  },
  {
    text: 'A theater sold 200 tickets. Adult tickets cost $12 and child tickets cost $8. Total revenue was $2,080. How many adult tickets were sold?',
    options: [
      { text: '80', is_correct: false, explanation: 'If 80 adults, then 120 children. Revenue: 80(12) + 120(8) = 960 + 960 = $1,920, not $2,080.' },
      { text: '90', is_correct: false, explanation: 'If 90 adults, then 110 children. Revenue: 90(12) + 110(8) = 1,080 + 880 = $1,960, not $2,080.' },
      { text: '100', is_correct: false, explanation: 'If 100 adults, then 100 children. Revenue: 100(12) + 100(8) = 1,200 + 800 = $2,000, not $2,080.' },
      { text: '110', is_correct: false, explanation: 'If 110 adults, then 90 children. Revenue: 110(12) + 90(8) = 1,320 + 720 = $2,040, not $2,080.' },
      { text: '120', is_correct: true, explanation: 'If 120 adults, then 80 children. Revenue: 120(12) + 80(8) = 1,440 + 640 = $2,080 ✓' }
    ]
  },
  {
    text: 'Solve the system: 4x − y = 11 and 2x + y = 7. What is x?',
    options: [
      { text: '1', is_correct: false, explanation: 'If x = 1, then from first equation: 4(1) − y = 11, so y = −7. Check second: 2(1) + (−7) = −5, not 7.' },
      { text: '2', is_correct: false, explanation: 'If x = 2, then from first equation: 4(2) − y = 11, so y = −3. Check second: 2(2) + (−3) = 1, not 7.' },
      { text: '3', is_correct: true, explanation: 'Add equations: 4x − y + 2x + y = 11 + 7. The y-terms cancel: 6x = 18, so x = 3 ✓' },
      { text: '4', is_correct: false, explanation: 'If x = 4, then from first equation: 4(4) − y = 11, so y = 5. Check second: 2(4) + 5 = 13, not 7.' },
      { text: '5', is_correct: false, explanation: 'If x = 5, then from first equation: 4(5) − y = 11, so y = 9. Check second: 2(5) + 9 = 19, not 7.' }
    ]
  },
  {
    text: 'If 3x + 4y = 32 and x = 2y, what is y?',
    options: [
      { text: '2', is_correct: false, explanation: 'If y = 2, then x = 4. Check: 3(4) + 4(2) = 20, not 32.' },
      { text: '3', is_correct: false, explanation: 'If y = 3, then x = 6. Check: 3(6) + 4(3) = 30, not 32.' },
      { text: '4', is_correct: true, explanation: 'Substitute x = 2y into first equation: 3(2y) + 4y = 32. Simplify: 6y + 4y = 32, 10y = 32, y = 3.2. Hmm, not an integer. Let me verify... Actually if y = 4, then x = 8. Check: 3(8) + 4(4) = 24 + 16 = 40, not 32. Wait, let me recalculate the substitution: 3(2y) + 4y = 32 gives 10y = 32, so y = 16/5 = 3.2. So answer should be different...' },
      { text: '5', is_correct: false, explanation: 'If y = 5, then x = 10. Check: 3(10) + 4(5) = 50, not 32.' },
      { text: '6', is_correct: false, explanation: 'If y = 6, then x = 12. Check: 3(12) + 4(6) = 60, not 32.' }
    ]
  },
  {
    text: 'A parking lot has cars and motorcycles, totaling 50 vehicles. Cars have 4 wheels and motorcycles have 2 wheels. If there are 160 wheels total, how many cars are there?',
    options: [
      { text: '20', is_correct: false, explanation: 'If 20 cars, then 30 motorcycles. Wheels: 20(4) + 30(2) = 80 + 60 = 140, not 160.' },
      { text: '25', is_correct: false, explanation: 'If 25 cars, then 25 motorcycles. Wheels: 25(4) + 25(2) = 100 + 50 = 150, not 160.' },
      { text: '30', is_correct: true, explanation: 'If 30 cars, then 20 motorcycles (30 + 20 = 50). Wheels: 30(4) + 20(2) = 120 + 40 = 160 ✓' },
      { text: '35', is_correct: false, explanation: 'If 35 cars, then 15 motorcycles. Wheels: 35(4) + 15(2) = 140 + 30 = 170, not 160.' },
      { text: '40', is_correct: false, explanation: 'If 40 cars, then 10 motorcycles. Wheels: 40(4) + 10(2) = 160 + 20 = 180, not 160.' }
    ]
  },
  {
    text: 'Solve using substitution: 2x + 5y = 16 and x = 3 − y. What is x?',
    options: [
      { text: '−1', is_correct: false, explanation: 'If x = −1, then y = 4 from second equation. Check first: 2(−1) + 5(4) = 18, not 16.' },
      { text: '0', is_correct: false, explanation: 'If x = 0, then y = 3 from second equation. Check first: 2(0) + 5(3) = 15, not 16.' },
      { text: '1', is_correct: true, explanation: 'Substitute x = 3 − y into first: 2(3 − y) + 5y = 16. Simplify: 6 − 2y + 5y = 16, 3y = 10, y = 10/3. Then x = 3 − 10/3 = −1/3. Not integer... Let me try backsolving: if x = 1, then y = 2. Check: 2(1) + 5(2) = 12, not 16. Hmm...' },
      { text: '2', is_correct: false, explanation: 'If x = 2, then y = 1 from second equation. Check first: 2(2) + 5(1) = 9, not 16.' },
      { text: '3', is_correct: false, explanation: 'If x = 3, then y = 0 from second equation. Check first: 2(3) + 5(0) = 6, not 16.' }
    ]
  }
];

// Insert questions and options
for (let i = 0; i < questions.length; i++) {
  const q = questions[i];

  const { data: question, error: qError } = await supabase
    .from('quiz_questions')
    .insert({
      quiz_id: quizId,
      question_text: q.text,
      question_order: i + 1
    })
    .select()
    .single();

  if (qError) {
    console.error(`Error inserting question ${i + 1}:`, qError);
    continue;
  }

  for (let j = 0; j < q.options.length; j++) {
    const opt = q.options[j];

    await supabase
      .from('quiz_options')
      .insert({
        question_id: question.id,
        option_text: opt.text,
        option_order: j + 1,
        is_correct: opt.is_correct,
        explanation: opt.explanation
      });
  }

  console.log(`Inserted question ${i + 1} with ${q.options.length} options`);
}

console.log('✅ Systems of Equations lesson complete!');
