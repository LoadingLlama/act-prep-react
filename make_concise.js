const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  'https://rabavobdklnwvwsldbix.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk3NjU0NzgsImV4cCI6MjA3NTM0MTQ3OH0.z_1N3TG-cS9Bc1s7UAif91PkIjhBKvicrUqupiNP80Y'
);

// Function to make explanation more concise
function makeConcise(explanation) {
  if (!explanation) return explanation;
  
  // Split into sections
  const sections = explanation.split('<div>\n<strong style="font-size: 0.875rem; color: #6b7280;">Why Other Answers Are Wrong:</strong>');
  
  if (sections.length !== 2) return explanation;
  
  let mainExplanation = sections[0];
  let wrongAnswers = sections[1];
  
  // Simplify main explanation - remove repetitive phrases
  mainExplanation = mainExplanation
    .replace(/This choice transforms/g, '')
    .replace(/This eliminates the/g, 'This avoids the')
    .replace(/that occurs when the original version/g, 'where')
    .replace(/Both clauses can stand alone as complete sentences, so they cannot be connected with just a comma\./g, '')
    .replace(/instead of an independent clause\./g, 'instead of an independent clause, avoiding a comma splice.')
    .replace(/\s+/g, ' ')
    .trim();
  
  // Simplify wrong answers - remove repetitive explanations
  wrongAnswers = wrongAnswers
    .replace(/by joining two independent clauses with only a comma\. Both clauses can stand alone as complete sentences, so they cannot be connected with just a comma\./g, 'by joining two independent clauses with only a comma.')
    .replace(/still contains the same comma splice error\. While it adds "[^"]+," it doesn't address the fundamental problem of two independent clauses being improperly joined\./g, 'still creates a comma splice.')
    .replace(/also creates a comma splice\. Like choice [A-Z], this joins two complete thoughts with only a comma instead of using proper punctuation \(semicolon, period, or conjunction with comma\)\./g, 'also creates a comma splice.')
    .replace(/\s+/g, ' ')
    .trim();
  
  return mainExplanation + '\n\n<div>\n<strong style="font-size: 0.875rem; color: #6b7280;">Why Other Answers Are Wrong:</strong>' + wrongAnswers;
}

async function updateAll() {
  console.log('🔄 Making English explanations more concise...\n');
  
  const { data: questions } = await supabase
    .from('practice_test_english_questions')
    .select('id, explanation')
    .order('id');
  
  let updated = 0;
  
  for (const q of questions) {
    if (!q.explanation) continue;
    
    const concise = makeConcise(q.explanation);
    
    if (concise !== q.explanation) {
      await supabase
        .from('practice_test_english_questions')
        .update({ explanation: concise })
        .eq('id', q.id);
      
      updated++;
      
      if (updated % 15 === 0) {
        console.log(`✅ Updated ${updated}/${questions.length}`);
      }
    }
  }
  
  console.log(`\n✅ Complete! Made ${updated} explanations more concise`);
}

updateAll();
