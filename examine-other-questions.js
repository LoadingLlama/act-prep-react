const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://rabavobdklnwvwsldbix.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk3NjU0NzgsImV4cCI6MjA3NTM0MTQ3OH0.z_1N3TG-cS9Bc1s7UAif91PkIjhBKvicrUqupiNP80Y';

const supabase = createClient(supabaseUrl, supabaseKey);

(async () => {
  console.log('Examining the 102 "Other" format questions...\n');

  const { data: lessons } = await supabase
    .from('lessons')
    .select('id, title')
    .eq('subject', 'english')
    .order('title');

  const otherQuestions = [];

  for (const lesson of lessons) {
    const { data: questions } = await supabase
      .from('lesson_examples')
      .select('*')
      .eq('lesson_id', lesson.id);

    if (!questions) continue;

    for (const q of questions) {
      const text = q.problem_text || '';

      // Find "Other" category
      const isLogicalPlacement = /\[\d+\]\s+[A-Z]/.test(text) || /\[Sentence \d+\]/.test(text);
      const isWhichChoice = text.includes('Which choice') || text.includes('Which sentence');
      const isSimpleGrammar = text.length < 200 && /<u>/.test(text);

      if (!isLogicalPlacement && !isWhichChoice && !isSimpleGrammar) {
        otherQuestions.push({
          lesson: lesson.title,
          position: q.position,
          text: text,
          hasUnderline: /<u>/.test(text),
          length: text.length
        });
      }
    }
  }

  console.log(`Found ${otherQuestions.length} "Other" questions\n`);

  // Show first 10 examples
  console.log('First 10 examples:\n');
  for (let i = 0; i < Math.min(10, otherQuestions.length); i++) {
    const q = otherQuestions[i];
    console.log(`${i + 1}. ${q.lesson} - Position ${q.position}`);
    console.log(`   Length: ${q.length} chars, Has <u>: ${q.hasUnderline}`);
    console.log(`   Text: ${q.text.substring(0, 200)}...`);
    console.log('');
  }
})();
