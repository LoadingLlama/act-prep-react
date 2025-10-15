import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const SERVICE_ROLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTc2NTQ3OCwiZXhwIjoyMDc1MzQxNDc4fQ.81SeH703keXgF3IevQlRS7OYmn1J2GUVIkn3OJiviM4';

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  SERVICE_ROLE_KEY
);

async function checkFormattingIssues() {
  // Check a few sample lessons
  const sampleKeys = ['algebra-skills', 'backsolving', 'geometry-angles', 'quadratics'];

  for (const key of sampleKeys) {
    const { data, error } = await supabase
      .from('lessons')
      .select('lesson_key, title, content')
      .eq('lesson_key', key)
      .single();

    if (error) {
      console.error(`Error getting ${key}:`, error);
      continue;
    }

    console.log('\n' + '='.repeat(70));
    console.log(`LESSON: ${key}`);
    console.log('='.repeat(70));
    console.log(`Title: ${data.title}\n`);

    // Show first 3000 characters to see structure
    console.log('First 3000 characters:');
    console.log('-'.repeat(70));
    console.log(data.content.substring(0, 3000));
    console.log('-'.repeat(70));

    // Count heading occurrences
    const h1Count = (data.content.match(/<h1/g) || []).length;
    const h2Count = (data.content.match(/<h2/g) || []).length;
    const h3Count = (data.content.match(/<h3/g) || []).length;
    const h4Count = (data.content.match(/<h4/g) || []).length;
    const exampleCount = (data.content.match(/Example \d+/gi) || []).length;

    console.log(`\nHeading counts:`);
    console.log(`  H1: ${h1Count}`);
    console.log(`  H2: ${h2Count}`);
    console.log(`  H3: ${h3Count}`);
    console.log(`  H4: ${h4Count}`);
    console.log(`  Examples: ${exampleCount}`);
  }

  console.log('\n' + '='.repeat(70));
}

checkFormattingIssues();
