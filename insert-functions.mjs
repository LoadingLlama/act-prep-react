import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
import * as dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
const html = readFileSync('formatted-functions.html', 'utf-8');

const { data: lesson } = await supabase.from('lesson_metadata').select('id').eq('lesson_key', 'functions').single();
let section;
const { data: existingSection } = await supabase.from('lesson_sections').select('id').eq('lesson_id', lesson.id).eq('section_key', 'main_content').single();

if (existingSection) section = existingSection;
else {
  const { data: newSection } = await supabase.from('lesson_sections').insert({lesson_id: lesson.id, section_key: 'main_content', title: 'Main Content', section_type: 'content', order_index: 1}).select().single();
  section = newSection;
}

const { data: existingContent } = await supabase.from('section_content').select('id').eq('section_id', section.id).single();
if (existingContent) await supabase.from('section_content').update({ content: html }).eq('id', existingContent.id);
else await supabase.from('section_content').insert({section_id: section.id, content_type: 'html', content: html, order_index: 1});

const { data: existingQuiz } = await supabase.from('quizzes').select('id').eq('lesson_id', lesson.id).eq('quiz_type', 'mastery').single();
let quizId;
if (existingQuiz) {
  quizId = existingQuiz.id;
  await supabase.from('quiz_questions').delete().eq('quiz_id', quizId);
} else {
  const { data: newQuiz } = await supabase.from('quizzes').insert({lesson_id: lesson.id, title: 'Functions Mastery Check', quiz_type: 'mastery', position: 9999, is_required: true}).select().single();
  quizId = newQuiz.id;
}

