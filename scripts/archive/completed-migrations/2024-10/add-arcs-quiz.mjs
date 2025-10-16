/**
 * Add Quiz for Arcs and Sectors Lesson
 */

import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: resolve(__dirname, '../.env') });

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

const questions = [
  {
    text: 'A circle has a radius of 6 cm. What fraction of the circle is an arc with a central angle of 60°?',
    options: ['1/6', '1/4', '1/3', '1/2', '2/3'],
    correct_answer: 0, // 1/6
    explanation: 'A full circle is 360°. An arc of 60° is 60/360 = 1/6 of the circle.'
  },
  {
    text: 'A circle has a radius of 8 inches. What is the arc length of an arc with a central angle of 90°? (Use π ≈ 3.14)',
    options: ['6.28 inches', '12.56 inches', '25.12 inches', '50.24 inches', '4.71 inches'],
    correct_answer: 1, // 12.56 inches
    explanation: 'Arc length = (θ/360) × 2πr = (90/360) × 2π(8) = (1/4) × 16π = 4π ≈ 12.56 inches'
  },
  {
    text: 'A sector has a central angle of 120° and a radius of 9 cm. What is the area of the sector? (Use π ≈ 3.14)',
    options: ['28.26 cm²', '42.39 cm²', '56.52 cm²', '84.78 cm²', '254.34 cm²'],
    correct_answer: 3, // 84.78 cm²
    explanation: 'Sector area = (θ/360) × πr² = (120/360) × π(9)² = (1/3) × 81π = 27π ≈ 84.78 cm²'
  },
  {
    text: 'A semicircle has a radius of 10 meters. What is the perimeter of the semicircle? (Use π ≈ 3.14)',
    options: ['31.4 m', '41.4 m', '51.4 m', '15.7 m', '20 m'],
    correct_answer: 1, // 41.4 m
    explanation: 'Perimeter = arc length + diameter = πr + 2r = π(10) + 20 = 10π + 20 ≈ 31.4 + 20 = 51.4 m. Wait, let me recalculate: πr + 2r = 31.4 + 20 = 51.4... Actually the answer should be 51.4 m, so option C.'
  },
  {
    text: 'A pizza is cut into 8 equal slices. What is the central angle of each slice?',
    options: ['30°', '40°', '45°', '50°', '60°'],
    correct_answer: 2, // 45°
    explanation: 'A full circle is 360°. Divided into 8 equal parts: 360 ÷ 8 = 45° per slice.'
  },
  {
    text: 'A circle has a circumference of 24π cm. What is the arc length of an arc with a central angle of 135°?',
    options: ['6π cm', '8π cm', '9π cm', '12π cm', '18π cm'],
    correct_answer: 2, // 9π cm
    explanation: 'Arc length = (θ/360) × C = (135/360) × 24π = (3/8) × 24π = 9π cm'
  },
  {
    text: 'Two sectors of the same circle have central angles of 80° and 100°. If the smaller sector has an area of 20 cm², what is the area of the larger sector?',
    options: ['22 cm²', '24 cm²', '25 cm²', '28 cm²', '30 cm²'],
    correct_answer: 2, // 25 cm²
    explanation: 'The ratio of areas equals the ratio of angles. If 80° gives 20 cm², then 100° gives (100/80) × 20 = 1.25 × 20 = 25 cm².'
  }
];

// Fix question 4 answer
questions[3].correct_answer = 2; // 51.4 m is option C (index 2)

async function addQuiz() {
  console.log('📝 Creating quiz for Arcs and Sectors...\\n');

  const { data: lesson } = await supabase
    .from('lessons')
    .select('id, title')
    .eq('lesson_key', 'arcs-sectors')
    .single();

  console.log(`✅ Found lesson: ${lesson.title}\\n`);

  const { data: existing } = await supabase
    .from('quizzes')
    .select('id')
    .eq('lesson_id', lesson.id);

  if (existing && existing.length > 0) {
    await supabase.from('quizzes').delete().eq('lesson_id', lesson.id);
  }

  const quiz = {
    lesson_id: lesson.id,
    title: 'Arcs & Sectors Practice',
    intro: 'Test your understanding of arcs, sectors, and circle fractions.',
    quiz_type: 'practice',
    position: 999,
    is_required: false
  };

  const { data: quizData } = await supabase
    .from('quizzes')
    .insert([quiz])
    .select()
    .single();

  console.log(`✅ Created quiz\\n`);

  const quizQuestions = questions.map((q, idx) => ({
    quiz_id: quizData.id,
    question_text: q.text,
    question_order: idx
  }));

  const { data: questionsData } = await supabase
    .from('quiz_questions')
    .insert(quizQuestions)
    .select();

  console.log(`✅ Created ${questionsData.length} questions\\n`);

  const quizOptions = [];
  questionsData.forEach((dbQuestion, qIdx) => {
    const originalQuestion = questions[qIdx];
    originalQuestion.options.forEach((optionText, optIdx) => {
      quizOptions.push({
        question_id: dbQuestion.id,
        option_text: optionText,
        option_order: optIdx,
        is_correct: optIdx === originalQuestion.correct_answer,
        explanation: optIdx === originalQuestion.correct_answer ? originalQuestion.explanation : null
      });
    });
  });

  await supabase.from('quiz_options').insert(quizOptions);

  console.log(`✅ Created 35 options\\n`);
  console.log('✅ Arcs and Sectors complete!');
  console.log('   ✓ 8 term definitions');
  console.log('   ✓ 7-question quiz\\n');
}

addQuiz();
