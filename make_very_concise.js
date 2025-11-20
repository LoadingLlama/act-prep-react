const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  'https://rabavobdklnwvwsldbix.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk3NjU0NzgsImV4cCI6MjA3NTM0MTQ3OH0.z_1N3TG-cS9Bc1s7UAif91PkIjhBKvicrUqupiNP80Y'
);

// Make explanations very concise while keeping specificity
function makeVeryConcise(explanation) {
  if (!explanation) return explanation;
  
  // Remove redundant phrases and shorten
  let result = explanation
    // Remove HTML tags for processing
    .replace(/<div style="line-height: 1\.6; margin-bottom: 0\.75rem; color: #374151;">\s*/g, '__MAINDIV__')
    .replace(/<\/div>\s*<div>\s*<strong style="font-size: 0\.875rem; color: #6b7280;">Why Other Answers Are Wrong:<\/strong>/g, '__WRONGDIV__')
    .replace(/<div style="margin-top: 0\.5rem; line-height: 1\.6; color: #374151;">\s*/g, '')
    .replace(/<div style="margin-bottom: 0\.375rem;"><strong>/g, '__CHOICE__')
    .replace(/<\/strong>/g, '__ENDCHOICE__')
    .replace(/<\/div>\s*/g, ' ')
    
    // Remove redundancy
    .replace(/This avoids the [^.]+\. This avoids the/g, 'This avoids the')
    .replace(/\s+/g, ' ')
    .trim();
  
  // Rebuild HTML
  const parts = result.split('__WRONGDIV__');
  if (parts.length !== 2) return explanation;
  
  let main = parts[0].replace('__MAINDIV__', '').trim();
  let wrong = parts[1];
  
  // Simplify main further
  main = main
    .replace(/^"[^"]*"\s+into\s+"([^"]+)",?\s*/i, '"$1" ')
    .replace(/creating a subordinate prepositional phrase/g, 'creates a subordinate phrase')
    .replace(/instead of an independent clause,?\s*/g, '')
    .replace(/This avoids the comma splice error where joins/g, 'avoiding the comma splice from joining')
    .replace(/\("([^"]+)"\s+and\s+"([^"]+)"\)/g, '(two independent clauses)')
    .replace(/with only a comma\.\s*$/,'with only a comma.');
  
  // Simplify wrong answers
  const choices = wrong.split('__CHOICE__').filter(c => c.trim());
  const wrongHTML = choices.map(choice => {
    const [label, ...rest] = choice.split('__ENDCHOICE__');
    let reason = rest.join('').trim();
    
    // Shorten common patterns
    reason = reason
      .replace(/^"[^"]+" (creates|still creates|also creates) a comma splice.*$/i, 'Creates a comma splice.')
      .replace(/by joining two independent clauses with only a comma\./g, '')
      .replace(/\s+/g, ' ')
      .trim();
    
    return `<div style="margin-bottom: 0.375rem;"><strong>${label}:</strong> ${reason}</div>`;
  }).join('\n');
  
  return `<div style="line-height: 1.6; margin-bottom: 0.75rem; color: #374151;">
${main}
</div>

<div>
<strong style="font-size: 0.875rem; color: #6b7280;">Why Other Answers Are Wrong:</strong>
<div style="margin-top: 0.5rem; line-height: 1.6; color: #374151;">
${wrongHTML}
</div>
</div>`;
}

async function update() {
  console.log('🔄 Making explanations very concise...\n');
  
  const { data } = await supabase
    .from('practice_test_english_questions')
    .select('id, explanation')
    .order('id');
  
  for (const q of data) {
    if (!q.explanation) continue;
    
    const concise = makeVeryConcise(q.explanation);
    
    await supabase
      .from('practice_test_english_questions')
      .update({ explanation: concise })
      .eq('id', q.id);
    
    if (q.id % 15 === 0) {
      console.log(`✅ Updated ${q.id}/75`);
    }
  }
  
  console.log('\n✅ Done!');
}

update();
