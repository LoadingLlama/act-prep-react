/**
 * Find and Fix Angle Types Table
 * Make it clean and minimalist
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function fixTable() {
  const { data: lesson } = await supabase
    .from('lessons')
    .select('content')
    .eq('lesson_key', 'geometry-angles')
    .single();

  // Search for the types section
  const searchTerms = ['Acute', 'Right', 'Obtuse', 'Straight'];

  let foundIndex = -1;
  for (const term of searchTerms) {
    const idx = lesson.content.indexOf(term);
    if (idx !== -1 && idx < 2000) { // Should be near the beginning
      foundIndex = idx;
      break;
    }
  }

  if (foundIndex === -1) {
    console.log('Could not find angle types section');
    return;
  }

  // Extract context around it
  const context = lesson.content.substring(Math.max(0, foundIndex - 500), Math.min(lesson.content.length, foundIndex + 1000));
  console.log('Context:');
  console.log(context);
}

fixTable().catch(err => console.error(err));
