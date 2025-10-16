import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: resolve(__dirname, '../.env') });

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function verify() {
  console.log('🔍 Verifying database completion...\n');

  // Count lessons by subject
  const { data: lessons } = await supabase.from('lessons').select('id, subject, title, lesson_key');

  const subjects = { math: 0, english: 0, reading: 0, science: 0 };
  lessons.forEach(l => subjects[l.subject]++);

  console.log('📚 Total Lessons:', lessons.length);
  console.log('  Math:', subjects.math);
  console.log('  English:', subjects.english);
  console.log('  Reading:', subjects.reading);
  console.log('  Science:', subjects.science);
  console.log('');

  // Count definitions
  const { data: definitions } = await supabase.from('term_definitions').select('*');
  console.log('📖 Total Definitions:', definitions.length);
  console.log('');

  // Count quizzes
  const { data: quizzes } = await supabase.from('quizzes').select('*');
  console.log('❓ Total Quizzes:', quizzes.length);
  console.log('');

  // Count questions
  const { data: questions } = await supabase.from('quiz_questions').select('*');
  console.log('📝 Total Questions:', questions.length);
  console.log('');

  // Count options
  const { data: options } = await supabase.from('quiz_options').select('*');
  console.log('✅ Total Options:', options.length);
  console.log('');

  // Sample check - get a few random lessons with their data
  console.log('🔎 Sample Verification (5 random lessons):\n');
  const samples = lessons.sort(() => 0.5 - Math.random()).slice(0, 5);

  for (const lesson of samples) {
    const { data: defs } = await supabase.from('term_definitions').select('*').eq('lesson_key', lesson.lesson_key);
    const { data: quiz } = await supabase.from('quizzes').select('id').eq('lesson_id', lesson.id).limit(1).single();

    let qCount = 0;
    if (quiz) {
      const { data: qs } = await supabase.from('quiz_questions').select('*').eq('quiz_id', quiz.id);
      qCount = qs?.length || 0;
    }

    console.log(`✓ ${lesson.title}`);
    console.log(`  Subject: ${lesson.subject} | Key: ${lesson.lesson_key}`);
    console.log(`  Definitions: ${defs?.length || 0} | Quiz Questions: ${qCount}`);
    console.log('');
  }

  console.log('\n✅ Verification complete!');
}

verify();
