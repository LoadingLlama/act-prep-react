import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_ANON_KEY
);

async function verifyQuizContent() {
  const { data: lesson } = await supabase
    .from('lessons')
    .select('*')
    .eq('lesson_key', 'commas')
    .single();

  const { data: quizzes } = await supabase
    .from('quizzes')
    .select(`
      *,
      quiz_questions (
        *,
        quiz_options (*)
      )
    `)
    .eq('lesson_id', lesson.id)
    .order('position', { ascending: true });

  console.log('=== CHECKING QUIZ 1 (Position 5): Unnecessary Information ===\n');
  const quiz1 = quizzes[0];
  quiz1.quiz_questions.forEach((q, i) => {
    console.log(`Q${i + 1}: ${q.question_text}`);
    const correctOption = q.quiz_options.find(o => o.is_correct);
    console.log(`Correct: ${correctOption.option_text.substring(0, 80)}`);
    console.log(`Tests: ${correctOption.explanation.substring(0, 80)}\n`);
  });

  console.log('\n✓ Does lesson teach crossing-out trick BEFORE position 5?');
  const hasCrossingOut = lesson.content.substring(0, lesson.content.indexOf('position-5-quiz-marker') !== -1 ?
    lesson.content.indexOf('position-5-quiz-marker') : lesson.content.length)
    .includes('crossing-out');
  console.log(hasCrossingOut ? '  YES - crossing-out trick is taught' : '  NO - NOT taught yet!\n');

  console.log('\n=== CHECKING QUIZ 2 (Position 8): Names & That/Which ===\n');
  const quiz2 = quizzes[1];
  quiz2.quiz_questions.forEach((q, i) => {
    console.log(`Q${i + 1}: ${q.question_text.substring(0, 60)}...`);
  });

  console.log('\n✓ Key concepts quiz 2 tests:');
  console.log('  - Names rule (specific vs non-specific identifiers)');
  console.log('  - "that" phrases never get commas');
  console.log('  - "which" phrases always get commas');
  console.log('  → Are ALL these taught by position 8?\n');

  console.log('\n=== POTENTIAL ISSUES ===\n');
  console.log('Issue 1: Quiz 1 asks about "ed" phrases');
  console.log('  → Section 6 teaches "ing" and "ed" phrases');
  console.log('  → Position 5 comes BEFORE section 6');
  console.log('  → PROBLEM: Testing before teaching!\n');

  console.log('Issue 2: Some quizzes may use crossing-out trick without explaining it first');
  console.log('  → Need to verify crossing-out trick is in Section 2 or earlier\n');
}

verifyQuizContent();
