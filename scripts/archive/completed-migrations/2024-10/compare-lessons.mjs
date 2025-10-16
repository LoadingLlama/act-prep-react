import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: resolve(__dirname, '../.env') });

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function compare() {
  // Get gold standard
  const { data: gold } = await supabase
    .from('lessons')
    .select('title, content')
    .eq('lesson_key', 'geometry-angles')
    .single();

  // Get a current generic lesson
  const { data: generic } = await supabase
    .from('lessons')
    .select('title, content')
    .eq('lesson_key', 'exponents-roots')
    .single();

  console.log('='.repeat(80));
  console.log('GOLD STANDARD (Geometry: Angles)');
  console.log('='.repeat(80));
  console.log(`Length: ${gold.content.length} characters`);
  console.log(`\nFirst 800 characters:\n`);
  console.log(gold.content.substring(0, 800));
  console.log('\n...\n');

  console.log('='.repeat(80));
  console.log('CURRENT GENERIC LESSON (Exponents and Roots)');
  console.log('='.repeat(80));
  console.log(`Length: ${generic.content.length} characters`);
  console.log(`\nFULL CONTENT:\n`);
  console.log(generic.content);
  console.log('\n' + '='.repeat(80));
  console.log('\nCOMPARISON:');
  console.log(`  Gold standard: ${gold.content.length} chars, rich examples and explanations`);
  console.log(`  Generic lesson: ${generic.content.length} chars, just definition bullets`);
  console.log(`  Difference: ${gold.content.length - generic.content.length} chars less in generic!`);
}

compare();
