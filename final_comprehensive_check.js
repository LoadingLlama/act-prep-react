const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://rabavobdklnwvwsldbix.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk3NjU0NzgsImV4cCI6MjA3NTM0MTQ3OH0.z_1N3TG-cS9Bc1s7UAif91PkIjhBKvicrUqupiNP80Y';
const supabase = createClient(supabaseUrl, supabaseKey);

async function finalCheck() {
  const tables = [
    { name: 'practice_test_english_questions', subject: 'English', expected: 75 },
    { name: 'practice_test_math_questions', subject: 'Math', expected: 60 },
    { name: 'practice_test_reading_questions', subject: 'Reading', expected: 40 },
    { name: 'practice_test_science_questions', subject: 'Science', expected: 40 }
  ];

  console.log('=== FINAL COMPREHENSIVE CHECK ===\n');

  let grandTotal = 0;
  let grandComplete = 0;
  let grandIncomplete = 0;
  let issues = [];

  for (const table of tables) {
    const { data, error } = await supabase
      .from(table.name)
      .select('id, question_number, explanation')
      .eq('test_number', 1)
      .order('id');

    if (error) {
      console.log(`✗ ${table.subject}: Error - ${error.message}`);
      continue;
    }

    let complete = 0;
    let incomplete = 0;
    let missing = 0;
    let wrongFormat = 0;

    data.forEach(q => {
      grandTotal++;

      if (!q.explanation || q.explanation.trim() === '') {
        missing++;
        incomplete++;
        issues.push(`${table.subject} ID ${q.id}: Missing explanation`);
        return;
      }

      const hasMain = q.explanation.includes('margin-bottom: 0.75rem');
      const hasWrong = q.explanation.includes('Why Other Answers');

      // Check for the redundant "Correct Answer: X" in explanation
      const hasRedundant = q.explanation.match(/Correct Answer:\s*[A-K]/i);

      if (hasRedundant) {
        wrongFormat++;
        issues.push(`${table.subject} ID ${q.id}: Contains redundant "Correct Answer: ${hasRedundant[0]}"`);
      }

      if (hasMain && hasWrong && !hasRedundant) {
        complete++;
        grandComplete++;
      } else {
        incomplete++;
        grandIncomplete++;
        if (!hasMain) issues.push(`${table.subject} ID ${q.id}: Missing main explanation`);
        if (!hasWrong) issues.push(`${table.subject} ID ${q.id}: Missing wrong answers section`);
      }
    });

    const status = (complete === table.expected && data.length === table.expected) ? '✓' : '✗';
    console.log(`${status} ${table.subject}: ${complete}/${table.expected} complete (${data.length} found)`);
    if (incomplete > 0) {
      console.log(`  - ${incomplete} incomplete or missing`);
    }
    if (wrongFormat > 0) {
      console.log(`  - ${wrongFormat} with wrong format`);
    }
  }

  console.log('\n' + '='.repeat(50));
  console.log(`GRAND TOTAL: ${grandComplete}/${grandTotal} complete`);
  console.log(`Incomplete: ${grandIncomplete}`);
  console.log('='.repeat(50));

  if (issues.length > 0 && issues.length <= 10) {
    console.log('\nIssues found:');
    issues.forEach(issue => console.log(`  - ${issue}`));
  } else if (issues.length > 10) {
    console.log(`\n${issues.length} issues found (showing first 10):`);
    issues.slice(0, 10).forEach(issue => console.log(`  - ${issue}`));
  }

  if (grandComplete === 215 && grandIncomplete === 0) {
    console.log('\n🎉 Mission Accomplished! All 215 explanations regenerated in clean format.');
  } else {
    console.log('\n⚠️  Some explanations still need attention.');
  }
}

finalCheck().catch(console.error);
