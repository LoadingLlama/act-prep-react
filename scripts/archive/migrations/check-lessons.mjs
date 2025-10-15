import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function checkLessons() {
  // Check a few lessons to see actual issues
  const keysToCheck = ['geometry-shapes', 'lines', 'fractions', 'quadratics'];
  
  for (const key of keysToCheck) {
    const { data } = await supabase
      .from('lessons')
      .select('content')
      .eq('lesson_key', key)
      .single();

    fs.writeFileSync(`check-${key}.html`, data.content);
    console.log(`Saved ${key} to check-${key}.html`);
    
    // Check for issues
    const hasH3 = data.content.includes('<h3>');
    const hasH4 = data.content.includes('<h4>');
    const hasIntro = data.content.includes('lesson-intro');
    const hasTakeaway = data.content.includes('Key Takeaway');
    
    console.log(`\n${key}:`);
    console.log(`  Has H3 headers: ${hasH3}`);
    console.log(`  Has H4 headers: ${hasH4}`);
    console.log(`  Has intro: ${hasIntro}`);
    console.log(`  Has takeaway: ${hasTakeaway}`);
    console.log('');
  }
}

checkLessons();
