const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
require('dotenv').config();

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

const lessonKey = process.argv[2];
const targetCount = 50;

async function fillLesson() {
  if (!lessonKey) {
    console.error('Usage: node fill_lesson.js <lesson-key>');
    process.exit(1);
  }

  const questions = JSON.parse(fs.readFileSync('english_questions.json', 'utf8'));

  const { data: lesson, error: lessonError } = await supabase
    .from('lessons')
    .select('id')
    .eq('lesson_key', lessonKey)
    .single();

  if (lessonError || !lesson) {
    console.error('Lesson not found:', lessonKey);
    process.exit(1);
  }

  // Get existing questions
  const { data: existing } = await supabase
    .from('lesson_examples')
    .select('position')
    .eq('lesson_id', lesson.id)
    .order('position');

  const currentCount = existing.length;
  const needed = targetCount - currentCount;

  console.log(`${lessonKey}: ${currentCount} questions, need ${needed} more`);

  if (needed <= 0) {
    console.log('✓ Already has 50 questions');
    return;
  }

  // Find all missing positions
  const positions = existing.map(e => e.position);
  const missingPositions = [];
  for (let i = 0; i < targetCount; i++) {
    if (!positions.includes(i)) {
      missingPositions.push(i);
    }
  }

  console.log(`Adding ${needed} questions to positions:`, missingPositions.slice(0, needed).join(', '));

  // Add questions
  let questionIndex = 0;
  let added = 0;

  for (let qIdx = 0; qIdx < questions.length && added < needed; qIdx++) {
    const q = questions[qIdx];
    if (!q.choices || !Array.isArray(q.choices)) continue;

    const pos = missingPositions[added];
    const choices = q.choices.map(c => ({
      letter: c.charAt(0),
      text: c.substring(3).trim()
    }));

    const { error } = await supabase.from('lesson_examples').insert({
      lesson_id: lesson.id,
      position: pos,
      title: `Practice Question ${pos + 1}`,
      problem_text: q.question_text,
      choices,
      correct_answer: q.correct_answer,
      solution_steps: [],
      answer_explanation: q.explanation || '',
      is_worked_example: false
    });

    if (error) {
      console.error(`Error at position ${pos}:`, error.message);
    } else {
      console.log(`  ✓ Added question at position ${pos}`);
      added++;
    }
  }

  console.log(`✓ Completed ${lessonKey}: now has ${targetCount} questions`);
}

fillLesson();
