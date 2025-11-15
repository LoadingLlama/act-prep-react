const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_ANON_KEY
);

async function checkEnglishChapters() {
  console.log('=== ENGLISH QUESTIONS CHAPTER MAPPING ===\n');

  const { data: questions, error } = await supabase
    .from('practice_test_english_questions')
    .select('id, question_number, chapter, lesson_id')
    .eq('test_number', 1)
    .order('question_number', { ascending: true });

  if (error) {
    console.error('Error:', error);
    return;
  }

  // Group by chapter
  const chapterGroups = {};
  questions.forEach(q => {
    const chapter = q.chapter || 'null';
    if (!chapterGroups[chapter]) {
      chapterGroups[chapter] = [];
    }
    chapterGroups[chapter].push(q.question_number);
  });

  console.log('Questions grouped by chapter:');
  Object.keys(chapterGroups).sort().forEach(chapter => {
    console.log(`  Chapter "${chapter}": ${chapterGroups[chapter].length} questions`);
    console.log(`    Question numbers: ${chapterGroups[chapter].slice(0, 10).join(', ')}${chapterGroups[chapter].length > 10 ? '...' : ''}`);
  });

  // Check available lessons
  console.log('\n=== AVAILABLE ENGLISH LESSONS ===\n');

  const { data: lessons, error: lessonsError } = await supabase
    .from('lessons')
    .select('id, lesson_key, name, subject')
    .eq('subject', 'English')
    .order('lesson_key', { ascending: true });

  if (lessonsError) {
    console.error('Error:', lessonsError);
    return;
  }

  console.log(`Found ${lessons.length} English lessons:`);
  lessons.forEach(lesson => {
    console.log(`  ${lesson.lesson_key}: ${lesson.name}`);
    console.log(`    UUID: ${lesson.id}`);
  });

  // Suggest mapping based on lesson_key pattern (e.g., "1.1" -> chapter "1")
  console.log('\n=== SUGGESTED MAPPING ===\n');
  console.log('To fix the learning path issue, you need to map English questions to lessons.');
  console.log('The "chapter" column in English questions should map to lesson IDs.');
  console.log('\nFor example:');
  lessons.slice(0, 5).forEach(lesson => {
    const chapterMatch = lesson.lesson_key.split('.')[0]; // "1.1" -> "1"
    const matchingChapter = Object.keys(chapterGroups).find(ch => ch.includes(chapterMatch));
    if (matchingChapter) {
      console.log(`  Lesson ${lesson.lesson_key} (${lesson.name}) ← questions with chapter "${matchingChapter}"`);
    }
  });
}

checkEnglishChapters().then(() => process.exit(0));
