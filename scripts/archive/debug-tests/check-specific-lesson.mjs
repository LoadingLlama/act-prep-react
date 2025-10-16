import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: resolve(__dirname, '../.env') });

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function check() {
  // Check the gold standard lesson - should definitely have data
  const lessonKey = 'geometry-angles';

  console.log(`🔍 Checking lesson: ${lessonKey}\n`);

  const { data: lesson } = await supabase
    .from('lessons')
    .select('*')
    .eq('lesson_key', lessonKey)
    .single();

  console.log('Lesson:', lesson.title);
  console.log('ID:', lesson.id);
  console.log('');

  const { data: defs } = await supabase
    .from('term_definitions')
    .select('*')
    .eq('lesson_key', lessonKey);

  console.log(`Definitions (${defs?.length || 0}):`);
  defs?.slice(0, 3).forEach(d => console.log(`  - ${d.term}: ${d.definition.substring(0, 50)}...`));
  console.log('');

  const { data: quizzes } = await supabase
    .from('quizzes')
    .select('*')
    .eq('lesson_id', lesson.id);

  console.log(`Quizzes (${quizzes?.length || 0}):`);
  if (quizzes?.[0]) {
    console.log(`  - ${quizzes[0].title}`);
    console.log(`  - Type: ${quizzes[0].quiz_type}`);

    const { data: questions } = await supabase
      .from('quiz_questions')
      .select('*')
      .eq('quiz_id', quizzes[0].id);

    console.log(`  - Questions: ${questions?.length || 0}`);

    if (questions?.[0]) {
      console.log(`\n  Sample Question:`);
      console.log(`    "${questions[0].question_text}"`);

      const { data: options } = await supabase
        .from('quiz_options')
        .select('*')
        .eq('question_id', questions[0].id);

      console.log(`    Options (${options?.length || 0}):`);
      options?.forEach((opt, i) => {
        console.log(`      ${String.fromCharCode(65 + i)}. ${opt.option_text} ${opt.is_correct ? '✓' : ''}`);
      });
    }
  }
}

check();
