import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

console.log('🔬 ULTRA-DETAILED LESSON MAPPING ANALYSIS\n');
console.log('═══════════════════════════════════════════════════════════════\n');

// Step 1: Get all lessons and understand what they cover
console.log('📚 STEP 1: ANALYZING LESSON DATABASE...\n');

const { data: lessons, error: lessonsError } = await supabase
  .from('lessons')
  .select('*')
  .order('subject, lesson_key');

if (lessonsError) {
  console.error('Error fetching lessons:', lessonsError);
  process.exit(1);
}

console.log(`Found ${lessons.length} lessons in database\n`);

// Organize lessons by subject
const lessonsBySubject = {};
for (const lesson of lessons) {
  if (!lessonsBySubject[lesson.subject]) {
    lessonsBySubject[lesson.subject] = [];
  }
  lessonsBySubject[lesson.subject].push(lesson);
}

console.log('LESSON BREAKDOWN BY SUBJECT:\n');
for (const [subject, subjectLessons] of Object.entries(lessonsBySubject)) {
  console.log(`\n${subject.toUpperCase()} - ${subjectLessons.length} lessons:`);
  console.log('─'.repeat(80));
  for (const lesson of subjectLessons) {
    console.log(`\n  📖 ${lesson.lesson_key}: ${lesson.title}`);
    console.log(`     ID: ${lesson.id}`);
    console.log(`     Description: ${lesson.description || 'N/A'}`);
  }
}

// Step 2: Analyze all questions and their current lesson assignments
console.log('\n\n═══════════════════════════════════════════════════════════════');
console.log('📊 STEP 2: ANALYZING QUESTION-LESSON MAPPINGS...\n');

const sections = [
  { table: 'act_english_questions', subject: 'ENGLISH' },
  { table: 'act_math_questions', subject: 'MATH' },
  { table: 'act_reading_questions', subject: 'READING' },
  { table: 'act_science_questions', subject: 'SCIENCE' }
];

const analysisResults = {
  totalQuestions: 0,
  questionsWithLesson: 0,
  questionsWithoutLesson: 0,
  bySubject: {},
  byLesson: {},
  byQuestionType: {},
  byQuestionCategory: {}
};

for (const section of sections) {
  console.log(`\n${section.subject} SECTION:`);
  console.log('─'.repeat(80));

  const { data: questions, error } = await supabase
    .from(section.table)
    .select('id, test_number, question_number, question_type, question_category, lesson_id')
    .order('test_number, question_number');

  if (error) {
    console.error(`Error fetching ${section.subject} questions:`, error);
    continue;
  }

  analysisResults.totalQuestions += questions.length;
  analysisResults.bySubject[section.subject] = {
    total: questions.length,
    withLesson: 0,
    withoutLesson: 0,
    byType: {},
    byCategory: {},
    byLesson: {}
  };

  for (const q of questions) {
    if (q.lesson_id) {
      analysisResults.questionsWithLesson++;
      analysisResults.bySubject[section.subject].withLesson++;

      // Track by lesson
      if (!analysisResults.byLesson[q.lesson_id]) {
        const lesson = lessons.find(l => l.id === q.lesson_id);
        analysisResults.byLesson[q.lesson_id] = {
          lesson_key: lesson?.lesson_key || 'UNKNOWN',
          title: lesson?.title || 'UNKNOWN',
          subject: lesson?.subject || 'UNKNOWN',
          count: 0,
          types: {},
          categories: {}
        };
      }
      analysisResults.byLesson[q.lesson_id].count++;

      // Track by type
      if (q.question_type) {
        analysisResults.byLesson[q.lesson_id].types[q.question_type] =
          (analysisResults.byLesson[q.lesson_id].types[q.question_type] || 0) + 1;

        analysisResults.bySubject[section.subject].byType[q.question_type] =
          (analysisResults.bySubject[section.subject].byType[q.question_type] || 0) + 1;

        if (!analysisResults.byQuestionType[q.question_type]) {
          analysisResults.byQuestionType[q.question_type] = {
            count: 0,
            lessons: {}
          };
        }
        analysisResults.byQuestionType[q.question_type].count++;
        analysisResults.byQuestionType[q.question_type].lessons[q.lesson_id] =
          (analysisResults.byQuestionType[q.question_type].lessons[q.lesson_id] || 0) + 1;
      }

      // Track by category
      if (q.question_category) {
        analysisResults.byLesson[q.lesson_id].categories[q.question_category] =
          (analysisResults.byLesson[q.lesson_id].categories[q.question_category] || 0) + 1;

        analysisResults.bySubject[section.subject].byCategory[q.question_category] =
          (analysisResults.bySubject[section.subject].byCategory[q.question_category] || 0) + 1;

        if (!analysisResults.byQuestionCategory[q.question_category]) {
          analysisResults.byQuestionCategory[q.question_category] = {
            count: 0,
            lessons: {}
          };
        }
        analysisResults.byQuestionCategory[q.question_category].count++;
        analysisResults.byQuestionCategory[q.question_category].lessons[q.lesson_id] =
          (analysisResults.byQuestionCategory[q.question_category].lessons[q.lesson_id] || 0) + 1;
      }

      // Track in subject
      if (!analysisResults.bySubject[section.subject].byLesson[q.lesson_id]) {
        analysisResults.bySubject[section.subject].byLesson[q.lesson_id] = 0;
      }
      analysisResults.bySubject[section.subject].byLesson[q.lesson_id]++;
    } else {
      analysisResults.questionsWithoutLesson++;
      analysisResults.bySubject[section.subject].withoutLesson++;
    }
  }

  console.log(`Total questions: ${questions.length}`);
  console.log(`Questions with lesson_id: ${analysisResults.bySubject[section.subject].withLesson}`);
  console.log(`Questions without lesson_id: ${analysisResults.bySubject[section.subject].withoutLesson}`);
}

