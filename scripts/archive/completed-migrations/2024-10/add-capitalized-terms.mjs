import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: resolve(__dirname, '../.env') });

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function addCapitalizedTerms() {
  console.log('🔨 ADDING CAPITALIZED TERM DEFINITIONS\n');

  // Get lesson ID
  const { data: lessons } = await supabase
    .from('lessons')
    .select('id, title')
    .eq('lesson_key', 'backsolving');

  if (!lessons || lessons.length === 0) {
    console.log('❌ Lesson not found');
    return;
  }

  console.log('Lesson:', lessons[0].title);
  console.log('');

  // Get existing definitions
  const { data: existingDefs } = await supabase
    .from('term_definitions')
    .select('term, definition')
    .eq('lesson_key', 'backsolving');

  console.log(`Found ${existingDefs.length} existing definitions\n`);

  // Terms that need capitalized versions added
  const termsToCapitalize = [
    { lowercase: 'strategic starting', capitalized: 'Strategic Starting' },
    { lowercase: 'elimination', capitalized: 'Elimination' },
    { lowercase: 'when to backsolve', capitalized: 'When to Backsolve' }
  ];

  for (const termPair of termsToCapitalize) {
    // Find the lowercase version
    const lowercaseDef = existingDefs.find(d => d.term === termPair.lowercase);

    if (!lowercaseDef) {
      console.log(`⚠️  Lowercase version "${termPair.lowercase}" not found`);
      continue;
    }

    // Check if capitalized version already exists
    const capitalizedExists = existingDefs.find(d => d.term === termPair.capitalized);

    if (capitalizedExists) {
      console.log(`✓ "${termPair.capitalized}" already exists`);
      continue;
    }

    // Add capitalized version with same definition
    const { error } = await supabase
      .from('term_definitions')
      .insert({
        lesson_key: 'backsolving',
        term: termPair.capitalized,
        definition: lowercaseDef.definition
      });

    if (error) {
      console.log(`❌ Error adding "${termPair.capitalized}": ${error.message}`);
    } else {
      console.log(`✅ Added "${termPair.capitalized}"`);
    }
  }

  console.log('\n✅ DONE! All capitalized terms added!');
  console.log('📱 Refresh your app - hover tooltips should now work on all blue terms!');
}

addCapitalizedTerms();
