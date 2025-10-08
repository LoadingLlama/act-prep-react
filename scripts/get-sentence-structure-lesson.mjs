import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_ANON_KEY
);

async function getSentenceStructureLesson() {
  const { data: lesson } = await supabase
    .from('lessons')
    .select('*')
    .eq('lesson_key', 'sentence-structure')
    .single();

  console.log('=== SENTENCE STRUCTURE LESSON ===\n');
  console.log('Title:', lesson.title);
  console.log('Key:', lesson.lesson_key);
  console.log('Content length:', lesson.content.length, 'chars\n');

  // Extract H3 sections
  const h3Matches = lesson.content.match(/<h3[^>]*>([^<]+)<\/h3>/g) || [];
  console.log(`Found ${h3Matches.length} H3 sections:\n`);

  h3Matches.forEach((h3, i) => {
    const title = h3.replace(/<[^>]*>/g, '');
    console.log(`${i + 1}. ${title}`);
  });

  // Get existing quizzes
  const { data: quizzes } = await supabase
    .from('quizzes')
    .select('id, title, position, quiz_type')
    .eq('lesson_id', lesson.id)
    .order('position');

  console.log(`\n\nExisting quizzes: ${quizzes.length}\n`);
  quizzes.forEach(q => {
    console.log(`  - ${q.title} (pos ${q.position}, type: ${q.quiz_type})`);
  });
}

getSentenceStructureLesson();
