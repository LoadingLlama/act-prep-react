import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_ANON_KEY
);

async function checkQuizAlignment() {
  // Get Sentence Structure lesson
  const { data: sentenceLesson } = await supabase
    .from('lessons')
    .select('*')
    .eq('lesson_key', 'sentence-structure')
    .single();

  // Get its quizzes
  const { data: sentenceQuizzes } = await supabase
    .from('quizzes')
    .select(`
      *,
      quiz_questions (
        *,
        quiz_options (*)
      )
    `)
    .eq('lesson_id', sentenceLesson.id)
    .order('position', { ascending: true });

  console.log('=== CHAPTER 1: SENTENCE STRUCTURE ===\n');
  console.log('Lesson content length:', sentenceLesson.content.length, 'chars\n');

  console.log('Quizzes:');
  sentenceQuizzes.forEach(quiz => {
    console.log(`\n${quiz.title} (Position ${quiz.position})`);
    console.log(`Questions: ${quiz.quiz_questions.length}`);
    quiz.quiz_questions.forEach((q, i) => {
      console.log(`  ${i + 1}. ${q.question_text.substring(0, 80)}...`);
    });
  });

  // Get Commas lesson
  const { data: commasLesson } = await supabase
    .from('lessons')
    .select('*')
    .eq('lesson_key', 'commas')
    .single();

  // Get its quizzes
  const { data: commasQuizzes } = await supabase
    .from('quizzes')
    .select(`
      *,
      quiz_questions (
        *,
        quiz_options (*)
      )
    `)
    .eq('lesson_id', commasLesson.id)
    .order('position', { ascending: true });

  console.log('\n\n=== CHAPTER 2: COMMAS ===\n');
  console.log('Lesson content length:', commasLesson.content.length, 'chars\n');

  console.log('Quizzes:');
  commasQuizzes.forEach(quiz => {
    console.log(`\n${quiz.title} (Position ${quiz.position})`);
    console.log(`Questions: ${quiz.quiz_questions.length}`);
    quiz.quiz_questions.forEach((q, i) => {
      console.log(`  ${i + 1}. ${q.question_text.substring(0, 80)}...`);
    });
  });

  // Analyze lesson structure
  console.log('\n\n=== CONTENT ANALYSIS ===\n');

  const sentenceSections = sentenceLesson.content.match(/<h3>/g);
  console.log('Sentence Structure - H3 sections:', sentenceSections?.length || 0);

  const commasSections = commasLesson.content.match(/<h3>/g);
  console.log('Commas - H3 sections:', commasSections?.length || 0);
}

checkQuizAlignment();