// Step 3: Generate detailed lesson mapping report
console.log('\n\n═══════════════════════════════════════════════════════════════');
console.log('🎯 STEP 3: LESSON MAPPING REPORT\n');

console.log('\n📊 OVERALL STATISTICS:');
console.log('─'.repeat(80));
console.log(`Total questions in database: ${analysisResults.totalQuestions}`);
console.log(`Questions with lesson_id: ${analysisResults.questionsWithLesson} (${(analysisResults.questionsWithLesson/analysisResults.totalQuestions*100).toFixed(1)}%)`);
console.log(`Questions without lesson_id: ${analysisResults.questionsWithoutLesson} (${(analysisResults.questionsWithoutLesson/analysisResults.totalQuestions*100).toFixed(1)}%)`);

console.log('\n\n📚 QUESTIONS PER LESSON:');
console.log('─'.repeat(80));

const sortedLessons = Object.entries(analysisResults.byLesson)
  .sort((a, b) => b[1].count - a[1].count);

for (const [lessonId, lessonData] of sortedLessons) {
  console.log(`\n${lessonData.lesson_key} - ${lessonData.title}`);
  console.log(`  Subject: ${lessonData.subject}`);
  console.log(`  Total Questions: ${lessonData.count}`);

  console.log(`  Question Types:`);
  for (const [type, count] of Object.entries(lessonData.types).sort((a, b) => b[1] - a[1])) {
    console.log(`    - ${type}: ${count}`);
  }

  console.log(`  Question Categories:`);
  for (const [category, count] of Object.entries(lessonData.categories).sort((a, b) => b[1] - a[1])) {
    console.log(`    - ${category}: ${count}`);
  }
}

console.log('\n\n📋 QUESTION TYPE → LESSON MAPPING:');
console.log('─'.repeat(80));

const sortedTypes = Object.entries(analysisResults.byQuestionType)
  .sort((a, b) => b[1].count - a[1].count);

for (const [type, typeData] of sortedTypes) {
  console.log(`\n${type} (${typeData.count} questions):`);
  const sortedLessonIds = Object.entries(typeData.lessons).sort((a, b) => b[1] - a[1]);
  for (const [lessonId, count] of sortedLessonIds) {
    const lesson = lessons.find(l => l.id === lessonId);
    const percentage = (count / typeData.count * 100).toFixed(1);
    console.log(`  → ${lesson?.lesson_key || 'UNKNOWN'}: ${count} (${percentage}%)`);
  }
}

console.log('\n\n🏷️  QUESTION CATEGORY → LESSON MAPPING:');
console.log('─'.repeat(80));

const sortedCategories = Object.entries(analysisResults.byQuestionCategory)
  .sort((a, b) => b[1].count - a[1].count);

for (const [category, categoryData] of sortedCategories) {
  console.log(`\n${category} (${categoryData.count} questions):`);
  const sortedLessonIds = Object.entries(categoryData.lessons).sort((a, b) => b[1] - a[1]);
  for (const [lessonId, count] of sortedLessonIds) {
    const lesson = lessons.find(l => l.id === lessonId);
    const percentage = (count / categoryData.count * 100).toFixed(1);
    console.log(`  → ${lesson?.lesson_key || 'UNKNOWN'}: ${count} (${percentage}%)`);
  }
}

// Step 4: Save detailed JSON report
const report = {
  generated_at: new Date().toISOString(),
  summary: {
    total_questions: analysisResults.totalQuestions,
    questions_with_lesson: analysisResults.questionsWithLesson,
    questions_without_lesson: analysisResults.questionsWithoutLesson,
    coverage_percentage: (analysisResults.questionsWithLesson / analysisResults.totalQuestions * 100)
  },
  lessons: sortedLessons.map(([lessonId, data]) => ({
    lesson_id: lessonId,
    lesson_key: data.lesson_key,
    title: data.title,
    subject: data.subject,
    question_count: data.count,
    question_types: data.types,
    question_categories: data.categories
  })),
  question_type_mappings: sortedTypes.map(([type, data]) => ({
    question_type: type,
    total_count: data.count,
    lesson_distribution: Object.entries(data.lessons).map(([lessonId, count]) => {
      const lesson = lessons.find(l => l.id === lessonId);
      return {
        lesson_id: lessonId,
        lesson_key: lesson?.lesson_key || 'UNKNOWN',
        count,
        percentage: (count / data.count * 100).toFixed(1)
      };
    }).sort((a, b) => b.count - a.count)
  })),
  question_category_mappings: sortedCategories.map(([category, data]) => ({
    question_category: category,
    total_count: data.count,
    lesson_distribution: Object.entries(data.lessons).map(([lessonId, count]) => {
      const lesson = lessons.find(l => l.id === lessonId);
      return {
        lesson_id: lessonId,
        lesson_key: lesson?.lesson_key || 'UNKNOWN',
        count,
        percentage: (count / data.count * 100).toFixed(1)
      };
    }).sort((a, b) => b.count - a.count)
  })),
  by_subject: analysisResults.bySubject
};

const fs = await import('fs');
fs.writeFileSync(
  '/Users/cadenchiang/Desktop/act-prep-react/reports/ultra-lesson-mapping.json',
  JSON.stringify(report, null, 2)
);

console.log('\n\n✅ ANALYSIS COMPLETE');
console.log('─'.repeat(80));
console.log('Report saved to: /Users/cadenchiang/Desktop/act-prep-react/reports/ultra-lesson-mapping.json');
