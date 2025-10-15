import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_ANON_KEY
);

async function removeDuplicates() {
  console.log('Finding lessons with multiple final quizzes...\n');

  const { data: lessons } = await supabase
    .from('lessons')
    .select('id, lesson_key')
    .order('lesson_key');

  let deleted = 0;

  for (const lesson of lessons) {
    const { data: finals } = await supabase
      .from('quizzes')
      .select('id, created_at')
      .eq('lesson_id', lesson.id)
      .eq('quiz_type', 'final')
      .order('created_at');

    if (finals && finals.length > 1) {
      console.log(lesson.lesson_key + ': ' + finals.length + ' finals found');

      const details = [];
      for (const quiz of finals) {
        const { data: qs } = await supabase
          .from('quiz_questions')
          .select('id')
          .eq('quiz_id', quiz.id);
        
        details.push({ id: quiz.id, count: qs?.length || 0 });
      }

      const keep = details.find(q => q.count === 10);
      
      if (keep) {
        console.log('  Keeping quiz with ' + keep.count + ' questions');
        
        for (const quiz of details) {
          if (quiz.id !== keep.id) {
            console.log('  Deleting quiz with ' + quiz.count + ' questions');
            
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

            await supabase.from('quizzes').delete().eq('id', quiz.id);
            deleted++;
          }
        }
      }
    }
  }

  console.log('\nDeleted ' + deleted + ' duplicate quizzes');
  
  const { data: remaining } = await supabase
    .from('quizzes')
    .select('id')
    .eq('quiz_type', 'final');
  
  console.log('Remaining final quizzes: ' + (remaining?.length || 0));
}

removeDuplicates().catch(console.error);
