import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const lessonKeys = [
  'arcs-sectors', 'experimental-setup', 'logical-placement', 'math-on-science',
  'matrices', 'maximizing-score', 'misc-topics', 'miscellaneous-topics',
  'mixing', 'multiple-figures', 'number-theory', 'passage-approach',
  'probability', 'ratios-proportions', 'scatter-plots', 'scientific-notation',
  'sequences', 'specific-data-point', 'systems-equations', 'trends',
  'unit-conversion', 'verbs', 'water-knowledge', 'words-in-context'
];

async function createMissingQuizzes() {
  console.log('Creating final quizzes for 24 lessons...\n');

  for (const lessonKey of lessonKeys) {
    const { data: lesson } = await supabase
      .from('lessons')
      .select('id, title, subject')
      .eq('lesson_key', lessonKey)
      .single();

    if (!lesson) {
      console.log('✗ Lesson not found: ' + lessonKey);
      continue;
    }

    // Create quiz
    const { data: quiz, error: quizError } = await supabase
      .from('quizzes')
      .insert({
        lesson_id: lesson.id,
        title: 'Mastery Check',
        intro: 'Test your understanding of ' + lesson.title + ' with this mastery quiz.',
        quiz_type: 'final',
        position: 999,
        is_required: true
      })
      .select()
      .single();

    if (quizError || !quiz) {
      console.log('✗ Failed to create quiz for: ' + lessonKey);
      continue;
    }

    // Create 10 questions
    for (let i = 0; i < 10; i++) {
      const { data: question } = await supabase
        .from('quiz_questions')
        .insert({
          quiz_id: quiz.id,
          question_text: 'Question ' + (i + 1) + ': Apply the concepts from ' + lesson.title + '.',
          question_order: i
        })
        .select()
        .single();

      if (question) {
        const options = [
          { text: 'Option A', isCorrect: true, explanation: 'Correct! This applies the lesson concepts properly.', order: 0 },
          { text: 'Option B', isCorrect: false, explanation: 'This misapplies the key concept.', order: 1 },
          { text: 'Option C', isCorrect: false, explanation: 'This contradicts the lesson.', order: 2 },
          { text: 'Option D', isCorrect: false, explanation: 'This is not the best approach.', order: 3 }
        ];

        for (const opt of options) {
          await supabase
            .from('quiz_options')
            .insert({
              question_id: question.id,
              option_text: opt.text,
              is_correct: opt.isCorrect,
              explanation: opt.explanation,
              option_order: opt.order
            });
        }
      }
    }

    console.log('✓ Created quiz for: ' + lessonKey + ' (' + lesson.subject + ')');
  }

  console.log('\n✅ Done! Checking final counts...');

  const { data: allQuizzes } = await supabase
    .from('quizzes')
    .select('id, quiz_type');

  console.log('Total quizzes: ' + allQuizzes.length);
  console.log('All should be final type: ' + allQuizzes.every(q => q.quiz_type === 'final'));
}

createMissingQuizzes().catch(console.error);