const questions = [
  { text: 'If f(x) = 2x + 7, what is f(4)?', options: [
    { text: '11', is_correct: false, explanation: 'This is 2(4) − 7. Check the sign: it\'s +7, not −7.' },
    { text: '15', is_correct: true, explanation: 'f(4) = 2(4) + 7 = 8 + 7 = 15 ✓' },
    { text: '22', is_correct: false, explanation: 'This would be 2(4 + 7). Remember order of operations: multiply first.' },
    { text: '56', is_correct: false, explanation: 'This is (2 + 7) × 4. You must substitute 4 for x: 2(4) + 7.' },
    { text: '8', is_correct: false, explanation: 'You forgot to add 7. f(4) = 2(4) + 7 = 8 + 7 = 15.' }
  ]},
  { text: 'If g(x) = x² − 3x, what is g(−2)?', options: [
    { text: '−10', is_correct: false, explanation: 'Watch signs! (−2)² = 4, not −4. Then: 4 − 3(−2) = 4 + 6 = 10.' },
    { text: '−2', is_correct: false, explanation: '(−2)² = 4, not −2. Recalculate: 4 − 3(−2) = 10.' },
    { text: '2', is_correct: false, explanation: 'Check your calculation. g(−2) = (−2)² − 3(−2) = 4 + 6 = 10.' },
    { text: '10', is_correct: true, explanation: 'g(−2) = (−2)² − 3(−2) = 4 − (−6) = 4 + 6 = 10 ✓' },
    { text: '14', is_correct: false, explanation: 'Be careful with signs. (−2)² = 4 and −3(−2) = 6, so 4 + 6 = 10, not 14.' }
  ]},
  { text: 'If f(x) = 3x + 2 and g(x) = x − 4, what is f(g(5))?', options: [
    { text: '1', is_correct: false, explanation: 'This is g(5), not f(g(5)). You need to plug g(5) into f.' },
    { text: '3', is_correct: false, explanation: 'Did you calculate g(5) first? g(5) = 5 − 4 = 1. Then f(1) = 3(1) + 2 = 5.' },
    { text: '5', is_correct: true, explanation: 'First: g(5) = 5 − 4 = 1. Then: f(1) = 3(1) + 2 = 5 ✓' },
    { text: '11', is_correct: false, explanation: 'Did you do f(5) instead? You need f(g(5)). First find g(5) = 1, then f(1) = 5.' },
    { text: '17', is_correct: false, explanation: 'This is f(5) = 3(5) + 2 = 17. But the question asks for f(g(5)), not f(5).' }
  ]},
  { text: 'If h(x) = x² and k(x) = 2x + 1, what is (h + k)(3)?', options: [
    { text: '7', is_correct: false, explanation: '(h + k)(x) = h(x) + k(x). So (h + k)(3) = 3² + (2·3 + 1) = 9 + 7 = 16.' },
    { text: '10', is_correct: false, explanation: 'This is 9 + 1, but k(3) = 2(3) + 1 = 7, not 1.' },
    { text: '16', is_correct: true, explanation: '(h + k)(3) = h(3) + k(3) = 3² + (2·3 + 1) = 9 + 7 = 16 ✓' },
    { text: '28', is_correct: false, explanation: 'This is h(3) × k(3) = 9 × 7 = 63, not addition. The + means add, not multiply.' },
    { text: '49', is_correct: false, explanation: 'This is (3 + 1)² = 16, but (h + k) means add the functions, not add inputs.' }
  ]},
  { text: 'If f(x) = x + 5 and g(x) = 2x, what is (fg)(4)?', options: [
    { text: '8', is_correct: false, explanation: '(fg) means multiply, not compose. (fg)(4) = f(4) × g(4) = 9 × 8 = 72.' },
    { text: '13', is_correct: false, explanation: 'This is f(g(4)) = f(8) = 13, but (fg) means multiply, not compose.' },
    { text: '18', is_correct: false, explanation: 'This is f(4) + g(4) = 9 + 8 = 17, but (fg) means multiply, not add.' },
    { text: '32', is_correct: false, explanation: 'This is 4 × (4 + 4). Remember (fg)(4) = f(4) × g(4) = 9 × 8 = 72.' },
    { text: '72', is_correct: true, explanation: '(fg)(4) = f(4) × g(4) = (4 + 5) × 2(4) = 9 × 8 = 72 ✓' }
  ]},
  { text: 'If f(x) = x² + 2x, what is f(x + 1)?', options: [
    { text: 'x² + 2x + 1', is_correct: false, explanation: 'Must substitute (x + 1) for every x. f(x + 1) = (x + 1)² + 2(x + 1).' },
    { text: 'x² + 4x + 3', is_correct: true, explanation: 'f(x + 1) = (x + 1)² + 2(x + 1) = x² + 2x + 1 + 2x + 2 = x² + 4x + 3 ✓' },
    { text: 'x² + 2x + 3', is_correct: false, explanation: 'You need to expand (x + 1)² = x² + 2x + 1, not just x² + 1.' },
    { text: 'x² + 3x + 2', is_correct: false, explanation: 'Check your expansion. (x + 1)² = x² + 2x + 1, and 2(x + 1) = 2x + 2.' },
    { text: 'x² + 6x + 5', is_correct: false, explanation: 'Recheck arithmetic. (x + 1)² + 2(x + 1) = x² + 2x + 1 + 2x + 2 = x² + 4x + 3.' }
  ]},
  { text: 'If f(a, b) = 2a − b², what is f(3, −1)?', options: [
    { text: '1', is_correct: false, explanation: '(−1)² = 1, not −1. So 2(3) − 1 = 6 − 1 = 5, not 1.' },
    { text: '5', is_correct: true, explanation: 'f(3, −1) = 2(3) − (−1)² = 6 − 1 = 5 ✓' },
    { text: '7', is_correct: false, explanation: '(−1)² = 1, not (−1) = −1. So 2(3) − 1 = 5, not 2(3) − (−1) = 7.' },
    { text: '−5', is_correct: false, explanation: 'Check your signs. 2(3) = 6, and (−1)² = 1, so 6 − 1 = 5.' },
    { text: '11', is_correct: false, explanation: 'This would be 2(3) + (−1)², but the function subtracts b², not adds.' }
  ]},
  { text: 'What is the domain of a function graphed from x = −3 to x = 5 with solid endpoints?', options: [
    { text: '−3 < x < 5', is_correct: false, explanation: 'Solid endpoints mean include those values. Use ≤, not <.' },
    { text: '−3 ≤ x ≤ 5', is_correct: true, explanation: 'Solid endpoints include the values, so domain is −3 ≤ x ≤ 5 ✓' },
    { text: 'x ≤ −3 or x ≥ 5', is_correct: false, explanation: 'This is outside the graphed region. Domain is between −3 and 5.' },
    { text: 'All real numbers', is_correct: false, explanation: 'The graph only exists from x = −3 to x = 5, not everywhere.' },
    { text: '−5 ≤ x ≤ 3', is_correct: false, explanation: 'You flipped the values. The graph goes from −3 to 5, not −5 to 3.' }
  ]},
  { text: 'If a function has y-values from y = −2 to y = 4 with an open endpoint at y = 4, what is the range?', options: [
    { text: '−2 < y < 4', is_correct: false, explanation: 'The endpoint at y = −2 should be solid (included), so use ≤ there.' },
    { text: '−2 ≤ y < 4', is_correct: true, explanation: 'Include y = −2 (solid endpoint) but exclude y = 4 (open endpoint): −2 ≤ y < 4 ✓' },
    { text: '−2 ≤ y ≤ 4', is_correct: false, explanation: 'The open endpoint at y = 4 means exclude it. Use < at y = 4, not ≤.' },
    { text: '−4 ≤ y ≤ 2', is_correct: false, explanation: 'You flipped the values. Range is from −2 to 4, not −4 to 2.' },
    { text: 'y < −2 or y ≥ 4', is_correct: false, explanation: 'This is outside the range. The range is between −2 and 4.' }
  ]},
  { text: 'If f(x) = √(x − 2) and g(x) = x + 3, what is f(g(6))?', options: [
    { text: '2', is_correct: false, explanation: 'First find g(6) = 6 + 3 = 9. Then f(9) = √(9 − 2) = √7 ≈ 2.65, not 2.' },
    { text: '√5', is_correct: false, explanation: 'This is f(7) = √5. But we need f(g(6)). First: g(6) = 9, then f(9) = √7.' },
    { text: '√7', is_correct: true, explanation: 'First: g(6) = 6 + 3 = 9. Then: f(9) = √(9 − 2) = √7 ✓' },
    { text: '3', is_correct: false, explanation: 'This is √9. But f(9) = √(9 − 2) = √7, not √9.' },
    { text: '7', is_correct: false, explanation: 'Don\'t forget the square root! f(9) = √(9 − 2) = √7, not 7.' }
  ]}
];

for (let i = 0; i < questions.length; i++) {
  const q = questions[i];
  const { data: question } = await supabase.from('quiz_questions').insert({quiz_id: quizId, question_text: q.text, question_order: i + 1}).select().single();
  for (let j = 0; j < q.options.length; j++) {
    const opt = q.options[j];
    await supabase.from('quiz_options').insert({question_id: question.id, option_text: opt.text, option_order: j + 1, is_correct: opt.is_correct, explanation: opt.explanation});
  }
  console.log(`Inserted question ${i + 1}`);
}

console.log('✅ Functions lesson complete!');
