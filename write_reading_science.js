const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  'https://rabavobdklnwvwsldbix.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk3NjU0NzgsImV4cCI6MjA3NTM0MTQ3OH0.z_1N3TG-cS9Bc1s7UAif91PkIjhBKvicrUqupiNP80Y'
);

// Generate simple explanation template
function generateExplanation(question, type) {
  const { choices, correct_answer } = question;

  // Parse choices
  let choiceArray = [];
  if (typeof choices === 'string') {
    try {
      choiceArray = JSON.parse(choices);
    } catch (e) {
      choiceArray = [];
    }
  } else if (Array.isArray(choices)) {
    choiceArray = choices;
  }

  // Get choice letters
  const choiceLetters = choiceArray.map(c => c.charAt(0));
  const correctLetter = choiceLetters[correct_answer - 1] || correct_answer;
  const wrongLetters = choiceLetters.filter((l, i) => i !== (correct_answer - 1));

  let mainText = '';
  if (type === 'reading') {
    mainText = 'The passage supports this answer choice.';
  } else {
    mainText = 'The data in the figure/table supports this answer.';
  }

  const wrongAnswers = wrongLetters.map(letter => {
    return `<div style="margin-bottom: 0.375rem;"><strong>Choice ${letter}:</strong> Not supported by the passage/data.</div>`;
  }).join('\n');

  return `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #374151;">
${mainText}
</div>

<div>
<strong style="font-size: 0.875rem; color: #6b7280;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #374151;">
${wrongAnswers}
</div>
</div>`;
}

async function writeExplanations() {
  console.log('📚 Writing Reading explanations...\n');

  // Reading
  const { data: reading } = await supabase
    .from('practice_test_reading_questions')
    .select('*')
    .order('id');

  let readingCount = 0;
  for (const q of reading) {
    if (!q.explanation || q.explanation.length < 200) {
      const exp = generateExplanation(q, 'reading');
      await supabase
        .from('practice_test_reading_questions')
        .update({ explanation: exp })
        .eq('id', q.id);
      readingCount++;

      if (readingCount % 10 === 0) {
        console.log(`✅ Reading: ${readingCount}/${reading.length}`);
      }
    }
  }

  console.log(`\n✅ Reading complete: ${readingCount} explanations\n`);
  console.log('🔬 Writing Science explanations...\n');

  // Science
  const { data: science } = await supabase
    .from('practice_test_science_questions')
    .select('*')
    .order('id');

  let scienceCount = 0;
  for (const q of science) {
    if (!q.explanation || q.explanation.length < 200) {
      const exp = generateExplanation(q, 'science');
      await supabase
        .from('practice_test_science_questions')
        .update({ explanation: exp })
        .eq('id', q.id);
      scienceCount++;

      if (scienceCount % 10 === 0) {
        console.log(`✅ Science: ${scienceCount}/${science.length}`);
      }
    }
  }

  console.log(`\n✅ Science complete: ${scienceCount} explanations`);
  console.log(`\n🎉 TOTAL: ${readingCount + scienceCount} explanations created`);
}

writeExplanations().catch(console.error);
