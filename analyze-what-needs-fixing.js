const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://rabavobdklnwvwsldbix.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk3NjU0NzgsImV4cCI6MjA3NTM0MTQ3OH0.z_1N3TG-cS9Bc1s7UAif91PkIjhBKvicrUqupiNP80Y';

const supabase = createClient(supabaseUrl, supabaseKey);

(async () => {
  console.log('Analyzing question formats to see what needs fixing...\n');

  const { data: lessons } = await supabase
    .from('lessons')
    .select('id, title')
    .eq('subject', 'english')
    .order('title');

  const categories = {
    simpleGrammar: { count: 0, example: null, description: 'Short sentence with <u> tag, no question text' },
    logicalPlacement: { count: 0, example: null, description: 'Has [1], [2], [3] sentence markers' },
    whichChoice: { count: 0, example: null, description: 'Has passage + "Which choice..." question' },
    other: { count: 0, example: null, description: 'Other format' }
  };

  for (const lesson of lessons) {
    const { data: questions } = await supabase
      .from('lesson_examples')
      .select('*')
      .eq('lesson_id', lesson.id);

    if (!questions) continue;

    for (const q of questions) {
      const text = q.problem_text || '';

      // Categorize
      if (/\[\d+\]\s+[A-Z]/.test(text) || /\[Sentence \d+\]/.test(text)) {
        categories.logicalPlacement.count++;
        if (!categories.logicalPlacement.example) {
          categories.logicalPlacement.example = { lesson: lesson.title, text: text.substring(0, 150) + '...' };
        }
      } else if (text.includes('Which choice') || text.includes('Which sentence')) {
        categories.whichChoice.count++;
        if (!categories.whichChoice.example) {
          categories.whichChoice.example = { lesson: lesson.title, text: text.substring(0, 150) + '...' };
        }
      } else if (text.length < 200 && /<u>/.test(text)) {
        categories.simpleGrammar.count++;
        if (!categories.simpleGrammar.example) {
          categories.simpleGrammar.example = { lesson: lesson.title, text };
        }
      } else {
        categories.other.count++;
        if (!categories.other.example) {
          categories.other.example = { lesson: lesson.title, text: text.substring(0, 150) + '...' };
        }
      }
    }
  }

  console.log('QUESTION TYPE BREAKDOWN:\n');
  console.log('='.repeat(80));

  for (const [type, data] of Object.entries(categories)) {
    console.log(`\n${type.toUpperCase()}: ${data.count} questions`);
    console.log(`Description: ${data.description}`);
    if (data.example) {
      console.log(`Example from: ${data.example.lesson}`);
      console.log(`Text: ${data.example.text}`);
    }
  }

  console.log('\n' + '='.repeat(80));
  console.log('\nRECOMMENDATION:');
  console.log('- Simple Grammar: Leave as is (just sentence with <u> tag is fine)');
  console.log('- Logical Placement: Already properly formatted with [1], [2], [3]');
  console.log('- Which Choice: These are fine - passage + question below is ACT format');
  console.log('- Other: Review individually');
})();
