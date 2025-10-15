/**
 * Examine Answer Section - See full HTML
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function examineAnswers() {
  console.log('🔍 Examining answer sections...\n');

  const { data: lesson } = await supabase
    .from('lessons')
    .select('content')
    .eq('lesson_key', 'geometry-angles')
    .single();

  const content = lesson.content;

  // Find Example 1
  const ex1Match = content.match(/<h4[^>]*>Example 1<\/h4>([\s\S]*?)(?=<h4[^>]*>Example 2|<h4[^>]*>Concept|$)/);

  if (ex1Match) {
    const ex1 = ex1Match[1];

    // Find the answer choice section - after the diagram, before "Solution:"
    const answerMatch = ex1.match(/<\/svg>\s*<\/div>([\s\S]*?)<p[^>]*><strong>Solution:<\/strong><\/p>/);

    if (answerMatch) {
      console.log('📝 Example 1 Answer Choices Section:\n');
      console.log('=' .repeat(70));
      console.log(answerMatch[1]);
      console.log('='.repeat(70));
    }
  }
}

examineAnswers();
