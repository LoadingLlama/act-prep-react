const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = "https://rabavobdklnwvwsldbix.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk3NjU0NzgsImV4cCI6MjA3NTM0MTQ3OH0.z_1N3TG-cS9Bc1s7UAif91PkIjhBKvicrUqupiNP80Y";
const supabase = createClient(supabaseUrl, supabaseKey);

async function reviewAllLessons() {
  try {
    console.log('=== FETCHING ALL LESSONS ===\n');

    // Get all English lessons
    const { data: lessons, error: lessonsError } = await supabase
      .from('lessons')
      .select('id, lesson_key, title')
      .eq('subject', 'english')
      .order('lesson_key', { ascending: true });

    if (lessonsError) {
      console.error('Error fetching lessons:', lessonsError);
      return;
    }

    console.log(`Found ${lessons.length} English lessons\n`);

    // For each lesson, get its practice questions
    const lessonData = {};
    const allQuestions = [];
    const questionsByText = {};

    for (const lesson of lessons) {
      const { data: examples, error: examplesError } = await supabase
        .from('lesson_examples')
        .select('*')
        .eq('lesson_id', lesson.id)
        .order('position', { ascending: true });

      if (examplesError) {
        console.error(`Error fetching examples for ${lesson.title}:`, examplesError);
        continue;
      }

      lessonData[lesson.id] = {
        lesson,
        examples: examples || []
      };

      // Track all questions and check for duplicates
      if (examples) {
        examples.forEach(ex => {
          allQuestions.push({
            lessonId: lesson.id,
            lessonKey: lesson.lesson_key,
            lessonTitle: lesson.title,
            exampleId: ex.id,
            title: ex.title,
            problemText: ex.problem_text
          });

          // Track by problem text to find duplicates
          const textKey = ex.problem_text?.trim().toLowerCase();
          if (textKey) {
            if (!questionsByText[textKey]) {
              questionsByText[textKey] = [];
            }
            questionsByText[textKey].push({
              lessonKey: lesson.lesson_key,
              lessonTitle: lesson.title,
              title: ex.title
            });
          }
        });
      }
    }

    console.log('=== LESSON BREAKDOWN ===\n');
    lessons.forEach(lesson => {
      const data = lessonData[lesson.id];
      console.log(`${lesson.lesson_key}: ${lesson.title}`);
      console.log(`  Questions: ${data.examples.length}`);
      if (data.examples.length > 0) {
        console.log(`  Titles: ${data.examples.map(e => e.title).join(', ')}`);
      }
      console.log('');
    });

    console.log('\n=== DUPLICATE QUESTIONS ANALYSIS ===\n');
    const duplicates = Object.entries(questionsByText).filter(([text, lessons]) => lessons.length > 1);

    if (duplicates.length > 0) {
      console.log(`Found ${duplicates.length} duplicate questions:\n`);
      duplicates.forEach(([text, lessons]) => {
        console.log(`Question appears in ${lessons.length} lessons:`);
        lessons.forEach(l => {
          console.log(`  - ${l.lessonKey}: ${l.lessonTitle} (${l.title})`);
        });
        console.log(`  Text preview: ${text.substring(0, 100)}...`);
        console.log('');
      });
    } else {
      console.log('No exact duplicate questions found.');
    }

    console.log('\n=== LESSONS WITH FEW/NO QUESTIONS ===\n');
    const lessonsNeedingQuestions = lessons.filter(lesson => {
      const data = lessonData[lesson.id];
      return data.examples.length < 5;
    });

    if (lessonsNeedingQuestions.length > 0) {
      console.log(`${lessonsNeedingQuestions.length} lessons need more questions:\n`);
      lessonsNeedingQuestions.forEach(lesson => {
        const data = lessonData[lesson.id];
        console.log(`${lesson.lesson_key}: ${lesson.title} - ${data.examples.length} questions`);
      });
    }

    console.log('\n=== DETAILED QUESTION REVIEW ===\n');
    for (const lesson of lessons) {
      const data = lessonData[lesson.id];
      if (data.examples.length > 0) {
        console.log(`\n${'='.repeat(80)}`);
        console.log(`LESSON: ${lesson.lesson_key} - ${lesson.title}`);
        console.log(`${'='.repeat(80)}\n`);

        data.examples.forEach((ex, idx) => {
          console.log(`Question ${idx + 1}: ${ex.title}`);
          console.log(`Problem text: ${ex.problem_text?.substring(0, 200)}${ex.problem_text?.length > 200 ? '...' : ''}`);
          console.log(`Choices: ${JSON.stringify(ex.choices?.map(c => c.text || c))}`);
          console.log(`Correct: ${ex.correct_answer}`);
          console.log('');
        });
      }
    }

  } catch (err) {
    console.error('Unexpected error:', err);
  }
}

reviewAllLessons();
