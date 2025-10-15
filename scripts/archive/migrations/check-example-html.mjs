/**
 * Check actual HTML structure of examples
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Get geometry-angles lesson
const { data: lessonData } = await supabase
  .from('lessons')
  .select('*')
  .eq('lesson_key', 'geometry-angles')
  .single();

const content = lessonData.content;

// Extract Example 1 section
const example1Match = content.match(/<h4[^>]*>Example 1<\/h4>([\s\S]+?)(?=<h[34]|$)/i);

if (example1Match) {
  const example1Html = example1Match[0];

  console.log('═══ EXAMPLE 1 HTML STRUCTURE ═══\n');
  console.log(example1Html);
  console.log('\n═══ END ═══\n');

  // Check for choices
  const hasSpanChoices = example1Html.includes('<span') && /[A-E]\./g.test(example1Html);
  const hasParagraphChoices = /A\.\s/g.test(example1Html);

  console.log('Has <span> choices:', hasSpanChoices);
  console.log('Has paragraph text choices:', hasParagraphChoices);
}
