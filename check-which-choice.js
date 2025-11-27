const { createClient } = require('@supabase/supabase-js');
const supabase = createClient('https://rabavobdklnwvwsldbix.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTc2NTQ3OCwiZXhwIjoyMDc1MzQxNDc4fQ.81SeH703keXgF3IevQlRS7OYmn1J2GUVIkn3OJiviM4');

async function checkWhichChoice() {
  const { data: lesson } = await supabase.from('lessons').select('id').eq('lesson_key', 'which-choice').single();
  const { data: questions } = await supabase.from('lesson_examples').select('*').eq('lesson_id', lesson.id).order('position');

  console.log(`Checking all ${questions.length} which-choice questions:\n`);
  console.log('='.repeat(80));

  const incomplete = [];

  for (const q of questions) {
    const text = q.problem_text || '';
    const lowText = text.toLowerCase();

    // Check if question references things without showing them
    const refsParagraph = (lowText.includes('this essay') || lowText.includes('this paragraph') || lowText.includes('the essay') || lowText.includes('the paragraph')) && text.length < 300;
    const refsUnderlined = (lowText.includes('underlined') || lowText.includes('no change')) && text.length < 300;
    const refsSentences = lowText.includes('sentence 1') || lowText.includes('sentence 2');
    const tooShort = text.length < 200;

    if (refsParagraph || refsUnderlined || refsSentences || tooShort) {
      incomplete.push({
        pos: q.position,
        title: q.title,
        length: text.length,
        issue: refsParagraph ? 'refs essay/para' : refsUnderlined ? 'refs underlined' : refsSentences ? 'refs sentences' : 'too short'
      });

      console.log(`Position ${q.position}: ${q.title} [${incomplete[incomplete.length-1].issue}]`);
      console.log(`  Length: ${text.length} chars`);
      console.log(`  Preview: ${text.substring(0, 150)}...\n`);
    }
  }

  console.log('='.repeat(80));
  console.log(`Found ${incomplete.length} potentially incomplete questions`);

  if (incomplete.length === 0) {
    console.log('✓ All which-choice questions have complete context!');
  }
}

checkWhichChoice();
