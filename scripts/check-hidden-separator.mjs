#!/usr/bin/env node

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function checkHiddenSeparator() {
  const { data } = await supabase
    .from('lessons')
    .select('content')
    .eq('lesson_key', 'sentence-structure')
    .limit(1);

  const content = data?.[0]?.content;

  // Find Hidden Separator section
  const hiddenSepMatch = content.match(/<h3[^>]*>Hidden Separator<\/h3>([\s\S]*?)(?=<h3|$)/);

  if (hiddenSepMatch) {
    console.log('\n📍 Found "Hidden Separator" section:');
    console.log('Content length:', hiddenSepMatch[1].length, 'chars');
    console.log('\nFull content:');
    console.log(hiddenSepMatch[1]);
    console.log('\n---');
  } else {
    console.log('❌ Hidden Separator not found');
  }

  // Also check if it comes before or after Key Takeaways
  const beforeKeyTakeaways = content.indexOf('Hidden Separator') < content.indexOf('Key Takeaways');
  console.log('\nHidden Separator comes BEFORE Key Takeaways:', beforeKeyTakeaways);

  process.exit(0);
}

checkHiddenSeparator();
