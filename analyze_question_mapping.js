/**
 * Analyze how to map practice test questions to lessons
 */

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function analyzeQuestionMapping() {
  console.log('🔍 Analyzing question to lesson mapping possibilities...\n');

  try {
    const sections = ['english', 'math', 'reading', 'science'];

    for (const section of sections) {
      console.log(`\n${'='.repeat(60)}`);
      console.log(`${section.toUpperCase()} SECTION`);
      console.log('='.repeat(60));

      const tableName = `practice_test_${section}_questions`;

      // Get all diagnostic questions for this section
      const { data: questions, error } = await supabase
        .from(tableName)
        .select('id, question_number, question_type, chapter, difficulty')
        .eq('test_number', 1)
        .order('question_number');

      if (error) {
        console.error(`❌ Error: ${error.message}`);
        continue;
      }

      if (!questions || questions.length === 0) {
        console.log('  No questions found');
        continue;
      }

      console.log(`\n📊 Total questions: ${questions.length}`);

      // Analyze question_type distribution
      const typeCount = {};
      questions.forEach(q => {
        const type = q.question_type || 'NULL';
        typeCount[type] = (typeCount[type] || 0) + 1;
      });

      console.log('\n📋 Question Types:');
      Object.entries(typeCount)
        .sort((a, b) => b[1] - a[1])
        .forEach(([type, count]) => {
          console.log(`  ${type}: ${count} questions`);
        });

      // Analyze chapter distribution
      const chapterCount = {};
      questions.forEach(q => {
        const chapter = q.chapter || 'NULL';
        chapterCount[chapter] = (chapterCount[chapter] || 0) + 1;
      });

      console.log('\n📚 Chapters:');
      Object.entries(chapterCount)
        .sort((a, b) => {
          // Try to sort numerically if possible
          const aNum = parseFloat(a[0]);
          const bNum = parseFloat(b[0]);
          if (!isNaN(aNum) && !isNaN(bNum)) {
            return aNum - bNum;
          }
          return a[0].localeCompare(b[0]);
        })
        .forEach(([chapter, count]) => {
          console.log(`  Chapter ${chapter}: ${count} questions`);
        });

      // Show sample questions with their metadata
      console.log('\n📝 Sample Questions (first 5):');
      questions.slice(0, 5).forEach(q => {
        console.log(`  Q${q.question_number}: type=${q.question_type || 'NULL'}, chapter=${q.chapter || 'NULL'}, diff=${q.difficulty || 'NULL'}`);
      });
    }

    // Get all lessons to see what we need to map to
    console.log('\n\n' + '='.repeat(60));
    console.log('AVAILABLE LESSONS');
    console.log('='.repeat(60));

    const { data: lessons, error: lessonsError } = await supabase
      .from('lessons')
      .select('id, subject, lesson_key, title')
      .order('subject', { ascending: true });

    if (lessonsError) {
      console.error('❌ Error:', lessonsError.message);
    } else {
      const lessonsBySubject = {};
      lessons.forEach(lesson => {
        if (!lessonsBySubject[lesson.subject]) {
          lessonsBySubject[lesson.subject] = [];
        }
        lessonsBySubject[lesson.subject].push(lesson);
      });

      Object.entries(lessonsBySubject).forEach(([subject, subjectLessons]) => {
        console.log(`\n${subject.toUpperCase()} Lessons (${subjectLessons.length}):`);
        subjectLessons.forEach(lesson => {
          console.log(`  ${lesson.lesson_key}: ${lesson.title}`);
        });
      });
    }

    console.log('\n\n' + '='.repeat(60));
    console.log('MAPPING STRATEGY RECOMMENDATION');
    console.log('='.repeat(60));
    console.log(`
Based on the analysis above, you can map questions to lessons using:

1. **question_type field**: Maps directly to lesson topics
   - Example: question_type='words_in_context' → lesson_key='words-in-context'

2. **chapter field**: Groups questions by topic area
   - May need a mapping table: chapter → lesson_id

3. **Manual review**: For edge cases or questions without clear types

Next steps:
1. Run fix_diagnostic_schema.sql to add lesson_id columns
2. Create a mapping script based on question_type or chapter
3. Review and verify mappings
4. Update the database

Would you like me to generate the UPDATE SQL statements based on the data?
`);

  } catch (err) {
    console.error('❌ Unexpected error:', err);
  }
}

analyzeQuestionMapping();
