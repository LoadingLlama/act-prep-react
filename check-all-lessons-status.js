const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = "https://rabavobdklnwvwsldbix.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk3NjU0NzgsImV4cCI6MjA3NTM0MTQ3OH0.z_1N3TG-cS9Bc1s7UAif91PkIjhBKvicrUqupiNP80Y";
const supabase = createClient(supabaseUrl, supabaseKey);

async function checkAllLessons() {
  try {
    console.log('=== CHECKING ALL ENGLISH LESSONS ===\n');

    // Get all English lessons
    const { data: lessons, error: lessonsError } = await supabase
      .from('lessons')
      .select('id, lesson_key, title')
      .eq('subject', 'english')
      .order('lesson_key', { ascending: true });

    if (lessonsError) {
      console.error('Error:', lessonsError);
      return;
    }

    console.log(`Found ${lessons.length} English lessons\n`);

    const lessonStatus = [];
    let totalQuestions = 0;

    for (const lesson of lessons) {
      const { data: examples, error: examplesError } = await supabase
        .from('lesson_examples')
        .select('id, title, problem_text, choices, answer_explanation')
        .eq('lesson_id', lesson.id)
        .order('position', { ascending: true });

      if (examplesError) {
        console.error(`Error fetching examples for ${lesson.title}:`, examplesError);
        continue;
      }

      const questionCount = examples?.length || 0;
      totalQuestions += questionCount;

      // Check for generic explanations
      let genericCount = 0;
      if (examples) {
        for (const ex of examples) {
          const explanation = ex.answer_explanation || '';
          const hasGeneric = explanation.includes("This choice doesn't best fulfill") ||
                            explanation.includes("This is the correct answer. It properly addresses") ||
                            explanation.includes("This choice is incorrect. While");

          if (hasGeneric) {
            genericCount++;
          }
        }
      }

      lessonStatus.push({
        lessonKey: lesson.lesson_key,
        title: lesson.title,
        lessonId: lesson.id,
        questionCount,
        genericExplanations: genericCount,
        needsQuestions: 50 - questionCount,
        status: questionCount === 50 ? '✓ Complete' :
                questionCount === 0 ? '✗ Empty' :
                `⚠ Needs ${50 - questionCount} more`
      });
    }

    // Sort by status priority
    lessonStatus.sort((a, b) => {
      if (a.questionCount === 0 && b.questionCount !== 0) return -1;
      if (a.questionCount !== 0 && b.questionCount === 0) return 1;
      if (a.questionCount < 50 && b.questionCount >= 50) return -1;
      if (a.questionCount >= 50 && b.questionCount < 50) return 1;
      return a.questionCount - b.questionCount;
    });

    console.log('=== LESSON STATUS ===\n');
    console.log('Key | Title | Questions | Generic Explanations | Status');
    console.log('-'.repeat(100));

    for (const lesson of lessonStatus) {
      const statusIcon = lesson.questionCount === 50 ? '✓' :
                        lesson.questionCount === 0 ? '✗' : '⚠';
      console.log(`${statusIcon} ${lesson.lessonKey.padEnd(20)} | ${lesson.title.padEnd(40)} | ${String(lesson.questionCount).padStart(2)}/50 | ${String(lesson.genericExplanations).padStart(3)} generic | ${lesson.status}`);
    }

    console.log('\n=== SUMMARY ===\n');
    const complete = lessonStatus.filter(l => l.questionCount === 50).length;
    const empty = lessonStatus.filter(l => l.questionCount === 0).length;
    const incomplete = lessonStatus.filter(l => l.questionCount > 0 && l.questionCount < 50).length;

    console.log(`Complete (50 questions): ${complete} lessons`);
    console.log(`Incomplete: ${incomplete} lessons`);
    console.log(`Empty: ${empty} lessons`);
    console.log(`Total questions across all lessons: ${totalQuestions}`);
    console.log(`Questions needed to reach 50 per lesson: ${(50 * lessons.length) - totalQuestions}`);

    // Export detailed info to JSON
    const fs = require('fs');
    fs.writeFileSync('lesson-status.json', JSON.stringify(lessonStatus, null, 2));
    console.log('\nDetailed status saved to: lesson-status.json');

  } catch (err) {
    console.error('Error:', err);
  }
}

checkAllLessons();
