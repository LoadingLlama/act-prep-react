const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
require('dotenv').config();

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function checkQuestionsMapping() {
  console.log('Analyzing english_questions.json and mapping to lessons...\n');

  // Load english_questions.json
  const questions = JSON.parse(fs.readFileSync('english_questions.json', 'utf8'));
  
  // Get all English lessons
  const { data: lessons, error } = await supabase
    .from('lessons')
    .select('id, lesson_key, title')
    .eq('subject', 'english');

  if (error) {
    console.error('Error:', error);
    return;
  }

  // Create mapping
  const lessonMap = {};
  lessons.forEach(l => {
    lessonMap[l.id] = l.lesson_key;
  });

  // Count questions per lesson
  const questionsByLesson = {};
  const noLessonQuestions = [];
  
  questions.forEach(q => {
    if (q.lesson_id) {
      const lessonKey = lessonMap[q.lesson_id] || 'UNKNOWN';
      if (!questionsByLesson[lessonKey]) {
        questionsByLesson[lessonKey] = [];
      }
      questionsByLesson[lessonKey].push(q);
    } else {
      noLessonQuestions.push(q);
    }
  });

  console.log('TOTAL QUESTIONS IN english_questions.json:', questions.length);
  console.log('Questions WITH lesson_id:', questions.filter(q => q.lesson_id).length);
  console.log('Questions WITHOUT lesson_id:', noLessonQuestions.length);
  console.log('\nBREAKDOWN BY LESSON:\n');

  Object.keys(questionsByLesson).sort().forEach(lessonKey => {
    const qs = questionsByLesson[lessonKey];
    console.log(lessonKey + ': ' + qs.length + ' questions');
  });

  console.log('\nQUESTIONS WITHOUT LESSON_ID (first 10):');
  noLessonQuestions.slice(0, 10).forEach(q => {
    console.log('  ID ' + q.id + ': ' + q.question_type + ' - Chapter ' + q.chapter);
  });
}

checkQuestionsMapping();
