const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = "https://rabavobdklnwvwsldbix.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk3NjU0NzgsImV4cCI6MjA3NTM0MTQ3OH0.z_1N3TG-cS9Bc1s7UAif91PkIjhBKvicrUqupiNP80Y";
const supabase = createClient(supabaseUrl, supabaseKey);

const RHETORICAL_LESSONS = [
  'adding-deleting',
  'logical-placement',
  'redundancy',
  'transitions',
  'which-choice',
  'word-choice'
];

async function identifyDuplicates() {
  try {
    console.log('=== IDENTIFYING DUPLICATE QUESTION IDs ===\n');

    // Get all English lessons
    const { data: lessons, error: lessonsError } = await supabase
      .from('lessons')
      .select('id, lesson_key, title')
      .eq('subject', 'english')
      .in('lesson_key', RHETORICAL_LESSONS);

    if (lessonsError) {
      console.error('Error:', lessonsError);
      return;
    }

    // Get all examples for these lessons
    const questionsByText = {};
    const questionDetails = {};

    for (const lesson of lessons) {
      const { data: examples, error: examplesError } = await supabase
        .from('lesson_examples')
        .select('*')
        .eq('lesson_id', lesson.id);

      if (examplesError) continue;

      for (const ex of examples) {
        const textKey = ex.problem_text?.trim().toLowerCase();
        if (!textKey) continue;

        if (!questionsByText[textKey]) {
          questionsByText[textKey] = [];
        }

        questionsByText[textKey].push({
          id: ex.id,
          lessonKey: lesson.lesson_key,
          lessonTitle: lesson.title,
          lessonId: lesson.id,
          title: ex.title,
          position: ex.position
        });

        questionDetails[ex.id] = {
          ...ex,
          lessonKey: lesson.lesson_key
        };
      }
    }

    // Find duplicates
    const duplicates = Object.entries(questionsByText).filter(([text, questions]) => questions.length > 1);

    console.log(`Found ${duplicates.length} duplicate questions\n`);

    // Group duplicates by which lessons they appear in
    const duplicateGroups = {};
    for (const [text, questions] of duplicates) {
      const lessonKeys = questions.map(q => q.lessonKey).sort().join(',');
      if (!duplicateGroups[lessonKeys]) {
        duplicateGroups[lessonKeys] = [];
      }
      duplicateGroups[lessonKeys].push({ text, questions });
    }

    console.log('=== DUPLICATE GROUPS ===\n');
    for (const [lessonKeys, dups] of Object.entries(duplicateGroups)) {
      console.log(`\nQuestions appearing in lessons: ${lessonKeys}`);
      console.log(`Count: ${dups.length} questions\n`);

      for (const { text, questions } of dups) {
        console.log('Question IDs to delete:');
        questions.forEach(q => {
          console.log(`  ${q.id} (${q.lessonKey} - ${q.title})`);
        });
        console.log(`  Text: ${text.substring(0, 150)}...`);
        console.log('');
      }
    }

    // Now let's create specific deletion lists
    console.log('\n\n=== RECOMMENDED DELETION PLAN ===\n');
    console.log('These duplicate questions should be DELETED from all rhetorical lessons');
    console.log('as they are generic passage-based questions, not specific to any skill:\n');

    const idsToDelete = [];
    for (const [text, questions] of duplicates) {
      if (questions.length >= 6) {
        // If it appears in 6 lessons, it's definitely not specific
        for (const q of questions) {
          idsToDelete.push(q.id);
          console.log(`DELETE: ${q.id} from ${q.lessonKey} (${q.title})`);
        }
      }
    }

    console.log(`\n\nTotal questions to delete: ${idsToDelete.length}`);

    // Save to JSON for easy script usage
    const fs = require('fs');
    fs.writeFileSync('duplicate-questions-to-delete.json', JSON.stringify({
      idsToDelete,
      duplicates: duplicates.map(([text, questions]) => ({
        text: text.substring(0, 200),
        questions
      }))
    }, null, 2));

    console.log('\nSaved deletion list to: duplicate-questions-to-delete.json');

  } catch (err) {
    console.error('Error:', err);
  }
}

identifyDuplicates();
