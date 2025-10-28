import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Get all Math lessons
const { data: allMathLessons } = await supabase
  .from('lessons')
  .select('*')
  .eq('subject', 'math')
  .order('lesson_key');

console.log('ALL MATH LESSONS IN DATABASE (' + allMathLessons.length + ' total):');
console.log('═══════════════════════════════════════════════════════════════\n');
allMathLessons.forEach((lesson, idx) => {
  console.log(`${idx + 1}. ${lesson.lesson_key} - ${lesson.title}`);
  console.log(`   ID: ${lesson.id}`);
});

// Get how many questions are mapped to each lesson
const { data: mathQuestions } = await supabase
  .from('act_math_questions')
  .select('lesson_id, question_type, question_category');

console.log(`\n\nQUESTIONS DISTRIBUTION:`);
console.log('═══════════════════════════════════════════════════════════════\n');

const lessonCounts = {};
mathQuestions.forEach(q => {
  if (q.lesson_id) {
    lessonCounts[q.lesson_id] = (lessonCounts[q.lesson_id] || 0) + 1;
  }
});

const sortedLessons = Object.entries(lessonCounts)
  .sort((a, b) => b[1] - a[1])
  .map(([id, count]) => {
    const lesson = allMathLessons.find(l => l.id === id);
    return { lesson, count };
  });

sortedLessons.forEach((item, idx) => {
  if (item.lesson) {
    console.log(`${idx + 1}. ${item.lesson.lesson_key} - ${item.lesson.title}: ${item.count} questions`);
  }
});

console.log(`\n\nLESSONS WITH ZERO QUESTIONS:`);
console.log('═══════════════════════════════════════════════════════════════\n');

const usedLessonIds = new Set(Object.keys(lessonCounts));
const unusedLessons = allMathLessons.filter(l => !usedLessonIds.has(l.id));

unusedLessons.forEach(lesson => {
  console.log(`- ${lesson.lesson_key} - ${lesson.title}`);
});

// Do the same for English
const { data: allEnglishLessons } = await supabase
  .from('lessons')
  .select('*')
  .eq('subject', 'english')
  .order('lesson_key');

console.log('\n\n═══════════════════════════════════════════════════════════════');
console.log('ALL ENGLISH LESSONS IN DATABASE (' + allEnglishLessons.length + ' total):');
console.log('═══════════════════════════════════════════════════════════════\n');

allEnglishLessons.forEach((lesson, idx) => {
  console.log(`${idx + 1}. ${lesson.lesson_key} - ${lesson.title}`);
  console.log(`   ID: ${lesson.id}`);
});

const { data: englishQuestions } = await supabase
  .from('act_english_questions')
  .select('lesson_id');

const englishLessonCounts = {};
englishQuestions.forEach(q => {
  if (q.lesson_id) {
    englishLessonCounts[q.lesson_id] = (englishLessonCounts[q.lesson_id] || 0) + 1;
  }
});

console.log(`\n\nENGLISH QUESTIONS DISTRIBUTION:`);
console.log('═══════════════════════════════════════════════════════════════\n');

const sortedEnglishLessons = Object.entries(englishLessonCounts)
  .sort((a, b) => b[1] - a[1])
  .map(([id, count]) => {
    const lesson = allEnglishLessons.find(l => l.id === id);
    return { lesson, count };
  });

sortedEnglishLessons.forEach((item, idx) => {
  if (item.lesson) {
    console.log(`${idx + 1}. ${item.lesson.lesson_key} - ${item.lesson.title}: ${item.count} questions`);
  }
});

console.log(`\n\nENGLISH LESSONS WITH ZERO QUESTIONS:`);
console.log('═══════════════════════════════════════════════════════════════\n');

const usedEnglishIds = new Set(Object.keys(englishLessonCounts));
const unusedEnglishLessons = allEnglishLessons.filter(l => !usedEnglishIds.has(l.id));

unusedEnglishLessons.forEach(lesson => {
  console.log(`- ${lesson.lesson_key} - ${lesson.title}`);
});
