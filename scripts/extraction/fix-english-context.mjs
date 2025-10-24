import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
dotenv.config({ path: '/Users/cadenchiang/Desktop/act-prep-react/.env' });

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

const { data } = await supabase
  .from('act_questions')
  .select('question_number, context_before, context_after, question_stem')
  .eq('test_number', 1)
  .eq('section', 'E')
  .order('question_number');

const missing = data.filter(q => !q.context_before || q.context_before === '' || !q.context_after || q.context_after === '');
console.log('English questions missing context: ' + missing.length);
missing.forEach(q => {
  console.log(`  EQ${q.question_number}: before="${q.context_before?.substring(0,20)}" after="${q.context_after?.substring(0,20)}"`);
});

// Fix them
for (const q of missing) {
  const stem = q.question_stem;
  const underlineStart = stem.indexOf('<u>');
  const underlineEnd = stem.indexOf('</u>');

  if (underlineStart !== -1 && underlineEnd !== -1) {
    const contextBefore = stem.substring(0, underlineStart);
    const underlinedText = stem.substring(underlineStart + 3, underlineEnd);
    const contextAfter = stem.substring(underlineEnd + 4);

    await supabase.from('act_questions')
      .update({
        context_before: contextBefore,
        underlined_text: underlinedText,
        context_after: contextAfter
      })
      .eq('test_number', 1)
      .eq('section', 'E')
      .eq('question_number', q.question_number);

    console.log(`✅ Fixed EQ${q.question_number}`);
  }
}
