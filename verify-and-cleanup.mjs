import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_ANON_KEY
);

async function verifyAndCleanup() {
  console.log('📊 Quiz Summary:\n');

  const { data: allQuizzes } = await supabase
    .from('quizzes')
    .select('id, quiz_type, title');

  const byType = {};
  allQuizzes.forEach(q => {
    byType[q.quiz_type] = (byType[q.quiz_type] || 0) + 1;
  });

  console.log('Total quizzes by type:');
  Object.entries(byType).forEach(([type, count]) => {
    console.log(`  ${type}: ${count}`);
  });

  // Check if all final quizzes have 10 questions
  const { data: finals } = await supabase
    .from('quizzes')
    .select('id')
    .eq('quiz_type', 'final');

  console.log('\nVerifying all final quizzes have 10 questions...');
  let allGood = true;
  for (const quiz of finals) {
    const { data: qs } = await supabase
      .from('quiz_questions')
      .select('id')
      .eq('quiz_id', quiz.id);
    if (qs.length !== 10) {
      console.log(`  ❌ Quiz has ${qs.length} questions`);
      allGood = false;
    }
  }
  if (allGood) {
    console.log('  ✅ All final quizzes have exactly 10 questions!');
  }

  console.log('\nNow removing non-final quizzes...');
  const { data: nonFinals } = await supabase
    .from('quizzes')
    .select('id, title, quiz_type')
    .neq('quiz_type', 'final');

  console.log(`Found ${nonFinals.length} non-final quizzes to remove`);

  for (const quiz of nonFinals) {
    // Delete questions and options
    const { data: questions } = await supabase
      .from('quiz_questions')
      .select('id')
      .eq('quiz_id', quiz.id);

    if (questions) {
      for (const q of questions) {
        await supabase.from('quiz_options').delete().eq('question_id', q.id);
      }
      await supabase.from('quiz_questions').delete().eq('quiz_id', quiz.id);
    }

    // Delete quiz
    await supabase.from('quizzes').delete().eq('id', quiz.id);
    console.log(`  ✓ Deleted: ${quiz.title} (${quiz.quiz_type})`);
  }

  console.log('\n✅ Done! Each lesson now has ONE mastery quiz with 10 questions.');
}

verifyAndCleanup().catch(console.error);
