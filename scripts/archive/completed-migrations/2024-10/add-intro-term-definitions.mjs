import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: resolve(__dirname, '../.env') });

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

// Definitions for intro paragraph terms
const introDefinitions = [
  {
    term: 'algebra skills',
    definition: 'Fundamental mathematical abilities including solving equations, simplifying expressions, working with variables, and manipulating formulas. These form the foundation for most ACT Math questions.',
    lesson_key: '3.1'
  },
  {
    term: 'fractions',
    definition: 'Numbers that represent parts of a whole, written as a ratio of two integers (numerator/denominator). Essential for solving problems involving division, ratios, percentages, and proportions.',
    lesson_key: '3.2'
  },
  {
    term: 'exponents',
    definition: 'A notation that indicates how many times to multiply a number (the base) by itself. For example, 3⁴ means 3 × 3 × 3 × 3 = 81. The small raised number is the exponent or power.',
    lesson_key: '3.3'
  },
  {
    term: 'roots',
    definition: 'The inverse operation of exponents. The square root (√) asks "what number times itself equals this?" The cube root (∛) asks "what number times itself three times equals this?" Written as √x or x^(1/2).',
    lesson_key: '3.3'
  }
];

async function addIntroTermDefinitions() {
  console.log('\n📚 ADDING INTRO TERM DEFINITIONS');
  console.log('='.repeat(80));
  console.log(`Adding ${introDefinitions.length} definitions\n`);

  let successCount = 0;
  let errorCount = 0;

  for (const def of introDefinitions) {
    try {
      const { error } = await supabase
        .from('term_definitions')
        .insert({
          term: def.term,
          definition: def.definition,
          lesson_key: def.lesson_key
        });

      if (error) {
        console.error(`✗ ${def.term}: ${error.message}`);
        errorCount++;
      } else {
        console.log(`✓ ${def.term}`);
        successCount++;
      }
    } catch (error) {
      console.error(`✗ ${def.term}: ${error.message}`);
      errorCount++;
    }
  }

  console.log('\n' + '='.repeat(80));
  console.log('📊 SUMMARY');
  console.log('='.repeat(80));
  console.log(`✅ Successfully added: ${successCount}`);
  console.log(`❌ Errors: ${errorCount}`);
  console.log('='.repeat(80) + '\n');
}

addIntroTermDefinitions();
