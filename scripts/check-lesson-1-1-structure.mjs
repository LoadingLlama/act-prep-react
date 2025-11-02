#!/usr/bin/env node

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function checkLesson11Structure() {
  const { data } = await supabase
    .from('lessons')
    .select('content')
    .eq('lesson_key', 'sentence-structure')
    .limit(1);

  const content = data?.[0]?.content;
  if (!content) {
    console.log('No content found');
    return;
  }

  const h3Sections = content.match(/<h3[^>]*>([^<]+)<\/h3>/g);
  console.log('\nH3 sections in lesson 1.1:');
  h3Sections?.forEach((h3, i) => {
    console.log(`  ${i + 1}. ${h3.replace(/<[^>]*>/g, '')}`);
  });

  // Check if there's content after Key Takeaways
  const parts = content.split(/<h3[^>]*>Key Takeaways<\/h3>/);
  if (parts.length > 1) {
    console.log('\n✅ Key Takeaways section found');
    const afterKeyTakeaways = parts[1];
    const nextH3 = afterKeyTakeaways.match(/<h3/);
    console.log('More H3 sections after Key Takeaways:', !!nextH3);

    if (nextH3) {
      const nextSection = afterKeyTakeaways.match(/<h3[^>]*>([^<]+)<\/h3>/);
      console.log('Next section:', nextSection?.[1]);
    } else {
      console.log('\n✅ Key Takeaways is the LAST H3 section');
      console.log('Content after Key Takeaways (first 300 chars):');
      console.log(afterKeyTakeaways.substring(0, 300));
    }
  }

  process.exit(0);
}

checkLesson11Structure();
