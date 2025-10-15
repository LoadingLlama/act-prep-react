/**
 * Analyze all spacing in the mini sections to understand inconsistencies
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const { data } = await supabase
  .from('lessons')
  .select('content')
  .eq('lesson_key', 'geometry-angles')
  .single();

const content = data.content;

console.log('=== ANALYZING SPACING ===\n');

// Find all ul styles
const ulMatches = content.match(/<ul style="([^"]*)"/g);
if (ulMatches) {
  console.log('UL styles found:');
  const uniqueStyles = [...new Set(ulMatches)];
  uniqueStyles.forEach((match, i) => {
    console.log(`${i + 1}. ${match}`);
  });
  console.log('');
}

// Find all li styles
const liMatches = content.match(/<li style="([^"]*)"/g);
if (liMatches) {
  console.log('LI styles found:');
  const uniqueStyles = [...new Set(liMatches)];
  uniqueStyles.forEach((match, i) => {
    console.log(`${i + 1}. ${match}`);
  });
  console.log('');
}

// Find h4 + ul patterns (what comes right after angle type headings)
const h4ulPattern = /<h4[^>]*>[^<]*<\/h4>\s*<ul/g;
const h4ulMatches = content.match(h4ulPattern);
console.log(`H4 followed by UL: ${h4ulMatches ? h4ulMatches.length : 0} instances`);
console.log('');

// Show a sample section
const acuteIndex = content.indexOf('Acute Angles');
if (acuteIndex !== -1) {
  const sample = content.substring(acuteIndex, acuteIndex + 600);
  console.log('Sample section (Acute Angles):');
  console.log('---');
  console.log(sample);
  console.log('---');
}
