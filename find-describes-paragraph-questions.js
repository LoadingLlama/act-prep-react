const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = "https://rabavobdklnwvwsldbix.supabase.co";
const supabaseServiceKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTc2NTQ3OCwiZXhwIjoyMDc1MzQxNDc4fQ.81SeH703keXgF3IevQlRS7OYmn1J2GUVIkn3OJiviM4";
const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function findDescribesParagraphQuestions() {
  const allEnglishLessons = [
    'adding-deleting', 'commas', 'logical-placement', 'misc-topics',
    'modifiers', 'parallel-structure', 'pronouns', 'punctuation',
    'redundancy', 'transitions', 'verbs', 'which-choice', 'word-choice'
  ];

  const incompleteQuestions = [];

  for (const lessonKey of allEnglishLessons) {
    const { data: lesson } = await supabase
      .from('lessons')
      .select('id')
      .eq('lesson_key', lessonKey)
      .single();

    const { data: questions } = await supabase
      .from('lesson_examples')
      .select('*')
      .eq('lesson_id', lesson.id);

    for (const q of questions) {
      const text = q.problem_text || '';

      // Pattern: Starts with descriptive text about a paragraph but doesn't show it
      const startsWithDescribes =
        text.startsWith('The paragraph discusses') ||
        text.startsWith('The following sentence discusses') ||
        text.match(/^The paragraph \w+/);

      // Check if it's short and lacks actual paragraph content
      const isShortAndDescriptive = startsWithDescribes && text.length < 350;

      if (isShortAndDescriptive) {
        incompleteQuestions.push({
          lesson: lessonKey,
          position: q.position,
          title: q.title,
          id: q.id,
          text: text
        });
      }
    }
  }

  console.log(`Found ${incompleteQuestions.length} questions that describe but don't show paragraphs:\n`);

  incompleteQuestions.forEach(q => {
    console.log(`${q.lesson} - Position ${q.position}: ${q.title}`);
    console.log(`  ID: ${q.id}`);
    console.log(`  Text: ${q.text.substring(0, 200)}...`);
    console.log();
  });

  console.log('\nIDs to delete:');
  console.log(JSON.stringify(incompleteQuestions.map(q => q.id), null, 2));
}

findDescribesParagraphQuestions();
