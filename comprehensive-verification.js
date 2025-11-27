const { createClient } = require('@supabase/supabase-js');
const supabase = createClient('https://rabavobdklnwvwsldbix.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTc2NTQ3OCwiZXhwIjoyMDc1MzQxNDc4fQ.81SeH703keXgF3IevQlRS7OYmn1J2GUVIkn3OJiviM4');

const allEnglishLessons = ['adding-deleting', 'commas', 'logical-placement', 'misc-topics', 'modifiers', 'parallel-structure', 'pronouns', 'punctuation', 'redundancy', 'transitions', 'verbs', 'which-choice', 'word-choice'];

async function verify() {
  console.log('Verifying all 561 questions...');
  const issues = [];
  
  for (const key of allEnglishLessons) {
    const { data: lesson } = await supabase.from('lessons').select('id').eq('lesson_key', key).single();
    const { data: questions } = await supabase.from('lesson_examples').select('*').eq('lesson_id', lesson.id);
    
    for (const q of questions) {
      const text = q.problem_text || '';
      const low = text.toLowerCase();
      
      if ((low.includes('this essay') || low.includes('this paragraph')) && text.length < 300) issues.push(key + ' pos ' + q.position + ': refs essay/para');
      if (low.includes('underlined') && !text.includes('<u>')) issues.push(key + ' pos ' + q.position + ': refs underlined without showing');
      if (low.includes('marshall')) issues.push(key + ' pos ' + q.position + ': refs Marshall');
      if (low.includes('manta') && text.length < 250) issues.push(key + ' pos ' + q.position + ': refs manta');
      
      for (const c of q.choices) {
        const exp = (c.explanation || '').toLowerCase();
        if (exp.includes('violates standard') || exp.includes('incorrect and needs to be changed')) {
          issues.push(key + ' pos ' + q.position + ' choice ' + c.letter + ': generic');
          break;
        }
      }
    }
  }
  
  if (issues.length === 0) {
    console.log('✓✓✓ NO ISSUES FOUND! ✓✓✓');
  } else {
    console.log('ISSUES FOUND:');
    issues.forEach(i => console.log('  ' + i));
  }
}

verify();