const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = "https://rabavobdklnwvwsldbix.supabase.co";
const supabaseServiceKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTc2NTQ3OCwiZXhwIjoyMDc1MzQxNDc4fQ.81SeH703keXgF3IevQlRS7OYmn1J2GUVIkn3OJiviM4";
const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function findShortParagraphReferences() {
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
      const lowerText = text.toLowerCase();

      // Look for questions that:
      // 1. Are relatively short (under 350 chars)
      // 2. Reference "the paragraph" or have underlined text
      // 3. Don't seem to include the full paragraph
      if (text.length < 350) {
        const hasParaRef = lowerText.includes('the paragraph');
        const hasUnderlined = text.includes('<u>') && text.includes('</u>');
        const hasSentenceRef = lowerText.includes('this sentence') || lowerText.includes('the sentence');

        if (hasParaRef || hasUnderlined || hasSentenceRef) {
          // Check if it seems to lack context
          const hasLongText = text.length > 200;
          const hasMultipleParagraphs = (text.match(/\n\n/g) || []).length > 0;

          incompleteQuestions.push({
            lesson: lessonKey,
            position: q.position,
            title: q.title,
            id: q.id,
            length: text.length,
            text: text,
            hasParaRef,
            hasUnderlined,
            hasSentenceRef,
            hasLongText,
            hasMultipleParagraphs
          });
        }
      }
    }
  }

  console.log(`Found ${incompleteQuestions.length} potentially incomplete questions:\n`);

  // Sort by length
  incompleteQuestions.sort((a, b) => a.length - b.length);

  // Show first 30
  incompleteQuestions.slice(0, 30).forEach(q => {
    console.log(`${q.lesson} - Position ${q.position} (${q.length} chars): ${q.title}`);
    console.log(`  ID: ${q.id}`);
    console.log(`  Flags: paraRef=${q.hasParaRef}, underlined=${q.hasUnderlined}, sentenceRef=${q.hasSentenceRef}`);
    console.log(`  Text preview: ${q.text.substring(0, 120)}...`);
    console.log();
  });

  if (incompleteQuestions.length > 30) {
    console.log(`... and ${incompleteQuestions.length - 30} more\n`);
  }

  // Specifically find the bee question
  const beeQuestion = incompleteQuestions.find(q => q.text.toLowerCase().includes('bees') && q.text.toLowerCase().includes('honey'));
  if (beeQuestion) {
    console.log('\n=== BEE/HONEY QUESTION FOUND ===');
    console.log('Lesson:', beeQuestion.lesson);
    console.log('Position:', beeQuestion.position);
    console.log('ID:', beeQuestion.id);
    console.log('Full text:');
    console.log(beeQuestion.text);
  }
}

findShortParagraphReferences();
