const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  'https://rabavobdklnwvwsldbix.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk3NjU0NzgsImV4cCI6MjA3NTM0MTQ3OH0.z_1N3TG-cS9Bc1s7UAif91PkIjhBKvicrUqupiNP80Y'
);

// Simplify explanation - make it clear and explain terms
function simplify(explanation) {
  if (!explanation || !explanation.includes('Why Other Answers Are Wrong')) {
    return explanation;
  }

  // Extract main and wrong answers sections
  const parts = explanation.split('<div>\n<strong style="font-size: 0.875rem; color: #6b7280;">Why Other Answers Are Wrong:</strong>');

  if (parts.length !== 2) return explanation;

  let main = parts[0].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  let wrong = parts[1];

  // Simplify and explain terms in main explanation
  main = main
    .replace(/creates a subordinate prepositional phrase/gi, 'makes the first part dependent')
    .replace(/subordinate (clause|phrase)/gi, 'dependent part')
    .replace(/independent clause/gi, 'complete sentence')
    .replace(/comma splice error/gi, 'comma splice (joining two complete sentences with just a comma)')
    .replace(/comma splice/gi, 'comma splice (incorrectly joining complete sentences)')
    .replace(/subject-verb agreement/gi, 'subject-verb agreement (subject and verb must match)')
    .replace(/parallel structure/gi, 'parallel structure (keeping verb tenses consistent)')
    .replace(/possessive pronoun/gi, 'possessive (showing ownership)')
    .replace(/This choice transforms/gi, 'This fixes')
    .replace(/This choice/gi, 'This')
    .replace(/correctly uses/gi, 'uses');

  // Simplify wrong answers - remove double colons and wordiness
  wrong = wrong
    .replace(/Choice ([A-Z]) \(NO CHANGE\)::/g, 'Choice $1:')
    .replace(/Choice ([A-Z])::/g, 'Choice $1:')
    .replace(/by joining two independent clauses with only a comma/gi, 'joins complete sentences with just a comma')
    .replace(/creates a comma splice/gi, 'comma splice')
    .replace(/still contains the same/gi, 'Still has the');

  return `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #374151;">
${main}
</div>

<div>
<strong style="font-size: 0.875rem; color: #6b7280;">Why Other Answers Are Wrong:</strong>${wrong}`;
}

async function updateAll() {
  console.log('🔄 Simplifying all English explanations...\n');

  const { data } = await supabase
    .from('practice_test_english_questions')
    .select('id, explanation')
    .order('id');

  let count = 0;

  for (const q of data) {
    if (q.id === 1) continue; // Already manually updated

    const simplified = simplify(q.explanation);

    if (simplified !== q.explanation) {
      await supabase
        .from('practice_test_english_questions')
        .update({ explanation: simplified })
        .eq('id', q.id);

      count++;
    }

    if (count % 15 === 0 && count > 0) {
      console.log(`✅ Updated ${count}/74`);
    }
  }

  console.log(`\n✅ Simplified ${count} explanations!`);
}

updateAll().catch(console.error);
